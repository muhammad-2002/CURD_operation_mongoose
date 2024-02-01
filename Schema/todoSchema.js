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
//custom instance method
todoSchema.methods={
    findActive:()=>{
        return mongoose.model('Todo').find({status:'active'})
    },
    findActiveCallback:()=>{
        return mongoose.model('Todo').find({status:'active'})
    }
}

//custom static method
todoSchema.statics={
    findByReg:function(){
        return this.find({title: /something/i})
    }
}

//query helper
todoSchema.query={
    findBylanguage:function(language){
        return this.find({ title: new RegExp(language,'i')})
    }
}

module.exports = todoSchema;