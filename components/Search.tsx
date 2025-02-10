'use client'
import React, { useContext, useEffect } from 'react';
import { ViewContext } from './View';

const Search: React.FC = () => {

  const context = useContext(ViewContext);
  useEffect(() => {
    handleViewChange(searchTerm);
  }, [context?.searchTerm, context?.handleViewChange]);

  if (!context) {
    return null;
  }
  const { handleViewChange, searchTerm, handleSearch } = context;
  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => { handleSearch(e.target.value); }}
        placeholder="Search..."
        className="input input-bordered join-item md:h-full w-full md:w-auto"
      />
    </div>
  );
}

export default Search
