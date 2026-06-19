import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Calendar, Edit3, Award, CheckCircle2, 
  Clock, MapPin, ExternalLink, Camera, Briefcase, 
  Linkedin, Github, Zap, ShieldCheck, Target, 
  FileText, Download, Activity, Link as LinkIcon, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate, Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';

/**
 * --- PROFILE PAGE: HERO BANNER DESIGN ---
 * Completely redesigned for a premium, single-scroll SaaS aesthetic.
 */
const ProfilePage = () => {
    const { theme, toggleTheme, user } = useGlobalContext();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setPageLoading(true);
        const token = localStorage.getItem('iniq_token');
        try {
            const [profileRes, dashboardRes] = await Promise.all([
                fetch('http://localhost:5000/api/users/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch('http://localhost:5000/api/experiences/user-dashboard', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);

            const pData = await profileRes.json();
            const dData = await dashboardRes.json();

            if (profileRes.ok) setProfileData(pData);
            if (dashboardRes.ok) setDashboardData(dData);
        } catch (err) {
            toast.error('Failed to load profile data');
        } finally {
            setPageLoading(false);
        }
    };

    const getEmbedUrl = (url) => {
        if (!url) return '';
        if (url.includes('drive.google.com')) {
            const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (match && match[1]) {
                return `https://drive.google.com/file/d/${match[1]}/preview`;
            }
        }
        return url;
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
                    {/* Abstract Banner Pattern */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-background/90" />
                </div>

                {/* 2. PROFILE HEADER (Avatar & Actions) */}
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
                                <Link to="/profile/edit" className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 size-10 sm:size-12 rounded-full bg-primary border-[4px] border-background shadow-lg flex items-center justify-center text-white hover:bg-primary-hover transition-transform active:scale-95 z-20">
                                    <Camera className="size-4 sm:size-5" />
                                </Link>
                            </div>

                            <div className="flex flex-col pb-2">
                                <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">{profileData.name}</h1>
                                <span className="text-sm sm:text-base font-bold text-primary flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                                    <Briefcase className="size-4" />
                                    {profileData.domain || 'Domain Not Set'}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-center gap-3 pb-2 w-full sm:w-auto mt-2 sm:mt-0">
                            <Link to="/profile/view" className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-surface border border-border/40 hover:border-border text-sm font-bold text-text-muted hover:text-content transition-all text-center shadow-sm">
                                Public View
                            </Link>
                            <Link to="/profile/edit" className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-md shadow-primary/20 hover:bg-primary-hover active:scale-95 transition-all flex items-center justify-center gap-2">
                                <Edit3 className="size-4" /> Edit Profile
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 3. MAIN CONTENT GRID */}
                <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-24 md:pb-12 flex-1 shrink-0">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* LEFT COLUMN: About & Details */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            
                            {/* About Me */}
                            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="p-6 rounded-2xl bg-surface border border-border/40 shadow-sm flex flex-col gap-4">
                                <h3 className="text-sm font-bold text-content uppercase tracking-wider flex items-center gap-2">
                                    <User className="size-4 text-primary" /> About Me
                                </h3>
                                <p className="text-sm text-text-muted leading-relaxed">
                                    {profileData.bio || 'No bio provided. Write a short snippet about your background, skills, and professional interests.'}
                                </p>
                            </motion.div>

                            {/* Core Info */}
                            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className="p-6 rounded-2xl bg-surface border border-border/40 shadow-sm flex flex-col gap-5">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="size-8 rounded-lg bg-background border border-border/40 flex items-center justify-center text-text-muted shrink-0"><Mail className="size-4"/></div>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="text-[10px] font-bold text-text-muted uppercase">Email Address</span>
                                        <span className="font-semibold text-content truncate">{profileData.email}</span>
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
                                        <span className="text-[10px] font-bold text-text-muted uppercase">Account Status</span>
                                        <span className="font-bold text-success truncate">Verified Member</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Links */}
                            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="p-6 rounded-2xl bg-surface border border-border/40 shadow-sm flex flex-col gap-4">
                                <h3 className="text-sm font-bold text-content uppercase tracking-wider flex items-center gap-2">
                                    <LinkIcon className="size-4 text-primary" /> Social Links
                                </h3>
                                <div className="flex flex-col gap-3">
                                    <SocialRow icon={ExternalLink} label="Portfolio" value={profileData.portfolio} />
                                    <SocialRow icon={Linkedin} label="LinkedIn" value={profileData.linkedin} />
                                    <SocialRow icon={Github} label="GitHub" value={profileData.github} />
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT COLUMN: Stats & Resume */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                                <StatCard label="Total Submissions" value={dashboardData?.stats?.total || 0} icon={Target} color="text-accent" bg="bg-accent/10" delay={0.3} />
                                <StatCard label="Pending Review" value={dashboardData?.stats?.pending || 0} icon={Clock} color="text-warning" bg="bg-warning/10" delay={0.4} />
                                <StatCard label="Approved Logs" value={dashboardData?.stats?.approved || 0} icon={CheckCircle2} color="text-success" bg="bg-success/10" delay={0.5} />
                                <StatCard label="Impact Score" value={(dashboardData?.stats?.approved || 0) * 10} icon={Zap} color="text-primary" bg="bg-primary/10" delay={0.6} />
                            </div>

                            {/* Resume & Completeness Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                                {/* Resume Card */}
                                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.7}} className="p-6 md:p-8 rounded-2xl bg-surface border border-border/40 shadow-sm flex flex-col justify-between gap-6 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <FileText className="size-32 text-primary rotate-12" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                                            <FileText className="size-6" />
                                        </div>
                                        <h3 className="text-lg font-bold text-content">Resume Document</h3>
                                        <p className="text-sm text-text-muted mt-1">Your professional CV available for download.</p>
                                    </div>
                                    <div className="flex flex-col gap-2 relative z-10">
                                        <button 
                                            onClick={() => setIsResumeModalOpen(true)}
                                            disabled={!profileData.resume}
                                            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${profileData.resume ? 'bg-background border border-primary/40 text-primary hover:bg-primary hover:text-white shadow-sm' : 'bg-background border border-border/40 text-text-muted cursor-not-allowed opacity-50'}`}
                                        >
                                            <FileText className="size-4" /> {profileData.resume ? 'View Resume' : 'No Resume Provided'}
                                        </button>
                                        <Link 
                                            to="/profile/edit" 
                                            className="w-full py-2 flex items-center justify-center gap-2 text-xs font-semibold text-text-muted hover:text-primary transition-colors"
                                        >
                                            <Edit3 className="size-3" /> Change Resume
                                        </Link>
                                    </div>
                                </motion.div>

                                {/* Profile Completeness */}
                                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.8}} className="p-6 md:p-8 rounded-2xl bg-surface border border-border/40 shadow-sm flex flex-col justify-between gap-8">
                                    <div>
                                        <div className="size-12 rounded-xl bg-success/10 flex items-center justify-center text-success mb-5">
                                            <Activity className="size-6" />
                                        </div>
                                        <h3 className="text-lg font-bold text-content tracking-tight">Profile Strength</h3>
                                        <p className="text-sm text-text-muted mt-1.5 leading-relaxed">A complete profile attracts more engagement.</p>
                                    </div>
                                    <div className="flex flex-col gap-2.5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Completeness</span>
                                            <span className={`text-sm font-black ${completeness === 100 ? 'text-success' : completeness > 50 ? 'text-warning' : 'text-danger'}`}>{completeness}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-background border border-border/40 rounded-full overflow-hidden relative">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${completeness}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
                                                className={`absolute top-0 left-0 h-full rounded-full ${completeness === 100 ? 'bg-success' : completeness > 50 ? 'bg-warning' : 'bg-danger'}`}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Resume Viewer Modal using Portal to cover Sidebar */}
            {createPortal(
                <AnimatePresence>
                    {isResumeModalOpen && profileData.resume && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9999] bg-background/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
                        >
                            <motion.div 
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                className="w-full max-w-5xl h-[90vh] bg-surface border border-border/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 border-b border-border/40 shrink-0 bg-surface/95 backdrop-blur-md gap-4 relative z-20">
                                    <div className="flex flex-col min-w-0">
                                        <h3 className="text-lg font-bold text-content flex items-center gap-2">
                                            <FileText className="size-5 text-primary shrink-0" />
                                            <span className="truncate">Resume Document</span>
                                        </h3>
                                        {profileData.resume?.includes('drive.google.com') && (
                                            <span className="text-[11px] font-bold text-warning mt-1.5 leading-relaxed sm:max-w-xl">
                                                If you see "You need access", change permissions to <span className="text-white bg-warning/20 px-1 py-0.5 rounded">"Anyone with the link can view"</span>. If your school blocks embeds, click Open in New Tab.
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                                        <a href={profileData.resume} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-primary/10 text-xs sm:text-sm font-semibold text-primary hover:bg-primary/20 transition-colors flex items-center gap-1.5">
                                            <ExternalLink className="size-3.5" /> Open in New Tab
                                        </a>
                                        <button onClick={() => setIsResumeModalOpen(false)} className="size-8 rounded-lg bg-background border border-border/40 flex items-center justify-center text-text-muted hover:text-danger hover:border-danger/40 transition-colors">
                                            <X className="size-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1 bg-background relative z-10 flex flex-col items-center justify-center">
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center z-0">
                                        <div className="size-16 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                                        <p className="text-sm font-bold text-text-muted">Loading document securely...</p>
                                        <p className="text-xs text-text-muted/60 max-w-sm mt-2">If this takes too long or shows a blocked connection, your organization's security settings prevent embedding. Please use the "Open in New Tab" button.</p>
                                    </div>
                                    <iframe 
                                        src={getEmbedUrl(profileData.resume)} 
                                        title="Resume Viewer" 
                                        className="w-full h-full border-none relative z-10 bg-surface"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </UserAppShell>
    );
};

// UI UTILS
const SocialRow = ({ icon: Icon, label, value }) => (
    <a href={value ? (value.startsWith('http') ? value : `https://${value}`) : '#'} target="_blank" rel="noreferrer" className={`flex items-center gap-3 p-3 rounded-xl bg-background border border-border/40 hover:border-primary/40 transition-all group ${!value ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <div className="size-8 rounded-lg bg-surface flex items-center justify-center text-text-muted group-hover:text-primary transition-colors shrink-0">
            <Icon className="size-4" />
        </div>
        <div className="flex flex-col overflow-hidden">
            <span className="text-[10px] font-bold text-text-muted uppercase">{label}</span>
            <span className="text-xs font-semibold text-content truncate group-hover:text-primary transition-colors">{value ? new URL(value.startsWith('http') ? value : `https://${value}`).hostname : 'Not Provided'}</span>
        </div>
    </a>
);

const StatCard = ({ label, value, icon: Icon, color, bg, delay }) => (
    <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay}} className="p-4 rounded-xl bg-surface border border-border/40 flex flex-col gap-3 shadow-sm hover:border-border transition-colors">
        <div className={`size-10 rounded-lg ${bg} ${color} flex items-center justify-center`}>
            <Icon className="size-5" />
        </div>
        <div className="flex flex-col">
            <span className="text-2xl font-black text-content tracking-tight">{value}</span>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider truncate">{label}</span>
        </div>
    </motion.div>
);

export default ProfilePage;
