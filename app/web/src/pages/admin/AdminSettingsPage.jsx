import React, { useState } from 'react';
import { 
  Building2, Calendar, User, ShieldCheck, Zap, 
  Terminal, ShieldAlert, Cpu, Layers, Bookmark, CheckCircle2,
  AlertCircle, Info, ChevronRight, Activity, Share2, Clipboard,
  PlusCircle, X, Edit3, Mail, Phone, MapPin, Globe,
  Briefcase, Key, Lock, Unlock, LogOut, Sun, Moon,
  Bell, Database, Languages, Fingerprint, Settings as SettingsIcon,
  Check, ArrowUpRight, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';

/**
 * --- ADMIN SETTINGS: PLATFORM CONFIGURATION HUB ---
 * Refined Design: Stationary radar with independent scrollable canvas.
 * Features: Removed redundant profile hub, enforced strict stationary radar.
 */
const AdminSettingsPage = () => {
    const { theme, toggleTheme, isLoading, user } = useGlobalContext();
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState('Notifications');

    const [notifPreferences, setNotifPreferences] = useState({
        newSubmissions: true,
        securityAlerts: true,
        databaseSync: false,
        reportOverdue: true
    });

    const toggleNotif = (key) => setNotifPreferences({...notifPreferences, [key]: !notifPreferences[key]});

    const configNodes = [
        { id: 'security', label: 'Security Hub', desc: 'Auth tier protocols.', icon: Lock, path: '/admin/security', color: 'text-rose-500' },
        { id: 'notifs', label: 'Notifications', desc: 'Signal preferences.', icon: Bell, path: null, color: 'text-amber-500' },
        { id: 'system', label: 'System Preferences', desc: 'UI & Data modes.', icon: Cpu, path: null, color: 'text-primary' },
    ];

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col bg-background overflow-hidden font-['Inter']">
                
                {/* 1. STATIONARY COMMAND HEADER */}
                <header className="h-24 shrink-0 border-b border-border/40 px-10 flex flex-col justify-center bg-surface/5 backdrop-blur-md relative z-20">
                    <div className="flex items-center gap-3 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[9px] font-black uppercase tracking-wider text-blue-500 italic leading-none">Configuration Console v3.2</span>
                        <div className="size-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <h1 className="text-3xl font-black text-content uppercase tracking-tight leading-none italic">Global Configuration</h1>
                    <p className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-[0.25em] mt-3 leading-none truncate">Manage institutional synchronization, administrative identity hubs, and systemic security parameters.</p>
                </header>

                {/* 2. CONFIGURATION ENGINE (FIXED/SCROLLABLE PANELS) */}
                <main className="flex-1 flex overflow-hidden min-h-0 relative">
                    
                    {/* LEFT PANEL: STATIONARY CONFIGURATION RADAR (FIXED VIEWPORT) */}
                    <div className="w-[420px] shrink-0 border-r border-border/40 overflow-hidden p-10 flex flex-col gap-4 bg-surface/5">
                        <div className="mb-6">
                             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted opacity-40 px-6 font-['JetBrains_Mono'] tracking-[0.4em]">Available Hubs_</span>
                        </div>
                        {configNodes.map((node) => (
                            <button
                                key={node.id}
                                onClick={() => {
                                    if (node.path) navigate(node.path);
                                    else setActiveSection(node.label);
                                }}
                                className={`p-6 rounded-[2.5rem] border transition-all flex items-center justify-between group active:scale-[0.98] ${
                                    activeSection === node.label && !node.path
                                        ? 'bg-surface border-primary shadow-2xl shadow-primary/10' 
                                        : 'bg-surface/30 hover:bg-surface border-border/60 hover:border-primary/20 shadow-sm'
                                }`}
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`size-14 rounded-2xl flex items-center justify-center shrink-0 border border-transparent shadow-inner transition-all ${
                                        activeSection === node.label && !node.path ? 'bg-primary text-white' : 'bg-background text-text-muted opacity-60 group-hover:text-primary group-hover:scale-110'
                                    }`}>
                                        <node.icon className="size-6" />
                                    </div>
                                    <div className="flex flex-col text-left leading-none gap-2.5">
                                        <span className={`text-[13px] font-black uppercase tracking-tight ${activeSection === node.label && !node.path ? 'text-content' : 'text-text-muted opacity-60 group-hover:opacity-100 group-hover:text-primary'}`}>
                                            {node.label}
                                        </span>
                                        <span className="text-[9px] font-bold text-text-muted opacity-30 uppercase tracking-widest leading-none italic">{node.desc}</span>
                                    </div>
                                </div>
                                {node.path ? (
                                    <ArrowUpRight className="size-4.5 text-text-muted opacity-20 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                ) : (
                                    <ChevronRight className={`size-5 text-text-muted transition-all ${activeSection === node.label ? 'opacity-100 text-primary translate-x-1' : 'opacity-20 translate-x-0'}`} />
                                )}
                            </button>
                        ))}

                        <div className="mt-auto pt-10 px-6 opacity-10 flex items-center gap-4 grayscale pointer-events-none">
                            <Zap className="size-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em]">PLATFORM_CONFIG_v3.2</span>
                        </div>
                    </div>

                    {/* RIGHT PANEL: SETTINGS CANVAS (SCROLLABLE) */}
                    <div className="flex-1 overflow-y-auto no-scrollbar p-10 lg:p-14 relative bg-surface/10">
                        <div className="max-w-4xl mx-auto flex flex-col gap-12 pb-20">
                            
                            <AnimatePresence mode="wait">
                                {activeSection === 'Notifications' && (
                                    <motion.div 
                                        key="notifications"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex flex-col gap-12"
                                    >
                                        <div className="flex flex-col gap-3">
                                             <h3 className="text-[12px] font-black text-content uppercase tracking-[0.3em] flex items-center gap-3">
                                                 <div className="size-1.5 rounded-full bg-primary" />
                                                 Signal Preferences
                                             </h3>
                                             <p className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-widest leading-relaxed mt-1 italic leading-[2.2]">Configure institutional signal nodes for real-time synchronization tracking across all platform sectors.</p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6">
                                            {Object.entries(notifPreferences).map(([key, value]) => (
                                                <div key={key} className="p-10 rounded-[3rem] bg-surface/40 border border-border flex items-center justify-between group hover:border-primary/20 transition-all shadow-sm">
                                                    <div className="flex flex-col gap-2.5">
                                                        <span className="text-sm font-black text-content uppercase tracking-tight italic group-hover:text-primary transition-colors">
                                                            {key.split(/(?=[A-Z])/).join(' ')} Protocol
                                                        </span>
                                                        <p className="text-[9px] font-bold text-text-muted opacity-40 uppercase tracking-[0.15em] italic">Authorize institutional signal distribution for this node sector.</p>
                                                    </div>
                                                    <button 
                                                        onClick={() => toggleNotif(key)}
                                                        className={`w-12 h-6 rounded-full transition-all relative p-1 border shadow-inner active:scale-95 ${
                                                            value ? 'bg-primary border-primary' : 'bg-background border-border/80'
                                                        }`}
                                                    >
                                                        <div className={`h-full aspect-square rounded-full bg-white transition-all transform ${value ? 'translate-x-6' : 'translate-x-0'} shadow-md`} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {activeSection === 'System Preferences' && (
                                    <motion.div 
                                        key="system"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex flex-col gap-12"
                                    >
                                        <div className="flex flex-col gap-3">
                                             <h3 className="text-[12px] font-black text-content uppercase tracking-[0.3em] flex items-center gap-3">
                                                 <div className="size-1.5 rounded-full bg-primary" />
                                                 UI Synchronization
                                             </h3>
                                             <p className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-widest leading-relaxed mt-1 italic leading-[2.2]">Adjust platform visualization layers and data rendering protocols for institutional accessibility.</p>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 gap-8">
                                            <button 
                                                onClick={toggleTheme}
                                                className="p-10 rounded-[3.5rem] bg-surface/60 border border-border border-dashed flex items-center justify-between group hover:bg-surface transition-all shadow-xl hover:border-primary/20"
                                            >
                                                <div className="flex items-center gap-8">
                                                    <div className="size-20 rounded-[1.5rem] bg-background border border-border flex items-center justify-center text-primary shadow-2xl group-hover:rotate-[360deg] transition-all duration-700">
                                                        {theme === 'dark' ? <Moon className="size-10" /> : <Sun className="size-10" />}
                                                    </div>
                                                    <div className="flex flex-col items-start text-left gap-3.5">
                                                        <span className="text-[11px] font-black text-content uppercase tracking-[0.2em] italic leading-none">Visualization Layer</span>
                                                        <span className="text-[9px] font-black text-primary border border-primary/20 px-4 py-1.5 rounded-xl uppercase tracking-widest bg-primary/5">{theme?.toUpperCase() || 'DARK'} THEME ENABLED</span>
                                                    </div>
                                                </div>
                                                <ArrowRight className="size-8 text-text-muted opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all group-hover:translate-x-3" />
                                            </button>

                                            <div className="p-8 px-10 rounded-[2.5rem] bg-background/20 border border-border flex items-center justify-between opacity-30 grayscale group cursor-not-allowed">
                                                <div className="flex items-center gap-8">
                                                   <div className="size-14 rounded-2xl bg-surface border border-border flex items-center justify-center text-text-muted">
                                                        <Languages className="size-7" />
                                                   </div>
                                                   <div className="flex flex-col text-left leading-none gap-2.5">
                                                        <span className="text-[12px] font-black uppercase tracking-tight italic">Localization Hub</span>
                                                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-60 italic">Global English Protocol (Protected)</span>
                                                   </div>
                                                </div>
                                                <ShieldAlert className="size-6" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                    </div>

                </main>

            </div>
        </AdminAppShell>
    );
};

export default AdminSettingsPage;
