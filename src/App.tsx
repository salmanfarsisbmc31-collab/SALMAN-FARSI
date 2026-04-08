import React, { useState, useEffect, useRef } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ChevronRight, Mail, Phone, MapPin, 
  MonitorPlay, Layers, Send, ArrowRight, CheckCircle2
} from 'lucide-react';

// --- Navbar ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Video Editing', path: '/video-editing' },
    { name: 'Graphic Design', path: '/graphic-design' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About Me', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/60 backdrop-blur-lg py-4 shadow-[0_4px_20px_rgba(30,58,138,0.15)] border-b border-blue-900/20' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
          <span className="text-blue-500 font-logo text-3xl italic font-extrabold tracking-widest drop-shadow-md">SF.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${location.pathname === link.path ? 'text-blue-500' : 'text-slate-300'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden text-slate-300 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-t border-slate-800 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium transition-colors ${location.pathname === link.path ? 'text-blue-500' : 'text-slate-300'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Hero ---
const Hero = () => {
  const text = "Graphic Designer & Video Editor";
  
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-blue-400 font-dynamic text-3xl md:text-4xl tracking-wide mb-2 drop-shadow-sm"
          >
            Hello, I am
          </motion.p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-slate-400">
            Salman Farsi
          </h1>
          
          <div className="mb-8 h-8">
            <motion.p
              className="text-xl md:text-2xl text-slate-400"
              initial={{ opacity: 1 }}
            >
              {text.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.1 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/graphic-design" className="bg-blue-600 text-white px-8 py-4 rounded-full font-logo font-bold tracking-wide transition-transform hover:scale-105 hover:bg-blue-700 flex items-center gap-2 shadow-lg shadow-blue-500/20">
              View Work <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="border border-slate-700 hover:border-slate-500 bg-slate-900/50 px-8 py-4 rounded-full font-logo font-bold tracking-wide transition-all hover:bg-slate-800 shadow-lg">
              Contact Me
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, y: [0, -20, 0] }}
          transition={{ 
            opacity: { duration: 1 },
            scale: { duration: 1 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="order-1 lg:order-2 relative w-full h-[400px] md:h-[600px] flex items-center justify-center group"
        >
          {/* Glow effect below the image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-500/30 blur-[80px] rounded-full pointer-events-none"></div>
          
          <img 
            src="https://i.ibb.co/qFmy55QZ/Smilingmanwith-Mac-Bookandkurta.png" 
            alt="Salman Farsi" 
            className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
            referrerPolicy="no-referrer"
          />
          
          <div className="absolute bottom-4 md:bottom-10 z-20 flex items-center justify-center px-6 py-3 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 mr-3 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
            <span className="text-white text-sm md:text-base font-medium tracking-wide">Available for projects</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Showreel ---
const Showreel = () => {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
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
          <iframe 
            src="https://www.youtube.com/embed/XKuSBwOmXrg?autoplay=0&mute=0&loop=1&controls=1&showinfo=0&rel=0&modestbranding=1" 
            title="Showreel" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

// --- VideoPortfolio ---
const VideoPortfolio = ({ preview = false }: { preview?: boolean }) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const allProjects = [
    { 
      id: 1, 
      title: "Client Project", 
      category: "YouTube Video", 
      image: "https://img.youtube.com/vi/XKuSBwOmXrg/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/XKuSBwOmXrg?autoplay=1",
      isVertical: false,
      span: "md:col-span-2 lg:col-span-3"
    },
    { 
      id: 2, 
      title: "Promotional Ad", 
      category: "Reels", 
      image: "https://img.youtube.com/vi/jBCr-aJN618/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/jBCr-aJN618?autoplay=1",
      isVertical: true,
      span: "md:col-span-1"
    },
    { 
      id: 3, 
      title: "Motion Video", 
      category: "Reels", 
      image: "https://img.youtube.com/vi/_uE-wUUqjwQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/_uE-wUUqjwQ?autoplay=1",
      isVertical: true,
      span: "md:col-span-1"
    },
    { 
      id: 4, 
      title: "City Lights Cinematic", 
      category: "Reels", 
      image: "https://img.youtube.com/vi/iN1nMMXK41c/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/iN1nMMXK41c?autoplay=1",
      isVertical: true,
      span: "md:col-span-1"
    },
    { 
      id: 5, 
      title: "Commercials", 
      category: "Automotive", 
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=3870&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/jBCr-aJN618?autoplay=1",
      isVertical: false,
      span: "md:col-span-1"
    },
    { 
      id: 6, 
      title: "Music Videos", 
      category: "Entertainment", 
      image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=3856&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/XKuSBwOmXrg?autoplay=1",
      isVertical: false,
      span: "md:col-span-1"
    },
    { 
      id: 7, 
      title: "Short Films", 
      category: "Narrative", 
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=3825&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/_uE-wUUqjwQ?autoplay=1",
      isVertical: false,
      span: "md:col-span-1"
    },
    { 
      id: 8, 
      title: "Documentary", 
      category: "Real Life", 
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=3859&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/iN1nMMXK41c?autoplay=1",
      isVertical: false,
      span: "md:col-span-1"
    },
    { 
      id: 9, 
      title: "Brand Anthem", 
      category: "Corporate", 
      image: "https://images.unsplash.com/photo-1578022761797-b8636ac1773c?q=80&w=3870&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/jBCr-aJN618?autoplay=1",
      isVertical: false,
      span: "md:col-span-1"
    },
    { 
      id: 10, 
      title: "VFX Breakdown", 
      category: "Post Production", 
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=3870&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/XKuSBwOmXrg?autoplay=1",
      isVertical: false,
      span: "md:col-span-1"
    }
  ];

  const projects = preview ? allProjects.slice(0, 4) : allProjects;

  useEffect(() => {
    if (activeVideo) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeVideo]);

  return (
    <div className="bg-[#050505] min-h-screen font-sans">
      {!preview && (
        <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=3870&auto=format&fit=crop" 
              alt="Cinematic Background" 
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#050505]"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 mt-16">
            <h1 className="text-5xl md:text-7xl font-light tracking-[0.2em] text-white mb-12 uppercase" style={{ fontWeight: 200 }}>
              Showreel
            </h1>
            <button 
              onClick={() => setActiveVideo("https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1")}
              className="group relative flex items-center justify-center w-24 h-24 rounded-full border border-white/20 hover:border-white/60 transition-all duration-700 bg-black/10 backdrop-blur-sm"
            >
              <MonitorPlay className="w-8 h-8 text-white ml-2 opacity-70 group-hover:opacity-100 transition-opacity duration-500" strokeWidth={1} />
              <div className="absolute inset-0 rounded-full border border-white/10 scale-[1.15] group-hover:scale-[1.25] transition-transform duration-700"></div>
            </button>
          </div>
        </section>
      )}

      <section className={`py-24 ${preview ? 'pt-32' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {!preview ? (
            <h2 className="text-3xl md:text-4xl font-light text-center text-white mb-20 tracking-wide" style={{ fontWeight: 300 }}>
              My Work
            </h2>
          ) : (
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-3xl md:text-5xl font-light mb-4 text-white tracking-wide">Video Editing</h2>
                <p className="text-slate-400 max-w-xl font-light">High-quality video projects, commercials, and engaging social media content crafted with precision.</p>
              </div>
              <Link to="/video-editing" className="text-white flex items-center gap-2 hover:text-slate-300 transition-colors group font-light tracking-wide">
                View All Videos <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
            {projects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                onClick={() => project.videoUrl ? setActiveVideo(project.videoUrl) : null}
                className={`group relative overflow-hidden bg-[#0a0a0a] cursor-pointer ${project.span || ''} ${project.isVertical ? 'aspect-[9/16] w-full max-w-[320px] mx-auto' : 'aspect-video w-full'}`}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40 pointer-events-none"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm bg-black/20">
                    <MonitorPlay className="w-6 h-6 text-white ml-1" strokeWidth={1} />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 p-6 w-full pointer-events-none transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-slate-400 mb-2 block">{project.category}</span>
                  <h3 className="text-xl font-light text-white tracking-wide">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-colors border border-white/10"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            <div className="w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden border border-white/10 shadow-2xl">
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
    </div>
  );
};

// --- DesignPortfolio ---
type FolderType = {
  id: string;
  title: string;
  category: string;
  coverImage: string;
  span: string;
  images: string[];
};

const DesignPortfolio = ({ preview = false }: { preview?: boolean }) => {
  const [activeFolder, setActiveFolder] = useState<FolderType | null>(null);

  const allFolders: FolderType[] = [
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
      coverImage: "https://i.ibb.co/WvVND0YW/Assignment-8-BOOK-COVER-mockup-DESIGN-jpg.jpg", 
      span: "md:col-span-1 md:row-span-1",
      images: [
        "https://i.ibb.co/WvVND0YW/Assignment-8-BOOK-COVER-mockup-DESIGN-jpg.jpg",
        "https://i.ibb.co/cKvZynL8/Assignment-8-BOOK-COVER-mockup-DESIGN.jpg",
        "https://i.ibb.co/wZ3RLfPZ/Assignment-8-BOOK-COVER-DESIGN.jpg"
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

  const folders = allFolders;

  useEffect(() => {
    if (activeFolder) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeFolder]);

  return (
    <section className={`py-24 ${preview ? 'bg-slate-950' : 'bg-slate-950 pt-32 min-h-screen'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Graphic Design</h2>
            <p className="text-slate-400 max-w-xl">Explore my design categories. Click on any folder to view the complete gallery.</p>
          </div>
          {preview && (
            <Link to="/graphic-design" className="text-white flex items-center gap-2 hover:text-slate-300 transition-colors group">
              View All Designs <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
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
              className={`group relative overflow-hidden rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)] cursor-pointer ${preview ? 'md:col-span-1 md:row-span-1' : folder.span}`}
            >
              <img 
                src={folder.coverImage} 
                alt={folder.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity group-hover:opacity-100"></div>
              
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

// --- OrbitingNode (for About section) ---
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

// --- About Detailed (For About Page) ---
const AboutDetailed = () => {
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
    <section ref={containerRef} className="h-[200vh] relative bg-slate-950 pt-20">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>

        <motion.div layout className={`w-full max-w-7xl mx-auto flex ${isAbout ? 'flex-col lg:flex-row items-center gap-16' : 'flex-col items-center justify-center'}`}>
          <motion.div layout className={`relative flex items-center justify-center ${isAbout ? 'w-full lg:w-1/2 max-w-md aspect-square' : 'w-full max-w-[600px] aspect-square'}`}>
            <AnimatePresence>
              {!isAbout && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none scale-[0.65] sm:scale-100"
                >
                  <div className="absolute w-[440px] h-[440px] rounded-full border border-blue-500/30 border-dashed shadow-[0_0_50px_rgba(59,130,246,0.1)]"></div>
                  <OrbitingNode radius={220} initialAngle={0} duration={25} reverse={false} color="#9999ff" text="Pr" />
                  <OrbitingNode radius={220} initialAngle={60} duration={25} reverse={false} color="#c8a2c8" text="Ae" />
                  <OrbitingNode radius={220} initialAngle={120} duration={25} reverse={false} color="#ff6666" text="Da" />
                  <OrbitingNode radius={220} initialAngle={180} duration={25} reverse={false} color="#31a8ff" text="Ps" />
                  <OrbitingNode radius={220} initialAngle={240} duration={25} reverse={false} color="#ff9a00" text="Ai" />
                  <OrbitingNode radius={220} initialAngle={300} duration={25} reverse={false} color="#ff3366" text="Id" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div 
              layoutId="profile-image"
              className={`relative z-10 flex items-center justify-center ${isAbout ? 'w-full h-full' : 'w-[200px] h-[200px]'}`}
            >
              <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none"></div>
              <img 
                src="https://i.ibb.co/BVKfjpgQ/salman.jpg" 
                alt="Salman Farsi" 
                className="relative z-10 w-full h-full object-cover rounded-full border-4 border-blue-500/30 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>

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

// --- Contact Detailed (For Contact Page) ---
const ContactDetailed = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject || 'Project Inquiry');
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:mdsalmanfarsi096@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-24 bg-slate-950 pt-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
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
                  <p className="text-lg text-blue-50">mdsalmanfarsi096@gmail.com</p>
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
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-blue-950/40 backdrop-blur-md border border-blue-800/50 p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-blue-200/70">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-blue-950/50 border border-blue-800/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-blue-200/70">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-blue-950/50 border border-blue-800/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-blue-200/70">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-blue-950/50 border border-blue-800/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Project Inquiry"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-blue-200/70">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-blue-950/50 border border-blue-800/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                  required
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

// --- Pricing ---
const Pricing = () => {
  const plans = [
    {
      name: "Basic Editing",
      price: "$50",
      duration: "per video",
      description: "Perfect for YouTube vlogs and simple social media content.",
      features: ["Up to 5 minutes", "Basic color grading", "Standard transitions", "1 Revision"],
      recommended: false
    },
    {
      name: "Pro Motion & Edits",
      price: "$150",
      duration: "per video",
      description: "Advanced editing with motion graphics and cinematic effects.",
      features: ["Up to 15 minutes", "Advanced color grading", "Motion graphics & text", "Sound design & mixing", "3 Revisions"],
      recommended: true
    },
    {
      name: "Complete Branding",
      price: "$300",
      duration: "per project",
      description: "Full graphic design and video package for your brand.",
      features: ["Logo & Brand Identity", "Social Media Kit", "Promo Video (60s)", "Source Files Included", "Unlimited Revisions"],
      recommended: false
    }
  ];

  return (
    <section className="py-32 bg-slate-950 min-h-screen relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Pricing Plans</h2>
          <p className="text-blue-200/70 max-w-2xl mx-auto text-lg">Choose the perfect package for your creative needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index} 
              className={`relative rounded-3xl p-8 backdrop-blur-md border ${plan.recommended ? 'bg-blue-900/40 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 'bg-slate-900/40 border-slate-800'}`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Recommended
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-blue-400">{plan.price}</span>
                <span className="text-slate-400 ml-2">{plan.duration}</span>
              </div>
              <p className="text-slate-300 mb-8 h-12">{plan.description}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className={`block w-full text-center py-3 rounded-xl font-medium transition-colors ${plan.recommended ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}>
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = () => {
  return (
    <footer className="py-8 border-t border-blue-900/50 bg-blue-950 text-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-blue-200/60 text-sm">
          © {new Date().getFullYear()} Salman Farsi. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a href="https://www.behance.net/salmanfarsi62" target="_blank" rel="noopener noreferrer" className="text-blue-200/60 hover:text-white transition-colors">Behance</a>
          <a href="https://www.instagram.com/salmanfarsi096?igsh=c29mc3ppNXV6NG42" target="_blank" rel="noopener noreferrer" className="text-blue-200/60 hover:text-white transition-colors">Instagram</a>
          <a href="https://www.linkedin.com/in/salmanfarsi096" target="_blank" rel="noopener noreferrer" className="text-blue-200/60 hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

// --- Home Page ---
const Home = () => {
  return (
    <main>
      <Hero />
      <Showreel />
      <VideoPortfolio preview={true} />
      <DesignPortfolio preview={true} />
      <AboutDetailed />
      <ContactDetailed />
    </main>
  );
};

// --- ScrollToTop Component ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- App Component ---
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-slate-800 selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video-editing" element={<VideoPortfolio preview={false} />} />
          <Route path="/graphic-design" element={<DesignPortfolio preview={false} />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<AboutDetailed />} />
          <Route path="/contact" element={<ContactDetailed />} />
        </Routes>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </div>
    </Router>
  );
}
