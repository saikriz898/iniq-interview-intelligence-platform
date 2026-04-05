import React from 'react';
import { 
  PlusCircle, ListChecks, CheckCircle2, Clock, XCircle, 
  ArrowUpRight, Building2, Calendar, FileText, UserCircle, 
  Lightbulb, Info, ArrowRight, User, ShieldCheck, Activity,
  Terminal, ShieldAlert, Cpu, Zap, Search, Eye, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';

/**
 * --- ADMIN DASHBOARD: CENTRAL COMMAND HUB ---
 * Refined Design: Professional, formal, and structured administrative hub 
 * for monitoring platform telemetry and moderation throughput.
 */
const AdminDashboardPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();

    const stats = [
        { label: "Platform Submissions", value: "1,248", sub: "+12.5%", icon: ListChecks, color: "text-primary", bg: "bg-primary/10" },
        { label: "Pending Reviews", value: "24", sub: "Critical", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
        { label: "Approved Protocols", value: "982", sub: "92% Integrity", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { label: "Policy Breaches", value: "42", sub: "Removed", icon: XCircle, color: "text-rose-500", bg: "bg-rose-500/10" },
    ];

    const reviewQueue = [
        { id: 'IQ-1042', company: 'Google', role: 'SDE-I', user: 'saikriz898', time: '12m ago' },
        { id: 'IQ-1041', company: 'Amazon', role: 'Frontend Architect', user: 'akash_v', time: '45m ago' },
        { id: 'IQ-1040', company: 'Microsoft', role: 'SDE-III', user: 'neha_patel', time: '1h ago' },
    ];

    const systemActivity = [
        { type: 'Sync', msg: 'Company database synchronized with platform nodes.', time: '2m ago', icon: Activity },
        { type: 'Alert', msg: 'System alert: 12 new submissions detected.', time: '15m ago', icon: Zap },
        { type: 'Security', msg: 'Security audit complete: No vulnerabilities detected.', time: '1h ago', icon: ShieldCheck },
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* 3. MODERATION QUEUE (Double Col) */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            <div className="flex items-center justify-between px-2">
                                <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-content italic flex items-center gap-3">
                                    <Terminal className="size-4.5 text-primary" />
                                    Active Synchronization Queue
                                </h2>
                                <Link to="/admin/pending" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/70 transition-colors italic">View All Nodes</Link>
                            </div>

                            <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm">
                                <div className="overflow-x-auto custom-scrollbar-horizontal">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-background border-b border-border">
                                            <tr>
                                                <th className="px-8 py-4 text-[9px] font-bold uppercase tracking-widest text-text-muted opacity-40">ID</th>
                                                <th className="px-8 py-4 text-[9px] font-bold uppercase tracking-widest text-text-muted opacity-40">Target Entity</th>
                                                <th className="px-8 py-4 text-[9px] font-bold uppercase tracking-widest text-text-muted opacity-40">Contributor</th>
                                                <th className="px-8 py-4 text-[9px] font-bold uppercase tracking-widest text-text-muted opacity-40 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/20">
                                            {reviewQueue.map((item, i) => (
                                                <tr key={i} className="group hover:bg-surface-hover/30 transition-colors">
                                                    <td className="px-8 py-5">
                                                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{item.id}</span>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="size-9 rounded-lg bg-background border border-border flex items-center justify-center grayscale group-hover:grayscale-0 transition-all shadow-inner">
                                                                <Building2 className="size-4 text-text-muted group-hover:text-primary" />
                                                            </div>
                                                            <div className="flex flex-col leading-none">
                                                                <span className="text-[14px] font-black text-content uppercase tracking-tight italic font-['Inter']">{item.company}</span>
                                                                <span className="text-[9px] font-bold text-text-muted opacity-40 uppercase tracking-widest mt-1.5">{item.role}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="size-4.5 rounded-full bg-primary/20" />
                                                            <span className="text-[11px] font-bold text-text-muted lowercase italic">@{item.user}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button 
                                                                onClick={() => navigate(`/admin/pending/${item.id}`)}
                                                                className="size-9 rounded-lg bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all shadow-sm active:scale-90"
                                                            >
                                                                <Eye className="size-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* 4. SYSTEM ACTIVITY (Single Col) */}
                        <div className="flex flex-col gap-6">
                            <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-content italic flex items-center gap-3 px-2">
                                <Activity className="size-4.5 text-primary" />
                                System Activity
                            </h2>
                            <div className="flex flex-col gap-3">
                                {systemActivity.map((log, i) => (
                                    <div key={i} className="p-5 rounded-2xl bg-surface border border-border flex flex-col gap-3 hover:border-primary/20 transition-all group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="size-1.5 rounded-full bg-primary group-hover:animate-pulse" />
                                                <span className="text-[9px] font-black text-primary uppercase tracking-widest">{log.type} // NODE_SYNC</span>
                                            </div>
                                            <span className="text-[8px] font-bold text-text-muted opacity-30 uppercase tracking-widest">{log.time}</span>
                                        </div>
                                        <p className="text-[11px] font-medium text-text-muted leading-relaxed tracking-wide uppercase italic opacity-80">
                                            {log.msg}
                                        </p>
                                    </div>
                                ))}
                                
                                <button className="w-full mt-2 p-5 rounded-2xl border border-dashed border-border flex flex-col items-center gap-3 group hover:border-primary/40 transition-all">
                                    <ShieldCheck className="size-5 text-text-muted opacity-30 group-hover:text-primary transition-all" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted opacity-40 group-hover:text-primary transition-all">Execute System Audit</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 5. QUICK ACTIONS HUB */}
                    <div className="p-10 rounded-3xl bg-surface border border-border border-dashed flex flex-col md:flex-row items-center gap-10">
                        <div className="flex items-center gap-6 flex-1 text-center md:text-left">
                            <div className="size-14 rounded-2xl bg-background border border-border flex items-center justify-center text-primary shadow-inner">
                                <Zap className="size-7" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h4 className="text-xl font-black text-content italic uppercase tracking-tight font-['Inter']">Institutional Data Sync</h4>
                                <p className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-widest">Rapidly update company entities and role hierarchies across the platform.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => navigate('/admin/companies')} className="h-12 px-6 rounded-xl bg-background border border-border text-[10px] font-black uppercase tracking-widest text-text-muted hover:border-primary hover:text-primary transition-all active:scale-95">Update Companies</button>
                            <button onClick={() => navigate('/admin/roles')} className="h-12 px-6 rounded-xl bg-background border border-border text-[10px] font-black uppercase tracking-widest text-text-muted hover:border-primary hover:text-primary transition-all active:scale-95">Map Hierarchies</button>
                        </div>
                    </div>

                </div>
            </div>
        </AdminAppShell>
    );
};

export default AdminDashboardPage;
