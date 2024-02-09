import { useState } from "react";
import { useGetNewsQuery } from "../services/NewsSlice";
import { RiBookMarkLine, RiBookMarkFill } from 'react-icons/ri';

export default function WorldNews() {
    const [country, setCountry] = useState('us');
    const { data, isFetching, error } = useGetNewsQuery(country);
    console.log(data);
    const [savedArticles, setSavedArticles] = useState([]);

    const handleCountryChange = (newCountry) => {
        setCountry(newCountry);
    };

    const toggleSaveArticle = (article) => {
        if (savedArticles.some(savedArticle => savedArticle.publishedAt === article.publishedAt)) {
            // If article is already saved, remove it from saved articles
            setSavedArticles(savedArticles.filter(savedArticle => savedArticle.publishedAt !== article.publishedAt));
        } else {
            // If article is not saved, add it to saved articles
            setSavedArticles([...savedArticles, article]);
        }
    };

    const isArticleSaved = (article) => {
        // Check if article is saved
        return savedArticles.some(savedArticle => savedArticle.publishedAt === article.publishedAt);
    };

    return (
        <>
            <div className="p-6 justify-center  flex flex-wrap border-b-2 gap-4 border-white">
                <button className='bg-blue-500 py-2 px-4 rounded hover:bg-blue-100' onClick={() => handleCountryChange('in')}>India</button>
                <button className='bg-blue-500 py-2 px-4 rounded hover:bg-blue-100'  onClick={() => handleCountryChange('us')}>United States</button>

            </div>
            <div className="flex flex-wrap gap-4 justify-center lg:grid lg:grid-cols-3">
                {isFetching ? (
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 justify-center flex flex-wrap border-gray-900"></div>
                ) : error ? (
                    <div>Error : {error.message}</div>
                ) : null}

                {data && data.articles.map((curElem) => {
                    const { urlToImage, article_title,description, publishedAt } = curElem;
                    return (
                        <div key={publishedAt} className="relative border border-green-300 rounded-lg shadow-md w-80 h-96 overflow-hidden">
                            <img className="h-full w-full object-cover" src={urlToImage ? urlToImage : "https://www.nccpimandtip.gov.eg/uploads/newsImages/1549208279-default-news.png" } alt="" />
                            <div className="absolute top-0 right-0 p-2">
                                {isArticleSaved(curElem) ? (
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
