import React from 'react';
import { Toaster } from 'react-hot-toast';

/**
 * --- INIQ CUSTOM TOASTER (MISSION CONTROL) ---
 * Provides a standardized, high-fidelity notification system 
 * placed correctly to avoid collisions with the platform navbar.
 */
const CustomToaster = () => {
  return (
    <Toaster 
        position="top-right" 
        containerStyle={{ 
            top: 90,
            right: 20,
            zIndex: 99999
        }}
        toastOptions={{
            // High-Fidelity Mission Control Aesthetic
            style: {
                background: 'rgba(12, 12, 12, 0.95)',
                backdropFilter: 'blur(20px) saturate(200%)',
                WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '20px 28px',
                borderRadius: '24px',
                fontSize: '12px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)',
                minWidth: '340px',
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '0.01em',
                lineHeight: '1.5',
            },
            success: {
                iconTheme: {
                    primary: '#6366f1',
                    secondary: '#fff',
                },
                style: {
                    borderLeft: '4px solid #6366f1',
                    fontFamily: "'Sora', sans-serif",
                }
            },
            error: {
                iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                },
                style: {
                    borderLeft: '4px solid #ef4444',
                    fontFamily: "'Sora', sans-serif",
                }
            },
            loading: {
                style: {
                    borderLeft: '4px solid #6366f1',
                    fontFamily: "'Sora', sans-serif",
                }
            }
        }}
    />
  );
};

export default CustomToaster;
