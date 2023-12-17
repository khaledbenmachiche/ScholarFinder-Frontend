const NavBar=()=>
{
  return(
     <div className="flex justify-end py-6 gap-20 pr-36 ">
         <div className="font-medium cursor-pointer">
             <a>Home</a>
         </div>
        <div className="font-medium cursor-pointer">
          <a>Login</a>
        </div>
        <div className="font-medium cursor-pointer">
          <a>Contact</a>
        </div>
        <div className="font-medium cursor-pointer">
          <a>About</a>
        </div>
     </div>

  );
}

export default NavBar;