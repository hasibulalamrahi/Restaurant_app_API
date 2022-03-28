const mongoose = require("mongoose")

const userSchema =  mongoose.Schema({
    name:{
        type:String,
        required:true 
    },
    userName:{
        type:String,
        required:true         
    },
    email:{
        type:String,         
    },
    password:{
        type:String,
        required:true         
    },
    userStatus:{
        type:String,
        enum:["active","inactive"], 
        required:true         
    }

})

module.exports = userSchema 