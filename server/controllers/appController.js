const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken');
const UserRegister= require('../model/userModel');
const ProRegister= require('../model/proModel');

exports.signup=async(req,res)=>{
    try{
        const {fname,lname,email,mobile,password,cpassword}=req.body;
        //check out db schema for password
        if(password === cpassword && fname && lname && email && mobile && password && cpassword){
            const registerPerson=new UserRegister({
                //check out register.js file schema use all the attrebutes in it
                fname:fname,
                lname:lname,
                email:email,
                mobile:mobile,
                password:password,
                cpassword:cpassword
            })
            const registered=await registerPerson.save();
            res.status(201).json({message:"account created successfully"});//send to index page
        }else{
            res.status(400).send("Invalid Details")
        }
    }catch(e){
        res.status(400).send('Error');
    }
}

exports.signin=async(req,res)=>{
    try {
        const { email, password } = req.body;
        if(!email  || !password){
            res.status(400).json({error:"Fill all details"});
        }
        UserRegister.findOne({ email })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {

                        if(!passwordCheck) return res.status(400).send({ error: "Fill all details"});

                        // create jwt token
                        user.generateAuthToken()
                        .then(token=>{
                            res.cookie("jwtoken",token,{
                                expires:new Date(Date.now()+ 25892000000),
                                httpOnly:true,
                            })
                            return res.status(201).send({
                                msg: "Login Successful...!",
                                email: user.email,
                                token
                            });                                    
    
                        }).catch(err=>{
                            return res.status(400).send({ error: "Credentials does not Match"})
                        });
                    })
                    .catch(error =>{
                        return res.status(400).send({ error: "Credentials does not Match"})
                    })
            })
            .catch( error => {
                return res.status(400).send({ error : "Invalid Details"});
            })

    } catch (error) {
        return res.status(400).send({ error});
    }
}


exports.register=async(req,res)=>{
    try{
        const {fname,lname,email,mobile,state,district,pincode,city,password,cpassword}=req.body;
        if(password === cpassword && fname && lname && email && mobile && password && cpassword && state && pincode && city){
            console.log(req.body);
            const registerPerson=new ProRegister({
                fname,lname,email,mobile,state,district,pincode,city,password,cpassword
            })
            const registered=await registerPerson.save();
            res.status(201).json({message:"account created successfully"});//send to index page
        }else{
            res.status(400).send("Invalid Details")
        }
    }catch(e){
        res.status(400).send('Error');
    }
}

exports.login=async(req,res)=>{
    try {
        const { email, password } = req.body;
        if(!email  || !password){
            res.status(400).json({error:"Fill all details"});
        }
        const user=await ProRegister.findOne({ email });
        if(!user){
            return res.status(400).send({ error : "Invalid Details"});
        }
        const passwordCheck=await bcrypt.compare(password, user.password)
        if(!passwordCheck) return res.status(400).send({ error: "Fill all details"});

        const token=await user.generateAuthToken();
        if(!token){
            return res.status(400).send({ error: "Credentials does not Match"})
        }
        res.cookie("jwtoken",token,{
            expires:new Date(Date.now()+ 25892000000),
            httpOnly:true,
        })
        return res.status(201).send({
            msg: "Login Successful...!",
            email: user.email,
            token
        });      
    }catch(err){
        return res.status(400).send({ error: "Credentials does not Match"})
    }                              
}

exports.logout=async(req,res)=>{
    try {
        res.clearCookie('jwtoken');
        const data=await UserRegister.findOne({_id:req.userId});
        data.tokens=[];
        return res.status(200).json({messege:"successfully log out"})  
    }catch(err){
        console.log("logout fails");
        return res.status(400).send({ error: "Credentials does not Match"})
    }                              
}

exports.out=async(req,res)=>{
    try {
        res.clearCookie('jwtoken');
        const data=await ProRegister.findOne({_id:req.userId});
        data.tokens=[];
        return res.status(200).json({messege:"successfully log out"})  
    }catch(err){
        return res.status(400).send({ error: "Credentials does not Match"})
    }                              
}