import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState } from "react";
import { Icon } from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import '../index.css'
import 'poppins'; 


const schema=yup.object().shape(
  {
    emailOrUsername: yup.string().required(),
    password: yup.string().min(4).max(15).required(),
  }
);

const SignIn =({ onSignUpClick })=>
{
  const {register , handleSubmit , formState: { errors },} = useForm({
    resolver : yupResolver(schema),
  });

  const submitForm =(data)=>
  {
   console.log(data);
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
     <div className="bg-white p-8  font-poppins w-5/12 ">

      <div className="flex items-center mb-20">
       <img src='logo.svg' alt="Logo" className="mr-4" />
      <div className=" font-medium text-3xl ">Bienvenue</div>
      </div>

      <form onSubmit={handleSubmit(submitForm)}>

      <div className="flex flex-col justify-center items-center ">

        <div className="mb-12  w-96 flex flex-col justify-center">
        <label className="font-light text-xl block  ">Email or Username</label>
        <input  className="mt-2 border rounded-[10px] border-blue-700 w-full p-3 bg-[#EEF5FC] " {...register("emailOrUsername")} />
        <p className=" text-red-600">{errors.emailOrUsername?.message}</p>
        </div>

        <div className="mb-16  w-96 flex flex-col justify-center">
      <label className="font-light text-xl block  ">Password</label>
      <div className="relative">
      <input className="mt-2 border rounded-[10px] border-blue-700 w-full p-3  bg-[#EEF5FC] " type={type} {...register("password")} /> 
      <span  className="absolute inset-y-0 mt-1 right-0 pr-3 flex items-center cursor-pointer" onClick={handleToggle}><Icon icon={icon} size={25}/></span>
      </div>
      <p className=" text-red-600">{errors.password?.message}</p>
      </div>

        <div className=" mb-40  w-96 flex flex-col justify-center"> 
        <button type="submit" className="border rounded-[10px] w-full p-3 bg-[#0671E0] hover:bg-[#0663C7] focus:bg-[#0663C7] text-white text-xl">Sign In</button>
        </div>
      </div>
        <p className=" text-center">Don't have an account? <span className=" text-blue-700 hover:underline" onClick={onSignUpClick}>Sign Up</span></p>

      </form>
     </div>
  )
}

export default SignIn;