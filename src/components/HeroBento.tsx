import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Download, Mail } from 'lucide-react';
import { useMagneticEffect } from '../hooks/useMagneticEffect';
import { useSpotlight } from '../hooks/useSpotlight';
import { blurIn, staggerContainer } from '../utils/animations';

const GlassBox = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const { ref, spotlight, handleMouseMove, handleMouseLeave } = useSpotlight();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)', y: 15 }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
      transition={{ 
        duration: 0.7, 
        delay, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: 'tween'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -2, scale: 1.005 }}
      className={`relative backdrop-blur-2xl bg-white/[0.03] border border-white/[0.05] rounded-2xl overflow-hidden transition-all duration-200 ${className}`}
      style={{
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        willChange: 'transform, opacity'
      }}
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: spotlight.opacity * 0.5,
          background: `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,255,255,0.1), transparent 40%)`
        }}
      />
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(200px circle at ${spotlight.x}px ${spotlight.y}px, rgba(124, 58, 237, 0.3), transparent 70%)`
        }}
      />
      {children}
    </motion.div>
  );
};

const MagneticButton = ({ children, onClick, variant = 'primary' }: { children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' }) => {
  const { ref, position, handleMouseMove, handleMouseLeave } = useMagneticEffect(0.15);

  const styles = variant === 'primary'
    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30'
    : 'bg-white/5 text-white border border-white/10 hover:border-white/20';

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      onMouseMove={handleMouseMove as React.MouseEventHandler<HTMLButtonElement>}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 18, mass: 0.08 }}
      className={`px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all text-xs xs:text-sm sm:text-base ${styles}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

const TechMarquee = () => {
  const techs = ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind', 'Python', 'Express', 'Git'];

  return (
    <div className="relative overflow-hidden w-full">
      <motion.div
        className="flex gap-4 sm:gap-6"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {[...techs, ...techs, ...techs].map((tech, i) => (
          <div
            key={i}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap"
          >
            {tech}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const HeroBento = () => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload the image to check if it exists
  useEffect(() => {
    const img = new Image();
    // Add timestamp to force reload
    img.src = `/photo.jpg?t=${Date.now()}`;
    img.onload = () => {
      console.log('Photo loaded successfully');
      setImageLoaded(true);
      setImageError(false);
    };
    img.onerror = () => {
      console.error('Photo not found at /photo.jpg');
      setImageError(true);
      setImageLoaded(false);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-3 xs:px-4 sm:px-6 lg:px-8 py-10 xs:py-12 sm:py-16 md:py-20">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 md:gap-6"
      >
        <GlassBox className="md:col-span-7 md:row-span-2 p-6 sm:p-8 md:p-12 flex flex-col justify-center" delay={0.1}>
          <motion.div {...blurIn} transition={{ delay: 0.3, duration: 1 }}>
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 sm:mb-6"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                backgroundImage: 'linear-gradient(90deg, #fff, #a855f7, #6366f1, #fff)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.1',
                paddingBottom: '0.15em',
                overflow: 'visible'
              }}
            >
              Building the
              <br />
              <motion.span 
                className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text inline-block"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #a855f7, #6366f1, #8b5cf6, #a855f7)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Web of Tomorrow
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              Vansh Agarwal — Full Stack Developer
            </motion.p>
          </motion.div>
        </GlassBox>

        <GlassBox className="md:col-span-5 p-4 xs:p-6 sm:p-8 flex items-center justify-center" delay={0.2}>
          <motion.div
            className="relative w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48"
            animate={{ scale: [1, 1.015, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
          >
            {/* Animated outer glow rings */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 blur-2xl opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 blur-xl opacity-40"
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />
            
            {/* Rotating border ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent, violet, purple, indigo, violet, transparent)',
                padding: '2px',
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div className="w-full h-full rounded-full bg-transparent" />
            </motion.div>
            
            {/* Animated gradient border */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 p-1"
              animate={{
                background: [
                  'linear-gradient(135deg, #7c3aed, #a855f7, #6366f1)',
                  'linear-gradient(225deg, #6366f1, #a855f7, #7c3aed)',
                  'linear-gradient(315deg, #7c3aed, #6366f1, #a855f7)',
                  'linear-gradient(45deg, #a855f7, #7c3aed, #6366f1)',
                  'linear-gradient(135deg, #7c3aed, #a855f7, #6366f1)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-900">
                {!imageError ? (
                  <>
                    {!imageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                    <img
                      src="/photo.jpg"
                      alt="Vansh Agarwal"
                      className={`w-full h-full rounded-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
                      onLoad={() => {
                        setImageLoaded(true);
                        setImageError(false);
                      }}
                      onError={() => {
                        setImageError(true);
                        setImageLoaded(false);
                      }}
                      loading="eager"
                    />
                  </>
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-4xl sm:text-6xl font-bold text-white">
                    VA
                  </div>
                )}
                
                {/* Animated overlay gradient on hover */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 via-transparent to-indigo-500/20 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
            
            {/* Floating particles around the image */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-violet-400 to-indigo-400"
                style={{
                  left: '50%',
                  top: '50%',
                  x: '-50%',
                  y: '-50%',
                }}
                animate={{
                  x: [
                    `calc(-50% + ${Math.cos((i * Math.PI) / 4) * 120}px)`,
                    `calc(-50% + ${Math.cos((i * Math.PI) / 4) * 140}px)`,
                    `calc(-50% + ${Math.cos((i * Math.PI) / 4) * 120}px)`,
                  ],
                  y: [
                    `calc(-50% + ${Math.sin((i * Math.PI) / 4) * 120}px)`,
                    `calc(-50% + ${Math.sin((i * Math.PI) / 4) * 140}px)`,
                    `calc(-50% + ${Math.sin((i * Math.PI) / 4) * 120}px)`,
                  ],
                  opacity: [0.2, 0.7, 0.2],
                  scale: [0.6, 1.3, 0.6],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4 + i * 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
              />
            ))}
          </motion.div>
        </GlassBox>

        <GlassBox className="md:col-span-5 p-3 xs:p-4 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 xs:gap-3 sm:gap-4" delay={0.3}>
          <MagneticButton onClick={async () => {
            try {
              // Fetch the resume file
              const response = await fetch('/resume.pdf', {
                method: 'GET',
                cache: 'no-cache',
              });
              
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              
              // Get the blob from response
              const blob = await response.blob();
              
              // Verify blob is valid
              if (!blob || blob.size === 0) {
                throw new Error('Resume file is empty or invalid');
              }
              
              // Ensure proper PDF content type
              const pdfBlob = new Blob([blob], { 
                type: 'application/pdf' 
              });
              
              // Create a blob URL
              const blobUrl = URL.createObjectURL(pdfBlob);
              
              // Create download link element
              const downloadLink = document.createElement('a');
              downloadLink.href = blobUrl;
              downloadLink.download = 'Vansh_Agarwal_Resume.pdf';
              downloadLink.style.display = 'none';
              
              // Append to body
              document.body.appendChild(downloadLink);
              
              // Trigger download
              downloadLink.click();
              
              // Clean up after a delay to ensure download starts
              setTimeout(() => {
                if (document.body.contains(downloadLink)) {
                  document.body.removeChild(downloadLink);
                }
                // Revoke URL after download completes
                setTimeout(() => {
                  URL.revokeObjectURL(blobUrl);
                }, 1000);
              }, 200);
              
            } catch (error) {
              console.error('Error downloading resume:', error);
              
              // Fallback: Direct link approach
              const fallbackLink = document.createElement('a');
              fallbackLink.href = '/resume.pdf';
              fallbackLink.download = 'Vansh_Agarwal_Resume.pdf';
              fallbackLink.style.display = 'none';
              document.body.appendChild(fallbackLink);
              fallbackLink.click();
              
              setTimeout(() => {
                if (document.body.contains(fallbackLink)) {
                  document.body.removeChild(fallbackLink);
                }
              }, 200);
            }
          }}>
            <Download className="w-5 h-5" />
            Resume
          </MagneticButton>
          <MagneticButton variant="secondary" onClick={() => window.location.href = '#contact'}>
            <Mail className="w-5 h-5" />
            Contact
          </MagneticButton>
        </GlassBox>

        <GlassBox className="md:col-span-3 p-4 sm:p-6 flex items-center justify-center" delay={0.4}>
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs sm:text-sm font-semibold text-green-400">Open to Work</span>
          </div>
        </GlassBox>

        <GlassBox className="md:col-span-4 p-4 sm:p-6 flex items-center overflow-hidden" delay={0.5}>
          <TechMarquee />
        </GlassBox>
      </motion.div>
    </section>
  );
};
