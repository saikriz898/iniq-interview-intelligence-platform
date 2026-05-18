import React, { useState, useEffect } from 'react';
import {
    Trash2, Edit3, ArrowRight, Activity, Rocket, Database, Clock,
    Search, Building2, Calendar, CheckCircle2, MoreVertical, ListChecks, Eye
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
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const tabs = ['All', 'Approved', 'Pending', 'Rejected', 'Drafts'];

    useEffect(() => {
        const fetchSubmissions = async () => {
            setLoading(true);
            const token = localStorage.getItem('iniq_token');
            try {
                const res = await fetch('http://localhost:5000/api/experiences/user-dashboard', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();

                if (data.experiences) {
                    const mapped = data.experiences.map(exp => ({
                        id: exp._id,
                        company: exp.companyName || exp.company || '',
                        role: exp.role || '',
                        status: exp.status === 'Pending Review' ? 'Pending' : exp.status,
                        date: new Date(exp.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                        color: exp.status === 'Approved' ? "text-green-500" : exp.status === 'Rejected' ? "text-red-500" : "text-yellow-500",
                        bg: exp.status === 'Approved' ? "bg-green-500/10" : exp.status === 'Rejected' ? "bg-red-500/10" : "bg-yellow-500/10"
                    }));
                    setSubmissions(mapped);
                }
            } catch (error) {
                console.error('Failed to fetch experiences', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubmissions();
    }, []);

    const filteredSubmissions = submissions.filter(sub => {
        const matchesTab = activeTab === 'All' || sub.status === activeTab;
        const matchesSearch = (sub.company || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || (sub.role || '').toLowerCase().includes((searchQuery || '').toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full overflow-y-auto md:overflow-hidden flex flex-col md:flex-row bg-background relative">
                {/* BACKGROUND AMBIENCE */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

                {/* 1. OPERATIONAL SIDEBAR (Stats & Actions) */}
                <div className="w-full md:w-[320px] shrink-0 border-b md:border-b-0 md:border-r border-white/[0.03] bg-white/[0.01] backdrop-blur-3xl p-6 flex flex-col gap-6 md:gap-8 relative z-20">
                    {/* TERMINAL IDENTITY */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60">System Active</span>
                        </div>
                        <h1 className="text-2xl font-black text-content tracking-tighter leading-none font-['Sora']">
                            SUBMISSION <span className="text-primary/80 italic">HUB</span>
                        </h1>
                        <p className="text-[10px] font-bold text-content/30 uppercase tracking-widest mt-1">Operational Module 4.0</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button 
                            onClick={() => navigate('/submit')}
                            className="w-full py-4 rounded-2xl bg-primary text-content text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-[0_15px_35px_rgba(var(--primary-rgb),0.3)] hover:-translate-y-1 active:scale-95 transition-all group overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                            <span className="relative z-10">Initialize Sync</span>
                            <Rocket className="size-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>

                    <div className="h-px bg-white/[0.05]" />

                    {/* SYNC STATISTICS */}
                    <div className="flex flex-col gap-5">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-content/20">Operational Stats</span>
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                            {[
                                { label: 'Total Synchronized', count: submissions.length, icon: Database, color: 'text-primary' },
                                { label: 'Verified Protocols', count: submissions.filter(s => s.status === 'Approved').length, icon: CheckCircle2, color: 'text-green-500' },
                                { label: 'Pending Evaluation', count: submissions.filter(s => s.status === 'Pending').length, icon: Clock, color: 'text-yellow-500' },
                                { label: 'Active Drafts', count: submissions.filter(s => s.status === 'Drafts').length, icon: Edit3, color: 'text-accent' },
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.03] group hover:bg-white/[0.04] transition-all">
                                    <div className="flex items-center justify-between">
                                        <div className={`size-8 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                                            <stat.icon className="size-3.5" />
                                        </div>
                                        <span className="text-sm font-black text-content tracking-tighter">{stat.count}</span>
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-[0.15em] text-content/40 leading-none truncate">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SYSTEM STATUS */}
                    <div className="md:mt-auto pt-6 border-t border-white/[0.03] flex items-center gap-3">
                        <div className="size-10 rounded-full border border-white/[0.05] bg-white/[0.02] flex items-center justify-center p-1.5">
                            <Activity className="size-full text-primary/40 animate-pulse" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-content/60 uppercase tracking-widest">Network Link</span>
                            <span className="text-[8px] font-bold text-green-500/60 uppercase tracking-[0.2em]">Synchronized</span>
                        </div>
                    </div>
                </div>

                {/* 2. PRIMARY VIEWPORT (Table & Search) */}
                <div className="flex-1 flex flex-col min-w-0 relative z-10">
                    {/* VIEWPORT HEADER */}
                    <div className="p-6 md:px-8 border-b border-white/[0.03] flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-black/20 backdrop-blur-xl">
                        <div className="flex-1 relative group max-w-md w-full">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 size-8 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-content/20 group-focus-within:text-primary transition-all">
                                <Search className="size-3.5" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="SEARCH SECTOR DATA..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full py-3.5 pl-14 pr-6 rounded-2xl bg-transparent border border-white/[0.03] outline-none text-[10px] font-black tracking-[0.2em] text-content placeholder:text-content/10 group-focus-within:border-primary/20 transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-1 bg-white/[0.02] p-1 rounded-2xl border border-white/[0.05] overflow-x-auto max-w-full no-scrollbar flex-nowrap shrink-0">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 sm:px-5 py-2.5 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] transition-all shrink-0 ${
                                        activeTab === tab 
                                            ? 'bg-white/[0.05] text-primary shadow-xl border border-white/[0.05]' 
                                            : 'text-content/30 hover:text-content/60'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* MAIN DATA MODULE */}
                    <div className="flex-1 md:overflow-hidden relative">
                        <div className="h-auto md:h-full md:overflow-y-auto custom-scrollbar px-6 md:px-8 pb-8">
                            
                            {/* DESKTOP/TABLET TABLE VIEW */}
                            <table className="w-full text-left border-separate border-spacing-y-3 hidden md:table">
                                <thead className="sticky top-0 z-20">
                                    <tr>
                                        <th className="bg-black/60 backdrop-blur-md px-6 py-4 text-[9px] font-black uppercase tracking-[0.3em] text-content/20 first:rounded-l-2xl">Journey Protocol</th>
                                        <th className="bg-black/60 backdrop-blur-md px-6 py-4 text-[9px] font-black uppercase tracking-[0.3em] text-content/20">System Status</th>
                                        <th className="bg-black/60 backdrop-blur-md px-6 py-4 text-[9px] font-black uppercase tracking-[0.3em] text-content/20 text-center">Sync Date</th>
                                        <th className="bg-black/60 backdrop-blur-md px-6 py-4 text-[9px] font-black uppercase tracking-[0.3em] text-content/20 text-right last:rounded-r-2xl">Action Hub</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence mode="popLayout">
                                        {loading ? (
                                            Array.from({ length: 5 }).map((_, i) => (
                                                <tr key={`skeleton-${i}`} className="animate-pulse">
                                                    <td colSpan="4">
                                                        <div className="h-16 bg-white/[0.02] border border-white/[0.03] rounded-2xl" />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : filteredSubmissions.length > 0 ? (
                                            filteredSubmissions.map((sub, i) => (
                                                <motion.tr 
                                                    key={sub.id}
                                                    layout
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ delay: i * 0.03 }}
                                                    className="group"
                                                >
                                                    <td className="bg-white/[0.02] border-y border-l border-white/[0.03] rounded-l-2xl px-6 py-4 group-hover:bg-white/[0.04] transition-all">
                                                        <div className="flex items-center gap-4">
                                                            <div className="size-11 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center p-2.5 group-hover:border-primary/20 transition-all overflow-hidden relative">
                                                                <div className={`absolute inset-0 opacity-[0.05] ${sub.bg}`} />
                                                                <Building2 className="size-full text-content/20 group-hover:text-primary transition-colors relative z-10" />
                                                            </div>
                                                            <div className="flex flex-col min-w-0">
                                                                <span className="text-[14px] font-black text-content tracking-tight group-hover:text-primary transition-colors block truncate max-w-[200px] uppercase italic">{sub.company}</span>
                                                                <span className="text-[8px] font-black text-content/20 uppercase tracking-[0.2em]">{sub.role}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="bg-white/[0.02] border-y border-white/[0.03] px-6 py-4 group-hover:bg-white/[0.04] transition-all">
                                                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${sub.bg} text-[8px] font-black uppercase tracking-widest ${sub.color} border border-current/10 bg-opacity-5`}>
                                                            <div className={`size-1 rounded-full ${statDotColor(sub.status)} animate-pulse`} />
                                                            {sub.status}
                                                        </div>
                                                    </td>
                                                    <td className="bg-white/[0.02] border-y border-white/[0.03] px-6 py-4 group-hover:bg-white/[0.04] transition-all text-center">
                                                        <span className="text-[9px] font-black text-content/30 uppercase tracking-widest">{sub.date}</span>
                                                    </td>
                                                    <td className="bg-white/[0.02] border-y border-r border-white/[0.03] rounded-r-2xl px-6 py-4 group-hover:bg-white/[0.04] transition-all text-right">
                                                        <div className="flex items-center justify-end gap-2 relative">
                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setOpenMenuId(openMenuId === sub.id ? null : sub.id);
                                                                }}
                                                                className={`size-9 rounded-xl border flex items-center justify-center transition-all ${openMenuId === sub.id
                                                                        ? 'bg-primary border-primary text-content shadow-lg'
                                                                        : 'bg-white/[0.03] border-white/[0.05] text-content/20 hover:text-primary hover:border-primary/20'
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
                                                                            onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); }}
                                                                            className="fixed inset-0 z-[120]"
                                                                        />
                                                                        <motion.div
                                                                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                                                            className="absolute right-0 top-full mt-2 w-52 bg-[#0d0d0f] border border-white/[0.05] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[130] overflow-hidden p-2 backdrop-blur-2xl"
                                                                        >
                                                                            <button
                                                                                onClick={() => navigate(`/my-submissions/${sub.id}`)}
                                                                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-content/40 hover:text-primary hover:bg-primary/5 transition-all"
                                                                            >
                                                                                {sub.status === 'Drafts' ? <Edit3 className="size-4" /> : <Eye className="size-4" />}
                                                                                {sub.status === 'Drafts' ? 'Resume Protocol' : 'View Protocol'}
                                                                            </button>
                                                                            <button
                                                                                onClick={() => navigate(`/my-submissions/${sub.id}/edit`)}
                                                                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-content/40 hover:text-primary hover:bg-primary/5 transition-all"
                                                                            >
                                                                                <Edit3 className="size-4" />
                                                                                Modify Protocol
                                                                            </button>
                                                                            <div className="h-px bg-white/[0.05] my-1 mx-2" />
                                                                            <button
                                                                                onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); }}
                                                                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all"
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
                                                <td colSpan="4" className="py-32">
                                                    <div className="flex flex-col items-center justify-center gap-6 text-center">
                                                        <div className="relative">
                                                            <div className="size-24 rounded-full bg-white/[0.02] border border-dashed border-white/[0.05] flex items-center justify-center">
                                                                <ListChecks className="size-10 text-content/10" />
                                                            </div>
                                                            <div className="absolute inset-0 rounded-full border border-primary/10 animate-ping opacity-20" />
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <h3 className="text-xl font-black text-content tracking-tighter uppercase italic opacity-60">No Data Synchronized</h3>
                                                            <p className="text-[9px] font-black text-content/20 uppercase tracking-[0.3em] max-w-[300px] leading-loose">
                                                                Targeted scanning returned null results.
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => navigate('/submit')}
                                                            className="mt-2 px-8 py-3 rounded-xl bg-primary/5 border border-primary/20 text-[9px] font-black uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-white transition-all shadow-2xl active:scale-95"
                                                        >
                                                            Initialize Re-Sync
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </AnimatePresence>
                                </tbody>
                            </table>

                            {/* MOBILE CARDS VIEW */}
                            <div className="flex flex-col gap-4 md:hidden">
                                <AnimatePresence mode="popLayout">
                                    {loading ? (
                                        Array.from({ length: 3 }).map((_, i) => (
                                            <div key={`skeleton-card-${i}`} className="p-5 bg-white/[0.02] border border-white/[0.03] rounded-2xl animate-pulse flex flex-col gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-11 rounded-xl bg-white/[0.03]" />
                                                    <div className="flex-1 flex flex-col gap-2">
                                                        <div className="h-4 bg-white/[0.03] rounded w-1/3" />
                                                        <div className="h-3 bg-white/[0.03] rounded w-1/4" />
                                                    </div>
                                                </div>
                                                <div className="h-6 bg-white/[0.03] rounded w-1/2" />
                                            </div>
                                        ))
                                    ) : filteredSubmissions.length > 0 ? (
                                        filteredSubmissions.map((sub, i) => (
                                            <motion.div 
                                                key={`mobile-${sub.id}`}
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ delay: i * 0.03 }}
                                                className="p-5 bg-white/[0.02] border border-white/[0.03] rounded-2xl hover:bg-white/[0.04] transition-all flex flex-col gap-4 relative group"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-11 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center p-2.5 group-hover:border-primary/20 transition-all overflow-hidden relative">
                                                            <div className={`absolute inset-0 opacity-[0.05] ${sub.bg}`} />
                                                            <Building2 className="size-full text-content/20 group-hover:text-primary transition-colors relative z-10" />
                                                        </div>
                                                        <div className="flex flex-col min-w-0">
                                                            <span className="text-[14px] font-black text-content tracking-tight group-hover:text-primary transition-colors block truncate max-w-[160px] uppercase italic">{sub.company}</span>
                                                            <span className="text-[8px] font-black text-content/20 uppercase tracking-[0.2em]">{sub.role}</span>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* ACTION HUB MENU */}
                                                    <div className="relative">
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setOpenMenuId(openMenuId === sub.id ? null : sub.id);
                                                            }}
                                                            className={`size-9 rounded-xl border flex items-center justify-center transition-all ${openMenuId === sub.id
                                                                    ? 'bg-primary border-primary text-content shadow-lg'
                                                                    : 'bg-white/[0.03] border-white/[0.05] text-content/20 hover:text-primary hover:border-primary/20'
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
                                                                        onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); }}
                                                                        className="fixed inset-0 z-[120]"
                                                                    />
                                                                    <motion.div
                                                                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                                                        className="absolute right-0 top-full mt-2 w-52 bg-[#0d0d0f] border border-white/[0.05] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[130] overflow-hidden p-2 backdrop-blur-2xl"
                                                                    >
                                                                        <button
                                                                            onClick={() => navigate(`/my-submissions/${sub.id}`)}
                                                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-content/40 hover:text-primary hover:bg-primary/5 transition-all"
                                                                        >
                                                                            {sub.status === 'Drafts' ? <Edit3 className="size-4" /> : <Eye className="size-4" />}
                                                                            {sub.status === 'Drafts' ? 'Resume Protocol' : 'View Protocol'}
                                                                        </button>
                                                                        <button
                                                                            onClick={() => navigate(`/my-submissions/${sub.id}/edit`)}
                                                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-content/40 hover:text-primary hover:bg-primary/5 transition-all"
                                                                        >
                                                                            <Edit3 className="size-4" />
                                                                            Modify Protocol
                                                                        </button>
                                                                        <div className="h-px bg-white/[0.05] my-1 mx-2" />
                                                                        <button
                                                                            onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); }}
                                                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all"
                                                                        >
                                                                            <Trash2 className="size-4" />
                                                                            Decommission
                                                                        </button>
                                                                    </motion.div>
                                                                </>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center justify-between pt-3 border-t border-white/[0.03]">
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${sub.bg} text-[8px] font-black uppercase tracking-widest ${sub.color} border border-current/10 bg-opacity-5`}>
                                                        <div className={`size-1 rounded-full ${statDotColor(sub.status)} animate-pulse`} />
                                                        {sub.status}
                                                    </div>
                                                    <span className="text-[9px] font-black text-content/30 uppercase tracking-widest">{sub.date}</span>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="py-20 flex flex-col items-center justify-center gap-6 text-center">
                                            <div className="relative">
                                                <div className="size-20 rounded-full bg-white/[0.02] border border-dashed border-white/[0.05] flex items-center justify-center">
                                                    <ListChecks className="size-8 text-content/10" />
                                                </div>
                                                <div className="absolute inset-0 rounded-full border border-primary/10 animate-ping opacity-20" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <h3 className="text-lg font-black text-content tracking-tighter uppercase italic opacity-60">No Data Synchronized</h3>
                                                <p className="text-[9px] font-black text-content/20 uppercase tracking-[0.3em] max-w-[240px] leading-loose">
                                                    Targeted scanning returned null results.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => navigate('/submit')}
                                                className="mt-2 px-8 py-3 rounded-xl bg-primary/5 border border-primary/20 text-[9px] font-black uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-white transition-all shadow-2xl active:scale-95"
                                            >
                                                Initialize Re-Sync
                                            </button>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>

                        </div>
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

export default MySubmissionsPage;
