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

const ArticleResult: React.FC<ArticleProps> = ({ article, onViewArticle, onApproveArticle }) => {

   
  const handleApproveArticle = () => {
    // Approuver l'article et le faire disparaître de la liste
    onApproveArticle();
  };

    return (
        <div className="article-box border border-solid border-[#00000033] p-4 md:p-10 mb-4 ">
            <h2 className="text-lg font-bold mb-2">{article.titre}</h2>
            <p className="text-sm mb-2">
            <strong>Authors:</strong> {[...new Set(article.auteurs.map((auteur) => auteur.nom))].join(', ')}
            </p>
            <p className="text-sm mb-2">
                <strong>Institution:</strong>  {[...new Set(article.auteurs.flatMap((auteur) => auteur.institutions.map((institution) => institution.nom)))].join(', ')}
            </p>
            <p className="text-sm mb-2">
                <strong>Abstract:</strong> {article.resume}
            </p>
            <div className="flex flex-col md:flex-row  md:space-x-2 mt-16 justify-center ">
                <button className="btn border py-3 px-10 mr-8 flex mb-2  " onClick={onViewArticle}>
                    <FaSearch className="icon mr-4 "/>
                    VOIR L'ARTICLE
                </button>
                <button
                    className={` bg-[#0663C7] text-white border py-3 px-10 mr-8 flex mb-2 add-to-favorites-btn ${article.is_validated ? 'approved' : ''}  flex-shrink-0 `}
                    onClick={onApproveArticle}
                    disabled={article.is_validated}>
                    APPROUVER ARTICLE
                </button>
            </div>
        </div>
    );
};

export default ArticleResult;
