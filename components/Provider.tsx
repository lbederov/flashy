'use client'
import React, { createContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useDebounce } from 'use-debounce';
import View from '../components/View';
import { shuffleArray, filterByTag, updateSearchParam, findRandom, paginateArray } from '../utils/utils';
import cards from '../app/data/data.json';

export interface CardsArray {
    id?: number | string | null;
    name: string;
    intro: string;
    definition?: string | null;
    resources?: string | null;
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
    isLoading: boolean;
    theme: 'light' | 'dark';
    setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
    setView: (value: CardsArray[]) => void;
    setPage: (value: number) => void;
    setSearchTerm: (value: string) => void;
    setPageview: (value: CardsArray[]) => void;
    handleViewChange: (value: string) => void;
    handlePageChange: (value: number) => void;
  }
  export const ViewContext = createContext<ViewContextType | null>(null);
  
const Provider: React.FC<{ children: React.ReactNode }> = ({children}) => {
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
  const [debouncedText] = useDebounce(searchTerm, 500);
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
  }, []);
  const handlePageChange = (newPage: number) => {
    setPageview(paginateArray([...view], itemsPerPage, newPage));
    setPage(newPage);
  }

  useEffect(() => {
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
   // handlePageChange(page);
    const params = new URLSearchParams(searchParams.toString());
    updateSearchParam(params, 'page', page.toString());
    router.replace(`${pathname}?${params.toString()}`);
    setIsLoading(false);
  }, [page]);
  
  useEffect(() => {
    handlePageChange(page);
    const params = new URLSearchParams(searchParams.toString());
    updateSearchParam(params, 'search', debouncedText.toString().toLowerCase());
    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedText]);
  const contextValue = useMemo(() => ({
    view,
    setView,
    page,
    setPage,
    pageview,
    searchTerm,
    setSearchTerm,
    setPageview,
    handleViewChange,
    router,
    params,
    searchParams,
    pathname,
    handlePageChange,
    itemsPerPage,
    theme,
    setTheme,
  /*   isFlipped: false,
    setIsFlipped: () => { }, */
    isLoading
}), [view, page, pageview, searchTerm, theme, isLoading]);
  return (
    <ViewContext.Provider value={contextValue}>
     <View />
    </ViewContext.Provider>
  )
}

export default Provider
