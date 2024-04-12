import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ArticleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    endpoints: (builder) => ({
        getArticle: builder.query({
            query: () => 'api/articles/articles'
          }),
        deleteArticle: builder.mutation({
            query: (title) => ({
                url: `api/articles/remove/${title}`, 
                method: 'DELETE'
            })
        }),
        deleteForexArticle:builder.mutation({
            query:(article_title)=>({
                url:`api/forex/remove/${article_title}`,
                method:'DELETE'
            })
        }),
        deleteCrytoArticle:builder.mutation({
            query:(title)=>({
                url:`api/crypto/remove/${title}`,
                method:'DELETE'
            })
        })
    })
});

export const {
    useDeleteArticleMutation,
    useDeleteForexArticleMutation,
    useDeleteCrytoArticleMutation,
    useGetArticleQuery,
} = ArticleApi;

export { ArticleApi };