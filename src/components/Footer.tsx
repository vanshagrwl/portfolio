import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { useMagneticEffect } from '../hooks/useMagneticEffect';
import { useState } from 'react';

const SocialButton = ({ icon: Icon, href, label }: { icon: any; href: string; label: string }) => {
  const { ref, position, handleMouseMove, handleMouseLeave } = useMagneticEffect(0.2);

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full backdrop-blur-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={label}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Icon className="w-7 h-7 sm:w-9 sm:h-9 text-gray-400 group-hover:text-white transition-colors duration-300 relative z-10" />
    </motion.a>
  );
};

export const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Message sent! Will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <footer className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-gradient-to-t from-violet-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.9, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: 'tween'
          }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-8">
            LET'S BUILD
          </h2>
          <p className="text-xl md:text-2xl text-gray-400">
            Got a project in mind? Let's make it happen.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              type: 'tween'
            }}
            viewport={{ once: true, margin: '-50px' }}
            className="backdrop-blur-2xl bg-white/[0.03] border border-white/[0.05] rounded-2xl p-8"
          >
            <h3 className="text-3xl font-bold text-white mb-6">Get in Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none transition-colors resize-none"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/30"
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
              {status && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-center"
                >
                  {status}
                </motion.p>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              type: 'tween'
            }}
            viewport={{ once: true, margin: '-50px' }}
            className="flex flex-col justify-between"
          >
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">Connect</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
            </div>

            <div className="flex gap-6 justify-center md:justify-start">
              <SocialButton icon={Linkedin} href="https://www.linkedin.com/in/vansh-agarwal-935a322b2/" label="LinkedIn" />
              <SocialButton icon={Github} href="https://github.com/vanshagrwl" label="GitHub" />
              <SocialButton icon={Mail} href="mailto:vansh251205@gmail.com" label="Email" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-500 text-sm">
            Crafted by Vansh Agarwal | Jaipur, India
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 All rights reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
