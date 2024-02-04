import React, { useState, useEffect } from 'react';
import logo from '../assets/Logo.svg';
import ArticleModerateur from '../components/ArticleModerateur';
import { AiOutlineMail } from 'react-icons/ai';
import useAxios from '../hooks/useAxios';
import {useNavigate} from 'react-router-dom';
import ModerateurNavBar from "../components/ModerateurNavBar.tsx";
import {toast, ToastContainer} from "react-toastify";
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
  id: number;
  titre: string;
  auteurs: Auteur[];
  resume: string;
  is_validated: boolean;
}

const NonValidateArticlesModerateurPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchResultsCount, setSearchResultsCount] = useState<number>(0);

  const [unvalidatedArticles, setUnvalidatedArticles] = useState<Article[]>([]);
  const axios = useAxios();
  useEffect(() => {
    // Effectue une requête pour récupérer les articles non validés depuis l'API
    const fetchUnvalidatedArticles = async () => {
      try {
        const response = await axios.get('/articles/not_validated/');
        const data: Article[] = await response.data;
        setUnvalidatedArticles(data);
        setSearchResultsCount(data.length);
      } catch (error) {
        console.error('Erreur lors de la récupération des articles non validés :', error);
      }
    };

    fetchUnvalidatedArticles();
  }, []); // Le tableau vide signifie que cet effet ne s'exécutera qu'une fois après le montage du composant

  const handleApproveArticle = async (articleId: string) => {
    // Mettez à jour l'état des articles en marquant l'article comme approuvé
    try{
      const response = await axios.put(`/articles/${articleId}/validate/`);
      if(response.status !== 200){
        throw new Error('Erreur lors de la validation de l\'article');
      }
      setUnvalidatedArticles(prevArticles =>prevArticles.filter((article) => article.titre !== articleId));
      setSearchResultsCount(prevCount => prevCount - 1);
      toast.success('Article approuvé avec succès', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }catch(error){
        console.error('Erreur lors de la validation de l\'article :', error);
        toast.error('Erreur lors de la validation de l\'article', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }
   
  };

  return (
    <div className='Page'>
      <ToastContainer />
      <ModerateurNavBar/>
      <div className='flex flex-col Body md:flex-row'>
        <div className="w-full p-4 Results">
          <div className="flex justify-between items-center mb-6 md:mb-16 border-b p-2 md:p-6 border-[#00000080]">
            <p className="text-sm md:text-lg">
              {searchResultsCount} ARTICLES NON APPROUVES 
            </p>
          </div>

          <div className='lg:grid lg:grid-cols-2 lg:gap-4'>
            {unvalidatedArticles.map((article) => (
              <ArticleModerateur
                key={article.id}
                article={article}
                onViewArticle={() => navigate(`/moderateur/update_article/${article.id}`)}
                onApproveArticle={() => handleApproveArticle(String(article.id))}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='p-20 PREVIOUS '></div>

      <div className='Footer flex flex-col md:flex-row justify-between bg-[#EEF5FC]'>
        <div className='md:ml-20'>
          <p className='mt-8 mb-6 font-medium text-center md:mb-10 md:text-left'>QUI SOMMES NOUS</p>
          <div className='flex justify-center mb-6 md:mb-10'>
            <img className='font-medium' src={logo} alt='logo' /><span className='font-bold'>Truth Finder</span>
          </div>
          <p className='mb-4 font-medium text-center md:mb-20 md:text-left'>L'INFINITE DU SAVOIR <br />VOUS ATTEND A <br />PORTEE DU CLIC.</p>
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
          <p className='text-[#717171] font-medium mb-6'>ENTRER VOTRE EMAIL<br /> POUR ETRE NOTIFIE SUR <br />LES NOUVEUX ARTICLES <br />DISPONIBLES</p>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="border rounded p-2 w-64 bg-[#C9CED6]"
            />
            <div className="absolute inset-y-0 right-0 flex items-center hidden pr-2 pointer-events-none md:flex">
              <AiOutlineMail className="text-2xl text-gray-500" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NonValidateArticlesModerateurPage;
