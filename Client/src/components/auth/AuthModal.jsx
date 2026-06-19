import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Eye, EyeOff, CheckCircle2, UserCircle2, ShieldCheck, Zap, Globe, Briefcase, MapPin, GraduationCap, Github, Linkedin, ArrowRight, ArrowLeft } from 'lucide-react';
import { useGlobalContext } from '../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';

const AuthModal = () => {
  const { authModal, closeAuthModal, setAuthModal, theme, setUser } = useGlobalContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRemembered, setIsRemembered] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  
  // Animation states
  const [errorBanner, setErrorBanner] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [welcomeUser, setWelcomeUser] = useState(null);

  const navigate = useNavigate();
  
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

  const [step, setStep] = useState(1);

  const isLogin = authModal?.view === 'login';

  // Reset state when modal opens
  useEffect(() => {
    if (authModal?.isOpen) {
      setIsLoginSuccess(false);
      setIsRegisterSuccess(false);
      setIsAuthLoading(false);
      setErrorBanner('');
      setFormData({
        name: '', email: '', password: '', confirmPassword: '', 
        domain: '', customDomain: '', college: '', location: '', linkedin: '', github: ''
      });
      setStep(1);
    }
  }, [authModal?.isOpen]);

  // Reset step when toggling between login and register
  useEffect(() => {
    if (isLogin) setStep(1);
  }, [isLogin]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorBanner) setErrorBanner('');
  };

  const triggerError = (msg) => {
    setErrorBanner(msg);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      closeAuthModal();
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
            closeAuthModal();
            if (userObj.role === 'admin') navigate('/admin/dashboard');
            else navigate('/dashboard');
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

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 2) {
      if (formData.password !== formData.confirmPassword) {
        triggerError('Passwords do not match!');
        return;
      }
      if (formData.password.length < 6) {
        triggerError('Password must be at least 6 characters');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      triggerError('Passwords do not match!');
      return;
    }

    setIsAuthLoading(true);
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    // Send all professional data on register
        const body = isLogin 
      ? { email: formData.email, password: formData.password }
      : { 
          name: formData.name, 
          email: formData.email, 
          password: formData.password,
          domain: formData.domain === 'Other' ? formData.customDomain : formData.domain,
          college: formData.college,
          location: formData.location,
          linkedin: formData.linkedin,
          github: formData.github
        };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await response.json();

      if (data.success) {
        if (!isLogin) {
          setIsAuthLoading(false);
          setIsRegisterSuccess(true);
          setTimeout(() => {
            setIsRegisterSuccess(false);
            setStep(1);
            setAuthModal({ isOpen: true, view: 'login' });
          }, 2000);
        } else {
          const userObj = { email: data.user.email, name: data.user.name, role: data.user.role, token: data.token };
          setUser(userObj);
          localStorage.setItem('iniq_user', JSON.stringify(userObj));
          localStorage.setItem('iniq_token', data.token);
          
          setWelcomeUser(userObj);
          setIsLoginSuccess(true);
          
          setTimeout(() => {
            setIsAuthLoading(false);
            closeAuthModal();
            if (userObj.role === 'admin') navigate('/admin/dashboard');
            else navigate('/dashboard');
          }, 2000);
        }
      } else {
        setIsAuthLoading(false);
        triggerError(data.error || 'Authentication failed');
      }
    } catch (error) {
      setIsAuthLoading(false);
      triggerError('Connection error. Please try again.');
    }
  };

  // Variants for smooth crossfading of forms
  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: 'easeIn' } }
  };

  return (
    <AnimatePresence>
      {authModal?.isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-0 md:p-6 bg-background/80 backdrop-blur-md"
        >
          <div className="absolute inset-0 cursor-pointer hidden md:block" onClick={closeAuthModal} />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-full md:h-auto max-w-[900px] bg-surface md:border md:border-border/60 rounded-none md:rounded-3xl shadow-2xl overflow-y-auto md:overflow-hidden flex flex-col md:flex-row min-h-[550px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Desktop Close Button */}
            <button 
              onClick={closeAuthModal}
              className="hidden md:flex absolute top-4 right-4 size-8 items-center justify-center rounded-full bg-surface-hover border border-border text-text-muted hover:text-content hover:bg-surface transition-colors z-20 shadow-sm"
            >
              <X className="size-4" />
            </button>

            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-border/40 bg-surface/80 backdrop-blur-md sticky top-0 z-50">
              <button onClick={closeAuthModal} className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-text-muted hover:text-primary transition-colors">
                <ArrowLeft className="size-4" /> Back
              </button>
            </div>

            {/* --- LEFT PANEL: BRANDING / VALUE PROP --- */}
            <div className="hidden md:flex flex-col w-[45%] bg-surface-hover border-r border-border/40 p-10 relative overflow-hidden justify-between">
              <div className="absolute top-0 left-0 w-full h-[600px] from-primary/5 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="px-4 py-1 bg-primary/10 rounded-full border border-primary/30 w-fit mb-6">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">INIQ Platform</span>
                </div>
                
                <h1 className="text-3xl font-black text-content font-['Sora'] leading-[1.2] tracking-tight mb-4">
                  Master your <br />
                  next <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">interview.</span>
                </h1>
                
                <p className="text-sm text-text-muted font-medium leading-relaxed mb-10">
                  Whether you're a job seeker or a current employee, join our community of top-tier professionals. Browse exclusive interview experiences, structured rounds, and verified solutions.
                </p>

                <div className="flex flex-col gap-4">
                  {[
                    { icon: ShieldCheck, text: "Verified Experiences" },
                    { icon: Zap, text: "Actionable Insights" },
                    { icon: Globe, text: "Global Tech Companies" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="size-8 rounded-xl bg-background border border-border flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary/40 transition-all shadow-sm">
                        <item.icon className="size-4" />
                      </div>
                      <span className="text-xs font-bold text-content/80 group-hover:text-content transition-colors">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
            </div>

            {/* --- RIGHT PANEL: AUTH FORMS --- */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 relative bg-surface">
              <div className="w-full max-w-[340px] flex flex-col h-full justify-center">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isLogin ? 'login' : `register-step-${step}`}
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col w-full gap-6"
                  >
                    {/* Header Content */}
                    <div className="flex flex-col gap-1.5 text-center md:text-left mb-2 relative">
                      {!isLogin && step > 1 && (
                        <button onClick={handleBack} className="absolute -left-8 top-1/2 -translate-y-1/2 p-2 text-text-muted hover:text-content hidden md:flex">
                          <ArrowLeft className="size-4" />
                        </button>
                      )}
                      <h2 className="text-3xl font-black text-content font-['Sora'] tracking-tight">
                        {isLogin ? 'Welcome back' : 'Create account'}
                      </h2>
                      <p className="text-text-muted font-medium text-xs">
                        {isLogin 
                          ? 'Sign in to access your dashboard.' 
                          : `Step ${step} of 3: ${step === 1 ? 'Your Details' : step === 2 ? 'Security & Role' : 'Professional Links'}`
                        }
                      </p>
                    </div>

                    {/* Show Social Auth ONLY on Login or Register Step 1 */}
                    {(isLogin || (!isLogin && step === 1)) && (
                      <>
                        <button 
                          onClick={() => handleGoogleAuth()}
                          className="w-full py-3.5 px-6 rounded-xl bg-background border border-border hover:border-primary/40 hover:bg-surface-hover transition-all flex items-center justify-center gap-3 group shadow-sm active:scale-[0.98]"
                        >
                          <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" alt="Google" className="size-4" />
                          <span className="text-[13px] font-bold text-content group-hover:text-primary transition-colors">
                            {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
                          </span>
                        </button>

                        <div className="flex items-center gap-4">
                          <div className="h-[1px] flex-1 bg-border/40" />
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted whitespace-nowrap">
                            Or with email
                          </span>
                          <div className="h-[1px] flex-1 bg-border/40" />
                        </div>
                      </>
                    )}

                    {/* Error Banner */}
                    <AnimatePresence>
                      {errorBanner && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -10, height: 0 }}
                          className="bg-danger/10 border border-danger/40 text-danger text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2 mb-2"
                        >
                          <ShieldCheck className="size-4 shrink-0" />
                          <span>{errorBanner}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Success Animation (SVG Drawing) */}
                    <AnimatePresence>
                      {isRegisterSuccess && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute inset-0 bg-surface/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center rounded-3xl"
                        >
                          <motion.svg 
                            className="size-24 text-success mb-4"
                            viewBox="0 0 50 50"
                          >
                            <motion.circle
                              cx="25" cy="25" r="20"
                              fill="none" stroke="currentColor" strokeWidth="3"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.6, ease: "easeInOut" }}
                            />
                            <motion.path
                              fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                              d="M15 25l7 7 13-13"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
                            />
                          </motion.svg>
                          <h3 className="text-xl font-black text-content font-['Sora']">Account Created!</h3>
                          <p className="text-sm font-medium text-text-muted mt-1">Redirecting to login...</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Login Success Animation */}
                    <AnimatePresence>
                      {isLoginSuccess && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-background/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center p-8 rounded-none md:rounded-[2.5rem]"
                        >
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="size-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 relative"
                          >
                            <motion.div 
                              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute inset-0 rounded-full border border-primary/50"
                            />
                            <UserCircle2 className="size-10 text-primary" strokeWidth={1.5} />
                          </motion.div>

                          <h3 className="text-2xl font-bold text-content font-['Sora'] tracking-tight mb-2 text-center">
                            Welcome, <span className="text-primary">{welcomeUser?.name?.split(' ')[0] || 'User'}</span>
                          </h3>
                          
                          <div className="flex flex-col items-center w-full max-w-[200px] mt-6 gap-3">
                            <div className="h-1 w-full bg-border/40 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                className="h-full bg-primary rounded-full shadow-[0_0_10px_var(--primary)]"
                              />
                            </div>
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted">
                              Preparing workspace
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Dynamic Form */}
                    <motion.form 
                      onSubmit={isLogin || step === 3 ? handleSubmit : handleNext} 
                      className="flex flex-col gap-4"
                      animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      
                      {/* === LOGIN MODE === */}
                      {isLogin && (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5 pointer-events-none">Email Address</label>
                            <div className="relative group">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-all" />
                              <input 
                                type="email" name="email" required value={formData.email} onChange={handleChange}
                                placeholder="Enter your email" 
                                className="w-full py-3 pl-11 pr-4 rounded-xl bg-surface-hover border border-border focus:border-primary focus:bg-surface outline-none transition-all font-bold text-content text-[13px]" 
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5 pointer-events-none">Password</label>
                            <div className="relative group">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-all" />
                              <input 
                                type={showPassword ? "text" : "password"} name="password" required value={formData.password} onChange={handleChange}
                                placeholder="Enter your password" 
                                className="w-full py-3 pl-11 pr-12 rounded-xl bg-surface-hover border border-border focus:border-primary focus:bg-surface outline-none transition-all font-bold text-content text-[13px]" 
                              />
                              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted/40 hover:text-primary transition-colors">
                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <label className="flex items-center gap-2 cursor-pointer group">
                              <input type="checkbox" className="sr-only" onChange={(e) => setIsRemembered(e.target.checked)} />
                              <div className={`size-3.5 rounded-[3px] border transition-all flex items-center justify-center ${isRemembered ? 'bg-primary border-primary' : 'bg-surface-hover border-border'}`}>
                                {isRemembered && <CheckCircle2 className="size-2 text-primary-text" />}
                              </div>
                              <span className="text-[10px] font-bold text-text-muted group-hover:text-content transition-colors">Remember me</span>
                            </label>
                          </div>
                          <button disabled={isAuthLoading} type="submit" className="w-full btn-primary py-3.5 text-xs tracking-[0.2em] font-black mt-2 active:scale-95 transition-all shadow-xl shadow-primary/10 rounded-xl disabled:opacity-50">
                            {isAuthLoading ? 'Signing In...' : 'Sign In'}
                          </button>
                        </>
                      )}

                      {/* === REGISTER MODE === */}
                      {!isLogin && (
                        <>
                          {/* STEP 1: Name, Email */}
                          {step === 1 && (
                            <>
                              <div className="space-y-1.5">
                                <label className="text-[9px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5 pointer-events-none">Full Name</label>
                                <div className="relative group">
                                  <UserCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-all" />
                                  <input 
                                    type="text" name="name" required value={formData.name} onChange={handleChange}
                                    placeholder="Enter your name" 
                                    className="w-full py-3 pl-11 pr-4 rounded-xl bg-surface-hover border border-border focus:border-primary focus:bg-surface outline-none transition-all font-bold text-content text-[13px]" 
                                  />
                                </div>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[9px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5 pointer-events-none">Email Address</label>
                                <div className="relative group">
                                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-all" />
                                  <input 
                                    type="email" name="email" required value={formData.email} onChange={handleChange}
                                    placeholder="Enter your email" 
                                    className="w-full py-3 pl-11 pr-4 rounded-xl bg-surface-hover border border-border focus:border-primary focus:bg-surface outline-none transition-all font-bold text-content text-[13px]" 
                                  />
                                </div>
                              </div>
                            </>
                          )}

                          {/* STEP 2: Password, Confirm Password, Domain */}
                          {step === 2 && (
                            <>
                              <div className="space-y-1.5">
                                <label className="text-[9px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5 pointer-events-none">Password</label>
                                <div className="relative group">
                                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-all" />
                                  <input 
                                    type={showPassword ? "text" : "password"} name="password" required minLength="6" value={formData.password} onChange={handleChange}
                                    placeholder="Create a password" 
                                    className="w-full py-3 pl-11 pr-12 rounded-xl bg-surface-hover border border-border focus:border-primary focus:bg-surface outline-none transition-all font-bold text-content text-[13px]" 
                                  />
                                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted/40 hover:text-primary transition-colors">
                                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                  </button>
                                </div>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[9px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5 pointer-events-none">Confirm Password</label>
                                <div className="relative group">
                                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-all" />
                                  <input 
                                    type={showConfirmPassword ? "text" : "password"} name="confirmPassword" required minLength="6" value={formData.confirmPassword} onChange={handleChange}
                                    placeholder="Confirm your password" 
                                    className="w-full py-3 pl-11 pr-12 rounded-xl bg-surface-hover border border-border focus:border-primary focus:bg-surface outline-none transition-all font-bold text-content text-[13px]" 
                                  />
                                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted/40 hover:text-primary transition-colors">
                                    {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                  </button>
                                </div>
                              </div>
                              <div className="space-y-1.5">
                                <div className="space-y-1.5 flex-1">
                                  <label className="text-[9px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5 pointer-events-none">Primary Domain / Role</label>
                                  <div className="relative group">
                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-all pointer-events-none" />
                                    <select 
                                      name="domain" 
                                      value={formData.domain} 
                                      onChange={handleChange}
                                      className="w-full py-3 pl-11 pr-10 rounded-xl bg-surface-hover border border-border focus:border-primary focus:bg-surface outline-none transition-all font-bold text-content text-[13px] appearance-none cursor-pointer" 
                                    >
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
                                      <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {formData.domain === 'Other' && (
                                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                                  <label className="text-[9px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5 pointer-events-none">Specify your role</label>
                                  <input 
                                    type="text" 
                                    name="customDomain" 
                                    value={formData.customDomain} 
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Security Researcher" 
                                    className="w-full py-3 px-4 rounded-xl bg-surface-hover border border-border focus:border-primary focus:bg-surface outline-none transition-all font-bold text-content text-[13px]" 
                                  />
                                </div>
                              )}
                            </>
                          )}

                          {/* STEP 3: College, Location, Links */}
                          {step === 3 && (
                            <>
                              <div className="space-y-1.5">
                                <label className="text-[9px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5 pointer-events-none">College / University</label>
                                <div className="relative group">
                                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-all" />
                                  <input 
                                    type="text" name="college" value={formData.college} onChange={handleChange}
                                    placeholder="e.g. Stanford University" 
                                    className="w-full py-3 pl-11 pr-4 rounded-xl bg-surface-hover border border-border focus:border-primary focus:bg-surface outline-none transition-all font-bold text-content text-[13px]" 
                                  />
                                </div>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[9px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5 pointer-events-none">Location</label>
                                <div className="relative group">
                                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-all" />
                                  <input 
                                    type="text" name="location" value={formData.location} onChange={handleChange}
                                    placeholder="e.g. San Francisco, CA" 
                                    className="w-full py-3 pl-11 pr-4 rounded-xl bg-surface-hover border border-border focus:border-primary focus:bg-surface outline-none transition-all font-bold text-content text-[13px]" 
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                  <label className="text-[9px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5 pointer-events-none">LinkedIn URL</label>
                                  <div className="relative group">
                                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-text-muted/40 group-focus-within:text-primary transition-all" />
                                    <input 
                                      type="url" name="linkedin" value={formData.linkedin} onChange={handleChange}
                                      placeholder="https://..." 
                                      className="w-full py-3 pl-9 pr-3 rounded-xl bg-surface-hover border border-border focus:border-primary focus:bg-surface outline-none transition-all font-bold text-content text-[11px]" 
                                    />
                                  </div>
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[9px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5 pointer-events-none">GitHub URL</label>
                                  <div className="relative group">
                                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-text-muted/40 group-focus-within:text-primary transition-all" />
                                    <input 
                                      type="url" name="github" value={formData.github} onChange={handleChange}
                                      placeholder="https://..." 
                                      className="w-full py-3 pl-9 pr-3 rounded-xl bg-surface-hover border border-border focus:border-primary focus:bg-surface outline-none transition-all font-bold text-content text-[11px]" 
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          <div className="flex gap-3 mt-2">
                            {step > 1 && (
                              <button type="button" onClick={handleBack} className="flex-1 bg-surface-hover hover:bg-border text-content py-3.5 text-xs tracking-[0.2em] font-black transition-all rounded-xl border border-border md:hidden">
                                Back
                              </button>
                            )}
                            <button disabled={isAuthLoading} type="submit" className="flex-[2] btn-primary py-3.5 text-xs tracking-[0.2em] font-black active:scale-95 transition-all shadow-xl shadow-primary/10 rounded-xl flex justify-center items-center gap-2 disabled:opacity-50">
                              {step < 3 ? 'Next Step' : isAuthLoading ? 'Creating...' : 'Create Account'}
                              {step < 3 && <ArrowRight className="size-3.5" />}
                            </button>
                          </div>
                        </>
                      )}
                    </motion.form>

                  </motion.div>
                </AnimatePresence>

                {/* Form Toggle (Outside of AnimatePresence so it doesn't animate out) */}
                <div className="flex justify-center md:justify-start mt-6">
                  <button 
                    onClick={() => {
                      setStep(1);
                      setAuthModal({ isOpen: true, view: isLogin ? 'register' : 'login' });
                    }}
                    className="text-[10px] font-black tracking-widest uppercase text-text-muted hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    {isLogin ? (
                      <>Don't have an account? <span className="text-primary underline">Sign up</span></>
                    ) : (
                      <>Already have an account? <span className="text-primary underline">Sign in</span></>
                    )}
                  </button>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
