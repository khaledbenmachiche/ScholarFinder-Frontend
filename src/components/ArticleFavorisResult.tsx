import React,{useState} from 'react';
import { FaSearch, FaBookmark ,FaRegBookmark,FaBook} from 'react-icons/fa';
import Book from '../assets/Book.svg'

interface ArticleProps {
  title: string;
  authors: string[];
  institution: string;
  abstract: string;
  onViewArticle: () => void;
  onAddToFavorites: () => void;
}

const ArticleResult: React.FC<ArticleProps> = ({
  title,
  authors,
  institution,
  abstract,
  onViewArticle,
  onAddToFavorites,
}) => {

  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorites = () => {
    // Toggle the favorite state
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };
  
  

  return (
    <div className="article-box border border-solid border-[#00000033] p-10 mb-4 ">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-sm mb-2">
        <strong>Authors:</strong> {authors.join(', ')}
      </p>
      <p className="text-sm mb-2">
        <strong>Institution:</strong> {institution}
      </p>
      <p className="text-sm mb-2">
        <strong>Abstract:</strong> {abstract}
      </p>
      <div className="flex space-x-2 mt-16 justify-center">
        <img src={Book}  alt='view_article' className=" mr-12"  onClick={onViewArticle}/>
        
        <FaBookmark className="text-5xl text-[#0671E0]"  />
      </div>
    </div>
  );
};

export default ArticleResult;
