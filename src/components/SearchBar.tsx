import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import FilterByAuthor from "./FilterByAuthor";
import { FaTimes } from 'react-icons/fa';

interface Article {
  author: string;
  title: string;
  description: string;
  publicationDate: string;
  authorInstitution: string;
}

interface SearchBarProps {
  data: Article[];
}

const SearchBar: React.FC<SearchBarProps> = ({ data }) => {
  const [filteredData, setFilteredData] = useState<Article[]>([]);
  const [wordEntered, setWordEntered] = useState<string>("");
  const [authorFilter, setAuthorFilter] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Article[]>([]);

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : data.filter(
          (article) =>
            article.title.toLowerCase().includes(inputValue) ||
            article.author.toLowerCase().includes(inputValue)
        );
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: Article) => suggestion.title;

  const renderSuggestion = (suggestion: Article) => (
    <div>
      <p>{suggestion.title}</p>
      
    </div>
  );

  const onChange = (event: React.ChangeEvent<{}>, { newValue }: { newValue: string }) => {
    setWordEntered(newValue);
  };

  const handleFilter = () => {
    const newFilter = data.filter((article) => {
      const lowerCasedTitle = article.title.toLowerCase();
      const lowerCasedAuthor = article.author.toLowerCase();
      const lowerCasedWord = wordEntered.toLowerCase();

      return (
        lowerCasedTitle.includes(lowerCasedWord) &&
        (!authorFilter || lowerCasedAuthor.includes(authorFilter))
      );
    });

    setFilteredData(newFilter);
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleSearch = () => {
    handleFilter();
    // Perform any other actions based on the search results
    console.log("Search results:", filteredData);
  };

  const handleFilterByAuthorChange = (author: string | null) => {
    setAuthorFilter(author);
  };

  const inputProps = {
    placeholder: "Search articles",
    value: wordEntered,
    onChange,
    className: "mt-2 border  border-blue-700  w-1/2 mx-auto p-2 bg-[#EEF5FC] ",
    
  };
 

  return (
    <div className="search ">
      <div className=" ">
      
     
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          
          inputProps={inputProps}
         
        />
        
        {wordEntered && (
        <button className="clearButton" onClick={clearInput}>
          <FaTimes />
        </button>
      )}
     
        <button className="border  p-2 mt-2 bg-[#0671E0] text-white text-xl m2-4 hover:bg-[#0663C7] focus:bg-[#0663C7]" onClick={handleSearch}>Search</button>
        </div>
        <div>
          <label>
            Filter by Author:
            <FilterByAuthor onChange={handleFilterByAuthorChange} />
          </label>
        </div>
     
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 5).map((article, index) => (
            <div key={index}>
              <p>{article.title}</p>
              <p>{article.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
