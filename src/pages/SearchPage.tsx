import logo from "../assets/Logo.svg";
import React from "react";
import SearchBar from "../components/SearchBar.tsx";
import earth_search_page from "../assets/earth_search_page.svg";

export const SearchPage = () => {
    return (
        <>
            <div className='Header'>
                <div className='bg-[#EEF5FC] p-6'>
                    <div className='flex mb-24'>
                        <img src={logo} alt='logo'/><span className=' text-xl font-bold'>Truth Finder</span>
                        <p className='mx-32 text-xl font-medium  '>Accueil</p>
                        <p className=' text-xl font-medium '>Article Favoris</p>
                        <p className=' ml-auto text-xl font-medium '> Username </p>
                    </div>
                    <p className='mb-4 md:mb-24 text-2xl md:text-4xl font-medium text-[#0053AD] text-center'>L'INFINI DU
                        SAVOIR VOUS ATTEND A PORTEE DE CLIC.</p>
                </div>

            </div>

            <h1>TRUTH FINDER</h1>
            <div className='flex justify-center'>
                <SearchBar onSearch={handleSearch}/>
            </div>
            <img src={earth_search_page} alt=""/>
        </>
    );
};
