import React from 'react';

interface PageCountProps {
  pageCount: number;
  pageviewLength: number;
  page: number;
  debouncedText: string;
  itemsPerPage: number;
}

const PageCount: React.FC<PageCountProps> = ({pageCount, pageviewLength, page, debouncedText, itemsPerPage}) => {
  return (
    <>
    <div className='container max-w-full my-4'>
        <span>Showing {pageCount > itemsPerPage && `${(page-1)*itemsPerPage + 1}–${((page-1)*itemsPerPage) + pageviewLength}  of `}{debouncedText !== 'random' ? pageCount : 'a random '} flash {pageCount === 1 ? `card` : `cards`}</span>
    </div>
    </>
  )
}

export default PageCount
