import React, {useEffect, useState} from 'react'
import logo from "../assets/logo.svg"
import useNavigationBar from '../hooks/useNavigationBar'
import { Link, useNavigate } from 'react-router-dom';
import { GrMenu } from 'react-icons/gr';
import useAuth from "../hooks/useAuth.ts";
import {ToastContainer} from "react-toastify";
import {toast} from "react-toastify";
const NavBarUtilisateur = () => {
    const navLinks = [
        {
            id: "1",
            title: "Accueil",
            path: "/rechercher-article"
        },
        {
            id: "2",
            title: "Articles Favoris",
            path: "/articles-favoris",
        },
    ]
    const [toggle, setToggle] = useState(false);
    const {active, handleNavigation} = useNavigationBar(navLinks);
    useEffect(()=>{
        console.log(active)
    },[active])
    const navigate = useNavigate();
    const {logout} = useAuth();
    const handleLogout = async () => {
        try{
            const loggingOutStatus = await logout();
            if(loggingOutStatus){
                navigate("/");
            }else{
                toast.error("Erreur lors de la déconnexion",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }catch{
            toast.error("Erreur lors de la déconnexion",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    return (
            <nav className="h-[4rem]  w-screen bg-transparent text-black flex px-10">
                <ToastContainer/>
            {/*Large */}
            <div className="hidden md:flex lg:flex justify-between w-full">
                <div className="flex flex-row space-x-4 hover:cursor-pointer" onClick={() => navigate(navLinks[0].path)}><img className="w-10 cursor-pointer" alt="logo" src={logo} />
                    <h3 className="absolute font-bold font-poppins top-5 left-20">Truth finder </h3>
                </div>
                <ul className="absolute flex flex-row space-x-5 font-bold font-poppins top-5 left-56">
                    {
                        navLinks.map(nav =>
                            (
                                <li className={`${active === nav.title ? "text-blue-400" : "text-black"}`}
                                    key={nav.id}
                                    onClick={()=> handleNavigation(nav)}
                                >
                                    <Link to={nav.path}>{nav.title}</Link>
                                </li>
                            )
                        )
                    }
                </ul>
                <button onClick={handleLogout} className="absolute right-6 top-5 font-poppins font-bold">Déconnexion</button>
            </div>
            {/*Large */}

            {/*Mobile  */}
            <div className="flex w-full"><img className="w-10 flex md:hidden lg:hidden" alt="logo" src={logo}/>
                <h3 className="mt-5 ml-3 font-bold lg:hidden md:hidden font-poppins whitespace-nowrap">Truth finder </h3>
                 <GrMenu size={28} className='mt-5 ml-auto flex-none md:hidden cursor-pointer lg:hidden' onClick={() => setToggle(!toggle)}/></div>
            <div
                className={`${!toggle ? "hidden" : "flex"} px-10 py-4 bg-blue-800 z-40 border-slate-300 border   mx-4 my-2 h-fit absolute top-11 right-0  rounded-xl sidebar lg:hidden `}>
                <ul className="flex flex-col gap-2 items-start justify-end flex-1 font-bold text-white list-none font-poppins ">
                    {
                        navLinks.map(nav =>
                            (
                                <li className={`${active === nav.title ? "text-blue-300" : "text-white"}`}
                                key={nav.id}
                                onClick={()=> handleNavigation(nav)}
                            >
                                <Link to={nav.path}>{nav.title}</Link>
                            </li>

                            )
                        )
                    }
                    <button onClick={handleLogout} className=" font-poppins font-bold ">Déconnexion</button>
                </ul>
                </div>  
                 
            {/*Mobile  */}

        </nav>
    )
}

export default NavBarUtilisateur
