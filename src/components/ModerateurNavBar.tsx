import logo from "../assets/Logo.svg";
import React from "react";
import useAuth from "../hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";
const ModerateurNavBar = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();
    const handleLogout = async () => {
        try{
            const loggingOutStatus = await logout();
            if(loggingOutStatus){
                navigate("/");
            }else{
                console.log("Failed to logout")
            }
        }catch{
            console.log("Failed to logout");
        }
    }
    return (
        <div className='bg-[#EEF5FC] p-6 flex  justify-between items-center'>
            <button onClick={()=>navigate("/moderateur/all_articles")} className='flex items-center cursor-pointer'>
                <img src={logo} alt='logo' /><span className='text-xl font-bold '>Truth Finder</span>
            </button>
            <button onClick={handleLogout} className=" font-poppins font-extrabold text-lg mr-4">Déconnexion</button>
        </div>
    );
};

export default ModerateurNavBar;

