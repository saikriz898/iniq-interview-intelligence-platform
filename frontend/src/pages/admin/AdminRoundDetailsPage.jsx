import React from 'react';
import { 
  ArrowLeft, Clock, FileText, ShieldCheck, MapPin, Building2, User,
  CheckCircle2, AlertCircle, Info, ChevronRight, MessageCircle, Zap,
  Code, BookOpen, UserCheck, BarChart2, Terminal as TerminalIcon,
  Copy, ExternalLink
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';
import { pendingSubmissionsData } from '../../data/pendingSubmissions';

/**
 * --- ADMIN ROUND DETAILS: FORMAL EVALUATION HUB ---
 * Features: High-density granular review of specific problems, solutions, 
 * and interview feedback. Includes high-fidelity code artifacts with 
 * syntax highlighting protocols.
 */
const AdminRoundDetailsPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();
    const { id, roundIndex } = useParams();

    // Data Handshake: Locate corresponding submission and round node
    const submission = pendingSubmissionsData.find(s => s.id === id) || pendingSubmissionsData[0];
    const roundIdx = parseInt(roundIndex);
    const round = submission.rounds[roundIdx] || submission.rounds[0];

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col bg-background">
                
                {/* 1. NAVIGATION & CONTEXT HEADER */}
                <div className="h-20 sm:h-24 border-b border-border px-8 lg:px-12 flex items-center justify-between shrink-0 bg-surface z-[60]">
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => navigate(`/admin/pending/${id}`)}
                            className="size-10 rounded-xl bg-background border border-border flex items-center justify-center text-text-muted hover:text-primary transition-all active:scale-95 group"
                        >
                            <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-0.5" />
                        </button>
                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-3">
                                <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-[9px] font-bold uppercase tracking-wider text-primary italic">Round Analysis: 0{roundIdx + 1}</span>
                                <span className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-widest leading-none">Parent ID: {id}</span>
                            </div>
                            <h2 className="text-xl font-black text-content font-['Inter'] tracking-tight leading-none uppercase">{round.title}</h2>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                         <div className="flex items-center gap-2 px-5 py-2 bg-surface border border-border rounded-xl shadow-sm">
                            <Clock className="size-4 text-primary" />
                            <span className="text-[11px] font-black text-content uppercase tracking-widest">{round.duration} Session</span>
                         </div>
                    </div>
                </div>

                {/* 2. GRANULAR SUBMISSION CANVAS */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12 pb-32">
                    <div className="max-w-5xl mx-auto w-full flex flex-col gap-12">
                        
                        {/* Summary & Core Overview */}
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <FileText className="size-5 text-primary" />
                                <h3 className="text-xs font-black text-content uppercase tracking-[0.2em]">Detailed Synopsis</h3>
                                <div className="flex-1 h-[1px] bg-border" />
                            </div>
                            <div className="p-8 rounded-2xl bg-surface border border-border shadow-sm">
                                <p className="text-sm font-medium text-text-muted leading-relaxed tracking-wide italic">
                                    "{round.desc}"
                                </p>
                            </div>
                        </div>

                        {/* Problems & Solutions (Granular Submission Data) */}
                        <div className="flex flex-col gap-10">
                            <div className="flex items-center gap-3">
                                <Code className="size-5 text-primary" />
                                <h3 className="text-xs font-black text-content uppercase tracking-[0.2em]">Submitted Problems & Solutions</h3>
                                <div className="flex-1 h-[1px] bg-border" />
                            </div>
                            
                            <div className="flex flex-col gap-12">
                                {round.problems?.map((p, i) => (
                                    <div key={i} className="flex flex-col gap-6 p-10 rounded-[2.5rem] bg-surface border border-border shadow-sm hover:border-primary/20 transition-all">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="px-3.5 py-1.5 rounded-lg bg-background border border-border text-[9px] font-bold text-primary uppercase">Problem 0{i+1}</div>
                                                <div className={`px-3.5 py-1.5 rounded-full border text-[9px] font-bold uppercase tracking-widest ${
                                                    p.difficulty === 'Hard' ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : 
                                                    p.difficulty === 'Medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                                                }`}>
                                                    {p.difficulty}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col gap-8">
                                            <div className="flex flex-col gap-3">
                                                <span className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-widest flex items-center gap-2 italic">
                                                     <ExternalLink className="size-3" />
                                                     Question Signal
                                                </span>
                                                <p className="text-base font-black text-content leading-relaxed font-['Inter'] uppercase italic">
                                                    {p.question}
                                                </p>
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-2 italic">
                                                        <TerminalIcon className="size-4" />
                                                        Submission Code Artifact
                                                    </span>
                                                    {p.code && (
                                                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border text-[9px] font-bold text-text-muted hover:text-primary transition-all">
                                                            <Copy className="size-3.5" />
                                                            Copy Node
                                                        </button>
                                                    )}
                                                </div>
                                                
                                                {p.code ? (
                                                    <div className="rounded-2xl bg-[#0F172A] p-8 border border-border overflow-hidden relative group">
                                                        <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-white/10 uppercase font-black pointer-events-none group-hover:text-white/20 transition-all">javascript_protocol</div>
                                                        <pre className="font-mono text-[13px] leading-relaxed text-blue-200/90 overflow-x-auto custom-scrollbar-horizontal pb-4">
                                                            {p.code.trim()}
                                                        </pre>
                                                    </div>
                                                ) : (
                                                    <div className="p-8 rounded-2xl bg-surface-hover/30 border border-border border-dashed">
                                                         <p className="text-xs font-medium text-text-muted leading-relaxed tracking-wide">
                                                            {p.solution}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Interview Feedback Hub */}
                        {round.feedback && (
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-3">
                                    <UserCheck className="size-5 text-emerald-500" />
                                    <h3 className="text-xs font-black text-content uppercase tracking-[0.2em]">Administrative Review Feedback</h3>
                                    <div className="flex-1 h-[1px] bg-border" />
                                </div>
                                <div className="p-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 shadow-sm flex flex-col gap-3">
                                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest italic leading-none">Internal Assessment Protocol</span>
                                    <p className="text-sm font-medium text-emerald-700 leading-relaxed tracking-wide italic">
                                        "{round.feedback}"
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Metadata Sector */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                            <div className="p-8 rounded-2xl bg-surface border border-border shadow-sm flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-text-muted opacity-40">
                                    <Building2 className="size-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest italic">Company Node</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-black text-content uppercase tracking-tight italic leading-none">{submission.company}</span>
                                    <span className="text-[10px] font-semibold text-text-muted uppercase mt-2">{submission.role} Role Cluster</span>
                                </div>
                            </div>
                            <div className="p-8 rounded-2xl bg-surface border border-border shadow-sm flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-text-muted opacity-40">
                                    <BarChart2 className="size-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest italic">Node Integrity Analysis</span>
                                </div>
                                <div className="flex items-center gap-5">
                                     <div className="size-14 rounded-full border-4 border-emerald-500/10 border-t-emerald-500 flex items-center justify-center">
                                        <span className="text-[11px] font-black text-emerald-500 italic">94%</span>
                                     </div>
                                     <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-relaxed max-w-[140px]">Intelligence node matches platform standards.</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 3. SEQUENTIAL NAVIGATION STICKY FOOTER */}
                <div className="h-20 border-t border-border px-8 flex items-center justify-center bg-surface sticky bottom-0 z-[55]">
                    <div className="flex items-center gap-12">
                         <button 
                            disabled={roundIdx === 0}
                            onClick={() => navigate(`/admin/pending/${id}/rounds/${roundIdx - 1}`)}
                            className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-primary transition-all disabled:opacity-20 flex-1 justify-end min-w-[150px]"
                         >
                            <ArrowLeft className="size-4" />
                            Previous Module
                         </button>
                         <div className="flex items-center gap-2 mx-10">
                             {[...Array(submission.rounds.length)].map((_, i) => (
                                 <div key={i} className={`h-1.5 rounded-full transition-all ${i === roundIdx ? 'w-8 bg-primary shadow-sm' : 'w-1.5 bg-border hover:bg-text-muted/20 cursor-pointer'}`} />
                             ))}
                         </div>
                         <button 
                            disabled={roundIdx === submission.rounds.length - 1}
                            onClick={() => navigate(`/admin/pending/${id}/rounds/${roundIdx + 1}`)}
                            className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-primary transition-all disabled:opacity-20 flex-1 min-w-[150px]"
                         >
                            Next Module
                            <ChevronRight className="size-4" />
                         </button>
                    </div>
                </div>

            </div>
        </AdminAppShell>
    );
};

export default AdminRoundDetailsPage;
