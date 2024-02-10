import {createSlice} from '@reduxjs/toolkit';
import { savedArticle } from '../actions/Article.Action';

const articleSlice = createSlice({
    name:'articles',
    initialState:{
        loading: false,
        error:null,
        savedArticle:null,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(savedArticle.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(savedArticle.fulfilled,(state,action)=>{
            state.loading = false;
            state.savedArticle = action.payload;

        })
        .addCase(savedArticle.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
    }
})
export default articleSlice.reducer;