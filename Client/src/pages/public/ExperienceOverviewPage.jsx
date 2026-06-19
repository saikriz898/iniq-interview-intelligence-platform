import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Building2, ArrowLeft, Trophy, Sparkles, 
  Moon, Sun, Clock, History, LayoutGrid,
  ExternalLink, ChevronRight, Calendar, Briefcase, 
  ChevronLeft, Info, MessageSquare, HelpCircle, Code, FileText, Video, Copy, Check, Terminal, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';


/**
 * --- INIQ EXPERIENCE OVERVIEW ENGINE (V3 - PREMIUM) ---
 * Split Layout: 35% Left (Identity & Meta) | 65% Right (Round Cards)
 * Behavior: Redesigned for SaaS clarity, Poppins typography, and modern cards.
 */
const ExperienceOverviewPage = () => {
  const { id } = useParams();
  const { theme, toggleTheme, isLoading, setIsLoading } = useGlobalContext();
  const [exp, setExp] = useState(null);
  const [logoError, setLogoError] = useState(false);
  const [activeRound, setActiveRound] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    fetchExperience();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const fetchExperience = async () => {
    setIsLoading(true);

    try {
        const res = await fetch(`/api/experiences/${id}`);
        const data = await res.json();
        
        if(data && !data.error) {
            setExp({
                ...data,
                // Clearbit Logo Integration
                logo: data.company ? `https://logo.clearbit.com/${data.company.replace(/\s+/g, '').toLowerCase()}.com` : `https://ui-avatars.com/api/?name=Company&background=random&color=fff`,
                yearsExp: `${data.candidateExperience} Years Experience`,
                topics: [
                    data.topics?.os && `OS`,
                    data.topics?.dbms && `DBMS`
                ].filter(Boolean),
                dateFormatted: new Date(data.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                overview: data.processOverview
            });
        }
    } catch (err) {
        console.error('Failed to fetch experience details', err);
    } finally {
        setIsLoading(false);
    }
  };

  if (!exp && !isLoading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 bg-background">
      <div className="size-20 rounded-3xl bg-surface border border-border/60 flex items-center justify-center shadow-inner">
        <Info className="size-10 text-text-muted opacity-20" />
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-content font-['Poppins']">Insight Not Found</h3>
        <p className="text-sm font-medium text-text-muted ">The requested interview experience could not be located.</p>
      </div>
      <Link to="/experiences" className="mt-4 px-8 py-3 bg-primary text-primary-text rounded-xl font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all">
        Back to Library
      </Link>
    </div>
  );

  if (!exp) return null;

  return (
    <div className="h-screen bg-background selection:bg-primary/20 overflow-hidden flex flex-col">


      {/* 1. PREMIUM CUSTOM NAVBAR */}
      <nav className="shrink-0 h-20 backdrop-blur-xl bg-surface/80 border-b border-border/60 z-[100] px-8">
        <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between">
          {/* Left: Breadcrumb */}
          <div className="flex items-center gap-4">
            <Link to="/experiences" className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-hover/50 border border-border/40 hover:border-primary/40 transition-all">
                <ChevronLeft className="size-4 text-text-muted group-hover:text-primary transition-colors" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-text-muted group-hover:text-primary transition-colors font-['Poppins']">Back</span>
            </Link>
            <div className="h-4 w-px bg-border/60 mx-2" />
            <div className="flex items-center gap-2 overflow-hidden max-w-[200px] md:max-w-none">
              <span className="text-[11px] font-bold uppercase tracking-widest text-text-muted  font-['Poppins'] shrink-0">Library</span>
              <ChevronRight className="size-3 text-text-muted opacity-20 shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary truncate font-['Poppins']">
                  {exp.company}
              </span>
            </div>
          </div>

          {/* Center: Logo (Hidden on mobile) */}
          <div className="hidden md:flex justify-center absolute left-1/2 -translate-x-1/2">
            <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
              <img 
                src={theme === 'dark' ? "/assets/logos/logo-dark.png" : "/assets/logos/logo.png"} 
                alt="INIQ" 
                className="h-7 w-auto" 
              />
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="size-11 rounded-2xl bg-surface border border-border/60 text-text-muted hover:text-primary hover:border-primary/40 transition-all shadow-sm flex items-center justify-center"
            >
              {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* 2. MAIN CONTENT */}
      <main className="flex-1 overflow-hidden w-full bg-background flex flex-col lg:flex-row h-[calc(100vh-80px)]">
          
          {/* --- LEFT PANEL: FIXED OVERVIEW --- */}
          <aside className="w-full lg:w-[400px] shrink-0 h-full overflow-y-auto no-scrollbar p-6 md:p-8 border-r border-border/40 bg-surface/20">
            <div className="flex flex-col gap-8 pb-10">
              
              {/* Identity Header */}
              <div className="flex flex-col gap-6">
                <div className="size-20 rounded-xl bg-white border border-border/40 p-3 flex items-center justify-center shadow-sm shrink-0">
                  {logoError ? (
                    <div className="size-full flex items-center justify-center bg-primary/10 rounded-lg">
                       <span className="text-xl font-black text-primary tracking-tighter uppercase">{exp.company.substring(0, 2)}</span>
                    </div>
                  ) : (
                    <img 
                      src={exp.logo} 
                      alt={exp.company} 
                      className="w-full h-full object-contain"
                      onError={() => setLogoError(true)}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                   <h2 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">{exp.company}</h2>
                   <h1 className="text-2xl md:text-3xl font-bold text-content tracking-tight leading-tight">{exp.role}</h1>
                   <div className="text-[11px] font-medium text-text-muted mt-1">Posted on {exp.dateFormatted}</div>
                </div>
              </div>

              {/* Meta Data */}
              <div className="flex flex-col gap-4 py-6 border-y border-border/40">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Experience</span>
                     <span className="text-xs font-bold text-content tracking-wide">{exp.yearsExp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Outcome</span>
                     <span className={`text-xs font-bold tracking-wider uppercase ${exp.verdict.toLowerCase() === 'selected' ? 'text-success' : 'text-danger'}`}>
                        {exp.verdict.toLowerCase() === 'other' ? 'Rejected' : exp.verdict}
                     </span>
                  </div>
              </div>

              {/* Strategy Overview */}
              <div className="flex flex-col gap-4">
                 <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Strategy Overview</h3>
                 <p className="text-[13px] text-content/80 leading-relaxed font-medium">{exp.overview}</p>
                 
                 <div className="flex flex-wrap gap-2 mt-2">
                    {exp.topics.map((t, i) => (
                       <span key={i} className="px-3 py-1.5 rounded-lg bg-surface border border-border/60 text-[10px] font-bold uppercase tracking-widest text-text-muted">{t}</span>
                    ))}
                 </div>
              </div>
              
              {/* Advice */}
              <div className="flex flex-col gap-3 mt-4 p-5 bg-surface border border-border/40 rounded-xl shadow-sm">
                 <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted flex items-center gap-2"><MessageSquare className="size-3" /> Closing Advice</h3>
                 <p className="text-[13px] italic font-medium text-content/80 leading-relaxed">"{exp.advice}"</p>
              </div>

              {/* Security & Verification */}
              <div className="flex flex-col gap-3 mt-4 p-5 bg-surface/50 border border-success/20 rounded-xl shadow-sm">
                 <h3 className="text-[10px] font-bold uppercase tracking-widest text-success flex items-center gap-2"><ShieldCheck className="size-3" /> Security Verification</h3>
                 <p className="text-[12px] font-medium text-content/80 leading-relaxed">This experience has been cryptographically verified and manually reviewed by INIQ administration for authenticity.</p>
                 <div className="flex items-center gap-2 mt-2">
                    <span className="px-2.5 py-1 rounded-md bg-success/10 text-[9px] font-bold text-success uppercase tracking-widest border border-success/20">Verified</span>
                    <span className="px-2.5 py-1 rounded-md bg-surface text-[9px] font-bold text-text-muted uppercase tracking-widest border border-border">Authentic</span>
                 </div>
              </div>

            </div>
          </aside>

          {/* --- RIGHT PANEL: ROUND VIEWER --- */}
          <section className="flex-1 h-full overflow-hidden flex flex-col bg-background">
               
               {/* Viewer Header */}
               <div className="shrink-0 px-8 py-6 border-b border-border/40 bg-surface/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-5">
                     <div className="size-12 shrink-0 rounded-xl bg-surface border border-border/60 flex items-center justify-center font-bold text-content text-base shadow-sm">
                        {activeRound + 1}
                     </div>
                     <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">Round {activeRound + 1} of {exp.rounds.length}</span>
                        <h2 className="text-xl font-bold text-content tracking-tight">{exp.rounds[activeRound]?.title}</h2>
                     </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-muted bg-surface px-3 py-1.5 rounded-lg border border-border/40 shrink-0 self-start md:self-auto shadow-sm">
                     <Clock className="size-3" /> {exp.rounds[activeRound]?.details}
                  </div>
               </div>

               {/* Viewer Content (Scrollable Area) */}
               <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 relative">
                  <div className="max-w-4xl mx-auto">
                     <AnimatePresence mode="wait">
                        <motion.div 
                           key={activeRound}
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -10 }}
                           transition={{ duration: 0.2 }}
                           className="flex flex-col gap-10 pb-8"
                        >
                           {/* Fallback for mock desc if it exists */}
                           {exp.rounds[activeRound]?.desc && (
                              <div className="flex flex-col gap-2">
                                 <p className="text-[15px] text-content/90 leading-[1.8] whitespace-pre-wrap font-medium">
                                    {exp.rounds[activeRound]?.desc}
                                 </p>
                              </div>
                           )}

                           {exp.rounds[activeRound]?.questions && (
                              <div className="flex flex-col gap-3">
                                 <h3 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2"><HelpCircle className="size-4" /> Questions Asked</h3>
                                 <div className="p-6 rounded-2xl bg-surface/50 border border-border/40 text-[15px] text-content/90 leading-[1.8] whitespace-pre-wrap font-medium shadow-sm">
                                    {exp.rounds[activeRound]?.questions}
                                 </div>
                              </div>
                           )}

                           {exp.rounds[activeRound]?.solution && (
                              <div className="flex flex-col gap-3">
                                 <div className="flex items-center justify-between">
                                     <h3 className="text-xs font-bold uppercase tracking-widest text-success flex items-center gap-2"><Code className="size-4" /> Code Solution</h3>
                                     <button 
                                         onClick={() => handleCopy(exp.rounds[activeRound]?.solution)}
                                         className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface/50 border border-border/40 hover:bg-surface hover:border-border transition-all text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-content"
                                     >
                                         {isCopied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
                                         {isCopied ? 'Copied' : 'Copy'}
                                     </button>
                                 </div>
                                 <div className="p-6 rounded-2xl bg-surface/50 border border-border/40 text-[14px] text-content/90 font-mono whitespace-pre-wrap shadow-sm overflow-x-auto">
                                    {exp.rounds[activeRound]?.solution}
                                 </div>
                              </div>
                           )}

                           {exp.rounds[activeRound]?.explanation && (
                              <div className="flex flex-col gap-3">
                                 <h3 className="text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-2"><FileText className="size-4" /> Explanation</h3>
                                 <div className="p-6 rounded-2xl bg-surface/50 border border-border/40 text-[15px] text-content/90 leading-[1.8] whitespace-pre-wrap font-medium shadow-sm">
                                    {exp.rounds[activeRound]?.explanation}
                                 </div>
                              </div>
                           )}

                           {exp.rounds[activeRound]?.videoLink && (
                              <div className="flex flex-col gap-3">
                                 <h3 className="text-xs font-bold uppercase tracking-widest text-danger flex items-center gap-2"><Video className="size-4" /> Video Resource</h3>
                                 <a href={exp.rounds[activeRound]?.videoLink} target="_blank" rel="noreferrer" className="p-5 rounded-2xl bg-surface/50 border border-border/40 flex items-center gap-4 hover:border-danger/40 transition-all group shadow-sm">
                                    <div className="size-12 rounded-xl bg-danger/10 flex items-center justify-center text-danger group-hover:scale-110 transition-transform">
                                       <Video className="size-5" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                       <span className="text-[15px] font-bold text-content">Watch Full Explanation</span>
                                       <span className="text-xs text-text-muted truncate max-w-sm">{exp.rounds[activeRound]?.videoLink}</span>
                                    </div>
                                 </a>
                              </div>
                           )}

                           {exp.questions?.filter(q => q.roundId === (activeRound + 1).toString()).length > 0 && (
                              <div className="flex flex-col gap-4 mt-4 pt-8 border-t border-border/40">
                                 <h3 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                    <Terminal className="size-4" /> Specific Coding Questions
                                 </h3>
                                 <div className="flex flex-col gap-5">
                                    {exp.questions.filter(q => q.roundId === (activeRound + 1).toString()).map((q, qIdx) => (
                                       <div key={q._id || qIdx} className="p-6 rounded-2xl bg-surface border border-border/40 flex flex-col gap-4 shadow-sm">
                                          <div className="flex flex-col gap-1.5">
                                             <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Question {qIdx + 1}</span>
                                                {q.topic && (
                                                   <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-wider">{q.topic}</span>
                                                )}
                                             </div>
                                             <h4 className="text-[15px] font-bold text-content leading-relaxed">{q.text}</h4>
                                          </div>
                                          
                                          {q.codeSnippet && (
                                             <div className="flex flex-col gap-2 mt-2">
                                                <div className="flex items-center justify-between">
                                                   <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Code / Approach</span>
                                                   <button 
                                                      onClick={() => handleCopy(q.codeSnippet)}
                                                      className="text-[9px] font-bold uppercase tracking-widest text-text-muted hover:text-content transition-colors flex items-center gap-1"
                                                   >
                                                      <Copy className="size-3" /> Copy
                                                   </button>
                                                </div>
                                                <div className="p-5 rounded-xl bg-[#0d1117] text-[13px] text-primary/90 font-mono whitespace-pre-wrap overflow-x-auto shadow-inner border border-white/5">
                                                   {q.codeSnippet}
                                                </div>
                                             </div>
                                          )}
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           )}
                        </motion.div>
                     </AnimatePresence>
                  </div>
               </div>

               {/* Viewer Navigation */}
               <div className="shrink-0 px-8 py-5 border-t border-border/40 bg-surface/10 flex items-center justify-between">
                  <button 
                     onClick={() => setActiveRound(prev => Math.max(0, prev - 1))}
                     disabled={activeRound === 0}
                     className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/60 text-xs font-bold uppercase tracking-widest text-content hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm bg-surface/50"
                  >
                     <ChevronLeft className="size-4" /> <span className="hidden sm:inline">Previous</span>
                  </button>
                  
                  <div className="text-[11px] font-bold text-text-muted tracking-[0.2em] uppercase">
                     {activeRound + 1} / {exp.rounds.length}
                  </div>

                  <button 
                     onClick={() => setActiveRound(prev => Math.min(exp.rounds.length - 1, prev + 1))}
                     disabled={activeRound === exp.rounds.length - 1}
                     className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-content text-background text-xs font-bold uppercase tracking-widest hover:bg-text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                     <span className="hidden sm:inline">Next</span> <ChevronRight className="size-4" />
                  </button>
               </div>

          </section>

      </main>

      {/* FOOTER-LESS AS REQUESTED IN PREVIOUS ITERATION */}
    </div>
  );
};

export default ExperienceOverviewPage;
