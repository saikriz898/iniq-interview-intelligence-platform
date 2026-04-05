import React from 'react';
import MobileHeader from '../components/mobile/MobileHeader';
import MobileDrawer from '../components/mobile/MobileDrawer';
import MobileFooter from '../components/mobile/MobileFooter';
import MobilePreloader from '../components/mobile/MobilePreloader';
import ScrollTopReset from '../components/common/ScrollTopReset';
import { AnimatePresence } from 'framer-motion';

const MobileAppShell = ({ theme, toggleTheme, isMenuOpen, setIsMenuOpen, isLoading, hideFooter, children }) => {
  return (
    <div className="md:hidden flex flex-col min-h-screen bg-mesh-gradient overflow-x-hidden">
      <ScrollTopReset />
      <AnimatePresence>
        {isLoading && <MobilePreloader theme={theme} />}
      </AnimatePresence>
      
      {/* Mobile Header */}
      <MobileHeader 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onOpenMenu={() => setIsMenuOpen(true)} 
      />

      {/* Mobile Menu Drawer */}
      <MobileDrawer 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      
      {/* Scrollable Main Content area */}
      <main className="flex-grow pt-16 w-full relative z-10">
        <div className="w-full flex flex-col min-h-[calc(100vh-64px)]">
          {children}
          {!hideFooter && <MobileFooter theme={theme} />}
        </div>
      </main>
    </div>
  );
};

export default MobileAppShell;
