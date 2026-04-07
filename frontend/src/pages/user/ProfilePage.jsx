import React from 'react';
import { 
  User, Mail, Calendar, Edit3, Award, CheckCircle2, 
  Clock, ListChecks, Globe, MapPin, ExternalLink, 
  Camera, Briefcase, Linkedin, Github, Twitter,
  Zap, ShieldCheck, Target, ChevronRight, FileText, Download,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate, Link } from 'react-router-dom';

/**
 * --- PROFILE PAGE: STATUS DOSSIER 3.0 (MISSION CONTROL) ---
 * Redesigned for Mission Control aesthetic: Fixed-header, no-scroll architecture.
 * Features: Multi-panel layout, interactive status modules, 
 * and deep-link connectivity bridge.
 */
const ProfilePage = () => {
    const { theme, toggleTheme, isLoading, user } = useGlobalContext();
    const navigate = useNavigate();

    // PERFORMANCE HUD DATA
    const stats = [
        { 
            label: "Total Missions", 
            value: "12", 
            icon: Target, 
            color: "text-blue-500", 
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            trend: "+2 this month"
        },
        { 
            label: "Rank Clearance", 
            value: "05", 
            icon: ShieldCheck, 
            color: "text-emerald-500", 
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
            trend: "98% Accuracy"
        },
        { 
            label: "In Review", 
            value: "04", 
            icon: Clock, 
            color: "text-amber-500", 
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
            trend: "Avg. 2d"
        },
        { 
            label: "Impact Score", 
            value: "840", 
            icon: Zap, 
            color: "text-purple-500", 
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
            trend: "Top 5%"
        }
    ];

    return (
        <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden no-scrollbar">
                
                {/* --- LEFT PANEL: THE RADAR SIDEBAR (Identity Summary) --- */}
                <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border/40 lg:border-l-2 lg:border-l-primary/5 bg-surface/5 flex flex-col p-8 md:p-10 shrink-0 relative z-20 overflow-y-auto no-scrollbar">
                    
                    {/* 1. Identity Module */}
                    <div className="flex flex-col items-center text-center gap-6 mb-12">
                        <div className="relative group/avatar">
                            {/* Rotating Ring */}
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-4 border-2 border-dashed border-primary/20 rounded-full"
                            />
                            
                            <div className="size-36 rounded-full bg-gradient-to-tr from-primary via-accent to-primary p-[2.5px] shadow-[0_0_50px_-10px_rgba(var(--primary-rgb),0.3)] relative z-10 transition-transform duration-500 group-hover/avatar:scale-105">
                                <div className="size-full rounded-full bg-background flex items-center justify-center overflow-hidden relative">
                                    <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_center,_var(--primary)_1px,transparent_1px)] bg-[length:10px_10px]" />
                                    <span className="text-5xl font-black text-primary uppercase relative z-10 font-['Sora'] drop-shadow-sm">
                                        {user?.name?.charAt(0) || 'A'}
                                    </span>
                                </div>
                            </div>

                            <button className="absolute bottom-1 right-1 size-11 rounded-2xl bg-surface border border-border shadow-2xl flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all z-20 active:scale-90 group/cam">
                                <Camera className="size-5 group-hover/cam:scale-110 transition-transform" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-3 mt-4">
                            <h2 className="text-2xl font-black text-content font-['Sora'] tracking-tight">
                                {user?.name || 'Aditi Sharma'}
                            </h2>
                            <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2 self-center shadow-sm">
                                <Award className="size-3.5" />
                                Elite Vanguard
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-3 py-6 border-y border-border/40 mt-2">
                             <IdentityDetail icon={Mail} value={user?.email || 'user@iniq.hub'} />
                             <IdentityDetail icon={MapPin} value="Hyderabad, IN" />
                             <IdentityDetail icon={Globe} value="Full Stack Domain" />
                        </div>
                    </div>

                    {/* 2. Dossier Maturity Gauge */}
                    <div className="flex flex-col gap-4 mb-8 px-2">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black uppercase tracking-widest text-text-muted opacity-60">Dossier Maturity</span>
                            <span className="text-[9px] font-black text-primary">90%</span>
                        </div>
                        <div className="h-1 w-full bg-surface-hover/50 rounded-full overflow-hidden shadow-inner">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '90%' }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                            />
                        </div>
                    </div>

                    {/* 3. Social & Asset Connectivity (Sidebar Integrated) */}
                    <div className="flex flex-col gap-3 mt-auto">
                        <span className="text-[9px] font-black uppercase tracking-widest text-primary/60 px-2 mb-1">Professional Assets</span>
                        <div className="flex flex-col gap-2">
                            <SidebarSocialLink icon={ExternalLink} label="Portfolio" color="hover:text-primary" />
                            <SidebarSocialLink icon={FileText} label="Resume Dossier" color="hover:text-emerald-500" />
                            <SidebarSocialLink icon={Linkedin} label="LinkedIn" color="hover:text-blue-500" />
                            <SidebarSocialLink icon={Github} label="GitHub" color="hover:text-content" />
                        </div>
                    </div>

                    {/* Spacer to push content up if needed */}
                    <div className="pb-4" />

                </div>

                {/* --- RIGHT PANEL: THE COMMAND CANVAS (Main Dossier) --- */}
                <div className="flex-1 flex flex-col min-w-0 bg-surface/[0.02] relative">
                    
                    {/* Header Strip */}
                    <div className="h-20 border-b border-border/40 px-10 flex items-center justify-between shrink-0 bg-background/5 backdrop-blur-sm relative z-10">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 text-[8px] font-black text-primary uppercase tracking-[0.2em] opacity-80 mb-1">
                                <FileText className="size-2.5" />
                                DATASTREAM: IDENTITY_DOSSIER_v3.2
                            </div>
                            <h2 className="text-xl font-black text-content font-['Sora'] tracking-tight leading-none uppercase italic">Command Intelligence</h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link 
                                to="/profile/edit"
                                className="px-6 py-2.5 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2"
                            >
                                <Edit3 className="size-3.5" />
                                Edit Profile
                            </Link>
                            <button 
                                onClick={() => navigate('/settings')}
                                className="px-6 py-2.5 rounded-xl bg-surface border border-border text-text-muted hover:text-content hover:border-text-muted transition-all active:scale-95 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                            >
                                <Settings className="size-3.5" />
                                System Config
                            </button>
                        </div>
                    </div>

                    {/* Canvas Content */}
                    <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-10 lg:p-12">
                        <div className="max-w-6xl mx-auto flex flex-col gap-10">
                            
                            {/* 1. Performance HUD */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {stats.map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`p-6 rounded-[2rem] bg-surface/40 backdrop-blur-sm border ${stat.border} flex flex-col gap-4 relative group hover:bg-surface transition-colors cursor-default overflow-hidden`}
                                    >
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-current opacity-[0.03] translate-x-10 -translate-y-10 rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-700" />
                                        
                                        <div className={`size-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner`}>
                                            <stat.icon className="size-6" />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-text-muted/50 leading-none group-hover:text-text-muted transition-colors">
                                                {stat.label}
                                            </span>
                                            <div className="flex items-end gap-3">
                                                <h3 className="text-2xl font-black text-content tracking-tight">{stat.value}</h3>
                                                <span className={`text-[8px] font-black mb-1 px-2 py-0.5 rounded-md ${stat.bg} ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                                    {stat.trend}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* 2. Intelligence & Asset Protocols */}
                            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                                
                                {/* A. MISSION BRIEFING (Left - 3/5) */}
                                <div className="xl:col-span-3 p-8 md:p-10 rounded-[2.5rem] bg-surface/80 backdrop-blur-xl border border-border/20 shadow-2xl flex flex-col gap-8 relative overflow-hidden h-fit">
                                    <div className="absolute top-0 left-0 w-1.5 h-32 bg-primary/40" />
                                    
                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                                            <Target className="size-4" />
                                            Operational Directive
                                        </h3>
                                        <p className="text-xl font-bold text-content leading-relaxed italic font-['Sora'] opacity-80 mt-2">
                                            "Synthesizing complex interview patterns into actionable intelligence. Focused on high-performance distributed systems and architecture."
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-border/40">
                                        <DossierInfo label="Current Clearance" value="Level 4 (Elite)" icon={ShieldCheck} />
                                        <DossierInfo label="Specialization" value="Distributed Engine" icon={Zap} />
                                    </div>

                                    {/* Focus Areas Strip */}
                                    <div className="flex flex-wrap gap-2.5 pt-4">
                                        {['High-Scale', 'Go / Rust', 'Kubernetes'].map(tag => (
                                            <div key={tag} className="px-4 py-1.5 rounded-xl bg-surface-hover/30 border border-border/20 text-[9px] font-black uppercase tracking-widest text-text-muted hover:text-primary transition-all cursor-default">
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* B. RESUME DOSSIER (Right - 2/5) */}
                                <div className="xl:col-span-2 p-8 md:p-10 rounded-[2.5rem] bg-surface/40 backdrop-blur-xl border border-border/20 shadow-xl flex flex-col gap-8 relative overflow-hidden h-fit">
                                    <div className="absolute top-0 right-0 w-[1px] h-32 bg-primary/20" />
                                    
                                    <div className="flex items-center justify-between">
                                         <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 flex items-center gap-2">
                                            <FileText className="size-4" />
                                            Active Resume
                                        </h3>
                                        <span className="text-[8px] font-black text-text-muted/40 uppercase tracking-widest">v2.0_ENC</span>
                                    </div>

                                    {/* Resume Preview/Icon Module */}
                                    <div className="p-8 rounded-[2rem] bg-background/50 border border-border/20 flex flex-col items-center gap-6 group hover:border-emerald-500/20 transition-all border-dashed mt-2">
                                        <div className="size-20 rounded-2xl bg-emerald-500/5 flex items-center justify-center text-emerald-500 shadow-inner group-hover:scale-110 transition-transform">
                                            <Download className="size-8" />
                                        </div>
                                        <div className="text-center">
                                            <h4 className="text-sm font-black text-content uppercase tracking-tight italic">Resume_Dossier_2026.pdf</h4>
                                            <p className="text-[9px] font-bold text-text-muted opacity-40 uppercase tracking-widest mt-1.5">Last Sync: 14h ago // 2.4 MB</p>
                                        </div>
                                        <button className="w-full py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-500 uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                                            Download Asset
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-text-muted/40 px-1">Integrations</span>
                                        <div className="flex gap-2">
                                            <div className="size-9 rounded-xl bg-surface-hover border border-border flex items-center justify-center text-text-muted hover:text-primary transition-all cursor-pointer">
                                                <ExternalLink className="size-4" />
                                            </div>
                                            <div className="flex-1 py-1 px-4 rounded-xl bg-surface-hover/30 border border-border/20 text-[9px] font-bold text-text-muted/60 flex items-center italic">
                                                linked_resume_v2.0
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </UserAppShell>
    );
};

// --- PRIVATE COMPONENTS ---

const IdentityDetail = ({ icon: Icon, value }) => (
    <div className="flex items-center gap-4 text-xs font-bold text-text-muted/90 group/detail cursor-default">
        <div className="size-9 rounded-xl bg-surface-hover/50 border border-border/40 flex items-center justify-center text-primary/40 group-hover/detail:text-primary group-hover/detail:border-primary/20 transition-all shadow-sm">
            <Icon className="size-4.5" />
        </div>
        <span className="truncate group-hover/detail:text-content transition-colors">{value}</span>
    </div>
);

const DossierInfo = ({ label, value, icon: Icon }) => (
    <div className="flex items-start gap-4 group/dossier">
        <div className="size-11 rounded-xl bg-surface-hover border border-border flex items-center justify-center text-primary/40 group-hover/dossier:text-primary group-hover/dossier:border-primary/20 transition-all shadow-inner">
            <Icon className="size-5.5" />
        </div>
        <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted/40 leading-none">{label}</span>
            <span className="text-sm font-black text-content tracking-wide">{value}</span>
        </div>
    </div>
);

const SocialCard = ({ icon: Icon, label, value, color }) => (
    <div className={`p-4 rounded-2xl bg-surface border border-border/40 group hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer flex items-center justify-between ${color}`}>
        <div className="flex items-center gap-4 min-w-0">
            <div className="size-11 rounded-xl bg-surface-hover border border-border flex items-center justify-center text-text-muted group-hover:text-current group-hover:scale-105 transition-all shrink-0 shadow-sm">
                <Icon className="size-5.5" />
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-text-muted/60 group-hover:text-current transition-colors">{label}</span>
                <span className="text-[13px] font-black text-content mt-1 truncate">{value}</span>
            </div>
        </div>
        <div className="size-8 rounded-lg bg-surface-hover/50 flex items-center justify-center text-text-muted/30 group-hover:text-current transition-all shrink-0">
            <ChevronRight className="size-4 group-hover:translate-x-0.5" />
        </div>
    </div>
);

const SidebarSocialLink = ({ icon: Icon, label, color }) => (
    <div className={`p-3 rounded-xl bg-surface-hover/20 border border-border/20 group hover:border-primary/30 transition-all cursor-pointer flex items-center justify-between ${color}`}>
        <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-surface flex items-center justify-center text-text-muted/60 group-hover:text-current transition-all">
                <Icon className="size-4" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted/80 group-hover:text-current transition-colors">{label}</span>
        </div>
        <ChevronRight className="size-3 text-text-muted/0 group-hover:text-current transition-all group-hover:translate-x-0.5" />
    </div>
);

export default ProfilePage;
