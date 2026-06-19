import React, { useState, useEffect } from 'react';
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
import toast from 'react-hot-toast';

/**
 * --- ADMIN PROFILE: IDENTITY HUB ---
 * Refined Design: Professional, formal, and structured administrative hub.
 */
const AdminProfilePage = () => {
    const { theme, toggleTheme, isLoading, setIsLoading } = useGlobalContext();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        fetchProfileAndDashboard();
    }, []);

    const fetchProfileAndDashboard = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('iniq_token');
        try {
            const [profileRes, dashboardRes] = await Promise.all([
                fetch('http://localhost:5000/api/users/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch('http://localhost:5000/api/experiences/admin-dashboard', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);
            
            const pData = await profileRes.json();
            const dData = await dashboardRes.json();

            if (profileRes.ok) setProfileData(pData);
            if (dashboardRes.ok) setDashboardData(dData);
        } catch (err) {
            toast.error('Failed to load profile or dashboard');
        } finally {
            setIsLoading(false);
        }
    };

    const activityTelemetry = dashboardData ? [
        { label: 'Submissions Total', value: dashboardData.total, sub: 'Global', color: 'text-primary' },
        { label: 'Pending Reviews', value: dashboardData.pending, sub: 'Queue', color: 'text-warning' },
        { label: 'Approved Logs', value: dashboardData.approved, sub: 'Verified', color: 'text-success' },
        { label: 'Rejected Logs', value: dashboardData.rejected, sub: 'Declined', color: 'text-danger' },
    ] : [];

    if (!profileData || !dashboardData) return null;

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col p-8 lg:p-12 overflow-y-auto custom-scrollbar bg-background">
                <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-12 pt-4 pb-20">
                    
                    {/* 1. ADMINISTRATION IDENTITY HEADER */}
                    <div className="flex flex-col md:flex-row items-center gap-10 border-b border-border pb-12">
                        <div className="size-40 rounded-3xl bg-surface border border-border flex items-center justify-center shadow-sm relative group overflow-hidden">
                            {profileData.profilePicture ? (
                                <img src={profileData.profilePicture} alt="Admin Avatar" className="size-full object-cover transition-transform group-hover:scale-110" />
                            ) : (
                                <User className="size-20 text-text-muted  group-hover:text-primary transition-all" />
                            )}
                            <div className="absolute -bottom-2 -right-2 size-10 rounded-xl bg-primary border-4 border-background flex items-center justify-center text-primary-text shadow-xl">
                                <ShieldCheck className="size-5" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 text-center md:text-left">
                            <div className="flex flex-col gap-1.5">
                                <h1 className="text-4xl font-black text-content tracking-tight leading-none font-['Inter']">{profileData.name}</h1>
                                <p className="text-sm font-medium text-text-muted mt-2">{profileData.domain || 'Platform Administrator'}</p>
                            </div>
                            
                            <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap mt-4">
                                <div className="flex items-center gap-2">
                                    <Mail className="size-4 text-text-muted " />
                                    <span className="text-[11px] font-bold text-text-muted lowercase tracking-tight">{profileData.email}</span>
                                </div>
                                <div className="size-1 rounded-full bg-border/40" />
                                <div className="flex items-center gap-2">
                                    <MapPin className="size-4 text-text-muted " />
                                    <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest leading-none">{profileData.location || 'Global Headquarters'}</span>
                                </div>
                            </div>
                        </div>

                        <Link to="/admin/profile/edit" className="md:ml-auto flex items-center gap-2 px-6 py-3 rounded-xl bg-surface border border-border text-sm font-bold text-text-muted hover:border-primary hover:text-primary transition-all active:scale-95 shadow-sm group">
                            <Edit3 className="size-4" />
                            Edit Profile
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
                                    <span className="text-xs font-semibold text-text-muted">{stat.label}</span>
                                    <span className={`text-xs font-bold ${stat.color}`}>{stat.sub}</span>
                                </div>
                                <h3 className="text-4xl font-black text-content tabular-nums tracking-tight">
                                    {stat.value}
                                </h3>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* 3. RECENT ADMINISTRATIVE LOGS (Double Col) */}
                        <div className="lg:col-span-2 flex flex-col gap-8">
                             <h2 className="text-xl font-bold text-content tracking-tight px-2">
                                Recent Activity
                            </h2>
                            <div className="space-y-3">
                                {dashboardData.recentPending && dashboardData.recentPending.length > 0 ? (
                                    dashboardData.recentPending.map((log) => (
                                        <div key={log._id} className="p-5 rounded-xl bg-surface border border-border hover:border-border/80 transition-all flex items-center justify-between shadow-sm group">
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 rounded-lg bg-background border border-border flex items-center justify-center text-text-muted group-hover:text-primary transition-all shadow-sm">
                                                    <Activity className="size-5" />
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <h4 className="text-sm font-bold text-content tracking-tight">Pending Review</h4>
                                                    <span className="text-xs font-medium text-text-muted">{log.companyName || 'Unknown'} - {log.role || 'Role'}</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-semibold text-text-muted">{new Date(log.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-sm text-text-muted">No recent activity.</span>
                                )}
                            </div>
                        </div>

                        {/* 4. SECURITY AUDIT SECTOR (Single Col) */}
                        <div className="flex flex-col gap-8">
                            <h2 className="text-xl font-bold text-content tracking-tight px-2">
                                Security Status
                            </h2>
                            <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col gap-8 shadow-sm">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-xl bg-success/10 border border-success/20 flex items-center justify-center text-success shadow-sm">
                                            <ShieldCheck className="size-5" />
                                        </div>
                                        <div className="flex flex-col gap-0.5 text-left">
                                            <span className="text-sm font-bold text-content tracking-tight leading-none">Authentication</span>
                                            <span className="text-xs font-semibold text-success mt-1">Secured & Active</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2.5">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-background border border-border">
                                                <div className="size-1.5 rounded-full bg-success" />
                                                <span className="text-xs font-semibold text-text-muted leading-none">Successful Login - {i+1}d ago</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button onClick={() => navigate('/admin/security')} className="w-full h-11 rounded-xl bg-background border border-border text-xs font-bold text-text-muted hover:border-primary hover:text-primary transition-all shadow-sm">
                                    Manage Security
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
