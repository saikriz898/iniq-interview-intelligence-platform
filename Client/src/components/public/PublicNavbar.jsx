import React, { useState, useEffect } from 'react';
import { Home, Compass, Layers, ArrowRight, Search, Zap } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import { useGoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';

const PublicNavbar = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsLoading, setUser, user, openAuthModal } = useGlobalContext();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken: tokenResponse.access_token })
        });
        const data = await response.json();
        if (data.success) {
          const userData = {
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
            token: data.token
          };
          setUser(userData);
          localStorage.setItem('iniq_user', JSON.stringify(userData));
          localStorage.setItem('iniq_token', data.token);
          toast.success(`Welcome to INIQ, ${userData.name}!`);
          setTimeout(() => {
            setIsLoading(false);
            navigate(userData.role === 'admin' ? '/admin/dashboard' : '/dashboard');
          }, 800);
        } else {
          setIsLoading(false);
          toast.error(data.error || 'Google login failed');
        }
      } catch (error) {
        setIsLoading(false);
        toast.error('Connection error. Please try again.');
      }
    },
    onError: () => toast.error('Google login was unsuccessful')
  });

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] hidden md:flex items-center justify-between px-8 h-20 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-3xl border-border/40 shadow-sm' 
          : 'bg-background/40 backdrop-blur-md border-transparent'
      }`}
    >
      {/* Left: Branding Group */}
      <div className="flex items-center gap-4 min-w-[200px]">
        <Link to="/" className="flex items-center justify-center overflow-hidden group transition-all shrink-0">
          <img
            src={theme === "light" ? "/assets/logos/logo.png" : "/assets/logos/logo-dark.png"}
            alt="INIQ"
            className="h-9 w-auto object-contain group-hover:scale-105 transition-transform"
          />
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
        <Link
          to="/"
          onClick={() => setIsLoading(true)}
          className={`flex items-center gap-2.5 px-5 py-2 rounded-lg transition-all duration-300 font-bold text-[13px] tracking-wide ${
            location.pathname === '/' 
              ? 'text-primary bg-primary/10' 
              : 'text-text-muted hover:text-content hover:bg-surface'
          }`}
        >
          Home
        </Link>
        <Link
          to="/experiences"
          onClick={() => setIsLoading(true)}
          className={`flex items-center gap-2.5 px-5 py-2 rounded-lg transition-all duration-300 font-bold text-[13px] tracking-wide ${
            location.pathname === '/experiences'
              ? 'text-primary bg-primary/10'
              : 'text-text-muted hover:text-content hover:bg-surface'
          }`}
        >
          Explore
        </Link>
        <Link
          to="/how-it-works"
          onClick={() => setIsLoading(true)}
          className={`flex items-center gap-2.5 px-5 py-2 rounded-lg transition-all duration-300 font-bold text-[13px] tracking-wide ${
            location.pathname === '/how-it-works'
              ? 'text-primary bg-primary/10'
              : 'text-text-muted hover:text-content hover:bg-surface'
          }`}
        >
          Platform
        </Link>
      </div>

      {/* Right: Actions Group */}
      <div className="flex items-center justify-end gap-5 min-w-[200px]">
        <div className="relative group/search">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted group-focus-within/search:text-primary transition-all" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-surface/50 border border-border/40 rounded-full py-2.5 pl-11 pr-5 text-sm font-medium w-48 focus:w-64 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-500 text-content placeholder:text-text-muted/50"
          />
        </div>

        {!user && (
            <button onClick={() => openAuthModal('login')} className="text-xs font-bold text-text-muted hover:text-content transition-colors uppercase tracking-widest shrink-0 whitespace-nowrap">Login</button>
        )}

        {user ? (
          <Link 
            to="/dashboard"
            className="bg-content hover:bg-text-muted text-background group/btn text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold tracking-widest uppercase transition-all shadow-sm shrink-0 whitespace-nowrap"
          >
            <span>Dashboard</span>
            <ArrowRight className="size-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <button 
            onClick={() => openAuthModal('register')}
            className="bg-content hover:bg-text-muted text-background group/btn text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold tracking-widest uppercase transition-all shadow-sm shrink-0 whitespace-nowrap"
          >
            <span>Get Started</span>
            <ArrowRight className="size-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default PublicNavbar;
