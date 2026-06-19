import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ListChecks, Clock, Building2, 
  UserCircle, Settings, LogOut, Bell, ShieldCheck,
  ChevronRight, Activity, Terminal, Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';

/**
 * --- ADMIN SIDEBAR: ENTERPRISE NAVIGATION ---
 * Design: High-fidelity, clean, professional SaaS sidebar.
 */
const AdminSidebar = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, user, setUser, setAuthModal } = useGlobalContext();

  const handleLogout = () => {
    if (onClose) onClose();
    setUser(null);
    localStorage.removeItem('iniq_user');
    localStorage.removeItem('iniq_token');
    navigate('/');
    setTimeout(() => {
      setAuthModal({ isOpen: true, view: 'login' });
    }, 100);
  };

  const navGroups = [
    {
      group: "Overview",
      items: [
        { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Global Reviews', path: '/admin/reviews', icon: ListChecks, alert: true },
      ]
    },
    {
      group: "Management",
      items: [
        { label: 'Companies', path: '/admin/companies', icon: Building2 },
        { label: 'Roles', path: '/admin/roles', icon: ShieldCheck },
        { label: 'Users', path: '/admin/users', icon: Users },
      ]
    },
    {
      group: "System",
      items: [
        { label: 'Profile', path: '/admin/profile', icon: UserCircle },
        { label: 'Settings', path: '/admin/settings', icon: Settings },
      ]
    }
  ];

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-64 md:w-72 border-r border-border/40 bg-surface/80 backdrop-blur-md z-[100] hidden lg:flex flex-col overflow-hidden">
      
      {/* 0. LOGO HEADER FOR DESKTOP */}
      <div className="hidden lg:flex items-center justify-start px-6 h-20 border-b border-border/10 shrink-0">
        <Link to="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="size-10 rounded-full border border-border bg-surface-hover/50 flex items-center justify-center overflow-hidden shadow-inner transition-all group-hover:border-primary/30 shrink-0">
            <img 
              src={theme === 'dark' ? "/assets/logos/logo-dark.png" : "/assets/logos/logo.png"} 
              alt="INIQ" 
              className="h-6 w-auto object-contain group-hover:scale-110 transition-transform" 
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary leading-none font-['Space_Grotesk']">Command Hub</span>
            <div className="flex items-center gap-1.5 opacity-40 mt-1.5">
                <div className="size-1 rounded-full bg-primary animate-ping" />
                <span className="text-[7px] font-bold text-text-secondary uppercase tracking-[0.2em]">Telemetry: Online</span>
            </div>
          </div>
        </Link>
      </div>

      {/* 1. SCROLLABLE LINK CANVAS */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 px-5 pb-10">
        {navGroups.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-2 mb-10 shrink-0">
            <span className="text-[11px] font-bold text-text-muted px-4 mb-2">{group.group}</span>
            {group.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all group relative ${
                    isActive 
                      ? 'bg-primary text-primary-text shadow-sm' 
                      : 'text-text-muted hover:bg-surface-hover hover:text-content'
                  }`}
                >
                  <item.icon className={`size-4.5 transition-transform group-hover:scale-110 ${isActive ? 'text-primary-text' : 'opacity-70'}`} />
                  <span className="text-sm font-semibold tracking-tight">{item.label}</span>
                  
                  {item.alert && !isActive && (
                    <div className="size-1.5 rounded-full bg-danger animate-pulse ml-auto" />
                  )}
                  
                  {!isActive && (
                    <ChevronRight className="size-3 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
        
        {/* Status indicator removed */}
      </div>

      {/* 2. FIXED LOGOUT NODE */}
      <div className="p-8 px-5 border-t border-border bg-background/20 backdrop-blur-sm shrink-0">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-text-muted hover:text-danger hover:bg-danger/10 transition-all group"
        >
          <LogOut className="size-5 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-semibold tracking-tight">Log Out</span>
        </button>
      </div>

    </aside>
  );
};

export default AdminSidebar;
