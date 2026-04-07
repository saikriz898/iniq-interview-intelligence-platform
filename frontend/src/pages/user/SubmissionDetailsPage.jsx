import React from 'react';
import { 
  Building2, Briefcase, Calendar, CheckCircle2, 
  Clock, XCircle, ArrowLeft, Edit3, FileText, 
  Code, Layout, Video, ChevronRight, AlertCircle,
  HelpCircle, MessageCircle, ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * --- SUBMISSION DETAILS PAGE ---
 * Purpose: Full read-only or mostly read-only view for an already submitted 
 * interview experience. Shows review status and all journey details.
 */
const SubmissionDetailsPage = () => {
  const { theme, toggleTheme, isLoading } = useGlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();

  // MOCK DATA for one submission (in real app, fetch based on :id)
  const submission = {
    company: 'Google',
    role: 'SDE Intern',
    status: 'Pending',
    date: 'Mar 28, 2026',
    overview: 'The process started with a recruiter reach-out. It involved 2 technical screening rounds focusing on DSA and Problem Solving, followed by a Googleness & Leadership round.',
    topics: {
        dsa: 'Arrays, Graphs, Sliding Window',
        hld: 'Caching, Load Balancing',
        lld: 'Factory Pattern, SOLID Principles'
    },
    rounds: [
        { title: 'Round 1: DSA (Screening)', questions: 'Find the largest path in a weighted graph. Design a LRU Cache.', solution: 'class Node { ... }', explanation: 'Used DFS to traverse the graph and maintained a max_path variable. For LRU, used a Hashmap with Double Linked List.' },
        { title: 'Round 2: System Design', questions: 'How would you design a rate limiter for an API?', solution: 'Token Bucket algorithm...', explanation: 'Focused on scalability and single-point-of-failure issues. Discussed Redis for tracking counts.' }
    ],
    verdict: 'Pending Review',
    advice: 'Focus on time and space complexity analysis. For Google, clean code and talking through your thoughts is just as important as the final solution.'
  };

  return (
    <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading}>
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-10">
        
        {/* 1. COMPACT PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
            <div className="flex items-start gap-5">
                <button 
                    onClick={() => navigate('/my-submissions')}
                    className="p-3 rounded-xl bg-surface border border-border text-text-muted hover:text-primary transition-all shadow-sm"
                >
                    <ArrowLeft className="size-5" />
                </button>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-black text-content font-['Sora'] tracking-tight">
                            {submission.company}
                        </h1>
                        <span className="text-text-muted/40 text-xl font-bold">/</span>
                        <h2 className="text-2xl font-bold text-content/70">{submission.role}</h2>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-text-muted opacity-60">
                        <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> Submitted {submission.date}</span>
                        <span className="flex items-center gap-1.5 uppercase tracking-widest"><Building2 className="size-3.5" /> ID: SUB-{id || '12882'}</span>
                    </div>
                </div>
            </div>

            {/* Status Indicator */}
            <div className={`px-6 py-3 rounded-2xl flex items-center gap-3 border shadow-sm ${statusStyle(submission.status)}`}>
                {statusIcon(submission.status)}
                <div className="flex flex-col leading-none">
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Lifecycle Status</span>
                    <span className="text-xs font-black uppercase tracking-widest mt-1">{submission.status} Review</span>
                </div>
            </div>
        </div>

        {/* 2. MAIN CONTENT GRID (2 Columns for Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
            
            {/* LEFT: PRIMARY DETAILS (2/3) */}
            <div className="lg:col-span-2 flex flex-col gap-10">
                
                {/* Process Overview Card */}
                <Section title="Interview Process Overview" icon={FileText}>
                    <p className="text-sm font-bold text-text-muted leading-[1.8] opacity-80">
                        {submission.overview}
                    </p>
                </Section>

                {/* Interview Rounds - Detailed Sections */}
                <div className="flex flex-col gap-6">
                    <h2 className="text-sm font-black uppercase tracking-widest text-content flex items-center gap-2 px-2">
                        <Layers className="size-4 text-primary" />
                        Dynamic Round Breakdown
                    </h2>
                    
                    <div className="flex flex-col gap-8">
                        {submission.rounds.map((round, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-[2.5rem] bg-surface border border-border shadow-md relative group overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white text-sm font-black italic shadow-lg shadow-primary/20">
                                        R{idx + 1}
                                    </div>
                                    <h3 className="text-xl font-black text-content tracking-tight">{round.title}</h3>
                                </div>

                                <div className="space-y-8">
                                    <div className="flex flex-col gap-3">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60 flex items-center gap-2">
                                            <HelpCircle className="size-3.5 text-primary" />
                                            Questions Asked
                                        </span>
                                        <p className="p-5 rounded-2xl bg-surface-hover border border-border text-sm font-bold text-content leading-relaxed">
                                            {round.questions}
                                        </p>
                                    </div>

                                    {round.solution && (
                                        <div className="flex flex-col gap-3">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60 flex items-center gap-2">
                                                <Code className="size-3.5 text-accent" />
                                                Code / Pseudocode Solution
                                            </span>
                                            <div className="p-5 rounded-2xl bg-slate-900 text-slate-300 font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
                                                <pre><code>{round.solution}</code></pre>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-3">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60 flex items-center gap-2">
                                            <MessageCircle className="size-3.5 text-purple-500" />
                                            Technical Explanation
                                        </span>
                                        <p className="text-sm font-bold text-text-muted leading-[1.8] opacity-70">
                                            {round.explanation}
                                        </p>
                                    </div>

                                    <button className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-primary/5 border border-primary/10 text-xs font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                                        <Video className="size-4" />
                                        Watch Video Explanation
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>

            {/* RIGHT: SIDEBAR DETAILS (1/3) */}
            <div className="flex flex-col gap-8">
                
                {/* Topics Covered Hub */}
                <div className="p-8 rounded-[2.5rem] bg-surface border border-border shadow-xl shadow-black/5 flex flex-col gap-6 sticky top-28">
                    <h2 className="text-sm font-black uppercase tracking-widest text-content flex items-center gap-2">
                        <Layout className="size-4 text-primary" />
                        Topics Covered
                    </h2>
                    
                    <div className="flex flex-col gap-5">
                        <TopicItem label="Data Structures (DSA)" value={submission.topics.dsa} color="bg-primary/10 text-primary" border="border-primary/20" />
                        <TopicItem label="High Level Design" value={submission.topics.hld} color="bg-accent/10 text-accent" border="border-accent/20" />
                        <TopicItem label="Low Level Design" value={submission.topics.lld} color="bg-purple-500/10 text-purple-500" border="border-purple-500/20" />
                    </div>

                    <div className="h-[1px] bg-border/40 my-2" />

                    {/* Verdict & Advice Side Card */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60">Candidate Verdict</span>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-[11px] font-black uppercase tracking-widest text-green-500 w-fit shadow-sm">
                                <CheckCircle2 className="size-3.5" />
                                Selected
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60">Community Advice</span>
                            <p className="text-xs font-bold text-text-muted leading-relaxed opacity-70 border-l-2 border-primary/20 pl-4 py-1">
                                {submission.advice}
                            </p>
                        </div>
                    </div>

                    {/* Footer Actions in Sidebar */}
                    <div className="pt-6 border-t border-border/40 flex flex-col gap-3">
                        <button 
                            onClick={() => navigate(`/submit?edit=${id || '123'}`)}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-0.5 active:scale-95 transition-all group"
                        >
                            <Edit3 className="size-4" />
                            Edit Submission
                        </button>
                        <button 
                            onClick={() => navigate('/my-submissions')}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-surface border border-border text-[11px] font-black uppercase tracking-widest text-text-muted hover:bg-surface-hover transition-colors"
                        >
                            <ArrowLeft className="size-4" />
                            Back to Module
                        </button>
                    </div>
                </div>

            </div>

        </div>

      </div>
    </UserAppShell>
  );
};

// UI UTILS
const Section = ({ title, icon: Icon, children }) => (
    <div className="flex flex-col gap-5">
        <h2 className="text-sm font-black uppercase tracking-widest text-content flex items-center gap-2 px-2">
            <Icon className="size-4 text-primary" />
            {title}
        </h2>
        <div className="p-8 rounded-[2.5rem] bg-surface border border-border shadow-xl shadow-black/5">
            {children}
        </div>
    </div>
);

const TopicItem = ({ label, value, color, border }) => (
    <div className="flex flex-col gap-2">
        <span className="text-[9px] font-black uppercase tracking-widest text-text-muted opacity-60 ml-0.5">{label}</span>
        <div className={`px-4 py-3 rounded-xl border ${border} ${color} text-xs font-bold shadow-sm`}>
            {value}
        </div>
    </div>
);

const statusStyle = (status) => {
    switch (status) {
        case 'Approved': return 'bg-green-500/10 border-green-500/20 text-green-500';
        case 'Pending': return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500';
        case 'Rejected': return 'bg-red-500/10 border-red-500/20 text-red-500';
        default: return 'bg-surface border-border text-text-muted';
    }
};

const statusIcon = (status) => {
    switch (status) {
        case 'Approved': return <CheckCircle2 className="size-6" />;
        case 'Pending': return <Clock className="size-6 rotate-12 transition-transform" />;
        case 'Rejected': return <XCircle className="size-6" />;
        default: return <AlertCircle className="size-6" />;
    }
};

const Layers = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.1 6.27a2 2 0 0 0 0 3.46l9.07 4.09a2 2 0 0 0 1.66 0l9.07-4.09a2 2 0 0 0 0-3.46Z"></path><path d="m2.1 14.73 9.07 4.09a2 2 0 0 0 1.66 0l9.07-4.09"></path><path d="m2.1 10.58 9.07 4.09a2 2 0 0 0 1.66 0l9.07-4.09"></path></svg>
);

export default SubmissionDetailsPage;
