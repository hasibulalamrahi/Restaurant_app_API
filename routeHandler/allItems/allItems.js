const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const allItemSchema = require('../../schemas/allItemSchema')
const AllItem = new mongoose.model('AllItem', allItemSchema)

//Get All the Items
router.get('/',(req,res)=>{
    AllItem.find({isStatus: 'active'})
        .exec()
        .then(docs =>{
            console.log(docs)
            res.status(200).json(docs)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

//Get A Particular Item
router.get('/:id',(req,res)=>{
    const id = req.params.id
    AllItem.findById(id)
        .exec()
        .then(docs =>{
            console.log(docs)
            res.status(200).json(docs)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
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
    await AllItem.insertMany(req.body,(err)=>{
        if(err){
            res.status(500).json({
                error:"There was Server Side error"
            })
        }else{
            res.status(200).json({
                message:"All the Items were inserted Successfully"
            })
        }
    })
})

//Put An Item
router.put('/:id',async(req,res)=>{
    await AllItem.updateOne({_id:req.params.id},{
        $set:{
            isStatus: 'active',
            
        }
    },(err)=>{
        if(err){
            res.status(500).json({
                error:"There was Server Side error"
            })            
        } else {
            res.status(200).json({
                message:"Item was edited Successfully"
            })
        }
    })
})

//Delete An Item
router.delete('/:id',(req,res)=>{
    const id = req.params.id
    AllItem.deleteOne({id: id})
        .exec()
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router 