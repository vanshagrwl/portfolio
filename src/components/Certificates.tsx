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
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="certificates">
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
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            The Vault
          </h2>
          <p className="text-xl text-gray-400">Certifications & Achievements</p>
        </motion.div>

        <div className="flex items-center justify-center">
          <div className="relative perspective-1000">
            <motion.button
              onClick={handleExpandToggle}
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white font-semibold backdrop-blur-xl z-50"
              whileHover={{ scale: 1.02 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isExpanded ? 'Click to Stack' : 'Click to Expand'}
            </motion.button>
            <div className="relative w-[300px] sm:w-[400px] h-[400px]">
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
                        className="w-full h-full backdrop-blur-2xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-white/10 rounded-2xl p-8 shadow-2xl"
                        whileHover={{ scale: selectedIndex === index ? 1 : 1.05 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                            {cert.date}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">
                          {cert.title}
                        </h3>
                        <p className="text-violet-400 font-medium mb-4">
                          {cert.issuer}
                        </p>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
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
          </div>
        </div>
      </div>
    </section>
  );
};
