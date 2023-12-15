import React, {useState} from 'react';

interface AuthUser{
    "user-type":string;
    "AccessToken":string;
}

interface AuthContextValue {
    authUser: AuthUser | null;
    setAuthUser: (user: AuthUser|null) => void;
}

interface AuthProviderProps{
    children:React.ReactNode
}


const AuthContext = React.createContext<AuthContextValue|null>(null);
export default AuthContext;



export function AuthProvider(props:AuthProviderProps) {
    const [authUser,setAuthUser] = useState<AuthUser|null>(()=>{
        const user = localStorage.getItem('user');
        if(user){
            return JSON.parse(user);
        }else{
            return null;
        }
    });
    const value:AuthContextValue = {
        authUser,
        setAuthUser,
    }

    return(
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}