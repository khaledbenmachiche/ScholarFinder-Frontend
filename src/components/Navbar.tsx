import {GrMenu} from "react-icons/gr";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import logo from "../assets/logo.svg"
import useNavigationBar from "../hooks/useNavigationBar.ts";

export const navLinks = [
    {
        id: "Home",
        title: "Home",
        path: "/"
    },
    {
        id: "Login",
        title: "Login",
        path: "/signin",
    },
    {
        id: "Contact",
        title: "Contact",
        path: "/contact"
    },
    {
        id: "About",
        title: "About",
        path: "/about"
    },
];

const Navbar = () => {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const {active, handleNavigation} = useNavigationBar(navLinks);
    return (
        <nav className="h-[4rem] w-screen text-black flex justify-between items-center absolute top-0 px-4 z-10">
            <img className="w-10 mt-1 cursor-pointer" alt="logo" src={logo} onClick={() => navigate("/")}/>
            <ul className="hidden w-full lg:flex md:flex justify-end">
                {navLinks.map((nav, index) =>
                    <li
                        key={nav.id}
                        className={`cursor-pointer font-poppins font-medium text-[20px] ${
                            active === nav.title ? "text-blue-400" : "text-dimWhite"
                        } ${index === navLinks.length - 1 ? "mr-10" : "mr-10"}`}
                        onClick={() => handleNavigation(nav)}
                    >
                        <Link to={nav.path}>{nav.title}</Link>
                    </li>
                )}
            </ul>


            <GrMenu size={28} className='cursor-pointer lg:hidden md:hidden'
                    onClick={() => setToggle(!toggle)}/>
            <div
                className={`${!toggle ? "hidden" : "flex"} p-6 bg-cyan-500 absolute top-11 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar lg:hidden `}>
                <ul className="list-none flex justify-end items-start flex-1 flex-col">
                    {navLinks.map((nav, index) =>
                        <li key={nav.id}
                            className={`font-poppins  font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-dimWhite"} ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                            onClick={() => handleNavigation(nav)}>
                            <Link to={nav.path}>{nav.title}</Link>
                        </li>)}
                </ul>
            </div>

        </nav>

    );

}
export default Navbar
 