const express =require('express');
const mongoose = require('mongoose');
const todoHandler = require('./Handler/todoHandler')

//connect with mongoose app
mongoose.connect('mongodb://localhost/todo')
        .then(()=>console.log("connected successfully"))
        .catch((err)=>console.log("connection is massing"))

//create app
const app = express();
app.use(express.json());
app.use('/todo',todoHandler)

//default error handling
function errHandler(err,req,res,next){
    if(err.headersSent){
        return next(err)
        
    }
    res.status(500).json({error:"There was a server side Error"})
}
//listen port
app.listen(3000,()=>{
    console.log('listening port -3000')
})