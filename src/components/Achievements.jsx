import { useState } from 'react';
import { Trophy, Award, Medal } from 'lucide-react';

export default function Achievements() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const achievements = [
    {
      position: "1st",
      title: "College Hackathon Champion",
      description: "Led a team to develop an AI-powered fitness platform that delivers personalized health insights through real-time analytics.",
      bgClass: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      icon: Trophy,
      year: "2023"
    },
    {
      position: "1st",
      title: "Collegiate Debate Champion",
      description: "Distinguished as the top debater among 30+ participants, demonstrating exceptional critical thinking and persuasive communication.",
      bgClass: "from-purple-50 to-purple-100",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      icon: Award,
      year: "2022"
    },
    {
      position: "2nd",
      title: "Mathematics Competition",
      description: "Created a complex geometric origami model applying advanced mathematical principles, showcasing innovative problem-solving abilities.",
      bgClass: "from-green-50 to-green-100",
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      icon: Medal,
      year: "2022"
    }
  ];

  return (
    <section id="achievements" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16 text-center">
          <p className="text-blue-600 font-medium mb-2">RECOGNITION</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Notable Achievements</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          <p className="mt-6 text-slate-600 max-w-2xl mx-auto">
            Recognition for excellence in technology, communication, and problem-solving throughout my academic journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className={`relative z-10 bg-white rounded-xl p-8 shadow-lg border border-slate-100 h-full transform transition-all duration-300 ${hoveredIndex === index ? 'translate-y-[-8px]' : ''}`}
              >
                <div className="absolute top-0 right-0 bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  {achievement.year}
                </div>
                
                <div className="flex justify-center mb-6">
                  <div className={`relative w-20 h-20 ${achievement.iconBg} rounded-full flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-white rounded-full transform scale-[0.85]"></div>
                    <div className={`relative z-10 ${achievement.iconColor}`}>
                      <achievement.icon size={32} strokeWidth={2} />
                    </div>
                  </div>
                </div>
                
                <div className="mb-4 flex justify-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${achievement.iconColor} ${achievement.iconBg}`}>
                    {achievement.position} Place
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-center mb-3 text-slate-800">
                  {achievement.title}
                </h3>
                
                <p className="text-slate-600 text-center leading-relaxed">
                  {achievement.description}
                </p>
              </div>
              
              {/* Decorative background element */}
              <div 
                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${achievement.bgClass} transform transition-all duration-300 ${hoveredIndex === index ? 'scale-[1.03] blur-sm' : 'scale-100'}`} 
                style={{ zIndex: 0 }}
              ></div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300">
            View All Achievements
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}