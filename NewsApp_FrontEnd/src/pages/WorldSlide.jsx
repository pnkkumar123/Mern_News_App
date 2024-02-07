import React, { useState, useEffect, useRef } from 'react';
import { useGetCryptoNewsQuery } from '../services/NewsSlice';

export default function CryptoSlide() {
  const { data, isFetching, error } = useGetCryptoNewsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideContainerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    const newIndex = (currentIndex === 0) ? data?.data.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % (data?.data.length || 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollToIndex = (index) => {
    const containerWidth = slideContainerRef.current.offsetWidth;
    const cardWidth = slideContainerRef.current.children[0].offsetWidth;
    const scrollDistance = cardWidth * index - containerWidth / 2 + cardWidth / 2;
    slideContainerRef.current.scrollLeft = scrollDistance;
  };

  return (
    <>
      {isFetching ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="flex items-center justify-center  relative gap-20 h-auto  ">
          <button onClick={goToPrev} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-500 px-3 py-1 rounded-md">
            {'<'}
          </button>
          <div ref={slideContainerRef} className="overflow-x-auto flex">
            {data?.data.map((curElem, index) => (
              <div key={curElem.createdAt} className="w-1/4 flex-shrink-0">
                <img src={curElem.thumbnail} alt="" className="w-full rounded-lg" />
                <div className="bg-black bg-opacity-50 text-white text-center p-2">
                  {curElem.title}
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
