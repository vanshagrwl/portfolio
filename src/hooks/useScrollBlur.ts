import { useEffect, useState } from 'react';

export const useScrollBlur = () => {
  const [blur, setBlur] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      
      // Determine scroll direction
      if (scrollDelta > 0) {
        setScrollDirection('down');
      } else if (scrollDelta < 0) {
        setScrollDirection('up');
      }

      // Calculate blur based on scroll position and direction
      const maxBlur = 8;
      const scrollThreshold = 50;
      
      if (Math.abs(scrollDelta) > scrollThreshold) {
        const blurValue = Math.min(Math.abs(scrollDelta) / 10, maxBlur);
        setBlur(blurValue);
      } else {
        setBlur(0);
      }

      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [lastScrollY]);

  return { blur, scrollDirection };
};

