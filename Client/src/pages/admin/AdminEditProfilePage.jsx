import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, User, Mail, Camera, ShieldCheck, 
  MapPin, Phone, Globe, Briefcase, Zap, CheckCircle2, X, Send, Save,
  Activity, Fingerprint, Key, ShieldAlert, Image
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';
import toast from 'react-hot-toast';

/**
 * --- ADMIN EDIT PROFILE: IDENTITY MODIFICATION HUB ---
 * Refined Design: Professional, institutional, and authoritative.
 * Features: High-density identity telemetry, verified synchronization protocol.
 */
const AdminEditProfilePage = () => {
    const { theme, toggleTheme, isLoading, user, setUser, setIsLoading } = useGlobalContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        domain: '',
        location: '',
        profilePicture: ''
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch('http://localhost:5000/api/users/profile', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setFormData({
                    name: data.name || '',
                    email: data.email || '',
                    domain: data.domain || '',
                    location: data.location || '',
                    profilePicture: data.profilePicture || ''
                });
            }
        } catch (err) {
            toast.error('Failed to load profile');
        } finally {
            setIsLoading(false);
        }
    };

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch('http://localhost:5000/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                const updatedUser = {
                    ...user,
                    name: data.name,
                    email: data.email,
                    profilePicture: data.profilePicture
                };
                setUser(updatedUser);
                localStorage.setItem('iniq_user', JSON.stringify(updatedUser));
                
                setIsSuccessModalOpen(true);
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                    navigate('/admin/profile');
                }, 1500);
            } else {
                toast.error(data.error || 'Update failed');
            }
        } catch (err) {
            toast.error('Server error during update');
        }
    };

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col p-8 lg:p-12 overflow-y-auto custom-scrollbar bg-background">
                <div className="max-w-5xl mx-auto w-full flex flex-col gap-10 pt-4 pb-20">
                    
                    <div className="flex flex-col gap-10">
                        {/* Header Area */}
                        <div className="flex items-center gap-6 pb-10 border-b border-border/40">
                            <button 
                                onClick={() => navigate('/admin/profile')}
                                className="size-14 rounded-full bg-surface/50 backdrop-blur-md border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 hover:bg-surface transition-all active:scale-95 shadow-sm group"
                            >
                                <ArrowLeft className="size-6 transition-transform group-hover:-translate-x-1" />
                            </button>
                            <div className="flex flex-col gap-2">
                                <span className="px-3 py-1 rounded-full bg-warning/10 border border-warning/20 text-[10px] font-black uppercase tracking-widest text-warning w-max">
                                    Identity Modification
                                </span>
                                <h1 className="text-4xl font-black text-content tracking-tight font-['Space_Grotesk']">Update Profile Node</h1>
                            </div>
                        </div>

                        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* Visual Identity Card */}
                            <div className="lg:col-span-1 flex flex-col gap-6">
                                <div className="p-8 rounded-[2rem] bg-surface/80 backdrop-blur-xl border border-border flex flex-col items-center gap-8 shadow-sm">
                                    <div className="relative group">
                                        <div className="size-48 rounded-[2rem] bg-background border border-border flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
                                            {formData.profilePicture ? (
                                                <img src={formData.profilePicture} alt="Avatar" className="size-full object-cover" />
                                            ) : (
                                                <User className="size-20 text-text-muted/50 group-hover:text-primary transition-colors" />
                                            )}
                                        </div>
                                        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm rounded-[2rem] flex items-center justify-center pointer-events-none">
                                            <Camera className="size-10 text-primary" />
                                        </div>
                                        <div className="absolute -bottom-4 -right-4 size-16 rounded-2xl bg-primary border-4 border-background flex items-center justify-center text-primary-text shadow-xl">
                                            <ShieldCheck className="size-8" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <span className="text-sm font-bold text-content uppercase tracking-widest">Platform Ops</span>
                                        <p className="text-[10px] font-bold text-success uppercase tracking-[0.2em]">Status: Verified</p>
                                    </div>
                                </div>
                            </div>

                            {/* Data Configuration Cards */}
                            <div className="lg:col-span-2 flex flex-col gap-8">
                                
                                {/* Identity Block */}
                                <div className="p-8 rounded-[2rem] bg-surface/80 backdrop-blur-xl border border-border shadow-sm flex flex-col gap-8">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                            <Fingerprint className="size-5" />
                                        </div>
                                        <h3 className="text-sm font-black text-content uppercase tracking-widest">Core Identity</h3>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest pl-1">Full Name</label>
                                            <input 
                                                type="text" 
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className="w-full p-5 rounded-2xl bg-background border border-border focus:border-primary text-sm font-bold text-content outline-none transition-all shadow-inner" 
                                            />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest pl-1">Email Address</label>
                                            <input 
                                                type="email" 
                                                value={formData.email}
                                                disabled={true}
                                                className="w-full p-5 rounded-2xl bg-background border border-border text-sm font-bold text-text-muted outline-none opacity-50 cursor-not-allowed" 
                                            />
                                        </div>
                                        <div className="flex flex-col gap-3 md:col-span-2">
                                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest pl-1">Profile Image URL</label>
                                            <div className="relative group">
                                                <div className="absolute left-5 top-1/2 -translate-y-1/2">
                                                    <Image className="size-5 text-text-muted group-focus-within:text-primary transition-colors" />
                                                </div>
                                                <input 
                                                    type="text" 
                                                    value={formData.profilePicture}
                                                    onChange={(e) => setFormData({...formData, profilePicture: e.target.value})}
                                                    placeholder="https://..."
                                                    className="w-full py-5 pl-14 pr-6 rounded-2xl bg-background border border-border focus:border-primary text-sm font-bold text-content outline-none transition-all shadow-inner"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Operations Block */}
                                <div className="p-8 rounded-[2rem] bg-surface/80 backdrop-blur-xl border border-border shadow-sm flex flex-col gap-8">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-xl bg-warning/10 flex items-center justify-center text-warning">
                                            <Briefcase className="size-5" />
                                        </div>
                                        <h3 className="text-sm font-black text-content uppercase tracking-widest">Operational Data</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest pl-1">Domain</label>
                                            <input 
                                                type="text" 
                                                value={formData.domain}
                                                onChange={(e) => setFormData({...formData, domain: e.target.value})}
                                                className="w-full p-5 rounded-2xl bg-background border border-border focus:border-warning text-sm font-bold text-content outline-none transition-all shadow-inner" 
                                            />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest pl-1">Location</label>
                                            <input 
                                                type="text" 
                                                value={formData.location}
                                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                                className="w-full p-5 rounded-2xl bg-background border border-border focus:border-warning text-sm font-bold text-content outline-none transition-all shadow-inner" 
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-6 mt-4">
                                    <button 
                                        type="submit"
                                        className="h-16 flex-1 rounded-2xl bg-primary text-primary-text text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"
                                    >
                                        <Save className="size-5" />
                                        Update Node
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => navigate('/admin/profile')}
                                        className="h-16 px-10 rounded-2xl border border-border bg-surface text-xs font-black uppercase tracking-widest text-text-muted hover:bg-surface-hover transition-all shadow-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </div>
                        </form>
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
                            <div className="size-20 rounded-3xl bg-success text-primary-text flex items-center justify-center shadow-2xl shadow-emerald-600/30">
                                <CheckCircle2 className="size-10" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h2 className="text-2xl font-black text-content uppercase tracking-tight font-['Inter']">Identity Synced</h2>
                                <p className="text-[10px] font-bold text-text-muted  uppercase tracking-[0.2em] leading-relaxed italic">Global Administrative Nodes Updated across all verification sectors.</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </AdminAppShell>
    );
};

export default AdminEditProfilePage;
