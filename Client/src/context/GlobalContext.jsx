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
  const [theme, setTheme] = useState(() => localStorage.getItem('iniq_theme') || "dark");
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem('iniq_accent') || "#3B82F6");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('iniq_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Auth Modal State
  const [authModal, setAuthModal] = useState({ isOpen: false, view: 'login' });

  // Sync real-time profile on mount
  useEffect(() => {
    const token = localStorage.getItem('iniq_token');
    if (token) {
      fetch('http://localhost:5000/api/users/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setUser(prev => {
            const updated = { ...prev, ...data };
            
            const storageUser = { ...updated };
            if (storageUser.profilePicture && storageUser.profilePicture.length > 500000) {
              delete storageUser.profilePicture;
            }
            localStorage.setItem('iniq_user', JSON.stringify(storageUser));
            
            return updated;
          });
        }
      })
      .catch(err => console.error('Failed to sync profile', err));
    }
  }, []);

  const openAuthModal = (view = 'login') => {
    setAuthModal({ isOpen: true, view });
  };

  const closeAuthModal = () => {
    setAuthModal(prev => ({ ...prev, isOpen: false }));
  };

  // CONTROL: Initializes the platform's premium loading sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600); // Super fast initial sequence
    return () => clearTimeout(timer);
  }, []);

  // STYLE: Global Theme attribute management for CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('iniq_theme', theme);
  }, [theme]);

  // STYLE: Dynamic Accent Color
  useEffect(() => {
    document.documentElement.style.setProperty('--color-accent', accentColor);
    document.documentElement.style.setProperty('--color-primary', accentColor);
    localStorage.setItem('iniq_accent', accentColor);
  }, [accentColor]);

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
      accentColor, setAccentColor,
      isMenuOpen, setIsMenuOpen, 
      isLoading, setIsLoading,
      user, setUser,
      authModal, openAuthModal, closeAuthModal, setAuthModal,
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
