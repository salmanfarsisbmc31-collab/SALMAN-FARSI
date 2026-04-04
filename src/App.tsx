import React, { useState, useEffect, useRef } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { 
  Menu, X, ChevronRight, Mail, Phone, MapPin, 
  Video, PenTool, MonitorPlay, Layers, Send, ArrowRight
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Showreel', href: '#showreel' },
    { name: 'Video Editing', href: '#video' },
    { name: 'Graphic Design', href: '#design' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-blue-900/70 backdrop-blur-md border-b border-blue-800/50 py-4 shadow-lg shadow-blue-900/20' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#home" className="text-2xl font-heading font-bold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          SF<span className="text-blue-400">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-blue-100/70 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-blue-100/70 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-blue-950 border-b border-blue-800/50 py-4 px-6 md:hidden flex flex-col space-y-4 shadow-xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-blue-200 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const TypewriterText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05, delay: delay + index * 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const WordReveal = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const words = text.split(" ");
  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.4, delay: delay + index * 0.05 }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-900/30 rounded-full blur-3xl mix-blend-screen"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left"
        >
          <h2 className="text-blue-400 font-medium tracking-widest uppercase text-sm mb-4 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
            <TypewriterText text="Hello, I am" delay={0.2} />
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <TypewriterText text="Salman Farsi" delay={0.8} />
          </h1>
          
          <div className="h-12 md:h-16 flex items-center mb-4">
            <motion.div
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="bg-[length:200%_auto] bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-400 text-transparent bg-clip-text text-2xl md:text-3xl lg:text-4xl font-medium drop-shadow-[0_0_10px_rgba(96,165,250,0.4)]"
            >
              Graphic Designer and Video Editor
            </motion.div>
          </div>

          <WordReveal 
            text="I use modern graphic design, motion graphics, and creative video editing to turn ideas into interesting visual stories. My goal is to make content that is clean, cinematic, and visually striking that gets people's attention and gets the message across." 
            className="text-lg md:text-xl text-slate-300 max-w-xl mb-10 font-light"
            delay={1.5}
          />
          
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.5 }}
              href="#contact" 
              className="px-8 py-4 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-white font-medium rounded-full hover:bg-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center gap-2 group shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            >
              Hire Me
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.7 }}
              href="#video" 
              className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            >
              View Portfolio
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative h-[500px] md:h-[650px] w-full lg:w-[90%] ml-auto rounded-[2rem] overflow-hidden bg-slate-900 border-2 border-blue-400/50 group shadow-[0_0_40px_rgba(59,130,246,0.4),inset_0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(59,130,246,0.7),inset_0_0_30px_rgba(59,130,246,0.6)] hover:border-blue-400/80 transition-all duration-500"
        >
          <motion.img 
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            src="https://i.ibb.co/DgWFdz3n/photo-2026-04-04-11-16-21.jpg" 
            alt="Salman Farsi" 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none"></div>
        </motion.div>
      </div>
    </section>
  );
};

const OrbitingNode = ({ radius, initialAngle, duration, reverse, color, text }: { radius: number, initialAngle: number, duration: number, reverse: boolean, color: string, text: string }) => {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-14 h-14 -ml-7 -mt-7 z-20"
      animate={{
        rotate: reverse ? [initialAngle, initialAngle - 360] : [initialAngle, initialAngle + 360],
      }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <div style={{ transform: `translateY(-${radius}px)` }} className="w-full h-full">
        <motion.div
          className="w-full h-full rounded-xl flex items-center justify-center font-bold text-xl bg-slate-950/80 backdrop-blur-md"
          style={{ 
            color, 
            border: `1px solid ${color}`,
            boxShadow: `0 0 20px ${color}80, inset 0 0 15px ${color}40`,
            textShadow: `0 0 10px ${color}`
          }}
          animate={{
            rotate: reverse ? [-initialAngle, -initialAngle + 360] : [-initialAngle, -initialAngle - 360],
          }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
          {text}
        </motion.div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "center center"]
  });
  
  const [isAbout, setIsAbout] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.5 && !isAbout) setIsAbout(true);
      if (latest <= 0.5 && isAbout) setIsAbout(false);
    });
    return () => unsubscribe();
  }, [scrollYProgress, isAbout]);

  return (
    <section ref={containerRef} id="about" className="h-[200vh] relative bg-slate-950">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-6">
        
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>

        <motion.div layout className={`w-full max-w-7xl mx-auto flex ${isAbout ? 'flex-col lg:flex-row items-center gap-16' : 'flex-col items-center justify-center'}`}>
          
          {/* Galaxy / Image Container */}
          <motion.div layout className={`relative flex items-center justify-center ${isAbout ? 'w-full lg:w-1/2 max-w-md aspect-square' : 'w-full max-w-[600px] aspect-square'}`}>
            
            <AnimatePresence>
              {!isAbout && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  {/* Single Orbiting Ring */}
                  <div className="absolute w-[440px] h-[440px] rounded-full border border-blue-500/30 border-dashed shadow-[0_0_50px_rgba(59,130,246,0.1)]"></div>
                  
                  {/* All 6 nodes on the same ring (radius 220) */}
                  <OrbitingNode radius={220} initialAngle={0} duration={25} reverse={false} color="#9999ff" text="Pr" />
                  <OrbitingNode radius={220} initialAngle={60} duration={25} reverse={false} color="#c8a2c8" text="Ae" />
                  <OrbitingNode radius={220} initialAngle={120} duration={25} reverse={false} color="#ff6666" text="Da" />
                  <OrbitingNode radius={220} initialAngle={180} duration={25} reverse={false} color="#31a8ff" text="Ps" />
                  <OrbitingNode radius={220} initialAngle={240} duration={25} reverse={false} color="#ff9a00" text="Ai" />
                  <OrbitingNode radius={220} initialAngle={300} duration={25} reverse={false} color="#ff3366" text="Id" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Center Image */}
            <motion.div 
              layoutId="profile-image"
              className={`relative z-10 rounded-full overflow-hidden border-4 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3)] ${isAbout ? 'w-full h-full' : 'w-[200px] h-[200px]'}`}
            >
              <img 
                src="https://i.ibb.co/DgWFdz3n/photo-2026-04-04-11-16-21.jpg" 
                alt="Salman Farsi" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none"></div>
            </motion.div>

          </motion.div>

          {/* About Text */}
          <AnimatePresence>
            {isAbout && (
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-1/2"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-8 text-blue-50 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">About Me</h2>
                <div className="space-y-6 text-blue-100/80 text-lg font-light leading-relaxed bg-blue-950/40 backdrop-blur-md border border-blue-800/50 p-8 rounded-3xl shadow-[0_0_30px_rgba(30,58,138,0.2)]">
                  <p>
                    I'm a passionate and dedicated aspiring graphic designer and media editor. I'm always learning new things to improve my skills. Even though I'm still early in my journey, I've built a strong foundation in tools like Adobe Premiere Pro and After Effects, as well as a good eye for design and visual storytelling.
                  </p>
                  <p>
                    I really want to get better, try out new things, and take on creative challenges that help me grow as an artist and a technician. I think that practicing, being consistent, and learning from real-world projects are the best ways to get better at what I do.
                  </p>
                  <p>
                    I want to make clean, interesting, and useful visual content while also becoming a professional editor and designer over time.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  );
};

const Showreel = () => {
  return (
    <section id="showreel" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">My Showreel</h2>
          <p className="text-blue-200/70 max-w-2xl mx-auto text-lg">A glimpse into my best work, combining dynamic editing, motion graphics, and visual storytelling.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(30,58,138,0.4)] border border-blue-900/50 group"
        >
          {/* Placeholder for Showreel - User can change this URL later */}
          <iframe 
            src="https://www.youtube.com/embed/XKuSBwOmXrg?autoplay=0&mute=0&loop=1&controls=1&showinfo=0&rel=0&modestbranding=1" 
            title="Showreel" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

const VideoPortfolio = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const projects = [
    { 
      id: 1, 
      title: "Client Project", 
      category: "YouTube Video", 
      image: "https://img.youtube.com/vi/XKuSBwOmXrg/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/XKuSBwOmXrg?autoplay=1",
      bgVideoUrl: "https://www.youtube.com/embed/XKuSBwOmXrg?autoplay=1&mute=1&loop=1&playlist=XKuSBwOmXrg&controls=0&showinfo=0&rel=0&modestbranding=1",
      isVertical: false,
      span: "md:col-span-3"
    },
    { 
      id: 2, 
      title: "Promotional Ad", 
      category: "Reels", 
      image: "https://img.youtube.com/vi/jBCr-aJN618/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/jBCr-aJN618?autoplay=1",
      bgVideoUrl: "https://www.youtube.com/embed/jBCr-aJN618?autoplay=1&mute=1&loop=1&playlist=jBCr-aJN618&controls=0&showinfo=0&rel=0&modestbranding=1",
      isVertical: true,
      span: "md:col-span-1"
    },
    { 
      id: 3, 
      title: "Motion Video", 
      category: "Reels", 
      image: "https://img.youtube.com/vi/_uE-wUUqjwQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/_uE-wUUqjwQ?autoplay=1",
      bgVideoUrl: "https://www.youtube.com/embed/_uE-wUUqjwQ?autoplay=1&mute=1&loop=1&playlist=_uE-wUUqjwQ&controls=0&showinfo=0&rel=0&modestbranding=1",
      isVertical: true,
      span: "md:col-span-1"
    },
    { 
      id: 4, 
      title: "City Lights Cinematic", 
      category: "Reels", 
      image: "https://img.youtube.com/vi/iN1nMMXK41c/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/iN1nMMXK41c?autoplay=1",
      bgVideoUrl: "https://www.youtube.com/embed/iN1nMMXK41c?autoplay=1&mute=1&loop=1&playlist=iN1nMMXK41c&controls=0&showinfo=0&rel=0&modestbranding=1",
      isVertical: true,
      span: "md:col-span-1"
    }
  ];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeVideo]);

  return (
    <section id="video" className="py-24 bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Video Editing</h2>
            <p className="text-slate-400 max-w-xl">High-quality video projects, commercials, and engaging social media content crafted with precision.</p>
          </div>
          <a href="#" className="text-white flex items-center gap-2 hover:text-slate-300 transition-colors group">
            View All Videos <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => project.videoUrl ? setActiveVideo(project.videoUrl) : null}
              className={`group relative overflow-hidden rounded-2xl bg-slate-900/40 backdrop-blur-md cursor-pointer ${project.span} ${project.isVertical ? 'aspect-[9/16] w-full max-w-[320px] mx-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-slate-700/50' : 'aspect-video w-full max-w-5xl mx-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-slate-700/50'}`}
            >
              {project.bgVideoUrl ? (
                <iframe 
                  src={project.bgVideoUrl} 
                  title={project.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  className="absolute inset-0 w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                ></iframe>
              ) : (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90 pointer-events-none"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <MonitorPlay className="w-6 h-6 text-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 p-8 w-full pointer-events-none">
                <span className="text-xs font-medium tracking-wider uppercase text-slate-300 mb-2 block">{project.category}</span>
                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-12"
          >
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50"
            >
              <X size={24} />
            </button>

            <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <iframe 
                src={activeVideo} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

type FolderType = {
  id: string;
  title: string;
  category: string;
  coverImage: string;
  span: string;
  images: string[];
};

const DesignPortfolio = () => {
  const [activeFolder, setActiveFolder] = useState<FolderType | null>(null);

  const folders: FolderType[] = [
    { 
      id: 'typography', 
      title: "Logo & Typography", 
      category: "Branding / Typography", 
      coverImage: "https://i.ibb.co/Tx02K7VF/3114-SALMAN-FARSI.jpg", 
      span: "md:col-span-2 md:row-span-2",
      images: [
        "https://i.ibb.co/Tx02K7VF/3114-SALMAN-FARSI.jpg",
        "https://i.ibb.co/bRLggTM9/Assignment-7-1.jpg",
        "https://i.ibb.co/MD7xZMyN/Assignment-7-2.jpg",
        "https://i.ibb.co/q30RbfMH/Assignment-7-3.jpg",
        "https://i.ibb.co/CK0JJhvk/Assignment-7-4.jpg",
        "https://i.ibb.co/bDD6hzf/Assignment-4-logo.jpg"
      ]
    },
    { 
      id: 'book-cover', 
      title: "Book Cover Design", 
      category: "Print / Editorial", 
      coverImage: "https://i.ibb.co/0RfPrqQf/Assignment-8-BOOK-COVER-mockup-DESIGN-jpg.jpg", 
      span: "md:col-span-1 md:row-span-1",
      images: [
        "https://i.ibb.co/0RfPrqQf/Assignment-8-BOOK-COVER-mockup-DESIGN-jpg.jpg",
        "https://i.ibb.co/R4PvvFDk/Assignment-8-BOOK-COVER-mockup-DESIGN.jpg",
        "https://i.ibb.co/LDbJBJQX/Assignment-8-BOOK-COVER-DESIGN.jpg"
      ]
    },
    { 
      id: 'thumbnail', 
      title: "Thumbnail Design", 
      category: "Youtube / Video", 
      coverImage: "https://i.ibb.co/d00sc2MN/Assignment-9-thumbnil-image-retucching.jpg", 
      span: "md:col-span-1 md:row-span-1",
      images: [
        "https://i.ibb.co/d00sc2MN/Assignment-9-thumbnil-image-retucching.jpg",
        "https://i.ibb.co/jkmZPV5N/Assignment-9-thumbnil-image-retucching-2.jpg",
        "https://i.ibb.co/23ZxrRw0/photo-2026-03-29-11-43-09-8.jpg"
      ]
    },
    { 
      id: 'social-media', 
      title: "Social Media Design", 
      category: "Digital / Social", 
      coverImage: "https://i.ibb.co/kVZF31kD/photo-2026-03-29-11-43-09-2.jpg", 
      span: "md:col-span-1 md:row-span-1",
      images: [
        "https://i.ibb.co/9HTxrhqD/Assignment-6.jpg",
        "https://i.ibb.co/v6gy6tk2/Assignment-4-back.jpg",
        "https://i.ibb.co/27KLxwCV/Assignment-4-back-mokup.jpg",
        "https://i.ibb.co/WvL3q6GZ/Assignment-4-front-mokup.jpg",
        "https://i.ibb.co/kVZF31kD/photo-2026-03-29-11-43-09-2.jpg",
        "https://i.ibb.co/jPkpT3Kf/photo-2026-03-29-11-43-09-3.jpg",
        "https://i.ibb.co/8D76DwWz/photo-2026-03-29-11-43-09-4.jpg",
        "https://i.ibb.co/gZ9f4M3M/photo-2026-03-29-11-43-09-5.jpg",
        "https://i.ibb.co/Pzrnhv9r/photo-2026-03-29-11-43-09-6.jpg",
        "https://i.ibb.co/v6BnZvC0/photo-2026-03-29-11-43-09-7.jpg",
        "https://i.ibb.co/5hZs6vLs/photo-2026-03-29-11-43-09.jpg",
        "https://i.ibb.co/jPx3MWZ5/photo-2026-03-29-11-43-10-2.jpg",
        "https://i.ibb.co/8LXtTQVS/photo-2026-03-29-11-43-10-3.jpg",
        "https://i.ibb.co/5XDRV2BD/photo-2026-03-29-11-43-10-4.jpg",
        "https://i.ibb.co/Z1YQZRHD/photo-2026-03-29-11-43-10-5.jpg",
        "https://i.ibb.co/F4zTDkBm/photo-2026-03-29-11-43-10.jpg",
        "https://i.ibb.co/qYVzgNCk/photo-2026-03-29-11-43-12-2.jpg",
        "https://i.ibb.co/G4qj2Lct/photo-2026-03-29-11-43-12.jpg"
      ]
    },
    { 
      id: 'banner', 
      title: "Banner Design", 
      category: "Print / Web", 
      coverImage: "https://i.ibb.co/SDV9cvxN/Assignment-3.jpg", 
      span: "md:col-span-2 md:row-span-1",
      images: [
        "https://i.ibb.co/SDV9cvxN/Assignment-3.jpg",
        "https://i.ibb.co/4g5zV7QS/Assignment-3-poster2-0.jpg",
        "https://i.ibb.co/vnYYk6V/Assignment-3-poster2.jpg",
        "https://i.ibb.co/m5YttTky/Assignment-5.jpg"
      ]
    },
  ];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeFolder) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeFolder]);

  return (
    <section id="design" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Graphic Design</h2>
            <p className="text-slate-400 max-w-xl">Explore my design categories. Click on any folder to view the complete gallery.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6">
          {folders.map((folder, index) => (
            <motion.div 
              key={folder.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setActiveFolder(folder)}
              className={`group relative overflow-hidden rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)] cursor-pointer ${folder.span}`}
            >
              <img 
                src={folder.coverImage} 
                alt={folder.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity group-hover:opacity-100"></div>
              
              {/* Folder Icon Indicator */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5 text-white" />
              </div>

              <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs font-medium tracking-wider uppercase text-slate-400 mb-2 block">{folder.category} • {folder.images.length} Items</span>
                <h3 className="text-xl md:text-2xl font-semibold text-white">{folder.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for Folder Images */}
      <AnimatePresence>
        {activeFolder && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-12"
          >
            <button 
              onClick={() => setActiveFolder(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50"
            >
              <X size={24} />
            </button>

            <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-950 border border-slate-800 p-6 md:p-10 hide-scrollbar">
              <div className="mb-10 text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{activeFolder.title}</h3>
                <p className="text-slate-400">{activeFolder.images.length} items in this folder</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeFolder.images.map((img, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="rounded-xl overflow-hidden bg-slate-900 aspect-[4/5] relative group"
                  >
                    <img 
                      src={img} 
                      alt={`${activeFolder.title} ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-blue-950/20 border-t border-blue-900/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-blue-50">Let's Work Together</h2>
            <p className="text-blue-200/70 text-lg mb-12 max-w-md font-light">
              Please get in touch with me if you want to work with me or have a project in mind. I'm always open to new projects, creative ideas, and chances to work with others.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-900/40 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-200/50 mb-1">Phone</h4>
                  <p className="text-lg text-blue-50">01406772666</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-900/40 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-200/50 mb-1">Email</h4>
                  <p className="text-lg text-blue-50">salmanfarsisbmc31@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-900/40 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-200/50 mb-1">Location</h4>
                  <p className="text-lg text-blue-50">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-blue-950/40 backdrop-blur-md border border-blue-800/50 p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-blue-200/70">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-blue-950/50 border border-blue-800/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-blue-200/70">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-blue-950/50 border border-blue-800/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-blue-200/70">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full bg-blue-950/50 border border-blue-800/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-blue-200/70">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full bg-blue-950/50 border border-blue-800/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-500 text-white font-medium rounded-xl px-4 py-4 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-8 border-t border-blue-900/50 bg-blue-950 text-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-blue-200/60 text-sm">
          © {new Date().getFullYear()} Salman Farsi. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a href="#" className="text-blue-200/60 hover:text-white transition-colors">Behance</a>
          <a href="#" className="text-blue-200/60 hover:text-white transition-colors">Instagram</a>
          <a href="#" className="text-blue-200/60 hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-slate-800 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Showreel />
        <VideoPortfolio />
        <DesignPortfolio />
        <About />
        <Contact />
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  );
}
