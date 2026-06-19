import React, { useState, useEffect } from 'react';
import {
    Trash2, Edit3, ArrowRight, Database, Clock,
    Search, Building2, Calendar, CheckCircle2, MoreVertical, List, Eye,
    Filter, LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { Link, useNavigate } from 'react-router-dom';

/**
 * --- MY SUBMISSIONS PAGE: ENTERPRISE OVERVIEW ---
 * Features: High-fidelity status tracking, tab-based filtering, 
 * search integration, and action hub for each submission.
 */
const MySubmissionsPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [openMenuId, setOpenMenuId] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
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
                        color: exp.status === 'Approved' ? "text-success" : exp.status === 'Rejected' ? "text-danger" : "text-warning",
                        bg: exp.status === 'Approved' ? "bg-success/10" : exp.status === 'Rejected' ? "bg-danger/10" : "bg-warning/10"
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
            <div className="h-full w-full flex flex-col md:flex-row bg-background/50 overflow-hidden relative pb-16 lg:pb-0">
                
                {/* 1. SIDEBAR (Filters & Stats) - Hidden on Mobile */}
                <div className="hidden md:flex w-[320px] shrink-0 border-r border-border/40 bg-surface/50 p-6 flex-col gap-8 overflow-y-auto custom-scrollbar z-20">
                    
                    {/* Header */}
                    <div className="flex flex-col gap-1.5">
                        <h1 className="text-2xl font-bold text-content tracking-tight flex items-center gap-2">
                            <List className="size-6 text-primary" />
                            My Submissions
                        </h1>
                        <p className="text-sm font-medium text-text-muted mt-1">
                            Manage your shared interview experiences and track their review status.
                        </p>
                    </div>

                    {/* Quick Action */}
                    <button 
                        onClick={() => navigate('/submit')}
                        className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/20 transition-all"
                    >
                        <Edit3 className="size-4" /> Add Submission
                    </button>

                    <div className="h-px bg-border/40" />

                    {/* Stats Overview */}
                    <div className="flex flex-col gap-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Analytics</span>
                        <div className="grid grid-cols-2 md:flex md:flex-col gap-3">
                            {[
                                { label: 'Total Experiences', count: submissions.length, icon: Database, color: 'text-primary' },
                                { label: 'Approved', count: submissions.filter(s => s.status === 'Approved').length, icon: CheckCircle2, color: 'text-success' },
                                { label: 'Pending Review', count: submissions.filter(s => s.status === 'Pending').length, icon: Clock, color: 'text-warning' },
                                { label: 'Drafts', count: submissions.filter(s => s.status === 'Drafts').length, icon: Edit3, color: 'text-accent' },
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-background border border-border/40 hover:border-border transition-all gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`size-6 sm:size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 ${stat.color}`}>
                                            <stat.icon className="size-3.5 sm:size-4" />
                                        </div>
                                        <span className="text-xs sm:text-sm font-semibold text-content line-clamp-1">{stat.label}</span>
                                    </div>
                                    <span className="text-sm font-bold text-content sm:text-right">{stat.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. MAIN DATA AREA */}
                <div className="flex-1 flex flex-col min-w-0 bg-background/30 relative z-10 h-full">
                    
                    {/* COMBINED MOBILE HEADER (Only visible on mobile) */}
                    <div className="md:hidden flex flex-col p-4 border-b border-border/40 bg-surface/50 shrink-0 gap-5">
                        
                        {/* 2x2 Analytics Grid (Moved to top) */}
                        <div className="grid grid-cols-2 gap-2.5">
                            {[
                                { label: 'Total Logs', count: submissions.length, icon: Database, color: 'text-primary' },
                                { label: 'Approved', count: submissions.filter(s => s.status === 'Approved').length, icon: CheckCircle2, color: 'text-success' },
                                { label: 'Pending', count: submissions.filter(s => s.status === 'Pending').length, icon: Clock, color: 'text-warning' },
                                { label: 'Drafts', count: submissions.filter(s => s.status === 'Drafts').length, icon: Edit3, color: 'text-accent' },
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col p-3 rounded-xl bg-background border border-border/40 shrink-0 shadow-sm">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <div className={`size-5 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0 ${stat.color}`}>
                                            <stat.icon className="size-3" />
                                        </div>
                                        <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider truncate">{stat.label}</span>
                                    </div>
                                    <span className="text-base font-black text-content">{stat.count}</span>
                                </div>
                            ))}
                        </div>

                        {/* Search, Filter, and Add (Moved below boxes) */}
                        <div className="flex items-center gap-2 w-full">
                            <div className="flex-1 relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                                    <Search className="size-4" />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Search company or role..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full py-2.5 pl-9 pr-3 rounded-xl bg-background border border-border/40 outline-none text-sm font-medium text-content placeholder:text-text-muted group-focus-within:border-primary/50 transition-all shadow-sm"
                                />
                            </div>
                            <button 
                                onClick={() => setIsFilterOpen(true)}
                                className="size-10 rounded-xl bg-background border border-border/40 flex items-center justify-center text-text-muted hover:text-primary active:scale-95 transition-all shrink-0 relative shadow-sm"
                            >
                                <Filter className="size-4" />
                                {activeTab !== 'All' && <div className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-primary" />}
                            </button>
                            <button 
                                onClick={() => navigate('/submit')}
                                className="size-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-hover active:scale-95 transition-all shrink-0 shadow-sm"
                            >
                                <Edit3 className="size-4" />
                            </button>
                        </div>
                    </div>

                    {/* Viewport Header (Search & Tabs) - Desktop Only */}
                    <div className="hidden md:flex p-6 md:px-8 border-b border-border/40 flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface/50 backdrop-blur-md shrink-0">
                        <div className="flex items-center gap-3 w-full">
                            <div className="flex-1 relative group w-full">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                                    <Search className="size-4" />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Search by company or role..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full py-3 pl-11 pr-4 rounded-xl bg-background border border-border/40 outline-none text-sm font-medium text-content placeholder:text-text-muted group-focus-within:border-primary/50 group-focus-within:ring-4 group-focus-within:ring-primary/10 transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Desktop Tabs */}
                        <div className="hidden md:flex items-center gap-2 bg-background p-1.5 rounded-xl border border-border/40 overflow-x-auto max-w-full no-scrollbar flex-nowrap shrink-0">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 sm:px-5 py-2 rounded-lg text-xs font-bold transition-all shrink-0 ${
                                        activeTab === tab 
                                            ? 'bg-surface border border-border/40 text-primary shadow-sm' 
                                            : 'text-text-muted hover:text-content hover:bg-white/5'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Filter Bottom Sheet (Mobile) */}
                    <AnimatePresence>
                        {isFilterOpen && (
                            <>
                                <motion.div 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }} 
                                    exit={{ opacity: 0 }} 
                                    onClick={() => setIsFilterOpen(false)} 
                                    className="fixed inset-0 z-[200] bg-background/80 backdrop-blur-sm md:hidden" 
                                />
                                <motion.div 
                                    initial={{ y: '100%' }} 
                                    animate={{ y: 0 }} 
                                    exit={{ y: '100%' }} 
                                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                    className="fixed bottom-0 left-0 right-0 z-[210] bg-surface border-t border-border/40 rounded-t-[2rem] p-6 flex flex-col gap-4 md:hidden shadow-[0_-20px_40px_rgba(0,0,0,0.5)]"
                                >
                                    <div className="w-12 h-1.5 bg-border/40 rounded-full mx-auto mb-2" />
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold text-content tracking-tight">Filter Status</h3>
                                        <button onClick={() => { setActiveTab('All'); setIsFilterOpen(false); }} className="text-xs font-bold text-primary">Clear All</button>
                                    </div>
                                    <div className="flex flex-col gap-2.5 pb-24">
                                        {tabs.map(tab => (
                                            <button 
                                                key={tab} 
                                                onClick={() => { setActiveTab(tab); setIsFilterOpen(false); }}
                                                className={`p-4 rounded-2xl flex items-center justify-between transition-all ${activeTab === tab ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-background border border-border/40 text-text-muted hover:text-content active:bg-white/5'}`}
                                            >
                                                <span className="text-sm font-bold">{tab}</span>
                                                {activeTab === tab && <CheckCircle2 className="size-5" />}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Data List View */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 md:p-8">
                        <div className="bg-transparent md:bg-surface md:border border-border/40 rounded-2xl md:shadow-sm md:pb-4">
                            <div className="min-w-0 md:pb-32 hidden md:block">
                                <table className="w-full text-left">
                                    <thead className="bg-background/50 border-b border-border/40">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Experience</th>
                                            <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Date Submitted</th>
                                            <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/40">
                                        <AnimatePresence mode="popLayout">
                                            {loading ? (
                                                Array.from({ length: 5 }).map((_, i) => (
                                                    <tr key={`skeleton-${i}`} className="animate-pulse hidden md:table-row">
                                                        <td colSpan="4" className="px-6 py-4">
                                                            <div className="h-12 bg-white/5 rounded-xl" />
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : filteredSubmissions.length > 0 ? (
                                                filteredSubmissions.map((sub, i) => (
                                                    <motion.tr 
                                                        key={sub.id}
                                                        layout
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0.95 }}
                                                        transition={{ delay: i * 0.03 }}
                                                        className="hover:bg-white/[0.02] transition-colors group hidden md:table-row cursor-pointer"
                                                        onClick={() => navigate(`/my-submissions/${sub.id}`)}
                                                    >
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-4">
                                                                <div className="size-10 rounded-xl bg-background border border-border/40 flex items-center justify-center">
                                                                    <Building2 className="size-5 text-text-muted group-hover:text-primary transition-colors" />
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-sm font-bold text-content">{sub.company}</span>
                                                                    <span className="text-xs font-medium text-text-muted mt-0.5">{sub.role}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${sub.bg} text-xs font-semibold ${sub.color}`}>
                                                                <div className={`size-1.5 rounded-full ${statDotColor(sub.status)}`} />
                                                                {sub.status}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="text-sm font-medium text-text-secondary">{sub.date}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex items-center justify-end gap-2 relative">
                                                                <button 
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setOpenMenuId(openMenuId === sub.id ? null : sub.id);
                                                                    }}
                                                                    className={`size-8 rounded-lg border flex items-center justify-center transition-all ${openMenuId === sub.id
                                                                            ? 'bg-surface-hover border-border text-content shadow-sm'
                                                                            : 'bg-background border-border/40 text-text-muted hover:text-content hover:border-border hover:bg-surface'
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
                                                                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                                                className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border/40 rounded-xl shadow-xl z-[130] overflow-hidden p-1.5 backdrop-blur-xl"
                                                                            >
                                                                                <button
                                                                                    onClick={(e) => { e.stopPropagation(); navigate(`/my-submissions/${sub.id}`); }}
                                                                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-text-secondary hover:text-content hover:bg-white/5 transition-all text-left"
                                                                                >
                                                                                    {sub.status === 'Drafts' ? <Edit3 className="size-4" /> : <Eye className="size-4" />}
                                                                                    {sub.status === 'Drafts' ? 'Resume Draft' : 'View Details'}
                                                                                </button>
                                                                                {sub.status !== 'Approved' && (
                                                                                    <button
                                                                                        onClick={(e) => { e.stopPropagation(); navigate(`/my-submissions/${sub.id}/edit`); }}
                                                                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-text-secondary hover:text-content hover:bg-white/5 transition-all text-left"
                                                                                    >
                                                                                        <Edit3 className="size-4" />
                                                                                        Edit Submission
                                                                                    </button>
                                                                                )}
                                                                                <div className="h-px bg-border/40 my-1 mx-2" />
                                                                                <button
                                                                                    onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); }}
                                                                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-danger/80 hover:text-danger hover:bg-danger/10 transition-all text-left"
                                                                                >
                                                                                    <Trash2 className="size-4" />
                                                                                    Delete
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
                                                    <td colSpan="4" className="py-24">
                                                        <div className="flex flex-col items-center justify-center gap-4 text-center">
                                                            <div className="size-16 rounded-full bg-background border border-border/40 flex items-center justify-center mb-2">
                                                                <Database className="size-6 text-text-muted opacity-50" />
                                                            </div>
                                                            <div className="flex flex-col gap-1">
                                                                <h3 className="text-base font-bold text-content">No Submissions Found</h3>
                                                                <p className="text-sm text-text-muted max-w-[300px]">
                                                                    {activeTab === 'All' 
                                                                        ? "You haven't added any interview experiences yet." 
                                                                        : `No experiences found with status '${activeTab}'.`}
                                                                </p>
                                                            </div>
                                                            <button
                                                                onClick={() => navigate('/submit')}
                                                                className="mt-4 px-6 py-2.5 rounded-xl btn-secondary text-sm font-semibold"
                                                            >
                                                                Add Experience
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards View */}
                            <div className="md:hidden flex flex-col gap-4">
                                <AnimatePresence mode="popLayout">
                                    {loading ? (
                                        Array.from({ length: 3 }).map((_, i) => (
                                            <div key={`skeleton-mobile-${i}`} className="p-4 rounded-xl border border-border/40 bg-background/50 animate-pulse h-28" />
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
                                                className="flex flex-col p-4 rounded-xl border border-border/40 bg-background hover:border-primary/40 transition-colors"
                                                onClick={() => navigate(`/my-submissions/${sub.id}`)}
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-10 rounded-lg bg-surface flex items-center justify-center shrink-0">
                                                            <Building2 className="size-5 text-text-muted" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-content leading-tight line-clamp-1">{sub.company}</span>
                                                            <span className="text-xs font-medium text-text-muted mt-0.5 line-clamp-1">{sub.role}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/40">
                                                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md ${sub.bg} text-[10px] font-bold ${sub.color}`}>
                                                        <div className={`size-1.5 rounded-full ${statDotColor(sub.status)}`} />
                                                        {sub.status}
                                                    </div>
                                                    <span className="text-[10px] font-medium text-text-muted">{sub.date}</span>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
                                            <Database className="size-8 text-text-muted opacity-50 mb-2" />
                                            <h3 className="text-sm font-bold text-content">No Submissions Found</h3>
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
        case 'Approved': return 'bg-success';
        case 'Pending': return 'bg-warning';
        case 'Rejected': return 'bg-danger';
        case 'Drafts': return 'bg-accent';
        default: return 'bg-secondary-bg';
    }
};

export default MySubmissionsPage;
