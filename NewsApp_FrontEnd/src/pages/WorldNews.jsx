import React, { useState } from "react";
import { useGetNewsQuery } from "../services/NewsSlice";
import { RiBookMarkLine, RiBookMarkFill } from 'react-icons/ri';
import crypto from 'crypto-js';
import { useDeleteArticleMutation, useGetArticleQuery } from "../services/ArticleSlice";

export default function WorldNews() {
    const [country, setCountry] = useState('us');
    const { data, isFetching, error } = useGetNewsQuery(country);
    console.log(data);
    


    
    const [deleteArticle] = useDeleteArticleMutation()
     
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


    const [loading, setLoading] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const [savedArticles, setSavedArticles] = useState([]);
    const [selectedArticleId, setSelectedArticleId] = useState(null);



    const handleCountryChange = (newCountry) => {
        setCountry(newCountry);
    };
    
    // const isArticleSaved = (article) => {
    //     return savedArticles.some(savedArticle => savedArticle.id === article.id);
    // };
    const saveArticle = async (author, content, description, publishedAt, source, title, url, urlToImage) => {
        try {
            // Check if the article already exists in the database
            const existingArticleResponse = await fetch('http://localhost:3000/api/articles/check', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title
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
            const response = await fetch('http://localhost:3000/api/articles/save', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    author,
                    content,
                    description,
                    publishedAt,
                    source,
                    title,
                    url,
                    urlToImage
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
            <div className="p-6 justify-center  flex flex-wrap border-b-2 gap-4 border-white">
                <button className='bg-blue-500 py-2 px-4 rounded hover:bg-blue-100' onClick={() => handleCountryChange('in')}>India</button>
                <button className='bg-blue-500 py-2 px-4 rounded hover:bg-blue-100' onClick={() => handleCountryChange('us')}>United States</button>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center lg:grid lg:grid-cols-3">
                {isFetching ? (
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 justify-center flex flex-wrap border-gray-900"></div>
                ) : error ? (
                    <div>Error : {error.message}</div>
                ) : null}

                {data && data.articles.map((curElem) => {
                    const {      author,
                        content,
                        description,
                        publishedAt,
                        source,
                        title,
                        url,
                        urlToImage } = curElem;
                    
               
                   
                    return (
                        <div key={publishedAt} className="relative border border-green-300 rounded-lg shadow-md w-80 h-96 overflow-hidden">
                            <img className="h-full w-full object-cover" src={urlToImage ? urlToImage : "https://www.nccpimandtip.gov.eg/uploads/newsImages/1549208279-default-news.png"} alt="" />
                            <div className="absolute top-0 right-0 p-2">
                            
    
                            <RiBookMarkLine onClick={() => saveArticle(author,content,
                                    description,
                                    publishedAt,
                                    source,
                                    title,
                                    url,
                                    urlToImage)} className="text-white cursor-pointer" size={24} />
  
                             <RiBookMarkFill onClick={()=> handleDelete(title)}/>
                      
                     
                 
                            </div>
                            <p className="absolute bottom-0 left-0 right-0 bg-black text-white bg-opacity-75 text-center py-8 text-xs">{description ? description.slice(0, 130) : description}...</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
