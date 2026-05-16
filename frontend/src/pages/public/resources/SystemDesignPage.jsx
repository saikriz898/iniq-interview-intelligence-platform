import React, { useEffect, useState } from 'react';
import { Layout, Search, ArrowLeft, ChevronRight, Zap, Database, Globe, Network } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SupportAppShell from '../../../layouts/SupportAppShell';
import { useGlobalContext } from '../../../context/GlobalContext';
import ScrollToTop from '../../../components/common/ScrollToTop';

const SystemDesignPage = () => {
  const { setIsLoading, isLoading } = useGlobalContext();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // Mock Data - Emptied for real integration
  const items = [];

  return (
    <SupportAppShell isLoading={isLoading}>
      <div className="max-w-[1200px] mx-auto w-full px-5 py-12">
        {/* Back Link */}
        <Link to="/resources" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary mb-12 hover:-translate-x-1 transition-transform">
          <ArrowLeft className="size-3" /> Back to Resources
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col gap-4">
             <div className="size-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Layout className="size-7 text-indigo-500" />
             </div>
             <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-content uppercase">System Design</h1>
             <p className="text-base text-text-muted font-medium max-w-lg opacity-60">
                Read practical concepts and patterns useful for design discussions in both HLD and LLD rounds for senior engineering roles.
             </p>
          </div>
          <div className="relative group w-full md:w-96">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-colors" />
             <input 
              type="text" 
              placeholder="Search concepts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-hover/30 border border-border rounded-xl py-4 pl-12 pr-6 text-sm font-bold text-content outline-none focus:border-primary/50 transition-all"
             />
          </div>
        </div>

        {/* System Design Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
           {items.length > 0 ? items.map((item, i) => (
             <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-10 rounded-[3rem] bg-surface-hover/10 border border-border/80 hover:border-primary/40 hover:bg-surface hover:shadow-2xl transition-all group flex flex-col items-start cursor-pointer"
             >
                <div className={`size-12 rounded-xl bg-${item.color}-500/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-inner`}>
                   <item.icon className={`size-6 text-${item.color}-500`} />
                </div>
                <h3 className="text-2xl font-black text-content uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm font-medium text-text-muted leading-relaxed opacity-60 mb-12 h-12 line-clamp-2 italic">{item.desc}</p>
                <Link to="/resources/topics" className="mt-auto px-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                   Review Topic <ArrowLeft className="size-3 rotate-180" />
                </Link>
             </motion.div>
           )) : (
             <div className="col-span-full py-32 flex flex-col items-center text-center gap-6 border border-dashed border-border/80 rounded-[3rem] bg-surface-hover/10">
                <div className="size-20 rounded-full bg-surface-hover flex items-center justify-center border border-border shadow-inner">
                    <Layout className="size-8 text-text-muted/20" />
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-black text-content uppercase tracking-tight">No design concepts found</h3>
                    <p className="text-text-muted font-bold text-[10px] uppercase tracking-widest opacity-60">Architectural modules are in the final review. Please wait.</p>
                </div>
             </div>
           )}
        </div>

        {/* Info Strip */}
        <div className="mt-24 p-10 md:p-14 rounded-[3rem] bg-[#0E0A1E] border border-border/40 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
           <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
              <div className="flex flex-col gap-3 text-center md:text-left">
                 <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-500">
                    <Zap className="size-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Design Intelligence</span>
                 </div>
                 <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase leading-tight">Master large-scale system <br /> architectural discussions.</h2>
                 <p className="text-sm text-text-muted font-medium max-w-md opacity-60">
                    Designing Uber or Dropbox doesn't have one right answer. We provide the architectural building blocks common across most real-world interview questions.
                 </p>
              </div>
              <Link to="/how-it-works" className="px-10 py-5 bg-indigo-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all text-center">
                 Prepare for Design Round
              </Link>
           </div>
        </div>
      </div>
      <ScrollToTop />
    </SupportAppShell>
  );
};

export default SystemDesignPage;
