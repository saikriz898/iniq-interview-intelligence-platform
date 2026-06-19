import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import toast, { Toaster } from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * --- INIQ MOBILE LOGIN PAGE ---
 * Redesigned specifically for mobile. No split-screen desktop fluff.
 */
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRemembered, setIsRemembered] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { theme, setUser } = useGlobalContext();
  const navigate = useNavigate();

  // Animation states
  const [errorBanner, setErrorBanner] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [welcomeUser, setWelcomeUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Reset state on mount
  React.useEffect(() => {
    setIsLoginSuccess(false);
    setIsAuthLoading(false);
    setErrorBanner('');
    setFormData({ email: '', password: '' });
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorBanner) setErrorBanner('');
  };

  const triggerError = (msg) => {
    setErrorBanner(msg);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleGoogleLogin = useGoogleLogin({
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
          triggerError(data.error || 'Google login failed');
        }
      } catch (error) {
        setIsAuthLoading(false);
        triggerError('Connection error. Please try again.');
      }
    },
    onError: () => toast.error('Google login was unsuccessful')
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAuthLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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
        triggerError(data.error || 'Invalid credentials');
      }
    } catch (error) {
      setIsAuthLoading(false);
      triggerError('Connection error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
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
      
      {/* Mobile Navbar */}
      <nav className="w-full h-16 border-b border-border/40 px-6 flex items-center justify-between bg-surface/50 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-text-muted hover:text-primary transition-colors">
          <ArrowLeft className="size-3" /> Back
        </Link>
        <Link to="/" className="size-10 rounded-full border border-border bg-surface flex items-center justify-center">
          <img src={theme === 'dark' ? "/assets/logos/logo-dark.png" : "/assets/logos/logo.png"} alt="INIQ" className="h-5 w-auto object-contain" />
        </Link>
        <div className="w-10" /> {/* Spacer */}
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-surface/20">
        <div className="w-full max-w-sm flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center relative z-10">
            <h2 className="text-3xl font-black text-content font-['Sora'] tracking-tight">Welcome back</h2>
            <p className="text-text-muted font-medium text-sm">Sign in to continue to your account.</p>
          </div>

          <div className="flex flex-col gap-6 relative z-10">
            <button 
              onClick={() => handleGoogleLogin()}
              className="w-full py-4 px-6 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-sm"
            >
              <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" alt="Google" className="size-4" />
              <span className="text-sm font-bold text-content">Continue with Google</span>
            </button>

            <div className="flex items-center gap-4 px-2">
              <div className="h-[1px] flex-1 bg-border/40" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted whitespace-nowrap">Or sign in with email</span>
              <div className="h-[1px] flex-1 bg-border/40" />
            </div>

            {/* Login Success Animation */}
            <AnimatePresence>
              {isLoginSuccess && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-background/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center p-8 rounded-none"
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

            <motion.form 
              className="flex flex-col gap-5" 
              onSubmit={handleSubmit}
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
                    className="bg-danger/10 border border-danger/40 text-danger text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2 mb-2"
                  >
                    <ShieldCheck className="size-4 shrink-0" />
                    <span>{errorBanner}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-all" />
                  <input 
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    placeholder="Enter your email" 
                    className="w-full py-3.5 pl-11 pr-4 rounded-xl bg-surface-hover border border-border focus:border-primary focus:bg-surface outline-none transition-all font-bold text-content text-sm" 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-all" />
                  <input 
                    type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required
                    placeholder="Enter your password" 
                    className="w-full py-3.5 pl-11 pr-12 rounded-xl bg-surface-hover border border-border focus:border-primary focus:bg-surface outline-none transition-all font-bold text-content text-sm" 
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted/40 hover:text-primary">
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-1">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" className="sr-only" onChange={(e) => setIsRemembered(e.target.checked)} />
                  <div className={`size-4 rounded-[4px] border-2 flex items-center justify-center transition-all ${isRemembered ? 'bg-primary border-primary' : 'bg-surface-hover border-border'}`}>
                    {isRemembered && <CheckCircle2 className="size-2.5 text-background" />}
                  </div>
                  <span className="text-[11px] font-bold text-text-muted">Remember me</span>
                </label>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Forgot?</span>
              </div>

              <button disabled={isAuthLoading} type="submit" className="w-full bg-content text-background py-4 rounded-xl text-xs tracking-[0.2em] font-black mt-2 active:scale-95 transition-transform uppercase disabled:opacity-50">
                {isAuthLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </motion.form>

            <p className="text-center text-xs font-bold text-text-muted mt-2">
              Don’t have an account? 
              <Link to="/register" className="text-primary ml-2 font-black uppercase tracking-widest text-[10px]">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
