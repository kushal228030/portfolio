import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Download, ExternalLink, Menu as MenuIcon } from 'lucide-react'; // Kept MenuIcon for clarity if Menu is used elsewhere

export default function Header({ activeSection, scrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);
  const mobileNavRef = useRef(null);
  
  // Updated navigationItems without icons
  const navigationItems = [
    { name: 'Home', type: 'link' },
    { name: 'About', type: 'link' },
    { name: 'Skills', type: 'link' },
    { name: 'Projects', type: 'link'},
    { name: 'Education', type: 'link'},
    { name: 'Achievements', type: 'link'},
    { 
      name: 'Resume', 
      type: 'dropdown',
      options: [
        { name: 'View Resume', action: 'view' }, // Icon removed
        { name: 'Download PDF', action: 'download' } // Icon removed
      ]
    }
  ];

  // Track scroll position for header styling changes
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when window resizes (to lg breakpoint now)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) { // Changed from 768 (md) to 1024 (lg)
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resumeDropdownOpen && !event.target.closest('.resume-dropdown')) {
        setResumeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [resumeDropdownOpen]);

  // Close mobile menu when escape key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [mobileMenuOpen]);

  // Handle resume actions
  const handleResumeAction = (action) => {
    setMobileMenuOpen(false); // Also close mobile menu if action is from there
    setResumeDropdownOpen(false);
    
    if (action === 'view') {
      window.open("/KushalGuptaResume.pdf", "_blank");
    } else if (action === 'download') {
      const link = document.createElement('a');
      link.href = "/KushalGuptaResume.pdf";
      link.download = 'Kushal_Gupta_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-md py-3' 
          : 'bg-transparent py-5' // Cleaner initial state
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo with animated effect */}
        <div className="flex items-center">
          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
              setMobileMenuOpen(false);
            }}
            className="relative group"
          >
            <div className="flex items-center">
              <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity duration-300">
                Kushal
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 group-hover:text-slate-700 transition-colors duration-300">
                &nbsp;Gupta
              </span>
            </div>
            <span className="absolute -bottom-1.5 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-400 ease-out"></span>
          </a>
        </div>
        
        {/* Mobile menu button (for < lg) */}
        <button 
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} className="transition-transform duration-300 rotate-90 scale-110" /> : <MenuIcon size={24} className="transition-transform duration-300" />}
        </button>
        
        {/* Desktop Navigation (for lg+) */}
        <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3">
          {navigationItems.map((item) => (
            <div key={item.name} className="relative">
              {item.type === 'dropdown' ? (
                <div className="resume-dropdown relative">
                  <button
                    onClick={() => setResumeDropdownOpen(!resumeDropdownOpen)}
                    className={`flex items-center px-4 py-2.5 rounded-md font-medium text-base transition-all duration-300 group ${
                      activeSection === item.name.toLowerCase() 
                        ? 'text-blue-600 bg-blue-50 shadow-sm' 
                        : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                    }`}
                    aria-expanded={resumeDropdownOpen}
                  >
                    {item.name}
                    <ChevronDown size={18} className={`ml-1.5 transition-transform duration-300 ${resumeDropdownOpen ? 'rotate-180' : ''} group-hover:text-blue-500`} />
                  </button>
                  
                  {resumeDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                      {item.options.map((option) => (
                        <button 
                          key={option.name}
                          onClick={() => handleResumeAction(option.action)}
                          className="flex items-center justify-between w-full px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 first:rounded-t-md last:rounded-b-md group"
                        >
                          {option.name}
                          {option.action === 'download' ? <Download size={16} className="opacity-50 group-hover:opacity-100 text-slate-500 group-hover:text-blue-500 transition-all" /> : <ExternalLink size={16} className="opacity-50 group-hover:opacity-100 text-slate-500 group-hover:text-blue-500 transition-all" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    scrollToSection(item.name.toLowerCase());
                    setResumeDropdownOpen(false); // Close dropdown if open
                  }}
                  className={`px-4 py-2.5 rounded-md font-medium text-base transition-all duration-300 ${
                    activeSection === item.name.toLowerCase() 
                      ? 'text-blue-600 bg-blue-50 shadow-sm' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                  }`}
                >
                  {item.name}
                </button>
              )}
            </div>
          ))}
          
          <a 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
              setResumeDropdownOpen(false);
            }}
            className="ml-3 relative group overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold px-5 py-2.5 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <span className="relative z-10 flex items-center">
              Hire Me
              <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </nav>
      </div>
      
      {/* Mobile Navigation Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      
      {/* Mobile Navigation Panel */}
      <div 
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-white border-l border-slate-200 shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col h-screen`} // Use h-screen for full height
      >
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Navigation
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        <div 
          ref={mobileNavRef}
          className="flex-1 overflow-y-auto py-4"
          style={{ overscrollBehavior: 'contain' }}
        >
          <nav className="px-4 space-y-2">
            {navigationItems.map((item, idx) => (
              <div 
                key={item.name} 
                className={`transition-all duration-300 transform ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} 
                style={{ transitionDelay: `${idx * 60}ms` }} // Slightly increased delay
              >
                {item.type === 'dropdown' ? (
                  <div className="rounded-lg border border-slate-200 bg-slate-50/50">
                    <button 
                      onClick={() => setResumeDropdownOpen(!resumeDropdownOpen)}
                      className="flex items-center justify-between w-full p-4 font-semibold text-slate-700 hover:bg-slate-100 rounded-t-lg"
                      aria-expanded={resumeDropdownOpen}
                    >
                      {item.name}
                      <ChevronDown size={20} className={`transition-transform duration-300 ${resumeDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {resumeDropdownOpen && (
                      <div className="px-2 pb-2 pt-1 border-t border-slate-200 space-y-1 animate-in fade-in duration-200">
                        {item.options.map((option) => (
                          <button
                            key={option.name}
                            onClick={() => handleResumeAction(option.action)}
                            className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-slate-600 hover:bg-white hover:text-blue-600 rounded-md transition-colors duration-200 group"
                          >
                            {option.name}
                            {option.action === 'download' ? <Download size={16} className="opacity-60 group-hover:opacity-100 text-slate-500 group-hover:text-blue-500 transition-all" /> : <ExternalLink size={16} className="opacity-60 group-hover:opacity-100 text-slate-500 group-hover:text-blue-500 transition-all" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      scrollToSection(item.name.toLowerCase());
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left p-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-between group ${
                      activeSection === item.name.toLowerCase()
                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-blue-600'
                    }`}
                  >
                    {item.name}
                    <svg 
                      className={`w-5 h-5 transition-all duration-300 ${activeSection === item.name.toLowerCase() ? 'text-blue-500 opacity-100 translate-x-0' : 'text-slate-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'}`} 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-200 mt-auto sticky bottom-0 bg-white">
          <button
            onClick={() => {
              scrollToSection('contact');
              setMobileMenuOpen(false);
            }}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold py-3.5 text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.02]"
          >
            Hire Me
          </button>
        </div>
      </div>
    </header>
  );
}
