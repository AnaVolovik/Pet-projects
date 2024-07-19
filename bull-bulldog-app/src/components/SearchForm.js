import React, { useState } from 'react';

const SearchForm = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // логика поиска
  };

  return (
    <form onSubmit={handleSearch}>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="" 
      />
      <button type="submit">Найти</button>
    </form>
  );
};

export default SearchForm;