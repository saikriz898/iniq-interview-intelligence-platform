import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * --- SCROLL TOP RESET COMPONENT ---
 * Purpose: Ensures that the window resets to (0,0) whenever the route changes.
 * Usage: Place this inside your layout shells or at the top of the Router.
 */
const ScrollTopReset = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Resetting scroll to top-left instantly to avoid bottom-loading bugs
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null; // This component doesn't render any UI
};

export default ScrollTopReset;
