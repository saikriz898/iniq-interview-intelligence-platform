import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Edit3, Award, Globe, MapPin, ExternalLink, 
  Briefcase, Linkedin, Github, Zap, ShieldCheck, ChevronRight, FileText, Download, ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ViewProfilePage = () => {
    const { theme, toggleTheme } = useGlobalContext();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setPageLoading(true);
        const token = localStorage.getItem('iniq_token');
        try {
            const profileRes = await fetch('http://localhost:5000/api/users/profile', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const pData = await profileRes.json();
            if (profileRes.ok) setProfileData(pData);
        } catch (err) {
            toast.error('Failed to load profile data');
        } finally {
            setPageLoading(false);
        }
    };

    const maskEmail = (email) => {
        if (!email) return 'Hidden for Privacy';
        const [name, domain] = email.split('@');
        return `${name.charAt(0)}••••••@${domain}`;
    };

    if (!profileData) return null;

    const completeness = Math.round((['name', 'email', 'location', 'domain', 'bio', 'linkedin', 'github', 'portfolio', 'profilePicture', 'resume'].filter(field => profileData[field] && profileData[field].toString().trim() !== '').length / 10) * 100);

    return (
        <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={false} noPadding={true}>
            {pageLoading && (
                <div className="absolute inset-0 z-[100] bg-background/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="size-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                        <span className="text-sm font-bold text-primary">Loading Profile...</span>
                    </div>
                </div>
            )}
            
            <div className="h-full w-full flex flex-col bg-background overflow-y-auto custom-scrollbar pb-24 lg:pb-0 relative">
                
                {/* 1. HERO BANNER */}
                <div className="w-full h-40 sm:h-64 md:h-72 bg-gradient-to-tr from-primary/30 via-primary/10 to-surface relative shrink-0 border-b border-border/40 overflow-hidden">
                    {/* Header Strip with Back Button */}
                    <div className="absolute top-0 left-0 w-full p-4 sm:p-6 z-20 flex justify-between items-center">
                        <button 
                            onClick={() => navigate(-1)}
                            className="size-10 rounded-xl bg-background/50 backdrop-blur-md border border-border/40 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all active:scale-95 shadow-sm"
                        >
                            <ArrowLeft className="size-5" />
                        </button>
                    </div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-background/90" />
                </div>

                {/* 2. PROFILE HEADER */}
                <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 md:-mt-24 relative z-10 shrink-0">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-6">
                        
                        {/* Avatar & Name */}
                        <div className="flex flex-col items-center sm:flex-row sm:items-end gap-4 sm:gap-6 text-center sm:text-left">
                            <div className="relative group shrink-0">
                                <div className="size-32 sm:size-36 md:size-40 rounded-3xl sm:rounded-2xl bg-surface border-[4px] sm:border-[6px] border-background shadow-xl sm:shadow-2xl relative z-10 overflow-hidden">
                                    <div className="size-full bg-background flex items-center justify-center relative">
                                        {profileData.profilePicture ? (
                                            <img src={profileData.profilePicture} alt="Avatar" className="size-full object-cover relative z-10" />
                                        ) : (
                                            <span className="text-5xl font-bold text-primary relative z-10">
                                                {profileData.name?.charAt(0) || 'A'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col pb-2">
                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                    <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">{profileData.name}</h1>
                                    <div className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-[10px] font-black text-primary tracking-widest uppercase mt-1">
                                        ID: {profileData._id ? profileData._id.slice(-5) : 'INQ'}
                                    </div>
                                </div>
                                <span className="text-sm sm:text-base font-bold text-primary flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                                    <Briefcase className="size-4" />
                                    {profileData.domain || 'Domain Not Set'}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-center gap-3 pb-2 w-full sm:w-auto mt-2 sm:mt-0">
                            <Link to="/profile/edit" className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-surface border border-border/40 hover:border-border text-sm font-bold text-text-muted hover:text-content transition-all text-center shadow-sm flex items-center justify-center gap-2">
                                <Edit3 className="size-4" /> Edit Profile
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 3. MAIN CONTENT GRID */}
                <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-24 md:pb-12 flex-1 shrink-0">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* LEFT COLUMN */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            
                            {/* About Me */}
                            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="p-6 rounded-2xl bg-surface border border-border/40 shadow-sm flex flex-col gap-4">
                                <h3 className="text-sm font-bold text-content uppercase tracking-wider flex items-center gap-2">
                                    <User className="size-4 text-primary" /> About
                                </h3>
                                <p className="text-sm text-text-muted leading-relaxed">
                                    {profileData.bio || 'No bio provided.'}
                                </p>
                            </motion.div>

                            {/* Core Info */}
                            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className="p-6 rounded-2xl bg-surface border border-border/40 shadow-sm flex flex-col gap-5">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="size-8 rounded-lg bg-background border border-border/40 flex items-center justify-center text-text-muted shrink-0"><Mail className="size-4"/></div>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="text-[10px] font-bold text-text-muted uppercase">Email Address</span>
                                        <span className="font-semibold text-content truncate">{maskEmail(profileData.email)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="size-8 rounded-lg bg-background border border-border/40 flex items-center justify-center text-text-muted shrink-0"><MapPin className="size-4"/></div>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="text-[10px] font-bold text-text-muted uppercase">Location</span>
                                        <span className="font-semibold text-content truncate">{profileData.location || 'Not Specified'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="size-8 rounded-lg bg-success/10 border border-success/20 flex items-center justify-center text-success shrink-0"><ShieldCheck className="size-4"/></div>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="text-[10px] font-bold text-text-muted uppercase">Status</span>
                                        <span className="font-bold text-success truncate">Verified</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            
                            {/* Resume & Completeness Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Resume Card */}
                                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="p-6 md:p-8 rounded-2xl bg-surface border border-border/40 shadow-sm flex flex-col justify-between gap-6 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <FileText className="size-32 text-primary rotate-12" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                                            <FileText className="size-6" />
                                        </div>
                                        <h3 className="text-lg font-bold text-content">Public Resume</h3>
                                        <p className="text-sm text-text-muted mt-1">Available for download.</p>
                                    </div>
                                    <div className="flex flex-col gap-2 relative z-10">
                                        <a 
                                            href={profileData.resume || '#'} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${profileData.resume ? 'bg-background border border-primary/40 text-primary hover:bg-primary hover:text-white shadow-sm' : 'bg-background border border-border/40 text-text-muted cursor-not-allowed opacity-50'}`}
                                        >
                                            <Download className="size-4" /> {profileData.resume ? 'Download Resume' : 'No Resume'}
                                        </a>
                                    </div>
                                </motion.div>

                                {/* Links */}
                                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.3}} className="p-6 md:p-8 rounded-2xl bg-surface border border-border/40 shadow-sm flex flex-col justify-between gap-6">
                                    <div>
                                        <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                                            <Globe className="size-6" />
                                        </div>
                                        <h3 className="text-lg font-bold text-content tracking-tight">Social Network</h3>
                                        <p className="text-sm text-text-muted mt-1">External web presence</p>
                                    </div>
                                    <div className="flex flex-col gap-3 relative z-10 w-full">
                                        <SocialRow icon={ExternalLink} label="Portfolio" value={profileData.portfolio} />
                                        <SocialRow icon={Linkedin} label="LinkedIn" value={profileData.linkedin} />
                                        <SocialRow icon={Github} label="GitHub" value={profileData.github} />
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </UserAppShell>
    );
};

const SocialRow = ({ icon: Icon, label, value }) => (
    <a href={value ? (value.startsWith('http') ? value : `https://${value}`) : '#'} target="_blank" rel="noreferrer" className={`flex items-center justify-between p-3 rounded-xl bg-background border border-border/40 hover:border-border transition-all group ${!value && 'opacity-50 cursor-not-allowed pointer-events-none'}`}>
        <div className="flex items-center gap-3">
            <Icon className="size-4 text-text-muted group-hover:text-primary transition-colors" />
            <span className="text-sm font-semibold text-content">{label}</span>
        </div>
        <ChevronRight className="size-4 text-text-muted/40 group-hover:text-primary transition-colors" />
    </a>
);

export default ViewProfilePage;
