import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * --- INIQ INTERNAL PRELOADER ---
 * A premium, high-fidelity loading screen for internal transitions.
 * Features: Cyber-portal rings, progressive status messages, and smooth transitions.
 */
const InternalPreloader = ({ isLoaded }) => {
  const [status, setStatus] = useState("Initializing Core...");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const statuses = [
      "Initializing Core...",
      "Syncing Identity...",
      "Loading Intelligence Modules...",
      "Bypassing Security Hub...",
      "Accessing Portal..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < statuses.length - 1) {
        i++;
        setStatus(statuses[i]);
      }
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) return prev + 2;
        return 100;
      });
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-6"
        >
          {/* Ambient Background Glows */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 size-[400px] bg-primary/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 size-[400px] bg-accent/5 blur-[120px] rounded-full" />
          </div>

          <div className="relative flex flex-col items-center gap-12 w-full max-w-[300px]">
             {/* Cyber-Portal Logo Hub */}
             <div className="relative size-32 flex items-center justify-center">
                {/* Rotating Rings */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-t-2 border-r-2 border-primary rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border-b-2 border-l-2 border-accent/40 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 border-[1px] border-dashed border-text-muted/20 rounded-full"
                />

                {/* Center Image / Icon */}
                <div className="relative z-10 size-12 flex items-center justify-center grayscale brightness-200 contrast-200">
                   <img src="/assets/logos/logo-dark.svg" alt="INIQ" className="size-full object-contain opacity-80" />
                </div>
             </div>

             {/* Status Information */}
             <div className="flex flex-col items-center gap-4 w-full">
                <div className="flex flex-col items-center gap-1.5">
                  <motion.span 
                    key={status}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted italic"
                  >
                    {status}
                  </motion.span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-content font-['Sora'] tracking-tighter">INIQ</span>
                    <span className="text-xs font-black text-primary tracking-widest translate-y-[-2px]">HUB</span>
                  </div>
                </div>

                {/* Precision Progress Bar */}
                <div className="w-full h-1 bg-surface-hover rounded-full border border-border/20 overflow-hidden relative mt-2">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    className="absolute left-0 inset-y-0 bg-gradient-to-r from-primary to-accent shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                  />
                </div>
                <div className="flex justify-between w-full px-0.5">
                   <span className="text-[8px] font-bold text-text-muted/40 uppercase tracking-widest">Initialization</span>
                   <span className="text-[8px] font-bold text-primary tracking-widest">{progress}%</span>
                </div>
             </div>
          </div>

          {/* Bottom Branding */}
          <div className="absolute bottom-12 flex items-center gap-3 opacity-20">
             <div className="h-[1px] w-8 bg-text-muted/50" />
             <span className="text-[9px] font-black uppercase tracking-[0.5em] text-text-muted">Intelligence Platform</span>
             <div className="h-[1px] w-8 bg-text-muted/50" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InternalPreloader;
