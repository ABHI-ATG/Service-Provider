const jwt=require("jsonwebtoken");
const user=require('../model/userModel');
const pro=require('../model/proModel');

exports.authenticateUser=async(req,res,next)=>{
    try{
        const token=req.cookies.jwtoken;
        const verify=jwt.verify(token,process.env.SECRET_KEY);
        const userExist=await user.findOne({_id:verify._id,"tokens.token":token});

        if(!userExist){
            throw new Error("User Not Found");
        }

        req.token=token;
        req.rootUser=userExist;
        req.userId=userExist._id;

        next();
    }catch(err){
        console.log("Auth fail")
        console.log(err);
    }
}
exports.authenticatePro=async(req,res,next)=>{
    try{
        const token=req.cookies.jwtoken;
        const verify=jwt.verify(token,process.env.SECRET_KEY);
        const userExist=await pro.findOne({_id:verify._id,"tokens.token":token});

        if(!userExist){
            throw new Error("User Not Found");
        }

        req.token=token;
        req.rootUser=userExist;
        req.userId=userExist._id;

        return next();
    }catch(err){
        console.log(err);
    }
}