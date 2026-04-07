import React, { useState } from 'react';
import { Mail, Globe, Shield, Terminal, BookOpen, UserCircle, Briefcase, FileText, Home, Compass, Layers, Sparkles, PlayCircle, Info, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';

const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932Zm-1.294 19.497h2.039L6.482 3.239H4.295L17.607 20.65Z"/></svg>
);

const LinkedinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const InstagramIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const YoutubeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 103.38 103.38 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 103.38 103.38 0 0 1-15 0 2 2 0 0 1-2-2Z" /><path d="m10 15 5-3-5-3z" /></svg>
);

const PublicFooter = ({ theme }) => {
  const { setIsLoading } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <footer className="w-full pt-12 pb-6 border-t border-[var(--border)] px-4 md:px-10 lg:px-16 bg-[var(--surface)] hidden md:block transition-all duration-500 overflow-hidden relative">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="w-full max-w-[1400px] mx-auto flex flex-col relative z-10">
        {/* Main Footer Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-20 mb-12">
          {/* Logo + About Section */}
          <div className="flex flex-col items-start">
            <Link to="/" className="flex items-center mb-8">
              <div className="h-12 w-auto flex items-center justify-center">
                <img 
                  src={theme === "light" ? "/assets/logos/logo.svg" : "/assets/logos/logo-dark.svg"} 
                  alt="INIQ" 
                  className="h-10 w-auto" 
                />
              </div>
            </Link>
            <p className="text-sm font-medium text-[var(--text-secondary)] leading-relaxed mb-8">
              Learn from real interview experiences, discover company-wise rounds, and prepare with confidence. 
              The next-generation intelligence platform for technical mastery.
            </p>
            <div className="flex flex-col gap-4 w-full pt-6 border-t border-[var(--border)] mt-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] opacity-40">Social Presence</span>
              <div className="flex items-center gap-4">
                {[
                  { Icon: LinkedinIcon, color: "hover:text-white hover:bg-[#0077B5]" },
                  { Icon: XIcon, color: "hover:text-white hover:bg-black" },
                  { Icon: InstagramIcon, color: "hover:text-white hover:bg-[#E4405F]" },
                  { Icon: YoutubeIcon, color: "hover:text-white hover:bg-[#FF0000]" }
                ].map((item, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className={`p-2.5 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] transition-all hover:scale-110 active:scale-95 shadow-sm group ${item.color}`}
                  >
                    <item.Icon className="w-4.5 h-4.5 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-[12px] font-black uppercase tracking-[0.25em] text-[var(--text)] opacity-70 mb-8">Quick Links</h4>
            <ul className="flex flex-col gap-5 text-sm font-semibold text-[var(--text-secondary)]">
              <li className="group"><Link to="/" onClick={() => setIsLoading(true)} className="hover:text-primary transition-all flex items-center gap-2 group-hover:translate-x-1"><Home className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /> Home</Link></li>
              <li className="group"><Link to="/experiences" onClick={() => setIsLoading(true)} className="hover:text-primary transition-all flex items-center gap-2 group-hover:translate-x-1"><Compass className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /> Explore</Link></li>
              <li className="group"><Link to="/resources" onClick={() => setIsLoading(true)} className="hover:text-primary transition-all flex items-center gap-2 group-hover:translate-x-1"><Layers className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /> Resources</Link></li>
              <li className="group"><Link to="/how-it-works" onClick={() => setIsLoading(true)} className="hover:text-primary transition-all flex items-center gap-2 group-hover:translate-x-1"><Info className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /> How It Works</Link></li>
              <li className="group"><Link to="/login" className="hover:text-primary transition-all flex items-center gap-2 group-hover:translate-x-1"><UserCircle className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /> Login</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col">
            <h4 className="text-[12px] font-black uppercase tracking-[0.25em] text-[var(--text)] opacity-70 mb-8">Resources</h4>
            <ul className="flex flex-col gap-5 text-sm font-semibold text-[var(--text-secondary)]">
              <li className="group"><Link to="/resources" className="hover:text-accent transition-all flex items-center gap-2 group-hover:translate-x-1"><Globe className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /> Companies</Link></li>
              <li className="group"><Link to="/resources" className="hover:text-accent transition-all flex items-center gap-2 group-hover:translate-x-1"><UserCircle className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /> Roles</Link></li>
              <li className="group"><Link to="/resources" className="hover:text-accent transition-all flex items-center gap-2 group-hover:translate-x-1"><BookOpen className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /> Topics</Link></li>
              <li className="group"><Link to="/how-it-works" className="hover:text-accent transition-all flex items-center gap-2 group-hover:translate-x-1"><Layers className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /> Interview Rounds</Link></li>
              <li className="group"><Link to="/resources" className="hover:text-accent transition-all flex items-center gap-2 group-hover:translate-x-1"><Terminal className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /> DSA Prep</Link></li>
              <li className="group"><Link to="/resources" className="hover:text-accent transition-all flex items-center gap-2 group-hover:translate-x-1"><Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /> System Design</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col">
            <h4 className="text-[12px] font-black uppercase tracking-[0.25em] text-[var(--text)] opacity-70 mb-8">Support</h4>
            <ul className="flex flex-col gap-5 text-sm font-semibold text-[var(--text-secondary)]">
              <li className="group"><Link to="/help-center" onClick={() => setIsLoading(true)} className="hover:text-blue-500 transition-all flex items-center gap-2 group-hover:translate-x-1"><Mail className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /> Help Center</Link></li>
              <li className="group"><Link to="/contact" onClick={() => setIsLoading(true)} className="hover:text-blue-500 transition-all flex items-center gap-2 group-hover:translate-x-1"><Mail className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /> Contact</Link></li>
              <li className="group"><Link to="/privacy-policy" onClick={() => setIsLoading(true)} className="hover:text-blue-500 transition-all flex items-center gap-2 group-hover:translate-x-1"><Shield className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /> Privacy Policy</Link></li>
              <li className="group"><Link to="/terms-of-service" onClick={() => setIsLoading(true)} className="hover:text-blue-500 transition-all flex items-center gap-2 group-hover:translate-x-1"><FileText className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /> Terms of Service</Link></li>
              <li className="group"><Link to="/cookie-policy" onClick={() => setIsLoading(true)} className="hover:text-blue-500 transition-all flex items-center gap-2 group-hover:translate-x-1"><FileText className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /> Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="w-full p-8 md:p-10 mb-12 rounded-[2.5rem] bg-[var(--surface)] border border-[var(--border)] flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 relative overflow-hidden transition-all duration-300 shadow-sm">
          <div className="flex flex-col lg:flex-1 text-center lg:text-left relative z-10">
            <h3 className="text-2xl md:text-3xl font-black font-['Sora'] tracking-tighter text-[var(--text)] mb-3">Stay in the Loop</h3>
            <p className="text-sm md:text-base font-medium text-[var(--text-secondary)] max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Real interview insights and preparation tips delivered straight to your inbox.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto lg:min-w-[440px] relative z-10">
            <div className="relative w-full group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)] opacity-50 group-focus-within:text-primary transition-colors" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                disabled={status === "success"}
                className="w-full h-12 pl-12 pr-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[var(--text)] disabled:opacity-50"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={status !== "idle"}
              className={`${status === 'success' ? 'bg-green-500 text-white' : theme === 'light' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} w-full sm:w-auto h-12 px-8 font-bold text-xs uppercase tracking-[0.15em] rounded-xl hover:opacity-90 transition-all shadow-lg active:scale-95 whitespace-nowrap flex items-center justify-center gap-2 min-w-[140px]`}
            >
              {status === "loading" ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : status === "success" ? (
                <><CheckCircle2 className="w-4 h-4" /> Subscribed</>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className="w-full pt-6 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[var(--text-secondary)] opacity-40">
            © 2026 INIQ. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-40">
            Built for better interview preparation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
