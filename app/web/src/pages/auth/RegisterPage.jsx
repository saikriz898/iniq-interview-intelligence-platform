import React, { useState, useEffect } from 'react';
import { 
  Building2, Mail, Lock, Eye, EyeOff, User, 
  MapPin, Briefcase, GraduationCap, 
  Globe, ShieldCheck, CheckCircle2, ChevronRight, FileText, 
  Rocket, ArrowRight, ArrowLeft, Sun, Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import InternalPreloader from '../../components/common/InternalPreloader';

const Linkedin = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const Github = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

/**
 * --- INIQ AUTH: FULL REGISTER FLOW ---
 * Features: 7-step onboarding process, internal top navbar, and split-view layout.
 */
const RegisterPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [redirectCountdown, setRedirectCountdown] = useState(4);
  const [isCreating, setIsCreating] = useState(false);
  const { theme, toggleTheme, setIsLoading } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Premium Initialization Simulation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Timer for Resend Link
  React.useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleResendEmail = () => {
    if (resendTimer === 0) {
      setResendTimer(30);
      // Logic to resend email would go here
    }
  };

  const handleCreateAccount = () => {
    setIsCreating(true);
    // Simulate 3D animation / account creation delay
    setTimeout(() => {
      setIsCreating(false);
      setStep(6);
    }, 3000);
  };

  // Redirect to login after 4 seconds once success step is reached
  React.useEffect(() => {
    let timer;
    let countInterval;
    if (step === 6) {
      countInterval = setInterval(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);

      timer = setTimeout(() => {
        navigate('/login');
      }, 4000);
    }
    return () => {
      clearTimeout(timer);
      clearInterval(countInterval);
    };
  }, [step, navigate]);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: '',
    experience: '',
    college: '',
    location: '',
    interest: '',
    linkedin: '',
    github: '',
    portfolio: '',
    resume: null
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => prev + (prev === 0 ? 0.5 : prev === 0.5 ? 0.5 : 1));
  const prevStep = () => setStep(prev => prev - (prev === 1 ? 0.5 : prev === 0.5 ? 0.5 : 1));

  // STEP RENDERERS
  const renderStepContent = () => {
    switch (step) {
      case 0: return <Step0DomainSelection nextStep={nextStep} updateFormData={updateFormData} email={formData.email} />;
      case 0.5: return (
        <Step0Point5Verification 
          nextStep={nextStep} 
          prevStep={prevStep} 
          email={formData.email} 
          resendTimer={resendTimer}
          onResend={handleResendEmail}
        />
      );
      case 1: return <Step1Name nextStep={nextStep} prevStep={prevStep} formData={formData} updateFormData={updateFormData} />;
      case 2: return <Step2Password nextStep={nextStep} prevStep={prevStep} formData={formData} updateFormData={updateFormData} showPassword={showPassword} setShowPassword={setShowPassword} />;
      case 3: return <Step3Details nextStep={nextStep} prevStep={prevStep} formData={formData} updateFormData={updateFormData} />;
      case 4: return <Step4Links nextStep={nextStep} prevStep={prevStep} formData={formData} updateFormData={updateFormData} />;
      case 5: return <Step5Review nextStep={handleCreateAccount} prevStep={prevStep} formData={formData} isCreating={isCreating} />;
      case 6: return <Step6Success countdown={redirectCountdown} />;
      default: return null;
    }
  };

  const renderLeftVisual = () => {
    switch (step) {
      case 0: return <VisualMethods />;
      case 0.5: return <VisualVerification />;
      case 1: return <VisualNameCard formData={formData} />;
      case 2: return <VisualSecurity />;
      case 3: return <VisualProfilePreview formData={formData} />;
      case 4: return <VisualSocialPreview formData={formData} />;
      case 5: return <VisualFullProfile formData={formData} />;
      case 6: return <VisualSuccess />;
      default: return null;
    }
  };

  return (
    <>
      <InternalPreloader isLoaded={isLoaded} />
      <div className="h-screen w-full bg-background flex flex-col overflow-hidden">
      
      {/* 1. TOP NAVBAR */}
      <nav className="relative z-20 w-full h-16 sm:h-20 border-b border-border/40 px-6 sm:px-12 flex items-center justify-between bg-surface/50 backdrop-blur-md">
        <Link 
          to="/" 
          onClick={() => setIsLoading(true)}
          className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-text-muted hover:text-primary transition-colors group"
        >
          <ArrowLeft className="size-3 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src={theme === 'dark' ? "/assets/logos/logo-dark.svg" : "/assets/logos/logo.svg"} alt="INIQ hub" className="h-7 sm:h-8 w-auto object-contain" />
        </div>

        <button onClick={toggleTheme} className="size-10 rounded-xl bg-surface-hover border border-border/60 flex items-center justify-center text-primary hover:bg-primary/10 transition-all">
          {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
      </nav>

      {/* 2. MAIN SECTION */}
      <div className="flex-1 flex w-full overflow-hidden">
        
        {/* 2.1 LEFT PANEL: Dynamic Context */}
        <div className="hidden lg:flex flex-col w-[40%] bg-surface-hover border-r border-border/40 p-12 xl:p-20 relative overflow-hidden justify-center items-center">
          <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-start gap-10 w-full max-w-[440px]">
            <div className="flex flex-col items-start gap-5">
              <div className="px-3 py-1 bg-primary/10 rounded-full border border-primary/30 w-fit">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Create Account</span>
              </div>
              <h1 className="text-4xl xl:text-4xl font-black text-content font-['Sora'] leading-[1.1] tracking-tighter">
                Build your <br />
                interview <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">identity.</span>
              </h1>
              <p className="text-sm text-text-muted font-medium leading-relaxed opacity-70">
                Create your account to browse experiences, share your own journey, 
                and manage your profile in one place.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-3.5">
              {[
                "Structured Flow",
                "Identity Verified",
                "Secure Access",
                "Advanced Insights"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <CheckCircle2 className="size-4 text-primary opacity-60 group-hover:opacity-100" />
                  <span className="text-xs font-bold text-content/70 whitespace-nowrap">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Dynamic Visual Area */}
            <div className="w-full mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full"
                >
                  {renderLeftVisual()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 2.2 RIGHT PANEL: Stepper Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-y-auto bg-surface">
          <div className="w-full max-w-[440px] flex flex-col gap-8">
            
            {/* Stepper (Only for steps 0-5) */}
            {step < 6 && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary">
                    {step === 0.5 ? "Verification" : `Step ${Math.floor(step)} of 5`}
                  </span>
                  <div className="flex gap-1.5">
                    {[0, 1, 2, 3, 4, 5].map((s) => (
                      <div 
                        key={s} 
                        className={`h-1 rounded-full transition-all duration-500 ${
                          Math.floor(step) >= s ? "w-4 bg-primary" : "w-1.5 bg-border/40"
                        }`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                {renderStepContent()}
                
                {step < 6 && (
                  <div className="flex flex-col items-center gap-2 mt-4 pt-4 border-t border-border/20">
                    <p className="text-center text-[11px] font-bold text-text-muted">
                      Already have an account? 
                      <Link 
                        to="/login" 
                        onClick={() => setIsLoading(true)}
                        className="text-primary hover:underline ml-2 font-black uppercase tracking-widest text-[10px]"
                      >
                        Sign In
                      </Link>
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

// --- STEP COMPONENTS ---

const Step0DomainSelection = ({ nextStep, updateFormData, email }) => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-1.5 items-center text-center">
      <h2 className="text-3xl font-black text-content font-['Sora'] tracking-tight">Choice how you want to begin</h2>
      <p className="text-text-muted font-medium text-sm opacity-70">Start with your preferred sign-up method.</p>
    </div>
    
    <button className="w-full py-4 px-6 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-all flex items-center justify-center gap-3 shadow-sm active:scale-[0.98]">
      <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" alt="Google" className="size-4" />
      <span className="text-sm font-bold text-content">Continue with Google</span>
    </button>

    <div className="flex items-center gap-4 px-2">
      <div className="h-[1px] flex-1 bg-border/40" />
      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted opacity-40">Or continue with email</span>
      <div className="h-[1px] flex-1 bg-border/40" />
    </div>

    <div className="space-y-1.5 px-1">
      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5">Email Address</label>
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40" />
        <input 
          type="email" 
          value={email}
          onChange={(e) => updateFormData('email', e.target.value)}
          placeholder="Enter your email" 
          className="w-full py-3.5 pl-11 pr-6 rounded-xl bg-surface-hover border border-border focus:border-primary outline-none transition-all font-bold text-content text-sm" 
        />
      </div>
    </div>

    <button onClick={nextStep} className="w-full btn-primary py-4 text-xs tracking-[0.2em] font-bold mt-2 shadow-xl shadow-primary/10 flex items-center justify-center gap-2">
      Continue <ArrowRight className="size-4" />
    </button>
    <p className="text-center text-[10px] text-text-muted/60 font-bold">You can complete your profile in the next steps.</p>
  </div>
);

const Step0Point5Verification = ({ nextStep, prevStep, email, resendTimer, onResend }) => {
  const openMailApp = () => {
    window.open('https://mail.google.com/', '_blank');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5 items-center text-center">
        <h2 className="text-3xl font-black text-content font-['Sora'] tracking-tight">Verify your email</h2>
        <p className="text-text-muted font-medium text-sm opacity-70 leading-relaxed px-4">
          We’ve sent a verification link to your email. Please verify your account to continue.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 flex flex-col items-center gap-2 text-center">
        <span className="text-[10px] font-black text-primary uppercase tracking-widest opacity-60">Sent to:</span>
        <span className="text-sm font-bold text-content">{email || "example@email.com"}</span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <button onClick={openMailApp} className="py-4 px-4 rounded-xl bg-surface-hover border border-border text-[10px] font-black text-text-muted uppercase tracking-widest hover:text-primary transition-all flex items-center justify-center gap-2">
            <Mail className="size-3.5" /> OPEN MAIL
          </button>
          <button onClick={nextStep} className="btn-primary py-4 text-[10px] tracking-widest font-black shadow-lg">
            I HAVE VERIFIED
          </button>
        </div>
        
        <div className="flex flex-col gap-3">
          {resendTimer > 0 ? (
            <div className="w-full py-4 rounded-xl border border-border/40 text-[10px] font-black uppercase tracking-widest text-text-muted/40 text-center opacity-60">
              RESEND LINK IN {resendTimer}s
            </div>
          ) : (
            <button 
              onClick={onResend} 
              className="w-full py-4 rounded-xl border border-border text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-primary transition-all bg-surface-hover shadow-sm active:scale-[0.98]"
            >
              RESEND VERIFICATION LINK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Step1Name = ({ nextStep, prevStep, formData, updateFormData }) => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-1.5 items-center text-center">
      <h2 className="text-3xl font-black text-content font-['Sora'] tracking-tight">Let's start with your name</h2>
      <p className="text-text-muted font-medium text-sm opacity-70">This helps personalize your account.</p>
    </div>

    <div className="flex flex-col gap-4 px-1">
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5">Full Name</label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40" />
          <input 
            type="text" 
            value={formData.fullName}
            onChange={(e) => updateFormData('fullName', e.target.value)}
            placeholder="Enter your full name" 
            className="w-full py-3.5 pl-11 pr-6 rounded-xl bg-surface-hover border border-border focus:border-primary transition-all font-bold text-content text-sm" 
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5">Username (Optional)</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-primary opacity-60">@</div>
          <input 
            type="text" 
            value={formData.username}
            onChange={(e) => updateFormData('username', e.target.value)}
            placeholder="Choose a username" 
            className="w-full py-3.5 pl-11 pr-6 rounded-xl bg-surface-hover border border-border focus:border-primary transition-all font-bold text-content text-sm" 
          />
        </div>
      </div>
    </div>

    <div className="mt-2">
      <button onClick={nextStep} className="btn-primary w-full py-4 text-xs tracking-[0.2em] font-black shadow-lg">Continue</button>
    </div>
  </div>
);

const Step2Password = ({ nextStep, prevStep, formData, updateFormData, showPassword, setShowPassword }) => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-1.5 items-center text-center">
      <h2 className="text-3xl font-black text-content font-['Sora'] tracking-tight">Create your password</h2>
      <p className="text-text-muted font-medium text-sm opacity-70">Set a secure password for your account.</p>
    </div>

    <div className="flex flex-col gap-4 px-1">
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5">Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40" />
          <input 
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => updateFormData('password', e.target.value)}
            placeholder="Enter your password" 
            className="w-full py-3.5 pl-11 pr-12 rounded-xl bg-surface-hover border border-border focus:border-primary transition-all font-bold text-content text-sm" 
          />
          <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted/40">
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40" />
          <input 
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => updateFormData('confirmPassword', e.target.value)}
            placeholder="Re-enter your password" 
            className="w-full py-3.5 pl-11 pr-6 rounded-xl bg-surface-hover border border-border focus:border-primary transition-all font-bold text-content text-sm" 
          />
        </div>
      </div>
      <p className="text-[9px] font-bold text-text-muted/60 mt-1">Password must include at least 8 characters.</p>
    </div>

    <div className="mt-2">
      <button onClick={nextStep} className="btn-primary w-full py-4 text-xs tracking-[0.2em] font-black shadow-lg">Continue</button>
    </div>
  </div>
);

const Step3Details = ({ nextStep, prevStep, formData, updateFormData }) => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-1.5 items-center text-center">
      <h2 className="text-3xl font-black text-content font-['Sora'] tracking-tight">Tell us about your background</h2>
      <p className="text-text-muted font-medium text-sm opacity-70">Add a few details to complete your profile.</p>
    </div>

    <div className="grid grid-cols-2 gap-4 px-1">
      <div className="col-span-2 space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5">Role / Profession</label>
        <select 
          value={formData.role}
          onChange={(e) => updateFormData('role', e.target.value)}
          className="w-full py-3.5 px-4 rounded-xl bg-surface-hover border border-border focus:border-primary outline-none transition-all font-bold text-content text-sm appearance-none"
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="sde">SDE</option>
          <option value="frontend">Frontend Developer</option>
          <option value="backend">Backend Engineer</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5">Experience</label>
        <select 
          value={formData.experience}
          onChange={(e) => updateFormData('experience', e.target.value)}
          className="w-full py-3.5 px-4 rounded-xl bg-surface-hover border border-border focus:border-primary appearance-none font-bold text-content text-sm"
        >
          <option value="">Fresher</option>
          <option value="1+">1+ Years</option>
          <option value="2+">2+ Years</option>
          <option value="3+">3+ Years</option>
        </select>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5">Primary Interest</label>
        <select 
          value={formData.interest}
          onChange={(e) => updateFormData('interest', e.target.value)}
          className="w-full py-3.5 px-4 rounded-xl bg-surface-hover border border-border focus:border-primary appearance-none font-bold text-content text-sm"
        >
          <option value="dsa">DSA</option>
          <option value="hld">HLD</option>
          <option value="lld">LLD</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
      </div>
      <div className="col-span-2 space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5">College / Company</label>
        <input 
          type="text" 
          value={formData.college}
          onChange={(e) => updateFormData('college', e.target.value)}
          placeholder="Enter college or company" 
          className="w-full py-3.5 px-4 rounded-xl bg-surface-hover border border-border focus:border-primary transition-all font-bold text-content text-sm" 
        />
      </div>
    </div>

    <div className="mt-2">
      <button onClick={nextStep} className="btn-primary w-full py-4 text-xs tracking-[0.2em] font-black shadow-lg">Continue</button>
    </div>
  </div>
);

const Step4Links = ({ nextStep, prevStep, formData, updateFormData }) => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-1.5 items-center text-center">
      <h2 className="text-3xl font-black text-content font-['Sora'] tracking-tight">Add links and details</h2>
      <p className="text-text-muted font-medium text-sm opacity-70">These help build a stronger profile.</p>
    </div>

    <div className="flex flex-col gap-4 px-1">
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5 whitespace-nowrap overflow-hidden text-ellipsis">LinkedIn URL</label>
        <div className="relative">
          <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40" />
          <input 
            type="text" 
            value={formData.linkedin}
            onChange={(e) => updateFormData('linkedin', e.target.value)}
            placeholder="Paste LinkedIn URL" 
            className="w-full py-3.5 pl-11 pr-6 rounded-xl bg-surface-hover border border-border focus:border-primary transition-all font-bold text-content text-sm" 
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5">GitHub / Portfolio</label>
        <div className="relative">
          <Github className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40" />
          <input 
            type="text" 
            value={formData.github}
            onChange={(e) => updateFormData('github', e.target.value)}
            placeholder="Paste GitHub or Portfolio URL" 
            className="w-full py-3.5 pl-11 pr-6 rounded-xl bg-surface-hover border border-border focus:border-primary transition-all font-bold text-content text-sm" 
          />
        </div>
      </div>
      
      <div className="mt-2 text-center">
        <label className="w-full py-6 border-2 border-dashed border-border/60 rounded-3xl flex flex-col items-center gap-3 cursor-pointer hover:bg-primary/5 hover:border-primary/40 transition-all">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
            <FileText className="size-5 text-primary" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-black text-content">Upload Resume</span>
            <span className="text-[10px] font-bold text-text-muted">PDF up to 5MB</span>
          </div>
          <input type="file" className="hidden" />
        </label>
      </div>
      <p className="text-center text-[10px] font-bold text-text-muted/60">All fields in this step are optional.</p>
    </div>

    <div className="mt-2">
      <button onClick={nextStep} className="btn-primary w-full py-4 text-xs tracking-[0.2em] font-black shadow-lg">Continue</button>
    </div>
  </div>
);

const Step5Review = ({ nextStep, prevStep, formData, isCreating }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [understoodReview, setUnderstoodReview] = useState(false);

  return (
    <div className="flex flex-col gap-6 relative">
      <AnimatePresence>
        {isCreating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-surface/80 backdrop-blur-md rounded-[2rem] flex flex-col items-center justify-center gap-8"
          >
            {/* 3D Loading Animation */}
            <div className="relative size-32 perspective-1000">
              <motion.div
                animate={{ 
                  rotateX: [0, 360],
                  rotateY: [0, 360],
                  rotateZ: [0, 360]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 border-4 border-primary rounded-2xl shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)]"
              />
              <motion.div
                animate={{ 
                  rotateX: [360, 0],
                  rotateY: [360, 0],
                  rotateZ: [360, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-4 border-4 border-accent rounded-xl opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Rocket className="size-8 text-primary animate-bounce" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-black uppercase tracking-[0.3em] text-primary animate-pulse">Creating Account</span>
              <span className="text-[10px] font-bold text-text-muted opacity-60 italic">Architecting your experience...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`${isCreating ? 'opacity-20 pointer-events-none scale-95 blur-sm' : ''} transition-all duration-500 flex flex-col gap-6`}>
        <div className="flex flex-col gap-1.5 items-center text-center">
          <h2 className="text-3xl font-black text-content font-['Sora'] tracking-tight">Review your profile</h2>
          <p className="text-text-muted font-medium text-sm opacity-70">Make sure everything looks correct.</p>
        </div>

        <div className="glass-strong p-6 rounded-[2rem] border border-border/40 flex flex-col gap-4">
          {[
            { label: "Full Name", value: formData.fullName || "Sai Krishnan" },
            { label: "Email", value: formData.email || "sai@example.com" },
            { label: "Role", value: formData.role || "Frontend Developer" },
            { label: "Interest", value: formData.interest || "DSA / Full Stack" }
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{item.label}</span>
              <span className="text-xs font-bold text-content text-right">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 px-1">
          <label className="flex items-start gap-4 cursor-pointer group">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={agreedToTerms}
              onChange={() => setAgreedToTerms(!agreedToTerms)}
            />
            <div className={`size-5 rounded-md border-2 transition-all flex-shrink-0 mt-0.5 flex items-center justify-center ${
              agreedToTerms ? 'bg-primary border-primary' : 'border-border/60 group-hover:border-primary/50 bg-transparent'
            }`}>
              {agreedToTerms && <CheckCircle2 className="size-3.5 text-white" />}
            </div>
            <span className="text-[11px] font-medium text-text-muted leading-relaxed select-none">
              I agree to the <span className="text-primary hover:underline font-bold">Terms</span> and <span className="text-primary hover:underline font-bold">Privacy Policy</span>
            </span>
          </label>

          <label className="flex items-start gap-4 cursor-pointer group">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={understoodReview}
              onChange={() => setUnderstoodReview(!understoodReview)}
            />
            <div className={`size-5 rounded-md border-2 transition-all flex-shrink-0 mt-0.5 flex items-center justify-center ${
              understoodReview ? 'bg-primary border-primary' : 'border-border/60 group-hover:border-primary/50 bg-transparent'
            }`}>
              {understoodReview && <CheckCircle2 className="size-3.5 text-white" />}
            </div>
            <span className="text-[11px] font-medium text-text-muted leading-relaxed select-none">
              I understand that submitted content may be reviewed by admins.
            </span>
          </label>
        </div>

        <div className="mt-2">
          <button 
            onClick={nextStep} 
            disabled={!agreedToTerms || !understoodReview}
            className={`w-full py-4 text-xs tracking-[0.2em] font-black rounded-xl transition-all duration-300 ${
              !agreedToTerms || !understoodReview
                ? 'bg-border/20 text-text-muted cursor-not-allowed grayscale'
                : 'btn-primary shadow-xl shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
            }`}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

const Step6Success = ({ countdown }) => {
  return (
    <div className="flex flex-col gap-6 items-center text-center py-6 relative overflow-hidden">
      {/* 1. Cyber-Portal Success Indicator (Compact) */}
      <div className="relative size-32 flex items-center justify-center">
        {/* Outer Rotating Rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-[1px] border-dashed border-green-500/30 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border-[1.5px] border-green-500/10 rounded-full"
        />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-5 border-t-2 border-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.3)]"
        />

        {/* Inner Core with Holographic Pulse */}
        <div className="relative size-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.15)] overflow-hidden">
          <ShieldCheck className="size-8 text-green-500 relative z-10" />
          <motion.div 
            animate={{ top: ['-20%', '120%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-green-500/20 to-transparent pointer-events-none"
          />
        </div>
      </div>

      {/* 2. Success Status */}
      <div className="flex flex-col gap-5 relative z-10">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-green-500">Identity Secured</span>
          </div>
          <h2 className="text-3xl font-black text-content font-['Sora'] tracking-tighter italic">
            INITIATING <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">ACCESS.</span>
          </h2>
        </div>
        
        <div className="flex flex-col items-center gap-3 px-6 max-w-[340px] mx-auto">
          <p className="text-text-muted font-bold text-[9px] opacity-60 uppercase tracking-widest">
            Redirecting in <span className="text-primary font-black">{countdown}s</span>
          </p>
          
          <div className="w-full h-1 bg-surface-hover rounded-full border border-border/10 overflow-hidden relative">
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: `${(countdown / 4) * 100}%` }}
              transition={{ duration: 1, ease: "linear" }}
              className="absolute left-0 inset-y-0 bg-gradient-to-r from-primary to-accent shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
            />
          </div>
        </div>
      </div>

      {/* 3. Action Hub */}
      <div className="w-full flex flex-col gap-4 mt-2">
        <Link 
          to="/login" 
          className="btn-primary w-full py-4 rounded-xl text-[10px] tracking-[0.2em] font-black shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          MANUAL BYPASS <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <span className="text-[8px] font-bold text-text-muted/30 uppercase tracking-[0.3em]">Module INIQ-X03 Ready</span>
      </div>
    </div>
  );
};

// --- VISUAL COMPONENTS (LEFT SIDE) ---

const VisualMethods = () => (
  <div className="flex flex-col gap-4 animate-pulse px-4">
    <div className="h-12 w-full bg-white/5 border border-white/10 rounded-2xl" />
    <div className="h-12 w-2/3 bg-white/5 border border-white/10 rounded-2xl opacity-60" />
    <div className="h-12 w-full bg-white/5 border border-white/10 rounded-2xl opacity-30" />
  </div>
);

const VisualVerification = () => (
  <div className="flex justify-center p-8">
    <div className="relative">
      <div className="size-32 rounded-full bg-primary/10 border-4 border-primary/20 flex items-center justify-center animate-pulse">
        <Mail className="size-12 text-primary" />
      </div>
      <div className="absolute -top-2 -right-2 size-8 rounded-full bg-accent flex items-center justify-center shadow-lg animate-bounce">
        <CheckCircle2 className="size-4 text-white" />
      </div>
    </div>
  </div>
);

const VisualNameCard = ({ formData }) => (
  <div className="glass-strong p-8 rounded-[3rem] border border-white/10 shadow-2xl text-left scale-90">
    <div className="flex items-center gap-4 mb-6">
      <div className="size-16 rounded-3xl bg-primary flex items-center justify-center text-3xl">👤</div>
      <div className="flex flex-col">
        <div className="h-5 w-40 bg-white/10 rounded-lg mb-1.5 animate-pulse" />
        <div className="h-3 w-24 bg-white/5 rounded-md animate-pulse" />
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-3 w-full bg-white/5 rounded-md" />
      <div className="h-3 w-3/4 bg-white/5 rounded-md" />
    </div>
  </div>
);

const VisualSecurity = () => (
  <div className="flex justify-center p-8">
    <div className="relative">
      <div className="size-40 rounded-[3rem] bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-white/10 flex items-center justify-center backdrop-blur-3xl">
        <Lock className="size-16 text-white opacity-40 animate-pulse" />
      </div>
      <div className="absolute inset-0 bg-primary/5 rounded-[3rem] animate-ping opacity-20" />
    </div>
  </div>
);

const VisualProfilePreview = ({ formData }) => (
  <div className="glass-strong p-6 rounded-[2rem] border border-white/10 shadow-2xl text-left flex flex-col gap-5 scale-95 opacity-80 backdrop-blur-3xl">
    <div className="flex items-center gap-3">
      <div className="size-10 rounded-xl bg-accent flex items-center justify-center text-xl">🎓</div>
      <div className="h-4 w-32 bg-white/10 rounded-lg" />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div className="h-14 bg-white/5 rounded-2xl" />
      <div className="h-14 bg-white/5 rounded-2xl" />
    </div>
    <div className="h-20 bg-white/5 rounded-2xl" />
  </div>
);

const VisualSocialPreview = ({ formData }) => (
  <div className="flex flex-col gap-4 px-6 animate-float">
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
      <Linkedin className="size-5 text-blue-400" />
      <div className="h-3 w-32 bg-white/10 rounded-md" />
    </div>
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 opacity-70">
      <Github className="size-5 text-content" />
      <div className="h-3 w-24 bg-white/10 rounded-md" />
    </div>
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 opacity-40">
      <Globe className="size-5 text-accent" />
      <div className="h-3 w-40 bg-white/10 rounded-md" />
    </div>
  </div>
);

const VisualFullProfile = ({ formData }) => (
  <div className="relative group perspective-1000">
    <div className="glass-strong p-6 rounded-[2rem] border-2 border-primary/20 shadow-[0_0_50px_rgba(var(--primary-rgb),0.2)] transform rotate-y-12 group-hover:rotate-y-0 transition-transform duration-700">
      <div className="flex items-center gap-4 mb-4">
        <div className="size-12 rounded-2xl bg-primary flex items-center justify-center text-xl">🚀</div>
        <div className="flex flex-col gap-1">
          <div className="h-4 w-28 bg-white/20 rounded-md" />
          <div className="h-2 w-16 bg-white/10 rounded-sm" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-2 w-full bg-white/5 rounded-sm" />
        <div className="h-2 w-3/4 bg-white/5 rounded-sm" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-8 bg-white/5 rounded-lg" />
          <div className="h-8 bg-white/5 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

const VisualSuccess = () => (
  <div className="relative flex items-center justify-center p-12">
    <div className="size-48 rounded-full bg-green-500/20 border-2 border-green-500/40 animate-spin-slow" />
    <div className="absolute size-40 rounded-full bg-green-500/20 border-2 border-green-500/40 animate-reverse-spin" />
    <ShieldCheck className="absolute size-20 text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
  </div>
);

export default RegisterPage;
