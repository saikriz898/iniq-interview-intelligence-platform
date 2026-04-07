import React, { useState } from 'react';
import { 
  Search, ListChecks, CheckCircle2, Clock, XCircle, 
  ArrowUpRight, Building2, Calendar, Filter, MoreVertical, 
  Trash2, Edit3, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { Link, useNavigate } from 'react-router-dom';

/**
 * --- MY SUBMISSIONS PAGE ---
 * Features: High-fidelity status tracking, tab-based filtering, 
 * search integration, and action hub for each submission.
 */
const MySubmissionsPage = () => {
  const { theme, toggleTheme, isLoading, setIsLoading } = useGlobalContext();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();

  const tabs = ['All', 'Approved', 'Pending', 'Rejected', 'Drafts'];

  const submissions = [
    { id: 1, company: 'Google', role: 'SDE Intern', status: 'Pending', date: 'Mar 28, 2026', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { id: 2, company: 'Amazon', role: 'Frontend Developer', status: 'Approved', date: 'Mar 20, 2026', color: 'text-green-500', bg: 'bg-green-500/10' },
    { id: 3, company: 'Zoho', role: 'Backend Intern', status: 'Rejected', date: 'Mar 14, 2026', color: 'text-red-500', bg: 'bg-red-500/10' },
    { id: 4, company: 'Microsoft', role: 'SDE-II', status: 'Drafts', date: 'Apr 02, 2026', color: 'text-accent', bg: 'bg-accent/10' },
  ];

  const filteredSubmissions = submissions.filter(sub => {
    const matchesTab = activeTab === 'All' || sub.status === activeTab;
    const matchesSearch = sub.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         sub.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
      <div className="h-full flex flex-col overflow-hidden p-6 md:p-10 gap-8">
        
        {/* 1. PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
            <div className="flex flex-col gap-1.5">
                <h1 className="text-3xl font-black text-content font-['Sora'] tracking-tight">
                    My Submissions
                </h1>
                <p className="text-sm font-medium text-text-muted opacity-70">
                    Track the lifecycle of your interview experiences and manage drafts.
                </p>
            </div>
            <button 
                onClick={() => navigate('/submit')}
                className="px-6 py-3 rounded-xl bg-primary text-white text-[11px] font-black uppercase tracking-widest flex items-center gap-2.5 shadow-xl shadow-primary/20 hover:-translate-y-0.5 active:scale-95 transition-all w-fit"
            >
                Submit New Experience
                <ArrowRight className="size-4" />
            </button>
        </div>

        {/* 2. SEARCH & FILTER HUB */}
        <div className="flex items-center gap-4 shrink-0">
            {/* Search Hub */}
            <div className="flex-1 relative group bg-surface border border-border/60 p-1.5 rounded-2xl shadow-sm transition-all focus-within:border-primary/40 focus-within:shadow-xl focus-within:shadow-primary/5">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-all" />
                <input 
                    type="text" 
                    placeholder="Search intelligence modules..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-3.5 pl-12 pr-6 rounded-xl bg-transparent outline-none text-xs font-bold text-content placeholder:text-text-muted/30"
                />
            </div>

            {/* Filter Toggle */}
            <div className="relative">
                <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all ${
                        showFilters || activeTab !== 'All'
                        ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20'
                        : 'bg-surface border-border/60 text-text-muted hover:border-primary/40 hover:text-primary'
                    }`}
                >
                    <Filter className="size-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">
                        {activeTab === 'All' ? 'Filter Protocols' : activeTab}
                    </span>
                    {activeTab !== 'All' && (
                        <div className="size-2 rounded-full bg-white animate-pulse" />
                    )}
                </button>

                <AnimatePresence>
                    {showFilters && (
                        <>
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowFilters(false)}
                                className="fixed inset-0 z-[100] bg-black/5 backdrop-blur-[2px]"
                            />
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className="absolute right-0 top-full mt-4 w-72 bg-surface border border-border/60 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] z-[110] overflow-hidden p-6"
                            >
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Status Protocol</h4>
                                        <p className="text-[9px] font-bold text-text-muted opacity-60">Filter by submission lifecycle</p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-2">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => {
                                                    setActiveTab(tab);
                                                    setShowFilters(false);
                                                }}
                                                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                                                    activeTab === tab 
                                                        ? 'bg-primary/10 text-primary border border-primary/20' 
                                                        : 'text-text-muted hover:bg-surface-hover hover:text-content border border-transparent'
                                                }`}
                                            >
                                                <span className="text-[10px] font-black uppercase tracking-widest">{tab}</span>
                                                {activeTab === tab && <CheckCircle2 className="size-4" />}
                                            </button>
                                        ))}
                                    </div>

                                    <button 
                                        onClick={() => {
                                            setActiveTab('All');
                                            setSearchQuery('');
                                            setShowFilters(false);
                                        }}
                                        className="w-full py-3 rounded-xl bg-surface-hover text-[9px] font-black uppercase tracking-widest text-text-muted hover:text-content opacity-60 hover:opacity-100 transition-all"
                                    >
                                        Reset All Filters
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>

        {/* 3. SUBMISSIONS HUB (Scrollable Table) */}
        <div className="flex-1 bg-surface border border-border/60 rounded-[2.5rem] shadow-sm flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto custom-scrollbar relative min-h-0 px-1">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 z-10 bg-surface/80 backdrop-blur-md border-b border-border/40">
                        <tr>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60">Journey Module</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60">Lifecyle Status</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60 text-center">Submitted At</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60 text-right">Action Hub</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                        <AnimatePresence mode="popLayout">
                            {filteredSubmissions.length > 0 ? (
                                filteredSubmissions.map((sub, i) => (
                                    <motion.tr 
                                        key={sub.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-surface-hover/40 transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="size-11 rounded-2xl bg-surface-hover border border-border/60 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                                                    <Building2 className="size-5 text-text-muted group-hover:text-primary transition-colors" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm md:text-base font-black text-content tracking-tight">{sub.company}</span>
                                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-60">{sub.role}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${sub.bg} text-[9px] font-black uppercase tracking-widest ${sub.color}`}>
                                                <div className={`size-1.5 rounded-full ${statDotColor(sub.status)}`} />
                                                {sub.status === 'Drafts' ? 'Draft' : sub.status}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[11px] font-bold text-text-muted/70 flex items-center justify-center gap-2">
                                                <Calendar className="size-3.5" />
                                                {sub.date}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 relative">
                                                <button 
                                                    onClick={() => setOpenMenuId(openMenuId === sub.id ? null : sub.id)}
                                                    className={`p-2.5 rounded-xl border transition-all ${
                                                        openMenuId === sub.id 
                                                        ? 'bg-primary border-primary text-white shadow-lg'
                                                        : 'bg-surface-hover border-border text-text-muted hover:text-primary hover:border-primary/40'
                                                    }`}
                                                >
                                                    <MoreVertical className="size-4" />
                                                </button>

                                                <AnimatePresence>
                                                    {openMenuId === sub.id && (
                                                        <>
                                                            <motion.div 
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                onClick={() => setOpenMenuId(null)}
                                                                className="fixed inset-0 z-[120]"
                                                            />
                                                            <motion.div 
                                                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                                                className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border/60 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-[130] overflow-hidden p-2"
                                                            >
                                                                <button 
                                                                    onClick={() => {
                                                                        navigate(`/my-submissions/${sub.id}`);
                                                                        setOpenMenuId(null);
                                                                    }}
                                                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-primary hover:bg-surface-hover transition-all"
                                                                >
                                                                    {sub.status === 'Drafts' ? <Edit3 className="size-4" /> : <Eye className="size-4" />}
                                                                    {sub.status === 'Drafts' ? 'Resume Protocol' : 'View Protocol'}
                                                                </button>
                                                                
                                                                <button 
                                                                    onClick={() => {
                                                                        navigate(`/my-submissions/${sub.id}/edit`);
                                                                        setOpenMenuId(null);
                                                                    }}
                                                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-primary hover:bg-surface-hover transition-all"
                                                                >
                                                                    <Edit3 className="size-4" />
                                                                    Modify Protocol
                                                                </button>

                                                                <button 
                                                                    onClick={() => setOpenMenuId(null)}
                                                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-red-500 hover:bg-red-500/5 transition-all"
                                                                >
                                                                    <Trash2 className="size-4" />
                                                                    Decommission
                                                                </button>
                                                            </motion.div>
                                                        </>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20">
                                        <div className="flex flex-col items-center justify-center gap-6 text-center">
                                            <div className="size-20 rounded-[2.5rem] bg-surface-hover border border-dashed border-border flex items-center justify-center">
                                                <ListChecks className="size-10 text-text-muted opacity-30" />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <h3 className="text-xl font-black text-content tracking-tight">No journey modules found</h3>
                                                <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest max-w-[280px]">
                                                    Try adjusting your search criteria or filters to see results.
                                                </p>
                                            </div>
                                            <button 
                                                onClick={() => { setActiveTab('All'); setSearchQuery(''); }}
                                                className="px-6 py-2.5 rounded-xl bg-surface-hover border border-border text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                                            >
                                                Reset Filters
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>

      </div>
    </UserAppShell>
  );
};

// UI UTILS
const statDotColor = (status) => {
    switch (status) {
        case 'Approved': return 'bg-green-500';
        case 'Pending': return 'bg-yellow-500';
        case 'Rejected': return 'bg-red-500';
        case 'Drafts': return 'bg-accent';
        default: return 'bg-gray-400';
    }
};

const Eye = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

export default MySubmissionsPage;
