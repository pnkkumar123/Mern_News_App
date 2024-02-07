import React from 'react';
import ForexSlider from './ForexSlide';
import WorldSlide from './WorldSlide';

export default function Home() {
  return (
    <div className="flex flex-col h-screen  p-35  w-screen top-0">
      {/* Navbar */}
    
      
      {/* Gap */}
      
      <div className='flex flex-wrap justify-center p-2'
      ><h5 className='bg-blue-400 rounded-lg px-6 py-4' >FOREX</h5></div>
      <div className="flex-1 h-auto ">
        <ForexSlider />
      </div>
      <div className='flex flex-wrap justify-center p-2'>
        <h5 className='bg-blue-400 rounded-lg px-6 py-4'>CRYPTO</h5>
      </div>
      <div className="h-6"></div>
      <div className="flex-1 h-auto ">
        <WorldSlide />
      </div>
    </div>
  );
}


