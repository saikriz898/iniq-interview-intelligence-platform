import React from 'react';
import { Shield, Lock, Eye, Database, Globe, ArrowLeft } from 'lucide-react';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicyPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();

    const sections = [
        {
            title: "1. Information We Collect",
            icon: Database,
            content: "We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested, delivery notes, and other information you choose to provide."
        },
        {
            title: "2. How We Use Your Information",
            icon: Shield,
            content: "We use the information we collect about you to provide, maintain, and improve our Services, such as to facilitate payments, send receipts, provide products and services you request (and send related information), develop new features, provide customer support to Users, develop safety features, authenticate users, and send product updates and administrative messages."
        },
        {
            title: "3. Sharing of Information",
            icon: Globe,
            content: "We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including as follows: With third party service providers; With the general public if you submit content in a public forum, such as blog comments, social media posts, or other features of our Services that are viewable by the general public."
        },
        {
            title: "4. Security Measures",
            icon: Lock,
            content: "We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. We utilize modern encryption standards to protect your sensitive data in transit and at rest."
        },
        {
            title: "5. Your Privacy Rights",
            icon: Eye,
            content: "You have the right to request access to or deletion of your personal data. You can also object to the processing of your personal data, ask us to restrict processing of your personal data or request portability of your personal data. To exercise these rights, please contact our Data Protection Officer."
        }
    ];

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

                    <div className="max-w-3xl mx-auto w-full px-6 md:px-12 flex flex-col gap-6 mt-4">
                        <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                            <Shield className="size-8" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-content tracking-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-base font-medium text-text-muted">
                            Last updated: June 18, 2026
                        </p>
                    </div>
                </div>

                {/* 2. CONTENT */}
                <div className="max-w-3xl mx-auto w-full px-6 md:px-12 py-16 flex flex-col gap-12">
                    
                    <div className="prose prose-invert max-w-none">
                        <p className="text-base font-medium text-text-secondary leading-relaxed mb-8">
                            At INIQ, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                        </p>
                    </div>

                    <div className="flex flex-col gap-10">
                        {sections.map((section, idx) => (
                            <div key={idx} className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-xl bg-surface border border-border/60 flex items-center justify-center text-primary shadow-sm">
                                        <section.icon className="size-5" />
                                    </div>
                                    <h2 className="text-xl font-bold text-content">{section.title}</h2>
                                </div>
                                <p className="text-base font-medium text-text-secondary leading-relaxed pl-13">
                                    {section.content}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="pt-10 border-t border-border/40 mt-6">
                        <h3 className="text-lg font-bold text-content mb-4">Contact Us</h3>
                        <p className="text-base font-medium text-text-secondary leading-relaxed">
                            If you have questions or comments about this Privacy Policy, please contact us at:
                            <br/><br/>
                            <strong>INIQ Data Protection</strong><br/>
                            100 Innovation Drive<br/>
                            San Francisco, CA 94105<br/>
                            Email: privacy@iniq.io
                        </p>
                    </div>
                </div>

            </div>
        </UserAppShell>
    );
};

export default PrivacyPolicyPage;
