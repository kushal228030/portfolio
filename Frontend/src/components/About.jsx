import { useState, useEffect, useRef } from 'react';
import {
  Github, Linkedin, Mail, Phone, User, Briefcase, Newspaper, CheckCircle2
} from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isVisible, setIsVisible] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const sectionRef = useRef(null);
  const animationTimeout = useRef(null);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-5 h-5" /> }
  ];

  // Clear existing timeout
  const clearAnimationTimeout = () => {
    if (animationTimeout.current) {
      clearTimeout(animationTimeout.current);
    }
  };

  // Trigger animations
  const triggerAnimations = () => {
    clearAnimationTimeout();
    setAnimateCards(false);
    setAnimationKey(prev => prev + 1);
    
    animationTimeout.current = setTimeout(() => {
      setAnimateCards(true);
    }, 100);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            triggerAnimations();
          } else {
            setIsVisible(false);
            setAnimateCards(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      clearAnimationTimeout();
    };
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Trigger animations when tab changes
    triggerAnimations();
  };

  // Handle mouse enter to retrigger animations
  const handleMouseEnter = () => {
    if (isVisible) {
      triggerAnimations();
    }
  };

  return (
    <section 
      id="about" 
      className="py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden"
      onMouseEnter={handleMouseEnter}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Animated Header */}
        <div 
          ref={sectionRef}
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            About Me
          </h2>
          <div 
            className={`h-1 mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto shadow-lg transition-all duration-1000 delay-300 ${
              isVisible ? 'w-24' : 'w-0'
            }`}
          ></div>
          <p 
            className={`mt-5 text-lg text-slate-600 max-w-xl mx-auto leading-relaxed transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}
          >
            Computer Science Graduate | Full-Stack Developer | Machine Learning Enthusiast
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Card */}
          <div className="w-full">
            <div 
              className={`bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden transform transition-all duration-800 delay-700 ${
                isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
              }`}
            >
              {/* Animated Tabs */}
              <div className="flex border-b border-slate-300 bg-slate-100 relative">
                {/* Tab indicator */}
                <div 
                  className="absolute bottom-0 h-1 bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-300 ease-out"
                  style={{
                    width: `${100 / tabs.length}%`,
                    left: `${(tabs.findIndex(tab => tab.id === activeTab) * 100) / tabs.length}%`,
                  }}
                ></div>
                
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`
                      flex-1 flex items-center justify-center gap-3 px-8 py-5 font-semibold text-sm transition-all duration-300 relative group
                      ${activeTab === tab.id
                        ? 'text-indigo-600 bg-white shadow-inner transform -translate-y-1'
                        : 'text-slate-600 hover:text-indigo-600 hover:bg-white hover:-translate-y-0.5'}
                      focus:outline-indigo-500 focus:outline-2 focus:outline-offset-2
                    `}
                    aria-selected={activeTab === tab.id}
                    role="tab"
                    tabIndex={activeTab === tab.id ? 0 : -1}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <span className={`transition-transform duration-200 ${
                      activeTab === tab.id ? 'scale-110' : 'group-hover:scale-105'
                    }`}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Animated Content */}
              <div
                key={`${activeTab}-${animationKey}`}
                className="p-8 md:p-12 text-slate-700 leading-relaxed"
                role="tabpanel"
              >
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-8">
                    <h3 className="text-3xl font-bold text-slate-900 animate-slideInLeft">
                      Professional Profile
                    </h3>
                    <div className="space-y-6">
                      <p className="animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
                        I am a Computer Science graduate with hands-on experience in full-stack web and mobile development 
                        using the MERN stack and React Native. I'm skilled in building and deploying machine learning models 
                        via Flask APIs on Hugging Face and Render.
                      </p>
                      <p className="animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
                        My focus is on delivering real-world projects with practical, user-friendly solutions. I enjoy 
                        combining technical proficiency with creative problem-solving to build applications that make 
                        a difference.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                      <InfoCard 
                        title="Personal Interests" 
                        items={[
                          'Full-Stack Web Development',
                          'Mobile App Development',
                          'Machine Learning Integration',
                        ]} 
                        delay={300}
                        isVisible={animateCards}
                        animationKey={animationKey}
                      />
                    </div>
                  </div>
                )}

                {/* Experience Tab */}
                {activeTab === 'experience' && (
                  <div className="space-y-8">
                    <h3 className="text-3xl font-bold text-slate-900 animate-slideInLeft">
                      Work Experience
                    </h3>
                    <Timeline
                      entries={[
                        {
                          title: 'Fresher',
                          subtitle: '0 Years',
                          description: 'Looking forward to my first full-time opportunity.',
                        },
                      ]}
                      isVisible={animateCards}
                      animationKey={animationKey}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from { 
            opacity: 0; 
            transform: translateX(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.9) rotateY(10deg); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) rotateY(0deg); 
          }
        }
        
        @keyframes bounceIn {
          0% { 
            opacity: 0; 
            transform: scale(0.3); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.1); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-bounceIn {
          animation: bounceIn 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}

// Enhanced Info Card with animations
function InfoCard({ title, items, delay = 0, isVisible, animationKey }) {
  return (
    <div 
      key={`info-card-${animationKey}`}
      className={`bg-slate-50 p-7 rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 group ${
        isVisible ? 'animate-scaleIn' : ''
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <h4 className="font-semibold text-slate-900 text-lg mb-5 group-hover:text-indigo-600 transition-colors duration-300">
        {title}
      </h4>
      <ul className="space-y-3 text-slate-700">
        {items.map((item, idx) => (
          <li 
            key={`${item}-${animationKey}-${idx}`}
            className={`flex items-center gap-3 transition-all duration-300 hover:translate-x-2 ${
              isVisible ? 'animate-slideInLeft' : ''
            }`}
            style={{ animationDelay: `${delay + (idx * 100) + 200}ms` }}
          >
            <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0 transition-all duration-300 group-hover:text-indigo-600 group-hover:scale-110" />
            <span className="group-hover:text-slate-900 transition-colors duration-300">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Enhanced Timeline Component with animations
function Timeline({ entries, isVisible, animationKey }) {
  return (
    <div className="space-y-10">
      {entries.map((entry, idx) => (
        <div 
          key={`timeline-${animationKey}-${idx}`}
          className={`relative pl-12 border-l-4 border-indigo-300 transition-all duration-700 hover:border-indigo-500 ${
            isVisible ? 'animate-slideInUp' : ''
          }`}
          style={{ animationDelay: `${idx * 200}ms` }}
        >
          {/* Animated timeline dot */}
          <div 
            className={`absolute -left-6 top-3 bg-indigo-600 w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center transition-all duration-500 hover:scale-125 hover:shadow-xl ${
              isVisible ? 'animate-bounceIn' : ''
            }`}
            style={{ animationDelay: `${idx * 200 + 300}ms` }}
          >
            <Briefcase className="w-5 h-5 text-white transition-transform duration-300 hover:rotate-12" />
          </div>
          
          {/* Animated content */}
          <div 
            className={`mb-3 transition-all duration-500 hover:translate-x-2 ${
              isVisible ? 'animate-fadeInUp' : ''
            }`}
            style={{ animationDelay: `${idx * 200 + 400}ms` }}
          >
            <h4 className="text-2xl font-semibold text-slate-900 hover:text-indigo-600 transition-colors duration-300">
              {entry.title}
            </h4>
            <p className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors duration-300">
              {entry.subtitle}
            </p>
          </div>
          
          <p 
            className={`text-slate-700 hover:text-slate-900 transition-all duration-300 ${
              isVisible ? 'animate-fadeInUp' : ''
            }`}
            style={{ animationDelay: `${idx * 200 + 500}ms` }}
          >
            {entry.description}
          </p>
        </div>
      ))}
    </div>
  );
}
