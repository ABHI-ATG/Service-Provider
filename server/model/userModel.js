const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    fname: { type: String},
    lname: { type: String},
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    
    mobile : { type : Number},
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false,
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type: String,
            required: true  
        }
    }]
});

UserSchema.methods.generateAuthToken= async function(){
    try{
        const token= jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens= this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log("Error while generating token");
        console.error(err);
    }
}
UserSchema.pre('save',async function (next){
    //if pasword is change only than change the hashing/bcrypt
    if(this.isModified("password")){
     this.password = await bcrypt.hash(this.password,10);
     this.cpassword=await bcrypt.hash(this.cpassword,10);
    }
     next(); //used to tell that after having the password it will run ahead
})

const hostPerson = mongoose.model('users', UserSchema);

module.exports =hostPerson;
