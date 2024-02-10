import {createAsyncThunk} from '@reduxjs/toolkit';
 import axios from 'axios';

 export const savedArticle = createAsyncThunk(
    'articles/saveArticle',
    async(articleData)=>{
        const response = await axios.post('http://localhost:3000/api/articles/create',articleData);
        return response.data;
    }
 );
 