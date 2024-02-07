import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoHeaders = {
  'X-RapidAPI-Key': import.meta.env.VITE_API_KEY_CRYPTO,
  'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
};

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

const createRequest = (url) => ({ url, headers: cryptoHeaders });

const cryptonewsApi = createApi({
  reducerPath: 'cryptonewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://cryptocurrency-news2.p.rapidapi.com/v1' }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => createRequest('/coindesk')
    })
  })
});

// Exporting hooks for using the API
export const { useGetNewsQuery } = newsApi;
export const { useGetCryptoNewsQuery } = cryptonewsApi;

export { newsApi, cryptonewsApi };
