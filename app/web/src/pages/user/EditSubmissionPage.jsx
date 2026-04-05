import React, { useState, useEffect } from 'react';
import { 
  Building2, Briefcase, FileText, Code, Layout, Video, 
  ChevronRight, ChevronLeft, HelpCircle, AlertCircle, 
  CheckCircle2, Sparkles, Rocket, Save, Send, PlusCircle, Trash2, Database,
  ArrowLeft, History, ShieldCheck, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CustomToaster from '../../components/common/CustomToaster';

/**
 * --- EDIT SUBMISSION: MISSION CONTROL PROTOCOL ---
 * Purpose: High-fidelity wizard for modifying existing interview journeys.
 * Context: Pre-filled with archived datastream for rapid protocol adjustment.
 */
const EditSubmissionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme, toggleTheme, isLoading, setIsLoading } = useGlobalContext();
    const [currentStep, setCurrentStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const totalSteps = 4;

    // --- MOCK ARCHIVED DATA (Simulated Fetch) ---
    const [formData, setFormData] = useState({
        company: 'Google India',
        role: 'SDE Intern',
        prepNarrative: 'Focused heavily on distributive systems and advanced DP patterns. Used INIQ-Hub for previous cycle analysis...',
        workflowSynopsis: 'Recruiter call -> Online Assessment -> 2 Technical Rounds -> HR Sync',
        dsaArsenal: 'Graphs, DP, Segment Trees',
        hldFocus: 'Load Balancing, Sharding',
        lldFocus: 'Pattern Design, Vending Machine',
        verdict: 'Selected (Offer Accepted)',
        advice: 'Keep your fundamentals strong and focus on the reasoning behind your solutions.'
    });

    const [rounds, setRounds] = useState([
        { id: 1, title: 'Round 1: Data Structures Deep Dive', questions: 'Implement a thread-safe LRU cache...', solution: '', explanation: '', videoLink: '' },
        { id: 2, title: 'Round 2: System Design Handshake', questions: 'Design a distributed rate limiter...', solution: '', explanation: '', videoLink: '' }
    ]);

    const addRound = () => {
        const newRound = {
            id: Date.now(),
            title: `Round ${rounds.length + 1}: Technical Insight`,
            questions: '',
            solution: '',
            explanation: '',
            videoLink: ''
        };
        setRounds([...rounds, newRound]);
        toast.success('New round module added!');
    };

    const removeRound = (id) => {
        if (rounds.length === 1) {
            toast.error('Minimum one round insight required.');
            return;
        }
        setRounds(rounds.filter(r => r.id !== id));
        toast.error('Round module removed.');
    };

    const handleAction = (type) => {
        if (type === 'update') {
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                toast.success('Journey protocol globally updated!');
                navigate(`/my-submissions/${id}`);
            }, 3200);
        } else {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                toast.success('Modifications synced to local buffer.');
            }, 1500);
        }
    };

    const steps = [
        { id: 1, title: "Company Core", desc: "Identity Mod", icon: Building2 },
        { id: 2, title: "Technical Stack", desc: "Logic Re-sync", icon: Code },
        { id: 3, title: "Round Insights", desc: "Deep-Dive Buff", icon: Rocket },
        { id: 4, title: "Final Verdict", desc: "Legacy Save", icon: CheckCircle2 },
    ];

    return (
        <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <CustomToaster />
            <AnimatePresence>
                {showSuccess && <SuccessAnimation />}
            </AnimatePresence>
            
            <div className="h-full w-full flex overflow-hidden">
                
                {/* --- LEFT PANEL: THE RADAR SIDEBAR --- */}
                <div className="w-72 border-r border-border/40 border-l-[3px] border-l-emerald-500/10 bg-surface/5 flex flex-col p-10 shrink-0 relative z-20 overflow-y-auto no-scrollbar">
                    
                    <div className="flex flex-col gap-6 mb-12">
                         <button 
                            onClick={() => navigate('/my-submissions')}
                            className="size-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary transition-all active:scale-90"
                        >
                            <ArrowLeft className="size-5" />
                        </button>
                        <div className="flex flex-col gap-1.5">
                            <h1 className="text-xl font-black text-content tracking-tighter italic uppercase leading-none">Modify_Protocol</h1>
                            <div className="flex items-center gap-1.5 ml-0.5">
                                <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-emerald-500/60 uppercase">Protocol: #{id}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-7 flex-1 ml-1">
                        {steps.map((step) => (
                            <button 
                                key={step.id}
                                onClick={() => setCurrentStep(step.id)}
                                className={`flex items-start gap-4 transition-all group relative ${
                                    currentStep === step.id ? 'opacity-100' : 'opacity-25 hover:opacity-100'
                                }`}
                            >
                                {step.id < totalSteps && (
                                    <div className={`absolute left-4.5 top-10 w-[1px] h-7 transition-colors ${
                                        currentStep > step.id ? 'bg-emerald-500/40' : 'bg-border/30'
                                    }`} />
                                )}

                                <div className={`size-9 rounded-xl flex items-center justify-center transition-all ${
                                    currentStep === step.id 
                                        ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 scale-105' 
                                        : 'bg-surface/50 border border-border text-text-muted group-hover:border-emerald-500/40'
                                }`}>
                                    <step.icon className="size-4.5" />
                                </div>
                                <div className="flex flex-col text-left pt-0.5">
                                    <span className="text-[10px] font-black text-content uppercase tracking-[0.1em]">{step.title}</span>
                                    <span className="text-[8px] font-bold text-text-muted opacity-60 leading-none mt-1">{step.desc}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-border/40">
                         <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface/40 border border-border/40">
                             <History className="size-4 text-primary opacity-60" />
                             <div className="flex flex-col">
                                <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">Last Revision</span>
                                <span className="text-[9px] font-bold text-content whitespace-nowrap">05 APR 2026</span>
                             </div>
                         </div>
                    </div>
                </div>

                {/* --- RIGHT PANEL: THE COMMAND CANVAS --- */}
                <div className="flex-1 flex flex-col min-w-0 bg-surface/[0.02] relative overflow-hidden">
                    
                    {/* Header Strip */}
                    <div className="h-20 border-b border-border/40 px-10 flex items-center justify-between shrink-0 bg-background/5 backdrop-blur-sm relative z-10">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 text-[8px] font-black text-emerald-500 uppercase tracking-[0.2em] opacity-80 mb-1">
                                <ShieldCheck className="size-2.5" />
                                Revision Mode // Phase {currentStep}
                            </div>
                            <h2 className="text-lg font-black text-content font-['Sora'] tracking-tight leading-none uppercase italic">{steps[currentStep-1].title} Alignment</h2>
                        </div>
                        <div className="flex items-center gap-4">
                            {currentStep === 3 && (
                                <button onClick={addRound} className="px-6 py-3 rounded-xl bg-surface border border-border text-primary text-[10px] font-black uppercase tracking-widest hover:border-primary/40 transition-all flex items-center gap-2">
                                    <PlusCircle className="size-4" />
                                    Insert Insight Node
                                </button>
                            )}
                            <button 
                                onClick={() => handleAction('update')}
                                className="px-8 py-3 rounded-xl bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-3"
                            >
                                <Zap className="size-4" />
                                Update Protocol
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 min-h-0 overflow-hidden relative z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.3 }}
                                className="h-full w-full overflow-hidden p-10 flex flex-col"
                            >
                                <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 h-full">
                                    
                                    {currentStep === 1 && (
                                        <div className="space-y-10">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <EditField 
                                                    label="Journey Target (Company)" 
                                                    value={formData.company} 
                                                    icon={Building2}
                                                    onChange={(v) => setFormData({...formData, company: v})}
                                                />
                                                <EditField 
                                                    label="Deployed Role" 
                                                    value={formData.role} 
                                                    icon={Briefcase}
                                                    onChange={(v) => setFormData({...formData, role: v})}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">Preparation Intelligence</label>
                                                <textarea 
                                                    value={formData.prepNarrative}
                                                    onChange={(e) => setFormData({...formData, prepNarrative: e.target.value})}
                                                    className="w-full min-h-[220px] p-8 rounded-[2.5rem] bg-surface/40 border border-border/40 focus:border-emerald-500/40 focus:bg-surface/60 outline-none transition-all text-sm font-bold text-content leading-relaxed caret-emerald-500 resize-none shadow-sm"
                                                ></textarea>
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 2 && (
                                        <div className="space-y-10">
                                            <div className="flex flex-col gap-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">Process Flow Re-sync</label>
                                                <textarea 
                                                    value={formData.workflowSynopsis}
                                                    onChange={(e) => setFormData({...formData, workflowSynopsis: e.target.value})}
                                                    className="w-full min-h-[160px] p-8 rounded-[2.5rem] bg-surface/40 border border-border/40 focus:border-emerald-500/40 outline-none transition-all text-sm font-bold text-content leading-relaxed caret-emerald-500 resize-none shadow-sm"
                                                ></textarea>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <EditField label="DSA Stack" value={formData.dsaArsenal} icon={Code} onChange={(v) => setFormData({...formData, dsaArsenal: v})} />
                                                <EditField label="Arch-HLD" value={formData.hldFocus} icon={Layout} onChange={(v) => setFormData({...formData, hldFocus: v})} />
                                                <EditField label="Arch-LLD" value={formData.lldFocus} icon={AlertCircle} onChange={(v) => setFormData({...formData, lldFocus: v})} />
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 3 && (
                                        <div className="h-full flex flex-col min-h-0">
                                            <div className="flex flex-col mb-8 shrink-0">
                                                <h3 className="text-lg font-black text-content italic leading-none">Modified Round Architecture</h3>
                                                <p className="text-[9px] font-bold text-text-muted opacity-60 uppercase tracking-widest mt-1">Refining technical depth</p>
                                            </div>

                                            <div className="flex-1 overflow-y-auto no-scrollbar pr-2 -mr-2 space-y-6 pb-6">
                                                {rounds.map((round, idx) => (
                                                    <motion.div 
                                                        key={round.id}
                                                        layout
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="p-8 rounded-[2.5rem] bg-surface/40 border border-border/40 relative group"
                                                    >
                                                        <div className="flex items-center justify-between mb-8">
                                                            <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest">SUB-MODULE R-{idx + 1}</span>
                                                            <button onClick={() => removeRound(round.id)} className="p-2 rounded-lg text-text-muted hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                                <Trash2 className="size-4" />
                                                            </button>
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-8">
                                                            <EditField label="Specialization Alignment" value={round.title} icon={Sparkles} onChange={() => {}} />
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                                <div className="flex flex-col gap-3">
                                                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60 ml-1">Refined Questions</label>
                                                                    <textarea defaultValue={round.questions} className="w-full min-h-[120px] p-6 rounded-3xl bg-surface/40 border border-border/40 focus:border-emerald-500 outline-none transition-all text-xs font-bold text-content resize-none caret-emerald-500"></textarea>
                                                                </div>
                                                                <div className="flex flex-col gap-3">
                                                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60 ml-1">Updated Resolution</label>
                                                                    <textarea className="w-full min-h-[120px] p-6 rounded-3xl bg-surface/40 border border-border/40 focus:border-emerald-500 outline-none transition-all text-xs font-mono text-content resize-none caret-emerald-500" placeholder="Update technical approach..."></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 4 && (
                                        <div className="space-y-10">
                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="flex flex-col gap-3">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">Lifecycle Verdict Alignment</label>
                                                    <select value={formData.verdict} onChange={(e) => setFormData({...formData, verdict: e.target.value})} className="w-full p-6 rounded-[2rem] bg-surface/40 border border-border/40 focus:border-emerald-500 focus:bg-surface/60 outline-none transition-all text-sm font-bold text-content appearance-none cursor-pointer caret-emerald-500 shadow-sm">
                                                        <option>Selected (Offer Accepted)</option>
                                                        <option>Selected (Offer Declined)</option>
                                                        <option>Rejected</option>
                                                        <option>Waiting List</option>
                                                    </select>
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">Refined Legacy Advice</label>
                                                    <textarea 
                                                        value={formData.advice}
                                                        onChange={(e) => setFormData({...formData, advice: e.target.value})}
                                                        className="w-full min-h-[220px] p-8 rounded-[2.5rem] bg-surface/40 border border-border/40 focus:border-emerald-500/40 focus:bg-surface/60 outline-none transition-all text-sm font-bold text-content leading-relaxed caret-emerald-500 resize-none shadow-sm"
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Unified Canvas Navigation */}
                    <div className="h-24 border-t border-border/40 px-12 flex items-center justify-between shrink-0 bg-background/20 backdrop-blur-sm relative z-10 shadow-2xl">
                        <button 
                            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                            disabled={currentStep === 1}
                            className={`flex items-center gap-3 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                currentStep === 1 
                                    ? 'opacity-20 pointer-events-none' 
                                    : 'bg-surface border border-border text-text-muted hover:text-emerald-500 hover:border-emerald-500/40'
                            }`}
                        >
                            <ChevronLeft className="size-4" />
                            Return Phase
                        </button>

                        <div className="flex items-center gap-3">
                            {[1, 2, 3, 4].map(s => (
                                <div key={s} className={`h-1.5 rounded-full transition-all duration-700 ${currentStep === s ? 'w-12 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'w-3 bg-border/40'}`} />
                            ))}
                        </div>

                        <button 
                            onClick={() => {
                                if (currentStep === totalSteps) {
                                    handleAction('update');
                                } else {
                                    setCurrentStep(prev => Math.min(totalSteps, prev + 1));
                                }
                            }}
                            className={`flex items-center gap-4 px-12 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl ${
                                currentStep === totalSteps 
                                    ? 'bg-emerald-500 text-white shadow-emerald-500/25 hover:-translate-y-1 active:scale-95' 
                                    : 'bg-primary text-white shadow-primary/25 hover:-translate-y-1 active:scale-95'
                            }`}
                        >
                            {currentStep === totalSteps ? 'Finalize Protocol' : 'Next alignment'}
                            <ChevronRight className="size-4" />
                        </button>
                    </div>
                </div>

            </div>
        </UserAppShell>
    );
};

// --- PRIVATE COMPONENTS ---

const EditField = ({ label, value, icon: Icon, onChange }) => (
    <div className="flex flex-col gap-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">{label}</label>
        <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 size-5 flex items-center justify-center transition-all">
                <Icon className="size-full text-emerald-500/40 group-focus-within:text-emerald-500" />
            </div>
            <input 
                type="text" 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full py-5 pl-16 pr-8 rounded-[1.75rem] bg-surface/40 border border-border/40 focus:border-emerald-500/60 focus:bg-surface/60 outline-none transition-all text-sm font-bold text-content placeholder:text-text-muted/30 shadow-sm caret-emerald-500"
            />
        </div>
    </div>
);

const SuccessAnimation = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex items-center justify-center bg-background/60 backdrop-blur-xl p-6"
        >
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-sm bg-surface border border-white/10 rounded-[3rem] p-12 shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col items-center gap-8 relative overflow-hidden"
            >
                 <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_center,_var(--primary)_1px,transparent_1px)] bg-[length:15px_15px]" />
                 <div className="size-28 rounded-[2.5rem] bg-emerald-500 flex items-center justify-center shadow-[0_20px_50px_rgba(16,185,129,0.4)] relative z-10 transition-transform duration-700 hover:rotate-12">
                    <Zap className="size-12 text-white" />
                 </div>
                 <div className="text-center relative z-10">
                    <h2 className="text-2xl font-black text-content italic uppercase tracking-tight mb-2">Protocol Modified.</h2>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] font-mono">Archive Synchronized Successfully</p>
                 </div>
            </motion.div>
        </motion.div>
    );
};

export default EditSubmissionPage;
