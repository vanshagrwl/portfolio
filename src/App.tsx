import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroBento } from './components/HeroBento';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Certificates } from './components/Certificates';
import { Footer } from './components/Footer';

function App() {
  const { scrollY } = useScroll();
  
  // Transform scroll position to blur opacity
  // More dramatic: starts earlier, fully visible sooner for wow effect
  const blurOpacity = useTransform(
    scrollY,
    [60, 180],
    [0, 1],
    {
      clamp: true
    }
  );
  
  // Additional transform for content scale effect (content appears to go behind)
  const contentScale = useTransform(
    scrollY,
    [60, 180],
    [1, 0.98],
    {
      clamp: true
    }
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
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden">
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

      {/* Dramatic scroll blur effect - Content hiding behind glass */}
      <motion.div
        className="fixed top-0 left-0 right-0 pointer-events-none z-50 scroll-blur-overlay"
        style={{
          opacity: blurOpacity,
          height: '200px',
          background: `
            linear-gradient(
              to bottom,
              rgba(5, 5, 5, 0.95) 0%,
              rgba(5, 5, 5, 0.85) 20%,
              rgba(5, 5, 5, 0.7) 40%,
              rgba(5, 5, 5, 0.5) 60%,
              rgba(5, 5, 5, 0.3) 80%,
              transparent 100%
            )
          `,
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
          boxShadow: `
            0 2px 8px 0 rgba(0, 0, 0, 0.3),
            0 1px 0 0 rgba(255, 255, 255, 0.1) inset,
            0 -4px 12px 0 rgba(0, 0, 0, 0.2)
          `,
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
        }}
      />
      
      {/* Strong blur layer for content hiding effect */}
      <motion.div
        className="fixed top-0 left-0 right-0 pointer-events-none z-49"
        style={{
          opacity: blurOpacity,
          height: '150px',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'linear-gradient(to bottom, rgba(5, 5, 5, 0.6) 0%, rgba(5, 5, 5, 0.3) 50%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
        }}
      />
      
      {/* Glass edge highlight for depth */}
      <motion.div
        className="fixed top-0 left-0 right-0 pointer-events-none z-51"
        style={{
          opacity: blurOpacity,
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent)',
          boxShadow: '0 1px 2px 0 rgba(255, 255, 255, 0.1)',
        }}
      />

      <motion.div 
        className="relative z-10"
        style={{
          scale: contentScale,
          transformOrigin: 'top center',
        }}
      >
        <HeroBento />
        <Experience />
        <Skills />
        <Projects />
        <Certificates />
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;
