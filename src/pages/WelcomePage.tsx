
import Earth from '../assets/Earth.svg' ; 
import Navrbar2 from "../components/Navbar"; 
import MidSection from "../components/MidSection"


function WelcomePage ()
{   
    
    return ( 
      
      
      <main  className="relative  h-screen w-screen overflow-hidden" >  
        <Navrbar2/>  
        <MidSection/>
        <img className="absolute -bottom-96 lg:top-[150px] lg:left-[450px]  " src={Earth} alt="earth "   /> 
      </main>
       

    ) ; 

} 
export default WelcomePage  

