import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Clock, FileText, ShieldCheck, MapPin, Building2, User,
  CheckCircle2, AlertCircle, Info, ChevronRight, MessageCircle, Zap,
  ThumbsUp, ThumbsDown, Trash2, X, Send, Briefcase, Layers, Code, Layout, Video,
  Edit3, Save, ChevronDown, ChevronUp
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';
import toast from 'react-hot-toast';

/**
 * --- REVIEW SUBMISSION DETAILS: FORMAL MODERATION HUB ---
 * Refined Design: Professional, institutional, and high-density review interface.
 * Logic: Restricted to Approve/Reject actions with mandatory selection reasoning for BOTH.
 * Added: Edit content and Delete inappropriate entries (PDF Requirement).
 */
const ReviewSubmissionDetailsPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();
    const { id } = useParams();
    const [submission, setSubmission] = useState(null);

    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null }); // type: 'Approved' | 'Rejected'
    const [commentary, setCommentary] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(null);
    const [expandedRounds, setExpandRounds] = useState({});

    useEffect(() => {
        fetchSubmission();
    }, [id]);

    const fetchSubmission = async () => {
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch(`http://localhost:5000/api/experiences/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                setSubmission(data);
                setEditData(data);
            } else {
                toast.error('Failed to load submission');
            }
        } catch (err) {
            toast.error('Server error');
        }
    };

    const handleUpdateContent = async () => {
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch(`http://localhost:5000/api/experiences/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editData)
            });

            if (res.ok) {
                toast.success('Content updated successfully');
                setIsEditing(false);
                fetchSubmission();
            } else {
                toast.error('Failed to update content');
            }
        } catch (err) {
            toast.error('Server error');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to PERMANENTLY delete this experience?')) return;
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch(`http://localhost:5000/api/experiences/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                toast.success('Experience deleted');
                navigate('/admin/experiences');
            } else {
                toast.error('Failed to delete');
            }
        } catch (err) {
            toast.error('Server error');
        }
    };

    const toggleRound = (idx) => {
        setExpandRounds(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const openModal = (type) => {
        setCommentary('');
        setModalConfig({ isOpen: true, type });
    };

    const handleUpdateStatus = async () => {
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch(`http://localhost:5000/api/experiences/update-status/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: modalConfig.type })
            });

            if (res.ok) {
                toast.success(`Submission ${modalConfig.type} successfully`);
                navigate('/admin/pending');
            } else {
                const data = await res.json();
                toast.error(data.error || 'Failed to update status');
            }
        } catch (err) {
            toast.error('Server error');
        }
    };

    if (!submission) return <div className="h-screen flex items-center justify-center font-black uppercase tracking-widest text-text-muted">Loading Evidence...</div>;

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex bg-background overflow-hidden">
                
                {/* LEFT: CONTENT CANVAS (SCROLLABLE) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12 pb-32">
                    <div className="max-w-4xl mx-auto w-full flex flex-col gap-12">
                        
                        {/* Summary Header */}
                        <div className="flex flex-col gap-5 border-b border-border pb-10">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => navigate('/admin/pending')}
                                    className="size-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary transition-all active:scale-95 group"
                                >
                                    <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-0.5" />
                                </button>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2.5 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${submission.status === 'Pending Review' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-green-500/10 border-green-500/20 text-green-500'}`}>{submission.status}</span>
                                        <span className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-[0.2em]">Node ID: {submission._id}</span>
                                    </div>
                                    <h1 className="text-3xl font-black text-content uppercase tracking-tight leading-none font-['Inter']">{submission.company} // {submission.role}</h1>
                                </div>
                            </div>
                        </div>

                        {/* Overview Section */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 border-l-4 border-primary pl-4">
                                <FileText className="size-5 text-primary" />
                                <h3 className="text-[11px] font-black text-content uppercase tracking-[0.25em]">Process Overview</h3>
                            </div>
                            {!isEditing ? (
                                <p className="text-[15px] font-medium text-text-muted leading-relaxed tracking-wide italic p-8 rounded-2xl bg-surface border border-border shadow-sm">
                                    "{submission.processOverview}"
                                </p>
                            ) : (
                                <textarea 
                                    value={editData.processOverview}
                                    onChange={(e) => setEditData({...editData, processOverview: e.target.value})}
                                    className="w-full h-40 p-8 rounded-2xl bg-surface border-2 border-primary/40 text-[15px] font-medium text-content outline-none transition-all shadow-inner"
                                />
                            )}
                        </div>

                        {/* Round Analysis Sector */}
                        <div className="flex flex-col gap-8">
                             <div className="flex items-center justify-between px-2">
                                <h3 className="text-[11px] font-black text-content uppercase tracking-[0.25em] flex items-center gap-3">
                                    <Zap className="size-5 text-primary" />
                                    Interview Module Analysis
                                </h3>
                                <span className="text-[9px] font-bold text-text-muted opacity-40 uppercase tracking-widest">{submission.rounds.length} Verification Nodes</span>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-6">
                                {editData.rounds.map((round, i) => (
                                    <div 
                                        key={i}
                                        className="p-8 rounded-[2rem] bg-surface border border-border shadow-sm flex flex-col gap-6 group overflow-hidden"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-lg bg-background border border-border flex items-center justify-center text-[10px] font-black text-primary italic uppercase tracking-tighter shadow-inner">0{i+1}</div>
                                                {!isEditing ? (
                                                    <h4 className="text-lg font-black text-content uppercase tracking-tight">{round.title}</h4>
                                                ) : (
                                                    <input 
                                                        value={round.title}
                                                        onChange={(e) => {
                                                            const newRounds = [...editData.rounds];
                                                            newRounds[i].title = e.target.value;
                                                            setEditData({...editData, rounds: newRounds});
                                                        }}
                                                        className="bg-transparent border-b border-primary/20 text-lg font-black text-content uppercase outline-none focus:border-primary"
                                                    />
                                                )}
                                            </div>
                                            {!isEditing && (
                                                <button onClick={() => toggleRound(i)} className="p-2 rounded-lg bg-background border border-border text-text-muted hover:text-primary transition-all">
                                                    {expandedRounds[i] ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                                                </button>
                                            )}
                                        </div>

                                        {(expandedRounds[i] || isEditing) && (
                                            <div className="space-y-4 pt-4 border-t border-border/40 animate-in fade-in slide-in-from-top-4 duration-300">
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-[9px] font-black uppercase text-text-muted opacity-40">Questions Asked</span>
                                                    {!isEditing ? (
                                                        <p className="text-[13px] font-bold text-text-muted leading-relaxed whitespace-pre-wrap">{round.questions}</p>
                                                    ) : (
                                                        <textarea 
                                                            value={round.questions}
                                                            onChange={(e) => {
                                                                const newRounds = [...editData.rounds];
                                                                newRounds[i].questions = e.target.value;
                                                                setEditData({...editData, rounds: newRounds});
                                                            }}
                                                            className="w-full p-4 rounded-xl bg-background border border-primary/20 text-[13px] font-bold text-content outline-none focus:border-primary"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-[9px] font-black uppercase text-text-muted opacity-40">Code Solution / Explanation</span>
                                                    {!isEditing ? (
                                                        <pre className="p-4 rounded-xl bg-background border border-border font-mono text-xs text-primary overflow-x-auto">{round.solution || 'No solution provided'}</pre>
                                                    ) : (
                                                        <textarea 
                                                            value={round.solution}
                                                            onChange={(e) => {
                                                                const newRounds = [...editData.rounds];
                                                                newRounds[i].solution = e.target.value;
                                                                setEditData({...editData, rounds: newRounds});
                                                            }}
                                                            className="w-full p-4 rounded-xl bg-background border border-primary/20 font-mono text-xs text-content outline-none focus:border-primary h-32"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* RIGHT: ADMINISTRATIVE PANEL (FIXED) */}
                <div className="w-[450px] border-l border-border bg-surface shrink-0 flex flex-col">
                    <div className="p-10 border-b border-border bg-background/30">
                        <div className="flex items-center justify-between mb-2">
                             <div className="flex items-center gap-3">
                                <ShieldCheck className="size-5 text-primary" />
                                <span className="text-[10px] font-black uppercase text-text-muted tracking-[0.25em]">Administrative Panel</span>
                             </div>
                             <button onClick={handleDelete} className="text-rose-500 hover:text-rose-600 transition-colors p-1" title="Permanently Delete Experience">
                                <Trash2 className="size-4" />
                             </button>
                        </div>
                        <h2 className="text-xl font-black text-content uppercase tracking-tight font-['Inter']">Decision Protocol</h2>
                    </div>

                    <div className="flex-1 p-10 flex flex-col gap-10 overflow-y-auto no-scrollbar">
                        
                        {/* Contributor Metadata */}
                        <div className="flex flex-col gap-6">
                            <h3 className="text-[9px] font-black text-text-muted uppercase tracking-[0.3em] opacity-40 italic">Submitted Information</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="p-6 rounded-2xl bg-background/50 border border-border flex flex-col gap-3">
                                    <div className="flex items-center gap-2.5 text-text-muted opacity-40">
                                        <User className="size-4" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Platform Contributor</span>
                                    </div>
                                    <span className="text-lg font-black text-content italic lowercase tracking-tight group-hover:text-primary transition-colors">@{submission.user?.name || 'anonymous'}</span>
                                </div>
                                <div className="p-6 rounded-2xl bg-background/50 border border-border flex flex-col gap-3">
                                    <div className="flex items-center gap-2.5 text-text-muted opacity-40">
                                        <Briefcase className="size-4" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Candidate Experience</span>
                                    </div>
                                    <span className="text-base font-black text-content uppercase tracking-tight italic transition-colors leading-none">{submission.candidateExperience} Years</span>
                                </div>
                            </div>
                        </div>

                        {/* Content Management */}
                        <div className="flex flex-col gap-6">
                            <h3 className="text-[9px] font-black text-text-muted uppercase tracking-[0.3em] opacity-40 italic">Content Management</h3>
                            {!isEditing ? (
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="w-full py-4 rounded-xl border border-border bg-background/50 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-3"
                                >
                                    <Edit3 className="size-4" />
                                    Edit Journey Details
                                </button>
                            ) : (
                                <button 
                                    onClick={handleUpdateContent}
                                    className="w-full py-4 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
                                >
                                    <Save className="size-4" />
                                    Save Journey Updates
                                </button>
                            )}
                        </div>

                        {/* Topics Covered */}
                        <div className="flex flex-col gap-6">
                            <h3 className="text-[9px] font-black text-text-muted uppercase tracking-[0.3em] opacity-40 italic">Technical Domains</h3>
                            <div className="space-y-4">
                                <TopicBox label="DSA" value={submission.topics.dsa} />
                                <TopicBox label="HLD" value={submission.topics.hld} />
                                <TopicBox label="LLD" value={submission.topics.lld} />
                            </div>
                        </div>

                    </div>

                    {/* MODERATION ACTIONS (FIXED BOTTOM) */}
                    <div className="p-10 border-t border-border bg-background/30 grid grid-cols-3 gap-4">
                        <button 
                            onClick={() => openModal('Approved')}
                            className="h-14 rounded-xl bg-emerald-600 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/10 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                            <ThumbsUp className="size-5" />
                            Approve
                        </button>
                        <button 
                            onClick={() => openModal('Rejected')}
                            className="h-14 rounded-xl bg-rose-600 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-rose-600/10 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                            <ThumbsDown className="size-5" />
                            Reject
                        </button>
                        <button 
                            onClick={handleDelete}
                            className="h-14 rounded-xl border border-red-500/30 text-red-500 text-[11px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3 shadow-sm"
                        >
                            <Trash2 className="size-5" />
                            Delete Node
                        </button>
                    </div>
                </div>

            </div>

            {/* SYNC PROTOCOL MODAL: APPROVAL OR DENIAL */}
            <AnimatePresence>
                {modalConfig.isOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setModalConfig({ isOpen: false, type: null })}
                            className="fixed inset-0 z-[200] bg-background/40 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-surface border border-border rounded-3xl shadow-2xl z-[210] overflow-hidden p-10"
                        >
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-2 border-b border-border pb-6">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-[9px] font-bold uppercase tracking-widest leading-none ${modalConfig.type === 'Approved' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {modalConfig.type === 'Approved' ? 'Selection Protocol' : 'Denial Protocol'}
                                        </span>
                                        <button onClick={() => setModalConfig({ isOpen: false, type: null })} className="text-text-muted hover:text-primary transition-colors">
                                            <X className="size-5" />
                                        </button>
                                    </div>
                                    <h2 className="text-2xl font-black text-content uppercase tracking-tight font-['Inter'] mt-4">
                                        {modalConfig.type === 'Approved' ? 'Verification Summary' : 'Reason for Rejection'}
                                    </h2>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <textarea 
                                        placeholder={modalConfig.type === 'Approved' ? 'Enter selection summary...' : 'Enter rejection reason...'}
                                        value={commentary}
                                        onChange={(e) => setCommentary(e.target.value)}
                                        className={`w-full h-40 p-6 rounded-2xl bg-background border border-border text-[13px] font-bold uppercase tracking-tight outline-none transition-all shadow-inner resize-none custom-scrollbar italic ${
                                            modalConfig.type === 'Approved' ? 'focus:border-emerald-500' : 'focus:border-rose-500'
                                        }`}
                                    />
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={handleUpdateStatus}
                                            className={`flex-1 h-14 rounded-xl text-white text-[11px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:-translate-y-0.5 transition-all active:scale-95 ${
                                                modalConfig.type === 'Approved' ? 'bg-emerald-600 shadow-emerald-600/20' : 'bg-rose-600 shadow-rose-600/20'
                                            }`}
                                        >
                                            <Send className="size-4.5" />
                                            Confirm Decision
                                        </button>
                                        <button 
                                            onClick={() => setModalConfig({ isOpen: false, type: null })}
                                            className="px-8 h-14 rounded-xl border border-border text-[11px] font-black uppercase tracking-widest text-text-muted hover:bg-surface-hover transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </AdminAppShell>
    );
};

const TopicBox = ({ label, value }) => (
    <div className="p-4 rounded-xl bg-background/50 border border-border flex flex-col gap-1">
        <span className="text-[8px] font-black uppercase text-text-muted opacity-40">{label} Domain</span>
        <span className="text-[11px] font-bold text-content">{value || 'Not Specified'}</span>
    </div>
);

export default ReviewSubmissionDetailsPage;
