import { useRef, useState } from 'react';

export const useMagneticEffect = (strength = 0.3) => {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    // Use requestAnimationFrame for smoother updates with interpolation
    requestAnimationFrame(() => {
      if (!ref.current) return;
      setPosition(prev => ({
        x: prev.x + (deltaX - prev.x) * 0.2,
        y: prev.y + (deltaY - prev.y) * 0.2
      }));
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return { ref, position, handleMouseMove, handleMouseLeave };
};
