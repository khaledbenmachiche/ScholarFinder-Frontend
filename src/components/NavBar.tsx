const NavBar=()=>
{
  return(
     <div className="flex justify-end">
        <div className="p-8 font-medium ">
          <a>Login</a>
        </div>
        <div className="p-8 font-medium">
          <a>Contact</a>
        </div>
        <div className="p-8 mr-6 font-medium">
          <a>About</a>
        </div>
     </div>

  );
}

export default NavBar;