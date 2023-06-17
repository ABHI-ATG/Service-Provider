const Pro= require('../models/provider');

const signup=async(req,res)=>{
    try {
        console.log(req.body);
        const {fname,lname,email,mobile,state,pincode,city,password}=req.body;
        if(!fname || !lname || !email || !mobile || !password || !state ||  !pincode || !city){
            return res.status(400).send('Enter all details');
        }
        const userExist=await Pro.findOne({email})
        console.log(userExist);
        if(userExist){
            return res.status(400).send('User already exist');
        }
        const data=await Pro.create({fname,lname,email,mobile,password})
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

        const userExist=await Pro.findOne({email})
        if(userExist){
            const isMatch=await userExist.matchPassword(password);
            if(isMatch){
                const token=await userExist.generateToken();
                res.cookie('jwt',token,{
                    expires:new Date(Date.now()+10000000000)
                })
                res.status(200).json({
                    token:token,
                    id:userExist._id,
                    name:userExist.fname
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


module.exports={signin,signup,signout};
