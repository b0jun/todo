import { ThemeProvider } from '@emotion/react';
import { createContext, ReactNode, useContext, useState } from 'react';
import { darkTheme, lightTheme } from '../theme';

interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  const initialTheme = localStorage.getItem('theme') === 'dark';
  const [darkMode, setDarkMode] = useState(initialTheme);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    localStorage.setItem('theme', darkMode ? 'light' : 'dark');
  };
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProviderWrapper');
  }
  return context;
}
