const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({
    name:String,
    title:String,
    image:String,
    body:String,
    user:String
});

const postModal=mongoose.model("postModal", postSchema)

module.exports=postModal;