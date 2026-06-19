import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Filter, ChevronDown, ArrowRight, Building2, 
  Layers, Clock, Info, Globe, RefreshCcw, Trophy, 
  CheckCircle2, XCircle, ChevronLeft, ChevronRight,
  ExternalLink, Calendar, Briefcase, Sparkles, Terminal, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PublicAppShell from '../../layouts/PublicAppShell';
import MobileAppShell from '../../layouts/MobileAppShell';
import UserAppShell from '../../layouts/UserAppShell';
import { useGlobalContext } from '../../context/GlobalContext';

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
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

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
      const res = await fetch('/api/experiences/approved');
      const data = await res.json();
      if(Array.isArray(data) && data.length > 0) {
        const formatted = data.map(exp => ({
          id: exp._id,
          company: exp.company,
          role: exp.role,
          overview: exp.processOverview || 'Detailed interview journey...',
          verdict: exp.verdict || 'Selected',
          difficulty: 'Medium',
          userName: exp.user?.name || 'Anonymous',
          date: new Date(exp.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          logo: exp.company ? `https://logo.clearbit.com/${exp.company.replace(/\s+/g, '').toLowerCase()}.com` : `https://ui-avatars.com/api/?name=Company&background=random&color=fff`,
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
      } else {
        setMainExperiences([]);
      }
    } catch(err) {
      console.error('Failed to fetch approved experiences', err);
      setMainExperiences([]);
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

  // --- REUSABLE FILTER CONTENT ---
  const FiltersContent = (
    <>
       {/* Role Selection Card */}
       <div className="p-5 rounded-[1.5rem] bg-surface/40 border border-white/[0.05] shadow-sm flex flex-col gap-4">
           <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted flex items-center gap-2">
             <Briefcase className="size-3.5" /> Job Function
           </label>
           <div className="flex flex-wrap gap-2">
               {["SDE", "Frontend", "Backend", "Fullstack", "Mobile"].map((r, i) => (
                   <button 
                       key={i} 
                       onClick={() => setSelectedRole(selectedRole === r ? '' : r)}
                       className={`text-[11px] font-bold py-2 px-4 rounded-xl transition-all border ${selectedRole === r ? 'bg-primary text-primary-text border-primary shadow-lg shadow-primary/20' : 'bg-background border-border/40 text-text-muted hover:border-primary/40 hover:text-content'}`}
                   >
                       {r}
                   </button>
               ))}
           </div>
       </div>

       {/* Experience Range Card */}
       <div className="p-5 rounded-[1.5rem] bg-surface/40 border border-white/[0.05] shadow-sm flex flex-col gap-4">
           <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted flex items-center gap-2">
             <Layers className="size-3.5" /> Seniority Level
           </label>
           <div className="grid grid-cols-2 gap-2">
               {["New Grad", "1-3 Yrs", "3-5 Yrs", "5+ Yrs"].map((e, i) => (
                   <button 
                       key={i} 
                       onClick={() => setSelectedSeniority(selectedSeniority === e ? '' : e)}
                       className={`text-xs font-semibold py-2.5 px-3 rounded-xl transition-all border ${selectedSeniority === e ? 'bg-primary/10 text-primary border-primary/30' : 'bg-background border-border/40 text-text-muted hover:bg-surface hover:text-content'}`}
                   >
                       {e}
                   </button>
               ))}
           </div>
       </div>

       {/* Topics Filter Card */}
       <div className="p-5 rounded-[1.5rem] bg-surface/40 border border-white/[0.05] shadow-sm flex flex-col gap-4">
           <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted flex items-center gap-2">
             <Terminal className="size-3.5" /> Core Tech Stack
           </label>
           <div className="flex flex-wrap gap-2">
               {["DSA", "HLD", "LLD", "SQL", "React", "Node"].map((t, i) => {
                   const isActive = selectedTopics.includes(t);
                   return (
                       <button 
                           key={i} 
                           onClick={() => setSelectedTopics(prev => isActive ? prev.filter(x => x !== t) : [...prev, t])}
                           className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${isActive ? 'bg-accent/10 text-accent border-accent/30' : 'bg-background border-border/40 text-text-muted hover:border-accent/40 hover:text-content'}`}
                       >
                           {t}
                       </button>
                   );
               })}
           </div>
       </div>

       {/* Outcome Toggle Card */}
       <div className="p-5 rounded-[1.5rem] bg-surface/40 border border-white/[0.05] shadow-sm flex flex-col gap-4">
           <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted flex items-center gap-2">
             <Target className="size-3.5" /> Interview Outcome
           </label>
           <div className="flex p-1 bg-background border border-border/40 rounded-xl">
               <button 
                   onClick={() => setSelectedStatus(selectedStatus === 'selected' ? '' : 'selected')}
                   className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${selectedStatus === 'selected' ? 'bg-success/15 text-success shadow-sm' : 'text-text-muted hover:text-content'}`}
               >
                   Selected
               </button>
               <button 
                   onClick={() => setSelectedStatus(selectedStatus === 'rejected' ? '' : 'rejected')}
                   className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${selectedStatus === 'rejected' ? 'bg-danger/15 text-danger shadow-sm' : 'text-text-muted hover:text-content'}`}
               >
                   Rejected
               </button>
           </div>
       </div>
    </>
  );

  const MainContentArea = (
    <div className={`w-full ${user ? 'lg:h-[100vh]' : 'lg:h-[calc(100vh-80px)]'} flex bg-background overflow-hidden fixed top-16 bottom-[4.5rem] left-0 right-0 lg:static z-0`}>
      
      {/* FIXED SIDEBAR - PREMIUM DESIGN */}
      <aside className="w-full hidden lg:flex lg:w-80 shrink-0 flex-col h-full border-r border-border/20 bg-background relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-8 border-b border-border/20 shrink-0 bg-surface/30 backdrop-blur-md flex flex-col gap-6">
           <div>
             <div className="flex items-center gap-3 mb-1">
               <div className="size-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Filter className="size-4 text-primary" />
               </div>
               <h2 className="text-xl font-bold text-content font-['Poppins'] tracking-tight">Intelligence Map</h2>
             </div>
             <p className="text-xs text-text-muted font-medium ml-11">Configure data parameters</p>
           </div>
        </div>
        
        {/* Filters Scroll Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 flex flex-col gap-6">
           {FiltersContent}
           <button 
               onClick={clearFilters}
               className="mt-2 shrink-0 flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-text-muted hover:text-primary hover:bg-primary/5 transition-all border border-transparent hover:border-primary/20 group w-full"
           >
               <RefreshCcw className="size-3.5 group-hover:-rotate-180 transition-transform duration-500" /> Reset Parameters
           </button>
        </div>
      </aside>

      {/* RIGHT SCROLLABLE DATA AREA */}
      <main className="flex-1 min-w-0 h-full flex flex-col overflow-hidden bg-background">
        
        {/* Sticky Top Bar for Main Content */}
        <header className="shrink-0 h-20 px-6 md:px-8 flex items-center justify-between border-b border-border/40 bg-background/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
             <div className="hidden md:flex h-8 w-8 rounded-full bg-primary/10 items-center justify-center border border-primary/20">
               <Layers className="size-4 text-primary" />
             </div>
             <div>
               <h1 className="text-lg md:text-xl font-bold text-content tracking-tight">Market Intelligence</h1>
               <p className="text-[10px] md:text-xs font-medium text-text-muted">Showing {filteredExps.length} reports</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-surface border border-border/40 text-[10px] md:text-xs font-medium flex items-center gap-2">
               <div className="size-1.5 rounded-full bg-success animate-pulse" />
               <span className="text-content hidden md:inline">Live Feed</span>
            </div>
          </div>
        </header>

        {/* Global Search Bar */}
        <div className="px-6 md:px-8 pt-4 shrink-0 bg-background">
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-text-muted/60 group-focus-within:text-primary transition-all" />
                <input 
                    type="text" 
                    placeholder="Search companies, roles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-surface/50 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium text-content outline-none focus:bg-background focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-text-muted/40 shadow-inner"
                />
            </div>
        </div>

        {/* Scrollable Data Grid */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-8">
           {pageLoading ? (
               <div className="h-full flex items-center justify-center">
                  <div className="size-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
               </div>
           ) : filteredExps.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
                   {filteredExps.map((exp, i) => (
                      <div key={exp.id || i} className="group flex flex-col bg-surface/30 border border-white/5 hover:border-primary/20 rounded-2xl p-6 transition-all hover:bg-white/[0.02] hover:shadow-lg hover:shadow-primary/5 cursor-pointer" onClick={() => navigate(`/experiences/${exp.id}`)}>
                         <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                               <div className="size-10 rounded-xl bg-white border border-border/20 p-2 shadow-sm flex items-center justify-center">
                                  <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" onError={(e) => { e.target.onerror = null; e.target.src=`https://ui-avatars.com/api/?name=${exp.company}&background=random&color=fff` }} />
                               </div>
                               <div>
                                  <h3 className="text-sm font-bold text-content font-['Poppins'] tracking-tight">{exp.company}</h3>
                                  <p className="text-[10px] text-text-muted font-medium">{exp.date}</p>
                               </div>
                            </div>
                            <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider ${exp.verdict.toLowerCase() === 'selected' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                               {exp.verdict}
                            </span>
                         </div>
                         <h4 className="text-base font-bold text-content mb-2 line-clamp-1">{exp.role}</h4>
                         <div className="flex items-center gap-3 mb-4">
                            <span className="text-[11px] font-medium text-text-secondary flex items-center gap-1.5"><Briefcase className="size-3"/>{exp.exp}</span>
                            <span className="text-[11px] font-medium text-text-secondary flex items-center gap-1.5"><Clock className="size-3"/>{exp.rounds.length} Rounds</span>
                         </div>
                         <p className="text-[13px] text-text-muted leading-relaxed line-clamp-2 mb-6">
                            {exp.overview}
                         </p>
                         <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                            <div className="flex items-center gap-2 flex-wrap">
                               {exp.topics.slice(0, 2).map((topic, idx) => (
                                  <span key={idx} className="px-2 py-1 rounded bg-primary/5 border border-primary/10 text-[9px] font-semibold text-primary uppercase tracking-wider">
                                     {topic}
                                  </span>
                               ))}
                               {exp.topics.length > 2 && (
                                  <span className="px-2 py-1 rounded bg-surface border border-border/40 text-[9px] font-semibold text-text-muted">
                                     +{exp.topics.length - 2}
                                  </span>
                               )}
                            </div>
                            <button className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider group-hover:bg-primary group-hover:text-white transition-all">
                               Open <ArrowRight className="size-3 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                            </button>
                         </div>
                      </div>
                   ))}
               </div>
           ) : (
               <div className="h-full flex flex-col items-center justify-center text-center">
                   <div className="size-16 rounded-full bg-surface border border-border/40 flex items-center justify-center mb-4">
                      <Search className="size-6 text-text-muted opacity-50" />
                   </div>
                   <h3 className="text-base font-bold text-content mb-2">No experiences found</h3>
                   <p className="text-xs text-text-muted mb-6">Try adjusting your filters to see more results.</p>
                   <button onClick={clearFilters} className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-all">
                      Reset Filters
                   </button>
               </div>
           )}
        </div>
      </main>

      {/* MOBILE FILTER BUTTON (Visible only on mobile) */}
      <button 
        onClick={() => setIsMobileFiltersOpen(true)}
        className="lg:hidden fixed bottom-24 right-6 size-14 rounded-full bg-primary text-primary-text flex items-center justify-center shadow-xl shadow-primary/40 z-[90] active:scale-95 transition-transform"
      >
        <Filter className="size-5" />
      </button>

      {/* MOBILE BOTTOM SHEET MODAL */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[110] lg:hidden"
            />
            <motion.div 
              initial={{ y: "100%", opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              className="fixed bottom-4 left-4 right-4 max-h-[85vh] bg-surface/95 backdrop-blur-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] rounded-[2.5rem] z-[120] lg:hidden flex flex-col overflow-hidden"
            >
              {/* Drag Handle & Header */}
              <div className="flex flex-col items-center pt-4 pb-3 px-6 shrink-0 border-b border-white/5 bg-transparent">
                <div className="w-12 h-1.5 rounded-full bg-border/40 mb-4" />
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="size-5 text-primary" />
                    <h3 className="text-xl font-bold text-content font-['Poppins'] tracking-tight">Refine Search</h3>
                  </div>
                  <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 rounded-full bg-background border border-white/10 text-text-muted hover:bg-card-bg transition-all active:scale-90">
                    <XCircle className="size-5" />
                  </button>
                </div>
              </div>

              {/* Filters Scrollable Content */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-6 flex flex-col gap-6">
                {FiltersContent}
              </div>
              
              {/* Sticky Apply Button */}
              <div className="px-6 py-4 border-t border-white/5 bg-surface shrink-0 flex items-center justify-end gap-3">
                <button 
                  onClick={clearFilters}
                  className="px-5 py-2.5 rounded-lg text-sm font-medium text-text-muted hover:text-content hover:bg-white/5 transition-all"
                >
                  Reset
                </button>
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-medium shadow-sm transition-all"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );

  if (user) {
    return (
        <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true} hideFooter={true}>
            {MainContentArea}
        </UserAppShell>
    );
  }

  return (
    <>
      <div className="hidden md:block">
          <PublicAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} hideFooter={true}>
            {MainContentArea}
          </PublicAppShell>
      </div>

      <div className="md:hidden">
          <MobileAppShell
            theme={theme}
            toggleTheme={toggleTheme}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            isLoading={isLoading}
            hideFooter={true}
          >
            {MainContentArea}
          </MobileAppShell>
      </div>
    </>
  );
};

export default ExplorePage;
