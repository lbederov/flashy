'use client'
import React, { useContext, useEffect } from 'react';
import { ViewContext } from './Provider';

const Search: React.FC = () => {

  const context = useContext(ViewContext);
  useEffect(() => {
    handleViewChange(searchTerm);
  }, [context?.searchTerm]);
  if (!context) {
    return null;
  }
    const handleSearch = (newSearchTerm: string) => {
      setPage(1);
      setSearchTerm(newSearchTerm);
    };
  const { handleViewChange, searchTerm, setSearchTerm, setPage } = context;
  return (
    <>
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => { handleSearch(e.target.value); }}
        placeholder="Search..."
        className="input input-bordered join-item md:h-full w-full md:w-auto"
      />
    </div>
    </>
  );
}

export default React.memo(Search)
