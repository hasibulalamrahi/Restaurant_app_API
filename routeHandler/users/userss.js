const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const userSchema = require('../../schemas/userSchema')
const User = new mongoose.model("User",userSchema)

//Sign up user
router.post("/signup",async (req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    try{
        const newUser = new User({
            name : req.body.name,
            userName: req.body.userName,
            email:req.body.email,
            password: hashedPassword,
            userStatus : req.body.userStatus 
        })
        await newUser.save()
        res.status(200).json({
            message : "Signup was successful"
        })
    } catch(err){
        res.status(500).json({
            message : "Signup was failed"
        })        
    }
})

router.post("/login",async(req,res)=>{
    try{
        const user = await User.find({userName : req.body.userName})
        if( user && user.length >0 ){
            const isValidPassword = await bcrypt.compare(req.body.password,user[0].password)
            if(isValidPassword){
                //generating json web token
                const token = jwt.sign({
                    userName: user[0].userName,
                    userId: user[0]._id
                },process.env.JWT_SECRET,{
                    expiresIn:'2 days'
                })
                res.status(200).json({
                    "access_token": token,
                    "message":"Login is successful"
                })
            }else{
                res.status(401).json({
                    "error":"Invalid Password"
                })
            }
        }
    }catch(err){
        res.status(500).json({
            message : "Signup was failed"
        })   
    }
})

module.exports = router