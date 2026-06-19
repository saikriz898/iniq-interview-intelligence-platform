import React, { useState, useEffect } from 'react';
import { 
  Building2, PlusCircle, Search, Edit3, Trash2, 
  ArrowRight, Activity, Terminal, ShieldCheck, Globe,
  Layers, Bookmark, X, Save, ShieldAlert, Cpu, FileText, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';
import toast from 'react-hot-toast';

/**
 * --- MANAGE ROLES: DIRECTORY ---
 * Refined Design: Professional, formal, and structured administrative hub.
 */
const ManageRolesPage = () => {
    const { theme, toggleTheme, isLoading, setIsLoading } = useGlobalContext();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState(null);
    const [roles, setRoles] = useState([]);
    const [newRoleName, setNewRoleName] = useState('');

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/roles');
            const data = await res.json();
            setRoles(data);
        } catch (err) {
            toast.error('Failed to load roles');
        }
    };

    const handleAddOrEdit = async () => {
        const token = localStorage.getItem('iniq_token');
        const method = editingRole ? 'PUT' : 'POST';
        const url = editingRole 
            ? `http://localhost:5000/api/roles/${editingRole._id}` 
            : 'http://localhost:5000/api/roles';

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name: newRoleName })
            });

            if (res.ok) {
                toast.success(`Role ${editingRole ? 'updated' : 'added'} successfully`);
                setIsAddModalOpen(false);
                setEditingRole(null);
                setNewRoleName('');
                fetchRoles();
            } else {
                const data = await res.json();
                toast.error(data.error || 'Operation failed');
            }
        } catch (err) {
            toast.error('Server error');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this role?')) return;
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch(`http://localhost:5000/api/roles/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                toast.success('Role deleted');
                fetchRoles();
            } else {
                toast.error('Failed to delete role');
            }
        } catch (err) {
            toast.error('Server error');
        }
    };

    const filteredRoles = roles.filter(r => 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        r.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col p-8 lg:p-12 overflow-hidden bg-background">
                <div className="max-w-[1400px] mx-auto w-full h-full flex flex-col gap-8">
                    
                    {/* 1. ADMINISTRATION HEADER */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0 pt-2">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl font-black text-content tracking-tight leading-none font-['Inter']">Roles</h1>
                            <p className="text-sm font-medium text-text-muted mt-2">Manage the platform's supported role directory.</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                             <div className="relative group w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted  group-focus-within:text-primary transition-all" />
                                <input 
                                    type="text" 
                                    placeholder="Search roles..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full py-3.5 pl-12 pr-6 rounded-xl bg-surface border border-border text-sm font-medium focus:border-primary/40 outline-none transition-all shadow-sm"
                                />
                             </div>
                             <button 
                                onClick={() => { setIsAddModalOpen(true); setNewRoleName(''); }}
                                className="h-[48px] px-6 rounded-xl bg-primary text-primary-text text-sm font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2"
                             >
                                <PlusCircle className="size-4.5" />
                                Add Role
                             </button>
                        </div>
                    </div>

                    {/* 2. ROLE DATA TABLE */}
                    <div className="flex-1 bg-surface border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col mb-4">
                        <div className="flex-1 overflow-y-auto custom-scrollbar relative min-h-0">
                            <table className="w-full text-left border-collapse">
                                <thead className="sticky top-0 z-10 bg-surface border-b border-border">
                                    <tr>
                                        <th className="px-8 py-5 text-xs font-semibold text-text-muted">Role Name</th>
                                        <th className="px-8 py-5 text-xs font-semibold text-text-muted">System Slug</th>
                                        <th className="px-8 py-5 text-xs font-semibold text-text-muted text-center">Submissions</th>
                                        <th className="px-8 py-5 text-xs font-semibold text-text-muted text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/20">
                                    <AnimatePresence mode="popLayout">
                                        {filteredRoles.map((role, i) => (
                                            <motion.tr 
                                                key={role._id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, scale: 0.98 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="group hover:bg-surface-hover/30 transition-colors"
                                            >
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="size-10 rounded-xl bg-background border border-border flex items-center justify-center grayscale group-hover:grayscale-0 transition-all shadow-sm">
                                                            <Layers className="size-5 text-text-muted group-hover:text-primary transition-colors" />
                                                        </div>
                                                        <span className="text-sm font-bold text-content tracking-tight font-['Inter']">{role.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <code className="px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-medium text-primary">
                                                        /{role.slug}
                                                    </code>
                                                </td>
                                                <td className="px-8 py-5 text-center">
                                                    <span className="text-[14px] font-black text-content tabular-nums">{(role.frequency || 0).toString().padStart(3, '0')}</span>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button 
                                                            onClick={() => { setEditingRole(role); setNewRoleName(role.name); }}
                                                            className="size-9 rounded-lg bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all shadow-sm active:scale-90"
                                                        >
                                                            <Edit3 className="size-4.5" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(role._id)}
                                                            className="size-9 rounded-lg bg-surface border border-border flex items-center justify-center text-danger hover:bg-danger hover:text-primary-text transition-all shadow-sm active:scale-95"
                                                        >
                                                            <Trash2 className="size-4.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

            {/* ROLE MODAL: ADD / EDIT POSITION */}
            <AnimatePresence>
                {(isAddModalOpen || editingRole) && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { setIsAddModalOpen(false); setEditingRole(null); }}
                            className="fixed inset-0 z-[200] bg-background/40 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-surface border border-border rounded-3xl shadow-2xl z-[210] overflow-hidden p-10"
                        >
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-2 border-b border-border pb-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-bold text-content tracking-tight font-['Inter']">
                                            {editingRole ? "Edit Role" : "Add Role"}
                                        </h2>
                                        <button onClick={() => { setIsAddModalOpen(false); setEditingRole(null); }} className="text-text-muted hover:text-danger transition-colors">
                                            <X className="size-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-text-muted px-1">Role Title</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Frontend Architect"
                                            value={newRoleName}
                                            onChange={(e) => setNewRoleName(e.target.value)}
                                            className="w-full p-3.5 rounded-xl bg-background border border-border focus:border-primary text-sm font-medium outline-none transition-all shadow-sm"
                                        />
                                    </div>
                                    <button 
                                        onClick={handleAddOrEdit}
                                        className="w-full py-3.5 mt-4 rounded-xl bg-primary text-primary-text text-sm font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all active:scale-95"
                                    >
                                        <CheckCircle2 className="size-4.5" />
                                        Save Role
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </AdminAppShell>
    );
};

export default ManageRolesPage;
