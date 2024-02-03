import React,{ useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

type RouteGuardProps = {
    children: React.ReactNode;
    roles?: string[];
};

const RouteGuard = ({children,roles}:RouteGuardProps) => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    const {authUser} = context;
    if (authUser && roles && roles.includes(authUser['user-type'])) {
        return children
    }else if(authUser && !roles){
        return children
    }
    else{
        return <Navigate to="/signin" replace />;
    }
};
 
export default RouteGuard;