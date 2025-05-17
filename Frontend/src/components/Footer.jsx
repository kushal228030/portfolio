import { Github, Linkedin, Mail, Phone, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
      <div className="container mx-auto px-4 md:px-8">
        {/* Top section with scroll to top button */}
        <div className="flex justify-end mb-6">
          <button 
            onClick={scrollToTop}
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-all duration-300 transform hover:scale-105"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
        
        {/* Main content section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Personal info */}
          <div>
            <h2 className="text-2xl font-bold mb-3 text-blue-400">Kushal Gupta</h2>
            <p className="text-slate-300 mb-4">Computer Science Graduate & Full-Stack Developer</p>
            <p className="text-slate-400 text-sm max-w-md">Passionate about creating efficient, intuitive web solutions using cutting-edge technologies.</p>
          </div>
          
          {/* Contact links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-slate-400" />
                <a href="mailto:kushalgupta8424@gmail.com" className="text-slate-300 hover:text-blue-400 transition-colors duration-300">
                  kushalgupta8424@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-slate-400" />
                <a href="tel:+918424813828" className="text-slate-300 hover:text-blue-400 transition-colors duration-300">
                  +91 8424813828
                </a>
              </li>
            </ul>
          </div>
          
          {/* Social links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Connect</h3>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://github.com/kushal228030" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-md transition-colors duration-300"
              >
                <Github size={18} className="mr-2" />
                <span>GitHub</span>
              </a>
              <a 
                href="www.linkedin.com/in/kushal-gupta-21ab92325" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-md transition-colors duration-300"
              >
                <Linkedin size={18} className="mr-2" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright section */}
        <div className="mt-10 pt-6 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-3 md:mb-0">
            &copy; {new Date().getFullYear()} Kushal Gupta. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs">
            Designed and built with React & Tailwind CSS and used nodemailer for Mailing System.
          </p>
        </div>
      </div>
    </footer>
  );
}
