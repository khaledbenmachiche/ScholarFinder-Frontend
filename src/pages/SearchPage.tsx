import React from "react";
import logo from "../assets/Logo.svg";
import SearchBar from "../components/SearchBar.tsx";
import earth_search_page from "../assets/earth_search_page.svg";
import { useNavigate } from "react-router-dom";
import NavBarUtilisateur from "../components/NavBarUtilisateur.tsx";
const SearchPage = () => {
    const navigate = useNavigate();
    const handleSearch = (searchQuery:string) => {
        navigate(`/utilisateur/resultat/${searchQuery}`);
    };
    return (
        <div className="relative h-screen overflow-hidden">
            <div className='h-72 flex flex-col bg-[#EEF5FC]'>
                <NavBarUtilisateur/>
                <p className='my-auto text-2xl md:text-4xl font-semibold text-[#0053AD] text-center'>L'INFINI DU
                        SAVOIR VOUS ATTEND A PORTEE DE CLIC.
                </p>
            </div>
            
            <div className='flex justify-center mx-10'>
                <SearchBar initialValue="" onSearch={handleSearch}/>
            </div>
            <img className="absolute -bottom-10" src={earth_search_page} alt="earth <3"/>
        </div>
    );
};

export default SearchPage;