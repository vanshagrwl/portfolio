export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.8, 
    ease: [0.25, 0.46, 0.45, 0.94],
    type: 'tween'
  }
};

export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const blurIn = {
  initial: { opacity: 0, filter: 'blur(15px)', scale: 0.96 },
  animate: { opacity: 1, filter: 'blur(0px)', scale: 1 },
  transition: { 
    duration: 0.9, 
    ease: [0.25, 0.46, 0.45, 0.94],
    type: 'tween'
  }
};

export const scaleIn = {
  initial: { scale: 0.85, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { 
    duration: 0.7, 
    ease: [0.25, 0.46, 0.45, 0.94],
    type: 'tween'
  }
};
