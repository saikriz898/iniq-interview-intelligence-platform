import React, { useEffect, useState } from 'react';
import { Hash, Search, ArrowLeft, ChevronRight, Zap, Code2, Database, Network } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SupportAppShell from '../../../layouts/SupportAppShell';
import { useGlobalContext } from '../../../context/GlobalContext';
import ScrollToTop from '../../../components/common/ScrollToTop';

const TopicsPage = () => {
  const { setIsLoading, isLoading } = useGlobalContext();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // Mock Data - Emptied for real integration
  const topics = [];

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
                <Hash className="size-7 text-indigo-500" />
             </div>
             <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-content uppercase">Topics</h1>
             <p className="text-base text-text-muted font-medium max-w-lg opacity-60">
                Review the main technology areas asked in interviews and find interview experiences that highlight specific technical stacks.
             </p>
          </div>
          <div className="relative group w-full md:w-96">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-colors" />
             <input 
              type="text" 
              placeholder="Search topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-hover/30 border border-border rounded-xl py-4 pl-12 pr-6 text-sm font-bold text-content outline-none focus:border-primary/50 transition-all"
             />
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {topics.length > 0 ? topics.map((topic, i) => (
             <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-10 rounded-[3rem] bg-surface border border-border/80 hover:border-primary/40 hover:shadow-2xl transition-all group flex flex-col items-start cursor-pointer h-full"
             >
                <div className={`size-12 rounded-xl bg-${topic.color}-500/10 border border-${topic.color}-500/20 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform`}>
                   <topic.icon className={`size-6 text-${topic.color}-500`} />
                </div>
                <h3 className="text-2xl font-black text-content uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">{topic.title}</h3>
                <p className="text-sm font-medium text-text-muted leading-relaxed italic opacity-60 mb-10 h-12 line-clamp-2">{topic.desc}</p>
                
                <div className="mt-auto w-full flex items-center justify-between pt-6 border-t border-border/40">
                   <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{topic.count} Experiences</span>
                   <Link to="/experiences" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:gap-3 transition-all">
                      Browse <ArrowLeft className="size-3 rotate-180" />
                   </Link>
                </div>
             </motion.div>
           )) : (
             <div className="col-span-full py-32 flex flex-col items-center text-center gap-6 border border-dashed border-border/80 rounded-[3rem] bg-surface-hover/10">
                <div className="size-20 rounded-full bg-surface-hover flex items-center justify-center border border-border shadow-inner">
                    <Hash className="size-8 text-text-muted/20" />
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-black text-content uppercase tracking-tight">No topics found</h3>
                    <p className="text-text-muted font-bold text-[10px] uppercase tracking-widest opacity-60">We're updating our technical roadmap. Please check back soon.</p>
                </div>
             </div>
           )}
        </div>

        {/* Info Strip */}
        <div className="mt-24 p-10 md:p-14 rounded-[3rem] bg-[#0A1A1E] border border-border/40 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
           <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
              <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-2 text-emerald-500">
                    <Zap className="size-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Topic Intelligence</span>
                 </div>
                 <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase leading-tight">Master the technical areas <br /> that matter most.</h2>
                 <p className="text-sm text-text-muted font-medium max-w-md opacity-60">
                    We've categorized thousands of questions across interview topics. Filter your search by DSA, HLD and LLD to learn exactly what companies are asking.
                 </p>
              </div>
              <Link to="/experiences" className="px-10 py-5 bg-emerald-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all">
                 Explore All Topics
              </Link>
           </div>
        </div>
      </div>
      <ScrollToTop />
    </SupportAppShell>
  );
};

export default TopicsPage;
