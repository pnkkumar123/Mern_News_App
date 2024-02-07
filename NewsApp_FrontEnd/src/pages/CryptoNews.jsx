import React, { useState } from 'react';
import { useGetCryptoNewsQuery } from '../services/NewsSlice';
import { RiBookMarkLine, RiBookMarkFill } from 'react-icons/ri';

export default function CryptoNews() {
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(10);
  const [savedArticles, setSavedArticles] = useState([]);
  const { data, isFetching, error } = useGetCryptoNewsQuery();

  // const handleUrl = (articleUrl) => {
  //   window.open(articleUrl, '_blank');
  // };

  const toggleSaveArticle = (article) => {
    if (savedArticles.some(savedArticle => savedArticle.createdAt === article.createdAt)) {
      setSavedArticles(savedArticles.filter(savedArticle => savedArticle.createdAt !== article.createdAt));
    } else {
      setSavedArticles([...savedArticles, article]);
    }
  };

  const isArticleSaved = (article) => {
    return savedArticles.some(savedArticle => savedArticle.createdAt === article.createdAt);
  };

  const currentArticles = data?.data?.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage);

  return (
    <>
      <div className="grid gap-4 justify-center lg:grid-cols-3">
  {isFetching ? (
    <div className="relative h-32 w-32 border-b-2 border-gray-800 flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-800"></div>
    </div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : null}
          
            {currentArticles &&
              currentArticles.map((curElem) => {
                const { title, thumbnail, createdAt, description, articleUrl } = curElem;
                return (
                  <div key={createdAt} className="relative border border-green-300 rounded-lg shadow-md overflow-hidden lg:col-span-1">
                    <img className="h-64 w-full object-cover" src={thumbnail ? thumbnail : './assets/bitcoin.png'} alt="" />
                    <div className="absolute top-0 right-0 p-2">
                      {isArticleSaved(curElem) ? (
                        <RiBookMarkFill onClick={() => toggleSaveArticle(curElem)} className="text-black cursor-pointer" size={24} />
                      ) : (
                        <RiBookMarkLine onClick={() => toggleSaveArticle(curElem)} className="text-white cursor-pointer" size={24} />
                      )}
                    </div>
                    <p className="absolute bottom-0 left-0 right-0 bg-black text-white bg-opacity-75 text-center py-2 text-xs">{description ? description.slice(0, 90) : description}</p>
                  </div>
                );
              })}
          
        
      </div>
    </>
  );
}
