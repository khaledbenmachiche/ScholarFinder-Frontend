import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, {useState} from "react";
import {Icon} from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth.ts";

const schema = yup.object().shape(
    {
        username: yup.string().required(),
        password: yup.string().min(4).max(15).required(),
    }
);

interface SignInData {
    username: string;
    password: string;
}

const SignInSection: React.FC = () => {
    const navigate = useNavigate();
    const {login} = useAuth();
    const {register, handleSubmit, formState: {errors},} = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = async (data: SignInData) => {
        await login(data.username, data.password)
        navigate('/test');
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
        <div
            className="relative w-full md:w-screen lg:w-[900px] h-fit lg:h-screen pt-4 pb-2  px-8 bg-white flex flex-col justify-between ">
            <div className="bg-[#0671E0] absolute left-0 top-0 h-full w-1"></div>
            <div className="text-3xl font-medium ml-10 ">Bienvenue</div>

            <form className="flex flex-col w-full h-screen md:px-8 items-center justify-center gap-2.5"
                  onSubmit={handleSubmit(submitForm)}>
                <div className="flex flex-col justify-center w-full mb-12">
                    <label className="block ml-2 font-light text-md ">Username</label>
                    <input
                        className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC]" {...register("username")} />
                    <p className="text-red-600 ">{errors.username?.message}</p>
                </div>

                <div className="flex flex-col justify-center w-full mb-16">
                    <label className="block ml-2 font-light text-md ">Password</label>
                    <div className="relative">
                        <input className="mt-1 border rounded-[10px] border-blue-700 w-full p-2 bg-[#EEF5FC]"
                               type={type} {...register("password")} />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 mt-1 cursor-pointer"
                              onClick={handleToggle}><Icon icon={icon} size={20}/></span>
                    </div>
                    <p className="text-red-600 ">{errors.password?.message}</p>
                </div>
                <button type="submit"
                        className="border rounded-[10px] w-full p-2 bg-[#0671E0] hover:bg-[#0663C7] focus:bg-[#0663C7] text-white text-xl">Sign
                    In
                </button>
            </form>
            <div className=" flex whitespace-nowrap w-full justify-center gap-2.5">
                <p className="text-sm font-medium text-center">Vous n’avez pas un compte ?</p>
                <span onClick={() => navigate("/signup")} className="text-sm font-medium text-blue-700 cursor-pointer">Inscrivez-vous maintenant</span>
            </div>
        </div>
    )
}

export default SignInSection;