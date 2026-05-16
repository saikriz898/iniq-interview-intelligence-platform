import React, { useState } from 'react';
import { 
  ShieldCheck, ArrowLeft, Download, Filter, 
  Search, ShieldAlert, CheckCircle2, Clock, MapPin, 
  Monitor, Globe, Terminal, FileText, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate } from 'react-router-dom';

/**
 * --- AUDIT LOGS PAGE: SYSTEM TRANSPARENCY PROTOCOL ---
 * Purpose: Detailed history of all access and account modifications.
 * High-fidelity data visualization for security-conscious users.
 */
const AuditLogsPage = () => {
    const { theme, toggleTheme, isLoading } = useGlobalContext();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');

    const filterOptions = ['ALL', 'Success', 'Threat', 'Security'];

    const logs = [
        { id: 1, action: 'Security Protocol Upgrade', status: 'Success', timestamp: '2026-04-05 18:24', location: 'Hyderabad, India', ip: '182.20.12.9', device: 'MacBook Pro 16' },
        { id: 2, action: 'Dossier Sync Initiated', status: 'Success', timestamp: '2026-04-05 14:10', location: 'Hyderabad, India', ip: '182.20.12.9', device: 'MacBook Pro 16' },
        { id: 3, action: 'Unauthorized Access Blocked', status: 'Threat', timestamp: '2026-04-05 02:45', location: 'Kiev, Ukraine', ip: '91.200.12.1', device: 'Unknown Agent' },
        { id: 4, action: 'Auth Token Refreshed', status: 'Success', timestamp: '2026-04-04 22:15', location: 'Mumbai, India', ip: '49.12.105.21', device: 'iPhone 14 Pro' },
        { id: 5, action: 'Identity Marker Modified', status: 'Success', timestamp: '2026-04-04 11:30', location: 'Hyderabad, India', ip: '182.20.12.9', device: 'MacBook Pro 16' },
        { id: 6, action: 'System Config Modified', status: 'Success', timestamp: '2025-04-04 09:00', location: 'Hyderabad, India', ip: '182.20.12.9', device: 'MacBook Pro 16' },
        { id: 7, action: 'New Device Link Established', status: 'Security', timestamp: '2025-04-03 23:45', location: 'Mumbai, India', ip: '49.12.105.21', device: 'iPhone 14 Pro' },
    ];

    const filteredLogs = logs.filter(log => {
        const matchesQuery = log.action.toLowerCase().includes(searchQuery.toLowerCase()) || log.ip.includes(searchQuery);
        const matchesFilter = filterStatus === 'ALL' || log.status === filterStatus;
        return matchesQuery && matchesFilter;
    });

    return (
        <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col bg-surface/[0.02] relative">
                
                {/* Header Strip */}
                <div className="h-20 border-b border-border/40 px-10 flex items-center justify-between shrink-0 bg-background/5 backdrop-blur-sm relative z-10">
                    <div className="flex items-center gap-6">
                        <button 
                            type="button"
                            onClick={() => navigate('/settings')}
                            className="size-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary transition-all active:scale-90"
                        >
                            <ArrowLeft className="size-5" />
                        </button>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 text-[8px] font-black text-primary uppercase tracking-[0.2em] opacity-80 mb-1">
                                <Terminal className="size-2.5" />
                                DATASTREAM: ACCESS_HISTORY_AUDIT_LOGS
                            </div>
                            <h2 className="text-xl font-black text-content font-['Sora'] tracking-tight leading-none uppercase italic">System Audit Dossier</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-6 py-2.5 rounded-xl bg-surface border border-border text-text-muted hover:text-content hover:border-text-muted transition-all active:scale-95 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
                            <Download className="size-4" />
                            Export Data Log
                        </button>
                    </div>
                </div>

                {/* Filter & Search Hub */}
                <div className="px-10 py-6 border-b border-border/20 bg-surface/5 flex items-center justify-between gap-6 shrink-0">
                    <div className="flex-1 relative group max-w-lg">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-text-muted/40 group-focus-within:text-primary transition-all" />
                        <input 
                            type="text" 
                            placeholder="Search action, location, or IP fingerprint..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-4 pl-16 pr-8 rounded-2xl bg-surface/40 border border-border/40 focus:border-primary/60 outline-none transition-all text-[11px] font-bold text-content placeholder:text-text-muted/30 shadow-sm font-mono"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        {filterOptions.map(option => (
                            <button
                                key={option}
                                onClick={() => setFilterStatus(option)}
                                className={`px-5 py-3 rounded-2xl border text-[9px] font-black uppercase tracking-widest transition-all ${
                                    filterStatus === option 
                                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/10' 
                                        : 'bg-surface/40 border-border/40 text-text-muted hover:text-content hover:border-border'
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Data Canvas */}
                <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-10">
                    <div className="max-w-6xl mx-auto flex flex-col gap-8">
                        
                        <div className="grid grid-cols-1 gap-4">
                            {filteredLogs.map((log) => (
                                <LogEntry key={log.id} log={log} />
                            ))}
                        </div>

                        {/* End of Log Marker */}
                        <div className="flex flex-col items-center py-20 text-center gap-4 border-t border-border/10 border-dashed">
                             <div className="size-16 rounded-full bg-primary/5 flex items-center justify-center text-primary shadow-inner">
                                <FileText className="size-7" />
                             </div>
                             <div className="flex flex-col gap-1">
                                <h4 className="text-sm font-black text-content uppercase tracking-tight italic opacity-40">End of Datastream</h4>
                                <p className="text-[10px] font-bold text-text-muted opacity-30 uppercase tracking-widest">Logs retrieved for current billing cycle // 2026</p>
                             </div>
                        </div>

                    </div>
                </div>

            </div>
        </UserAppShell>
    );
};

// --- PRIVATE COMPONENTS ---

const LogEntry = ({ log }) => {
    const getStatusStyles = (status) => {
        switch(status) {
            case 'Success': return 'text-emerald-500 bg-emerald-500/5';
            case 'Threat': return 'text-red-500 bg-red-500/5';
            case 'Security': return 'text-blue-500 bg-blue-500/5';
            default: return 'text-text-muted bg-surface-hover';
        }
    };

    const StatusIcon = log.status === 'Threat' ? ShieldAlert : (log.status === 'Success' ? CheckCircle2 : ShieldCheck);
    const navigate = useNavigate();

    return (
        <div className="group relative">
            <div className={`p-6 rounded-[2.5rem] bg-surface/80 border border-border/40 hover:border-primary/40 hover:bg-surface transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm ${log.status === 'Threat' ? 'ring-1 ring-red-500/10' : ''}`}>
                
                <div className="flex items-center gap-6">
                    <div className={`size-14 rounded-2xl flex items-center justify-center shadow-inner ${getStatusStyles(log.status)}`}>
                        <StatusIcon className="size-6" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-3">
                            <span className="text-[11px] font-black uppercase tracking-[0.1em] text-content italic leading-none font-['Sora']">{log.action}</span>
                            <div className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-current opacity-60 font-mono ${getStatusStyles(log.status)}`}>
                                {log.status}
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-widest font-mono">
                            <div className="flex items-center gap-2"><Clock className="size-3" /> {log.timestamp}</div>
                            <div className="size-0.5 rounded-full bg-border" />
                            <div className="flex items-center gap-2"><MapPin className="size-3" /> {log.location}</div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 ml-auto md:ml-0 pl-16 md:pl-0">
                    <div className="flex flex-col items-end gap-1.5 border-r border-border/20 pr-6">
                        <span className="text-[11px] font-black text-content/60 leading-none font-mono tracking-tighter">{log.ip}</span>
                        <div className="flex items-center gap-2 opacity-30">
                            <Monitor className="size-3" />
                            <span className="text-[9px] font-bold uppercase tracking-widest font-mono">{log.device}</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate(`/settings/logs/${log.id}`)}
                        className="size-10 rounded-xl bg-surface border border-border/60 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all group-hover:shadow-md"
                    >
                        <ChevronRight className="size-4" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AuditLogsPage;
