import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState } from "react";
import { Icon } from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const schema=yup.object().shape(
  {
    username: yup.string().required(),
    password: yup.string().min(4).max(15).required(),
  }
);
interface SignInProps{
    onSignUpClick: () => void;
}

interface SignInData{
  username:string;
  password:string;
}

const SignIn:React.FC<SignInProps> =({ onSignUpClick })=>
{
  const navigate = useNavigate();
  const {login} = useAuth();
  const {register , handleSubmit , formState: { errors },} = useForm({
    resolver : yupResolver(schema),
  });

  const submitForm = async (data:SignInData)=>{
    debugger
    await login(data.username,data.password)
    navigate('/test');
  }

  const [type, setType]=useState('password');
  const [icon, setIcon]=useState(eyeOff);

  
  const handleToggle=()=>{    
    if(type==='password'){
      setIcon(eye);
      setType('text');
    }
    else{
      setIcon(eyeOff);     
      setType('password');
    }
  }

  return(
     <div className="w-5/12 p-8 bg-white font-poppins ">

      <div className="flex items-center mb-20">
       <img src='logo.svg' alt="Logo" className="mr-4" />
      <div className="text-3xl font-medium ">Bienvenue</div>
      </div>

      <form onSubmit={handleSubmit(submitForm)}>

      <div className="flex flex-col items-center justify-center ">

        <div className="flex flex-col justify-center mb-12 w-96">
        <label className="block text-xl font-light ">Username</label>
        <input  className="mt-2 border rounded-[10px] border-blue-700 w-full p-3 bg-[#EEF5FC] " {...register("username")} />
        <p className="text-red-600 ">{errors.username?.message}</p>
        </div>

      <div className="flex flex-col justify-center mb-16 w-96">
      <label className="block text-xl font-light ">Password</label>
      <div className="relative">
      <input className="mt-2 border rounded-[10px] border-blue-700 w-full p-3  bg-[#EEF5FC] " type={type} {...register("password")} /> 
      <span  className="absolute inset-y-0 right-0 flex items-center pr-3 mt-1 cursor-pointer" onClick={handleToggle}><Icon icon={icon} size={25}/></span>
      </div>
      <p className="text-red-600 ">{errors.password?.message}</p>
      </div>

        <div className="flex flex-col justify-center mb-40 w-96"> 
        <button type="submit" className="border rounded-[10px] w-full p-3 bg-[#0671E0] hover:bg-[#0663C7] focus:bg-[#0663C7] text-white text-xl">Sign In</button>
        </div>
      </div>
        <p className="text-center ">Don't have an account? <span className="text-blue-700 hover:underline" onClick={onSignUpClick}>Sign Up</span></p>
      </form>
     </div>
  )
}

export default SignIn;