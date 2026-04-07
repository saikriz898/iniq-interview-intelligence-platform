import React, { useState } from 'react';
import { 
  ArrowLeft, Clock, FileText, ShieldCheck, MapPin, Building2, User,
  CheckCircle2, AlertCircle, Info, ChevronRight, MessageCircle, Zap,
  ThumbsUp, ThumbsDown, Trash2, X, Send
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';
import { pendingSubmissionsData } from '../../data/pendingSubmissions';

/**
 * --- REVIEW SUBMISSION DETAILS: FORMAL MODERATION HUB ---
 * Refined Design: Professional, institutional, and high-density review interface.
 * Logic: Restricted to Approve/Reject actions with mandatory selection reasoning for BOTH.
 */
const ReviewSubmissionDetailsPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();
    const { id } = useParams();

    // Data Handshake: Locate corresponding submission node
    const submission = pendingSubmissionsData.find(s => s.id === id) || pendingSubmissionsData[0];

    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null }); // type: 'Approve' | 'Deny'
    const [commentary, setCommentary] = useState('');

    const openModal = (type) => {
        setCommentary('');
        setModalConfig({ isOpen: true, type });
    };

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex bg-background overflow-hidden">
                
                {/* LEFT: CONTENT CANVAS (SCROLLABLE) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12 pb-32">
                    <div className="max-w-4xl mx-auto w-full flex flex-col gap-12">
                        
                        {/* Summary Header */}
                        <div className="flex flex-col gap-5 border-b border-border pb-10">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => navigate('/admin/pending')}
                                    className="size-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary transition-all active:scale-95 group"
                                >
                                    <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-0.5" />
                                </button>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-3">
                                        <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] font-bold uppercase tracking-wider text-amber-500">Awaiting Verification</span>
                                        <span className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-[0.2em]">Node ID: {submission.id}</span>
                                    </div>
                                    <h1 className="text-3xl font-black text-content uppercase tracking-tight leading-none font-['Inter']">{submission.company} // {submission.role}</h1>
                                </div>
                            </div>
                        </div>

                        {/* Overview Section */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 border-l-4 border-primary pl-4">
                                <FileText className="size-5 text-primary" />
                                <h3 className="text-[11px] font-black text-content uppercase tracking-[0.25em]">Process Overview</h3>
                            </div>
                            <p className="text-[15px] font-medium text-text-muted leading-relaxed tracking-wide italic p-8 rounded-2xl bg-surface border border-border shadow-sm">
                                "{submission.overview}"
                            </p>
                        </div>

                        {/* Round Analysis Sector */}
                        <div className="flex flex-col gap-8">
                             <div className="flex items-center justify-between px-2">
                                <h3 className="text-[11px] font-black text-content uppercase tracking-[0.25em] flex items-center gap-3">
                                    <Zap className="size-5 text-primary" />
                                    Interview Module Analysis
                                </h3>
                                <span className="text-[9px] font-bold text-text-muted opacity-40 uppercase tracking-widest">{submission.rounds.length} Verification Nodes</span>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-6">
                                {submission.rounds.map((round, i) => (
                                    <div 
                                        key={i}
                                        onClick={() => navigate(`/admin/pending/${id}/rounds/${i}`)}
                                        className="p-8 rounded-[2rem] bg-surface border border-border shadow-sm flex flex-col gap-6 hover:border-primary transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-lg bg-background border border-border flex items-center justify-center text-[10px] font-black text-primary italic uppercase tracking-tighter shadow-inner">0{i+1}</div>
                                                <h4 className="text-lg font-black text-content uppercase tracking-tight group-hover:text-primary transition-colors">{round.title}</h4>
                                            </div>
                                            <div className="flex items-center gap-2 text-text-muted opacity-40">
                                                <Clock className="size-4" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">{round.duration} Session</span>
                                            </div>
                                        </div>
                                        <p className="text-[13px] font-medium text-text-muted leading-relaxed tracking-wide opacity-80 uppercase italic border-l border-border/40 pl-4">{round.desc}</p>
                                        <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-primary opacity-0 group-hover:opacity-100 transition-all">
                                            <span>Enter Technical Review Node</span>
                                            <ChevronRight className="size-3.5" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* RIGHT: ADMINISTRATIVE PANEL (FIXED) */}
                <div className="w-[450px] border-l border-border bg-surface shrink-0 flex flex-col">
                    <div className="p-10 border-b border-border bg-background/30">
                        <div className="flex items-center gap-3 mb-2">
                             <ShieldCheck className="size-5 text-primary" />
                             <span className="text-[10px] font-black uppercase text-text-muted tracking-[0.25em]">Administrative Panel</span>
                        </div>
                        <h2 className="text-xl font-black text-content uppercase tracking-tight font-['Inter']">Decision Protocol</h2>
                    </div>

                    <div className="flex-1 p-10 flex flex-col gap-10 overflow-y-auto no-scrollbar">
                        
                        {/* Contributor Metadata */}
                        <div className="flex flex-col gap-6">
                            <h3 className="text-[9px] font-black text-text-muted uppercase tracking-[0.3em] opacity-40 italic">Submitted Information</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="p-6 rounded-2xl bg-background/50 border border-border flex flex-col gap-3 group hover:border-primary/20 transition-all">
                                    <div className="flex items-center gap-2.5 text-text-muted opacity-40">
                                        <User className="size-4" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Platform Contributor</span>
                                    </div>
                                    <span className="text-lg font-black text-content italic lowercase tracking-tight group-hover:text-primary transition-colors">@{submission.user}</span>
                                </div>
                                <div className="p-6 rounded-2xl bg-background/50 border border-border flex flex-col gap-3 group hover:border-primary/20 transition-all">
                                    <div className="flex items-center gap-2.5 text-text-muted opacity-40">
                                        <MapPin className="size-4" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Target Location</span>
                                    </div>
                                    <span className="text-base font-black text-content uppercase tracking-tight italic transition-colors leading-none">{submission.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Moderation Metrics */}
                        <div className="flex flex-col gap-6">
                            <h3 className="text-[9px] font-black text-text-muted uppercase tracking-[0.3em] opacity-40 italic">Integrity Metrics</h3>
                            <div className="p-8 rounded-3xl bg-background/50 border border-border flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-60">Technical Nodes Match</span>
                                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic">Stable</span>
                                </div>
                                <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                                    <div className="h-full w-[94%] bg-emerald-500 rounded-full" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="size-4.5 text-amber-500" />
                                    <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest leading-relaxed">No critical synchronization discrepancies detected by system audit.</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* MODERATION ACTIONS (FIXED BOTTOM) */}
                    <div className="p-10 border-t border-border bg-background/30 grid grid-cols-2 gap-4">
                        <button 
                            onClick={() => openModal('Approve')}
                            className="h-14 rounded-xl bg-emerald-600 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/10 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                            <CheckCircle2 className="size-5" />
                            Approve
                        </button>
                        <button 
                            onClick={() => openModal('Deny')}
                            className="h-14 rounded-xl bg-rose-600 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-rose-600/10 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                            <ThumbsDown className="size-5" />
                            Deny
                        </button>
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
                            onClick={() => setModalConfig({ isOpen: false, type: null })}
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
                                        <button onClick={() => setModalConfig({ isOpen: false, type: null })} className="text-text-muted hover:text-primary transition-colors">
                                            <X className="size-5" />
                                        </button>
                                    </div>
                                    <h2 className="text-2xl font-black text-content uppercase tracking-tight font-['Inter'] mt-4">
                                        {modalConfig.type === 'Approve' ? 'Verification Summary' : 'Reason for Rejection'}
                                    </h2>
                                    <p className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-widest mt-2">
                                        {modalConfig.type === 'Approve' ? 'Provide a brief summary of the verified experience for the platform records.' : 'Provide a detailed explanation for why this submission was decommissioned.'}
                                    </p>
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
                                            onClick={() => navigate(`/admin/pending/${id}/report`)}
                                            className={`flex-1 h-14 rounded-xl text-white text-[11px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50 ${
                                                modalConfig.type === 'Approve' ? 'bg-emerald-600 shadow-emerald-600/20' : 'bg-rose-600 shadow-rose-600/20'
                                            }`}
                                        >
                                            <Send className="size-4.5" />
                                            Confirm Decision
                                        </button>
                                        <button 
                                            onClick={() => setModalConfig({ isOpen: false, type: null })}
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

export default ReviewSubmissionDetailsPage;
