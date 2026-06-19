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
  
  const priorities = {
    'Experiences': ['All', 'High', 'Medium', 'Low'],
    'Resources': ['All', 'Advanced', 'Medium', 'Beginner']
  };

  const [savedExperiences, setSavedExperiences] = useState([]);
  const [savedResources, setSavedResources] = useState([]);

  React.useEffect(() => {
    const fetchExperiences = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/experiences/approved');
            const data = await res.json();
            const mapped = data.map(exp => ({
                id: exp._id,
                title: `${exp.companyName} ${exp.role} Journey`,
                company: exp.companyName,
                date: new Date(exp.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                type: 'Experience',
                role: exp.role,
                relevance: exp.difficulty === 'Hard' ? 'High' : exp.difficulty === 'Medium' ? 'Medium' : 'Low'
            }));
            setSavedExperiences(mapped);
        } catch(err) {}
    };
    fetchExperiences();
  }, []);

  const clearAll = () => {
    if (activeTab === 'Experiences') {
        setSavedExperiences([]);
    } else {
        setSavedResources([]);
    }
    toast.success(`All ${activeTab.toLowerCase()} cleared!`, {
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
  };

  const removeItem = (id, tab, e) => {
    if(e) e.stopPropagation();
    if (tab === 'Experiences') {
        setSavedExperiences(savedExperiences.filter(item => item.id !== id));
    } else {
        setSavedResources(savedResources.filter(item => item.id !== id));
    }
    toast.error('Removed from Saved', {
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

  const handleShare = async (item, e) => {
    if(e) e.stopPropagation();
    const shareUrl = `${window.location.origin}/${activeTab === 'Experiences' ? 'experiences' : 'resources'}/${item.id}`;
    const shareData = {
        title: `INIQ Intelligence: ${item.title}`,
        text: `Check out this interview insight from ${item.company || item.category} on INIQ!`,
        url: shareUrl,
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(shareUrl);
            toast.success('Link copied to clipboard', {
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
        }
    } catch (err) {}
    setOpenMenuId(null);
  };

  const filteredItems = (activeTab === 'Experiences' ? savedExperiences : savedResources).filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (item.company || item.category).toLowerCase().includes(searchQuery.toLowerCase());
    
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
      
      <div className="h-full w-full overflow-hidden bg-background relative min-w-0 flex flex-col">
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-[500px] overflow-hidden pointer-events-none z-0">
           <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[100%] bg-primary/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
           <div className="absolute top-[10%] -right-[10%] w-[40%] h-[80%] bg-accent/10 blur-[100px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }} />
        </div>

        <div className="flex flex-col w-full font-['Inter'] relative z-10 h-full">
            
            {/* COMPACT PREMIUM HEADER */}
            <div className="w-full flex flex-col pt-6 md:pt-8 px-4 sm:px-6 md:px-12 lg:px-20 mb-4 max-w-[1400px] mx-auto shrink-0 relative z-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
                            <Bookmark className="size-6 text-primary" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-2xl sm:text-3xl font-black text-content font-['Sora'] tracking-tight">
                                Saved Items
                            </h1>
                            <p className="text-[13px] font-medium text-text-muted">
                                Your personal library of curated intelligence.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-surface/80 backdrop-blur-md p-1.5 rounded-2xl border border-border/40 shadow-sm">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => { 
                                        setActiveTab(tab); 
                                        setOpenMenuId(null); 
                                        setActivePriority('All');
                                    }}
                                    className={`px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all relative ${
                                        activeTab === tab 
                                            ? 'text-primary-text' 
                                            : 'text-text-muted hover:text-content'
                                    }`}
                                >
                                    {activeTab === tab && (
                                        <motion.div 
                                            layoutId="tab-bg-grid"
                                            className="absolute inset-0 bg-primary rounded-xl shadow-md shadow-primary/20"
                                        />
                                    )}
                                    <span className="relative z-10">{tab}</span>
                                </button>
                            ))}
                        </div>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-2 hidden lg:block">
                            <span className="text-content font-black">{filteredItems.length}</span> {activeTab}
                        </p>
                    </div>
                </div>
            </div>

            {/* CONTROLS BAR */}
            <div className="bg-background/80 backdrop-blur-xl border-y border-border/40 px-4 sm:px-6 md:px-12 lg:px-20 py-3 mb-4 shrink-0 relative z-30">
                <div className="flex flex-col sm:flex-row items-center gap-3 relative z-50 max-w-[1400px] mx-auto w-full">
                    <div className="flex-1 w-full relative group">
                        <div className="absolute inset-0 bg-primary/5 blur-xl group-focus-within:bg-primary/10 transition-all rounded-full" />
                        <div className="relative flex items-center bg-surface border border-border/60 hover:border-border p-1.5 rounded-2xl shadow-sm transition-all focus-within:border-primary/40 focus-within:shadow-md focus-within:shadow-primary/5">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-text-muted/50 group-focus-within:text-primary transition-all" />
                            <input 
                                type="text" 
                                placeholder={`Search your saved ${activeTab.toLowerCase()}...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full py-3 pl-12 pr-6 rounded-xl bg-transparent outline-none text-sm font-bold text-content placeholder:text-text-muted/40"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-4 p-1.5 hover:bg-surface-hover rounded-md text-text-muted hover:text-content transition-all">
                                    <X className="size-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex w-full sm:w-auto items-center gap-3 relative">
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex-1 sm:flex-none px-6 py-4.5 rounded-2xl border text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 relative shadow-sm ${
                                showFilters || activePriority !== 'All'
                                ? 'bg-primary border-primary text-primary-text shadow-primary/20'
                                : 'bg-surface border-border/60 text-text-muted hover:border-primary/40 hover:text-primary'
                            }`}
                        >
                            <Filter className="size-4" />
                            {activePriority === 'All' ? 'Filter' : activePriority}
                        </button>

                        <button
                            onClick={clearAll}
                            disabled={filteredItems.length === 0}
                            className={`px-6 py-4.5 rounded-2xl border text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm ${
                                filteredItems.length === 0 
                                ? 'bg-surface border-border/40 text-text-muted/30 cursor-not-allowed'
                                : 'bg-surface border-danger/20 text-danger hover:bg-danger/10 hover:border-danger/40'
                            }`}
                        >
                            <Trash2 className="size-4" />
                            Clear All
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
                                        className="absolute right-0 sm:right-auto sm:left-0 top-[calc(100%+0.5rem)] w-64 bg-surface/90 border border-border/60 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] z-[110] overflow-hidden p-4 backdrop-blur-2xl"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted px-2 pb-2 border-b border-border/40 mb-2">Priority Level</h4>
                                            {priorities[activeTab].map((p) => (
                                                <button
                                                    key={p}
                                                    onClick={() => {
                                                        setActivePriority(p);
                                                        setShowFilters(false);
                                                    }}
                                                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                                                        activePriority === p 
                                                            ? 'bg-primary border border-primary/40 text-primary-text shadow-md shadow-primary/20' 
                                                            : 'text-text-muted hover:bg-surface-hover hover:text-content border border-transparent'
                                                    }`}
                                                >
                                                    <span className="text-[11px] font-black uppercase tracking-widest">{p}</span>
                                                    {activePriority === p && <CheckCircle2 className="size-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

        {/* GRID LAYOUT FOR CARDS */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative w-full px-4 sm:px-6 md:px-12 lg:px-20 pb-24 lg:pb-8">
            <div className="max-w-[1400px] mx-auto w-full">
                <AnimatePresence mode="popLayout">
                    {filteredItems.length > 0 ? (
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                        {filteredItems.map((item, i) => (
                            <motion.div 
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => navigate(activeTab === 'Experiences' ? `/experiences/${item.id}` : `/resources`)}
                                className="group relative flex flex-col p-6 rounded-[2rem] bg-surface/50 backdrop-blur-sm border border-border/40 hover:border-primary/40 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer overflow-hidden min-h-[220px]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                <div className="relative flex justify-between items-start mb-6">
                                    <div className={`size-14 rounded-2xl flex items-center justify-center border transition-all duration-300 overflow-hidden shadow-sm group-hover:shadow-md ${
                                        activeTab === 'Experiences' 
                                        ? 'bg-primary/5 border-primary/20 group-hover:border-primary/40 text-primary' 
                                        : 'bg-accent/10 border-accent/20 text-accent group-hover:bg-accent group-hover:text-primary-text group-hover:shadow-accent/20'
                                    }`}>
                                        {activeTab === 'Experiences' ? (
                                            <>
                                                <img 
                                                    src={`https://logo.clearbit.com/${(item.company || '').toLowerCase().replace(/\s+/g, '')}.com`}
                                                    alt={item.company}
                                                    className="size-full object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'block';
                                                    }}
                                                />
                                                <Building2 className="size-7 hidden group-hover:text-primary transition-colors" />
                                            </>
                                        ) : (
                                            <Layers className="size-7" />
                                        )}
                                    </div>

                                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                                        <button 
                                            onClick={(e) => handleShare(item, e)}
                                            className="p-2.5 rounded-full bg-surface hover:bg-primary text-text-muted hover:text-primary-text border border-border/40 hover:border-primary shadow-sm hover:shadow-md transition-all active:scale-90"
                                            title="Share"
                                        >
                                            <Share2 className="size-4" />
                                        </button>
                                        <button 
                                            onClick={(e) => removeItem(item.id, activeTab, e)}
                                            className="p-2.5 rounded-full bg-surface hover:bg-danger text-text-muted hover:text-white border border-border/40 hover:border-danger shadow-sm hover:shadow-md transition-all active:scale-90"
                                            title="Remove from Saved"
                                        >
                                            <Bookmark className="size-4 fill-current" />
                                        </button>
                                    </div>
                                </div>

                                <div className="relative flex flex-col gap-2 mb-8 flex-1">
                                    <h3 className="text-lg md:text-xl font-black text-content tracking-tight group-hover:text-primary transition-colors leading-snug line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-[11px] font-bold text-text-muted uppercase tracking-[0.15em]">
                                        {item.company || item.category} {item.role && <span className="opacity-50 mx-1">•</span>} {item.role}
                                    </p>
                                </div>

                                <div className="mt-auto pt-5 border-t border-border/40 flex items-center justify-between relative">
                                    <div className={`px-3.5 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 shadow-sm ${
                                        (item.relevance || item.complexity) === 'High' || (item.relevance || item.complexity) === 'Advanced'
                                        ? 'bg-danger/10 border-danger/20 text-danger' :
                                        (item.relevance || item.complexity) === 'Medium'
                                        ? 'bg-warning/10 border-warning/20 text-warning' :
                                        'bg-success/10 border-success/20 text-success'
                                    }`}>
                                        <Zap className="size-3.5" />
                                        {item.relevance || item.complexity}
                                    </div>
                                    
                                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-text-muted/60">
                                        <Calendar className="size-3.5" />
                                        {item.date}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="col-span-full py-32"
                    >
                        <EmptyState 
                            icon={activeTab === 'Experiences' ? Compass : Layers} 
                            title={`No saved ${activeTab.toLowerCase()}`} 
                            desc={activePriority === 'All' && searchQuery === '' ? `Your saved library is empty. Start bookmarking ${activeTab.toLowerCase()} to quickly access them later.` : `No records match your current search/filter protocol.`} 
                            actionTitle={activePriority === 'All' && searchQuery === '' ? `Explore ${activeTab}` : 'Clear Filters'}
                            onClick={activePriority === 'All' && searchQuery === '' ? () => navigate(activeTab === 'Experiences' ? '/experiences' : '/resources') : resetAllFilters}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            </div>
        </div>
      </div>
      </div>
    </UserAppShell>
  );
};

const EmptyState = ({ icon: Icon, title, desc, actionTitle, onClick }) => (
    <div className="flex flex-col items-center justify-center text-center gap-6 max-w-sm mx-auto">
        <div className="relative size-24 rounded-full bg-surface-hover border border-dashed border-border/60 flex items-center justify-center mb-2">
            <Icon className="size-10 text-text-muted/40" />
            <div className="absolute -bottom-2 -right-2 size-10 rounded-full bg-surface border border-border flex items-center justify-center shadow-lg">
                <Bookmark className="size-5 text-primary" />
            </div>
        </div>
        
        <div className="flex flex-col gap-2">
            <h3 className="text-xl font-black text-content tracking-tight">{title}</h3>
            <p className="text-xs font-medium text-text-muted leading-relaxed">
                {desc}
            </p>
        </div>

        <button 
            onClick={onClick}
            className="mt-4 px-8 py-3 rounded-xl bg-primary hover:bg-primary-hover text-primary-text text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
        >
            {actionTitle}
            <ArrowRight className="size-4" />
        </button>
    </div>
);

export default SavedItemsPage;
