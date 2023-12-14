import React from "react";


const NavBar=()=>
{
  /*<div className="">
        <div>
          <Link to="/">Login</Link>
        </div>
        <div>
          <Link to="/">Contact</Link>
        </div>
        <div>
          <Link to="/">About</Link>
        </div>

     </div>*/ 
  return(
     <div className="flex justify-end">
        <div className="p-8 font-medium ">
          <a href="/AuthPage.jsx">Login</a>
        </div>
        <div className="p-8 font-medium">
          <a href="/AuthPage.jsx">Contact</a>
        </div>
        <div className="p-8 mr-6 font-medium">
          <a href="/AuthPage.jsx">About</a>
        </div>

     </div>

  );
}

export default NavBar;