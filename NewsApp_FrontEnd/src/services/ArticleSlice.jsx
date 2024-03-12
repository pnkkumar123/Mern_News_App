// import { createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';

// export const savedArticle = createAsyncThunk(
//     'articles/create',
//     async (articleData) => {
//         try {
//             const response = await fetch('http://localhost:3000/api/articles/save', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(articleData),
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const data = await response.json();
//             return data;
//         } catch (error) {
//             throw new Error('Error while saving article: ' + error.message);
//         }
//     }
// );

// const articleSlice = createSlice({
//     name: 'articles',
//     initialState: {
//         loading: false,
//         error: null,
//         savedArticles: [], // Initialize savedArticles as an empty array
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(savedArticle.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(savedArticle.fulfilled, (state, action) => {
//                 state.loading = false;
//                 const articleData = action.payload;
//                 state.savedArticles.push({
//                     author: articleData.author,
//                     content: articleData.content,
//                     description: articleData.description,
//                     publishedAt: articleData.publishedAt,
//                     source: articleData.source,
//                     title: articleData.title,
//                     url: articleData.url,
//                     urlToImage:articleData.urlToImage,
//                     // Add other properties as needed
//                 });
//             })
//             .addCase(savedArticle.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             });
//     },
// });

// export default articleSlice.reducer;
