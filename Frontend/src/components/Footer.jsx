import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, ArrowUp, Heart } from 'lucide-react';

export default function Footer() {
  const [visible, setVisible] = useState(false);
  
  // Control visibility of scroll-to-top button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16 relative overflow-hidden">
      {/* Animated background elements using Tailwind */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-40 -right-20 w-60 h-60 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-cyan-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Top section with scroll to top button */}
        <div className={`flex justify-end mb-8 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={scrollToTop}
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-90"
            aria-label="Scroll to top"
          >
            <ArrowUp size={22} />
          </button>
        </div>
        
        {/* Main content section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Personal info */}
          <div className="opacity-0 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Kushal Gupta
            </h2>
            <p className="text-slate-200 mb-4 font-medium">Computer Science Graduate & Full-Stack Developer</p>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Passionate about creating efficient, intuitive web solutions using cutting-edge technologies.
              Turning complex problems into elegant, user-friendly applications.
            </p>
          </div>
          
          {/* Contact links */}
          <div className="opacity-0 animate-fadeIn animation-delay-200">
            <h3 className="text-lg font-semibold mb-5 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center group transition-transform duration-300 hover:translate-x-1">
                <div className="bg-slate-700 p-2 rounded-full mr-3 group-hover:bg-blue-600 transition-colors duration-300">
                  <Mail size={18} className="text-slate-300 group-hover:text-white" />
                </div>
                <a href="mailto:kushalgupta8424@gmail.com" className="text-slate-300 hover:text-blue-400 transition-colors duration-300">
                  kushalgupta8424@gmail.com
                </a>
              </li>
              
              <li className="flex items-center group transition-transform duration-300 hover:translate-x-1">
                <div className="bg-slate-700 p-2 rounded-full mr-3 group-hover:bg-blue-600 transition-colors duration-300">
                  <Phone size={18} className="text-slate-300 group-hover:text-white" />
                </div>
                <a href="tel:+918424813828" className="text-slate-300 hover:text-blue-400 transition-colors duration-300">
                  +91 8424813828
                </a>
              </li>
            </ul>
          </div>
          
          {/* Social links */}
          <div className="opacity-0 animate-fadeIn animation-delay-400">
            <h3 className="text-lg font-semibold mb-5 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Connect
            </h3>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://github.com/kushal228030" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-lg transition-all duration-300 border border-slate-700 hover:border-slate-600 shadow-md hover:-translate-y-1 active:translate-y-0"
              >
                <Github size={20} className="mr-2 text-slate-300" />
                <span>GitHub</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/kushal-gupta-21ab92325" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-lg transition-all duration-300 border border-slate-700 hover:border-slate-600 shadow-md hover:-translate-y-1 active:translate-y-0"
              >
                <Linkedin size={20} className="mr-2 text-slate-300" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright section */}
        <div className="mt-12 pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center opacity-0 animate-fadeIn animation-delay-800">
          <p className="text-slate-400 text-sm mb-4 md:mb-0 flex items-center">
            &copy; {new Date().getFullYear()} Kushal Gupta. All rights reserved.
            <span className="inline-flex ml-2 text-pink-500 animate-pulse">
              <Heart size={16} fill="currentColor" />
            </span>
          </p>
          
          <div className="text-slate-500 text-xs flex flex-col md:flex-row items-center">
            <span className="mb-2 md:mb-0 md:mr-4">Designed and built with React & Tailwind CSS</span>
            <span className="flex items-center px-3 py-1 bg-slate-800 rounded-full text-slate-400">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></span>
              Powered by Nodemailer
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
