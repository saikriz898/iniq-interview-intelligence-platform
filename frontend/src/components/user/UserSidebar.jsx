import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, PlusCircle, ListChecks, FileText, Bookmark, 
  User, Settings, LogOut, ChevronRight, Bell, HelpCircle, LifeBuoy, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';

/**
 * --- USER SIDEBAR: PRIMARY NAVIGATION FOR LOGGED-IN PORTAL ---
 * Features: Glossy active indicators, grouped links, user identity summary.
 */
const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser, setIsLoading } = useGlobalContext();

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(null);
      localStorage.removeItem('iniq_user');
      setIsLoading(false);
      navigate('/login');
    }, 800);
  };

  const mainItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Submit Experience', path: '/submit', icon: PlusCircle },
    { label: 'My Submissions', path: '/my-submissions', icon: ListChecks },
  ];

  const accountItems = [
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const helpItems = [
    { label: 'Browse Experiences', path: '/experiences', icon: FileText },
  ];

  return (
    <aside className="fixed top-16 sm:top-20 left-0 bottom-0 w-64 md:w-72 border-r border-border/40 bg-surface/50 backdrop-blur-md z-[100] hidden lg:flex flex-col overflow-hidden">
      
      {/* 1. LINK CANVAS (No Scroll - Optimized for Height) */}
      <div className="flex-1 flex flex-col p-4 px-3.5 pb-2 overflow-hidden">
        {/* 1.1 PRIMARY NAVIGATION */}
        <div className="flex flex-col gap-1 mb-4 shrink-0">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted opacity-40 px-4 mb-1.5">Main Menu</span>
            {mainItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
                <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all group relative ${
                    isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                    : 'text-text-muted hover:bg-surface-hover hover:text-content border border-transparent'
                }`}
                >
                <item.icon className={`size-4.5 transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : 'opacity-60'}`} />
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
                {isActive && (
                    <motion.div layoutId="activeNav" className="size-1.5 rounded-full bg-primary ml-auto shadow-sm" />
                )}
                {!isActive && (
                    <ChevronRight className="size-3 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                )}
                </Link>
            );
            })}
        </div>

        {/* 1.2 ACCOUNT */}
        <div className="flex flex-col gap-1 mb-4 shrink-0">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted opacity-40 px-4 mb-1.5">Account</span>
            {accountItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
                <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all group relative ${
                    isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                    : 'text-text-muted hover:bg-surface-hover hover:text-content border border-transparent'
                }`}
                >
                <item.icon className={`size-4.5 transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : 'opacity-60'}`} />
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
                {isActive && (
                    <motion.div layoutId="activeNav" className="size-1.5 rounded-full bg-primary ml-auto shadow-sm" />
                )}
                {!isActive && (
                    <ChevronRight className="size-3 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                )}
                </Link>
            );
            })}
        </div>

        {/* 1.3 DISCOVERY */}
        <div className="flex flex-col gap-1 mb-0 shrink-0">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted opacity-40 px-4 mb-1.5">Discovery</span>
            {helpItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
                <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all group relative ${
                    isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                    : 'text-text-muted hover:bg-surface-hover/80 hover:text-content border border-transparent hover:border-border/40 hover:shadow-sm'
                }`}
                >
                <item.icon className={`size-4.5 transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : 'opacity-60'}`} />
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
                {isActive && (
                    <motion.div layoutId="activeNav" className="size-1.5 rounded-full bg-primary ml-auto shadow-sm" />
                )}
                {!isActive && (
                    <ChevronRight className="size-3 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                )}
                </Link>
            );
            })}
        </div>
      </div>

      {/* 2. PREMIUM USER PROFILE NODE (Fixed Bottom) */}
      <div className="p-5 pb-8 border-t border-border/10 bg-background/40 backdrop-blur-md shrink-0">
        <div className="flex flex-col gap-4">
            {/* User Profile Card */}
            <div 
              className="flex items-center gap-3 p-3 rounded-2xl bg-surface/50 border border-border/40 group hover:border-primary/40 transition-all cursor-pointer"
              onClick={() => navigate('/profile')}
            >
                <div className="size-11 rounded-xl bg-gradient-to-br from-primary to-accent p-0.5 shadow-lg group-hover:shadow-primary/20 transition-all">
                    <div className="size-full rounded-[10px] bg-background flex items-center justify-center overflow-hidden">
                        {user?.profilePicture ? (
                            <img src={user.profilePicture} alt="User Avatar" className="size-full object-cover" />
                        ) : (
                            <span className="text-xs font-black text-primary">{user?.name?.charAt(0) || 'U'}</span>
                        )}
                    </div>
                </div>
                <div className="flex flex-col flex-1 overflow-hidden">
                    <span className="text-xs font-black text-content tracking-tight truncate">{user?.name || 'Sai Kumar'}</span>
                    <span className="text-[9px] font-bold text-text-muted opacity-60 uppercase tracking-[0.1em] truncate">{user?.role || 'Tactical Member'}</span>
                </div>
                <div className="size-8 rounded-lg flex items-center justify-center text-text-muted opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all">
                    <Settings className="size-4 animate-spin-slow group-hover:rotate-90 transition-transform" />
                </div>
            </div>

            {/* Quick Logout Protocol */}
            <button 
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500/10 text-red-500/60 hover:text-red-500 hover:bg-red-500/5 hover:border-red-500/20 transition-all text-[10px] font-black uppercase tracking-[0.2em] italic group mb-2"
            >
                <LogOut className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                Sign Out Protocol
            </button>

        </div>
      </div>

    </aside>
  );
};

export default UserSidebar;
