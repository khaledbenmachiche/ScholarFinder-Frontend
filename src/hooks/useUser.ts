import { useContext } from "react";
import  AuthContext  from "../context/AuthContext";
import useLocalStorage  from "./useLocalStorage";

interface AuthUser{
    "user-type":string;
    "AccessToken":string;
}

const useUser = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error('AuthContext is not defined');
    const { authUser:user,setAuthUser:setUser } = context;
    const { setItem } = useLocalStorage();

  const addUser = (user: AuthUser) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setItem("user", "");
  };

  return { user, addUser, removeUser };
};

export default useUser;