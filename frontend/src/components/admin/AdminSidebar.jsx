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
 * --- ADMIN SIDEBAR: COMMAND CENTER NAVIGATION ---
 * Design: High-fidelity, fixed-position radar with scrollable link canvas.
 */
const AdminSidebar = () => {
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

  const navGroups = [
    {
      group: "Core Intelligence",
      items: [
        { label: 'Command Hub', path: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Intelligence Hub', path: '/admin/analytics', icon: Activity },
        { label: 'Pending Reviews', path: '/admin/pending', icon: Clock, alert: true },
        { label: 'Experience Database', path: '/admin/experiences', icon: ListChecks },
      ]
    },
    {
      group: "Data Management",
      items: [
        { label: 'Institutional Registry', path: '/admin/users', icon: Users },
        { label: 'Company Nodes', path: '/admin/companies', icon: Building2 },
        { label: 'Role Hierarchies', path: '/admin/roles', icon: ShieldCheck },
        { label: 'System Alerts', path: '/admin/notifications', icon: Bell },
      ]
    },
    {
      group: "Personal Dossier",
      items: [
        { label: 'Admin Profile', path: '/admin/profile', icon: UserCircle },
        { label: 'System Settings', path: '/admin/settings', icon: Settings },
      ]
    }
  ];

  return (
    <aside className="fixed top-16 sm:top-20 left-0 bottom-0 w-64 md:w-72 border-r border-border/40 bg-surface/80 backdrop-blur-md z-[100] hidden lg:flex flex-col overflow-hidden">
      
      {/* 1. SCROLLABLE LINK CANVAS */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 px-5 pb-10">
        {navGroups.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-2 mb-10 shrink-0">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted opacity-40 px-4 mb-2">{group.group}</span>
            {group.items.map((item) => {
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
                  
                  {item.alert && !isActive && (
                    <div className="size-1.5 rounded-full bg-primary animate-pulse ml-auto" />
                  )}
                  
                  {isActive && (
                    <motion.div layoutId="activeAdminNav" className="size-1.5 rounded-full bg-primary ml-auto shadow-sm" />
                  )}
                  
                  {!isActive && (
                    <ChevronRight className="size-3 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
        
        {/* Status indicator */}
        <div className="px-4 py-6 border-t border-border/20 mt-4 opacity-30 grayscale">
            <div className="flex items-center gap-3">
                <Terminal className="size-4" />
                <span className="text-[8px] font-black uppercase tracking-widest text-content">Admin Level: 09</span>
            </div>
        </div>
      </div>

      {/* 2. FIXED LOGOUT NODE */}
      <div className="p-8 px-5 border-t border-border/20 bg-background/20 backdrop-blur-sm shrink-0">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-4 py-4 rounded-2xl text-text-muted hover:text-red-500 hover:bg-red-500/5 transition-all group border border-transparent hover:border-red-500/20 shadow-sm"
        >
          <div className="size-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all shadow-inner">
             <LogOut className="size-5 transition-transform group-hover:-translate-x-1" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.15em] italic">Decommission Admin</span>
        </button>
      </div>

    </aside>
  );
};

export default AdminSidebar;
