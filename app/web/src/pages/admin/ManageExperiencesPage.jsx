import React, { useState } from 'react';
import { 
  PlusCircle, ListChecks, CheckCircle2, Clock, XCircle, 
  ArrowUpRight, Building2, Calendar, FileText, UserCircle, 
  Filter, ArrowRight, User, ShieldCheck, Activity,
  Terminal, ShieldAlert, Cpu, Zap, Search, Eye, ThumbsUp, ThumbsDown,
  MoreVertical, Trash2, X, Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';

/**
 * --- MANAGE EXPERIENCES: EXPERIENCE DATABASE MODERATION ---
 * Refined Design: Professional, formal, and authoritative.
 * Logic: Restricted to View/Approve/Deny actions with mandatory reasoning for all decisions.
 * Manual experience creation has been decommissioned.
 */
const ManageExperiencesPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, id: null });
    const [commentary, setCommentary] = useState('');

    const tabs = ['All', 'Pending', 'Approved', 'Rejected'];

    const experiences = [
        { id: 'IQ-1042', company: 'Google', role: 'SDE-I', user: 'saikriz898', status: 'Pending', date: 'Mar 28, 2026', color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { id: 'IQ-1041', company: 'Amazon', role: 'Frontend Architect', user: 'akash_v', status: 'Approved', date: 'Mar 20, 2026', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { id: 'IQ-1040', company: 'Microsoft', role: 'SDE-III', user: 'neha_patel', status: 'Rejected', date: 'Mar 14, 2026', color: 'text-rose-500', bg: 'bg-rose-500/10' },
        { id: 'IQ-1039', company: 'Meta', role: 'Product Manager', user: 'rahul_j', status: 'Approved', date: 'Mar 10, 2026', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { id: 'IQ-1038', company: 'Flipkart', role: 'Data Scientist', user: 'sneha_s', status: 'Pending', date: 'Mar 08, 2026', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    ];

    const filteredExperiences = experiences.filter(exp => {
        const matchesTab = activeTab === 'All' || exp.status === activeTab;
        const matchesSearch = exp.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             exp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             exp.user.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const openModal = (type, id) => {
        setCommentary('');
        setModalConfig({ isOpen: true, type, id });
    };

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col p-8 lg:p-12 overflow-hidden bg-background">
                <div className="max-w-[1500px] mx-auto w-full h-full flex flex-col gap-8">
                    
                    {/* 1. ADMINISTRATION HEADER */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0 pt-2 border-b border-border pb-10">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] font-bold uppercase tracking-wider text-amber-500">Database Moderation Hub</span>
                            </div>
                            <h1 className="text-3xl font-black text-content uppercase tracking-tight leading-none font-['Inter']">Experience Management</h1>
                            <p className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-[0.2em] mt-2">Centralized verification protocol for all submitted interview modules.</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                             <div className="relative group w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted opacity-40 group-focus-within:text-primary transition-all" />
                                <input 
                                    type="text" 
                                    placeholder="Search by ID, Company, or User..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full py-4 pl-12 pr-6 rounded-xl bg-surface border border-border text-[11px] font-bold uppercase tracking-wider focus:border-primary/40 outline-none transition-all shadow-sm"
                                />
                             </div>
                        </div>
                    </div>

                    {/* 2. NAVIGATION & TABS */}
                    <div className="flex items-center border-b border-border shrink-0">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-5 text-[10px] font-black uppercase tracking-[0.25em] transition-all relative ${
                                    activeTab === tab 
                                        ? 'text-primary' 
                                        : 'text-text-muted opacity-40 hover:opacity-100 hover:text-content'
                                }`}
                            >
                                {tab} Signals
                                {activeTab === tab && (
                                    <motion.div layoutId="adminExpTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full shadow-lg shadow-primary/20" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* 3. EXPERIENCE DATABASE TABLE */}
                    <div className="flex-1 bg-surface border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col mb-4">
                        <div className="flex-1 overflow-y-auto custom-scrollbar relative min-h-0">
                            <table className="w-full text-left border-collapse">
                                <thead className="sticky top-0 z-10 bg-surface border-b border-border">
                                    <tr>
                                        <th className="px-8 py-5 text-[9px] font-bold uppercase tracking-[0.25em] text-text-muted opacity-40">Identifier</th>
                                        <th className="px-8 py-5 text-[9px] font-bold uppercase tracking-[0.25em] text-text-muted opacity-40">Company Details</th>
                                        <th className="px-8 py-5 text-[9px] font-bold uppercase tracking-[0.25em] text-text-muted opacity-40">Contributor Node</th>
                                        <th className="px-8 py-5 text-[9px] font-bold uppercase tracking-[0.25em] text-text-muted opacity-40">Protocol Status</th>
                                        <th className="px-8 py-5 text-[9px] font-bold uppercase tracking-[0.25em] text-text-muted opacity-40 text-right">Moderation Hub</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/20">
                                    <AnimatePresence mode="popLayout">
                                        {filteredExperiences.map((exp, i) => (
                                            <motion.tr 
                                                key={exp.id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, scale: 0.98 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="group hover:bg-surface-hover/30 transition-colors"
                                            >
                                                <td className="px-8 py-5">
                                                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{exp.id}</span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="size-10 rounded-xl bg-background border border-border flex items-center justify-center grayscale group-hover:grayscale-0 transition-all shadow-inner">
                                                            <Building2 className="size-5 text-text-muted group-hover:text-primary transition-colors" />
                                                        </div>
                                                        <div className="flex flex-col leading-none">
                                                            <span className="text-[14px] font-black text-content uppercase tracking-tight italic font-['Inter']">{exp.company}</span>
                                                            <span className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-widest mt-1.5">{exp.role}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-5 rounded-full bg-surface border border-border p-0.5">
                                                            <div className="size-full rounded-full bg-primary/20" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[12px] font-bold text-content lowercase">@{exp.user}</span>
                                                            <span className="text-[9px] font-bold text-text-muted opacity-30 mt-1 uppercase tracking-widest leading-none">{exp.date}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${exp.bg} text-[9px] font-black uppercase tracking-widest ${exp.color} border border-transparent`}>
                                                        <div className={`size-1.5 rounded-full ${statDotColor(exp.status)}`} />
                                                        {exp.status}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-2 relative">
                                                        <button 
                                                            onClick={() => navigate(`/admin/pending/${exp.id}`)}
                                                            className="h-10 px-4 rounded-xl bg-surface border border-border flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-primary hover:border-primary/40 transition-all shadow-sm active:scale-95 group"
                                                        >
                                                            <Eye className="size-4" />
                                                            Inspect
                                                        </button>

                                                        {exp.status !== 'Pending' && (
                                                            <button 
                                                                onClick={() => navigate(`/admin/pending/${exp.id}/report`)}
                                                                className="h-10 px-4 rounded-xl bg-surface border border-border flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95"
                                                            >
                                                                <FileText className="size-4" />
                                                                Audit
                                                            </button>
                                                        )}
                                                        
                                                        {exp.status === 'Pending' && (
                                                            <div className="flex items-center gap-2">
                                                                <button 
                                                                    onClick={() => openModal('Approve', exp.id)}
                                                                    className="size-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/10 hover:-translate-y-0.5 transition-all active:scale-95"
                                                                >
                                                                    <ThumbsUp className="size-4.5" />
                                                                </button>
                                                                <button 
                                                                    onClick={() => openModal('Deny', exp.id)}
                                                                    className="size-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/10 hover:-translate-y-0.5 transition-all active:scale-95"
                                                                >
                                                                    <ThumbsDown className="size-4.5" />
                                                                </button>
                                                            </div>
                                                        )}

                                                        <button className="size-10 rounded-xl bg-surface border border-border flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-95">
                                                            <Trash2 className="size-4.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* SYNC PROTOCOL MODAL: APPROVAL OR DENIAL */}
            <AnimatePresence>
                {modalConfig.isOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setModalConfig({ isOpen: false, type: null, id: null })}
                            className="fixed inset-0 z-[200] bg-background/40 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-surface border border-border rounded-3xl shadow-2xl z-[210] overflow-hidden p-10"
                        >
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-2 border-b border-border pb-6">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-[9px] font-bold uppercase tracking-widest leading-none ${modalConfig.type === 'Approve' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {modalConfig.type === 'Approve' ? 'Selection Protocol' : 'Denial Protocol'}
                                        </span>
                                        <button onClick={() => setModalConfig({ isOpen: false, type: null, id: null })} className="text-text-muted hover:text-primary transition-colors">
                                            <X className="size-5" />
                                        </button>
                                    </div>
                                    <h2 className="text-2xl font-black text-content uppercase tracking-tight font-['Inter'] mt-4">
                                        {modalConfig.type === 'Approve' ? 'Verification Summary' : 'Reason for Rejection'}
                                    </h2>
                                    <p className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-widest mt-2">Target Node: {modalConfig.id}</p>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <textarea 
                                        placeholder={modalConfig.type === 'Approve' ? 'Enter selection summary...' : 'Enter rejection reason...'}
                                        value={commentary}
                                        onChange={(e) => setCommentary(e.target.value)}
                                        className={`w-full h-40 p-6 rounded-2xl bg-background border border-border text-[13px] font-bold uppercase tracking-tight outline-none transition-all shadow-inner resize-none custom-scrollbar italic ${
                                            modalConfig.type === 'Approve' ? 'focus:border-emerald-500' : 'focus:border-rose-500'
                                        }`}
                                    />
                                    <div className="flex items-center gap-4">
                                        <button 
                                            disabled={!commentary.trim()}
                                            onClick={() => navigate(`/admin/pending/${modalConfig.id}/report`)}
                                            className={`flex-1 h-14 rounded-xl text-white text-[11px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50 ${
                                                modalConfig.type === 'Approve' ? 'bg-emerald-600 shadow-emerald-600/20' : 'bg-rose-600 shadow-rose-600/20'
                                            }`}
                                        >
                                            <Send className="size-4.5" />
                                            Confirm Decision
                                        </button>
                                        <button 
                                            onClick={() => setModalConfig({ isOpen: false, type: null, id: null })}
                                            className="px-8 h-14 rounded-xl border border-border text-[11px] font-black uppercase tracking-widest text-text-muted hover:bg-surface-hover transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </AdminAppShell>
    );
};

// UI UTILS
const statDotColor = (status) => {
    switch (status) {
        case 'Approved': return 'bg-emerald-500';
        case 'Pending': return 'bg-amber-500';
        case 'Rejected': return 'bg-rose-500';
        default: return 'bg-gray-400';
    }
};

export default ManageExperiencesPage;
