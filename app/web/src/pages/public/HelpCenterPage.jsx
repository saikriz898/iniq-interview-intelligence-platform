import React, { useEffect, useState } from 'react';
import { 
  HelpCircle, Search, MessageSquare, BookOpen, 
  ShieldCheck, Zap, Globe, Layers, 
  ArrowRight, CheckCircle2, Info, X, 
  Rocket, History, Clock, Building2, UserCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SupportAppShell from '../../layouts/SupportAppShell';
import { useGlobalContext } from '../../context/GlobalContext';
import ScrollToTop from '../../components/common/ScrollToTop';

/**
 * --- HELP CENTER ---
 * Purpose: Central intelligence hub for user support and platform guidance.
 * Design: High-fidelity, Split-screen layout (Left: Quick Help, Right: Support Topics).
 */
const HelpCenterPage = () => {
  const { setIsLoading, isLoading } = useGlobalContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // --- INTERACTIVE MODAL DATA ---
  const modalContent = {
    browse: {
      title: "Browse Real Experiences",
      icon: Globe,
      color: "blue",
      desc: "Our platform features a granular search engine designed to filter through hundreds of real interview journeys. You can search by technical stack (DSA, HLD, LLD), experience level (Fresher to 10+ years), or specific companies like Google, Amazon, and Zoho.",
      tip: "Pro Tip: Use the 'Topics' filter to find experiences that specifically mention the stack you're preparing for."
    },
    rounds: {
      title: "Round-wise Breakdown",
      icon: Layers,
      color: "purple",
      desc: "Every experience is meticulously structured into its component rounds. From Online Assessments (OA) to Machine Coding, Technical discussions, and Behavioral (Hiring Manager) rounds. We provide the context, duration, and key questions for each stage.",
      tip: "Focus on the 'Verdict' section to understand what candidates did right or where they faced challenges."
    },
    account: {
      title: "Account & Login Issues",
      icon: UserCircle,
      color: "amber",
      desc: "If you're having trouble accessing your candidate portal, ensure you're using the registered email. We use secure authentication protocols. For password resets, trigger a reset link from the login page.",
      tip: "Security Note: We recommend enabling MFA for all developer accounts to protect your submission history."
    },
    guidelines: {
      title: "Submission Guidelines",
      icon: CheckCircle2,
      color: "green",
      desc: "To maintain the highest quality of interview intelligence, we require all submissions to be truthful, structured, and detailed. Avoid NDA-sensitive specific question text, but do describe the core concepts and patterns asked.",
      tip: "Submisisons with clear preparation 'Advice' are 3x more likely to be featured on the home page."
    },
    approval: {
      title: "Moderation & Approval",
      icon: Clock,
      color: "blue",
      desc: "Every interview experience goes through a technical review by our moderation team. This ensures that the data is structured correctly and contains meaningful insights for the community. The process typically takes 24-48 hours.",
      tip: "You will receive a notification in your portal once your experience is live for the community."
    },
    company: {
      title: "Companies & Role Lists",
      icon: Building2,
      color: "indigo",
      desc: "If your target company or specific role isn't listed, you can request an addition through the 'Contact' page. We constantly update our database based on the latest hiring trends in the software industry.",
      tip: "Role Specificity: We differentiate between General SDE, Frontend, Backend, and Specialized roles like DevOps or AI/ML."
    }
  };

  const HelpHero = (
    <div className="w-full pt-12 md:pt-16 pb-12 flex flex-col items-center text-center px-5">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 mb-6"
      >
        <Zap className="size-3 text-primary" />
        <span className="text-[9px] font-black uppercase tracking-[.2em] text-primary">Intelligence Hub</span>
      </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-black text-content tracking-tight mb-4"
      >
        How can we <span className="text-primary italic">help?</span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm md:text-base text-text-muted font-medium max-w-2xl opacity-70"
      >
        Explore our platform guides, technical FAQS, and support resources designed <br className="hidden md:block" />
         to help you navigate INIQ's interview intelligence.
      </motion.p>
    </div>
  );

  const SupportModal = ({ id, onClose }) => {
    const content = modalContent[id];
    if (!content) return null;
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-sm bg-black/40"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="w-full max-w-lg bg-surface border border-border p-8 md:p-10 rounded-[3rem] shadow-2xl relative overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-6 right-6 size-10 rounded-full bg-surface-hover border border-border flex items-center justify-center text-text-muted hover:text-primary transition-all">
            <X className="size-5" />
          </button>
          
          <div className={`size-16 rounded-2xl bg-${content.color}-500/10 border border-${content.color}-500/20 flex items-center justify-center mb-8`}>
            <content.icon className={`size-8 text-${content.color}-500`} />
          </div>

          <h3 className="text-2xl font-black text-content uppercase tracking-tight mb-4">{content.title}</h3>
          <p className="text-sm font-medium text-text-muted leading-relaxed mb-8 opacity-80">{content.desc}</p>
          
          <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4 mb-10">
            <Info className="size-5 text-primary shrink-0 mt-1" />
            <p className="text-[11px] font-black text-primary/80 uppercase tracking-widest leading-relaxed">
              {content.tip}
            </p>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-4 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
          >
            Got it, thanks!
          </button>
        </motion.div>
      </motion.div>
    );
  };

  const LeftColumn = (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        {[
          { icon: Globe, label: "Platform Overview", action: () => setActiveModal('browse') },
          { icon: MessageSquare, label: "Community Rules", action: () => setActiveModal('guidelines') },
          { icon: Clock, label: "Moderation Queue", action: () => setActiveModal('approval') }
        ].map((item, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + (i * 0.1) }}
            onClick={item.action}
            className="p-6 rounded-[2rem] bg-surface-hover/30 border border-border/80 hover:border-primary/40 hover:bg-surface group transition-all text-left flex items-center gap-5"
          >
            <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <item.icon className="size-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase tracking-widest text-content">{item.label}</span>
              <span className="text-[10px] font-medium text-text-muted">Interactive Guide</span>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-8 rounded-[2.5rem] bg-white border-none shadow-[0_15px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] flex flex-col gap-6"
      >
        <div className="flex items-center gap-4">
           <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
             <MessageSquare className="size-5 text-primary" />
           </div>
           <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Direct Support</h4>
        </div>
        <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wider leading-relaxed">
          Can't find what you're looking for? Reach out to our technical <span className="text-primary italic">support engine.</span>
        </p>
        <button 
          onClick={() => window.location.href = '/contact'}
          className="w-full py-4 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          Contact Team <ArrowRight className="size-3" />
        </button>
      </motion.div>
    </div>
  );

  const RightColumn = (
    <div className="flex flex-col gap-8 h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
        {[
          { 
            title: "Round Details", 
            icon: Layers, 
            color: "purple", 
            topic: "Intelligence",
            action: () => setActiveModal('rounds')
          },
          { 
            title: "Account Access", 
            icon: UserCircle, 
            color: "amber", 
            topic: "Security",
            action: () => setActiveModal('account')
          },
          { 
            title: "Submission", 
            icon: CheckCircle2, 
            color: "green", 
            topic: "Standards",
            action: () => setActiveModal('guidelines')
          },
          { 
            title: "Company Lists", 
            icon: Building2, 
            color: "indigo", 
            topic: "Platform",
            action: () => setActiveModal('company')
          }
        ].map((topic, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (i * 0.1) }}
            onClick={topic.action}
            className="flex flex-col p-8 rounded-[2.5rem] bg-surface border border-border group hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden h-full"
          >
             <div className="absolute top-0 right-0 p-6 opacity-[0.03] scale-150 pointer-events-none group-hover:scale-110 transition-transform">
                <topic.icon className="size-24 text-content" />
             </div>
             
             <div className={`size-10 rounded-xl bg-${topic.color}-500/10 border border-${topic.color}-500/20 flex items-center justify-center mb-6`}>
                <topic.icon className={`size-5 text-${topic.color}-500`} />
             </div>

             <div className="mt-auto">
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-text-muted/60 mb-2 block">{topic.topic}</span>
               <h3 className="text-xl font-black text-content uppercase tracking-tight">{topic.title}</h3>
               <div className="flex items-center gap-2 mt-4 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                  Read More <ArrowRight className="size-3" />
               </div>
             </div>
          </motion.div>
        ))}
      </div>
      
      {/* Search Bar - Integrated in Right Column Bottom or Top */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative group w-full"
      >
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-text-muted/40 group-focus-within:text-primary transition-colors" />
        <input 
          type="text"
          placeholder="Search for questions or topics..."
          className="w-full bg-surface-hover/30 border border-border/80 rounded-[2rem] py-5 pl-14 pr-8 text-sm font-bold text-content outline-none focus:border-primary/50 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </motion.div>
    </div>
  );

  return (
    <SupportAppShell isLoading={isLoading}>
      <div className="w-full flex flex-col">
        {HelpHero}
        <div className="max-w-[1240px] mx-auto w-full px-5 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14">
          <div className="lg:col-span-4 flex flex-col">
             {LeftColumn}
          </div>
          <div className="lg:col-span-8">
             {RightColumn}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeModal && <SupportModal id={activeModal} onClose={() => setActiveModal(null)} />}
      </AnimatePresence>

      <ScrollToTop />
    </SupportAppShell>
  );
};

export default HelpCenterPage;
