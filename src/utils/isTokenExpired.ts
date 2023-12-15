import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token: string): boolean => {
    const decodedToken = jwtDecode(token);
    if(decodedToken.exp === undefined){
        return false;
    }
    return dayjs.unix(decodedToken.exp).diff(dayjs()) < 1
}

export default isTokenExpired;