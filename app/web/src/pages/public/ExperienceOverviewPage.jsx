import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Building2, ArrowLeft, Trophy, Sparkles, 
  Moon, Sun, Clock, History, LayoutGrid,
  ExternalLink, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import PublicPreloader from '../../components/public/PublicPreloader';
import MobilePreloader from '../../components/mobile/MobilePreloader';

/**
 * --- INIQ EXPERIENCE OVERVIEW ENGINE (V2) ---
 * Split Layout: 35% Left (Identity & Meta) | 65% Right (Round Cards)
 * Behavior: Fixed Navbar, Sticky Left Details, Scrolling Right Cards
 */
const ExperienceOverviewPage = () => {
  const { id } = useParams();
  const { theme, toggleTheme, isLoading, setIsLoading } = useGlobalContext();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800); 
    window.scrollTo({ top: 0 });
    return () => clearTimeout(timer);
  }, [id, setIsLoading]);

  // Mock Data (Matches Requirement)
  const exp = {
    company: "Google",
    role: "Software Development Engineer",
    logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg",
    yearsExp: "1+ years experience",
    verdict: "Selected",
    overview: "A 4-round interview process focused on coding, problem solving, system design, and final managerial evaluation.",
    topics: ["DSA", "HLD", "LLD"],
    advice: "Practice arrays, graphs, and explain your thinking clearly in each round. Focus on time and space complexity analysis.",
    rounds: [
      { 
        id: 1, 
        number: "Round 1", 
        title: "Coding Round", 
        desc: "Focused on DSA-based coding and problem-solving ability.",
        details: "Arrays, Graphs, Complexity" 
      },
      { 
        id: 2, 
        number: "Round 2", 
        title: "DSA / Problem Solving", 
        desc: "Logical reasoning and optimization challenges under time pressure.",
        details: "Algorithms, Efficiency" 
      },
      { 
        id: 3, 
        number: "Round 3", 
        title: "System Design", 
        desc: "High-level and low-level architecture discussion for scalable systems.",
        details: "Architecture, Scalability" 
      },
      { 
        id: 4, 
        number: "Round 4", 
        title: "Hiring Manager", 
        desc: "Behavioral assessment and project deep-dives with leadership.",
        details: "Culture Fit, Impact" 
      }
    ]
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      <AnimatePresence>
        {isLoading && (
          <>
            <div className="md:block hidden"><PublicPreloader theme={theme} /></div>
            <div className="md:hidden block"><MobilePreloader theme={theme} /></div>
          </>
        )}
      </AnimatePresence>

      {/* 1. DETAIL NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 h-20 glass-strong border-b border-border/40 z-[100] px-6">
        <div className="max-w-[1500px] mx-auto h-full grid grid-cols-3 items-center">
          {/* Left: Breadcrumb */}
          <div className="flex items-center gap-3">
            <Link to="/experiences" className="group flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-text-muted group-hover:text-primary transition-colors">EXPLORE</span>
            </Link>
            <span className="text-border/40 font-thin">/</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary truncate max-w-[250px]">
                {exp.company} - {exp.role}
            </span>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={theme === 'dark' ? "/assets/logos/logo-dark.svg" : "/assets/logos/logo.svg"} 
                alt="INIQ" 
                className="h-8 w-auto" 
              />
            </Link>
          </div>

          {/* Right: Theme Toggle */}
          <div className="flex justify-end gap-4">
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-surface-hover/50 border border-border/40 text-text-muted hover:text-primary transition-all shadow-sm"
            >
              {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* 2. MAIN SPLIT CONTENT */}
      <main className="pt-20 max-w-[1500px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 py-12">
          
          {/* --- LEFT DETAILS PANEL (35%) --- */}
          <aside className="w-full md:w-[35%]">
            <div className="md:sticky md:top-32 flex flex-col gap-10">
              
              {/* Company & Role */}
              <div className="flex flex-col gap-6">
                <div className="size-24 rounded-[2rem] bg-surface border-2 border-border/40 p-5 shadow-2xl shadow-primary/5">
                  <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col gap-2">
                   <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] italic leading-none">{exp.company}</h2>
                   <h1 className="text-4xl font-black text-content tracking-tighter leading-[1.1]">{exp.role}</h1>
                </div>
              </div>

              {/* Stats & Verdict */}
              <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted/40">Candidate Experience</span>
                    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-surface-hover border border-border/40 w-fit">
                        <History className="size-4 text-primary" />
                        <span className="text-xs font-bold text-content tracking-wide">{exp.yearsExp}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted/40">Final Verdict</span>
                    <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 w-fit shadow-lg ${exp.verdict === 'Selected' ? 'bg-green-500/5 border-green-500/30 text-green-500' : 'bg-red-500/5 border-red-500/30 text-red-500'}`}>
                        <Trophy className="size-4" />
                        <span className="text-sm font-black uppercase italic tracking-widest">{exp.verdict}</span>
                    </div>
                  </div>
              </div>

              {/* Overview & Topics */}
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted/40">Interview Process Overview</span>
                    <p className="text-[15px] font-medium text-text-muted leading-relaxed opacity-90 border-l-2 border-primary/20 pl-6 italic">
                        {exp.overview}
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted/40">Topics Covered</span>
                    <div className="flex flex-wrap gap-2">
                        {exp.topics.map((t, i) => (
                            <span key={i} className="px-4 py-2 rounded-xl bg-surface border border-border/40 text-[10px] font-black text-primary uppercase tracking-widest">
                                [ {t} ]
                            </span>
                        ))}
                    </div>
                </div>
              </div>

              {/* Advice */}
              <div className="p-8 rounded-[2.5rem] bg-content text-background relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-full h-full bg-primary/20 opacity-5 pointer-events-none" />
                  <Sparkles className="size-6 text-primary mb-4" />
                  <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-background/40 mb-3">Candidate Advice</span>
                  <p className="text-sm font-black italic leading-relaxed opacity-90">
                      "{exp.advice}"
                  </p>
              </div>

              {/* Round Nav */}
              <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted/40">Round Navigation</span>
                  <div className="flex items-center gap-2">
                      {exp.rounds.map((r, i) => (
                          <Link 
                            key={i} 
                            to={`/experiences/${id}/rounds/${i+1}`}
                            className="size-11 rounded-xl glass border border-border/40 flex items-center justify-center text-[11px] font-black text-text-muted hover:text-primary hover:border-primary/40 transition-all"
                          >
                              R{i+1}
                          </Link>
                      ))}
                  </div>
              </div>

            </div>
          </aside>

          {/* --- RIGHT ROUND DETAILS PANEL (65%) --- */}
          <section className="w-full md:w-[65%]">
            <div className="flex flex-col gap-10">
              
              <div className="flex items-center justify-between border-b border-border/40 pb-6">
                <div className="flex flex-col gap-1">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary italic">Interview Rounds</h3>
                    <p className="text-text-muted/60 text-[11px] font-medium uppercase tracking-[0.2em]">{exp.rounds.length} SEPARATE SESSIONS</p>
                </div>
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <LayoutGrid className="size-4 text-primary" />
                </div>
              </div>

              {/* Rounds Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exp.rounds.map((round, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        key={i} 
                        className="p-8 rounded-[3rem] bg-surface-hover/30 border border-border/60 hover:border-primary/40 hover:bg-surface-hover/50 hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col gap-6 relative"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary">
                                    {i+1}
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-text-muted/60">{round.number}</span>
                            </div>
                            <Link 
                                to={`/experiences/${id}/rounds/${i+1}`}
                                className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-text-muted group-hover:text-primary transition-all"
                            >
                                [ OPEN ] <ChevronRight className="size-3" />
                            </Link>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h4 className="text-2xl font-black text-content leading-tight group-hover:text-primary transition-colors tracking-tight">{round.title}</h4>
                            <p className="text-[15px] font-medium text-text-muted/80 leading-relaxed italic">
                                {round.desc}
                            </p>
                        </div>

                        <div className="mt-auto pt-6 border-t border-border/40 flex flex-col gap-1.5">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted/30">Focus Areas</span>
                            <p className="text-xs font-bold text-content tracking-wide uppercase">{round.details}</p>
                        </div>
                    </motion.div>
                ))}
              </div>

              {/* Bottom Decoration/Info */}
              <div className="mt-12 p-8 rounded-[3rem] border border-dashed border-border/40 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-surface-hover flex items-center justify-center border border-border/40">
                          <Building2 className="size-5 text-text-muted" />
                      </div>
                      <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Verified Insight</span>
                          <span className="text-[11px] font-bold text-content">Contributor: Anonymous Candidate</span>
                      </div>
                  </div>
                  <div className="flex items-center gap-2">
                      {[1,2,3].map(i => (
                          <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                      ))}
                  </div>
              </div>

            </div>
          </section>

        </div>
      </main>

      {/* NO FOOTER AS REQUESTED */}
    </div>
  );
};

export default ExperienceOverviewPage;
