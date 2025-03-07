import { useState, useEffect } from 'react';
const TABLET_VERSION_BREAKPOINT = 768;
const DESKTOP_VERSION_BREAKPOINT = 1200;

export const useIsScreenVersion = () => {
  const [isMobileVersion, setIsMobileVersion] = useState(false);
  const [isTabletVersion, setIsTabletVersion] = useState(false);

  const handleCheckMobileVersion = () => {
    setIsMobileVersion(window.innerWidth < TABLET_VERSION_BREAKPOINT);
    setIsTabletVersion(window.innerWidth < DESKTOP_VERSION_BREAKPOINT)
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      handleCheckMobileVersion();
      window.addEventListener('resize', handleCheckMobileVersion);
      return () => {
        global?.window.removeEventListener('resize', handleCheckMobileVersion);
      };
    }
  }, []);

  return { isMobileVersion, isTabletVersion };
};
