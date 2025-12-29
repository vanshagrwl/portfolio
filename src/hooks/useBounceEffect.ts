import { useState, useCallback } from 'react';

export const useBounceEffect = () => {
  const [isBouncing, setIsBouncing] = useState(false);

  const triggerBounce = useCallback(() => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 600);
  }, []);

  return { isBouncing, triggerBounce };
};

