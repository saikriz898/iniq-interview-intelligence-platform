import React, { useState } from 'react';
import { Mail, ChevronDown, CheckCircle2, Rocket, Home, Compass, Info, UserCircle, Shield, FileText, Globe, BookOpen, Layers, Terminal, Sparkles, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

const MobileFooter = ({ theme }) => {
  const { setIsLoading } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", path: "/" },
        { name: "Explore", path: "/experiences" },
        { name: "How It Works", path: "/how-it-works" },
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Companies", path: "/error/no-results" },
        { name: "Roles", path: "/error/no-results" },
        { name: "Topics", path: "/error/no-results" },
        { name: "Interview Rounds", path: "/error/experience-unavailable" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "/help-center" },
        { name: "Contact", path: "/contact" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms of Service", path: "/terms-of-service" },
        { name: "Cookie Policy", path: "/cookie-policy" }
      ]
    }
  ];

  return (
    <footer className="w-full bg-[var(--surface)] border-t border-[var(--border)] pt-12 pb-8 px-6 md:hidden relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none opacity-40 translate-y-20" />

      <div className="relative z-10">
        {/* Branding */}
        <div className="flex flex-col items-center text-center mb-10">
          <img 
            src={theme === "light" ? "/assets/logos/logo.svg" : "/assets/logos/logo-dark.svg"} 
            alt="INIQ" 
            className="h-10 w-auto mb-6" 
          />
          <p className="text-sm font-medium text-[var(--text-secondary)] leading-relaxed max-w-xs">
            The next-generation intelligence platform for technical mastery and interview preparation.
          </p>
        </div>

        {/* Newsletter - Mobile Optimized */}
        <div className="mb-12 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
          <h3 className="text-lg font-bold font-['Sora'] mb-2 text-[var(--text)]">Stay Updated</h3>
          <p className="text-xs text-[var(--text-secondary)] mb-5">Get the latest interview insights directly.</p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)] opacity-40" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address" 
                className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-primary transition-all text-[var(--text)]"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={status !== 'idle'}
              className={`h-12 rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${
                status === 'success' ? 'bg-green-500 text-white' : 'bg-primary text-white shadow-lg shadow-primary/20'
              }`}
            >
              {status === 'loading' ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : status === 'success' ? (
                <><CheckCircle2 className="size-4" /> Subscribed</>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        </div>

        {/* Accordion Links */}
        <div className="flex flex-col gap-1 mb-12">
          {footerSections.map((section) => (
            <div key={section.title} className="border-b border-[var(--border)] last:border-0">
              <button 
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between py-5 text-sm font-bold text-[var(--text)]"
              >
                {section.title}
                <motion.div
                  animate={{ rotate: expandedSection === section.title ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="size-4 opacity-40" />
                </motion.div>
              </button>
              <AnimatePresence>
                {expandedSection === section.title && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <ul className="flex flex-col gap-4 pb-6 px-1">
                      {section.links.map(link => (
                        <li key={link.name}>
                          <Link 
                            to={link.path} 
                            onClick={() => { setIsLoading(true); onClose && onClose(); }}
                            className="text-sm font-medium text-[var(--text-secondary)] hover:text-primary transition-colors inline-block"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-3.5 mb-10">
          {[
            { Icon: LinkedinIcon, color: "active:bg-[#0077B5] active:text-white" },
            { Icon: XIcon, color: "active:bg-black active:text-white" },
            { Icon: InstagramIcon, color: "active:bg-[#E4405F] active:text-white" },
            { Icon: YoutubeIcon, color: "active:bg-[#FF0000] active:text-white" }
          ].map((item, i) => (
            <a 
              key={i} 
              href="#" 
              className={`p-2.5 rounded-xl bg-white/5 border border-white/5 text-[var(--text-secondary)] transition-all active:scale-90 shadow-sm ${item.color}`}
            >
              <item.Icon className="size-4.5" />
            </a>
          ))}
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col items-center gap-6 pt-8 border-t border-[var(--border)]">
          <p className="text-[10px] font-black tracking-[.3em] text-[var(--text-secondary)] opacity-40 text-center max-w-[240px] leading-relaxed">
            © 2026 INIQ. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity mb-4 cursor-default group">
            <Rocket className="size-3.5 text-primary group-hover:animate-bounce" />
            <span className="text-[10px] font-bold text-[var(--text-secondary)] tracking-[.25em] uppercase">
              Technical Mastery <span className="text-primary tracking-normal font-black ml-1">Starts Here</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;
