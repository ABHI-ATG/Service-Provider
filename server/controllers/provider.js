const Pro= require('../models/provider');
const Message=require('../models/message')

const signup=async(req,res)=>{
    try {
        const {fname, lname, email, mobile, state, city, pincode, profession, password}=req.body;
        if(!fname || !lname || !email || !mobile || !password || !state ||  !pincode || !city){
            return res.status(400).send('Enter all details');
        }
        const userExist=await Pro.findOne({email})
        if(userExist){
            return res.status(400).send('User already exist');
        }
        const data=await Pro.create({fname, lname, email, mobile, state, city, pincode, profession, password})
        res.status(200).send("Account Created Successfully")
    } catch (error) {
        return res.status(404).send(error);
    }
}

const signin=async(req,res)=>{
    try {
        const {email , password}=req.body;
        
        if(!email || !password){
            return res.status(400).send('Enter all details');
        }

        let userExist=await Pro.findOne({email})
        if(userExist){
            const isMatch=await userExist.matchPassword(password);
            if(isMatch){
                const token=await userExist.generateToken();
                res.cookie('jwt',token,{
                    expires:new Date(Date.now()+10000000000)
                })
                return res.status(200).send({
                    id:userExist._id,
                    token:token,
                    email:userExist.email,
                    fname:userExist.fname,
                    lname:userExist.lname,
                    city:userExist.city,
                    mobile:userExist.mobile,
                    pincode:userExist.pincode,
                    state:userExist.state,
                })
            }else{
                return res.status(400).send('User does not exist');
            }
        }else{  
            return res.status(400).send('User does not exist');
        }
    } catch (error) {
        return res.status(404).send(error);
    }           
}

const signout=async(req,res)=>{
    try {
        res.clearCookie('jwt');
        const data=await Pro.findOne({_id:req.userId});
        await Pro.updateOne({_id:req.userId},{
            tokens:[]
        })
        return res.status(200).json({messege:"successfully log out"})  
    }catch(err){
        return res.status(400).send({ error: "Credentials does not Match"})
    }                              
}

const details=async(req,res)=>{
    try {
        const {id}=req.body;
        const data=await Message.find({provider:id}).populate('user');
        return res.status(200).send({
            user:req.rootUser,
            message:data
        });
    } catch (error) {
        res.status(401).send("Error in messageUpdate");
    }
}


const send=async(req,res)=>{
    try {
        const {chatId,sender,content}=req.body;
        const data = await Message.findOneAndUpdate(
            { _id: chatId },
            { $push: { message: { sender, content } } },
            { new: true }
          );
        return res.status(200).send(data);
    } catch (error) {
        res.status(401).send("Error in messageUpdate");
    }
}


module.exports={signin,signup,signout,details,send};
