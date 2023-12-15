import { useEffect } from "react";
import useAxios from "./useAxios";
import useUser from "./useUser";
import useLocalStorage from "./useLocalStorage";

export default function useAuth() {
  const api = useAxios();
  const {user, addUser, removeUser}= useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  async function login(username:string, password:string) {
    try {
      const response = await api.post("login", {username,password})
      if (response.data.AccessToken) {
        addUser(response.data)
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }
  
  async function logout(){
    try {
      const response = await api.post('logout');
      if (response.data.message === "success") {
        removeUser();
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
    return api.post("refresh");
  }
  return { login, logout, subscribe, refreshAccessToken };
} 
