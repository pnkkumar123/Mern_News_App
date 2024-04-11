import { createAsyncThunk } from '@reduxjs/toolkit';

export const savedArticle = createAsyncThunk(
    'articles/saveArticle',
    async (articleData) => {
        try {
            const response = await fetch('http://localhost:3000/api/articles/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(articleData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            throw new Error('Error while saving article: ' + error.message);
        }
    }
);
