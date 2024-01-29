const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./Handler/todoHandler')

//initialization express
const app = express();
app.use(express.json())
//connection with mongoose
mongoose.connect('mongodb://localhost/todo')
        .then(()=>console.log("Connection was Successful"))
        .catch((err)=>console.log(`This is an ${err}`))

// application routes 
app.use('/todo',todoHandler)
// default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ error: err });
  }

//listening server
app.listen(3000,()=>{
    console.log("listening port -3000")
})