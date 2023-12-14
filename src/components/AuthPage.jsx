import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import NavBar from "./NavBar";



/* <div>
            <NavBar/>
            <div>
              <Routes>
                <Route path="/" element={<AuthPage/>}/>
                <Route path="/" element={<AuthPage/>}/>
                <Route path="/" element={<AuthPage/>}/>
              </Routes>
            </div>
          </div>*/ 
const AuthPage=()=>
{
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return(
    <div className="w-screen h-screen flex  bg-[#EEF5FC] ">
        
          {isSignUp ? (
            <SignUp onSignInClick={toggleForm} />
          ) : (
            <SignIn onSignUpClick={toggleForm} />
          )}

          <div className="">
          
         
          <NavBar/>
          <p className="text-[#0053AD] text-3xl font-poppins font-medium text-center mt-32 mb-10 ">L'INFINI DU SAVOIR VOUS ATTEND A PORTEE DE CLIC</p>
          <p className=" text-2xl font-poppins font-light  text-center  ">Votre passerelle vers une découverte scientifique<br/>Simplifiez l'exploration des articles savants <br/>avec notre plateforme conviviale.<br/>Donnez vie à votre curiosité.</p>
          <img src='earth.svg' alt="earth" className="mt-[80px] " />
          </div>
        </div>

  );
}

export default AuthPage;