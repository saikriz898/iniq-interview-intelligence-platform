import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Bell, Sun, Moon, Database, ChevronDown, 
  User, Settings, LogOut, CheckCircle2, ShieldAlert,
  Clock, Zap, ArrowRight, ExternalLink, Activity, HelpCircle, Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import usePWAInstall from '../../hooks/usePWAInstall';

/**
 * --- USER NAVBAR: TOP BAR FOR LOGGED-IN PORTAL ---
 * Features: Hamburger mobile trigger, Search bar, Notifications Popover, Theme Toggle, Profile.
 */
const UserNavbar = () => {
  const { theme, toggleTheme, user, setUser, setAuthModal } = useGlobalContext();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const { isInstallable, installPWA } = usePWAInstall();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('iniq_user');
    localStorage.removeItem('iniq_token');
    navigate('/');
    setTimeout(() => {
      setAuthModal({ isOpen: true, view: 'login' });
    }, 100);
  };

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    const token = localStorage.getItem('iniq_token');
    if (!token) return;
    try {
      const res = await fetch('http://localhost:5000/api/notifications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.isRead).length);
      }
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  const markAllAsRead = async () => {
    const token = localStorage.getItem('iniq_token');
    if (!token) return;
    try {
      const res = await fetch('http://localhost:5000/api/notifications/mark-all-read', {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
        setUnreadCount(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (id) => {
    const token = localStorage.getItem('iniq_token');
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:5000/api/notifications/mark-read/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    if (diffInSeconds < 60) return 'Just now';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <nav className="fixed top-0 left-0 lg:left-72 w-full lg:w-[calc(100%-18rem)] h-16 sm:h-20 border-b border-border/40 bg-surface/80 backdrop-blur-3xl z-[120] px-4 sm:px-6 md:px-10 flex items-center justify-between">
      {/* 1. LEFT: LOGO / MOBILE TOGGLE / SEARCH */}
      <div className="flex items-center gap-3.5 sm:gap-6 md:gap-8 z-10 relative w-full lg:w-auto justify-between lg:justify-start">
        <div className="flex items-center gap-3">
          <Link to="/" className="lg:hidden size-10 sm:size-12 rounded-full border border-border bg-surface-hover/50 flex items-center justify-center overflow-hidden shadow-inner group transition-all hover:border-primary/30 shrink-0">
            <img 
              src={theme === 'dark' ? "/assets/logos/logo-dark.png" : "/assets/logos/logo.png"} 
              alt="INIQ" 
              className="h-7 w-auto object-contain group-hover:scale-110 transition-transform" 
            />
          </Link>
        </div>

        {/* 2. CENTER-LEFT: SEARCH BAR */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl bg-surface-hover/50 border border-border/40 focus-within:border-primary/40 focus-within:bg-surface transition-all w-80 group">
          <Search className="size-4 text-text-muted  group-focus-within:opacity-100 group-focus-within:text-primary transition-all" />
          <input 
            type="text" 
            placeholder="Search submissions..." 
            className="bg-transparent border-none outline-none text-xs font-bold text-content placeholder:text-text-muted/40 w-full"
          />
        </div>
      </div>

      {/* 3. RIGHT: ACTIONS */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* PWA Install Button */}
        {isInstallable && (
          <button 
            onClick={installPWA}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-all text-[11px] font-black uppercase tracking-widest"
          >
            <Database className="size-3.5" /> Install App
          </button>
        )}

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
                    ? 'bg-primary border-primary text-primary-text shadow-lg shadow-primary/20 scale-105'
                    : 'bg-surface-hover border-border/60 hover:bg-primary/10 hover:border-primary/40'
                }`}
            >
                <Bell className={`size-4.5 transition-colors ${isNotificationsOpen ? 'text-primary-text' : 'text-text-muted group-hover:text-primary'}`} />
                {unreadCount > 0 && (
                    <span className="absolute top-2.5 right-2.5 size-1.5 rounded-full border border-surface transition-all bg-primary animate-pulse" />
                )}
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
                                <div className="flex items-center gap-3.5 relative z-10 font-['Space_Grotesk']">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/25 rounded-full blur-md animate-pulse scale-150" />
                                        <div className="size-10 rounded-[1.25rem] bg-background border border-border flex items-center justify-center relative overflow-hidden group/emblem shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
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
                                    <div className="flex flex-col font-['Space_Grotesk']">
                                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-content leading-none">Tactical Feed</span>
                                        <div className="flex items-center gap-1.5 opacity-40 mt-1.5">
                                            <div className="size-1 rounded-full bg-primary animate-ping" />
                                            <span className="text-[8px] font-bold text-text-secondary uppercase tracking-[0.2em]">Node Status: Active</span>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={markAllAsRead}
                                    title="Mark all as read"
                                    className="p-2.5 hover:bg-surface-hover rounded-xl transition-all text-text-secondary hover:text-primary active:scale-90 border border-transparent hover:border-border/40"
                                >
                                    <CheckCircle2 className="size-4" />
                                </button>
                            </div>

                            <div className="max-h-[340px] overflow-y-auto custom-scrollbar scroll-smooth">
                                {notifications.length > 0 ? (
                                    notifications.slice(0, 5).map((notif) => (
                                        <div 
                                            key={notif._id} 
                                            onClick={() => markAsRead(notif._id)}
                                            className={`p-4 hover:bg-surface-hover/50 transition-colors border-b border-border/10 flex items-start gap-3 cursor-pointer group text-left relative ${!notif.isRead ? 'bg-primary/5' : ''}`}
                                        >
                                            {!notif.isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                                            <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 border ${
                                                notif.priority === 'High' ? 'bg-warning/5 border-warning/10 text-warning' :
                                                notif.priority === 'Critical' ? 'bg-danger/5 border-danger/10 text-danger' :
                                                'bg-success/5 border-success/10 text-success'
                                            }`}>
                                                {notif.priority === 'Critical' ? <ShieldAlert className="size-4" /> : 
                                                 notif.priority === 'High' ? <Clock className="size-4" /> : 
                                                 <CheckCircle2 className="size-4" />}
                                            </div>
                                            <div className="flex flex-col gap-1 w-full">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-[9px] font-bold tracking-widest text-content group-hover:text-primary transition-colors uppercase font-['Space_Grotesk'] truncate max-w-[150px]">{notif.title}</span>
                                                    <span className="text-[8px] font-medium text-text-secondary shrink-0">{timeAgo(notif.createdAt)}</span>
                                                </div>
                                                <p className="text-[11px] font-medium text-text-secondary leading-relaxed line-clamp-2">{notif.message}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center p-8 gap-3 text-center opacity-60">
                                        <Bell className="size-8 text-text-muted mb-2" />
                                        <span className="text-xs font-bold text-content uppercase tracking-widest">No new intelligence</span>
                                        <p className="text-[10px] font-medium text-text-secondary">Your feed is currently clear.</p>
                                    </div>
                                )}
                            </div>

                            <button 
                                onClick={() => { navigate('/notifications'); setIsNotificationsOpen(false); }}
                                className="w-full p-5 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/5 transition-all bg-surface font-['Space_Grotesk']"
                            >
                                <Activity className="size-3.5" />
                                Launch Mission Log
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
            <div className="size-8 rounded-lg  from-primary to-accent p-0.5 overflow-hidden shrink-0">
              <div className="size-full rounded-[6px] bg-background flex items-center justify-center overflow-hidden">
                {user?.profilePicture ? (
                    <img src={user.profilePicture} alt="User Avatar" className="size-full object-cover" />
                ) : (
                    <span className="text-[10px] font-black text-primary">{user?.name?.charAt(0) || 'U'}</span>
                )}
              </div>
            </div>
            <div className="hidden md:flex flex-col items-start gap-0">
              <span className="text-[11px] font-black text-content tracking-tight">{user?.name?.split(' ')[0] || 'User'}</span>
              <span className="text-[9px] font-bold text-text-muted  uppercase tracking-widest">{user?.role || 'Member'}</span>
            </div>
            <ChevronDown className={`size-3 text-text-muted transition-transform shrink-0 ${isProfileOpen ? 'rotate-180' : ''}`} />
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
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-danger/5 transition-colors group text-danger"
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
