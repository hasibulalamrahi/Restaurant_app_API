const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const allItemSchema = require('../../schemas/allItemSchema')
const AllItem = new mongoose.model('AllItem', allItemSchema)

//Get All the Items
router.get('/',async(req,res)=>{

})

//Get A Particular Item
router.get('/:id',async(req,res)=>{
    
})

//Post An Item
router.post("/",async(req,res)=>{
    const newitem = new AllItem(req.body)
    await newitem.save((err)=>{
        if(err){
            res.status(500).json({
                error:"There was a Server Side Error"
            })
        } else {
            res.status(200).json({
                message:"Item was inserted Successfully"
            })            
        }
    })
})

//Post Multiple Item
router.post('/all',async(req,res)=>{
    
})

//Put An Item
router.put('/:id',async(req,res)=>{
    
})

//Delete An Item
router.delete('/:id',async(req,res)=>{
    
})

module.exports = router 