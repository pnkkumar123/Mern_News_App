import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

const fetchNews = createAsyncThunk ('news/fetchNews',async ()=>{
    const url = 'https://news67.p.rapidapi.com/v2/country-news?fromCountry=gb&onlyInternational=true';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
            'X-RapidAPI-Host': 'news67.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result
        console.log(result);
    } catch (error) {
        console.error(error);
    }

});

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        data: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchNews.pending,(state)=>{
            state.status = 'loading';
        })
        .addCase(fetchNews.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(fetchNews.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
    },
});
export {fetchNews};
export default newsSlice.reducer;