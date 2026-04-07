import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, PlusCircle, ListChecks, FileText, Bookmark, 
  User, Settings, LogOut, ChevronRight, Bell, HelpCircle, LifeBuoy
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

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Submit Experience', path: '/submit', icon: PlusCircle },
    { label: 'My Submissions', path: '/my-submissions', icon: ListChecks },
    { label: 'Drafts', path: '/drafts', icon: FileText },
    { label: 'Saved Items', path: '/saved', icon: Bookmark },
    { label: 'Notifications', path: '/notifications', icon: Bell },
  ];

  const accountItems = [
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const helpItems = [
    { label: 'Help Center', path: '/faq', icon: HelpCircle },
    { label: 'Support Hub', path: '/support', icon: LifeBuoy },
  ];

  return (
    <aside className="fixed top-16 sm:top-20 left-0 bottom-0 w-64 md:w-72 border-r border-border/40 bg-surface/50 backdrop-blur-md z-[100] hidden lg:flex flex-col overflow-hidden">
      
      {/* 1. SCROLLABLE LINK CANVANS */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 px-5 pb-10">
        {/* 1.1 PRIMARY NAVIGATION */}
        <div className="flex flex-col gap-2 mb-8 shrink-0">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted opacity-40 px-4 mb-2">Main Menu</span>
            {menuItems.map((item) => {
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

        {/* 1.2 ACCOUNT SETTINGS */}
        <div className="flex flex-col gap-2 mb-8 shrink-0">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted opacity-40 px-4 mb-2">Account Hub</span>
            {accountItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
                <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all group ${
                    isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                    : 'text-text-muted hover:bg-surface-hover hover:text-content border border-transparent'
                }`}
                >
                <item.icon className={`size-4.5 transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : 'opacity-60'}`} />
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
                </Link>
            );
            })}
        </div>

        {/* 1.3 HELP & SUPPORT */}
        <div className="flex flex-col gap-2 mb-8 shrink-0">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted opacity-40 px-4 mb-2">Assistance</span>
            {helpItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
                <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all group ${
                    isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                    : 'text-text-muted hover:bg-surface-hover hover:text-content border border-transparent'
                }`}
                >
                <item.icon className={`size-4.5 transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : 'opacity-60'}`} />
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
                </Link>
            );
            })}
        </div>
      </div>

      {/* 2. FIXED LOGOUT NODE (Bottom) */}
      <div className="p-8 px-5 border-t border-border/20 bg-background/20 backdrop-blur-sm shrink-0">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-4 py-4 rounded-2xl text-text-muted hover:text-red-500 hover:bg-red-500/5 transition-all group border border-transparent hover:border-red-500/20 shadow-sm"
        >
          <div className="size-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all shadow-inner">
             <LogOut className="size-5 transition-transform group-hover:-translate-x-1" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.15em] italic">Sign Out Protocol</span>
        </button>
      </div>

    </aside>
  );
};

export default UserSidebar;
