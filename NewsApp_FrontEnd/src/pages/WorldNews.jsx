
import { useState } from "react";
import { useGetNewsQuery } from "../services/NewsSlice";

export default function WorldNews() {
    const [country,setCountry] = useState('us')
    const {data,isFetching,error} = useGetNewsQuery(country);

    const handleCountryChange = (newCountry)=>{
        setCountry(newCountry)
    }
    console.log(data);
    

    return (
        <>
        <div className="flex justify-center items-center h-screen">
            {isFetching ? (
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" ></div>
            ): error ? (
                <div>Error : {error.message}</div>
            ):(
            <div>
                <button onClick={()=>handleCountryChange('in')}>India</button>
            </div>
            )}
            {/* Move the closing parenthesis here */}
            {data && data.articles.map((curElem)=>{
                const {urlToImage,description,publishedAt} = curElem;
                console.log(curElem);
                return(
                        <div key={publishedAt}>
                            <img src={urlToImage ? urlToImage : <img src="https://www.nccpimandtip.gov.eg/uploads/newsImages/1549208279-default-news.png" alt="news"/>} alt="" />
                               <p>{description ?description.slice(0,100) : description}...</p>
                        </div>
                )
            })}
        </div>
        </>
    );
}
