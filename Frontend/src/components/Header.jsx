import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ExternalLink, Download, FileText } from 'lucide-react';
export default function Header({ activeSection, scrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

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
        { name: 'View Resume', action: 'view', icon: <FileText size={14} /> },
        { name: 'Download PDF', action: 'download', icon: <Download size={14} /> }
      ]
    }
  ];

  // Track scroll position for header styling changes
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when window resizes to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
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

  // Close resume modal when escape key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && showResumeModal) {
        setShowResumeModal(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [showResumeModal]);

  // Handle resume actions
  const handleResumeAction = (action) => {
    setResumeDropdownOpen(false);
    
    if (action === 'view') {
      setShowResumeModal(true);
    } else if (action === 'download') {
      // Create a download link for the resume
      const link = document.createElement('a');
      link.href = "/KushalGuptaResume.pdf"; // Fixed path to resume
      link.download = 'Kushal_Gupta_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Hover animation for navigation items
  const navItemClasses = (isActive) => `
    relative px-3 py-2 rounded-lg font-medium transition-all duration-300
    ${isActive 
      ? 'text-blue-600 bg-blue-50 shadow-sm' 
      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'}
    after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 
    after:h-0.5 after:bg-blue-600 after:transform after:-translate-x-1/2
    after:transition-all after:duration-300
    ${isActive ? 'after:w-1/2' : 'hover:after:w-3/4'}
  `;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="relative group"
          >
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:via-indigo-700 group-hover:to-purple-700 transition-all duration-300">
                Kushal
              </span>
              <span className="text-2xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors duration-300">
                &nbsp;Gupta
              </span>
            </div>
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </a>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navigationItems.map((item) => (
            <div key={item.name} className="relative">
              {item.type === 'dropdown' ? (
                <div className="resume-dropdown relative">
                  <button
                    onClick={() => setResumeDropdownOpen(!resumeDropdownOpen)}
                    className={`flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                      activeSection === item.name.toLowerCase() 
                        ? 'text-blue-600 bg-blue-50 shadow-sm' 
                        : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                    } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 
                    after:h-0.5 after:bg-blue-600 after:transform after:-translate-x-1/2
                    after:transition-all after:duration-300
                    ${activeSection === item.name.toLowerCase() ? 'after:w-1/2' : 'hover:after:w-3/4'}`}
                    aria-expanded={resumeDropdownOpen}
                  >
                    <span className="mr-1">{item.icon}</span>
                    {item.name}
                    <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${resumeDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown menu with enhanced styling */}
                  {resumeDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-slate-100 transform transition-all duration-200 origin-top-right">
                      {item.options.map((option, index) => (
                        <button 
                          key={index}
                          onClick={() => handleResumeAction(option.action)}
                          className="flex items-center w-full px-4 py-2 text-left text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                        >
                          <span className="mr-2">{option.icon}</span>
                          {option.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => scrollToSection(item.name.toLowerCase())}
                  className={`flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeSection === item.name.toLowerCase() 
                      ? 'text-blue-600 bg-blue-50 shadow-sm' 
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                    } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 
                    after:h-0.5 after:bg-blue-600 after:transform after:-translate-x-1/2
                    after:transition-all after:duration-300
                    ${activeSection === item.name.toLowerCase() ? 'after:w-1/2' : 'hover:after:w-3/4'}`}
                >
                  <span className="mr-1 hidden lg:inline">{item.icon}</span>
                  {item.name}
                </button>
              )}
            </div>
          ))}
          
          {/* Call to action button with enhanced styling */}
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            className="ml-4 relative group overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-medium px-5 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md before:absolute before:inset-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-300 before:ease-out before:z-0 hover:before:scale-x-100 hover:text-blue-600"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-indigo-700">Hire Me</span>
          </a>
        </nav>
      </div>
      
      {/* Mobile Navigation Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      
      {/* Mobile Navigation Panel */}
      <div 
        className={`md:hidden fixed top-0 right-0 bottom-0 w-72 bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        <div className="flex justify-between items-center p-5 border-b border-slate-100">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Kushal Gupta
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="py-4">
            {navigationItems.map((item, index) => (
              <div key={item.name}>
                {item.type === 'dropdown' ? (
                  <div>
                    <button
                      onClick={() => setResumeDropdownOpen(!resumeDropdownOpen)}
                      className="flex items-center justify-between w-full px-5 py-3 text-left text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-blue-600">{item.icon}</span>
                        {item.name}
                      </div>
                      <ChevronDown size={16} className={`transition-transform duration-300 ${resumeDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {resumeDropdownOpen && (
                      <div className="bg-slate-50 px-3 py-2">
                        {item.options.map((option, optIndex) => (
                          <button 
                            key={optIndex}
                            onClick={() => handleResumeAction(option.action)}
                            className="flex items-center w-full px-6 py-2 text-left text-slate-600 hover:text-blue-600 transition-colors"
                          >
                            <span className="mr-2">{option.icon}</span>
                            {option.name}
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
                    className={`w-full flex items-center px-5 py-3 text-left transition-all duration-200 ${
                      activeSection === item.name.toLowerCase() 
                        ? 'text-blue-600 bg-blue-50 font-medium border-l-4 border-blue-600' 
                        : 'text-slate-700 hover:bg-slate-50 border-l-4 border-transparent hover:border-slate-200'
                    }`}
                  >
                    <span className="mr-3 text-blue-600">{item.icon}</span>
                    {item.name}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-slate-100">          
          <button
            onClick={() => {
              scrollToSection('contact');
              setMobileMenuOpen(false);
            }}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-medium py-3 rounded-lg text-center shadow-sm hover:shadow transition-shadow duration-300"
          >
            Hire Me
          </button>
        </div>
      </div>

      {/* Resume Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-slate-800">Resume</h3>
              <button 
                onClick={() => setShowResumeModal(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <iframe 
                src="/KushalGuptaResume.pdf" 
                className="w-full h-full min-h-[70vh]" 
                title="Kushal Gupta Resume"
              />
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <a
                href="/KushalGuptaResume.pdf"
                download="Kushal_Gupta_Resume.pdf"
                className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download size={16} />
                Download
              </a>
              <button
                onClick={() => setShowResumeModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
