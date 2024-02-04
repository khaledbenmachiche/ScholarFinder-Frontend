import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, {useEffect, useState} from "react";
import {Icon} from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth.ts";
import useUser from "../hooks/useUser.ts";

const schema = yup.object().shape(
    {
        username: yup.string().required("nom d'utilisateur est requis"),
        password: yup.string().min(4,"Le mot de passe doit contenir au moins 4 caractères.").required("mot de passe est requis"),
    }
);

interface SignInData {
    username: string;
    password: string;
}

const SignInSection: React.FC = () => {
    const navigate = useNavigate();
    const {login} = useAuth();
    const {user} = useUser();
    const {register, handleSubmit, formState: {errors},} = useForm({
        resolver: yupResolver(schema),
    });
    useEffect(() => {
        if(user != null) {
            switch (user["user-type"]) {
                case "Admin":
                    navigate("/admin/dashboard");
                    break;
                case "Mod":
                    navigate("/moderateur/all_articles");
                    break;
                case "User":
                    navigate("/rechercher-article");
                    break;
                default:
                    break;
            }
        }
    },[user])
    const submitForm = async (data: SignInData) => {
        await login(data.username, data.password);
    }

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

    return (
        <div className="relative w-full md:w-screen lg:w-[900px] h-screen  pt-4 pb-2  px-8 bg-white flex flex-col justify-between  ">
            <div className="bg-[#0671E0] absolute left-0 top-0 h-full w-1"></div>
            <div className="ml-10 text-3xl font-medium ">Bienvenue</div>

            <form className="flex flex-col w-full  md:px-8 items-center justify-center gap-2.5 "
                  onSubmit={handleSubmit(submitForm)}>
                <div className="relative flex flex-col justify-center w-full mb-12">
                    <label className="block ml-2 font-light text-md ">Nom d'utilisateur</label>
                    <input
                        className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC]" {...register("username")} />
                    <p className="absolute text-xs text-red-600 left-2 -bottom-5">{errors.username?.message}</p>
                </div>

                <div className="relative flex flex-col justify-center w-full mb-16 ">
                    <label className="block ml-2 font-light text-md ">Mot de passe</label>
                    <div className="relative">
                        <input className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC]"
                               type={type} {...register("password")} />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 mt-1 cursor-pointer"
                              onClick={handleToggle}><Icon icon={icon} size={20}/></span>
                    </div>
                    <p className="absolute text-xs text-red-600 left-2 -bottom-5">{errors.password?.message}</p>
                </div>
                <button type="submit"
                        className="border rounded-[10px] w-full p-2 bg-[#0671E0] hover:bg-[#0663C7] focus:bg-[#0663C7] text-white text-xl">Sign
                    In
                </button>
            </form>
            <div className=" flex whitespace-nowrap w-full justify-center gap-2.5">
                <p className="text-sm font-medium text-center">Vous n’avez pas un compte ?</p>
                <span onClick={() => navigate("/signup")} className="text-sm font-medium text-blue-700 cursor-pointer hover:underline hover:underline-offset-2">Inscrivez-vous maintenant</span>
            </div>
        </div>
    )
}

export default SignInSection;