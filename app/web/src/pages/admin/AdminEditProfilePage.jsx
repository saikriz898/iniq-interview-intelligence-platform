import React, { useState } from 'react';
import { 
  ArrowLeft, User, Mail, Camera, ShieldCheck, 
  MapPin, Phone, Globe, Briefcase, Zap, CheckCircle2, X, Send, Save,
  Activity, Fingerprint, Key, ShieldAlert
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';

/**
 * --- ADMIN EDIT PROFILE: IDENTITY MODIFICATION HUB ---
 * Refined Design: Professional, institutional, and authoritative.
 * Features: High-density identity telemetry, verified synchronization protocol.
 */
const AdminEditProfilePage = () => {
    const { theme, toggleTheme, isLoading, user } = useGlobalContext();
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState({
        name: user?.name || 'Platform Administrator',
        email: user?.email || 'admin@iniq.io',
        role: 'Platform Operations Specialist',
        location: 'Bangalore Node // 12.9716° N, 77.5946° E',
        phone: '+91 98765 43210'
    });

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleSave = () => {
        setIsSuccessModalOpen(true);
        setTimeout(() => {
            setIsSuccessModalOpen(false);
            navigate('/admin/profile');
        }, 1500);
    };

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col p-8 lg:p-12 overflow-y-auto custom-scrollbar bg-background">
                <div className="max-w-5xl mx-auto w-full flex flex-col gap-10 pt-4 pb-20">
                    
                    {/* 1. ADMINISTRATION HEADER */}
                    <div className="flex flex-col gap-4 border-b border-border pb-12 relative overflow-hidden">
                        <div className="flex items-center gap-6 z-10">
                            <button 
                                onClick={() => navigate('/admin/profile')}
                                className="size-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary transition-all active:scale-95 group shadow-sm"
                            >
                                <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-0.5" />
                            </button>
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-3">
                                    <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] font-black uppercase tracking-wider text-amber-500 italic">Institutional ID Modification</span>
                                    <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                </div>
                                <h1 className="text-4xl font-black text-content uppercase tracking-tight leading-none font-['Inter']">Update Profile Node</h1>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
                            <ShieldCheck className="size-32 text-primary rotate-12" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        
                        {/* 2. IDENTITY VISUALIZATION (LG: 4/12) */}
                        <div className="lg:col-span-4 flex flex-col gap-10">
                            <div className="flex flex-col items-center gap-8 p-10 rounded-[2.5rem] bg-surface border border-border shadow-xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="size-52 rounded-[2.5rem] bg-background border border-border flex items-center justify-center p-12 shadow-inner relative z-10 group-hover:scale-105 transition-transform">
                                    <User className="size-28 text-text-muted opacity-40 group-hover:text-primary transition-all" />
                                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm rounded-[2.5rem]">
                                        <Camera className="size-10 text-primary" />
                                    </div>
                                    <div className="absolute -bottom-3 -right-3 size-14 rounded-2xl bg-primary border-4 border-background flex items-center justify-center text-white shadow-2xl">
                                        <ShieldCheck className="size-7" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-2.5 text-center relative z-10">
                                    <span className="text-[11px] font-black text-content uppercase tracking-[0.25em] italic font-['Inter']">Platform Ops Node</span>
                                    <p className="text-[9px] font-bold text-text-muted opacity-40 uppercase tracking-widest leading-none">Global Authorization Status: Verified</p>
                                </div>
                            </div>

                            <div className="p-8 rounded-3xl bg-surface border border-border border-dashed flex flex-col gap-6 opacity-60">
                                <h3 className="text-[9px] font-black text-text-muted uppercase tracking-[0.3em] italic">System Registry Audit</h3>
                                <div className="space-y-3">
                                    {[1, 2].map(i => (
                                        <div key={i} className="flex items-center gap-4 text-[9px] font-bold text-text-muted uppercase tracking-widest leading-none">
                                            <div className="size-1 rounded-full bg-primary" />
                                            SEC_MOD_LOG_00{i}: Sync Terminal Active
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 3. MODIFICATION PROTOCOLS (LG: 8/12) */}
                        <div className="lg:col-span-8 flex flex-col gap-12">
                            
                            {/* Sec 1: Identity Synchronization */}
                            <div className="flex flex-col gap-8">
                                <div className="flex items-center gap-4 border-l-4 border-primary pl-5">
                                    <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                                        <Fingerprint className="size-5" />
                                    </div>
                                    <h3 className="text-[12px] font-black text-content uppercase tracking-[0.25em]">Identity Handshake</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1 opacity-60">Full Identity Name</label>
                                        <input 
                                            type="text" 
                                            value={profileData.name}
                                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                            className="w-full p-5 rounded-2xl bg-surface border border-border focus:border-primary text-[14px] font-bold uppercase tracking-tight outline-none transition-all shadow-sm italic hover:bg-background/20" 
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1 opacity-60">Institutional Email</label>
                                        <input 
                                            type="email" 
                                            value={profileData.email}
                                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                            className="w-full p-5 rounded-2xl bg-surface border border-border focus:border-primary text-[14px] font-bold lowercase tracking-tight outline-none transition-all shadow-sm hover:bg-background/20" 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sec 2: Positional Recaps */}
                            <div className="flex flex-col gap-8">
                                <div className="flex items-center gap-4 border-l-4 border-amber-500 pl-5">
                                    <div className="size-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 shadow-sm">
                                        <Briefcase className="size-5" />
                                    </div>
                                    <h3 className="text-[12px] font-black text-content uppercase tracking-[0.25em]">Positional Telemetry</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1 opacity-60">Global Synchronization Node</label>
                                        <input 
                                            type="text" 
                                            value={profileData.role}
                                            onChange={(e) => setProfileData({...profileData, role: e.target.value})}
                                            className="w-full p-5 rounded-2xl bg-surface border border-border focus:border-amber-500 text-[14px] font-bold uppercase tracking-tight outline-none transition-all shadow-sm italic hover:bg-background/20" 
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1 opacity-60">Node Coordinates // Location</label>
                                        <input 
                                            type="text" 
                                            value={profileData.location}
                                            onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                                            className="w-full p-5 rounded-2xl bg-surface border border-border focus:border-amber-500 text-[14px] font-bold uppercase tracking-tight outline-none transition-all shadow-sm italic hover:bg-background/20" 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* COMMIT ACTIONS */}
                            <div className="pt-6 flex items-center gap-6">
                                <button 
                                    onClick={handleSave}
                                    className="h-16 px-10 rounded-2xl bg-primary text-white text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-primary/30 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-4 flex-1 group"
                                >
                                    <Save className="size-5 group-hover:rotate-12 transition-transform" />
                                    Commit Identity Synchronization
                                </button>
                                <button 
                                    onClick={() => navigate('/admin/profile')}
                                    className="h-16 px-10 rounded-2xl border border-border text-[11px] font-black uppercase tracking-widest text-text-muted hover:bg-surface-hover transition-all shadow-sm"
                                >
                                    Decline Sync
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 4. FOOTNOTE PROTOCOL */}
                    <div className="flex items-center justify-center gap-4 opacity-10 grayscale pt-20">
                        <Zap className="size-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em]">INIQ Intelligence Platform // Admin Identity HUB v3.2</span>
                    </div>

                </div>
            </div>

            {/* SUCCESS MODAL */}
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
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-surface border border-border rounded-[2.5rem] shadow-2xl z-[210] overflow-hidden p-12 flex flex-col items-center text-center gap-8"
                        >
                            <div className="size-20 rounded-3xl bg-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-600/30">
                                <CheckCircle2 className="size-10" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h2 className="text-2xl font-black text-content uppercase tracking-tight font-['Inter']">Identity Synced</h2>
                                <p className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-[0.2em] leading-relaxed italic">Global Administrative Nodes Updated across all verification sectors.</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </AdminAppShell>
    );
};

export default AdminEditProfilePage;
