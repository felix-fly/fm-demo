import { useState, useEffect } from 'react';

const useDevice = () => {
  const [isMobile, setMobile] = useState(false);

  const [isTablet, setTablet] = useState(false);
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      setMobile(innerWidth <= 768);
      setTablet(innerWidth > 768 && innerWidth <= 1024);
      setDesktop(innerWidth > 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile, isTablet, isDesktop };
};

export default useDevice;