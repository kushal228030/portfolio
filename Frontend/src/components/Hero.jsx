import { useState, useEffect, useRef } from "react";
import { ChevronRight, Github, Linkedin, Mail } from "lucide-react";
import pp from "../Assests/ProfilePicture.png"

export default function Hero({ scrollToSection }) {
  const [typedText, setTypedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showElements, setShowElements] = useState({
    badge: false,
    title: false,
    typing: false,
    description: false,
    buttons: false,
    socials: false,
    image: false
  });
  
  const heroRef = useRef(null);
  const animationTimeouts = useRef([]);
  const fullText = "Computer Science Graduate & Full-Stack Developer";

  // Clear all timeouts helper
  const clearAllTimeouts = () => {
    animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
    animationTimeouts.current = [];
  };

  // Reset animations
  const resetAnimations = () => {
    setTypedText("");
    setShowElements({
      badge: false,
      title: false,
      typing: false,
      description: false,
      buttons: false,
      socials: false,
      image: false
    });
  };

  // Start sequential animations with improved timing
  const startAnimations = () => {
    clearAllTimeouts();
    resetAnimations();
    
    const timeouts = [
      setTimeout(() => setShowElements(prev => ({ ...prev, badge: true })), 100),
      setTimeout(() => setShowElements(prev => ({ ...prev, title: true })), 300),
      setTimeout(() => setShowElements(prev => ({ ...prev, image: true })), 500),
      setTimeout(() => setShowElements(prev => ({ ...prev, typing: true })), 700),
      setTimeout(() => setShowElements(prev => ({ ...prev, description: true })), 1200),
      setTimeout(() => setShowElements(prev => ({ ...prev, buttons: true })), 1500),
      setTimeout(() => setShowElements(prev => ({ ...prev, socials: true })), 1800)
    ];
    
    animationTimeouts.current = timeouts;
  };

  // Typing animation with improved speed
  useEffect(() => {
    if (showElements.typing && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 60); // Faster typing speed
      return () => clearTimeout(timeout);
    }
  }, [typedText, showElements.typing]);

  // Scroll trigger and sequential animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            startAnimations();
          } else {
            setIsVisible(false);
            clearAllTimeouts();
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      observer.disconnect();
      clearAllTimeouts();
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-32 md:py-40"
      aria-label="Hero section introducing Kushal Gupta"
    >
      {/* Animated Background shapes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div 
          className={`absolute top-1/4 right-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse transition-all duration-1500 ${
            isVisible ? 'scale-100 opacity-30' : 'scale-0 opacity-0'
          }`}
        ></div>
        <div 
          className={`absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse transition-all duration-1500 delay-300 ${
            isVisible ? 'scale-100 opacity-25' : 'scale-0 opacity-0'
          }`}
        ></div>
        <div 
          className={`absolute top-20 left-1/3 w-56 h-56 bg-purple-50 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse transition-all duration-1500 delay-600 ${
            isVisible ? 'scale-100 opacity-20' : 'scale-0 opacity-0'
          }`}
        ></div>
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Text content */}
          <div className="lg:w-3/5">
            {/* Animated Badge */}
            <div 
              className={`mb-4 inline-flex items-center bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm select-none transition-all duration-600 ${
                showElements.badge ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
              }`}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Available for freelance, internships & full-time positions
            </div>

            {/* Animated Title */}
            <h1
              className={`text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 bg-clip-text text-transparent drop-shadow-md transition-all duration-800 ${
                showElements.title ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
              }`}
              tabIndex={0}
            >
              Hi, I'm Kushal Gupta
            </h1>

            {/* Animated Typing Effect */}
            <div 
              className={`h-8 mb-6 transition-all duration-600 ${
                showElements.typing ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`} 
              aria-live="polite" 
              aria-atomic="true"
            >
              <h2 className="text-xl md:text-2xl text-slate-700 font-semibold">
                {typedText}
                <span className={`inline-block w-1 h-6 bg-blue-600 ml-1 transition-opacity duration-300 ${
                  showElements.typing ? 'animate-pulse' : 'opacity-0'
                }`} />
              </h2>
            </div>

            {/* Animated Description */}
            <p 
              className={`text-lg text-slate-600 mb-10 max-w-xl leading-relaxed drop-shadow-sm transition-all duration-600 ${
                showElements.description ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
            >
              I specialize in building modern web and mobile applications with{" "}
              <span className="text-blue-700 font-semibold">
                machine learning integration
              </span>
              , delivering intuitive interfaces and scalable backend solutions
              for complex problems.
            </p>

            {/* Animated Buttons */}
            <div 
              className={`flex flex-col sm:flex-row gap-5 mb-10 transition-all duration-600 ${
                showElements.buttons ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium py-3.5 px-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center group"
                aria-label="View my projects"
              >
                View My Projects
                <ChevronRight
                  size={18}
                  className="ml-1 transition-transform duration-300 group-hover:translate-x-2"
                />
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="border-2 border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 font-medium py-3.5 px-8 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center group"
                aria-label="Let's connect"
              >
                Let's Connect
              </button>
            </div>

            {/* Animated Social Links */}
            <div 
              className={`flex space-x-5 transition-all duration-600 ${
                showElements.socials ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
            >
              {[{
                href: "https://github.com/kushal228030",
                label: "GitHub Profile",
                icon: Github,
                delay: "delay-0"
              }, {
                href: "https://www.linkedin.com/in/kushal-gupta-21ab92325",
                label: "LinkedIn Profile",
                icon: Linkedin,
                delay: "delay-75"
              }, {
                href: "mailto:kushalgupta8424@gmail.com",
                label: "Email Contact",
                icon: Mail,
                delay: "delay-150"
              }].map(({ href, label, icon: Icon, delay }, index) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-center w-12 h-12 rounded-lg bg-white shadow-md text-slate-700 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 hover:rotate-3 ${
                    showElements.socials ? `animate-pulse ${delay}` : ''
                  }`}
                  aria-label={label}
                >
                  <Icon size={22} className="transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Animated Profile Image */}
          <div className="md:w-2/5 flex justify-center relative">
            <div 
              className={`relative transition-all duration-800 ${
                showElements.image ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-95'
              }`}
            >
              {/* Enhanced Glow Layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-3xl opacity-40 scale-110 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-50"></div>

              {/* Image Container */}
              <div className="bg-white p-4 rounded-full shadow-2xl relative z-10 hover:shadow-2xl transition-shadow duration-500">
                <div className="relative inline-block group cursor-pointer">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 opacity-60 blur-lg group-hover:opacity-80 transition-all duration-500 animate-spin-slow"></div>
                  <img
                    src={pp}
                    alt="Kushal Gupta profile picture"
                    className="relative rounded-full w-52 h-52 md:w-80 md:h-80 object-cover border-4 border-white shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-2"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Animated decorative corner icon with subtle bounce */}
              <div 
                className={`absolute -bottom-3 -right-3 bg-white p-3 rounded-full shadow-lg z-20 transition-all duration-600 hover:scale-110 hover:rotate-12 ${
                  showElements.image ? 'animate-pulse' : 'scale-0'
                }`}
              >
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full p-2.5 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                    className="transition-transform duration-300 hover:scale-110"
                  >
                    <path d="M16 18l6-6-6-6"></path>
                    <path d="M8 6l-6 6 6 6"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Scroll Down Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-500 select-none transition-opacity duration-800 delay-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ position: 'absolute', transform: 'translateX(-50%)' }}
        aria-hidden="true"
      >
        <div className="text-xs font-semibold mb-2 tracking-wider">Scroll Down</div>
        <div className="animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-current"
          >
            <path d="M12 5v14"></path>
            <path d="M19 12l-7 7-7-7"></path>
          </svg>
        </div>
      </div>

      {/* Custom styles for slower spin animation */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
}
