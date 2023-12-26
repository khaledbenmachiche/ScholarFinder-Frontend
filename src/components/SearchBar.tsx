import React, { useState, ChangeEvent } from 'react';
import Autosuggest from 'react-autosuggest';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>('');
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
  };

  const clearInput = () => {
    setSearchValue('');
  };

  return (
    <div className="flex items-center relative w-3/5">
      <div className="flex items-center border border-blue-500 p-3 rounded w-full relative">
        <FaSearch className="text-blue-500 mr-2" />
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
            className="cursor-pointer text-blue-500 ml-2 absolute right-1"
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
