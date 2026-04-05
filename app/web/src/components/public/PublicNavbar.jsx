import React from 'react';
import { Rocket, Moon, Sun, Search, Home, Compass, Layers, ArrowRight,Building2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';

const PublicNavbar = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const { setIsLoading } = useGlobalContext();
  
  return (
    <nav className="w-full h-[72px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl z-50 hidden md:flex items-center justify-between px-8 fixed top-0 border-b border-black/5 dark:border-white/10 shadow-sm">
      {/* Left: Branding Group */}
      <div className="flex items-center gap-3 min-w-[200px]">
        <Link to="/">
          <img
            src={theme === "light" ? "/assets/logos/logo.svg" : "/assets/logos/logo-dark.svg"}
            alt="INIQ"
            className="h-10 w-auto cursor-pointer"
          />
        </Link>
      </div>

      {/* Center: Interactive Nav Capsule */}
      <div className="flex items-center gap-1 bg-slate-100/80 dark:bg-white/5 border border-black/5 dark:border-white/10 p-1 rounded-full backdrop-blur-2xl shadow-inner group">
        <Link
          to="/"
          onClick={() => setIsLoading(true)}
          className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 font-bold text-xs ${
            location.pathname === '/' 
              ? 'bg-white dark:bg-white text-[#2563EB] shadow-md' 
              : 'text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Home className="size-3.5" /> Home
        </Link>
        <Link
          to="/experiences"
          onClick={() => setIsLoading(true)}
          className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 font-semibold text-xs ${
            location.pathname === '/experiences'
              ? 'bg-white dark:bg-white text-[#2563EB] shadow-md'
              : 'text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Compass className="size-3.5" /> Explore
        </Link>
        <Link
          to="/how-it-works"
          onClick={() => setIsLoading(true)}
          className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 font-semibold text-xs ${
            location.pathname === '/how-it-works'
              ? 'bg-white dark:bg-white text-[#2563EB] shadow-md'
              : 'text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Layers className="size-3.5" /> How It Works
        </Link>
      </div>

      {/* Right: Actions Group */}
      <div className="flex items-center gap-4 min-w-[200px] justify-end">
        <div className="relative group/search">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 dark:text-white/30 group-focus-within/search:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-slate-100/80 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-full py-2 pl-9 pr-4 text-[11px] w-32 focus:w-48 focus:outline-none focus:border-black/10 dark:focus:border-white/20 transition-all duration-500 text-slate-900 dark:text-white placeholder:text-slate-400"
          />
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-slate-100/80 dark:bg-white/5 border border-black/5 dark:border-white/5 text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-all"
        >
          {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </button>

        <Link to="/login" className="text-xs font-bold text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white px-1 transition-colors">Login</Link>

        <Link 
          to="/register"
          className="btn-primary group/btn text-[10px] px-6 py-2.5 font-black uppercase tracking-[0.1em] rounded-full shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 overflow-hidden relative"
        >
          <span className="relative z-10 transition-transform duration-300 group-hover/btn:-translate-x-1">Get Started</span>
          <ArrowRight className="size-3.5 relative z-10 transition-all duration-300 -translate-x-4 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
        </Link>
      </div>
    </nav>
  );
};

export default PublicNavbar;
