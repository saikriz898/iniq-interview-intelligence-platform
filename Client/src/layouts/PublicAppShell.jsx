import React from 'react';
import PublicNavbar from '../components/public/PublicNavbar';
import PublicFooter from '../components/public/PublicFooter';

import ScrollTopReset from '../components/common/ScrollTopReset';
import { motion, AnimatePresence } from 'framer-motion';

const PublicAppShell = ({ theme, toggleTheme, isLoading, hideFooter, children }) => {
  return (
    <div className="hidden md:flex flex-col min-h-screen relative bg-mesh-gradient">
      <ScrollTopReset />

      
      {/* High Fidelity Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] opacity-20" />
        <div className="absolute top-[30%] -right-[15%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[100px] opacity-15" />
      </div>

      {/* Primary Navigation */}
      <PublicNavbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Hub */}
      <main className="flex-grow pt-20 w-full relative z-10 overflow-visible">
        <div className="w-full flex flex-col justify-between min-h-[calc(100vh-80px)]">
          <div className="w-full flex flex-col items-center">
            {children}
          </div>
          {!hideFooter && <PublicFooter theme={theme} />}
        </div>
      </main>
    </div>
  );
};

export default PublicAppShell;
