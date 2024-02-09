import express from 'express';
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs';

const authRouter = express.Router();

authRouter.post("/signup",async (req,res,next)=>{
    const {username,email,password} = req.body;
   const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User ({username,email,password:hashedPassword});
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
        if(user) {
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password : hashedPassword,...rest} = user._doc;
            const expiryDate = new Date(Date.now() + 3600000);
            res.cookie('acess_token',token,{httpOnly:true,expires:expiryDate}).status(201).json(rest);

        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
            const newUser  = new User ({username:req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(),email:req.body.email,
            password: hashedPassword,profilePicture:req.body.photo
        })
        await newUser.save();
        const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET);
        const {password: hashedPassword2,...rest} = newUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        res.cookie('access_token',token,{
            httpOnly:true,
            expires:expiryDate,
        }).status(201).json(rest);

        }
    }catch(e){
        next(e)
    }
})




export {authRouter}