import React, { useState, useEffect } from 'react';
import logo from '../assets/Logo.svg';
import ArticleModerateur from '../components/ArticleModerateur';
import { AiOutlineMail } from 'react-icons/ai';

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
  is_validated: boolean;
}

const SearchPage: React.FC = () => {

  

  const [searchResultsCount, setSearchResultsCount] = useState<number>(0);
  const [sortingOption, setSortingOption] = useState<string>('plusRecent');

  const [unvalidatedArticles, setUnvalidatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Effectue une requête pour récupérer les articles non validés depuis l'API
    const fetchUnvalidatedArticles = async () => {
      try {
        const response = await fetch('/api/articles?is_validated=false');
        const data: Article[] = await response.json();
        setUnvalidatedArticles(data);
        setSearchResultsCount(data.length); // Mettez à jour le nombre de résultats
      } catch (error) {
        console.error('Erreur lors de la récupération des articles non validés :', error);
      }
    };

    fetchUnvalidatedArticles();
  }, []); // Le tableau vide signifie que cet effet ne s'exécutera qu'une fois après le montage du composant

  const handleApproveArticle = (articleId: string) => {
    // Mettez à jour l'état des articles en marquant l'article comme approuvé
    setUnvalidatedArticles((prevArticles) =>
      prevArticles.filter((article) => article.titre !== articleId)
    );
  };

  return (
    <div className='Page'>
      <div className='Header'>
        <div className='bg-[#EEF5FC] p-6'>
          <div className='flex mb-24'>
            <img src={logo} alt='logo' /><span className=' text-xl font-bold'>Truth Finder</span>
          </div>
          <p className='mb-4 md:mb-24 text-2xl md:text-4xl font-medium text-[#0053AD] text-center'>L'INFINI DU SAVOIR VOUS ATTEND A PORTEE DE CLIC.</p>
        </div>
      </div>

      <div className='my-8 p-4 border-y border-solid border-[#00000038]  bg-[#d9d9d91e] '>
        <p className='ml-2 md:ml-12'>Articles </p>
      </div>

      <div className='Body  flex flex-col md:flex-row'>
        <div className="Results w-full  p-4">
          <div className="flex justify-between items-center mb-6 md:mb-16 border-b p-2 md:p-6 border-[#00000080]">
            <p className="text-sm md:text-lg">
              {searchResultsCount} ARTICLES NON APPROUVES 
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

          <div className='lg:grid lg:grid-cols-2 lg:gap-4'>
            {unvalidatedArticles.map((article) => (
              <ArticleModerateur
                key={article.titre}
                article={article}
                onViewArticle={() => console.log('View Article')}  
                onApproveArticle={() => handleApproveArticle(article.titre)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='PREVIOUS  p-20 '></div>

      <div className='Footer flex flex-col md:flex-row justify-between bg-[#EEF5FC]'>
        <div className='md:ml-20'>
          <p className='font-medium mt-8 mb-6 md:mb-10 text-center md:text-left'>QUI SOMMES NOUS</p>
          <div className='flex justify-center mb-6 md:mb-10'>
            <img className='font-medium' src={logo} alt='logo' /><span className='font-bold'>Truth Finder</span>
          </div>
          <p className='font-medium mb-4 md:mb-20 text-center md:text-left'>L'INFINITE DU SAVOIR <br />VOUS ATTEND A <br />PORTEE DU CLIC.</p>
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
          <p className='text-[#717171] font-medium mb-6'>ENTRER VOTRE EMAIL<br /> POUR ETRE NOTIFIE SUR <br />LES NOUVEUX ARTICLES <br />DISPONIBLES</p>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="border rounded p-2 w-64 bg-[#C9CED6]"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none hidden md:flex">
              <AiOutlineMail className="text-gray-500 text-2xl" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SearchPage;
