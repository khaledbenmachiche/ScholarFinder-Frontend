import React, {useEffect, useState} from 'react';
import SearchBar from '../components/SearchBar';

import logo from '../assets/Logo.svg'
import Filters from '../components/Filters';
import ArticleResult from '../components/ArticleResult';
import {AiOutlineMail} from 'react-icons/ai';
import axios from 'axios';

interface Institution {
    id: number;
    nom: string;
}

interface Auteur {
    id: number
    nom: string;
    institutions: Institution[];
}

interface Article {
    titre: string;
    auteurs: Auteur[];
    resume: string;
}

const SearchPage: React.FC = () => {
    const [searchResultsCount, setSearchResultsCount] = useState<number>(0);
    const [sortingOption, setSortingOption] = useState<string>('plusRecent');
    const [searchResults, setSearchResults] = useState<Article[]>([]);
    const [articlesToShow, setArticlesToShow] = useState<Article[]>([]);

    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    const [query, setQuery] = useState<string>('');
    const handleSearch = async (query: string) => {
        setQuery(query);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/recherche/article/${query}`);
            const articles: Article[] = response.data.results;
            setSearchResults(articles);
            setSearchResultsCount(response.data.count);
            setNextPage(response.data.next);
            setPrevPage(response.data.previous);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handlePageChange = (url: string) => {
        axios.get(url)
            .then(response => {
                const data: Article[] = response.data.results;
                setSearchResults(data);
                setSearchResultsCount(data.length);
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setArticlesToShow(searchResults.slice(0, 3));
    }, [searchResults]);

    const [clear, setClear] = useState(false)
    const handleClearAllFilters = () => {
        setAuteurFilter(null);
        setInstitutionFilter(null);
        setTagsFilter("");
        setStartDate(null);
        setEndDate(null);
        setClear(!clear);
    };

    const [showFilters, setShowFilters] = useState(false);

    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    };
    const [auteurFilter, setAuteurFilter] = useState<string | null>(null);
    const [institutionFilter, setInstitutionFilter] = useState<string | null>(null);
    const [tagsFilter, setTagsFilter] = useState<string>("");
    const handleAuteurFilterChange = (author: string | null) => {
        setAuteurFilter(author);
    };

    const handleFilterByInstitutionChange = (institution: string | null) => {
        setInstitutionFilter(institution);
    };
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    const handleFilterByPeriodChange = (startDate: string | null, endDate: string | null) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };
    const handleTagFilterChange = (tags: string[]) => {
        console.log(tags)
        setTagsFilter(tags.join(','));
    };
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/recherche/article/${query}`, {
            params: {
                keywords: tagsFilter,
                institutions: institutionFilter,
                authors: auteurFilter,
                start_date: startDate,
                end_date: endDate,
            }
        })
            .then(response => {
                const articles: Article[] = response.data.results;
                setSearchResults(articles);
                setSearchResultsCount(response.data.count);
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
            })
            .catch(err => console.log(err))
    }, [tagsFilter, institutionFilter, auteurFilter, startDate, endDate]);


    return (
        <div className='Page'>
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

            <div className='flex justify-center'>
                <SearchBar onSearch={handleSearch}/>
            </div>

            <div className='my-6 p-4 border-y border-solid border-[#00000038] bg-[#d9d9d91e]'>
                <p className='ml-2 md:ml-12'>Accueil {'>'} Recherche </p>
            </div>

            <div className='Body flex flex-col md:flex-row'>

                <div>
                    <button
                        className={`md:hidden border p-2 rounded ml-4 mb-4 ${showFilters ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                        onClick={handleToggleFilters}
                    >
                        FILTRER RESULTAT
                    </button>
                </div>

                {/* Responsive Filters Section */}
                <div
                    className={`Filters ${showFilters ? 'block' : 'hidden'}  md:block w-full md:w-1/3`}>
                    <div className=' flex justify-around'>
                        <p className='mb-4  ml-4 md:ml-16 text-xl text-[#00000080] font-medium'>FILTRES</p>
                        <p className='mb-4  ml-72 md:ml-52 text-xl text-[#ff020280] cursor-pointer font-medium'
                           onClick={handleClearAllFilters}>
                            CLEAR ALL
                        </p>
                    </div>
                    <div className="mx-4 md:mx-16 mb-12 border-t border-solid border-[#00000080]"></div>
                    <Filters handleFilterByInstitutionChange={handleFilterByInstitutionChange}
                             handleFilterByPeriodChange={handleFilterByPeriodChange}
                             handleTagFilterChange={handleTagFilterChange}
                             handleAuteurFilterChange={handleAuteurFilterChange}
                             clear={clear}
                    />
                </div>


                <div className="Results w-full md:w-2/3 p-4">

                    <div
                        className="flex justify-between items-center mb-6 md:mb-16 border-b p-2 md:p-6 border-[#00000080]">
                        <p className="text-sm md:text-lg">
                            {searchResultsCount} Résultats pour la recherche de "{/* Include the search query here */}"
                        </p>
                        <div className="flex items-center">
                            <p className="mr-2">Trier par :</p>
                            <select
                                value={sortingOption}
                                onChange={(e) => setSortingOption(e.target.value)}
                                className="border p-1 rounded-md bg-[#EEF5FC]"
                            >
                                <option value="plusRecent">Plus récent</option>
                                <option value="plusAncien">Plus ancien</option>
                                {/* Add more sorting options as needed */}
                            </select>
                        </div>
                    </div>

                    {articlesToShow.map((article, index) => (
                        <ArticleResult
                            key={index}
                            titre={article.titre}
                            auteurs={article.auteurs}
                            resume={article.resume}
                            onViewArticle={() => {
                                // Implement logic to view the article
                            }}
                            onAddToFavorites={() => {
                                // Implement logic to add to favorites
                            }}
                        />
                    ))}
                    <div className="w-full flex gap-5 justify-center">
                        {prevPage && <button className="bg-blue-500 text-white px-4 py-2 rounded"
                                             onClick={() => handlePageChange(prevPage)}>Previous</button>}
                        {nextPage && <button className="bg-blue-500 text-white px-4 py-2 rounded"
                                             onClick={() => handlePageChange(nextPage)}>Next</button>}
                    </div>
                </div>

            </div>

            <div className='Footer flex flex-col md:flex-row justify-between bg-[#EEF5FC]'>

                <div className='md:ml-20'>
                    <p className='font-medium mt-8 mb-6 md:mb-10 text-center md:text-left'>QUI SOMMES NOUS</p>
                    <div className='flex justify-center mb-6 md:mb-10'>
                        <img className='font-medium' src={logo} alt='logo'/><span
                        className='font-bold'>Truth Finder</span>
                    </div>
                    <p className='font-medium mb-4 md:mb-20 text-center md:text-left'>L'INFINITE DU SAVOIR <br/>VOUS
                        ATTEND A <br/>PORTEE DU CLIC.</p>
                </div>

                <div>
                    <p className='font-medium my-8 cursor-pointer text-center'>SIGNALER ERREUR</p>
                </div>

                <div className='text-center mb-4 md:mb-0'>
                    <p className='font-medium my-4 md:my-8'>SECTIONS</p>
                    <p className='text-[#717171] font-medium mb-4'>ACCUEIL</p>
                    <p className='text-[#717171] font-medium mb-4'>ARTICLES FAVORIS</p>
                    <p className='text-[#717171] font-medium mb-4'>RECHERCHE</p>
                </div>

                <div className='md:mr-20 text-center md:text-left mb-20'>
                    <p className='font-medium my-4 md:my-8 '>S'ABONNER</p>
                    <p className='text-[#717171] font-medium mb-6'>ENTRER VOTRE EMAIL<br/> POUR ETRE NOTIFIE SUR <br/>LES
                        NOUVEUX ARTICLES <br/>DISPONIBLES</p>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="border rounded p-2 w-64 bg-[#C9CED6]"
                        />
                        <div
                            className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none md:flex">
                            <AiOutlineMail className="text-gray-500 text-2xl"/>
                        </div>
                    </div>
                </div>

            </div>


        </div>

    );
};

export default SearchPage;
