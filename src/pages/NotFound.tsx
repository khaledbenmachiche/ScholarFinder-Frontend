import { Link } from "react-router-dom"
import Earth from '../assets/Earth.svg' ; 
import {useNavigate} from "react-router-dom";
export default function NotFound  () 
{    
    const navigate = useNavigate();
    const handleClickEvent = () => {
        navigate("/");
    }
    return (
        <  div className="  relative  bg-blue-100 w-screen  h-screen overflow-hidden">  
            <h1 className=" text-9xl pt-24 ml-[130px]  lg:ml-[550px] font-bold font-poppins  text-blue-900"> 404 </h1>
            <h2 className=" text-2xl font-poppins font-bold  text-blue-950   ml-[160px]   lg:ml-[580px]   ">Page not found !</h2>  
            <h2 className=" text-base lg:text-xl font-poppins font-bold text-blue-500 ml-7   lg:ml-[400px]   " > We are sorry the page you requested could not be found     </h2>   
           <h2 className=" text-base lg:text-xl  font-poppins font-bold text-blue-500  ml-32 lg:ml-[530px]"> Please go back to the Home Page  </h2>
           <button className="  mt-4 ml-[180px] lg:ml-[600px] px-5  py-3 text-base  text-white font-bold   bg-blue-600 border-2 border-blue-600 hover:text-blue-800 hover:border-blue-800 rounded-xl font-poppins hover:bg-blue-100 active:bg-brand-700">  Home Page  </button> 
           
           <img  onClick={handleClickEvent} className=" cursor-pointer absolute  -bottom-52 md:bottom-0 md:left-[300px] lg:top-[150px] lg:left-[450px]  "
                 src={Earth} alt="earth "/>
           

        </div >
    )
}