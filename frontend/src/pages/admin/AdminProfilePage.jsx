import React from 'react';
import { 
  Building2, Calendar, User, ShieldCheck, Zap, 
  Terminal, ShieldAlert, Cpu, Layers, Bookmark, CheckCircle2,
  AlertCircle, Info, ChevronRight, Activity, Share2, Clipboard,
  PlusCircle, X, Edit3, Mail, Phone, MapPin, Globe,
  Briefcase, Key, Lock, Unlock, LogOut, FileText, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';

/**
 * --- ADMIN PROFILE: ADMINISTRATIVE IDENTITY HUB ---
 * Refined Design: Professional, formal, and structured administrative hub 
 * for identity management and platform activity tracking.
 */
const AdminProfilePage = () => {
    const { theme, toggleTheme, isLoading, user } = useGlobalContext();
    const navigate = useNavigate();

    const activityTelemetry = [
        { label: 'Experiences Synced', value: '450', sub: '+12.5%', color: 'text-primary' },
        { label: 'Role Hierarchies', value: '24', sub: '92% Acc.', color: 'text-amber-500' },
        { label: 'Nodes Purged', value: '12', sub: 'Critical', color: 'text-rose-500' },
        { label: 'Platform Uptime', value: '100%', sub: 'Global', color: 'text-emerald-500' },
    ];

    const recentAdminActions = [
        { action: 'SYNC_COMPANY', target: 'Google', time: '12m ago' },
        { action: 'APPROVE_EXP', target: 'IQ-1042', time: '45m ago' },
        { action: 'PURGE_TRACE', target: 'IQ-1035', time: '2h ago' },
        { action: 'UPDATE_ROLES', target: 'SDE-II Hierarchy', time: '5h ago' },
    ];

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col p-8 lg:p-12 overflow-y-auto custom-scrollbar bg-background">
                <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-12 pt-4 pb-20">
                    
                    {/* 1. ADMINISTRATION IDENTITY HEADER */}
                    <div className="flex flex-col md:flex-row items-center gap-10 border-b border-border pb-12">
                        <div className="size-40 rounded-3xl bg-surface border border-border flex items-center justify-center p-8 shadow-sm relative group">
                            <User className="size-20 text-text-muted opacity-40 group-hover:text-primary transition-all" />
                            <div className="absolute -bottom-2 -right-2 size-10 rounded-xl bg-primary border-4 border-background flex items-center justify-center text-white shadow-xl">
                                <ShieldCheck className="size-5" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 text-center md:text-left">
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                                    <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] font-bold uppercase tracking-wider text-amber-500">Tier 09 Administrator</span>
                                    <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                </div>
                                <h1 className="text-4xl font-black text-content uppercase tracking-tight leading-none font-['Inter']">{user?.name || 'Platform Administrator'}</h1>
                                <p className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-[0.2em] mt-3">Platform Operations Specialist // Identity Node: {user?.id || 'ADM-SYN-001'}</p>
                            </div>
                            
                            <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap mt-4">
                                <div className="flex items-center gap-2">
                                    <Mail className="size-4 text-text-muted opacity-40" />
                                    <span className="text-[11px] font-bold text-text-muted lowercase tracking-tight">{user?.email || 'admin@iniq.io'}</span>
                                </div>
                                <div className="size-1 rounded-full bg-border/40" />
                                <div className="flex items-center gap-2">
                                    <Globe className="size-4 text-text-muted opacity-40" />
                                    <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest leading-none">Global Authorization</span>
                                </div>
                            </div>
                        </div>

                        <Link to="/admin/profile/edit" className="md:ml-auto flex items-center gap-3 px-8 py-4 rounded-xl bg-surface border border-border text-[10px] font-black uppercase tracking-widest text-text-muted hover:border-primary hover:text-primary transition-all active:scale-95 shadow-sm group">
                            <Edit3 className="size-4.5" />
                            Update Profile
                        </Link>
                    </div>

                    {/* 2. ACTIVITY TELEMETRY GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {activityTelemetry.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="p-8 rounded-2xl bg-surface border border-border flex flex-col gap-6 shadow-sm hover:border-primary/20 transition-all group"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold uppercase text-text-muted opacity-40 tracking-widest italic">{stat.label}</span>
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${stat.color}`}>{stat.sub}</span>
                                </div>
                                <h3 className="text-3xl font-black text-content tabular-nums tracking-tighter uppercase font-['Inter']">
                                    {stat.value}
                                </h3>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* 3. RECENT ADMINISTRATIVE LOGS (Double Col) */}
                        <div className="lg:col-span-2 flex flex-col gap-8">
                             <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-content italic flex items-center gap-3 px-2">
                                <Terminal className="size-4.5 text-primary" />
                                Primary Action Logs
                            </h2>
                            <div className="space-y-3">
                                {recentAdminActions.map((log, i) => (
                                    <div key={i} className="p-6 rounded-xl bg-surface border border-border hover:border-primary/20 transition-all flex items-center justify-between group">
                                        <div className="flex items-center gap-5">
                                            <div className="size-10 rounded-lg bg-background border border-border flex items-center justify-center text-text-muted group-hover:text-primary transition-all shadow-inner">
                                                <Activity className="size-5" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">{log.action}</span>
                                                <h4 className="text-[12px] font-bold text-content uppercase tracking-tight italic">Target: {log.target}</h4>
                                            </div>
                                        </div>
                                        <span className="text-[9px] font-bold text-text-muted opacity-40 uppercase tracking-widest">{log.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. SECURITY AUDIT SECTOR (Single Col) */}
                        <div className="flex flex-col gap-8">
                            <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-content italic flex items-center gap-3 px-2">
                                <ShieldAlert className="size-4.5 text-rose-500" />
                                Security Compliance
                            </h2>
                            <div className="p-8 rounded-2xl bg-surface border border-border border-dashed flex flex-col gap-8 shadow-sm">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shadow-sm">
                                            <Key className="size-5" />
                                        </div>
                                        <div className="flex flex-col gap-0.5 text-left">
                                            <span className="text-[10px] font-black text-content uppercase tracking-tight italic leading-none">Authorization Hub</span>
                                            <span className="text-[8px] font-bold text-text-muted opacity-40 uppercase tracking-widest mt-1.5">2FA Active & Secure</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2.5">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-background border border-border">
                                                <div className="size-1.5 rounded-full bg-emerald-500" />
                                                <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest leading-none">SEC_LOG_0{i+1}: Node Verified</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button onClick={() => navigate('/admin/security')} className="w-full h-11 rounded-xl bg-background border border-border text-[9px] font-black uppercase tracking-widest text-text-muted hover:border-primary hover:text-primary transition-all">
                                    Launch Security Protocol
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AdminAppShell>
    );
};

export default AdminProfilePage;
