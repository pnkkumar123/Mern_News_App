import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoHeaders = {
  'X-RapidAPI-Key': import.meta.env.VITE_API_KEY_CRYPTO,
  'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
};
const forexHeaders = {
    'X-RapidAPI-Key':  import.meta.env.VITE_API_KEY_FOREX ,
    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
  }

const apiKey = import.meta.env.VITE_API_KEY;
const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/' }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: (country) => `top-headlines?country=${country}&apiKey=${apiKey}`
    }),
    getSingleNews:builder.query({
         query:(title)=>`everything?q=${encodeURIComponent(title)}&apiKey=${apiKey}`
    }),
    getSearch:builder.query({
      query:(searchTerm)=>`everything?q=${searchTerm}&apiKey=${apiKey}`
    })
  })
});

const createCryptoRequest = (url) => ({ url, headers: cryptoHeaders });

const cryptonewsApi = createApi({
  reducerPath: 'cryptonewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://cryptocurrency-news2.p.rapidapi.com/v1' }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => createCryptoRequest('/coindesk')
    })
  })
});
const createForexRequest = (url)=> ({url,headers: forexHeaders})
const forexNewsApi = createApi({
    reducerPath: 'forexNewsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://real-time-finance-data.p.rapidapi.com'}),
    endpoints: (builder)=>({
        getForexNews : builder.query({
            query:()=> createForexRequest('/currency-news?from_symbol=USD&to_symbol=EUR&language=en')
        })
    })
})

// Exporting hooks for using the API
export const { useGetNewsQuery,useGetSingleNewsQuery,useGetSearchQuery} = newsApi;
export const { useGetCryptoNewsQuery } = cryptonewsApi;
export const {useGetForexNewsQuery} = forexNewsApi;

export { newsApi, cryptonewsApi, forexNewsApi };
