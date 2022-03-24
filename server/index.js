const express = require("express");
const mongoose = require("mongoose")
const itemHandler = require("../routeHandler/allItems/allItems")
const app = express()
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

//error handeling Middleware
function errorHandler(err,req,res,next){
    if(res.headerSent){
        return next(err)
    }
    res.status(500).json({ error: err})
}

//Starting our server
app.listen(3050,()=>{
    console.log("App is listening at PORT 3050")
})