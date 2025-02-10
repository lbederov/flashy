'use client'
import React, { createContext, useEffect, useState, useCallback } from 'react';
import { shuffleArray, filterByTag, updateSearchParam, findRandom, paginateArray } from '../utils/utils';
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Cards from './Cards';
import Nav from './Nav';
import Pagination from './Pagination'
import cards from '../app/data/data.json';

export interface CardsArray {
  id?: number | string | null;
  name: string;
  intro: string;
  definition?: string | null;
  resources?: string | null;
  tags: string[] | null;
  snippet?: string | null;
}
export interface ViewContextType {
  view: CardsArray[];
  pageview: CardsArray[];
  page: number;
  searchTerm: string;
  itemsPerPage: number;
  router: object;
  params: object;
  searchParams: object;
  pathname: string;
  isFlipped: boolean;
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  setView: (value: CardsArray[]) => void;
  setPage: (value: number) => void;
  setSearchTerm: (value: string) => void;
  setPageview: (value: CardsArray[]) => void;
  setIsFlipped: (value: boolean) => void;
  handleViewChange: (value: string) => void;
  handlePageChange: (value: number) => void;
  handleSearch: (value: string) => void;
}
export const ViewContext = createContext<ViewContextType | null>(null);
const View = () => {

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const itemsPerPage = 6;

  const pageNumber = searchParams.get('page');
  const search = searchParams.get('search');
  const [view, setView] = useState<CardsArray[]>(cards);
  const [page, setPage] = useState(pageNumber ? parseInt(pageNumber) : 1);
  const [searchTerm, setSearchTerm] = useState(search?.toString() || '');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [pageview, setPageview] = useState<CardsArray[]>(view);

  const handleViewChange = useCallback((term: string) => {
    switch (term) {
      case 'all':
        setPage(1);
        setSearchTerm('');
        setView(shuffleArray([...cards]));
        break;
      case 'random':
        setPage(1);
        setSearchTerm('random');
        setView(findRandom(cards));
        break;
      default:
        setSearchTerm(term);
        setView(filterByTag([...cards], term));
        setPage(1);
        break;
    }
  }, [cards]);
  const handlePageChange = (newPage: number) => {
    setPageview(paginateArray([...view], itemsPerPage, newPage));
    setPage(newPage);
  }

  const handleSearch = (newSearchTerm: string) => {
    params.set('page', '1');
    setSearchTerm(newSearchTerm);
  };
  useEffect(() => {
    handlePageChange(page);
    const params = new URLSearchParams(searchParams.toString());
    updateSearchParam(params, 'search', searchTerm.toString().toLowerCase());
    updateSearchParam(params, 'page', page.toString());
    router.replace(`${pathname}?${params.toString()}`);
    setIsLoading(false);
  }, [page, view]);
  //
  return (
      <ViewContext.Provider value={{ view, setView, page, setPage, pageview, searchTerm, setSearchTerm, setPageview, handleViewChange, router, params, searchParams, pathname, handlePageChange, itemsPerPage, handleSearch, theme, setTheme, isFlipped: false, setIsFlipped: () => { } }}>
        <header className='container flex max-w-full'>
          <Nav />
        </header>
        {view && view.length > 0 && !isLoading ?
          (<>
            <div className='container max-w-full my-4'>
              <span>Showing {view.length > 1 && `${pageview.length}  of `}{view.length} flash {view.length === 1 ? `card` : `cards`}</span>
            </div>
            <Cards {...pageview} />
            <Pagination />
          </>
          ) : (<section className='container mt-4'><h2>Sorry, nothing to display here...</h2></section>)
        }
      </ViewContext.Provider>
  )
}
export default View
