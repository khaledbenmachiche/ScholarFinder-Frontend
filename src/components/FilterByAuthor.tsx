import React, { useState } from 'react';

interface FilterByAuthorProps {
  onChange: (author: string | null) => void;
}

const FilterByAuthor: React.FC<FilterByAuthorProps> = ({ onChange }) => {
  const [isActive, setIsActive] = useState(false);
  const [authorName, setAuthorName] = useState('');

  const handleToggle = () => {
    setIsActive(!isActive);
    onChange(isActive ? null : authorName);
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setAuthorName(name);
    onChange(isActive ? name : null);
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={isActive} onChange={handleToggle} />
        Filter by Author:
      </label>
      {isActive && (
        <input
          type="text"
          placeholder="Enter author name"
          value={authorName}
          onChange={handleAuthorChange}
        />
      )}
    </div>
  );
};

export default FilterByAuthor;
