import React, { useState } from 'react';
import { 
  Building2, Clock, ShieldCheck, Search, ThumbsUp, ThumbsDown, 
  MoreVertical, Filter, Briefcase, MapPin, ArrowRight, User as UserIcon,
  CheckCircle2, XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';
import { pendingSubmissionsData } from '../../data/pendingSubmissions';

/**
 * --- PENDING REVIEWS: ADMINISTRATIVE REVIEW HUB ---
 * Features: High-density, compact formal cards for efficient submission moderation.
 */
const PendingReviewsPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const pendingSubmissions = pendingSubmissionsData;

    const filteredSubmissions = pendingSubmissions.filter(s => 
        s.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col p-6 lg:p-10 overflow-y-auto custom-scrollbar bg-surface/5">
                <div className="max-w-[1500px] mx-auto w-full flex flex-col gap-8 pt-2 pb-16">
                    
                    {/* 1. FORMAL HUB HEADER (COMPACT) */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border pb-8">
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="px-2.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-widest text-primary">Moderation_Queue</span>
                                <div className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
                            </div>
                            <h1 className="text-2xl md:text-3xl font-black text-content uppercase tracking-tighter font-['Inter'] leading-none">Pending Review Nodes</h1>
                            <p className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-widest mt-1">Reviewing {filteredSubmissions.length} interview protocols.</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <div className="relative group w-full sm:w-72">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-3.5 text-text-muted opacity-40 group-focus-within:text-primary transition-all" />
                                <input 
                                    type="text" 
                                    placeholder="Search by ID or Company..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full py-3 pl-11 pr-5 rounded-xl bg-surface border border-border focus:border-primary/40 outline-none text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm"
                                />
                            </div>
                            <button className="h-[44px] px-6 rounded-xl bg-surface border border-border flex items-center gap-2.5 text-[9px] font-black uppercase tracking-widest text-text-muted hover:text-primary transition-all shadow-sm active:scale-95 group">
                                <Filter className="size-3.5" />
                                Filter
                            </button>
                        </div>
                    </div>

                    {/* 2. COMPACT STRUCTURED CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredSubmissions.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group"
                                >
                                    <div className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/20 hover:shadow-xl hover:shadow-black/[0.02] transition-all flex flex-col gap-6 h-full relative overflow-hidden bg-gradient-to-br from-surface to-surface-hover/20">
                                        
                                        {/* HEADER: Identity */}
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-xl bg-background border border-border flex items-center justify-center text-text-muted group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                                    <Building2 className="size-5" />
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-[8px] font-bold text-primary uppercase tracking-widest leading-none">Node: {item.id}</span>
                                                    <h3 className="text-base font-black text-content uppercase tracking-tight font-['Inter'] leading-none mt-1">{item.company}</h3>
                                                </div>
                                            </div>
                                            <div className="size-8 rounded-lg bg-background/50 flex items-center justify-center text-text-muted opacity-40 hover:opacity-100 transition-opacity">
                                                <MoreVertical className="size-4" />
                                            </div>
                                        </div>

                                        {/* METADATA: Role & Context */}
                                        <div className="flex flex-col gap-2 p-4 rounded-xl bg-background/30 border border-border/40">
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="size-3 text-primary opacity-40" />
                                                <span className="text-[9px] font-black text-content uppercase tracking-widest">{item.role}</span>
                                            </div>
                                            <div className="flex items-center gap-2 border-t border-border/10 pt-2">
                                                <MapPin className="size-3 text-text-muted opacity-40" />
                                                <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest leading-none">{item.location}</span>
                                            </div>
                                        </div>

                                        {/* OVERVIEW (COMPACT) */}
                                        <div className="flex-1">
                                             <p className="text-[11px] font-medium text-text-muted leading-relaxed tracking-wide line-clamp-2 italic">
                                                "{item.overview}"
                                            </p>
                                        </div>

                                        {/* CONTRIBUTOR INFO & ACTION */}
                                        <div className="flex items-center justify-between pt-4 border-t border-border/40">
                                            <div className="flex items-center gap-2.5">
                                                <div className="size-7 rounded-lg bg-surface border border-border flex items-center justify-center">
                                                    <UserIcon className="size-3.5 text-text-muted" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-content lowercase leading-none">@{item.user}</span>
                                                    <span className="text-[8px] font-bold text-text-muted opacity-40 uppercase tracking-widest mt-1.5">{item.date}</span>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => navigate(`/admin/pending/${item.id}`)}
                                                className="size-8 rounded-lg bg-surface border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm active:scale-90"
                                            >
                                                <ArrowRight className="size-4" />
                                            </button>
                                        </div>

                                        {/* ADMINISTRATIVE CONTROLS (GRID) */}
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/10 hover:translate-y-[-1px] active:scale-95 transition-all">
                                                <CheckCircle2 className="size-3.5" />
                                                Approve
                                            </button>
                                            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/10 hover:translate-y-[-1px] active:scale-95 transition-all">
                                                <XCircle className="size-3.5" />
                                                Reject
                                            </button>
                                        </div>

                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* 3. TERMINAL STATUS (OPTIMIZED) */}
                    <div className="flex flex-col items-center gap-4 opacity-20 grayscale pt-12 pb-12 justify-center">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="size-4" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.4em] italic">INIQ // Administrative_Node_Sync</span>
                        </div>
                    </div>

                </div>
            </div>
        </AdminAppShell>
    );
};

export default PendingReviewsPage;
