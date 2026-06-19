import React, { useState, useEffect } from 'react';
import { 
  Bell, CheckCircle2, Clock, ShieldAlert, Cpu, 
  Trash2, X, Filter, Search, Zap, Activity,
  Terminal, ShieldCheck, Mail, Info, Layers,
  Check, AlertCircle, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';
const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};

/**
 * --- ADMIN NOTIFICATIONS: ADMINISTRATIVE ALERT HUB ---
 * Refined Design: Professional, formal, and structured administrative hub 
 * for monitoring system alerts and moderation signals.
 */
const AdminNotificationsPage = () => {
    const { theme, toggleTheme, isLoading, setIsLoading } = useGlobalContext();
    const [activeTab, setActiveTab] = useState('All');
    const [notifications, setNotifications] = useState([]);

    const tabs = ['All', 'Moderation', 'System', 'Security'];

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('iniq_token');
            const res = await fetch('http://localhost:5000/api/notifications', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                setNotifications(data);
            } else {
                toast.error(data.error || 'Failed to fetch notifications');
            }
        } catch (err) {
            toast.error('Server error');
        } finally {
            setIsLoading(false);
        }
    };

    const markAllRead = async () => {
        try {
            const token = localStorage.getItem('iniq_token');
            const res = await fetch('http://localhost:5000/api/notifications/mark-all-read', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                setNotifications(notifications.map(n => ({ ...n, isRead: true })));
                toast.success('All marked as read');
            }
        } catch (err) {
            toast.error('Error marking as read');
        }
    };

    const clearAlerts = async () => {
        try {
            const token = localStorage.getItem('iniq_token');
            const res = await fetch('http://localhost:5000/api/notifications/clear', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                setNotifications([]);
                toast.success('Alerts cleared');
            }
        } catch (err) {
            toast.error('Error clearing alerts');
        }
    };

    const deleteNotif = async (id) => {
        // We don't have a single delete route in controller yet
        setNotifications(notifications.filter(n => n._id !== id));
    };

    const filteredNotifs = notifications.filter(n => activeTab === 'All' || n.type === activeTab);

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col p-8 lg:p-12 overflow-hidden bg-background">
                <div className="max-w-[1200px] mx-auto w-full h-full flex flex-col gap-8">
                    
                    {/* 1. ADMINISTRATION HEADER */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0 pt-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <span className="px-2.5 py-0.5 rounded bg-danger/10 border border-danger/20 text-[9px] font-bold uppercase tracking-wider text-danger">System Monitoring Hub</span>
                                <span className="px-2.5 py-0.5 rounded-md bg-success/10 border border-success/20 text-[10px] font-black uppercase tracking-widest text-success flex items-center gap-1.5">
                                    <div className="size-1.5 rounded-full bg-success animate-pulse" />
                                    Live Stream Active
                                </span>
                            </div>
                            <h1 className="text-3xl font-black text-content uppercase tracking-tight leading-none font-['Inter']">Alert Management</h1>
                            <p className="text-[10px] font-bold text-text-muted  uppercase tracking-[0.2em] mt-2">Real-time status updates and priority alerts from the platform's core synchronization layers.</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                             <button 
                                onClick={markAllRead}
                                className="h-[52px] px-6 rounded-xl bg-surface border border-border text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-primary transition-all flex items-center gap-3 shadow-sm active:scale-95 group"
                             >
                                <Check className="size-4.5" />
                                Mark All Read
                             </button>
                             <button 
                                onClick={clearAlerts}
                                className="h-[52px] px-6 rounded-xl bg-surface border border-border text-[10px] font-black uppercase tracking-widest text-danger hover:bg-danger hover:text-primary-text transition-all flex items-center gap-3 shadow-sm active:scale-95 group"
                             >
                                <Trash2 className="size-4.5" />
                                Clear Alerts
                             </button>
                        </div>
                    </div>

                    {/* 2. NAVIGATION & TABS */}
                    <div className="flex items-center border-b border-border shrink-0">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-5 text-[10px] font-black uppercase tracking-[0.25em] transition-all relative ${
                                    activeTab === tab 
                                        ? 'text-primary' 
                                        : 'text-text-muted  hover:opacity-100 hover:text-content'
                                }`}
                            >
                                {tab} Signals
                                {activeTab === tab && (
                                    <motion.div layoutId="adminNotifTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full shadow-lg shadow-primary/20" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* 3. ALERT DATASTREAM */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4 pb-20">
                        <AnimatePresence mode="popLayout">
                            {filteredNotifs.length > 0 ? (
                                filteredNotifs.map((notif, i) => (
                                    <motion.div
                                        key={notif._id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: i * 0.05 }}
                                        className={`p-6 rounded-2xl bg-surface border border-border hover:border-primary/20 transition-all flex items-start gap-6 relative group shadow-sm ${!notif.isRead ? 'border-l-4 border-l-primary' : ''}`}
                                    >
                                        {/* Priority Marker */}
                                        <div className={`absolute top-6 right-8 flex items-center gap-2`}>
                                            <div className={`size-2 rounded-full ${notif.priority === 'Critical' ? 'bg-danger animate-pulse' : notif.priority === 'High' ? 'bg-warning' : 'bg-success'}`} />
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted ">{notif.priority} Priority</span>
                                        </div>

                                        <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 border shadow-inner transition-all group-hover:scale-105 ${
                                            notif.type === 'Moderation' ? 'bg-warning/10 border-warning/20 text-warning' :
                                            notif.type === 'Security' ? 'bg-danger/10 border-danger/20 text-danger' :
                                            'bg-primary/10 border-primary/20 text-primary'
                                        }`}>
                                            {notif.type === 'Moderation' ? <ShieldCheck className="size-6" /> : 
                                             notif.type === 'Security' ? <ShieldAlert className="size-6" /> : 
                                             <Cpu className="size-6" />}
                                        </div>
                                        
                                        <div className="flex flex-col gap-2 flex-1 pr-32">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[11px] font-black italic text-content group-hover:text-primary transition-colors uppercase tracking-tight">{notif.title}</span>
                                                <div className="h-[1px] w-8 bg-border" />
                                                <span className="text-[9px] font-bold text-text-muted  uppercase tracking-widest">
                                                    {timeAgo(notif.createdAt)}
                                                </span>
                                            </div>
                                            <p className="text-[12px] font-medium text-text-muted leading-relaxed tracking-wide group-hover:text-content transition-colors uppercase italic ">
                                                {notif.message}
                                            </p>
                                        </div>

                                        <button 
                                            onClick={() => deleteNotif(notif._id)}
                                            className="size-10 rounded-lg bg-surface border border-border flex items-center justify-center text-text-muted hover:text-danger transition-all opacity-0 group-hover:opacity-100 active:scale-95"
                                        >
                                            <Trash2 className="size-4.5" />
                                        </button>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="py-40 flex flex-col items-center gap-6 opacity-30 grayscale text-center">
                                    <div className="size-20 rounded-3xl bg-surface border border-border border-dashed flex items-center justify-center">
                                        <Bell className="size-10" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest">No active system signals detected</span>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </AdminAppShell>
    );
};

export default AdminNotificationsPage;
