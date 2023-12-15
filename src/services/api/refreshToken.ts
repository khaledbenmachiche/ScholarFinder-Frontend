import api from "./axiosConfig";
import { AxiosRequestConfig,AxiosRequestHeaders } from "axios";
import isTokenExpired from "../../utils/isTokenExpired";
import { refreshAccessToken } from "./auth.service";

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
    headers: AxiosRequestHeaders
}

const excludeInterceptorUrls = ["register", "login", "refresh", "logout"];

api.interceptors.request.use(
    (config:AdaptAxiosRequestConfig)=> {
    if (excludeInterceptorUrls.some((url) => config.url?.includes(url))) {
        return config;
    }
    const user = JSON.parse(localStorage.getItem('user') ?? '{}');
    const accessToken:string = user?.AccessToken;
    const user_type:string = user?.["user-type"];
    if (accessToken && !isTokenExpired(accessToken)) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
        refreshAccessToken()
        .then((response) => {
            if (response.data.AccessToken) {
                localStorage.setItem("user", JSON.stringify({AccessToken:response.data.AccessToken,"user-type":user_type}));
                config.headers.Authorization = `Bearer ${response.data.AccessToken}`;
            }
        })
    }
    return config;
},
    (error:any)=>{
        return Promise.reject(error);
    }
)