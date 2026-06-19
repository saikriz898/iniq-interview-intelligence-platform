import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, ListChecks, User, Search, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Saved', path: '/saved', icon: Bookmark },
    { label: 'Submit', path: '/submit', icon: PlusCircle },
    { label: 'My Logs', path: '/my-submissions', icon: ListChecks },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 sm:h-20 bg-surface/90 backdrop-blur-xl border-t border-border/40 z-[120] lg:hidden flex items-center justify-around px-2 sm:px-6 safe-area-bottom">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className="relative flex flex-col items-center justify-center w-full h-full gap-1 group tap-highlight-transparent"
          >
            <div className={`relative flex items-center justify-center transition-transform ${isActive ? '-translate-y-1' : 'group-hover:-translate-y-1'}`}>
              <item.icon 
                className={`size-5 sm:size-6 transition-colors ${
                  isActive ? 'text-primary' : 'text-text-muted group-hover:text-primary/70'
                }`} 
                strokeWidth={isActive ? 2.5 : 2} 
              />
              {isActive && (
                <motion.div 
                  layoutId="bottomNavIndicator"
                  className="absolute -bottom-2 size-1 rounded-full bg-primary"
                />
              )}
            </div>
            <span className={`text-[10px] sm:text-xs font-semibold transition-colors ${
              isActive ? 'text-primary' : 'text-text-muted group-hover:text-primary/70'
            }`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileBottomNav;
