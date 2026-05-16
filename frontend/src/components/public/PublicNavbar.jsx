import React from 'react';
import { Rocket, Moon, Sun, Search, Home, Compass, Layers, ArrowRight,Building2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import { useGoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';

const PublicNavbar = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsLoading, setUser, user } = useGlobalContext();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accessToken: tokenResponse.access_token
          })
        });

        const data = await response.json();

        if (data.success) {
          const user = {
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
            token: data.token
          };

          setUser(user);
          localStorage.setItem('iniq_user', JSON.stringify(user));
          localStorage.setItem('iniq_token', data.token);
          toast.success(`Welcome to INIQ, ${user.name}!`);

          setTimeout(() => {
            setIsLoading(false);
            if (user.role === 'admin') {
              navigate('/admin/dashboard');
            } else {
              navigate('/dashboard');
            }
          }, 800);
        } else {
          setIsLoading(false);
          toast.error(data.error || 'Google login failed');
        }
      } catch (error) {
        setIsLoading(false);
        toast.error('Connection error. Please try again.');
        console.error('Google login error:', error);
      }
    },
    onError: () => {
      toast.error('Google login was unsuccessful');
    }
  });

  return (
    <nav className="w-full h-[72px] bg-surface/80 backdrop-blur-xl z-50 hidden md:flex items-center justify-between px-8 fixed top-0 border-b border-border shadow-sm">
      {/* Left: Branding Group */}
      <div className="flex items-center gap-3 min-w-[200px]">
        <Link to="/" className="size-14 rounded-full border border-border bg-surface-hover/50 flex items-center justify-center overflow-hidden shadow-inner group transition-all hover:border-primary/20">
          <img
            src={theme === "light" ? "/assets/logos/logo.png" : "/assets/logos/logo-dark.png"}
            alt="INIQ"
            className="h-9 w-auto cursor-pointer group-hover:scale-110 transition-transform"
          />
        </Link>
      </div>

      {/* Center: Interactive Nav Capsule */}
      <div className="flex items-center gap-1 bg-surface-hover/50 border border-border p-1.5 rounded-full backdrop-blur-2xl shadow-inner group">
        <Link
          to="/"
          onClick={() => setIsLoading(true)}
          className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 font-bold text-xs font-['Space_Grotesk'] ${
            location.pathname === '/' 
              ? 'bg-primary text-white shadow-lg shadow-primary/20' 
              : 'text-text-secondary hover:text-content'
          }`}
        >
          <Home className="size-3.5" /> Home
        </Link>
        <Link
          to="/experiences"
          onClick={() => setIsLoading(true)}
          className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 font-bold text-xs font-['Space_Grotesk'] ${
            location.pathname === '/experiences'
              ? 'bg-primary text-white shadow-lg shadow-primary/20'
              : 'text-text-secondary hover:text-content'
          }`}
        >
          <Compass className="size-3.5" /> Explore
        </Link>
        <Link
          to="/how-it-works"
          onClick={() => setIsLoading(true)}
          className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 font-bold text-xs font-['Space_Grotesk'] ${
            location.pathname === '/how-it-works'
              ? 'bg-primary text-white shadow-lg shadow-primary/20'
              : 'text-text-secondary hover:text-content'
          }`}
        >
          <Layers className="size-3.5" /> How It Works
        </Link>
      </div>

      {/* Right: Actions Group */}
      <div className="flex items-center gap-4 min-w-[200px] justify-end">
        <div className="relative group/search">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-text-secondary opacity-40 group-focus-within/search:text-primary group-focus-within/search:opacity-100 transition-all" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-surface-hover/50 border border-border rounded-full py-2 pl-9 pr-4 text-[11px] w-32 focus:w-48 focus:outline-none focus:border-primary/40 transition-all duration-500 text-content placeholder:text-text-secondary/40"
          />
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-surface-hover/50 border border-border text-text-secondary hover:text-primary transition-all active:scale-90"
        >
          {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </button>

        <Link to="/login" className="text-xs font-bold text-text-secondary hover:text-primary px-1 transition-colors font-['Space_Grotesk']">Login</Link>

        {user ? (
          <Link 
            to="/dashboard"
            className="btn-primary group/btn text-[10px] px-7 py-2.5 rounded-full flex items-center gap-2"
          >
            <span className="relative z-10 font-bold tracking-widest uppercase">Go to Dashboard</span>
            <ArrowRight className="size-3.5 relative z-10 transition-all duration-300 -translate-x-4 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
          </Link>
        ) : (
          <button 
            onClick={() => handleGoogleLogin()}
            className="btn-primary group/btn text-[10px] px-7 py-2.5 rounded-full flex items-center gap-2"
          >
            <span className="relative z-10 font-bold tracking-widest uppercase">Get Started</span>
            <ArrowRight className="size-3.5 relative z-10 transition-all duration-300 -translate-x-4 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default PublicNavbar;

