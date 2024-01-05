import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import PopUp from "./PopUp";
import { IoClose } from "react-icons/io5";
import useAxios from "../hooks/useAxios";

const schema = yup.object().shape({
    username: yup.string().required("veuillez remplir ce champ."),
    first_name: yup.string().required("veuillez remplir ce champ."),
    last_name: yup.string().required("veuillez remplir ce champ."),
    email: yup.string().email().required("veuillez remplir ce champ."),
    password: yup.string().required("veuillez remplir ce champ."),
});

interface AjoutModerateurData {
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    password: string;
}

const AjouterModerateurForms = ({trigger, handleCloseAjoutPopUp}:{trigger:boolean,handleCloseAjoutPopUp:()=>void}) => {
    const {register, handleSubmit, formState: {errors},} = useForm({
        resolver: yupResolver(schema),
    });
    const axios = useAxios();
    const submitForm = (data: AjoutModerateurData) => {
        axios.post(`/moderation/`,{...data})
            .then(res=>{
                if(res.status === 201){
                    handleCloseAjoutPopUp();
                }
            })
            .catch(err=>{console.error('Error submitting form:', err)})
    }

    return (
        <PopUp handleCloseEvent={handleCloseAjoutPopUp} trigger={trigger}>
            <div className="relative text-left w-full md:w-screen lg:w-[500px] rounded-xl h-[550px] pt-4 pb-2 px-8 bg-white flex flex-col shadow-xl cursor-default">
                <IoClose className="absolute w-10 h-10 cursor-pointer top-2 right-4 text-slate-700" onClick={handleCloseAjoutPopUp}/>
                <form className="flex flex-col w-full h-[800px] md:px-8 items-center justify-center gap-4"
                    onSubmit={handleSubmit(submitForm)}>
                    <div className="relative flex flex-col justify-center w-full">
                        <label className="block ml-2 font-light text-md ">Username</label>
                        <input 
                            className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] " {...register("username")} />
                        <p className="absolute text-xs font-thin text-red-600 right-2 -bottom-5 ">{errors.username?.message}</p>
                    </div>

                    <div className="relative flex flex-col justify-center w-full">
                        <label className="block ml-2 font-light text-md ">First Name</label>
                        <input
                            className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] " {...register("first_name")} />
                        <p className="absolute text-xs font-thin text-red-600 right-2 -bottom-5 ">{errors.first_name?.message}</p>
                    </div>


                    <div className="relative flex flex-col justify-center w-full">
                        <label className="block ml-2 font-light text-md ">Last Name</label>
                        <input
                            className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] "{...register("last_name")} />
                        <p className="absolute text-xs font-thin text-red-600 right-2 -bottom-5 ">{errors.last_name?.message}</p>
                    </div>

                    <div className="relative flex flex-col justify-center w-full">
                        <label className="block ml-2 font-light text-md ">Email</label>
                        <input
                            className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] "{...register("email")} />
                        <p className="absolute text-xs font-thin text-red-600 right-2 -bottom-5">{errors.email?.message}</p>
                    </div>
                    <div className="relative flex flex-col justify-center w-full">
                        <label className="block ml-2 font-light text-md ">Password</label>
                        <input
                            className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] "{...register("password")} />
                        <p className="absolute text-xs font-thin text-red-600 right-2 -bottom-5 ">{errors.password?.message}</p>
                    </div>
                    <button type="submit" className="border rounded-[10px] w-full p-2 mt-4 bg-[#0671E0] text-white text-lg hover:bg-[#0663C7] focus:bg-[#0663C7]">Ajouter moderateur </button>
                </form>
            </div>
        </PopUp>
    )
}

export default AjouterModerateurForms