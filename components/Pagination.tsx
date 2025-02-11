'use client'
import React, { useContext } from 'react';
import { ViewContext } from './View';
import { findLastPage } from '../utils/utils';

const Pagination: React.FC = () => {

    const context = useContext(ViewContext);
    if (!context) {
        return null;
    }
    const { view, page, pageview, handlePageChange, itemsPerPage } = context;
    const lastPage = findLastPage(view, itemsPerPage);
    const pages = Array.from({ length: lastPage }, (_, i) => i + 1);
    
    return (
        <>
            {pageview && !(lastPage == 1 && page == 1) ? (
                <div className="container max-w-full my-4 text-center">
                    <div className="join">
                        {(lastPage >= 1) ? (<button className={`join-item ${(page == 1) ? 'btn-disabled' : ''} btn`}
                            onClick={() => { handlePageChange(page - 1); }}>«</button>) : ('')}
                        {pages.map((pageNumber) => (
                            <button
                                key={pageNumber}
                                className={`join-item btn ${pageNumber === page ? 'btn-active btn-neutral' : ''}`}
                                onClick={() => handlePageChange(pageNumber)}>
                                {pageNumber}
                            </button>
                        ))}

                        {(lastPage > 1) ? (<button className={`join-item ${(page == lastPage) ? 'btn-disabled' : ''} btn`}
                            onClick={() => { handlePageChange(page + 1); }}>»</button>) : ('')}
                    </div>
                </div>) : ('')
            }
        </>
    )
}

export default Pagination
