import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Building2, ArrowLeft, Trophy, Sparkles, 
  Moon, Sun, Clock, History, LayoutGrid,
  ExternalLink, ChevronRight, Calendar, Briefcase, 
  ChevronLeft, Info, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import PublicPreloader from '../../components/public/PublicPreloader';
import MobilePreloader from '../../components/mobile/MobilePreloader';

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

  useEffect(() => {
    fetchExperience();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const fetchExperience = async () => {
    setIsLoading(true);
    try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/experiences/${id}`);
        const data = await res.json();
        if (res.ok) {
            setExp({
                ...data,
                // Clearbit Logo Integration
                logo: `https://logo.clearbit.com/${data.company.replace(/\s+/g, '').toLowerCase()}.com`,
                yearsExp: `${data.candidateExperience} Years Experience`,
                topics: [
                    data.topics?.dsa && `DSA`,
                    data.topics?.hld && `HLD`,
                    data.topics?.lld && `LLD`,
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
        <p className="text-sm font-medium text-text-muted opacity-60">The requested interview experience could not be located.</p>
      </div>
      <Link to="/experiences" className="mt-4 px-8 py-3 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all">
        Back to Library
      </Link>
    </div>
  );

  if (!exp) return null;

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <AnimatePresence>
        {isLoading && (
          <>
            <div className="md:block hidden"><PublicPreloader theme={theme} /></div>
            <div className="md:hidden block"><MobilePreloader theme={theme} /></div>
          </>
        )}
      </AnimatePresence>

      {/* 1. PREMIUM CUSTOM NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 h-20 backdrop-blur-xl bg-surface/80 border-b border-border/60 z-[100] px-8">
        <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between">
          {/* Left: Breadcrumb */}
          <div className="flex items-center gap-4">
            <Link to="/experiences" className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-hover/50 border border-border/40 hover:border-primary/40 transition-all">
                <ChevronLeft className="size-4 text-text-muted group-hover:text-primary transition-colors" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-text-muted group-hover:text-primary transition-colors font-['Poppins']">Back</span>
            </Link>
            <div className="h-4 w-px bg-border/60 mx-2" />
            <div className="flex items-center gap-2 overflow-hidden max-w-[200px] md:max-w-none">
              <span className="text-[11px] font-bold uppercase tracking-widest text-text-muted opacity-40 font-['Poppins'] shrink-0">Library</span>
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
      <main className="pt-20 max-w-[1600px] mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-16 py-16">
          
          {/* --- LEFT PANEL: IDENTITY & META (35%) --- */}
          <aside className="w-full lg:w-[35%]">
            <div className="lg:sticky lg:top-32 flex flex-col gap-10">
              
              {/* Company Identity */}
              <div className="flex flex-col gap-8">
                <div className="size-24 rounded-[2rem] bg-white border border-border/40 p-4 flex items-center justify-center shadow-sm">
                  {logoError ? (
                    <Building2 className="size-12 text-text-muted opacity-40" />
                  ) : (
                    <img 
                      src={exp.logo} 
                      alt={exp.company} 
                      className="w-full h-full object-contain"
                      onError={() => setLogoError(true)}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                   <div className="flex items-center gap-2">
                     <div className="h-px w-6 bg-primary" />
                     <h2 className="text-[12px] font-bold text-primary uppercase tracking-[0.3em] font-['Poppins']">{exp.company}</h2>
                   </div>
                   <h1 className="text-5xl font-bold text-content tracking-tight leading-[1.1] font-['Poppins']">{exp.role}</h1>
                   <div className="flex items-center gap-2 text-sm font-medium text-text-muted mt-2 opacity-60">
                     <Calendar className="size-4" />
                     Posted on {exp.dateFormatted}
                   </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-3 p-6 rounded-[1.5rem] bg-surface border border-border/60 shadow-sm">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted/40 font-['Poppins']">Experience</span>
                    <div className="flex items-center gap-3">
                        <Briefcase className="size-5 text-primary opacity-60" />
                        <span className="text-[13px] font-bold text-content tracking-wide">{exp.yearsExp}</span>
                    </div>
                  </div>

                  <div className={`flex flex-col gap-3 p-6 rounded-[1.5rem] border shadow-sm ${exp.verdict.toLowerCase() === 'selected' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' : 'bg-red-500/5 border-red-500/20 text-red-500'}`}>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 font-['Poppins']">Outcome</span>
                    <div className="flex items-center gap-3">
                        <Trophy className="size-5" />
                        <span className="text-[13px] font-bold uppercase tracking-widest">{exp.verdict}</span>
                    </div>
                  </div>
              </div>

              {/* Process Overview */}
              <div className="flex flex-col gap-8 bg-surface border border-border/60 rounded-[2rem] p-8 shadow-sm">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted/40 font-['Poppins']">Strategy Overview</span>
                      <Sparkles className="size-4 text-primary opacity-40" />
                    </div>
                    <p className="text-[15px] font-medium text-text-muted leading-relaxed opacity-80 mt-2">
                        {exp.overview}
                    </p>
                </div>

                <div className="flex flex-col gap-4 pt-8 border-t border-border/40">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted/40 font-['Poppins']">Core Domains</span>
                    <div className="flex flex-wrap gap-2">
                        {exp.topics.map((t, i) => (
                            <span key={i} className="px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase tracking-widest">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
              </div>

              {/* Advice Card */}
              <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary to-accent text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-full h-full bg-white opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <MessageSquare className="size-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-60 font-['Poppins']">Closing Advice</span>
                  </div>
                  <p className="text-lg font-bold leading-relaxed opacity-95 font-['Poppins']">
                      "{exp.advice}"
                  </p>
                  <Sparkles className="absolute -bottom-4 -right-4 size-32 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
              </div>

            </div>
          </aside>

          {/* --- RIGHT PANEL: ROUNDS TIMELINE (65%) --- */}
          <section className="w-full lg:w-[65%]">
            <div className="flex flex-col gap-12">
              
              <div className="flex items-center justify-between pb-8 border-b border-border/60">
                <div className="flex flex-col gap-1">
                    <h3 className="text-3xl font-bold text-content font-['Poppins'] tracking-tight">Interview Journey</h3>
                    <p className="text-text-muted/60 text-[12px] font-bold uppercase tracking-[0.2em]">{exp.rounds.length} Detailed Stages</p>
                </div>
                <div className="size-14 rounded-2xl bg-surface border border-border/60 flex items-center justify-center shadow-sm">
                    <LayoutGrid className="size-5 text-primary" />
                </div>
              </div>

              {/* Rounds Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {exp.rounds.map((round, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                        key={i} 
                        className="group relative flex flex-col h-full bg-surface border border-border/60 rounded-[2rem] p-8 transition-all hover:border-primary/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] overflow-hidden"
                    >
                        {/* Subtle Glow Effect */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-xl bg-primary text-white flex items-center justify-center text-[12px] font-bold font-['Poppins'] shadow-lg shadow-primary/20">
                                    {i+1}
                                </div>
                                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-text-muted/40 font-['Poppins']">Round {i+1}</span>
                            </div>
                            <Link 
                                to={`/experiences/${id}/rounds/${i+1}`}
                                className="size-10 rounded-xl bg-surface-hover/50 border border-border/40 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all group/link"
                            >
                                <ArrowLeft className="size-4 rotate-180 group-hover/link:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h4 className="text-2xl font-bold text-content leading-tight group-hover:text-primary transition-colors tracking-tight font-['Poppins']">{round.title}</h4>
                            <p className="text-[15px] font-medium text-text-muted/80 leading-relaxed line-clamp-3">
                                {round.desc}
                            </p>
                        </div>

                        <div className="mt-auto pt-8 border-t border-border/40 flex flex-col gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted/30 font-['Poppins']">Focus Areas</span>
                            <p className="text-[13px] font-bold text-content tracking-tight">{round.details}</p>
                        </div>
                    </motion.div>
                ))}
              </div>

              {/* Contributor Credit */}
              <div className="mt-12 p-8 rounded-[2.5rem] border-2 border-dashed border-border/40 flex flex-col md:flex-row items-center justify-between gap-8 group transition-all hover:border-primary/20 bg-surface-hover/20">
                  <div className="flex items-center gap-5">
                      <div className="size-14 rounded-2xl bg-surface border border-border/40 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                          <Building2 className="size-6 text-text-muted opacity-40" />
                      </div>
                      <div className="flex flex-col">
                          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted/40 font-['Poppins']">Verified Platform Insight</span>
                          <span className="text-sm font-bold text-content font-['Poppins']">Contribution by Anonymous Candidate</span>
                      </div>
                  </div>
                  <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-text-muted/30 uppercase tracking-[0.3em]">Authenticity Verified</span>
                      <Sparkles className="size-4 text-primary opacity-20" />
                  </div>
              </div>

            </div>
          </section>

        </div>
      </main>

      {/* FOOTER-LESS AS REQUESTED IN PREVIOUS ITERATION */}
    </div>
  );
};

export default ExperienceOverviewPage;
