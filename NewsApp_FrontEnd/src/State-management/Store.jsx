import {configureStore} from '@reduxjs/toolkit';
import newsReducer ,{fetchNews} from './NewsSlice';

const store = configureStore({
    reducer:{
        news: newsReducer,
    },
});
store.dispatch(fetchNews());

export default store;