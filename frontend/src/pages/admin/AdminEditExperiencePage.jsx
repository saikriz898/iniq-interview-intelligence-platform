import React, { useState } from 'react';
import { 
  Building2, Calendar, User, ThumbsUp, ThumbsDown, 
  Trash2, Edit3, ArrowLeft, ShieldCheck, Zap, Terminal,
  MessageCircle, Rocket, Cpu, Layers, Bookmark, CheckCircle2,
  AlertCircle, Info, ChevronRight, Activity, Share2, Clipboard,
  PlusCircle, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';

/**
 * --- ADMIN EDIT EXPERIENCE: INTELLIGENCE REVISION HUB ---
 * Features: High-fidelity form management, dynamic round node editing, 
 * pre-filled data sync, and administrative Save/Cancel protocols.
 */
const AdminEditExperiencePage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();
    const { id = 'IQ-1042' } = useParams();

    // Mock Data (Current State)
    const [formData, setFormData] = useState({
        company: 'Google',
        role: 'SDE-I',
        candidate: 'saikriz898',
        experience: '4 years',
        overview: 'Comprehensive DSA protocol covering Graph theory, Dynamic Programming, and Behavioral synopses for SDE-I role.',
        topics: ['Data Structures', 'Algorithms', 'System Design', 'Behavioral'],
        verdict: 'Approved',
        rounds: [
            { title: 'Technical Assessment', desc: 'Heavy emphasis on core DSA. Solving 2 Medium problems within 45 minutes.', duration: '60m' },
            { title: 'System Design Hub', desc: 'Architecture review for a scalable rate limiting service.', duration: '90m' },
            { title: 'Googliness Sync', desc: 'Alignment check with Google core values and leadership principles.', duration: '45m' },
        ],
        advice: 'Focus heavily on Graph traversals and internal rate limiting algorithms for SDE-I/II nodes.'
    });

    const handleAddRound = () => {
        setFormData({
            ...formData,
            rounds: [...formData.rounds, { title: 'New Intelligence Round', desc: 'Detail the round synopses here...', duration: '45m' }]
        });
    };

    const handleRemoveRound = (idx) => {
        const newRounds = formData.rounds.filter((_, i) => i !== idx);
        setFormData({ ...formData, rounds: newRounds });
    };

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col overflow-hidden bg-surface/[0.02]">
                
                {/* 1. REVISION HEADER */}
                <div className="h-24 sm:h-28 border-b border-border/40 px-8 lg:px-12 flex items-center justify-between shrink-0 bg-background/5 backdrop-blur-md relative z-[60]">
                    <div className="flex items-center gap-8">
                        <button 
                            onClick={() => navigate(-1)}
                            className="size-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary transition-all active:scale-95 shadow-sm group"
                        >
                            <ArrowLeft className="size-6 transition-transform group-hover:-translate-x-1" />
                        </button>
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-3">
                                <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-[0.2em] text-primary italic">Revision_Node: {id}</span>
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface border border-border/60 text-[8px] font-black text-text-muted uppercase tracking-widest opacity-60 italic">Mode: Administrative Override</div>
                            </div>
                            <h2 className="text-2xl font-black text-content font-['Sora'] tracking-tight leading-none italic uppercase">Modify Experience Protocol</h2>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => navigate(-1)}
                            className="px-6 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest text-text-muted hover:text-content transition-all"
                        >
                            Cancel_Sync
                        </button>
                        <button 
                            onClick={() => navigate('/admin/dashboard')}
                            className="px-8 py-4 rounded-xl bg-primary text-white text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-primary/30 hover:translate-x-1 transition-all active:scale-95"
                        >
                            Commit Changes
                        </button>
                    </div>
                </div>

                {/* 2. REVISION FORM CANVAS */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-8 lg:p-12 pb-32">
                    <div className="max-w-6xl mx-auto w-full flex flex-col gap-16 pb-20">
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            
                            {/* LEFT SECTOR: CORE METADATA */}
                            <div className="lg:col-span-1 flex flex-col gap-8">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-sm font-black text-content uppercase tracking-[0.2em] italic flex items-center gap-3">
                                        <Terminal className="size-4 text-primary" />
                                        Core Intelligence
                                    </h3>
                                    <div className="h-[1px] w-full bg-border/20 mt-2" />
                                </div>
                                
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] px-1 opacity-60">Target Company Node</label>
                                        <input 
                                            type="text" 
                                            value={formData.company}
                                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                                            className="w-full p-4 rounded-xl bg-surface border border-border/60 focus:border-primary text-sm font-black uppercase tracking-tight outline-none italic transition-all"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] px-1 opacity-60">Assigned Role Hierarchy</label>
                                        <input 
                                            type="text" 
                                            value={formData.role}
                                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                                            className="w-full p-4 rounded-xl bg-surface border border-border/60 focus:border-primary text-sm font-black uppercase tracking-tight outline-none italic transition-all"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] px-1 opacity-60">Candidate Experience</label>
                                        <input 
                                            type="text" 
                                            value={formData.experience}
                                            onChange={(e) => setFormData({...formData, experience: e.target.value})}
                                            className="w-full p-4 rounded-xl bg-surface border border-border/60 focus:border-primary text-sm font-black uppercase tracking-tight outline-none italic transition-all"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] px-1 opacity-60">Process Verdict</label>
                                        <select 
                                            value={formData.verdict}
                                            onChange={(e) => setFormData({...formData, verdict: e.target.value})}
                                            className="w-full p-4 rounded-xl bg-surface border border-border/60 focus:border-primary text-sm font-black uppercase tracking-tight outline-none italic transition-all"
                                        >
                                            <option value="Approved">Approved</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT SECTOR: PROCEDURAL SYNOPSES */}
                            <div className="lg:col-span-2 flex flex-col gap-12">
                                <div className="flex flex-col gap-8">
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-sm font-black text-content uppercase tracking-[0.2em] italic flex items-center gap-3">
                                            <Cpu className="size-4 text-primary" />
                                            Procedural Synopsis Override
                                        </h3>
                                        <div className="h-[1px] w-full bg-border/20 mt-2" />
                                    </div>
                                    
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] px-1 opacity-60">Operational Overview</label>
                                            <textarea 
                                                rows="4"
                                                value={formData.overview}
                                                onChange={(e) => setFormData({...formData, overview: e.target.value})}
                                                className="w-full p-6 rounded-[2rem] bg-surface border border-border/60 focus:border-primary text-sm font-bold text-text-muted leading-relaxed outline-none italic transition-all uppercase tracking-widest no-scrollbar"
                                            />
                                        </div>

                                        {/* Dynamic Round Cards */}
                                        <div className="flex flex-col gap-6">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] px-1 opacity-60">Intelligence Rounds Hierarchy</label>
                                                <button 
                                                    onClick={handleAddRound}
                                                    className="flex items-center gap-2 text-[8px] font-black uppercase text-primary hover:underline italic"
                                                >
                                                    <PlusCircle className="size-3.5" />
                                                    Inject Round Node
                                                </button>
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                {formData.rounds.map((round, i) => (
                                                    <motion.div 
                                                        key={i}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="p-8 rounded-[2.5rem] bg-surface border border-border/60 flex flex-col gap-5 relative group"
                                                    >
                                                        <button 
                                                            onClick={() => handleRemoveRound(i)}
                                                            className="absolute top-6 right-6 size-8 rounded-full bg-rose-500/10 text-rose-500 opacity-0 group-hover:opacity-100 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                                        >
                                                            <X className="size-4" />
                                                        </button>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                             <input 
                                                                type="text" 
                                                                value={round.title}
                                                                placeholder="Round Title"
                                                                className="w-full p-4 rounded-xl bg-surface-hover border border-border/40 focus:border-primary text-xs font-black uppercase tracking-tight outline-none italic transition-all"
                                                                onChange={(e) => {
                                                                    const newRounds = [...formData.rounds];
                                                                    newRounds[i].title = e.target.value;
                                                                    setFormData({...formData, rounds: newRounds});
                                                                }}
                                                            />
                                                            <input 
                                                                type="text" 
                                                                value={round.duration}
                                                                placeholder="Duration (e.g. 45m)"
                                                                className="w-full p-4 rounded-xl bg-surface-hover border border-border/40 focus:border-primary text-xs font-black uppercase tracking-tight outline-none italic transition-all"
                                                                onChange={(e) => {
                                                                    const newRounds = [...formData.rounds];
                                                                    newRounds[i].duration = e.target.value;
                                                                    setFormData({...formData, rounds: newRounds});
                                                                }}
                                                            />
                                                        </div>
                                                        <textarea 
                                                            rows="2"
                                                            value={round.desc}
                                                            placeholder="Round Details"
                                                            className="w-full p-5 rounded-2xl bg-surface-hover border border-border/40 focus:border-primary text-[10px] font-bold text-text-muted leading-relaxed outline-none italic transition-all uppercase tracking-widest no-scrollbar"
                                                            onChange={(e) => {
                                                                const newRounds = [...formData.rounds];
                                                                newRounds[i].desc = e.target.value;
                                                                setFormData({...formData, rounds: newRounds});
                                                            }}
                                                        />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] px-1 opacity-60">Legacy Intelligence (Advice)</label>
                                            <textarea 
                                                rows="3"
                                                value={formData.advice}
                                                onChange={(e) => setFormData({...formData, advice: e.target.value})}
                                                className="w-full p-6 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/20 focus:border-emerald-500 text-sm font-bold text-emerald-500 leading-relaxed outline-none italic transition-all uppercase tracking-widest no-scrollbar placeholder:text-emerald-500/40"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* 3. AUDIT FLAG */}
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 opacity-30 grayscale pointer-events-none z-[100]">
                    <ShieldCheck className="size-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Modification Audit Logging Enabled</span>
                </div>

            </div>
        </AdminAppShell>
    );
};

export default AdminEditExperiencePage;
