import React, { useState, useEffect } from 'react';
import { 
  Building2, Briefcase, FileText, Code, Layout, Video, 
  ChevronRight, ChevronLeft, HelpCircle, AlertCircle, 
  CheckCircle2, Sparkles, Rocket, Save, Send, PlusCircle, Trash2, Database,
  Plus, Activity, ChevronDown, MapPin, Copy, Layers, Wand2, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import toast from 'react-hot-toast';
import CustomToaster from '../../components/common/CustomToaster';
import CustomSelect from '../../components/common/CustomSelect';
import beautify from 'js-beautify';

/**
 * --- SUBMIT EXPERIENCE: ENTERPRISE FORM ---
 * Strategy: Split-panel navigation, clean SaaS layout, 
 * and persistent experience metadata. 
 * Design: Side-navigation stepper + Fixed-canvas form.
 */
const SubmitExperiencePage = () => {
  const { theme, toggleTheme, isLoading, setIsLoading } = useGlobalContext();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newSubmissionId, setNewSubmissionId] = useState(null);
  const totalSteps = 5;

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
    topics: [
      { id: Date.now(), name: 'Data Structures & Algorithms', details: '' }
    ],
    rounds: [
      { id: Date.now(), title: 'Round 1: Initial Technical Screening', questions: '', solution: '', explanation: '', videoLink: '' }
    ],
    questions: [
      { id: Date.now(), text: '', codeSnippet: '', explanation: '', topic: 'Data Structures' }
    ],
    difficulty: 'Medium',
    verdict: 'Selected',
    advice: ''
  });

  const [expandedRoundId, setExpandedRoundId] = useState(formData.rounds[0].id);
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  
  const [copiedStates, setCopiedStates] = useState({});
  const handleCopy = (id, text) => {
      if(!text) return;
      navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
          setCopiedStates(prev => ({ ...prev, [id]: false }));
      }, 2000);
  };

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

  const addTopic = () => {
    setFormData({
      ...formData,
      topics: [...formData.topics, { id: Date.now(), name: '', details: '' }]
    });
    toast.success('New topic added!');
  };

  const removeTopic = (id) => {
    if (formData.topics.length === 1) {
      toast.error('Minimum one topic required.');
      return;
    }
    setFormData({
      ...formData,
      topics: formData.topics.filter(t => t.id !== id)
    });
    toast.error('Topic removed.');
  };

  const handleTopicChange = (id, field, value) => {
    setFormData({
      ...formData,
      topics: formData.topics.map(t => t.id === id ? { ...t, [field]: value } : t)
    });
  };

  const handleRoundChange = (id, field, value) => {
    setFormData({
      ...formData,
      rounds: formData.rounds.map(r => r.id === id ? { ...r, [field]: value } : r)
    });
  };

  const addQuestion = () => {
    const newId = Date.now();
    setFormData({ ...formData, questions: [...formData.questions, { id: newId, text: '', codeSnippet: '', explanation: '', topic: 'Data Structures', roundId: '' }] });
    setExpandedQuestionId(newId);
    toast.success('New question block added!');
  };

  const removeQuestion = (id) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter(q => q.id !== id)
    });
    toast.error('Question block removed.');
  };

  const handleQuestionChange = (id, field, value) => {
    setFormData({
      ...formData,
      questions: formData.questions.map(q => q.id === id ? { ...q, [field]: value } : q)
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
                const data = await res.json();
                if (data.experience && data.experience._id) {
                    setNewSubmissionId(data.experience._id);
                }
                setShowSuccess(true);
                toast.success('Experience submitted. Awaiting administrative approval.');
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
            toast.success('Progress saved to drafts.');
        }, 1500);
    }
  };

  const steps = [
    { id: 1, title: "Company Core", desc: "Identity & Prep", icon: Building2 },
    { id: 2, title: "Technical Stack", desc: "Process & Topics", icon: Code },
    { id: 3, title: "Round Insights", desc: "Detailed Q&A", icon: Rocket },
    { id: 4, title: "Specific Questions", desc: "Q&A & Code", icon: HelpCircle },
    { id: 5, title: "Final Verdict", desc: "Results & Advice", icon: CheckCircle2 },
  ];

  return (
    <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
      <CustomToaster />
      <AnimatePresence>
        {showSuccess && <SuccessAnimation />}
      </AnimatePresence>
      
      {/* 🚀 ENTERPRISE FORM WRAPPER */}
      <div className="h-full w-full flex flex-col md:flex-row overflow-hidden bg-background/50 pb-16 lg:pb-0">
        
        {/* --- LEFT PANEL: THE SIDEBAR (Clearly Separated) --- */}
        <div className="hidden md:flex w-72 border-r border-border/40 bg-surface/5 flex-col p-10 shrink-0 relative z-20">
            <div className="flex flex-col gap-1.5 mb-10">
                <h1 className="text-xl font-bold text-content tracking-tight">Add Experience</h1>
                <div className="flex items-center gap-1.5 ml-0.5">
                    <div className="size-1.5 rounded-full bg-success animate-pulse" />
                    <span className="text-[10px] font-bold text-text-muted">Draft Saved</span>
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
                                ? 'bg-primary text-primary-text shadow-xl shadow-primary/30 scale-105' 
                                : 'bg-surface/50 border border-border text-text-muted group-hover:border-primary/40'
                        }`}>
                            <step.icon className="size-4.5" />
                        </div>
                        <div className="flex flex-col text-left pt-0.5">
                            <span className="text-[11px] font-bold text-content uppercase tracking-wider">{step.title}</span>
                            <span className="text-[9px] font-medium text-text-muted mt-1">{step.desc}</span>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-auto">
                <button 
                    onClick={() => handleAction('draft')}
                    className="w-full py-3 rounded-xl bg-surface/50 border border-border/40 text-sm font-bold text-text-muted hover:text-primary hover:border-primary transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                    <Save className="size-4" />
                    Save Draft
                </button>
            </div>
        </div>

        {/* --- RIGHT PANEL: THE MAIN CANVAS --- */}
        <div className="flex-1 flex flex-col min-w-0 bg-background/30 relative overflow-hidden">
            
            {/* Canvas Header */}
            <div className="h-20 border-b border-border/40 px-6 md:px-10 flex items-center justify-between shrink-0 bg-surface/50 backdrop-blur-md relative z-10">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
                        <FileText className="size-3" />
                        Step {currentStep} of {totalSteps}
                    </div>
                    <h2 className="text-lg font-bold text-content tracking-tight">{steps[currentStep-1].title}</h2>
                    {/* Mobile Step Indicator */}
                    <div className="flex items-center gap-1 mt-1.5 md:hidden">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <div 
                                key={s} 
                                className={`h-1 rounded-full transition-all duration-300 ${
                                    currentStep === s 
                                        ? 'w-5 bg-primary shadow-lg' 
                                        : currentStep > s 
                                            ? 'w-1.5 bg-primary/40' 
                                            : 'w-1.5 bg-border/40'
                                }`} 
                            />
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {currentStep === 3 && (
                        <button 
                            onClick={addRound}
                            className="px-6 py-3 rounded-xl bg-primary text-primary-text text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2"
                        >
                            <PlusCircle className="size-4" />
                            Add Round Insight
                        </button>
                    )}
                    {currentStep === 4 && (
                        <button 
                            onClick={addQuestion}
                            className="px-6 py-3 rounded-xl bg-primary text-primary-text text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2"
                        >
                            <PlusCircle className="size-4" />
                            Add Question
                        </button>
                    )}
                    {currentStep === totalSteps && (
                        <button 
                            onClick={() => handleAction('submit')}
                            className="px-6 py-3 rounded-xl bg-primary text-primary-text text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2"
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
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted  ml-1">Company Identity</label>
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
                                                        className="p-3.5 rounded-2xl bg-surface border border-border text-text-muted hover:text-danger transition-all"
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted  ml-1">Targeted Role</label>
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
                                                        className="p-3.5 rounded-2xl bg-surface border border-border text-text-muted hover:text-danger transition-all"
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted  ml-1">Experience Level</label>
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
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted  ml-1">Interview Mode</label>
                                            <CustomSelect 
                                                value={formData.interviewMode}
                                                onChange={(val) => setFormData({...formData, interviewMode: val})}
                                                options={['Online', 'Offline', 'Hybrid']}
                                                icon={Layout}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted  ml-1">Application Method</label>
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
                                        <div className="flex flex-col gap-4">
                                            {formData.topics.map((topic, idx) => (
                                                <div key={topic.id} className="p-5 rounded-2xl bg-surface border border-border flex flex-col gap-4 relative group hover:border-primary/30 transition-colors shadow-sm">
                                                    <div className="flex justify-between items-center border-b border-border/40 pb-3">
                                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Topic {idx + 1}</label>
                                                        <button 
                                                            onClick={() => removeTopic(topic.id)}
                                                            className="text-text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
                                                            title="Remove Topic"
                                                        >
                                                            <Trash2 className="size-4" />
                                                        </button>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                        <div className="flex flex-col gap-2">
                                                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Topic Name</label>
                                                            <input 
                                                                type="text"
                                                                value={topic.name}
                                                                onChange={(e) => handleTopicChange(topic.id, 'name', e.target.value)}
                                                                placeholder="e.g., DSA, System Design, React"
                                                                className="w-full p-4 rounded-xl bg-surface-hover border border-border/50 focus:border-primary outline-none text-sm font-medium transition-all"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Details / Specifics</label>
                                                            <textarea 
                                                                value={topic.details}
                                                                onChange={(e) => handleTopicChange(topic.id, 'details', e.target.value)}
                                                                placeholder="e.g. Arrays, DP, Caching, Hooks (You can use multiple lines for points)"
                                                                className="w-full min-h-[60px] p-4 rounded-xl bg-surface-hover border border-border/50 focus:border-primary outline-none text-sm font-medium transition-all resize-y"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button 
                                                onClick={addTopic}
                                                className="w-fit mt-2 px-5 py-3 rounded-xl bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-accent-text transition-all flex items-center gap-2"
                                            >
                                                <PlusCircle className="size-4" />
                                                Add Another Topic
                                            </button>
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
                                                            <div className={`size-8 rounded-lg flex items-center justify-center font-bold text-xs ${isExpanded ? 'bg-primary text-primary-text' : 'bg-surface border border-border text-text-muted'}`}>
                                                                {idx + 1}
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-bold text-content uppercase tracking-tight">
                                                                    {round.title === 'Other' ? `Round ${idx + 1}` : (round.title || `Round ${idx + 1}`)}
                                                                </h4>
                                                                {!isExpanded && round.questions && (
                                                                    <p className="text-[10px] text-text-muted mt-0.5 line-clamp-1  font-medium">{round.questions}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    removeRound(round.id);
                                                                }}
                                                                className="p-2.5 rounded-xl text-text-muted hover:text-danger hover:bg-danger/10 transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center"
                                                                title="Remove this round"
                                                            >
                                                                <Trash2 className="size-4" />
                                                            </button>
                                                            <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                                                <ChevronDown className="size-5 text-text-muted" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <AnimatePresence>
                                                        {expandedRoundId === round.id && (
                                                            <motion.div 
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="p-6 pt-0 flex flex-col gap-5 border-t border-border/40 mt-2 pt-5">
                                                                    <div className="flex flex-col gap-2">
                                                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Round Title</label>
                                                                        <CustomSelect
                                                                            value={
                                                                                ['Online Assessment', 'Technical Round 1', 'Technical Round 2', 'Technical Round 3', 'Managerial Round', 'HR Round', 'System Design', 'Machine Coding'].includes(round.title)
                                                                                    ? round.title 
                                                                                    : (round.title ? 'Other' : '')
                                                                            }
                                                                            onChange={(val) => handleRoundChange(round.id, 'title', val)}
                                                                            options={['Online Assessment', 'Technical Round 1', 'Technical Round 2', 'Technical Round 3', 'Managerial Round', 'HR Round', 'System Design', 'Machine Coding', 'Other']}
                                                                            placeholder="Select a round type..."
                                                                            icon={Layers}
                                                                        />
                                                                        {(!['Online Assessment', 'Technical Round 1', 'Technical Round 2', 'Technical Round 3', 'Managerial Round', 'HR Round', 'System Design', 'Machine Coding'].includes(round.title) && round.title) || round.title === 'Other' ? (
                                                                            <motion.div 
                                                                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                                                animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                                                                                className="flex flex-col gap-2 overflow-hidden"
                                                                            >
                                                                                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Custom Round Title</label>
                                                                                <input 
                                                                                    type="text"
                                                                                    value={round.title === 'Other' ? '' : round.title}
                                                                                    onChange={(e) => handleRoundChange(round.id, 'title', e.target.value)}
                                                                                    placeholder="e.g. Behavioral Round, Pair Programming"
                                                                                    className="w-full p-3.5 rounded-xl bg-surface/50 border border-border/50 focus:border-primary outline-none transition-all text-sm font-bold text-content"
                                                                                />
                                                                            </motion.div>
                                                                        ) : null}
                                                                    </div>
                                                                    <div className="flex flex-col gap-2">
                                                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Overall Discussion / Concepts</label>
                                                                        <textarea 
                                                                            value={round.questions}
                                                                            onChange={(e) => handleRoundChange(round.id, 'questions', e.target.value)}
                                                                            className="w-full min-h-[100px] p-4 rounded-xl bg-surface-hover border border-border/50 focus:border-primary outline-none text-sm font-medium transition-all resize-y"
                                                                            placeholder="Describe the topics and general questions asked in this round..."
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col gap-2">
                                                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Your Approach (Optional)</label>
                                                                        <textarea 
                                                                            value={round.explanation}
                                                                            onChange={(e) => handleRoundChange(round.id, 'explanation', e.target.value)}
                                                                            className="w-full min-h-[100px] p-4 rounded-xl bg-surface-hover border border-border/50 focus:border-primary outline-none text-sm font-medium transition-all resize-y"
                                                                            placeholder="Explain how you approached the discussion..."
                                                                        />
                                                                    </div>
                                                                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex flex-col gap-1">
                                                                        <div className="text-xs font-bold text-primary flex items-center gap-2">
                                                                            <Code className="size-4" />
                                                                            Did this round include coding questions?
                                                                        </div>
                                                                        <p className="text-[11px] font-medium text-text-muted leading-relaxed">
                                                                            Please add your specific coding questions, code snippets, and technical solutions in <strong>Step 4: Specific Questions</strong>.
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex flex-col gap-2">
                                                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Video Explanation (Optional)</label>
                                                                        <div className="relative group">
                                                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 size-5 flex items-center justify-center transition-colors">
                                                                                <Video className="size-4 text-text-muted group-focus-within:text-primary" />
                                                                            </div>
                                                                            <input 
                                                                                type="text" 
                                                                                value={round.videoLink}
                                                                                onChange={(e) => handleRoundChange(round.id, 'videoLink', e.target.value)}
                                                                                placeholder="Upload link or paste YouTube/Loom URL..."
                                                                                className="w-full py-3.5 pl-12 pr-4 rounded-xl bg-surface-hover border border-border/50 focus:border-primary outline-none transition-all text-sm font-medium text-content"
                                                                            />
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
                                <div className="flex flex-col gap-8 h-full">
                                    <div className="flex items-center justify-between shrink-0">
                                        <div>
                                            <h3 className="text-xl font-bold text-content font-['Space_Grotesk']">SPECIFIC QUESTIONS</h3>
                                            <p className="text-xs text-text-muted font-medium mt-1">Detail individual questions, coding problems, and their solutions.</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 pb-10">
                                        {formData.questions && formData.questions.map((q, idx) => {
                                            const isExpanded = expandedQuestionId === q.id;
                                            return (
                                                <div 
                                                    key={q.id}
                                                    className={`card-base group transition-all duration-300 ${isExpanded ? 'ring-1 ring-primary/40 shadow-xl shadow-primary/5 bg-surface' : 'bg-surface/50 border border-border hover:border-primary/30'} rounded-2xl`}
                                                >
                                                    {/* Accordion Header */}
                                                    <div 
                                                        onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                                                        className="p-6 flex items-center justify-between cursor-pointer select-none"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className={`size-8 rounded-lg flex items-center justify-center font-bold text-xs ${isExpanded ? 'bg-primary text-primary-text' : 'bg-background border border-border text-text-muted'}`}>
                                                                {idx + 1}
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-bold text-content uppercase tracking-tight line-clamp-1 max-w-sm">{q.text || 'New Question'}</h4>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    removeQuestion(q.id);
                                                                }}
                                                                className="text-text-muted hover:text-danger p-2 transition-colors"
                                                                title="Remove Question"
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
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="p-6 pt-0 flex flex-col gap-5 border-t border-border/40 mt-2 pt-5">
                                                                    <div className="flex flex-col gap-2">
                                                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Associated Round</label>
                                                                        <select
                                                                            value={q.roundId || ''}
                                                                            onChange={(e) => handleQuestionChange(q.id, 'roundId', e.target.value)}
                                                                            className="w-full p-3.5 rounded-xl bg-surface-hover border border-border/50 focus:border-primary outline-none transition-all text-sm font-medium text-content appearance-none"
                                                                        >
                                                                            <option value="" disabled>Select Round...</option>
                                                                            {formData.rounds.map((r, rIdx) => (
                                                                                <option key={r.id} value={r.id}>
                                                                                    {r.title || `Round ${rIdx + 1}`}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                    <div className="flex flex-col gap-2">
                                                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Question Text (Required)</label>
                                                                        <textarea 
                                                                            value={q.text}
                                                                            onChange={(e) => handleQuestionChange(q.id, 'text', e.target.value)}
                                                                            className="w-full min-h-[60px] p-4 rounded-xl bg-surface-hover border border-border/50 focus:border-primary outline-none text-sm font-medium transition-all resize-y"
                                                                            placeholder="What was the exact question asked?"
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col gap-2">
                                                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Topic Tag</label>
                                                                        <input 
                                                                            type="text"
                                                                            value={q.topic}
                                                                            onChange={(e) => handleQuestionChange(q.id, 'topic', e.target.value)}
                                                                            className="w-full p-4 rounded-xl bg-surface-hover border border-border/50 focus:border-primary outline-none text-sm font-medium transition-all"
                                                                            placeholder="e.g. Dynamic Programming, Arrays, System Design"
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col gap-2 relative group/textarea">
                                                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Code Snippet (Optional)</label>
                                                                        <div className="relative group/textarea">
                                                                            <textarea 
                                                                                value={q.codeSnippet}
                                                                                onChange={(e) => handleQuestionChange(q.id, 'codeSnippet', e.target.value)}
                                                                                className="w-full min-h-[120px] p-4 rounded-xl bg-[#0d1117] border border-border/50 focus:border-primary outline-none text-[13px] font-mono text-primary/90 transition-all resize-y whitespace-pre custom-scrollbar pr-20"
                                                                                placeholder="// Write your code snippet here..."
                                                                                spellCheck="false"
                                                                            />
                                                                            <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                                                                                <button
                                                                                    onClick={() => {
                                                                                        if(!q.codeSnippet) return;
                                                                                        const formatted = beautify(q.codeSnippet, { indent_size: 4 });
                                                                                        handleQuestionChange(q.id, 'codeSnippet', formatted);
                                                                                        toast.success('Code formatted!');
                                                                                    }}
                                                                                    className="p-1.5 rounded-md bg-surface border border-border/40 text-text-muted hover:text-content opacity-0 group-hover/textarea:opacity-100 transition-all flex items-center gap-1.5"
                                                                                    title="Format Code"
                                                                                    type="button"
                                                                                >
                                                                                    <Wand2 className="size-3.5" />
                                                                                    <span className="text-[10px] font-bold uppercase tracking-wider">Format</span>
                                                                                </button>
                                                                                <button
                                                                                    onClick={() => handleCopy(`step4-${q.id}`, q.codeSnippet)}
                                                                                    className="p-1.5 rounded-md bg-surface border border-border/40 text-text-muted hover:text-content opacity-0 group-hover/textarea:opacity-100 transition-all flex items-center gap-1.5"
                                                                                    title="Copy Code"
                                                                                    type="button"
                                                                                >
                                                                                    {copiedStates[`step4-${q.id}`] ? (
                                                                                        <>
                                                                                            <CheckCircle2 className="size-3.5 text-success" />
                                                                                            <span className="text-[10px] font-bold uppercase tracking-wider text-success">Copied</span>
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            <Copy className="size-3.5" />
                                                                                            <span className="text-[10px] font-bold uppercase tracking-wider">Copy</span>
                                                                                        </>
                                                                                    )}
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col gap-2 relative group/textarea-output">
                                                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Output (Optional)</label>
                                                                        <div className="relative group/textarea-output">
                                                                            <textarea 
                                                                                value={q.output || ''}
                                                                                onChange={(e) => handleQuestionChange(q.id, 'output', e.target.value)}
                                                                                className="w-full min-h-[60px] p-4 rounded-xl bg-[#0d1117] border border-border/50 focus:border-primary outline-none text-[13px] font-mono text-text-muted transition-all resize-y whitespace-pre custom-scrollbar pr-20"
                                                                                placeholder="// Expected output..."
                                                                                spellCheck="false"
                                                                            />
                                                                            <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                                                                                <button
                                                                                    onClick={() => handleCopy(`step4-out-${q.id}`, q.output || '')}
                                                                                    className="p-1.5 rounded-md bg-surface border border-border/40 text-text-muted hover:text-content opacity-0 group-hover/textarea-output:opacity-100 transition-all flex items-center gap-1.5"
                                                                                    title="Copy Output"
                                                                                    type="button"
                                                                                >
                                                                                    {copiedStates[`step4-out-${q.id}`] ? (
                                                                                        <>
                                                                                            <CheckCircle2 className="size-3.5 text-success" />
                                                                                            <span className="text-[10px] font-bold uppercase tracking-wider text-success">Copied</span>
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            <Copy className="size-3.5" />
                                                                                            <span className="text-[10px] font-bold uppercase tracking-wider">Copy</span>
                                                                                        </>
                                                                                    )}
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col gap-2">
                                                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Explanation (Optional)</label>
                                                                        <textarea 
                                                                            value={q.explanation}
                                                                            onChange={(e) => handleQuestionChange(q.id, 'explanation', e.target.value)}
                                                                            className="w-full min-h-[80px] p-4 rounded-xl bg-surface-hover border border-border/50 focus:border-primary outline-none text-sm font-medium transition-all resize-y"
                                                                            placeholder="Provide an explanation for the solution..."
                                                                        />
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

                            {currentStep === 5 && (
                                <div className="space-y-5">
                                     <div className="flex flex-col gap-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted  ml-1">Process Summary (Required)</label>
                                        <textarea 
                                            value={formData.summary}
                                            onChange={(e) => setFormData({...formData, summary: e.target.value})}
                                            className="w-full min-h-[100px] p-5 rounded-xl bg-surface/40 border border-border/40 focus:border-primary focus:bg-surface/60 outline-none transition-all text-sm font-bold text-content leading-relaxed placeholder:text-text-muted/30 caret-primary resize-none"
                                            placeholder="A short, catchy summary of your interview journey (max 300 characters)..."
                                            maxLength={300}
                                        ></textarea>
                                        <div className="flex justify-end px-2">
                                            <span className={`text-[10px] font-bold ${formData.summary.length > 280 ? 'text-danger' : 'text-text-muted '}`}>
                                                {formData.summary.length} / 300
                                            </span>
                                        </div>
                                    </div>
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted  ml-1">Overall Difficulty</label>
                                            <CustomSelect 
                                                value={formData.difficulty}
                                                onChange={(val) => setFormData({...formData, difficulty: val})}
                                                options={['Easy', 'Medium', 'Hard']}
                                                icon={Activity}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted  ml-1">Interview Outcome (Verdict)</label>
                                            <CustomSelect 
                                                value={formData.verdict}
                                                onChange={(val) => setFormData({...formData, verdict: val})}
                                                options={['Selected', 'Rejected']}
                                                icon={CheckCircle2}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted  ml-1">Legacy Advice (Optional)</label>
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
            <div className="h-20 border-t border-border/40 px-4 md:px-10 flex items-center justify-between shrink-0 bg-background/20 backdrop-blur-sm relative z-10">
                <button 
                    onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                    disabled={currentStep === 1}
                    className={`flex items-center justify-center md:justify-start gap-1 md:gap-3 px-4 md:px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        currentStep === 1 
                            ? 'opacity-20 pointer-events-none' 
                            : 'bg-surface border border-border text-text-muted hover:text-primary hover:border-primary/40'
                    }`}
                >
                    <ChevronLeft className="size-4" />
                    <span className="hidden sm:inline">Previous Phase</span>
                    <span className="sm:hidden">Prev</span>
                </button>

                <div className="hidden sm:flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(s => (
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
                    className={`flex items-center justify-center md:justify-start gap-1 md:gap-3 px-4 md:px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl bg-primary text-primary-text shadow-primary/25 hover:-translate-y-0.5 active:scale-95`}
                >
                    <span className="hidden sm:inline">{currentStep === totalSteps ? 'Submit Protocol' : 'Advance Phase'}</span>
                    <span className="sm:hidden">{currentStep === totalSteps ? 'Submit' : 'Next'}</span>
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
                className="w-full max-w-sm bg-surface border border-theme rounded-[2.5rem] p-12 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col items-center"
            >
                {/* Holographic background noise */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/assets/noise.svg')] bg-repeat" />
                
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
                                        className="absolute inset-x-0 h-2   via-primary/40  blur-sm"
                                    />
                                </div>

                                <div className="flex flex-col gap-3 w-full">
                                    <div className="flex items-center justify-between px-2">
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] font-['Space_Grotesk']">{phase}...</span>
                                        <span className="text-[10px] font-bold text-text-muted  font-['Space_Grotesk']">{phase === 'authenticating' ? '45%' : '88%'}</span>
                                    </div>
                                    <div className="h-1 w-full bg-surface-hover rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: phase === 'authenticating' ? '45%' : '88%' }}
                                            className="h-full bg-primary shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                                        />
                                    </div>
                                    <p className="text-[9px] font-bold text-text-muted  uppercase tracking-widest text-center mt-2 italic font-['Space_Grotesk']">Securing Journey Nodes</p>
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
                                    className="size-28 rounded-[2.5rem] bg-gradient-to-br from-success to-primary flex items-center justify-center shadow-[0_20px_50px_rgba(34,197,94,0.3)] mb-8 border-2 border-theme relative"
                                >
                                    <CheckCircle2 className="size-14 text-white drop-shadow-lg" />
                                    <motion.div 
                                        animate={{ opacity: [0, 1, 0], scale: [1, 2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 bg-success/20 rounded-[2.5rem] blur-xl -z-10"
                                    />
                                </motion.div>

                                <h2 className="text-3xl font-black text-content uppercase tracking-tight leading-none mb-3 font-['Space_Grotesk']">Submission Complete</h2>
                                <div className="py-2 px-6 rounded-full bg-success/10 border border-success/20 flex flex-col items-center gap-2 mb-2">
                                    <span className="text-[10px] font-bold text-success uppercase tracking-[0.3em] font-['Space_Grotesk']">Successfully Uploaded</span>
                                </div>
                                <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest mt-2 max-w-sm">
                                    Your intelligence module has been secured. Awaiting final administrative approval.
                                </p>
                                <div className="flex items-center justify-center gap-4 mt-10 w-full max-w-xs">
                                    <button
                                        onClick={() => {
                                            setShowSuccess(false);
                                            setCurrentStep(1);
                                            if (newSubmissionId) {
                                                navigate(`/my-submissions/${newSubmissionId}`);
                                            } else {
                                                navigate('/my-submissions');
                                            }
                                        }}
                                        className="w-full py-4 px-8 rounded-2xl bg-primary hover:bg-primary-hover shadow-[0_10px_30px_rgba(99,102,241,0.3)] hover:shadow-[0_15px_40px_rgba(99,102,241,0.4)] transition-all font-black text-xs uppercase tracking-widest text-primary-text flex items-center justify-center gap-3 group"
                                    >
                                        View Details
                                        <ArrowRight className="size-4 group-hover:translate-x-1.5 transition-transform" />
                                    </button>
                                </div>
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
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted  ml-1">{label}</label>
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
