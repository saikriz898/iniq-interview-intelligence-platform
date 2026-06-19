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


/**
 * --- INIQ UNIVERSAL ROUND DETAILS ENGINE (V4) ---
 * Dynamic Right Panel based on Round Type (Coding, System Design, HR, Technical)
 * Triple Modal Support: Solution, Explanation, Video.
 */
const RoundDetailsPage = () => {
  const { expId, roundId } = useParams();
  const navigate = useNavigate();
  const { theme, toggleTheme, isLoading, setIsLoading } = useGlobalContext();

  const [exp, setExp] = useState(null);
  const [roundData, setRoundData] = useState(null);
  const [activeModal, setActiveModal] = useState(null); 
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    fetchRoundData();
    window.scrollTo({ top: 0 });
  }, [expId, roundId]);

  const fetchRoundData = async () => {
    setIsLoading(true);
    try {
        const res = await fetch(`http://localhost:5000/api/experiences/${expId}`);
        const data = await res.json();
        if (res.ok) {
            setExp(data);
            const idx = Number(roundId) - 1;
            if (data.rounds && data.rounds[idx]) {
                const r = data.rounds[idx];
                setRoundData({
                    id: idx + 1,
                    number: `Round ${idx + 1}`,
                    type: r.title.toLowerCase().includes('design') ? 'System Design' : (r.title.toLowerCase().includes('hr') ? 'Managerial' : 'Coding'),
                    title: r.title,
                    focus: r.title,
                    difficulty: 'Medium',
                    overview: `Verification node for ${r.title}.`,
                    questions: r.questions,
                    solution: r.solution,
                    explanation: r.explanation,
                    videoLink: r.videoLink
                });
            }
        }
    } catch (err) {
        console.error('Failed to fetch round data', err);
    } finally {
        setIsLoading(false);
    }
  };

  const goToRound = (id) => navigate(`/experiences/${expId}/rounds/${id}`);

  if (!roundData && !isLoading) return <div className="h-screen flex items-center justify-center font-black uppercase tracking-widest text-text-muted">Round Node Not Found.</div>;
  if (!roundData || !exp) return null;

  const roundsList = exp.rounds.map((_, i) => i + 1);

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
                        <PlayCircle className="size-20 text-primary-text shadow-2xl" />
                    </div>
                </div>
            </div>
            <div className="p-8 rounded-[2rem] bg-surface-hover/50 border border-border flex items-center gap-5 mt-auto">
                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0"><Info className="size-6 text-primary" /></div>
                <p className="text-sm font-bold text-text-muted italic  leading-relaxed">This video covers the full architectural tradeoffs and time complexity analysis discussed during the interview session.</p>
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
                  <span className="px-5 py-2.5 rounded-xl bg-card-bg border border-theme text-[10px] font-black text-primary-text/40 uppercase tracking-widest">TECHNICAL RESPONSE</span>
                  {data.answer && <button onClick={() => handleCopy(data.answer)} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-text text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20">{isCopied ? <Check className="size-4" /> : <Copy className="size-4" />}{isCopied ? 'Copied' : 'Copy Code'}</button>}
               </div>
               <div className="flex-grow overflow-y-auto no-scrollbar font-mono text-[14px] md:text-base text-primary-text/90 leading-relaxed border-t border-theme pt-8">{data.answer || "Candidate's response was verbal and structured around logic tradeoffs."}</div>
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
                              <span className="size-8 rounded-xl bg-primary/10 flex items-center justify-center text-[11px] font-black text-primary group-hover:bg-primary group-hover:text-primary-text transition-all">{i+1}</span>
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
            <p className="text-xl font-bold text-text-muted leading-relaxed italic  bg-surface p-8 rounded-[2.5rem] border border-border">{roundData.overview}</p>
        </div>
        <div className="space-y-6">
            <div className="flex items-center justify-between"><h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic leading-none">Questions & Challenges</h3></div>
            <div className="p-10 rounded-[3.5rem] bg-surface border-2 border-border flex flex-col gap-8 shadow-sm">
                <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Core Inquiry</span>
                    <p className="text-lg font-bold text-text-muted/80 leading-relaxed whitespace-pre-wrap">{roundData.questions}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-6 border-t border-border/40 mt-auto">
                    <button onClick={() => setActiveModal({ type: 'answer', data: { statement: roundData.questions, answer: roundData.solution } })} className="py-4 rounded-xl bg-surface-hover border border-border text-[9px] font-black text-text-muted uppercase tracking-widest hover:text-primary transition-all">View Solution</button>
                    <button onClick={() => setActiveModal({ type: 'explanation', data: { explanation: { summary: roundData.explanation, approach: ["Reviewing logic...", "Verifying complexity..."], complexity: "N/A", edgeCases: "Standard" } } })} className="py-4 rounded-xl bg-surface-hover border border-border text-[9px] font-black text-text-muted uppercase tracking-widest hover:text-primary transition-all">Explanation</button>
                    {roundData.videoLink && <a href={roundData.videoLink} target="_blank" rel="noopener noreferrer" className="col-span-2 py-4 rounded-xl bg-primary/20 border-2 border-primary/20 text-[9px] font-black text-primary uppercase tracking-widest hover:bg-primary hover:text-primary-text transition-all text-center">Watch Walkthrough</a>}
                </div>
            </div>
        </div>
    </div>
  );

  const renderDesignRound = () => (
    <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Design Problem Statement</h3>
            <div className="p-10 rounded-[3.5rem] bg-surface border-2 border-border flex flex-col gap-6">
                <div className="flex items-center gap-4"><div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center"><Network className="size-5 text-primary" /></div><span className="text-[11px] font-black text-primary uppercase tracking-widest">PROBLEM CORE</span></div>
                <h2 className="text-2xl font-black text-content tracking-tighter italic uppercase whitespace-pre-wrap">{roundData.questions}</h2>
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Candidate Solution</h3>
                <div className="p-10 rounded-[3.5rem] bg-surface/40 border border-border h-full"><pre className="text-[13px] font-mono text-text-muted leading-relaxed  whitespace-pre-wrap">{roundData.solution}</pre></div>
            </div>
            <div className="flex flex-col gap-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Technical Rationale</h3>
                <div className="p-10 rounded-[3.5rem] bg-surface-hover/30 border border-border h-full"><p className="text-[14px] font-bold text-text-muted leading-relaxed  italic whitespace-pre-wrap">"{roundData.explanation}"</p></div>
            </div>
        </div>
        {roundData.videoLink && (
            <div className="flex flex-col gap-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Video Reference</h3>
                <a href={roundData.videoLink} target="_blank" rel="noopener noreferrer" className="w-full aspect-video rounded-[3.5rem] bg-content border-4 border-border/40 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center group-hover:scale-105 transition-transform"><PlayCircle className="size-16 text-primary-text" /></div>
                </a>
            </div>
        )}
    </div>
  );

  const renderHRRound = () => (
    <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Behavioral Context</h3>
            <p className="text-xl font-bold text-text-muted  italic whitespace-pre-wrap">{roundData.questions}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Response Strategy</h3>
                <div className="p-8 rounded-[3rem] bg-surface border-2 border-border h-full"><p className="text-[14px] font-bold text-text-muted  leading-relaxed whitespace-pre-wrap">{roundData.explanation}</p></div>
            </div>
            <div className="flex flex-col gap-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Key Outcomes</h3>
                <div className="p-8 rounded-[3rem] bg-primary/5 border border-primary/10 h-full"><p className="text-[14px] font-black text-primary uppercase tracking-widest leading-relaxed whitespace-pre-wrap">{roundData.solution}</p></div>
            </div>
        </div>
    </div>
  );

  const renderTechDiscussion = () => (
    <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Discussion Node</h3>
            <div className="p-10 rounded-[3.5rem] bg-surface border-2 border-border flex flex-col gap-6 hover:border-primary/20 transition-all">
                <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center"><Lightbulb className="size-5 text-primary" /></div>
                <h4 className="text-2xl font-black text-content tracking-tighter italic uppercase whitespace-pre-wrap">{roundData.questions}</h4>
                <div className="mt-auto grid grid-cols-2 gap-2 pt-6 border-t border-border/40">
                     <button onClick={() => setActiveModal({ type: 'answer', data: { statement: roundData.questions, answer: roundData.solution } })} className="py-4 rounded-xl border border-border text-[9px] font-black text-text-muted uppercase tracking-widest hover:text-primary">Logic Trace</button>
                     <button onClick={() => setActiveModal({ type: 'explanation', data: { explanation: { summary: roundData.explanation, approach: ["Analyzing context...", "Verifying constraints..."], complexity: "N/A", edgeCases: "Standard" } } })} className="py-4 rounded-xl border border-border text-[9px] font-black text-text-muted uppercase tracking-widest hover:text-primary">Reasoning</button>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">


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
          <div className="flex justify-center"><Link to="/"><img src={theme === 'dark' ? "/assets/logos/logo-dark.png" : "/assets/logos/logo.png"} alt="INIQ" className="h-8 w-auto" /></Link></div>
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
