import React, { useState } from 'react';
import { 
  Bookmark, Layout, Compass, Trash2, 
  ArrowRight, ExternalLink, Building2, 
  Clock, Calendar, Search, Filter, Layers,
  MoreVertical, Share2, Eye, ArrowUpRight,
  ShieldCheck, Zap, Globe, CheckCircle2, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CustomToaster from '../../components/common/CustomToaster';

/**
 * --- SAVED ITEMS PAGE (MISSION CONTROL - TABLE VIEW) ---
 * Features: High-fidelity tabbed bookmarks hub for experiences and resources. 
 * Design: High-density data table with internally scrollable architecture.
 * Integrated search, dynamic status filtering, and premium action hubs.
 */
const SavedItemsPage = () => {
  const { theme, toggleTheme, isLoading, setIsLoading } = useGlobalContext();
  const [activeTab, setActiveTab] = useState('Experiences');
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activePriority, setActivePriority] = useState('All');
  const navigate = useNavigate();

  const tabs = ['Experiences', 'Resources'];
  
  // High-fidelity priorities derived from the mock data
  const priorities = {
    'Experiences': ['All', 'High', 'Medium', 'Low'],
    'Resources': ['All', 'Advanced', 'Medium', 'Beginner']
  };

  const [savedExperiences, setSavedExperiences] = useState([
    { id: 1, title: 'Google SDE-I Journey', company: 'Google', date: 'Mar 28, 2026', type: 'Experience', role: 'SDE-1', relevance: 'High' },
    { id: 2, title: 'Meta Product Design Lead', company: 'Meta', date: 'Mar 20, 2026', type: 'Experience', role: 'Senior Designer', relevance: 'Medium' },
    { id: 3, title: 'Amazon Frontend Specialist', company: 'Amazon', date: 'Mar 15, 2026', type: 'Experience', role: 'SDE-II', relevance: 'High' },
    { id: 4, title: 'Microsoft Azure Interview', company: 'Microsoft', date: 'Feb 10, 2026', type: 'Experience', role: 'Cloud Engineer', relevance: 'Low' },
  ]);

  const [savedResources, setSavedResources] = useState([
    { id: 101, title: 'System Design Interview Guide', category: 'HLD', date: 'Apr 02, 2026', type: 'Resource', complexity: 'Advanced' },
    { id: 102, title: 'Top 50 DP Problems List', category: 'DSA', date: 'Apr 01, 2026', type: 'Resource', complexity: 'Medium' },
    { id: 103, title: 'Behavioral Prep Vault', category: 'Soft Skills', date: 'Mar 25, 2026', type: 'Resource', complexity: 'Beginner' },
  ]);

  const removeItem = (id, tab) => {
    if (tab === 'Experiences') {
        setSavedExperiences(savedExperiences.filter(item => item.id !== id));
    } else {
        setSavedResources(savedResources.filter(item => item.id !== id));
    }
    toast.error('Protocol decommissioned from hub', {
        style: {
            background: '#1a1a1a',
            color: '#fff',
            borderRadius: '1rem',
            fontSize: '10px',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
        }
    });
    setOpenMenuId(null);
  };

  const handleShare = async (item) => {
    const shareUrl = `${window.location.origin}/${activeTab === 'Experiences' ? 'experiences' : 'resources'}/${item.id}`;
    const shareData = {
        title: `INIQ Intelligence: ${item.title}`,
        text: `Check out this interview insight from ${item.company || item.category} on INIQ Interview Intelligence!`,
        url: shareUrl,
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
            toast.success('Protocol link shared successfully!', {
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    borderRadius: '1rem',
                    fontSize: '10px',
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                },
                iconTheme: {
                    primary: '#6366f1',
                    secondary: '#fff',
                }
            });
        } else {
            await navigator.clipboard.writeText(shareUrl);
            toast.success('Protocol link copied to clipboard', {
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    borderRadius: '1rem',
                    fontSize: '10px',
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                },
                iconTheme: {
                    primary: '#6366f1',
                    secondary: '#fff',
                }
            });
        }
    } catch (err) {
        if (err.name !== 'AbortError') {
            toast.error('Encryption failed - Sharing restricted');
        }
    }
    setOpenMenuId(null);
  };

  const filteredItems = (activeTab === 'Experiences' ? savedExperiences : savedResources).filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (item.company || item.category).toLowerCase().includes(searchQuery.toLowerCase());
    
    // Check if the item matches the active priority filter
    const priorityValue = item.relevance || item.complexity;
    const matchesPriority = activePriority === 'All' || priorityValue === activePriority;

    return matchesSearch && matchesPriority;
  });

  const resetAllFilters = () => {
    setSearchQuery('');
    setActivePriority('All');
    setShowFilters(false);
  };

  return (
    <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
      <CustomToaster />
      
      <div className="h-full flex flex-col overflow-hidden bg-background font-['Inter']">
        {/* 1. MISSION CONTROL HEADER */}
        <header className="shrink-0 p-8 md:p-10 pb-6 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="size-11 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
                            <Bookmark className="size-5.5 text-primary" />
                        </div>
                        <h1 className="text-3xl font-black text-content font-['Sora'] tracking-tighter uppercase italic">
                            SAVED <span className="text-primary">ARCHIVE</span>
                        </h1>
                    </div>
                    <p className="text-[10px] font-black text-text-muted opacity-40 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                        <Globe className="size-3" />
                        Intelligence Module Hub • {filteredItems.length} Records Active
                    </p>
                </div>

                <div className="flex items-center gap-1.5 p-1.5 bg-surface border border-border/40 rounded-2xl shadow-sm self-start">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => { 
                                setActiveTab(tab); 
                                setOpenMenuId(null); 
                                setActivePriority('All');
                            }}
                            className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all relative ${
                                activeTab === tab 
                                    ? 'text-white' 
                                    : 'text-text-muted hover:text-content hover:bg-surface-hover'
                            }`}
                        >
                            {activeTab === tab && (
                                <motion.div 
                                    layoutId="tab-bg-table-v3"
                                    className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20"
                                />
                            )}
                            <span className="relative z-10">{tab}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* SEARCH & FILTERS HUB */}
            <div className="flex items-center gap-3 relative z-50">
                <div className="flex-1 relative group">
                    <div className="absolute inset-0 bg-primary/5 blur-xl group-focus-within:bg-primary/10 transition-all rounded-full" />
                    <div className="relative flex items-center bg-surface border border-border/60 hover:border-border p-1.5 rounded-2xl shadow-sm transition-all focus-within:border-primary/40">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-text-muted/30 group-focus-within:text-primary transition-all" />
                        <input 
                            type="text" 
                            placeholder={`Search ${activeTab.toLowerCase()} module...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-3.5 pl-14 pr-6 rounded-xl bg-transparent outline-none text-xs font-bold text-content placeholder:text-text-muted/30"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-4 p-1 hover:bg-surface-hover rounded-md text-text-muted opacity-40 hover:opacity-100 transition-all">
                                <X className="size-3.5" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="relative">
                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className={`px-6 py-4.5 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 relative ${
                            showFilters || activePriority !== 'All'
                            ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20'
                            : 'bg-surface border-border/60 text-text-muted hover:border-primary/40 hover:text-primary'
                        }`}
                    >
                        <Filter className="size-4" />
                        {activePriority === 'All' ? 'Filters' : `Level: ${activePriority}`}
                        {activePriority !== 'All' && (
                            <div className="size-2 rounded-full bg-white animate-pulse" />
                        )}
                    </button>

                    <AnimatePresence>
                        {showFilters && (
                            <>
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setShowFilters(false)}
                                    className="fixed inset-0 z-[100]"
                                />
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    className="absolute right-0 top-full mt-4 w-72 bg-surface border border-border/60 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] z-[110] overflow-hidden p-6"
                                >
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col gap-1">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Protocol Filter</h4>
                                            <p className="text-[9px] font-bold text-text-muted opacity-60 uppercase">Intensity / Relevance Signature</p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-2">
                                            {priorities[activeTab].map((p) => (
                                                <button
                                                    key={p}
                                                    onClick={() => {
                                                        setActivePriority(p);
                                                        setShowFilters(false);
                                                    }}
                                                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                                                        activePriority === p 
                                                            ? 'bg-primary/10 text-primary border border-primary/20' 
                                                            : 'text-text-muted hover:bg-surface-hover hover:text-content border border-transparent'
                                                    }`}
                                                >
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{p}</span>
                                                    {activePriority === p && <CheckCircle2 className="size-4" />}
                                                </button>
                                            ))}
                                        </div>

                                        <button 
                                            onClick={resetAllFilters}
                                            className="w-full py-3 rounded-xl bg-surface-hover text-[9px] font-black uppercase tracking-widest text-text-muted hover:text-red-500 opacity-60 hover:opacity-100 transition-all border border-border/40"
                                        >
                                            Reset Hub Filters
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>

        {/* 2. DATA TABLE HUD (Internally Scrollable) */}
        <div className="flex-1 overflow-hidden px-8 md:px-10 pb-10 relative z-0">
            <div className="h-full bg-surface border border-border/40 rounded-[2.5rem] flex flex-col overflow-hidden shadow-sm relative group/table">
                <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 z-20 bg-surface/90 backdrop-blur-xl border-b border-border/40 shadow-sm">
                            <tr>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted opacity-40">Journey Module</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted opacity-40">Priority Protocol</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted opacity-40">Logged Date</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted opacity-40 text-right">Command Hub</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            <AnimatePresence mode="popLayout">
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item, i) => (
                                        <motion.tr 
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="hover:bg-surface-hover/50 transition-colors group/row cursor-pointer"
                                            onClick={() => navigate(activeTab === 'Experiences' ? `/experiences/${item.id}` : `/resources`)}
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-5">
                                                    <div className={`size-12 rounded-2xl flex items-center justify-center border transition-all ${
                                                        activeTab === 'Experiences' 
                                                        ? 'bg-primary/5 border-primary/10 text-primary group-hover/row:bg-primary group-hover/row:text-white' 
                                                        : 'bg-accent/5 border-accent/10 text-accent group-hover/row:bg-accent group-hover/row:text-white'
                                                    }`}>
                                                        {activeTab === 'Experiences' ? <Building2 className="size-5" /> : <Layers className="size-5" />}
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-base font-black text-content tracking-tight group-hover/row:text-primary transition-colors italic leading-none">{item.title}</span>
                                                        <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-60">
                                                            <span className="px-1.5 py-0.5 rounded-md bg-surface-hover border border-border/40">{item.company || item.category}</span>
                                                            {item.role && <span className="opacity-40">• {item.role}</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.1em] flex items-center gap-2 ${
                                                        (item.relevance || item.complexity) === 'High' || (item.relevance || item.complexity) === 'Advanced'
                                                        ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                                        (item.relevance || item.complexity) === 'Medium'
                                                        ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                                                        'bg-green-500/10 border-green-500/20 text-green-500'
                                                    }`}>
                                                        <Zap className="size-3" />
                                                        {item.relevance || item.complexity}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-[11px] font-bold text-text-muted/60">
                                                    <Calendar className="size-4" />
                                                    {item.date}
                                                </div>
                                            </td>

                                            <td className="px-8 py-6 text-right" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex items-center justify-end gap-3 relative">
                                                    <button 
                                                        onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                                                        className={`p-3 rounded-xl border transition-all ${
                                                            openMenuId === item.id 
                                                            ? 'bg-primary border-primary text-white shadow-lg'
                                                            : 'bg-surface-hover/80 border-border/40 text-text-muted hover:text-primary hover:border-primary/40'
                                                        }`}
                                                    >
                                                        <MoreVertical className="size-4" />
                                                    </button>

                                                    <AnimatePresence>
                                                        {openMenuId === item.id && (
                                                            <>
                                                                <div className="fixed inset-0 z-[120]" onClick={() => setOpenMenuId(null)} />
                                                                <motion.div 
                                                                    initial={{ opacity: 0, scale: 0.95, y: 10, x: -10 }}
                                                                    animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                                                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                                    className="absolute right-0 top-full mt-3 w-52 bg-surface border border-border/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[130] overflow-hidden p-2 backdrop-blur-xl"
                                                                >
                                                                    <button onClick={() => navigate(activeTab === 'Experiences' ? `/experiences/${item.id}` : `/resources`)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-primary hover:bg-primary/5 transition-all">
                                                                        <Eye className="size-4" />
                                                                        Launch Module
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => handleShare(item)}
                                                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-primary hover:bg-primary/5 transition-all"
                                                                    >
                                                                        <Share2 className="size-4" />
                                                                        Share Stream
                                                                    </button>
                                                                    <div className="h-[1px] bg-border/40 my-1 mx-2" />
                                                                    <button 
                                                                        onClick={() => removeItem(item.id, activeTab)} 
                                                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/5 transition-all"
                                                                    >
                                                                        <Trash2 className="size-4" />
                                                                        Decommission
                                                                    </button>
                                                                </motion.div>
                                                            </>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-20 text-center">
                                            <EmptyState 
                                                icon={activeTab === 'Experiences' ? Compass : Layers} 
                                                title={`No ${activeTab.toLowerCase()} models`} 
                                                desc={activePriority === 'All' && searchQuery === '' ? `Archive empty. Populate your intelligence hub by bookmarking ${activeTab.toLowerCase()} streams.` : `No records match your current search/filter protocol.`} 
                                                actionTitle={activePriority === 'All' && searchQuery === '' ? `Explore ${activeTab}` : 'Reset Hub Protocol'}
                                                onClick={activePriority === 'All' && searchQuery === '' ? () => navigate(activeTab === 'Experiences' ? '/experiences' : '/resources') : resetAllFilters}
                                            />
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </UserAppShell>
  );
};

// UI UTILS
const EmptyState = ({ icon: Icon, title, desc, actionTitle, onClick }) => (
    <div className="flex flex-col items-center justify-center text-center gap-8 py-10">
        <div className="relative">
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-110" />
            <div className="relative size-24 rounded-[2.5rem] bg-background border border-dashed border-border/60 flex items-center justify-center overflow-hidden">
                <Icon className="size-10 text-text-muted opacity-20" />
            </div>
        </div>
        
        <div className="flex flex-col gap-3 max-w-md mx-auto">
            <h3 className="text-3xl font-black text-content tracking-tighter uppercase italic">{title.toUpperCase()}</h3>
            <p className="text-[10px] font-black text-text-muted leading-relaxed uppercase tracking-[0.3em] opacity-40 px-10">
                {desc}
            </p>
        </div>

        <button 
            onClick={onClick}
            className="group px-8 py-4 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/30 hover:-translate-y-1 transition-all flex items-center gap-3 mx-auto"
        >
            {actionTitle}
            <ArrowRight className="size-4 group-hover:translate-x-1.5 transition-transform" />
        </button>
    </div>
);

export default SavedItemsPage;
