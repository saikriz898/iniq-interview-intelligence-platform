import React, { useEffect, useState } from 'react';
import { Building2, Search, ArrowLeft, ChevronRight, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SupportAppShell from '../../../layouts/SupportAppShell';
import { useGlobalContext } from '../../../context/GlobalContext';
import ScrollToTop from '../../../components/common/ScrollToTop';

const CompaniesPage = () => {
  const { setIsLoading, isLoading } = useGlobalContext();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // Mock Data - Emptied for real integration
  const companies = [];

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
             <div className="size-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Building2 className="size-7 text-blue-500" />
             </div>
             <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-content uppercase">Companies</h1>
             <p className="text-base text-text-muted font-medium max-w-lg opacity-60">
                Browse interview experiences by company and track the most common hiring patterns across the industry.
             </p>
          </div>
          <div className="relative group w-full md:w-96">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-colors" />
             <input 
              type="text" 
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-hover/30 border border-border rounded-xl py-4 pl-12 pr-6 text-sm font-bold text-content outline-none focus:border-primary/50 transition-all"
             />
          </div>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {companies.map((company, i) => (
             <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-8 rounded-[2.5rem] bg-surface border border-border/80 hover:border-primary/40 hover:shadow-xl transition-all group flex flex-col items-center text-center cursor-pointer"
             >
                <div className="size-16 rounded-2xl bg-background border border-border p-3 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                   <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg font-black text-content mb-1 uppercase tracking-tight">{company.name}</h3>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-40 mb-6">{company.count} Experiences</span>
                
                <Link to="/experiences" className="w-full py-3 rounded-xl bg-surface-hover border border-border text-[9px] font-black uppercase tracking-widest text-content group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all">
                   View Portfolio
                </Link>
             </motion.div>
           ))}
        </div>

        {/* Info Strip */}
        <div className="mt-24 p-10 md:p-14 rounded-[3rem] bg-[#0A0F1E] border border-border/40 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none" />
           <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
              <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-2 text-blue-500">
                    <Zap className="size-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Company Insights</span>
                 </div>
                 <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter">Your target company not listed?</h2>
                 <p className="text-sm text-text-muted font-medium max-w-md opacity-60">
                    We are constantly expanding our database. Submit an experience or reach out to help us list new organizations.
                 </p>
              </div>
              <Link to="/contact" className="px-10 py-5 bg-blue-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all">
                 Request Company
              </Link>
           </div>
        </div>
      </div>
      <ScrollToTop />
    </SupportAppShell>
  );
};

export default CompaniesPage;
