import React, { useState, useEffect } from 'react';
import { useGetForexNewsQuery } from '../services/NewsSlice';

export default function ForexSlider() {
  const { data, isFetching, error } = useGetForexNewsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (data?.data?.news.length || 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? data?.data?.news.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (data?.data?.news.length || 1));
  };

  return (
    <>
      {isFetching ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="flex items-center justify-center  relative h-auto">
          <button onClick={goToPrev} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-500 px-3 py-1 rounded-md">
            {'<'}
          </button>
          <div className="overflow-x-scroll flex ">
            {data?.data?.news.map((curElem, index) => (
              <div key={curElem.post_time_utc} className="w-1/4 flex-shrink-0  ">
                <img src={curElem.article_photo_url} alt="" className="w-full h-auto rounded-lg" />

                <div className="bg-black bg-opacity-50 text-white text-center p-2">
                  {curElem.article_title}
                </div>
              </div>
            ))}
          </div>
          <button onClick={goToNext} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-500 px-3 py-1 rounded-md">
            {'>'}
          </button>
        </div>
      )}
    </>
  );
}
