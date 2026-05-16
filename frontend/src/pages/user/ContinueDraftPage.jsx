import React, { useState } from 'react';
import { 
  Building2, Briefcase, FileText, Code, Layout, Video, 
  ChevronRight, ChevronLeft, HelpCircle, AlertCircle, 
  CheckCircle2, Sparkles, Rocket, Save, Send, PlusCircle, Trash2, ArrowLeft, Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

/**
 * --- CONTINUE DRAFT: REDESIGNED MISSION HUB ---
 * Strategy: Split-panel vertical navigation for prefilled drafts.
 * Highlights: Stable metadata panel + High-fidelity editing canvas.
 */
const ContinueDraftPage = () => {
    const { theme, toggleTheme, isLoading, setIsLoading } = useGlobalContext();
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentStep, setCurrentStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const totalSteps = 4;

    // PREFILLED DRAFT DATA
    const [rounds, setRounds] = useState([
        { id: 1, title: 'Round 1: Preliminary Technical', questions: 'Arrays & Strings logic.', solution: '', explanation: '', videoLink: '' },
        { id: 2, title: 'Round 2: System Design Phase', questions: 'Scalable messaging system.', solution: '', explanation: '', videoLink: '' }
    ]);

    const addRound = () => {
        const newRound = {
            id: Date.now(),
            title: `Round ${rounds.length + 1}: Module`,
            questions: '',
            solution: '',
            explanation: '',
            videoLink: ''
        };
        setRounds([...rounds, newRound]);
        toast.success('Draft module updated.');
    };

    const removeRound = (id) => {
        if (rounds.length === 1) {
            toast.error('Draft must contain at least one module.');
            return;
        }
        setRounds(rounds.filter(r => r.id !== id));
        toast.error('Module removed from draft.');
    };

    const handleAction = (type) => {
        if (type === 'submit') {
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                setCurrentStep(1); // Reset to Step 1
                toast.success('Experience published to INIQ community!');
                // navigate('/my-submissions'); // Keep on page as requested for reset to step 1
            }, 3200);
        } else {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                toast.success('Progress synced to drafts.');
            }, 1500);
        }
    };

    const steps = [
        { id: 1, title: "Draft Identity", desc: "Prefilled Basic Info", icon: Building2 },
        { id: 2, title: "Logic Stack", desc: "Process & Topics", icon: Code },
        { id: 3, title: "Refine Rounds", desc: "Module Management", icon: Rocket },
        { id: 4, title: "Finalized Verdict", desc: "Advice & Results", icon: CheckCircle2 },
    ];

    return (
        <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <AnimatePresence>
                {showSuccess && <SuccessAnimation />}
            </AnimatePresence>
            <Toaster 
                position="top-right" 
                containerStyle={{ top: 90 }}
                toastOptions={{
                    style: {
                        background: 'rgba(23, 23, 23, 0.8)',
                        color: '#fff',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        fontSize: '11px',
                        fontWeight: '900',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        borderRadius: '16px',
                        padding: '12px 20px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                        zIndex: 9999,
                    },
                    success: {
                        iconTheme: { primary: '#6366f1', secondary: '#fff' },
                    }
                }}
            />
            
            {/* 🚀 REDESIGNED MISSION HUB WRAPPER */}
            <div className="h-full w-full flex overflow-hidden">
                
                {/* --- LEFT PANEL: THE DRAFT RADAR (Clearly Separated) --- */}
                <div className="w-72 border-r border-border/40 border-l-[3px] border-l-primary/10 bg-surface/5 flex flex-col p-10 shrink-0 relative z-20">
                    <button 
                        onClick={() => navigate('/drafts')}
                        className="flex items-center gap-2 text-[9px] font-black text-text-muted hover:text-primary transition-all uppercase tracking-widest mb-8 group"
                    >
                        <ArrowLeft className="size-3 group-hover:-translate-x-1 transition-transform" />
                        Back to Vault
                    </button>

                    <div className="flex flex-col gap-1.5 mb-10">
                        <h1 className="text-xl font-black text-content tracking-tighter italic">DRAFT.LOG</h1>
                        <div className="flex items-center gap-1.5 ml-0.5">
                            <div className="size-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-[0.15em] text-text-muted opacity-40">Revision Active</span>
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
                                        currentStep > step.id ? 'bg-primary' : 'bg-border/30'
                                    }`} />
                                )}

                                <div className={`size-9 rounded-xl flex items-center justify-center transition-all ${
                                    currentStep === step.id 
                                        ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-105' 
                                        : 'bg-surface/50 border border-border text-text-muted group-hover:border-primary/40'
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

                    <div className="mt-auto">
                        <button 
                            onClick={() => handleAction('draft')}
                            className="w-full py-3.5 rounded-xl bg-surface/50 border border-border/40 text-[9px] font-black uppercase tracking-widest text-text-muted hover:text-primary hover:border-primary transition-all flex items-center justify-center gap-2"
                        >
                            <Save className="size-3.5" />
                            Sync Protocol
                        </button>
                    </div>
                </div>

                    {/* --- RIGHT PANEL: THE EDITING CANVAS --- */}
                    <div className="flex-1 flex flex-col min-w-0 bg-surface/[0.02] relative overflow-hidden">
                        
                        {/* Optimized Atmospheric Effects */}
                        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[80px] pointer-events-none opacity-20 translate-x-1/4 -translate-y-1/4" />
                        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-[60px] pointer-events-none opacity-15 -translate-x-1/4 translate-y-1/4" />

                    {/* Canvas Header */}
                    <div className="h-20 border-b border-border/40 px-10 flex items-center justify-between shrink-0 bg-background/5 backdrop-blur-sm relative z-10">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 text-[8px] font-black text-primary uppercase tracking-[0.2em] opacity-80 mb-1">
                                <Rocket className="size-2.5" />
                                Revision Mode {currentStep}/04
                            </div>
                            <h2 className="text-lg font-black text-content font-['Sora'] tracking-tight leading-none uppercase italic">{steps[currentStep-1].title}</h2>
                        </div>
                        <div className="flex items-center gap-4">
                            {currentStep === 3 && (
                                <button 
                                    onClick={addRound}
                                    className="px-6 py-3 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2"
                                >
                                    <PlusCircle className="size-4" />
                                    Add Round Module
                                </button>
                            )}
                            {currentStep === totalSteps && (
                                <button 
                                    onClick={() => handleAction('submit')}
                                    className="px-6 py-3 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2"
                                >
                                    <Send className="size-4" />
                                    Submit Protocol
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Canvas Body (Optimized for performance) */}
                    <div className="flex-1 min-h-0 overflow-hidden relative z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                className="h-full w-full overflow-hidden p-8 md:p-10 will-change-transform flex flex-col"
                            >
                                <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 h-full">
                                    {currentStep === 1 && (
                                        <div className="space-y-10">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <FormField label="Company Intelligence" defaultValue="Amazon" icon={Building2} />
                                                <FormField label="Prefilled Role" defaultValue="Frontend Developer" icon={Briefcase} />
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">Preparation Narrative</label>
                                                <textarea 
                                                    className="w-full min-h-[220px] p-8 rounded-[2.5rem] bg-surface/40 border border-border/40 focus:border-primary/60 focus:bg-surface/60 outline-none transition-all text-sm font-bold text-content leading-relaxed placeholder:text-text-muted/30 caret-primary resize-none shadow-sm"
                                                    defaultValue="Preparation took around 3 months. Primarily used LeetCode for DSA."
                                                ></textarea>
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 2 && (
                                        <div className="space-y-10">
                                            <div className="flex flex-col gap-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">Draft Process Synopsis</label>
                                                <textarea 
                                                    className="w-full min-h-[160px] p-8 rounded-[2.5rem] bg-surface/40 border border-border/40 focus:border-primary/60 focus:bg-surface/60 outline-none transition-all text-sm font-bold text-content leading-relaxed placeholder:text-text-muted/30 caret-primary resize-none shadow-sm"
                                                    defaultValue="The process was smooth. 1 recruiter call followed by 4 technical rounds."
                                                ></textarea>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <FormField label="DSA Arsenal" defaultValue="Arrays, Hashmaps" icon={Code} />
                                                <FormField label="Scale Focus (HLD)" defaultValue="Load Balancing" icon={Layout} />
                                                <FormField label="Logic Focus (LLD)" defaultValue="SOLID, Factory" icon={AlertCircle} />
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 3 && (
                                        <div className="h-full flex flex-col min-h-0">
                                            <div className="flex flex-col mb-8 shrink-0">
                                                <h3 className="text-lg font-black text-content italic leading-none">Round Revision</h3>
                                                <p className="text-[9px] font-bold text-text-muted opacity-60 uppercase tracking-widest mt-1">Modifying technical modules</p>
                                            </div>

                                            <div className="flex-1 overflow-y-auto no-scrollbar pr-2 -mr-2 space-y-6 pb-6">
                                                {rounds.map((round, idx) => (
                                                    <motion.div 
                                                        key={round.id}
                                                        layout
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className="p-8 rounded-[2.5rem] bg-surface/40 border border-border/40 relative group"
                                                    >
                                                        <div className="flex items-center justify-between mb-8">
                                                            <span className="px-4 py-1.5 rounded-full bg-accent/10 text-accent text-[9px] font-black uppercase tracking-widest">DRAFT R-{idx + 1}</span>
                                                            <button onClick={() => removeRound(round.id)} className="p-2 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100">
                                                                <Trash2 className="size-4" />
                                                            </button>
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-8">
                                                            <FormField label="Module Title" defaultValue={round.title} icon={Sparkles} />
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                                <div className="flex flex-col gap-3">
                                                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60 ml-1">Interrogations</label>
                                                                    <textarea className="w-full min-h-[120px] p-6 rounded-3xl bg-surface/40 border border-border/40 focus:border-primary outline-none transition-all text-xs font-bold text-content resize-none caret-primary" defaultValue={round.questions}></textarea>
                                                                </div>
                                                                <div className="flex flex-col gap-3">
                                                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60 ml-1">Resolution Strategy</label>
                                                                    <textarea className="w-full min-h-[120px] p-6 rounded-3xl bg-surface/40 border border-border/40 focus:border-primary outline-none transition-all text-xs font-mono text-content resize-none caret-primary" defaultValue={round.solution} placeholder="Add approach..."></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 4 && (
                                        <div className="space-y-8">
                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="flex flex-col gap-3">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">Verdict Revision</label>
                                                    <select className="w-full p-6 rounded-[2rem] bg-surface/40 border border-border/40 focus:border-primary focus:bg-surface/60 outline-none transition-all text-sm font-bold text-content appearance-none cursor-pointer caret-primary shadow-sm">
                                                        <option>Selected (Offer Accepted)</option>
                                                        <option selected>Thinking (Pending Update)</option>
                                                        <option>Rejected</option>
                                                    </select>
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">Refined Advice</label>
                                                    <textarea 
                                                        className="w-full min-h-[180px] p-8 rounded-[2.5rem] bg-surface/40 border border-border/40 focus:border-primary focus:bg-surface/60 outline-none transition-all text-sm font-bold text-content leading-relaxed placeholder:text-text-muted/30 caret-primary resize-none"
                                                        placeholder="Provide prep pointers..."
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Canvas Footer */}
                    <div className="h-20 border-t border-border/40 px-12 flex items-center justify-between shrink-0 bg-background/5 backdrop-blur-sm relative z-10">
                        <button 
                            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                            disabled={currentStep === 1}
                            className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                currentStep === 1 
                                    ? 'opacity-20 pointer-events-none' 
                                    : 'bg-surface border border-border text-text-muted hover:text-primary hover:border-primary/40'
                            }`}
                        >
                            <ChevronLeft className="size-4" />
                            Previous Module
                        </button>

                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4].map(s => (
                                <div key={s} className={`h-1 rounded-full transition-all duration-500 ${currentStep === s ? 'w-8 bg-primary shadow-lg shadow-primary/20' : 'w-2 bg-border/40'}`} />
                            ))}
                        </div>

                        <button 
                            onClick={() => {
                                if (currentStep === totalSteps) {
                                    handleAction('submit');
                                } else {
                                    setCurrentStep(prev => Math.min(totalSteps, prev + 1));
                                }
                            }}
                            className={`flex items-center gap-3 px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl ${
                                currentStep === totalSteps 
                                    ? 'bg-primary text-white shadow-primary/25 hover:-translate-y-0.5 active:scale-95' 
                                    : 'bg-primary text-white shadow-primary/25 hover:-translate-y-0.5 active:scale-95'
                            }`}
                        >
                            {currentStep === totalSteps ? 'Submit Protocol' : 'Advance Module'}
                            <ChevronRight className="size-4" />
                        </button>
                    </div>
                </div>

            </div>
        </UserAppShell>
    );
};

// UI UTILS
const SuccessAnimation = () => {
    const [phase, setPhase] = useState('authenticating');

    React.useEffect(() => {
        const sequence = [
            { name: 'authenticating', delay: 800 },
            { name: 'encrypting', delay: 1800 },
            { name: 'deploying', delay: 2800 }
        ];

        sequence.forEach((step, index) => {
            setTimeout(() => setPhase(step.name), step.delay);
        });
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex items-center justify-center bg-background/60 backdrop-blur-xl overflow-hidden p-6"
        >
            <motion.div 
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="w-full max-w-sm bg-surface border border-white/10 rounded-[3rem] p-12 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col items-center"
            >
                {/* Holographic background noise */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
                
                <div className="relative z-10 w-full flex flex-col items-center">
                    <AnimatePresence mode="wait">
                        {phase !== 'deploying' ? (
                            <motion.div 
                                key="scanning"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 1 }}
                                className="flex flex-col items-center w-full"
                            >
                                <div className="size-24 rounded-[2rem] bg-primary/5 border border-primary/20 flex items-center justify-center relative mb-10 overflow-hidden">
                                    <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 border-t-2 border-primary rounded-[2rem]"
                                    />
                                    {phase === 'authenticating' ? (
                                        <Database className="size-10 text-primary" />
                                    ) : (
                                        <CheckCircle2 className="size-10 text-primary" />
                                    )}
                                    {/* Scan Line */}
                                    <motion.div 
                                        animate={{ top: ['-10%', '110%'] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-x-0 h-2 bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-sm"
                                    />
                                </div>

                                <div className="flex flex-col gap-3 w-full">
                                    <div className="flex items-center justify-between px-2">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{phase}...</span>
                                        <span className="text-[10px] font-black text-text-muted opacity-40">{phase === 'authenticating' ? '45%' : '88%'}</span>
                                    </div>
                                    <div className="h-1 w-full bg-surface-hover rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: phase === 'authenticating' ? '45%' : '88%' }}
                                            className="h-full bg-primary shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                                        />
                                    </div>
                                    <p className="text-[9px] font-bold text-text-muted opacity-60 uppercase tracking-widest text-center mt-2 italic">Securing Journey Nodes</p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="success"
                                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ type: "spring", damping: 12 }}
                                className="flex flex-col items-center text-center"
                            >
                                <motion.div 
                                    animate={{ rotate: [-45, -45], y: [-5, 5, -5] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="size-28 rounded-[2.5rem] bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_20px_50px_rgba(99,102,241,0.4)] mb-8 border-2 border-white/20 relative"
                                >
                                    <Rocket className="size-12 text-white drop-shadow-lg" />
                                    <motion.div 
                                        animate={{ opacity: [0, 1, 0], scale: [1, 2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-xl -z-10"
                                    />
                                </motion.div>

                                <h2 className="text-2xl font-black text-content italic uppercase tracking-tight leading-none mb-3">Protocol Live.</h2>
                                <div className="py-2 px-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-2">
                                    <div className="size-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse" />
                                    <span className="text-[9px] font-black text-green-500 uppercase tracking-[0.3em]">Encryption Complete</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};

const FormField = ({ label, placeholder, defaultValue, icon: Icon }) => (
    <div className="flex flex-col gap-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">{label}</label>
        <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 size-5 flex items-center justify-center transition-all">
                <Icon className="size-full text-primary/40 group-focus-within:text-primary" />
            </div>
            <input 
                type="text" 
                placeholder={placeholder}
                defaultValue={defaultValue}
                className="w-full py-5 pl-16 pr-8 rounded-[1.75rem] bg-surface/40 border border-border/40 focus:border-primary/60 focus:bg-surface/60 outline-none transition-all text-sm font-bold text-content placeholder:text-text-muted/30 shadow-sm caret-primary"
            />
        </div>
    </div>
);

export default ContinueDraftPage;
