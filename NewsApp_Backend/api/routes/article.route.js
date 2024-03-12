import express from 'express';
import Article from '../models/SavedArticles.model.js';

const articleRouter = express.Router();

export const saveArticle = async (req, res, next) => {
    try {
        const articlesData = req.body; // Assuming an array of articles is sent in the request body

        // Array to store saved articles
        const savedArticles = [];

        // Iterate over each article data
        for (const articleData of articlesData) {
            const { author, content, description, publishedAt, source, title, url, urlToImage } = articleData;

            // Create a new article instance
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

            // Save the article
            const savedArticle = await article.save();
            
            savedArticles.push(savedArticle);
        }

        res.status(201).json({ message: 'Articles saved successfully', articles: savedArticles });
    } catch (error) {
        console.error('Error saving articles:', error);
        next(error);
    }
};

articleRouter.post('/save', saveArticle);

export default articleRouter;
