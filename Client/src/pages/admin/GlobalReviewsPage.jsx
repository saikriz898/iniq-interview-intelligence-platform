import React, { useState, useEffect } from 'react';
import { 
  Building2, Clock, ShieldCheck, Search, ThumbsUp, ThumbsDown, 
  MoreVertical, Filter, Briefcase, MapPin, ArrowRight, User as UserIcon,
  CheckCircle2, XCircle, Send, X, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';
import toast from 'react-hot-toast';

/**
 * --- GLOBAL REGISTRY: MODERATION HUB ---
 * Features: High-density, elegant data table for professional registry feel.
 */
const GlobalReviewsPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [allSubmissions, setAllSubmissions] = useState([]);
    
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, id: null });
    const [commentary, setCommentary] = useState('');

    const fetchSubmissions = async () => {
        try {
            const token = localStorage.getItem('iniq_token');
            const res = await fetch('http://localhost:5000/api/experiences/admin-submissions', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (Array.isArray(data)) {
                const all = data.map(exp => ({
                    id: exp._id,
                    company: exp.companyName || exp.company || 'Unknown',
                    role: exp.role || 'Unknown',
                    user: exp.user?.name || 'Unknown',
                    userId: exp.user?._id || 'UID-001',
                    content: exp.processOverview,
                    status: exp.status || 'Pending Review',
                    submittedDate: new Date(exp.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                }));
                setAllSubmissions(all);
            }
        } catch (error) {
            console.error('Failed to fetch admin submissions', error);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const handleAction = async () => {
        if (!modalConfig.id || !modalConfig.type) return;

        try {
            const token = localStorage.getItem('iniq_token');
            const res = await fetch(`http://localhost:5000/api/experiences/update-status/${modalConfig.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    status: modalConfig.type,
                    feedback: commentary 
                })
            });

            if (res.ok) {
                toast.success(`Successfully ${modalConfig.type.toLowerCase()} experience`);
                fetchSubmissions();
                setModalConfig({ isOpen: false, type: null, id: null });
            } else {
                toast.error(`Failed to ${modalConfig.type.toLowerCase()}`);
            }
        } catch (err) {
            console.error(err);
            toast.error('Server error');
        }
    }

    const openModal = (type, id) => {
        setCommentary('');
        setModalConfig({ isOpen: true, type, id });
    };

    const filteredSubmissions = allSubmissions.filter(s => 
        (s.company || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
        (s.id || '').toLowerCase().includes((searchQuery || '').toLowerCase())
    );

    const getStatusStyle = (status) => {
        switch(status) {
            case 'Approved': return 'text-success bg-success/10 border-success/20';
            case 'Rejected': return 'text-danger bg-danger/10 border-danger/20';
            default: return 'text-warning bg-warning/10 border-warning/20';
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'Approved': return <CheckCircle2 className="size-3.5" />;
            case 'Rejected': return <XCircle className="size-3.5" />;
            default: return <Clock className="size-3.5" />;
        }
    };

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col p-6 lg:p-12 overflow-y-auto custom-scrollbar bg-background relative">
                
                {/* Background Glow */}
                <div className="absolute top-1/4 right-0 w-[40vw] h-[40vh] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="max-w-[1500px] mx-auto w-full flex flex-col gap-8 pt-2 pb-16 relative z-10">
                    
                    {/* 1. REGISTRY HEADER */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border/60 pb-8">
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="size-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Global Registry</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-content tracking-tight font-['Space_Grotesk'] leading-none">Submissions Registry</h1>
                            <p className="text-sm font-medium text-text-muted mt-1 max-w-xl">Review, moderate, and catalog interview experiences from the global community.</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                            <div className="relative group w-full sm:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted  group-focus-within:text-primary transition-all" />
                                <input 
                                    type="text" 
                                    placeholder="Search registry by company..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full py-3.5 pl-12 pr-5 rounded-xl bg-surface/50 border border-border focus:border-primary/40 outline-none text-sm font-bold text-content transition-all shadow-sm backdrop-blur-md placeholder:text-text-muted/50"
                                />
                            </div>
                            <button className="h-[50px] px-6 rounded-xl bg-surface/50 border border-border flex items-center gap-2.5 text-sm font-bold text-text-muted hover:text-content hover:border-border/80 transition-all shadow-sm active:scale-95 group backdrop-blur-md">
                                <Filter className="size-4 group-hover:text-primary transition-colors" />
                                Filters
                            </button>
                        </div>
                    </div>

                    {/* 2. ELEGANT CARD GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {filteredSubmissions.length > 0 ? filteredSubmissions.map((item, i) => (
                                <motion.div 
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="p-6 rounded-3xl bg-surface/80 backdrop-blur-md border border-border flex flex-col gap-5 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all group relative overflow-hidden"
                                >
                                    {/* Status Indicator Bar */}
                                    <div className={`absolute top-0 left-0 w-full h-1 ${item.status === 'Approved' ? 'bg-success' : item.status === 'Rejected' ? 'bg-danger' : 'bg-warning'}`} />

                                    {/* Header: Company & Role */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-12 rounded-2xl bg-background border border-border flex items-center justify-center text-text-muted group-hover:text-primary transition-colors shadow-inner shrink-0">
                                                <Building2 className="size-6" />
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <h3 className="text-base font-black text-content tracking-tight leading-none group-hover:text-primary transition-colors line-clamp-1">{item.role}</h3>
                                                <span className="text-xs font-bold text-text-muted">{item.company}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info Badges */}
                                    <div className="flex flex-wrap items-center gap-2">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(item.status)}`}>
                                            {getStatusIcon(item.status)}
                                            {item.status}
                                        </div>
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border text-[10px] font-bold text-text-muted uppercase tracking-widest">
                                            <UserIcon className="size-3" />
                                            {item.user}
                                        </div>
                                    </div>

                                    {/* Excerpt */}
                                    <p className="text-sm font-medium text-text-muted line-clamp-2 leading-relaxed">
                                        {item.content || 'No process overview provided...'}
                                    </p>

                                    {/* Footer & Actions */}
                                    <div className="mt-auto pt-4 border-t border-border/60 flex items-center justify-between">
                                        <span className="text-xs font-bold text-text-muted">{item.submittedDate}</span>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => navigate(`/admin/reviews/${item.id}`)}
                                                className="size-9 rounded-xl bg-background border border-border flex items-center justify-center text-text-muted hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                                                title="View Details"
                                            >
                                                <ExternalLink className="size-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )) : (
                                <div className="col-span-full p-12 text-center rounded-[2rem] border border-border bg-surface/50 backdrop-blur-md">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <Search className="size-8 text-text-muted/50 mb-2" />
                                        <h3 className="text-lg font-bold text-content">No registry entries found</h3>
                                        <p className="text-sm text-text-muted">Try adjusting your search criteria.</p>
                                    </div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>

            {/* CONFIRMATION & FEEDBACK MODAL */}
            <AnimatePresence>
                {modalConfig.isOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setModalConfig({ isOpen: false, type: null, id: null })}
                            className="fixed inset-0 z-[200] bg-background/80 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-surface border border-border rounded-3xl shadow-2xl z-[210] overflow-hidden flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-border flex items-center justify-between bg-background/50">
                                <div className="flex items-center gap-4">
                                    <div className={`size-12 rounded-2xl flex items-center justify-center shadow-inner ${
                                        modalConfig.type === 'Approved' ? 'bg-success/10 text-success border border-success/20' : 'bg-danger/10 text-danger border border-danger/20'
                                    }`}>
                                        {modalConfig.type === 'Approved' ? <CheckCircle2 className="size-6" /> : <XCircle className="size-6" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-xl font-black text-content tracking-tight">Confirm {modalConfig.type}</h2>
                                        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Provide moderation feedback</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setModalConfig({ isOpen: false, type: null, id: null })}
                                    className="size-8 rounded-lg flex items-center justify-center text-text-muted hover:bg-surface-hover border border-transparent hover:border-border transition-all"
                                >
                                    <X className="size-4" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 flex flex-col gap-4">
                                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.15em] ml-1">Admin Context (Optional)</label>
                                <textarea
                                    placeholder={modalConfig.type === 'Approved' ? "e.g. 'Verified by internal team. Excellent detail.'" : "e.g. 'Insufficient round details. Please update.'"}
                                    value={commentary}
                                    onChange={(e) => setCommentary(e.target.value)}
                                    className="w-full h-32 p-4 rounded-xl bg-background border border-border focus:border-primary text-sm font-semibold text-content outline-none resize-none transition-all shadow-sm placeholder:text-text-muted/50"
                                />
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-border flex items-center justify-end gap-3 bg-background/50">
                                <button 
                                    onClick={() => setModalConfig({ isOpen: false, type: null, id: null })}
                                    className="px-6 py-3 rounded-xl text-xs font-bold text-text-muted hover:bg-surface border border-transparent hover:border-border transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleAction}
                                    className={`px-6 py-3 rounded-xl text-xs font-bold text-white flex items-center gap-2 transition-all active:scale-95 shadow-lg ${
                                        modalConfig.type === 'Approved' ? 'bg-success hover:bg-success-hover shadow-success/20' : 'bg-danger hover:bg-danger-hover shadow-danger/20'
                                    }`}
                                >
                                    <Send className="size-4" />
                                    Execute {modalConfig.type}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </AdminAppShell>
    );
};

export default GlobalReviewsPage;
