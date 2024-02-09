import React from 'react';
import Auth from '../auth/Auth';
import { signInFailure,signInSucess,signInStart } from '../services/UserSlice';}

export default function SignIn() {
  return (
    <>
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form action="" className='flex flex-col gap-4'>
         
          <input type="email" className='bg-blue-100 p-3 rounded-lg' name="email" id="email" placeholder='email'/>
          <input type="password" name="password" className='bg-blue-100' placeholder='password' id="password" />
          <button className='bg-blue-500 text-white p-3 rounded uppercase hover:opacity-95 disabled:opacity-85' >Sign In</button>
          <Auth/>
        </form>
    </div>

    </>
  )
}
