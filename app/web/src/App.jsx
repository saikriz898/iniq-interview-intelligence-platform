import React from "react";
import AppRouter from "./routes/AppRouter";

/**
 * --- INIQ MAIN ENTRY POINT ---
 * Purpose: This file simplifies the app's root to focus exclusively on routing.
 * Global State: Managed via GlobalProvider in main.jsx.
 * Layouts: Handled individually at the page level for granular control.
 */
function App() {
  return (
    <div className="iniq-intelligence-hub min-h-screen">
      {/* 
          Rendering the Router 
          This centralizes all page navigation in one specialized file 
      */}
      <AppRouter />
    </div>
  );
}

export default App;
