import React, {useEffect, useState} from 'react'
import logo from "../assets/logo.svg"
import useNavigationBar from '../hooks/useNavigationBar'
import { Link, useNavigate } from 'react-router-dom';
import { GrMenu } from 'react-icons/gr';
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
    return (
            <nav className="h-[4rem] w-screen bg-transparent text-black flex px-10  ">
            {/*Large */}
            <div className="hidden lg:flex">
                <div className="flex flex-row space-x-4 hover:cursor-pointer" onClick={() => navigate(navLinks[0].path)}><img className="w-10 cursor-pointer" alt="logo" src={logo} />  <h3
                    className="absolute font-bold font-poppins top-5 left-20">Truth finder </h3></div>
                <div>
                    <ul className="absolute flex flex-row space-x-5 font-bold font-poppins top-5 left-56 ">
                        {
                            navLinks.map(nav =>
                                (
                                    <li className={`${active === nav.title ? "text-blue-400" : "text-dimWhite"}`} 
                                        key={nav.id}
                                        onClick={()=> handleNavigation(nav)}
                                    >
                                        <Link to={nav.path}>{nav.title}</Link>
                                    </li>

                                )
                            )
                        }
                    </ul>
                </div>
            </div>
            {/*Large */}

            {/*Mobile  */}
            <div className="flex "><img className="w-10 lg:hidden" alt="logo" src={logo}/>  <h3
                className="mt-5 ml-3 font-bold lg:hidden font-poppins whitespace-nowrap">Truth finder </h3> 
                 <GrMenu
                size={28} className='mt-4 cursor-pointer ml-60 lg:hidden' onClick={() => setToggle(!toggle)}/></div>
            <div
                className={`${!toggle ? "hidden" : "flex"} p-6 bg-blue-800  mx-4 my-2 h-fit absolute top-11 right-0  rounded-xl sidebar lg:hidden `}>
                <ul className="flex flex-col items-start justify-end flex-1 font-bold text-white list-none font-poppins">
                    {
                        navLinks.map(nav =>
                            (
                                <li key={nav.id}>
                                    <a href={`#${nav.id}`}>{nav.title}</a>
                                </li>

                            )
                        )
                    }
                </ul>
                </div>  
                 
            {/*Mobile  */}

        </nav>
    )
}

export default NavBarUtilisateur