import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Terminal, GraduationCap, Trophy, Users } from 'lucide-react';
import { useSpotlight } from '../hooks/useSpotlight';

const ExperienceCard = ({
  icon: Icon,
  title,
  subtitle,
  badge,
  description,
  highlights,
  index
}: {
  icon: any;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  highlights: string[];
  index: number;
}) => {
  const { ref, spotlight, handleMouseMove, handleMouseLeave } = useSpotlight();
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.3, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 0.95, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 25, 0, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        opacity, 
        scale, 
        y,
        willChange: 'transform, opacity'
      }}
      className="relative"
    >
      <div className="flex gap-6 md:gap-8">
        <div className="flex flex-col items-center">
          <motion.div
            className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          {index < 1 && (
            <motion.div
              className="w-1 flex-1 bg-gradient-to-b from-violet-500 to-transparent mt-4"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            />
          )}
        </div>

        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex-1 backdrop-blur-2xl bg-white/[0.03] border border-white/[0.05] rounded-2xl p-8 relative overflow-hidden mb-12"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
            style={{
              opacity: spotlight.opacity,
              background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(124, 58, 237, 0.15), transparent 70%)`
            }}
          />

          <div className="relative z-10">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 font-medium">{subtitle}</p>
              </div>
              <span className="px-4 py-2 bg-violet-500/20 border border-violet-500/30 rounded-full text-violet-300 text-sm font-semibold whitespace-nowrap">
                {badge}
              </span>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>

            <div className="flex flex-wrap gap-3">
              {highlights.map((highlight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300"
                >
                  {highlight}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Experience = () => {
  const experiences = [
    {
      icon: Terminal,
      title: 'Linux World',
      subtitle: 'Agent & Intern',
      badge: '46 Days',
      description: 'Engineered automation scripts, worked extensively with Red Hat Linux, and collaborated with senior engineers on critical infrastructure projects.',
      highlights: ['Red Hat Linux', 'Automation', 'Shell Scripting', 'DevOps']
    },
    {
      icon: GraduationCap,
      title: 'Vivekananda Global University',
      subtitle: 'Bachelor of Computer Applications',
      badge: 'Current',
      description: 'Pursuing BCA with a focus on full-stack development, cloud computing, and modern web technologies.',
      highlights: ['2x Hackathon Participant', 'Academic Excellence', 'Core Team Member']
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="experience">
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
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            The Journey
          </h2>
          <p className="text-xl text-gray-400">Experience & Education</p>
        </motion.div>

        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
