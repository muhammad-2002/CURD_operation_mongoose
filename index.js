const express =require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoHandler = require('./Handler/todoHandler')
const userHandler = require('./Handler/userHandler')

//connect with mongoose app
mongoose.connect('mongodb://localhost/todo')
        .then(()=>console.log("connected successfully"))
        .catch((err)=>console.log("connection is massing"))

//create app
const app = express();
dotenv.config()
app.use(express.json());
app.use('/todo',todoHandler)
app.use('/user',userHandler)

//default error handling
const errHandler= (err,req,res,next)=>{
   
    if(err.headersSent){
        return next(err)
        
    }
    res.status(500).json({error:"There was a server side Error"})
}
app.use(errHandler)
//listen port
app.listen(3000,()=>{
    console.log('listening port -3000')
})