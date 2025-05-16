import { useState, useEffect } from 'react';
import { ChevronRight, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import pf from "../Assests/ProfilePicture.png";

export default function Hero({ scrollToSection }) {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Computer Science Graduate & Full-Stack Developer';
  
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  return (
    <section id="home" className="bg-gradient-to-br from-slate-50 via-blue-50 to-white py-28 md:py-40 relative overflow-hidden">
      {/* Enhanced decorative elements with more professional styling */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-10 right-10 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-slate-100 bg-[size:20px_20px] opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-3/5 mb-16 md:mb-0">
            <div className="mb-3 inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Available for freelance,internships & full-time positions
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              Hi, I'm Kushal Gupta
            </h1>
            
            <h2 className="text-xl md:text-2xl text-slate-700 mb-6 font-medium h-8">
              {typedText}<span className="animate-pulse">|</span>
            </h2>
            
            <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
              I specialize in building modern web and mobile applications with 
              <span className="text-blue-700 font-medium"> machine learning integration</span>, 
              delivering intuitive interfaces and scalable backend solutions for complex problems.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button 
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3.5 px-8 rounded-lg transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg group"
              >
                View My Projects 
                <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3.5 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                Let's Connect
              </button>
            </div>
            
            <div className="flex space-x-5">
              <a 
                href="https://github.com/kushal228030" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white transition-colors duration-300"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/kushal-gupta/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white transition-colors duration-300"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:kushalgupta8424@gmail.com"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white transition-colors duration-300"
                aria-label="Email Contact"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="md:w-2/5 flex justify-center relative">
            {/* Enhanced profile image styling */}
            <div className="relative">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-xl opacity-60 scale-110"></div>
              
              {/* Border with shine effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-70 animate-shine"></div>
              
              {/* Image container */}
              <div className="bg-white p-3 rounded-full shadow-xl relative z-10">
                <div className="relative inline-block group">
  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 opacity-75 blur-lg group-hover:opacity-100 transition duration-500"></div>
  <img 
    src={pf} 
    alt="Kushal Gupta" 
    className="relative rounded-full w-52 h-52 md:w-80 md:h-80 object-cover border-4 border-white shadow-xl transition-transform duration-300 group-hover:scale-105"
  />
</div>

              </div>
              
              {/* Developer icon badge */}
              <div className="absolute -bottom-3 -right-3 bg-white p-3 rounded-full shadow-lg z-20">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full p-2.5 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 18l6-6-6-6"></path>
                    <path d="M8 6l-6 6 6 6"></path>
                  </svg>
                </div>
              </div>
              
              {/* Experience badge */}
              {/* <div className="absolute top-5 -left-3 bg-white p-2 rounded-xl shadow-lg z-20">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg px-3 py-1.5 text-white text-sm font-medium">
                 Fresher
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-slate-400 animate-bounce">
        <div className="text-xs mb-2">Scroll Down</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14"></path>
          <path d="M19 12l-7 7-7-7"></path>
        </svg>
      </div>
      
      {/* Add animation for the shine effect
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shine {
          animation: shine 3s infinite;
        }
      `}</style>
    */}</section> 
  );
}