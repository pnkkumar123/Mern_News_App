import { configureStore } from '@reduxjs/toolkit';
import newsApi from '../services/NewsSlice'; // Assuming newsApi is exported as default from NewsSlice

const store = configureStore({
    reducer: {
        [newsApi.reducerPath]: newsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(newsApi.middleware), // Adding the API middleware
});

export default store;
