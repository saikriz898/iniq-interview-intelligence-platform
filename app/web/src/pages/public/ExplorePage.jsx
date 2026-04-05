import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, ChevronDown, ArrowRight, Building2, 
  Layers, Clock, Info, Globe, RefreshCcw, Trophy, 
  CheckCircle2, XCircle, ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PublicAppShell from '../../layouts/PublicAppShell';
import MobileAppShell from '../../layouts/MobileAppShell';
import { useGlobalContext } from '../../context/GlobalContext';

/**
 * --- INIQ EXPLORE ENGINE: STICKY REFINEMENT ---
 * Blueprint: Matches the user's granular multi-section requirement with fixed sidebar and compact cards.
 */
const ExplorePage = () => {
  const { theme, toggleTheme, isMenuOpen, setIsMenuOpen, isLoading, setIsLoading } = useGlobalContext();
  const [view, setView] = useState('browse');
  const [selectedExp, setSelectedExp] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600); // Faster loading for better UX
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  // Mock Data - Emptied for real integration
  const mainExperiences = [];


  const selectedExps = mainExperiences.filter(e => e.verdict === 'Selected');
  const rejectedExps = mainExperiences.filter(e => e.verdict === 'Rejected');

  // --- UI COMPONENTS ---

  const PageHeader = (
    <section className="w-full pt-32 pb-12 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Explore Experiences</span>
            <h1 className="text-4xl md:text-5xl font-black text-content tracking-tighter leading-tight">
              Overview of all interview experiences.
            </h1>
            <p className="text-sm md:text-base text-text-muted font-medium mt-3 leading-relaxed opacity-60 max-w-3xl">
              Overview of all interview experiences with company, role, topics, rounds, and verdict.
            </p>
          </div>

          <div className="mt-8 w-full max-w-[800px] flex items-center gap-3">
              <div className="relative flex-1 group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-text-muted/50 group-focus-within:text-primary transition-all" />
                  <input 
                    type="text" 
                    placeholder="Search by company, role, topic, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-surface-hover/50 border border-border/80 rounded-xl py-4 pl-12 pr-6 text-sm font-bold text-content focus:border-primary/50 focus:bg-surface outline-none transition-all"
                  />
              </div>
              <button className="bg-content text-background px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">
                  Search
              </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
              {[
                "Company", "Role", "Experience", "Topics", "Rounds", "Selected", "Rejected", "Latest"
              ].map((chip, i) => (
                <button key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-hover/50 border border-border/60 text-[9px] font-black uppercase tracking-widest text-text-muted hover:border-primary/40 hover:text-primary transition-all">
                  {chip} <ChevronDown className="size-3 opacity-30" />
                </button>
              ))}
          </div>
      </div>
    </section>
  );

  const CompactCard = ({ exp }) => (
    <div className="p-5 rounded-[2rem] bg-surface border border-border/80 hover:border-primary/40 hover:shadow-2xl transition-all duration-500 group relative cursor-pointer flex flex-col h-full overflow-hidden">
        {/* TOP ROW */}
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-background border border-border p-1 flex items-center justify-center shadow-inner">
                    <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-sm font-black text-content tracking-tight uppercase">{exp.company}</h3>
            </div>
            <div className={`px-2.5 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest italic ${exp.verdict === 'Selected' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'}`}>
                {exp.verdict}
            </div>
        </div>
        
        {/* ROLE & EXPERIENCE */}
        <div className="mb-4">
            <h4 className="text-base font-black text-content group-hover:text-primary transition-colors leading-none mb-0.5">{exp.role}</h4>
            <p className="text-[8px] font-bold text-text-muted uppercase tracking-[0.2em] opacity-60">{exp.exp} EXPERIENCE</p>
        </div>

        {/* INTERVIEW OVERVIEW */}
        <p className="text-[12px] font-medium text-text-muted leading-relaxed mb-4 italic opacity-60 line-clamp-2">
            {exp.overview}
        </p>

        {/* TOPICS COVERED */}
        <div className="flex flex-col gap-1 mb-4 pt-4 border-t border-border/40">
            <span className="text-[7px] font-black text-text-muted/40 uppercase tracking-widest">Topics Covered</span>
            <div className="text-[9px] font-black text-primary tracking-widest uppercase line-clamp-1">
                {exp.topics.join(' • ')}
            </div>
        </div>

        {/* ROUND DETAILS - Structured Grid */}
        <div className="flex flex-col gap-1 mb-6">
            <span className="text-[7px] font-black text-text-muted/40 uppercase tracking-widest">Round Details</span>
            <div className="grid grid-cols-2 gap-1.5">
                {exp.rounds.slice(0, 4).map((round, i) => (
                    <div key={i} className="px-2 py-1.5 rounded-lg bg-surface-hover/80 border border-border/60 text-[8px] font-bold text-content/80 text-center flex items-center justify-center min-h-[32px] leading-tight transition-colors group-hover:bg-background">
                        {round.title}
                    </div>
                ))}
            </div>
        </div>

        {/* CANDIDATE ADVICE */}
        <div className="mb-8 flex flex-col gap-1">
            <span className="text-[7px] font-black text-text-muted/40 uppercase tracking-widest">Candidate Advice</span>
            <p className="text-[11px] font-semibold text-text-muted leading-relaxed italic opacity-70 line-clamp-2">
                "Advice: {exp.advice}"
            </p>
        </div>

        {/* ACTION: View Full Experience */}
        <Link 
          to={`/experiences/${exp.id}`}
          onClick={() => setIsLoading(true)}
          className="mt-auto w-full py-3 bg-content text-background rounded-lg font-black text-[9px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl hover:shadow-content/10 flex items-center justify-center text-center"
        >
            View Full Experience
        </Link>
    </div>
  );

  const MainContentArea = (
    <section className="w-full bg-surface border-t border-border/40">
        <div className="max-w-[1280px] mx-auto px-6 pt-10">
            {/* Results Summary */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-border/60">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">Showing {mainExperiences.length} interview experiences</span>
                <div className="flex gap-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Selected: {selectedExps.length}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Rejected: {rejectedExps.length}</span>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 pb-24">
                {/* FIXED LEFT SIDEBAR */}
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="sticky top-28 flex flex-col gap-8">
                        <div>
                            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-content/60 mb-6">Filters</h2>
                            
                            <div className="flex flex-col gap-6">
                                {/* Company */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest">Company</label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-text-muted/30" />
                                        <input 
                                            type="text" 
                                            placeholder="Search Company"
                                            className="w-full bg-surface-hover border border-border rounded-lg py-2 pl-8 pr-3 text-[10px] font-bold text-content outline-none"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5 px-1">
                                        {["Google", "Amazon", "Microsoft", "Zoho"].map((c, i) => (
                                            <button key={i} className="text-left text-[10px] font-bold text-text-muted hover:text-primary transition-colors">{c}</button>
                                        ))}
                                    </div>
                                </div>

                                {/* Role */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest">Role</label>
                                    <div className="flex flex-col gap-1.5 px-1">
                                        {["SDE", "Frontend Developer", "Backend Engineer"].map((r, i) => (
                                            <button key={i} className="text-left text-[10px] font-bold text-text-muted hover:text-primary transition-colors">{r}</button>
                                        ))}
                                    </div>
                                </div>

                                {/* Experience */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest">Experience</label>
                                    <div className="flex flex-col gap-1.5 px-1">
                                        {["Fresher", "1+ years", "2+ years"].map((e, i) => (
                                            <button key={i} className="text-left text-[10px] font-bold text-text-muted hover:text-primary transition-colors">{e}</button>
                                        ))}
                                    </div>
                                </div>

                                {/* Topics */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest">Topics</label>
                                    <div className="flex flex-wrap gap-1.5">
                                        {["DSA", "HLD", "LLD", "SQL"].map((t, i) => (
                                            <button key={i} className="px-2 py-1 rounded bg-surface-hover border border-border text-[8px] font-black uppercase tracking-widest text-text-muted hover:border-primary/40 hover:text-primary">{t}</button>
                                        ))}
                                    </div>
                                </div>

                                {/* Verdict */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest">Verdict</label>
                                    <div className="flex gap-2">
                                        <button className="flex-1 py-1.5 rounded-lg border border-border text-[9px] font-black uppercase text-text-muted hover:border-green-500/40">Selected</button>
                                        <button className="flex-1 py-1.5 rounded-lg border border-border text-[9px] font-black uppercase text-text-muted hover:border-red-500/40">Rejected</button>
                                    </div>
                                </div>

                                {/* Rounds */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest">Rounds</label>
                                    <div className="flex gap-1.5">
                                        {[1, 2, 3, "4+"].map((r, i) => (
                                            <button key={i} className="size-7 rounded-lg border border-border flex items-center justify-center text-[9px] font-black text-text-muted hover:border-primary/40">{r}</button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sort */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest">Sort</label>
                                    <div className="flex flex-col gap-1.5 px-1">
                                        {["Latest", "Most Viewed"].map((s, i) => (
                                            <button key={i} className="text-left text-[10px] font-bold text-text-muted hover:text-primary transition-colors">{s}</button>
                                        ))}
                                    </div>
                                </div>

                                <button className="flex items-center justify-center gap-2 mt-2 px-4 py-3 rounded-xl bg-primary text-background text-[10px] font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/10">
                                    <RefreshCcw className="size-3" /> Reset Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* RIGHT SCROLLABLE CONTENT */}
                <main className="flex-1 flex flex-col gap-20">
                    {!isEmpty ? (
                        <>
                            {/* Selected Experiences Section */}
                            <section>
                                <div className="mb-8 overflow-hidden">
                                     <div className="flex items-center gap-4 mb-2">
                                        <h2 className="text-2xl font-black text-content italic whitespace-nowrap">Selected Experiences</h2>
                                        <div className="h-px w-full bg-border/40" />
                                     </div>
                                     <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-60">Experiences where candidates successfully secured the offer.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {selectedExps.map((exp, i) => (
                                        <CompactCard key={i} exp={exp} />
                                    ))}
                                </div>
                            </section>

                            {/* Rejected Experiences Section */}
                            <section>
                                <div className="mb-8 overflow-hidden">
                                     <div className="flex items-center gap-4 mb-2">
                                        <h2 className="text-2xl font-black text-content italic opacity-80 whitespace-nowrap">Rejected / Not Selected Experiences</h2>
                                        <div className="h-px w-full bg-border/40 opacity-50" />
                                     </div>
                                     <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-60">Valuable lessons and insights from experiences that didn't lead to selection.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {rejectedExps.map((exp, i) => (
                                        <CompactCard key={i} exp={exp} />
                                    ))}
                                </div>
                            </section>

                            {/* Pagination Area */}
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-4 pt-12 border-t border-border/40">
                                <button className="w-full md:w-auto px-12 py-4 rounded-xl bg-content text-background hover:brightness-110 text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95">
                                    Load More Experiences
                                </button>
                                
                                <div className="flex items-center gap-2">
                                    <button className="p-2.5 rounded-lg border border-border text-text-muted hover:text-primary transition-all"><ChevronLeft className="size-3.5" /></button>
                                    {[1, 2, 3, 4].map(n => (
                                        <button key={n} className={`size-9 rounded-lg font-black text-[10px] transition-all ${n === 1 ? 'bg-primary text-background' : 'bg-surface-hover border border-border text-text-muted'}`}>
                                            {n}
                                        </button>
                                    ))}
                                    <button className="p-2.5 rounded-lg border border-border text-text-muted hover:text-primary transition-all"><ChevronRight className="size-3.5" /></button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="py-32 flex flex-col items-center text-center gap-6 border border-dashed border-border/80 rounded-[3rem] bg-surface-hover/10">
                            <div className="size-20 rounded-full bg-surface-hover flex items-center justify-center border border-border shadow-inner">
                                <SearchX className="size-8 text-text-muted/20" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-black text-content">No experiences match your filters</h3>
                                <p className="text-text-muted font-bold text-[10px] uppercase tracking-widest opacity-60">Try adjusting your search or resetting filters.</p>
                            </div>
                             <div className="flex items-center gap-3 mt-2">
                                <button onClick={() => setIsEmpty(false)} className="px-8 py-3.5 rounded-xl bg-primary text-background font-black uppercase text-[9px] tracking-widest shadow-lg shadow-primary/10">Reset Filters</button>
                                <button className="px-8 py-3.5 rounded-xl bg-surface-hover text-content font-black uppercase text-[9px] tracking-widest border border-border">Explore All</button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    </section>
  );

  return (
    <>
      <PublicAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading}>
        {PageHeader}
        {MainContentArea}
      </PublicAppShell>

      <MobileAppShell
        theme={theme}
        toggleTheme={toggleTheme}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isLoading={isLoading}
      >
        {PageHeader}
        {MainContentArea}
      </MobileAppShell>
    </>
  );
};


const SearchX = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /><path d="m15 9-6 6" /><path d="m9 9 6 6" />
  </svg>
);

export default ExplorePage;
