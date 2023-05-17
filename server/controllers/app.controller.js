require('dotenv').config();
const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken');
const Register= require('../model/user.model');

exports.register=async(req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmPassword;
        //check out db schema for password
        if(password === cpassword){
            const registerPerson=new Register({
                //check out register.js file schema use all the attrebutes in it
                name:req.body.firstname,
                email:req.body.email,
                password:req.body.password,
                confirmPassword:req.body.confirmPassword
            })
            //creating tokens here for tokens 
            //created an function to generate token 
            const token= await registerPerson.generateAuthToken();

            //generated token has to be saved in the form of cookies 
            //We will se how to save token in the form of cookies
            //res.cookies() is used to set the cookie name to value
            //value parameter may be a string or an object converted to json
            //res.cookie(give any name of cookie, token value,property)
            res.cookie("jwt",token,{
                expires:new Date()(Date.now()+ 1000000),//cookies expiration time
                httpOnly:true,//client side script will not affect cookies
                //secure:true//only work if site is on https or we can say in productioon version
            });



            //hashing of password
            //between saving and creating
             const registered=await registerPerson.save();
            res.status(201).render('/');//send to index page
        }else{
            res.send("Password not matching")
        }
    }catch(e){
        res.status(400).send('Error');
    }
}