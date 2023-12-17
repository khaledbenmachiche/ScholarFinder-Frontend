import {GrMenu} from "react-icons/gr";
import {navLinks} from "./Navbar.tsx";
import {useState} from "react";
const NavbarAuth = () => {
    const [active, setActive] = useState("Home");
    const [toggle, setToggle] = useState(false);
    return (
        <div className="ml-3 mt-3">
        <div className="w-full xl:max-w-[1250px] mx-auto px-6">
            <ul className="hidden w-full lg:flex justify-end relative left-11">
                {
                    navLinks.map (
                        (nav, index) =>
                            (
                                <li key={nav.id} className={` cursor-pointer font-poppins font-medium text-[20px] ${  active === nav.title ? "text-blue-400" : "text-dimWhite" } ${index === navLinks.length - 1 ? "mr-10" : "mr-10"}`}  onClick={() => setActive(nav.title)}>
                                    <a href={`#${nav.id}`}>{nav.title}</a>
                                </li>
                            )
                    )
                }
            </ul>

        </div>

    <GrMenu size={28}  className =' cursor-pointer lg:hidden relative bottom-2  right-4' onClick={() => setToggle(!toggle)}/>
    <div className={`${!toggle ? "hidden" : "flex" } p-6 bg-cyan-500 absolute top-11 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar lg:hidden `} >
        <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {
                navLinks.map
                ( (nav, index) =>
                    (
                        <li key={nav.id} className={`font-poppins  font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-dimWhite"} ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`} onClick={() => setActive(nav.title)} >
                            <a href={`#${nav.id}`}>{nav.title}</a>
                        </li>

                    )
                )
            }
        </ul>
    </div>
        </div>
    );
};


export default NavbarAuth;
