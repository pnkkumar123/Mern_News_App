import express from 'express';
import SavedArticles from '../models/SavedArticles.model.js';;


const articleRouter = express.Router();

articleRouter.post('/create', async (req, res, next) => {
    try {
        // Data extraction
        const { api1, api2, api3,userId } = req.body;

        // Check if data from at least two APIs is available
        if (!api1 && !api2 && !api3) {
            return res.status(400).json({ error: 'Data from at least one API is required' });
        }

        // Create a new document using SavedArticles model
        const newSavedArticle = new SavedArticles({ api1, api2, api3 ,userId});

        // Save the document to the database
        await newSavedArticle.save();

        // Send a success response to the client
        res.status(201).json({ message: 'Saved article created successfully', SavedArticle: newSavedArticle });
    } catch (error) {
        console.error('Error creating saved articles');
        next(error);
    }
});

export default articleRouter;