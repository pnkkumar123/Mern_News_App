import express from 'express';
import Article from '../models/SavedArticles.model.js';

const articleRouter = express.Router();

articleRouter.post("/save",async (req,res,next)=>{
    try{
        const {author,content,description,publishedAt,source,title,url,urlToImage}  = req.body;

        const article = new Article({
            author,
            content,
            description,
            publishedAt,
            source,
            title,
            url,
            urlToImage
        });
        await article.save();
        res.status(201).json({message:"article saved"})
    }catch(error){
        console.error(error)
        res.status(500).json({error:"Internal server error"})
    }
})
articleRouter.post('/check', async (req, res) => {
    const { title } = req.body; // Assuming title is the identifier for articles

    try {
        // Query the database to check if article with the given title exists
        const existingArticle = await Article.findOne({ title });
        if (existingArticle) {
            // If article exists, send response indicating that it exists
            res.json({ exists: true });
        } else {
            // If article doesn't exist, send response indicating that it doesn't exist
            res.json({ exists: false });
        }
    } catch (error) {
        // Handle errors
        console.error("Error checking for existing article:", error);
        res.status(500).json({ error: "Error checking for existing article" });
    }
});
articleRouter.delete("/remove/:id",async (req,res)=>{
   const articleId = req.params.id;
   try{
    const deleteArticle = await Article.findByIdAndDelete(articleId);
    if(deleteArticle){
        res.json({success:true,message:"article deleted successfully"})
    }else{
        res.status(404).json({success:false,message:"article not found"})
    }
   }catch (error){
    console.error("error deleting article : ",error);
    res.status(500).json({success:false,message:"Error deleting article"})
   }
})
export default articleRouter;
