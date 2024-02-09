import React  from "react";
import {GoogleAuthProvider,signInWithPopup,getAuth} from 'firebase/auth';
import app from '../FireBase';
import {useDispatch} from 'react-redux';
import { signInSucess } from "../services/UserSlice";

export default function Auth (){
    const dispatch = useDispatch();
    const handleGoogleClick = async ()=>{
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth,provider);
            const res = await fetch('http://localhost:3000/api/auth/googlelogin',{
                method: 'POST',
                headers: {
                    'COntent-Type' : 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL,
                }),
            });
            const data = await res.json();
            dispatch(signInSucess(data));
        }catch(error){
            console.log(error);
        }
    }
    return (
        // by adding type button we prevent form submission
       <>
       <button type="button" onClick={handleGoogleClick} className="bg-red-700 text-white rounded-lg p-3">Continue with google</button>
       
       </>
        )
}