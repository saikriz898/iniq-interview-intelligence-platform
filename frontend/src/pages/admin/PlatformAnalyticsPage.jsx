import React from 'react';
import { 
  Building2, Calendar, User, ShieldCheck, Zap, 
  Terminal, ShieldAlert, Cpu, Layers, Bookmark, CheckCircle2,
  AlertCircle, Info, ChevronRight, Activity, Share2, Clipboard,
  PlusCircle, X, Edit3, Mail, Phone, MapPin, Globe,
  Briefcase, Key, Lock, Unlock, LogOut, Search, Filter, MoreVertical,
  ArrowUpRight, RefreshCcw, Shield, AreaChart, BarChart4, PieChart,
  Target, TrendingUp, TrendingDown, Clock, MousePointer2, Users,
  Network, Radio, Orbit, Database, Cpu as Processor
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';

/**
 * --- ADMIN INTELLIGENCE HUB: NEURAL COMMAND CENTER (V5 PRESTIGE) ---
 * Refined Design: Circular Radar architecture & Neural Datastreams.
 * Features: Zero-scroll stationary viewport, high-density telemetry,
 * and authoritative institutional synchronization.
 */
const PlatformAnalyticsPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();

    const telemetryNodes = [
        { label: 'Neural Sync Nodes', value: '12,402', change: '+12%', trend: 'up', icon: Users, color: 'text-primary' },
        { label: 'Experience Registry', value: '4,103', change: '+8%', trend: 'up', icon: Database, color: 'text-emerald-500' },
        { label: 'Verdict Acceptance', value: '62%', change: '-2%', trend: 'down', icon: Target, color: 'text-amber-500' },
        { label: 'Activity Pulse', value: '94 / s', change: '+15%', trend: 'up', icon: Activity, color: 'text-rose-500' },
    ];

    const sectoralDistribution = [
        { name: 'FAANG Nodes', val: 78, color: 'bg-primary' },
        { name: 'Unicorn Nodes', val: 56, color: 'bg-emerald-500' },
        { name: 'Global Ops', val: 42, color: 'bg-amber-500' },
        { name: 'Strategic Nodes', val: 24, color: 'bg-rose-500' },
    ];

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col bg-background overflow-hidden relative font-['Inter']">
                
                {/* 1. NEURAL COMMAND HEADER */}
                <header className="h-16 shrink-0 border-b border-border/40 px-6 flex items-center justify-between bg-surface/5 backdrop-blur-md relative z-30">
                    <div className="flex items-center gap-5">
                        <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                            <Orbit className="size-5.5 animate-spin-slow" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[8px] font-black uppercase tracking-wider text-amber-500 italic leading-none">Global Intelligence</span>
                                <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            </div>
                            <h1 className="text-sm font-black text-content uppercase tracking-widest italic">Intelligence Hub_v5.0_BETA</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full bg-background border border-border shadow-inner">
                             <div className="size-1.5 rounded-full bg-emerald-500" />
                             <span className="text-[9px] font-black text-text-muted/60 uppercase tracking-[0.2em] italic">DATANODE_SYNC_STABLE</span>
                        </div>
                        <button className="px-5 py-2 rounded-xl bg-primary text-white text-[9px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all active:scale-95 shadow-2xl shadow-primary/20 italic flex items-center gap-2">
                            <RefreshCcw className="size-3.5" />
                            Force Sync
                        </button>
                    </div>
                </header>

                {/* 2. COMMAND CANVAS (STATIONARY VIEWPORT) */}
                <main className="flex-1 flex overflow-hidden p-1 gap-1 bg-border/20 relative cursor-crosshair">
                    
                    {/* SECTOR A: NEURAL RADAR (LEFT - 8/12 equivalent) */}
                    <div className="flex-[2] bg-background border border-border/40 flex flex-col overflow-hidden relative group">
                        
                        {/* 2A.1 REAL-TIME TELEMETRY NODES (TOP) */}
                        <div className="h-40 shrink-0 grid grid-cols-4 gap-1 border-b border-border/40 bg-border/5 p-1">
                            {telemetryNodes.map((node, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-background p-6 flex flex-col justify-between border border-border/20 group/node hover:border-primary/20 transition-all cursor-pointer relative overflow-hidden"
                                >
                                    <div className="flex items-center justify-between relative z-10">
                                        <span className="text-[9px] font-black text-text-muted/40 uppercase tracking-[0.2em] italic leading-none">{node.label}</span>
                                        <node.icon className={`size-4 opacity-10 group-hover/node:opacity-100 transition-all ${node.color}`} />
                                    </div>
                                    <div className="flex items-end justify-between relative z-10">
                                        <span className="text-2xl font-black text-content uppercase tracking-tighter italic leading-none">{node.value}</span>
                                        <div className={`flex items-center gap-1 text-[8px] font-black ${node.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {node.change}
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/[0.02] opacity-0 group-hover/node:opacity-100 transition-opacity" />
                                </motion.div>
                            ))}
                        </div>

                        {/* 2A.2 CENTRAL NEURAL RADAR */}
                        <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-surface/5">
                             <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                                 <div className="w-[800px] h-[800px] border-[40px] border-primary rounded-full animate-pulse-slow" />
                                 <div className="absolute w-[600px] h-[600px] border-[20px] border-primary/20 rounded-full animate-spin-slow" />
                             </div>

                             <div className="max-w-4xl w-full px-12 grid grid-cols-2 gap-12 relative z-10">
                                 <div className="flex flex-col gap-12">
                                     <div className="flex flex-col gap-4">
                                         <h3 className="text-[12px] font-black text-content uppercase tracking-[0.4em] italic mb-4">Sector_Distribution</h3>
                                         <div className="space-y-6">
                                             {sectoralDistribution.map((sector, i) => (
                                                 <div key={i} className="flex flex-col gap-2 group/bar">
                                                     <div className="flex items-end justify-between px-2">
                                                         <span className="text-[10px] font-black text-text-muted uppercase tracking-widest italic leading-none">{sector.name}</span>
                                                         <span className="text-[9px] font-black text-content italic leading-none">{sector.val}%</span>
                                                     </div>
                                                     <div className="h-1.5 w-full bg-surface border border-border rounded-full overflow-hidden shadow-inner p-[1px]">
                                                         <motion.div 
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${sector.val}%` }}
                                                            transition={{ delay: 0.5 + (i * 0.1), duration: 1.5 }}
                                                            className={`h-full rounded-full ${sector.color} shadow-[0_0_10px_rgba(0,0,0,0.1)] relative overflow-hidden`}
                                                         >
                                                             <div className="absolute inset-x-0 h-full bg-white/20 animate-marquee" />
                                                         </motion.div>
                                                     </div>
                                                 </div>
                                             ))}
                                         </div>
                                     </div>
                                 </div>

                                 <div className="flex flex-col items-center justify-center text-center p-12 rounded-full border-2 border-dashed border-border/40 relative group/radar">
                                      <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse blur-3xl opacity-0 group-hover/radar:opacity-100 transition-opacity" />
                                      <div className="size-24 rounded-full bg-background border border-border flex items-center justify-center text-primary shadow-2xl relative z-10 group-hover:scale-110 transition-all duration-700">
                                          <Target className="size-10 animate-pulse" />
                                      </div>
                                      <div className="flex flex-col gap-3 mt-8 relative z-10">
                                          <h2 className="text-3xl font-black text-content uppercase tracking-tight italic leading-none">62.8% SYNC</h2>
                                          <span className="text-[9px] font-black text-text-muted opacity-40 uppercase tracking-[0.3em] font-['JetBrains_Mono']">GLOBAL_INDEX_EFFICIENCY</span>
                                      </div>
                                      
                                      <div className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-[8px] font-black uppercase tracking-widest italic shadow-2xl group-hover:-translate-y-2 transition-transform">
                                          Optimized
                                      </div>
                                 </div>
                             </div>
                        </div>
                    </div>

                    {/* SECTOR B: TELEMETRY STREAM (RIGHT - 4/12 equivalent) */}
                    <div className="flex-1 min-w-[380px] bg-background border border-border/40 flex flex-col overflow-hidden relative z-10 shadow-2xl">
                         <div className="h-16 shrink-0 border-b border-border/20 px-8 flex items-center justify-between bg-surface/5 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <Terminal className="size-4 text-rose-500" />
                                <h3 className="text-[10px] font-black text-content uppercase tracking-[0.4em] italic">System_Logs</h3>
                            </div>
                            <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        
                        <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-3 bg-surface/5 relative">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="p-5 rounded-2xl bg-surface/40 border border-border/60 flex flex-col gap-3 group hover:border-primary/30 transition-all shadow-sm relative overflow-hidden"
                                >
                                    <div className="flex items-center justify-between relative z-10">
                                        <div className="flex items-center gap-3">
                                            <div className="size-1.5 rounded-full bg-primary" />
                                            <span className="text-[9px] font-black text-content uppercase tracking-widest italic leading-none">NODE_RESCAN // SECTOR_{i}</span>
                                        </div>
                                        <span className="text-[8px] font-black text-text-muted opacity-30 uppercase tracking-widest font-['JetBrains_Mono']">2M_AGO</span>
                                    </div>
                                    <div className="flex items-center justify-between relative z-10">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black text-text-muted/60 leading-none">Latency: 14ms</span>
                                            <span className="text-[8px] font-black text-text-muted/20 uppercase tracking-[0.2em] italic">Datastream_Verified</span>
                                        </div>
                                        <ArrowUpRight className="size-3.5 text-text-muted opacity-20 group-hover:text-primary group-hover:opacity-100 transition-all hover:translate-x-0.5 hover:-translate-y-0.5" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                                        <Processor className="size-12 text-primary" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="p-8 border-t border-border/20 bg-background shrink-0 text-center">
                             <p className="text-[8px] font-black text-text-muted/30 uppercase tracking-[0.5em] italic leading-none mb-6">INIQ_INTELLIGENCE_SUBSYSTEM_V5</p>
                             <button className="w-full h-14 rounded-2xl bg-surface border border-border text-[9px] font-black uppercase tracking-widest text-text-muted hover:text-primary hover:border-primary/30 transition-all active:scale-[0.98] shadow-sm italic flex items-center justify-center gap-3">
                                <Database className="size-4" />
                                [ Purge Datacache ]
                             </button>
                        </div>
                    </div>

                    {/* SECTOR C: NEURAL FOOTER (STATIONARY) */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 px-10 py-3 rounded-full bg-background border border-border/60 shadow-2xl backdrop-blur-2xl z-20 grayscale opacity-30 pointer-events-none">
                         {[ShieldCheck, Zap, Network, Radio].map((Icon, i) => (
                             <Icon key={i} className="size-4 text-text-muted" />
                         ))}
                         <span className="text-[9px] font-black uppercase tracking-[0.6em] italic leading-none pl-4 border-l border-border/40">Neural_Pulse_Stable</span>
                    </div>
                </main>
            </div>
        </AdminAppShell>
    );
};

export default PlatformAnalyticsPage;
