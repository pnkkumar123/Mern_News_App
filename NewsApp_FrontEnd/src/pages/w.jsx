import React,{useState} from "react";
import { useGetNewsQuery } from "../services/NewsSlice";
import { RiBookMarkFill,RiBookMarkLine } from "react-icons/ri";


export default function WorldNews (){
    const [country, setCountry] = useState('us');
    const {data,isFetching,error} = useGetNewsQuery();
    const [loading, setLoading] = useState(false);
    const [saveError, setSaveError] = useState(null)
    const [savedArticles, setSavedArticles] = useState([])
    const [selectedArticleId, setselectedArticleId] = useState(null)

    const handleCountryChange = (newCountry)=>{
        setCountry(newCountry)
    };
    const isArticleSaved = (article)=>{
        return savedArticles.some(savedArticle =>savedArticle.id === article.id);
        
    };
    const toggleSaveArticle = async (article)=>{
        const isSaved = isArticleSaved(article);

        if(!isSaved && !loading){
            setLoading(true);
            try{
                const response = await fetch('http://localhost:3000/api/articles/save',{
                    method:"POST",
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify([article]),
                });
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                const savedArticleData = await response.json();
                setSavedArticles([...savedArticles,savedArticleData]);
                setLoading(false);
            }catch(error){
                setLoading(false);
                setSaveError('Error saving article: ' + error.message);
                console.error('Error saving article: ' + error);
            }

        }else if (isSaved && !loading){
            // remove article from saved list
            const updatedSavedArticles = savedArticles.filter(savedArticle =>savedArticle.id !== article.id);
            setSavedArticles(updatedSavedArticles);
        }
    };
    return (
        <>
        <div className="p-6 justify-center flex flex-wrap border-b-2 gap-4 border-white ">
            <button className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-100" onClick={()=>handleCountryChange('in')}>India</button>
            <button className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-100" onClick={()=>handleCountryChange('us')}>United States</button>

        </div>
        <div className="flex flex-wrap gap-4 justify-center lg:grid lg:grid-cols-3">
            {isFetching ? }

        </div>
        
        
        </>
    )

}