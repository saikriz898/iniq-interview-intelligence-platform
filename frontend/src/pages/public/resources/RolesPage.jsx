import React, { useEffect, useState } from 'react';
import { UserCircle, Search, ArrowLeft, ChevronRight, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SupportAppShell from '../../../layouts/SupportAppShell';
import { useGlobalContext } from '../../../context/GlobalContext';
import ScrollToTop from '../../../components/common/ScrollToTop';

const RolesPage = () => {
  const { setIsLoading, isLoading } = useGlobalContext();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // Mock Data - Emptied for real integration
  const roles = [];

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
             <div className="size-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <UserCircle className="size-7 text-purple-500" />
             </div>
             <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-content uppercase">Roles</h1>
             <p className="text-base text-text-muted font-medium max-w-lg opacity-60">
                Explore interview journeys based on role and hiring expectations to narrow your focus and target specific career paths.
             </p>
          </div>
          <div className="relative group w-full md:w-96">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-colors" />
             <input 
              type="text" 
              placeholder="Search roles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-hover/30 border border-border rounded-xl py-4 pl-12 pr-6 text-sm font-bold text-content outline-none focus:border-primary/50 transition-all"
             />
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 pb-24">
           {roles.length > 0 ? roles.map((role, i) => (
             <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-10 rounded-[2.5rem] bg-surface border border-border/80 hover:border-primary/40 hover:shadow-xl transition-all group flex items-center justify-between cursor-pointer"
             >
                <div className="flex items-center gap-8">
                   <div className={`size-16 rounded-2xl bg-${role.color}-500/10 border border-${role.color}-500/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <role.icon className={`size-7 text-${role.color}-500`} />
                   </div>
                   <div className="flex flex-col gap-1">
                      <h3 className="text-xl font-black text-content uppercase tracking-tight leading-tight">{role.title}</h3>
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] opacity-40">{role.count} Active Experiences</span>
                   </div>
                </div>
                <Link to="/experiences" className="size-12 rounded-full bg-surface-hover border border-border flex items-center justify-center text-text-muted group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all">
                   <ChevronRight className="size-5" />
                </Link>
             </motion.div>
           )) : (
             <div className="col-span-full py-32 flex flex-col items-center text-center gap-6 border border-dashed border-border/80 rounded-[3rem] bg-surface-hover/10">
                <div className="size-20 rounded-full bg-surface-hover flex items-center justify-center border border-border shadow-inner">
                    <Target className="size-8 text-text-muted/20" />
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-black text-content uppercase tracking-tight">No roles available</h3>
                    <p className="text-text-muted font-bold text-[10px] uppercase tracking-widest opacity-60">Try searching for a different role or contribute an experience.</p>
                </div>
             </div>
           )}
        </div>

        {/* Info Strip */}
        <div className="mt-24 p-10 md:p-14 rounded-[3rem] bg-[#1E0A2E] border border-border/40 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-500/10 to-transparent pointer-events-none" />
           <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
              <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-2 text-purple-500">
                    <Zap className="size-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Role Insights</span>
                 </div>
                 <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase leading-tight">Prepare according <br /> according to your target job role.</h2>
                 <p className="text-sm text-text-muted font-medium max-w-md opacity-60">
                    Different roles have different hiring expectations. Leverage role-specific data to optimize your preparation strategy.
                 </p>
              </div>
              <Link to="/register" className="px-10 py-5 bg-purple-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all">
                 Join Community
              </Link>
           </div>
        </div>
      </div>
      <ScrollToTop />
    </SupportAppShell>
  );
};

export default RolesPage;
