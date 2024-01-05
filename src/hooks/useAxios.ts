import axios from 'axios'
import isTokenExpired from '../utils/isTokenExpired';
import useUser from './useUser';

const baseURL = 'http://127.0.0.1:8000/api'

const useAxios = () => {
    //useUser uses a useContext hook to get the user and setUser from the AuthContext.
    const {user,addUser,removeUser} = useUser();

    const axiosInstance = axios.create({
        baseURL,
        //headers:{Authorization: user ? `Bearer ${user.AccessToken}`:undefined},
        withCredentials: true,
    });

    axiosInstance.interceptors.request.use(
        async req => {
        if(!user) return req;
        const isExpired = isTokenExpired(user.AccessToken);
    
        if(!isExpired) return req
        const response = await axios.post(`${baseURL}/authentication/refresh`,{},{withCredentials: true});
        if (response.status===200 && response.data.AccessToken) {
            const RefreshedUser = {...user,AccessToken:response.data.AccessToken}
            addUser(RefreshedUser);
            req.headers.Authorization = `Bearer ${response.data.AccessToken}`;
        }else{
            removeUser();
        }
        return req;
    },
    async error => {
            return Promise.reject(error);
    })
    return axiosInstance
}

export default useAxios;