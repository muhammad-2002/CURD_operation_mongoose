const express = require('express')
const router = express.Router();
const todoSchema =require('../Schema/todoSchema')
const mongoose = require('mongoose');
const { result } = require('lodash');

//created ODM
const Todo = new mongoose.model('Todo',todoSchema)

//Method
//GET Active todos with callback
router.get('/active-callback',(req,res)=>{
    const todo = new Todo()
    todo.findActiveCallback()
        .then((data)=>{
            res.status(200).json(data)
        })
   

    

})
//GET Active TODO
router.get('/active',async(req,res)=>{
    const todo = new Todo()
    const data = await todo.findActive()
    res.status(200).json(data,)

    

})
//GET static TODO
router.get('/something', async(req,res)=>{
   const data = await Todo.findByReg();
    res.status(200).json(data);

    

})
//GET static TODO
router.get('/something', async(req,res)=>{
   const data = await Todo.findByReg();
    res.status(200).json(data);

    

})
//GET qurry TODO
router.get('/language',async(req,res)=>{
    const data =await Todo.find().findBylanguage('hero')
    res.status(200).json(data,)
             
    

})
//GET All TODO
router.get('/all',async(req,res)=>{
    await Todo.find({status:"active"}).select({
                _id:0,
                Date:0
              })
              .then((data)=>res.status(200).json(data))
              .catch(err=> res.status(500).json({err:err}))
    

})
//post A TODO
router.post('/',(req,res)=>{
    const newTodo = new Todo(req.body)
    newTodo.save()
           .then(()=>{
            res.status(200).json({error:"Inserted Successfully"})
           })
           .catch(err=>res.status(500).json({error:err}))

})
//POST MULTIPLE  TODO
router.post('/all',async(req,res)=>{
    await Todo.insertMany((req.body))
              .then(()=>res.status(200).json({message:'Successfully done'}))
              .catch(err=> res.status(500).json({err:err}))


})
//put A TODO
//ubdateOne and UbdateUse you can use it
router.put('/:id',async(req,res)=>{
    const result = await Todo
        .findByIdAndUpdate({_id:req.params.id},
        {$set:{status:"active"}},)
        .then(()=>res.status(200).json({message:'Successfully done'}))
        .catch(err=> res.status(500).json({err:err}));
        console.log(result)
        

        
                                                               
},
   

)

//delete A TODO
router.delete('/all/:id',async(req,res)=>{
    await Todo.deleteOne({_id:req.params.id})
      .then(()=>res.status(200).json('deleted successfully'))
      .catch(err=> res.status(500).json({err:err}))


})
//delete All TODO
router.delete('/all',async(req,res)=>{
    await Todo.deleteMany({status:'active'})
      .then(()=>res.status(200).json('deleted successfully'))
      .catch(err=> res.status(500).json({err:err}))


})

module.exports =router;
