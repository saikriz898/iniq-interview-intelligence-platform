import React from 'react';
import { 
  ArrowLeft, CheckCircle2, XCircle, Clock, ShieldCheck, 
  User, Building2, Calendar, FileText, Zap, 
  MessageCircle, Info, Send, Activity, ShieldAlert
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';
import { pendingSubmissionsData } from '../../data/pendingSubmissions';

/**
 * --- ADMIN MODERATION REPORT: DECISION AUDIT HUB ---
 * Refined Design: Professional, formal, and authoritative.
 * Purpose: Provides a structured record of why a submission was 
 * selected (Approved) or rejected, including moderator notes.
 */
const AdminModerationReportPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();
    const { id } = useParams();

    // Data Handshake: Locate corresponding submission node
    const submission = pendingSubmissionsData.find(s => s.id === id) || pendingSubmissionsData[0];

    // Mock Decision Data (In a real app, this would come from the backend)
    const decisionLog = {
        status: id === 'IQ-1040' ? 'Rejected' : 'Approved',
        reason: id === 'IQ-1040' ? 'Incomplete round description and insufficient technical depth in round 2.' : 'Complete verification. All interview modules align with industry standards.',
        moderator: 'ADM-SYN-001',
        timestamp: 'Apr 05, 2026 // 14:32 UTC'
    };

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col p-8 lg:p-12 overflow-y-auto custom-scrollbar bg-background">
                <div className="max-w-4xl mx-auto w-full flex flex-col gap-10 pt-4 pb-20">
                    
                    {/* 1. ADMINISTRATION HEADER */}
                    <div className="flex flex-col gap-3 border-b border-border pb-10">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => navigate(-1)}
                                className="size-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary transition-all active:scale-95 group"
                            >
                                <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-0.5" />
                            </button>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    <span className="px-2.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[9px] font-bold uppercase tracking-wider text-blue-500 italic">Moderation Report Protocol</span>
                                    <span className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-[0.2em]">Archival Ref: RE-SYNC-{id}</span>
                                </div>
                                <h1 className="text-3xl font-black text-content uppercase tracking-tight leading-none font-['Inter']">Decision Audit Summary</h1>
                            </div>
                        </div>
                    </div>

                    {/* 2. DECISION STATUS BANNER */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-10 rounded-3xl border flex items-center gap-8 ${
                            decisionLog.status === 'Approved' 
                                ? 'bg-emerald-500/5 border-emerald-500/20' 
                                : 'bg-rose-500/5 border-rose-500/20'
                        }`}
                    >
                        <div className={`size-20 rounded-[2rem] flex items-center justify-center p-5 shadow-inner ${
                            decisionLog.status === 'Approved' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                        }`}>
                            {decisionLog.status === 'Approved' ? <CheckCircle2 className="size-10" /> : <XCircle className="size-10" />}
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                            <span className={`text-[11px] font-black uppercase tracking-[0.3em] ${
                                decisionLog.status === 'Approved' ? 'text-emerald-500' : 'text-rose-500'
                            }`}>
                                Protocol State: {decisionLog.status.toUpperCase()}
                            </span>
                            <h2 className="text-2xl font-black text-content uppercase tracking-tight font-['Inter'] italic">
                                {decisionLog.status === 'Approved' ? "Selected for Synchronization" : "Submission Decommissioned"}
                            </h2>
                        </div>
                        <div className="hidden md:flex flex-col items-end gap-1.5 text-right opacity-40">
                            <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest leading-none">Timestamp</span>
                            <span className="text-[11px] font-black text-content italic leading-none">{decisionLog.timestamp}</span>
                        </div>
                    </motion.div>

                    {/* 3. CORE MODERATION LOGIC (WHY) */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3 border-l-4 border-primary pl-4">
                            <MessageCircle className="size-5 text-primary" />
                            <h3 className="text-[11px] font-black text-content uppercase tracking-[0.25em]">Administrative Feedback</h3>
                        </div>
                        <div className="p-8 lg:p-10 rounded-3xl bg-surface border border-border shadow-sm flex flex-col gap-6 group hover:border-primary/20 transition-all">
                            <div className="flex flex-col gap-3">
                                <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest opacity-40 italic">Selection / Rejection Reason</span>
                                <p className="text-lg font-medium text-text-muted leading-relaxed tracking-wide italic uppercase">
                                    "{decisionLog.reason}"
                                </p>
                            </div>
                            <div className="h-[1px] w-full bg-border/40" />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-background border border-border flex items-center justify-center text-primary shadow-inner grayscale">
                                        <ShieldCheck className="size-4.5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest opacity-40">Moderator ID</span>
                                        <span className="text-[11px] font-black text-content uppercase italic tracking-tight">{decisionLog.moderator}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="size-2 rounded-full bg-primary" />
                                    <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Verified Signature</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. SUBMISSION TELEMETRY RECAP */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-6">
                             <h3 className="text-[10px] font-black text-content uppercase tracking-[0.25em] flex items-center gap-3 px-2">
                                <Building2 className="size-4 text-primary" />
                                Entity Details
                            </h3>
                            <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col gap-4 shadow-sm">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest opacity-40">Company Node</span>
                                    <span className="text-base font-black text-content uppercase tracking-tight italic">{submission.company}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest opacity-40">Position Role</span>
                                    <span className="text-base font-black text-content uppercase tracking-tight italic">{submission.role}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                             <h3 className="text-[10px] font-black text-content uppercase tracking-[0.25em] flex items-center gap-3 px-2">
                                <User className="size-4 text-primary" />
                                Submission Integrity
                            </h3>
                            <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col gap-4 shadow-sm">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest opacity-40">Platform Contributor</span>
                                    <span className="text-base font-black text-content italic lowercase tracking-tight">@{submission.user}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest opacity-40">Technical Modules</span>
                                        <span className="text-base font-black text-content uppercase tracking-tight italic">{submission.rounds.length} Verification Nodes</span>
                                    </div>
                                    <Activity className="size-6 text-emerald-500 opacity-40" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. PORTAL FOOTNOTE */}
                    <div className="flex items-center justify-center gap-4 opacity-20 grayscale pt-10">
                        <Zap className="size-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.45em]">INIQ Intelligence Platform // Decision Audit Protocol</span>
                    </div>

                </div>
            </div>
        </AdminAppShell>
    );
};

export default AdminModerationReportPage;
