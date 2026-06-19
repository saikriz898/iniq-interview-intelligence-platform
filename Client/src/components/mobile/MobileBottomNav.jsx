import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Plus, LayoutDashboard, User, Layers } from 'lucide-react';
import { useGlobalContext } from '../../context/GlobalContext';

const MobileBottomNav = () => {
  const location = useLocation();
  const { user, setAuthModal } = useGlobalContext();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Explore', path: '/experiences', icon: Compass },
  ];

  if (user) {
    navItems.push(
      { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { label: 'Profile', path: '/profile', icon: User }
    );
  } else {
    navItems.push(
      { label: 'Platform', path: '/how-it-works', icon: Layers }
    );
  }

  // Find if we have a middle button layout
  const leftItems = navItems.slice(0, 2);
  const rightItems = navItems.slice(2, 4);

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] md:hidden">
      {/* Glossy Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl border-t border-border/40 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] pointer-events-none" />

      <nav className="relative h-16 px-6 flex items-center justify-between pointer-events-auto">
        {/* Left Tabs */}
        <div className="flex-1 flex justify-evenly">
          {leftItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center gap-1 group relative py-2"
              >
                <item.icon className={`size-5 transition-all ${isActive ? 'text-primary scale-110' : 'text-text-muted group-hover:text-content'}`} />
                <span className={`text-[9px] font-bold tracking-wider transition-colors ${isActive ? 'text-primary' : 'text-text-muted group-hover:text-content'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Center Floating Action Button (Submit) */}
        <div className="relative shrink-0 px-4 -mt-10 z-10">
          {user ? (
            <Link
              to="/submit"
              className="flex items-center justify-center size-14 rounded-full bg-primary text-primary-text shadow-[0_8px_20px_rgba(59,130,246,0.4)] border-4 border-background hover:scale-105 active:scale-95 transition-all"
            >
              <Plus className="size-6" />
            </Link>
          ) : (
            <button
              onClick={() => setAuthModal({ isOpen: true, view: 'login' })}
              className="flex items-center justify-center size-14 rounded-full bg-primary text-primary-text shadow-[0_8px_20px_rgba(59,130,246,0.4)] border-4 border-background hover:scale-105 active:scale-95 transition-all"
            >
              <Plus className="size-6" />
            </button>
          )}
        </div>

        {/* Right Tabs */}
        <div className="flex-1 flex justify-evenly">
          {rightItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center gap-1 group relative py-2"
              >
                <item.icon className={`size-5 transition-all ${isActive ? 'text-primary scale-110' : 'text-text-muted group-hover:text-content'}`} />
                <span className={`text-[9px] font-bold tracking-wider transition-colors ${isActive ? 'text-primary' : 'text-text-muted group-hover:text-content'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MobileBottomNav;
