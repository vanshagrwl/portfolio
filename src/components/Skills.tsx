import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Skill {
  name: string;
  category: string;
  x: number;
  y: number;
  scale: number;
}

const skills: Skill[] = [
  { name: 'React', category: 'Frontend', x: 15, y: 20, scale: 1.2 },
  { name: 'TypeScript', category: 'Frontend', x: 75, y: 15, scale: 1.1 },
  { name: 'HTML', category: 'Frontend', x: 50, y: 35, scale: 1 },
  { name: 'JavaScript', category: 'Frontend', x: 30, y: 50, scale: 1.1 },
  { name: 'Tailwind CSS', category: 'Frontend', x: 70, y: 30, scale: 1 },
  { name: 'Node.js', category: 'Backend', x: 25, y: 60, scale: 1.3 },
  { name: 'Express', category: 'Backend', x: 65, y: 55, scale: 1 },
  { name: 'Python', category: 'Backend', x: 85, y: 70, scale: 1.1 },
  { name: 'MongoDB', category: 'Database', x: 40, y: 80, scale: 1.1 },
  { name: 'Git', category: 'Tools', x: 30, y: 40, scale: 0.9 },
  { name: 'Linux', category: 'Tools', x: 90, y: 40, scale: 1 },
  { name: 'Figma', category: 'Design', x: 20, y: 5, scale: 0.9 }
];

const categoryColors: { [key: string]: string } = {
  Frontend: 'from-blue-500 to-cyan-500',
  Backend: 'from-green-500 to-emerald-500',
  Database: 'from-purple-500 to-pink-500',
  Tools: 'from-orange-500 to-red-500',
  Design: 'from-violet-500 to-indigo-500'
};

const SkillOrb = ({ skill, index }: { skill: Skill; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  // Detect screen size properly
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 768) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Responsive positioning - adjust for mobile/tablet to prevent overlap
  const getResponsivePosition = () => {
    if (screenSize === 'mobile') {
      // Mobile adjustments: keep skills away from edges and adjust spacing
      let adjustedX = skill.x;
      let adjustedY = skill.y;
      
      // Clamp X positions to prevent edge cutoff (12% margin on each side)
      if (adjustedX < 12) adjustedX = 12;
      if (adjustedX > 88) adjustedX = 88;
      
      // Adjust Y positions for better mobile spacing
      if (adjustedY < 12) adjustedY = 12;
      if (adjustedY > 82) adjustedY = 82;
      
      return { x: adjustedX, y: adjustedY };
    }
    
    if (screenSize === 'tablet') {
      // Tablet adjustments
      let adjustedX = skill.x;
      if (adjustedX < 10) adjustedX = 10;
      if (adjustedX > 90) adjustedX = 90;
      return { x: adjustedX, y: skill.y };
    }
    
    return { x: skill.x, y: skill.y };
  };

  const position = getResponsivePosition();
  const responsiveScale = screenSize === 'mobile' ? skill.scale * 0.85 : (screenSize === 'tablet' ? skill.scale * 0.95 : skill.scale);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: isHovered ? 50 : 1
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="cursor-pointer"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          scale: isHovered ? responsiveScale * 1.3 : responsiveScale,
          rotate: isHovered ? [0, 3, -3, 0] : 0
        }}
        transition={{
          y: { duration: 3.5 + index * 0.2, repeat: Infinity, ease: [0.4, 0, 0.6, 1] },
          scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          rotate: { duration: 0.5, ease: 'easeInOut' }
        }}
        className="relative"
      >
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${categoryColors[skill.category]} blur-xl opacity-30`}
          animate={{ 
            scale: isHovered ? [1, 1.5, 1.4] : 1,
            opacity: isHovered ? [0.3, 0.5, 0.3] : 0.3
          }}
          transition={{ 
            scale: { duration: 0.6, repeat: isHovered ? Infinity : 0, ease: 'easeInOut' },
            opacity: { duration: 0.6, repeat: isHovered ? Infinity : 0, ease: 'easeInOut' }
          }}
        />
        <motion.div 
          className={`relative px-3 py-1.5 xs:px-4 xs:py-2 sm:px-6 sm:py-3 backdrop-blur-xl bg-gradient-to-br ${categoryColors[skill.category]} rounded-full border border-white/20 shadow-2xl`}
          whileHover={{ 
            boxShadow: '0 0 30px rgba(124, 58, 237, 0.6)',
            borderColor: 'rgba(255, 255, 255, 0.4)'
          }}
        >
          <span className="text-white font-semibold text-[10px] xs:text-xs sm:text-sm whitespace-nowrap">
            {skill.name}
          </span>
        </motion.div>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded-lg text-[10px] xs:text-xs text-gray-300 whitespace-nowrap z-50"
          >
            {skill.category}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export const Skills = () => {
  return (
    <section className="py-12 xs:py-16 sm:py-20 px-3 xs:px-4 sm:px-6 lg:px-8" id="skills">
      <div className="max-w-7xl mx-auto">
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
            The Ecosystem
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-400"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            Skills & Technologies
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ 
            duration: 0.9, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: 'tween'
          }}
          viewport={{ once: true, margin: '-50px' }}
          className="relative w-full h-[450px] xs:h-[500px] sm:h-[600px] md:h-[700px] backdrop-blur-2xl bg-white/[0.02] border border-white/[0.05] rounded-2xl sm:rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5" />

          {skills.map((skill, index) => (
            <SkillOrb key={skill.name} skill={skill} index={index} />
          ))}

          <div className="absolute bottom-4 xs:bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 xs:gap-3 sm:gap-4 flex-wrap justify-center px-2 xs:px-4">
            {Object.entries(categoryColors).map(([category, color]) => (
              <div key={category} className="flex items-center gap-1.5 xs:gap-2 px-2 xs:px-3 py-0.5 xs:py-1 bg-black/40 backdrop-blur-sm rounded-full">
                <div className={`w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br ${color}`} />
                <span className="text-[10px] xs:text-xs text-gray-300">{category}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
