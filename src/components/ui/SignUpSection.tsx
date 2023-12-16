import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
 import { Icon } from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.ts";
import logo from '../../assets/logo.svg';

const schema=yup.object().shape({
    username: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(15).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required(),
  });

interface SignUpData{
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
}

const SignUpSection:React.FC =()=>
{
  const navigate = useNavigate();
  const {subscribe,login} = useAuth();
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

   const  submitForm =async (data:SignUpData)=>{
    try {
      const response = await subscribe(data.username,data.firstName,data.lastName,data.email,data.password);
      if(response.status === 200){
        await login(data.username,data.password);
        navigate('/test');
      }else{
        console.log(response.data);
      }
    } catch (error) {
      console.log(error)
    }
  } 



  return(
     <div className="w-full p-8 bg-white lg:w-5/12">
      <div className="flex items-center mb-12">
         <img src={logo} alt="Logo" className="mr-4" />
         <div className="text-3xl font-medium ">Bienvenue</div>
      </div>

      <form onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col items-center justify-center gap-2.5 ">
          <div className="flex flex-col justify-center w-96">
             <label className="block text-xl font-light ">Username</label>
             <input className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] " {...register("username")} />
             <p className="text-red-600 ">{errors.username?.message}</p>
          </div>

          <div className="flex flex-col justify-center w-96">
              <label className="block text-xl font-light ">First Name</label>
              <input className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] " {...register("firstName")} />
              <p className="text-red-600 ">{errors.firstName?.message}</p>
          </div>


          <div className="flex flex-col justify-center w-96">
              <label className="block text-xl font-light ">Last Name</label>
              <input className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] "{...register("lastName")} />
              <p className="text-red-600 ">{errors.lastName?.message}</p>
          </div>

          <div className="flex flex-col justify-center w-96">
              <label className="block text-xl font-light ">Email</label>
              <input className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] "{...register("email")} />
              <p className="text-red-600 ">{errors.email?.message}</p>
          </div>

          <div className="flex flex-col justify-center w-96">
              <label className="block text-xl font-light ">Password</label>
              <div className="relative">
              <input className="mt-1 border rounded-[10px] border-blue-700 w-full p-2  bg-[#EEF5FC] " type={type} {...register("password")} />
              <span  className="absolute right-0 flex items-center pr-3 cursor-pointer top-3" onClick={handleToggle}><Icon icon={icon} size={25}/></span>
              </div>
              <p className="text-red-600 ">{errors.password?.message}</p>
          </div>


          <div className="flex flex-col justify-center w-96">
              <label className="block text-xl font-light ">Confirm Password</label>
              <div className="relative">
              <input className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] "  type={typeConfirm}   {...register("confirmPassword")} />
              <span  className="absolute right-0 flex items-center pr-3 cursor-pointer top-3 "  onClick={handleConfirmToggle}><Icon icon={iconConfirm} size={25} /></span>
              </div>
              <p className="text-red-600 ">{errors.confirmPassword?.message}</p>
          </div>
          <button type="submit" className="border rounded-[10px] w-96 p-2 mt-4 bg-[#0671E0] text-white text-xl m2-4 hover:bg-[#0663C7] focus:bg-[#0663C7]">Sign Up</button>
        </div>
        <p className="text-center ">Already have an account? <span className="text-blue-700 hover:underline cursor-pointer">Sign In</span></p>
      </form>
     </div>
     
  )
}
export default SignUpSection;