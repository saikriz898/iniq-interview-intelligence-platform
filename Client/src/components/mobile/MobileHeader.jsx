import React from 'react';
import { Search, Moon, Sun, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';

const MobileHeader = ({ theme, toggleTheme }) => {
  const { user, setAuthModal } = useGlobalContext();
  return (
    <nav className="fixed top-0 left-0 w-full bg-background/50 backdrop-blur-3xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] z-50 md:hidden h-16 flex items-center justify-between px-5">
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
      <div className="flex items-center gap-2 relative z-10">
        <img 
          src={theme === "light" ? "/assets/logos/logo.png" : "/assets/logos/logo-dark.png"} 
          alt="INIQ" 
          className="h-10 w-auto" 
        />
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-full hover:bg-card-bg transition-all text-primary border border-theme relative z-10"
        >
          {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </button>

        {user ? (
          <Link 
            to="/dashboard" 
            className="p-2.5 rounded-full hover:bg-card-bg transition-all text-primary border border-theme relative z-10"
          >
            <UserIcon className="size-4" />
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setAuthModal({ isOpen: true, view: 'login' })}
              className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-content transition-colors px-2"
            >
              Log In
            </button>
            <button 
              onClick={() => setAuthModal({ isOpen: true, view: 'register' })}
              className="bg-primary text-background text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl active:scale-95 transition-transform"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MobileHeader;