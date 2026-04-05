import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * --- SCROLL TO TOP COMPONENT ---
 * Purpose: Provides a quick way for users to return to the top of Long pages.
 * Style: Floating, glassmorphic, anchored to the bottom-right.
 */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] size-14 rounded-2xl bg-primary text-white shadow-2xl shadow-primary/20 flex items-center justify-center border border-white/20 backdrop-blur-md hover:bg-primary-hover transition-colors group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="size-6 group-hover:-translate-y-1 transition-transform" />
          
          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 rounded-2xl bg-primary blur-xl opacity-20 -z-10 group-hover:opacity-40 transition-opacity" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
