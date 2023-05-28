const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");

const ProSchema = new mongoose.Schema({
    fname: { 
        type: String,
        require:true
    },
    lname: { 
        type: String,
        require:true
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    mobile : { 
        type : Number,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    district:{
        type:String,
        require:true
    },
    pincode:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    profession:{
        type:String,
        require:true
    },
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

ProSchema.methods.generateAuthToken= async function(){
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
ProSchema.pre('save',async function (next){
    if(this.isModified("password")){
     this.password = await bcrypt.hash(this.password,10);
     this.cpassword=await bcrypt.hash(this.cpassword,10);
    }
     next(); 
})

const hostPerson = mongoose.model('providers', ProSchema);

module.exports =hostPerson;
