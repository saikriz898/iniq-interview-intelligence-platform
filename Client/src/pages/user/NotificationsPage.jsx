import React, { useState, useEffect } from 'react';
import { 
  Bell, CheckCircle2, Clock, Trash2, MailOpen,
  Settings2, ArrowRight, ShieldAlert, Zap, Info, MoreVertical,
  Check, ExternalLink, Mail, BellRing, AppWindow
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CustomToaster from '../../components/common/CustomToaster';

/**
 * --- NOTIFICATIONS PAGE ---
 * A clean, professional inbox for user activity and updates.
 */
const NotificationsPage = () => {
  const { theme, toggleTheme, isLoading, user } = useGlobalContext();
  const [activeTab, setActiveTab] = useState('All');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    const token = localStorage.getItem('iniq_token');
    if (!token) return;
    try {
      const res = await fetch('http://localhost:5000/api/notifications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setNotifications(data);
      }
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  const markAllAsRead = async () => {
    const token = localStorage.getItem('iniq_token');
    if (!token) return;
    try {
      const res = await fetch('http://localhost:5000/api/notifications/mark-all-read', {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
        toast.success('All notifications marked as read');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const clearAll = async () => {
    const token = localStorage.getItem('iniq_token');
    if (!token) return;
    try {
      const res = await fetch('http://localhost:5000/api/notifications/clear', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setNotifications([]);
        toast.success('Inbox cleared');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleRead = async (id, currentStatus) => {
    if (currentStatus) return; // If already read, ignore (or implement toggle unread if API supports it)
    const token = localStorage.getItem('iniq_token');
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:5000/api/notifications/mark-read/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
        setOpenMenuId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredNotifs = notifications.filter(n => {
    if (activeTab === 'Unread') return !n.isRead;
    return true; // 'All'
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    if (diffInSeconds < 60) return 'Just now';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
      <CustomToaster />
      
      <div className="h-full flex flex-col bg-background relative overflow-hidden font-['Inter']">
        
        {/* TOP HEADER */}
        <div className="shrink-0 px-8 py-10 md:px-12 flex flex-col gap-6 bg-surface/50 border-b border-border/40 z-10 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-content tracking-tight flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary relative">
                            <Bell className="size-5" />
                            <div className="absolute -top-1 -right-1 size-3 bg-success rounded-full border-2 border-surface animate-pulse" />
                        </div>
                        Inbox
                        <span className="px-2.5 py-0.5 rounded-md bg-success/10 border border-success/20 text-[10px] font-black uppercase tracking-widest text-success flex items-center gap-1.5 ml-2">
                            <div className="size-1.5 rounded-full bg-success animate-pulse" />
                            Real-time Sync
                        </span>
                    </h1>
                    <p className="text-sm font-medium text-text-muted mt-1">
                        You have {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={markAllAsRead}
                        disabled={unreadCount === 0}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-border hover:border-primary/40 hover:text-primary transition-all text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-text-secondary"
                    >
                        <CheckCircle2 className="size-4" />
                        Mark all as read
                    </button>
                    <button 
                        onClick={clearAll}
                        disabled={notifications.length === 0}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-border hover:border-danger/40 hover:text-danger hover:bg-danger/5 transition-all text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-text-secondary"
                    >
                        <Trash2 className="size-4" />
                        Clear Inbox
                    </button>
                </div>
            </div>

            {/* TABS */}
            <div className="flex items-center gap-2 mt-2">
                {['All', 'Unread'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 rounded-lg text-sm font-bold transition-all relative ${
                            activeTab === tab 
                            ? 'text-primary' 
                            : 'text-text-muted hover:bg-surface-hover'
                        }`}
                    >
                        {activeTab === tab && (
                            <motion.div 
                                layoutId="inboxTabIndicator"
                                className="absolute inset-0 bg-primary/10 rounded-lg"
                            />
                        )}
                        <span className="relative z-10">{tab}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* INBOX LIST */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 bg-background/50">
            <div className="max-w-5xl mx-auto w-full flex flex-col gap-3">
                <AnimatePresence mode="popLayout">
                    {filteredNotifs.length > 0 ? (
                        filteredNotifs.map((notif, i) => (
                            <motion.div
                                key={notif._id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => toggleRead(notif._id, notif.isRead)}
                                className={`group flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${
                                    notif.isRead 
                                        ? 'bg-surface/50 border-border/40 opacity-80' 
                                        : 'bg-surface border-primary/20 shadow-sm shadow-primary/5 ring-1 ring-primary/5'
                                }`}
                            >
                                <div className={`size-10 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${
                                    notif.priority === 'Critical' ? 'bg-danger/10 border-danger/20 text-danger' :
                                    notif.priority === 'High' ? 'bg-warning/10 border-warning/20 text-warning' :
                                    notif.title.includes('APPROVED') ? 'bg-success/10 border-success/20 text-success' :
                                    'bg-primary/10 border-primary/20 text-primary'
                                }`}>
                                    {notif.priority === 'Critical' ? <ShieldAlert className="size-4.5" /> : 
                                     notif.priority === 'High' ? <Clock className="size-4.5" /> : 
                                     notif.title.includes('APPROVED') ? <CheckCircle2 className="size-4.5" /> :
                                     <Info className="size-4.5" />}
                                </div>

                                <div className="flex-1 flex flex-col gap-1.5 pr-8 relative w-full overflow-hidden">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            {!notif.isRead && (
                                                <div className="size-2 rounded-full bg-primary shrink-0" />
                                            )}
                                            <h3 className={`text-base font-bold truncate ${notif.isRead ? 'text-content/80' : 'text-content'}`}>
                                                {notif.title.replace(/_/g, ' ')}
                                            </h3>
                                        </div>
                                        <span className="text-xs font-medium text-text-secondary whitespace-nowrap shrink-0">
                                            {timeAgo(notif.createdAt)}
                                        </span>
                                    </div>
                                    <p className={`text-sm leading-relaxed max-w-4xl line-clamp-2 ${notif.isRead ? 'text-text-muted' : 'text-text-secondary font-medium'}`}>
                                        {notif.message}
                                    </p>
                                    
                                    {/* Link Action if present */}
                                    {notif.link && (
                                        <div className="mt-2">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); navigate(notif.link); }}
                                                className="text-xs font-bold text-primary hover:underline flex items-center gap-1 w-max"
                                            >
                                                View Details <ArrowRight className="size-3" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            className="flex flex-col items-center justify-center py-20 text-center gap-4"
                        >
                            <div className="size-20 rounded-full bg-surface border border-border/60 flex items-center justify-center mb-2">
                                <Bell className="size-8 text-text-muted/40" />
                            </div>
                            <h3 className="text-lg font-bold text-content">You're all caught up!</h3>
                            <p className="text-sm font-medium text-text-muted max-w-sm">
                                There are no {activeTab.toLowerCase()} notifications to display at the moment.
                            </p>
                            {activeTab === 'Unread' && notifications.length > 0 && (
                                <button 
                                    onClick={() => setActiveTab('All')}
                                    className="mt-4 px-6 py-2.5 rounded-xl bg-surface border border-border text-sm font-semibold hover:border-primary hover:text-primary transition-all"
                                >
                                    View all notifications
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>

      </div>
    </UserAppShell>
  );
};

export default NotificationsPage;
