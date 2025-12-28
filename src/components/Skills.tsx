import { motion } from 'framer-motion';
import { useState } from 'react';

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
  { name: 'PostgreSQL', category: 'Database', x: 10, y: 85, scale: 1 },
  { name: 'Docker', category: 'Tools', x: 55, y: 10, scale: 1 },
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        left: `${skill.x}%`,
        top: `${skill.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="cursor-pointer"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          scale: isHovered ? skill.scale * 1.3 : skill.scale,
          zIndex: isHovered ? 50 : 1
        }}
        transition={{
          y: { duration: 3.5 + index * 0.2, repeat: Infinity, ease: [0.4, 0, 0.6, 1] },
          scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          zIndex: { duration: 0 }
        }}
        className="relative"
      >
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${categoryColors[skill.category]} blur-xl opacity-30`}
          animate={{ scale: isHovered ? 1.5 : 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className={`relative px-6 py-3 backdrop-blur-xl bg-gradient-to-br ${categoryColors[skill.category]} rounded-full border border-white/20 shadow-2xl`}>
          <span className="text-white font-semibold text-sm whitespace-nowrap">
            {skill.name}
          </span>
        </div>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-lg text-xs text-gray-300 whitespace-nowrap"
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
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="skills">
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
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            The Ecosystem
          </h2>
          <p className="text-xl text-gray-400">Skills & Technologies</p>
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
          className="relative w-full h-[600px] md:h-[700px] backdrop-blur-2xl bg-white/[0.02] border border-white/[0.05] rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5" />

          {skills.map((skill, index) => (
            <SkillOrb key={skill.name} skill={skill} index={index} />
          ))}

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 flex-wrap justify-center px-4">
            {Object.entries(categoryColors).map(([category, color]) => (
              <div key={category} className="flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${color}`} />
                <span className="text-xs text-gray-300">{category}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
