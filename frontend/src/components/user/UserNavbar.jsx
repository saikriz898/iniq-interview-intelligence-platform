import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Bell, Sun, Moon, Database, ChevronDown, 
  User, Settings, LogOut, CheckCircle2, ShieldAlert,
  Clock, Zap, ArrowRight, ExternalLink, Activity, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';

/**
 * --- USER NAVBAR: TOP BAR FOR LOGGED-IN PORTAL ---
 * Features: Search bar, Notifications Hub (Popover), Theme Toggle, Profile Dropdown.
 */
const UserNavbar = () => {
  const { theme, toggleTheme, user, setUser, setIsLoading } = useGlobalContext();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(null);
      localStorage.removeItem('iniq_user');
      setIsLoading(false);
      navigate('/login');
    }, 800);
  };

  // Mock Notifications for the Popover
  const quickNotifications = [
    { id: 1, type: 'approved', title: 'JOURNEY_APPROVED', msg: 'Google SDE-I module live.', time: '12m ago' },
    { id: 2, type: 'rejected', title: 'PROTOCOL_BREACH', msg: 'Meta submission failed.', time: '2h ago' },
    { id: 3, type: 'alert', title: 'DRAFT_EXPIRY', msg: 'Amazon draft needs sync.', time: '1d ago' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-16 sm:h-20 border-b border-border/40 bg-surface/80 backdrop-blur-md z-[120] px-6 md:px-10 flex items-center justify-between">
      {/* 1. LEFT: LOGO */}
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center group">
          <img 
            src={theme === 'dark' ? "/assets/logos/logo-dark.svg" : "/assets/logos/logo.svg"} 
            alt="INIQ" 
            className="h-8 md:h-9 w-auto object-contain group-hover:scale-105 transition-transform" 
          />
        </Link>

        {/* 2. CENTER-LEFT: SEARCH BAR */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl bg-surface-hover/50 border border-border/40 focus-within:border-primary/40 focus-within:bg-surface transition-all w-80 group">
          <Search className="size-4 text-text-muted opacity-40 group-focus-within:opacity-100 group-focus-within:text-primary transition-all" />
          <input 
            type="text" 
            placeholder="Search submissions..." 
            className="bg-transparent border-none outline-none text-xs font-bold text-content placeholder:text-text-muted/40 w-full"
          />
        </div>
      </div>

      {/* 3. RIGHT: ACTIONS */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="size-9 rounded-xl bg-surface-hover border border-border/60 flex items-center justify-center hover:bg-primary/10 hover:border-primary/40 transition-all active:scale-95 group"
        >
          {theme === 'dark' ? (
            <Sun className="size-4 text-primary group-hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="size-4 text-primary group-hover:-rotate-12 transition-transform" />
          )}
        </button>

        {/* 🔔 NOTIFICATIONS HUB TRIGGER */}
        <div className="relative">
            <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`size-9 rounded-xl border flex items-center justify-center transition-all relative group ${
                    isNotificationsOpen 
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105'
                    : 'bg-surface-hover border-border/60 hover:bg-primary/10 hover:border-primary/40'
                }`}
            >
                <Bell className={`size-4.5 transition-colors ${isNotificationsOpen ? 'text-white' : 'text-text-muted group-hover:text-primary'}`} />
                <span className={`absolute top-2.5 right-2.5 size-1.5 rounded-full border border-surface transition-all ${isNotificationsOpen ? 'bg-white scale-0' : 'bg-primary animate-pulse'}`} />
            </button>

            <AnimatePresence>
                {isNotificationsOpen && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)} />
                        <motion.div 
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                            className="absolute top-full right-0 mt-3 w-80 bg-surface border border-border/60 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-20 overflow-hidden backdrop-blur-xl"
                        >
                            <div className="p-6 border-b border-border/40 flex items-center justify-between bg-surface/50 relative">
                                {/* Active Logo with Ripple */}
                                <div className="flex items-center gap-3.5 relative z-10">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/25 rounded-full blur-md animate-pulse scale-150" />
                                        <div className="size-10 rounded-[1.25rem] bg-background border border-border/60 flex items-center justify-center relative overflow-hidden group/emblem shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                                            {/* Specialized Intelligence Emblem (Database portion of INIQ Logo) */}
                                            <svg className="size-5 text-primary group-hover/emblem:scale-110 transition-transform" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <ellipse cx="14" cy="7" rx="9" ry="4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M5 7V21M23 7V21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M5 14C5 16.2 9 18 14 18C19 18 23 16.2 23 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M5 21C5 23.2 9 25 14 25C19 25 23 23.2 23 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <div className="absolute inset-0 bg-primary/5 group-hover/emblem:bg-transparent transition-all" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-content italic leading-none">Intelligence Feed</span>
                                        <div className="flex items-center gap-1.5 opacity-40 mt-1">
                                            <div className="size-1 rounded-full bg-primary animate-ping" />
                                            <span className="text-[8px] font-black text-text-muted uppercase tracking-[0.2em]">Node Integrity: 100%</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="p-2.5 hover:bg-surface-hover rounded-xl transition-all text-text-muted hover:text-primary active:scale-90 border border-transparent hover:border-border/40">
                                    <CheckCircle2 className="size-4" />
                                </button>
                            </div>

                            <div className="max-h-[340px] overflow-y-auto custom-scrollbar scroll-smooth">
                                {quickNotifications.map((notif) => (
                                    <div key={notif.id} className="p-4 hover:bg-surface-hover/50 transition-colors border-b border-border/10 flex items-start gap-3 cursor-pointer group">
                                        <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 border ${
                                            notif.type === 'approved' ? 'bg-green-500/5 border-green-500/10 text-green-500' :
                                            notif.type === 'rejected' ? 'bg-red-500/5 border-red-500/10 text-red-500' :
                                            'bg-orange-500/5 border-orange-500/10 text-orange-500'
                                        }`}>
                                            {notif.type === 'approved' ? <CheckCircle2 className="size-4" /> : 
                                             notif.type === 'rejected' ? <ShieldAlert className="size-4" /> : 
                                             <Clock className="size-4" />}
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-[9px] font-black italic tracking-tight text-content group-hover:text-primary transition-colors uppercase">{notif.title}</span>
                                                <span className="text-[8px] font-bold text-text-muted opacity-40">{notif.time}</span>
                                            </div>
                                            <p className="text-[11px] font-medium text-text-muted leading-snug">{notif.msg}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button 
                                onClick={() => { navigate('/notifications'); setIsNotificationsOpen(false); }}
                                className="w-full p-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 transition-all bg-surface"
                            >
                                <Activity className="size-3.5" />
                                Relaunch Full Activity Log
                                <ExternalLink className="size-3.5" />
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>

        <div className="h-8 w-[1px] bg-border/40 mx-1 hidden sm:block" />

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationsOpen(false); }}
            className="flex items-center gap-3 p-1 pr-3 rounded-xl bg-surface-hover border border-border hover:border-primary/40 transition-all group"
          >
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-accent p-0.5">
              <div className="size-full rounded-[6px] bg-background flex items-center justify-center">
                <span className="text-[10px] font-black text-primary">{user?.name?.charAt(0) || 'U'}</span>
              </div>
            </div>
            <div className="hidden md:flex flex-col items-start gap-0">
              <span className="text-[11px] font-black text-content tracking-tight">{user?.name?.split(' ')[0] || 'User'}</span>
              <span className="text-[9px] font-bold text-text-muted opacity-60 uppercase tracking-widest">{user?.role || 'Member'}</span>
            </div>
            <ChevronDown className={`size-3 text-text-muted transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-52 bg-surface border border-border rounded-2xl shadow-xl overflow-hidden py-2 z-20"
                >
                    <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-hover transition-colors group">
                    <User className="size-4 text-text-muted group-hover:text-primary" />
                    <span className="text-xs font-bold text-content">My Profile</span>
                    </Link>
                    <Link to="/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-hover transition-colors group">
                    <Settings className="size-4 text-text-muted group-hover:text-primary" />
                    <span className="text-xs font-bold text-content">Settings Hub</span>
                    </Link>
                    <Link to="/help-center" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-hover transition-colors group">
                    <HelpCircle className="size-4 text-text-muted group-hover:text-primary" />
                    <span className="text-xs font-bold text-content">Help Center</span>
                    </Link>
                    <div className="h-[1px] bg-border/40 my-2" />
                    <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-500/5 transition-colors group text-red-500"
                    >
                    <LogOut className="size-4" />
                    <span className="text-xs font-black uppercase tracking-widest">Logout</span>
                    </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
