import React, { useEffect, useState } from 'react';
import {
  Rocket, ArrowRight, Shield, Zap, Target,
  Search, BookOpen, UserCircle, Briefcase,
  CheckCircle2, Globe, Terminal, Layers,
  Sparkles, History, ChevronRight, HelpCircle,
  PlusCircle, Mail, Building2, Hash, LayoutGrid, Clock,
  UserCheck, AlertCircle, Lightbulb, Info, RefreshCcw } from 'lucide-react';
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

  const [featuredExperiences, setFeaturedExperiences] = useState([]);
  const [isFetchingFeatured, setIsFetchingFeatured] = useState(true);

  // Ensuring the home page clears the loader sequence quickly for smooth transition
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400); // Very fast transition for home
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/experiences/approved');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          // Take the latest 3
          setFeaturedExperiences(data.slice(0, 3));
        }
      } catch (err) {
        console.error('Failed to fetch featured experiences', err);
      } finally {
        setIsFetchingFeatured(false);
      }
    };
    fetchFeatured();
  }, []);

  const HeroSection = (
    <div className="w-full relative py-12 md:py-20 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-[1600px] w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Side: Core Value Proposition */}
        <div className="lg:col-span-5 flex flex-col items-start gap-8 relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20"
          >
            <Sparkles className="size-3.5 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[.25em] text-primary">Platform Status: Online</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1] tracking-tight text-content font-['Space_Grotesk'] uppercase"
          >
            Master the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 inline-block">Interview</span> <br />
            Landscape.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary font-medium max-w-lg leading-relaxed "
          >
            The next-generation community hub for real interview experiences, structured round breakdowns, and preparation insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
          >
            <Link to="/experiences" className="btn-primary w-full sm:w-auto px-12 py-5 flex items-center justify-center gap-3 text-xs tracking-widest uppercase group shadow-2xl">
              Explore experiences <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/how-it-works" className="btn-secondary w-full sm:w-auto px-12 py-5 flex items-center justify-center gap-3 text-xs tracking-widest uppercase">
              How it Works
            </Link>
          </motion.div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-border w-full mt-4">
            {[
              { label: "Companies", value: "100+" },
              { label: "Roles", value: "250+" },
              { label: "Experiences", value: "500+" },
              { label: "Rounds", value: "1.2k" }
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col gap-1"
              >
                <span className="text-2xl font-bold text-content font-['Space_Grotesk']">{stat.value}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary ">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Visual/Card */}
        <div className="lg:col-span-7 relative flex lg:justify-end justify-center items-center h-[500px] md:h-[600px] w-full">
           <motion.div
             initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
             animate={{ opacity: 1, scale: 1, rotate: 0 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="relative z-10 w-full max-w-[650px]"
           >
              {/* Technical Glow Effects - Enhanced */}
              <div className="absolute -inset-24 bg-primary/20 blur-[120px] rounded-full opacity-30 animate-pulse -z-10" />
              <div className="absolute -inset-16 bg-accent/10 blur-[80px] rounded-full opacity-20 -z-10 delay-700" />
              
              {/* Custom CSS Component Replicating the Original Image */}
              <motion.div
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-[3rem] w-full max-w-[450px] aspect-[4/5] mx-auto overflow-hidden border border-theme shadow-[0_50px_100px_rgba(0,0,0,0.4)] bg-card-bg flex flex-col items-center"
              >
                  {/* SVG Wavy Path */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path 
                      d="M 80,100 C 70,80 10,70 30,55 C 45,45 50,40 50,32" 
                      fill="none" 
                      stroke="url(#pathGradient)" 
                      strokeWidth="2" 
                      className="drop-shadow-lg"
                    />
                    <defs>
                      <linearGradient id="pathGradient" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Holographic Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-bg/15 via-transparent to-accent/5 pointer-events-none z-0" />
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('/assets/noise.svg')] bg-repeat z-0" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
                    
                    {/* Top Goal Area */}
                    <div className="flex flex-col items-center gap-3 mt-2">
                      <span className="px-4 py-1.5 rounded-lg bg-accent text-primary-text font-bold text-[13px] tracking-wide shadow-lg shadow-accent/20">
                        Land Your Dream Role
                      </span>
                      <div className="flex items-center justify-center mt-3 z-20 bg-card-bg/50 backdrop-blur-md px-4 py-2 rounded-2xl border border-border/50">
                        {/* Real MAANG Logos */}
                        <div className="flex items-center gap-3">
                          <img src="https://cdn.simpleicons.org/meta/0668E1" alt="Meta" className="h-5 object-contain drop-shadow-md" />
                          <img src="https://cdn.simpleicons.org/apple/white" alt="Apple" className="h-5 object-contain drop-shadow-md" />
                          {/* Amazon Inline SVG to prevent adblock breakage */}
                          <svg viewBox="0 0 100 100" className="h-5 w-auto drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
                            <path d="M60.6,35.4c-6.1-2.9-14-4-21.7-2.3c-4.9,1.1-10.7,4.4-12.7,9.3c-1.3,3.2-1.1,7.2,1,10c2.5,3.3,7.5,4.7,11.5,5.1 c5.5,0.5,11.3,0.1,16.5-1.5c4.7-1.5,10.1-4,13.2-8.1c0,2.1,0.2,4.3,0.3,6.4c0.2,3.1,1.1,6.2,3.1,8.6c0.8-2.6,0.9-5.5,0.9-8.3 c0-10.5-0.1-21-0.1-31.5c0-4,0.1-8-0.9-11.9c-1.4-5.3-5.2-10-10.4-11.9c-5.5-2.1-12.1-2-17.7-0.4c-4.6,1.4-8.8,4.5-11.6,8.4 c2.2,1.9,4.4,3.7,6.6,5.6c2.4-3.5,6.3-5.5,10.5-6.3c3.4-0.6,7.2-0.5,10.2,1.3c2.7,1.6,3.6,5,3.6,8.1C62.7,24,62.7,29.7,60.6,35.4z M62.6,42.8c-2,3-6.5,4.9-9.9,5.7c-4.4,1-9.1,1.4-13.6,0.8c-2.8-0.4-5.9-1.5-7.5-3.9c-1.5-2.3-1.6-5.5-0.3-7.9 c1.7-3.4,6.2-5.7,9.7-6.5c6.3-1.4,13-0.8,18.8,1.4C61.3,34,62.1,38.5,62.6,42.8z" fill="#FFFFFF"/>
                            <path d="M12.7,73.4c17.5,10,38.1,11,56.5,4.2c6.9-2.5,13.4-6.3,18.7-11.3c-2.3-0.6-4.6-1.1-6.9-1.7c-4.5,3.8-9.8,6.8-15.5,8.8 c-16,5.6-34,4.8-49.2-3.3C15.1,68.9,13.9,71.2,12.7,73.4z" fill="#FF9900"/>
                            <path d="M91.3,55.5c0.4,3.2,1.1,6.3,2.4,9.2c-3.1-0.2-6.1-0.8-8.9-1.9C86.7,60.2,88.7,57.7,91.3,55.5z" fill="#FF9900"/>
                          </svg>
                          <img src="https://cdn.simpleicons.org/netflix/E50914" alt="Netflix" className="h-5 object-contain drop-shadow-md" />
                          <img src="https://cdn.simpleicons.org/google" alt="Google" className="h-5 object-contain drop-shadow-md" />
                        </div>
                      </div>
                      {/* Triangle pointer at the end of the path */}
                      <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[18px] border-b-accent mt-4 z-20" />
                    </div>

                    {/* Nodes along the path (Absolute Positioned for effect) */}
                    <div className="relative w-full flex-grow">
                      {/* Node 1 */}
                      <div className="absolute top-[8%] left-[5%] flex flex-col items-start z-20">
                        <span className="px-3 py-1 rounded-md bg-accent text-primary-text text-[10px] font-bold tracking-wider mb-2 shadow-md shadow-accent/20">
                          Conquer
                        </span>
                        <span className="text-2xl font-black text-primary-text leading-[1.1] font-['Space_Grotesk'] tracking-tight">
                          Your <br/> Interviews
                        </span>
                      </div>

                      {/* Node 2 */}
                      <div className="absolute top-[45%] right-[5%] flex flex-col items-end text-right z-20">
                        <span className="px-3 py-1 rounded-md bg-accent text-primary-text text-[10px] font-bold tracking-wider mb-2 shadow-md shadow-accent/20">
                          Master
                        </span>
                        <span className="text-xl font-black text-primary-text leading-[1.1] font-['Space_Grotesk'] tracking-tight">
                          DSA & System <br/> Design LIVE
                        </span>
                      </div>

                      {/* Node 3 */}
                      <div className="absolute bottom-[5%] left-[5%] flex flex-col items-start z-20">
                        <span className="px-3 py-1 rounded-md bg-accent text-primary-text text-[10px] font-bold tracking-wider mb-2 shadow-md shadow-accent/20">
                          Kickstart at
                        </span>
                        <span className="text-xl font-black text-primary-text leading-[1.1] font-['Space_Grotesk'] tracking-tight">
                          Elite Coding <br/> Pro
                        </span>
                      </div>
                    </div>
                  </div>
              </motion.div>

              {/* Decorative Tech Decals */}
              <div className="absolute -top-10 -left-10 size-28 border-t-2 border-l-2 border-primary/20 rounded-tl-[3.5rem] pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 size-28 border-b-2 border-r-2 border-accent/20 rounded-br-[3.5rem] pointer-events-none" />

              {/* Floating Tech Badges */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-12 -right-12 size-20 rounded-2xl bg-surface/90 backdrop-blur-2xl border border-border flex items-center justify-center shadow-2xl z-30"
              >
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-lg animate-pulse" />
                    <Zap className="size-8 text-primary relative z-10" />
                  </div>
              </motion.div>
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
              <span className="text-4xl md:text-5xl font-black font-['Sora'] bg-clip-text text-transparent bg-gradient-to-r from-content to-content/60 tracking-tighter">
                {stat.v}
              </span>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-text-muted ">
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
              <p className="text-[13px] font-medium text-text-muted leading-relaxed ">{item.d}</p>
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
          <div className="absolute top-[132px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-primary via-accent to-primary opacity-30 shadow-[0_0_15px_rgba(37,99,235,0.3)] overflow-hidden">
             <motion.div 
               className="h-full w-full bg-accent"
               initial={{ x: "-100%" }}
               whileInView={{ x: "100%" }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             />
          </div>

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
                    <div className={`w-[2px] h-[50px] bg-gradient-to-b from-${step.c}/50 opacity-30 mt-2`} />
                    <div className={`size-4 rounded-full bg-${step.c} border-2 border-background shadow-lg shadow-${step.c}/40 -mt-2 z-10`} />
                  </>
                )}
                {i === 1 && (
                  <>
                    <div className={`size-4 rounded-full bg-${step.c} border-2 border-background shadow-lg shadow-${step.c}/40 -mb-2 z-10`} />
                    <div className={`w-[2px] h-[50px] bg-gradient-to-b from-${step.c}/50 opacity-30`} />
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
          <p className="text-text-muted font-medium max-w-2xl text-base ">
            Start with the companies you are targeting and discover real interview rounds, topics, verdicts, and candidate advice.
          </p>
        </div>

        {/* Marquee Wrapper with soft edge fades */}
        <div className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee flex gap-10 px-12 items-center">
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                {[
                  { name: "Google", logo: "https://ui-avatars.com/api/?name=Google&background=random&color=fff" },
                  { name: "Amazon", logo: "https://ui-avatars.com/api/?name=Amazon&background=random&color=fff" },
                  { name: "Microsoft", logo: "https://ui-avatars.com/api/?name=Microsoft&background=random&color=fff" },
                  { name: "Meta", logo: "https://ui-avatars.com/api/?name=Meta&background=random&color=fff" },
                  { name: "Apple", logo: "https://ui-avatars.com/api/?name=Apple&background=random&color=fff" },
                  { name: "Netflix", logo: "https://ui-avatars.com/api/?name=Netflix&background=random&color=fff" },
                  { name: "Adobe", logo: "https://ui-avatars.com/api/?name=Adobe&background=random&color=fff" },
                  { name: "Uber", logo: "https://ui-avatars.com/api/?name=Uber&background=random&color=fff" },
                  { name: "Airbnb", logo: "https://ui-avatars.com/api/?name=Airbnb&background=random&color=fff" }
                ].map((company, j) => (
                  <div
                    key={`${i}-${j}`}
                    className="flex-shrink-0 w-[180px] h-[72px] rounded-2xl bg-surface border border-border/80 flex items-center justify-center p-4 gap-3 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  >
                    <img src={company.logo} alt={company.name} className="size-6 object-contain" />
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
            <p className="text-text-muted font-medium text-lg ">
              Explore structured interview journeys with role, experience level, topics covered, round details, final verdict, and preparation advice.
            </p>
          </div>
          <Link to="/experiences" className="flex items-center gap-3 px-10 py-4 rounded-full bg-content text-background font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-[0.98] transition-all shadow-xl shrink-0">
            View All Experiences
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isFetchingFeatured ? (
             <div className="col-span-full py-32 flex flex-col items-center text-center gap-6 border border-dashed border-border/80 rounded-[3rem] bg-surface-hover/10">
                <div className="size-20 rounded-full flex items-center justify-center">
                    <div className="size-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                </div>
                <h3 className="text-xl font-black text-content uppercase tracking-tight">Syncing Data...</h3>
             </div>
          ) : featuredExperiences.length > 0 ? (
            featuredExperiences.map((exp, i) => (
              <div key={exp._id || i} className="group flex flex-col bg-surface/30 border border-white/5 hover:border-primary/20 rounded-2xl p-6 transition-all hover:bg-white/[0.02] hover:shadow-lg hover:shadow-primary/5 cursor-pointer" onClick={() => window.location.href = `/experiences/${exp._id}`}>
                 <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                       <div className="size-10 rounded-xl bg-white border border-border/20 p-2 shadow-sm flex items-center justify-center">
                          <img src={exp.company ? `https://logo.clearbit.com/${exp.company.replace(/\s+/g, '').toLowerCase()}.com` : `https://ui-avatars.com/api/?name=Company&background=random&color=fff`} alt={exp.company || 'Company'} className="w-full h-full object-contain" onError={(e) => { e.target.onerror = null; e.target.src=`https://ui-avatars.com/api/?name=${exp.company || 'Company'}&background=random&color=fff` }} />
                       </div>
                       <div>
                          <h3 className="text-sm font-bold text-content font-['Poppins'] tracking-tight">{exp.company || 'Unknown Company'}</h3>
                          <p className="text-[10px] text-text-muted font-medium">{new Date(exp.createdAt).toLocaleDateString()}</p>
                       </div>
                    </div>
                    <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider ${(exp.verdict || '').toLowerCase() === 'selected' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                       {exp.verdict || 'Reviewed'}
                    </span>
                 </div>
                 <h4 className="text-base font-bold text-content mb-2 line-clamp-1">{exp.role}</h4>
                 <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] font-medium text-text-secondary flex items-center gap-1.5"><Briefcase className="size-3"/>{exp.candidateExperience !== undefined ? `${exp.candidateExperience} Years` : 'Fresh Grad'}</span>
                    <span className="text-[11px] font-medium text-text-secondary flex items-center gap-1.5"><Clock className="size-3"/>{exp.rounds?.length || 0} Rounds</span>
                 </div>
                 <p className="text-[13px] text-text-muted leading-relaxed line-clamp-2 mb-6">
                    {exp.processOverview || 'Detailed interview journey available inside...'}
                 </p>
                 <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                    <div className="flex items-center gap-2 flex-wrap">
                       {exp.topics && Object.entries(exp.topics).filter(([k,v]) => v && typeof v === 'boolean').slice(0, 2).map(([topic], idx) => (
                          <span key={idx} className="px-2 py-1 rounded bg-primary/5 border border-primary/10 text-[9px] font-semibold text-primary uppercase tracking-wider">
                             {topic}
                          </span>
                       ))}
                    </div>
                    <button className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider group-hover:bg-primary group-hover:text-white transition-all">
                       Open <ArrowRight className="size-3 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                    </button>
                 </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 flex flex-col items-center text-center gap-6 border border-dashed border-border/80 rounded-[3rem] bg-surface-hover/10">
                <div className="size-20 rounded-full bg-surface-hover flex items-center justify-center border border-border shadow-inner">
                    <Search className="size-8 text-text-muted/20" />
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-black text-content uppercase tracking-tight">No experiences shared yet</h3>
                    <p className="text-text-muted font-bold text-[10px] uppercase tracking-widest ">Be the first to contribute or explore other modules.</p>
                </div>
                 <div className="flex items-center gap-3 mt-2">
                    <Link to="/experiences" className="px-8 py-3.5 rounded-xl bg-primary text-primary-text font-black uppercase text-[9px] tracking-widest shadow-lg shadow-primary/10">Explore All</Link>
                    <Link to="/contact" className="px-8 py-3.5 rounded-xl bg-surface-hover text-content font-black uppercase text-[9px] tracking-widest border border-border">Contact Support</Link>
                </div>
            </div>
          )}
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
          <p className="text-text-muted font-medium max-w-3xl text-base ">
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
            <div key={i} className="p-8 rounded-[2rem] bg-surface-hover border border-border/60 hover:bg-card-bg hover:border-primary/40 transition-all group flex flex-col gap-4 cursor-pointer">
              <div className="size-10 rounded-xl bg-background border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-black text-content uppercase tracking-tight">{item.t}</h3>
                <p className="text-sm font-medium text-text-muted leading-relaxed ">{item.d}</p>
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
          <div className="absolute top-0 right-0 w-[400px] h-full  from-primary/5  pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div className="flex flex-col gap-4 max-w-2xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Share Your Journey</span>
              <h2 className="text-2xl md:text-4xl font-black text-content font-['Sora'] tracking-tighter leading-tight">Help others by sharing your interview experience.</h2>
              <p className="text-text-muted font-medium text-base md:text-lg ">Submit your interview rounds, topics covered, final verdict, and advice to help future candidates prepare better.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
              <Link to="/experiences" className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-primary text-primary-text font-black text-[11px] uppercase tracking-widest hover:scale-105 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center">Explore</Link>
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
            <p className="text-base text-text-muted font-medium max-w-sm leading-relaxed ">Everything you need to know about browsing and sharing interview experiences on the INIQ intelligence platform.</p>
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
