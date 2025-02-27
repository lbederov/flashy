'use client'
import React, { useContext, Suspense } from 'react';
import { ViewContext } from './Provider';

const Pagination: React.FC<{pages: number[]}> = ({pages}) => {

    const context = useContext(ViewContext);
    if (!context) {
        return null;
    }
    const { page, handlePageChange, setPage } = context;
    const pagesCount = pages.length;
    
    
    return (
        <Suspense>
            {!(pagesCount == 1 && page == 1) ? (
                <div className="container max-w-full my-4 text-center">
                    <div className="join">
                        {(pagesCount >= 1) ? (<button className={`join-item ${(page == 1) ? 'btn-disabled' : ''} btn`}
                            onClick={() => { setPage(page - 1); handlePageChange(page - 1); }}>«</button>) : ('')}
                        {pages.map((pageNumber) => (
                            <button
                                key={pageNumber}
                                className={`join-item btn ${pageNumber === page ? 'btn-active btn-neutral' : ''}`}
                                onClick={() => {setPage(pageNumber); handlePageChange(pageNumber);}}>
                                {pageNumber}
                            </button>
                        ))}

                        {(pagesCount > 1) ? (<button className={`join-item ${(page == pagesCount) ? 'btn-disabled' : ''} btn`}
                            onClick={() => { setPage(page + 1); handlePageChange(page + 1); }}>»</button>) : ('')}
                    </div>
                </div>) : ('')
            }
        </Suspense>
    )
}

export default React.memo(Pagination)
