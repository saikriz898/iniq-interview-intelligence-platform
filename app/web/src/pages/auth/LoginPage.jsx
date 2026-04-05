import React, { useState, useEffect } from 'react';
import { 
  Mail, Lock, Eye, EyeOff, 
  ArrowLeft, CheckCircle2, Sun, Moon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import InternalPreloader from '../../components/common/InternalPreloader';
import toast, { Toaster } from 'react-hot-toast';

/**
 * --- INIQ AUTH: FULL LOGIN HUB ---
 * Features: Internal top navbar, split-view value prop and auth portal.
 */
const LoginPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRemembered, setIsRemembered] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { theme, toggleTheme, setIsLoading, setUser } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // DEMO AUTH LOGIC
    setTimeout(() => {
      if (
        (formData.email === 'admin' && formData.password === 'admin123') ||
        (formData.email === 'user' && formData.password === 'user123') ||
        (formData.email === 'user1' && formData.password === 'user123')
      ) {
        const dummyUser = {
          email: formData.email,
          role: formData.email === 'admin' ? 'admin' : 'user',
          name: formData.email === 'admin' ? 'Sai Kriz' : 
                formData.email === 'user1' ? 'Rahul Kumar' : 'Aditi Sharma'
        };
        
        setUser(dummyUser);
        localStorage.setItem('iniq_user', JSON.stringify(dummyUser));
        toast.success(`Welcome back, ${dummyUser.name}!`);
        
        setTimeout(() => {
          setIsLoading(false);
          if (dummyUser.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 800);
      } else {
        setIsLoading(false);
        toast.error('Invalid demo credentials. Use admin/admin123 or user/user123.');
      }
    }, 1000);
  };

  return (
    <>
      <InternalPreloader isLoaded={isLoaded} />
      <div className="h-screen w-full bg-background flex flex-col overflow-hidden">
      
      {/* 1. TOP NAVBAR (Internal) */}
      <nav className="relative z-20 w-full h-16 sm:h-20 border-b border-border/40 px-6 sm:px-12 flex items-center justify-between bg-surface/50 backdrop-blur-md">
        {/* Left: Back Link */}
        <Link 
          to="/" 
          onClick={() => setIsLoading(true)}
          className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-text-muted hover:text-primary transition-colors group"
        >
          <ArrowLeft className="size-3 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Center: Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src={theme === 'dark' ? "/assets/logos/logo-dark.svg" : "/assets/logos/logo.svg"} alt="INIQ hub" className="h-7 sm:h-8 w-auto object-contain" />
        </div>

        {/* Right: Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="size-10 rounded-xl bg-surface-hover border border-border/60 flex items-center justify-center hover:bg-primary/10 hover:border-primary/40 transition-all active:scale-95 group"
        >
          {theme === 'dark' ? (
            <Sun className="size-4 text-primary group-hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="size-4 text-primary group-hover:-rotate-12 transition-transform" />
          )}
        </button>
      </nav>

      {/* 2. MAIN SECTION */}
      <div className="flex-1 flex w-full overflow-hidden">
        
        {/* 2.1 LEFT PANEL: VALUE PROPOSITION (Desktop Only) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-col w-[40%] bg-surface-hover border-r border-border/40 p-12 xl:p-20 relative overflow-hidden justify-center items-center"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-start gap-8 w-full max-w-[440px]">
            <div className="flex flex-col items-start gap-4">
              <div className="px-5 py-1.5 bg-primary/10 rounded-full border border-primary/30 w-fit mb-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Why sign in?</span>
              </div>
              <h1 className="text-4xl xl:text-4xl font-black text-content font-['Sora'] leading-[1.1] tracking-tighter">
                Access your <br />
                interview <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">preparation space.</span>
              </h1>
              <p className="text-sm xl:text-base text-text-muted font-medium leading-relaxed opacity-70">
                Sign in to browse structured interview experiences, submit your own journey, 
                and manage your contributions in one place.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-3.5">
              {[
                "Browse Experiences",
                "Round-by-Round Info",
                "Submit Your Journey",
                "Manage Contributions"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <CheckCircle2 className="size-4 text-primary opacity-60 group-hover:opacity-100" />
                  <span className="text-xs font-bold text-content/70 whitespace-nowrap">{benefit}</span>
                </div>
              ))}
            </div>

            {/* PREVIEW CARD: Redesigned based on screenshot */}
            <div className="max-w-[380px] w-full p-7 bg-surface/40 backdrop-blur-xl rounded-[2.5rem] border border-border/40 shadow-2xl relative overflow-hidden text-left mt-4 group">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-white flex items-center justify-center p-2.5 shadow-lg group-hover:scale-110 transition-transform">
                    <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" alt="Google" className="size-full object-contain" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-base font-black text-content tracking-tight">Google</h3>
                    <p className="text-[10px] text-text-muted font-black uppercase tracking-widest opacity-40">Software Dev Engineer</p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[9px] font-black tracking-widest uppercase shadow-sm">
                  Selected
                </div>
              </div>
              
              <div className="flex flex-col gap-5">
                <p className="text-[11px] font-black text-primary tracking-widest uppercase">
                  SDE • DSA • HLD • LLD
                </p>
                <div className="flex gap-3">
                  <span className="py-2.5 px-5 rounded-xl bg-primary/5 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-widest hover:bg-primary/10 transition-colors cursor-default">Coding</span>
                  <span className="py-2.5 px-5 rounded-xl bg-accent/5 border border-accent/20 text-[10px] font-black text-accent uppercase tracking-widest hover:bg-accent/10 transition-colors cursor-default">Design</span>
                </div>
              </div>

              {/* Decorative side accent */}
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-primary/20 to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* 2.2 RIGHT PANEL: AUTH PORTAL */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-y-auto bg-surface">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-[400px] flex flex-col gap-8"
          >
            {/* Header Content */}
            <div className="flex flex-col gap-1.5 items-center text-center">
              <h2 className="text-4xl font-black text-content font-['Sora'] tracking-tight">Welcome back</h2>
              <p className="text-text-muted font-medium text-sm opacity-70">Sign in to continue to your account.</p>
            </div>

            {/* Auth Actions */}
            <div className="flex flex-col gap-6">
              {/* Social Auth */}
              <button className="w-full py-4 px-6 rounded-2xl bg-surface border border-border hover:border-primary/40 hover:bg-surface-hover transition-all flex items-center justify-center gap-3 group shadow-sm active:scale-[0.98]">
                <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" alt="Google" className="size-4" />
                <span className="text-sm font-bold text-content group-hover:text-primary transition-colors">Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 px-2">
                <div className="h-[1px] flex-1 bg-border/40" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted opacity-40 whitespace-nowrap">Or sign in with email</span>
                <div className="h-[1px] flex-1 bg-border/40" />
              </div>

              <Toaster 
                position="top-center" 
                reverseOrder={false}
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
              <form className="flex flex-col gap-5 px-1" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5 pointer-events-none">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-all" />
                    <input 
                      id="email"
                      type="text" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email" 
                      className="w-full py-3.5 pl-11 pr-6 rounded-xl bg-surface-hover border border-border focus:border-primary focus:bg-surface outline-none transition-all font-bold text-content text-sm" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-text-muted/60 ml-0.5 pointer-events-none">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-all" />
                    <input 
                      id="password"
                      type={showPassword ? "text" : "password"} 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password" 
                      className="w-full py-3.5 pl-11 pr-12 rounded-xl bg-surface-hover border border-border focus:border-primary focus:bg-surface outline-none transition-all font-bold text-content text-sm" 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted/40 hover:text-primary transition-colors">
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" className="sr-only" onChange={(e) => setIsRemembered(e.target.checked)} />
                    <div className={`size-4 rounded border-2 transition-all flex items-center justify-center ${isRemembered ? 'bg-primary border-primary' : 'bg-surface-hover border-border'}`}>
                      {isRemembered && <CheckCircle2 className="size-2.5 text-white" />}
                    </div>
                    <span className="text-[11px] font-bold text-text-muted group-hover:text-content transition-colors">Remember me</span>
                  </label>
                  <Link to="/error/maintenance" className="text-[11px] font-black text-primary uppercase tracking-widest hover:underline transition-all">Forgot Password?</Link>
                </div>

                <button className="w-full btn-primary py-4 text-xs tracking-[0.2em] font-black mt-2 active:scale-95 transition-all shadow-xl shadow-primary/10">
                  Sign In
                </button>
              </form>

              <p className="text-center text-xs font-bold text-text-muted mt-2">
                Don’t have an account? 
                <Link 
                  to="/register" 
                  onClick={() => setIsLoading(true)}
                  className="text-primary hover:underline ml-2 font-black uppercase tracking-widest text-[10px]"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </>
);
};

export default LoginPage;
