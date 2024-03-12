import React, { useState } from "react";
import { useGetNewsQuery } from "../services/NewsSlice";
import { RiBookMarkLine, RiBookMarkFill } from 'react-icons/ri';
import crypto from 'crypto-js';

export default function WorldNews() {
    const [country, setCountry] = useState('us');
    const { data, isFetching, error } = useGetNewsQuery(country);
    console.log(data);

    const [loading, setLoading] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const [savedArticles, setSavedArticles] = useState([]);
    const [selectedArticleId, setSelectedArticleId] = useState(null);

    const handleCountryChange = (newCountry) => {
        setCountry(newCountry);
    };

    const isArticleSaved = (article) => {
        return savedArticles.some(savedArticle => savedArticle.id === article.id);
    };

    const toggleSaveArticle = async (article) => {
        const isSaved = isArticleSaved(article);
        
        if (!isSaved && !loading) {
            setLoading(true);
            try {
                // Send request to save article
                const response = await fetch('http://localhost:3000/api/articles/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify([article]),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const savedArticleData = await response.json();
                setSavedArticles([...savedArticles, savedArticleData]);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setSaveError('Error saving article: ' + error.message);
                console.error('Error saving article: ', error);
            }
        } else if (isSaved && !loading) {
            // Remove article from saved list
            const updatedSavedArticles = savedArticles.filter(savedArticle => savedArticle.id !== article.id);
            setSavedArticles(updatedSavedArticles);
        }
    };

    const hashUrl = (url) => {
        return crypto.SHA256(url).toString(crypto.enc.Hex);
    };

    const handleArticleClick = (articleUrl) => {
        setSelectedArticleId(hashUrl(articleUrl));
    };

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
                    const { url, urlToImage, description, publishedAt } = curElem;
                    console.log(curElem);
                    const id = publishedAt
                    const isSaved = isArticleSaved(curElem);
                    const isSelected = selectedArticleId === id;
                    return (
                        <div key={id} className="relative border border-green-300 rounded-lg shadow-md w-80 h-96 overflow-hidden">
                            <img className="h-full w-full object-cover" src={urlToImage ? urlToImage : "https://www.nccpimandtip.gov.eg/uploads/newsImages/1549208279-default-news.png"} alt="" />
                            <div className="absolute top-0 right-0 p-2">
                                {isSaved ? (
                        <RiBookMarkFill onClick={() => toggleSaveArticle(curElem)} className="text-black cursor-pointer" size={24} />
                      ) : (
                        <RiBookMarkLine onClick={() => toggleSaveArticle(curElem)} className="text-white cursor-pointer" size={24} />
                      )}
                            </div>
                            <p className="absolute bottom-0 left-0 right-0 bg-black text-white bg-opacity-75 text-center py-8 text-xs">{description ? description.slice(0, 130) : description}...</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
