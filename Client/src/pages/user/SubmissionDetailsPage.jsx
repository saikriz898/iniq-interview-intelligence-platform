import React, { useState, useEffect } from 'react';
import { 
  Building2, Briefcase, Calendar, CheckCircle2, 
  Clock, XCircle, ArrowLeft, PlayCircle,
  Hash, ShieldCheck, ThumbsUp, ArrowRight,
  Layers, MapPin, Search, Code, Copy, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const SubmissionDetailsPage = () => {
  const { theme, toggleTheme, isLoading } = useGlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [activeTopicIdx, setActiveTopicIdx] = useState(0);

  useEffect(() => {
    fetchSubmission();
  }, [id]);

  const fetchSubmission = async () => {
    const token = localStorage.getItem('iniq_token');
    try {
      const res = await fetch(`http://localhost:5000/api/experiences/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setSubmission(data);
      else toast.error('Failed to load experience');
    } catch (err) {
      toast.error('Server error');
    }
  };

  if (!submission) return <div className="h-screen flex items-center justify-center text-sm font-medium text-text-muted">Loading details...</div>;

  const statusStyle = (status) => {
    if(status === 'Approved') return 'bg-success/10 text-success border-success/20';
    if(status === 'Rejected') return 'bg-danger/10 text-danger border-danger/20';
    return 'bg-warning/10 text-warning border-warning/20';
  };
  const statusIcon = (status) => {
    if(status === 'Approved') return <CheckCircle2 className="size-3" />;
    if(status === 'Rejected') return <XCircle className="size-3" />;
    return <Clock className="size-3" />;
  };

  return (
    <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} noPadding={true}>
      <div className="h-full w-full overflow-y-auto bg-background pb-16 lg:pb-0 custom-scrollbar">
        {/* Top Navigation Bar */}
        <div className="w-full h-16 bg-surface border-b border-border/40 flex items-center px-6 lg:px-12 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-4 text-sm font-bold text-text-muted w-full max-w-[1200px] mx-auto">
              <Link to="/my-submissions" className="hover:text-primary text-text-muted transition-colors flex items-center justify-center size-8 bg-background rounded-full border border-border/40 hover:border-primary/30 group" title="Back to Submissions">
                  <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
              </Link>
              <ChevronRight className="size-3 opacity-30 hidden sm:block" />
              <span className="text-content font-black hidden sm:block">Submission Overview</span>
          </div>
        </div>

        {/* Premium Hero Banner */}
        <div className="w-full bg-[#050505] relative overflow-hidden pt-8 pb-12 lg:pt-10 lg:pb-16 border-b border-border/40 shadow-sm">
           {/* Abstract Animated Background */}
           <div className="absolute inset-0 z-0 opacity-40">
              <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-primary/20 blur-[120px] rounded-full rotate-12 animate-pulse" style={{ animationDuration: '8s' }} />
              <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[120%] bg-accent/10 blur-[100px] rounded-full -rotate-12 animate-pulse" style={{ animationDuration: '12s' }} />
           </div>
           
           <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col">
              
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                 <div className="flex items-start gap-5 md:gap-6">
                    <div className="size-16 md:size-20 rounded-3xl bg-gradient-to-br from-surface to-background border border-border/40 shadow-2xl flex items-center justify-center shrink-0 relative overflow-hidden group">
                       <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                       <Building2 className="size-8 md:size-10 text-primary drop-shadow-md" />
                    </div>
                    <div className="flex flex-col gap-3 pt-1">
                       <div className="flex flex-wrap items-center gap-3">
                           <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-content to-text-muted tracking-tight leading-none font-['Inter']">
                             {submission.role}
                           </h1>
                           <div className={`px-3 py-1 mt-1 rounded-full flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest shadow-lg border ${statusStyle(submission.status)}`}>
                             {statusIcon(submission.status)}
                             {submission.status}
                           </div>
                       </div>
                       
                       <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-text-muted mt-1">
                          <span className="text-primary-text bg-primary/20 px-2.5 py-0.5 rounded-md border border-primary/20">{submission.company}</span>
                          <div className="flex items-center gap-1.5"><Briefcase className="size-3.5" /> {submission.candidateExperience} {submission.candidateExperience === 1 ? 'Year' : 'Years'} Exp</div>
                          <div className="flex items-center gap-1.5"><MapPin className="size-3.5" /> {submission.location || 'Remote'}</div>
                          <div className="flex items-center gap-1.5"><Calendar className="size-3.5" /> {new Date(submission.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'})}</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Main Content Grid */}
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 py-12 flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Column (65%) */}
          <div className="flex-1 flex flex-col gap-16">
             {/* Overview */}
             <section className="flex flex-col gap-6">
               <div className="flex items-center gap-3 border-b border-border/40 pb-4">
                   <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                       <Search className="size-4" />
                   </div>
                   <h2 className="text-sm font-black text-content uppercase tracking-widest font-['Inter']">Process Overview</h2>
               </div>
               <div className="p-6 md:p-8 rounded-3xl bg-surface/30 border border-border/40 leading-[1.8] text-[15px] font-medium text-text-muted whitespace-pre-wrap shadow-sm hover:shadow-md transition-shadow">
                 {submission.processOverview}
               </div>
             </section>

             {/* Vertical Journey Timeline */}
             <section className="flex flex-col gap-8">
               <div className="flex items-center justify-between border-b border-border/40 pb-4">
                   <div className="flex items-center gap-3">
                       <div className="size-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                           <Layers className="size-4" />
                       </div>
                       <h2 className="text-sm font-black text-content uppercase tracking-widest font-['Inter']">Interview Journey</h2>
                   </div>
                   <Link 
                     to={`/my-submissions/${submission._id}/rounds`}
                     className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary-text bg-primary/10 hover:bg-primary px-4 py-2 rounded-lg transition-all flex items-center gap-2 group"
                   >
                     Deep Dive <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                   </Link>
               </div>
               
               <div className="relative ml-4 md:ml-8 flex flex-col gap-8 border-l-2 border-border/40 pl-8 md:pl-12 py-4">
                 {submission.rounds.map((round, idx) => (
                   <div key={idx} className="relative group">
                      {/* Timeline Node */}
                      <div className="absolute -left-[42px] md:-left-[58px] top-0 size-8 md:size-10 rounded-full bg-background border-4 border-surface group-hover:border-primary/30 flex items-center justify-center shadow-lg transition-colors z-10">
                          <span className="text-[11px] md:text-xs font-black text-text-muted group-hover:text-primary transition-colors">{idx + 1}</span>
                      </div>
                      
                      {/* Card */}
                      <div className="p-6 md:p-8 rounded-3xl bg-surface border border-border/40 hover:border-primary/40 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col gap-5 relative overflow-hidden group/card">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover/card:scale-110"></div>
                          
                          <div className="flex flex-col gap-2 relative z-10">
                              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Round {idx + 1}</span>
                              <h3 className="text-xl md:text-2xl font-black text-content tracking-tight">{round.title}</h3>
                          </div>
                          <p className="text-sm font-medium text-text-muted leading-relaxed line-clamp-2 relative z-10">
                              {round.questions || round.desc}
                          </p>
                          
                          <div className="pt-4 border-t border-border/40 mt-1 relative z-10">
                              <Link 
                                  to={`/my-submissions/${submission._id}/rounds?active=${idx}`}
                                  className="inline-flex items-center gap-2 text-xs font-bold text-content hover:text-primary transition-colors"
                              >
                                  Explore Details <ArrowRight className="size-3.5" />
                              </Link>
                          </div>
                      </div>
                   </div>
                 ))}
               </div>
             </section>
          </div>

          {/* Right Sidebar (35%) */}
          <div className="w-full lg:w-[380px] shrink-0 flex flex-col gap-6">
             
             {/* Final Verdict Card */}
             <div className="p-8 rounded-3xl bg-surface border border-border/40 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-surface to-background opacity-50 rounded-bl-full pointer-events-none"></div>
                 <div className="flex flex-col gap-4 relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                        <Hash className="size-3" /> Final Verdict
                    </span>
                    <div className="flex items-center gap-4">
                       <div className={`size-12 rounded-2xl flex items-center justify-center ${
                           submission.verdict === 'Selected' ? 'bg-success/10 text-success' : 
                           submission.verdict === 'Rejected' ? 'bg-danger/10 text-danger' : 
                           'bg-warning/10 text-warning'
                       }`}>
                           {submission.verdict === 'Selected' ? <ShieldCheck className="size-6" /> : 
                            submission.verdict === 'Rejected' ? <XCircle className="size-6" /> : 
                            <Clock className="size-6" />}
                       </div>
                       <span className="text-2xl font-black text-content tracking-tight">{submission.verdict}</span>
                    </div>
                 </div>
             </div>

             {/* Core Topics Explored */}
             <div className="p-8 rounded-3xl bg-surface border border-border/40 shadow-sm flex flex-col gap-6 relative h-[450px]">
                <div className="flex items-center justify-between gap-3 shrink-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                        <Code className="size-3" /> Core Topics Explored
                    </span>
                    {submission.topics && submission.topics.length > 1 && (
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setActiveTopicIdx(prev => Math.max(0, prev - 1))}
                                disabled={activeTopicIdx === 0}
                                className="p-1 rounded bg-background border border-border/40 hover:bg-surface hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="size-3.5" />
                            </button>
                            <span className="text-[10px] font-bold text-text-muted">{activeTopicIdx + 1}/{submission.topics.length}</span>
                            <button 
                                onClick={() => setActiveTopicIdx(prev => Math.min(submission.topics.length - 1, prev + 1))}
                                disabled={activeTopicIdx === submission.topics.length - 1}
                                className="p-1 rounded bg-background border border-border/40 hover:bg-surface hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="size-3.5" />
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex-1 overflow-hidden relative">
                   {submission.topics && submission.topics.length > 0 ? (() => {
                     const topic = submission.topics[activeTopicIdx] || submission.topics[0];
                     return (
                       <div className="flex flex-col h-full rounded-2xl bg-background/50 border border-border/40 overflow-hidden group">
                          {/* Fixed Header */}
                          <div className="flex items-start justify-between gap-4 p-5 border-b border-border/40 bg-surface/50 shrink-0">
                              <span className="text-sm font-black text-content uppercase tracking-wider leading-snug">{topic.name}</span>
                              {topic.importance && (
                                  <div className="flex gap-1 pt-1 shrink-0">
                                      {[...Array(5)].map((_, i) => (
                                          <div key={i} className={`size-1.5 rounded-full ${i < topic.importance ? 'bg-primary shadow-[0_0_8px_var(--color-primary)]' : 'bg-border/60'}`} />
                                      ))}
                                  </div>
                              )}
                          </div>
                          {/* Scrollable Content */}
                          {topic.details && (
                              <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
                                  <ul className="text-[13px] font-medium text-text-muted leading-relaxed list-disc pl-4 flex flex-col gap-3">
                                      {topic.details.split('.').filter(sentence => sentence.trim().length > 0).map((sentence, sIdx) => (
                                          <li key={sIdx}>{sentence.trim()}.</li>
                                      ))}
                                  </ul>
                              </div>
                          )}
                       </div>
                     );
                   })() : (
                     <div className="text-sm font-medium italic text-text-muted py-2">No specific topics tagged.</div>
                   )}
                </div>
             </div>

          </div>
        </div>

        {/* Full-width Advice to Others Block */}
        {submission.advice && (
            <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 pb-16">
                <div className="p-6 md:p-8 rounded-3xl bg-surface border border-border/40 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-primary/30 transition-colors">
                    <ThumbsUp className="absolute -bottom-6 -right-6 size-32 text-primary/5 -rotate-12 pointer-events-none transition-transform group-hover:scale-110 group-hover:-rotate-6 duration-700" />
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <ThumbsUp className="size-4" />
                        </div>
                        <h2 className="text-sm font-black text-content uppercase tracking-widest font-['Inter']">Advice to Others</h2>
                    </div>
                    <p className="text-[15px] font-medium text-text-muted leading-[1.8] italic relative z-10 w-full">
                        "{submission.advice}"
                    </p>
                </div>
            </div>
        )}

      </div>
    </UserAppShell>
  );
};

export default SubmissionDetailsPage;
