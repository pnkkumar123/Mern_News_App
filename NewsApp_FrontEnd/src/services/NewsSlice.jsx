import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = import.meta.env.VITE_API_KEY;
const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/' }),
    endpoints: (builder) => ({
        getNews: builder.query({
            query: (country) => `top-headlines?country=${country}&apiKey=${apiKey}`
        })
    })
});

// Exporting hooks for using the API
export const { useGetNewsQuery } = newsApi;

export default newsApi;

