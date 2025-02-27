'use client'
import React, { createContext, useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import View from '../components/View';
import { shuffleArray, filterByTag, findRandom, paginateArray } from '../utils/utils';
import data from '../app/data/data.json';

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
  debouncedText: string;
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  setView: (value: CardsArray[]) => void;
  setPage: (value: number) => void;
  setSearchTerm: (value: string) => void;
  setPageview: (value: CardsArray[]) => void;
  getCurrentDeck: (value: string) => void;
  handlePageChange: (value: number) => void;
  updateSearchParam: (key: string, value: string) => void;
  handleSearch: (value: string) => void;
}
export const ViewContext = createContext<ViewContextType | null>(null);
/* interface NavigateOptions {
  shallow: boolean;
} */
const Provider: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = {}
  const itemsPerPage = 6;
  const cards = data;
  const [view, setView] = useState<CardsArray[]>(cards);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedText] = useDebounce(searchTerm, 500);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [pageview, setPageview] = useState<CardsArray[]>(view);

  const updateSearchParam = (query: string, term: string) => {
   // console.log('updateSearchParam: updating ', query, ' with: ', term);
    
    const params = new URLSearchParams(searchParams);
    const paramQuery = params.get(query);
   // console.log('paramQuery: ', paramQuery);
    /* 
    if (term && term !== '' && term !== paramQuery) {
      params.set(query, term);
    } else {
     // params.delete(query);
    }
     // @ts-expect-error 'shallow' does not exist in type 'NavigateOptions'
    router.replace(`${pathname}?${params.toString()}`, { shallow: true }); 
    /*router.push(`${pathname}?${params.toString()}`);
   // return; */
  };
  const handlePageChange = useDebouncedCallback((newPage: number) => {
    setPageview(paginateArray([...view], itemsPerPage, newPage));
    //setPage(newPage);
    
   // if (view.length > itemsPerPage) {
    //console.log('total cards: ', view.length, ' itemsPerPage: ',itemsPerPage);
   // } else {
     // updateSearchParam('page', newPage.toString());
    /*   const params = new URLSearchParams(searchParams);
    console.log('ONE PAGER: total cards: ', view.length, ' itemsPerPage: ',itemsPerPage);
      params.delete('page');
     /* // @ts-expect-error 'shallow' does not exist in type 'NavigateOptions' 
      router.replace(`${pathname}?${params.toString()}`, { shallow: true }); */
     //router.push(`${pathname}?${params.toString()}`); */
  //  }
  }, 500);
  const handleSearch = useDebouncedCallback((newSearchTerm: string) => {
      setPage(1);
     // setSearchTerm(newSearchTerm);
    //  console.log('search term changed by handleSearch: ', newSearchTerm);
      getCurrentDeck(newSearchTerm);
     // updateSearchParam('search', newSearchTerm);
    }, 500);
  const getCurrentDeck = (term: string) => {
    const prevPage = page;
   // const prevSearch = debouncedText;
    
    switch (term) {
      case 'all':
        setView(shuffleArray([...cards]));
        break;
      case 'random':
        setView(findRandom(cards));
        break;
      default:
        setView(filterByTag([...cards], term));
        break;
    }
      handlePageChange(page);
    if (prevPage !== page ) {
      updateSearchParam('page', page.toString());
    }
  };
  
  /* 
    useEffect(() => {
      setIsLoading(false);
    }, []);
     */
  useEffect(() => {
     handlePageChange(page);
   // setPage(parseInt(searchParams.get('page') || '1'));
   // handlePageChange(page);
/*     if (searchParams.get('page')) { 
      handlePageChange(parseInt(searchParams.get('page') || '1'));
    } else {
      handlePageChange(1);
    }
    console.log('reading page from searchParams', searchParams.get('page') || '1'); */
    // updateSearchParam('page', page.toString());
    setIsLoading(false);
}, []);
  // }, [searchParams.get('page')]);

  /*   useEffect(() => {
      handlePageChange(page);
     // const newSearch = searchParams.toString();
    //  if (newSearch !== debouncedText) {
      updateSearchParam('search', debouncedText.toString().toLowerCase());
     // }
    }, [debouncedText]); */
/* 
  useEffect(() => {
    if (!searchParams.get('search')) {
    //  setSearchTerm('');
    console.log('no searchParams');
    } else {
    //  setPage(1);
    //  setSearchTerm(searchParams.get('search') || '');
    console.log('reading search from searchParams', searchParams.get('search') || '');
    }
 }, [debouncedText]); */
 //  }, [searchParams.get('search')]);

  const contextValue = useMemo(() => ({
    view,
    setView,
    page,
    setPage,
    pageview,
    searchTerm,
    debouncedText,
    setSearchTerm,
    setPageview,
    getCurrentDeck,
    handleSearch,
    router,
    params,
    searchParams,
    pathname,
    handlePageChange,
    updateSearchParam,
    itemsPerPage,
    theme,
    setTheme,
    isLoading
  }), [view, page, pageview, searchTerm, theme, isLoading]);
  return (
    <ViewContext.Provider value={contextValue}>
      <Suspense fallback={<h1>Loading...</h1>}>
        {<View />}
      </Suspense>
    </ViewContext.Provider>
  )
}

export default Provider
