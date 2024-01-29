const mongoose =require('mongoose')
const todoSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    status:{
        type:String,
        enum:['active','inactive']
    },
    Date:{
        type:Date,
        default:Date.now
    }
})

module.exports = todoSchema;