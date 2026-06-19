import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, UserCircle2, Briefcase, GraduationCap, MapPin, Linkedin, Github, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Code2, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import toast, { Toaster } from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * --- INIQ PREMIUM WIZARD REGISTER PAGE ---
 * Combines the high-end Split-Screen UI with the Step-by-Step flow.
 */
const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { theme, setUser } = useGlobalContext();
  const navigate = useNavigate();

  // Animation states
  const [errorBanner, setErrorBanner] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [welcomeUser, setWelcomeUser] = useState(null);
  
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    domain: '',
    customDomain: '',
    college: '',
    location: '',
    linkedin: '',
    github: ''
  });

  // Reset state on mount
  useEffect(() => {
    setStep(1);
    setIsLoginSuccess(false);
    setIsRegisterSuccess(false);
    setIsAuthLoading(false);
    setErrorBanner('');
    setEmailError('');
    setPasswordError('');
    setFormData({
      name: '', email: '', password: '', confirmPassword: '', 
      domain: '', customDomain: '', college: '', location: '', linkedin: '', github: ''
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorBanner) setErrorBanner('');
  };

  const triggerError = (msg) => {
    setErrorBanner(msg);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      return !data.available;
    } catch (err) {
      return false;
    }
  };

  // Real-time debounced email validation
  useEffect(() => {
    let redirectTimer;
    const checkEmail = async () => {
      if (!formData.email) {
        setEmailError('');
        return;
      }
      const isTaken = await checkEmailExists(formData.email);
      if (isTaken) {
        setEmailError('Email already registered! Redirecting to login...');
        redirectTimer = setTimeout(() => {
          navigate('/login', { state: { email: formData.email } });
        }, 2500);
      } else {
        setEmailError('');
      }
    };
    const timer = setTimeout(checkEmail, 600);
    return () => {
      clearTimeout(timer);
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [formData.email, navigate]);

  // Real-time password validation
  useEffect(() => {
    if (formData.password && formData.password.length > 0 && formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  }, [formData.password]);

  const handleNext = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.name || !formData.email) {
        triggerError('Please fill in all details');
        return;
      }

      setIsCheckingEmail(true);
      const isTaken = await checkEmailExists(formData.email);
      setIsCheckingEmail(false);

      if (isTaken) {
        setEmailError('Email already taken, please provide another');
        triggerError('Email is unavailable');
        return;
      }
      
      setStep(2);
    } 
    else if (step === 2) {
      if (formData.password.length < 6) {
        setPasswordError('Password must be at least 6 characters');
        triggerError('Password is too short');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        triggerError('Passwords do not match');
        return;
      }
      if (!formData.domain || (formData.domain === 'Other' && !formData.customDomain)) {
        triggerError('Please select a primary role');
        return;
      }
      setStep(3);
    }
  };

  const handleBack = () => {
    setErrorBanner('');
    setStep(prev => prev - 1);
  };

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsAuthLoading(true);
      try {
        const response = await fetch('/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken: tokenResponse.access_token })
        });

        const data = await response.json();
        if (data.success) {
          const userObj = { email: data.user.email, name: data.user.name, role: data.user.role, token: data.token };
          setUser(userObj);
          localStorage.setItem('iniq_user', JSON.stringify(userObj));
          localStorage.setItem('iniq_token', data.token);
          
          setWelcomeUser(userObj);
          setIsLoginSuccess(true);
          
          setTimeout(() => {
            setIsAuthLoading(false);
            navigate(userObj.role === 'admin' ? '/admin/dashboard' : '/dashboard');
          }, 2000);
        } else {
          setIsAuthLoading(false);
          triggerError(data.error || 'Google auth failed');
        }
      } catch (error) {
        setIsAuthLoading(false);
        triggerError('Connection error. Please try again.');
      }
    },
    onError: () => toast.error('Google auth was unsuccessful')
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.college || !formData.location || !formData.linkedin || !formData.github) {
      triggerError('Please fill all professional details');
      return;
    }

    setIsAuthLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name, 
          email: formData.email, 
          password: formData.password,
          domain: formData.domain === 'Other' ? formData.customDomain : formData.domain,
          college: formData.college,
          location: formData.location,
          linkedin: formData.linkedin,
          github: formData.github
        })
      });
      const data = await response.json();
      if (data.success) {
        setIsAuthLoading(false);
        setIsRegisterSuccess(true);
        setTimeout(() => {
          setIsRegisterSuccess(false);
          navigate('/login');
        }, 2000);
      } else {
        setIsAuthLoading(false);
        triggerError(data.error || 'Registration failed');
      }
    } catch (error) {
      setIsAuthLoading(false);
      triggerError('Connection error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex">
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: theme === 'dark' ? '#1a1a1a' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold',
            fontFamily: 'Sora'
          }
        }}
      />
      
      {/* Left Panel - Premium Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex w-5/12 bg-surface border-r border-border/50 flex-col justify-between p-12 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
        
        <div className="relative z-10">
          <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
             <img src={theme === 'dark' ? "/assets/logos/logo-dark.png" : "/assets/logos/logo.png"} alt="INIQ" className="h-8 w-auto object-contain" />
          </Link>
          <div className="mt-24 space-y-6">
            <h1 className="text-5xl font-black text-content font-['Sora'] leading-[1.1] tracking-tight">
              Start your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                engineering journey
              </span>
            </h1>
            <p className="text-text-muted text-lg max-w-md font-medium leading-relaxed">
              Join thousands of developers sharing real interview experiences, cracking system designs, and landing their dream roles.
            </p>
          </div>
          
          <div className="mt-16 space-y-8">
             <div className="flex items-center gap-5">
               <div className="size-14 rounded-2xl bg-surface-hover border border-border flex items-center justify-center shadow-sm">
                 <Sparkles className="size-6 text-primary" />
               </div>
               <div>
                 <h4 className="text-content font-bold text-base tracking-tight">AI-Powered Insights</h4>
                 <p className="text-text-muted text-sm mt-1">Get custom roadmaps tailored to your target role.</p>
               </div>
             </div>
             <div className="flex items-center gap-5">
               <div className="size-14 rounded-2xl bg-surface-hover border border-border flex items-center justify-center shadow-sm">
                 <Code2 className="size-6 text-primary" />
               </div>
               <div>
                 <h4 className="text-content font-bold text-base tracking-tight">Real Experiences</h4>
                 <p className="text-text-muted text-sm mt-1">Learn directly from candidates who cleared FAANG.</p>
               </div>
             </div>
          </div>
        </div>
        
        <div className="relative z-10 flex items-center gap-4">
          <p className="text-xs font-bold text-text-muted/60 uppercase tracking-widest">
            © {new Date().getFullYear()} INIQ Platform
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-7/12 flex flex-col justify-center items-center p-6 sm:p-12 relative min-h-screen overflow-y-auto bg-background/50">
        
        {/* Mobile Navbar */}
        <nav className="lg:hidden absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
          <Link to="/" className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-text-muted hover:text-primary transition-colors">
            Back
          </Link>
          <img src={theme === 'dark' ? "/assets/logos/logo-dark.png" : "/assets/logos/logo.png"} alt="INIQ" className="h-5 w-auto object-contain" />
        </nav>

        <div className="w-full max-w-[440px] flex flex-col gap-8 py-16">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl sm:text-4xl font-black text-content font-['Sora'] tracking-tight">Create your account</h2>
            <p className="text-text-muted font-medium text-sm">
              Step {step} of 3: {step === 1 ? 'Personal Details' : step === 2 ? 'Security & Role' : 'Professional Links'}
            </p>
            
            {/* Progress Bar */}
            <div className="flex gap-2 mt-2">
              <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-border'}`} />
              <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-border'}`} />
              <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-border'}`} />
            </div>
          </div>

          {step === 1 && (
            <>
              <button 
                onClick={() => handleGoogleAuth()}
                className="w-full py-4 px-6 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-sm"
              >
                <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" alt="Google" className="size-5" />
                <span className="text-sm font-bold text-content">Sign up with Google</span>
              </button>

              <div className="flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-border/60" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted whitespace-nowrap">Or register with email</span>
                <div className="h-[1px] flex-1 bg-border/60" />
              </div>
            </>
          )}

          <motion.form 
            className="flex flex-col gap-5" 
            onSubmit={step === 3 ? handleSubmit : handleNext}
            animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {/* Error Banner */}
            <AnimatePresence>
              {errorBanner && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="bg-danger/10 border border-danger/40 text-danger text-sm font-bold px-5 py-4 rounded-xl flex items-center gap-3"
                >
                  <ShieldCheck className="size-5 shrink-0" />
                  <span className="leading-snug">{errorBanner}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Animation Overlay */}
            <AnimatePresence>
              {isRegisterSuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 bg-background/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center rounded-3xl"
                >
                  <motion.svg className="size-28 text-success mb-6" viewBox="0 0 50 50">
                    <motion.circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
                    <motion.path fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" d="M15 25l7 7 13-13" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.6 }} />
                  </motion.svg>
                  <h3 className="text-2xl font-black text-content font-['Sora'] tracking-tight">Account Created!</h3>
                  <p className="text-base font-medium text-text-muted mt-2">Taking you to login...</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <AnimatePresence mode="wait">
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-5">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-text-muted/80 ml-1">Full Name *</label>
                    <div className="relative group">
                      <UserCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-text-muted/40 group-focus-within:text-primary transition-colors" />
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your name" className="w-full py-4 pl-12 pr-4 rounded-xl bg-surface-hover border border-border focus:border-primary outline-none transition-all font-semibold text-content text-sm" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-text-muted/80 ml-1">Email Address *</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-text-muted/40 group-focus-within:text-primary transition-colors" />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="name@company.com" className={`w-full py-4 pl-12 pr-4 rounded-xl bg-surface-hover border ${emailError ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'} outline-none transition-all font-semibold text-content text-sm`} />
                    </div>
                    {emailError && (
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-danger text-[10px] font-black uppercase tracking-widest ml-1 mt-1">
                        {emailError}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-5">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-text-muted/80 ml-1">Password *</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-text-muted/40 group-focus-within:text-primary transition-colors" />
                      <input type={showPassword ? "text" : "password"} name="password" required minLength="6" value={formData.password} onChange={handleChange} placeholder="Create a password" className={`w-full py-4 pl-12 pr-12 rounded-xl bg-surface-hover border ${passwordError ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'} outline-none transition-all font-semibold text-content text-sm`} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted/40 hover:text-primary transition-colors">
                        {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                      </button>
                    </div>
                    {passwordError && (
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-danger text-[10px] font-black uppercase tracking-widest ml-1 mt-1">
                        {passwordError}
                      </motion.p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-text-muted/80 ml-1">Confirm Password *</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-text-muted/40 group-focus-within:text-primary transition-colors" />
                      <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" required minLength="6" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" className="w-full py-4 pl-12 pr-12 rounded-xl bg-surface-hover border border-border focus:border-primary outline-none transition-all font-semibold text-content text-sm" />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted/40 hover:text-primary transition-colors">
                        {showConfirmPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-text-muted/80 ml-1">Primary Domain / Role *</label>
                    <div className="relative group">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-text-muted/40 group-focus-within:text-primary transition-colors pointer-events-none" />
                      <select name="domain" value={formData.domain} onChange={handleChange} required className="w-full py-4 pl-12 pr-10 rounded-xl bg-surface-hover border border-border focus:border-primary outline-none transition-all font-semibold text-content text-sm appearance-none cursor-pointer">
                        <option value="" disabled>Select your role</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Full Stack Developer">Full Stack Developer</option>
                        <option value="Mobile Developer">Mobile Developer</option>
                        <option value="Data Scientist">Data Scientist</option>
                        <option value="DevOps Engineer">DevOps Engineer</option>
                        <option value="UI/UX Designer">UI/UX Designer</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  {formData.domain === 'Other' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-text-muted/80 ml-1">Specify your role *</label>
                      <input type="text" name="customDomain" value={formData.customDomain} onChange={handleChange} placeholder="e.g. Security Researcher" className="w-full py-4 px-5 rounded-xl bg-surface-hover border border-border focus:border-primary outline-none transition-all font-semibold text-content text-sm" />
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-5">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-text-muted/80 ml-1">College / University *</label>
                    <div className="relative group">
                      <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-text-muted/40 group-focus-within:text-primary transition-colors" />
                      <input type="text" name="college" value={formData.college} onChange={handleChange} required placeholder="e.g. Stanford University" className="w-full py-4 pl-12 pr-4 rounded-xl bg-surface-hover border border-border focus:border-primary outline-none transition-all font-semibold text-content text-sm" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-text-muted/80 ml-1">Location *</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-text-muted/40 group-focus-within:text-primary transition-colors" />
                      <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. San Francisco, CA" className="w-full py-4 pl-12 pr-4 rounded-xl bg-surface-hover border border-border focus:border-primary outline-none transition-all font-semibold text-content text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-text-muted/80 ml-1">LinkedIn *</label>
                      <div className="relative group">
                        <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-colors" />
                        <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} required placeholder="https://..." className="w-full py-4 pl-11 pr-3 rounded-xl bg-surface-hover border border-border focus:border-primary outline-none transition-all font-semibold text-content text-xs" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-text-muted/80 ml-1">GitHub *</label>
                      <div className="relative group">
                        <Github className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-colors" />
                        <input type="url" name="github" value={formData.github} onChange={handleChange} required placeholder="https://..." className="w-full py-4 pl-11 pr-3 rounded-xl bg-surface-hover border border-border focus:border-primary outline-none transition-all font-semibold text-content text-xs" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4 mt-2">
              {step > 1 && (
                <button type="button" onClick={handleBack} className="flex-1 bg-surface-hover hover:bg-border text-content py-4.5 rounded-xl text-sm tracking-[0.2em] font-black transition-all border border-border flex items-center justify-center gap-2 uppercase">
                  <ArrowLeft className="size-4" /> Back
                </button>
              )}
              
              <button 
                disabled={isAuthLoading || isCheckingEmail} 
                type="submit" 
                className="flex-[2] bg-content text-background py-4.5 rounded-xl text-sm tracking-[0.2em] font-black active:scale-[0.98] transition-all uppercase flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
              >
                {isCheckingEmail ? (
                  <><Loader2 className="size-4 animate-spin" /> Checking...</>
                ) : step < 3 ? (
                  <>'Next Step' <ArrowRight className="size-4" /></>
                ) : isAuthLoading ? (
                  'Creating...'
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </motion.form>

          <p className="text-center text-sm font-semibold text-text-muted">
            Already have an account? 
            <Link to="/login" className="text-primary ml-2 font-black uppercase tracking-widest text-[11px] hover:underline underline-offset-4">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
