import React, { useState } from 'react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar-form">
      <input
        type="text"
        className="search-input"
        placeholder="Search for high-resolution images..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        disabled={isLoading}
      />
      <button type="submit" className="search-btn" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchBar;