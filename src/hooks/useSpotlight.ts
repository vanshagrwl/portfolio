import { useState, useRef } from 'react';

export const useSpotlight = () => {
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Throttled update to prevent performance issues
    requestAnimationFrame(() => {
      if (!ref.current) return;
      setSpotlight(prev => {
        // Only update if position changed significantly (throttle to prevent excessive updates)
        const dx = Math.abs(prev.x - x);
        const dy = Math.abs(prev.y - y);
        if (dx > 5 || dy > 5 || prev.opacity === 0) {
          return { x, y, opacity: 1 };
        }
        return prev;
      });
    });
  };

  const handleMouseLeave = () => {
    setSpotlight(prev => ({ ...prev, opacity: 0 }));
  };

  return { ref, spotlight, handleMouseMove, handleMouseLeave };
};
