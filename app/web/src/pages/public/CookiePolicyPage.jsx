import React, { useEffect } from 'react';
import { 
  Database, ShieldCheck, Zap, Info, 
  Settings, CheckCircle2, Layout, Layers,
  PieChart, MousePointer2
} from 'lucide-react';
import { motion } from 'framer-motion';
import SupportAppShell from '../../layouts/SupportAppShell';
import { useGlobalContext } from '../../context/GlobalContext';
import ScrollToTop from '../../components/common/ScrollToTop';

/**
 * --- COOKIE POLICY PAGE ---
 * Purpose: Explain the use of cookies and similar technologies.
 * Design: High-fidelity, mobile-responsive legal UI.
 */
const CookiePolicyPage = () => {
  const { setIsLoading, isLoading } = useGlobalContext();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  const HeroSection = (
    <div className="w-full pt-12 md:pt-16 pb-10 md:pb-12 flex flex-col items-center text-center px-5 text-content">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 mb-6"
      >
        <Database className="size-3 text-primary" />
        <span className="text-[9px] font-black uppercase tracking-[.2em] text-primary">Cookie Policy</span>
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-black tracking-tight mb-4"
      >
        How cookies may be <br className="md:hidden" /> <span className="text-primary italic">used.</span>
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm md:text-base text-text-muted font-medium max-w-2xl opacity-70 leading-relaxed"
      >
        Understand how Cookies and similar technologies help us provide <br className="hidden md:block" />
        a better experience on the INIQ platform.
      </motion.p>
    </div>
  );

  const SummaryCard = (
    <div className="w-full max-w-[900px] mx-auto px-5 mb-10 md:mb-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-surface-hover/30 border border-border/80 flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left"
      >
        <div className="size-14 md:size-16 rounded-[1.25rem] md:rounded-3xl bg-primary/10 flex items-center justify-center shrink-0">
          <Info className="size-6 md:size-8 text-primary" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-content">Cookie Summary</h3>
          <p className="text-[12px] md:text-[13px] font-medium text-text-muted leading-relaxed opacity-80">
            Cookies are used for sessions, preferences, and analytics. They help us remember your settings between visits and improve platform performance.
          </p>
        </div>
      </motion.div>
    </div>
  );

  const CookieSections = (
    <div className="w-full max-w-[900px] mx-auto px-5 mb-16 md:mb-20 space-y-4 md:space-y-6">
      {[
        { 
          title: "Essential", 
          icon: ShieldCheck,
          items: ["User authentication sessions", "Account security monitoring", "CSRF protection tokens", "Basic platform functionality"]
        },
        { 
          title: "Preference", 
          icon: Layout,
          items: ["Dark/Light theme settings", "Language preferences", "Sidebar collapse state", "Search filter persistence"]
        },
        { 
          title: "Analytics", 
          icon: PieChart,
          items: ["Page view measurements", "User flow analyzing", "Performance monitoring", "Experience popularity metrics"]
        },
        { 
          title: "Management", 
          icon: Settings,
          items: ["Browser setting controls", "Platform preference tools", "Opt-out of analytics", "Cookie clearing guide"]
        }
      ].map((section, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + (i * 0.1) }}
          className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-surface border border-border group hover:border-primary/20 transition-all flex flex-col sm:flex-row gap-6 md:gap-8 shadow-xl shadow-content/5"
        >
          <div className="flex items-center gap-4 sm:w-1/3 shrink-0">
            <div className="size-10 rounded-xl bg-surface-hover border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-sm">
              <section.icon className="size-4 md:size-5 text-primary group-hover:text-background transition-colors" />
            </div>
            <h4 className="text-[13px] md:text-sm font-black uppercase tracking-tight text-content">{section.title}</h4>
          </div>
          
          <div className="flex-1 grid grid-cols-1 gap-3">
            {section.items.map((item, j) => (
              <div key={j} className="flex items-center gap-3">
                <CheckCircle2 className="size-3 text-primary opacity-40 shrink-0" />
                <span className="text-[11px] md:text-xs font-bold text-text-muted leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const SettingsCTA = (
    <div className="w-full max-w-[900px] mx-auto px-5 mb-20 md:mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="w-full p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-content border border-content text-background flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left overflow-hidden relative group shadow-2xl"
      >
        <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
        
        <div className="relative z-10 flex flex-col gap-2">
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">Cookie Preferences</h3>
          <p className="text-[13px] md:text-sm font-medium opacity-60">Manage how cookies are used on your device.</p>
        </div>
        
        <button 
          className="relative z-10 px-10 py-4 bg-primary text-white font-black text-[10px] md:text-[11px] uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 w-full md:w-auto"
        >
          Cookie Settings <Settings className="size-4" />
        </button>
      </motion.div>
    </div>
  );

  return (
    <SupportAppShell isLoading={isLoading}>
      <div className="w-full">
        {HeroSection}
        {SummaryCard}
        {CookieSections}
        {SettingsCTA}
      </div>
      <ScrollToTop />
    </SupportAppShell>
  );
};

export default CookiePolicyPage;
