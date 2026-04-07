import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Building2, ArrowLeft, Trophy, Sparkles, 
  Moon, Sun, Clock, History, LayoutGrid,
  ChevronRight, ChevronLeft, Code2, PlayCircle,
  Hash, Layers, Cpu, AlignLeft, Briefcase,
  BarChart3, Box, X, Copy, Check, Info, 
  ListChecks, Target, Zap, Terminal, MessageSquareCode, 
  Network, Users, Lightbulb, Settings, FileText, MonitorPlay
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import PublicPreloader from '../../components/public/PublicPreloader';

/**
 * --- INIQ UNIVERSAL ROUND DETAILS ENGINE (V4) ---
 * Dynamic Right Panel based on Round Type (Coding, System Design, HR, Technical)
 * Triple Modal Support: Solution, Explanation, Video.
 */
const RoundDetailsPage = () => {
  const { expId, roundId } = useParams();
  const navigate = useNavigate();
  const { theme, toggleTheme, isLoading, setIsLoading } = useGlobalContext();

  // Modal State
  const [activeModal, setActiveModal] = useState(null); // { type: 'solution' | 'explanation' | 'video', data: any } | null
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600); 
    window.scrollTo({ top: 0 });
    return () => clearTimeout(timer);
  }, [expId, roundId, setIsLoading]);

  // Modal Scroll Lock
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [activeModal]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // --- MOCK DATA GENERATOR (Universal Types) ---
  const getRoundData = (id) => {
    const rounds = {
      1: {
        type: "Coding",
        title: "Coding Round",
        focus: "Arrays • Graphs • Complexity",
        difficulty: "Medium to Hard",
        overview: "Primary technical screening focusing on DSA and clean implementation.",
        questions: [
          { id: 1, title: "Two Sum Variant", summary: "Optimized pair finding.", tags: ["Arrays"], statement: "Find two indices...", example: "...", answer: "const twoSum = ...", explanation: { summary: "O(n) Hashing approach.", approach: ["Step 1", "Step 2"], complexity: "T:O(N), S:O(N)", edgeCases: "Duplicates" }, video: "Video Solution ID" },
          { id: 2, title: "Graph Traversal", summary: "Shortest path logic.", tags: ["Graphs"], statement: "BFS traversal...", example: "...", answer: "const bfs = ...", explanation: { summary: "Standard BFS.", approach: ["Step 1"], complexity: "T:O(V+E)", edgeCases: "Cycles" }, video: "Video Solution ID" }
        ],
        notes: "Candidate was strong in space complexity analysis."
      },
      2: {
        type: "System Design",
        title: "System Design Round",
        focus: "Scalability • API • Caching",
        difficulty: "Hard",
        overview: "Designing a robust notification service at scale.",
        problem: "Design a scalable notification service for 100M+ users with retry logic and multi-channel preferences.",
        discussionPoints: ["API Design with idempotency", "Database choice (NoSQL vs SQL)", "Caching strategies for preferences", "Rate limiting and throttling"],
        approach: "The candidate proposed an event-driven architecture using Kafka for decoupling and highly available worker pools for delivery.",
        interviewerFocus: "Scalability, partition tolerance, and message delivery guarantees (at-least-once).",
        video: "Design Reference ID"
      },
      3: {
        type: "Technical Discussion",
        title: "Architecture Talk",
        focus: "React • DB Indexing • Microservices",
        difficulty: "Medium",
        overview: "Deeper look into frontend performance and database optimization.",
        questions: [
            { id: 1, title: "React Reconciliation", summary: "Virtual DOM internals.", tags: ["React"], statement: "How does React manage updates?", answer: "Fiber architecture...", explanation: { summary: "Fiber enables concurrent mode.", approach: ["Step 1"], complexity: "O(n)", edgeCases: "Keys" } },
            { id: 2, title: "DB Index Selection", summary: "B-Tree vs Hash index.", tags: ["Database"], statement: "Choose index for range query.", answer: "B-Tree is better...", explanation: { summary: "Monotonicity matters.", approach: ["Step 1"], complexity: "O(log N)", edgeCases: "Skewed data" } }
        ],
        takeaways: "Exhibited deep knowledge of V8 engine internals and SQL execution plans."
      },
      4: {
        type: "Managerial",
        title: "Hiring Manager Round",
        focus: "Leadership • Ownership • Culture",
        difficulty: "Medium",
        overview: "Behavioral and leadership assessment for senior SDE role.",
        questions: [
            { id: 1, title: "Conflict Resolution", summary: "Handling PR review disputes.", type: "Behavioral" },
            { id: 2, title: "Project Impact", summary: "Describing a high-stakes failure.", type: "Behavioral" }
        ],
        responseSummary: "Strong emphasis on radical candor and data-driven project ownership.",
        evaluationAreas: ["Communication", "Ownership", "Team Collaboration"],
        video: "HR Prep Ref ID"
      }
    };
    return rounds[id] || rounds[1];
  };

  const exp = { id: expId || "1", company: "Google", role: "Software Development Engineer", logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg", yearsExp: "1+ years experience" };
  const roundData = getRoundData(Number(roundId));
  const roundsList = [1, 2, 3, 4];
  const goToRound = (id) => navigate(`/experiences/${exp.id}/rounds/${id}`);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // --- MODAL RENDERERS ---
  
  const renderModalContent = () => {
    if (!activeModal) return null;
    const { type, data } = activeModal;

    if (type === 'video') {
       return (
         <div className="flex flex-col gap-8 p-12 h-full overflow-y-auto no-scrollbar">
            <div className="space-y-5">
                <div className="flex flex-col gap-1.5">
                    <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.4em] italic leading-none">THEATER VIEW</h4>
                    <p className="text-xl font-black text-content tracking-tight italic uppercase">Optimized Approach Walkthrough</p>
                </div>
                <div className="aspect-video w-full rounded-[2.5rem] bg-content flex items-center justify-center relative overflow-hidden group border-2 border-border/40 shadow-2xl">
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                        <PlayCircle className="size-20 text-white shadow-2xl" />
                    </div>
                </div>
            </div>
            <div className="p-8 rounded-[2rem] bg-surface-hover/50 border border-border flex items-center gap-5 mt-auto">
                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0"><Info className="size-6 text-primary" /></div>
                <p className="text-sm font-bold text-text-muted italic opacity-80 leading-relaxed">This video covers the full architectural tradeoffs and time complexity analysis discussed during the interview session.</p>
            </div>
         </div>
       );
    }

    if (type === 'solution' || type === 'answer') {
        return (
          <div className="flex flex-col md:flex-row h-full overflow-hidden">
            <div className="w-full md:w-[42%] p-12 border-r border-border/40 overflow-y-auto no-scrollbar bg-surface/30">
               <div className="flex flex-col gap-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2"><MessageSquareCode className="size-4 text-primary" /><span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Problem Description</span></div>
                    <p className="text-base font-bold text-content leading-relaxed">{data.statement || "General architectural prompt for this technical question."}</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2"><Terminal className="size-4 text-primary" /><span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Example Case</span></div>
                    <div className="bg-content/5 rounded-2xl p-8 border border-border font-mono text-[13px] text-text-muted leading-relaxed"><pre className="whitespace-pre-wrap">{data.example || "No sample input defined."}</pre></div>
                  </div>
               </div>
            </div>
            <div className="w-full md:w-[58%] p-12 flex flex-col overflow-hidden bg-[#0f1117]">
               <div className="flex items-center justify-between mb-8">
                  <span className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white/40 uppercase tracking-widest">TECHNICAL RESPONSE</span>
                  {data.answer && <button onClick={() => handleCopy(data.answer)} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20">{isCopied ? <Check className="size-4" /> : <Copy className="size-4" />}{isCopied ? 'Copied' : 'Copy Code'}</button>}
               </div>
               <div className="flex-grow overflow-y-auto no-scrollbar font-mono text-[14px] md:text-base text-white/90 leading-relaxed border-t border-white/5 pt-8">{data.answer || "Candidate's response was verbal and structured around logic tradeoffs."}</div>
            </div>
          </div>
        );
    }

    if (type === 'explanation') {
        const expl = data.explanation || { summary: "Logic explanation was centered around scalability and reliability.", approach: ["Step 1", "Step 2"], complexity: "Varies", edgeCases: "Standard" };
        return (
          <div className="flex flex-col h-full overflow-y-auto no-scrollbar p-12 scroll-smooth">
            <div className="space-y-12">
               <div className="space-y-4">
                  <div className="flex items-center gap-2.5"><Zap className="size-5 text-primary" /><span className="text-[11px] font-black uppercase tracking-widest text-primary italic">Context & Decision Rationale</span></div>
                  <p className="text-xl font-bold text-text-muted italic opacity-95 leading-relaxed bg-surface p-8 rounded-[2.5rem] border border-border shadow-sm">"{expl.summary}"</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                     <div className="flex items-center gap-2.5"><ListChecks className="size-5 text-primary" /><span className="text-[11px] font-black uppercase tracking-widest text-primary italic">Approach Steps</span></div>
                     <div className="flex flex-col gap-4">
                        {expl.approach.map((step, i) => (
                           <div key={i} className="p-6 rounded-[2rem] bg-surface-hover/40 border border-border flex items-center gap-5 hover:border-primary/20 transition-all group">
                              <span className="size-8 rounded-xl bg-primary/10 flex items-center justify-center text-[11px] font-black text-primary group-hover:bg-primary group-hover:text-white transition-all">{i+1}</span>
                              <span className="text-base font-bold text-text-muted/80">{step}</span>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="space-y-12">
                     <div className="space-y-6">
                        <div className="flex items-center gap-2.5"><Target className="size-5 text-primary" /><span className="text-[11px] font-black uppercase tracking-widest text-primary italic">Efficiency Vitals</span></div>
                        <div className="p-8 rounded-[3rem] bg-primary/5 border border-primary/10 flex flex-col gap-2">
                            <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest">Complexity Analysis</span>
                            <p className="text-lg font-black text-primary uppercase tracking-widest leading-none">{expl.complexity}</p>
                        </div>
                     </div>
                     <div className="space-y-6">
                        <div className="flex items-center gap-2.5"><Info className="size-5 text-primary" /><span className="text-[11px] font-black uppercase tracking-widest text-primary italic">Critical Edge Cases</span></div>
                        <p className="text-base font-bold text-text-muted/60 bg-surface-hover/30 p-8 rounded-[3rem] border border-border italic leading-relaxed">"{expl.edgeCases}"</p>
                     </div>
                  </div>
               </div>
               {/* Padding at the bottom for scroll */}
               <div className="h-10"></div>
            </div>
          </div>
        );
    }
    return null;
  };


  // --- DYNAMIC RIGHT PANEL RENDERERS ---

  const renderCodingRound = () => (
    <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Round Overview</h3>
            <p className="text-xl font-bold text-text-muted leading-relaxed italic opacity-80 bg-surface p-8 rounded-[2.5rem] border border-border">{roundData.overview}</p>
        </div>
        <div className="space-y-6">
            <div className="flex items-center justify-between"><h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic leading-none">Questions Asked</h3></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
                {roundData.questions.map((q, idx) => (
                    <motion.div key={q.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="p-10 rounded-[3.5rem] bg-surface border-2 border-border flex flex-col gap-8 shadow-sm group hover:border-primary/20 transition-all">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Question {q.id}</span>
                                <div className="flex items-center gap-1.5">{q.tags.map(t => <span key={t} className="px-2 py-1 rounded-md bg-surface-hover border border-border text-[8px] font-black uppercase tracking-widest text-text-muted/40">{t}</span>)}</div>
                            </div>
                            <h4 className="text-2xl font-black text-content tracking-tight italic uppercase">{q.title}</h4>
                            <p className="text-[13px] font-bold text-text-muted/60 leading-relaxed">{q.summary}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-6 border-t border-border/40 mt-auto">
                            <button onClick={() => setActiveModal({ type: 'answer', data: q })} className="py-4 rounded-xl bg-surface-hover border border-border text-[9px] font-black text-text-muted uppercase tracking-widest hover:text-primary transition-all">Solution</button>
                            <button onClick={() => setActiveModal({ type: 'explanation', data: q })} className="py-4 rounded-xl bg-surface-hover border border-border text-[9px] font-black text-text-muted uppercase tracking-widest hover:text-primary transition-all">Explanation</button>
                            {q.video && <button onClick={() => setActiveModal({ type: 'video', data: q })} className="col-span-2 py-4 rounded-xl bg-primary/20 border-2 border-primary/20 text-[9px] font-black text-primary uppercase tracking-widest hover:bg-primary hover:text-white transition-all">View Walkthrough</button>}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
        <div className="flex flex-col gap-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Additional Notes</h3>
            <p className="text-[14px] font-bold text-text-muted opacity-60 leading-relaxed italic pr-12">{roundData.notes}</p>
        </div>
    </div>
  );

  const renderDesignRound = () => (
    <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Design Problem Statement</h3>
            <div className="p-10 rounded-[3.5rem] bg-surface border-2 border-border flex flex-col gap-6">
                <div className="flex items-center gap-4"><div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center"><Network className="size-5 text-primary" /></div><span className="text-[11px] font-black text-primary uppercase tracking-widest">PROBLEM CORE</span></div>
                <h2 className="text-3xl font-black text-content tracking-tighter italic uppercase">{roundData.problem}</h2>
            </div>
        </div>
        <div className="flex flex-col gap-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Discussion Points</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roundData.discussionPoints.map((p, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-surface border-2 border-border flex items-center gap-4 group hover:border-primary/20 transition-all">
                        <div className="size-8 rounded-xl bg-surface-hover flex items-center justify-center text-[10px] font-black text-text-muted/40 group-hover:text-primary transition-colors">{i+1}</div>
                        <span className="text-[13px] font-bold text-text-muted/60 uppercase tracking-widest">{p}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Candidate Approach</h3>
                <div className="p-10 rounded-[3.5rem] bg-surface/40 border border-border h-full"><p className="text-[14px] font-bold text-text-muted leading-relaxed opacity-60">{roundData.approach}</p></div>
            </div>
            <div className="flex flex-col gap-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Interviewer Focus</h3>
                <div className="p-10 rounded-[3.5rem] bg-surface-hover/30 border border-border h-full"><p className="text-[14px] font-bold text-text-muted leading-relaxed opacity-60 italic">"{roundData.interviewerFocus}"</p></div>
            </div>
        </div>
        <div className="flex flex-col gap-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Video Reference</h3>
            <button onClick={() => setActiveModal({ type: 'video' })} className="w-full aspect-video rounded-[3.5rem] bg-content border-4 border-border/40 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center group-hover:scale-105 transition-transform"><PlayCircle className="size-16 text-white" /></div>
            </button>
        </div>
    </div>
  );

  const renderHRRound = () => (
    <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Round Overview</h3>
            <p className="text-xl font-bold text-text-muted opacity-80 italic">{roundData.overview}</p>
        </div>
        <div className="flex flex-col gap-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Behavioral Assessment</h3>
            <div className="space-y-4">
                {roundData.questions.map((q, i) => (
                    <div key={i} className="p-8 rounded-[3rem] bg-surface border-2 border-border flex items-center justify-between group hover:border-primary/40 transition-all">
                        <div className="flex flex-col gap-2">
                             <span className="text-[9px] font-black text-primary/40 uppercase tracking-widest">Question {i+1}</span>
                             <h4 className="text-xl font-black text-content italic uppercase tracking-tight">{q.title}</h4>
                             <p className="text-[12px] font-bold text-text-muted/40 uppercase tracking-widest italic">{q.summary}</p>
                        </div>
                        <button onClick={() => setActiveModal({ type: 'answer', data: { statement: q.title, explanation: { summary: "Discussed conflict and metrics." } } })} className="px-6 py-3 rounded-xl bg-surface-hover border border-border text-[9px] font-black text-text-muted uppercase tracking-widest hover:text-primary">Review Logic</button>
                    </div>
                ))}
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Candidate Responses</h3>
                <p className="text-[14px] font-bold text-text-muted opacity-60 leading-relaxed">{roundData.responseSummary}</p>
            </div>
            <div className="flex flex-col gap-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Evaluation Focus</h3>
                <div className="flex flex-wrap gap-3">{roundData.evaluationAreas.map(item => <div key={item} className="px-6 py-4 rounded-2xl bg-surface border-2 border-border text-[10px] font-black text-primary uppercase tracking-widest">{item}</div>)}</div>
            </div>
        </div>
    </div>
  );

  const renderTechDiscussion = () => (
    <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Concept Exploration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {roundData.questions.map((q, idx) => (
                    <div key={q.id} className="p-10 rounded-[3.5rem] bg-surface border-2 border-border flex flex-col gap-6 hover:border-primary/20 transition-all">
                        <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center"><Lightbulb className="size-5 text-primary" /></div>
                        <h4 className="text-2xl font-black text-content tracking-tighter italic uppercase">{q.title}</h4>
                        <p className="text-[13px] font-bold text-text-muted/60 leading-relaxed">{q.summary}</p>
                        <div className="mt-auto grid grid-cols-2 gap-2 pt-6 border-t border-border/40">
                             <button onClick={() => setActiveModal({ type: 'answer', data: q })} className="py-4 rounded-xl border border-border text-[9px] font-black text-text-muted uppercase tracking-widest hover:text-primary">Logic</button>
                             <button onClick={() => setActiveModal({ type: 'explanation', data: q })} className="py-4 rounded-xl border border-border text-[9px] font-black text-text-muted uppercase tracking-widest hover:text-primary">Reasoning</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="flex flex-col gap-6"><h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Key Takeaways</h3><p className="text-lg font-bold text-text-muted opacity-80 italic italic">"{roundData.takeaways}"</p></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      <AnimatePresence>{isLoading && <div className="z-[200] relative"><PublicPreloader theme={theme} /></div>}</AnimatePresence>

      {/* UNIVERSAL MODAL SYSTEM */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center px-4 md:px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)} className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className={`relative w-full ${activeModal.type === 'video' ? 'max-w-[820px]' : activeModal.type === 'explanation' ? 'max-w-[760px]' : 'max-w-[1000px]'} bg-surface border-2 border-border shadow-2xl rounded-[3rem] overflow-hidden flex flex-col h-[92vh] max-h-[920px]`}>
              <div className="flex items-center justify-between p-8 border-b border-border/40 shrink-0">
                <div className="flex flex-col gap-1">
                   <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-primary italic leading-none">{activeModal.type.toUpperCase()} PREVIEW</h3>
                   <p className="text-[9px] font-bold text-text-muted/40 uppercase tracking-widest">{exp.company} • {roundData.type} Round • {roundData.number}</p>
                </div>
                <button onClick={() => setActiveModal(null)} className="size-9 rounded-xl bg-surface-hover border border-border flex items-center justify-center text-text-muted hover:text-primary transition-all"><X className="size-4.5" /></button>
              </div>
              <div className="flex-grow overflow-hidden">{renderModalContent()}</div>
              {activeModal.type !== 'video' && <div className="p-6 border-t border-border/40 flex justify-end shrink-0"><button onClick={() => setActiveModal(null)} className="px-6 py-2.5 rounded-xl bg-surface-hover border border-border text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-primary transition-all">Close Instance</button></div>}
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      <nav className="fixed top-0 left-0 right-0 h-20 glass-strong border-b border-border/40 z-[100] px-6">
        <div className="max-w-[1500px] mx-auto h-full grid grid-cols-3 items-center">
          <div className="flex items-center gap-3"><Link to="/experiences" className="text-[10px] font-black text-text-muted hover:text-primary">EXPLORE</Link><span className="text-border/40">/</span><Link to={`/experiences/${exp.id}`} className="text-[10px] font-black text-text-muted truncate max-w-[120px]">{exp.company} - {exp.role}</Link><span className="text-border/40">/</span><span className="text-[10px] font-black text-primary uppercase tracking-widest">{roundData.number}</span></div>
          <div className="flex justify-center"><Link to="/"><img src={theme === 'dark' ? "/assets/logos/logo-dark.svg" : "/assets/logos/logo.svg"} alt="INIQ" className="h-8 w-auto" /></Link></div>
          <div className="flex justify-end"><button onClick={toggleTheme} className="p-3 rounded-2xl bg-surface-hover border border-border text-text-muted hover:text-primary">{theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}</button></div>
        </div>
      </nav>

      <main className="pt-20 max-w-[1500px] mx-auto px-6 h-[calc(100vh-80px)] overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* LEFT SUMMARY PANEL */}
          <aside className="w-full md:w-[28%] border-r border-border/40 p-10 overflow-hidden flex flex-col justify-start">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em] italic uppercase">{roundData.number}</span>
                  <h1 className="text-2xl font-black text-content tracking-tighter leading-tight italic uppercase">{roundData.title}</h1>
              </div>
              <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1 font-black">
                          <span className="text-[8px] uppercase tracking-widest text-text-muted/40 italic">Company</span>
                          <span className="text-[12px] text-content uppercase tracking-tighter">{exp.company}</span>
                      </div>
                      <div className="flex flex-col gap-1 font-black">
                          <span className="text-[8px] uppercase tracking-widest text-text-muted/40 italic">Exp</span>
                          <span className="text-[12px] text-content uppercase tracking-tighter">{exp.yearsExp}</span>
                      </div>
                  </div>
                  <div className="flex flex-col gap-1 font-black">
                      <span className="text-[8px] uppercase tracking-widest text-text-muted/40 italic">Role</span>
                      <span className="text-[12px] text-content uppercase tracking-tighter">{exp.role}</span>
                  </div>
                  <div className="flex flex-col gap-1 font-black">
                      <span className="text-[8px] uppercase tracking-widest text-text-muted/40 italic">Round Type</span>
                      <span className="text-[12px] text-primary italic uppercase tracking-widest leading-none">{roundData.type.toUpperCase()}</span>
                  </div>
                  <div className="flex flex-col gap-1 font-black">
                      <span className="text-[8px] uppercase tracking-widest text-text-muted/40 italic">Focus Area</span>
                      <span className="text-[11px] text-primary italic uppercase tracking-widest leading-tight">{roundData.focus}</span>
                  </div>
                  <div className="flex flex-col gap-1 font-black">
                      <span className="text-[8px] uppercase tracking-widest text-text-muted/40 italic">Difficulty</span>
                      <div className="flex items-center gap-1.5 leading-none">
                          <BarChart3 className="size-3 text-primary" />
                          <span className="text-[11px] text-content uppercase tracking-widest">{roundData.difficulty}</span>
                      </div>
                  </div>
              </div>
              <div className="flex flex-col gap-3 pt-4 border-t border-border/20">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-text-muted/40 italic">Round Switch</span>
                  <div className="flex items-center gap-2">
                      {roundsList.map(r => (
                          <button 
                            key={r} 
                            onClick={() => goToRound(r)} 
                            className={`size-10 rounded-lg glass border-2 flex items-center justify-center text-[10px] font-bold transition-all ${String(r) === String(roundData.id) ? 'border-primary text-primary bg-primary/10 scale-105' : 'border-border/40 text-text-muted hover:border-primary/40'}`}
                          >
                            R{r}
                          </button>
                      ))}
                  </div>
              </div>
              <div className="mt-auto flex flex-col gap-2 pt-6 border-t border-border/20">
                  <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => goToRound(Number(roundId) - 1)} disabled={Number(roundId) <= 1} className="py-3 rounded-xl bg-surface border border-border text-[8px] font-bold text-text-muted/60 hover:text-primary transition-all disabled:opacity-10 uppercase tracking-widest">PREV</button>
                      <button onClick={() => goToRound(Number(roundId) + 1)} disabled={Number(roundId) >= 4} className="py-3 rounded-xl bg-surface border border-border text-[8px] font-bold text-text-muted/60 hover:text-primary transition-all disabled:opacity-10 uppercase tracking-widest">NEXT</button>
                  </div>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT PANEL */}
          <section className="w-full md:w-[72%] h-full overflow-y-auto no-scrollbar bg-surface/50 scroll-smooth relative">
            
            {/* STICKY HEADER - Flush with Top */}
            <div className="sticky top-0 z-[50] glass-strong border-b border-border/40 px-10 py-6 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic leading-none">{roundData.type.toUpperCase()} ROUND</h2>
                    <p className="text-text-muted/60 text-[8px] font-bold uppercase tracking-[0.1em]">STRUCTURED INTERVIEW SESSION • {roundData.focus.toUpperCase()}</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                      onClick={() => goToRound(Number(roundId) - 1)} 
                      disabled={Number(roundId) <= 1} 
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-border/40 text-[8px] font-bold uppercase tracking-widest text-text-muted hover:text-primary hover:border-primary/40 transition-all disabled:opacity-5 bg-surface/50"
                    >
                      <ChevronLeft className="size-3" /> PREV
                    </button>
                    <button 
                      onClick={() => goToRound(Number(roundId) + 1)} 
                      disabled={Number(roundId) >= 4} 
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-border/40 text-[8px] font-bold uppercase tracking-widest text-text-muted hover:text-primary hover:border-primary/40 transition-all disabled:opacity-5 bg-surface/50"
                    >
                      NEXT <ChevronRight className="size-3" />
                    </button>
                </div>
            </div>

            {/* CONTENT AREA FLUSH START */}
            <div className="px-10 pt-8 pb-32">
              {roundData.type === "Coding" && renderCodingRound()}
              {roundData.type === "System Design" && renderDesignRound()}
              {roundData.type === "Technical Discussion" && renderTechDiscussion()}
              {roundData.type === "Managerial" && renderHRRound()}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default RoundDetailsPage;
