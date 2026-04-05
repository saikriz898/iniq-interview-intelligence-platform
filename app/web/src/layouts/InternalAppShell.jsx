import React, { useState } from 'react';
import { 
  Home, Building2, Briefcase, PlusCircle, Settings, Menu, X, 
  Search, User, ChevronRight, Bell, LayoutDashboard, Database,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

/**
 * --- INTERNAL APP SHELL ---
 * Purpose: Advanced Sidebar-based layout for platform dashboards and error states.
 * Layout: Persistent Sidebar (Desktop) + Sticky Header + Content Canvas.
 */
const InternalAppShell = ({ children, title = "Platform", breadcrumb = "Home" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Companies", path: "/companies", icon: Building2 },
    { label: "Experiences", path: "/experiences", icon: Briefcase },
    { label: "Submit Experience", path: "/submit", icon: PlusCircle },
    { label: "Settings", path: "/settings", icon: Settings },
  ];

  const SidebarContent = (
    <div className="flex flex-col h-full bg-surface border-r border-border py-8 px-4">
      {/* Brand Identity */}
      <Link to="/" className="flex items-center px-4 mb-12 group">
        <img src="/assets/logos/logo-dark.svg" alt="INIQ" className="h-9 w-auto object-contain group-hover:scale-105 transition-transform" />
      </Link>

      {/* Navigation Groups */}
      <div className="flex flex-col gap-2 flex-grow">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted opacity-40 px-4 mb-2">Main Menu</span>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive 
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                  : 'text-text-muted hover:bg-surface-hover hover:text-content border border-transparent'
              }`}
            >
              <item.icon className={`size-5 transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : 'opacity-60'}`} />
              <span className="text-sm font-bold">{item.label}</span>
              {isActive && (
                <motion.div layoutId="activeDot" className="size-1.5 rounded-full bg-primary ml-auto" />
              )}
            </Link>
          );
        })}
      </div>

      {/* User Quick Profile (Bottom) */}
      <div className="mt-auto px-2">
        <div className="p-4 rounded-2xl bg-surface-hover border border-border flex items-center gap-3">
          <div className="size-10 rounded-full bg-gradient-to-br from-primary to-accent p-0.5 shadow-md">
            <div className="size-full rounded-full bg-background flex items-center justify-center">
              <User className="size-5 text-primary" />
            </div>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-black text-content truncate">Saikiran Kotari</span>
            <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest opacity-60">Candidate</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full flex bg-background overflow-hidden selection:bg-primary selection:text-white">
      {/* 1. Desktop Sidebar */}
      <div className="hidden lg:block w-[280px] shrink-0 h-full">
        {SidebarContent}
      </div>

      {/* 2. Mobile Bottom Navigation / Menu Toggle */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] z-[100] lg:hidden shadow-2xl"
            >
              {SidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Top Header */}
        <header className="h-[80px] shrink-0 border-b border-border px-6 md:px-10 flex items-center justify-between bg-surface/50 backdrop-blur-md z-50">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-surface-hover border border-border hover:bg-primary/10 transition-all"
            >
              <Menu className="size-5 text-content" />
            </button>

            {/* Breadcrumb / Title */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-text-muted opacity-40">
                <span>{breadcrumb}</span>
                {breadcrumb && <ChevronRight className="size-3" />}
                <span className="text-primary">{title}</span>
              </div>
              <h1 className="text-lg font-black text-content font-['Sora'] tracking-tight">
                {title}
              </h1>
            </div>
          </div>

          {/* Action Hub */}
          <div className="flex items-center gap-3">
             <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-hover border border-border group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <Search className="size-4 text-text-muted opacity-40 group-focus-within:opacity-100" />
                <input 
                  type="text" 
                  placeholder="Universal Search..." 
                  className="bg-transparent border-none outline-none text-xs font-bold text-content placeholder:text-text-muted/40 w-40 lg:w-60"
                />
             </div>
             <button className="p-2.5 rounded-xl bg-surface-hover border border-border text-text-muted hover:text-primary transition-all relative">
                <Bell className="size-5" />
                <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-surface" />
             </button>
          </div>
        </header>

        {/* Content Canvas */}
        <main className="flex-1 overflow-y-auto w-full relative">
          <div className="p-6 md:p-10 lg:p-12 w-full h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default InternalAppShell;
