import React, { useState } from 'react';
import { 
  Search, BookOpen, MessageSquare, Shield, 
  FileText, Mail, Phone, ArrowRight, LifeBuoy, ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate } from 'react-router-dom';

/**
 * --- HELP CENTER PAGE ---
 * A clean, premium, and professional help hub for the application.
 */
const HelpCenterPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const helpCategories = [
        { 
            id: 'faq', 
            icon: BookOpen, 
            label: 'Frequently Asked Questions', 
            desc: 'Find answers to common questions about the platform, interviews, and community guidelines.',
        },
        { 
            id: 'support', 
            icon: MessageSquare, 
            label: 'Contact Support', 
            desc: 'Need personalized help? Reach out to our dedicated support team directly.',
        },
        { 
            id: 'privacy', 
            icon: Shield, 
            label: 'Privacy Policy', 
            desc: 'Learn how we protect your data and handle your personal information securely.',
        },
        { 
            id: 'terms', 
            icon: FileText, 
            label: 'Terms of Service', 
            desc: 'Read the rules and guidelines for using the Iniq platform and its services.',
        }
    ];

    const [activeTab, setActiveTab] = useState(null);

    const contactChannels = [
        { icon: Mail, label: 'Email Support', value: 'support@iniq.io', action: 'mailto:support@iniq.io' },
        { icon: Phone, label: 'Global Hotline', value: '+1 (800) INIQ-HUB', action: 'tel:+18004647482' }
    ];

    return (
        <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="w-full flex flex-col bg-background font-['Inter']">
                
                {/* 1. HERO SECTION */}
                <div className="w-full bg-surface/80 border-b border-border/40 py-16 md:py-20 relative overflow-hidden">
                    <button 
                        onClick={() => navigate('/')}
                        className="absolute top-6 left-6 md:top-8 md:left-10 flex items-center gap-2 text-sm font-bold text-text-muted hover:text-primary transition-colors bg-surface px-4 py-2 rounded-xl border border-border/40 hover:border-primary/40 shadow-sm z-20"
                    >
                        <ArrowLeft className="size-4" />
                        Back Home
                    </button>

                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--color-primary)_0%,_transparent_70%)] opacity-[0.03]" />
                    <div className="max-w-4xl mx-auto w-full px-6 md:px-12 flex flex-col items-center text-center gap-6 relative z-10 mt-4">
                        <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                            <LifeBuoy className="size-8" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-content tracking-tight">
                            How can we help you?
                        </h1>
                        <p className="text-base font-medium text-text-muted max-w-xl">
                            Search our knowledge base or browse categories below to find exactly what you need.
                        </p>
                        
                        <div className="w-full max-w-2xl mt-6 relative group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 size-5 flex items-center justify-center">
                                <Search className="size-5 text-text-muted/60 group-focus-within:text-primary transition-colors" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search articles, tutorials, and guides..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full py-4.5 pl-14 pr-6 rounded-2xl bg-background border border-border/60 focus:border-primary outline-none transition-all text-base font-medium text-content placeholder:text-text-muted/40 shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. MAIN CONTENT AREA */}
                {!activeTab ? (
                    <div className="max-w-6xl mx-auto w-full px-6 md:px-12 py-16">
                        <h2 className="text-xl font-bold text-content mb-8">Browse Categories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {helpCategories.map((category) => (
                                <motion.button 
                                    key={category.id}
                                    whileHover={{ y: -4 }}
                                    onClick={() => setActiveTab(category.id)}
                                    className="p-8 rounded-3xl bg-surface border border-border/40 flex flex-col md:flex-row items-start gap-6 hover:border-primary/40 group transition-all text-left shadow-sm"
                                >
                                    <div className="size-14 rounded-2xl bg-background border border-border/40 flex items-center justify-center text-text-muted group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all shrink-0">
                                        <category.icon className="size-6" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-lg font-bold text-content group-hover:text-primary transition-colors">
                                            {category.label}
                                        </h3>
                                        <p className="text-sm font-medium text-text-muted leading-relaxed">
                                            {category.desc}
                                        </p>
                                    </div>
                                    <div className="hidden md:flex ml-auto self-center size-8 rounded-full bg-background border border-border/40 items-center justify-center text-text-muted group-hover:text-primary group-hover:border-primary/20 transition-all shrink-0">
                                        <ArrowRight className="size-4" />
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto w-full px-6 md:px-12 py-16">
                        <button 
                            onClick={() => setActiveTab(null)}
                            className="flex items-center gap-2 text-sm font-bold text-text-muted hover:text-primary transition-colors mb-8"
                        >
                            <ArrowLeft className="size-4" /> Back to Categories
                        </button>
                        <div className="p-10 rounded-3xl bg-surface border border-border/40 shadow-sm flex flex-col gap-6">
                            {activeTab === 'faq' && (
                                <>
                                    <h2 className="text-2xl font-bold text-content flex items-center gap-3"><BookOpen className="size-6 text-primary" /> Frequently Asked Questions</h2>
                                    <div className="space-y-4 mt-4">
                                        <div className="p-5 rounded-xl bg-background border border-border/40">
                                            <h4 className="font-bold text-content">How do I submit an experience?</h4>
                                            <p className="text-sm text-text-muted mt-2">Go to the experiences tab and click the 'Submit' button.</p>
                                        </div>
                                        <div className="p-5 rounded-xl bg-background border border-border/40">
                                            <h4 className="font-bold text-content">How is data verified?</h4>
                                            <p className="text-sm text-text-muted mt-2">Our admin team manually reviews and verifies all submitted data for authenticity.</p>
                                        </div>
                                    </div>
                                </>
                            )}
                            {activeTab === 'support' && (
                                <>
                                    <h2 className="text-2xl font-bold text-content flex items-center gap-3"><MessageSquare className="size-6 text-primary" /> Contact Support</h2>
                                    <p className="text-text-muted">Please email us at support@iniq.io or call our Global Hotline at +1 (800) INIQ-HUB.</p>
                                </>
                            )}
                            {activeTab === 'privacy' && (
                                <>
                                    <h2 className="text-2xl font-bold text-content flex items-center gap-3"><Shield className="size-6 text-primary" /> Privacy Policy</h2>
                                    <p className="text-text-muted">We respect your privacy and process all your information in accordance with global data protection standards.</p>
                                </>
                            )}
                            {activeTab === 'terms' && (
                                <>
                                    <h2 className="text-2xl font-bold text-content flex items-center gap-3"><FileText className="size-6 text-primary" /> Terms of Service</h2>
                                    <p className="text-text-muted">By using INIQ, you agree to our community guidelines and promise not to misuse the platform.</p>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* 3. CONTACT BANNER */}
                <div className="max-w-6xl mx-auto w-full px-6 md:px-12 pb-20">
                    <div className="p-10 rounded-3xl bg-primary/5 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="flex flex-col gap-2 text-center md:text-left">
                            <h3 className="text-xl font-bold text-content">Still need help?</h3>
                            <p className="text-sm font-medium text-text-muted">
                                Our support team is available around the clock to assist you.
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
                            {contactChannels.map((channel, i) => (
                                <a 
                                    key={i} 
                                    href={channel.action}
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="size-12 rounded-full bg-surface border border-border/60 flex items-center justify-center text-text-muted group-hover:text-primary group-hover:border-primary/40 transition-all shadow-sm">
                                        <channel.icon className="size-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">{channel.label}</span>
                                        <span className="text-sm font-semibold text-content group-hover:text-primary transition-colors">{channel.value}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </UserAppShell>
    );
};

export default HelpCenterPage;
