import { useState, useEffect, useRef } from 'react';
import {
  Github, Linkedin, Mail, Phone, User, Briefcase, Newspaper, CheckCircle2, 
  Code, Database, Smartphone, Brain, Zap, Star, ArrowRight, Heart
} from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isInView, setIsInView] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" />, color: 'indigo' },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-5 h-5" />, color: 'purple' }
  ];

  const skills = [
    { name: 'Full-Stack Development', icon: <Code className="w-6 h-6" />, level: 90 },
    { name: 'Mobile Development', icon: <Smartphone className="w-6 h-6" />, level: 85 },
    { name: 'Machine Learning', icon: <Brain className="w-6 h-6" />, level: 80 },
    { name: 'Database Design', icon: <Database className="w-6 h-6" />, level: 88 }
  ];

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-20 ${
              isInView ? 'animate-float' : ''
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Dynamic Gradient Orb */}
        <div 
          className={`absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl transition-all duration-1000 ${
            isInView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: `translate(-50%, -50%) scale(${isInView ? 1 : 0})`
          }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className={`inline-block transform transition-all duration-1200 ${
            isInView ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-12 opacity-0 -rotate-6'
          }`}>
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 tracking-tight relative">
              About Me
              <div className="absolute -top-2 -right-2">
              </div>
            </h2>
          </div>
          
          <div className="relative mt-6">
            <div className={`h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full mx-auto shadow-lg transform transition-all duration-1500 delay-300 ${
              isInView ? 'w-40 opacity-100 scale-y-100' : 'w-0 opacity-0 scale-y-50'
            }`}></div>
            <div className={`absolute -top-1 left-1/2 w-3 h-3 bg-white border-2 border-indigo-500 rounded-full transform -translate-x-1/2 transition-all duration-1000 delay-800 ${
              isInView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}></div>
          </div>
          
          <p className={`mt-8 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed transform transition-all duration-1000 delay-500 ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}>
            <span className="font-semibold text-indigo-600">Computer Science Graduate</span> | 
            <span className="font-semibold text-blue-600"> Full-Stack Developer</span> | 
            <span className="font-semibold text-purple-600"> Machine Learning Enthusiast</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="w-full">
            <div className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden transform transition-all duration-1000 delay-900 hover:shadow-3xl ${
              isInView ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
            }`}>
              {/* Enhanced Tabs */}
              <div className="flex border-b border-slate-200/50 bg-gradient-to-r from-slate-50 to-blue-50/50 relative">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      relative flex items-center gap-4 px-10 py-6 font-semibold text-sm transition-all duration-500 transform group
                      ${activeTab === tab.id
                        ? `text-${tab.color}-600 bg-white shadow-lg scale-105 -translate-y-1`
                        : 'text-slate-600 hover:text-indigo-600 hover:bg-white/70 hover:scale-105'}
                      focus:outline-none focus:ring-4 focus:ring-indigo-200
                      ${isInView ? `animate-slide-in-${index === 0 ? 'left' : 'right'}` : ''}
                    `}
                    style={{
                      animationDelay: `${1100 + index * 200}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    {/* Tab Active Indicator */}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-full animate-expand-width"></div>
                    )}
                    
                    <span className={`transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 ${
                      activeTab === tab.id ? 'text-indigo-600 rotate-6' : ''
                    }`}>
                      {tab.icon}
                    </span>
                    <span className="relative">
                      {tab.label}
                      {activeTab === tab.id && (
                        <div className="absolute -top-1 -right-2 w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                      )}
                    </span>
                  </button>
                ))}
              </div>

              {/* Enhanced Content */}
              <div className="p-10 md:p-14 relative">
                {/* Content Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-32 h-32 border-2 border-indigo-300 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-24 h-24 border-2 border-blue-300 rounded-full animate-pulse"></div>
                </div>

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-12 relative z-10">
                    <div className={`transform transition-all duration-1000 ${
                      isInView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                    }`} style={{ animationDelay: '1300ms' }}>
                      <h3 className="text-4xl font-black text-slate-900 mb-6 relative inline-block">
                        Professional Profile
                        <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
                      </h3>
                    </div>

                    <div className="space-y-6">
                      {[
                        "I am a Computer Science graduate with hands-on experience in full-stack web and mobile development using the MERN stack and React Native. I'm skilled in building and deploying machine learning models via Flask APIs on Hugging Face and Render.",
                        "My focus is on delivering real-world projects with practical, user-friendly solutions. I enjoy combining technical proficiency with creative problem-solving to build applications that make a difference.",
                        "I'm passionate about staying updated with the latest technologies and continuously learning new skills to enhance my development capabilities."
                      ].map((text, index) => (
                        <p key={index} className={`text-lg text-slate-700 leading-relaxed transform transition-all duration-800 hover:text-slate-900 ${
                          isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`} style={{ animationDelay: `${1500 + index * 200}ms` }}>
                          {text}
                        </p>
                      ))}
                    </div>
                    {/* Enhanced Interests Card */}
                    <div className={`transform transition-all duration-1000 ${
                      isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`} style={{ animationDelay: '2700ms' }}>
                      <InfoCard 
                        title="Areas of Interest" 
                        items={[
                          'Full-Stack Web Development',
                          'Mobile App Development', 
                          'Machine Learning Integration',
                          'UI/UX Design Principles',
                          'API Development & Integration'
                        ]}
                        isInView={isInView}
                        delay={2900}
                      />
                    </div>
                  </div>
                )}

                {/* Experience Tab */}
                {activeTab === 'experience' && (
                  <div className="space-y-12">
                    <div className={`transform transition-all duration-1000 ${
                      isInView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                    }`} style={{ animationDelay: '1300ms' }}>
                      <h3 className="text-4xl font-black text-slate-900 mb-6 relative inline-block">
                        Work Experience
                        <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></div>
                      </h3>
                    </div>

                    <Timeline
                      entries={[
                        {
                          title: 'Fresh Graduate',
                          subtitle: 'Ready for New Opportunities',
                          description: 'Excited to begin my professional journey and contribute to innovative projects while continuing to learn and grow in the tech industry.',
                          icon: <Star className="w-5 h-5" />,
                          color: 'from-green-500 to-emerald-600'
                        },
                      ]}
                      isInView={isInView}
                    />

                    {/* Call to Action */}
                    <div className={`mt-12 p-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white text-center transform transition-all duration-1000 hover:scale-105 ${
                      isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`} style={{ animationDelay: '1800ms' }}>
                      <h4 className="text-2xl font-bold mb-4">Ready for New Challenges!</h4>
                      <p className="text-indigo-100 mb-6">
                        I'm actively seeking opportunities to contribute to meaningful projects and grow as a developer.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px) rotate(-5deg); }
          to { opacity: 1; transform: translateX(0) rotate(0deg); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px) rotate(5deg); }
          to { opacity: 1; transform: translateX(0) rotate(0deg); }
        }
        
        @keyframes expandWidth {
          from { width: 0; opacity: 0; }
          to { width: 100%; opacity: 1; }
        }
        
        @keyframes bounceIn {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(-90deg); opacity: 0.8; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes skillFill {
          from { width: 0; transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        
        .animate-float {
          animation: float var(--duration, 4s) ease-in-out infinite;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-expand-width {
          animation: expandWidth 0.6s ease-out forwards;
        }
        
        .animate-bounce-in {
          animation: bounceIn 1s ease-out forwards;
        }
        
        .animate-skill-fill {
          animation: skillFill 1.5s ease-out forwards;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
}

// Enhanced Info Card Component
function InfoCard({ title, items, isInView, delay }) {
  return (
    <div className={`bg-gradient-to-br from-white to-blue-50/50 p-8 rounded-2xl border border-blue-200/50 shadow-lg transition-all duration-700 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transform ${
      isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
    }`} style={{ animationDelay: `${delay}ms` }}>
      <h4 className="font-bold text-slate-900 text-xl mb-6 relative inline-block">
        {title}
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-transparent rounded-full"></div>
      </h4>
      <ul className="space-y-4">
        {items.map((item, idx) => (
          <li 
            key={idx} 
            className={`flex items-center gap-4 transform transition-all duration-500 hover:translate-x-3 hover:text-indigo-700 group cursor-pointer ${
              isInView ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
            }`}
            style={{ 
              animationDelay: `${delay + (idx * 150)}ms`,
              transitionDelay: `${idx * 50}ms`
            }}
          >
            <div className="relative">
              <CheckCircle2 className="w-6 h-6 text-indigo-500 transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
              <div className="absolute inset-0 w-6 h-6 bg-indigo-400 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 opacity-20"></div>
            </div>
            <span className="text-slate-700 font-medium group-hover:font-semibold transition-all duration-300">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Enhanced Timeline Component
function Timeline({ entries, isInView }) {
  return (
    <div className="space-y-12">
      {entries.map((entry, idx) => (
        <div 
          key={idx} 
          className={`relative pl-16 transform transition-all duration-1000 group ${
            isInView ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
          }`}
          style={{ animationDelay: `${1500 + (idx * 300)}ms` }}
        >
          {/* Timeline Line */}
          <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 to-purple-400"></div>
          
          {/* Timeline Node */}
          <div className={`absolute left-0 top-4 w-12 h-12 bg-gradient-to-br ${entry.color || 'from-indigo-500 to-purple-600'} rounded-2xl border-4 border-white shadow-xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 ${
            isInView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`} style={{ animationDelay: `${1700 + (idx * 300)}ms` }}>
            {entry.icon || <Briefcase className="w-6 h-6 text-white" />}
            <div className="absolute inset-0 bg-white rounded-2xl scale-0 group-hover:scale-110 transition-transform duration-300 opacity-20"></div>
          </div>
          
          {/* Content */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            <div className="mb-4">
              <h4 className={`text-2xl font-bold text-slate-900 transform transition-all duration-700 group-hover:text-indigo-600 ${
                isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`} style={{ animationDelay: `${1800 + (idx * 300)}ms` }}>
                {entry.title}
              </h4>
              <p className={`text-indigo-600 font-semibold text-lg transform transition-all duration-700 ${
                isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`} style={{ animationDelay: `${1900 + (idx * 300)}ms` }}>
                {entry.subtitle}
              </p>
            </div>
            <p className={`text-slate-700 text-lg leading-relaxed transform transition-all duration-700 group-hover:text-slate-900 ${
              isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`} style={{ animationDelay: `${2000 + (idx * 300)}ms` }}>
              {entry.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
