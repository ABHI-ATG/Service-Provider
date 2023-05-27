const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken');
const Register= require('../model/userModel');

exports.register=async(req,res)=>{
    try{
        console.log('comes here')
        const {fname,lname,email,mobile,password,cpassword}=req.body;
        //check out db schema for password
        if(password === cpassword && fname && lname && email && mobile && password && cpassword){
            const registerPerson=new Register({
                //check out register.js file schema use all the attrebutes in it
                fname:fname,
                lname:lname,
                email:email,
                mobile:mobile,
                password:password,
                cpassword:cpassword
            })
            //creating tokens here for tokens 
            //created an function to generate token 
            const token= await registerPerson.generateAuthToken();
            console.log(token);
            //generated token has to be saved in the form of cookies 
            //We will se how to save token in the form of cookies
            //res.cookies() is used to set the cookie name to value
            //value parameter may be a string or an object converted to json
            //res.cookie(give any name of cookie, token value,property)
            res.cookie("jwt",token,{
                expires:new Date(Date.now()+ 25892000000),//cookies expiration time
                httpOnly:true,//client side script will not affect cookies
                //secure:true//only work if site is on https or we can say in productioon version
            });
            //hashing of password
            //between saving and creating

            const registered=await registerPerson.save();
            res.status(201).json({message:"account created successfully"});//send to index page
        }else{
            res.status(400).send("Invalid Details")
        }
    }catch(e){
        console.log(e);
        res.status(400).send('Error');
    }
}

exports.login=async(req,res)=>{
    
    try {
        
        const { email, password } = req.body;
        if(!email  || !password){
            res.status(422).json({error:"Fill all details"});
        }
        Register.findOne({ email })
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
                            return res.status(200).send({
                                msg: "Login Successful...!",
                                email: user.email,
                                token
                            });                                    
    
                        }).catch(err=>{
                            return res.status(422).send({ error: "Credentials does not Match"})
                        });
                    })
                    .catch(error =>{
                        return res.status(422).send({ error: "Credentials does not Match"})
                    })
            })
            .catch( error => {
                return res.status(422).send({ error : "Invalid Details"});
            })

    } catch (error) {
        return res.status(422).send({ error});
    }
}
