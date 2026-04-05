import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * --- INIQ GLOBAL ARCHITECTURE CONTEXT ---
 * Purpose: Centralizes application logic (theme, interaction state, preloading).
 * States Managed: 
 * - Theme: Switching between Light/Dark modes global-wide.
 * - Loading: Controlling the premium preloader duration.
 * - Mobile Menu: Handling the drawer state (open/close).
 */
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // CONTROL: Initializes the platform's premium loading sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600); // Super fast initial sequence
    return () => clearTimeout(timer);
  }, []);

  // STYLE: Global Theme attribute management for CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // ACTION: Seamless theme switching 
  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  // ACTION: Unified mobile navigation state control
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <GlobalContext.Provider value={{ 
      theme, setTheme, 
      isMenuOpen, setIsMenuOpen, 
      isLoading, setIsLoading,
      toggleTheme,
      toggleMenu
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

// HOOK: Specialized utility to access global intelligence across components
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
