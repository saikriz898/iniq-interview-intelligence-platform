import React from 'react';
import { 
  ArrowLeft, ShieldCheck, ShieldAlert, CheckCircle2, 
  Clock, MapPin, Monitor, Globe, Terminal, 
  ExternalLink, Info, Activity, Database, Server
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';

const LogDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme, toggleTheme, isLoading } = useGlobalContext();

    // Mock detailed data
    const log = {
        id,
        action: 'Security Protocol Upgrade',
        status: 'Success',
        timestamp: '2026-04-05 18:24:12 UTC',
        location: 'Hyderabad, India (Telangana)',
        ip: '182.20.12.9',
        device: 'MacBook Pro 16-inch (M3 Max)',
        browser: 'Chrome v124.0.6367.61',
        os: 'macOS Sonoma 14.4',
        isp: 'ACT Fibernet',
        method: 'OAuth2 / INIQ-Hub Sync',
        riskScore: '0.02 (Minimal)',
        details: 'The user successfully updated the authentication handshake protocol. All session tokens were re-indexed and secondary encryption keys were rotated as per the standard security directive.'
    };

    const getStatusStyles = (status) => {
        switch(status) {
            case 'Success': return 'text-emerald-500 bg-emerald-500/5';
            case 'Threat': return 'text-red-500 bg-red-500/5';
            case 'Security': return 'text-blue-500 bg-blue-500/5';
            default: return 'text-text-muted bg-surface-hover';
        }
    };

    return (
        <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
            <div className="h-full w-full flex flex-col bg-surface/[0.02] relative">
                
                {/* Header Strip */}
                <div className="h-20 border-b border-border/40 px-10 flex items-center justify-between shrink-0 bg-background/5 backdrop-blur-sm relative z-10">
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => navigate('/settings/logs')}
                            className="size-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary transition-all active:scale-90"
                        >
                            <ArrowLeft className="size-5" />
                        </button>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 text-[8px] font-black text-primary uppercase tracking-[0.2em] opacity-80 mb-1">
                                <Activity className="size-2.5" />
                                INSPECTOR: LOG_ENTRY_#{id}
                            </div>
                            <h2 className="text-xl font-black text-content font-['Sora'] tracking-tight leading-none uppercase italic">Activity Intelligence Report</h2>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar p-10 lg:p-12">
                    <div className="max-w-5xl mx-auto flex flex-col gap-10 pb-20">
                        
                        {/* Status Hero Card */}
                        <div className="p-10 rounded-[3rem] bg-surface/80 border border-border/40 shadow-2xl flex flex-col md:flex-row gap-10 relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/40" />
                             
                             <div className={`size-24 rounded-3xl flex items-center justify-center shadow-inner shrink-0 ${getStatusStyles(log.status)}`}>
                                {log.status === 'Success' ? <CheckCircle2 className="size-10" /> : <ShieldAlert className="size-10" />}
                             </div>

                             <div className="flex flex-col gap-4 flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-black text-content font-['Sora'] italic tracking-tight">{log.action}</h3>
                                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-current font-mono ${getStatusStyles(log.status)}`}>
                                        System_{log.status.toUpperCase()}
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-text-muted leading-relaxed italic opacity-80">
                                    "{log.details}"
                                </p>
                             </div>
                        </div>

                        {/* Detail Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            
                            {/* Block 1: Technical Fingerprint */}
                            <div className="p-8 rounded-[2.5rem] bg-surface border border-border/40 flex flex-col gap-8">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                                        <Monitor className="size-4" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-content/60">Node Fingerprint</span>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <DetailRow label="Device Model" value={log.device} icon={Monitor} />
                                    <DetailRow label="Operating System" value={log.os} />
                                    <DetailRow label="Browser Signal" value={log.browser} />
                                    <DetailRow label="Access Method" value={log.method} />
                                </div>
                            </div>

                            {/* Block 2: Network Intelligence */}
                            <div className="p-8 rounded-[2.5rem] bg-surface border border-border/40 flex flex-col gap-8">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-emerald-500/5 flex items-center justify-center text-emerald-500">
                                        <Globe className="size-4" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-content/60">Geo-Spatial Signal</span>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <DetailRow label="IP Address" value={log.ip} variant="mono" />
                                    <DetailRow label="Station Location" value={log.location} icon={MapPin} />
                                    <DetailRow label="ISP Provider" value={log.isp} />
                                    <DetailRow label="Access Window" value={log.timestamp} icon={Clock} />
                                </div>
                            </div>

                        </div>

                        {/* Risk & Diagnostic Protocol */}
                        <div className="p-8 rounded-[2.5rem] bg-surface-hover/20 border border-border/20 border-dashed flex flex-col gap-6">
                             <div className="flex items-center gap-3">
                                <div className="size-8 rounded-lg bg-orange-500/5 flex items-center justify-center text-orange-500">
                                    <ShieldCheck className="size-4" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-content/60">Diagnostic Metadata</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-[9px] font-black text-text-muted opacity-40 uppercase tracking-widest">Calculated Risk Score</span>
                                    <span className="text-sm font-black text-emerald-500 font-mono tracking-tighter">{log.riskScore}</span>
                                </div>
                                <div className="flex flex-col gap-1.5 md:border-x md:border-border/20 md:px-8">
                                    <span className="text-[9px] font-black text-text-muted opacity-40 uppercase tracking-widest">Entry Protocol</span>
                                    <span className="text-sm font-black text-content italic">OAuth_Verif_v3</span>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-[9px] font-black text-text-muted opacity-40 uppercase tracking-widest">Dossier Impact</span>
                                    <span className="text-sm font-black text-content italic">None (Static Sync)</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </UserAppShell>
    );
};

// --- PRIVATE COMPONENTS ---

const DetailRow = ({ label, value, icon: Icon, variant }) => (
    <div className="flex items-center justify-between border-b border-border/10 pb-4 last:border-0 last:pb-0">
        <div className="flex items-center gap-3">
            {Icon && <Icon className="size-3.5 text-text-muted/40" />}
            <span className="text-[10px] font-bold text-text-muted opacity-60 uppercase tracking-widest">{label}</span>
        </div>
        <span className={`text-[11px] font-black text-content italic leading-none ${variant === 'mono' ? 'font-mono tracking-tighter' : ''}`}>
            {value}
        </span>
    </div>
);

export default LogDetailsPage;
