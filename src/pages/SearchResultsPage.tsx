import React, {useEffect, useState} from 'react';
import SearchBar from '../components/SearchBar';

import logo from '../assets/Logo.svg'
import Filters from '../components/Filters';
import ArticleResult from '../components/ArticleResult';
import {AiOutlineMail} from 'react-icons/ai';
import { useParams,useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import NavBarUtilisateur from '../components/NavBarUtilisateur';
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
    id:number;
    titre: string;
    auteurs: Auteur[];
    resume: string;
}

const SearchResultsPage: React.FC = () => {
    const axios = useAxios();
    const navigate = useNavigate()
    const {searchQuery} = useParams<string>();
    const [searchResultsCount, setSearchResultsCount] = useState<number>(0);
    const [searchResults, setSearchResults] = useState<Article[]>([]);
    const [articlesToShow, setArticlesToShow] = useState<Article[]>([]);

    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    const [query, setQuery] = useState(searchQuery);
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
        <div className='Page overflow-x-hidden'>
            <div className='relative h-72 mb-16 flex flex-col bg-[#EEF5FC]'>
                <NavBarUtilisateur/>
                <p className='my-auto text-2xl md:text-4xl font-semibold text-[#0053AD] text-center'>L'INFINI DU
                        SAVOIR VOUS ATTEND A PORTEE DE CLIC.
                </p>
            <div className='absolute flex justify-center w-full -bottom-7'>
                <SearchBar initialValue={query} onSearch={handleSearch}/>
            </div></div>

            <div className='sticky top-0 z-50 my-6 p-4 border-y border-solid border-[#00000038] bg-white'>
                <p className='ml-2 md:ml-12'>Accueil {'>'} Recherche </p>
            </div>

            <div className='flex flex-col Body md:flex-row'>

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
                    <div className='flex justify-around mb-4 '>
                        <p className=' text-xl text-[#00000080] font-medium'>FILTRES</p>
                        <button className=' whitespace-nowrap text-lg text-[#ff020280] cursor-pointer hover:text-red-700 font-medium'
                           onClick={handleClearAllFilters}>
                            CLEAR ALL
                        </button>
                    </div>
                    <div className="mx-4 md:mx-16 mb-12 border-t border-solid border-[#00000080]"></div>
                    <Filters handleFilterByInstitutionChange={handleFilterByInstitutionChange}
                             handleFilterByPeriodChange={handleFilterByPeriodChange}
                             handleTagFilterChange={handleTagFilterChange}
                             handleAuteurFilterChange={handleAuteurFilterChange}
                             clear={clear}
                    />
                </div>


                <div className="w-full p-4 Results md:w-2/3">

                    <div
                        className="flex justify-between items-center mb-6 md:mb-16 border-b p-2 md:p-6 border-[#00000080]">
                        <p className="text-sm text-gray-500 md:text-lg">
                            {searchResultsCount} RESULTATS POUR LA RECHERCHE DE “ {query?.toUpperCase()} ”
                        </p>
                    </div>

                    {articlesToShow.map((article) => (
                        <ArticleResult
                            key={article.id}
                            titre={article.titre}
                            auteurs={article.auteurs}
                            resume={article.resume}
                            onViewArticle={() => {
                                navigate(`/utilisateur/article/${article.id}`)
                            }}
                            onAddToFavorites={() => {
                                // Implement logic to add to favorites
                            }}
                        />
                    ))}
                    <div className="flex justify-center w-full gap-5">
                        {prevPage && <button className="px-4 py-2 text-white bg-blue-500 rounded"
                                             onClick={() => handlePageChange(prevPage)}>Previous</button>}
                        {nextPage && <button className="px-4 py-2 text-white bg-blue-500 rounded"
                                             onClick={() => handlePageChange(nextPage)}>Next</button>}
                    </div>
                </div>

            </div>

            <div className='Footer flex flex-col md:flex-row justify-between bg-[#EEF5FC]'>

                <div className='md:ml-20'>
                    <p className='mt-8 mb-6 font-medium text-center md:mb-10 md:text-left'>QUI SOMMES NOUS</p>
                    <div className='flex justify-center mb-6 md:mb-10'>
                        <img className='font-medium' src={logo} alt='logo'/><span
                        className='font-bold'>Truth Finder</span>
                    </div>
                    <p className='mb-4 font-medium text-center md:mb-20 md:text-left'>L'INFINITE DU SAVOIR <br/>VOUS
                        ATTEND A <br/>PORTEE DU CLIC.</p>
                </div>

                <div>
                    <p className='my-8 font-medium text-center cursor-pointer'>SIGNALER ERREUR</p>
                </div>

                <div className='mb-4 text-center md:mb-0'>
                    <p className='my-4 font-medium md:my-8'>SECTIONS</p>
                    <p className='text-[#717171] font-medium mb-4'>ACCUEIL</p>
                    <p className='text-[#717171] font-medium mb-4'>ARTICLES FAVORIS</p>
                    <p className='text-[#717171] font-medium mb-4'>RECHERCHE</p>
                </div>

                <div className='mb-20 text-center md:mr-20 md:text-left'>
                    <p className='my-4 font-medium md:my-8 '>S'ABONNER</p>
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
                            <AiOutlineMail className="text-2xl text-gray-500"/>
                        </div>
                    </div>
                </div>

            </div>


        </div>

    );
};

export default SearchResultsPage;
