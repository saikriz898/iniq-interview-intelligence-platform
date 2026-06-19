import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, ListChecks, CheckCircle2, Clock, XCircle, 
  ArrowUpRight, Building2, Calendar, FileText, UserCircle, 
  Filter, ArrowRight, User, ShieldCheck, Activity,
  Terminal, ShieldAlert, Cpu, Zap, Search, Eye, ThumbsUp, ThumbsDown,
  MoreVertical, Trash2, X, Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';
import toast from 'react-hot-toast';

/**
 * --- MANAGE EXPERIENCES: MODERATION HUB ---
 * Refined Design: Professional, formal, and authoritative.
 */
const ManageExperiencesPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [experiences, setExperiences] = useState([]);

    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, id: null });
    const [commentary, setCommentary] = useState('');

    const tabs = ['All', 'Pending Review', 'Approved', 'Rejected'];

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch('http://localhost:5000/api/experiences/admin-submissions', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setExperiences(data);
            } else {
                toast.error('Failed to sync database nodes');
            }
        } catch (err) {
            toast.error('Server connection failed');
        }
    };

    const handleUpdateStatus = async () => {
        if (!modalConfig.id || !modalConfig.type) return;
        
        const token = localStorage.getItem('iniq_token');
        try {
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
                toast.success(`Experience marked as ${modalConfig.type}`);
                fetchExperiences();
                setModalConfig({ isOpen: false, type: null, id: null });
            } else {
                toast.error('Update failed');
            }
        } catch (err) {
            toast.error('Server error');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to permanently delete this experience?')) return;
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch(`http://localhost:5000/api/experiences/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('Experience deleted successfully');
                fetchExperiences();
            }
        } catch (err) {
            toast.error('Purge operation failed');
        }
    };

    const filteredExperiences = experiences.filter(exp => {
        const matchesTab = activeTab === 'All' || exp.status === activeTab;
        const matchesSearch = exp.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             exp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             (exp.user?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const openModal = (type, id) => {
        setCommentary('');
        setModalConfig({ isOpen: true, type, id });
    };

    const statDotColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-success';
            case 'Pending Review': return 'bg-warning';
            case 'Rejected': return 'bg-danger';
            default: return 'bg-secondary-bg';
        }
    };

    const statusStyle = (status) => {
        switch (status) {
            case 'Approved': return 'text-success bg-success/10';
            case 'Pending Review': return 'text-warning bg-warning/10';
            case 'Rejected': return 'text-danger bg-danger/10';
            default: return 'text-text-muted bg-surface-hover';
        }
    };

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col p-8 lg:p-12 overflow-hidden bg-background">
                <div className="max-w-[1500px] mx-auto w-full h-full flex flex-col gap-8">
                    
                    {/* 1. ADMINISTRATION HEADER */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0 pt-2 border-b border-border pb-10">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl font-black text-content tracking-tight leading-none font-['Inter']">Experiences</h1>
                            <p className="text-sm font-medium text-text-muted mt-2">Manage all submitted interview experiences.</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                             <div className="relative group w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted  group-focus-within:text-primary transition-all" />
                                <input 
                                    type="text" 
                                    placeholder="Search by Company, Role, or User..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full py-3.5 pl-12 pr-6 rounded-xl bg-surface border border-border text-sm font-medium focus:border-primary/40 outline-none transition-all shadow-sm"
                                />
                             </div>
                        </div>
                    </div>

                    {/* 2. NAVIGATION & TABS */}
                    <div className="flex items-center border-b border-border shrink-0">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-4 text-sm font-semibold transition-all relative ${
                                    activeTab === tab 
                                        ? 'text-primary' 
                                        : 'text-text-muted hover:text-content'
                                }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div layoutId="adminExpTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full shadow-lg shadow-primary/20" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* 3. EXPERIENCE DATABASE TABLE */}
                    <div className="flex-1 bg-surface border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col mb-4">
                        <div className="flex-1 overflow-y-auto custom-scrollbar relative min-h-0">
                            <table className="w-full text-left border-collapse">
                                <thead className="sticky top-0 z-10 bg-surface border-b border-border">
                                    <tr>
                                        <th className="px-8 py-5 text-xs font-semibold text-text-muted">ID</th>
                                        <th className="px-8 py-5 text-xs font-semibold text-text-muted">Company & Role</th>
                                        <th className="px-8 py-5 text-xs font-semibold text-text-muted">User</th>
                                        <th className="px-8 py-5 text-xs font-semibold text-text-muted">Status</th>
                                        <th className="px-8 py-5 text-xs font-semibold text-text-muted text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/20">
                                    <AnimatePresence mode="popLayout">
                                        {filteredExperiences.map((exp, i) => (
                                            <motion.tr 
                                                key={exp._id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, scale: 0.98 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="group hover:bg-surface-hover/30 transition-colors"
                                            >
                                                <td className="px-8 py-5">
                                                    <span className="text-xs font-semibold text-primary">{exp._id.slice(-6).toUpperCase()}</span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="size-10 rounded-xl bg-background border border-border flex items-center justify-center grayscale group-hover:grayscale-0 transition-all shadow-inner">
                                                            <Building2 className="size-5 text-text-muted group-hover:text-primary transition-colors" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-content tracking-tight">{exp.company}</span>
                                                            <span className="text-xs font-medium text-text-muted">{exp.role}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-5 rounded-full bg-surface border border-border p-0.5">
                                                            <div className="size-full rounded-full bg-primary/20" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-content">@{exp.user?.name || 'anonymous'}</span>
                                                            <span className="text-xs font-medium text-text-muted">{new Date(exp.createdAt).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${statusStyle(exp.status)} text-xs font-bold border border-transparent`}>
                                                        <div className={`size-1.5 rounded-full ${statDotColor(exp.status)}`} />
                                                        {exp.status}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-2 relative">
                                                        <button 
                                                            onClick={() => navigate(`/admin/pending/${exp._id}`)}
                                                            className="h-10 px-4 rounded-xl bg-surface border border-border flex items-center justify-center gap-2 text-xs font-bold text-text-muted hover:text-primary hover:border-primary/40 transition-all shadow-sm active:scale-95 group"
                                                        >
                                                            <Eye className="size-4" />
                                                            View
                                                        </button>

                                                        <div className="flex items-center gap-2">
                                                            {exp.status !== 'Approved' && (
                                                                <button 
                                                                    onClick={() => openModal('Approved', exp._id, exp.adminFeedback)}
                                                                    className="size-10 rounded-xl bg-success text-primary-text flex items-center justify-center shadow-lg shadow-emerald-600/10 hover:-translate-y-0.5 transition-all active:scale-95"
                                                                    title="Approve Experience"
                                                                >
                                                                    <ThumbsUp className="size-4.5" />
                                                                </button>
                                                            )}
                                                            {exp.status !== 'Rejected' && (
                                                                <button 
                                                                    onClick={() => openModal('Rejected', exp._id, exp.adminFeedback)}
                                                                    className="size-10 rounded-xl bg-danger text-primary-text flex items-center justify-center shadow-lg shadow-rose-600/10 hover:-translate-y-0.5 transition-all active:scale-95"
                                                                    title="Reject Experience"
                                                                >
                                                                    <ThumbsDown className="size-4.5" />
                                                                </button>
                                                            )}
                                                        </div>

                                                        <button 
                                                            onClick={() => handleDelete(exp._id)}
                                                            className="size-10 rounded-xl bg-surface border border-border flex items-center justify-center text-danger hover:bg-danger hover:text-primary-text transition-all shadow-sm active:scale-95"
                                                            title="Delete Experience"
                                                        >
                                                            <Trash2 className="size-4.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
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
                            <div className="p-6 border-b border-border flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`size-10 rounded-xl flex items-center justify-center ${
                                        modalConfig.type === 'Approved' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                                    }`}>
                                        {modalConfig.type === 'Approved' ? <CheckCircle2 className="size-5" /> : <XCircle className="size-5" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-xl font-bold text-content tracking-tight">Confirm {modalConfig.type}</h2>
                                        <span className="text-sm font-medium text-text-muted">Provide optional feedback</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setModalConfig({ isOpen: false, type: null, id: null })}
                                    className="p-2 rounded-lg text-text-muted hover:bg-background transition-colors"
                                >
                                    <X className="size-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 flex flex-col gap-4">
                                <label className="text-sm font-semibold text-content">Admin Feedback (Optional)</label>
                                <textarea
                                    placeholder={modalConfig.type === 'Approved' ? "e.g. 'Great submission, very detailed!'" : "e.g. 'Please provide more details on the technical rounds.'"}
                                    value={commentary}
                                    onChange={(e) => setCommentary(e.target.value)}
                                    className="w-full h-32 p-4 rounded-xl bg-background border border-border focus:border-primary text-sm outline-none resize-none transition-all shadow-sm"
                                />
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-border flex items-center justify-end gap-3 bg-background/50">
                                <button 
                                    onClick={() => setModalConfig({ isOpen: false, type: null, id: null })}
                                    className="px-6 py-2.5 rounded-xl text-sm font-bold text-text-muted hover:bg-surface border border-transparent transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleUpdateStatus}
                                    className={`px-6 py-2.5 rounded-xl text-sm font-bold text-primary-text flex items-center gap-2 transition-all active:scale-95 ${
                                        modalConfig.type === 'Approved' ? 'bg-success hover:bg-success/90' : 'bg-danger hover:bg-danger/90'
                                    }`}
                                >
                                    <Send className="size-4" />
                                    Confirm {modalConfig.type}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </AdminAppShell>
    );
};

export default ManageExperiencesPage;
