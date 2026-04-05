import React from 'react';
import { Search, Moon, Sun, Menu } from 'lucide-react';

const MobileHeader = ({ theme, toggleTheme, onOpenMenu }) => {
  return (
    <nav className="fixed top-0 left-0 w-full glass z-50 md:hidden h-16 flex items-center justify-between px-5">
      <div className="flex items-center gap-2">
        <img 
          src={theme === "light" ? "/assets/logos/logo.svg" : "/assets/logos/logo-dark.svg"} 
          alt="INIQ" 
          className="h-10 w-auto" 
        />
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-full hover:bg-white/5 transition-all text-primary border border-white/5"
        >
          {theme === "light" ? <Moon className="size-5" /> : <Sun className="size-5" />}
        </button>
        <button 
          onClick={onOpenMenu}
          className="p-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary transition-all active:scale-95"
        >
          <Menu className="size-6" />
        </button>
      </div>
    </nav>
  );
};

export default MobileHeader;