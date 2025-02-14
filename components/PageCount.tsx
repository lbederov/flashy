import React from 'react';

interface PageCountProps {
  pageCount: number;
  pageviewLength: number;
  page: number;
  searchTerm: string;
  itemsPerPage: number;
}

const PageCount: React.FC<PageCountProps> = ({pageCount, pageviewLength, page, searchTerm, itemsPerPage}) => {
  return (
    <>
    <div className='container max-w-full my-4'>
        <span>Showing {pageCount > itemsPerPage && `${(page-1)*itemsPerPage + 1}–${((page-1)*itemsPerPage) + pageviewLength}  of `}{searchTerm !== 'random' ? pageCount : 'a random '} flash {pageCount === 1 ? `card` : `cards`}</span>
    </div>
    </>
  )
}

export default PageCount
