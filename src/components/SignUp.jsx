import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
 import { Icon } from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import '../index.css'
import 'poppins'; 




const schema=yup.object().shape(
  {
    username: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(15).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
  }
);


const SignUp =({ onSignInClick })=>
{

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

  const [typeConfirm, setTypeConfirm]=useState('password');
  const [iconConfirm, setIconConfirm]=useState(eyeOff);


  const handleConfirmToggle=()=>{    
    if(typeConfirm==='password'){
      setIconConfirm(eye);      
      setTypeConfirm('text');
    }
    else{
      setIconConfirm(eyeOff);     
      setTypeConfirm('password');
    }
  }


  const {register , handleSubmit , formState: { errors },} = useForm({
     resolver : yupResolver(schema),
  });
  const submitForm =(data)=>
  {
    console.log(data);
  } 



  return(
    
     <div className="bg-white p-8  font-poppins lg:w-5/12 w-full  ">
      
      
      <div className="flex items-center mb-12">
       <img src='logo.svg' alt="Logo" className="mr-4" />
      <div className=" font-medium text-3xl ">Bienvenue</div>
      </div>

      <form onSubmit={handleSubmit(submitForm)}>

      <div className="flex flex-col justify-center items-center ">

      <div className="mb-1  w-96 flex flex-col justify-center">
     <label className="font-light text-xl block ">Username</label>
      <input className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] " {...register("username")} />
      <p className=" text-red-600">{errors.username?.message}</p>
      </div>
      
      <div className="mb-1 w-96 flex flex-col justify-center">
      <label className="font-light text-xl block  ">First Name</label>
      <input className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] " {...register("firstName")} />
      <p className=" text-red-600">{errors.firstName?.message}</p>
      </div>


      <div className="mb-1  w-96 flex flex-col justify-center">
      <label className="font-light text-xl block  ">Last Name</label>
      <input className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] "{...register("lastName")} />
      <p className=" text-red-600">{errors.lastName?.message}</p>
      </div>

      <div className="mb-1  w-96 flex flex-col justify-center">
      <label className="font-light text-xl block  ">Email</label>
      <input className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] "{...register("email")} />
      <p className=" text-red-600">{errors.email?.message}</p>
      </div>

      <div className="mb-1  w-96 flex flex-col justify-center">
      <label className="font-light text-xl block  ">Password</label>
      <div className="relative">
      <input className="mt-1 border rounded-[10px] border-blue-700 w-full p-2  bg-[#EEF5FC] " type={type} {...register("password")} /> 
      <span  className="absolute top-3 right-0 pr-3 flex items-center cursor-pointer" onClick={handleToggle}><Icon icon={icon} size={25}/></span>
      </div>
      <p className=" text-red-600">{errors.password?.message}</p>
      </div>
      

      <div className="mb-1  w-96 flex flex-col justify-center">
      <label className="font-light text-xl block  ">Confirm Password</label>
      <div className="relative">
      <input className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] "                type={typeConfirm}   {...register("confirmPassword")} />
      <span  className="absolute top-3 right-0 pr-3 flex items-center cursor-pointer "                      onClick={handleConfirmToggle}><Icon icon={iconConfirm} size={25} /></span>
      </div>
      <p className=" text-red-600">{errors.confirmPassword?.message}</p>
      </div>
      
      <div className="mb-2  w-96 flex flex-col justify-center">
      <button type="submit" className="border rounded-[10px] w-full p-2 mt-4 bg-[#0671E0] text-white text-xl m2-4 hover:bg-[#0663C7] focus:bg-[#0663C7]">Sign Up</button>
      </div>

      </div>
      
      

      <p className=" text-center">Already have an account? <span className=" text-blue-700 hover:underline"onClick={onSignInClick}>Sign In</span></p>
      </form>
     </div>
     
  )
}
export default SignUp;