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
                url: `api/articles/remove/${title}`, // Modify the URL to include the article ID
                method: 'DELETE'
            })
        }),
    })
});

export const {
    useDeleteArticleMutation,
    useGetArticleQuery,
} = ArticleApi;

export { ArticleApi };