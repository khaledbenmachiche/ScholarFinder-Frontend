import React,{ useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';


const RouteGuard = ({children}:{children:React.JSX.Element}) => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    const {authUser} = context;
    if (authUser) {
        return children
    }else{
        return <Navigate to="/auth" replace />;
    }
};
 
export default RouteGuard;