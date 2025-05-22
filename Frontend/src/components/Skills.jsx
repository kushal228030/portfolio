import { useState, useEffect } from 'react';
import { Shield, Code, Database, Wrench, Award, Star, Zap, Target, CheckCircle } from 'lucide-react';

// Custom animation hooks and components
const useInView = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return [setRef, isInView];
};

const AnimatedDiv = ({ children, className, delay = 0, ...props }) => {
  const [ref, isInView] = useInView();
  
  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${
        isInView
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-12 opacity-0 scale-95'
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

const FloatingSkillCard = ({ children, delay = 0, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, isInView] = useInView();
  
  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${
        isInView
          ? `translate-y-0 opacity-100 ${isHovered ? 'scale-105 -translate-y-2 rotate-1' : 'scale-100'}`
          : 'translate-y-12 opacity-0 scale-95'
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {/* Floating glow effect */}
      {isHovered && (
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-xl blur opacity-25 animate-pulse"></div>
      )}
    </div>
  );
};

const AnimatedSkillTag = ({ skill, index, colorClasses, delay = 0 }) => {
  const [ref, isInView] = useInView();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <span
      ref={ref}
      className={`${colorClasses.bgClass} ${colorClasses.textClass} px-4 py-2 rounded-lg text-sm font-medium border ${colorClasses.borderClass} cursor-pointer relative overflow-hidden transform transition-all duration-500 ${
        isInView 
          ? `translate-y-0 opacity-100 ${isHovered ? 'scale-110 -translate-y-1' : 'scale-100'}` 
          : 'translate-y-4 opacity-0'
      }`}
      style={{
        transitionDelay: `${delay + index * 100}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-30' : ''}`}></div>
      <span className="relative flex items-center gap-1">
        {isHovered && <Zap size={12} className="animate-pulse" />}
        {skill}
      </span>
    </span>
  );
};

const PulsingIcon = ({ Icon, className, isActive }) => {
  return (
    <div className="relative">
      <Icon className={`transition-all duration-300 ${isActive ? 'scale-110 rotate-12' : ''} ${className}`} />
      {isActive && (
        <div className="absolute inset-0 animate-ping">
          <Icon className={`${className} opacity-30`} />
        </div>
      )}
    </div>
  );
};

const TabButton = ({ active, onClick, children, colorClasses }) => {
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 transform ${
        isPressed ? 'scale-95' : active ? 'scale-105' : 'scale-100 hover:scale-105'
      } ${
        active
          ? colorClasses 
            ? `${colorClasses.bgClass} ${colorClasses.textClass} shadow-lg`
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
          : 'bg-white text-slate-700 hover:bg-slate-50 shadow-md border border-slate-200'
      } relative overflow-hidden`}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 hover:opacity-20 transition-opacity duration-300`}></div>
      <span className="relative">{children}</span>
    </button>
  );
};

const CertificationCard = ({ cert, index, delay = 0 }) => {
  const [ref, isInView] = useInView();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      ref={ref}
      className={`bg-white rounded-xl shadow-sm border border-blue-100 p-5 flex items-center relative overflow-hidden transform transition-all duration-500 ${
        isInView 
          ? `translate-y-0 opacity-100 ${isHovered ? 'scale-105 shadow-lg -translate-y-1' : 'scale-100'}` 
          : 'translate-y-8 opacity-0'
      }`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}></div>
      
      <div className="mr-4 p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg relative">
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}></div>
        <PulsingIcon Icon={Shield} className="w-5 h-5 text-blue-600 relative" isActive={isHovered} />
      </div>
      
      <div className="relative flex items-center gap-2">
        <span className="text-slate-700 font-medium">{cert.name}</span>
        {isHovered && <CheckCircle size={16} className="text-green-500 animate-pulse" />}
      </div>
    </div>
  );
};

const StaggeredGrid = ({ children, className, baseDelay = 0 }) => {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <div key={index} style={{ animationDelay: `${baseDelay + index * 150}ms` }}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  
  const skillCategories = [
    {
      id: 'programming',
      title: "Programming Languages",
      icon: Code,
      colorClass: "text-blue-600",
      bgClass: "bg-blue-100",
      textClass: "text-blue-800",
      borderClass: "border-blue-200",
      gradientClass: "from-blue-500 to-indigo-600",
      skills: ['Java', 'Python', 'React Native']
    },
    {
      id: 'web',
      title: "Web Development",
      icon: Code,
      colorClass: "text-green-600",
      bgClass: "bg-green-100",
      textClass: "text-green-800",
      borderClass: "border-green-200",
      gradientClass: "from-green-500 to-emerald-600",
      skills: ['HTML', 'CSS', 'JavaScript', 'ReactJS', 'Express']
    },
    {
      id: 'databases',
      title: "Databases",
      icon: Database,
      colorClass: "text-purple-600",
      bgClass: "bg-purple-100",
      textClass: "text-purple-800",
      borderClass: "border-purple-200",
      gradientClass: "from-purple-500 to-violet-600",
      skills: ['SQL', 'MongoDB','MySQL']
    },
    {
      id: 'tools',
      title: "Tools & Platforms",
      icon: Wrench,
      colorClass: "text-orange-600",
      bgClass: "bg-orange-100",
      textClass: "text-orange-800",
      borderClass: "border-orange-200",
      gradientClass: "from-orange-500 to-red-600",
      skills: ['NetBeans', 'Jupyter Notebook', 'Kaggle', 'Google Colab', 'VS Code', 'Visual Studio']
    }
  ];

  const certifications = [
    { name: 'Cyber Security (Microsoft)', icon: Shield },
    { name: 'Robotic Process Automation (RPA)', icon: Shield },
    { name: 'Advanced Cyber Security (Microsoft)', icon: Shield },
    { name: 'Unity Game Development', icon: Shield },
    { name: 'Tableau Data Visualization', icon: Shield },
    { name: 'Ruby on Rails', icon: Shield }
  ];

  const filteredCategories = activeTab === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.id === activeTab);

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-green-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative">
        <AnimatedDiv className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm mb-4 relative">
            <Target size={20} className="animate-pulse" />
            <span className="tracking-wider">EXPERTISE</span>
            <div className="absolute -inset-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-20 blur-md"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Professional Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm opacity-60"></div>
          </div>
          <p className="mt-6 text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise and professional certifications
          </p>
        </AnimatedDiv>
        
        {/* Enhanced Category Tabs */}
        <AnimatedDiv className="flex justify-center mb-12 flex-wrap gap-3" delay={200}>
          <TabButton 
            active={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
          >
            <div className="flex items-center gap-2">
              <Star size={16} />
              All Skills
            </div>
          </TabButton>
          {skillCategories.map(category => (
            <TabButton 
              key={category.id}
              active={activeTab === category.id}
              onClick={() => setActiveTab(category.id)}
              colorClasses={{
                bgClass: category.bgClass,
                textClass: category.textClass
              }}
            >
              <div className="flex items-center gap-2">
                <category.icon size={16} />
                {category.title}
              </div>
            </TabButton>
          ))}
        </AnimatedDiv>
        
        {/* Enhanced Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredCategories.map((category, index) => (
            <FloatingSkillCard 
              key={`${category.id}-${activeTab}`} 
              delay={300 + index * 150}
              className="relative"
            >
              <div 
                className={`bg-white rounded-xl shadow-lg border ${category.borderClass} p-6 hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradientClass} opacity-0 hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="flex items-center mb-6 relative">
                  <div className={`p-3 rounded-lg ${category.bgClass} mr-4 relative overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradientClass} opacity-0 hover:opacity-20 transition-opacity duration-300`}></div>
                    <PulsingIcon 
                      Icon={category.icon} 
                      className={`w-6 h-6 ${category.colorClass} relative`}
                      isActive={hoveredCategory === category.id}
                    />
                  </div>
                  <h3 className={`text-2xl font-bold ${category.colorClass} relative`}>
                    {category.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-3 relative">
                  {category.skills.map((skill, skillIndex) => (
                    <AnimatedSkillTag
                      key={skill}
                      skill={skill}
                      index={skillIndex}
                      colorClasses={category}
                      delay={400 + index * 150}
                    />
                  ))}
                </div>
              </div>
            </FloatingSkillCard>
          ))}
        </div>
        
        {/* Enhanced Certifications Section */}
        <AnimatedDiv className="mt-16" delay={600}>
          <div className="flex items-center justify-center mb-10 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-20 blur-lg"></div>
            <Award className="w-8 h-8 text-blue-600 mr-3 relative animate-pulse" />
            <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent relative">
              Certifications
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <CertificationCard
                key={index}
                cert={cert}
                index={index}
                delay={700 + index * 100}
              />
            ))}
          </div>
        </AnimatedDiv>
      </div>
    </section>
  );
}
