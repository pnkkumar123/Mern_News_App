import React, { useState } from 'react'
import Auth from '../auth/Auth';
import SignIn from './SignIn';
import {Link} from 'react-router-dom';

export default function SignUp() {
    const [formData,setFormData] = useState({
        username: '',
        email:'',
        password:'',
    });
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);
    const handleChange = (e)=>{
        setFormData({...formData,[e.target.id]:e.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            setError(false);
            const res  = await fetch('http://localhost:3000/api/auth/signup',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            setLoading(false);
            if(data.sucess === false){
                setError(true);
                return;
            }
        
        }catch(error){
            setLoading(false);
            setError(true);
        }
    }
  return (
    <>
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
       <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
       <input onChange={handleChange} type="text" placeholder='username' name='username' id='username' className='bg-blue-100 p-3 rounded-lg' />
        <input onChange={handleChange} type="email" placeholder='email' className='bg-blue-100 p-3 rounded-lg' name='email' id='email'/>
        <input onChange={handleChange} type="password" placeholder='password' className='bg-blue-100 p-3 rounded-lg' id='password' name='bg-blue-100 p-3 rounded-lg'/>
        <button disabled={loading} className='bg-blue-300 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75'>Sign Up</button>
        <Auth/>
       </form>
    </div>
    <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/signin'><span className='text-blue-500'>Sign in</span></Link>
             
    </div>
    <p className='text-red-700 mt-5'>{error && "something went wrong" }</p>

    </>
  )
}
