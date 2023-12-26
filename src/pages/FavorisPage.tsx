import React,{useState} from 'react';
import SearchBar from '../components/SearchBar';

import logo from '../assets/Logo.svg'
import Filters from '../components/Filters';
import ArticleFavorisResult from '../components/ArticleFavorisResult';
import { AiOutlineMail } from 'react-icons/ai';

interface Article {
  title: string;
  authors: string[];
  institution: string;
  abstract: string;
}

const SearchPage: React.FC = () => {

  const [searchResultsCount, setSearchResultsCount] = useState<number>(0);
  const [sortingOption, setSortingOption] = useState<string>('plusRecent');
  const [searchResults, setSearchResults] = useState<Article[]>([]); // Assuming Article is a type/interface for your articles

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`/api/search?query=${query}`);
      const data: Article[] = await response.json();
      
      setSearchResults(data);
      setSearchResultsCount(data.length);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleClearAllFilters = () => {
    // Implement logic to clear all filters
    // For example, reset the state variables or make API calls to clear filters
  };
  
  // Sample articles data (replace it with your actual data or API call)
  const sampleArticles = [
  {
    title: 'Article 1',
    authors: ['Author 1', 'Author 2'],
    institution: 'Institution 1',
    abstract: 'Abstract for Article 1...Abstract : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially ....',
  },
  {
    title: 'Article 2',
    authors: ['Author 3', 'Author 4'],
    institution: 'Institution 2',
    abstract: 'Abstract for Article 2...Abstract : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially ....',
  },
  {
    title: 'Article 3',
    authors: ['Author 3', 'Author 4'],
    institution: 'Institution 2',
    abstract: 'Abstract for Article 2...Abstract : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially ....',
  },
  // Add more articles as needed
  ];

  const articlesToShow = sampleArticles.slice(0, 3); 
  
 

 
  return (
    <div className='Page'>
    <div className='Header'>
    <div className='bg-[#EEF5FC] p-6'>
      <div className='flex mb-24'>
        <img src={logo} alt='logo'/><span className=' text-xl font-bold'>Truth Finder</span>
        <p className='mx-32 text-xl font-medium'>Accueil</p>
        <p className=' text-xl font-medium'>Article Favoris</p>
        <p className=' ml-auto text-xl font-medium'> Username </p>
      </div>
      <p className='mb-24 text-4xl font-medium text-[#0053AD] text-center'>L'INFINI DU SAVOIR VOUS ATTEND A PORTEE DE CLIC.</p> 
    </div>
    
    </div>

    <div className='flex justify-center'>
     <SearchBar onSearch={handleSearch} />
    </div>
     
     <div className=' my-6 p-4 border-y border-solid border-[#00000038]  bg-[#d9d9d91e] '>
        <p className='ml-12'>Accueil {'>'} Recherche </p>
     </div>

    <div className='Body flex'>

    <div className='Filters w-1/3  '>
      <div className='flex '>
     <p className='mb-5 mt-12 ml-16 text-xl text-[#00000080] font-medium'>FILTRES</p>
     <p className='mb-5 mt-12 ml-52 text-xl text-[#ff020280] cursor-pointer font-medium'onClick={handleClearAllFilters}>CLEAR ALL</p>
     </div>
     <div className="mx-16 mb-12 border-t border-solid border-[#00000080]"></div>
     <Filters/>
    </div>

    <div className="Results w-2/3 p-4">

    <div className="flex justify-between items-center mb-16 border-b p-6  border-[#00000080]">
    <p className="text-lg">
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
        <div className=' grid grid-cols-2 gap-4'>
          {articlesToShow.map((article, index) => (
            <ArticleFavorisResult
              key={index}
              title={article.title}
              authors={article.authors}
              institution={article.institution}
              abstract={article.abstract}
              onViewArticle={() => {
                // Implement logic to view the article
              }}
              onAddToFavorites={() => {
                // Implement logic to add to favorites
              }}
            />
          ))}
          </div>
        </div>

    </div> 

    <div className='PREVIOUS  p-20 '></div>

    <div className='Footer flex justify-between bg-[#EEF5FC]'>

     <div className='ml-20'>
      <p className='font-medium mt-8 mb-10 ' >QUI SOMMES NOUS</p>
      <div className='flex mb-10'>
      <img className='font-medium ' src={logo} alt='logo'/><span className=' font-bold'>Truth Finder</span>
      </div>
      <p className='font-medium mb-20'>L'INFINITE DU SAVOIR <br/>VOUS ATTEND A <br/>PORTEE DU CLIC.</p>
     </div>

     <div>
      <p className='font-medium my-8 cursor-pointer'>SIGNALER ERREUR</p>
     </div>

     <div>
      <p className='font-medium my-8'>SECTIONS</p>
      <p className='text-[#717171] font-medium mb-4'>ACCUEIL</p>
      <p className='text-[#717171] font-medium mb-4'>ARTICLES FAVORIS</p>
      <p className='text-[#717171] font-medium mb-4'>RECHERCHE</p>
     </div>

     <div className='mr-20 '>
      <p className='font-medium my-8 '>S'ABONNER</p>
      <p className='text-[#717171] font-medium mb-6'>ENTRER VOTRE EMAIL<br/> POUR ETRE NOTIFIE SUR <br/>LES NOUVEUX ARTICLES <br/>DISPONIBLES</p>
      <div className="relative">
      <input
        type="email"
        placeholder="Enter your email"
        className="border rounded p-2 w-64 bg-[#C9CED6]"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <AiOutlineMail className="text-gray-500 text-2xl" />
      </div>
    </div>
     </div>

    </div>


     </div>  
    
  );
};

export default SearchPage;
