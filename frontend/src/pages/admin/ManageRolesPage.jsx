import React, { useState } from 'react';
import { 
  Building2, PlusCircle, Search, Edit3, Trash2, 
  ArrowRight, Activity, Terminal, ShieldCheck, Globe,
  Layers, Bookmark, X, Save, ShieldAlert, Cpu, FileText, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import AdminAppShell from '../../layouts/AdminAppShell';

/**
 * --- MANAGE ROLES: SYSTEM ROLE HIERARCHY ---
 * Refined Design: Professional, formal, and structured administrative hub 
 * for maintaining the role and position database.
 */
const ManageRolesPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState(null);

    const roles = [
        { id: 1, name: 'SDE-I', slug: 'sde-1', total: 450, status: 'Active' },
        { id: 2, name: 'SDE-II', slug: 'sde-2', total: 320, status: 'Active' },
        { id: 3, name: 'Full-stack Developer', slug: 'full-stack', total: 280, status: 'Active' },
        { id: 4, name: 'Backend Architect', slug: 'backend-arch', total: 120, status: 'Active' },
        { id: 5, name: 'Product Manager', slug: 'product-manager', total: 95, status: 'Active' },
    ];

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
                            <div className="flex items-center gap-3">
                                <span className="px-2.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[9px] font-bold uppercase tracking-wider text-blue-500">Position Hierarchy Hub</span>
                            </div>
                            <h1 className="text-3xl font-black text-content uppercase tracking-tight leading-none font-['Inter']">Role Management</h1>
                            <p className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-[0.2em] mt-2">Define and regulate the available career positions and organizational layers.</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                             <div className="relative group w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-muted opacity-40 group-focus-within:text-primary transition-all" />
                                <input 
                                    type="text" 
                                    placeholder="Search role definitions..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full py-4 pl-12 pr-6 rounded-xl bg-surface border border-border text-[11px] font-bold uppercase tracking-wider focus:border-primary/40 outline-none transition-all shadow-sm"
                                />
                             </div>
                             <button 
                                onClick={() => setIsAddModalOpen(true)}
                                className="h-[52px] px-6 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-3"
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
                                        <th className="px-8 py-5 text-[9px] font-bold uppercase tracking-[0.25em] text-text-muted opacity-40">Role Classification</th>
                                        <th className="px-8 py-5 text-[9px] font-bold uppercase tracking-[0.25em] text-text-muted opacity-40">System Slug</th>
                                        <th className="px-8 py-5 text-[9px] font-bold uppercase tracking-[0.25em] text-text-muted opacity-40 text-center">Global Frequency</th>
                                        <th className="px-8 py-5 text-[9px] font-bold uppercase tracking-[0.25em] text-text-muted opacity-40 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/20">
                                    <AnimatePresence mode="popLayout">
                                        {filteredRoles.map((role, i) => (
                                            <motion.tr 
                                                key={role.id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, scale: 0.98 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="group hover:bg-surface-hover/30 transition-colors"
                                            >
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="size-10 rounded-xl bg-background border border-border flex items-center justify-center grayscale group-hover:grayscale-0 transition-all shadow-inner">
                                                            <Layers className="size-5 text-text-muted group-hover:text-primary transition-colors" />
                                                        </div>
                                                        <span className="text-[14px] font-black text-content uppercase tracking-tight italic font-['Inter']">{role.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <code className="px-3 py-1.5 rounded-lg bg-background border border-border text-[9px] font-bold text-primary lowercase tracking-wider">
                                                        /{role.slug}
                                                    </code>
                                                </td>
                                                <td className="px-8 py-5 text-center">
                                                    <span className="text-[14px] font-black text-content tabular-nums">{role.total.toString().padStart(3, '0')}</span>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button 
                                                            onClick={() => setEditingRole(role)}
                                                            className="size-9 rounded-lg bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all shadow-sm active:scale-90"
                                                        >
                                                            <Edit3 className="size-4.5" />
                                                        </button>
                                                        <button className="size-9 rounded-lg bg-surface border border-border flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-95">
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
                                        <span className="text-[9px] font-bold uppercase text-primary tracking-widest leading-none">Position Definition Node</span>
                                        <button onClick={() => { setIsAddModalOpen(false); setEditingRole(null); }} className="text-text-muted hover:text-rose-500 transition-colors">
                                            <X className="size-5" />
                                        </button>
                                    </div>
                                    <h2 className="text-2xl font-black text-content uppercase tracking-tight font-['Inter'] mt-4">
                                        {editingRole ? "Modify Role" : "Add Role"}
                                    </h2>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1">Role Title</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Frontend Architect"
                                            defaultValue={editingRole?.name}
                                            className="w-full p-4 rounded-xl bg-background border border-border focus:border-primary text-[13px] font-bold uppercase tracking-tight outline-none transition-all shadow-inner"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1">System UUID Slug</label>
                                        <div className="relative">
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-primary opacity-20 font-bold text-sm">/</span>
                                            <input 
                                                type="text" 
                                                placeholder="frontend-architect"
                                                defaultValue={editingRole?.slug}
                                                className="w-full py-4 pl-10 pr-6 rounded-xl bg-background border border-border focus:border-primary text-[13px] font-bold lowercase tracking-tight outline-none transition-all shadow-inner"
                                            />
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => { setIsAddModalOpen(false); setEditingRole(null); }}
                                        className="w-full py-4.5 mt-4 rounded-xl bg-primary text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:-translate-y-0.5 transition-all active:scale-95"
                                    >
                                        <CheckCircle2 className="size-5" />
                                        Save Role Definition
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
