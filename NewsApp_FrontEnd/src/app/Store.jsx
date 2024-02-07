import { configureStore } from '@reduxjs/toolkit';
import { newsApi, cryptonewsApi } from '../services/NewsSlice';

const store = configureStore({
    reducer: {
        [newsApi.reducerPath]: newsApi.reducer,
        [cryptonewsApi.reducerPath]: cryptonewsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(newsApi.middleware, cryptonewsApi.middleware),
});

export default store;

