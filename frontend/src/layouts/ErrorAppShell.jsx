import React from 'react';
import PublicNavbar from '../components/public/PublicNavbar';
import PublicFooter from '../components/public/PublicFooter';
import { motion } from 'framer-motion';

/**
 * --- ERROR APP SHELL ---
 * Purpose: Dedicated layout for error pages (404, 500, etc.)
 * Style: Clean, branded mesh background with high-fidelity orbs.
 * Content: Optimized for standalone error reporting.
 */
const ErrorAppShell = ({ theme, toggleTheme, children }) => {
  return (
    <div className="flex flex-col min-h-screen relative bg-mesh-gradient overflow-hidden">
      
      {/* Branded Ambient Orbs - Visual Consistency */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[15%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] opacity-15"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 60, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px] opacity-10"
        />
      </div>

      {/* Minimal Navigation for Error Recovery */}
      <PublicNavbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Hub - Specifically centered for Error Messages */}
      <main className="flex-grow flex items-center justify-center pt-20 w-full relative z-10 px-6">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          {children}
        </div>
      </main>

      {/* Simple Footer for Brand Context */}
      <PublicFooter theme={theme} />
    </div>
  );
};

export default ErrorAppShell;
