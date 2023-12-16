import { FaUsers } from "react-icons/fa6"; 
import { MdCloudUpload } from "react-icons/md"; 
import { FaUsersBetweenLines } from "react-icons/fa6"; 
import { TbLogout } from "react-icons/tb"; 
import { IoMenu } from "react-icons/io5";  
import { CgProfile } from "react-icons/cg";
import { useState } from "react";   
import { RiDeleteBin5Line } from "react-icons/ri";  
import Table from "../components/Table";  
 const AdminPage1 = () => 
 {  
    const [active, setActive] = useState("");
    
     return( 
       
        <div className="container h-screen w-screen"> 
    
        <div className={'fixed flex flex-col  flex-grow h-screen w-48  bg-blue-600' }>  
         <div className={"text-white font-poppins flex  space-x-4  pl-3 mt-5"} > <CgProfile  size={30} className="text-white"/> <h6> Admin</h6>  </div> 
         <div className={` absolute top-40 flex font-poppins space-x-4 pl-3  mt-4  w-full text-white cursor-pointer ${  active === "Menu Admin" ?  "bg-white text-blue-700" : "text-dimWhite" } `}  onClick={() => setActive("Menu Admin")}>  <IoMenu size={30}  /> <h6> Menu Admin</h6>   </div>
         <div className={`absolute top-48 flex font-poppins space-x-4 pl-3  mt-6 w-full text-white cursor-pointer ${  active === "Utilisateurs" ? "bg-white text-blue-700" : "text-dimWhite" } `}  onClick={() => setActive("Utilisateurs")}>  <FaUsers size={30} /> <h6>  Utilisateurs </h6> </div> 
        
         <div className={`absolute  top-56 flex font-poppins space-x-4  pl-3 mt-8 w-full text-white cursor-pointer ${  active === "Moderateurs" ? "bg-white text-blue-700" : "text-dimWhite" } `}  onClick={() => setActive("Moderateurs")} >  <FaUsersBetweenLines  size={30} />  <h6> Moderateurs </h6> </div> 
         <div className={`absolute  top-64 flex font-poppins space-x-4 pl-3 mt-10 w-full text-white cursor-pointer ${  active === "Upload Article" ? "bg-white text-blue-700" : "text-dimWhite" } `}  onClick={() => setActive("Upload Article")}> <MdCloudUpload size={30} /> <h6>  Upload Article </h6> </div>
         
         <div className={`absolute bottom-16 flex font-poppins space-x-4 pl-3 w-full text-white cursor-pointer  `} > <TbLogout size={30} /> <h6> Deconnexion </h6>  </div>

        </div>  
      
        <div className="flex flex-row"> 
        
       <div className=" absolute mt-28 ml-56"> 
       <button className="  rounded-xl bg-blue-600 px-10 py-3 text-base  font-poppins font-bold text-white transition duration-200 hover:bg-blue-300 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">Ajouter Utilisateur +</button>  
       </div>   
       
        <div className=" absolute mt-28 right-44"> 
       <button className="  rounded-xl bg-white px-6 py-3 text-base  font-poppins font-bold text-indigo-900  transition duration-200 hover:bg-blue-300 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"> Modifier </button>  
       </div> 
       
        <div className=" absolute mt-28 right-4">  
        <button className="  flex items-center rounded-xl bg-red-500 px-6 py-3 text-base  font-poppins font-bold text-white transition duration-200 hover:bg-blue-300 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"> Supprimer <RiDeleteBin5Line  size={20}/> </button>  
        </div> 
         </div>  
         <div className="mt-48  flex w-[1110px] ml-56 ">
        
         <Table/> 
         </div>
        </div>
    )   
    
 } 
 export default AdminPage1 
  
    