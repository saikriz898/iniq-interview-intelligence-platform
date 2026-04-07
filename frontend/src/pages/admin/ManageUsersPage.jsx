import React, { useState } from 'react';
import { 
  Users, UserPlus, UserMinus, ShieldCheck, Zap, 
  Terminal, ShieldAlert, Cpu, Layers, Bookmark, CheckCircle2,
  AlertCircle, Info, ChevronRight, Activity, Share2, Clipboard,
  PlusCircle, X, Edit3, Mail, Phone, MapPin, Globe,
  Briefcase, Key, Lock, Unlock, LogOut, Search, Filter, MoreVertical,
  ArrowUpRight, RefreshCcw, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';

/**
 * --- ADMIN USER MANAGEMENT: INSTITUTIONAL REGISTRY ---
 * Refined Design: "No-Scroll" Bento-Grid architecture.
 * Features: Stationary identity datastream, granular access-tier 
 * modification, and institutional node tracking.
 */
const ManageUsersPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const users = [
        { id: 'USR_942', name: 'Rohan Sharma', email: 'rohan.s@example.com', role: 'Candidate', status: 'Active', joins: '2d ago', tier: 'Node_Auth' },
        { id: 'USR_811', name: 'Ananya Iyer', email: 'ananya.i@example.com', role: 'Contributor', status: 'Active', joins: '1w ago', tier: 'Sync_Tier_1' },
        { id: 'USR_702', name: 'Vikram Singh', email: 'vikram.s@example.com', role: 'Candidate', status: 'Suspended', joins: '3h ago', tier: 'No_Auth' },
        { id: 'USR_655', name: 'Priya Das', email: 'priya.d@example.com', role: 'Contributor', status: 'Active', joins: '1m ago', tier: 'Sync_Tier_2' },
        { id: 'USR_512', name: 'Karthik Raja', email: 'karthik.r@example.com', role: 'Candidate', status: 'Active', joins: '5d ago', tier: 'Node_Auth' },
    ];

    const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.id.includes(searchQuery));

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col bg-background overflow-hidden font-['Inter']">
                
                {/* 1. REGISTRY COMMAND HUB (FIXED) */}
                <header className="h-16 shrink-0 border-b border-border/40 px-6 flex items-center justify-between bg-surface/5 backdrop-blur-md relative z-30">
                    <div className="flex items-center gap-5">
                        <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
                            <Users className="size-5.5" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[8px] font-black uppercase tracking-wider text-blue-500 italic">Identity Registry</span>
                                <div className="size-1 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                            <h1 className="text-sm font-black text-content uppercase tracking-widest italic">Institutional_Users Console_v4</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 flex-1 max-w-md mx-10">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted opacity-40" />
                            <input 
                                type="text"
                                placeholder="Search Identity Node (Name or ID)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-10 bg-background border border-border/60 rounded-xl pl-11 pr-4 text-[11px] font-bold uppercase tracking-tight placeholder:opacity-30 outline-none focus:border-primary shadow-inner transition-all italic"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                         <button className="px-5 py-2 rounded-xl bg-primary text-white text-[9px] font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2 italic">
                            <UserPlus className="size-3.5" />
                            Provision Node
                         </button>
                    </div>
                </header>

                {/* 2. IDENTITY ENGINE (NO-SCROLL DUAL PANEL) */}
                <main className="flex-1 flex overflow-hidden min-h-0 relative bg-border/5">
                    
                    {/* LEFT PANEL: IDENTITY DATASTREAM (REGISTRY LIST) */}
                    <div className="flex-1 overflow-y-auto no-scrollbar p-1">
                        <div className="grid grid-cols-1 gap-1">
                            {filteredUsers.map((user, i) => (
                                <motion.div 
                                    key={user.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => setSelectedUser(user)}
                                    className={`p-6 bg-background border-y border-border/20 flex items-center justify-between group cursor-pointer transition-all ${
                                        selectedUser?.id === user.id ? 'bg-surface/60 border-primary/20 shadow-inner' : 'hover:bg-surface/30'
                                    }`}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`size-12 rounded-2xl flex items-center justify-center border font-['JetBrains_Mono'] text-[12px] font-black transition-all ${
                                            selectedUser?.id === user.id ? 'bg-primary text-white border-primary' : 'bg-surface border-border text-text-muted group-hover:text-primary group-hover:border-primary/20'
                                        }`}>
                                            {user.name.charAt(0)}
                                        </div>
                                        <div className="flex flex-col gap-1.5 min-w-[200px]">
                                            <span className="text-[13px] font-black text-content uppercase tracking-tight italic">{user.name}</span>
                                            <span className="text-[8px] font-black text-text-muted opacity-30 uppercase tracking-[0.3em]">{user.id} // {user.email}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-12">
                                        <div className="flex flex-col items-end gap-1 px-6 border-r border-border/10">
                                             <span className="text-[8px] font-black text-text-muted opacity-20 uppercase tracking-widest">Access Node</span>
                                             <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic leading-none">{user.role}</span>
                                        </div>
                                        <div className="flex flex-col items-end gap-1 px-6 border-r border-border/10">
                                             <span className="text-[8px] font-black text-text-muted opacity-20 uppercase tracking-widest">Sync State</span>
                                             <div className="flex items-center gap-2">
                                                <div className={`size-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`} />
                                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] italic leading-none ${user.status === 'Active' ? 'text-emerald-500' : 'text-rose-500'}`}>{user.status.toUpperCase()}</span>
                                             </div>
                                        </div>
                                        <ChevronRight className={`size-5 transition-all ${selectedUser?.id === user.id ? 'text-primary translate-x-1' : 'text-text-muted opacity-10 group-hover:opacity-100 group-hover:text-primary transition-all'}`} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT PANEL: TELEMETRY & MODIFICATION HUB (STATIONARY) */}
                    <div className="w-[480px] shrink-0 border-l border-border/40 bg-surface/5 backdrop-blur-md overflow-y-auto no-scrollbar relative z-10">
                        <AnimatePresence mode="wait">
                            {selectedUser ? (
                                <motion.div 
                                    key={selectedUser.id}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    className="p-10 flex flex-col gap-10"
                                >
                                    <div className="flex flex-col items-center gap-8 text-center bg-background border border-border p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                            <ShieldCheck className="size-32 text-primary" />
                                        </div>
                                        <div className="size-28 rounded-[2.5rem] bg-surface flex items-center justify-center text-primary border border-border shadow-inner relative z-10">
                                            <Users className="size-12" />
                                        </div>
                                        <div className="flex flex-col gap-3 relative z-10">
                                            <h2 className="text-2xl font-black text-content uppercase tracking-tighter italic font-['Inter']">{selectedUser.name}</h2>
                                            <p className="text-[10px] font-black text-text-muted opacity-30 uppercase tracking-[0.3em] font-['JetBrains_Mono'] italic">Global_Node_Registry_09 // {selectedUser.id}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-12">
                                        {/* Sec 1: Access Tier Protocols */}
                                        <div className="flex flex-col gap-8">
                                            <div className="flex items-center gap-4 border-l-4 border-primary pl-5">
                                                <h3 className="text-[11px] font-black text-content uppercase tracking-[0.25em]">Access Synchronization</h3>
                                            </div>
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="p-8 rounded-[2rem] bg-surface border border-border flex items-center justify-between group hover:border-primary/20 transition-all shadow-sm">
                                                    <div className="flex flex-col gap-1.5">
                                                        <span className="text-[11px] font-black text-text-muted opacity-30 uppercase tracking-widest font-['JetBrains_Mono']">Current_Tier: {selectedUser.tier}</span>
                                                        <span className="text-[13px] font-black text-content uppercase tracking-tight italic">Verify Node_Sync Status</span>
                                                    </div>
                                                    <div className="size-10 rounded-xl bg-background border border-border flex items-center justify-center text-emerald-500 shadow-inner">
                                                        <CheckCircle2 className="size-5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Sec 2: Administrative Actions */}
                                        <div className="flex flex-col gap-6">
                                            <div className="flex items-center gap-4 border-l-4 border-rose-500 pl-5">
                                                <h3 className="text-[11px] font-black text-content uppercase tracking-[0.25em]">Registry Escalation</h3>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button className="h-16 rounded-[1.5rem] bg-surface border border-border text-[9px] font-black uppercase tracking-widest text-text-muted hover:border-rose-500 hover:text-rose-500 transition-all active:scale-95 flex items-center justify-center gap-3 italic">
                                                    <ShieldAlert className="size-4" />
                                                    Suspend Node
                                                </button>
                                                <button className="h-16 rounded-[1.5rem] bg-surface border border-border text-[9px] font-black uppercase tracking-widest text-text-muted hover:border-amber-500 hover:text-amber-500 transition-all active:scale-95 flex items-center justify-center gap-3 italic">
                                                    <RefreshCcw className="size-4" />
                                                    Purge Cache
                                                </button>
                                            </div>
                                            <button className="w-full h-18 rounded-[2rem] bg-background border-2 border-dashed border-border flex items-center justify-center gap-4 group hover:border-primary hover:bg-surface transition-all active:scale-[0.98]">
                                                <Layers className="size-5 text-text-muted opacity-40 group-hover:text-primary transition-all" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-text-muted group-hover:text-primary transition-all italic">Institutional Node Synchronization</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full flex flex-col items-center justify-center p-20 text-center gap-8 opacity-[0.15] grayscale"
                                >
                                    <Users className="size-24 text-text-muted animate-pulse" />
                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-sm font-black uppercase tracking-[0.5em] italic">Identity_Hub_v4</h3>
                                        <p className="text-[9px] font-bold uppercase tracking-[0.3em] leading-relaxed">Select an institutional identity node from the primary datastream to view granular telemetry.</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </main>
                
                {/* 3. SYNC PULSE FOOTER (STATIONARY) */}
                <footer className="h-10 shrink-0 border-t border-border/40 px-10 flex items-center justify-center bg-surface/5 grayscale opacity-10 pointer-events-none">
                     <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.5em] italic leading-none">
                         <Zap className="size-4 border-r border-border pr-4 h-full" />
                         INIQ_USER_MANAGEMENT_SUBSYSTEM // GLOBAL_REGISTRY_STABLE // SECTOR_09
                     </div>
                </footer>

            </div>
        </AdminAppShell>
    );
};

export default ManageUsersPage;
