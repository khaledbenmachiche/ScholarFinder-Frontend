import {useLocation, useNavigate} from "react-router-dom";
import {useEffect,useState} from "react";
interface LinkType {
    id:string|number,
    title:string,
    path:string,
}
export default function useNavigationBar(Links:LinkType[]){
    const navigate = useNavigate();
    const location = useLocation();

    const [active,setActive] = useState<string|number>('');
    const handleNavigation = (navLink:LinkType) => {
        setActive(navLink.title);
        navigate(navLink.path);
    }

    useEffect(()=>{
        const currentPath = Links.find(link => link.path === location.pathname )
        if(currentPath){
            setActive(currentPath.id)
        }
    },[location.pathname]);

    return {active,handleNavigation}
}