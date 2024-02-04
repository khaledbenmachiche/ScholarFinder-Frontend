import React, {useState} from 'react';
import {FaSearch, FaBookmark, FaRegBookmark} from 'react-icons/fa';


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

interface ArticleProps {
    article: Article;
    onViewArticle: () => void;
    onApproveArticle: () => void;
}

const ArticleModerateur: React.FC<ArticleProps> = ({ article, onViewArticle, onApproveArticle }) => {

   
  const handleApproveArticle = () => {
    // Approuver l'article et le faire disparaître de la liste
    onApproveArticle();
  };
  const handleViewArticle = () => {
    onViewArticle();
  }

    return (
        <div className="article-box border border-solid border-[#00000033] p-4 md:p-10 mb-4 ">
            <h2 className="mb-2 text-lg font-bold">{article.titre}</h2>
            <p className="mb-2 text-sm">
            <strong>Authors:</strong> {[...new Set(article.auteurs.map((auteur) => auteur.nom))].join(', ').slice(0,120)+"..."}
            </p>
            <p className="mb-2 text-sm">
                <strong>Institution:</strong>  {[...new Set(article.auteurs.flatMap((auteur) => auteur.institutions.map((institution) => institution.nom)))].join(', ').slice(0,120)+"..."}
            </p>
            <p className="mb-2 text-sm">
                <strong>Abstract:</strong> {article.resume.slice(0,100)+"..."}
            </p>
            <div className="flex flex-col md:flex-col lg:flex-row items-center mt-10 justify-center gap-2 ">
                <button className="flex w-full items-center justify-center px-10 py-3 border " onClick={onViewArticle}>
                    <FaSearch className="mr-4 icon "/>
                    VOIR L'ARTICLE
                </button>
                <button
                    className={`bg-[#0663C7] w-full items-center justify-center text-center text-white border py-3 px-10 flex ${article.is_validated ? 'approved' : ''} `}
                    onClick={onApproveArticle}
                    disabled={article.is_validated}>
                    APPROUVER ARTICLE
                </button>
            </div>
        </div>
    );
};

export default ArticleModerateur;
