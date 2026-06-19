import React, { useState, useEffect } from 'react';
import { 
  Lock, Bell, Moon, Sun, Shield, Save, Eye, EyeOff, 
  Settings as SettingsIcon, ShieldCheck, Zap, Globe, 
  ChevronRight, AlertCircle, Laptop, Smartphone, Mail,
  LogOut, Check, ArrowLeft, User, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CustomToaster from '../../components/common/CustomToaster';
import { requestNotificationPermission } from '../../utils/firebase';

/**
 * --- SETTINGS PAGE: ENTERPRISE CONFIGURATION ---
 * Redesigned for SaaS aesthetic.
 */
const SettingsPage = () => {
    const { theme, toggleTheme, accentColor, setAccentColor, isLoading, user } = useGlobalContext();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Profile');
    const [isMobileDetailView, setIsMobileDetailView] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [currentDevice, setCurrentDevice] = useState({ device: 'Loading...', location: 'Unknown', type: 'Laptop' });

    useEffect(() => {
        const ua = navigator.userAgent;
        let device = "Desktop Device";
        let type = "Laptop";
        
        if (/Windows/i.test(ua)) device = "Windows PC";
        else if (/Mac/i.test(ua)) device = "MacBook / Mac";
        else if (/iPhone|iPad|iPod/i.test(ua)) { device = "Apple Device"; type = "Smartphone"; }
        else if (/Android/i.test(ua)) { device = "Android Device"; type = "Smartphone"; }
        
        let browser = "Web Browser";
        if (/Edge/i.test(ua)) browser = "Edge";
        else if (/Chrome/i.test(ua)) browser = "Chrome";
        else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";
        else if (/Firefox/i.test(ua)) browser = "Firefox";

        setCurrentDevice({
            device: `${device} via ${browser}`,
            location: 'Current Location',
            type
        });
    }, []);

    const tabs = [
        { id: 'Profile', icon: User, desc: 'Personal Information' },
        { id: 'Security', icon: ShieldCheck, desc: 'Authentication & Access' },
        { id: 'Notifications', icon: Bell, desc: 'Alerts & Emails' },
        { id: 'System', icon: SettingsIcon, desc: 'Global Preferences' },
        { id: 'About App', icon: Info, desc: 'About INIQ Platform' }
    ];

    const USER_SECURITY_LOGS = [
        { event: 'Login Success',   device: 'MacBook Pro',    time: '1h ago',  status: 'verified', icon: ShieldCheck },
        { event: 'Password Update', device: 'Windows PC',     time: '2w ago',  status: 'ok',       icon: Lock },
        { event: 'Session Revoked', device: 'Unknown Mobile', time: '1m ago',  status: 'archived', icon: Shield },
    ];

    const [settings, setSettings] = useState({
        pushNotifications: user?.settings?.pushNotifications || false,
        emailNotifications: user?.settings?.emailNotifications !== false,
        mfaEnabled: true
    });
    
    const [saving, setSaving] = useState(false);

    const updateSettingRealtime = async (key, value) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        
        setSaving(true);
        const token = localStorage.getItem('iniq_token');
        
        let fcmToken = null;
        if (key === 'pushNotifications' && value === true) {
            try {
                fcmToken = await requestNotificationPermission();
            } catch (err) {
                toast.error('Failed to enable push notifications');
                setSettings(prev => ({ ...prev, pushNotifications: false }));
                setSaving(false);
                return;
            }
        }

        try {
            const res = await fetch('http://localhost:5000/api/users/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    settings: newSettings,
                    fcmToken,
                    fcmAction: newSettings.pushNotifications ? 'add' : 'remove'
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to save settings');
            toast.success(`${key === 'pushNotifications' ? 'Push' : 'Email'} Notifications updated!`);
        } catch (error) {
            toast.error(error.message);
            // Revert on failure
            setSettings({ ...settings });
        } finally {
            setSaving(false);
        }
    };

    return (
        <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <CustomToaster />
            <div className="h-full w-full flex flex-col lg:flex-row bg-background/50 overflow-hidden relative">
                
                {/* --- LEFT PANEL: NAVIGATION SIDEBAR --- */}
                <div className={`w-full lg:w-80 h-full border-r border-border/40 bg-surface/50 flex flex-col p-6 sm:p-8 md:p-10 shrink-0 z-20 overflow-y-auto custom-scrollbar transition-transform duration-300 ${isMobileDetailView ? '-translate-x-full absolute inset-0 lg:relative lg:translate-x-0 lg:inset-auto' : 'translate-x-0 relative'}`}>
                    
                    <div className="flex flex-col gap-1.5 mb-12">
                        <h1 className="text-xl font-bold text-content tracking-tight">Settings</h1>
                        <p className="text-sm font-medium text-text-muted mt-1">Manage your account preferences</p>
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setIsMobileDetailView(true); }}
                                className={`flex items-center gap-4 p-3 rounded-xl transition-all group relative ${
                                    activeTab === tab.id 
                                        ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                                        : 'bg-surface/50 text-text-muted hover:bg-surface hover:text-content border border-transparent shadow-sm'
                                }`}
                            >
                                <div className={`size-10 rounded-lg flex items-center justify-center transition-all ${
                                    activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'bg-background border border-border group-hover:border-border/60'
                                }`}>
                                    <tab.icon className="size-5" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-sm font-bold">{tab.id}</span>
                                    <span className="text-xs font-medium opacity-70 mt-0.5">{tab.desc}</span>
                                </div>
                                <div className="ml-auto lg:hidden">
                                    <ChevronRight className="size-5 text-text-muted opacity-50" />
                                </div>
                                {activeTab === tab.id && (
                                    <motion.div layoutId="activeTabIndicator" className="hidden lg:block w-1 h-6 rounded-full bg-primary ml-auto" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto pt-10">
                        <div className="p-5 rounded-xl bg-surface border border-border/40 flex flex-col gap-3">
                            <span className="text-xs font-bold text-success flex items-center gap-2">
                                <ShieldCheck className="size-4" />
                                Secure Connection
                            </span>
                            <p className="text-xs font-medium text-text-muted leading-relaxed">
                                Your account data is encrypted and securely stored.
                            </p>
                        </div>
                    </div>

                </div>

                {/* --- RIGHT PANEL: CONFIGURATION CANVAS --- */}
                <div className={`flex-1 h-full flex flex-col min-w-0 bg-background absolute lg:relative inset-0 lg:inset-auto z-30 transition-transform duration-300 lg:translate-x-0 ${isMobileDetailView ? 'translate-x-0' : 'translate-x-full'}`}>
                    
                    {/* Header Strip */}
                    <div className="h-20 border-b border-border/40 px-4 sm:px-8 md:px-10 flex items-center justify-between shrink-0 bg-surface/50 backdrop-blur-md relative z-10">
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setIsMobileDetailView(false)}
                                className="lg:hidden size-10 rounded-xl bg-surface border border-border/60 flex items-center justify-center text-text-muted hover:text-primary active:scale-95 transition-all shadow-sm"
                            >
                                <ArrowLeft className="size-5" />
                            </button>
                            <div className="flex flex-col">
                                <h2 className="text-xl font-bold text-content tracking-tight">{activeTab}</h2>
                                <p className="hidden sm:block text-xs font-medium text-text-muted mt-1">Configure your {activeTab.toLowerCase()} settings</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-text-muted flex items-center gap-2">
                                {saving ? (
                                    <>
                                        <div className="size-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                        Syncing in real-time...
                                    </>
                                ) : (
                                    <>
                                        <Save className="size-4 text-success" />
                                        Saved
                                    </>
                                )}
                            </span>
                        </div>
                    </div>

                    {/* Canvas Content */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 lg:p-10 pb-24 lg:pb-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-4xl mx-auto w-full flex flex-col gap-10"
                            >
                                {activeTab === 'Profile' && (
                                    <div className="space-y-10">
                                        <ConfigSection title="Personal Information" desc="Review your personal details and account data.">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <ConfigField label="Name" type="text" value={user?.name || ''} readOnly icon={User} />
                                                <ConfigField label="Email Address" type="email" value={user?.email || ''} readOnly icon={Mail} />
                                                <ConfigField label="Role" type="text" value={user?.role || 'User'} readOnly icon={ShieldCheck} />
                                            </div>
                                        </ConfigSection>
                                    </div>
                                )}

                                {activeTab === 'Security' && (
                                    <div className="space-y-10">
                                        <ConfigSection title="Two-Factor Authentication" desc="Add an extra layer of security to your account.">
                                            <div className="flex items-center justify-between p-6 rounded-2xl bg-surface border border-border/40 shadow-sm">
                                                <div className="flex flex-col gap-1 pr-6">
                                                    <span className="text-sm font-bold text-content">Authenticator App (MFA)</span>
                                                    <span className="text-xs font-medium text-text-muted leading-relaxed">Protect your account using an authenticator app like Google Authenticator.</span>
                                                </div>
                                                <button 
                                                    onClick={() => setSettings(p => ({ ...p, mfaEnabled: !p.mfaEnabled }))}
                                                    className={`w-12 h-6 rounded-full relative transition-all flex items-center shrink-0 ${settings.mfaEnabled ? 'bg-success' : 'bg-background border border-border'}`}
                                                >
                                                    <div className={`size-4 rounded-full bg-white transition-all shadow-sm ${settings.mfaEnabled ? 'ml-[26px]' : 'ml-1 opacity-50'}`} />
                                                </button>
                                            </div>
                                        </ConfigSection>

                                        <ConfigSection title="Password Management" desc="Update your password to keep your account secure.">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <ConfigField label="Current Password" type="password" placeholder="••••••••••••" icon={Lock} />
                                                <ConfigField label="New Password" type="password" placeholder="••••••••••••" icon={Lock} />
                                            </div>
                                        </ConfigSection>

                                        <ConfigSection title="Security Activity Log" desc="Monitor recent security events for your account.">
                                            <div className="rounded-2xl border border-border/40 overflow-hidden shadow-sm">
                                                {USER_SECURITY_LOGS.map((log, i) => (
                                                    <div key={i} className={`flex items-center justify-between px-5 py-4 bg-surface hover:bg-surface-hover transition-colors ${i < USER_SECURITY_LOGS.length - 1 ? 'border-b border-border/40' : ''}`}>
                                                        <div className="flex items-center gap-4">
                                                            <div className="size-10 rounded-xl bg-background border border-border/40 flex items-center justify-center text-text-muted shrink-0">
                                                                <log.icon className="size-4.5" />
                                                            </div>
                                                            <div className="flex flex-col gap-1">
                                                                <p className="text-sm font-bold text-content">{log.event}</p>
                                                                <p className="text-[11px] font-medium text-text-muted">{log.device}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end gap-1 shrink-0">
                                                            <span className="text-[11px] font-bold text-text-muted">{log.time}</span>
                                                            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase border ${
                                                                log.status === 'ok' || log.status === 'verified' 
                                                                    ? 'bg-success/10 text-success border-success/20' 
                                                                    : 'bg-surface text-text-muted border-border'
                                                            }`}>
                                                                <div className={`size-1.5 rounded-full ${log.status === 'ok' || log.status === 'verified' ? 'bg-success' : 'bg-text-muted'}`} />
                                                                {log.status}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </ConfigSection>

                                        <ConfigSection title="Active Sessions" desc="Manage devices that are currently logged into your account.">
                                            <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                                                <SessionItem device={currentDevice.device} location={currentDevice.location} type={currentDevice.type} current={true} />
                                            </div>
                                        </ConfigSection>
                                    </div>
                                )}

                                {activeTab === 'Notifications' && (
                                    <div className="space-y-10">
                                        <ConfigSection title="Email Notifications" desc="Choose what updates you want to receive via email.">
                                            <div className="flex flex-col gap-4">
                                                <ToggleConfig 
                                                    title="Push Notifications" 
                                                    desc="Receive real-time push notifications on this device." 
                                                    isOn={settings.pushNotifications} 
                                                    onChange={(val) => updateSettingRealtime('pushNotifications', val)} 
                                                />
                                                <ToggleConfig 
                                                    title="Email Notifications" 
                                                    desc="Receive email alerts for important platform updates." 
                                                    isOn={settings.emailNotifications} 
                                                    onChange={(val) => updateSettingRealtime('emailNotifications', val)} 
                                                />
                                            </div>
                                        </ConfigSection>
                                    </div>
                                )}

                                {activeTab === 'System' && (
                                    <div className="space-y-10">
                                        <ConfigSection title="Appearance" desc="Customize the look and feel of the platform.">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="p-6 rounded-2xl bg-surface border border-border/40 flex items-center justify-between shadow-sm">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-sm font-bold text-content">Theme Preference</span>
                                                        <span className="text-xs font-medium text-text-muted capitalize">{theme} Mode</span>
                                                    </div>
                                                    <button 
                                                        onClick={toggleTheme}
                                                        className={`size-12 rounded-xl flex items-center justify-center transition-all ${
                                                            theme === 'dark' ? 'bg-primary text-white shadow-md' : 'bg-background border border-border text-text-muted hover:border-primary hover:text-primary'
                                                        }`}
                                                    >
                                                        {theme === 'dark' ? <Moon className="size-5" /> : <Sun className="size-5" />}
                                                    </button>
                                                </div>

                                                <div className="p-6 rounded-2xl bg-surface border border-border/40 flex flex-col gap-4 shadow-sm">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-sm font-bold text-content">Accent Color</span>
                                                        <span className="text-xs font-medium text-text-muted">Personalize your platform color</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        {['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'].map(color => (
                                                            <button 
                                                                key={color}
                                                                onClick={() => setAccentColor(color)}
                                                                className={`size-8 rounded-full shadow-inner transition-transform hover:scale-110 flex items-center justify-center ${accentColor === color ? 'ring-2 ring-offset-2 ring-offset-surface scale-110' : 'opacity-80 hover:opacity-100'}`}
                                                                style={{ backgroundColor: color, borderColor: accentColor === color ? color : 'transparent' }}
                                                            >
                                                                {accentColor === color && <Check className="size-4 text-white" />}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </ConfigSection>
                                    </div>
                                )}

                                {activeTab === 'About App' && (
                                    <div className="space-y-10">
                                        <ConfigSection title="About INIQ" desc="Interview Intelligence Platform">
                                            <div className="p-8 rounded-2xl bg-surface border border-border/40 shadow-sm flex flex-col gap-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                                        <Globe className="size-8 text-primary" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h2 className="text-2xl font-bold text-content tracking-tight">INIQ Platform</h2>
                                                        <p className="text-sm font-medium text-primary">Version V1.0</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm font-medium text-text-muted leading-relaxed">
                                                    INIQ is the ultimate Interview Intelligence Platform designed to aggregate, analyze, and share high-fidelity interview experiences. Our mission is to democratize interview preparation through structured insights, deep-dive technical breakdowns, and community-driven knowledge sharing.
                                                </p>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/40">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Status</span>
                                                        <span className="text-sm font-semibold text-success flex items-center gap-1.5"><Zap className="size-3.5" /> All Systems Operational</span>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">License</span>
                                                        <span className="text-sm font-semibold text-content">MIT License</span>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Last Update</span>
                                                        <span className="text-sm font-semibold text-content">Today</span>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Launched At</span>
                                                        <span className="text-sm font-semibold text-content">Today</span>
                                                    </div>
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
    <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1 border-b border-border/40 pb-4">
            <h3 className="text-lg font-bold text-content tracking-tight">{title}</h3>
            <p className="text-sm font-medium text-text-muted">{desc}</p>
        </div>
        <div className="w-full">
            {children}
        </div>
    </div>
);

const ConfigField = ({ label, type, placeholder, icon: Icon, value, disabled, readOnly }) => (
    <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-text-muted">{label}</label>
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 size-5 flex items-center justify-center transition-colors">
                <Icon className="size-4 text-text-muted group-focus-within:text-primary" />
            </div>
            <input 
                type={type} 
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                readOnly={readOnly}
                className={`w-full py-3.5 pl-12 pr-4 rounded-xl bg-background border border-border/40 focus:border-primary outline-none transition-all text-sm font-semibold text-content placeholder:text-text-muted/40 shadow-sm ${disabled || readOnly ? 'opacity-70 cursor-not-allowed bg-surface' : ''}`}
            />
        </div>
    </div>
);

const ToggleConfig = ({ title, desc, isOn, onChange }) => {
    return (
        <div className="p-6 rounded-2xl bg-surface border border-border/40 flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-1 pr-6">
                <span className="text-sm font-bold text-content">{title}</span>
                <span className="text-xs font-medium text-text-muted leading-relaxed">{desc}</span>
            </div>
            <button 
                onClick={() => onChange(!isOn)}
                className={`w-12 h-6 rounded-full relative transition-all flex items-center shrink-0 ${isOn ? 'bg-primary' : 'bg-background border border-border'}`}
            >
                <div className={`size-4 rounded-full bg-white transition-all shadow-sm ${isOn ? 'ml-[26px]' : 'ml-1 opacity-50'}`} />
            </button>
        </div>
    );
};

const SessionItem = ({ device, location, type, current }) => (
    <div className={`p-5 rounded-2xl bg-surface border flex items-center justify-between transition-all ${current ? 'border-primary/30 bg-primary/5' : 'border-border/40'}`}>
        <div className="flex items-center gap-4">
            <div className={`size-12 rounded-xl flex items-center justify-center shadow-sm ${current ? 'bg-primary/10 text-primary' : 'bg-background border border-border/40 text-text-muted'}`}>
                {type === 'Laptop' ? <Laptop className="size-5" /> : <Smartphone className="size-5" />}
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-content">{device}</span>
                    {current && (
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">This Device</span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-text-muted">{location}</span>
                </div>
            </div>
        </div>
        {!current && (
            <button className="px-4 py-2 rounded-lg bg-background border border-border/40 text-xs font-bold text-danger hover:bg-danger hover:text-white hover:border-danger transition-all shadow-sm">
                Remove
            </button>
        )}
    </div>
);

export default SettingsPage;
