import express from 'express';
import Crypto from '../models/Crypto.js';

const cryptoRoute = express.Router();

cryptoRoute.post("/add",async(req,res)=>{
   try{
    const {url,thumbnail,createdAt,description,title} = req.body;

    const crypto = new Crypto({
        url,
        thumbnail,
        createdAt,
        description,
        title
    })
    await crypto.save();
    res.status(201).json({message:"article saved successfully"})
   }catch(e){
    res.status(500).json({message:"error while saving article"})
   }
})
cryptoRoute.post("/check", async (req, res) => {
    try {
        const { title } = req.body;

        const existingArticle = await Crypto.findOne({ title });

        if (existingArticle) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        if (error.name === 'MongoError') {
            // Handle MongoDB related errors
            res.status(500).json({ message: "MongoDB error occurred while checking for existing article" });
        } else {
            // Handle other unexpected errors
            res.status(500).json({ message: "Unexpected error occurred while checking for existing article" });
        }
    }
});
cryptoRoute.delete("/remove/:title",async (req,res)=>{
    try{
        const {title} = req.params;
        const deletedArticle = await Crypto.findOneAndDelete({title});
        if(deletedArticle){
            res.json({success:true,message:"article added successfully"})
        }else{
            res.status(404).json({success:false,message:"article not found"})
        }
    }catch(e){
        console.log(e);
        res.status(500).json({success:false,message:"error saving article"})

    }
})

export default cryptoRoute;