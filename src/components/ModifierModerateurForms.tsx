import {useForm} from "react-hook-form";
import React,{useEffect} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import PopUp from "./PopUp";
import { IoClose } from "react-icons/io5";
import User from "../types/User";
import useAxios from "../hooks/useAxios";
const schema = yup.object().shape({
    username: yup.string().required(),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
});

interface ModerateurData {
    email: string;
    first_name: string;
    last_name: string;
    username: string;
}

const ModifierModerateurForms = ({moderateurToModify, trigger, handleCloseModificationPopUp}:{trigger:boolean,handleCloseModificationPopUp:()=>void,moderateurToModify:User|undefined}) => {
    const axios = useAxios();
    const {register, handleSubmit, formState: {errors},reset} = useForm({
        resolver: yupResolver(schema),
        defaultValues: moderateurToModify
    });
    useEffect(()=>{
        reset(moderateurToModify);
    },[reset,moderateurToModify])

    const submitForm = async (data: ModerateurData) => {
        try {
            const response = await axios.put(`/moderation/${moderateurToModify?.id}/`, {...data});
            if (response.status === 200) {
                handleCloseModificationPopUp();
                window.location.reload();
            }else{
                console.log("error");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <PopUp handleCloseEvent={handleCloseModificationPopUp} trigger={trigger}>
            <div className="relative text-left w-full md:w-screen lg:w-[500px] rounded-xl h-[550px] pt-4 pb-2 px-8 bg-white flex flex-col shadow-xl cursor-default">
                <IoClose className="absolute w-10 h-10 cursor-pointer top-2 right-4 text-slate-700" onClick={handleCloseModificationPopUp}/>
                <form className="flex flex-col w-full h-[800px] md:px-8 items-center justify-center gap-2.5"
                    onSubmit={handleSubmit(submitForm)}>
                    <div className="flex flex-col justify-center w-full">
                        <label className="block ml-2 font-light text-md ">Username</label>
                        <input 
                            className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] " 
                            {...register("username")}
                        />
                        <p className="text-red-600 ">{errors.username?.message}</p>
                    </div>

                    <div className="flex flex-col justify-center w-full">
                        <label className="block ml-2 font-light text-md ">First Name</label>
                        <input
                            className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] " 
                        {...register("first_name")} 
                        />
                        <p className="text-red-600 ">{errors.first_name?.message}</p>
                    </div>


                    <div className="flex flex-col justify-center w-full">
                        <label className="block ml-2 font-light text-md ">Last Name</label>
                        <input
                            className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] "
                            {...register("last_name")}
                        />
                        <p className="text-red-600 ">{errors.last_name?.message}</p>
                    </div>

                    <div className="flex flex-col justify-center w-full">
                        <label className="block ml-2 font-light text-md ">Email</label>
                        <input
                            className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] "{...register("email")} />
                        <p className="text-red-600">{errors.email?.message}</p>
                    </div>
                    <button type="submit" className="border rounded-[10px] w-full p-2 mt-4 bg-[#0671E0] text-white text-xl hover:bg-[#0663C7] focus:bg-[#0663C7]">Sauvgarder</button>
                </form>
            </div>
        </PopUp>
    )
}

export default ModifierModerateurForms