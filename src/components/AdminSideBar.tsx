import {MdCloudUpload} from "react-icons/md";
import {IoIosClose} from "react-icons/io";
import {MdOutlineAdminPanelSettings} from "react-icons/md";
import {FaUsers} from "react-icons/fa6";
import {FaUsersBetweenLines} from "react-icons/fa6";
import {TbLogout} from "react-icons/tb";
import {MdSpaceDashboard} from "react-icons/md";
import {useState} from "react";

import useNavigationBar from "../hooks/useNavigationBar.ts";
import {Link} from "react-router-dom";

const sideBarLinks = [
    {
        id: "DashBoard",
        title: "DashBoard",
        path: "/admin/dashBoard",
        icon: <MdSpaceDashboard
            className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
    },
    {
        id: "moderateur",
        title: "Moderateur",
        path: "/admin/moderateur",
        icon: <FaUsersBetweenLines
            className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
    },
  /*  {
        id: "utilisateur",
        title: "Utilisateur",
        path: "/admin/utilisateur",
        icon: <FaUsers
            className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
    },*/
    {
        id: "upload-file",
        title: "Upload File",
        path: "/admin/upload-article",
        icon: <MdCloudUpload
            className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
    },
];


const AdminSideBar = () => {

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const {active} = useNavigationBar(sideBarLinks);
    return (
        <>
            <button onClick={toggleSidebar} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar"
                    aria-controls="default-sidebar" type="button"
                    className="absolute left-0 inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg ms-3 sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd"
                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar"
                   className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
                       isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                   } sm:translate-x-0`}
                   aria-label="Sidebar"
            >
                <div
                    className="relative flex flex-col justify-center h-full px-3 py-4 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800">
                    <IoIosClose onClick={toggleSidebar}
                                className="absolute block w-10 h-10 cursor-pointer md:hidden lg:hidden text-slate-800 dark:text-white top-2 right-2 hover:bg-gray-100 dark:hover:bg-gray-700"/>
                    <a href="#" className="flex items-center p-2 mt-6 mb-auto text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <MdOutlineAdminPanelSettings
                            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                        <span className="flex-1 font-bold ms-3 whitespace-nowrap">Admin</span>
                    </a>
                    <ul className="space-y-2 font-medium">
                        {
                            sideBarLinks.map((link) => (
                                <li key={link.id}>
                                    <Link to={link.path}
                                          className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${active == link.title ? 'bg-gray-200' : ''}`}>
                                        {link.icon}
                                        <span className="flex-1 ms-3">{link.title}</span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    <a href="#"
                       className="flex items-center p-2 mt-auto text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <TbLogout
                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                        <span className="flex-1 ms-3 whitespace-nowrap">Deconnexion</span>
                    </a>
                </div>
            </aside>
        </>
    );
};
export default AdminSideBar;