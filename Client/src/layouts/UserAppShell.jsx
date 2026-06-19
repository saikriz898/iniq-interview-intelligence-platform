import React, { useState } from 'react';
import UserNavbar from '../components/user/UserNavbar';
import UserSidebar from '../components/user/UserSidebar';
import MobileBottomNav from '../components/user/MobileBottomNav';
import ScrollTopReset from '../components/common/ScrollTopReset';
import { motion, AnimatePresence } from 'framer-motion';


/**
 * --- USER APP SHELL: THE INTELLIGENT HUB LAYOUT ---
 * Purpose: Full Dashboard Shell with Top Navbar + Left Sidebar.
 * Layout: Fixed Navbar + Sidebar + Scrollable Canvas (Responsive to Mobile Drawer).
 */
const UserAppShell = ({ theme, toggleTheme, isLoading, children, noPadding = false }) => {

  return (
    <div className={`flex flex-col min-h-screen relative bg-background ${noPadding ? 'h-screen overflow-hidden' : ''}`}>
      <ScrollTopReset />

      
      {/* High Fidelity Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] bg-accent/5 rounded-full blur-[80px]" />
      </div>

      {/* 1. TOP NAVBAR (Sticky) */}
      <UserNavbar />

      {/* 2. MAIN LAYOUT FLEX */}
      <div className="flex flex-1 pt-16 sm:pt-20">
        
        {/* 2.1 SIDEBAR (Desktop Fixed only, no mobile overlay logic needed anymore but passed anyway) */}
        <div className="hidden lg:block">
            <UserSidebar isOpen={false} onClose={() => {}} />
        </div>

        {/* 2.2 CONTENT CANVAS (Scrollable) */}
        <main className={`flex-1 lg:ml-72 relative z-10 overflow-visible flex flex-col ${noPadding ? 'h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] overflow-hidden' : 'items-center pb-16 lg:pb-0'}`}>
            <div className={`w-full ${noPadding ? 'p-0 h-full max-w-none' : 'max-w-[1400px] px-4 sm:px-10 py-6 md:py-12'}`}>
                {children}
            </div>
        </main>
      </div>

      {/* 3. MOBILE BOTTOM NAVIGATION */}
      <MobileBottomNav />
    </div>
  );
};

export default UserAppShell;
