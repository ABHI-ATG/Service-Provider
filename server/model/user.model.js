const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false,
    },
    confirmPassword: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    firstName: { type: String},
    lastName: { type: String},
    mobile : { type : Number},
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
        console.error(err);
    }
}
UserSchema.pre('save',async function (next){
    //if pasword is change only than change the hashing/bcrypt
     if(this.isModified("password")){
     this.password = bcrypt.hash(this.password);
         
     this.confirmPassword=bcrypt.hash(this.confirmPassword);
 }
     next(); //used to tell that after hasing the password it will run ahead
})

const hostPerson = mongoose.model('User', UserSchema);

module.exports =hostPerson;
