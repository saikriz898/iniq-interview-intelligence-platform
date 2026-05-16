import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * --- INIQ PREMIUM CUSTOM SELECT ---
 * Purpose: Replaces standard HTML select with a high-fidelity, glassmorphic dropdown.
 * Features: Framer motion animations, custom scrollbar, and neon focus states.
 */
const CustomSelect = ({ value, onChange, options, placeholder = "Select option", icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [isUpward, setIsUpward] = useState(false);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setIsUpward(spaceBelow < 250); // If less than 250px below, open upward
    }
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.value === value || opt === value);
  const displayValue = typeof selectedOption === 'object' ? selectedOption.label : (selectedOption || '');

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center justify-between w-full py-3.5 px-5 rounded-2xl bg-surface/40 border transition-all cursor-pointer select-none
          ${isOpen ? 'border-primary/60 shadow-lg shadow-primary/5 bg-surface/60' : 'border-border/40 hover:border-primary/30 hover:bg-surface/50'}
        `}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          {Icon && <Icon className={`size-4 shrink-0 transition-colors ${isOpen ? 'text-primary' : 'text-text-muted opacity-40 group-hover:text-primary/60'}`} />}
          <span className={`text-[13px] font-bold truncate ${!displayValue ? 'text-text-muted opacity-30' : 'text-content'}`}>
            {displayValue || placeholder}
          </span>
        </div>
        <ChevronDown className={`size-3.5 text-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'opacity-40'}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: isUpward ? -5 : 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isUpward ? -3 : 3, scale: 0.99 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{ 
              top: isUpward ? 'auto' : 'calc(100% + 4px)',
              bottom: isUpward ? 'calc(100% + 4px)' : 'auto',
              transformOrigin: isUpward ? 'bottom' : 'top'
            }}
            className="absolute z-[100] left-0 right-0 p-1 rounded-xl bg-surface/95 backdrop-blur-3xl border border-border shadow-2xl overflow-hidden"
          >
            <div className="max-h-[180px] overflow-y-auto custom-scrollbar p-0.5">
              {options.length === 0 ? (
                <div className="py-4 px-3 text-center">
                  <p className="text-[8px] font-black uppercase tracking-widest text-text-muted opacity-40">No options found</p>
                </div>
              ) : (
                options.map((option, idx) => {
                  const optValue = typeof option === 'object' ? option.value : option;
                  const optLabel = typeof option === 'object' ? option.label : option;
                  const isSelected = value === optValue;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -2 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.01 }}
                      onClick={() => {
                        onChange(optValue);
                        setIsOpen(false);
                      }}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer transition-all mb-0.5 last:mb-0
                        ${isSelected ? 'bg-primary text-white shadow-sm shadow-primary/10' : 'hover:bg-primary/10 text-content/80 hover:text-primary'}
                      `}
                    >
                      <span className="text-[12px] font-bold">{optLabel}</span>
                      {isSelected && <Check className="size-3" />}
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;
