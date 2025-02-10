'use client'
import React, { useContext } from 'react';
import { ViewContext } from './View';
import Search from './Search';
import Theme from './Theme';

const Nav: React.FC = () => {
  const context = useContext(ViewContext);
  if (!context) {
    return null;
  }
  const { handleViewChange, searchTerm, theme } = context;

  const bgColors = {
    light: 'bg-base-300',
    dark: 'bg-gray-700'
  }
  return (
    <>
      <div className='flex flex-grow sm:mt-4 flex-col sm:flex-row '>
        <div className='h-full py-3 pr-3 align-self-center'>Select topic: </div>
        <div className='md:join'>
          <ul className={`menu menu-vertical sm:menu-horizontal rounded-box join-item  ${bgColors[theme]}`} >
            <li><a className={`${searchTerm === '' ? "active" : ""}`} data-tag="all" onClick={() => handleViewChange('all')}>All</a></li>
            <li><a className={`${searchTerm === 'random' ? "active" : ""}`} data-tag="random" onClick={() => handleViewChange('random')}>Random</a></li>
            <li><a className={`${searchTerm === 'javascript' ? "active" : ""}`} data-tag="javascript" onClick={() => handleViewChange("javascript")}>JavaScript</a></li>
            <li><a className={`${searchTerm === 'css' ? "active" : ""}`} data-tag="css" onClick={() => handleViewChange("css")}>CSS</a></li>
          </ul>
          <Search />
        </div>
      </div>
      <div className='md:border-b border-gray-500/30 ml-5 md:ml-3 md:flex mt-6 md:mt-0'>
        <Theme />
      </div>
    </>
  )
}

export default Nav
