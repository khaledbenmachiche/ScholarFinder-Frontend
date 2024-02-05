import React,{useState, forwardRef } from 'react';
import { FaBookmark } from 'react-icons/fa';
import Book from '../assets/Book.svg'
interface ArticleProps {
  title: string;
  authors: string[];
  institution: string;
  abstract: string;
  onViewArticle: () => void;
  onRemoveFromFavorites: () => void;
}

const ArticleFavorisResult: React.FC<ArticleProps> = ({
  title,
  authors,
  institution,
  abstract,
  onViewArticle,
  onRemoveFromFavorites,
}) => {

  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorites = () => {
    // Toggle the favorite state
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };
  
  

  return (
    <div
        className="article-box border border-solid shadow-lg border-[#00000033] p-10 mb-4 "
    >
      <h2 className="mb-2 text-lg font-bold">{title}</h2>
      <p className="mb-2 text-sm">
        <strong>Authors:</strong> {authors.join(', ')}
      </p>
      <p className="mb-2 text-sm">
        <strong>Institution:</strong> {institution}
      </p>
      <p className="mb-2 text-sm">
        <strong>Abstract:</strong> {abstract}
      </p>
      <div className="flex justify-center mt-16 space-x-2">
        <img src={Book}  alt='view_article' className="mr-12 hover:cursor-pointer "  onClick={onViewArticle}/>
        
        <FaBookmark onClick={onRemoveFromFavorites} className="text-5xl hover:cursor-pointer text-[#0671E0]"  />
      </div>
    </div>
  );
};

export default ArticleFavorisResult;
