import React from 'react';
import { 
  PlusCircle, ListChecks, CheckCircle2, Clock, XCircle, 
  ArrowUpRight, Building2, Calendar, FileText, UserCircle, 
  Lightbulb, Info, ArrowRight, User
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';

/**
 * --- USER DASHBOARD: FULL PORTAL HUB ---
 * Features: Compact stats, recent table, draft continuation, quick actions, and guidelines.
 */
const UserDashboardPage = () => {
  const { theme, toggleTheme, isLoading, user } = useGlobalContext();
  const navigate = useNavigate();

  // Mock Data for Demo
  const stats = [
    { label: "Total Submissions", value: "12", icon: ListChecks, color: "text-primary", bg: "bg-primary/10" },
    { label: "Approved", value: "05", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Pending Review", value: "04", icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { label: "Rejected", value: "03", icon: XCircle, color: "text-red-500", bg: "bg-red-500/10" },
  ];

  const recentSubmissions = [
    { id: 1, company: "Google", role: "SDE Intern", status: "Pending", date: "Mar 28, 2026", color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { id: 2, company: "Amazon", role: "Frontend Developer", status: "Approved", date: "Mar 20, 2026", color: "text-green-500", bg: "bg-green-500/10" },
    { id: 3, company: "Zoho", role: "Backend Intern", status: "Rejected", date: "Mar 14, 2026", color: "text-red-500", bg: "bg-red-500/10" },
  ];

  const hasDraft = true;

  // Helper for status dot colors
  const statDotColor = (status) => {
    switch (status) {
        case 'Approved': return 'bg-green-500';
        case 'Pending': return 'bg-yellow-500';
        case 'Rejected': return 'bg-red-500';
        default: return 'bg-gray-400';
    }
  };

  return (
    <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
      <div className="h-full w-full flex flex-col p-10 lg:p-12 overflow-y-auto no-scrollbar bg-surface/[0.02]">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-10 pt-6">
        
        {/* 1. WELCOME SECTION (Hero) */}
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-1.5"
        >
            <div className="flex items-center gap-3 mb-1">
                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-widest text-primary">Dashboard</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-content font-['Sora'] tracking-tight leading-none uppercase italic">
                Welcome back, {user?.name?.split(' ')[0] || 'Sai'}
            </h1>
            <p className="text-sm font-medium text-text-muted opacity-70 uppercase tracking-widest text-[10px] font-black mt-2">
                Manage your interview contributions and track your status in one place.
            </p>
        </motion.div>

        {/* 2. STATS CARDS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, i) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl bg-surface border border-border/60 shadow-sm flex flex-col gap-4 group hover:border-primary/40 transition-all"
                >
                    <div className={`size-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                        <stat.icon className={`size-5 ${stat.color}`} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60">
                            {stat.label}
                        </span>
                        <h3 className="text-2xl font-black text-content tabular-nums">
                            {stat.value}
                        </h3>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* 3. RECENT SUBMISSIONS TABLE */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-5"
        >
            <div className="flex items-center justify-between px-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-content flex items-center gap-2 italic">
                    <Clock className="size-4 text-primary" />
                    Recent Submissions
                </h2>
                <Link to="/my-submissions" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">See All Activity</Link>
            </div>
            
            <div className="w-full bg-surface border border-border/60 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-surface-hover/80 border-b border-border/40">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60">Company & Role</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60 text-center">Submitted Date</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60 text-right">Action Hub</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                            {recentSubmissions.map((sub, i) => (
                                <tr key={i} className="hover:bg-surface-hover/40 transition-colors group">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <div className="size-9 rounded-lg bg-surface-hover border border-border/40 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:border-primary/20">
                                            <Building2 className="size-4 text-text-muted group-hover:text-primary transition-colors" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-content italic leading-none">{sub.company}</span>
                                            <span className="text-[10px] font-bold text-text-muted mt-1 uppercase tracking-widest opacity-60">{sub.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${sub.bg} text-[9px] font-black uppercase tracking-widest ${sub.color}`}>
                                            <div className={`size-1.5 rounded-full ${statDotColor(sub.status)}`} />
                                            {sub.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[11px] font-bold text-text-muted/70 flex items-center justify-center gap-2">
                                            <Calendar className="size-3" />
                                            {sub.date}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => navigate(`/my-submissions/${sub.id}`)}
                                            className="px-5 py-2.5 rounded-xl bg-surface-hover border border-border group-hover:bg-primary text-[9px] font-black uppercase tracking-widest text-text-muted group-hover:text-white transition-all shadow-sm active:scale-95"
                                        >
                                            View Protocol
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>

        {/* 4. DRAFT & QUICK ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               className="p-8 rounded-[2.25rem] bg-surface border border-border/60 shadow-sm relative overflow-hidden group"
            >
                <div className="relative z-10 flex flex-col items-start gap-4 h-full">
                    <div className="size-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FileText className="size-6 text-accent" />
                    </div>
                    <div className="flex flex-col gap-1 mt-2">
                        <h2 className="text-xl font-black text-content tracking-tight italic uppercase italic">
                            {hasDraft ? "Continue Journey Log" : "No drafts available"}
                        </h2>
                        <p className="text-[11px] font-bold text-text-muted leading-relaxed opacity-60 uppercase tracking-widest mt-1">
                            {hasDraft 
                                ? "Unfinished protocol for Microsoft (SDE-II). Synchronize now." 
                                : "Start a new interview experience submission to help others in the community."}
                        </p>
                    </div>
                    <button 
                        onClick={() => navigate(hasDraft ? '/drafts/1' : '/submit')}
                        className={`mt-4 flex items-center gap-2 px-8 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                            hasDraft ? 'bg-accent text-white shadow-xl shadow-accent/20 hover:-translate-y-0.5 active:scale-95' : 'bg-surface-hover text-text-muted border border-border hover:text-primary hover:border-primary/40'
                        }`}
                    >
                        {hasDraft ? "Continue Protocol" : "Initialize Journey"}
                        <ArrowRight className="size-4" />
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-5 px-2"
            >
                <h2 className="text-sm font-black uppercase tracking-widest text-content flex items-center gap-2 italic">
                    <Lightbulb className="size-4 text-primary" />
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button onClick={() => navigate('/submit')} className="p-6 bg-primary/5 border border-primary/20 rounded-[2rem] flex flex-col items-start gap-4 hover:bg-primary/10 transition-all group overflow-hidden relative active:scale-95 shadow-sm">
                        <PlusCircle className="size-6 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary leading-none">Submit Journey</span>
                        <ArrowUpRight className="absolute top-6 right-6 size-4 text-primary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                    <button onClick={() => navigate('/my-submissions')} className="p-6 bg-surface-hover/40 border border-border/60 rounded-[2rem] flex flex-col items-start gap-4 hover:border-primary/40 transition-all group overflow-hidden relative active:scale-95 shadow-sm">
                        <ListChecks className="size-6 text-text-muted group-hover:text-primary transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-content group-hover:text-primary transition-colors leading-none">Journal Modules</span>
                        <ArrowUpRight className="absolute top-6 right-6 size-4 text-text-muted opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
                    </button>
                </div>
            </motion.div>
        </div>

        {/* 5. GUIDELINES */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full p-8 rounded-[2.5rem] bg-surface-hover/50 border border-border/60 flex flex-col md:flex-row items-center gap-8 shadow-sm group hover:border-primary/20 transition-all mb-12"
        >
            <div className="size-16 rounded-[2rem] bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                <Info className="size-8 text-primary" />
            </div>
            <div className="flex flex-col gap-1.5 flex-1 text-center md:text-left">
                <h3 className="text-md font-black text-content uppercase tracking-widest italic leading-none">Submission Protocol Guidelines</h3>
                <p className="text-[11px] font-bold text-text-muted opacity-60 leading-relaxed max-w-[800px] uppercase tracking-wider">
                    To ensure your journey log is approved instantly, provide high-fidelity company context, role specifics, 
                    comprehensive process synopsis, DSA arsenal, and actionable legacy advice.
                </p>
            </div>
            <button onClick={() => navigate('/faq')} className="md:ml-auto px-8 py-3 rounded-xl bg-surface border border-border text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary shadow-sm active:scale-95 transition-all">
                Read Process FAQ
            </button>
        </motion.div>

        </div>
      </div>
    </UserAppShell>
  );
};

export default UserDashboardPage;
