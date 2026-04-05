import React, { useEffect } from 'react';
import {
  Rocket, ArrowRight, Shield, Zap, Target,
  Search, BookOpen, UserCircle, Briefcase,
  CheckCircle2, Globe, Terminal, Layers,
  Sparkles, History, ChevronRight, HelpCircle,
  PlusCircle, Mail, Building2, Hash, LayoutGrid, 
  UserCheck, AlertCircle, Lightbulb, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PublicAppShell from '../../../layouts/PublicAppShell';
import MobileAppShell from '../../../layouts/MobileAppShell';
import { useGlobalContext } from '../../../context/GlobalContext';
import ScrollToTop from '../../../components/common/ScrollToTop';

/**
 * --- INIQ LANDING HUB (HomePage) ---
 * Purpose: This is the flagship landing page of the intelligence platform.
 * Integration: Uses the AppShells (Layouts) internally to determine desktop/mobile rendering.
 * Content: Optimized for technical Mastery and Interview Intelligence.
 */
const HomePage = () => {
  const { theme, toggleTheme, isMenuOpen, setIsMenuOpen, isLoading, setIsLoading } = useGlobalContext();

  // Ensuring the home page clears the loader sequence quickly for smooth transition
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400); // Very fast transition for home
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  const HeroSection = (
    <div className="w-full relative py-8 md:py-12 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-[1500px] w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Side: Core Value Proposition */}
        <div className="flex flex-col items-start gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20"
          >
            <Sparkles className="size-3 text-primary" />
            <span className="text-[9px] font-black uppercase tracking-[.2em] text-primary">Real Interview Insights</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tighter text-content"
          >
            Browse real interview <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1 inline-block">experiences</span> <br />
            and prepare smarter.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base text-text-muted font-medium max-w-lg leading-relaxed opacity-70"
          >
            Discover round-wise breakdowns, common questions, DSA patterns, and system design discussions in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link to="/experiences" className="btn-primary w-full sm:w-auto px-10 py-5 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest group shadow-xl">
              Explore <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/how-it-works" className="w-full sm:w-auto px-10 py-5 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest border border-border rounded-2xl hover:bg-surface-hover transition-all text-content">
              Learn How It Works <Info className="size-4 opacity-40" />
            </Link>
          </motion.div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border w-full mt-2">
            {[
              { label: "Companies", value: "100+" },
              { label: "Roles", value: "250+" },
              { label: "Experiences", value: "500+" },
              { label: "Rounds", value: "1000+" }
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col gap-0.5"
              >
                <span className="text-xl font-black text-content">{stat.value}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-text-muted opacity-40">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Visual Asset / Placeholder */}
        <div className="relative group perspective-1000 hidden lg:flex items-center justify-center scale-[0.9] origin-center lg:translate-x-6">
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.2, ease: "circOut" }}
             className="relative z-10 w-full max-w-[500px]"
           >
              {/* High-Fidelity Glow Visual */}
              <div className="absolute inset-0 bg-primary/20 blur-[130px] rounded-full scale-125 opacity-20 -z-10" />
              <div className="p-12 rounded-[4rem] bg-surface-hover/10 border border-dashed border-border/80 flex flex-col items-center justify-center text-center gap-8 min-h-[500px] group-hover:scale-[1.02] transition-all">
                  <div className="size-24 rounded-full bg-surface-hover flex items-center justify-center border border-border shadow-inner relative">
                      <Zap className="size-10 text-primary/40 animate-pulse" />
                      <div className="absolute -top-4 -right-4 size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <Rocket className="size-5 text-primary" />
                      </div>
                  </div>
                  <div className="flex flex-col gap-3">
                      <h3 className="text-2xl font-black text-content uppercase tracking-tight opacity-40">Intelligence Hub</h3>
                      <p className="text-text-muted font-bold text-[10px] uppercase tracking-[0.4em] opacity-30 leading-loose">Real insights • Round details • Career data</p>
                  </div>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );

  const HomeBody = (
    <div className="w-full flex flex-col gap-20 md:gap-24">
      {/* 2. Trust / Stats Strip */}
      <motion.section 
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-surface-hover/50 border-y border-border/40 py-10 md:py-16 relative overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
          {[
            { v: "100+", l: "Companies Covered" },
            { v: "250+", l: "Roles Shared" },
            { v: "500+", l: "Experiences Posted" },
            { v: "1000+", l: "Rounds Documented" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-1">
              <span className="text-4xl md:text-5xl font-black font-['Sora'] bg-clip-text text-transparent bg-gradient-to-b from-content to-content/60 tracking-tighter">
                {stat.v}
              </span>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-text-muted opacity-60">
                {stat.l}
              </span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 3. Features Section - Compact */}
      <motion.section 
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-[1400px] mx-auto px-6 w-full"
      >
        <div className="flex flex-col items-center text-center gap-3 mb-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">Core Platform</span>
          <h2 className="text-3xl md:text-5xl font-black text-content font-['Sora'] tracking-tight">Everything you need before your next interview.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: "Browse Real Experiences", d: "Explore actual candidate interview stories across companies and roles.", i: Globe, c: "blue-500" },
            { t: "Understand Interview Rounds", d: "See how interviews were structured from round 1 to final verdict.", i: Layers, c: "purple-500" },
            { t: "Discover Key Topics", d: "Track DSA, HLD, LLD, and behavioral topics asked in real interviews.", i: Terminal, c: "blue-500" },
            { t: "Share Your Experience", d: "Help future candidates by submitting your own interview journey.", i: Sparkles, c: "green-500" }
          ].map((item, i) => (
            <div key={i} className="group p-6 rounded-3xl bg-surface-hover border border-border/60 hover:border-primary/50 transition-all duration-300 cursor-pointer">
              <div className={`size-10 rounded-xl bg-${item.c}/10 flex items-center justify-center mb-6 border border-${item.c}/20 group-hover:scale-110 transition-transform`}>
                <item.i className={`size-5 text-${item.c}`} />
              </div>
              <h3 className="text-lg font-bold text-content mb-2">{item.t}</h3>
              <p className="text-[13px] font-medium text-text-muted leading-relaxed opacity-80">{item.d}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 4. How It Works - Branched Timeline */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-[1200px] mx-auto px-6 w-full relative"
      >
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">How It Works</span>
          <h2 className="text-4xl md:text-6xl font-black text-content font-['Sora'] tracking-tighter">A simple path from browsing to preparation.</h2>
          <p className="text-text-muted font-medium max-w-2xl text-lg">Browse real interview experiences, study rounds and topics, and use those insights to prepare better for your next opportunity.</p>
        </div>

        {/* Desktop Branched Layout */}
        <div className="relative hidden md:block mt-24 mb-32">
          <div className="absolute top-[132px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-primary via-accent to-primary opacity-30 shadow-[0_0_15px_rgba(37,99,235,0.3)]" />

          <div className="grid grid-cols-3 gap-8 relative z-10">
            {[
              { s: "01", t: "Browse by Company", d: "Find interview experiences for your target company.", c: "primary" },
              { s: "02", t: "Study Rounds", d: "Understand round flow, DSA, HLD, LLD, and advice.", c: "accent" },
              { s: "03", t: "Prepare Well", d: "Use insights to prepare and share your experience.", c: "green-500" }
            ].map((step, i) => (
              <div key={i} className={`flex flex-col items-center text-center relative ${i === 1 ? 'mt-[132px]' : ''}`}>
                {i !== 1 && (
                  <>
                    <div className="h-[120px] flex flex-col justify-end items-center gap-4 mb-2">
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] text-${step.c}`}>[ {step.s} ]</span>
                      <h3 className="text-xl font-black text-content">{step.t}</h3>
                      <p className="text-sm text-text-muted font-medium max-w-[240px]">{step.d}</p>
                    </div>
                    <div className={`w-[2px] h-[50px] bg-gradient-to-b from-${step.c}/50 to-transparent opacity-30 mt-2`} />
                    <div className={`size-4 rounded-full bg-${step.c} border-2 border-background shadow-lg shadow-${step.c}/40 -mt-2 z-10`} />
                  </>
                )}
                {i === 1 && (
                  <>
                    <div className={`size-4 rounded-full bg-${step.c} border-2 border-background shadow-lg shadow-${step.c}/40 -mb-2 z-10`} />
                    <div className={`w-[2px] h-[50px] bg-gradient-to-b from-${step.c}/50 to-transparent opacity-30`} />
                    <div className="flex flex-col items-center gap-4 mt-6">
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] text-${step.c}`}>[ {step.s} ]</span>
                      <h3 className="text-xl font-black text-content">{step.t}</h3>
                      <p className="text-sm text-text-muted font-medium max-w-[240px]">{step.d}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Stack Fallback */}
        <div className="flex md:hidden flex-col gap-12 relative py-12">
          <div className="absolute left-[20px] top-0 bottom-0 w-[2px] bg-border opacity-20" />
          {[
            { s: "01", t: "Browse by Company or Role", d: "Find interview experiences for your target company and role.", c: "primary" },
            { s: "02", t: "Study Rounds and Topics", d: "Understand round flow, DSA, HLD, LLD, and advice.", c: "accent" },
            { s: "03", t: "Prepare and Contribute", d: "Use insights to prepare and share your experience.", c: "green-500" }
          ].map((item, i) => (
            <div key={i} className="flex gap-8 items-start relative z-10">
              <div className={`size-10 shrink-0 rounded-xl bg-background border-2 border-border flex items-center justify-center text-[10px] font-black text-${item.c} shadow-lg`}>
                {item.s}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-content">{item.t}</h3>
                <p className="text-sm text-text-muted font-medium leading-relaxed">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 5. Top Companies - Auto Scroll Marquee */}
      <motion.section 
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full relative overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto px-6 w-full flex flex-col items-center text-center gap-4 mb-14">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Market Reach</span>
          <h2 className="text-3xl md:text-5xl font-black text-content font-['Sora'] tracking-tight">Explore interview experiences by company.</h2>
          <p className="text-text-muted font-medium max-w-2xl text-base opacity-70">
            Start with the companies you are targeting and discover real interview rounds, topics, verdicts, and candidate advice.
          </p>
        </div>

        {/* Marquee Wrapper with soft edge fades */}
        <div className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee flex gap-10 px-12 items-center">
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                {[
                  { name: "Google", logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg" },
                  { name: "Amazon", logo: "https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg" },
                  { name: "Microsoft", logo: "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg" },
                  { name: "Zoho", logo: "https://www.vectorlogo.zone/logos/zoho/zoho-icon.svg" },
                  { name: "Infosys", logo: "https://www.vectorlogo.zone/logos/infosys/infosys-ar21.svg" },
                  { name: "TCS", logo: "https://www.vectorlogo.zone/logos/tcs/tcs-ar21.svg" },
                  { name: "Wipro", logo: "https://www.vectorlogo.zone/logos/wipro/wipro-ar21.svg" },
                  { name: "Flipkart", logo: "https://www.vectorlogo.zone/logos/flipkart/flipkart-ar21.svg" },
                  { name: "Adobe", logo: "https://www.vectorlogo.zone/logos/adobe/adobe-icon.svg" }
                ].map((company, j) => (
                  <div
                    key={`${i}-${j}`}
                    className="flex-shrink-0 w-[180px] h-[72px] rounded-2xl bg-surface border border-border/80 flex items-center justify-center p-4 gap-3 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  >
                    <img src={company.logo} alt={company.name} className="size-6 object-contain opacity-40 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" />
                    <span className="font-bold text-content text-sm tracking-tight">{company.name}</span>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 6. Featured Interview Experiences - Professional Data Layout */}
      <motion.section 
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-[1400px] mx-auto px-6 w-full"
      >
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="flex flex-col gap-4 max-w-3xl">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Featured Experiences</span>
            <h2 className="text-3xl md:text-5xl font-black text-content font-['Sora'] tracking-tighter">Read real interview experiences shared by candidates.</h2>
            <p className="text-text-muted font-medium text-lg opacity-70">
              Explore structured interview journeys with role, experience level, topics covered, round details, final verdict, and preparation advice.
            </p>
          </div>
          <Link to="/experiences" className="flex items-center gap-3 px-10 py-4 rounded-full bg-content text-background font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl shrink-0">
            View All Experiences
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Empty State / Loading State */}
          <div className="col-span-full py-32 flex flex-col items-center text-center gap-6 border border-dashed border-border/80 rounded-[3rem] bg-surface-hover/10">
              <div className="size-20 rounded-full bg-surface-hover flex items-center justify-center border border-border shadow-inner">
                  <Search className="size-8 text-text-muted/20" />
              </div>
              <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-black text-content uppercase tracking-tight">No experiences shared yet</h3>
                  <p className="text-text-muted font-bold text-[10px] uppercase tracking-widest opacity-60">Be the first to contribute or explore other modules.</p>
              </div>
               <div className="flex items-center gap-3 mt-2">
                  <Link to="/experiences" className="px-8 py-3.5 rounded-xl bg-primary text-white font-black uppercase text-[9px] tracking-widest shadow-lg shadow-primary/10">Explore All</Link>
                  <Link to="/contact" className="px-8 py-3.5 rounded-xl bg-surface-hover text-content font-black uppercase text-[9px] tracking-widest border border-border">Contact Support</Link>
              </div>
          </div>
        </div>
      </motion.section>

      {/* 7. What You’ll Find - Compact Feature Grid */}
      <motion.section 
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-[1400px] mx-auto px-6 w-full"
      >
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">What You’ll Find</span>
          <h2 className="text-3xl md:text-5xl font-black text-content font-['Sora'] tracking-tighter">Everything you need to prepare better.</h2>
          <p className="text-text-muted font-medium max-w-3xl text-base opacity-70">
            Each interview experience is structured to help you understand the company, role, interview flow, topics, rounds, outcome, and candidate advice.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { t: "Company & Role", d: "Know which company and role the experience is for.", icon: <Building2 className="size-5 text-primary" /> },
            { t: "Topics Covered", d: "Quickly see whether the interview focused on DSA, HLD, LLD, or role skills.", icon: <Hash className="size-5 text-primary" /> },
            { t: "Round Breakdown", d: "Understand each round with separate round sections.", icon: <LayoutGrid className="size-5 text-primary" /> },
            { t: "Candidate Level", d: "Understand the candidate’s experience level before reading the journey.", icon: <UserCheck className="size-5 text-primary" /> },
            { t: "Final Verdict", d: "See whether the candidate was selected or rejected.", icon: <AlertCircle className="size-5 text-primary" /> },
            { t: "Candidate Advice", d: "Learn practical tips and suggestions for better preparation.", icon: <Lightbulb className="size-5 text-primary" /> }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-surface-hover border border-border/60 hover:bg-white/5 hover:border-primary/40 transition-all group flex flex-col gap-4 cursor-pointer">
              <div className="size-10 rounded-xl bg-background border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-black text-content uppercase tracking-tight">{item.t}</h3>
                <p className="text-sm font-medium text-text-muted leading-relaxed opacity-70">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 8. Share Your Journey - Compact CTA Separation */}
      <motion.section 
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-[1400px] mx-auto px-6 w-full py-12 md:py-16"
      >
        <div className="relative p-10 md:p-16 rounded-[2.5rem] bg-surface-hover border border-border/80 overflow-hidden group shadow-2xl shadow-primary/5">
          <div className="absolute top-0 right-0 w-[400px] h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div className="flex flex-col gap-4 max-w-2xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Share Your Journey</span>
              <h2 className="text-2xl md:text-4xl font-black text-content font-['Sora'] tracking-tighter leading-tight">Help others by sharing your interview experience.</h2>
              <p className="text-text-muted font-medium text-base md:text-lg opacity-70">Submit your interview rounds, topics covered, final verdict, and advice to help future candidates prepare better.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
              <Link to="/experiences" className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-primary text-white font-black text-[11px] uppercase tracking-widest hover:scale-105 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center">Explore</Link>
              <Link to="/how-it-works" className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-background border border-border text-content font-black text-[11px] uppercase tracking-widest hover:bg-surface-hover transition-all flex items-center justify-center">Learn How It Works</Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 9. FAQ Section - Two Column Modern Layout */}
      <motion.section 
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-[1400px] mx-auto px-6 w-full pb-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5 flex flex-col items-start gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">FAQs</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-content font-['Sora'] tracking-tighter leading-[1.1]">Frequently asked <br /> questions</h2>
            <p className="text-base text-text-muted font-medium max-w-sm leading-relaxed opacity-70">Everything you need to know about browsing and sharing interview experiences on the INIQ intelligence platform.</p>
          </div>
          <div className="lg:col-span-7 flex flex-col">
            {[
              { q: "How do I submit my interview experience?", a: "You can submit your interview experience by filling in the company name, role, candidate experience, interview overview, rounds, verdict, and advice." },
              { q: "What details should I include?", a: "Include the company, role, your experience level, topics covered, round-by-round details, final verdict, and any helpful preparation advice." },
              { q: "Can I add multiple interview rounds?", a: "Yes. Each interview round can be added separately, and every round should appear as its own section or card within your submission." },
              { q: "Can I include code solutions?", a: "Yes. The platform supports code solution content and also allows explanation of the solution logic for better clarity." },
              { q: "Will my submission be reviewed?", a: "Yes. Admins review submissions to ensure quality and relevance. Approved submissions will appear on the public platform for everyone to learn from." }
            ].map((faq, i) => (
              <details key={i} className="group border-b border-border/60">
                <summary className="flex items-center justify-between py-6 cursor-pointer list-none">
                  <h3 className="text-lg font-bold text-content group-hover:text-primary transition-colors pr-8">{faq.q}</h3>
                  <div className="size-8 rounded-full bg-surface-hover flex items-center justify-center border border-border group-open:rotate-180 transition-transform">
                    <ChevronRight className="size-4 opacity-40 group-open:opacity-100" />
                  </div>
                </summary>
                <div className="pb-8 pr-12">
                  <p className="text-[15px] font-medium text-text-muted leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );

  return (
    <>
      <PublicAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading}>
        {HeroSection}
        {HomeBody}
      </PublicAppShell>

      <MobileAppShell
        theme={theme}
        toggleTheme={toggleTheme}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isLoading={isLoading}
      >
        {HeroSection}
        {HomeBody}
      </MobileAppShell>

      {/* Global Landing Actions */}
      <ScrollToTop />
    </>
  );
};

export default HomePage;
