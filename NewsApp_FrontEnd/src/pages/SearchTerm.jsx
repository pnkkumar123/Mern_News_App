import React, { useEffect, useState } from 'react'
import { useGetSearchQuery } from '../services/NewsSlice'


function SearchTerm() {
    const [searchTerm,setSearchTerm] = useState("bitcoin")
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('bitcoin');
    const { data, isFetching, error } = useGetSearchQuery(debouncedSearchTerm);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 2000); // Adjust the debounce delay as needed

        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);
    const handleKeyPress = (e)=>{
        if(e.key === 'Enter'){
            setSearchTerm(e.target.value)
        }
    }
  return (
    <div>
        <div className="input">
            <input type="text" name="input" onKeyDown={handleKeyPress} placeholder='write something' id="input" onChange={(e)=>setSearchTerm(e.target.value)} />
        </div>
        <div className="result">
            {data?.articles && data?.articles.map((curElem,index)=>{
                const {urlToImage,url,title,content,source,publishedAt} = curElem;
                return(
                   <>
                    <div key={index}>
                        <li >
                        <img className='h-40 w-40 object-cover' src={urlToImage} alt={title} />
                      {content ? (<p>{content.slice(0,120)}...</p>) : "no content"}  
                        <span>{title}</span>
                        </li>
                      

                    </div>
                   </>

                )
            })}
        </div>
    </div>
  )
}

export default SearchTerm