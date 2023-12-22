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
    const [active, setActive] = useState("Moderateurs"); 
    
     return( 
       
        <div className="  w-screen  h-screen    ">  
        <div className={'  lg:hidden fixed  flex flex-col h-full  z-40 bg-blue-100 w-14 ' }>  
         <div className={"text-blue-900 font-medium font-poppins flex  space-x-4  pl-3 mt-5"} > <CgProfile  size={30} />  </div> 
         <div className={` text-blue-900 font-medium absolute top-40 flex font-poppins space-x-4 pl-3  mt-8  w-full  cursor-pointer ${  active === "Menu Admin" ?  "bg-white  text-blue-700" : "" } `}  onClick={() => setActive("Menu Admin")}>  <IoMenu size={30}  /> </div>
         <div className={` text-blue-900 font-medium absolute top-48 flex font-poppins space-x-4 pl-3  mt-10 w-full cursor-pointer ${  active === "Utilisateurs" ? "bg-white text-blue-700" : "" } `}  onClick={() => setActive("Utilisateurs")}>   <FaUsers size={30} /></div> 
        
         <div className={` text-blue-900 font-medium absolute  top-56 flex font-poppins space-x-4  pl-3 mt-12 w-full  cursor-pointer ${  active === "Moderateurs" ? "bg-white text-blue-700" : "" } `}  onClick={() => setActive("Moderateurs")} >  <FaUsersBetweenLines  size={30} />  </div> 
         <div className={` text-blue-900 font-medium absolute  top-64 flex font-poppins space-x-4 pl-3 mt-14 w-full  cursor-pointer ${  active === "Upload Article" ? "bg-white text-blue-700" : "" } `}  onClick={() => setActive("Upload Article")}> <MdCloudUpload size={30} /> </div>
         
         <div className={` text-blue-900 font-medium absolute top-[600px] flex font-poppins space-x-4 pl-3 w-full cursor-pointer  `} > <TbLogout size={30} />  </div>

        </div>  
    
        <div className={' invisible lg:visible fixed flex flex-col  flex-grow h-screen   bg-blue-100  w-48' }>  
         <div className={"text-blue-900 font-medium font-poppins flex  space-x-4  pl-3 mt-5"} > <CgProfile  size={30} /> <h6 > Admin</h6>  </div> 
         <div className={` text-blue-900 font-medium  absolute top-40 flex font-poppins space-x-4 pl-3  mt-8  w-full  cursor-pointer ${  active === "Menu Admin" ?  "bg-white  text-blue-700" : "" } `}  onClick={() => setActive("Menu Admin")}>  <IoMenu size={30}  /> <h6> Menu Admin</h6>   </div>
         <div className={` text-blue-900 font-medium  absolute top-48 flex font-poppins space-x-4 pl-3  mt-10 w-full cursor-pointer ${  active === "Utilisateurs" ? "bg-white text-blue-700" : "" } `}  onClick={() => setActive("Utilisateurs")}>   <FaUsers size={30} /> <h6 >  Utilisateurs </h6> </div> 
        
         <div className={` text-blue-900 font-medium  absolute  top-56 flex font-poppins space-x-4  pl-3 mt-12 w-full  cursor-pointer ${  active === "Moderateurs" ? "bg-white text-blue-700" : "" } `}  onClick={() => setActive("Moderateurs")} >  <FaUsersBetweenLines  size={30} />  <h6 > Moderateurs </h6> </div> 
         <div className={` text-blue-900  font-medium  absolute  top-64 flex font-poppins space-x-4 pl-3 mt-14 w-full  cursor-pointer ${  active === "Upload Article" ? "bg-white text-blue-700" : "t" } `}  onClick={() => setActive("Upload Article")}> <MdCloudUpload size={30} /> <h6 >  Upload Article </h6> </div>
         
         <div className={` text-blue-900 font-medium absolute bottom-16 flex font-poppins space-x-4 pl-3 w-full  cursor-pointer  `} > <TbLogout size={30} /> <h6 className=" invisible lg:visible"> Deconnexion </h6>  </div>

        </div>  
      
        <div className="flex flex-row"> 
        
        <div className="absolute ml-16 mt-6 lg:mt-16 lg:ml-56">
 
  <button className=" hidden lg:w-full  lg:flex  lg:rounded-xl  lg:bg-blue-800 lg:p-1 lg:px-6 lg:py-3 lg:text-base  lg:font-poppins lg:font-bold lg:text-white transition duration-200 hover:bg-blue-300 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
    {active === 'Moderateurs' ? 'Ajouter Utilisateur +' : 'Ajouter Moderateur +'}
  </button> 
  
       <button className=" lg:hidden w-full rounded-xl px-4 py-1 bg-blue-800 text-base  font-poppins font-bold  text-white transition duration-200 hover:bg-blue-300 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"> + </button>  
     
</div>  
       
        <div className=" absolute ml-52 mt-6 lg:mt-16 lg:right-48"> 
       <button className=" w-full rounded-xl bg-blue-100 p-1 lg:px-6 lg:py-3 text-base  font-poppins font-bold text-indigo-900  transition duration-200 hover:bg-blue-300 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"> Modifier </button>  
       </div> 
       
        <div className=" absolute ml-28 mt-6 lg:mt-16 lg:right-6">  
        <button className=" hidden lg:w-full  lg:flex lg:items-center lg:rounded-xl  lg:bg-red-500 lg:p-1 lg:px-6 lg:py-3 lg:text-base  lg:font-poppins lg:font-bold lg:text-white transition duration-200 hover:bg-blue-300 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"> Supprimer <RiDeleteBin5Line  size={20}/> </button>  
        <button className=" lg:hidden w-full  flex items-center rounded-xl  bg-red-500 px-3 py-1  lg:px-6 lg:py-3 text-base  font-poppins font-bold text-white transition duration-200 hover:bg-blue-300 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">  <RiDeleteBin5Line  size={25}/> </button>  
        </div>
        </div>  
         <div className=" ml-16 mt-14 lg:mt-32  flex  lg:ml-56  ">
        
       <Table/> 
         </div>
        </div>
    )   
    
 } 
 export default AdminPage1 
  
 