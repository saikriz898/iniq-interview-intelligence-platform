import React, { useState, useEffect } from 'react';
import { 
  Plus, List, CheckCircle, Clock, XCircle, 
  Building2, Calendar, FileText, User, 
  ArrowRight, Activity, TrendingUp, Briefcase, Bookmark
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';

/**
 * --- USER DASHBOARD: ENTERPRISE HUB ---
 * Features: Professional analytics overview, recent activity, quick actions.
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
    { label: "Total Submissions", value: dashboardData.total, icon: List, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
    { label: "Approved", value: dashboardData.approved, icon: CheckCircle, color: "text-success", bg: "bg-success/10", border: "border-success/20" },
    { label: "Pending Review", value: dashboardData.pending, icon: Clock, color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
    { label: "Rejected", value: dashboardData.rejected, icon: XCircle, color: "text-danger", bg: "bg-danger/10", border: "border-danger/20" },
  ];

  const recentExperiences = dashboardData.experiences.slice(0, 5);
  const recentSubmissions = recentExperiences.map((exp) => ({
    id: exp._id,
    company: exp.company,
    role: exp.role,
    status: exp.status === 'Pending Review' ? 'Pending' : exp.status,
    date: new Date(exp.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    color: exp.status === 'Approved' ? "text-success" : exp.status === 'Rejected' ? "text-danger" : "text-warning",
    bg: exp.status === 'Approved' ? "bg-success/10" : exp.status === 'Rejected' ? "bg-danger/10" : "bg-warning/10"
  }));

  const hasDraft = dashboardData.experiences.some(exp => exp.status === 'Draft');

  const statDotColor = (status) => {
    switch (status) {
        case 'Approved': return 'bg-success';
        case 'Pending': return 'bg-warning';
        case 'Rejected': return 'bg-danger';
        default: return 'bg-secondary-bg';
    }
  };

  return (
    <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
      <div className="h-full w-full flex flex-col overflow-y-auto bg-background/50">
        
        {/* Page Header Area */}
        <div className="w-full bg-surface border-b border-border/40 px-4 py-6 sm:px-6 sm:py-8 md:px-12 md:py-10">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="size-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <User className="size-8 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl md:text-3xl font-bold text-content tracking-tight">
                            Welcome back, {user?.name?.split(' ')[0] || 'User'}
                        </h1>
                        <p className="text-sm font-medium text-text-muted mt-1">
                            Manage your interview experiences and analytics.
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                            <span className="flex items-center gap-2 text-xs font-semibold text-content/70 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                <Activity className="size-3.5 text-success" /> Active Account
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 shrink-0 w-full md:w-auto mt-4 md:mt-0">
                    <button 
                        onClick={() => navigate('/submit')}
                        className="btn-primary w-full md:w-auto px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-primary/20"
                    >
                        <Plus className="size-4" /> Add Experience
                    </button>
                </div>
            </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-6 md:gap-8 p-4 sm:p-6 md:p-12 pb-20">
            
            {/* Analytics Overview */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-content tracking-tight">Analytics Overview</h2>
                    <span className="text-xs font-medium text-text-muted">Last 30 Days</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-surface border border-border/40 rounded-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-5 hover:border-border transition-all shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div className={`size-8 sm:size-10 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center`}>
                                    <stat.icon className={`size-4 sm:size-5 ${stat.color}`} />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl sm:text-3xl font-bold text-content tracking-tight">{stat.value}</span>
                                <span className="text-[10px] sm:text-sm font-bold sm:font-medium text-text-muted uppercase sm:normal-case tracking-wider sm:tracking-normal mt-1 truncate">{stat.label}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Recent Activity Table (Spans 2 columns) */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-content tracking-tight">Recent Activity</h2>
                        <button onClick={() => navigate('/my-submissions')} className="text-sm font-semibold text-primary hover:text-primary-hover flex items-center gap-1 transition-colors">
                            View All <ArrowRight className="size-4" />
                        </button>
                    </div>
                    
                    <div className="bg-surface border border-border/40 rounded-2xl overflow-hidden shadow-sm">
                        {recentSubmissions.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-background/50 border-b border-border/40">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Company & Role</th>
                                            <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/40">
                                        {recentSubmissions.map((sub, i) => (
                                            <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="px-6 py-4 flex items-center gap-4">
                                                    <div className="size-10 rounded-xl bg-background border border-border/40 flex items-center justify-center">
                                                        <Building2 className="size-4.5 text-text-muted" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-content">{sub.company}</span>
                                                        <span className="text-xs font-medium text-text-muted mt-0.5">{sub.role}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${sub.bg} text-xs font-semibold ${sub.color}`}>
                                                        <div className={`size-1.5 rounded-full ${statDotColor(sub.status)}`} />
                                                        {sub.status}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-medium text-text-secondary">
                                                        {sub.date}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button 
                                                        onClick={() => navigate(`/my-submissions/${sub.id}`)}
                                                        className="px-4 py-2 rounded-lg bg-background border border-border/40 text-xs font-semibold text-text-secondary hover:text-content hover:bg-white/5 transition-all"
                                                    >
                                                        Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-12 flex flex-col items-center justify-center text-center">
                                <div className="size-16 rounded-full bg-background border border-border/40 flex items-center justify-center mb-4">
                                    <FileText className="size-6 text-text-muted opacity-50" />
                                </div>
                                <h3 className="text-base font-bold text-content mb-1">No recent activity</h3>
                                <p className="text-sm text-text-muted mb-6">You haven't submitted any experiences recently.</p>
                                <button onClick={() => navigate('/submit')} className="btn-secondary px-6 py-2.5 rounded-xl text-sm">
                                    Create Submission
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Drafts & Quick Links */}
                <div className="flex flex-col gap-6">
                    {/* Drafts Widget */}
                    <div className="bg-surface border border-border/40 rounded-2xl p-6 flex flex-col shadow-sm relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 size-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
                        <h3 className="text-base font-bold text-content tracking-tight mb-2">Continue Draft</h3>
                        <p className="text-sm font-medium text-text-muted mb-6 leading-relaxed">
                            {hasDraft 
                                ? "You have an unpublished experience. Resume editing to share your insights." 
                                : "Start a new draft anytime. Your progress will be automatically saved."}
                        </p>
                        <button 
                            onClick={() => navigate(hasDraft ? '/drafts/1' : '/submit')}
                            className="w-full py-3 bg-accent text-white rounded-xl text-sm font-semibold shadow-md hover:bg-accent-hover transition-colors flex items-center justify-center gap-2"
                        >
                            {hasDraft ? "Resume Draft" : "Start Draft"}
                            <ArrowRight className="size-4" />
                        </button>
                    </div>

                    {/* Quick Links Widget */}
                    <div className="bg-surface border border-border/40 rounded-2xl p-6 flex flex-col shadow-sm">
                        <h3 className="text-base font-bold text-content tracking-tight mb-4">Quick Links</h3>
                        <div className="flex flex-col gap-2">
                            <button onClick={() => navigate('/experiences')} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors group text-left">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-background border border-border/40 flex items-center justify-center">
                                        <Briefcase className="size-4 text-text-muted group-hover:text-primary transition-colors" />
                                    </div>
                                    <span className="text-sm font-semibold text-content group-hover:text-primary transition-colors">Explore Experiences</span>
                                </div>
                                <ArrowRight className="size-4 text-text-muted opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                            </button>
                            <button onClick={() => navigate('/saved')} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors group text-left">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-background border border-border/40 flex items-center justify-center">
                                        <Bookmark className="size-4 text-text-muted group-hover:text-primary transition-colors" />
                                    </div>
                                    <span className="text-sm font-semibold text-content group-hover:text-primary transition-colors">Saved Items</span>
                                </div>
                                <ArrowRight className="size-4 text-text-muted opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                            </button>
                            <button onClick={() => navigate('/my-submissions')} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors group text-left">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-background border border-border/40 flex items-center justify-center">
                                        <List className="size-4 text-text-muted group-hover:text-primary transition-colors" />
                                    </div>
                                    <span className="text-sm font-semibold text-content group-hover:text-primary transition-colors">My Submissions</span>
                                </div>
                                <ArrowRight className="size-4 text-text-muted opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                            </button>
                        </div>
                    </div>
                    
                    {/* Data Quality Note */}
                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
                        <TrendingUp className="size-5 text-primary shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                            <h4 className="text-sm font-bold text-primary">Contribution Quality</h4>
                            <p className="text-xs font-medium text-primary/70 leading-relaxed mt-1">
                                High-quality submissions with detailed round information are prioritized during the review process.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
      </div>
    </UserAppShell>
  );
};

export default UserDashboardPage;
