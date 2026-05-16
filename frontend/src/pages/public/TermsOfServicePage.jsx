import React, { useEffect } from 'react';
import { 
  FileText, Scale, UserCheck, AlertCircle, 
  CheckCircle2, Info, ArrowRight, BookOpen, 
  PenTool, ShieldCheck, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import SupportAppShell from '../../layouts/SupportAppShell';
import { useGlobalContext } from '../../context/GlobalContext';
import ScrollToTop from '../../components/common/ScrollToTop';

/**
 * --- TERMS OF SERVICE PAGE ---
 * Purpose: Define rules and agreements for platform use.
 * Design: High-fidelity, mobile-responsive legal UI with clean sectioning.
 */
const TermsOfServicePage = () => {
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
        <FileText className="size-3 text-primary" />
        <span className="text-[9px] font-black uppercase tracking-[.2em] text-primary">Terms of Service</span>
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-black tracking-tight mb-4"
      >
        Rules for using the <br className="md:hidden" /> <span className="text-primary italic">platform.</span>
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm md:text-base text-text-muted font-medium max-w-2xl opacity-70"
      >
        By accessing INIQ, you agree to follow our guidelines for sharing <br className="hidden md:block" />
        and interacting with interview experiences.
      </motion.p>
    </div>
  );

  const IntroNote = (
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
          <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-content">Compliance Note</h3>
          <p className="text-[12px] md:text-[13px] font-medium text-text-muted leading-relaxed opacity-80">
            By using the platform, you agree to provide respectful and accurate content. Failure to adhere to these terms may result in account restriction.
          </p>
        </div>
      </motion.div>
    </div>
  );

  const TermsSections = (
    <div className="w-full max-w-[900px] mx-auto px-5 mb-16 md:mb-20 space-y-4 md:space-y-6">
      {[
        { 
          title: "Account", 
          icon: UserCheck,
          items: ["Maintain account security", "Keep your information updated", "No unauthorized account sharing", "Respect API usage limits"]
        },
        { 
          title: "Submissions", 
          icon: PenTool,
          items: ["Share truthful experiences", "No sensitive personal info", "No confidential trade secrets", "Respectful and clear language"]
        },
        { 
          title: "Reviewing", 
          icon: ShieldCheck,
          items: ["The team reviews all posts", "Reserving the right to remove trash", "Decisions on reviews are final", "Reporting inappropriate content"]
        },
        { 
          title: "Availability", 
          icon: Zap,
          items: ["Periodic maintenance updates", "Feature changes without notice", "Third-party dependency limits", "99% target platform uptime"]
        },
        { 
          title: "Liability", 
          icon: AlertCircle,
          items: ["Content is user-generated", "No guarantee of job success", "Not responsible for external links", "Use shared advice at your own risk"]
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

  const AgreementStrip = (
    <div className="w-full max-w-[900px] mx-auto px-5 mb-20 md:mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="w-full p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-white border-none text-slate-900 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left overflow-hidden relative group shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col gap-2">
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900">User Agreement</h3>
          <p className="text-[13px] md:text-sm font-medium text-slate-500">By continuing to use INIQ, you agree to these guidelines.</p>
        </div>
        
        <div className="relative z-10 flex items-center gap-3 italic">
           <Scale className="size-5 text-primary" />
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Binding Agreement</span>
        </div>
      </motion.div>
    </div>
  );

  return (
    <SupportAppShell isLoading={isLoading}>
      <div className="w-full">
        {HeroSection}
        {IntroNote}
        {TermsSections}
        {AgreementStrip}
      </div>
      <ScrollToTop />
    </SupportAppShell>
  );
};

export default TermsOfServicePage;
