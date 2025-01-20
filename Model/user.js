const mongoose = require("mongoose");

const UserSchema =  new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    pwd:{
       type:String,
       required:true,
       
    },
    
},{timestamps:true})

const user = mongoose.model("User",UserSchema);

module.exports = user;