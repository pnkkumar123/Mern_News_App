import React from 'react';
import { IoBookmarkOutline } from 'react-icons/io5'; // Assuming IoBookmarkOutline is the correct import for bookmark icon
import { useGetForexNewsQuery } from '../services/NewsSlice';

export default function ForexNews() {
  const { data, isFetching, error } = useGetForexNewsQuery();
  console.log(data);

  return (
    <>
      <div>
        {isFetching ? (
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-800'></div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <div>
            {data && data.data.news.map((curElem) => {
              console.log(curElem);
              const { article_title, article_photo_url, source, post_time_utc, article_url } = curElem;
              const handleUrl = () => {
                window.open(article_url, '_blank');
              };

              return (
                <div key={post_time_utc}>
                  <h2>{article_title}</h2>
                  <img src={article_photo_url ? article_photo_url : './assets/exchange.png'} alt="article" />
                  <button className='bg-blue-700' onClick={handleUrl}>{source}</button>
                  <IoBookmarkOutline />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
