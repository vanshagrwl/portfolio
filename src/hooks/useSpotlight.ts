import { useState, useRef } from 'react';

export const useSpotlight = () => {
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setSpotlight({ x, y, opacity: 1 });
    });
  };

  const handleMouseLeave = () => {
    setSpotlight(prev => ({ ...prev, opacity: 0 }));
  };

  return { ref, spotlight, handleMouseMove, handleMouseLeave };
};
