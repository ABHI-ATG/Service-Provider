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
                firstname:req.body.firstname,
                lastName:req.body.lastName,
                mobile:req.body.mobile,
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
                expires:new Date()(Date.now()+  "24h"),//cookies expiration time
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

exports.login=async(req,res)=>{
    const { email, password } = req.body;

    try {
        
        Register.findOne({ email })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {

                        if(!passwordCheck) return res.status(400).send({ error: "Don't have Password"});

                        // create jwt token
                        const token = jwt.sign({
                                        userId: user._id,
                                        email : user.email
                                    }, process.env.SECRET_KEY , { expiresIn : "24h"});

                        return res.status(200).send({
                            msg: "Login Successful...!",
                            email: user.email,
                            token
                        });                                    

                    })
                    .catch(error =>{
                        return res.status(400).send({ error: "Credentials does not Match"})
                    })
            })
            .catch( error => {
                return res.status(404).send({ error : "Email not Found"});
            })

    } catch (error) {
        return res.status(500).send({ error});
    }
}
