import React from 'react';
import AdminNavbar from '../components/admin/AdminNavbar';
import AdminSidebar from '../components/admin/AdminSidebar';
import InternalPreloader from '../components/common/InternalPreloader';
import CustomToaster from '../components/common/CustomToaster';

/**
 * --- ADMIN APP SHELL: COMMAND CENTER ENHANCED ---
 * Features: High-fidelity layout, fixed navigation, internal scrolling protocols.
 */
const AdminAppShell = ({ children, theme, toggleTheme, isLoading, noPadding = false }) => {
  return (
    <div className={`flex flex-col min-h-screen relative bg-background ${noPadding ? 'h-screen overflow-hidden' : ''}`}>
      {/* 📡 SYSTEM TOASTER (PLATFORM-WIDE) */}
      <CustomToaster theme={theme} />

      {/* 🛸 INTERNAL PRELOADER (SYNC PROTOCOL) */}
      <InternalPreloader isLoaded={!isLoading} />

      {/* 🛰 TOP TELEMETRY BAR */}
      <AdminNavbar theme={theme} toggleTheme={toggleTheme} />

      <div className="flex flex-1 pt-16 sm:pt-20">
        {/* 🗺 SIDE RADAR NAVIGATION */}
        <AdminSidebar />

        {/* 📋 COMMAND CENTER CONTENT AREA */}
        <main className={`flex-1 lg:ml-72 md:ml-64 relative z-10 flex flex-col ${noPadding ? 'h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] overflow-hidden' : 'items-center overflow-visible'}`}>
            <div className={`w-full h-full flex flex-col ${noPadding ? '' : 'max-w-[1440px] px-6 sm:px-10 py-10 pb-20'}`}>
                {children}
            </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAppShell;
