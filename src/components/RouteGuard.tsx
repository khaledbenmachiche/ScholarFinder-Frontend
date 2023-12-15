import React from 'react';
import { Navigate } from 'react-router-dom';



const RouteGuard = ({children}:{children:React.JSX.Element}) => {
   function hasJWT() {
       const user = localStorage.getItem("user");
        if (user) {
              return true;
        }else{
            return false;
        }
   }
   if (hasJWT()) {
       return children
   }else{
    return <Navigate to="/auth" replace />;
   }
};
 
export default RouteGuard;