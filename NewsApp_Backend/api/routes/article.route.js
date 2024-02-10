import express from 'express';
import SavedArticles from '../models/SavedArticles.model.js';;


const articleRouter  = express.Router();

// defined route handlers for article end points

articleRouter.post('/create',async(req,res,next)=>{
    try{
        // data extracted
        const {api1,api2,api3} = req.body;

     // Check if data from at least two APIs is available
     if ((!api1 && !api2 && !api3) || (api1 && !api2 && !api3) || (!api1 && api2 && !api3) || (!api1 && !api2 && api3)) {
        return res.status(400).json({ error: 'Data from at least two APIs is required' });
      }
      

        // create a new document usin savedarticle model
        const newSavedArticle = new SavedArticles({api1,api2,api3});

        // save the document to database
        await newSavedArticle.save();

        
        
        // send a suces response to the client
         res.status(201).json({message: 'Saved article created successfully',SavedArticle: newSavedArticle})
    }catch(error){
        console.error('error creating saved artickes');
        next(error)
    }
});
export default articleRouter;