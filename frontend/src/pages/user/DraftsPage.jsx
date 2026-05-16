import React, { useState } from 'react';
import { 
  FileText, PlusCircle, Trash2, Calendar, 
  ChevronRight, Building2, MoreVertical, 
  ArrowRight, Clock, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

/**
 * --- DRAFTS PAGE ---
 * Features: Progress-aware draft cards, quick management tools, 
 * and empty state for new contributions.
 */
const DraftsPage = () => {
  const { theme, toggleTheme, isLoading, setIsLoading } = useGlobalContext();
  const navigate = useNavigate();

  const [drafts, setDrafts] = useState([
    { id: 1, company: 'Microsoft', role: 'SDE-II', lastEdited: '2 hours ago', progress: 65 },
    { id: 2, company: 'Untitled Draft', role: 'Not specified', lastEdited: 'Yesterday', progress: 12 },
    { id: 3, company: 'Meta', role: 'Product Analyst', lastEdited: 'Mar 30, 2026', progress: 90 },
  ]);
  const [openMenuId, setOpenMenuId] = useState(null);

  const deleteDraft = (id) => {
    setDrafts(drafts.filter(d => d.id !== id));
    toast.error('Draft deleted successfully');
  };

  return (
    <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
      <Toaster position="top-right" containerStyle={{ top: 90 }} />
      <div className="h-full flex flex-col overflow-hidden p-6 md:p-10 gap-8">
        
        {/* 1. PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
            <div className="flex flex-col gap-1.5 px-2">
                <h1 className="text-3xl font-black text-content font-['Sora'] tracking-tight">
                    Unfinished Protocols
                </h1>
                <p className="text-sm font-medium text-text-muted opacity-70">
                    Resume your journey submissions and complete them for the community.
                </p>
            </div>
            <button 
                onClick={() => navigate('/submit')}
                className="px-6 py-3 rounded-xl bg-primary text-white text-[11px] font-black uppercase tracking-widest flex items-center gap-2.5 shadow-xl shadow-primary/20 hover:-translate-y-0.5 active:scale-95 transition-all w-fit"
            >
                Start New Experience
                <PlusCircle className="size-4" />
            </button>
        </div>

        {/* 2. DRAFTS HUB (No-Scroll Table) */}
        <div className="flex-1 flex flex-col overflow-hidden bg-surface border border-border/60 rounded-[2.5rem] shadow-sm relative">
            <div className="flex-1 overflow-y-auto custom-scrollbar relative px-1">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 z-10 bg-surface/80 backdrop-blur-md border-b border-border/40">
                        <tr>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60">Journey Module</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60">Last Edited</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60 text-center">Protocol Maturity</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60 text-right">Action Hub</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                        <AnimatePresence mode="popLayout">
                            {drafts.length > 0 ? (
                                drafts.map((draft, i) => (
                                    <motion.tr 
                                        key={draft.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-surface-hover/40 transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="size-11 rounded-2xl bg-surface-hover border border-border/60 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                                                    <Building2 className="size-5 text-text-muted group-hover:text-primary transition-colors" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm md:text-base font-black text-content tracking-tight">{draft.company}</span>
                                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-60">{draft.role}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-text-muted/60">
                                                <Clock className="size-3.5" />
                                                <span className="text-[10px] font-bold tracking-tight lowercase">Edited {draft.lastEdited}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-2 max-w-[120px] mx-auto">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[8px] font-black uppercase tracking-widest text-text-muted opacity-60">Progression</span>
                                                    <span className="text-[8px] font-black text-primary">{draft.progress}%</span>
                                                </div>
                                                <div className="h-1 w-full bg-border/40 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${draft.progress}%` }}
                                                        className="h-full bg-primary rounded-full shadow-sm shadow-primary/20" 
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 relative">
                                                <button 
                                                    onClick={() => setOpenMenuId(openMenuId === draft.id ? null : draft.id)}
                                                    className={`p-2.5 rounded-xl border transition-all ${
                                                        openMenuId === draft.id 
                                                        ? 'bg-primary border-primary text-white shadow-lg'
                                                        : 'bg-surface-hover border-border text-text-muted hover:text-primary hover:border-primary/40'
                                                    }`}
                                                >
                                                    <MoreVertical className="size-4" />
                                                </button>

                                                <AnimatePresence>
                                                    {openMenuId === draft.id && (
                                                        <>
                                                            <motion.div 
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                onClick={() => setOpenMenuId(null)}
                                                                className="fixed inset-0 z-[120]"
                                                            />
                                                            <motion.div 
                                                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                                                className="absolute right-0 top-full mt-2 w-44 bg-surface border border-border/60 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-[130] overflow-hidden p-2 text-left"
                                                            >
                                                                <button 
                                                                    onClick={() => {
                                                                        navigate(`/drafts/${draft.id}`);
                                                                        setOpenMenuId(null);
                                                                    }}
                                                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-primary hover:bg-surface-hover transition-all"
                                                                >
                                                                    <ArrowRight className="size-4" />
                                                                    Resume
                                                                </button>
                                                                
                                                                <button 
                                                                    onClick={() => deleteDraft(draft.id)}
                                                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-red-500 hover:bg-red-500/5 transition-all text-left"
                                                                >
                                                                    <Trash2 className="size-4" />
                                                                    Decommission
                                                                </button>
                                                            </motion.div>
                                                        </>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20">
                                         <div className="flex flex-col items-center justify-center gap-8 text-center bg-surface/40 p-12 lg:p-20">
                                            <div className="size-24 rounded-[2.5rem] bg-surface-hover border border-border flex items-center justify-center">
                                                <FileText className="size-12 text-text-muted opacity-20" />
                                            </div>
                                            <div className="flex flex-col gap-2 max-w-[400px]">
                                                <h3 className="text-2xl font-black text-content tracking-tight">Your draft hub is empty</h3>
                                                <p className="text-sm font-medium text-text-muted leading-relaxed opacity-70">
                                                    You haven't started any interview journeys yet. Launch your first submission to share your success with others.
                                                </p>
                                            </div>
                                            <button 
                                                onClick={() => navigate('/submit')}
                                                className="group px-8 py-4 rounded-2xl bg-primary text-white text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:-translate-y-0.5 transition-all flex items-center gap-3"
                                            >
                                                Submit New Experience
                                                <PlusCircle className="size-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>

        {/* 3. TIPS HUD */}
        <div className="shrink-0 p-6 rounded-3xl bg-primary/5 border border-primary/20 flex flex-col md:flex-row items-center gap-6">
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <AlertCircle className="size-7 text-primary" />
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-sm font-black text-content uppercase tracking-widest leading-none">Draft Maturity Tip</h3>
                <p className="text-xs font-bold text-text-muted opacity-70 leading-relaxed uppercase tracking-tight">
                    Aim for higher than 90% progress to increase your approval chances by 45%. 
                    Verified contributors get priority review.
                </p>
            </div>
        </div>

      </div>
    </UserAppShell>
  );
};

export default DraftsPage;
