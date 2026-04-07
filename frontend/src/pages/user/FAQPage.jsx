import React, { useState } from 'react';
import { 
  HelpCircle, Search, ChevronDown, ChevronUp, Sparkles, 
  ShieldCheck, Rocket, Zap, MessageCircle, FileText,
  AlertCircle, Building2, Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate } from 'react-router-dom';

/**
 * --- FAQ PAGE: SYSTEM OPERATIONS MANUAL ---
 * Purpose: Centralized searchable knowledge base for the INIQ ecosystem.
 * Design: Category-based accordion architecture with high-fidelity telemetry.
 */
const FAQPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = [
        { id: 'All', icon: Terminal },
        { id: 'Submissions', icon: Rocket },
        { id: 'Security', icon: ShieldCheck },
        { id: 'Rewards', icon: Sparkles },
        { id: 'General', icon: HelpCircle }
    ];

    const faqs = [
        {
            category: 'Submissions',
            question: 'How long does the approval protocol take?',
            answer: 'Once you submit a Journey Log, our technical review nodes verify the content depth. This typically takes 24-48 solar hours. You will receive a signal in your notifications dashboard once approved.'
        },
        {
            category: 'Security',
            question: 'Is my identity masked during public sharing?',
            answer: 'By default, your profile is public as a verified contributor. However, you can manage your visibility markers in the System Settings Hub to restrict access to specific dossier elements.'
        },
        {
            category: 'Rewards',
            question: 'What are INIQ intelligence credits?',
            answer: 'Intelligence credits are rewarded for high-fidelity contributions. These credits grant priority access to premium interview archives and specialized mentoring nodes.'
        },
        {
            category: 'Submissions',
            question: 'Can I modify a protocol after it goes live?',
            answer: 'Yes. You can enter "Revision Mode" via your My Submissions dashboard. Modifications undergo a rapid re-verification sweep to ensure logic consistency.'
        },
        {
            category: 'General',
            question: 'What constitutes a "High-Fidelity" submission?',
            answer: 'A high-fidelity log includes detailed DSA arsenals, precise round synopses, and actionable legacy advice that provides deep value to the candidate community.'
        }
    ];

    const filteredFaqs = faqs.filter(faq => {
        const matchesQuery = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
        return matchesQuery && matchesCategory;
    });

    return (
        <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col p-10 lg:p-12 overflow-y-auto no-scrollbar bg-surface/[0.02]">
                <div className="w-full h-full flex flex-col gap-12 pt-6">
                
                {/* 1. HERO SEARCH HUB */}
                <div className="w-full py-20 px-4 text-center relative overflow-hidden">
                    {/* Background Accents */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-primary/5 rounded-full blur-[100px] pointer-events-none opacity-40 -z-10" />
                    
                    <div className="flex flex-col items-center gap-10">
                        <div className="flex flex-col gap-3">
                             <div className="flex items-center justify-center gap-3 mb-2">
                                <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] text-primary">Intelligence_Node</span>
                             </div>
                            <h1 className="text-4xl md:text-6xl font-black text-content font-['Sora'] tracking-tight italic uppercase leading-none">Operations Manual</h1>
                            <p className="text-[11px] font-bold text-text-muted opacity-40 uppercase tracking-[0.4em] mt-2">Knowledge Base Hub v3.0 // INIQ_SYSTEM</p>
                        </div>

                        <div className="w-full max-w-3xl relative group">
                            <Search className="absolute left-8 top-1/2 -translate-y-1/2 size-6 text-text-muted/40 group-focus-within:text-primary transition-all" />
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Scan intelligence archives for answers..."
                                className="w-full p-8 pl-18 rounded-[3rem] bg-surface border border-border/60 text-base font-bold placeholder:text-text-muted/30 focus:border-primary outline-none shadow-2xl shadow-black/5 transition-all text-content tracking-tight italic"
                            />
                        </div>

                        {/* Tactical Categories */}
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {categories.map((cat) => (
                                <button 
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center gap-3 px-8 py-4 rounded-3xl border transition-all active:scale-95 ${
                                        activeCategory === cat.id 
                                            ? 'bg-primary border-primary text-white shadow-2xl shadow-primary/30 scale-105' 
                                            : 'bg-surface border-border/60 text-text-muted hover:border-primary/40 hover:text-primary'
                                    }`}
                                >
                                    <cat.icon className="size-4.5" />
                                    <span className="text-[11px] font-black uppercase tracking-widest">{cat.id}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. KNOWLEDGE CANVAS */}
                <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 px-4">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, idx) => (
                            <FaqItem key={idx} faq={faq} index={idx} />
                        ))
                    ) : (
                        <div className="py-32 flex flex-col items-center gap-8 opacity-40 grayscale text-center">
                            <div className="size-20 rounded-[2.5rem] bg-surface-hover border border-dashed border-border flex items-center justify-center">
                                <AlertCircle className="size-10" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-base font-black uppercase tracking-widest italic">No matching intelligence found</p>
                                <button onClick={() => {setSearchQuery(''); setActiveCategory('All');}} className="text-[11px] font-black text-primary uppercase underline tracking-widest">Reset Database Search</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* 3. SUPPORT HANDSHAKE SECTION */}
                <div className="max-w-4xl mx-auto w-full mt-20 mb-20">
                    <div className="p-12 rounded-[3.5rem] bg-surface-hover/30 border border-border/40 border-dashed flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
                        <div className="flex items-center gap-6">
                            <div className="size-20 rounded-[2.5rem] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-inner shrink-0 leading-none">
                                <MessageCircle className="size-10" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-xl font-black text-content italic uppercase tracking-tight">Still Encountering Faults?</h4>
                                <p className="text-[10px] font-black text-text-muted opacity-40 uppercase tracking-widest leading-loose">Initialize a direct uplink with our technical support nodes.</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => navigate('/support')}
                            className="px-10 py-5 rounded-[2rem] bg-primary text-white text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-primary/30 hover:translate-x-2 transition-all active:scale-95"
                        >
                            Open Support Channel
                        </button>
                    </div>
                </div>

                </div>
            </div>
        </UserAppShell>
    );
};

// --- PRIVATE COMPONENTS ---

const FaqItem = ({ faq, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group"
        >
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full p-8 rounded-[2.5rem] border transition-all cursor-pointer ${
                    isOpen 
                        ? 'bg-surface border-primary shadow-2xl shadow-primary/5' 
                        : 'bg-surface/60 border-border/40 hover:border-primary/40'
                }`}
            >
                <div className="flex items-center justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                             <div className="size-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                             <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{faq.category}</span>
                        </div>
                        <h3 className="text-base font-black text-content italic uppercase tracking-tight leading-none">{faq.question}</h3>
                    </div>
                    <div className={`size-10 rounded-xl flex items-center justify-center transition-all ${
                        isOpen ? 'bg-primary text-white rotate-180' : 'bg-surface-hover text-text-muted group-hover:bg-primary/10 group-hover:text-primary'
                    }`}>
                        <ChevronDown className="size-5" />
                    </div>
                </div>
                
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-8 mt-6 border-t border-border/40">
                                <p className="text-sm font-bold text-text-muted leading-relaxed italic opacity-80 first-letter:text-primary first-letter:text-lg first-letter:font-black">
                                   {faq.answer}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default FAQPage;
