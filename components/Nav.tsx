'use client'
import React, { useContext } from 'react';
import { ViewContext } from './Provider';
import Search from './Search';
import Theme from './Theme';

const Nav: React.FC = () => {
  const context = useContext(ViewContext);
  if (!context) {
    return null;
  }
  const { handleSearch, setSearchTerm, debouncedText, searchTerm, theme } = context;

  const bgColors = {
    light: 'bg-base-300',
    dark: 'bg-gray-700'
  }
 // console.log('from nav debouncedText: ', debouncedText);
 // console.log('from nav searchTerm: ', searchTerm);
  
  return (
    <>
    <header className='container flex max-w-full'>
      <div className='flex flex-grow sm:mt-4 flex-col sm:flex-row '>
        <div className='h-full py-3 pr-3 align-self-center'>Select topic: </div>
        <div className='md:join'>
          <ul className={`menu menu-vertical sm:menu-horizontal rounded-box join-item  ${bgColors[theme]}`} >
            <li><a className={`(${debouncedText} === '' || ${debouncedText} === 'all') ? "active" : ""}`} data-tag="all" onClick={() => {setSearchTerm('all'); handleSearch('all');}}>All</a></li>
            <li><a className={`${debouncedText === 'random' ? "active" : ""}`} data-tag="random" onClick={() => {setSearchTerm('random'); handleSearch('random')}}>Random</a></li>
            <li><a className={`${debouncedText === 'javascript' ? "active" : ""}`} data-tag="javascript" onClick={() => {setSearchTerm('javascript'); handleSearch("javascript")}}>JavaScript</a></li>
            <li><a className={`${debouncedText === 'css' ? "active" : ""}`} data-tag="css" onClick={() => {setSearchTerm('css'); handleSearch("css")}}>CSS</a></li>
          </ul>
          <Search />
        </div>
      </div>
      <div className='md:border-b border-gray-500/30 ml-5 md:ml-3 md:flex mt-6 md:mt-0'>
        <Theme theme={theme} />
      </div>
    </header>
    </>
  )
}

export default React.memo(Nav)
