import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, ChevronDown, ArrowRight, Building2, 
  Layers, Clock, Info, Globe, RefreshCcw, Trophy, 
  CheckCircle2, XCircle, ChevronLeft, ChevronRight,
  ExternalLink, Calendar, Briefcase, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PublicAppShell from '../../layouts/PublicAppShell';
import MobileAppShell from '../../layouts/MobileAppShell';
import UserAppShell from '../../layouts/UserAppShell';
import { useGlobalContext } from '../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

/**
 * --- INIQ EXPLORE ENGINE: PREMIUM REDESIGN ---
 * Blueprint: SaaS-style modern dashboard with enhanced typography, 
 * Clearbit logos, and responsive premium grid layout.
 */
const ExplorePage = () => {
  const { theme, toggleTheme, isMenuOpen, setIsMenuOpen, isLoading, setIsLoading, user } = useGlobalContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedSeniority, setSelectedSeniority] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [mainExperiences, setMainExperiences] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedRole('');
    setSelectedSeniority('');
    setSelectedTopics([]);
    setSelectedStatus('');
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const fetchApproved = async () => {
    setPageLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/experiences/approved`);
      const data = await res.json();
      if(Array.isArray(data)) {
        const formatted = data.map(exp => ({
          id: exp._id,
          company: exp.company,
          role: exp.role,
          overview: exp.processOverview || 'Detailed interview journey...',
          verdict: exp.verdict || 'Selected',
          difficulty: 'Medium',
          userName: exp.user?.name || 'Anonymous',
          date: new Date(exp.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          logo: `https://logo.clearbit.com/${exp.company.replace(/\s+/g, '').toLowerCase()}.com`,
          exp: exp.candidateExperience !== undefined ? `${exp.candidateExperience} Years` : 'Fresh Graduate',
          topics: [
            exp.topics?.dsa && `DSA`,
            exp.topics?.hld && `HLD`,
            exp.topics?.lld && `LLD`,
            exp.topics?.os && `OS`,
            exp.topics?.dbms && `DBMS`
          ].filter(Boolean),
          rounds: exp.rounds || [],
          advice: exp.advice || 'No advice provided.'
        }));
        setMainExperiences(formatted);
      }
    } catch(err) {
      console.error('Failed to fetch approved experiences', err);
    } finally {
      setTimeout(() => setPageLoading(false), 600);
    }
  };

  useEffect(() => {
    fetchApproved();
  }, []);

  const filteredExps = mainExperiences.filter(exp => {
    const matchesSearch = !searchQuery || 
      exp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRole = !selectedRole || exp.role.toLowerCase().includes(selectedRole.toLowerCase());
    
    const matchesSeniority = !selectedSeniority || (
      selectedSeniority === 'New Grad' ? exp.exp.toLowerCase().includes('fresh') :
      selectedSeniority === '1-3 Yrs' ? parseInt(exp.exp) >= 1 && parseInt(exp.exp) <= 3 :
      selectedSeniority === '3-5 Yrs' ? parseInt(exp.exp) >= 3 && parseInt(exp.exp) <= 5 :
      selectedSeniority === '5+ Yrs' ? parseInt(exp.exp) >= 5 : true
    );

    const matchesTopics = selectedTopics.length === 0 || 
      selectedTopics.every(st => exp.topics.some(et => et.toLowerCase() === st.toLowerCase()));

    const matchesStatus = !selectedStatus || exp.verdict.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesRole && matchesSeniority && matchesTopics && matchesStatus;
  });

  const selectedExps = filteredExps.filter(e => e.verdict.toLowerCase() === 'selected');
  const otherExps = filteredExps.filter(e => e.verdict.toLowerCase() !== 'selected');

  // --- UI COMPONENTS ---

  const PageHeader = (
    <section className="w-full pt-32 pb-20 relative overflow-hidden bg-background">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] opacity-30" />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-primary" />
              <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-primary font-['Poppins']">The Insight Engine</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-content tracking-tight leading-[1.1] font-['Poppins'] max-w-4xl">
              Decode the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Hiring Process</span> of top companies.
            </h1>
            <p className="text-lg text-text-muted font-medium mt-4 leading-relaxed max-w-2xl opacity-80">
              Access real-world interview patterns, questions, and success strategies shared by candidates from the world's leading tech firms.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-12 w-full max-w-[900px] flex items-center gap-4"
          >
              <div className="relative flex-1 group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-text-muted/40 group-focus-within:text-primary transition-all" />
                  <input 
                    type="text" 
                    placeholder="Search companies, roles, or technical topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-surface/50 border border-border/60 backdrop-blur-sm rounded-2xl py-5 pl-14 pr-8 text-base font-medium text-content focus:border-primary/50 focus:bg-surface focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] outline-none transition-all"
                  />
              </div>
              <button className="bg-primary text-white px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:brightness-110 active:scale-[0.98] shadow-lg shadow-primary/20 transition-all font-['Poppins']">
                  Search
              </button>
          </motion.div>
      </div>
    </section>
  );

  const CompactCard = ({ exp }) => {
    const [logoError, setLogoError] = useState(false);

    return (
      <motion.div 
        whileHover={{ y: -8 }}
        className="group relative flex flex-col h-full bg-surface border border-border/60 rounded-[2rem] p-8 transition-all hover:border-primary/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] overflow-hidden"
      >
          {/* Subtle Glow Effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* TOP ROW: Logo & Status */}
          <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                  <div className="size-14 rounded-2xl bg-white border border-border/40 p-2.5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                      {logoError ? (
                        <Building2 className="size-7 text-text-muted" />
                      ) : (
                        <img 
                          src={exp.logo} 
                          alt={exp.company} 
                          className="w-full h-full object-contain"
                          onError={() => setLogoError(true)}
                        />
                      )}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-content tracking-tight font-['Poppins']">{exp.company}</h3>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-text-muted opacity-70">
                      <Calendar className="size-3" />
                      {exp.date}
                    </div>
                  </div>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${exp.verdict.toLowerCase() === 'selected' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'} border`}>
                  {exp.verdict}
              </div>
          </div>
          
          {/* ROLE & DETAILS */}
          <div className="mb-6">
              <h4 className="text-2xl font-bold text-content group-hover:text-primary transition-colors leading-tight mb-3 font-['Poppins']">{exp.role}</h4>
              <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-hover border border-border/40 text-[11px] font-bold text-text-muted uppercase tracking-wider">
                    <Briefcase className="size-3" /> {exp.exp}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-hover border border-border/40 text-[11px] font-bold text-text-muted uppercase tracking-wider">
                    <Sparkles className="size-3" /> {exp.difficulty}
                  </span>
              </div>
          </div>

          {/* INTERVIEW OVERVIEW */}
          <p className="text-[15px] font-medium text-text-muted leading-relaxed mb-8 opacity-80 line-clamp-3">
              {exp.overview}
          </p>

          {/* TOPICS COVERED: Modern Pills */}
          <div className="flex flex-col gap-3 mb-8">
              <span className="text-[10px] font-bold text-text-muted/40 uppercase tracking-[0.2em] font-['Poppins']">Technical Scope</span>
              <div className="flex flex-wrap gap-2">
                  {exp.topics.map((topic, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/10">
                      {topic}
                    </span>
                  ))}
              </div>
          </div>

          {/* ROUNDS PREVIEW */}
          <div className="flex flex-col gap-3 mb-10">
              <span className="text-[10px] font-bold text-text-muted/40 uppercase tracking-[0.2em] font-['Poppins']">Process Structure</span>
              <div className="grid grid-cols-2 gap-2">
                  {exp.rounds.slice(0, 4).map((round, i) => (
                      <div key={i} className="px-3 py-2.5 rounded-xl bg-surface-hover/80 border border-border/40 text-[10px] font-bold text-text-muted text-center flex items-center justify-center min-h-[40px] leading-tight transition-all group-hover:bg-primary/5 group-hover:border-primary/20">
                          {round.title}
                      </div>
                  ))}
              </div>
          </div>

          {/* ACTION: View Full Experience */}
          <Link 
            to={`/experiences/${exp.id}`}
            onClick={() => setIsLoading(true)}
            className="mt-auto w-full py-4 bg-surface-hover border border-border/60 text-[11px] font-bold tracking-[0.2em] uppercase text-center rounded-2xl hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
              View Full Story
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
      </motion.div>
    );
  };

  const MainContentArea = (
    <div className={`flex-1 flex overflow-hidden ${user ? 'h-full bg-surface/[0.02] max-h-full' : 'w-full bg-background relative z-10 pb-32'}`}>
        <div className={`mx-auto flex flex-col lg:flex-row w-full ${user ? 'h-full overflow-hidden' : 'max-w-[1440px] px-8'}`}>
            {/* STICKY SIDEBAR (Now Scrollable if user) */}
            <aside className={`shrink-0 ${user ? 'w-80 border-r border-border/40 p-10 overflow-y-auto no-scrollbar bg-surface/5' : 'w-full lg:w-80 lg:flex-shrink-0'}`}>
                <div className={`${user ? 'flex flex-col gap-8' : 'sticky top-28 flex flex-col gap-8'}`}>
                    {/* Logged In Breadcrumb Header */}
                    {user && (
                        <div className="mb-4 flex flex-col gap-1.5">
                            <div className="flex items-center gap-1.5 ml-0.5">
                                <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-text-muted opacity-40">Intelligence Hub</span>
                            </div>
                            <h1 className="text-xl font-black text-content tracking-tighter italic uppercase">Refine Filters</h1>
                        </div>
                    )}

                    <div className={`${user ? 'flex flex-col gap-8' : 'bg-surface border border-border/60 rounded-[2rem] p-8 shadow-sm'}`}>
                        {!user && (
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-lg font-bold text-content font-['Poppins']">Refine Library</h2>
                                <Filter className="size-4 text-primary" />
                            </div>
                        )}
                        
                        <div className="flex flex-col gap-10">
                            {/* Company Search */}
                            <div className="flex flex-col gap-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-40 ml-1 font-['Poppins']">Company</label>
                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-all" />
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Meta, Netflix"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-surface-hover/50 border border-border/60 rounded-xl py-3 pl-11 pr-4 text-[13px] font-medium text-content outline-none focus:border-primary/40 focus:bg-surface transition-all"
                                    />
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div className="flex flex-col gap-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-40 ml-1 font-['Poppins']">Job Function</label>
                                <div className="flex flex-col gap-3">
                                    {["SDE", "Frontend", "Backend", "Fullstack", "Mobile"].map((r, i) => (
                                        <button 
                                            key={i} 
                                            onClick={() => setSelectedRole(selectedRole === r ? '' : r)}
                                            className={`text-left text-[13px] font-medium transition-colors flex items-center justify-between group ${selectedRole === r ? 'text-primary' : 'text-text-muted hover:text-primary'}`}
                                        >
                                            {r}
                                            <div className={`h-px bg-primary transition-all ${selectedRole === r ? 'w-4' : 'w-0 group-hover:w-4'}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Experience Range */}
                            <div className="flex flex-col gap-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-40 ml-1 font-['Poppins']">Seniority</label>
                                <div className="flex flex-wrap gap-2">
                                    {["New Grad", "1-3 Yrs", "3-5 Yrs", "5+ Yrs"].map((e, i) => (
                                        <button 
                                            key={i} 
                                            onClick={() => setSelectedSeniority(selectedSeniority === e ? '' : e)}
                                            className={`px-4 py-2 rounded-xl border text-[11px] font-bold transition-all ${selectedSeniority === e ? 'bg-primary/10 border-primary/40 text-primary' : 'bg-surface-hover/50 border-border/60 text-text-muted hover:border-primary/40 hover:text-primary'}`}
                                        >
                                            {e}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Topics Filter */}
                            <div className="flex flex-col gap-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-40 ml-1 font-['Poppins']">Core Tech</label>
                                <div className="flex flex-wrap gap-2">
                                    {["DSA", "HLD", "LLD", "SQL", "React", "Node"].map((t, i) => {
                                        const isActive = selectedTopics.includes(t);
                                        return (
                                            <button 
                                                key={i} 
                                                onClick={() => setSelectedTopics(prev => isActive ? prev.filter(x => x !== t) : [...prev, t])}
                                                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${isActive ? 'bg-primary text-white border-primary' : 'bg-primary/5 border-primary/10 text-primary hover:bg-primary hover:text-white'}`}
                                            >
                                                {t}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Outcome Toggle */}
                            <div className="flex flex-col gap-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-40 ml-1 font-['Poppins']">Status</label>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setSelectedStatus(selectedStatus === 'selected' ? '' : 'selected')}
                                        className={`flex-1 py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${selectedStatus === 'selected' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-500' : 'border-border/60 text-text-muted hover:border-emerald-500/40 hover:text-emerald-500'}`}
                                    >
                                        Selected
                                    </button>
                                    <button 
                                        onClick={() => setSelectedStatus(selectedStatus === 'other' ? '' : 'other')}
                                        className={`flex-1 py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${selectedStatus === 'other' ? 'bg-red-500/10 border-red-500/40 text-red-500' : 'border-border/60 text-text-muted hover:border-red-500/40 hover:text-red-500'}`}
                                    >
                                        Other
                                    </button>
                                </div>
                            </div>

                            <button 
                                onClick={clearFilters}
                                className="flex items-center justify-center gap-3 mt-4 w-full py-4 rounded-2xl bg-surface-hover text-[11px] font-bold tracking-widest uppercase text-text-muted hover:text-primary transition-all border border-border/40"
                            >
                                <RefreshCcw className="size-3.5" /> Clear All Filters
                            </button>
                        </div>
                    </div>
                    
                    {/* Upgrade Card (Only public) */}
                    {!user && (
                        <div className="bg-gradient-to-br from-primary to-accent rounded-[2rem] p-8 text-white relative overflow-hidden group">
                           <div className="relative z-10">
                              <h3 className="text-xl font-bold font-['Poppins'] mb-2">Share Your Journey</h3>
                              <p className="text-sm opacity-80 mb-6">Contribute your experience and help the community grow.</p>
                              <button className="bg-white text-primary px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform">Get Started</button>
                           </div>
                           <Sparkles className="absolute -bottom-4 -right-4 size-32 opacity-20 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                        </div>
                    )}
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className={`flex-1 min-w-0 flex flex-col ${user ? 'h-full overflow-hidden' : ''}`}>
                {/* Results Header (Fixed in user mode) */}
                <div className={`${user ? 'px-10 md:px-12 py-6 border-b border-border/40 shrink-0 bg-background/50 backdrop-blur-md relative z-20' : 'py-12 mb-12 border-b border-border/60 max-w-5xl mx-auto w-full px-8'}`}>
                    {/* Logged In Logo Emblem (Removed Back Button) */}
                    {user && (
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary opacity-60 leading-none mb-1">Mission Control</span>
                                <h2 className="text-lg font-black text-content italic uppercase tracking-tight leading-none">Intelligence Hub</h2>
                            </div>
                            
                            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-surface/40 border border-border/40 backdrop-blur-sm">
                                <div className="size-7 rounded-lg bg-background border border-border flex items-center justify-center overflow-hidden">
                                    <img 
                                        src={theme === 'dark' ? "/assets/logos/logo-dark.png" : "/assets/logos/logo.png"} 
                                        alt="INIQ" 
                                        className="h-4 w-auto object-contain" 
                                    />
                                </div>
                                <span className="text-[10px] font-black text-content tracking-tighter uppercase italic">INIQ<span className="text-primary italic ml-0.5">.</span>PROTOCOL</span>
                            </div>
                        </div>
                    )}

                    <div className={`${user ? 'max-w-5xl mx-auto' : ''} flex flex-col md:flex-row md:items-center justify-between`}>
                        <div className="flex flex-col gap-1">
                            {user ? (
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary opacity-60">Synchronizing Data...</span>
                                    <h2 className="text-3xl font-black text-content font-['Sora'] tracking-tight leading-none uppercase italic">Tactical Feed</h2>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold text-content font-['Poppins']">Market Insights</h2>
                                    <p className="text-sm font-medium text-text-muted opacity-60">Showing {filteredExps.length} curated interview experiences</p>
                                </>
                            )}
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center gap-8">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-bold text-text-muted/40 uppercase tracking-widest">Success Metric</span>
                                <span className="text-lg font-bold text-emerald-500 font-['Poppins']">
                                    {Math.round((selectedExps.length / (filteredExps.length || 1)) * 100)}% Conversion
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`flex-1 ${user && filteredExps.length > 0 ? 'overflow-y-auto no-scrollbar p-10 md:p-12' : user ? 'p-10 md:p-12 overflow-hidden' : ''}`}>
                    <div className={`${user ? 'max-w-5xl mx-auto flex flex-col gap-12 h-full' : ''}`}>
                        {pageLoading ? (
                            <div className="flex-1 flex flex-col items-center justify-center gap-6 min-h-0">
                                <div className="relative">
                                    <div className="size-20 rounded-2xl border-2 border-primary/20 border-t-primary animate-spin" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="size-2 rounded-full bg-primary animate-pulse" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Decrypting Node</span>
                                    <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest opacity-40">Fetching Secure Intelligence...</span>
                                </div>
                            </div>
                        ) : !isEmpty && filteredExps.length > 0 ? (
                            <div className={`flex flex-col ${user ? 'gap-20' : 'gap-24'}`}>
                                {/* Successful Section */}
                                {selectedExps.length > 0 && (
                                    <section>
                                        <div className="mb-12 flex items-center gap-6">
                                            <h2 className={`font-black text-content font-['Sora'] tracking-tight uppercase italic ${user ? 'text-2xl' : 'text-3xl'}`}>Successful Stories</h2>
                                            <div className="h-px w-full bg-gradient-to-r from-border/60 to-transparent" />
                                        </div>
                                        <div className={`grid gap-10 ${user ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'}`}>
                                            {selectedExps.map((exp, i) => (
                                                <CompactCard key={exp.id || i} exp={exp} />
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Others Section */}
                                {otherExps.length > 0 && (
                                    <section>
                                        <div className="mb-12 flex items-center gap-6">
                                            <h2 className={`font-black text-content font-['Sora'] tracking-tight uppercase italic opacity-70 ${user ? 'text-2xl' : 'text-3xl'}`}>Other Insights</h2>
                                            <div className="h-px w-full bg-gradient-to-r from-border/60 to-transparent opacity-50" />
                                        </div>
                                        <div className={`grid gap-10 ${user ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'}`}>
                                            {otherExps.map((exp, i) => (
                                                <CompactCard key={exp.id || i} exp={exp} />
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Pagination */}
                                <div className="flex flex-col md:flex-row items-center justify-between gap-10 mt-12 pt-16 border-t border-border/60">
                                    <div className="flex items-center gap-2">
                                        <button className="h-12 px-6 rounded-2xl bg-primary text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
                                            Load More
                                        </button>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <button className="size-12 rounded-2xl bg-surface border border-border/60 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all"><ChevronLeft className="size-5" /></button>
                                        {[1, 2, 3].map(n => (
                                            <button key={n} className={`size-12 rounded-2xl font-bold text-sm font-['Poppins'] transition-all ${n === 1 ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-surface border border-border/60 text-text-muted hover:border-primary/40'}`}>
                                                {n}
                                            </button>
                                        ))}
                                        <button className="size-12 rounded-2xl bg-surface border border-border/60 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all"><ChevronRight className="size-5" /></button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex-1 flex flex-col items-center justify-center text-center gap-8 bg-surface/30 border-2 border-dashed border-border/40 rounded-[3rem] w-full min-h-0"
                            >
                                <div className="size-28 rounded-[2rem] bg-surface border border-border/60 flex items-center justify-center shadow-inner">
                                    <SearchX className="size-12 text-text-muted opacity-20" />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-3xl font-bold text-content font-['Poppins']">No matches found</h3>
                                    <p className="text-base font-medium text-text-muted opacity-60 max-w-md">We couldn't find any experiences matching your current filters. Try broadening your search.</p>
                                </div>
                                    <div className="flex items-center gap-4 mt-4">
                                    <button onClick={clearFilters} className="bg-primary text-white px-10 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:brightness-110 transition-all">Reset All Filters</button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    </div>
  );

  if (user) {
    return (
        <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            {MainContentArea}
        </UserAppShell>
    );
  }

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
        <div className="bg-background min-h-screen">
          {PageHeader}
          {MainContentArea}
        </div>
      </MobileAppShell>
    </>
  );
};


const SearchX = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /><path d="m15 9-6 6" /><path d="m9 9 6 6" />
  </svg>
);

export default ExplorePage;
