import React from 'react';

/**
 * SubInternal Component
 * Purpose: Reusable sub-view for specialized internal dashboard modules.
 */
const SubInternal = ({ title, children }) => {
  return (
    <div className="p-8 card-base glass-strong shadow-2xl border-primary/5">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold font-['Sora'] tracking-tight text-primary">{title}</h2>
        <div className="px-4 py-1.5 rounded-full glass text-xs font-mono opacity-50 uppercase tracking-[0.2em]">Module Active</div>
      </div>
      <div className="opacity-90 max-w-4xl leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default SubInternal;
