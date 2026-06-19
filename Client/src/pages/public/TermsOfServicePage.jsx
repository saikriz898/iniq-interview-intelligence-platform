import React from 'react';
import { FileText, CheckCircle, AlertTriangle, Users, BookOpen, ArrowLeft } from 'lucide-react';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate } from 'react-router-dom';

const TermsOfServicePage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();

    const sections = [
        {
            title: "1. Acceptance of Terms",
            icon: CheckCircle,
            content: "By accessing and using INIQ's services, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service."
        },
        {
            title: "2. User Conduct and Responsibilities",
            icon: Users,
            content: "As a user of our platform, you agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password that you use to access the service and for any activities or actions under your password, whether your password is with our service or a third-party service."
        },
        {
            title: "3. Intellectual Property Rights",
            icon: BookOpen,
            content: "The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of INIQ and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of INIQ."
        },
        {
            title: "4. Limitations of Liability",
            icon: AlertTriangle,
            content: "In no event shall INIQ, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service."
        },
        {
            title: "5. Modifications to Service",
            icon: FileText,
            content: "We reserve the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that INIQ shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service."
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
                            <FileText className="size-8" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-content tracking-tight">
                            Terms of Service
                        </h1>
                        <p className="text-base font-medium text-text-muted">
                            Effective Date: June 18, 2026
                        </p>
                    </div>
                </div>

                {/* 2. CONTENT */}
                <div className="max-w-3xl mx-auto w-full px-6 md:px-12 py-16 flex flex-col gap-12">
                    
                    <div className="prose prose-invert max-w-none">
                        <p className="text-base font-medium text-text-secondary leading-relaxed mb-8">
                            Please read these terms of service carefully before using the INIQ platform. These terms outline the rules and regulations for the use of our website and services.
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
                        <h3 className="text-lg font-bold text-content mb-4">Governing Law</h3>
                        <p className="text-base font-medium text-text-secondary leading-relaxed">
                            These Terms shall be governed and construed in accordance with the laws of California, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                        </p>
                    </div>
                </div>

            </div>
        </UserAppShell>
    );
};

export default TermsOfServicePage;
