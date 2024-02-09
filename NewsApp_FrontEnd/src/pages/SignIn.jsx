import React, { useState } from 'react';
import Auth from '../auth/Auth';
import { Link,useNavigate } from 'react-router-dom';
import { signInFailure,signInSucess,signInStart } from '../services/UserSlice';
import {useDispatch , useSelector} from 'react-redux';



export default function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading,error} = useSelector((state)=>state.user);
    const [formData,setFormData] = useState({
        username:'',
        email:'',
        password:'',
    });

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.id]:e.target.value})

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            dispatch(signInStart());
            const res = await fetch('api/auth/signin',{
                method: 'POST',
                headers:{
                    'Content-Type':'appliction/json',
                },
                body: JSON.stringify(formData),

            });
            const data = await res.json();
            dispatch(signInSucess(data));
            if(data.success === false){
                dispatch(signInFailure());
                return;
            }
            navigate('/')
        }catch(error){
            dispatch(signInFailure(error))
        }
    }
  return (
    <>
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4'>
         
          <input onChange={handleChange} type="email" className='bg-blue-100 p-3 rounded-lg' name="email" id="email" placeholder='email'/>
          <input onChange={handleChange} type="password" name="password" className='bg-blue-100' placeholder='password' id="password" />
          <button disabled={loading} className='bg-blue-500 text-white p-3 rounded uppercase hover:opacity-95 disabled:opacity-85' >Sign In</button>
          <Auth/>
        </form>
    <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/signup'>
        <span className='text-blue-500'>Sign Up</span></Link>

    </div>
    <p className='text-red-700  mt-5'>{error ? 'something went wrong' : ''}</p>
    </div>

    </>
  )
}
