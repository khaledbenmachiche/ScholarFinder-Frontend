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
    navigate(`/utilisateur/resultat/${searchValue}`);
  };

  const clearInput = () => {
    setSearchValue('');
  };

  return (
    <div className="relative flex items-center md:w-3/5">
      <div className="relative flex items-center w-full p-3 border border-blue-500 rounded">
        <FaSearch className="mr-2 text-blue-500" />
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
            className: 'w-full outline-none ',
          }}
        />
        {searchValue && (
          <FaTimes
            className="absolute ml-2 text-blue-500 cursor-pointer right-1"
            onClick={clearInput}
          />
        )}
      </div>
      <button
        className="bg-[#0671E0] hover:bg-[#0663C7] focus:bg-[#0663C7] text-white p-3 rounded ml-2"
        onClick={handleSearch}
      >
        Rechercher
      </button>
    </div>
  );
};

export default SearchBar;
