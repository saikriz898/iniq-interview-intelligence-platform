import React, { useEffect, useState } from 'react';
import { 
  Mail, MessageSquare, Send, User, AtSign, 
  Tag, Clock, ShieldCheck, Zap, Info,
  CheckCircle2, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import SupportAppShell from '../../layouts/SupportAppShell';
import { useGlobalContext } from '../../context/GlobalContext';
import ScrollToTop from '../../components/common/ScrollToTop';

/**
 * --- CONTACT PAGE ---
 * Purpose: Provide users with a way to reach out for support or feedback.
 * Design: High-fidelity, Split-screen layout (Left: Info, Right: Form).
 */
const ContactPage = () => {
  const { setIsLoading, isLoading } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const HeroSection = (
    <div className="w-full pt-12 md:pt-16 pb-12 flex flex-col items-center text-center px-5">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 mb-6"
      >
        <Mail className="size-3 text-primary" />
        <span className="text-[9px] font-black uppercase tracking-[.2em] text-primary">Contact</span>
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-black text-content tracking-tight mb-4"
      >
        Get in <span className="text-primary italic">touch.</span>
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm md:text-base text-text-muted font-medium max-w-2xl opacity-70"
      >
        Reach out for support, feedback, or any platform-related questions. <br className="hidden md:block" />
        Our team is here to help you succeed.
      </motion.p>
    </div>
  );

  const InfoSection = (
    <div className="flex flex-col gap-8 md:gap-10">
      <div className="flex flex-col gap-4">
        {[
          { 
            label: "Email Support", 
            value: "support@iniq.com", 
            icon: Mail, 
            color: "blue",
            desc: "Submission / account help" 
          },
          { 
            label: "Platform Queries", 
            value: "Live Response", 
            icon: Zap, 
            color: "purple",
            desc: "General platform help" 
          },
          { 
            label: "Response Time", 
            value: "24-48 Hours", 
            icon: Clock, 
            color: "amber",
            desc: "Standard queue time" 
          }
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + (i * 0.1) }}
            className="p-6 rounded-[2rem] bg-surface border border-border group hover:border-primary/30 transition-all shadow-xl shadow-content/5 flex items-center gap-5"
          >
            <div className={`size-12 rounded-2xl bg-${card.color}-500/10 flex items-center justify-center shrink-0`}>
              <card.icon className={`size-6 text-${card.color}-500`} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted/60">{card.label}</span>
              <span className="text-sm font-black text-content uppercase tracking-tight">{card.value}</span>
              <p className="text-[11px] font-medium text-text-muted/70">{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Support Note - White Card Match */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-8 rounded-[2.5rem] bg-white border-none shadow-[0_15px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] flex items-start gap-6"
      >
        <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <Info className="size-6 text-primary" />
        </div>
        <div className="flex flex-col gap-2">
           <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Support Priority</h4>
           <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wider leading-relaxed">
             Mention the <span className="text-primary italic">company</span> and <span className="text-primary italic">role details</span> for faster resolution.
           </p>
        </div>
      </motion.div>
    </div>
  );

  const FormSection = (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="p-8 md:p-10 rounded-[3rem] bg-surface-hover/30 border border-border/80 relative overflow-hidden h-full flex flex-col"
    >
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] scale-150 pointer-events-none">
        <MessageSquare className="size-48 text-content" />
      </div>

      {submitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center text-center py-20 flex-grow"
        >
          <div className="size-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
            <CheckCircle2 className="size-10 text-green-500" />
          </div>
          <h3 className="text-2xl font-black text-content uppercase tracking-tight mb-2 text-content">Message Sent!</h3>
          <p className="text-sm font-medium text-text-muted max-w-sm mb-8 opacity-70">
            Thank you for reaching out. Our support team will get back to you within 24-48 hours.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-10 py-4 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            Send Another
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10 flex-grow">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted/80 ml-4">Full Name</label>
                <div className="flex items-center gap-3 bg-surface border border-border p-4 rounded-2xl group focus-within:border-primary/50 transition-all">
                  <User className="size-4 text-text-muted/60 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-content placeholder:text-text-muted/30"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted/80 ml-4">Email Address</label>
                <div className="flex items-center gap-3 bg-surface border border-border p-4 rounded-2xl group focus-within:border-primary/50 transition-all">
                  <AtSign className="size-4 text-text-muted/60 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com"
                    className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-content placeholder:text-text-muted/30"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted/80 ml-4">Subject</label>
              <div className="flex items-center gap-3 bg-surface border border-border p-4 rounded-2xl group focus-within:border-primary/50 transition-all">
                <Tag className="size-4 text-text-muted/60 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  required
                  placeholder="Platform access, feedback, etc."
                  className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-content placeholder:text-text-muted/30"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted/80 ml-4">Message</label>
              <div className="flex items-start gap-3 bg-surface border border-border p-4 rounded-2xl group focus-within:border-primary/50 transition-all min-h-[160px]">
                <MessageSquare className="size-4 text-text-muted/60 mt-1 group-focus-within:text-primary transition-colors" />
                <textarea 
                  required
                  rows="6"
                  placeholder="How can we help you?"
                  className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-content placeholder:text-text-muted/30 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-6">
            <div className="flex items-center gap-2 px-4 italic opacity-40">
              <ShieldCheck className="size-3" />
              <span className="text-[9px] font-black uppercase tracking-widest">Secure Transmission</span>
            </div>
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`px-12 py-5 bg-primary text-white font-black text-[12px] uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 ${isSubmitting ? 'opacity-70 animate-pulse' : ''}`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              {!isSubmitting && <Send className="size-4" />}
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );

  return (
    <SupportAppShell isLoading={isLoading}>
      <div className="w-full flex flex-col">
        {HeroSection}
        <div className="max-w-[1240px] mx-auto w-full px-5 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14">
          <div className="lg:col-span-4 flex flex-col">
             {InfoSection}
          </div>
          <div className="lg:col-span-8">
             {FormSection}
          </div>
        </div>
      </div>
      <ScrollToTop />
    </SupportAppShell>
  );
};

export default ContactPage;
