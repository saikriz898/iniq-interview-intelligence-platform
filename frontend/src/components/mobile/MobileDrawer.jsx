import React from 'react';
import { X, Search, Rocket, Home, Compass, Zap, BookOpen, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';

const MobileDrawer = ({ isOpen, onClose, theme, toggleTheme }) => {
  const { setIsLoading } = useGlobalContext();
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-full w-[300px] glass-strong shadow-2xl flex flex-col p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <img
                  src={theme === "light" ? "/assets/logos/logo.svg" : "/assets/logos/logo-dark.svg"}
                  alt="INIQ"
                  className="h-10 w-auto"
                />
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="size-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-2 flex-grow">
              <div className="relative mb-6 px-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 opacity-40 focus:opacity-100" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-[15px] focus:outline-none focus:border-primary/50 transition-all font-medium placeholder:opacity-30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <Link to="/" onClick={() => { setIsLoading(true); onClose(); }} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-colors font-medium text-[17px] group">
                  <Home className="size-5 opacity-60 group-hover:opacity-100 transition-opacity" /> Home
                </Link>
                <div className="h-px bg-white/5 mx-4" />
                <Link to="/experiences" onClick={() => { setIsLoading(true); onClose(); }} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-colors font-medium text-[17px] group">
                  <Compass className="size-5 opacity-60 group-hover:opacity-100 transition-opacity" /> Explore
                </Link>
                <div className="h-px bg-white/5 mx-4" />
                <Link to="/error/maintenance" onClick={onClose} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-colors font-medium text-[17px] group">
                  <Zap className="size-5 text-amber-500/80 group-hover:text-amber-500 transition-all" /> Live Demo ⚡
                </Link>
                <div className="h-px bg-white/5 mx-4" />
                <Link to="/error/maintenance" onClick={onClose} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-colors font-medium text-[17px] group">
                  <BookOpen className="size-5 opacity-60 group-hover:opacity-100 transition-opacity" /> Resources
                </Link>
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-white/10">
                <Link to="/login" onClick={onClose} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all font-medium">
                  <LogIn className="size-5" /> Login
                </Link>
                <Link to="/register" onClick={onClose} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2">
                  <Rocket className="size-5" /> Get Started 🚀
                </Link>
              </div>
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;