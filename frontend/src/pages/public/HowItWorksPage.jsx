import React, { useEffect } from 'react';
import { 
  Rocket, Search, BookOpen, Layers, Sparkles, 
  ChevronRight, PlusCircle, CheckCircle2, 
  ArrowRight, Compass, LayoutGrid, Terminal, 
  UserCheck, ShieldCheck, Clock, CheckCircle, XCircle, Send
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PublicAppShell from '../../layouts/PublicAppShell';
import MobileAppShell from '../../layouts/MobileAppShell';
import { useGlobalContext } from '../../context/GlobalContext';
import ScrollToTop from '../../components/common/ScrollToTop';

/**
 * --- HOW IT WORKS PAGE ---
 * Purpose: Provide a clear, compact guide on how the platform operates.
 * Design: High-fidelity, single-page UI with horizontal flow and dual-column usage.
 */
const HowItWorksPage = () => {
  const { theme, toggleTheme, isMenuOpen, setIsMenuOpen, isLoading, setIsLoading } = useGlobalContext();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  const HeroSection = (
    <div className="w-full pt-16 pb-12 flex flex-col items-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 mb-6"
      >
        <Layers className="size-3 text-primary" />
        <span className="text-[9px] font-black uppercase tracking-[.2em] text-primary">How It Works</span>
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-black text-content tracking-tight mb-4"
      >
        Understand how <span className="text-primary italic">INIQ</span> works.
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-base text-text-muted font-medium max-w-2xl opacity-70"
      >
        Browse real interview experiences, review round-wise details, and <br className="hidden md:block" />
        submit your own structured experience for others to learn from.
      </motion.p>
    </div>
  );

  const FlowSection = (
    <div className="w-full max-w-[1200px] mx-auto px-6 mb-20">
      <div className="relative flex flex-wrap md:flex-nowrap justify-between gap-4 md:gap-0">
        {/* Connection Line */}
        <div className="absolute top-[30px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-border to-transparent hidden md:block" />
        
        {[
          { icon: Compass, label: "Explore experiences", step: "01" },
          { icon: LayoutGrid, label: "Open overview", step: "02" },
          { icon: BookOpen, label: "Read rounds", step: "03" },
          { icon: Terminal, label: "Check answers", step: "04" },
          { icon: PlusCircle, label: "Submit experience", step: "05" }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + (i * 0.1) }}
            className="flex flex-col items-center gap-3 relative z-10 w-[45%] md:w-1/5"
          >
            <div className="size-[60px] rounded-2xl bg-surface border border-border flex items-center justify-center shadow-lg group-hover:border-primary/40 transition-colors relative">
               <span className="absolute -top-2 -right-2 size-6 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center border-2 border-background">
                {item.step}
               </span>
               <item.icon className="size-6 text-primary/70" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider text-content text-center px-2">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const UsageSection = (
    <div className="w-full max-w-[1100px] mx-auto px-6 mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* For Readers */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="p-8 rounded-[2.5rem] bg-surface-hover/50 border border-border/80 flex flex-col gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Compass className="size-5 text-blue-500" />
          </div>
          <h3 className="text-xl font-black text-content uppercase tracking-tight">For Readers</h3>
        </div>
        
        <ul className="flex flex-col gap-4">
          {[
            "Search by company, role, or topic",
            "Open a full experience overview",
            "Review each round separately",
            "Learn from verdict, advice, and references"
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="size-4 text-blue-500 mt-0.5 shrink-0" />
              <span className="text-sm font-medium text-text-muted">{text}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* For Contributors */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9 }}
        className="p-8 rounded-[2.5rem] bg-surface-hover/50 border border-border/80 flex flex-col gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <PlusCircle className="size-5 text-purple-500" />
          </div>
          <h3 className="text-xl font-black text-content uppercase tracking-tight">For Contributors</h3>
        </div>
        
        <ul className="flex flex-col gap-4">
          {[
            "Choose company and role",
            "Add candidate experience & overview",
            "Add separate round details",
            "Add verdict and advice",
            "Submit for review"
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="size-4 text-purple-500 mt-0.5 shrink-0" />
              <span className="text-sm font-medium text-text-muted">{text}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );

  const AdminStrip = (
    <div className="w-full max-w-[1000px] mx-auto px-6 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="w-full py-4 px-8 rounded-full bg-content/5 border border-border/40 flex items-center justify-between overflow-hidden relative group"
      >
        <div className="flex items-center gap-2 shrink-0">
          <ShieldCheck className="size-4 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-content/60">Admin Review Flow</span>
        </div>
        
        <div className="flex items-center gap-2 md:gap-6 ml-4">
          <div className="flex items-center gap-2">
            <Send className="size-3 text-text-muted" />
            <span className="text-[10px] font-bold text-text-muted">Submitted</span>
          </div>
          <ArrowRight className="size-3 text-border" />
          <div className="flex items-center gap-2">
            <Clock className="size-3 text-amber-500" />
            <span className="text-[10px] font-bold text-text-muted">Reviewed</span>
          </div>
          <ArrowRight className="size-3 text-border" />
          <div className="flex items-center gap-2">
             <div className="flex items-center gap-1">
                <CheckCircle className="size-3 text-green-500" />
                <span className="text-border">/</span>
                <XCircle className="size-3 text-red-500" />
             </div>
            <span className="text-[10px] font-bold text-text-muted">Approved / Rejected</span>
          </div>
          <ArrowRight className="size-3 text-border" />
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-3 text-primary" />
            <span className="text-[10px] font-bold text-primary italic">Published</span>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const CTAActions = (
    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 px-6 pb-24">
      <Link 
        to="/experiences" 
        className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-primary text-white font-black text-[11px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
      >
        Explore Experiences <ArrowRight className="size-4" />
      </Link>
      <Link 
        to="/submit" 
        className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-surface border border-border text-content font-black text-[11px] uppercase tracking-widest hover:bg-surface-hover transition-all flex items-center justify-center gap-2"
      >
        Submit Experience <PlusCircle className="size-4 opacity-40" />
      </Link>
    </div>
  );

  return (
    <>
      <PublicAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} hideFooter={true}>
        <div className="w-full">
          {HeroSection}
          {FlowSection}
          {UsageSection}
          {AdminStrip}
          {CTAActions}
        </div>
      </PublicAppShell>

      <MobileAppShell
        theme={theme}
        toggleTheme={toggleTheme}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isLoading={isLoading}
      >
        <div className="w-full">
          {HeroSection}
          <div className="px-6 flex flex-col gap-2">
             {FlowSection}
             {UsageSection}
             {AdminStrip}
             {CTAActions}
          </div>
        </div>
      </MobileAppShell>

      <ScrollToTop />
    </>
  );
};

export default HowItWorksPage;
