import React from "react";
import logo from "../assets/Logo.svg";
import SearchBar from "../components/SearchBar.tsx";
import earth_search_page from "../assets/earth_search_page.svg";
import { useNavigate } from "react-router-dom";
const SearchPage = () => {
    const navigate = useNavigate();
    const handleSearch = (searchQuery:string) => {
        navigate(`/utilisateur/resultat/${searchQuery}`);
    };
    return (
        <div className="relative h-screen overflow-hidden">
            <div className='Header'>
                <div className='bg-[#EEF5FC] p-6'>
                    <div className='flex mb-24'>
                        <img src={logo} alt='logo'/><span className='text-xl font-bold '>Truth Finder</span>
                        <p className='mx-32 text-xl font-medium '>Accueil</p>
                        <p className='text-xl font-medium '>Article Favoris</p>
                        <p className='ml-auto text-xl font-medium '> Username </p>
                    </div>
                    <p className='mb-4 md:mb-24 text-2xl md:text-4xl font-medium text-[#0053AD] text-center'>L'INFINI DU
                        SAVOIR VOUS ATTEND A PORTEE DE CLIC.</p>
                </div>

            </div>
            <div className='flex justify-center mx-10'>
                <SearchBar initialValue="" onSearch={handleSearch}/>
            </div>
            <img className="absolute -bottom-10" src={earth_search_page} alt="earth <3"/>
        </div>
    );
};

export default SearchPage;