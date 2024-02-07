import { configureStore } from '@reduxjs/toolkit';
import { newsApi, cryptonewsApi,forexNewsApi } from '../services/NewsSlice';

const store = configureStore({
    reducer: {
        [newsApi.reducerPath]: newsApi.reducer,
        [cryptonewsApi.reducerPath]: cryptonewsApi.reducer,
        [forexNewsApi.reducerPath]: forexNewsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(newsApi.middleware, cryptonewsApi.middleware,forexNewsApi.middleware),
});

export default store;

