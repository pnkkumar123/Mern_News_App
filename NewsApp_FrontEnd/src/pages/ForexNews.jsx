import React, { useState } from 'react';
import { IoBookmarkOutline } from 'react-icons/io5'; // Assuming IoBookmarkOutline is the correct import for bookmark icon
import { useGetForexNewsQuery } from '../services/NewsSlice';
import { RiBookMarkFill, RiBookMarkLine } from 'react-icons/ri';

export default function ForexNews() {
  const { data, isFetching, error } = useGetForexNewsQuery();
  const [savedArticles, setSavedArticles] = useState([]);

  const toggleSaveArticle = (article) => {
    if (savedArticles.some(savedArticle => savedArticle.post_time_utc === article.post_time_utc)) {
      setSavedArticles(savedArticles.filter(savedArticle => savedArticle.post_time_utc !== article.post_time_utc));
    } else {
      setSavedArticles([...savedArticles, article]);
    }
  };

  const isArticleSaved = (article) => {
    return savedArticles.some(savedArticle => savedArticle.post_time_utc === article.post_time_utc);
  };

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
                    {isArticleSaved(curElem) ? (
                      <RiBookMarkFill onClick={() => toggleSaveArticle(curElem)} className='text-black cursor-pointer' size={24} />
                    ) : (
                      <RiBookMarkLine onClick={() => toggleSaveArticle(curElem)} className='text-white cursor-pointer' size={24} />
                    )}
                  </div>
                  <p className='absolute bottom-0 left-0 right-0 bg-black hover:cursor-pointer text-white bg-opacity-75 text-center py-2 text-xs' onClick={handleUrl}>{article_title}</p>
                </div>
              );
            })}
        
        
      </div>
    </>
  );
}
