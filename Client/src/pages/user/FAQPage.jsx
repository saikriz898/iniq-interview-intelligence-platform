import React, { useState } from 'react';
import { 
  Search, ChevronDown, MessageCircle, AlertCircle, HelpCircle, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate } from 'react-router-dom';

/**
 * --- FAQ PAGE ---
 * Professional layout matching the SaaS aesthetic.
 */
const FAQPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Submissions', 'Security', 'Rewards', 'General'];

    const faqs = [
        {
            category: 'Submissions',
            question: 'How long does the approval process take?',
            answer: 'Once you submit a new experience, our moderation team reviews the content. This typically takes 24-48 hours. You will receive a notification in your inbox once approved or rejected.'
        },
        {
            category: 'Security',
            question: 'Is my identity masked during public sharing?',
            answer: 'By default, your profile name is visible on your submissions. However, you can manage your privacy settings in the Settings page to remain anonymous if you prefer.'
        },
        {
            category: 'Rewards',
            question: 'What are INIQ intelligence credits?',
            answer: 'Intelligence credits are rewarded for high-quality contributions. These credits can grant you priority access to upcoming premium interview archives and mentoring features.'
        },
        {
            category: 'Submissions',
            question: 'Can I modify a submission after it is approved?',
            answer: 'Yes. You can edit your submission via the My Submissions dashboard. Modifications will undergo a rapid re-verification sweep to ensure consistency.'
        },
        {
            category: 'General',
            question: 'What constitutes a high-quality submission?',
            answer: 'A high-quality experience includes detailed interview questions, structured round synopses, and actionable advice that provides real value to other candidates.'
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
            <div className="w-full flex flex-col bg-background font-['Inter']">
                
                {/* 1. HEADER */}
                <div className="w-full bg-surface/80 border-b border-border/40 py-16 relative">
                    <button 
                        onClick={() => navigate('/help-center')}
                        className="absolute top-6 left-6 md:top-8 md:left-10 flex items-center gap-2 text-sm font-bold text-text-muted hover:text-primary transition-colors bg-surface px-4 py-2 rounded-xl border border-border/40 hover:border-primary/40 shadow-sm"
                    >
                        <ArrowLeft className="size-4" />
                        Back to Help Center
                    </button>
                    
                    <div className="max-w-3xl mx-auto w-full px-6 md:px-12 flex flex-col items-center text-center gap-6 mt-4">
                        <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                            <HelpCircle className="size-8" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-content tracking-tight">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-base font-medium text-text-muted">
                            Find answers to the most common questions about the INIQ platform.
                        </p>

                        <div className="w-full mt-4 relative group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 size-5 flex items-center justify-center">
                                <Search className="size-5 text-text-muted/60 group-focus-within:text-primary transition-colors" />
                            </div>
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search our knowledge base..."
                                className="w-full py-4.5 pl-14 pr-6 rounded-2xl bg-background border border-border/60 focus:border-primary outline-none transition-all text-base font-medium text-content placeholder:text-text-muted/40 shadow-sm"
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                            {categories.map((cat) => (
                                <button 
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                                        activeCategory === cat 
                                            ? 'bg-primary border-primary text-white shadow-md' 
                                            : 'bg-surface border-border/60 text-text-muted hover:border-primary/40 hover:text-content'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. FAQ ACCORDION */}
                <div className="max-w-3xl mx-auto w-full px-6 md:px-12 py-16 flex flex-col gap-4">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, idx) => (
                            <FaqItem key={idx} faq={faq} index={idx} />
                        ))
                    ) : (
                        <div className="py-20 flex flex-col items-center gap-6 text-center">
                            <div className="size-16 rounded-full bg-surface border border-border/60 flex items-center justify-center">
                                <AlertCircle className="size-8 text-text-muted/40" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-lg font-bold text-content">No results found</p>
                                <p className="text-sm font-medium text-text-muted">We couldn't find any FAQs matching your search.</p>
                            </div>
                            <button 
                                onClick={() => {setSearchQuery(''); setActiveCategory('All');}} 
                                className="text-sm font-semibold text-primary hover:underline mt-2"
                            >
                                Clear search filters
                            </button>
                        </div>
                    )}
                </div>

                {/* 3. FOOTER CTA */}
                <div className="max-w-3xl mx-auto w-full px-6 md:px-12 pb-24">
                    <div className="p-10 rounded-3xl bg-surface border border-border/40 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-sm">
                        <div className="flex flex-col gap-2">
                            <h4 className="text-xl font-bold text-content">Still have questions?</h4>
                            <p className="text-sm font-medium text-text-muted">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                        </div>
                        <button 
                            onClick={() => navigate('/support')}
                            className="px-8 py-3.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-sm shrink-0"
                        >
                            Get in touch
                        </button>
                    </div>
                </div>

            </div>
        </UserAppShell>
    );
};

const FaqItem = ({ faq, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="w-full"
        >
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full p-6 md:p-8 rounded-2xl border transition-all cursor-pointer ${
                    isOpen 
                        ? 'bg-surface border-primary/40 shadow-sm' 
                        : 'bg-background border-border/60 hover:border-border'
                }`}
            >
                <div className="flex items-center justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">{faq.category}</span>
                        <h3 className="text-base md:text-lg font-bold text-content leading-tight">{faq.question}</h3>
                    </div>
                    <div className={`size-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isOpen ? 'bg-primary/10 text-primary rotate-180' : 'bg-surface border border-border/60 text-text-muted'
                    }`}>
                        <ChevronDown className="size-4" />
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
                            <div className="pt-6 mt-4 border-t border-border/40">
                                <p className="text-sm font-medium text-text-secondary leading-relaxed">
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
