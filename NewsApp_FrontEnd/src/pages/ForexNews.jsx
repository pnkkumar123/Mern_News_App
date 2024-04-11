import React, { useState } from 'react';
import { IoBookmarkOutline } from 'react-icons/io5'; 
import { useGetForexNewsQuery } from '../services/NewsSlice';
import { RiBookMarkFill, RiBookMarkLine } from 'react-icons/ri';
import { useDeleteArticleMutation } from '../services/ArticleSlice';

export default function ForexNews() {
  const { data, isFetching, error } = useGetForexNewsQuery();
  console.log(data);
 
const [deleteArticle] = useDeleteArticleMutation();

  const handleDelete = (title)=>{
    deleteArticle(title)
    .unwrap()
    .then(()=>{
        console.log("product deleted successfully")
      
    })
    .catch((error)=>{
        console.log("error deleting product")
    })
}

  const saveArticle = async (article_title, article_photo_url, source, post_time_utc, article_url) => {
    try {
        // Check if the article already exists in the database
        const existingArticleResponse = await fetch('http://localhost:3000/api/forex/check', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              article_title:  article_title
            })
        });

        if (existingArticleResponse.ok) {
            const existingArticleData = await existingArticleResponse.json();
            if (existingArticleData.exists) {
                console.log("Article already saved. Do not add it again.");
                return; // Exit the function if article already exists
            }
        } else {
            console.log("Error checking for existing article.");
            return; // Exit the function if error occurred while checking for existing article
        }
        // If article does not exist, proceed to save it
        const response = await fetch('http://localhost:3000/api/forex/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              article_title, article_photo_url, source, post_time_utc, article_url
            })
        });

        if (response.ok) {
         
            console.log("Article added successfully.");
        } else {
            console.log("Error adding article.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


  
  return (
    <>
      <div className='grid gap-4 justify-center lg:grid-cols-3'>
        {isFetching ? (
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-800'></div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : null}
          
            {data && data.data.news.map((curElem, index) => {
              const { article_title, article_photo_url, source, post_time_utc, article_url } = curElem;

              const handleUrl = () => {
                window.open(article_url, '_blank');
              };

              return (
                <div key={post_time_utc} className={`relative border border-green-300 rounded-lg shadow-md overflow-hidden lg:col-span-1 ${index < 3 ? 'lg:flex lg:flex-row' : ''}`}>
                 
                  <img className='h-64 w-full object-cover' src={article_photo_url ? article_photo_url : './assets/exchange.png'} alt="article" />
                  <div className='absolute top-0 right-0 p-2'>
                 
                      <RiBookMarkFill onClick={() =>handleDelete({title:article_title})} className='text-black cursor-pointer' size={24} />
                  
                      <RiBookMarkLine onClick={() => saveArticle( article_title, article_photo_url, source, post_time_utc, article_url)} className='text-white cursor-pointer' size={24} />
                   
                  </div>
                  <p className='absolute bottom-0 left-0 right-0 bg-black hover:cursor-pointer text-white bg-opacity-75 text-center py-2 text-xs' onClick={handleUrl}>{article_title}</p>
                </div>
              );
            })}
        
        
      </div>
    </>
  );
}
