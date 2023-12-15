import { useContext } from "react";
import useAxios from "./useAxios";
import AuthContext from "../context/AuthContext";

export default function useAuthentification() {
  const api = useAxios();
  const context = useContext(AuthContext);
  if(!context) throw new Error('AuthContext is not defined');
  const { setAuthUser } = context;


  async function login(username:string, password:string) {
    try {
      const response = await api.post("login", {username,password})
      if (response.data.AccessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setAuthUser(response.data);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }
  
  async function logout(){
    try {
      const response = await api.post('logout');
      if (response.data.message === "success") {
        localStorage.removeItem('user');
        setAuthUser(null);
      }
      return true;
    } catch (error : any) {
      return false;
    }
  }
  
  function subscribe(username:string,firstName:string,lastName:string,email:string,password:string){
    return api.post("register", {
      username,
      email,
      password,
    });
  }
  
  function refreshAccessToken() {
    return api.post("/refresh");
  }
  return { login, logout, subscribe, refreshAccessToken };
} 
