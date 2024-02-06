import  { useEffect } from 'react'
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux'
import { fetchNews } from '../State-management/NewsSlice';

export default function WorldNews() {
    const dispatch = useDispatch();
    const newsData = useSelector((state)=>state.news.data);
    console.log(newsData);
    const status = useSelector((state)=>state.news.status);
    const error = useSelector((state)=>state.news.error);
  useEffect(()=>{
    if(status === 'idle'){
        dispatch(fetchNews());
    }
  },[status,dispatch]);
  if (status === 'loading'){
    return <div>Loading....</div>
  }
  if(status === 'failed'){
    return <div>Error: {error}</div>
  }

    return (
       <>
       <div>
       {newsData && newsData.news.map((curElem)=>{
        const {Title,Image,Description,PublishedOn} = curElem;
        console.log(Title);
        return (
            <div id={PublishedOn}>
               <div className='flex fle-col gap-3 h-50 w-50 justify-center'>
               <h1></h1>
               <img src={Image} alt="" className='h-40 w-40' />
               <p>{Title.slice(0,70)}</p>
               </div>
            </div>
        )
       })}
       </div>
       </>
  )
}
