import React, { useState } from 'react';
import { useGetCryptoNewsQuery } from '../services/NewsSlice';
import { RiBookMarkLine, RiBookMarkFill } from 'react-icons/ri';
import { useDeleteCrytoArticleMutation } from '../services/ArticleSlice';

export default function CryptoNews() {
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(10);
  const [deleteArticle] = useDeleteCrytoArticleMutation()
  const [savedArticles, setSavedArticles] = useState([]);
  const { data, isFetching, error } = useGetCryptoNewsQuery();
console.log(data);
  // const handleUrl = (articleUrl) => {
  //   window.open(articleUrl, '_blank');
  // };


  // delete function
  const handleDelete = (title)=>{
    deleteArticle(title)
    .unwrap()
    .then(()=>{
      console.log("article deleted successfully")
    })
    .catch((e)=>{
      console.log(e)

    })
  }


  const saveArticle = async ( url,
    thumbnail,
    createdAt,
    description,
    title) => {
    try {
        const existingArticleResponse = await fetch('http://localhost:3000/api/crypto/check', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title
            })
        });

        if (!existingArticleResponse.ok) {
            throw new Error("Error checking for existing article.");
        }

        const existingArticleData = await existingArticleResponse.json();
        if (existingArticleData.exists) {
            console.log("Article already saved. Do not add it again.");
            return;
        }

        const response = await fetch('http://localhost:3000/api/crypto/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url,
              thumbnail,
              createdAt,
              description,
              title
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
                const { title, thumbnail, createdAt, description, url } = curElem;
                return (
                  <div key={createdAt} className="relative border border-green-300 rounded-lg shadow-md overflow-hidden lg:col-span-1">
                    <img className="h-64 w-full object-cover" src={thumbnail ? thumbnail : './assets/bitcoin.png'} alt="" />
                    <div className="absolute top-0 right-0 p-2">
                 
                        <RiBookMarkFill onClick={() => handleDelete(title)} className="text-black cursor-pointer" size={24} />
                   
                        <RiBookMarkLine onClick={() => saveArticle( url,
        thumbnail,
        createdAt,
        description,
        title)} className="text-white cursor-pointer" size={24} />
                    
                    </div>
                    <p className="absolute bottom-0 left-0 right-0 bg-black text-white bg-opacity-75 text-center py-2 text-xs">{description ? description.slice(0, 90) : description}</p>
                  </div>
                );
              })}
          
        
      </div>
    </>
  );
}
