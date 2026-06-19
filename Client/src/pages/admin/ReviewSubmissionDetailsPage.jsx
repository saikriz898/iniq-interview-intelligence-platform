import React, { useState, useEffect } from 'react';
import {
    ArrowLeft, FileText, User, CheckCircle2, AlertCircle,
    ThumbsDown, Trash2, X, Send, Edit3, Save, ChevronDown, ChevronUp,
    Layers, Code, Layout, ChevronRight
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';
import toast from 'react-hot-toast';

const ReviewSubmissionDetailsPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();
    const { id } = useParams();
    const [submission, setSubmission] = useState(null);
    const [editData, setEditData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [expandedRounds, setExpandRounds] = useState({});
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null });
    const [commentary, setCommentary] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSubmission();
    }, [id]);

    const fetchSubmission = async () => {
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch(`http://localhost:5000/api/experiences/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setSubmission(data);
                setEditData(JSON.parse(JSON.stringify(data))); // deep copy
                setExpandRounds({ 0: true });
            } else {
                toast.error('Failed to load submission');
            }
        } catch (err) {
            toast.error('Server error');
        }
    };

    const handleUpdateContent = async () => {
        setSaving(true);
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch(`http://localhost:5000/api/experiences/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
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
        } finally {
            setSaving(false);
        }
    };

    const handleCancelEdit = () => {
        setEditData(JSON.parse(JSON.stringify(submission))); // reset to original
        setIsEditing(false);
    };

    const handleDelete = async () => {
        if (!window.confirm('Permanently delete this experience? This cannot be undone.')) return;
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch(`http://localhost:5000/api/experiences/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('Experience deleted');
                navigate('/admin/reviews');
            } else {
                toast.error('Failed to delete');
            }
        } catch (err) {
            toast.error('Server error');
        }
    };

    const openModal = (type) => {
        setCommentary(submission?.adminFeedback || '');
        setModalConfig({ isOpen: true, type });
    };

    const handleUpdateStatus = async () => {
        if (modalConfig.type === 'Rejected' && !commentary.trim()) {
            toast.error('Please provide a rejection reason');
            return;
        }
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch(`http://localhost:5000/api/experiences/update-status/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ status: modalConfig.type, feedback: commentary })
            });
            if (res.ok) {
                toast.success(`Submission ${modalConfig.type}`);
                navigate('/admin/reviews');
            } else {
                const data = await res.json();
                toast.error(data.error || 'Failed to update status');
            }
        } catch (err) {
            toast.error('Server error');
        }
    };

    const updateRoundField = (roundIndex, field, value) => {
        const newRounds = editData.rounds.map((r, i) =>
            i === roundIndex ? { ...r, [field]: value } : r
        );
        setEditData(prev => ({ ...prev, rounds: newRounds }));
    };

    if (!submission || !editData) return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={true} noPadding={true}>
            <div className="h-screen w-full flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin size-10 border-[3px] border-primary border-t-transparent rounded-full" />
                    <span className="text-sm text-text-muted font-medium">Loading submission...</span>
                </div>
            </div>
        </AdminAppShell>
    );

    const statusColors = {
        'Pending Review': 'bg-warning/10 text-warning border-warning/30',
        'Approved': 'bg-success/10 text-success border-success/30',
        'Rejected': 'bg-danger/10 text-danger border-danger/30',
    };

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col bg-background overflow-hidden">

                {/* ── TOP ACTION BAR ── */}
                <header className="shrink-0 h-16 px-6 border-b border-border/50 bg-surface/80 backdrop-blur-xl flex items-center justify-between z-30 gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                        <button
                            onClick={() => navigate('/admin/reviews')}
                            className="shrink-0 size-9 rounded-xl border border-border bg-background hover:bg-surface-hover text-text-muted hover:text-primary transition-all flex items-center justify-center shadow-sm active:scale-95"
                        >
                            <ArrowLeft className="size-4" />
                        </button>
                        <div className="min-w-0 flex items-center gap-3">
                            <h1 className="text-base font-bold text-content truncate">{submission.role}</h1>
                            <span className="text-text-muted shrink-0">·</span>
                            <span className="text-sm text-primary font-semibold shrink-0 truncate hidden sm:block">{submission.company}</span>
                        </div>
                        <span className={`hidden md:inline-flex shrink-0 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-widest ${statusColors[submission.status] || 'bg-surface text-text-muted border-border'}`}>
                            {submission.status}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        {isEditing ? (
                            <>
                                <button onClick={handleCancelEdit} className="px-4 py-2 rounded-xl border border-border text-sm font-semibold text-text-muted hover:bg-surface transition-all active:scale-95">Cancel</button>
                                <button
                                    onClick={handleUpdateContent}
                                    disabled={saving}
                                    className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 flex items-center gap-2 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-60"
                                >
                                    {saving ? <div className="size-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <Save className="size-4" />}
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <>
                                {submission.status !== 'Approved' && (
                                    <button onClick={() => setIsEditing(true)} className="px-4 py-2 rounded-xl border border-border bg-surface text-sm font-semibold text-content hover:border-primary/40 hover:text-primary transition-all active:scale-95 flex items-center gap-2">
                                        <Edit3 className="size-4" /> Edit
                                    </button>
                                )}
                                <button onClick={handleDelete} className="size-9 rounded-xl border border-border bg-surface text-danger hover:bg-danger hover:text-white hover:border-danger transition-all flex items-center justify-center shadow-sm active:scale-95">
                                    <Trash2 className="size-4" />
                                </button>
                                {submission.status !== 'Approved' && (
                                    <>
                                        <button onClick={() => openModal('Rejected')} className="px-4 py-2 rounded-xl border border-danger/30 text-danger hover:bg-danger/10 text-sm font-bold transition-all active:scale-95 hidden sm:flex items-center gap-2">
                                            <ThumbsDown className="size-4" /> Reject
                                        </button>
                                        <button onClick={() => openModal('Approved')} className="px-5 py-2 rounded-xl bg-success text-white text-sm font-bold shadow-lg shadow-success/20 hover:bg-success/90 transition-all active:scale-95 flex items-center gap-2">
                                            <CheckCircle2 className="size-4" /> Approve
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </header>

                {/* ── MAIN SCROLLABLE CONTENT ── */}
                <main className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10 flex flex-col gap-10 pb-24">

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
                            <span className="font-mono bg-surface px-3 py-1.5 rounded-lg border border-border">ID: {submission._id}</span>
                            <ChevronRight className="size-3 opacity-40" />
                            <span>by <span className="font-semibold text-content">@{submission.user?.name || 'anonymous'}</span></span>
                            <ChevronRight className="size-3 opacity-40" />
                            <span><span className="font-semibold text-content">{submission.candidateExperience}</span> yrs exp</span>
                        </div>

                        {/* Admin Feedback Banner */}
                        {submission.adminFeedback && (
                            <div className={`flex items-start gap-4 p-5 rounded-2xl border shadow-sm ${submission.status === 'Approved' ? 'bg-success/5 border-success/20' : 'bg-warning/5 border-warning/20'}`}>
                                <AlertCircle className={`size-5 shrink-0 mt-0.5 ${submission.status === 'Approved' ? 'text-success' : 'text-warning'}`} />
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1">Previous Moderator Feedback</p>
                                    <p className={`text-sm font-medium leading-relaxed ${submission.status === 'Approved' ? 'text-success' : 'text-warning'}`}>"{submission.adminFeedback}"</p>
                                </div>
                            </div>
                        )}

                        {/* Process Overview */}
                        <section className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <FileText className="size-4 text-primary" />
                                <h2 className="text-sm font-bold text-content uppercase tracking-widest">Process Overview</h2>
                            </div>
                            {isEditing ? (
                                <textarea
                                    value={editData.processOverview}
                                    onChange={(e) => setEditData(prev => ({ ...prev, processOverview: e.target.value }))}
                                    rows={6}
                                    className="w-full p-6 rounded-2xl bg-surface border-2 border-primary/40 text-[15px] text-content leading-relaxed outline-none focus:border-primary transition-all custom-scrollbar resize-y shadow-inner"
                                    placeholder="Describe the overall interview process..."
                                />
                            ) : (
                                <div className="p-6 rounded-2xl bg-surface border border-border shadow-sm">
                                    <p className="text-[15px] text-text-secondary leading-relaxed">{submission.processOverview || 'No overview provided.'}</p>
                                </div>
                            )}
                        </section>

                        {/* Topic Tags */}
                        {(submission.topics?.dsa || submission.topics?.hld || submission.topics?.lld) && (
                            <div className="flex flex-wrap gap-2">
                                {submission.topics.dsa && <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold border border-primary/20">DSA: {submission.topics.dsa}</span>}
                                {submission.topics.hld && <span className="px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-bold border border-accent/20">HLD: {submission.topics.hld}</span>}
                                {submission.topics.lld && <span className="px-3 py-1.5 rounded-lg bg-success/10 text-success text-xs font-bold border border-success/20">LLD: {submission.topics.lld}</span>}
                            </div>
                        )}

                        {/* Interview Rounds */}
                        <section className="flex flex-col gap-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Layers className="size-4 text-primary" />
                                    <h2 className="text-sm font-bold text-content uppercase tracking-widest">Interview Rounds</h2>
                                </div>
                                <span className="text-xs font-semibold text-text-muted bg-surface px-3 py-1.5 rounded-lg border border-border">
                                    {editData.rounds.length} rounds
                                </span>
                            </div>

                            <div className="flex flex-col gap-4">
                                {editData.rounds.map((round, i) => {
                                    const isOpen = expandedRounds[i] || isEditing;
                                    return (
                                        <div key={i} className={`rounded-2xl border overflow-hidden transition-all duration-200 ${isOpen ? 'border-border shadow-md bg-surface' : 'border-border/60 bg-surface/40 hover:border-border hover:bg-surface/70'}`}>
                                            {/* Round Header */}
                                            <div
                                                className="flex items-center gap-4 px-6 py-4 cursor-pointer select-none"
                                                onClick={() => !isEditing && setExpandRounds(p => ({ ...p, [i]: !p[i] }))}
                                            >
                                                <div className="size-9 rounded-xl bg-background border border-border flex items-center justify-center text-sm font-bold text-primary shadow-inner shrink-0">
                                                    {String(i + 1).padStart(2, '0')}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    {isEditing ? (
                                                        <input
                                                            value={round.title}
                                                            onChange={e => updateRoundField(i, 'title', e.target.value)}
                                                            onClick={e => e.stopPropagation()}
                                                            className="w-full bg-background border border-primary/30 rounded-lg px-3 py-2 text-base font-bold text-content outline-none focus:border-primary transition-colors"
                                                            placeholder="Round title..."
                                                        />
                                                    ) : (
                                                        <h3 className="text-base font-bold text-content truncate">{round.title || 'Untitled Round'}</h3>
                                                    )}
                                                </div>
                                                {!isEditing && (
                                                    <div className="text-text-muted shrink-0">
                                                        {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Round Body */}
                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-5 pb-5 pt-3 border-t border-border/30 flex flex-col gap-5">
                                                            {/* Questions block — full width */}
                                                            <div>
                                                                <div className="flex items-center gap-1.5 mb-2">
                                                                    <Layout className="size-3 text-primary" />
                                                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted">Questions & Context</span>
                                                                </div>
                                                                {isEditing ? (
                                                                    <textarea
                                                                        value={round.questions || round.desc || ''}
                                                                        onChange={e => updateRoundField(i, 'questions', e.target.value)}
                                                                        rows={5}
                                                                        className="w-full p-4 rounded-xl bg-background border-2 border-primary/20 text-sm text-content outline-none focus:border-primary custom-scrollbar resize-none transition-all"
                                                                        placeholder="What questions were asked..."
                                                                    />
                                                                ) : (
                                                                    <div className="p-4 rounded-xl bg-background border border-border min-h-[60px]">
                                                                        <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                                                                            {round.questions || round.desc || 'No description provided.'}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {/* Solution block — full width below */}
                                                            <div>
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <Code className="size-3 text-accent" />
                                                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted">Technical Solution / Code</span>
                                                                    </div>
                                                                    {isEditing && (
                                                                        <span className="text-[9px] text-text-muted/50 font-mono">edit mode</span>
                                                                    )}
                                                                </div>
                                                                {isEditing ? (
                                                                    <div className="rounded-xl overflow-hidden border-2 border-primary/30 focus-within:border-primary transition-all shadow-lg">
                                                                        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#161b22] border-b border-white/5">
                                                                            <div className="size-2.5 rounded-full bg-[#ff5f57]" />
                                                                            <div className="size-2.5 rounded-full bg-[#febb2c]" />
                                                                            <div className="size-2.5 rounded-full bg-[#30c84b]" />
                                                                            <span className="ml-3 text-[9px] text-white/25 font-mono uppercase tracking-widest">● code editor</span>
                                                                        </div>
                                                                        <textarea
                                                                            value={round.solution || ''}
                                                                            onChange={e => updateRoundField(i, 'solution', e.target.value)}
                                                                            rows={12}
                                                                            spellCheck={false}
                                                                            className="w-full p-5 bg-[#0d1117] font-mono text-sm text-[#58a6ff] outline-none resize-y custom-scrollbar leading-relaxed"
                                                                            style={{ minHeight: '200px' }}
                                                                            placeholder={"// Paste your code or technical explanation here...\n// Example:\nfunction solution(arr) {\n  return arr.sort((a, b) => a - b);\n}"}
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <div className="rounded-xl overflow-hidden border border-border shadow-md">
                                                                        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#161b22] border-b border-white/5">
                                                                            <div className="size-2.5 rounded-full bg-[#ff5f57]" />
                                                                            <div className="size-2.5 rounded-full bg-[#febb2c]" />
                                                                            <div className="size-2.5 rounded-full bg-[#30c84b]" />
                                                                        </div>
                                                                        <pre className="p-5 bg-[#0d1117] font-mono text-sm text-[#58a6ff] overflow-x-auto custom-scrollbar whitespace-pre-wrap break-words min-h-[80px] leading-relaxed">
                                                                            {round.solution?.trim() || '// No solution provided'}
                                                                        </pre>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Specific Questions */}
                                                        {!isEditing && submission.questions?.filter(q => q.roundId === (i + 1).toString()).length > 0 && (
                                                            <div className="px-6 pb-6 flex flex-col gap-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="h-px flex-1 bg-border/40" />
                                                                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-text-muted">Verified Problems</span>
                                                                    <div className="h-px flex-1 bg-border/40" />
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                    {submission.questions.filter(q => q.roundId === (i + 1).toString()).map((q, qIdx) => (
                                                                        <div key={q._id || qIdx} className="p-4 rounded-xl bg-surface border border-border flex flex-col gap-2 shadow-sm">
                                                                            <div className="flex items-center justify-between">
                                                                                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Problem {qIdx + 1}</span>
                                                                                {q.topic && <span className="text-[9px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">{q.topic}</span>}
                                                                            </div>
                                                                            <p className="text-sm font-semibold text-content leading-snug">{q.text}</p>
                                                                            {q.codeSnippet && (
                                                                                <pre className="p-3 rounded-lg bg-[#0d1117] border border-border/40 font-mono text-xs text-primary/80 overflow-x-auto custom-scrollbar mt-1">
                                                                                    {q.codeSnippet}
                                                                                </pre>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Bottom Action Buttons (mobile convenience) */}
                        {!isEditing && submission.status !== 'Approved' && (
                            <div className="flex gap-3 sm:hidden">
                                <button onClick={() => openModal('Rejected')} className="flex-1 h-12 rounded-xl border border-danger/30 text-danger font-bold text-sm flex items-center justify-center gap-2">
                                    <ThumbsDown className="size-4" /> Reject
                                </button>
                                <button onClick={() => openModal('Approved')} className="flex-1 h-12 rounded-xl bg-success text-white font-bold text-sm flex items-center justify-center gap-2">
                                    <CheckCircle2 className="size-4" /> Approve
                                </button>
                            </div>
                        )}

                    </div>
                </main>
            </div>

            {/* ── APPROVE / REJECT MODAL ── */}
            <AnimatePresence>
                {modalConfig.isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setModalConfig({ isOpen: false, type: null })}
                            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 16 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-surface border border-border rounded-3xl shadow-2xl z-[110] overflow-hidden"
                        >
                            <div className="p-8 flex flex-col gap-6">
                                <div className="flex items-center justify-between pb-4 border-b border-border/50">
                                    <div className="flex items-center gap-3">
                                        <div className={`size-10 rounded-2xl flex items-center justify-center text-white shadow-lg ${modalConfig.type === 'Approved' ? 'bg-success shadow-success/20' : 'bg-danger shadow-danger/20'}`}>
                                            {modalConfig.type === 'Approved' ? <CheckCircle2 className="size-5" /> : <AlertCircle className="size-5" />}
                                        </div>
                                        <div>
                                            <p className={`text-[10px] font-black uppercase tracking-widest ${modalConfig.type === 'Approved' ? 'text-success' : 'text-danger'}`}>
                                                {modalConfig.type === 'Approved' ? 'Approve Submission' : 'Reject Submission'}
                                            </p>
                                            <h2 className="text-lg font-bold text-content">
                                                {modalConfig.type === 'Approved' ? 'Confirm Approval' : 'Provide Rejection Reason'}
                                            </h2>
                                        </div>
                                    </div>
                                    <button onClick={() => setModalConfig({ isOpen: false, type: null })} className="size-8 rounded-xl text-text-muted hover:text-content hover:bg-background transition-all flex items-center justify-center">
                                        <X className="size-4" />
                                    </button>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-widest">
                                        {modalConfig.type === 'Approved' ? 'Approval Notes (optional)' : 'Rejection Reason (required)'}
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder={modalConfig.type === 'Approved' ? 'Add any notes about this approval...' : 'Explain why this submission is being rejected...'}
                                        value={commentary}
                                        onChange={e => setCommentary(e.target.value)}
                                        className={`w-full p-4 rounded-xl bg-background border text-sm text-content outline-none resize-none custom-scrollbar transition-all ${modalConfig.type === 'Approved' ? 'border-border focus:border-success' : 'border-border focus:border-danger'}`}
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button onClick={() => setModalConfig({ isOpen: false, type: null })} className="flex-1 h-12 rounded-xl bg-background border border-border text-sm font-bold text-content hover:bg-surface transition-all">
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleUpdateStatus}
                                        disabled={modalConfig.type === 'Rejected' && !commentary.trim()}
                                        className={`flex-[2] h-12 rounded-xl text-white text-sm font-bold shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${modalConfig.type === 'Approved' ? 'bg-success hover:bg-success/90 shadow-success/20' : 'bg-danger hover:bg-danger/90 shadow-danger/20'}`}
                                    >
                                        <Send className="size-4" />
                                        Execute {modalConfig.type}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </AdminAppShell>
    );
};

export default ReviewSubmissionDetailsPage;
