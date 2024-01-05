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
}

interface ArticleProps {
    titre: string;
    auteurs: Auteur[];
    resume: string;
    onViewArticle: () => void;
    onAddToFavorites: () => void;
}

const ArticleResult: React.FC<ArticleProps> = ({
                                                   titre,
                                                   auteurs,
                                                   resume,
                                                   onViewArticle,
                                                   onAddToFavorites,
                                               }) => {

    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddToFavorites = () => {
        // Toggle the favorite state
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    };

    return (
        <div className="article-box border border-solid border-[#00000033] p-4 md:p-10 mb-4 ">
            <h2 className="text-lg font-bold mb-2">{titre}</h2>
            <p className="text-sm mb-2">
                <strong>Authors:</strong> {[...new Set(auteurs.map(auteur => auteur.nom))].join(', ')}
            </p>
            <p className="text-sm mb-2">
                <strong>Institution:</strong> {[...new Set(auteurs.flatMap(auteur => auteur.institutions.map(institution => institution.nom)))].join(', ')}
            </p>
            <p className="text-sm mb-2">
                <strong>Abstract:</strong> {resume}
            </p>
            <div className="flex flex-col md:flex-row  md:space-x-2 mt-16 justify-center ">
                <button className="btn border py-3 px-10 mr-8 flex mb-2  " onClick={onViewArticle}>
                    <FaSearch className="icon mr-4 "/>
                    VOIR L'ARTICLE
                </button>
                <button
                    className={` bg-[#EEF5FC] border py-3 px-10 mr-8 flex mb-2 add-to-favorites-btn ${isFavorite ? 'active' : ''}  flex-shrink-0 `}
                    onClick={handleAddToFavorites}>
                    {isFavorite ? <FaBookmark className="icon mr-4 text-2xl text-[#0671E0]"/> :
                        <FaRegBookmark className="icon mr-4 text-2xl text-[#0671E0]"/>}
                    {isFavorite ? 'FAVORI' : 'AJOUTER AUX FAVORIS'}
                </button>
            </div>
        </div>
    );
};

export default ArticleResult;
