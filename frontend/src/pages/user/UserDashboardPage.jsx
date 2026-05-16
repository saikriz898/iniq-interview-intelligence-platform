import React, { useState, useEffect } from 'react';
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

  const [dashboardData, setDashboardData] = useState({
    total: 0, approved: 0, pending: 0, rejected: 0, experiences: []
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('iniq_token');
        const res = await fetch('http://localhost:5000/api/experiences/user-dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDashboard();
  }, []);

  const stats = [
    { label: "Total Submissions", value: String(dashboardData.total).padStart(2, '0'), icon: ListChecks, color: "text-primary", bg: "bg-primary/10" },
    { label: "Approved", value: String(dashboardData.approved).padStart(2, '0'), icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Pending Review", value: String(dashboardData.pending).padStart(2, '0'), icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { label: "Rejected", value: String(dashboardData.rejected).padStart(2, '0'), icon: XCircle, color: "text-red-500", bg: "bg-red-500/10" },
  ];

  const recentExperiences = dashboardData.experiences.slice(0, 5); // display max 5
  // Map our dynamic db field 'status' to standard ones used in UI (Pending, Approved, Rejected)
  const recentSubmissions = recentExperiences.map((exp, idx) => ({
    id: exp._id,
    company: exp.company,
    role: exp.role,
    status: exp.status === 'Pending Review' ? 'Pending' : exp.status,
    date: new Date(exp.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    color: exp.status === 'Approved' ? "text-green-500" : exp.status === 'Rejected' ? "text-red-500" : "text-yellow-500",
    bg: exp.status === 'Approved' ? "bg-green-500/10" : exp.status === 'Rejected' ? "bg-red-500/10" : "bg-yellow-500/10"
  }));

  const hasDraft = dashboardData.experiences.some(exp => exp.status === 'Draft');

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
            className="flex flex-col gap-2"
        >
            <div className="flex items-center gap-3 mb-1">
                <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary font-['Space_Grotesk']">Mission Control</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-content font-['Space_Grotesk'] tracking-tight leading-none uppercase">
                Systems Online, {user?.name?.split(' ')[0] || 'Sai'}
            </h1>
            <p className="text-xs font-medium text-text-muted uppercase tracking-[0.2em] mt-2 opacity-60">
                Synchronizing interview contributions • Awaiting tactical updates
            </p>
        </motion.div>

        {/* 2. STATS CARDS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="card-base p-8 flex flex-col gap-4 glow-border"
                >
                    <div className={`size-12 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                        <stat.icon className={`size-6 ${stat.color}`} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-content font-['Space_Grotesk'] tracking-tight">{stat.value}</span>
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">{stat.label}</span>
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
                <h2 className="text-xs font-bold uppercase tracking-widest text-content flex items-center gap-2 font-['Space_Grotesk']">
                    <Clock className="size-4 text-primary" />
                    TACTICAL OVERVIEW
                </h2>
                <Link to="/my-submissions" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors font-['Space_Grotesk']">Full Archive</Link>
            </div>
            
            <div className="card-base overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-surface-hover/80 border-b border-border">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary">Company & Role</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary text-center">Timestamp</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary text-right">Action Hub</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {recentSubmissions.map((sub, i) => (
                                <tr key={i} className="hover:bg-surface-hover/50 transition-colors group">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <div className="size-10 rounded-xl bg-surface border border-border flex items-center justify-center transition-all group-hover:border-primary/40 group-hover:shadow-sm">
                                            <Building2 className="size-4.5 text-text-muted group-hover:text-primary transition-colors" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-content leading-none font-['Space_Grotesk']">{sub.company}</span>
                                            <span className="text-[10px] font-medium text-text-secondary mt-1.5 uppercase tracking-widest opacity-60">{sub.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${sub.bg} text-[9px] font-bold uppercase tracking-widest ${sub.color} border border-transparent`}>
                                            <div className={`size-1.5 rounded-full ${statDotColor(sub.status)} shadow-[0_0_8px_currentColor]`} />
                                            {sub.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-[11px] font-medium text-text-secondary flex items-center justify-center gap-2">
                                            <Calendar className="size-3.5 opacity-40" />
                                            {sub.date}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => navigate(`/my-submissions/${sub.id}`)}
                                            className="px-5 py-2.5 rounded-xl bg-surface border border-border text-[10px] font-bold uppercase tracking-widest text-text-secondary hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all shadow-sm"
                                        >
                                            View Logs
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
               className="card-base p-10 flex flex-col items-start gap-6 glow-border relative overflow-hidden"
            >
                <div className="size-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <FileText className="size-7 text-accent" />
                </div>
                <div className="flex flex-col gap-2 relative z-10">
                    <h2 className="text-2xl font-bold text-content tracking-tight uppercase font-['Space_Grotesk']">
                        {hasDraft ? "Resume Integration" : "Begin Integration"}
                    </h2>
                    <p className="text-xs font-medium text-text-secondary leading-relaxed opacity-60">
                        {hasDraft 
                            ? "Unfinished journey log detected. Synchronize now to finalize the tactical assessment." 
                            : "Initialize a new interview experience submission to enrich the community intelligence hub."}
                    </p>
                </div>
                <button 
                    onClick={() => navigate(hasDraft ? '/drafts/1' : '/submit')}
                    className="flex items-center gap-3 btn-primary text-xs tracking-widest uppercase"
                >
                    {hasDraft ? "Continue protocol" : "Initialize journey"}
                    <ArrowRight className="size-4" />
                </button>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-5"
            >
                <h2 className="text-xs font-bold uppercase tracking-widest text-content flex items-center gap-2 font-['Space_Grotesk'] px-2">
                    <Lightbulb className="size-4 text-primary" />
                    TACTICAL ACTIONS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button onClick={() => navigate('/submit')} className="p-8 bg-surface border border-border rounded-2xl flex flex-col items-start gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all group relative overflow-hidden shadow-sm glow-border">
                        <PlusCircle className="size-6 text-primary" />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-content group-hover:text-primary transition-colors font-['Space_Grotesk']">New Entry</span>
                        <ArrowUpRight className="absolute top-8 right-8 size-4 text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
                    </button>
                    <button onClick={() => navigate('/my-submissions')} className="p-8 bg-surface border border-border rounded-2xl flex flex-col items-start gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all group relative overflow-hidden shadow-sm glow-border">
                        <ListChecks className="size-6 text-accent" />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-content group-hover:text-accent transition-colors font-['Space_Grotesk']">Archive</span>
                        <ArrowUpRight className="absolute top-8 right-8 size-4 text-accent opacity-0 group-hover:opacity-100 transition-all translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
                    </button>
                </div>
            </motion.div>
        </div>

        {/* 5. GUIDELINES */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-base p-10 flex flex-col md:flex-row items-center gap-10 hover:border-primary/20 glow-border mb-12"
        >
            <div className="size-20 rounded-3xl bg-primary/5 border border-primary/20 flex items-center justify-center shrink-0 shadow-inner">
                <Info className="size-10 text-primary" />
            </div>
            <div className="flex flex-col gap-3 flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-content uppercase tracking-widest font-['Space_Grotesk']">Submission Protocol</h3>
                <p className="text-xs font-medium text-text-secondary leading-relaxed max-w-[800px] opacity-60">
                    To ensure rapid synchronization, please provide high-fidelity context: core company preparation, tactical role specifics, 
                    detailed round synopses, and actionable legacy advice for future candidates.
                </p>
            </div>
            <button 
                onClick={() => navigate('/faq')} 
                className="btn-secondary text-[11px] tracking-widest uppercase"
            >
                Protocol FAQ
            </button>
        </motion.div>

        </div>
      </div>
    </UserAppShell>
  );
};

export default UserDashboardPage;
