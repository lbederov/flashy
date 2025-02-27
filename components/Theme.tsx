'use client'
import React, { useContext, useEffect } from 'react';

import { ViewContext } from './Provider';
import Image from "next/image";
import DarkTheme from './icons/DarkTheme';
import LightTheme from './icons/LightTheme';

const Theme: React.FC<{theme: 'light' | 'dark'}> = ({theme}) => {
  const context = useContext(ViewContext);

  useEffect(() => {
    updateTheme();
    document.documentElement.setAttribute('data-theme', theme);
  }, [context?.theme]);
  if (!context) {
    return null;
  }
  const { setTheme } = context;
  const updateTheme = () => {
    const themeFromLocalStorage = localStorage.getItem('theme');
    const currTheme = (!themeFromLocalStorage || themeFromLocalStorage === '') ? 'light' : (localStorage.getItem('theme') as 'light' | 'dark');
    setTheme(currTheme);
    if (!themeFromLocalStorage) {
      localStorage.setItem('theme', currTheme);
    };
  }
  const changeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkbox = (e.target as HTMLInputElement);
    if (checkbox.getAttribute('data-theme-toggle') === 'light'){
      checkbox.setAttribute('data-theme-toggle', 'dark');
    } else {
      checkbox.setAttribute('data-theme-toggle', 'light');
    }
    localStorage.setItem('theme', checkbox.getAttribute('data-theme-toggle') || 'light');
    updateTheme();
  }
  return (
    <>
      <label className="swap swap-rotate justify-self-center">
        <input type="checkbox" data-theme-toggle={theme} checked={theme === 'dark'} onChange={(e) => {
          changeTheme(e);
        }} />
          <LightTheme className="swap-off h-8 w-8 fill-current" />
          <DarkTheme className="swap-on h-8 w-8 fill-current" />
      </label>
    </>
  )
}

export default React.memo(Theme)
