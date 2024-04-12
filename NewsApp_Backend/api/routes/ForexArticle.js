import express from 'express';
import forex from '../models/ForexArticle.js';


const appRouting = express.Router();

appRouting.post("/add",async (req,res)=>{
  try{
    const { article_photo_url,article_title,article_url,post_time_utc,source} = req.body;

    const article = new forex({
        article_photo_url,
        article_title,
        article_url,
        source,
        post_time_utc
    })
    await article.save();
    res.status(201).json({message:"article added"})
  }catch(e){
    res.status(500).json({message:"error",e})
  }
})
appRouting.post("/check",async(req,res)=>{
  const {article_title} = req.body;
  try{
    const existingArticle = await forex.findOne({article_title});
    if(existingArticle){
      res.json({exists:true});
    }else{
      res.json({exists:false})
    }
  }catch(e){
    res.status(500).json({message:"error",e})
  }
})
appRouting.delete("/remove/:article_title",async(req,res)=>{
  try{
const {article_title} = req.params;
const deletedArticle = await forex.findOneAndDelete({article_title});
if(deletedArticle){
  res.json({success:true,message:"article deleted successfully"})
}else{
  res.status(404).json({success:false,message:"article not found"})
}
  }catch(e){
    console.log(e)
    res.status(500).json({success:false,message:e})
  }
})
export default appRouting;