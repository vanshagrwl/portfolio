import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { HeroBento } from './components/HeroBento';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Certificates } from './components/Certificates';
import { Footer } from './components/Footer';
import { useScrollBlur } from './hooks/useScrollBlur';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const { blur } = useScrollBlur();
  
  // Spring animation for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Page stretch effect based on scroll position (like Vivo notification)
  const pageScale = useTransform(
    smoothProgress,
    [0, 0.1, 0.9, 1],
    [1.05, 1, 1, 1.05]
  );
  
  const pageY = useTransform(
    smoothProgress,
    [0, 0.1, 0.9, 1],
    [-20, 0, 0, -20]
  );

  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    
    // Page load animation
    setIsLoaded(true);
    
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden"
      initial={{ scale: 1.1, y: 50, opacity: 0 }}
      animate={isLoaded ? { scale: 1, y: 0, opacity: 1 } : {}}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 0.5,
        duration: 0.8
      }}
      style={{
        scale: pageScale,
        y: pageY,
        filter: blur > 0 ? `blur(${blur}px)` : 'blur(0px)',
        transition: 'filter 0.3s ease-out'
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.03
        }}
      />

      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <HeroBento />
        <Experience />
        <Skills />
        <Projects />
        <Certificates />
        <Footer />
      </motion.div>
    </motion.div>
  );
}

export default App;
