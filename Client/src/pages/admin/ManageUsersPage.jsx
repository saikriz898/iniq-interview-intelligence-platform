import React, { useState, useEffect } from 'react';
import { 
  Users, Search, RefreshCcw, X, Edit3, Save, Mail,
  MapPin, Globe, ShieldCheck, ShieldAlert, Trash2,
  User, Activity, Terminal, ChevronRight,
  Image, CheckCircle2, AlertCircle, Calendar, Lock,
  Eye, EyeOff, Key, Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';
import toast from 'react-hot-toast';

const TABS = ['Overview', 'Edit Profile', 'Security'];

const ManageUsersPage = () => {
    const { theme, toggleTheme, isLoading, setIsLoading } = useGlobalContext();

    const [users, setUsers]             = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter]   = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [activeTab, setActiveTab]     = useState('Overview');
    const [saving, setSaving]           = useState(false);

    const [editForm, setEditForm] = useState({
        name: '', email: '', role: 'user', profilePicture: '',
        bio: '', location: '', domain: '', linkedin: '', github: '', portfolio: ''
    });

    const [newPwd, setNewPwd]     = useState('');
    const [cfmPwd, setCfmPwd]     = useState('');
    const [showNew, setShowNew]   = useState(false);
    const [showCfm, setShowCfm]   = useState(false);
    const [pwdBusy, setPwdBusy]   = useState(false);

    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch('http://localhost:5000/api/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) setUsers(data);
            else toast.error('Failed to load users');
        } catch { toast.error('Server error'); }
        finally { setIsLoading(false); }
    };

    const selectUser = (user) => {
        setSelectedUser(user);
        setActiveTab('Overview');
        setEditForm({
            name: user.name || '', email: user.email || '', role: user.role || 'user',
            profilePicture: user.profilePicture || '', bio: user.bio || '',
            location: user.location || '', domain: user.domain || '',
            linkedin: user.linkedin || '', github: user.github || '', portfolio: user.portfolio || ''
        });
        setNewPwd(''); setCfmPwd('');
    };

    const handleUpdate = async (e) => {
        e?.preventDefault();
        setSaving(true);
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch(`http://localhost:5000/api/users/${selectedUser._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(editForm)
            });
            const data = await res.json();
            if (res.ok) {
                toast.success('User updated');
                const updated = { ...selectedUser, ...editForm };
                setSelectedUser(updated);
                setUsers(prev => prev.map(u => u._id === selectedUser._id ? updated : u));
                setActiveTab('Overview');
            } else toast.error(data.error || 'Update failed');
        } catch { toast.error('Server error'); }
        finally { setSaving(false); }
    };

    const handleDelete = async () => {
        if (!window.confirm('Permanently delete this user?')) return;
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch(`http://localhost:5000/api/users/${selectedUser._id}`, {
                method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('User deleted');
                setSelectedUser(null);
                fetchUsers();
            } else toast.error('Delete failed');
        } catch { toast.error('Server error'); }
    };

    const handleForcePassword = async () => {
        if (!newPwd || !cfmPwd) { toast.error('Fill both fields'); return; }
        if (newPwd !== cfmPwd)  { toast.error('Passwords do not match'); return; }
        if (newPwd.length < 6)  { toast.error('Min 6 characters'); return; }
        setPwdBusy(true);
        try {
            const token = localStorage.getItem('iniq_token');
            const res = await fetch(`http://localhost:5000/api/users/${selectedUser._id}/force-password`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ newPassword: newPwd })
            });
            if (res.ok) {
                toast.success('Password reset');
                setNewPwd(''); setCfmPwd('');
            } else {
                const d = await res.json();
                toast.error(d.error || 'Reset failed');
            }
        } catch { toast.error('Server error'); }
        finally { setPwdBusy(false); }
    };

    const filtered = users.filter(u => {
        const q = searchQuery.toLowerCase();
        const matchQ = (u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q) || u._id?.includes(q));
        const matchR  = roleFilter === 'all' || u.role === roleFilter;
        return matchQ && matchR;
    });

    const initial = n => n?.charAt(0)?.toUpperCase() || '?';
    const fmtDate = d => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col bg-background overflow-hidden">

                {/* ── HEADER ── */}
                <header className="shrink-0 h-14 px-5 border-b border-border/50 bg-surface/80 backdrop-blur-xl flex items-center justify-between z-20 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                            <Users className="size-4" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-content leading-none">User Management</h1>
                            <p className="text-[10px] text-text-muted mt-0.5">{users.length} users · {filtered.length} shown</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 flex-1 max-w-md">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-text-muted" />
                            <input
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search name, email, or ID..."
                                className="w-full h-8 bg-background border border-border/60 rounded-lg pl-9 pr-3 text-xs text-content outline-none focus:border-primary transition-all"
                            />
                            {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-content"><X className="size-3" /></button>}
                        </div>
                        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="h-8 px-2.5 rounded-lg bg-background border border-border/60 text-xs text-content outline-none focus:border-primary">
                            <option value="all">All</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button onClick={fetchUsers} className="size-8 rounded-lg bg-surface border border-border text-text-muted hover:text-primary hover:border-primary/40 transition-all flex items-center justify-center active:scale-95">
                            <RefreshCcw className="size-3.5" />
                        </button>
                    </div>
                </header>

                {/* ── BODY: TWO-PANEL LAYOUT ── */}
                <div className="flex-1 flex overflow-hidden min-h-0">

                    {/* ── LEFT: USER LIST ── */}
                    <div className="w-[380px] lg:w-[420px] shrink-0 border-r border-border/40 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-border/30">
                            {filtered.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full gap-3 opacity-40 p-8 text-center">
                                    <Users className="size-12 text-text-muted" />
                                    <p className="text-sm font-semibold text-content">No users found</p>
                                </div>
                            ) : filtered.map((user, i) => (
                                <motion.div
                                    key={user._id}
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.02 }}
                                    onClick={() => selectUser(user)}
                                    className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all group ${
                                        selectedUser?._id === user._id
                                            ? 'bg-primary/8 border-l-2 border-primary'
                                            : 'hover:bg-surface/60 border-l-2 border-transparent'
                                    }`}
                                >
                                    <div className={`size-9 rounded-xl flex items-center justify-center text-sm font-bold overflow-hidden shrink-0 transition-all border ${
                                        selectedUser?._id === user._id
                                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                            : 'bg-surface border-border text-primary group-hover:border-primary/30'
                                    }`}>
                                        {user.profilePicture
                                            ? <img src={user.profilePicture} alt="" className="size-full object-cover" />
                                            : initial(user.name)
                                        }
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="text-sm font-semibold text-content truncate">{user.name}</p>
                                            <span className={`shrink-0 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${user.role === 'admin' ? 'text-warning border-warning/20 bg-warning/10' : 'text-primary border-primary/20 bg-primary/10'}`}>
                                                {user.role}
                                            </span>
                                        </div>
                                        <p className="text-xs text-text-muted truncate mt-0.5">{user.email}</p>
                                    </div>
                                    <ChevronRight className={`size-3.5 shrink-0 transition-all ${selectedUser?._id === user._id ? 'text-primary' : 'text-text-muted opacity-0 group-hover:opacity-100'}`} />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT: USER DETAILS PANEL ── */}
                    <div className="flex-1 flex flex-col overflow-hidden bg-surface/20">
                        <AnimatePresence mode="wait">
                            {!selectedUser ? (
                                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-10 opacity-30">
                                    <Users className="size-16 text-text-muted" />
                                    <div>
                                        <p className="text-base font-bold text-content">Select a User</p>
                                        <p className="text-sm text-text-muted mt-1">Click a user from the list to view and manage their account.</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key={selectedUser._id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 flex flex-col overflow-hidden">

                                    {/* Panel Header */}
                                    <div className="shrink-0 px-6 py-4 border-b border-border/40 bg-surface/60 backdrop-blur-md flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-xl overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center text-lg font-bold text-primary shadow-sm shrink-0">
                                                {selectedUser.profilePicture
                                                    ? <img src={selectedUser.profilePicture} alt="" className="size-full object-cover" />
                                                    : initial(selectedUser.name)
                                                }
                                            </div>
                                            <div>
                                                <h2 className="text-sm font-bold text-content leading-none">{selectedUser.name}</h2>
                                                <p className="text-xs text-text-muted mt-0.5">{selectedUser.email}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => setSelectedUser(null)} className="size-7 rounded-lg text-text-muted hover:text-content hover:bg-background border border-transparent hover:border-border transition-all flex items-center justify-center">
                                            <X className="size-3.5" />
                                        </button>
                                    </div>

                                    {/* Tabs */}
                                    <div className="shrink-0 flex border-b border-border/40 bg-surface/40 px-6">
                                        {TABS.map(tab => (
                                            <button key={tab} onClick={() => setActiveTab(tab)}
                                                className={`px-4 py-3 text-xs font-semibold border-b-2 -mb-px transition-all ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-content'}`}>
                                                {tab}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Tab Content */}
                                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                                        <AnimatePresence mode="wait">

                                            {/* ── OVERVIEW ── */}
                                            {activeTab === 'Overview' && (
                                                <motion.div key="ov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 flex flex-col gap-5">

                                                    {/* Profile Card */}
                                                    <div className="flex items-start gap-5 p-5 rounded-2xl bg-background border border-border shadow-sm">
                                                        <div className="size-16 rounded-2xl overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl font-bold text-primary shrink-0">
                                                            {selectedUser.profilePicture
                                                                ? <img src={selectedUser.profilePicture} alt="" className="size-full object-cover" />
                                                                : initial(selectedUser.name)
                                                            }
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-base font-bold text-content">{selectedUser.name}</h3>
                                                            <p className="text-xs text-text-muted">{selectedUser.email}</p>
                                                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                                                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${selectedUser.role === 'admin' ? 'text-warning border-warning/20 bg-warning/10' : 'text-primary border-primary/20 bg-primary/10'}`}>
                                                                    {selectedUser.role}
                                                                </span>
                                                                {selectedUser.domain && <span className="text-[9px] text-text-muted bg-surface border border-border px-2 py-0.5 rounded">{selectedUser.domain}</span>}
                                                                {selectedUser.location && <span className="text-[9px] text-text-muted bg-surface border border-border px-2 py-0.5 rounded flex items-center gap-1"><MapPin className="size-2.5" />{selectedUser.location}</span>}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Bio */}
                                                    {selectedUser.bio && (
                                                        <div className="p-4 rounded-xl bg-surface border border-border">
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-text-muted mb-1.5">Bio</p>
                                                            <p className="text-sm text-text-secondary leading-relaxed">{selectedUser.bio}</p>
                                                        </div>
                                                    )}

                                                    {/* Info Grid */}
                                                    <div className="grid grid-cols-2 gap-2.5">
                                                        <InfoCell icon={Mail}     label="Email"    value={selectedUser.email} />
                                                        <InfoCell icon={Calendar} label="Joined"   value={fmtDate(selectedUser.createdAt)} />
                                                        <InfoCell icon={Globe}    label="Domain"   value={selectedUser.domain || '—'} />
                                                        <InfoCell icon={MapPin}   label="Location" value={selectedUser.location || '—'} />
                                                    </div>

                                                    {/* Social Links */}
                                                    {(selectedUser.linkedin || selectedUser.github || selectedUser.portfolio) && (
                                                        <div className="flex flex-col gap-2">
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">Links</p>
                                                            <div className="flex flex-col gap-1.5">
                                                                {selectedUser.linkedin  && <LinkRow icon={Activity} label="LinkedIn"  href={selectedUser.linkedin} />}
                                                                {selectedUser.github    && <LinkRow icon={Terminal} label="GitHub"    href={selectedUser.github} />}
                                                                {selectedUser.portfolio && <LinkRow icon={Globe}    label="Portfolio" href={selectedUser.portfolio} />}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Actions */}
                                                    <div className="flex flex-col gap-2 pt-2 border-t border-border/40">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">Account Actions</p>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <button onClick={() => setActiveTab('Edit Profile')} className="h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-1.5 active:scale-95">
                                                                <Edit3 className="size-3.5" /> Edit Profile
                                                            </button>
                                                            <button onClick={handleDelete} className="h-10 rounded-xl bg-danger/5 border border-danger/20 text-danger text-xs font-bold hover:bg-danger hover:text-white transition-all flex items-center justify-center gap-1.5 active:scale-95">
                                                                <Trash2 className="size-3.5" /> Delete User
                                                            </button>
                                                        </div>
                                                        <button className="h-10 rounded-xl bg-warning/5 border border-warning/20 text-warning text-xs font-bold hover:bg-warning hover:text-white transition-all flex items-center justify-center gap-1.5 active:scale-95">
                                                            <ShieldAlert className="size-3.5" /> Suspend Account
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* ── EDIT PROFILE ── */}
                                            {activeTab === 'Edit Profile' && (
                                                <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                    <form onSubmit={handleUpdate} className="p-6 flex flex-col gap-3.5">
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <EF label="Full Name"    value={editForm.name}    onChange={v => setEditForm(p => ({ ...p, name: v }))}    icon={User}  />
                                                            <EF label="Email"        value={editForm.email}   onChange={v => setEditForm(p => ({ ...p, email: v }))}   icon={Mail}  type="email" />
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <label className="text-[10px] font-semibold text-text-muted">Role</label>
                                                            <select value={editForm.role} onChange={e => setEditForm(p => ({ ...p, role: e.target.value }))} className="w-full h-10 px-3 rounded-xl bg-surface border border-border text-sm text-content outline-none focus:border-primary transition-all">
                                                                <option value="user">User</option>
                                                                <option value="admin">Admin</option>
                                                            </select>
                                                        </div>
                                                        <EF label="Profile Picture URL" value={editForm.profilePicture} onChange={v => setEditForm(p => ({ ...p, profilePicture: v }))} icon={Image} />
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <EF label="Domain"   value={editForm.domain}   onChange={v => setEditForm(p => ({ ...p, domain: v }))}   icon={Globe} />
                                                            <EF label="Location" value={editForm.location} onChange={v => setEditForm(p => ({ ...p, location: v }))} icon={MapPin} />
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <label className="text-[10px] font-semibold text-text-muted">Bio</label>
                                                            <textarea value={editForm.bio} onChange={e => setEditForm(p => ({ ...p, bio: e.target.value }))} rows={3}
                                                                className="w-full px-3 py-2 rounded-xl bg-surface border border-border text-sm text-content outline-none focus:border-primary resize-none custom-scrollbar transition-all" />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <EF label="LinkedIn"  value={editForm.linkedin}  onChange={v => setEditForm(p => ({ ...p, linkedin: v }))}  icon={Activity} />
                                                            <EF label="GitHub"    value={editForm.github}    onChange={v => setEditForm(p => ({ ...p, github: v }))}    icon={Terminal} />
                                                        </div>
                                                        <EF label="Portfolio" value={editForm.portfolio} onChange={v => setEditForm(p => ({ ...p, portfolio: v }))} icon={Globe} />

                                                        <div className="flex gap-2.5 pt-3 border-t border-border/40 mt-1">
                                                            <button type="button" onClick={() => setActiveTab('Overview')} className="flex-1 h-10 rounded-xl border border-border text-xs font-bold text-text-muted hover:bg-surface transition-all">
                                                                Cancel
                                                            </button>
                                                            <button type="submit" disabled={saving} className="flex-[2] h-10 rounded-xl bg-primary text-white text-xs font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-60">
                                                                {saving ? <RefreshCcw className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
                                                                Save Changes
                                                            </button>
                                                        </div>
                                                    </form>
                                                </motion.div>
                                            )}

                                            {/* ── SECURITY ── */}
                                            {activeTab === 'Security' && (
                                                <motion.div key="sec" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 flex flex-col gap-6">

                                                    {/* Account identity */}
                                                    <div className="p-4 rounded-2xl bg-background border border-border shadow-sm">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-text-muted mb-3">Account Identity</p>
                                                        <div className="flex flex-col gap-2">
                                                            {[
                                                                { label: 'User ID',  value: selectedUser._id },
                                                                { label: 'Role',     value: selectedUser.role?.toUpperCase() },
                                                                { label: 'Joined',   value: fmtDate(selectedUser.createdAt) },
                                                            ].map(({ label, value }) => (
                                                                <div key={label} className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0">
                                                                    <span className="text-xs text-text-muted">{label}</span>
                                                                    <span className="text-xs font-semibold text-content font-mono break-all text-right ml-4">{value}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Force reset password */}
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <Key className="size-3.5 text-primary" />
                                                            <h3 className="text-xs font-black uppercase tracking-widest text-content">Force Reset Password</h3>
                                                        </div>
                                                        <div className="p-4 rounded-2xl bg-surface border border-border shadow-sm flex flex-col gap-3">
                                                            <p className="text-xs text-text-muted">Admin override — force-set a new password for this user.</p>
                                                            <PF label="New Password"     value={newPwd} onChange={setNewPwd} show={showNew} toggle={() => setShowNew(p => !p)} />
                                                            <PF label="Confirm Password" value={cfmPwd} onChange={setCfmPwd} show={showCfm} toggle={() => setShowCfm(p => !p)} />
                                                            {newPwd && cfmPwd && newPwd !== cfmPwd && (
                                                                <p className="text-xs text-danger font-semibold flex items-center gap-1">
                                                                    <AlertCircle className="size-3" /> Passwords do not match
                                                                </p>
                                                            )}
                                                            <button onClick={handleForcePassword} disabled={pwdBusy || !newPwd || !cfmPwd || newPwd !== cfmPwd}
                                                                className="h-10 rounded-xl bg-primary text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50">
                                                                {pwdBusy ? <RefreshCcw className="size-3.5 animate-spin" /> : <ShieldCheck className="size-3.5" />}
                                                                Reset Password
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Danger */}
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <AlertCircle className="size-3.5 text-danger" />
                                                            <h3 className="text-xs font-black uppercase tracking-widest text-danger">Danger Zone</h3>
                                                        </div>
                                                        <div className="p-4 rounded-2xl bg-danger/5 border border-danger/20 flex items-center justify-between shadow-sm">
                                                            <div>
                                                                <p className="text-sm font-semibold text-content">Delete Account</p>
                                                                <p className="text-xs text-text-muted mt-0.5">Permanently removes user and all data.</p>
                                                            </div>
                                                            <button onClick={handleDelete} className="shrink-0 ml-4 px-4 py-2 rounded-xl bg-danger text-white text-xs font-bold hover:bg-danger/90 transition-all active:scale-95">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </AdminAppShell>
    );
};

// ── SUB-COMPONENTS ──

const InfoCell = ({ icon: Icon, label, value }) => (
    <div className="p-3 rounded-xl bg-surface border border-border flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 text-text-muted">
            <Icon className="size-3" />
            <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
        </div>
        <p className="text-xs font-semibold text-content truncate">{value}</p>
    </div>
);

const LinkRow = ({ icon: Icon, label, href }) => (
    <a href={href.startsWith('http') ? href : `https://${href}`} target="_blank" rel="noreferrer"
        className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-background border border-border hover:border-primary/30 hover:text-primary transition-colors group">
        <Icon className="size-3.5 text-text-muted group-hover:text-primary transition-colors shrink-0" />
        <span className="text-xs font-semibold text-text-muted group-hover:text-primary transition-colors truncate">{label}</span>
        <span className="text-[10px] text-text-muted ml-auto truncate">{href}</span>
    </a>
);

const EF = ({ label, value, onChange, icon: Icon, type = 'text' }) => (
    <div className="flex flex-col gap-1">
        <label className="text-[10px] font-semibold text-text-muted">{label}</label>
        <div className="relative group">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-text-muted group-focus-within:text-primary transition-colors" />
            <input type={type} value={value} onChange={e => onChange(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface border border-border text-xs text-content outline-none focus:border-primary transition-all"
                placeholder={`Enter ${label.toLowerCase()}...`}
            />
        </div>
    </div>
);

const PF = ({ label, value, onChange, show, toggle }) => (
    <div className="flex flex-col gap-1">
        <label className="text-[10px] font-semibold text-text-muted">{label}</label>
        <div className="relative">
            <input type={show ? 'text' : 'password'} value={value} onChange={e => onChange(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 px-3 pr-10 rounded-xl bg-background border border-border text-xs text-content outline-none focus:border-primary transition-all shadow-inner"
            />
            <button type="button" onClick={toggle} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-content transition-colors">
                {show ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
            </button>
        </div>
    </div>
);

export default ManageUsersPage;
