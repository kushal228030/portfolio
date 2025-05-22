import { useState, useEffect } from 'react';
import { Trophy, Award, Medal, ChevronRight, Star, Calendar, Users, Target, X } from 'lucide-react';

// Custom animation hooks and components (simulating Framer Motion behavior)
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

const SpringButton = ({ children, onClick, className }) => {
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <button
      className={`transform transition-all duration-150 ${
        isPressed ? 'scale-95' : 'scale-100 hover:scale-105'
      } ${className}`}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const FloatingCard = ({ children, index, onHover, isHovered, onClick }) => {
  return (
    <div
      className={`relative cursor-pointer transform transition-all duration-500 ease-out ${
        isHovered
          ? 'translate-y-[-12px] scale-105 rotate-1'
          : 'translate-y-0 scale-100 rotate-0'
      }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};

const PulseIcon = ({ Icon, size, className, isHovered }) => {
  return (
    <div className={`relative ${className}`}>
      <Icon 
        size={size} 
        strokeWidth={2}
        className={`transform transition-all duration-300 ${
          isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
        }`}
      />
      {isHovered && (
        <div className="absolute inset-0 animate-ping">
          <Icon size={size} strokeWidth={1} className="opacity-30" />
        </div>
      )}
    </div>
  );
};

const StaggeredContainer = ({ children, className }) => {
  return (
    <div className={className}>
      {children.map((child, index) =>
        <AnimatedDiv key={index} delay={index * 150}>
          {child}
        </AnimatedDiv>
      )}
    </div>
  );
};

export default function Achievements() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const achievements = [
    {
      position: "1st",
      title: "College Hackathon Champion",
      description: "Led a team to develop an AI-powered fitness platform that delivers personalized health insights through real-time analytics.",
      detailedDescription: "Competed against 30+ teams over 24 hours. Built a full-stack application using React and machine learning algorithms. Won $12,000 prize and gained recognition from industry leaders.",
      bgClass: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      icon: Trophy,
      year: "2025",
      category: "Technology",
      participants: "30+ teams",
      skills: ["React", "AI/ML", "Leadership", "Full-Stack Development"]
    },
    {
      position: "1st",
      title: "Collegiate Debate Champion",
      description: "Distinguished as the top debater among 30+ participants, demonstrating exceptional critical thinking and persuasive communication.",
      detailedDescription: "Regional championship covering policy debate format. Defeated seasoned competitors through rigorous research, strategic argumentation, and compelling delivery.",
      bgClass: "from-purple-50 to-purple-100",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      icon: Award,
      year: "2024",
      category: "Communication",
      participants: "30+ debaters",
      skills: ["Public Speaking", "Research", "Critical Thinking", "Persuasion"]
    },
    {
      position: "2nd",
      title: "Mathematics Competition",
      description: "Created a complex geometric origami model applying advanced mathematical principles, showcasing innovative problem-solving abilities.",
      detailedDescription: "National-level competition requiring integration of topology, geometry, and creative design. Project demonstrated practical application of theoretical mathematics.",
      bgClass: "from-green-50 to-green-100",
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      icon: Medal,
      year: "2024",
      category: "Mathematics",
      participants: "100+ students",
      skills: ["Mathematical Modeling", "Geometry", "Creative Problem Solving", "Design"]
    }
  ];

  const openModal = (achievement) => {
    setSelectedAchievement(achievement);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedAchievement(null), 300);
  };

  const ModalComponent = ({ achievement, isVisible, onClose }) => {
    if (!achievement) return null;

    return (
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isVisible ? 'bg-black bg-opacity-50 backdrop-blur-sm' : 'bg-black bg-opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      >
        <div 
          className={`bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-hidden transform transition-all duration-500 ease-out ${
            isVisible 
              ? 'scale-100 opacity-100 translate-y-0 rotate-0' 
              : 'scale-90 opacity-0 translate-y-8 rotate-1'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 p-6 flex justify-between items-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {achievement.title}
            </h3>
            <SpringButton
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
            >
              <X size={24} />
            </SpringButton>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-96">
            <AnimatedDiv className="flex items-center gap-4 mb-6" delay={100}>
              <div className={`w-16 h-16 ${achievement.iconBg} rounded-full flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-50"></div>
                <PulseIcon 
                  Icon={achievement.icon} 
                  size={28} 
                  className={achievement.iconColor}
                  isHovered={true}
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${achievement.iconColor} ${achievement.iconBg} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-20"></div>
                    <span className="relative">{achievement.position} Place</span>
                  </span>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <Calendar size={16} />
                    {achievement.year}
                  </span>
                </div>
                <p className="text-gray-600">{achievement.category}</p>
              </div>
            </AnimatedDiv>

            <div className="space-y-6">
              <AnimatedDiv delay={200}>
                <h4 className="font-semibold text-gray-800 mb-2">Overview</h4>
                <p className="text-gray-600 leading-relaxed">{achievement.detailedDescription}</p>
              </AnimatedDiv>

              <AnimatedDiv delay={300}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-100 to-transparent opacity-50 rounded-full transform translate-x-8 -translate-y-8"></div>
                    <div className="flex items-center gap-2 mb-2 relative">
                      <Users size={18} className="text-gray-500" />
                      <span className="font-medium text-gray-700">Competition Scale</span>
                    </div>
                    <p className="text-gray-600 relative">{achievement.participants}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-100 to-transparent opacity-50 rounded-full transform translate-x-8 -translate-y-8"></div>
                    <div className="flex items-center gap-2 mb-2 relative">
                      <Target size={18} className="text-gray-500" />
                      <span className="font-medium text-gray-700">Category</span>
                    </div>
                    <p className="text-gray-600 relative">{achievement.category}</p>
                  </div>
                </div>
              </AnimatedDiv>

              <AnimatedDiv delay={400}>
                <h4 className="font-semibold text-gray-800 mb-3">Key Skills Demonstrated</h4>
                <div className="flex flex-wrap gap-2">
                  {achievement.skills.map((skill, index) => (
                    <AnimatedDiv
                      key={index}
                      delay={450 + index * 50}
                      className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-full text-sm font-medium relative overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 hover:opacity-30 transition-opacity duration-200"></div>
                      <span className="relative">{skill}</span>
                    </AnimatedDiv>
                  ))}
                </div>
              </AnimatedDiv>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section id="achievements" className="py-20 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative">
          <AnimatedDiv className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 text-blue-600 font-medium mb-4 relative">
              <Star size={20} className="animate-pulse" />
              <span className="tracking-wider">RECOGNITION</span>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-20 blur-sm"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Notable Achievements
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm opacity-50"></div>
            </div>
            <p className="mt-6 text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Recognition for excellence in technology, communication, and problem-solving throughout my academic journey.
            </p>
          </AnimatedDiv>
          
          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <FloatingCard
                key={index}
                index={index}
                onHover={setHoveredIndex}
                isHovered={hoveredIndex === index}
                onClick={() => openModal(achievement)}
              >
                <div className={`relative z-10 bg-white rounded-xl p-8 shadow-lg border border-slate-100 h-full transform transition-all duration-300 hover:shadow-2xl overflow-hidden`}>
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${achievement.bgClass} opacity-0 hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="absolute top-0 right-0 bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-20"></div>
                    <span className="relative">{achievement.year}</span>
                  </div>
                  
                  <div className="flex justify-center mb-6 relative">
                    <div className={`relative w-20 h-20 ${achievement.iconBg} rounded-full flex items-center justify-center transform transition-all duration-500 overflow-hidden`}>
                      <div className="absolute inset-0 bg-white rounded-full transform scale-[0.85]"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-30 rounded-full"></div>
                      <div className={`relative z-10 ${achievement.iconColor}`}>
                        <PulseIcon 
                          Icon={achievement.icon} 
                          size={32} 
                          isHovered={hoveredIndex === index}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4 flex justify-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${achievement.iconColor} ${achievement.iconBg} transition-all duration-300 relative overflow-hidden ${hoveredIndex === index ? 'scale-105' : ''}`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 hover:opacity-30 transition-opacity duration-200"></div>
                      <span className="relative">{achievement.position} Place</span>
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-center mb-3 text-slate-800 transition-colors duration-300 relative">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-slate-600 text-center leading-relaxed mb-4 relative">
                    {achievement.description}
                  </p>

                  <div className="text-center relative">
                    <span className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-all duration-300 text-sm hover:scale-105">
                      Learn More
                      <ChevronRight 
                        size={16} 
                        className={`ml-1 transition-transform duration-300 ${hoveredIndex === index ? 'translate-x-1' : ''}`} 
                      />
                    </span>
                  </div>
                </div>
                
                {/* Enhanced floating shadow */}
                {hoveredIndex === index && (
                  <div 
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 to-purple-400 opacity-20 blur-xl transform scale-110 animate-pulse"
                    style={{ zIndex: -1 }}
                  ></div>
                )}
              </FloatingCard>
            ))}
          </StaggeredContainer>
          
          <AnimatedDiv className="text-center mt-12" delay={600}>
            <SpringButton
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl relative overflow-hidden"
              onClick={() => console.log('View all achievements')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative flex items-center">
                View All Achievements
                <ChevronRight size={20} className="ml-2" />
              </span>
            </SpringButton>
          </AnimatedDiv>
        </div>
      </section>

      {/* Enhanced Modal with animations */}
      <ModalComponent 
        achievement={selectedAchievement} 
        isVisible={modalVisible}
        onClose={closeModal}
      />
    </>
  );
}
