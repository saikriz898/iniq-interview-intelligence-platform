import React, { useState, useEffect } from 'react';
import { 
  Users, UserPlus, UserMinus, ShieldCheck, Zap, 
  Terminal, ShieldAlert, Cpu, Layers, Bookmark, CheckCircle2,
  AlertCircle, Info, ChevronRight, Activity, Share2, Clipboard,
  PlusCircle, X, Edit3, Mail, Phone, MapPin, Globe,
  Briefcase, Key, Lock, Unlock, LogOut, Search, Filter, MoreVertical,
  ArrowUpRight, RefreshCcw, Shield, Trash2, Save, Image, Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';
import toast from 'react-hot-toast';

/**
 * --- ADMIN USER MANAGEMENT: INSTITUTIONAL REGISTRY ---
 * Refined Design: "No-Scroll" Bento-Grid architecture.
 * Features: Real-time user database connection, profile modification hub.
 */
const ManageUsersPage = () => {
    const { theme, toggleTheme, isLoading, setIsLoading } = useGlobalContext();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    
    // Edit Form State
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        role: '',
        profilePicture: '',
        bio: '',
        location: '',
        domain: '',
        linkedin: '',
        github: '',
        portfolio: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch('http://localhost:5000/api/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setUsers(data);
            } else {
                toast.error('Failed to sync registry nodes');
            }
        } catch (err) {
            toast.error('Registry connection failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setIsEditing(false);
        setEditForm({
            name: user.name || '',
            email: user.email || '',
            role: user.role || 'user',
            profilePicture: user.profilePicture || '',
            bio: user.bio || '',
            location: user.location || '',
            domain: user.domain || '',
            linkedin: user.linkedin || '',
            github: user.github || '',
            portfolio: user.portfolio || ''
        });
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch(`http://localhost:5000/api/users/${selectedUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editForm)
            });
            const data = await res.json();
            if (res.ok) {
                toast.success('Node identity updated');
                setIsEditing(false);
                fetchUsers();
                setSelectedUser(data);
            } else {
                toast.error(data.error || 'Update failed');
            }
        } catch (err) {
            toast.error('Server error during update');
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('PERMANENTLY DECOMMISSION NODE? This action is irreversible.')) return;
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('Node purged from registry');
                setSelectedUser(null);
                fetchUsers();
            }
        } catch (err) {
            toast.error('Purge operation failed');
        }
    };

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u._id.includes(searchQuery)
    );

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
                                <span className="px-2.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[8px] font-bold uppercase tracking-wider text-blue-500 italic">Identity Registry</span>
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
                                placeholder="Search Identity Node (Name, Email, or ID)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-10 bg-background border border-border/60 rounded-xl pl-11 pr-4 text-[11px] font-bold uppercase tracking-tight placeholder:opacity-30 outline-none focus:border-primary shadow-inner transition-all italic"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                         <button onClick={fetchUsers} className="px-5 py-2 rounded-xl bg-surface border border-border text-text-muted text-[9px] font-black uppercase tracking-widest shadow-sm hover:border-primary/40 hover:text-primary transition-all active:scale-95 flex items-center gap-2 italic">
                            <RefreshCcw className="size-3.5" />
                            Sync Registry
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
                                    key={user._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => handleSelectUser(user)}
                                    className={`p-6 bg-background border-y border-border/20 flex items-center justify-between group cursor-pointer transition-all ${
                                        selectedUser?._id === user._id ? 'bg-surface/60 border-primary/20 shadow-inner' : 'hover:bg-surface/30'
                                    }`}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`size-12 rounded-2xl flex items-center justify-center border font-['JetBrains_Mono'] text-[12px] font-black transition-all overflow-hidden ${
                                            selectedUser?._id === user._id ? 'bg-primary text-white border-primary' : 'bg-surface border-border text-text-muted group-hover:text-primary group-hover:border-primary/20'
                                        }`}>
                                            {user.profilePicture ? (
                                                <img src={user.profilePicture} alt="Avatar" className="size-full object-cover" />
                                            ) : (
                                                user.name.charAt(0)
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1.5 min-w-[200px]">
                                            <span className="text-[13px] font-black text-content uppercase tracking-tight italic">{user.name}</span>
                                            <span className="text-[8px] font-black text-text-muted opacity-30 uppercase tracking-[0.3em]">{user._id} // {user.email}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-12">
                                        <div className="flex flex-col items-end gap-1 px-6 border-r border-border/10">
                                             <span className="text-[8px] font-black text-text-muted opacity-20 uppercase tracking-widest">Access Node</span>
                                             <span className={`text-[10px] font-black uppercase tracking-[0.2em] italic leading-none ${user.role === 'admin' ? 'text-amber-500' : 'text-primary'}`}>{user.role}</span>
                                        </div>
                                        <div className="flex flex-col items-end gap-1 px-6 border-r border-border/10">
                                             <span className="text-[8px] font-black text-text-muted opacity-20 uppercase tracking-widest">Joined</span>
                                             <span className="text-[10px] font-black uppercase tracking-[0.2em] italic leading-none text-text-muted">{new Date(user.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <ChevronRight className={`size-5 transition-all ${selectedUser?._id === user._id ? 'text-primary translate-x-1' : 'text-text-muted opacity-10 group-hover:opacity-100 group-hover:text-primary transition-all'}`} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT PANEL: TELEMETRY & MODIFICATION HUB (STATIONARY) */}
                    <div className="w-[520px] shrink-0 border-l border-border/40 bg-surface/5 backdrop-blur-md overflow-y-auto no-scrollbar relative z-10">
                        <AnimatePresence mode="wait">
                            {selectedUser ? (
                                <motion.div 
                                    key={selectedUser._id}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    className="p-10 flex flex-col gap-10"
                                >
                                    {/* User Identity Banner */}
                                    <div className="flex flex-col items-center gap-8 text-center bg-background border border-border p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                            <ShieldCheck className="size-32 text-primary" />
                                        </div>
                                        <div className="size-28 rounded-[2.5rem] bg-surface flex items-center justify-center text-primary border border-border shadow-inner relative z-10 overflow-hidden">
                                            {selectedUser.profilePicture ? (
                                                <img src={selectedUser.profilePicture} alt="Avatar" className="size-full object-cover" />
                                            ) : (
                                                <Users className="size-12" />
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-3 relative z-10">
                                            <h2 className="text-2xl font-black text-content uppercase tracking-tighter italic font-['Inter']">{selectedUser.name}</h2>
                                            <p className="text-[10px] font-black text-text-muted opacity-30 uppercase tracking-[0.3em] font-['JetBrains_Mono'] italic">Registry_Sector_09 // {selectedUser._id}</p>
                                        </div>
                                        {!isEditing && (
                                            <button 
                                                onClick={() => setIsEditing(true)}
                                                className="absolute bottom-6 right-8 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all active:scale-95 flex items-center gap-2"
                                            >
                                                <Edit3 className="size-3.5" />
                                                Edit Profile
                                            </button>
                                        )}
                                    </div>

                                    {!isEditing ? (
                                        /* READ-ONLY TELEMETRY */
                                        <div className="flex flex-col gap-10">
                                            <div className="grid grid-cols-1 gap-4">
                                                <TelemetryItem label="Operational Signal" value={selectedUser.email} icon={Mail} />
                                                <TelemetryItem label="Current Access Tier" value={selectedUser.role.toUpperCase()} icon={ShieldCheck} />
                                                <TelemetryItem label="Institutional Station" value={selectedUser.location || 'Unassigned'} icon={MapPin} />
                                                <TelemetryItem label="Specialization Domain" value={selectedUser.domain || 'Not Specified'} icon={Globe} />
                                            </div>
                                            
                                            <div className="flex flex-col gap-4">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-text-muted opacity-40 italic border-l-2 border-primary pl-4">Registry Actions</span>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <button onClick={() => handleDeleteUser(selectedUser._id)} className="h-16 rounded-[1.5rem] bg-rose-500/5 border border-rose-500/20 text-[9px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3 italic">
                                                        <Trash2 className="size-4" />
                                                        Purge Node
                                                    </button>
                                                    <button className="h-16 rounded-[1.5rem] bg-amber-500/5 border border-amber-500/20 text-[9px] font-black uppercase tracking-widest text-amber-500 hover:bg-amber-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3 italic">
                                                        <ShieldAlert className="size-4" />
                                                        Suspend Sync
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* EDIT MODE FORM */
                                        <form onSubmit={handleUpdateUser} className="flex flex-col gap-8">
                                            <div className="flex flex-col gap-6">
                                                <EditField label="Identity Name" value={editForm.name} icon={User} onChange={(v) => setEditForm({...editForm, name: v})} />
                                                <EditField label="Email Address" value={editForm.email} icon={Mail} onChange={(v) => setEditForm({...editForm, email: v})} />
                                                
                                                <div className="flex flex-col gap-3">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">Access Role</label>
                                                    <select 
                                                        value={editForm.role}
                                                        onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                                                        className="w-full py-4 px-6 rounded-2xl bg-surface border border-border text-[11px] font-bold uppercase tracking-widest outline-none focus:border-primary shadow-sm"
                                                    >
                                                        <option value="user">USER NODE</option>
                                                        <option value="admin">ADMIN OVERSEER</option>
                                                    </select>
                                                </div>

                                                <EditField label="Profile Picture URL" value={editForm.profilePicture} icon={Image} onChange={(v) => setEditForm({...editForm, profilePicture: v})} />
                                                <EditField label="Primary Domain" value={editForm.domain} icon={Globe} onChange={(v) => setEditForm({...editForm, domain: v})} />
                                                <EditField label="Station Location" value={editForm.location} icon={MapPin} onChange={(v) => setEditForm({...editForm, location: v})} />

                                                <div className="flex flex-col gap-3">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">Operational Directive (Bio)</label>
                                                    <textarea 
                                                        value={editForm.bio}
                                                        onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                                                        className="w-full h-32 p-6 rounded-2xl bg-surface border border-border text-[12px] font-medium text-content outline-none focus:border-primary shadow-inner resize-none"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                     <EditField label="LinkedIn" value={editForm.linkedin} icon={Activity} onChange={(v) => setEditForm({...editForm, linkedin: v})} />
                                                     <EditField label="GitHub" value={editForm.github} icon={Terminal} onChange={(v) => setEditForm({...editForm, github: v})} />
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 pt-4 border-t border-border/40">
                                                <button type="submit" className="flex-1 h-14 rounded-2xl bg-primary text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:-translate-y-0.5 transition-all active:scale-95">
                                                    <Save className="size-4.5" />
                                                    Commit Changes
                                                </button>
                                                <button type="button" onClick={() => setIsEditing(false)} className="px-8 h-14 rounded-2xl border border-border text-[11px] font-black uppercase tracking-widest text-text-muted hover:bg-surface transition-all">
                                                    Abort
                                                </button>
                                            </div>
                                        </form>
                                    )}
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

// --- PRIVATE COMPONENTS ---

const TelemetryItem = ({ label, value, icon: Icon }) => (
    <div className="p-6 rounded-2xl bg-surface border border-border flex items-center justify-between group hover:border-primary/20 transition-all shadow-sm">
        <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-black text-text-muted opacity-30 uppercase tracking-widest font-['JetBrains_Mono']">{label}</span>
            <span className="text-[13px] font-black text-content uppercase tracking-tight italic">{value || 'NOT_SPECIFIED'}</span>
        </div>
        <div className="size-10 rounded-xl bg-background border border-border flex items-center justify-center text-primary/40 group-hover:text-primary transition-colors shadow-inner">
            <Icon className="size-4.5" />
        </div>
    </div>
);

const EditField = ({ label, value, icon: Icon, onChange, placeholder = '' }) => (
    <div className="flex flex-col gap-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-80 ml-1">{label}</label>
        <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 size-4.5 flex items-center justify-center transition-all">
                <Icon className="size-full text-primary/30 group-focus-within:text-primary transition-colors" />
            </div>
            <input 
                type="text" 
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full py-4 pl-14 pr-6 rounded-2xl bg-surface border border-border text-[12px] font-bold text-content outline-none focus:border-primary shadow-sm"
            />
        </div>
    </div>
);

export default ManageUsersPage;

