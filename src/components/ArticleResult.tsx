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
            <h2 className="mb-2 text-lg font-bold">{titre}</h2>
            <p className="mb-2 text-sm">
                <strong>Authors:</strong> {[...new Set(auteurs.map(auteur => auteur.nom))].join(', ')}
            </p>
            <p className="mb-2 text-sm">
                <strong>Institution:</strong> {[...new Set(auteurs.flatMap(auteur => auteur.institutions.map(institution => institution.nom)))].join(', ')}
            </p>
            <p className="mb-2 text-sm">
                <strong>Abstract:</strong> {resume.slice(0, 300) + '...'}
            </p>
            <div className="flex flex-col justify-center mt-16 md:flex-row md:space-x-2 ">
                <button className="flex px-10 py-3 mb-2 mr-8 border btn " onClick={onViewArticle}>
                    <FaSearch className="mr-4 icon "/>
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
