import React, { useState } from 'react';
import { 
  Lock, Bell, Moon, Sun, Shield, Save, Eye, EyeOff, 
  Settings as SettingsIcon, ShieldCheck, Zap, Globe, 
  ChevronRight, AlertCircle, Laptop, Smartphone, Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CustomToaster from '../../components/common/CustomToaster';

/**
 * --- SETTINGS PAGE: CORE CONFIGURATION HUB ---
 * Redesigned for Mission Control 3.0 aesthetic.
 * Focus: Security, Notifications, and System Preferences.
 * Profile modifications migrated to 'Edit Profile' module.
 */
const SettingsPage = () => {
    const { theme, toggleTheme, isLoading, user } = useGlobalContext();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Security');
    const [showPassword, setShowPassword] = useState(false);

    const tabs = [
        { id: 'Security', icon: ShieldCheck, desc: 'Access & Auth' },
        { id: 'Notifications', icon: Bell, desc: 'Alert Protocols' },
        { id: 'System', icon: SettingsIcon, desc: 'Global Config' }
    ];

    const handleSync = () => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1200)),
            {
                loading: 'Syncing system configuration...',
                success: 'Protocols updated successfully!',
                error: 'Sync error detected.',
            }
        );
    };

    return (
        <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <CustomToaster />
            <div className="h-full w-full flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden no-scrollbar">
                
                {/* --- LEFT PANEL: NAVIGATION RADAR --- */}
                <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border/40 lg:border-l-2 lg:border-l-primary/5 bg-surface/5 flex flex-col p-8 md:p-10 shrink-0 relative z-20 overflow-y-auto no-scrollbar">
                    
                    <div className="flex flex-col gap-1.5 mb-12">
                        <h1 className="text-xl font-black text-content italic tracking-tight uppercase">System Settings</h1>
                        <p className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-[0.2em] ml-0.5">Control Hub v3.0</p>
                    </div>

                    <div className="flex flex-col gap-4 flex-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-4 p-4 rounded-2xl transition-all group relative ${
                                    activeTab === tab.id 
                                        ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                                        : 'text-text-muted hover:bg-surface-hover hover:text-content border border-transparent'
                                }`}
                            >
                                <div className={`size-10 rounded-xl flex items-center justify-center transition-all ${
                                    activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'bg-surface/50 border border-border group-hover:border-primary/40'
                                }`}>
                                    <tab.icon className="size-5" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-xs font-black uppercase tracking-widest">{tab.id}</span>
                                    <span className="text-[9px] font-bold opacity-40 uppercase tracking-widest mt-0.5">{tab.desc}</span>
                                </div>
                                {activeTab === tab.id && (
                                    <motion.div layoutId="activeTabIndicator" className="size-1.5 rounded-full bg-primary ml-auto" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto pt-10">
                        <div className="p-6 rounded-3xl bg-surface/40 border border-border/40 flex flex-col gap-4">
                            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                                <Zap className="size-3" />
                                Connectivity Live
                            </span>
                            <p className="text-[10px] font-bold text-text-muted leading-relaxed opacity-60 italic">
                                Your account is synced with INIQ Intelligence cloud nodes.
                            </p>
                        </div>
                    </div>

                </div>

                {/* --- RIGHT PANEL: CONFIGURATION CANVAS --- */}
                <div className="flex-1 flex flex-col min-w-0 bg-surface/[0.02] relative">
                    
                    {/* Header Strip */}
                    <div className="h-20 border-b border-border/40 px-10 flex items-center justify-between shrink-0 bg-background/5 backdrop-blur-sm relative z-10">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 text-[8px] font-black text-primary uppercase tracking-[0.2em] opacity-80 mb-1">
                                <ShieldCheck className="size-2.5" />
                                MODULE: {activeTab.toUpperCase()}_CONTROL
                            </div>
                            <h2 className="text-xl font-black text-content font-['Sora'] tracking-tight leading-none uppercase italic">{activeTab} Configuration</h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={handleSync}
                                className="px-8 py-3 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/25 hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3"
                            >
                                <Save className="size-4" />
                                Save Protocol
                            </button>
                        </div>
                    </div>

                    {/* Canvas Content */}
                    <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-8 lg:p-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-4xl mx-auto w-full flex flex-col gap-8"
                            >
                                {activeTab === 'Security' && (
                                    <div className="space-y-8">
                                        <ConfigSection title="Authentication Signal" desc="Rotate your access credentials for maximum security.">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <ConfigField label="Current Password" type="password" placeholder="••••••••••••" icon={Lock} />
                                                <ConfigField label="New Protocol Key" type="password" placeholder="••••••••••••" icon={Zap} />
                                            </div>
                                        </ConfigSection>

                                        <ConfigSection title="Session Intelligence" desc="Monitor active access nodes across your devices.">
                                            <div className="flex flex-col gap-3 max-h-[340px] overflow-y-auto no-scrollbar pr-1">
                                                <SessionItem device="MacBook Pro 16" location="Hyderabad, India" type="Laptop" current={true} />
                                                <SessionItem device="iPhone 14 Pro" location="Mumbai, India" type="Smartphone" />
                                                <SessionItem device="iPad Pro 12.9" location="Bangalore, India" type="Smartphone" />
                                            </div>
                                            <div className="mt-6 flex justify-end">
                                                <button 
                                                    onClick={() => navigate('/settings/logs')}
                                                    className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:translate-x-1 transition-all"
                                                >
                                                    View Detailed Access Logs
                                                    <ChevronRight className="size-3" />
                                                </button>
                                            </div>
                                        </ConfigSection>
                                    </div>
                                )}

                                {activeTab === 'Notifications' && (
                                    <div className="space-y-10">
                                        <ConfigSection title="Alert Protocols" desc="Manage incoming signals and community updates.">
                                            <div className="flex flex-col gap-4">
                                                <ToggleConfig title="Submission Status" desc="Signals for mission approval or feedback requirements." defaultOn={true} />
                                                <ToggleConfig title="Network Activity" desc="Sync alerts when community nodes interact with your dossier." defaultOn={true} />
                                                <ToggleConfig title="System Intelligence" desc="Periodic updates on platform optimization and features." defaultOn={false} />
                                            </div>
                                        </ConfigSection>
                                    </div>
                                )}

                                {activeTab === 'System' && (
                                    <div className="space-y-10">
                                        <ConfigSection title="Visual Interface" desc="Optimize your dashboard aesthetic for high-fidelity work.">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="p-8 rounded-[2.5rem] bg-surface border border-border/40 flex items-center justify-between group">
                                                    <div className="flex flex-col gap-1.5">
                                                        <span className="text-sm font-black text-content italic uppercase">Dark Mode</span>
                                                        <span className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-widest font-mono">Current: {theme.toUpperCase()}</span>
                                                    </div>
                                                    <button 
                                                        onClick={toggleTheme}
                                                        className={`size-14 rounded-2xl border flex items-center justify-center transition-all ${
                                                            theme === 'dark' ? 'bg-primary border-primary text-white' : 'bg-surface border-border text-text-muted hover:border-primary hover:text-primary'
                                                        }`}
                                                    >
                                                        {theme === 'dark' ? <Moon className="size-6" /> : <Sun className="size-6" />}
                                                    </button>
                                                </div>
                                                <div className="p-8 rounded-[2.5rem] bg-surface/40 border border-border/20 flex items-center justify-between opacity-40 grayscale group cursor-not-allowed">
                                                    <div className="flex flex-col gap-1.5">
                                                        <span className="text-sm font-black text-content italic uppercase">Compact Hub</span>
                                                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] font-mono">SOON_V4.0</span>
                                                    </div>
                                                    <div className="w-12 h-6 rounded-full bg-border/20" />
                                                </div>
                                            </div>
                                        </ConfigSection>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </UserAppShell>
    );
};

// --- PRIVATE COMPONENTS ---

const ConfigSection = ({ title, desc, children }) => (
    <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 px-4">
            <h3 className="text-lg font-black text-content italic tracking-tight">{title}</h3>
            <p className="text-[10px] font-bold text-text-muted opacity-60 uppercase tracking-widest">{desc}</p>
        </div>
        <div className="w-full">
            {children}
        </div>
    </div>
);

const ConfigField = ({ label, type, placeholder, icon: Icon }) => (
    <div className="flex flex-col gap-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-4">{label}</label>
        <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 size-5 flex items-center justify-center transition-all">
                <Icon className="size-full text-primary/40 group-focus-within:text-primary" />
            </div>
            <input 
                type={type} 
                placeholder={placeholder}
                className="w-full py-5 pl-16 pr-8 rounded-[1.75rem] bg-surface/40 border border-border/40 focus:border-primary/60 outline-none transition-all text-sm font-bold text-content placeholder:text-text-muted/20 shadow-sm"
            />
        </div>
    </div>
);

const ToggleConfig = ({ title, desc, defaultOn }) => {
    const [isOn, setIsOn] = useState(defaultOn);
    return (
        <div className="p-8 rounded-[2.5rem] bg-surface border border-border/40 group hover:border-primary/40 transition-all flex items-center justify-between">
            <div className="flex flex-col gap-1.5">
                <span className="text-sm font-black text-content italic uppercase">{title}</span>
                <span className="text-[10px] font-bold text-text-muted opacity-60 uppercase tracking-widest">{desc}</span>
            </div>
            <button 
                onClick={() => setIsOn(!isOn)}
                className={`w-14 h-7 rounded-full relative p-1.5 transition-all flex items-center ${isOn ? 'bg-primary' : 'bg-surface-hover order border-border'}`}
            >
                <div className={`size-4 rounded-full transition-all ${isOn ? 'bg-white ml-auto' : 'bg-text-muted/40'}`} />
            </button>
        </div>
    );
};

const SessionItem = ({ device, location, type, current }) => (
    <div className="group relative">
        <div className={`p-6 rounded-[2rem] bg-surface border border-border/40 flex items-center justify-between transition-all duration-300 ${current ? 'ring-1 ring-emerald-500/30 bg-emerald-500/[0.02]' : 'hover:bg-surface-hover hover:border-primary/20'}`}>
            <div className="flex items-center gap-5">
                <div className={`size-14 rounded-2xl flex items-center justify-center transition-all shadow-inner ${current ? 'bg-emerald-500/10 text-emerald-500' : 'bg-surface-hover text-text-muted/60'}`}>
                    {type === 'Laptop' ? <Laptop className="size-6 group-hover:scale-110 transition-transform" /> : <Smartphone className="size-6 group-hover:scale-110 transition-transform" />}
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-content italic uppercase tracking-tight">{device}</span>
                        {current && (
                            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                <div className="size-1 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Active Node</span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-text-muted opacity-40 uppercase tracking-widest">{location}</span>
                        <div className="size-0.5 rounded-full bg-border" />
                        <span className="text-[9px] font-black text-primary uppercase tracking-widest opacity-60 italic">Signal Verified</span>
                    </div>
                </div>
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-red-500/5 text-red-500 text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white border border-red-500/10 shadow-sm">
                Terminate Node
            </button>
        </div>
    </div>
);

export default SettingsPage;
