import React, { useState } from 'react';
import { useGetCryptoNewsQuery } from '../services/NewsSlice';

export default function CryptoNews() {
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(10);

  const { data, isFetching, error } = useGetCryptoNewsQuery();

  // Calculate indexes of the articles to display for the current page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = data?.data?.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <div>
        {isFetching ? (
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-800'></div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <div>
            {currentArticles &&
              currentArticles.map((curElem) => {
                const { title, thumbnail, createdAt, description } = curElem;
                return (
                  <div key={createdAt}>
                    <h2>{title}</h2>
                    <img src={thumbnail ? thumbnail : '.\assets\bitcoin.png'} alt="" />
                    <p>{description ? description.slice(0, 90) : description}</p>
                  </div>
                );
              })}
            {/* Pagination */}
            <ul className="pagination">
              {Array.from({ length: Math.ceil(data?.data?.length / articlesPerPage) }, (_, index) => (
                <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                  <button onClick={() => paginate(index + 1)} className="page-link">
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

