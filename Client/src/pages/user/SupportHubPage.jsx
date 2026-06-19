import React, { useState } from 'react';
import { 
  MessageSquare, Mail, Phone, MapPin, Send, CheckCircle2, ArrowLeft
} from 'lucide-react';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate } from 'react-router-dom';

/**
 * --- SUPPORT HUB PAGE ---
 * Professional layout matching the SaaS aesthetic.
 */
const SupportHubPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();
    const [status, setStatus] = useState('idle'); // idle, submitting, success
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

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
                    
                    <div className="max-w-4xl mx-auto w-full px-6 md:px-12 flex flex-col items-center text-center gap-6 mt-4">
                        <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                            <MessageSquare className="size-8" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-content tracking-tight">
                            Contact Support
                        </h1>
                        <p className="text-base font-medium text-text-muted max-w-2xl">
                            Our team is here to help. Reach out to us with any questions, issues, or feedback and we'll get back to you as soon as possible.
                        </p>
                    </div>
                </div>

                {/* 2. CONTACT SECTION */}
                <div className="max-w-6xl mx-auto w-full px-6 md:px-12 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        
                        {/* LEFT: Info & Channels */}
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-4">
                                <h2 className="text-2xl font-bold text-content">Get in touch</h2>
                                <p className="text-base font-medium text-text-muted leading-relaxed">
                                    We'd love to hear from you. Please fill out this form or use our direct contact channels.
                                </p>
                            </div>

                            <div className="flex flex-col gap-6">
                                <ContactCard 
                                    icon={Mail} 
                                    title="Email us" 
                                    desc="Our friendly team is here to help." 
                                    value="support@iniq.io" 
                                />
                                <ContactCard 
                                    icon={Phone} 
                                    title="Call us" 
                                    desc="Mon-Fri from 8am to 5pm PST." 
                                    value="+1 (800) INIQ-HUB" 
                                />
                                <ContactCard 
                                    icon={MapPin} 
                                    title="Office" 
                                    desc="Come say hello at our HQ." 
                                    value="100 Innovation Drive, San Francisco, CA" 
                                />
                            </div>
                        </div>

                        {/* RIGHT: Form */}
                        <div className="bg-surface rounded-3xl p-8 md:p-10 border border-border/40 shadow-sm">
                            {status === 'success' ? (
                                <div className="h-full flex flex-col items-center justify-center text-center gap-6 py-10">
                                    <div className="size-20 rounded-full bg-success/10 flex items-center justify-center text-success mb-2">
                                        <CheckCircle2 className="size-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-content">Message Sent!</h3>
                                    <p className="text-sm font-medium text-text-muted">
                                        Thanks for reaching out. Our support team will get back to you within 24 hours.
                                    </p>
                                    <button 
                                        onClick={() => setStatus('idle')}
                                        className="mt-4 px-8 py-3 rounded-xl bg-background border border-border/60 text-sm font-bold hover:border-primary hover:text-primary transition-all"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-bold text-content">Full Name</label>
                                            <input 
                                                required
                                                type="text" 
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={e => setFormData({...formData, name: e.target.value})}
                                                className="w-full px-4 py-3 rounded-xl bg-background border border-border/60 focus:border-primary outline-none transition-all text-sm font-medium text-content placeholder:text-text-muted/40"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-bold text-content">Email address</label>
                                            <input 
                                                required
                                                type="email" 
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={e => setFormData({...formData, email: e.target.value})}
                                                className="w-full px-4 py-3 rounded-xl bg-background border border-border/60 focus:border-primary outline-none transition-all text-sm font-medium text-content placeholder:text-text-muted/40"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-content">Subject</label>
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="How can we help?"
                                            value={formData.subject}
                                            onChange={e => setFormData({...formData, subject: e.target.value})}
                                            className="w-full px-4 py-3 rounded-xl bg-background border border-border/60 focus:border-primary outline-none transition-all text-sm font-medium text-content placeholder:text-text-muted/40"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-content">Message</label>
                                        <textarea 
                                            required
                                            rows={5}
                                            placeholder="Leave us a message..."
                                            value={formData.message}
                                            onChange={e => setFormData({...formData, message: e.target.value})}
                                            className="w-full px-4 py-3 rounded-xl bg-background border border-border/60 focus:border-primary outline-none transition-all text-sm font-medium text-content placeholder:text-text-muted/40 resize-none"
                                        />
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full py-4 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
                                    >
                                        {status === 'submitting' ? (
                                            <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="size-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </UserAppShell>
    );
};

const ContactCard = ({ icon: Icon, title, desc, value }) => (
    <div className="flex items-start gap-5 p-6 rounded-2xl bg-surface border border-border/40 hover:border-primary/30 transition-all group">
        <div className="size-12 rounded-xl bg-background border border-border/60 flex items-center justify-center text-text-muted group-hover:text-primary transition-colors shrink-0">
            <Icon className="size-5" />
        </div>
        <div className="flex flex-col gap-1">
            <h4 className="text-base font-bold text-content">{title}</h4>
            <p className="text-sm font-medium text-text-muted">{desc}</p>
            <span className="text-sm font-semibold text-primary mt-1">{value}</span>
        </div>
    </div>
);

export default SupportHubPage;
