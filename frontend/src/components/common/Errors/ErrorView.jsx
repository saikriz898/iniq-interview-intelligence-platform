import React from 'react';
import { 
  ArrowLeft, RefreshCw, ShieldAlert, 
  WifiOff, Wrench, LogOut, FileQuestion, 
  AlertTriangle, EyeOff, LayoutGrid
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/**
 * --- ERROR VIEW COMPONENT ---
 * Purpose: Centered Error Block with Focus on Message and Action.
 * Style: Minimalist, centered, high-contrast.
 */
const ErrorView = ({ 
  code = "Error", 
  title = "Something went wrong", 
  description = "An unexpected error has occurred. Please try again.", 
  primaryAction = { label: "Go back", path: null, action: () => window.history.back() },
  secondaryAction = { label: "Refresh", path: null, action: () => window.location.reload() },
  visualType = "default" 
}) => {
  const navigate = useNavigate();

  const getVisualIcon = () => {
    switch (visualType) {
      case "404": return <FileQuestion className="size-16 text-primary/60" />;
      case "empty": return <LayoutGrid className="size-16 text-primary/60" />;
      case "denied": return <ShieldAlert className="size-16 text-red-500/60" />;
      case "server": return <AlertTriangle className="size-16 text-accent/60" />;
      case "offline": return <WifiOff className="size-16 text-primary/60" />;
      case "maintenance": return <Wrench className="size-16 text-accent/60" />;
      case "session": return <LogOut className="size-16 text-red-500/60" />;
      case "unavailable": return <EyeOff className="size-16 text-primary/60" />;
      case "validation": return <AlertTriangle className="size-16 text-red-500/60" />;
      default: return <AlertTriangle className="size-16 text-primary/60" />;
    }
  };

  const getVisualLabel = () => {
    switch (visualType) {
      case "404": return "Missing Page";
      case "empty": return "No Results Found";
      case "denied": return "Access Denied";
      case "server": return "Internal Error";
      case "offline": return "Connectivity Issue";
      case "maintenance": return "System Update";
      case "session": return "Auth Expired";
      case "unavailable": return "Private State";
      default: return "Diagnostic Box";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20 relative select-none"
    >
      {/* 1. Left Side: Visual State Card (3D Feel) */}
      <div className="relative shrink-0 hidden md:block">
        <motion.div 
          animate={{ rotateY: [-5, 5, -5], y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-[340px] h-[360px] rounded-[2.5rem] bg-surface-hover border border-white/10 flex flex-col items-center justify-center gap-8 p-10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden perspective-1000"
        >
          {/* Internal Grid Decoration */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-[0.05] pointer-events-none">
             {[...Array(64)].map((_, i) => (
                <div key={i} className="border border-white" />
             ))}
          </div>

          <div className="size-28 rounded-[2rem] bg-background border border-border/60 flex items-center justify-center shadow-inner relative z-10">
             {getVisualIcon()}
          </div>
          
          <div className="flex flex-col items-center text-center gap-3 relative z-10">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-text-muted opacity-40">
              {getVisualLabel()}
            </span>
            <div className={`h-1 w-16 rounded-full ${visualType === 'denied' || visualType === 'session' ? 'bg-red-500' : 'bg-primary'} opacity-20`} />
          </div>

          {/* Abstract Data Lines */}
          <div className="w-full flex flex-col gap-3 relative z-10 px-4">
             <div className="h-2 w-full rounded-full bg-white/5" />
             <div className="h-2 w-2/3 rounded-full bg-white/5" />
          </div>
        </motion.div>

        {/* Floating Accent Orb */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
      </div>

      {/* 2. Right Side: Text & Actions */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-8 lg:max-w-xl z-10">
        <div className="px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-primary">{code}</span>
        </div>
        
        <div className="flex flex-col gap-6">
          <h2 className="text-4xl md:text-6xl font-black text-content font-['Sora'] tracking-tighter leading-[1.05] italic">
            {title}
          </h2>
          <p className="text-lg md:text-xl font-medium text-text-secondary leading-relaxed max-w-lg">
            {description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto pt-4">
          <button 
            onClick={() => primaryAction.path ? navigate(primaryAction.path) : primaryAction.action()}
            className="w-full sm:w-auto px-10 py-4.5 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 group"
          >
            {primaryAction.label}
            <ArrowLeft className="size-4.5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => secondaryAction.path ? navigate(secondaryAction.path) : secondaryAction.action()}
            className="w-full sm:w-auto px-10 py-4.5 rounded-2xl bg-surface border border-border/80 text-content font-black text-xs uppercase tracking-widest hover:bg-surface-hover transition-all flex items-center justify-center gap-3 active:scale-95 group shadow-xl"
          >
            {secondaryAction.label}
            {secondaryAction.label === 'Refresh' && <RefreshCw className="size-4.5 group-hover:rotate-180 transition-all duration-700 opacity-60" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorView;
