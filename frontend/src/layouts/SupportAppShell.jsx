import React, { useLayoutEffect } from 'react';
import { 
  ArrowLeft, Search, LogIn, Rocket, 
  Moon, Sun 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../context/GlobalContext';
import PublicPreloader from '../components/public/PublicPreloader';
import ScrollTopReset from '../components/common/ScrollTopReset';

/**
 * --- SUPPORT APP SHELL ---
 * Specialized layout for Help Center, Contact, and Legal pages.
 * Optimized for both Desktop and Mobile views.
 */
const SupportAppShell = ({ children, isLoading }) => {
  const { theme, toggleTheme } = useGlobalContext();
  const navigate = useNavigate();

  const SupportNavbar = (
    <nav className="w-full h-16 fixed top-0 left-0 right-0 z-[100] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 md:px-12">
      {/* Left Group: Back + Logo */}
      <div className="flex items-center gap-3 md:gap-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors group p-1"
        >
          <div className="size-8 md:size-9 rounded-full bg-surface border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 shadow-sm">
             <ArrowLeft className="size-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Back</span>
        </button>
        
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={theme === "light" ? "/assets/logos/logo.svg" : "/assets/logos/logo-dark.svg"}
            alt="INIQ"
            className="h-7 md:h-8 w-auto"
          />
        </Link>
      </div>

      {/* Right Group: Search + Auth */}
      <div className="flex items-center gap-2 md:gap-5">
        <button className="p-2 rounded-full hover:bg-surface-hover transition-colors text-text-muted group">
          <Search className="size-4 group-hover:text-primary" />
        </button>
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-surface-hover transition-colors text-text-muted"
        >
          {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </button>

        <Link 
          to="/login" 
          className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-primary px-2 transition-colors"
        >
          Login
        </Link>
        
        <Link 
          to="/register" 
          className="px-4 md:px-7 py-2 md:py-3 bg-primary text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-center"
        >
          Join <span className="hidden sm:inline">INIQ</span>
        </Link>
      </div>
    </nav>
  );

  const SupportFooter = (
    <footer className="w-full py-8 border-t border-border mt-auto px-4 md:px-12 bg-surface/30 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-text-muted/40 text-center md:text-left leading-relaxed">
          © 2026 INIQ — INTERVIEW INTELLIGENCE PLATFORM. <br className="md:hidden" /> ALL RIGHTS RESERVED.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
          <Link to="/help-center" className="text-text-muted hover:text-primary transition-colors">Help Center</Link>
          <Link to="/how-it-works" className="text-text-muted hover:text-primary transition-colors">How It Works</Link>
          <Link to="/privacy-policy" className="text-text-muted hover:text-primary transition-colors">Privacy</Link>
          <Link to="/terms-of-service" className="text-text-muted hover:text-primary transition-colors">Terms</Link>
          <Link to="/contact" className="text-text-muted hover:text-primary transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );

  return (
    <div className={`min-h-screen flex flex-col pt-16 ${theme === 'dark' ? 'dark' : ''} bg-mesh-gradient selection:bg-primary/20`}>
      <ScrollTopReset />
      <AnimatePresence mode="wait">
        {isLoading && <PublicPreloader theme={theme} />}
      </AnimatePresence>
      
      {SupportNavbar}
      
      <main className="flex-grow flex flex-col items-center overflow-x-hidden relative">
        {/* Animated Background Subtle Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute size-[500px] -top-48 -left-24 bg-primary/10 rounded-full blur-[100px]" 
          />
          <motion.div 
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute size-[400px] top-1/2 -right-24 bg-accent/10 rounded-full blur-[100px]" 
          />
        </div>
        
        <div className="w-full relative z-10">
          {children}
        </div>
      </main>
      
      {SupportFooter}
    </div>
  );
};

export default SupportAppShell;
