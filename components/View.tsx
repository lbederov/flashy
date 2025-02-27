'use client'
import React, { useContext} from 'react';
import { ViewContext } from './Provider';
import Nav from './Nav';
import Cards from './Cards';
import PageCount from './PageCount';
import Pagination from './Pagination';
import { findLastPage } from '../utils/utils';

const View: React.FC = () => {
    const context = useContext(ViewContext);

    if (!context) {
        return null;
    }
    const { view, pageview, page, debouncedText, itemsPerPage, isLoading } = context;
    const lastPage = findLastPage(view, itemsPerPage);
    const pages = Array.from({ length: lastPage }, (_, i) => i + 1);
    return (
      <>{!isLoading ? 
        (pages.length > 0 ?
          (
          <>
            { <Nav /> }
            <PageCount pageCount={view.length} pageviewLength={pageview.length} page={page} debouncedText={debouncedText} itemsPerPage={itemsPerPage} />
            <Cards pageview={pageview} />
            {pages.length > 1  && <Pagination pages={pages}/> }
          </>
          ) : (<>
          { <Nav /> }<section className='container mt-4'><h2>Sorry, nothing to display here...</h2></section>
          </>)
        ) : (
          <h1>Loading...</h1>
        
        )}
      </>
  )
}
export default View
