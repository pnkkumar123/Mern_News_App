import React from 'react'
import {NavLink} from 'react-router-dom';

export default function NavBar() {
  return (
    <>
   <div className='flex flex-row justify-between h-100 border-solid border-white bg-blue-300 p-8 w-auto'>
   <div className='h-10 w-full'>
    <NavLink to='/'>

        <h1 className='font-bold '>FOREX-CRYPTO-WORLD</h1>
    </NavLink>
    </div>
    <div className='flex flex-row justify-center gap-6 font-bold'>
      <NavLink to='/cryptonews'>Crypto </NavLink>
      <NavLink to='/forexnews'>Forex </NavLink>
      <NavLink to='/worldnews'>World </NavLink>
      <NavLink to='/signup'>Sign In </NavLink>

    </div>
   </div>
    </>
  )
}
