
import Earth from '../assets/Earth.svg' ; 
import Navrbar from "../components/Navbar";
import {useNavigate} from "react-router-dom";


function WelcomePage () {
    const navigate = useNavigate();
    const handleClickEvent = () =>{
        navigate("/signup");
    }
    return (
      <main  className="relative h-screen w-screen overflow-hidden" >
        <Navrbar/>
          <div className="w-fit ml-10 mt-28 flex flex-col items-start lg:bottom-52 " >
              <h4 className="  whitespace-nowrap font-poppins  font-medium lg:text-2xl  mb-10">Truth Finder rend plus accessible la découverte  <br/> d'articles scientifiques</h4>
              <p className=" whitespace-nowrap mb-10  font-poppins font-normal lg:text-lg  ">Votre passerelle vers une découverte scientifique.<br/>
                  Simplifiez l'exploration des articles savants<br/>
                  avec notre plateforme conviviale.<br/>
                  Donnez vie à votre curiosité et plongez <br/>
                  dans un monde de connaissances.
              </p>
              <button onClick={handleClickEvent} className="rounded-xl bg-blue-600 px-10 py-3 text-base  font-poppins font-medium text-white transition duration-200 hover:bg-blue-300 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">JOIN NOW</button>
          </div>
        <img className="absolute -bottom-96 lg:top-[50px] lg:left-[450px]  " src={Earth} alt="earth "   />
      </main>
       

    ) ; 

} 
export default WelcomePage  

