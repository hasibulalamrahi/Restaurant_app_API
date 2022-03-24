const mongoose = require("mongoose")

const allItemSchema =  mongoose.Schema({
    categoryType:{
        type:String,
        required:true 
    },
    itemName:{
        type:String,
        required:true         
    },
    itemPrice:{
        type:Number,
        required:true         
    },
    itemImage:{
        type:String,
        required:true         
    },
    itemDescription:{
        type:String
    },
    isStatus:{
        type:String,
        enum:["active","inactive"], 
        required:true         
    },
    discountPercentage:{
        type:Number,        
    },
})

module.exports = allItemSchema 