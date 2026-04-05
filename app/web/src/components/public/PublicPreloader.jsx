import React from 'react';
import { motion } from 'framer-motion';

const PublicPreloader = ({ theme }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: "circIn" } }}
      className="fixed inset-0 z-[9999] hidden md:flex flex-col items-center justify-center bg-[#030712] overflow-hidden"
    >
      {/* Deep Space Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] opacity-30" />
      </div>

      <div className="relative flex flex-col items-center gap-16">
        {/* Futuristic Icon Scanner Case */}
        <div className="relative group">
          {/* Animated Scanning Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-12 border border-white/5 rounded-full border-t-primary/40 border-b-primary/40 blur-sm"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-16 border border-white/5 rounded-full border-l-accent/30 border-r-accent/30 blur-[2px]"
          />

          {/* Pure Icon Core */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="w-48 h-auto relative z-10 flex items-center justify-center p-4"
          >
            <img 
              src="/assets/logos/logo-dark.svg" 
              alt="Logo" 
              className="w-full h-auto drop-shadow-[0_0_25px_rgba(var(--primary-rgb),0.6)]" 
            />
          </motion.div>
        </div>

        {/* Intelligence Status Module */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/10" />
            <motion.p 
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40"
            >
              Initializing Intelligence
            </motion.p>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/10" />
          </div>

          {/* New Linear Segmented Loader */}
          <div className="flex gap-1.5 h-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.1, scaleX: 0.8 }}
                animate={{ 
                  opacity: [0.1, 1, 0.1], 
                  scaleX: [0.8, 1, 0.8],
                  backgroundColor: ["rgba(255,255,255,0.1)", "var(--primary)", "rgba(255,255,255,0.1)"]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
                className="w-8 h-full rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Terminal Footer Detail */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="text-[8px] font-mono tracking-widest text-white/50 uppercase"
        >
          Secured Protocol Active // Cluster-01
        </motion.p>
      </div>
    </motion.div>
  );
};

export default PublicPreloader;
