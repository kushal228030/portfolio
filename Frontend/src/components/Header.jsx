import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Download, ExternalLink, Menu as MenuIcon } from 'lucide-react';

export default function Header({ activeSection, scrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopResumeDropdownOpen, setDesktopResumeDropdownOpen] = useState(false); // For desktop
  const [mobileResumeAccordionOpen, setMobileResumeAccordionOpen] = useState(false); // For mobile/tablet panel
  
  const mobileNavRef = useRef(null); // For potential future use, like trapping focus
  const desktopResumeRef = useRef(null); // Ref for desktop dropdown to handle click outside

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
        { name: 'View Resume', action: 'view' },
        { name: 'Download PDF', action: 'download' }
      ]
    }
  ];

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false); // This will trigger the effect below to close accordion
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Close DESKTOP dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopResumeDropdownOpen && desktopResumeRef.current && !desktopResumeRef.current.contains(event.target)) {
        setDesktopResumeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [desktopResumeDropdownOpen]);

  // Close menus on Escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        if (mobileMenuOpen) {
          setMobileMenuOpen(false); // Triggers effect to close mobile accordion
        } else if (desktopResumeDropdownOpen) {
          setDesktopResumeDropdownOpen(false);
        }
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [mobileMenuOpen, desktopResumeDropdownOpen]);

  // Ensure mobile resume accordion closes when the mobile menu itself closes
  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileResumeAccordionOpen(false);
    }
  }, [mobileMenuOpen]);

  const handleResumeAction = (action) => {
    setDesktopResumeDropdownOpen(false);
    setMobileResumeAccordionOpen(false); 
    setMobileMenuOpen(false); // Important: Close mobile menu after action

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleDesktopNavItemClick = (itemName) => {
    scrollToSection(itemName.toLowerCase());
    setDesktopResumeDropdownOpen(false); // Close resume dropdown if open
  };
  
  const handleMobileNavItemClick = (itemName) => {
    scrollToSection(itemName.toLowerCase());
    closeMobileMenu(); // Closes menu and accordion via useEffect
  };


  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              handleDesktopNavItemClick('home'); // Use generalized click handler
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
        
        {/* Mobile menu button (< lg) */}
        <button 
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} className="transition-transform duration-300 rotate-90 scale-110" /> : <MenuIcon size={24} className="transition-transform duration-300" />}
        </button>
        
        {/* Desktop Navigation (lg+) */}
        <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3">
          {navigationItems.map((item) => (
            <div key={item.name} className="relative">
              {item.type === 'dropdown' ? (
                <div className="resume-dropdown relative" ref={desktopResumeRef}>
                  <button
                    onClick={() => setDesktopResumeDropdownOpen(!desktopResumeDropdownOpen)}
                    className={`flex items-center px-4 py-2.5 rounded-md font-medium text-base transition-all duration-300 group ${
                      activeSection === item.name.toLowerCase() 
                        ? 'text-blue-600 bg-blue-50 shadow-sm' 
                        : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                    }`}
                    aria-expanded={desktopResumeDropdownOpen}
                  >
                    {item.name}
                    <ChevronDown size={18} className={`ml-1.5 transition-transform duration-300 ${desktopResumeDropdownOpen ? 'rotate-180' : ''} group-hover:text-blue-500`} />
                  </button>
                  
                  {desktopResumeDropdownOpen && (
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
                  onClick={() => handleDesktopNavItemClick(item.name)}
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
              handleDesktopNavItemClick('contact');
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
        onClick={closeMobileMenu}
      />
      
      {/* Mobile Navigation Panel */}
      <div 
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-white border-l border-slate-200 shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col h-screen`}
        ref={mobileNavRef}
      >
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Navigation
          </div>
          <button 
            onClick={closeMobileMenu}
            className="p-2 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        <div 
          className="flex-1 overflow-y-auto py-4"
          style={{ overscrollBehavior: 'contain' }}
        >
          <nav className="px-4 space-y-2">
            {navigationItems.map((item, idx) => (
              <div 
                key={item.name} 
                className={`transition-all duration-300 transform ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} 
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                {item.type === 'dropdown' ? (
                  <div className="rounded-lg border border-slate-200 bg-slate-50/50">
                    <button 
                      onClick={() => setMobileResumeAccordionOpen(!mobileResumeAccordionOpen)}
                      className="flex items-center justify-between w-full p-4 font-semibold text-slate-700 hover:bg-slate-100 rounded-t-lg transition-colors"
                      aria-expanded={mobileResumeAccordionOpen}
                    >
                      {item.name}
                      <ChevronDown size={20} className={`transition-transform duration-300 ${mobileResumeAccordionOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileResumeAccordionOpen && (
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
                    onClick={() => handleMobileNavItemClick(item.name)}
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
              handleMobileNavItemClick('contact');
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
