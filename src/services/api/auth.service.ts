import api from "./axiosConfig";

export function login(username:string, password:string) {
    api.post("login", {username,password})
      .then(response => {
        if (response.data.AccessToken) {
          //TODO:check this
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      });
}

export function logout(){
    localStorage.removeItem("user");
}

export function subscribe(username:string,firstName:string,lastName:string,email:string,password:string){
  return api.post("register", {
    username,
    email,
    password,
  });
}
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user') ?? '{}');;
}

export function refreshAccessToken() {
  return api.post("/refresh");
}