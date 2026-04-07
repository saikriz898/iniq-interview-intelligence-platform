import React, { useEffect } from 'react';
import { Layers, ArrowLeft, ChevronRight, Zap, Trophy, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SupportAppShell from '../../../layouts/SupportAppShell';
import { useGlobalContext } from '../../../context/GlobalContext';
import ScrollToTop from '../../../components/common/ScrollToTop';

const InterviewRoundsPage = () => {
  const { setIsLoading, isLoading } = useGlobalContext();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // Mock Data - Emptied for real integration
  const rounds = [];

  return (
    <SupportAppShell isLoading={isLoading}>
      <div className="max-w-[1200px] mx-auto w-full px-5 py-12">
        {/* Back Link */}
        <Link to="/resources" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary mb-12 hover:-translate-x-1 transition-transform">
          <ArrowLeft className="size-3" /> Back to Resources
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-4 mb-16">
           <div className="size-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Layers className="size-7 text-amber-500" />
           </div>
           <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-content uppercase">Interview Rounds</h1>
           <p className="text-base text-text-muted font-medium max-w-xl opacity-60">
              Understand coding, machine coding, design, and HR round structures to master the specific mechanics of each interview phase.
           </p>
        </div>

        {/* Rounds Timeline / Grid */}
        <div className="flex flex-col gap-6">
           {rounds.length > 0 ? rounds.map((round, i) => (
             <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[3rem] bg-surface border border-border/80 hover:border-primary/40 hover:shadow-xl transition-all group flex flex-col md:flex-row items-center gap-10 cursor-pointer"
             >
                <div className={`size-20 rounded-3xl bg-${round.color}-500/10 border border-${round.color}-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner`}>
                   <round.icon className={`size-10 text-${round.color}-500 opacity-60`} />
                </div>
                <div className="flex flex-col gap-2 flex-1 text-center md:text-left">
                   <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-text-muted/40">PHASE {i + 1}</span>
                      <h3 className="text-2xl font-black text-content uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">{round.title}</h3>
                   </div>
                   <p className="text-base font-medium text-text-muted italic opacity-60 leading-relaxed max-w-2xl">{round.desc}</p>
                </div>
                <Link to="/how-it-works" className="px-8 py-4 bg-surface-hover border border-border rounded-xl text-[10px] font-black uppercase tracking-widest text-content group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all">
                   Round Details
                </Link>
             </motion.div>
           )) : (
             <div className="w-full py-32 flex flex-col items-center text-center gap-6 border border-dashed border-border/80 rounded-[3rem] bg-surface-hover/10">
                <div className="size-20 rounded-full bg-surface-hover flex items-center justify-center border border-border shadow-inner">
                    <Layers className="size-8 text-text-muted/20" />
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-black text-content uppercase tracking-tight">No rounds documented</h3>
                    <p className="text-text-muted font-bold text-[10px] uppercase tracking-widest opacity-60">We're building our round-specific intelligence. Join us soon.</p>
                </div>
             </div>
           )}
        </div>

        {/* Info Strip */}
        <div className="mt-24 p-10 md:p-14 rounded-[4rem] bg-[#1A1A0A] border border-border/40 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
           <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
              <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-2 text-amber-500">
                    <Zap className="size-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Flow Intelligence</span>
                 </div>
                 <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase leading-tight">Master the sequence <br /> of your target company's flow.</h2>
                 <p className="text-sm text-text-muted font-medium max-w-md opacity-60">
                    We break down interview flows phase-by-phase. Know exactly which round is coming next and how to optimize your time for it.
                 </p>
              </div>
              <Link to="/how-it-works" className="px-10 py-5 bg-amber-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all">
                 Learn the Flow
              </Link>
           </div>
        </div>
      </div>
      <ScrollToTop />
    </SupportAppShell>
  );
};

export default InterviewRoundsPage;
