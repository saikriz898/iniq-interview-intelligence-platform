import React, { useState } from 'react';
import { 
  Bell, CheckCircle2, XCircle, Clock, 
  ArrowRight, User, Settings, Info, 
  MoreVertical, Check, Trash2, MailOpen,
  Filter, Calendar, ExternalLink, Zap,
  Activity, ShieldAlert, Cpu, Settings2,
  BellRing, Mail, AppWindow, ToggleLeft, ToggleRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CustomToaster from '../../components/common/CustomToaster';

/**
 * --- NOTIFICATIONS PAGE (MISSION CONTROL) ---
 * Features: High-density intelligence log, category-based filtering, 
 * and status-coded activity blips. 
 * Architecture: No-scroll viewport with internal data scrolling.
 */
const NotificationsPage = () => {
  const { theme, toggleTheme, isLoading, setIsLoading } = useGlobalContext();
  const [activeCategory, setActiveCategory] = useState('All Log');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showFeedSettings, setShowFeedSettings] = useState(false);
  const [feedConfigs, setFeedConfigs] = useState({
    push: true,
    system: true,
    email: false,
    analytics: true
  });
  const navigate = useNavigate();

  const categories = ['All Log', 'Action Required', 'Alerts'];

  const [notifications, setNotifications] = useState([
    { id: 1, category: 'Action Required', status: 'approved', title: 'JOURNEY_APPROVED: GOOGLE_SDE_I', message: 'Encryption complete. Your interview experience module is now live in the intelligence hub.', time: '12m_A_LOG', priority: 'High', isRead: false },
    { id: 2, category: 'Action Required', status: 'rejected', title: 'PROTOCOL_BREACH: META_DESIGN', message: 'Technical validation failed. Review feedback and re-apply protocol updates to the design module.', time: '02h_A_LOG', priority: 'Critical', isRead: false },
    { id: 3, category: 'Alerts', status: 'pending', title: 'DRAFT_EXPIRY_WARNING: AMAZON_SDE_II', message: '90% operational. Sync required within 24 hours to prevent background archival.', time: '01d_A_LOG', priority: 'Medium', isRead: true },
    { id: 4, category: 'All Log', status: 'info', title: 'SYSTEM_SYNC: PROFILE_ENCRYPTION', message: 'Personal biometric information successfully updated across all decentralized nodes.', time: '02d_A_LOG', priority: 'Low', isRead: true },
    { id: 5, category: 'All Log', status: 'review', title: 'ADMIN_SCAN: ZOHO_INSIGHTS', message: 'Verification protocol active. Your research module is being processed for historical patterns.', time: '04d_A_LOG', priority: 'Medium', isRead: true },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast.success('ALL PROTOCOLS MARKED AS READ');
  };

  const clearAll = () => {
    setNotifications([]);
    toast('NOTIFICATIONS_DECOMMISSIONED', { icon: '🗑️' });
  };

  const deleteOne = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.error('LOG_ENTRY_REMOVED');
    setOpenMenuId(null);
  };

  const toggleRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
    setOpenMenuId(null);
  };

  const toggleConfig = (key) => {
    setFeedConfigs(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success(`${key.toUpperCase()}_PROTOCOL_${!feedConfigs[key] ? 'ENABLED' : 'DISABLED'}`, {
        icon: !feedConfigs[key] ? '🟢' : '⚪'
    });
  };

  const filteredNotifs = notifications.filter(n => 
    activeCategory === 'All Log' || n.category === activeCategory
  );

  return (
    <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
      <CustomToaster />
      
      <div className="h-full flex flex-col overflow-hidden bg-background font-['Inter']">
        {/* 1. MISSION CONTROL HEADER */}
        <header className="shrink-0 p-8 md:p-10 pb-6 flex flex-col gap-8 border-b border-border/10 bg-surface/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="size-11 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner overflow-hidden relative group">
                            <Activity className="size-5.5 text-primary group-hover:scale-110 transition-transform" />
                            <div className="absolute inset-0 bg-primary/20 blur-xl scale-150 animate-pulse" />
                        </div>
                        <h1 className="text-3xl font-black text-content font-['Sora'] tracking-tighter uppercase italic">
                            Activity <span className="text-primary text-2xl font-black">LOG.RX</span>
                        </h1>
                    </div>
                    <p className="text-[10px] font-black text-text-muted opacity-40 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                        <Cpu className="size-3" />
                        Intelligence Feed • Monitoring {notifications.length} Active Node Events
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={markAllAsRead}
                        className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-surface border border-border/60 text-[10px] font-black uppercase tracking-widest text-text-muted hover:border-primary hover:text-primary transition-all active:scale-95 shadow-sm"
                    >
                        <MailOpen className="size-4" />
                        Sync All Read
                    </button>
                    <button 
                         onClick={clearAll}
                        className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-sm"
                    >
                        <Trash2 className="size-4" />
                        Clear Database
                    </button>
                </div>
            </div>

            {/* CATEGORY HUB */}
            <div className="flex items-center gap-3 relative z-50">
                <div className="flex items-center gap-1.5 p-1.5 bg-surface border border-border/40 rounded-2xl shadow-sm self-start">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all relative ${
                                activeCategory === cat 
                                    ? 'text-white' 
                                    : 'text-text-muted hover:text-content hover:bg-surface-hover'
                            }`}
                        >
                            {activeCategory === cat && (
                                <motion.div 
                                    layoutId="notif-cat-bg-v2"
                                    className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20"
                                />
                            )}
                            <span className="relative z-10">{cat}</span>
                        </button>
                    ))}
                </div>
                <div className="flex-1" />
                
                {/* FEED SETTINGS HUB */}
                <div className="relative">
                    <button 
                        onClick={() => setShowFeedSettings(!showFeedSettings)}
                        className={`px-6 py-4.5 rounded-2xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-3 relative transition-all ${
                            showFeedSettings 
                            ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' 
                            : 'bg-surface border-border/60 text-text-muted hover:border-primary/40 hover:text-primary'
                        }`}
                    >
                        <Settings2 className="size-4" />
                        Feed Settings
                    </button>

                    <AnimatePresence>
                        {showFeedSettings && (
                            <>
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setShowFeedSettings(false)}
                                    className="fixed inset-0 z-[100]"
                                />
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    className="absolute right-0 top-full mt-4 w-80 bg-surface border border-border/60 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] z-[110] overflow-hidden p-6 backdrop-blur-xl"
                                >
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col gap-1">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Intelligence Stream Config</h4>
                                            <p className="text-[9px] font-bold text-text-muted opacity-60 uppercase">Operational Broadcast Integrity</p>
                                        </div>

                                        <div className="space-y-2">
                                            <SettingToggle 
                                                label="Push Notifications" 
                                                desc="Real-time browser activity alerts" 
                                                icon={BellRing} 
                                                active={feedConfigs.push} 
                                                onClick={() => toggleConfig('push')} 
                                            />
                                            <SettingToggle 
                                                label="System Alerts" 
                                                desc="Critical platform node updates" 
                                                icon={ShieldAlert} 
                                                active={feedConfigs.system} 
                                                onClick={() => toggleConfig('system')} 
                                            />
                                            <SettingToggle 
                                                label="Email Digest" 
                                                desc="Daily journey summary to inbox" 
                                                icon={Mail} 
                                                active={feedConfigs.email} 
                                                onClick={() => toggleConfig('email')} 
                                            />
                                            <SettingToggle 
                                                label="In-App Monitoring" 
                                                desc="Visual activity blips in header" 
                                                icon={AppWindow} 
                                                active={feedConfigs.analytics} 
                                                onClick={() => toggleConfig('analytics')} 
                                            />
                                        </div>

                                        <div className="pt-4 border-t border-border/40 flex justify-end">
                                            <span className="text-[8px] font-black uppercase tracking-widest text-text-muted opacity-40">Protocol v4.0.2 Active</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>

        {/* 2. LOG FEED (Internally Scrollable) */}
        <div className="flex-1 overflow-hidden px-8 md:px-10 pb-10 pt-6 relative z-0">
            <div className="h-full bg-surface border border-border/40 rounded-[2.5rem] flex flex-col overflow-hidden shadow-sm">
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredNotifs.length > 0 ? (
                            filteredNotifs.map((notif, i) => (
                                <motion.div
                                    key={notif.id}
                                    layout
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => toggleRead(notif.id)}
                                    className={`group relative p-6 rounded-[2rem] border transition-all flex items-start gap-6 cursor-pointer ${
                                        notif.isRead 
                                            ? 'bg-surface/30 border-border/40 opacity-70 scale-98 blur-[0.2px]' 
                                            : 'bg-surface border-primary/20 shadow-xl shadow-primary/5 ring-1 ring-primary/5'
                                    }`}
                                >
                                    {!notif.isRead && (
                                        <div className="absolute top-8 left-3 size-2 rounded-full bg-primary shadow-[0_0_15px_rgba(99,102,241,1)] animate-pulse" />
                                    )}
                                    
                                    <div className={`size-14 rounded-2.5xl flex items-center justify-center shrink-0 border transition-all ${
                                        notificationIconStyle(notif.status)
                                    }`}>
                                        {notificationIcon(notif.status)}
                                    </div>

                                    <div className="flex-1 flex flex-col gap-2 pt-1 pr-12">
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md border ${
                                                notif.priority === 'Critical' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                                notif.priority === 'High' ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' :
                                                'bg-surface-hover border-border text-text-muted opacity-60'
                                            }`}>
                                                {notif.priority}
                                            </span>
                                            <span className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-widest">{notif.time}</span>
                                        </div>
                                        <h3 className={`text-base font-black tracking-tight leading-none italic ${notif.isRead ? 'text-content/50' : 'text-content'}`}>
                                            {notif.title}
                                        </h3>
                                        <p className={`text-[12px] font-bold leading-relaxed pr-10 max-w-3xl ${notif.isRead ? 'text-text-muted opacity-40' : 'text-text-muted opacity-70'}`}>
                                            {notif.message}
                                        </p>
                                    </div>

                                    <div className="absolute top-8 right-8" onClick={(e) => e.stopPropagation()}>
                                        <button 
                                            onClick={() => setOpenMenuId(openMenuId === notif.id ? null : notif.id)}
                                            className={`p-3 rounded-xl transition-all border ${
                                                openMenuId === notif.id 
                                                ? 'bg-primary border-primary text-white shadow-lg' 
                                                : 'text-text-muted border-border/40 hover:bg-surface-hover hover:text-primary'
                                            }`}
                                        >
                                            <MoreVertical className="size-4" />
                                        </button>

                                        <AnimatePresence>
                                            {openMenuId === notif.id && (
                                                <>
                                                    <div className="fixed inset-0 z-[120]" onClick={() => setOpenMenuId(null)} />
                                                    <motion.div 
                                                        initial={{ opacity: 0, scale: 0.95, y: 10, x: -10 }}
                                                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                                                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                        className="absolute right-0 top-full mt-3 w-56 bg-surface border border-border/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[130] overflow-hidden p-2 backdrop-blur-xl"
                                                    >
                                                        <button 
                                                            onClick={() => toggleRead(notif.id)}
                                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-primary hover:bg-primary/5 transition-all"
                                                        >
                                                            {notif.isRead ? <MailOpen className="size-4" /> : <Check className="size-4" />}
                                                            {notif.isRead ? 'Mark Active' : 'Mark Processed'}
                                                        </button>
                                                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-primary hover:bg-primary/5 transition-all">
                                                            <ExternalLink className="size-4" />
                                                            View Context
                                                        </button>
                                                        <div className="h-[1px] bg-border/40 my-1 mx-2" />
                                                        <button 
                                                            onClick={() => deleteOne(notif.id)}
                                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/5 transition-all"
                                                        >
                                                            <Trash2 className="size-4" />
                                                            Decommission
                                                        </button>
                                                    </motion.div>
                                                </>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center gap-10 py-12">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150 animate-pulse" />
                                    <div className="relative size-32 rounded-[3.5rem] bg-surface border border-dashed border-border/60 flex items-center justify-center">
                                        <ShieldAlert className="size-12 text-text-muted opacity-20" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 max-w-[420px] mx-auto text-center">
                                    <h3 className="text-3xl font-black text-content tracking-tighter uppercase italic">LOG DATABASE CLEAR</h3>
                                    <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] opacity-40 leading-relaxed px-4">
                                        No active node events detected in the {activeCategory.toLowerCase()} module at this operational status.
                                    </p>
                                </div>
                                <button 
                                    onClick={() => setActiveCategory('All Log')}
                                    className="px-10 py-5 rounded-[2rem] bg-primary text-white text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-primary/40 hover:-translate-y-1 transition-all flex items-center gap-4 mx-auto"
                                >
                                    Relaunch Global Feed
                                    <ArrowRight className="size-4" />
                                </button>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
      </div>
    </UserAppShell>
  );
};

// UI HELPERS
const SettingToggle = ({ label, desc, icon: Icon, active, onClick }) => (
    <button
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
            active ? 'bg-primary/5 border-primary/20' : 'bg-surface-hover/50 border-transparent hover:border-border/40'
        }`}
    >
        <div className="flex items-center gap-4">
            <div className={`size-10 rounded-xl flex items-center justify-center transition-all ${
                active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-hover border border-border/40 text-text-muted'
            }`}>
                <Icon className="size-5" />
            </div>
            <div className="flex flex-col text-left">
                <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-primary' : 'text-content'}`}>{label}</span>
                <span className="text-[8px] font-bold text-text-muted opacity-40 uppercase tracking-widest">{desc}</span>
            </div>
        </div>
        {active ? <ToggleRight className="size-6 text-primary" /> : <ToggleLeft className="size-6 text-text-muted opacity-20" />}
    </button>
);

const notificationIcon = (status) => {
    switch (status) {
        case 'approved': return <CheckCircle2 className="size-6" />;
        case 'rejected': return <ShieldAlert className="size-6" />;
        case 'pending': return <Clock className="size-6" />;
        case 'info': return <Zap className="size-6" />;
        case 'review': return <Settings className="size-6" />;
        default: return <Info className="size-6" />;
    }
};

const notificationIconStyle = (status) => {
    switch (status) {
        case 'approved': return 'bg-green-500/10 border-green-500/20 text-green-500';
        case 'rejected': return 'bg-red-500/10 border-red-500/20 text-red-500';
        case 'pending': return 'bg-orange-500/10 border-orange-500/20 text-orange-500';
        case 'info': return 'bg-blue-500/10 border-blue-500/20 text-blue-500';
        case 'review': return 'bg-primary/10 border-primary/20 text-primary';
        default: return 'bg-surface-hover border-border text-text-muted';
    }
};

export default NotificationsPage;
