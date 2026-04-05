import React, { useEffect } from 'react';
import { 
  Building2, UserCircle, Hash, Layers, 
  Code2, Layout, ArrowRight, Zap, 
  ChevronRight, Sparkles, BookOpen 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SupportAppShell from '../../layouts/SupportAppShell';
import { useGlobalContext } from '../../context/GlobalContext';
import ScrollToTop from '../../components/common/ScrollToTop';

/**
 * --- RESOURCES HUB ---
 * Purpose: A central public learning and browsing hub for interview resources.
 * Design: High-fidelity, compact, single-page layout.
 */
const ResourcesPage = () => {
  const { setIsLoading, isLoading } = useGlobalContext();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  const HeroSection = (
    <div className="w-full pt-12 md:pt-16 pb-12 flex flex-col items-start px-5 md:px-0 max-w-[1100px] mx-auto text-left">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 mb-6"
      >
        <Sparkles className="size-3 text-primary" />
        <span className="text-[9px] font-black uppercase tracking-[.2em] text-primary">Resources Hub</span>
      </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-black text-content tracking-tighter mb-4 leading-none"
      >
        Learn and browse <br />
        interview <span className="text-primary italic">resources.</span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm md:text-base text-text-muted font-medium max-w-xl opacity-60 leading-relaxed"
      >
        Discover companies, roles, topics, and round-based preparation in one place. 
        Explore structured interview journeys to sharpen your technical edge.
      </motion.p>
    </div>
  );

  const ResourceCards = (
    <div className="max-w-[1100px] mx-auto w-full px-5 md:px-0 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { 
            title: "Companies", 
            desc: "Browse interview experiences by company and compare common patterns.", 
            icon: Building2, 
            color: "blue",
            link: "/resources/companies" 
          },
          { 
            title: "Roles", 
            desc: "Explore interview journeys based on role and hiring expectations.", 
            icon: UserCircle, 
            color: "purple",
            link: "/resources/roles" 
          },
          { 
            title: "Topics", 
            desc: "Review the main areas asked in interviews such as DSA, HLD and LLD.", 
            icon: Hash, 
            color: "indigo",
            link: "/resources/topics" 
          },
          { 
            title: "Interview Rounds", 
            desc: "Understand coding, machine coding, design and HR round structures.", 
            icon: Layers, 
            color: "amber",
            link: "/resources/interview-rounds" 
          },
          { 
            title: "DSA Prep", 
            desc: "Focus on common problem-solving areas asked across technical rounds.", 
            icon: Code2, 
            color: "green",
            link: "/resources/dsa-prep" 
          },
          { 
            title: "System Design", 
            desc: "Read practical concepts and patterns useful for design discussions.", 
            icon: Layout, 
            color: "indigo",
            link: "/resources/system-design" 
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (i * 0.1) }}
            className="group flex flex-col p-8 rounded-[2.5rem] bg-[#0A0F1E] border border-border/40 hover:border-primary/40 hover:shadow-2xl transition-all duration-300 relative overflow-hidden h-full cursor-pointer"
          >
            <div className={`size-11 rounded-xl bg-surface-hover/50 border border-border/60 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform`}>
              <item.icon className={`size-5 text-${item.color}-500`} />
            </div>
            
            <h3 className={`text-xl font-black tracking-tighter uppercase mb-4 text-${item.color}-500 transition-colors`}>{item.title}</h3>
            <p className="text-sm font-medium text-text-muted leading-relaxed opacity-60 italic mb-10">{item.desc}</p>
            
            <Link to={item.link} className={`mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-${item.color}-500`}>
              Explore <ChevronRight className="size-3" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const FeaturedPrepStrip = (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="max-w-[1100px] mx-auto w-full px-5 md:px-0 mb-16"
    >
      <div className="w-full p-10 md:p-14 rounded-[3rem] bg-white border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10 text-center md:text-left">
          <div className="flex flex-col gap-3">
             <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Featured Prep</span>
             <h2 className="text-2xl md:text-3xl font-black tracking-tighter leading-tight text-slate-900">Improve preparation through <br /> structured interview insights.</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
             <Link to="/experiences" className="w-full sm:w-auto px-10 py-5 bg-slate-950 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2">
                Explore Topics <Hash className="size-4 opacity-40 text-slate-400" />
             </Link>
             <Link to="/how-it-works" className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                View Rounds <Layers className="size-4 opacity-40 text-slate-400" />
             </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const QuickAccessRow = (
    <div className="max-w-[1100px] mx-auto w-full px-5 md:px-0 pb-24">
       <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
             <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-content/40 whitespace-nowrap">Quick Access</h4>
             <div className="h-px w-full bg-border/40" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { t: "Browse Companies", l: "/experiences" },
               { t: "Browse Roles", l: "/experiences" },
               { t: "DSA Prep", l: "/experiences" },
               { t: "System Design", l: "/how-it-works" }
             ].map((btn, i) => (
               <Link 
                key={i}
                to={btn.l}
                className="px-6 py-4 rounded-xl bg-surface-hover/30 border border-border group hover:border-primary/50 hover:bg-surface transition-all text-center flex flex-col items-center justify-center gap-0.5"
               >
                 <span className="text-[10px] font-black uppercase tracking-widest text-content group-hover:text-primary transition-colors">{btn.t}</span>
                 <span className="text-[7px] font-black uppercase tracking-widest text-text-muted opacity-40 group-hover:opacity-100 transition-opacity">Launch Module</span>
               </Link>
             ))}
          </div>
       </div>
    </div>
  );

  return (
    <SupportAppShell isLoading={isLoading}>
      <div className="w-full flex flex-col pt-4">
        {HeroSection}
        {ResourceCards}
        {FeaturedPrepStrip}
        {QuickAccessRow}
      </div>
      <ScrollToTop />
    </SupportAppShell>
  );
};

export default ResourcesPage;
