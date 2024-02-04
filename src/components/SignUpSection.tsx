import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Icon} from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth.ts";
import useUser from "../hooks/useUser.ts";
import {toast,Bounce,ToastContainer} from "react-toastify";


const schema = yup.object().shape({
    username: yup.string().required("vous devez entrer un nom d'utilisateur"),
    firstName: yup.string().required("vous devez entrer votre prénom"),
    lastName: yup.string().required("vous devez entrer votre nom"),
    email: yup.string().email().required("vous devez entrer une adresse email valide"),
    password: yup.string().min(4,"Le mot de passe doit contenir au moins 4 caractères.").required("vous devez entrer un mot de passe"),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required("vous devez confirmer votre mot de passe"),
});

interface SignUpData {
    confirmPassword: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    username: string;
}

const SignUpSection: React.FC = () => {
    const navigate = useNavigate();
    const {subscribe, login} = useAuth();
    const {user} = useUser();

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
    }

    const [typeConfirm, setTypeConfirm] = useState('password');
    const [iconConfirm, setIconConfirm] = useState(eyeOff);


    const handleConfirmToggle = () => {
        if (typeConfirm === 'password') {
            setIconConfirm(eye);
            setTypeConfirm('text');
        } else {
            setIconConfirm(eyeOff);
            setTypeConfirm('password');
        }
    }


    const {register, handleSubmit, formState: {errors},} = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = async (data: SignUpData) => {
        try {
            const response = await subscribe(data.username, data.firstName, data.lastName, data.email, data.password);
            if (response.status === 201) {
                await login(data.username, data.password);
                navigate("/rechercher-article")
            } else {
                toast.error(
                    "Erreur lors de l'inscription",
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    }
                )
            }
        } catch (error) {
            toast.error(
                "Erreur lors de l'inscription",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                }
            )
        }
    }

    return (
        <div className="relative w-full md:w-screen  h-screen lg:w-[900px] md:h-screen  lg:h-screen pt-4 pb-2 px-8 bg-white flex flex-col">
            <ToastContainer/>
            <div className="bg-[#0671E0] absolute left-0 top-0 h-full w-1"></div>
            <div className="ml-10 text-3xl font-medium ">Bienvenue</div>

            <form className="flex flex-col gap-5 w-full  md:px-8 items-center justify-center mt-4 "
                  onSubmit={handleSubmit(submitForm)}>
                <div className="relative flex flex-col justify-center w-full">
                    <label className="block ml-2 text-sm font-light ">Nom d'utilisateur</label>
                    <input
                        className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] " {...register("username")} />
                    <p className="absolute text-xs text-red-600 left-2 -bottom-5">{errors.username?.message}</p>
                </div>

                <div className="relative flex flex-col justify-center w-full">
                    <label className="block ml-2 text-sm font-light ">Prénom</label>
                    <input
                        className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] " {...register("firstName")} />
                    <p className="absolute text-xs text-red-600 left-2 -bottom-5">{errors.firstName?.message}</p>
                </div>


                <div className="relative flex flex-col justify-center w-full">
                    <label className="block ml-2 text-sm font-light ">Nom</label>
                    <input
                        className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] "{...register("lastName")} />
                    <p className="absolute text-xs text-red-600 left-2 -bottom-5">{errors.lastName?.message}</p>
                </div>

                <div className="relative flex flex-col justify-center w-full">
                    <label className="block ml-2 text-sm font-light ">Email</label>
                    <input
                        className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] "{...register("email")} />
                    <p className="absolute text-xs text-red-600 left-2 -bottom-5">{errors.email?.message}</p>
                </div>
                <div className="flex w-full gap-2 mt-1.5">
                    <div className="relative flex flex-col justify-center w-full">
                        <label className="block ml-2 text-sm font-light ">Mot de passe</label>
                        <div className="relative">
                            <input className="mt-1 border rounded-[10px] border-blue-700 w-full p-2  bg-[#EEF5FC] "
                                   type={type} {...register("password")} />
                            <span className="absolute right-0 flex items-center pr-3 cursor-pointer top-3"
                                  onClick={handleToggle}><Icon icon={icon} size={20}/></span>
                        </div>
                        
                        {(errors.confirmPassword?.message && !errors.confirmPassword?.message) && <p className="absolute text-xs text-red-600 whitespace-nowrap left-2 -bottom-5">{errors.confirmPassword?.message}</p>}
                        {errors.password?.message  && <p className="absolute text-xs text-red-600 whitespace-nowrap left-2 -bottom-5">{errors.password?.message}</p>}
                    </div>


                    <div className="relative flex flex-col justify-center w-full">
                        <label className="block ml-2 text-sm font-light ">Confirmer Mot de passe</label>
                        <div className="relative">
                            <input className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC] "
                                   type={typeConfirm}   {...register("confirmPassword")} />
                            <span className="absolute right-0 flex items-center pr-3 cursor-pointer top-3 "
                                  onClick={handleConfirmToggle}><Icon icon={iconConfirm} size={20}/></span>
                        </div>
                    </div>
                </div>
                <button type="submit"
                        className="border rounded-[10px] w-full p-2 mt-4 bg-[#0671E0] text-white text-xl hover:bg-[#0663C7] focus:bg-[#0663C7]">Sign
                    Up
                </button>
            </form>
            <div className="flex justify-center w-full gap-2 mt-auto whitespace-nowrap">
                <p className="text-sm font-medium text-center">Vous avez déjà un compte ?</p>
                <span onClick={() => navigate("/signin")} className="text-sm font-medium text-blue-700 cursor-pointer hover:underline hover:underline-offset-2">Connectez-vous maintenant?</span>
            </div>
        </div>

    )
}
export default SignUpSection;