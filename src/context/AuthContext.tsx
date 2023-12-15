import React, {useState,useMemo} from 'react';
import AuthUser from '../types/AuthUser';

interface AuthContextValue {
    authUser: AuthUser | null;
    setAuthUser: (user: AuthUser|null) => void;
}

interface AuthProviderProps{
    children:React.ReactNode
}


const AuthContext = React.createContext<AuthContextValue|null>(null);
export default AuthContext;


export function AuthProvider(props: Readonly<AuthProviderProps>) {
    const [authUser,setAuthUser] = useState<AuthUser|null>(()=>{
        const user = localStorage.getItem('user');
        if(user){
            return JSON.parse(user);
        }else{
            return null;
        }
    });
    const value:AuthContextValue = useMemo(()=>{
        return {
            authUser,
            setAuthUser
        }
    },[authUser,setAuthUser]);

    return(
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}