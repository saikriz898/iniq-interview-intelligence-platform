import React from 'react';
import { 
  MessageSquare, LifeBuoy, ShieldAlert, Cpu, 
  Send, Plus, History, CheckCircle2, Zap, 
  ArrowLeft, Search, Filter, Mail, Globe, 
  Terminal, ShieldCheck, FileText, Phone, HelpCircle, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate } from 'react-router-dom';

/**
 * --- SUPPORT HUB: USER ASSISTANCE PROTOCOL ---
 * Purpose: Direct access to support channels and knowledge archives.
 * Design: No-scroll command center with tactical contact modules.
 */
const SupportHubPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();

    const supportChannels = [
        { 
            id: 'Terminal Sync', 
            icon: Mail, 
            label: 'Email Support', 
            value: 'support@iniq.io', 
            desc: 'Direct datastream to technical nodes' 
        },
        { 
            id: 'Global Line', 
            icon: Phone, 
            label: 'Helpline Hub', 
            value: '+1 (800) INIQ-HUB', 
            desc: 'Real-time voice handshake protocol' 
        },
        { 
            id: 'Direct Route', 
            icon: HelpCircle, 
            label: 'Help Center', 
            value: 'docs.iniq.io', 
            desc: 'Drill down into operations manuals',
            action: () => navigate('/faq')
        }
    ];

    return (
        <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col bg-surface/[0.02] relative">
                
                {/* Header Strip */}
                <div className="h-20 border-b border-border/40 px-10 flex items-center justify-between shrink-0 bg-background/5 backdrop-blur-sm relative z-10">
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => navigate('/faq')}
                            className="size-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary transition-all active:scale-90"
                        >
                            <ArrowLeft className="size-5" />
                        </button>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 text-[8px] font-black text-primary uppercase tracking-[0.2em] opacity-80 mb-1">
                                <Zap className="size-2.5" />
                                MODULE: SUPPORT_HANDSHAKE_v3
                            </div>
                            <h2 className="text-xl font-black text-content font-['Sora'] tracking-tight leading-none uppercase italic">Technical Assistance Hub</h2>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-10 p-10 lg:p-12 overflow-y-auto no-scrollbar">
                    
                    <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
                        {supportChannels.map((channel) => (
                            <motion.button 
                                key={channel.id}
                                whileHover={{ y: -10 }}
                                onClick={channel.action}
                                className="p-10 rounded-[3rem] bg-surface border border-border/40 group hover:border-primary transition-all flex flex-col items-center text-center gap-6 shadow-sm hover:shadow-2xl hover:shadow-primary/5 active:scale-95"
                            >
                                <div className="size-20 rounded-[2.5rem] bg-surface-hover border border-border/60 flex items-center justify-center text-text-muted group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                    <channel.icon className="size-8" />
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary opacity-60 italic leading-none">{channel.id}</span>
                                    <h3 className="text-base font-black text-content uppercase tracking-tight italic font-['Sora']">{channel.label}</h3>
                                    <span className="text-xl font-black text-content font-mono mt-4 lowercase tracking-tighter opacity-80">{channel.value}</span>
                                    <span className="text-[9px] font-bold text-text-muted opacity-40 uppercase tracking-widest mt-4 leading-relaxed">{channel.desc}</span>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Guidelines Strip */}
                    <div className="max-w-5xl mx-auto w-full mt-auto">
                        <div className="p-8 rounded-[2.5rem] bg-surface-hover/30 border border-border/40 border-dashed flex items-center justify-between gap-10">
                            <div className="flex items-center gap-6">
                                <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                                    <Info className="size-7" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <h4 className="text-sm font-black text-content italic uppercase tracking-tight">Need a dedicated help center?</h4>
                                    <p className="text-[10px] font-bold text-text-muted opacity-60 uppercase tracking-widest">
                                        Scan our comprehensive operations manual for instant troubleshooting protocols.
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => navigate('/faq')}
                                className="px-8 py-3 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:translate-x-1 transition-all active:scale-95 shadow-xl shadow-primary/20"
                            >
                                Open Help Center
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </UserAppShell>
    );
};

export default SupportHubPage;
