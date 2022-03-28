const jwt = require('jsonwebtoken')

const checkLogin = (req,res,next) =>{
    console.log(req.headers)
    const {authorization} = req.headers
    try{
        const token = authorization.split('')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { userName , userId} = decoded ;
        req.userName = userName 
        req.userId = userId
        console.log(userId)
        next()
    }catch{
        next ("Authentication failed")
    }
}

module.exports = checkLogin