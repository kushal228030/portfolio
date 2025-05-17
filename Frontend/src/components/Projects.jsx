import { useState } from 'react';
import { ChevronRight, ExternalLink, Github, ArrowRight, Calendar } from 'lucide-react';

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const projects = [
    {
      title: "Brain Tumor Detection",
      description: "Developed an advanced mobile application utilizing React Native (Expo) and a CNN-based deep learning model to accurately identify brain tumors from MRI scans with 97% accuracy.",
      bgClass: "bg-gradient-to-r from-blue-500 to-indigo-700",
      iconColor: "text-blue-600",
      date: "March 2024",
      category: "AI/Healthcare",
      features: [
        "Containerized with Docker and deployed to Hugging Face for scalable inference",
        "Engineered Flask API backend for efficient real-time predictions",
        "Designed intuitive mobile interface focused on medical professional usability"
      ],
     links: [
  {
    label: "Brain Tumor API",
    url: "https://Kushal2125-BrainTumorDetection.hf.space/",
    bgClass: "bg-blue-100 text-blue-800",
    icon: ExternalLink
  },
  {
    label: "Lung Cancer API",
    url: "https://kushal2125-lungcancerdetection2.hf.space/",
    bgClass: "bg-blue-100 text-blue-800",
    icon: ExternalLink
  }
]
    },
    {
      title: "Fitness Analytics Platform",
      description: "Architected a comprehensive full-stack fitness tracking web application for monitoring health metrics, analyzing workout performance, and achieving personalized fitness goals.",
      bgClass: "bg-gradient-to-r from-green-500 to-teal-700",
      iconColor: "text-green-600",
      date: "January 2024",
      category: "Full-Stack/ML",
      features: [
        "Implemented supervised learning algorithms for data-driven workout recommendations",
        "Engineered custom nutrition and exercise planning based on user analytics",
        "Optimized cloud deployment on Render.com for reliable performance at scale"
      ],
      links: [
        {
          label: "Model Repository",
          url: "https://syntaxsquad-n7kl.onrender.com",
          bgClass: "bg-green-100 text-green-800",
          icon: Github
        }
      ]
    },
    {
      title: "Safarnama Travel Platform",
      description: "Designed and deployed a scalable MERN-stack travel platform with comprehensive booking capabilities, user authentication, and administrative functionality.",
      bgClass: "bg-gradient-to-r from-purple-500 to-pink-700",
      iconColor: "text-purple-600",
      date: "October 2023",
      category: "Full-Stack/MERN",
      features: [
        "Engineered advanced filtering system with multi-parameter search optimization",
        "Implemented secure JWT authentication with role-based access control",
        "Integrated automated email notification system using Nodemailer"
      ],
      links: [
        {
          label: "Live Deployment",
          url: "https://safarnamadeploy-1.onrender.com/",
          bgClass: "bg-purple-100 text-purple-800",
          icon: ExternalLink
        }
      ]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-14">
          <p className="text-blue-600 font-semibold text-sm mb-2">PORTFOLIO</p>
          <h2 className="text-4xl font-bold text-slate-800">Featured Projects</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`h-48 ${project.bgClass} p-6 flex flex-col justify-between relative overflow-hidden`}>
                <div className="flex justify-between items-start">
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                    {project.category}
                  </span>
                  <span className="flex items-center text-white/80 text-xs">
                    <Calendar size={12} className="mr-1" />
                    {project.date}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white relative z-10">{project.title}</h3>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-slate-700 mb-5 font-medium leading-relaxed text-sm">
                  {project.description}
                </p>
                
                <div className="mb-6 flex-grow">
                  <h4 className="font-semibold text-slate-900 mb-3 text-sm">Key Features:</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <ChevronRight size={16} className={`${project.iconColor} mr-1 mt-1 flex-shrink-0`} />
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                  {project.links.map((link, idx) => (
                    <a 
                      key={idx}
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`text-xs ${link.bgClass} px-3 py-1.5 rounded-full flex items-center hover:shadow-md transition-all duration-200`}
                    >
                      {link.icon && <link.icon size={12} className="mr-1" />} {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
