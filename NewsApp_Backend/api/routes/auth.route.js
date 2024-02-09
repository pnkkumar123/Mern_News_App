import express from 'express';
import User from '../models/user.model.js'

const authRouter = express.Router();

authRouter.post("/signup",async (req,res,next)=>{
    const {username,email,password} = req.body;
    const newUser = new User ({username,email,password});
    try{
        await newUser.save();
        res.status(201).json({message:"User created sucessfully"});
    }catch(e){
        next(e)
    }
})
authRouter.post('/googlelogin',async(req,res,next)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        
    }
})




export {authRouter}