import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Clock, XCircle, 
  ShieldCheck, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';
import toast from 'react-hot-toast';

/**
 * --- ADMIN DASHBOARD: CENTRAL COMMAND HUB ---
 * Refined Design: Professional, formal, and structured administrative hub 
 * for monitoring platform telemetry and moderation throughput.
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
            const res = await fetch('http://localhost:5000/api/experiences/admin-dashboard', {
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
        { label: "Pending Reviews", value: dashboardData.pending.toLocaleString(), sub: dashboardData.pending > 10 ? "High Load" : "Stable", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
        { label: "Approved Protocols", value: dashboardData.approved.toLocaleString(), sub: "Verified", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { label: "Policy Breaches", value: dashboardData.rejected.toLocaleString(), sub: "Decommissioned", icon: XCircle, color: "text-rose-500", bg: "bg-rose-500/10" },
    ];

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col p-8 lg:p-12 overflow-y-auto custom-scrollbar bg-background">
                <div className="max-w-[1500px] mx-auto w-full flex flex-col gap-10 pt-4 pb-20">
                    
                    {/* 1. ADMINISTRATION HEADER */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-10">
                        <div className="flex flex-col gap-2">
                             <div className="flex items-center gap-3">
                                <span className="px-2.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[9px] font-bold uppercase tracking-wider text-blue-500 italic">Command Center v4.2</span>
                             </div>
                             <h1 className="text-3xl font-black text-content uppercase tracking-tight leading-none font-['Inter']">Administrative Dashboard</h1>
                             <p className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-[0.2em] mt-3">Monitoring intelligence datastreams, moderation throughput, and system integrity.</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <button onClick={() => navigate('/admin/pending')} className="h-[52px] px-8 rounded-xl bg-primary text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-3">
                                <ShieldCheck className="size-4.5" />
                                Moderation Hub
                                <ArrowRight className="size-4" />
                            </button>
                        </div>
                    </div>

                    {/* 2. OPERATIONAL TELEMETRY GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="p-8 rounded-2xl bg-surface border border-border flex flex-col gap-6 shadow-sm hover:border-primary/20 transition-all group"
                            >
                                <div className="flex items-center justify-between">
                                    <div className={`size-12 rounded-xl ${stat.bg} flex items-center justify-center border border-transparent group-hover:border-current/10 transition-all`}>
                                        <stat.icon className={`size-5 ${stat.color}`} />
                                    </div>
                                    <span className={`text-[9px] font-black uppercase tracking-widest italic leading-none ${stat.color}`}>{stat.sub}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-40">
                                        {stat.label}
                                    </span>
                                    <h3 className="text-3xl font-black text-content tabular-nums tracking-tighter uppercase font-['Inter']">
                                        {stat.value}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </AdminAppShell>
    );
};

export default AdminDashboardPage;
