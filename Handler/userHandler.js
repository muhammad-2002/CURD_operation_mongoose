const mongoose = require('mongoose');
const express = require('express')
const userSchema = require('../Schema/userSchema');
const { hash } = require('bcrypt');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = new mongoose.model('User',userSchema);

//SIGNUP
router.post('/signup',async (req,res)=>{
    try{
        const hashedpassword = await hash(req.body.password, 10)
        const newUser =  new User({
        name:req.body.name,
        userName:req.body.userName,
        password:hashedpassword,
        status:req.body.status
    })
    await newUser.save()
    res.status(200).json({
        "message":"successfully done"
    })

    }catch{
        res.status(500).json({
            "message":"There was an Error"
        })
    }
});

//LOGIN
router.post('/login',async(req,res)=>{
    try{
        const user = await User.find({userName: req.body.userName});
        if(user && user.length> 0){
            const IsPassword = await bcrypt.compare(req.body.password,user[0].password);
            if(IsPassword){
                
                //generate token
                const token = jwt.sign({
                    userName:user[0].userName,
                    userId:user[0]._id
                },process.env.JWT_SECRET,{
                    expiresIn:'1hr'
                })
                res.status(200).json({
                    "access_token":token,
                    "message":"Login Successful"
                })

            }else{
            res.status(401).json("Authentication Error")
        }

        }else{
            res.status(401).json("Authentication Error")
        }
   }catch{
    
        res.status(401).json("Authentication Error")
   }
})
module.exports = router;