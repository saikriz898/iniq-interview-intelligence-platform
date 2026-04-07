import React, { useState } from 'react';
import { 
  User, Mail, MapPin, Globe, Linkedin, Github, 
  Twitter, ExternalLink, Save, ArrowLeft, Camera,
  ShieldCheck, Zap, Target, FileText, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CustomToaster from '../../components/common/CustomToaster';

/**
 * --- EDIT PROFILE PAGE: MISSION CONTROL SYNC ---
 * Purpose: High-fidelity form for updating user identity dossier.
 * Layout: Split architecture consistent with Profile Hub.
 */
const EditProfilePage = () => {
    const { theme, toggleTheme, isLoading, user } = useGlobalContext();
    const navigate = useNavigate();

    // FORM STATE
    const [formData, setFormData] = useState({
        name: user?.name || 'Aditi Sharma',
        email: user?.email || 'user@iniq.hub',
        location: 'Hyderabad, IN',
        domain: 'Full Stack Domain',
        bio: '"Synthesizing complex interview patterns into actionable intelligence. Focused on high-performance distributed systems and architecture."',
        linkedin: 'linkedin.com/in/aditi-sharma',
        github: 'github.com/aditi-sharma',
        portfolio: 'aditi.dev'
    });

    const handleSync = (e) => {
        e.preventDefault();
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
                loading: 'Syncing Identity Protocol...',
                success: 'Dossier successfully updated!',
                error: 'Sync failed. Try again.',
            }
        ).then(() => {
            navigate('/profile');
        });
    };

    return (
        <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <CustomToaster />
            <div className="h-full w-full flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden no-scrollbar">
                
                {/* --- LEFT PANEL: THE PREVIEW RADAR --- */}
                <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border/40 lg:border-l-2 lg:border-l-primary/5 bg-surface/5 flex flex-col p-8 md:p-10 shrink-0 relative z-20 overflow-y-auto no-scrollbar">
                    
                    <div className="flex flex-col items-center text-center gap-6 mb-12">
                        <div className="relative group/avatar cursor-pointer">
                            <div className="absolute -inset-4 border-2 border-dashed border-primary/20 rounded-full animate-spin-slow" />
                            <div className="size-36 rounded-full bg-gradient-to-tr from-primary via-accent to-primary p-[2.5px] shadow-[0_0_50px_-10px_rgba(var(--primary-rgb),0.3)] relative z-10 transition-transform duration-500 hover:scale-105">
                                <div className="size-full rounded-full bg-background flex items-center justify-center overflow-hidden relative">
                                     <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_center,_var(--primary)_1px,transparent_1px)] bg-[length:10px_10px]" />
                                     <span className="text-5xl font-black text-primary uppercase relative z-10">
                                        {formData.name.charAt(0)}
                                    </span>
                                </div>
                            </div>
                            <div className="absolute bottom-1 right-1 size-11 rounded-2xl bg-surface border border-border shadow-2xl flex items-center justify-center text-primary z-20">
                                <Camera className="size-5" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-4">
                            <h2 className="text-xl font-black text-content font-['Sora'] tracking-tight">Dossier Preview</h2>
                            <p className="text-[10px] font-bold text-text-muted opacity-60 uppercase tracking-widest leading-relaxed px-4">
                                Updates made here will be instantly architected across your public profile nodes.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 mt-auto">
                        <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/20 flex flex-col gap-4">
                             <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                                <ShieldCheck className="size-4" />
                                Protocol Status
                             </div>
                             <p className="text-[10px] font-bold text-text-muted opacity-70 leading-relaxed italic">
                                Encryption enabled. All personal metadata is secured via INIQ-Hub standards.
                             </p>
                        </div>
                    </div>

                </div>

                {/* --- RIGHT PANEL: THE COMMAND CANVAS (Form) --- */}
                <form onSubmit={handleSync} className="flex-1 flex flex-col min-w-0 bg-surface/[0.02] relative">
                    
                    {/* Header Strip */}
                    <div className="h-20 border-b border-border/40 px-10 flex items-center justify-between shrink-0 bg-background/5 backdrop-blur-sm relative z-10">
                        <div className="flex items-center gap-6">
                            <button 
                                type="button"
                                onClick={() => navigate('/profile')}
                                className="size-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary transition-all active:scale-90"
                            >
                                <ArrowLeft className="size-5" />
                            </button>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 text-[8px] font-black text-primary uppercase tracking-[0.2em] opacity-80 mb-1">
                                    <Sparkles className="size-2.5" />
                                    Subsystem: Profile_Sync_v1.0
                                </div>
                                <h2 className="text-xl font-black text-content font-['Sora'] tracking-tight leading-none uppercase italic">Modify Identity Dossier</h2>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button 
                                type="submit"
                                className="px-8 py-3 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/25 hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3"
                            >
                                <Save className="size-4" />
                                Sync Protocol
                            </button>
                        </div>
                    </div>

                    {/* Canvas Content */}
                    <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-10 lg:p-12">
                        <div className="max-w-4xl mx-auto flex flex-col gap-12">
                            
                            {/* SECTION I: PRIMARY METADATA */}
                            <div className="flex flex-col gap-8">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <User className="size-4" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-content/80">Primary Architecture</span>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <EditField 
                                        label="Full Identity Name" 
                                        value={formData.name} 
                                        icon={User}
                                        onChange={(v) => setFormData({...formData, name: v})}
                                    />
                                    <EditField 
                                        label="Active Signal (Email)" 
                                        value={formData.email} 
                                        icon={Mail}
                                        onChange={(v) => setFormData({...formData, email: v})}
                                    />
                                    <EditField 
                                        label="Operational Domain" 
                                        value={formData.domain} 
                                        icon={Globe}
                                        onChange={(v) => setFormData({...formData, domain: v})}
                                    />
                                    <EditField 
                                        label="Station Origin (Location)" 
                                        value={formData.location} 
                                        icon={MapPin}
                                        onChange={(v) => setFormData({...formData, location: v})}
                                    />
                                </div>
                            </div>

                            {/* SECTION II: OPERATIONAL DIRECTIVE */}
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <Target className="size-4" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-content/80">Mission Briefing</span>
                                </div>
                                <div className="relative group">
                                     <textarea 
                                        value={formData.bio}
                                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                        className="w-full min-h-[160px] p-8 rounded-[2.5rem] bg-surface/40 border border-border/40 focus:border-primary/60 focus:bg-surface/60 outline-none transition-all text-sm font-bold text-content leading-relaxed placeholder:text-text-muted/30 caret-primary resize-none shadow-sm"
                                        placeholder="Define your operational directive..."
                                    ></textarea>
                                    <div className="absolute top-6 right-8 text-[9px] font-black text-primary/40 uppercase tracking-widest">
                                        Bio_Module
                                    </div>
                                </div>
                            </div>

                            {/* SECTION III: NETWORK CONNECTIVITY */}
                            <div className="flex flex-col gap-8 pb-10">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <Linkedin className="size-4" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-content/80">Network Bridge Config</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <EditField 
                                        label="LinkedIn Node" 
                                        value={formData.linkedin} 
                                        icon={Linkedin}
                                        onChange={(v) => setFormData({...formData, linkedin: v})}
                                    />
                                    <EditField 
                                        label="GitHub Node" 
                                        value={formData.github} 
                                        icon={Github}
                                        onChange={(v) => setFormData({...formData, github: v})}
                                    />
                                    <EditField 
                                        label="Portfolio Sublink" 
                                        value={formData.portfolio} 
                                        icon={ExternalLink}
                                        onChange={(v) => setFormData({...formData, portfolio: v})}
                                    />
                                     <div className="flex flex-col gap-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">Resume Asset (PDF/DOCX)</label>
                                        <button type="button" className="w-full py-5 px-8 rounded-[1.75rem] border-2 border-dashed border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-text-muted group">
                                            <FileText className="size-4 group-hover:text-primary transition-colors" />
                                            Upload New Dossier Asset
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>

            </div>
        </UserAppShell>
    );
};

// --- PRIVATE COMPONENTS ---

const EditField = ({ label, value, icon: Icon, onChange }) => (
    <div className="flex flex-col gap-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">{label}</label>
        <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 size-5 flex items-center justify-center transition-all">
                <Icon className="size-full text-primary/40 group-focus-within:text-primary transition-colors" />
            </div>
            <input 
                type="text" 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full py-5 pl-16 pr-8 rounded-[1.75rem] bg-surface/40 border border-border/40 focus:border-primary/60 focus:bg-surface/60 outline-none transition-all text-sm font-bold text-content placeholder:text-text-muted/30 shadow-sm caret-primary"
            />
        </div>
    </div>
);

export default EditProfilePage;
