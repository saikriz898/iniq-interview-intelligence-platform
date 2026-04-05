import React, { useState } from 'react';
import { 
  ArrowLeft, ShieldCheck, Lock, Unlock, Key, 
  Terminal, ShieldAlert, Cpu, Zap, Activity, 
  MapPin, Clock, Fingerprint, Eye, EyeOff, Save, CheckCircle2, X,
  ChevronRight, RefreshCcw, Shield, Radio, Power
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';

/**
 * --- ADMIN SECURITY: SYSTEM SECURITY HUB (V4 PRESTIGE) ---
 * Refined Design: Professional high-fidelity bento-grid.
 * Features: Zero-scroll stationary viewport, ultra-premium credential nodes,
 * and authoritative institutional synchronization.
 */
const AdminSecurityPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();

    const [isMfaEnabled, setIsMfaEnabled] = useState(true);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const securityLogs = [
        { id: 'SEC_001', event: 'AUTH_SYNC', node: 'ADM-SYN-001', time: '2m ago', state: 'Secure', icon: RefreshCcw },
        { id: 'SEC_002', event: 'ROTATION', node: 'SYSTEM_ROOT', time: '12h ago', state: 'Stable', icon: Activity },
        { id: 'SEC_003', event: 'CHALLENGE', node: 'Bengaluru_Node', time: '1d ago', state: 'Verified', icon: ShieldCheck },
        { id: 'SEC_004', event: 'LOG_PURGE', node: 'IO_NODE_SEC', time: '3d ago', state: 'Archived', icon: Terminal },
        { id: 'SEC_005', event: 'SESSION_FIX', node: 'NODE_X', time: '5d ago', state: 'Secured', icon: Zap },
    ];

    const toggleMfa = () => {
        setIsMfaEnabled(!isMfaEnabled);
        setIsSuccessModalOpen(true);
        setTimeout(() => setIsSuccessModalOpen(false), 1500);
    };

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col bg-background overflow-hidden font-['Inter']">
                
                {/* 1. PRESTIGE COMMAND HEADER */}
                <header className="h-16 shrink-0 border-b border-border/40 px-6 flex items-center justify-between bg-surface/5 backdrop-blur-md relative z-30">
                    <div className="flex items-center gap-5">
                        <button 
                            onClick={() => navigate(-1)}
                            className="size-9 rounded-xl bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary transition-all active:scale-95 group shadow-sm"
                        >
                            <ArrowLeft className="size-4.5 transition-transform group-hover:-translate-x-0.5" />
                        </button>
                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[8px] font-black uppercase tracking-wider text-amber-500 italic leading-none">Institutional Security</span>
                                <div className="size-1 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            </div>
                            <h1 className="text-sm font-black text-content uppercase tracking-widest italic">Security_Ops Center_v4.0</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-background border border-border shadow-inner">
                             <div className="size-2 rounded-full bg-emerald-500" />
                             <span className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest italic">SYSTEM_SECURE</span>
                        </div>
                        <button className="px-5 py-2 rounded-xl bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all active:scale-95 shadow-2xl shadow-rose-500/20 italic">
                            System Lockdown
                        </button>
                    </div>
                </header>

                {/* 2. SECURITY ENGINE (ZERO-SCROLL BENTO) */}
                <main className="flex-1 grid grid-cols-12 gap-1 p-1 bg-border/20 overflow-hidden relative">
                    
                    {/* LEFT STACK: AUTH SYNCHRONIZATION (8/12) */}
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-1 overflow-hidden h-full">
                        
                        {/* MFA SUBNODE */}
                        <section className="flex-1 min-h-0 bg-background border border-border/40 p-12 flex flex-col justify-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                                <Radio className="size-96 text-primary rotate-12" />
                            </div>
                            <div className="max-w-4xl w-full mx-auto flex flex-col gap-12 relative z-10">
                                <div className="flex items-center gap-4">
                                     <div className="size-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-sm">
                                        <Fingerprint className="size-6" />
                                     </div>
                                     <div className="flex flex-col gap-1">
                                        <h3 className="text-[12px] font-black text-content uppercase tracking-[0.3em] font-['Inter'] italic leading-none">Authentication protocol</h3>
                                        <span className="text-[8px] font-black text-text-muted opacity-30 uppercase tracking-[0.4em]">Tier 09 / Identification handshake</span>
                                     </div>
                                </div>

                                <div className="p-10 md:p-14 rounded-[3.5rem] bg-surface/40 border border-border/60 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 hover:border-primary/20 transition-all hover:bg-surface/60">
                                    <div className="flex flex-col gap-4 text-center md:text-left">
                                        <h4 className="text-3xl md:text-4xl font-black text-content uppercase tracking-tighter italic font-['Inter'] leading-none">Multi-Factor Sync</h4>
                                        <p className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-[0.2em] leading-relaxed italic max-w-lg">Authorized institutional verification datastream. Forced synchronization across all administrative identity nodes.</p>
                                        <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                                            <div className="px-5 py-2 rounded-xl bg-background border border-border text-[9px] font-black uppercase tracking-widest text-emerald-500 shadow-inner italic">State: SYNCED</div>
                                            <div className="px-5 py-2 rounded-xl bg-background border border-border text-[9px] font-black uppercase tracking-widest text-text-muted/40 shadow-inner italic leading-none flex items-center gap-2">
                                                <Activity className="size-3" />
                                                ADM-942-X
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={toggleMfa}
                                        className={`size-20 shrink-0 rounded-3xl transition-all relative p-1.5 border shadow-2xl active:scale-90 flex items-center justify-center ${
                                            isMfaEnabled ? 'bg-primary border-primary shadow-primary/20' : 'bg-surface border-border'
                                        }`}
                                    >
                                        <Power className={`size-8 transition-all ${isMfaEnabled ? 'text-white' : 'text-text-muted/40 rotate-45 scale-90'}`} />
                                        {isMfaEnabled && (
                                            <motion.div 
                                                layoutId="glow"
                                                className="absolute inset-0 rounded-3xl bg-white/20 animate-pulse pointer-events-none"
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* CREDENTIALS SUBNODE */}
                        <section className="h-[360px] bg-background border border-border/40 p-12 flex flex-col gap-10 shrink-0 relative overflow-hidden group">
                            <div className="flex items-center gap-4">
                                 <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
                                    <Key className="size-5" />
                                 </div>
                                 <div className="flex flex-col gap-1">
                                    <h3 className="text-[12px] font-black text-content uppercase tracking-[0.3em] font-['Inter'] italic leading-none">Vault Synchronization</h3>
                                    <span className="text-[8px] font-black text-text-muted opacity-30 uppercase tracking-[0.4em]">Credential Registry / Tier 09</span>
                                 </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-0 h-full">
                                <div className="p-10 rounded-[2.5rem] bg-surface/50 border border-border shadow-xl flex flex-col justify-between group/card hover:border-primary/20 transition-all">
                                    <div className="flex flex-col gap-4">
                                        <label className="text-[9px] font-black text-text-muted uppercase tracking-[0.3em] px-2 opacity-50 italic">Master Passkey_</label>
                                        <div className="relative">
                                            <input type="password" value="••••••••••••••••••••" readOnly className="w-full p-5 rounded-2xl bg-background border border-border text-[12px] font-black tracking-[0.5em] outline-none shadow-inner text-content/60 italic" />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                                <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                <Eye className="size-4 text-text-muted/20" />
                                            </div>
                                        </div>
                                    </div>
                                    <button className="h-14 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 italic">
                                        <RefreshCcw className="size-4.5" />
                                        Commit Rotation Protocol
                                    </button>
                                </div>

                                <div className="p-10 border-2 border-dashed border-border/60 rounded-[2.5rem] flex flex-col items-center justify-center text-center gap-6 opacity-30 hover:opacity-100 hover:bg-surface/30 transition-all cursor-pointer group/biom">
                                     <div className="size-16 rounded-3xl bg-background border border-border flex items-center justify-center text-text-muted group-hover/biom:text-primary group-hover/biom:scale-110 group-hover/biom:rotate-[360deg] transition-all duration-700 shadow-inner">
                                        <Shield className="size-8" />
                                     </div>
                                     <div className="flex flex-col gap-2">
                                        <h5 className="text-[11px] font-black uppercase tracking-widest italic leading-none">Biometric Node Synchronization</h5>
                                        <p className="text-[8px] font-black uppercase tracking-[0.2em] italic opacity-40">Setup Institutional Tier 09 Identity Node</p>
                                     </div>
                                     <button className="px-6 py-2.5 rounded-xl border border-border text-[9px] font-black uppercase tracking-widest text-text-muted hover:border-primary hover:text-primary transition-all italic">Initiate Handshake</button>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT REGISTRY: TELEMETRY LOGS (4/12) */}
                    <div className="col-span-12 lg:col-span-4 bg-background border border-border/40 flex flex-col overflow-hidden relative z-10">
                        <div className="h-16 shrink-0 border-b border-border/20 px-8 flex items-center justify-between bg-surface/5 backdrop-blur-md">
                            <h3 className="text-[10px] font-black text-content uppercase tracking-[0.4em] flex items-center gap-3 italic font-['Inter']">
                                <Terminal className="size-4 text-rose-500" />
                                Telemetry_Audit Registry
                            </h3>
                            <button className="p-2 rounded-lg hover:bg-surface-hover transition-all text-text-muted opacity-30 hover:opacity-100">
                                <RefreshCcw className="size-4" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4 bg-surface/5">
                            {securityLogs.map((log, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.98, x: 20 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="p-6 rounded-[1.5rem] bg-surface/50 border border-border flex flex-col gap-4 group hover:border-rose-500/30 transition-all shadow-sm hover:shadow-xl hover:shadow-rose-500/5"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="size-9 rounded-xl bg-background border border-border flex items-center justify-center text-rose-500 shadow-inner group-hover:scale-105 transition-all">
                                                <log.icon className="size-4" />
                                            </div>
                                            <div className="flex flex-col leading-none gap-2">
                                                <span className="text-[10px] font-black text-content uppercase tracking-tight italic">{log.event}</span>
                                                <span className="text-[8px] font-black text-text-muted opacity-20 uppercase tracking-[0.4em] font-['JetBrains_Mono']">{log.id}</span>
                                            </div>
                                        </div>
                                        <span className="text-[9px] font-black text-text-muted opacity-30 uppercase tracking-widest mt-1 italic">{log.time}</span>
                                    </div>
                                    <div className="pt-4 border-t border-border/20 flex items-center justify-between">
                                        <span className="text-[9px] font-black text-text-muted opacity-40 uppercase tracking-widest italic font-['JetBrains_Mono']">{log.node}</span>
                                        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                                            <div className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest leading-none">STABLE</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="p-8 border-t border-border/20 bg-background relative z-10 shrink-0">
                            <button className="w-full h-14 rounded-2xl border border-dashed border-border text-[10px] font-black uppercase tracking-widest text-text-muted/40 hover:text-rose-500 hover:border-rose-500/30 transition-all italic bg-surface/5 hover:bg-rose-500/5 flex items-center justify-center gap-3 group">
                                <ShieldAlert className="size-4.5 group-hover:animate-pulse" />
                                System_Log Commit_09
                            </button>
                        </div>
                    </div>
                </main>

                {/* 3. SYNC PULSE FOOTER (STATIONARY) */}
                <footer className="h-10 shrink-0 border-t border-border/40 px-10 flex items-center justify-center bg-surface/5 grayscale opacity-10 pointer-events-none">
                     <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.6em] italic leading-none">
                         <Zap className="size-4" />
                         INIQ_SECURITY_OPS_V4 // GLOBAL_SYNCHRONIZATION_STABLE // SECTOR_09
                     </div>
                </footer>

            </div>

            {/* PRESTIGE SUCCESS OVERLAY */}
            <AnimatePresence>
                {isSuccessModalOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[200] bg-background/40 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-surface border border-border/60 rounded-[4rem] shadow-2xl z-[210] overflow-hidden p-14 flex flex-col items-center text-center gap-10"
                        >
                            <div className="size-24 rounded-[2rem] bg-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 relative">
                                <ShieldCheck className="size-12" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <h2 className="text-3xl font-black text-content uppercase tracking-tight font-['Inter'] italic leading-none">Protocol Synced</h2>
                                <p className="text-[11px] font-bold text-text-muted opacity-40 uppercase tracking-[0.25em] leading-relaxed italic">Global security nodes have been synchronized across all verified institutional access sectors.</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </AdminAppShell>
    );
};

export default AdminSecurityPage;
