import React, { useState, ChangeEvent } from 'react';
import Autosuggest from 'react-autosuggest';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue:string|undefined;
}

const SearchBar: React.FC<SearchBarProps> = ({ initialValue,onSearch }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>(initialValue === undefined ? '':initialValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const fetchSuggestions = (value: string) => {
    // Make API request to fetch suggestions based on the value
    // Update 'suggestions' state with the fetched suggestions
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    fetchSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: string) => suggestion;

  const renderSuggestion = (suggestion: string) => <div>{suggestion}</div>;

  const onChange = (event: ChangeEvent<{}>, { newValue }: { newValue: string }) => {
    setSearchValue(newValue);
  };

  const handleSearch = () => {
    onSearch(searchValue);
    navigate(`/resultat-de-recherche/${searchValue}`);
  };

  const clearInput = () => {
    setSearchValue('');
  };

  return (
    <div className="relative flex items-center w-4/6">
      <div className="relative flex items-center w-full bg-white border border-blue-500 shadow-lg">
        <FaSearch className="mx-4 text-blue-500" />
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: 'Search articles',
            value: searchValue,
            onChange,
            className: 'w-full outline-none bg-white py-4',
          }}
        />
        {searchValue && (
          <FaTimes
            className="absolute text-blue-500 cursor-pointer right-5"
            onClick={clearInput}
          />
        )}
      </div>
      <button
        className=" px-6 py-4 bg-[#0671E0] text-lg font-bold hover:bg-[#0663C7] rounded-sm focus:bg-[#0663C7] text-white ml-2"
        onClick={handleSearch}
      >
        Rechercher
      </button>
    </div>
  );
};

export default SearchBar;
