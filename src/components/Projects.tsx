import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Github, X, Code } from 'lucide-react';
import { useSpotlight } from '../hooks/useSpotlight';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  codeSnippet?: string;
}

const projects: Project[] = [
  {
    title: 'Dyslexia Learning Support Platform',
    description: 'An accessible learning platform for children with dyslexia, featuring interactive drawing tools, educational games, story creation, and a community gallery. Built with full-stack architecture using React, TypeScript, Supabase, and SQL.',
    image: 'https://images.pexels.com/photos/5905706/pexels-photo-5905706.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'TypeScript', 'Node.js', 'SQL', 'Supabase', 'Tailwind CSS'],
    liveUrl: 'https://dys-lexia.netlify.app/',
    githubUrl: 'https://github.com/vanshagrwl/dyslexia',
    featured: true
  },
  {
    title: 'Personal Portfolio Website',
    description: 'A modern, responsive portfolio website showcasing my projects, skills, and experience. Features smooth animations, glassmorphism design, interactive elements, and a fully responsive layout. Built with React, TypeScript, Framer Motion, and Tailwind CSS.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Vite', 'Responsive Design'],
    liveUrl: '#',
    githubUrl: 'https://github.com/vanshagrwl/portfolio',
    featured: true
  },
  {
    title: 'AI Assistant Jarvis',
    description: 'A voice-activated AI assistant with speech recognition, natural language processing, and command execution. Features wake word detection, Google Gemini AI integration, FastAPI backend, React frontend, and WebSocket support for real-time communication.',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Python', 'FastAPI', 'React', 'Speech Recognition', 'Google Gemini AI', 'WebSocket'],
    githubUrl: 'https://github.com/vanshagrwl/AI_Assistant',
    codeSnippet: `# AI Assistant Jarvis - Main Implementation
import speech_recognition as sr
import pyttsx3
import google.generativeai as genai

# Initialize AI model
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def listen_for_command():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        audio = r.listen(source)
        text = r.recognize_google(audio)
    return text

def execute_command(command):
    # Process command with AI
    response = model.generate_content(command)
    speak(response.text)
    return True`
  },
  {
    title: 'Instagram Auto Poster',
    description: 'Python automation script to post photos to Instagram programmatically. Uses instagrapi library for seamless Instagram API integration, allowing automated content sharing with custom captions.',
    image: 'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Python', 'Instagram API', 'Automation', 'instagrapi'],
    githubUrl: 'https://github.com/vanshagrwl/instagram-automation',
    codeSnippet: `# Instagram Auto Poster
from instagrapi import Client

username = "your_username"
password = "your_password"

cl = Client()
cl.login(username, password)

photo_path = "path/to/image.jpg"
caption = "Your caption here"

cl.photo_upload(photo_path, caption)
print("Photo posted successfully!")`
  },
  {
    title: 'WhatsApp Message Sender',
    description: 'Python automation tool to send WhatsApp messages programmatically. Enables bulk messaging, scheduled messages, and automated notifications using pywhatkit or selenium for WhatsApp Web integration.',
    image: 'https://images.pexels.com/photos/4427430/pexels-photo-4427430.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Python', 'WhatsApp API', 'Automation', 'Selenium'],
    githubUrl: 'https://github.com/vanshagrwl/whatsapp-automation',
    codeSnippet: `# WhatsApp Message Sender
import pywhatkit as pwt
from selenium import webdriver

def send_whatsapp_message(phone, message, hour, minute):
    # Send message at specific time
    pwt.sendwhatmsg(phone, message, hour, minute)
    
    # Or use Selenium for more control
    driver = webdriver.Chrome()
    driver.get("https://web.whatsapp.com")
    # Automation logic here
    driver.quit()`
  },
  {
    title: 'Email Automation Sender',
    description: 'Python email automation tool for sending personalized emails, bulk email campaigns, and scheduled notifications. Supports HTML templates, attachments, and SMTP integration for reliable email delivery.',
    image: 'https://images.pexels.com/photos/4427430/pexels-photo-4427430.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Python', 'SMTP', 'Email Automation', 'HTML Templates'],
    githubUrl: 'https://github.com/vanshagrwl/email-automation',
    codeSnippet: `# Email Automation Sender
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(to_email, subject, body):
    msg = MIMEMultipart()
    msg['From'] = "your_email@gmail.com"
    msg['To'] = to_email
    msg['Subject'] = subject
    
    msg.attach(MIMEText(body, 'html'))
    
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login("your_email", "your_password")
    server.send_message(msg)
    server.quit()`
  }
];

const CodeViewerModal = ({ project, isOpen, onClose }: { project: Project; isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] backdrop-blur-2xl bg-white/[0.05] border border-white/[0.1] rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-gray-400 text-sm">Source Code</p>
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              
              <div className="p-6 overflow-auto max-h-[calc(90vh-180px)]">
                <pre className="text-sm text-gray-300 font-mono leading-relaxed overflow-x-auto bg-black/20 p-4 rounded-lg border border-white/10">
                  <code className="whitespace-pre-wrap">{project.codeSnippet || '// Code snippet not available'}</code>
                </pre>
              </div>
              
              {project.githubUrl && (
                <div className="p-6 border-t border-white/10">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600/20 border border-violet-500/30 text-violet-300 rounded-lg text-sm font-semibold hover:bg-violet-600/30 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Full Repository on GitHub
                  </motion.a>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const { ref, spotlight, handleMouseMove, handleMouseLeave } = useSpotlight();
  const [showCodeModal, setShowCodeModal] = useState(false);

  if (project.featured) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.1, 
          ease: [0.25, 0.46, 0.45, 0.94],
          type: 'tween'
        }}
        viewport={{ once: true, margin: '-100px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -5 }}
        className="group relative backdrop-blur-2xl bg-white/[0.03] border border-white/[0.05] rounded-2xl overflow-hidden col-span-1 md:col-span-2 transition-all duration-300"
      >
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, rgba(124, 58, 237, 0.15), transparent 70%)`
          }}
        />

        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-full overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1, rotate: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-violet-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="p-4 xs:p-6 sm:p-8 flex flex-col justify-between relative z-10">
            <div>
              <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-white mb-2 xs:mb-3 sm:mb-4" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>{project.title}</h3>
              <p className="text-xs xs:text-sm sm:text-base text-gray-300 mb-3 xs:mb-4 sm:mb-6 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              {project.liveUrl && project.liveUrl !== '#' && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-violet-500/30 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                  <ExternalLink className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Live Demo</span>
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    if (project.githubUrl) {
                      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:border-white/20 cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>Source Code</span>
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.08, 
          ease: [0.25, 0.46, 0.45, 0.94],
          type: 'tween'
        }}
        viewport={{ once: true, margin: '-100px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -4, scale: 1.01 }}
        className="group relative backdrop-blur-2xl bg-white/[0.03] border border-white/[0.05] rounded-2xl overflow-hidden"
      >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-200 pointer-events-none"
        style={{
          opacity: spotlight.opacity * 0.7,
          background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(124, 58, 237, 0.12), transparent 70%)`
        }}
      />

      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-3 xs:p-4 sm:p-6 relative z-10">
        <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white mb-2" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>{project.title}</h3>
        <p className="text-gray-400 text-xs sm:text-sm mb-2 xs:mb-3 sm:mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {project.liveUrl && project.liveUrl !== '#' && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-violet-600/20 border border-violet-500/30 text-violet-300 rounded-lg text-sm font-semibold"
            >
              <ExternalLink className="w-3 h-3" />
              Demo
            </motion.a>
          )}
          {project.githubUrl && !project.featured && (
            <motion.button
              onClick={() => setShowCodeModal(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg text-sm font-semibold cursor-pointer hover:bg-white/10 transition-colors duration-200"
            >
              <Code className="w-3 h-3" />
              View Code
            </motion.button>
          )}
        </div>
      </div>
      
      {!project.featured && (
        <CodeViewerModal 
          project={project} 
          isOpen={showCodeModal} 
          onClose={() => setShowCodeModal(false)} 
        />
      )}
    </motion.div>
  );
};

export const Projects = () => {
  return (
    <section className="py-12 xs:py-16 sm:py-20 px-3 xs:px-4 sm:px-6 lg:px-8" id="projects">
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
          className="mb-16"
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
            Featured Work
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-400"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            Selected Projects & Experiments
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xs:gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
