import { useState, useEffect, useRef } from 'react';
import { GraduationCap, Calendar, Award, Building } from 'lucide-react';

export default function Education() {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [timelineVisible, setTimelineVisible] = useState(false);
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  const educationData = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Mulund College of Commerce (Autonomous)",
      year: "2022 – 2025",
      grade: "CGPA: 9.79",
      description: "Specialized in Computer Science with a focus on web application development,AI and ML. Completed coursework in advanced algorithms, data structures, and full-stack development.",
      color: "blue"
    },
    {
      degree: "Higher Secondary Education (XII)",
      institution: "Satish Pradhan Dnyanasadhana College",
      year: "2020 – 2022",
      grade: "Percentage: 66%",
      description: "Focused on Science and Mathematics. Participated in variouscompetitions and workshops to enhance practical knowledge.",
      color: "indigo"
    }
  ];

  useEffect(() => {
    let timeouts = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === sectionRef.current) {
              setTimelineVisible(true);
            } else {
              const index = itemRefs.current.indexOf(entry.target);
              if (index !== -1) {
                const timeout = setTimeout(() => {
                  setVisibleItems(prev => new Set([...prev, index]));
                }, index * 200);
                timeouts.push(timeout);
              }
            }
          } else {
            // Only reset if element is significantly out of view to prevent shaking
            const rect = entry.target.getBoundingClientRect();
            const isCompletelyOutOfView = rect.bottom < 0 || rect.top > window.innerHeight;
            
            if (isCompletelyOutOfView) {
              if (entry.target === sectionRef.current) {
                setTimelineVisible(false);
              } else {
                const index = itemRefs.current.indexOf(entry.target);
                if (index !== -1) {
                  setVisibleItems(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(index);
                    return newSet;
                  });
                }
              }
            }
          }
        });
      },
      { 
        threshold: [0, 0.1, 0.5],
        rootMargin: '-5% 0px -5% 0px'
      }
    );

    // Cleanup function to clear timeouts
    const cleanup = () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      timeouts = [];
    };

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    itemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cleanup();
      observer.disconnect();
    };
  }, []);

  return (
    <section id="education" className="py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header Animation */}
        <div 
          ref={sectionRef}
          className={`mb-16 text-center transform transition-all duration-1000 ${
            timelineVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <p className="text-blue-600 font-medium mb-2 animate-pulse">ACADEMIC BACKGROUND</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
          <div 
            className={`h-1 bg-blue-600 mx-auto transition-all duration-1000 delay-300 ${
              timelineVisible ? 'w-24' : 'w-0'
            }`}
          ></div>
          <p className={`mt-6 text-slate-600 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
            timelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            My academic journey has equipped me with a strong foundation in computer science principles and practical application development.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Animated Timeline line */}
            <div 
              className={`absolute left-6 md:left-1/2 transform md:-translate-x-1/2 top-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full hidden md:block transition-all duration-2000 ease-out ${
                timelineVisible ? 'bottom-0 opacity-100' : 'bottom-full opacity-0'
              }`}
            ></div>
            
            {educationData.map((edu, index) => (
              <div 
                key={index} 
                ref={el => itemRefs.current[index] = el}
                className={`mb-12 relative transition-all duration-800 ease-out ${
                  index % 2 === 0 ? 'md:pr-8 md:ml-auto md:mr-auto md:text-right' : 'md:pl-8 md:ml-auto md:mr-auto'
                } ${
                  visibleItems.has(index) 
                    ? 'translate-y-0 opacity-100' 
                    : `${index % 2 === 0 ? 'translate-x-20' : '-translate-x-20'} translate-y-10 opacity-0`
                }`}
              >
                {/* Animated Timeline dot */}
                <div 
                  className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-md border-4 border-blue-500 z-10 items-center justify-center hidden md:flex transition-all duration-500 ${
                    visibleItems.has(index) 
                      ? 'scale-100 rotate-0' 
                      : 'scale-0 rotate-180'
                  }`}
                  style={{ transitionDelay: `${index * 200 + 400}ms` }}
                >
                  <GraduationCap 
                    className={`text-blue-600 transition-all duration-300 ${
                      visibleItems.has(index) ? 'scale-100' : 'scale-0'
                    }`} 
                    size={20} 
                  />
                </div>
                
                <div 
                  className={`relative ml-12 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  } bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 group hover:shadow-2xl hover:-translate-y-2 ${
                    visibleItems.has(index) ? 'scale-100' : 'scale-95'
                  }`}
                >
                  {/* Animated Color bar */}
                  <div 
                    className={`h-2 w-full bg-gradient-to-r transition-all duration-700 ${
                      edu.color === 'blue' 
                        ? 'from-blue-500 to-blue-600' 
                        : 'from-indigo-500 to-indigo-600'
                    } ${
                      visibleItems.has(index) ? 'translate-x-0' : '-translate-x-full'
                    }`}
                    style={{ transitionDelay: `${index * 200 + 600}ms` }}
                  ></div>
                  
                  <div className="p-8">
                    {/* Animated header */}
                    <div 
                      className={`flex items-center mb-4 transition-all duration-500 ${
                        visibleItems.has(index) ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 200 + 700}ms` }}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 md:hidden transition-all duration-300 ${
                        edu.color === 'blue' ? 'bg-blue-100' : 'bg-indigo-100'
                      }`}>
                        <GraduationCap 
                          className={`transition-all duration-300 ${
                            edu.color === 'blue' ? 'text-blue-600' : 'text-indigo-600'
                          }`} 
                          size={20} 
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                        {edu.degree}
                      </h3>
                    </div>
                    
                    {/* Animated details grid */}
                    <div 
                      className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 transition-all duration-500 ${
                        visibleItems.has(index) ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 200 + 800}ms` }}
                    >
                      <div className="flex items-center group/item">
                        <Building className="text-slate-400 mr-2 transition-colors duration-300 group-hover/item:text-blue-500" size={16} />
                        <p className="text-slate-700">{edu.institution}</p>
                      </div>
                      
                      <div className="flex items-center group/item">
                        <Calendar className="text-slate-400 mr-2 transition-colors duration-300 group-hover/item:text-blue-500" size={16} />
                        <p className="text-slate-600">{edu.year}</p>
                      </div>
                    </div>
                    
                    {/* Animated grade badge */}
                    <div 
                      className={`inline-block mb-4 transition-all duration-500 ${
                        visibleItems.has(index) ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-5 opacity-0 scale-90'
                      }`}
                      style={{ transitionDelay: `${index * 200 + 900}ms` }}
                    >
                      <div className={`font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                        edu.color === 'blue' 
                          ? 'bg-blue-50 text-blue-800 hover:bg-blue-100' 
                          : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
                      }`}>
                        <div className="flex items-center">
                          <Award 
                            className={`mr-2 transition-all duration-300 ${
                              edu.color === 'blue' ? 'text-blue-600' : 'text-indigo-600'
                            }`} 
                            size={16} 
                          />
                          {edu.grade}
                        </div>
                      </div>
                    </div>
                    
                    {/* Animated description */}
                    <p 
                      className={`text-slate-600 leading-relaxed transition-all duration-500 ${
                        visibleItems.has(index) ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 200 + 1000}ms` }}
                    >
                      {edu.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
