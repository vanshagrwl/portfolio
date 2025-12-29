import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Award, ExternalLink } from 'lucide-react';

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  description: string;
  url?: string;
}

const certificates: Certificate[] = [
  {
    title: 'Introduction to Software Engineering',
    issuer: 'Coursera - IBM',
    date: 'May 2025',
    description: 'Comprehensive introduction to software engineering principles, methodologies, and best practices. Authorized by IBM and offered through Coursera.',
    url: 'https://coursera.org/verify/LA114BU2M5YV'
  },
  {
    title: 'Computer Networks and Network Security',
    issuer: 'Coursera - IBM',
    date: 'Apr 2025',
    description: 'In-depth understanding of computer networks, protocols, and network security fundamentals. Authorized by IBM and offered through Coursera.',
    url: 'https://coursera.org/verify/2TDXI3EY2DN0'
  },
  {
    title: 'What Is Generative AI?',
    issuer: 'LinkedIn Learning',
    date: 'Apr 2025',
    description: 'Foundational knowledge of generative AI technologies, applications, and implications. Covers Generative AI Tools, Artificial Intelligence, and practical applications.',
    url: 'https://www.linkedin.com/learning/certificates/fe50339a582c57c7c93fe2a5d712d820576afab8b297bf6c90e180cc4e94a462'
  },
  {
    title: 'HTML, CSS, and JavaScript: Building the Web',
    issuer: 'LinkedIn Learning',
    date: 'Apr 2025',
    description: 'Mastery of core web technologies for building modern, responsive web applications. Covers Web Development, Cascading Style Sheets (CSS), and HTML fundamentals.',
    url: 'https://www.linkedin.com/learning/certificates/858c4a042a91286de2e3c49518f08b067a7e8ac7c456a6810865d0e768dae04a'
  }
];

export const Certificates = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleCardClick = (index: number, e: React.MouseEvent) => {
    // Don't trigger if clicking on the "View Certificate" link or button
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.tagName === 'A') {
      return;
    }
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded);
    // Reset selection when toggling expand/stack
    if (selectedIndex !== null) {
      setSelectedIndex(null);
    }
  };

  return (
    <section className="py-12 xs:py-16 sm:py-20 px-3 xs:px-4 sm:px-6 lg:px-8" id="certificates">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: 'tween'
          }}
          viewport={{ once: true, margin: '-50px' }}
          className="mb-16 text-center"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 sm:mb-4"
            animate={{
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 4,
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
            The Vault
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-400"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            Certifications & Achievements
          </motion.p>
        </motion.div>

        <div className="flex items-center justify-center">
          <div className="relative perspective-1000 w-full flex flex-col items-center">
            <div className="relative w-[280px] xs:w-[300px] sm:w-[350px] md:w-[400px] h-[350px] sm:h-[400px]">
              <AnimatePresence>
                {certificates.map((cert, index) => {
                  const totalCards = certificates.length;
                  const middleIndex = (totalCards - 1) / 2;
                  const offset = index - middleIndex;

                  let rotation = 0;
                  let translateX = 0;
                  let translateY = 0;
                  
                  // Calculate z-index: selected card gets highest, then based on position
                  let zIndex = selectedIndex === index 
                    ? totalCards + 20 
                    : selectedIndex !== null && selectedIndex !== index
                    ? totalCards - Math.abs(offset) - 10
                    : totalCards - Math.abs(offset);

                  // Stack mode (not expanded)
                  if (!isExpanded) {
                    translateY = index * 4;
                    // If selected, bring it forward
                    if (selectedIndex === index) {
                      translateY = -30;
                      rotation = 0;
                      translateX = 0;
                    }
                  } 
                  // Expanded mode
                  else {
                    // If selected, center it
                    if (selectedIndex === index) {
                      translateY = -30;
                      rotation = 0;
                      translateX = 0;
                    } else {
                      rotation = offset * 8;
                      translateX = offset * 80;
                      translateY = Math.abs(offset) * 20;
                    }
                  }

                  return (
                    <motion.div
                      key={cert.title}
                      initial={false}
                      animate={{
                        rotateZ: rotation,
                        x: translateX,
                        y: translateY,
                        zIndex
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 220,
                        damping: 28,
                        mass: 0.8
                      }}
                      className="absolute inset-0 cursor-pointer"
                      style={{
                        transformOrigin: 'center bottom'
                      }}
                      onClick={(e) => handleCardClick(index, e)}
                    >
                      <motion.div
                        className="w-full h-full backdrop-blur-2xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 shadow-2xl"
                        whileHover={{ 
                          scale: selectedIndex === index ? 1 : 1.08,
                          boxShadow: selectedIndex === index ? '0 20px 60px rgba(124, 58, 237, 0.3)' : '0 20px 60px rgba(124, 58, 237, 0.5)',
                          borderColor: 'rgba(124, 58, 237, 0.4)'
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      >
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <span className="px-2 py-1 sm:px-3 sm:py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                            {cert.date}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                          {cert.title}
                        </h3>
                        <p className="text-sm sm:text-base text-violet-400 font-medium mb-3 sm:mb-4">
                          {cert.issuer}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 sm:mb-6">
                          {cert.description}
                        </p>

                        {cert.url && (
                          <motion.a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (cert.url === '#') {
                                e.preventDefault();
                              }
                            }}
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600/20 border border-violet-500/30 text-violet-300 rounded-lg text-sm font-semibold hover:bg-violet-600/30 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Certificate
                          </motion.a>
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            <motion.button
              onClick={handleExpandToggle}
              className="mt-8 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white font-semibold backdrop-blur-xl z-50 relative"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ opacity: { duration: 2, repeat: Infinity } }}
            >
              {isExpanded ? 'Click to Stack' : 'Click to Expand'}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
