import React, { useState, useEffect } from 'react';
import { 
  Building2, Briefcase, FileText, Code, Layout, Video, 
  ChevronRight, ChevronLeft, HelpCircle, AlertCircle, 
  CheckCircle2, Sparkles, Rocket, Save, Send, PlusCircle, Trash2, Database,
  Plus, Activity, ChevronDown, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import toast from 'react-hot-toast';
import CustomToaster from '../../components/common/CustomToaster';
import CustomSelect from '../../components/common/CustomSelect';

/**
 * --- SUBMIT EXPERIENCE: REDESIGNED MISSION CONTROL ---
 * Strategy: Split-panel navigation, high-fidelity glassmorphism, 
 * and persistent journey metadata. 
 * Design: Side-navigation stepper + Fixed-canvas form.
 */
const SubmitExperiencePage = () => {
  const { theme, toggleTheme, isLoading, setIsLoading } = useGlobalContext();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    experienceLevel: 'Entry Level',
    candidateExperience: '',
    location: 'Remote',
    salary: '',
    interviewMode: 'Online',
    applicationMethod: 'Off-campus',
    summary: '',
    processOverview: '',
    topics: {
      dsa: '',
      hld: '',
      lld: ''
    },
    rounds: [
      { id: Date.now(), title: 'Round 1: Initial Technical Screening', questions: '', solution: '', explanation: '', videoLink: '' }
    ],
    difficulty: 'Medium',
    verdict: 'Selected',
    advice: ''
  });

  const [expandedRoundId, setExpandedRoundId] = useState(formData.rounds[0].id);

  const [companies, setCompanies] = useState([]);
  const [showNewCompanyInput, setShowNewCompanyInput] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');

  const [roles, setRoles] = useState([]);
  const [showNewRoleInput, setShowNewRoleInput] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');

  useEffect(() => {
    fetchCompanies();
    fetchRoles();
  }, []);

  // Ensure Round 1 is expanded when entering the Rounds step
  useEffect(() => {
    if (currentStep === 3 && formData.rounds.length > 0) {
      setExpandedRoundId(formData.rounds[0].id);
    }
  }, [currentStep]);

  const fetchCompanies = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/companies');
      const data = await res.json();
      setCompanies(data);
    } catch (err) {
      toast.error('Failed to load companies');
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/roles');
      const data = await res.json();
      setRoles(data);
    } catch (err) {
      toast.error('Failed to load roles');
    }
  };

  const addRound = () => {
    const newId = Date.now();
    const newRound = {
      id: newId,
      title: `Round ${formData.rounds.length + 1}: Technical`,
      questions: '',
      solution: '',
      explanation: '',
      videoLink: ''
    };
    setFormData({
      ...formData,
      rounds: [...formData.rounds, newRound]
    });
    // setExpandedRoundId(newId); // Removed to keep focus on Round 1
    toast.success('New round module added!');
  };

  const removeRound = (id) => {
    if (formData.rounds.length === 1) {
      toast.error('Minimum one round insight required.');
      return;
    }
    setFormData({
      ...formData,
      rounds: formData.rounds.filter(r => r.id !== id)
    });
    toast.error('Round module removed.');
  };

  const handleRoundChange = (id, field, value) => {
    setFormData({
      ...formData,
      rounds: formData.rounds.map(r => r.id === id ? { ...r, [field]: value } : r)
    });
  };

  const handleAction = async (type) => {
    if (type === 'submit') {
        const token = localStorage.getItem('iniq_token');
        
        let finalCompany = formData.company;
        if (showNewCompanyInput && newCompanyName) {
            try {
                const compRes = await fetch('http://localhost:5000/api/companies', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ name: newCompanyName })
                });
                const compData = await compRes.json();
                if (compRes.ok) {
                    finalCompany = compData.name;
                } else {
                    toast.error(compData.error || 'Failed to register company');
                    return;
                }
            } catch (err) {
                toast.error('Error adding company');
                return;
            }
        }

        if (!finalCompany) {
            toast.error('Please select or enter a company');
            return;
        }

        let finalRole = formData.role;
        if (showNewRoleInput && newRoleName) {
            try {
                const roleRes = await fetch('http://localhost:5000/api/roles', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ name: newRoleName })
                });
                const roleData = await roleRes.json();
                if (roleRes.ok) {
                    finalRole = roleData.name;
                } else {
                    toast.error(roleData.error || 'Failed to register role');
                    return;
                }
            } catch (err) {
                toast.error('Error adding role');
                return;
            }
        }

        if (!finalRole) {
            toast.error('Please select or enter a role');
            return;
        }

        if (formData.candidateExperience === '' || isNaN(Number(formData.candidateExperience))) {
            toast.error('Please enter a valid number for Years of Experience');
            setCurrentStep(1);
            return;
        }

        if (!formData.processOverview || !formData.processOverview.trim()) {
            toast.error('Please provide a Process Overview');
            setCurrentStep(2);
            return;
        }

        // Validate rounds
        const invalidRound = formData.rounds.find(r => !r.title.trim() || !r.questions.trim());
        if (invalidRound) {
            toast.error('Please ensure all rounds have a title and questions');
            setCurrentStep(3);
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/experiences/submit-experience', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    ...formData, 
                    company: finalCompany, 
                    role: finalRole,
                    candidateExperience: Number(formData.candidateExperience) || 0
                })
            });

            if (res.ok) {
                setShowSuccess(true);
                toast.success('Journey synchronized. Awaiting administrative approval.');
                setTimeout(() => {
                    setShowSuccess(false);
                    setCurrentStep(1); 
                    setFormData({
                        company: '',
                        role: '',
                        experienceLevel: 'Entry Level',
                        candidateExperience: '',
                        location: 'Remote',
                        salary: '',
                        interviewMode: 'Online',
                        applicationMethod: 'Off-campus',
                        summary: '',
                        processOverview: '',
                        topics: { dsa: '', hld: '', lld: '' },
                        rounds: [{ id: Date.now(), title: 'Round 1: Initial Technical Screening', questions: '', solution: '', explanation: '', videoLink: '' }],
                        difficulty: 'Medium',
                        verdict: 'Selected',
                        advice: ''
                    });
                    navigate('/dashboard');
                }, 3200);
            } else {
                const data = await res.json();
                toast.error(data.error || 'Failed to submit experience');
            }
        } catch (err) {
            toast.error('Server error');
        }
    } else {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast.success('Progress synced to drafts.');
        }, 1500);
    }
  };

  const steps = [
    { id: 1, title: "Company Core", desc: "Identity & Prep", icon: Building2 },
    { id: 2, title: "Technical Stack", desc: "Process & Topics", icon: Code },
    { id: 3, title: "Round Insights", desc: "Detailed Q&A", icon: Rocket },
    { id: 4, title: "Final Verdict", desc: "Results & Advice", icon: CheckCircle2 },
  ];

  return (
    <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
      <CustomToaster />
      <AnimatePresence>
        {showSuccess && <SuccessAnimation />}
      </AnimatePresence>
      
      {/* 🚀 REDESIGNED MISSION CONTROL WRAPPER */}
      <div className="h-full w-full flex overflow-hidden">
        
        {/* --- LEFT PANEL: THE RADAR SIDEBAR (Clearly Separated) --- */}
        <div className="w-72 border-r border-border/40 border-l-[3px] border-l-primary/10 bg-surface/5 flex flex-col p-10 shrink-0 relative z-20">
            <div className="flex flex-col gap-1.5 mb-10">
                <h1 className="text-xl font-black text-content tracking-tighter italic">JOURNEY.LOG</h1>
                <div className="flex items-center gap-1.5 ml-0.5">
                    <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-text-muted opacity-40">Protocol Active</span>
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
                        {/* Interactive Line */}
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

        {/* --- RIGHT PANEL: THE COMMAND CANVAS --- */}
        <div className="flex-1 flex flex-col min-w-0 bg-surface/[0.02] relative overflow-hidden">
            
            {/* Optimized Background Glows (Lighter impact) */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[80px] pointer-events-none opacity-20 translate-x-1/4 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-[60px] pointer-events-none opacity-15 -translate-x-1/4 translate-y-1/4" />

            {/* Canvas Header */}
            <div className="h-18 border-b border-border/40 px-10 flex items-center justify-between shrink-0 bg-background/5 backdrop-blur-sm relative z-10">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-[8px] font-black text-primary uppercase tracking-[0.2em] opacity-80 mb-0.5">
                        <Rocket className="size-2.5" />
                        Module Entry {currentStep}/04
                    </div>
                    <h2 className="text-base font-black text-content font-['Sora'] tracking-tight leading-none uppercase italic">{steps[currentStep-1].title}</h2>
                </div>
                <div className="flex items-center gap-4">
                    {currentStep === 3 && (
                        <button 
                            onClick={addRound}
                            className="px-6 py-3 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2"
                        >
                            <PlusCircle className="size-4" />
                            Add Round Insight
                        </button>
                    )}
                    {currentStep === totalSteps && (
                        <button 
                            onClick={() => handleAction('submit')}
                            className="px-6 py-3 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2"
                        >
                            <PlusCircle className="size-4" />
                            Submit Experience
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
                        className="h-full w-full overflow-hidden p-4 md:p-6 will-change-transform flex flex-col"
                    >
                        <div className="max-w-4xl mx-auto w-full flex flex-col gap-2 h-full overflow-y-auto no-scrollbar">
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">Company Identity</label>
                                            {!showNewCompanyInput ? (
                                                <div className="flex gap-2">
                                                    <CustomSelect 
                                                        value={formData.company}
                                                        onChange={(val) => setFormData({...formData, company: val})}
                                                        options={companies.map(c => ({ value: c.name, label: c.name }))}
                                                        placeholder="Select Company"
                                                        icon={Building2}
                                                    />
                                                    <button 
                                                        onClick={() => setShowNewCompanyInput(true)}
                                                        className="p-3.5 rounded-2xl bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                                                        title="Add new company"
                                                    >
                                                        <Plus className="size-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <input 
                                                        type="text" 
                                                        placeholder="New Company Name"
                                                        value={newCompanyName}
                                                        onChange={(e) => setNewCompanyName(e.target.value)}
                                                        className="flex-1 py-3 px-6 rounded-xl bg-surface/40 border border-border/40 focus:border-primary/60 outline-none transition-all text-sm font-bold text-content"
                                                    />
                                                    <button 
                                                        onClick={() => setShowNewCompanyInput(false)}
                                                        className="p-3.5 rounded-2xl bg-surface border border-border text-text-muted hover:text-red-500 transition-all"
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">Targeted Role</label>
                                            {!showNewRoleInput ? (
                                                <div className="flex gap-2">
                                                    <CustomSelect 
                                                        value={formData.role}
                                                        onChange={(val) => setFormData({...formData, role: val})}
                                                        options={roles.map(r => ({ value: r.name, label: r.name }))}
                                                        placeholder="Select Role"
                                                        icon={Briefcase}
                                                    />
                                                    <button 
                                                        onClick={() => setShowNewRoleInput(true)}
                                                        className="p-3.5 rounded-2xl bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                                                        title="Add new role"
                                                    >
                                                        <Plus className="size-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <input 
                                                        type="text" 
                                                        placeholder="New Role Name"
                                                        value={newRoleName}
                                                        onChange={(e) => setNewRoleName(e.target.value)}
                                                        className="flex-1 py-3 px-6 rounded-xl bg-surface/40 border border-border/40 focus:border-primary/60 outline-none transition-all text-sm font-bold text-content"
                                                    />
                                                    <button 
                                                        onClick={() => setShowNewRoleInput(false)}
                                                        className="p-3.5 rounded-2xl bg-surface border border-border text-text-muted hover:text-red-500 transition-all"
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">Experience Level</label>
                                            <CustomSelect 
                                                value={formData.experienceLevel}
                                                onChange={(val) => setFormData({...formData, experienceLevel: val})}
                                                options={['Entry Level', 'Mid Level', 'Senior Level', 'Internship', 'Fresh Graduate']}
                                                icon={Activity}
                                            />
                                        </div>
                                        <FormField label="Years of Experience" placeholder="e.g. 3" icon={Activity} value={formData.candidateExperience} onChange={(e) => setFormData({...formData, candidateExperience: e.target.value})} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <FormField label="Location" placeholder="e.g. Remote, Bangalore" icon={MapPin} value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                                        <FormField label="Salary / CTC (Optional)" placeholder="e.g. 15 LPA" icon={Database} value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">Interview Mode</label>
                                            <CustomSelect 
                                                value={formData.interviewMode}
                                                onChange={(val) => setFormData({...formData, interviewMode: val})}
                                                options={['Online', 'Offline', 'Hybrid']}
                                                icon={Layout}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">Application Method</label>
                                            <CustomSelect 
                                                value={formData.applicationMethod}
                                                onChange={(val) => setFormData({...formData, applicationMethod: val})}
                                                options={['Referral', 'Off-campus', 'On-campus', 'LinkedIn', 'Career Portal']}
                                                icon={FileText}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-8">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="size-2 rounded-full bg-primary" />
                                            <label className="text-xs font-bold uppercase tracking-widest text-primary font-['Space_Grotesk']">01. Interview Process Overview</label>
                                        </div>
                                        <textarea 
                                            value={formData.processOverview}
                                            onChange={(e) => setFormData({...formData, processOverview: e.target.value})}
                                            className="w-full min-h-[140px] p-5 rounded-2xl bg-surface border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all text-sm font-medium text-content leading-relaxed placeholder:text-text-muted/40 resize-none shadow-sm"
                                            placeholder="Provide a high-level summary (3-4 lines) describing the overall interview process..."
                                        ></textarea>
                                    </div>
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="size-2 rounded-full bg-accent" />
                                            <label className="text-xs font-bold uppercase tracking-widest text-accent font-['Space_Grotesk']">02. Core Topics Explored</label>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">DSA Arsenal</label>
                                                <input 
                                                    type="text"
                                                    value={formData.topics.dsa}
                                                    onChange={(e) => setFormData({...formData, topics: {...formData.topics, dsa: e.target.value}})}
                                                    placeholder="e.g., Arrays, DP, Graphs"
                                                    className="w-full p-5 rounded-2xl bg-surface border border-border focus:border-primary outline-none text-sm font-medium transition-all"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">System Design (HLD)</label>
                                                <input 
                                                    type="text"
                                                    value={formData.topics.hld}
                                                    onChange={(e) => setFormData({...formData, topics: {...formData.topics, hld: e.target.value}})}
                                                    placeholder="e.g., Caching, Scalability"
                                                    className="w-full p-5 rounded-2xl bg-surface border border-border focus:border-primary outline-none text-sm font-medium transition-all"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">System Design (LLD)</label>
                                                <input 
                                                    type="text"
                                                    value={formData.topics.lld}
                                                    onChange={(e) => setFormData({...formData, topics: {...formData.topics, lld: e.target.value}})}
                                                    placeholder="e.g., SOLID, Patterns"
                                                    className="w-full p-5 rounded-2xl bg-surface border border-border focus:border-primary outline-none text-sm font-medium transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="flex flex-col gap-8 h-full">
                                    <div className="flex items-center justify-between shrink-0">
                                        <div>
                                            <h3 className="text-xl font-bold text-content font-['Space_Grotesk']">INTERVIEW ROUNDS</h3>
                                            <p className="text-xs text-text-muted font-medium mt-1">Each round is a separate module. Expand to edit details.</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4 pb-10">
                                        {formData.rounds.map((round, idx) => {
                                            const isExpanded = expandedRoundId === round.id;
                                            return (
                                                <div 
                                                    key={round.id}
                                                    className={`card-base group transition-all duration-300 ${isExpanded ? 'ring-1 ring-primary/40 shadow-xl shadow-primary/5' : 'hover:border-primary/30'}`}
                                                >
                                                    {/* Accordion Header */}
                                                    <div 
                                                        onClick={() => setExpandedRoundId(isExpanded ? null : round.id)}
                                                        className="p-6 flex items-center justify-between cursor-pointer select-none bg-surface/50"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className={`size-8 rounded-lg flex items-center justify-center font-bold text-xs ${isExpanded ? 'bg-primary text-white' : 'bg-surface border border-border text-text-muted'}`}>
                                                                {idx + 1}
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-bold text-content uppercase tracking-tight">{round.title || `Technical Round ${idx + 1}`}</h4>
                                                                {!isExpanded && round.questions && (
                                                                    <p className="text-[10px] text-text-muted mt-0.5 line-clamp-1 opacity-60 font-medium">{round.questions}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    removeRound(round.id);
                                                                }}
                                                                className="p-2.5 rounded-xl text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center"
                                                                title="Remove this round"
                                                            >
                                                                <Trash2 className="size-4" />
                                                            </button>
                                                            <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                                                <ChevronDown className="size-5 text-text-muted" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Accordion Content */}
                                                    <AnimatePresence>
                                                        {isExpanded && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                                className="overflow-hidden border-t border-border"
                                                            >
                                                                <div className="p-5 space-y-5 bg-surface/20">
                                                                    <div className="grid grid-cols-1 gap-6">
                                                                        <div className="flex flex-col gap-2">
                                                                            <label className="label-text">Round Title</label>
                                                                            <input 
                                                                                type="text" 
                                                                                value={round.title}
                                                                                onChange={(e) => handleRoundChange(round.id, 'title', e.target.value)}
                                                                                className="input-field font-bold"
                                                                                placeholder="e.g., Coding Round, System Design Round"
                                                                            />
                                                                        </div>
                                                                        <div className="flex flex-col gap-2">
                                                                            <label className="label-text">Questions Asked</label>
                                                                            <textarea 
                                                                                value={round.questions}
                                                                                onChange={(e) => handleRoundChange(round.id, 'questions', e.target.value)}
                                                                                className="input-field min-h-[120px] resize-none leading-relaxed" 
                                                                                placeholder="List the specific questions or problems you encountered..."
                                                                            ></textarea>
                                                                        </div>
                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                                            <div className="flex flex-col gap-2">
                                                                                <label className="label-text flex items-center gap-2">
                                                                                    Code Solution
                                                                                    <span className="text-[9px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded uppercase">Text/Code Editor Support</span>
                                                                                </label>
                                                                                <textarea 
                                                                                    value={round.solution}
                                                                                    onChange={(e) => handleRoundChange(round.id, 'solution', e.target.value)}
                                                                                    className="input-field min-h-[200px] font-mono text-xs bg-zinc-950 text-emerald-400 border-zinc-800 focus:border-emerald-500/50 resize-none leading-relaxed custom-scrollbar shadow-inner" 
                                                                                    placeholder="// Write your code solution here..."
                                                                                ></textarea>
                                                                            </div>
                                                                            <div className="flex flex-col gap-2">
                                                                                <label className="label-text">Explanation of Solution</label>
                                                                                <textarea 
                                                                                    value={round.explanation}
                                                                                    onChange={(e) => handleRoundChange(round.id, 'explanation', e.target.value)}
                                                                                    className="input-field min-h-[200px] resize-none leading-relaxed" 
                                                                                    placeholder="Provide a detailed walkthrough of your logic and approach..."
                                                                                ></textarea>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex flex-col gap-2">
                                                                            <label className="label-text">Video Explanation (Optional)</label>
                                                                            <div className="relative group/input">
                                                                                <Video className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-text-muted transition-colors group-focus-within/input:text-primary" />
                                                                                <input 
                                                                                    type="text" 
                                                                                    value={round.videoLink}
                                                                                    onChange={(e) => handleRoundChange(round.id, 'videoLink', e.target.value)}
                                                                                    className="input-field pl-12"
                                                                                    placeholder="Upload link or paste YouTube/Loom URL..."
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div className="space-y-5">
                                     <div className="flex flex-col gap-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">Process Summary (Required)</label>
                                        <textarea 
                                            value={formData.summary}
                                            onChange={(e) => setFormData({...formData, summary: e.target.value})}
                                            className="w-full min-h-[100px] p-5 rounded-xl bg-surface/40 border border-border/40 focus:border-primary focus:bg-surface/60 outline-none transition-all text-sm font-bold text-content leading-relaxed placeholder:text-text-muted/30 caret-primary resize-none"
                                            placeholder="A short, catchy summary of your interview journey (max 300 characters)..."
                                            maxLength={300}
                                        ></textarea>
                                        <div className="flex justify-end px-2">
                                            <span className={`text-[10px] font-bold ${formData.summary.length > 280 ? 'text-red-500' : 'text-text-muted opacity-40'}`}>
                                                {formData.summary.length} / 300
                                            </span>
                                        </div>
                                    </div>
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">Overall Difficulty</label>
                                            <CustomSelect 
                                                value={formData.difficulty}
                                                onChange={(val) => setFormData({...formData, difficulty: val})}
                                                options={['Easy', 'Medium', 'Hard']}
                                                icon={Activity}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">The Climax (Verdict)</label>
                                            <CustomSelect 
                                                value={formData.verdict}
                                                onChange={(val) => setFormData({...formData, verdict: val})}
                                                options={['Selected', 'Rejected']}
                                                icon={CheckCircle2}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">Legacy Advice (Optional)</label>
                                        <textarea 
                                            value={formData.advice}
                                            onChange={(e) => setFormData({...formData, advice: e.target.value})}
                                            className="w-full min-h-[150px] p-8 rounded-xl bg-surface/40 border border-border/40 focus:border-primary focus:bg-surface/60 outline-none transition-all text-sm font-bold text-content leading-relaxed placeholder:text-text-muted/30 caret-primary resize-none"
                                            placeholder="Key takeaways for the next candidate..."
                                        ></textarea>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Unified Canvas Navigation */}
            <div className="h-20 pb-4 border-t border-border/40 px-10 flex items-center justify-between shrink-0 bg-background/20 backdrop-blur-sm relative z-10">
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
                    Previous Phase
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
                    className={`flex items-center gap-3 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl ${
                        currentStep === totalSteps 
                            ? 'bg-primary text-white shadow-primary/25 hover:-translate-y-0.5 active:scale-95' 
                            : 'bg-primary text-white shadow-primary/25 hover:-translate-y-0.5 active:scale-95'
                    }`}
                >
                    {currentStep === totalSteps ? 'Submit Protocol' : 'Advance Phase'}
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
                className="w-full max-w-sm bg-surface border border-white/10 rounded-[2.5rem] p-12 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col items-center"
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
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] font-['Space_Grotesk']">{phase}...</span>
                                        <span className="text-[10px] font-bold text-text-muted opacity-40 font-['Space_Grotesk']">{phase === 'authenticating' ? '45%' : '88%'}</span>
                                    </div>
                                    <div className="h-1 w-full bg-surface-hover rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: phase === 'authenticating' ? '45%' : '88%' }}
                                            className="h-full bg-primary shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                                        />
                                    </div>
                                    <p className="text-[9px] font-bold text-text-muted opacity-60 uppercase tracking-widest text-center mt-2 italic font-['Space_Grotesk']">Securing Journey Nodes</p>
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

                                <h2 className="text-2xl font-bold text-content uppercase tracking-tight leading-none mb-3 font-['Space_Grotesk']">Journey Received</h2>
                                <div className="py-2 px-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex flex-col items-center gap-2">
                                    <span className="text-[9px] font-bold text-amber-500 uppercase tracking-[0.3em] font-['Space_Grotesk']">Awaiting Approval</span>
                                </div>
                                <p className="text-[10px] font-medium text-text-muted opacity-60 uppercase tracking-widest mt-4">
                                    Synchronizing with moderation queue...
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};

const FormField = ({ label, placeholder, defaultValue, value, onChange, icon: Icon }) => (
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
                value={value}
                onChange={onChange}
                className="w-full py-3.5 pl-14 pr-6 rounded-xl bg-surface/40 border border-border/40 focus:border-primary/60 focus:bg-surface/60 outline-none transition-all text-sm font-bold text-content placeholder:text-text-muted/30 shadow-sm caret-primary"
            />
        </div>
    </div>
);

export default SubmitExperiencePage;
