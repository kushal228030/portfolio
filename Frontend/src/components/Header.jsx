import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ExternalLink, Download, FileText } from 'lucide-react';

export default function Header({ activeSection, scrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);

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
      setScrolled(window.scrollY > 20);
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
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      activeSection === item.name.toLowerCase() 
                        ? 'text-blue-600 bg-blue-50 shadow-sm' 
                        : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                    aria-expanded={resumeDropdownOpen}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                    <ChevronDown size={16} className={`ml-2 transition-transform duration-300 ${resumeDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Desktop Dropdown menu */}
                  {resumeDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 transform origin-top-right animate-in fade-in scale-in-95 duration-200">
                      {item.options.map((option, index) => (
                        <button 
                          key={index}
                          onClick={() => handleResumeAction(option.action)}
                          className="flex items-center w-full px-4 py-3 text-left text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                        >
                          <span className="mr-3 text-slate-500">{option.icon}</span>
                          <span className="font-medium">{option.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => scrollToSection(item.name.toLowerCase())}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeSection === item.name.toLowerCase() 
                      ? 'text-blue-600 bg-blue-50 shadow-sm' 
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </button>
              )}
            </div>
          ))}
          
          {/* Call to action button */}
          <a 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            className="ml-4 relative group overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <span className="relative z-10">Hire Me</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </nav>
      </div>
      
      {/* Mobile Navigation Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      
      {/* Mobile Navigation Panel */}
      <div 
        className={`md:hidden fixed top-0 right-0 bottom-0 w-80 bg-white border-l border-slate-200 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Kushal Gupta
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-full hover:bg-white/80 text-slate-500 hover:text-slate-700 transition-colors duration-200"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>
        
        {/* Mobile Navigation Items */}
        <div className="flex-1 overflow-y-auto py-6 bg-white">
          <nav className="px-6 space-y-3">
            {navigationItems.map((item) => (
              item.type === 'dropdown' ? (
                <div key={item.name} className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-100">
                  <div className="text-slate-800 font-semibold flex items-center mb-4">
                    {item.name}
                  </div>
                  <div className="space-y-2">
                    {item.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          handleResumeAction(option.action);
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-slate-700 hover:bg-white hover:text-blue-600 rounded-lg transition-all duration-200 hover:shadow-md border border-transparent hover:border-blue-100"
                      >
                        <span className="mr-3 text-slate-500">{option.icon}</span>
                        <span className="font-medium">{option.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.name.toLowerCase());
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-5 py-4 rounded-xl font-medium transition-all duration-200 border ${
                    activeSection === item.name.toLowerCase()
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-md border-blue-200'
                      : 'text-slate-700 hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 hover:text-blue-600 border-transparent hover:border-blue-100 hover:shadow-sm'
                  }`}
                >
                  {item.name}
                </button>
              )
            ))}
          </nav>
        </div>
        
        {/* Mobile Footer with Hire Me Button */}
        <div className="p-6 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
          <button
            onClick={() => {
              scrollToSection('contact');
              setMobileMenuOpen(false);
            }}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
          >
            Hire Me
          </button>
        </div>
      </div>
    </header>
  );
}
