import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Shield } from 'lucide-react';

const MobilePreloader = ({ theme }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#030712] md:hidden overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[80px]" 
        />
        <div className="absolute inset-0 bg-primary/2 opacity-[0.03]" />
      </div>

      <div className="relative flex flex-col items-center gap-12 px-10 text-center">
        {/* Animated Central Brand Core */}
        <div className="relative">
          {/* Pulsing Outer Ring */}
          <motion.div
            animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-10 border border-primary/30 rounded-full blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-32 h-auto relative z-10"
          >
            <img 
              src="/assets/logos/logo-dark.svg" 
              alt="Logo" 
              className="w-full h-auto drop-shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]" 
            />
          </motion.div>
        </div>

        {/* Loading Progress Feedback */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full"
            />
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60"
            >
              Loading Mastery
            </motion.p>
          </div>

          {/* Segmented Loader */}
          <div className="flex gap-2 h-0.5">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                animate={{ 
                  backgroundColor: ["rgba(255,255,255,0.05)", "var(--primary)", "rgba(255,255,255,0.05)"]
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="w-10 h-full rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Security Badge Footer */}
      <div className="absolute bottom-10 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
          <Shield className="size-3 text-primary" />
          <span className="text-[8px] font-bold text-white/40 tracking-widest uppercase">Secured Platform</span>
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          className="text-[7px] font-mono tracking-[0.3em] text-white/50"
        >
          VER-02.04 // CLUSTER_ALPHA
        </motion.p>
      </div>
    </motion.div>
  );
};

export default MobilePreloader;
