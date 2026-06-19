import React, { useState, useEffect } from 'react';
import { 
  Building2, ArrowLeft, ArrowRight, Clock, Code,
  MessageCircle, HelpCircle, FileText, ChevronRight, ChevronDown, ChevronUp, PlayCircle, Copy, CheckCircle2,
  Terminal, Layers
} from 'lucide-react';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const ViewRoundsPage = () => {
  const { theme, toggleTheme, isLoading } = useGlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [submission, setSubmission] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [showMobileList, setShowMobileList] = useState(true);

  const [copiedStates, setCopiedStates] = useState({});
  const handleCopy = (id, text) => {
      if(!text) return;
      navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
          setCopiedStates(prev => ({ ...prev, [id]: false }));
      }, 2000);
  };

  useEffect(() => {
    fetchSubmission();
  }, [id]);

  useEffect(() => {
    const active = searchParams.get('active');
    if (active !== null && !isNaN(active)) {
        setActiveIdx(Number(active));
    }
  }, [searchParams]);

  const fetchSubmission = async () => {
    const token = localStorage.getItem('iniq_token');
    try {
      const res = await fetch(`http://localhost:5000/api/experiences/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setSubmission(data);
      else toast.error('Failed to load experience');
    } catch (err) {
      toast.error('Server error');
    }
  };

  if (!submission) return <div className="h-screen flex items-center justify-center text-sm font-medium text-text-muted">Loading rounds...</div>;

  const activeRound = submission.rounds[activeIdx] || submission.rounds[0];

  return (
    <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
      
      {/* Top Navigation Bar */}
      <div className="w-full h-16 bg-surface border-b border-border/40 flex items-center px-6 lg:px-12 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4 text-sm font-bold text-text-muted w-full max-w-[1400px] mx-auto">
            {/* Mobile Back to List Button */}
            {!showMobileList && (
                <button 
                    onClick={() => setShowMobileList(true)}
                    className="md:hidden hover:text-primary text-text-muted transition-colors flex items-center justify-center size-8 bg-background rounded-full border border-border/40 hover:border-primary/30 shrink-0"
                    title="Back to Rounds List"
                >
                    <ArrowLeft className="size-3.5" />
                </button>
            )}

            {/* Desktop Back to Overview Button / Hidden on mobile when viewing details */}
            <Link 
                to={`/my-submissions/${submission._id}`} 
                className={`hover:text-primary text-text-muted transition-colors items-center justify-center size-8 bg-background rounded-full border border-border/40 hover:border-primary/30 shrink-0 ${!showMobileList ? 'hidden md:flex' : 'flex'}`}
                title="Back to Overview"
            >
                <ArrowLeft className="size-3.5" />
            </Link>
            
            <ChevronRight className="size-3 opacity-30 hidden sm:block shrink-0" />
            <div className="hidden sm:flex items-center gap-2">
                <Building2 className="size-4 text-primary" />
                <span className="text-content truncate max-w-[200px]">{submission.company}</span>
            </div>
            <ChevronRight className="size-3 opacity-30 hidden sm:block" />
            <span className="text-content font-black hidden sm:block">Round Deep-Dive</span>
        </div>
      </div>

      {/* Dual Panel Layout */}
      <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row h-[calc(100%-64px)] overflow-hidden bg-background">
        
        {/* Left Sidebar: Rounds Navigation */}
        <div className={`w-full md:w-80 shrink-0 bg-surface/50 md:border-r border-border/40 flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 ${showMobileList ? 'flex' : 'hidden md:flex'}`}>
            <div className="p-6 border-b border-border/40 flex flex-col gap-1 bg-surface">
                <h2 className="text-xs font-black text-content uppercase tracking-[0.2em] font-['Inter'] flex items-center gap-2">
                   <Layers className="size-3.5 text-primary" /> Rounds Directory
                </h2>
                <p className="text-[11px] font-medium text-text-muted">{submission.rounds.length} rounds recorded</p>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 pb-24 md:pb-4 flex flex-col gap-2 relative">
                <div className="absolute left-8 top-8 bottom-8 w-[2px] bg-border/40 rounded-full z-0"></div>
                {submission.rounds.map((round, idx) => {
                    const isActive = idx === activeIdx;
                    const roundQuestions = submission.questions?.filter(q => String(q.roundId) === String(idx + 1) || String(q.roundId) === String(round._id) || String(q.roundId) === String(round.id) || (!q.roundId && idx === 0)) || [];
                    
                    return (
                        <div key={idx} className="flex flex-col gap-1 relative z-10">
                            <button
                                onClick={() => {
                                    if (activeIdx !== idx) {
                                        setActiveIdx(idx);
                                        setSearchParams({ active: idx });
                                        setExpandedQuestionId(null);
                                    } else {
                                        setShowMobileList(false);
                                    }
                                }}
                                className={`w-full text-left p-4 rounded-2xl flex items-start gap-4 transition-all ${
                                    isActive 
                                    ? 'bg-surface border-border/80 border shadow-lg shadow-black/5 ring-1 ring-primary/20 scale-[1.02] origin-left' 
                                    : 'bg-transparent border-transparent border hover:bg-surface/50 hover:border-border/60'
                                }`}
                            >
                                <div className={`size-8 rounded-full flex items-center justify-center shrink-0 text-xs font-black transition-colors ${isActive ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-surface border-2 border-border/60 text-text-muted group-hover:border-primary/40'}`}>
                                    {idx + 1}
                                </div>
                                <div className="flex flex-col gap-1 overflow-hidden pt-1 flex-1">
                                    <span className={`text-sm font-bold truncate transition-colors ${isActive ? 'text-primary' : 'text-content'}`}>
                                        {round.title}
                                    </span>
                                    <span className="text-[10px] font-medium text-text-muted truncate">
                                       {roundQuestions.length > 0 ? `${roundQuestions.length} Question${roundQuestions.length > 1 ? 's' : ''}` : 'Click to view details'}
                                    </span>
                                </div>
                                {roundQuestions.length > 0 && (
                                    <div className="size-6 rounded-full flex items-center justify-center shrink-0">
                                        <ChevronDown className={`size-4 text-text-muted transition-transform ${isActive ? 'rotate-180 text-primary' : ''}`} />
                                    </div>
                                )}
                            </button>

                            {/* Dropdown for questions in the sidebar */}
                            <AnimatePresence>
                                {isActive && roundQuestions.length > 0 && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="flex flex-col gap-1 pl-12 pr-2 py-1 overflow-hidden"
                                    >
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowMobileList(false);
                                            }}
                                            className="text-left text-[12px] font-black uppercase tracking-wider py-2 px-3 rounded-xl transition-all border border-transparent text-primary hover:bg-primary/10 flex items-center justify-between group/btn mb-1"
                                        >
                                            View Full Round <ArrowRight className="size-3 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                        {roundQuestions.map((q, qIdx) => (
                                            <button
                                                key={qIdx}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setExpandedQuestionId(q._id);
                                                    setShowMobileList(false);
                                                }}
                                                className={`text-left text-[12px] font-medium py-2 px-3 rounded-xl truncate transition-all border ${expandedQuestionId === q._id ? 'bg-primary/10 text-primary border-primary/20 shadow-sm' : 'bg-transparent text-text-muted hover:bg-surface/50 hover:text-content border-transparent'}`}
                                            >
                                                {q.text}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Right Main Area: Round Content */}
        <div className={`flex-1 bg-[#050505] relative overflow-hidden flex-col min-w-0 ${!showMobileList ? 'flex' : 'hidden md:flex'}`}>
            
            {/* Abstract Animated Background */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
               <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-primary/20 blur-[120px] rounded-full rotate-12 animate-pulse" style={{ animationDuration: '8s' }} />
               <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[120%] bg-accent/10 blur-[100px] rounded-full -rotate-12 animate-pulse" style={{ animationDuration: '12s' }} />
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar relative z-10 w-full h-full min-w-0 max-w-full">
                <AnimatePresence mode="wait">
                  {activeRound && (
                      <motion.div 
                          key={activeIdx}
                          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="max-w-4xl mx-auto w-full max-w-full p-4 pb-24 md:p-6 lg:p-12 flex flex-col gap-8 md:gap-12 min-w-0 overflow-x-hidden"
                      >
                      
                      {/* Header */}
                      <div className="flex flex-col gap-4">
                          <span className="w-fit px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 shadow-sm">
                              Round {activeIdx + 1}
                          </span>
                          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-content to-text-muted tracking-tight font-['Inter'] pb-2">
                              {activeRound.title}
                          </h1>
                      </div>

                      {/* Content Blocks */}
                      <div className="flex flex-col gap-12 min-w-0">
                          
                          {/* Questions Section */}
                          {(activeRound.questions || activeRound.desc) && (
                              <section className="flex flex-col gap-5">
                                  <h3 className="text-xs font-black text-content uppercase tracking-[0.2em] flex items-center gap-3 border-b border-border/40 pb-4">
                                      <div className="p-1.5 rounded-lg bg-surface border border-border/60"><HelpCircle className="size-4 text-text-muted" /></div>
                                      Questions Asked
                                  </h3>
                                  <div className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-surface/30 border border-border/40 shadow-sm hover:shadow-md transition-shadow w-full overflow-hidden">
                                      <p className="text-[15px] text-text-muted leading-[1.8] whitespace-pre-wrap break-words font-medium w-full">
                                          {activeRound.questions || activeRound.desc}
                                      </p>
                                  </div>
                              </section>
                          )}

                          {/* Specific Coding Questions Section */}
                          {submission.questions && submission.questions.filter(q => String(q.roundId) === String(activeIdx + 1) || String(q.roundId) === String(activeRound._id) || String(q.roundId) === String(activeRound.id) || (!q.roundId && activeIdx === 0)).length > 0 && (
                              <section className="flex flex-col gap-6 min-w-0">
                                  <h3 className="text-xs font-black text-content uppercase tracking-[0.2em] flex items-center gap-3 border-b border-border/40 pb-4">
                                      <div className="p-1.5 rounded-lg bg-surface border border-border/60"><Code className="size-4 text-primary" /></div>
                                      Specific Questions
                                  </h3>
                                  {submission.questions.filter(q => String(q.roundId) === String(activeIdx + 1) || String(q.roundId) === String(activeRound._id) || String(q.roundId) === String(activeRound.id) || (!q.roundId && activeIdx === 0)).map((q, idx) => {
                                      const isExpanded = expandedQuestionId === q._id;
                                      return (
                                          <motion.div 
                                              initial={{ opacity: 0, y: 20 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              transition={{ delay: 0.1 + (idx * 0.1) }}
                                              key={idx} 
                                              className={`flex flex-col rounded-3xl bg-surface border border-border/60 shadow-sm transition-all relative overflow-hidden min-w-0 ${isExpanded ? 'ring-1 ring-primary/30' : 'hover:shadow-md hover:border-primary/20'}`}
                                          >
                                              {/* Clickable Header */}
                                              <div 
                                                  className="flex items-center justify-between gap-3 md:gap-4 p-4 md:p-8 cursor-pointer select-none group/header"
                                                  onClick={() => setExpandedQuestionId(isExpanded ? null : q._id)}
                                              >
                                                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 flex-1 min-w-0 pr-2 md:pr-4">
                                                      <h4 className="text-[15px] md:text-lg font-bold text-content leading-snug font-['Inter'] tracking-tight group-hover/header:text-primary transition-colors line-clamp-2">{q.text}</h4>
                                                      {q.topic && (
                                                          <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest whitespace-nowrap w-fit border border-primary/20 shrink-0 mt-2 md:mt-0">
                                                              {q.topic}
                                                          </span>
                                                      )}
                                                  </div>
                                                  <div className={`size-8 rounded-full flex items-center justify-center shrink-0 transition-all ${isExpanded ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-background border border-border/40 text-text-muted group-hover/header:border-primary/30 group-hover/header:text-primary'}`}>
                                                      {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                                                  </div>
                                              </div>
                                              
                                              {/* Expandable Content */}
                                              <AnimatePresence>
                                                  {isExpanded && (
                                                      <motion.div
                                                          initial={{ height: 0, opacity: 0 }}
                                                          animate={{ height: "auto", opacity: 1 }}
                                                          exit={{ height: 0, opacity: 0 }}
                                                          transition={{ duration: 0.3, ease: "easeInOut" }}
                                                          className="w-full overflow-hidden"
                                                      >
                                                          <div className="p-4 md:p-8 pt-0 flex flex-col gap-5 md:gap-6 w-full max-w-full min-w-0">
                                                              {/* Unified Code & Output Block */}
                                                              {(q.codeSnippet || q.output) && (
                                                                  <div className="rounded-xl md:rounded-2xl overflow-hidden border border-border/60 shadow-2xl flex flex-col bg-[#0d1117] relative group/exec w-full min-w-0">
                                                  
                                                  {/* Code Header */}
                                                  <div className="bg-gradient-to-b from-[#161b22] to-[#0d1117] px-4 py-3 flex items-center justify-between border-b border-white/5">
                                                      <div className="flex items-center gap-2">
                                                          <div className="size-3 rounded-full bg-[#ff5f56] shadow-[inset_0_0_4px_rgba(0,0,0,0.5)]"></div>
                                                          <div className="size-3 rounded-full bg-[#ffbd2e] shadow-[inset_0_0_4px_rgba(0,0,0,0.5)]"></div>
                                                          <div className="size-3 rounded-full bg-[#27c93f] shadow-[inset_0_0_4px_rgba(0,0,0,0.5)]"></div>
                                                          <span className="ml-3 text-[11px] font-bold text-white/40 tracking-wider uppercase">Solution.txt</span>
                                                      </div>
                                                      <button
                                                          onClick={() => handleCopy(`vr-${q._id}`, q.codeSnippet)}
                                                          className="px-2 py-1 rounded border border-white/10 hover:bg-white/5 text-white/50 hover:text-white transition-all flex items-center gap-1.5 opacity-0 group-hover/exec:opacity-100"
                                                          title="Copy Code"
                                                      >
                                                          {copiedStates[`vr-${q._id}`] ? (
                                                              <>
                                                                  <CheckCircle2 className="size-3 text-success" />
                                                                  <span className="text-[9px] font-bold uppercase tracking-wider text-success">Copied</span>
                                                              </>
                                                          ) : (
                                                              <>
                                                                  <Copy className="size-3" />
                                                                  <span className="text-[9px] font-bold uppercase tracking-wider">Copy</span>
                                                              </>
                                                          )}
                                                      </button>
                                                  </div>

                                                  {/* Code Body */}
                                                  {q.codeSnippet && (
                                                    <div className="w-full max-w-full overflow-hidden">
                                                        <pre className="p-4 md:p-6 overflow-x-auto text-[13px] md:text-[14px] font-mono text-white/90 leading-[1.7] custom-scrollbar selection:bg-primary/30">
                                                            <code>{q.codeSnippet}</code>
                                                        </pre>
                                                    </div>
                                                  )}

                                                  {/* Output Body (Attached) */}
                                                  {q.output && (
                                                    <div className="border-t border-white/5 bg-[#0a0d12] w-full overflow-hidden">
                                                        <div className="bg-[#161b22]/50 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <Terminal className="size-3 text-white/40" />
                                                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Terminal Output</span>
                                                            </div>
                                                            <button
                                                                onClick={() => handleCopy(`vr-out-${q._id}`, q.output)}
                                                                className="px-2 py-1 rounded hover:bg-white/5 text-white/40 hover:text-white transition-all flex items-center gap-1.5 opacity-0 group-hover/exec:opacity-100"
                                                            >
                                                                {copiedStates[`vr-out-${q._id}`] ? (
                                                                    <CheckCircle2 className="size-3 text-success" />
                                                                ) : (
                                                                    <Copy className="size-3" />
                                                                )}
                                                            </button>
                                                        </div>
                                                        <div className="w-full max-w-full overflow-hidden">
                                                            <pre className="p-4 overflow-x-auto text-[12px] md:text-[13px] font-mono text-white/60 leading-relaxed custom-scrollbar">
                                                                <code>{q.output}</code>
                                                            </pre>
                                                        </div>
                                                    </div>
                                                  )}
                                              </div>
                                          )}

                                                              {(q.explanation) && (
                                                                  <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-primary/5 border border-primary/10 text-[13px] md:text-[14px] font-medium text-text-muted leading-[1.8] whitespace-pre-wrap break-words relative w-full overflow-hidden">
                                                                      <div className="absolute top-0 left-0 w-1 h-full bg-primary/40 rounded-l-2xl"></div>
                                                                      <strong className="text-content text-sm font-black uppercase tracking-wider block mb-2">Explanation</strong>
                                                                      <p className="break-words w-full overflow-hidden">{q.explanation}</p>
                                                                  </div>
                                                              )}
                                                          </div>
                                                      </motion.div>
                                                  )}
                                              </AnimatePresence>
                                          </motion.div>
                                      );
                                  })}
                              </section>
                          )}

                          {/* Explanation Section */}
                          {activeRound.explanation && (
                              <section className="flex flex-col gap-5">
                                  <h3 className="text-xs font-black text-content uppercase tracking-[0.2em] flex items-center gap-3 border-b border-border/40 pb-4">
                                      <div className="p-1.5 rounded-lg bg-surface border border-border/60"><MessageCircle className="size-4 text-text-muted" /></div>
                                      General Explanation
                                  </h3>
                                  <div className="p-6 md:p-8 rounded-3xl bg-surface/30 border border-border/40 shadow-sm hover:shadow-md transition-shadow">
                                      <p className="text-[15px] text-text-muted leading-[1.8] whitespace-pre-wrap font-medium">
                                          {activeRound.explanation}
                                      </p>
                                  </div>
                              </section>
                          )}

                          {/* Video Link */}
                          {activeRound.videoLink && (
                              <section className="flex flex-col gap-4 pt-4 border-t border-border/40">
                                  <a 
                                      href={activeRound.videoLink} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="inline-flex items-center justify-between p-6 rounded-3xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 hover:border-primary/40 transition-all group"
                                  >
                                      <div className="flex items-center gap-4">
                                          <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                              <PlayCircle className="size-6" />
                                          </div>
                                          <div className="flex flex-col gap-1">
                                              <span className="text-sm font-bold text-content">Watch Related Video</span>
                                              <span className="text-[11px] font-medium text-text-muted">External Resource</span>
                                          </div>
                                      </div>
                                      <ArrowRight className="size-5 text-text-muted group-hover:text-primary transition-colors group-hover:translate-x-1" />
                                  </a>
                              </section>
                          )}

                      </div>
                          </motion.div>
                      )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    </UserAppShell>
  );
};

export default ViewRoundsPage;
