const express = require("express");
const mongoose = require("mongoose")
const itemHandler = require("../routeHandler/allItems/allItems")
const userHandler = require("../routeHandler/users/userss")
const dotenv = require("dotenv")

const app = express()
dotenv.config()
app.use(express.json())

//database connection using mongoose
mongoose
.connect('mongodb://localhost/ABC_Restaurant',{
    useNewUrlParser : true ,
    useUnifiedTopology : true
})
.then(()=> console.log("Connection to Database is succesful"))
.catch((err)=> console.log(err))

//application routes
app.use('/all-items',itemHandler)
app.use('/user', userHandler)

//error handeling Middleware
const errorHandler =  (err,req,res,next)=>{
    console.log(err)
    if(res.headerSent){
        return next(err)
    }
    res.status(500).json({ error: err})
}

app.use(errorHandler)

//Starting our server
app.listen(3050,()=>{
    console.log("App is listening at PORT 3050")
})