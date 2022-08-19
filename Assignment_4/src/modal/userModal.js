const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    isPromoted:Boolean
});

const userModal=new mongoose.model("userSchema",userSchema);
module.exports=userModal;