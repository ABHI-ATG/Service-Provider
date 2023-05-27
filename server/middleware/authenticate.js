const jwt=require("jsonwebtoken");
const user=require('../model/userModel');

const authenticate=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
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
        console.log(err);
    }
}

module.exports.authenticate;