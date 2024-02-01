const jwt = require('jsonwebtoken')

const checkLogin =(req,res,next)=>{
    const{ authorization} = req.headers;
   
    try{
        const Token = authorization.split(' ')[1];
        const decoded = jwt.verify(Token, process.env.JWT_SECRET);
        console.log(decoded)
        const {userName,userId}= decoded;
        req.userName = userName;
        req.userId = userId;
        next()

    }catch(err){
      
        next("Authentication fail")

    }
}

module.exports =checkLogin;