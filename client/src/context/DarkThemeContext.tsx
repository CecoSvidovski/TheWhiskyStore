import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

interface DarkThemeModel {
  darkMode: boolean;
  setDarkMode: (isDarkMode: boolean) => void;
  paletteType: string;
  handleThemeChange: () => void;
}

export const DarkThemeContext = createContext<DarkThemeModel | undefined>(undefined);

export const useDarkThemeContext = () => {
  const context = useContext(DarkThemeContext);

  if (context === undefined) {
    throw Error('We do not seem to be inside the provider');
  }

  return context;
}

export const DarkThemeProvider = ({ children }: PropsWithChildren<any>) => {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';

  const onSelectMode = (mode: string) => {
    setDarkMode(mode === 'dark')
    if (mode === 'dark')
      document.body.classList.add('dark-mode')
    else
      document.body.classList.remove('dark-mode')
  }

  useEffect(() => {
    const paletteMode = localStorage.getItem('theme');
    if (!paletteMode) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => onSelectMode(e.matches ? 'dark' : 'light'));

      onSelectMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

      return () => {
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {
        });
      }
    }
    onSelectMode(paletteMode);
  }, []);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', darkMode ? 'light' : 'dark')
  }

  return (
    <DarkThemeContext.Provider value={{ darkMode, setDarkMode, paletteType, handleThemeChange }}>
      {children}
    </DarkThemeContext.Provider>
  );
}