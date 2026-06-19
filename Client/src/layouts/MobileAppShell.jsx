import React from 'react';
import MobileHeader from '../components/mobile/MobileHeader';
import MobileBottomNav from '../components/mobile/MobileBottomNav';
import MobileFooter from '../components/mobile/MobileFooter';

import ScrollTopReset from '../components/common/ScrollTopReset';
import { AnimatePresence } from 'framer-motion';

const MobileAppShell = ({ theme, toggleTheme, isMenuOpen, setIsMenuOpen, isLoading, hideFooter, children }) => {
  return (
    <div className="md:hidden flex flex-col min-h-screen bg-mesh-gradient overflow-x-hidden">
      <ScrollTopReset />

      
      {/* Mobile Header */}
      <MobileHeader 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />

      {/* Scrollable Main Content area */}
      <main className="flex-grow pt-16 pb-24 w-full">
        <div className="w-full flex flex-col min-h-[calc(100vh-64px)]">
          {children}
          {!hideFooter && <MobileFooter theme={theme} />}
        </div>
      </main>

      {/* Fixed Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default MobileAppShell;
