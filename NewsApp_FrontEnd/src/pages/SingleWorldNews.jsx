import React from 'react';
import { useGetArticleQuery } from '../services/ArticleSlice';
import { useParams } from 'react-router-dom';
import { useGetSingleNewsQuery } from '../services/NewsSlice';

function SingleWorldNews() {
    const { title } = useParams();
    const { data, isFetching, error } = useGetSingleNewsQuery(title)

    if(isFetching) return <div>loading....</div>
    if(error) return <div>error...</div>

if (!data) {
    return <div>No data available</div>;
}
    
const article = data?.articles[0];
if(!article){
    return <div>no article found</div>
}
const {publishedAt,title:articleTitle,description,urlToImage} = article;
    return (
        <div>
          <h3>{articleTitle}</h3>
           
        </div>
    );
}

export default SingleWorldNews;
