import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react';

export default function Header({ activeSection, scrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', type: 'link' },
    { name: 'About', type: 'link' },
    { name: 'Skills', type: 'link' },
    { name: 'Projects', type: 'link' },
    { name: 'Education', type: 'link' },
    { name: 'Achievements', type: 'link' }
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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' 
          : 'bg-white py-5'
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
            className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
          >
            Kushal<span className="text-slate-700"> Gupta</span>
          </a>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-700 transition-colors"
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
                    className={`flex items-center px-3 py-2 rounded-lg font-medium transition-colors duration-300 ${
                      activeSection === item.name.toLowerCase() 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                    aria-expanded={resumeDropdownOpen}
                  >
                    {item.name}
                    <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${resumeDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown menu */}
                  {resumeDropdownOpen && (
                    <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-slate-100">
                      <a 
                        href="#" 
                        className="flex items-center px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        View Resume
                      </a>
                      <a 
                        href="#" 
                        className="flex items-center px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Download PDF
                        <ExternalLink size={14} className="ml-2" />
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => scrollToSection(item.name.toLowerCase())}
                  className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
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
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            className="ml-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-5 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow"
          >
            Hire Me
          </a>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      
      <div 
        className={`md:hidden fixed top-0 right-0 bottom-0 w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-100">
          <span className="font-bold text-lg text-blue-600">Menu</span>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="py-3">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.type === 'dropdown' ? (
                  <div>
                    <button
                      onClick={() => setResumeDropdownOpen(!resumeDropdownOpen)}
                      className="flex items-center justify-between w-full px-5 py-3 text-left text-slate-700"
                    >
                      {item.name}
                      <ChevronDown size={16} className={`transition-transform duration-300 ${resumeDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {resumeDropdownOpen && (
                      <div className="bg-slate-50 px-3 py-2">
                        <a 
                          href="#" 
                          className="block px-4 py-2 text-slate-600 hover:text-blue-600"
                        >
                          View Resume
                        </a>
                        <a 
                          href="#" 
                          className="flex items-center px-4 py-2 text-slate-600 hover:text-blue-600"
                        >
                          Download PDF
                          <ExternalLink size={14} className="ml-2" />
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      scrollToSection(item.name.toLowerCase());
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full px-5 py-3 text-left transition-colors ${
                      activeSection === item.name.toLowerCase() 
                        ? 'text-blue-600 bg-blue-50 font-medium border-l-4 border-blue-600' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
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
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 rounded-lg text-center"
          >
            Hire Me
          </button>
        </div>
      </div>
    </header>
  );
}