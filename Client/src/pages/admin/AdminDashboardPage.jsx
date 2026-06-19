import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Clock, XCircle, Activity,
  ShieldCheck, ArrowRight, TrendingUp, Users, Database
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';
import toast from 'react-hot-toast';

/**
 * --- ADMIN DASHBOARD: OVERVIEW ---
 * Refined Design: Professional, formal, and structured administrative hub.
 * Features: Rich aesthetics, mock activity charts, and premium glassmorphism.
 */
const AdminDashboardPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        recentPending: []
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch('/api/experiences/admin-dashboard', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setDashboardData(data);
            } else {
                toast.error('Failed to sync telemetry');
            }
        } catch (err) {
            toast.error('Dashboard connection failed');
        }
    };

    const stats = [
        { label: "Pending Reviews", value: dashboardData.pending.toLocaleString(), sub: "Action Required", icon: Clock, color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
        { label: "Approved Logs", value: dashboardData.approved.toLocaleString(), sub: "Verified", icon: CheckCircle2, color: "text-success", bg: "bg-success/10", border: "border-success/20" },
        { label: "Rejected Logs", value: dashboardData.rejected.toLocaleString(), sub: "Declined", icon: XCircle, color: "text-danger", bg: "bg-danger/10", border: "border-danger/20" },
        { label: "Total Synced", value: dashboardData.total.toLocaleString(), sub: "Global", icon: Database, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
    ];

    // Mock Chart Data for aesthetic richness
    const chartBars = [40, 60, 35, 80, 50, 90, 70, 85, 45, 65, 30, 75];

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col p-6 sm:p-8 lg:p-12 overflow-y-auto custom-scrollbar bg-background relative">
                
                {/* Background Glow */}
                <div className="absolute top-0 left-1/4 w-[50vw] h-[30vh] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-[1500px] mx-auto w-full flex flex-col gap-10 pt-4 pb-20 relative z-10">
                    
                    {/* 1. ADMINISTRATION HEADER */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border/60 pb-8 relative">
                        <div className="flex flex-col gap-2">
                             <div className="flex items-center gap-2 mb-1">
                                 <div className="size-2 rounded-full bg-primary animate-pulse" />
                                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">System Operations</span>
                             </div>
                             <h1 className="text-3xl sm:text-4xl font-black text-content tracking-tight leading-none font-['Space_Grotesk']">Command Overview</h1>
                             <p className="text-sm font-medium text-text-muted mt-1 max-w-lg">Real-time telemetry and moderation queues for the global registry intelligence platform.</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <button onClick={() => navigate('/admin/reviews')} className="h-[44px] px-6 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2 group border border-primary/50 hover:shadow-primary/40">
                                <ShieldCheck className="size-4.5" />
                                Launch Moderation
                                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* 2. OPERATIONAL TELEMETRY GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`p-6 rounded-3xl bg-surface/80 backdrop-blur-md border ${stat.border} flex flex-col gap-6 shadow-xl shadow-black/5 hover:border-opacity-100 hover:shadow-2xl transition-all duration-300 group overflow-hidden relative`}
                            >
                                <div className={`absolute -right-6 -top-6 size-32 rounded-full ${stat.bg} blur-3xl opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`} />
                                
                                <div className="flex items-center justify-between relative z-10">
                                    <div className={`size-12 rounded-2xl ${stat.bg} border ${stat.border} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                                        <stat.icon className={`size-5 ${stat.color}`} />
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${stat.bg} ${stat.color} ${stat.border}`}>{stat.sub}</span>
                                </div>
                                <div className="flex flex-col gap-1.5 relative z-10">
                                    <span className="text-sm font-semibold text-text-muted">
                                        {stat.label}
                                    </span>
                                    <h3 className="text-4xl font-black text-content tabular-nums tracking-tight font-['Space_Grotesk']">
                                        {stat.value}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* 3. DYNAMIC CONTENT GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* CHART VISUALIZATION */}
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2 p-8 rounded-3xl bg-surface/50 backdrop-blur-xl border border-border flex flex-col gap-8 shadow-xl shadow-black/5 relative overflow-hidden"
                        >
                            <div className="flex items-center justify-between z-10">
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-xl font-bold text-content flex items-center gap-2">
                                        <Activity className="size-5 text-primary" />
                                        Submission Velocity
                                    </h2>
                                    <p className="text-xs text-text-muted font-medium uppercase tracking-widest">Global incoming requests across 30 days</p>
                                </div>
                                <div className="px-4 py-2 rounded-lg bg-success/10 border border-success/20 text-success text-xs font-bold flex items-center gap-1.5">
                                    <TrendingUp className="size-3.5" /> +24.5%
                                </div>
                            </div>

                            {/* Mock Bar Chart */}
                            <div className="flex-1 flex items-end justify-between gap-2 sm:gap-4 h-48 mt-4 z-10">
                                {chartBars.map((height, i) => (
                                    <div key={i} className="flex-1 flex flex-col justify-end group h-full">
                                        <div 
                                            className="w-full bg-primary/20 group-hover:bg-primary transition-all rounded-t-lg relative"
                                            style={{ height: `${height}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface border border-border text-[10px] font-bold px-2 py-1 rounded shadow-lg">
                                                {height * 12}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* QUICK ACTIONS & SYSTEM STATUS */}
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col gap-6"
                        >
                            {/* System Status */}
                            <div className="p-8 rounded-3xl bg-gradient-to-br from-surface to-surface-hover border border-border shadow-xl shadow-black/5 flex flex-col gap-6">
                                <h3 className="text-sm font-black text-content uppercase tracking-widest border-b border-border/40 pb-4">
                                    Network Integrity
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="size-14 rounded-2xl bg-success/10 border border-success/20 flex items-center justify-center text-success relative">
                                        <div className="absolute inset-0 bg-success/20 rounded-2xl animate-ping opacity-20" />
                                        <ShieldCheck className="size-6" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold text-content tracking-tight">Fully Operational</span>
                                        <span className="text-xs font-medium text-text-muted mt-1">All subsystems active & encrypted</span>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity Mini-Feed */}
                            <div className="p-6 rounded-3xl bg-surface/50 backdrop-blur-xl border border-border shadow-xl shadow-black/5 flex-1 flex flex-col">
                                <h3 className="text-sm font-black text-content uppercase tracking-widest border-b border-border/40 pb-4 mb-4 flex items-center justify-between">
                                    Recent Syncs
                                    <Users className="size-4 text-text-muted" />
                                </h3>
                                <div className="flex flex-col gap-4">
                                    {dashboardData.recentPending && dashboardData.recentPending.length > 0 ? (
                                        dashboardData.recentPending.map((item) => (
                                            <div key={item._id} className="flex items-start gap-3">
                                                <div className="size-2 rounded-full bg-primary mt-1.5 shrink-0" />
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-sm font-semibold text-content">New submission from {item.companyName || 'Unknown'} candidate</span>
                                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                                                        {new Date(item.createdAt).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <span className="text-sm text-text-muted">No recent syncs.</span>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                    </div>

                </div>
            </div>
        </AdminAppShell>
    );
};

export default AdminDashboardPage;

