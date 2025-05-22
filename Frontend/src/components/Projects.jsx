import { useState, useEffect } from 'react';
import { ChevronRight, ExternalLink, Github, ArrowRight, Calendar, Star, Code, Zap, Eye } from 'lucide-react';

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

const FloatingProjectCard = ({ children, index, onHover, isHovered }) => {
  return (
    <div
      className={`transform transition-all duration-500 ease-out ${
        isHovered
          ? 'translate-y-[-16px] scale-105 rotate-1'
          : 'translate-y-0 scale-100 rotate-0'
      }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};

const AnimatedBackground = ({ className, isHovered }) => {
  return (
    <div className={`absolute inset-0 ${className} transition-all duration-500`}>
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-80' : 'opacity-50'}`}></div>
      {isHovered && (
        <>
          <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </>
      )}
    </div>
  );
};

const PulsingFeature = ({ feature, index, iconColor }) => {
  const [ref, isInView] = useInView();
  
  return (
    <li 
      ref={ref}
      className={`flex items-start transform transition-all duration-500 ${
        isInView ? 'translate-x-0 opacity-100' : 'translate-x-[-20px] opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative mr-2 mt-1">
        <ChevronRight size={16} className={`${iconColor} transition-transform duration-300 hover:scale-110`} />
      </div>
      <span className="text-slate-600 text-sm leading-relaxed">{feature}</span>
    </li>
  );
};

const AnimatedLink = ({ link, index, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <AnimatedDiv
      delay={delay}
      className="inline-block"
    >
      <a 
        href={link.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`text-xs ${link.bgClass} px-3 py-2 rounded-full flex items-center transition-all duration-300 hover:shadow-lg hover:scale-105 transform relative overflow-hidden`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-20' : ''}`}></div>
        <div className="relative flex items-center">
          {link.icon && (
            <link.icon 
              size={12} 
              className={`mr-1 transition-transform duration-300 ${isHovered ? 'rotate-12 scale-110' : ''}`} 
            />
          )}
          <span>{link.label}</span>
        </div>
      </a>
    </AnimatedDiv>
  );
};

const StaggeredContainer = ({ children, className }) => {
  return (
    <div className={className}>
      {children.map((child, index) =>
        <AnimatedDiv key={index} delay={index * 200}>
          {child}
        </AnimatedDiv>
      )}
    </div>
  );
};

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const projects = [
    {
      title: "Brain Tumor Detection",
      description: "Developed an advanced mobile application utilizing React Native (Expo) and a CNN-based deep learning model to accurately identify brain tumors from MRI scans with 97% accuracy.",
      bgClass: "bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700",
      iconColor: "text-blue-600",
      date: "March 2025",
      category: "AI/Healthcare",
      categoryIcon: Zap,
      stats: { accuracy: "97%", deployment: "Docker", api: "Flask" },
      features: [
        "Containerized with Docker and deployed to Hugging Face for scalable inference",
        "Engineered Flask API backend for efficient real-time predictions",
        "Designed intuitive mobile interface focused on medical professional usability"
      ],
      links: [
        {
          label: "Brain Tumor API",
          url: "https://Kushal2125-BrainTumorDetection.hf.space/",
          bgClass: "bg-blue-100 text-blue-800 hover:bg-blue-200",
          icon: ExternalLink
        },
        {
          label: "Lung Cancer API",
          url: "https://kushal2125-lungcancerdetection2.hf.space/",
          bgClass: "bg-blue-100 text-blue-800 hover:bg-blue-200",
          icon: ExternalLink
        }
      ]
    },
    {
      title: "Fitness Analytics Platform",
      description: "Architected a comprehensive full-stack fitness tracking web application for monitoring health metrics, analyzing workout performance, and achieving personalized fitness goals.",
      bgClass: "bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700",
      iconColor: "text-green-600",
      date: "January 2025",
      category: "Full-Stack/ML",
      categoryIcon: Code,
      stats: { Frontend: "React", ml: "Supervised", deployment: "Render" },
      features: [
        "Implemented supervised learning algorithms for data-driven workout recommendations",
        "Engineered custom nutrition and exercise planning based on user analytics",
        "Optimized cloud deployment on Render.com for reliable performance at scale"
      ],
      links: [
        {
          label: "Live Api",
          url: "https://syntaxsquad-n7kl.onrender.com",
          bgClass: "bg-green-100 text-green-800 hover:bg-green-200",
          icon: ExternalLink
        }
      ]
    },
    {
      title: "Safarnama Travel Platform",
      description: "Designed and deployed a scalable MERN-stack travel platform with comprehensive booking capabilities, user authentication, and administrative functionality.",
      bgClass: "bg-gradient-to-br from-purple-500 via-pink-600 to-rose-700",
      iconColor: "text-purple-600",
      date: "May 2025",
      category: "Full-Stack/MERN",
      categoryIcon: Star,
      stats: { auth: "JWT", stack: "MERN", features: "Advanced" },
      features: [
        "Engineered advanced filtering system with multi-parameter search optimization",
        "Implemented secure JWT authentication with role-based access control",
        "Integrated automated email notification system using Nodemailer"
      ],
      links: [
        {
          label: "Live Deployment",
          url: "https://safarnamadeploy-1.onrender.com/",
          bgClass: "bg-purple-100 text-purple-800 hover:bg-purple-200",
          icon: ExternalLink
        }
      ]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-green-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative">
        <AnimatedDiv className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm mb-4 relative">
            <Code size={20} className="animate-pulse" />
            <span className="tracking-wider">PORTFOLIO</span>
            <div className="absolute -inset-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-20 blur-md"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm opacity-60"></div>
          </div>
          <p className="mt-6 text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Innovative solutions combining cutting-edge technology with real-world impact
          </p>
        </AnimatedDiv>
        
        <StaggeredContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <FloatingProjectCard
              key={index}
              index={index}
              onHover={setHoveredIndex}
              isHovered={hoveredIndex === index}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col relative">
                {/* Floating glow effect */}
                {hoveredIndex === index && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl blur opacity-30 animate-pulse"></div>
                )}
                
                <div className={`h-52 ${project.bgClass} p-6 flex flex-col justify-between relative overflow-hidden`}>
                  <AnimatedBackground className={project.bgClass} isHovered={hoveredIndex === index} />
                  
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20 flex items-center gap-1">
                        <project.categoryIcon size={12} />
                        {project.category}
                      </div>
                    </div>
                    <span className="flex items-center text-white/90 text-xs bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
                      <Calendar size={12} className="mr-1" />
                      {project.date}
                    </span>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className={`text-2xl font-bold text-white mb-3 transition-transform duration-300 ${hoveredIndex === index ? 'scale-105' : ''}`}>
                      {project.title}
                    </h3>
                    
                    {/* Project stats */}
                    <div className="flex gap-2 flex-wrap">
                      {Object.entries(project.stats).map(([key, value], idx) => (
                        <span key={idx} className="text-xs bg-white/15 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col relative">
                  <AnimatedDiv delay={100}>
                    <p className="text-slate-700 mb-6 font-medium leading-relaxed text-sm">
                      {project.description}
                    </p>
                  </AnimatedDiv>
                  
                  <div className="mb-6 flex-grow">
                    <AnimatedDiv delay={200}>
                      <h4 className="font-semibold text-slate-900 mb-4 text-sm flex items-center gap-2">
                        <Eye size={16} className={project.iconColor} />
                        Key Features:
                      </h4>
                    </AnimatedDiv>
                    <ul className="space-y-3">
                      {project.features.map((feature, idx) => (
                        <PulsingFeature 
                          key={idx} 
                          feature={feature} 
                          index={idx} 
                          iconColor={project.iconColor}
                        />
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
                    {project.links.map((link, idx) => (
                      <AnimatedLink 
                        key={idx} 
                        link={link} 
                        index={idx}
                        delay={300 + idx * 100}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </FloatingProjectCard>
          ))}
        </StaggeredContainer>
        
        <AnimatedDiv className="text-center mt-16" delay={800}>
            <a 
              href="https://github.com/kushal228030" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <button className="inline-flex items-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 hover:scale-105 shadow-lg hover:shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
                  <Github size={20} className="mr-2" />
                  View All Projects
                  <ArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </a>
          </AnimatedDiv>

      </div>
    </section>
  );
}
