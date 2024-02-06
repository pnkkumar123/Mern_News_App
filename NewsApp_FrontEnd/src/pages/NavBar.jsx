import React from 'react'
import {NavLink} from 'react-router-dom';

export default function NavBar() {
  return (
    <>
   <div className='flex flex-row justify-between'>
   <div className='h-10 w-full'>
    <NavLink to='/'>

        <img src='.\public\Assets\logo.png' loading='lazy' className='h-10 w-30' alt="" />
    </NavLink>
    </div>
    <div className='flex flex-row justify-center gap-6 font-bold'>
      <NavLink to='/cryptonews'>Crypto </NavLink>
      <NavLink to='/forexnews'>Forex </NavLink>
      <NavLink to='/worldnews'>World </NavLink>

    </div>
   </div>
    </>
  )
}
