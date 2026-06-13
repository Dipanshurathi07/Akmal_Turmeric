 import { createContext, useContext, useEffect, useMemo, useState } from 'react';


const ThemeContext = createContext(null);


const getInitialTheme = () => {
 if (typeof window === 'undefined') {
  return 'light';
 }


 const storedTheme = window.localStorage.getItem('theme');
 if (storedTheme === 'light' || storedTheme === 'dark') {
  return storedTheme;
 }


 return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};


export const ThemeProvider = ({ children }) => {
 const [theme, setTheme] = useState(getInitialTheme);


 useEffect(() => {
  const root = window.document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  window.localStorage.setItem('theme', theme);
 }, [theme]);


 const toggleTheme = () => {
  setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
 };


 const value = useMemo(() => ({ theme, toggleTheme }), [theme]);


 return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};


export const useTheme = () => {
 const context = useContext(ThemeContext);
 if (!context) {
  throw new Error('useTheme must be used within a ThemeProvider');
 }
 return context;
};

