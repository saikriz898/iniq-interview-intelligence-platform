import React, { useState } from 'react';
import { 
  Bell, Sun, Moon, Languages, Eye, EyeOff,
  Fingerprint, Shield, Key, RefreshCcw, ShieldCheck, Power,
  Activity, Terminal, ShieldAlert, Zap, CheckCircle2,
  Info, Code2, GitBranch, Globe, Heart, Lock,
  Cpu, Database, Gauge, Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';
import toast from 'react-hot-toast';

const SECTIONS = [
  { id: 'notifications', label: 'Notifications', icon: Bell,     desc: 'Alerts & email preferences' },
  { id: 'appearance',    label: 'Appearance',    icon: Sun,      desc: 'Theme & display options' },
  { id: 'security',      label: 'Security',      icon: Shield,   desc: 'Password, MFA & access' },
  { id: 'about',         label: 'About App',     icon: Info,     desc: 'Platform info & build details' },
];

const APP_INFO = {
  name: 'INIQ — Interview Intelligence Platform',
  version: 'V1.0',
  build: 'Build #0194-PROD',
  description: 'INIQ is a peer-driven platform that aggregates and moderates real interview experiences from engineering candidates across India. Admins curate quality submissions, manage community users, and oversee content integrity.',
  contact: 'support@iniq.dev',
  repo: 'github.com/iniq-platform',
  license: 'MIT License',
  lastUpdate: 'Today',
  launchedAt: 'Today',
};

const NOTIF_LABELS = {
  newSubmissions: { label: 'New Submissions',  desc: 'When users submit new interview experiences.' },
  securityAlerts: { label: 'Security Alerts',  desc: 'Suspicious login or access attempts.' },
  databaseSync:   { label: 'Database Sync',    desc: 'DB backup and sync completion events.' },
  reportOverdue:  { label: 'Overdue Reports',  desc: 'Moderation tasks pending past deadline.' },
  systemUpdates:  { label: 'System Updates',   desc: 'Platform version & patch releases.' },
};

const SECURITY_LOGS = [
  { event: 'Login Success',   node: 'ADM-001',         time: '2m ago',  status: 'ok',       icon: ShieldCheck },
  { event: 'Key Rotation',    node: 'SYSTEM_ROOT',     time: '12h ago', status: 'ok',       icon: Key },
  { event: 'MFA Challenge',   node: 'Bengaluru_Node',  time: '1d ago',  status: 'verified', icon: Fingerprint },
  { event: 'Log Purge',       node: 'IO_NODE_SEC',     time: '3d ago',  status: 'archived', icon: Database },
  { event: 'Session Cleanup', node: 'WORKER_NODE_X',   time: '5d ago',  status: 'ok',       icon: Zap },
];

const AdminSettingsPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const [section, setSection] = useState('notifications');

    // Notifications
    const [notifs, setNotifs] = useState({
        newSubmissions: true, securityAlerts: true,
        databaseSync: false,  reportOverdue: true, systemUpdates: false,
    });

    // Security
    const [mfaOn, setMfaOn]           = useState(true);
    const [curPwd, setCurPwd]         = useState('');
    const [newPwd, setNewPwd]         = useState('');
    const [cfmPwd, setCfmPwd]         = useState('');
    const [showCur, setShowCur]       = useState(false);
    const [showNew, setShowNew]       = useState(false);
    const [showCfm, setShowCfm]       = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [pwdSuccess, setPwdSuccess] = useState(false);

    const handleToggleMfa = () => {
        setMfaOn(p => !p);
        toast.success(`MFA ${mfaOn ? 'disabled' : 'enabled'}`);
    };

    const handleChangePassword = async () => {
        if (!curPwd || !newPwd || !cfmPwd) { toast.error('Fill all fields'); return; }
        if (newPwd !== cfmPwd)              { toast.error('Passwords do not match'); return; }
        if (newPwd.length < 6)             { toast.error('Min 6 characters'); return; }
        setSubmitting(true);
        try {
            const token = localStorage.getItem('iniq_token');
            const res = await fetch('http://localhost:5000/api/users/change-password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ currentPassword: curPwd, newPassword: newPwd }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success('Password updated');
                setCurPwd(''); setNewPwd(''); setCfmPwd('');
                setPwdSuccess(true);
                setTimeout(() => setPwdSuccess(false), 2500);
            } else {
                toast.error(data.error || 'Update failed');
            }
        } catch { toast.error('Server error'); }
        finally { setSubmitting(false); }
    };

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col bg-background overflow-hidden">

                {/* ── HEADER ── */}
                <header className="shrink-0 h-16 px-6 border-b border-border/50 bg-surface/80 backdrop-blur-xl flex items-center z-20">
                    <div>
                        <h1 className="text-lg font-bold text-content leading-none">Platform Settings</h1>
                        <p className="text-xs text-text-muted mt-0.5">Manage notifications, appearance, security & platform info.</p>
                    </div>
                </header>

                {/* ── BODY ── */}
                <div className="flex-1 flex overflow-hidden min-h-0">

                    {/* ── LEFT NAV ── */}
                    <aside className="w-60 shrink-0 border-r border-border/40 p-3 flex flex-col gap-0.5 bg-surface/20 overflow-y-auto">
                        <p className="text-[9px] font-black uppercase tracking-widest text-text-muted px-3 py-2">Configuration</p>
                        {SECTIONS.map(s => {
                            const active = section === s.id;
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => setSection(s.id)}
                                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-all group ${
                                        active
                                            ? 'bg-primary/10 border border-primary/20 text-primary'
                                            : 'border border-transparent text-text-muted hover:text-content hover:bg-surface-hover'
                                    }`}
                                >
                                    <s.icon className={`size-4 shrink-0 ${active ? 'text-primary' : 'group-hover:text-primary transition-colors'}`} />
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold truncate">{s.label}</p>
                                        <p className="text-[10px] text-text-muted truncate leading-none mt-0.5">{s.desc}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </aside>

                    {/* ── RIGHT CONTENT ── */}
                    <main className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-10">
                        <div className="max-w-2xl mx-auto pb-20">
                            <AnimatePresence mode="wait">

                                {/* ───────────── NOTIFICATIONS ───────────── */}
                                {section === 'notifications' && (
                                    <motion.div key="notif" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex flex-col gap-6">
                                        <SectionHeader title="Notification Preferences" desc="Choose which platform events trigger alerts." />
                                        <div className="flex flex-col gap-2.5">
                                            {Object.entries(notifs).map(([key, val]) => (
                                                <div key={key} className="flex items-center justify-between p-4 rounded-2xl bg-surface border border-border hover:border-border/80 transition-all">
                                                    <div>
                                                        <p className="text-sm font-semibold text-content">{NOTIF_LABELS[key].label}</p>
                                                        <p className="text-xs text-text-muted mt-0.5">{NOTIF_LABELS[key].desc}</p>
                                                    </div>
                                                    <Toggle active={val} onToggle={() => setNotifs(p => ({ ...p, [key]: !p[key] }))} />
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* ───────────── APPEARANCE ───────────── */}
                                {section === 'appearance' && (
                                    <motion.div key="appear" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex flex-col gap-6">
                                        <SectionHeader title="Appearance" desc="Customize the platform's visual experience." />
                                        <div className="flex flex-col gap-3">
                                            <button onClick={toggleTheme} className="flex items-center gap-4 p-5 rounded-2xl bg-surface border border-border hover:border-primary/30 transition-all group">
                                                <div className="size-11 rounded-xl bg-background border border-border flex items-center justify-center text-primary group-hover:scale-105 transition-all">
                                                    {theme === 'dark' ? <Moon className="size-5" /> : <Sun className="size-5" />}
                                                </div>
                                                <div className="text-left flex-1">
                                                    <p className="text-sm font-semibold text-content">Toggle Theme</p>
                                                    <p className="text-xs text-text-muted mt-0.5">Currently <span className="font-bold capitalize text-primary">{theme}</span> mode.</p>
                                                </div>
                                                <div className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase border ${theme === 'dark' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-warning/10 text-warning border-warning/20'}`}>
                                                    {theme}
                                                </div>
                                            </button>
                                            <div className="flex items-center gap-4 p-5 rounded-2xl bg-surface/50 border border-border opacity-50 cursor-not-allowed">
                                                <div className="size-11 rounded-xl bg-background border border-border flex items-center justify-center text-text-muted">
                                                    <Languages className="size-5" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-sm font-semibold text-content">Language</p>
                                                    <p className="text-xs text-text-muted mt-0.5">English (Default) — more coming soon.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* ───────────── SECURITY ───────────── */}
                                {section === 'security' && (
                                    <motion.div key="sec" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex flex-col gap-8">
                                        <SectionHeader title="Security" desc="Manage authentication, credentials, and session logs." />

                                        {/* MFA */}
                                        <Card>
                                            <div className="flex items-center gap-3 mb-4">
                                                <Fingerprint className="size-4 text-success" />
                                                <h3 className="text-xs font-black uppercase tracking-widest text-content">Multi-Factor Authentication</h3>
                                            </div>
                                            <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border">
                                                <div>
                                                    <p className="text-sm font-semibold text-content">Two-Factor Authentication</p>
                                                    <p className="text-xs mt-0.5">
                                                        Status: <span className={`font-bold ${mfaOn ? 'text-success' : 'text-danger'}`}>{mfaOn ? 'Enabled' : 'Disabled'}</span>
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={handleToggleMfa}
                                                    className={`size-12 rounded-xl flex items-center justify-center transition-all active:scale-90 shadow-md ${mfaOn ? 'bg-success text-white shadow-success/20' : 'bg-surface border-2 border-border text-text-muted'}`}
                                                >
                                                    <Power className="size-5" />
                                                </button>
                                            </div>
                                        </Card>

                                        {/* Change Password */}
                                        <Card>
                                            <div className="flex items-center gap-3 mb-4">
                                                <Key className="size-4 text-primary" />
                                                <h3 className="text-xs font-black uppercase tracking-widest text-content">Change Password</h3>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <PwdField label="Current Password" value={curPwd} onChange={setCurPwd} show={showCur} toggle={() => setShowCur(p => !p)} />
                                                <PwdField label="New Password"     value={newPwd} onChange={setNewPwd} show={showNew} toggle={() => setShowNew(p => !p)} />
                                                <PwdField label="Confirm Password" value={cfmPwd} onChange={setCfmPwd} show={showCfm} toggle={() => setShowCfm(p => !p)} />
                                                {newPwd && cfmPwd && newPwd !== cfmPwd && (
                                                    <p className="text-xs text-danger font-semibold flex items-center gap-1.5">
                                                        <ShieldAlert className="size-3" /> Passwords do not match
                                                    </p>
                                                )}
                                                {pwdSuccess && (
                                                    <p className="text-xs text-success font-semibold flex items-center gap-1.5">
                                                        <CheckCircle2 className="size-3" /> Password updated successfully!
                                                    </p>
                                                )}
                                                <button
                                                    onClick={handleChangePassword}
                                                    disabled={submitting || !curPwd || !newPwd || !cfmPwd || newPwd !== cfmPwd}
                                                    className="h-11 mt-1 rounded-xl bg-primary text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {submitting ? <><RefreshCcw className="size-4 animate-spin" /> Updating...</> : <><ShieldCheck className="size-4" /> Update Password</>}
                                                </button>
                                            </div>
                                        </Card>

                                        {/* Session / Access Logs */}
                                        <Card>
                                            <div className="flex items-center gap-3 mb-4">
                                                <Activity className="size-4 text-warning" />
                                                <h3 className="text-xs font-black uppercase tracking-widest text-content">Security Activity Log</h3>
                                            </div>
                                            <div className="rounded-xl border border-border overflow-hidden">
                                                {SECURITY_LOGS.map((log, i) => (
                                                    <div key={i} className={`flex items-center justify-between px-4 py-3 bg-surface hover:bg-surface-hover transition-colors ${i < SECURITY_LOGS.length - 1 ? 'border-b border-border/40' : ''}`}>
                                                        <div className="flex items-center gap-3">
                                                            <div className="size-8 rounded-lg bg-background border border-border flex items-center justify-center text-text-muted shrink-0">
                                                                <log.icon className="size-3.5" />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-semibold text-content">{log.event}</p>
                                                                <p className="text-[10px] font-mono text-text-muted">{log.node}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 shrink-0">
                                                            <span className="text-[10px] text-text-muted">{log.time}</span>
                                                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase border ${
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
                                        </Card>

                                        {/* Danger Zone */}
                                        <Card className="border-danger/20 bg-danger/3">
                                            <div className="flex items-center gap-3 mb-4">
                                                <ShieldAlert className="size-4 text-danger" />
                                                <h3 className="text-xs font-black uppercase tracking-widest text-danger">Danger Zone</h3>
                                            </div>
                                            <div className="flex items-center justify-between p-4 rounded-xl bg-danger/5 border border-danger/20">
                                                <div>
                                                    <p className="text-sm font-bold text-content">System Lockdown</p>
                                                    <p className="text-xs text-text-muted mt-0.5">Immediately disable all non-admin access to the platform.</p>
                                                </div>
                                                <button className="shrink-0 ml-4 px-4 py-2.5 rounded-xl bg-danger text-white text-xs font-bold hover:bg-danger/90 transition-all active:scale-95 shadow-md shadow-danger/20">
                                                    Activate
                                                </button>
                                            </div>
                                        </Card>
                                    </motion.div>
                                )}

                                {/* ───────────── ABOUT APP ───────────── */}
                                {section === 'about' && (
                                    <motion.div key="about" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex flex-col gap-6">
                                        <SectionHeader title="About INIQ" desc="Platform information, build details and legal." />

                                        {/* Hero Card */}
                                        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-surface to-surface border border-primary/20 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                                                <Code2 className="size-32 text-primary" />
                                            </div>
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="size-12 rounded-xl bg-primary flex items-center justify-center text-white font-black text-lg shadow-lg shadow-primary/30">
                                                    IQ
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-black text-content">{APP_INFO.name}</h3>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-xs font-bold text-primary">{APP_INFO.version}</span>
                                                        <span className="text-text-muted">·</span>
                                                        <span className="text-xs text-text-muted font-mono">{APP_INFO.build}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-text-secondary leading-relaxed">{APP_INFO.description}</p>
                                        </div>



                                        {/* App Details */}
                                        <Card>
                                            <div className="flex items-center gap-3 mb-4">
                                                <Package className="size-4 text-accent" />
                                                <h3 className="text-xs font-black uppercase tracking-widest text-content">Platform Details</h3>
                                            </div>
                                            <div className="divide-y divide-border/40">
                                                {[
                                                    { label: 'Version',      value: APP_INFO.version,    icon: GitBranch },
                                                    { label: 'Build',        value: APP_INFO.build,      icon: Code2 },
                                                    { label: 'Last Updated', value: APP_INFO.lastUpdate, icon: Gauge },
                                                    { label: 'Launched At',  value: APP_INFO.launchedAt, icon: Zap },
                                                    { label: 'License',      value: APP_INFO.license,    icon: Shield },
                                                    { label: 'Repository',   value: APP_INFO.repo,       icon: Globe },
                                                    { label: 'Support',      value: APP_INFO.contact,    icon: Heart },
                                                ].map(({ label, value, icon: Icon }) => (
                                                    <div key={label} className="flex items-center justify-between py-3">
                                                        <div className="flex items-center gap-3">
                                                            <Icon className="size-3.5 text-text-muted shrink-0" />
                                                            <span className="text-xs font-semibold text-text-muted">{label}</span>
                                                        </div>
                                                        <span className="text-xs font-semibold text-content text-right">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </Card>

                                        {/* System Status */}
                                        <Card>
                                            <div className="flex items-center gap-3 mb-4">
                                                <Activity className="size-4 text-success" />
                                                <h3 className="text-xs font-black uppercase tracking-widest text-content">System Status</h3>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                {[
                                                    { name: 'API Server',   status: 'Operational' },
                                                    { name: 'Database',     status: 'Operational' },
                                                    { name: 'Auth Service', status: 'Operational' },
                                                    { name: 'File Storage', status: 'Degraded' },
                                                ].map(s => (
                                                    <div key={s.name} className="flex items-center justify-between p-3 rounded-xl bg-background border border-border">
                                                        <span className="text-sm font-semibold text-content">{s.name}</span>
                                                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border ${
                                                            s.status === 'Operational'
                                                                ? 'bg-success/10 text-success border-success/20'
                                                                : 'bg-warning/10 text-warning border-warning/20'
                                                        }`}>
                                                            <div className={`size-1.5 rounded-full ${s.status === 'Operational' ? 'bg-success animate-pulse' : 'bg-warning'}`} />
                                                            {s.status}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </Card>

                                        <p className="text-center text-xs text-text-muted pb-4">
                                            Made with <span className="text-danger">♥</span> by the INIQ Engineering Team · {APP_INFO.version}
                                        </p>
                                    </motion.div>
                                )}

                            </AnimatePresence>
                        </div>
                    </main>
                </div>
            </div>
        </AdminAppShell>
    );
};

// ── PRIVATE COMPONENTS ──

const SectionHeader = ({ title, desc }) => (
    <div className="mb-2">
        <h2 className="text-xl font-bold text-content">{title}</h2>
        <p className="text-sm text-text-muted mt-1">{desc}</p>
    </div>
);

const Card = ({ children, className = '' }) => (
    <div className={`p-5 rounded-2xl bg-surface border border-border shadow-sm ${className}`}>{children}</div>
);

const Toggle = ({ active, onToggle }) => (
    <button
        onClick={onToggle}
        className={`relative w-11 h-6 rounded-full border transition-all active:scale-95 shrink-0 ml-4 ${active ? 'bg-primary border-primary' : 'bg-background border-border'}`}
    >
        <div className={`absolute top-0.5 size-5 rounded-full bg-white shadow-md transition-all ${active ? 'left-[calc(100%-22px)]' : 'left-0.5'}`} />
    </button>
);

const PwdField = ({ label, value, onChange, show, toggle }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-text-muted">{label}</label>
        <div className="relative">
            <input
                type={show ? 'text' : 'password'}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-4 pr-11 rounded-xl bg-background border border-border text-sm text-content outline-none focus:border-primary transition-all shadow-inner"
            />
            <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-content transition-colors p-1">
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
        </div>
    </div>
);

export default AdminSettingsPage;
