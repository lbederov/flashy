'use client'
import React, { useContext, useEffect } from 'react';
import { ViewContext } from './Provider';

const Search: React.FC = () => {

  const context = useContext(ViewContext);
  useEffect(() => {
   // console.log(context?.searchTerm);
   // getCurrentDeck(searchTerm);
  }, [context?.debouncedText]);
  if (!context) {
    return null;
  }
  const { handleSearch, searchTerm, setSearchTerm, setPage, updateSearchParam, debouncedText } = context;
  return (
    <>
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => { setSearchTerm(e.target.value);handleSearch(searchTerm); }}
        placeholder="Search..."
        className="input input-bordered join-item md:h-full w-full md:w-auto"
      />
    </div>
    </>
  );
}

export default React.memo(Search)
