import React, { useState } from 'react';
import { 
  HelpCircle, Search, MessageSquare, BookOpen, 
  ShieldCheck, Zap, Globe, Layers, 
  ArrowRight, CheckCircle2, Info, X, 
  Rocket, History, Clock, Building2, UserCircle,
  Terminal, ShieldAlert, Cpu, LifeBuoy, ArrowLeft, Mail, Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate } from 'react-router-dom';

/**
 * --- HELP CENTER: COMPACT INTELLIGENCE HUB ---
 * Purpose: A streamlined, high-fidelity entry point for support and knowledge.
 * Design: Minimalist grid architecture with clean, tactical node cards.
 */
const HelpCenterPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const helpNodes = [
        { 
            id: 'DATABASE', 
            icon: ShieldCheck, 
            label: 'Operations FAQ', 
            desc: 'Search our technical operations database.',
            link: '/faq',
            color: 'primary'
        },
        { 
            id: 'HANDSHAKE', 
            icon: Cpu, 
            label: 'Support Hub', 
            desc: 'Direct channels for technical sync.',
            link: '/support',
            color: 'accent'
        },
        { 
            id: 'LEGAL', 
            icon: ShieldAlert, 
            label: 'Privacy Node', 
            desc: 'Data masking and security protocols.',
            link: '/privacy-policy',
            color: 'amber'
        },
        { 
            id: 'SYSTEM', 
            icon: Terminal, 
            label: 'Terms of Sync', 
            desc: 'Ecosystem rules and usage guidelines.',
            link: '/terms-of-service',
            color: 'blue'
        }
    ];

    const contactChannels = [
        { icon: Mail, label: 'Email Support', value: 'support@iniq.io' },
        { icon: Phone, label: 'Global Hotline', value: '+1 (800) INIQ-HUB' }
    ];

    return (
        <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col p-10 lg:p-12 overflow-y-auto no-scrollbar">
                <div className="max-w-5xl mx-auto w-full flex flex-col gap-12 pt-6">
                
                {/* 1. COMPACT HERO */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-10 py-10 border-b border-border/40">
                    <div className="flex flex-col gap-3 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-widest text-primary">Intelligence Hub_v3</span>
                        </div>
                        <h1 className="text-4xl font-black text-content italic uppercase tracking-tighter font-['Sora'] leading-none">How can we help?</h1>
                        <p className="text-[11px] font-bold text-text-muted opacity-40 uppercase tracking-[0.2em]">Explore our technical archives and support nodes.</p>
                    </div>
                    
                    <div className="w-full max-w-md relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-all" />
                        <input 
                            type="text" 
                            placeholder="Search the node database..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-5 pl-14 pr-6 rounded-2xl bg-surface border border-border shadow-2xl shadow-primary/5 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all text-sm font-bold text-content placeholder:text-text-muted/20"
                        />
                    </div>
                </div>

                {/* 2. NAVIGATION GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {helpNodes.map((node) => (
                        <motion.button 
                            key={node.id}
                            whileHover={{ y: -5, scale: 1.02 }}
                            onClick={() => navigate(node.link)}
                            className="p-8 rounded-[2.5rem] bg-surface border border-border/60 flex flex-col items-center text-center gap-6 hover:border-primary group transition-all shadow-sm hover:shadow-2xl hover:shadow-primary/5"
                        >
                            <div className="size-16 rounded-[1.5rem] bg-surface-hover border border-border/60 flex items-center justify-center text-text-muted group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                <node.icon className="size-7" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary opacity-60 leading-none mb-1">{node.id}</span>
                                <h3 className="text-base font-black text-content uppercase tracking-tight italic leading-none">{node.label}</h3>
                                <p className="text-[9px] font-bold text-text-muted opacity-40 uppercase tracking-widest mt-3 leading-relaxed">
                                    {node.desc}
                                </p>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* 3. SYNC CHANNEL STRIP */}
                <div className="p-10 rounded-[3rem] bg-surface-hover/30 border border-border/60 border-dashed flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-8 flex-1 w-full justify-center md:justify-start">
                        {contactChannels.map((channel, i) => (
                            <div key={i} className="flex items-center gap-5">
                                <div className="size-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-primary shadow-sm">
                                    <channel.icon className="size-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-text-muted opacity-40">{channel.label}</span>
                                    <span className="text-xs font-black text-content italic lowercase">{channel.value}</span>
                                </div>
                                {i === 0 && <div className="hidden lg:block w-[1px] h-8 bg-border ml-4" />}
                            </div>
                        ))}
                    </div>
                    
                    <button 
                        onClick={() => navigate('/support')}
                        className="px-10 py-4 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:translate-x-1 transition-all active:scale-95 shadow-xl shadow-primary/20 shrink-0"
                    >
                        Initialize Support Handshake
                    </button>
                </div>

                {/* 4. SYSTEM NOTE */}
                <div className="flex items-center justify-center gap-2 opacity-30 grayscale">
                    <Info className="size-3" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em]">All nodes operational // System Health: 100%</span>
                </div>

            </div>
            </div>
        </UserAppShell>
    );
};

export default HelpCenterPage;
