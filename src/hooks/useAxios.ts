import { useContext } from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import isTokenExpired from '../utils/isTokenExpired';

const baseURL = 'http://127.0.0.1:8000/api'


const useAxios = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error('AuthContext is not defined');
    const { authUser,setAuthUser } = context;

    const axiosInstance = axios.create({
        baseURL,
        headers:{Authorization: authUser ? `Bearer ${authUser.AccessToken}`:undefined},
    });

    axiosInstance.interceptors.request.use(async req => {
        if(!authUser) return req;
        const isExpired = isTokenExpired(authUser.AccessToken);
    
        if(!isExpired) return req
        const response = await axios.post(`${baseURL}/refresh`,{withCredentials: true});
        if (response.status===200 && response.data.AccessToken) {
            localStorage.setItem("user", JSON.stringify({AccessToken:response.data.AccessToken,"user-type":authUser['user-type']}));
            setAuthUser({AccessToken:response.data.AccessToken,"user-type":authUser['user-type']})
            req.headers.Authorization = `Bearer ${response.data.AccessToken}`
        }
        return req;
    })
    return axiosInstance
}

export default useAxios;