import React from "react";
import SearchBar from "../components/SearchBar.tsx";
import earth_search_page from "../assets/earth_search_page.svg";
import { useNavigate } from "react-router-dom";
import NavBarUtilisateur from "../components/NavBarUtilisateur.tsx";
const SearchPage = () => {
    const navigate = useNavigate();
    const handleSearch = (searchQuery:string) => {
        navigate(`/resultat-de-recherche/${searchQuery}`);
    };
    return (
        <div className="relative h-screen bg-white">
            <div className='relative h-72 flex flex-col bg-[#EEF5FC]'>
                <NavBarUtilisateur/>
                <p className='my-auto text-2xl md:text-4xl font-semibold text-[#0053AD] text-center pl-2 pr-2'>L'INFINI DU
                        SAVOIR VOUS ATTEND A PORTEE DE CLIC.
                </p>
            <div className='absolute flex justify-center w-full -bottom-7'>
                <SearchBar initialValue="" onSearch={handleSearch} />
            </div>
            </div>
            <img className="absolute bottom-0" src={earth_search_page} alt="earth"/>
        </div>
    );
};

export default SearchPage;