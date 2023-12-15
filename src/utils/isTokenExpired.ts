import { jwtDecode } from "jwt-decode";
const isTokenExpired = (token: string): boolean => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (!decodedToken.exp) {
        return false;
    }
    return decodedToken.exp < currentTime;
}

export default isTokenExpired;