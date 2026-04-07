import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Bell, Sun, Moon, Database, ChevronDown, 
  User, Settings, LogOut, CheckCircle2, ShieldAlert,
  Clock, Zap, ArrowRight, ExternalLink, Activity, 
  HelpCircle, ShieldCheck, Terminal, Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';

/**
 * --- ADMIN NAVBAR: COMMAND HUB TOP BAR ---
 * Design: High-fidelity, fixed-height, blurred telemetry bar.
 */
const AdminNavbar = () => {
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

    const quickNotifications = [
        { id: 1, type: 'alert', title: 'PENDING_SYNC', msg: 'New Google SDE submission needs review.', time: '4m ago' },
        { id: 2, type: 'approved', title: 'SYSTEM_UPD', msg: 'Company database sync complete.', time: '45m ago' },
        { id: 3, type: 'security', title: 'SEC_AUDIT', msg: 'Admin login detected from new IP.', time: '2h ago' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full h-16 sm:h-20 border-b border-border/40 bg-surface/80 backdrop-blur-md z-[120] px-6 md:px-10 flex items-center justify-between">
            {/* 1. LEFT: LOGO & STATUS */}
            <div className="flex items-center gap-8">
                <Link to="/admin/dashboard" className="flex items-center group gap-3">
                    <img 
                        src={theme === 'dark' ? "/assets/logos/logo-dark.svg" : "/assets/logos/logo.svg"} 
                        alt="INIQ" 
                        className="h-8 md:h-9 w-auto object-contain group-hover:scale-105 transition-transform" 
                    />
                    <div className="hidden sm:flex flex-col">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary italic leading-none">ADMIN_PORTAL</span>
                        <div className="flex items-center gap-1.5 opacity-40 mt-1">
                            <div className="size-1 rounded-full bg-primary animate-ping" />
                            <span className="text-[7px] font-black text-text-muted uppercase tracking-[0.2em]">Live Telemetry</span>
                        </div>
                    </div>
                </Link>

                {/* 2. SEARCH ARCHIVE */}
                <div className="hidden lg:flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-surface-hover/50 border border-border/40 focus-within:border-primary/40 focus-within:bg-surface transition-all w-96 group">
                    <Search className="size-4 text-text-muted opacity-40 group-focus-within:opacity-100 group-focus-within:text-primary transition-all" />
                    <input 
                        type="text" 
                        placeholder="Search experiences, users, companies..." 
                        className="bg-transparent border-none outline-none text-xs font-bold text-content placeholder:text-text-muted/40 w-full"
                    />
                </div>
            </div>

            {/* 3. RIGHT: ADMIN ACTIONS */}
            <div className="flex items-center gap-2 sm:gap-4">
                
                {/* Theme Toggle */}
                <button 
                onClick={toggleTheme}
                className="size-10 rounded-xl bg-surface-hover border border-border/60 flex items-center justify-center hover:bg-primary/10 hover:border-primary/40 transition-all active:scale-95 group shadow-sm"
                >
                {theme === 'dark' ? (
                    <Sun className="size-4 text-primary group-hover:rotate-45 transition-transform" />
                ) : (
                    <Moon className="size-4 text-primary group-hover:-rotate-12 transition-transform" />
                )}
                </button>

                {/* 🔔 ADMIN ALERTS TRIGGER */}
                <div className="relative">
                    <button 
                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        className={`size-10 rounded-xl border flex items-center justify-center transition-all relative group ${
                            isNotificationsOpen 
                            ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105'
                            : 'bg-surface-hover border-border/60 hover:bg-primary/10 hover:border-primary/40'
                        }`}
                    >
                        <Bell className="size-4" />
                        <span className={`absolute top-3 right-3 size-1.5 rounded-full border border-surface transition-all ${isNotificationsOpen ? 'bg-white scale-0' : 'bg-primary animate-pulse'}`} />
                    </button>

                    <AnimatePresence>
                        {isNotificationsOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)} />
                                <motion.div 
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                    className="absolute top-full right-0 mt-3 w-80 bg-surface border border-border/60 rounded-[2rem] shadow-2xl z-20 overflow-hidden"
                                >
                                    <div className="p-6 border-b border-border/40 flex items-center justify-between bg-surface/50">
                                        <div className="flex items-center gap-3">
                                            <ShieldAlert className="size-5 text-primary" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-content italic">Admin Notifications</span>
                                        </div>
                                        <div className="px-2 py-1 rounded-md bg-primary/10 text-[8px] font-black text-primary uppercase">3 New</div>
                                    </div>

                                    <div className="max-h-[340px] overflow-y-auto no-scrollbar">
                                        {quickNotifications.map((notif) => (
                                            <div key={notif.id} className="p-5 hover:bg-surface-hover/50 transition-colors border-b border-border/10 flex items-start gap-4 cursor-pointer group">
                                                <div className={`size-9 rounded-xl flex items-center justify-center shrink-0 border ${
                                                    notif.type === 'alert' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                                    notif.type === 'approved' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                                                    'bg-primary/10 border-primary/20 text-primary'
                                                }`}>
                                                    {notif.type === 'alert' ? <Clock className="size-4.5" /> : 
                                                    notif.type === 'approved' ? <CheckCircle2 className="size-4.5" /> : 
                                                    <ShieldCheck className="size-4.5" />}
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
                                        onClick={() => { navigate('/admin/notifications'); setIsNotificationsOpen(false); }}
                                        className="w-full p-5 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 transition-all bg-surface border-t border-border/20"
                                    >
                                        <Activity className="size-3.5" />
                                        Launch Full System Log
                                        <ExternalLink className="size-3.5" />
                                    </button>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                <div className="h-10 w-[1px] bg-border/40 mx-1 hidden sm:block" />

                {/* ADMIN PROFILE */}
                <div className="relative">
                    <button 
                        onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationsOpen(false); }}
                        className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-surface-hover border border-border hover:border-primary/40 transition-all group shadow-sm bg-gradient-to-r from-surface-hover to-surface"
                    >
                        <div className="size-9 rounded-xl bg-gradient-to-br from-primary to-accent p-0.5 shadow-sm">
                            <div className="size-full rounded-[10px] bg-background flex items-center justify-center">
                                <span className="text-[11px] font-black text-primary">AD</span>
                            </div>
                        </div>
                        <div className="hidden md:flex flex-col items-start gap-0">
                            <span className="text-[11px] font-black text-content tracking-tight">{user?.name?.split(' ')[0] || 'Admin'}</span>
                            <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] italic opacity-80 leading-none mt-0.5">Tier_09</span>
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
                                className="absolute top-full right-0 mt-3 w-56 bg-surface border border-border rounded-[1.5rem] shadow-2xl overflow-hidden py-3 z-20"
                            >
                                <div className="px-5 py-3 border-b border-border/20 mb-2">
                                    <span className="text-[8px] font-black text-text-muted uppercase tracking-[0.3em]">Identity Protocol</span>
                                    <p className="text-[10px] font-bold text-content italic mt-1">{user?.email || 'admin@iniq.io'}</p>
                                </div>
                                <Link to="/admin/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-5 py-3 hover:bg-surface-hover transition-colors group">
                                    <User className="size-4 text-text-muted group-hover:text-primary" />
                                    <span className="text-xs font-bold text-content uppercase tracking-tight">Admin Profile</span>
                                </Link>
                                <Link to="/admin/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-5 py-3 hover:bg-surface-hover transition-colors group">
                                    <Settings className="size-4 text-text-muted group-hover:text-primary" />
                                    <span className="text-xs font-bold text-content uppercase tracking-tight">System Settings</span>
                                </Link>
                                <div className="h-[1px] bg-border/40 my-2 mx-5" />
                                <button 
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-500/5 transition-colors group text-red-500"
                                >
                                    <LogOut className="size-4" />
                                    <span className="text-xs font-black uppercase tracking-widest italic">Terminate Session</span>
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

export default AdminNavbar;
