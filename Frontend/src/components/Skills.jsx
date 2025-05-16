import { useState } from 'react';
import { Shield, Code, Database, Wrench, Award } from 'lucide-react';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');
  
  const skillCategories = [
    {
      id: 'programming',
      title: "Programming Languages",
      icon: <Code className="w-6 h-6 text-blue-600" />,
      colorClass: "text-blue-600",
      bgClass: "bg-blue-100",
      textClass: "text-blue-800",
      borderClass: "border-blue-200",
      skills: ['Java', 'Python', 'React Native']
    },
    {
      id: 'web',
      title: "Web Development",
      icon: <Code className="w-6 h-6 text-green-600" />,
      colorClass: "text-green-600",
      bgClass: "bg-green-100",
      textClass: "text-green-800",
      borderClass: "border-green-200",
      skills: ['HTML', 'CSS', 'JavaScript', 'ReactJS', 'Express']
    },
    {
      id: 'databases',
      title: "Databases",
      icon: <Database className="w-6 h-6 text-purple-600" />,
      colorClass: "text-purple-600",
      bgClass: "bg-purple-100",
      textClass: "text-purple-800",
      borderClass: "border-purple-200",
      skills: ['SQL', 'MongoDB']
    },
    {
      id: 'tools',
      title: "Tools & Platforms",
      icon: <Wrench className="w-6 h-6 text-orange-600" />,
      colorClass: "text-orange-600",
      bgClass: "bg-orange-100",
      textClass: "text-orange-800",
      borderClass: "border-orange-200",
      skills: ['NetBeans', 'Jupyter Notebook', 'Kaggle', 'Google Colab', 'VS Code', 'Visual Studio']
    }
  ];

  const certifications = [
    {
      name: 'Cyber Security (Microsoft)',
      icon: <Shield className="w-5 h-5 text-blue-600" />
    },
    {
      name: 'Robotic Process Automation (RPA)',
      icon: <Shield className="w-5 h-5 text-blue-600" />
    },
    {
      name: 'Advanced Cyber Security (Microsoft)',
      icon: <Shield className="w-5 h-5 text-blue-600" />
    },
    {
      name: 'Unity Game Development',
      icon: <Shield className="w-5 h-5 text-blue-600" />
    },
    {
      name: 'Tableau Data Visualization',
      icon: <Shield className="w-5 h-5 text-blue-600" />
    },
    {
      name: 'Ruby on Rails',
      icon: <Shield className="w-5 h-5 text-blue-600" />
    }
  ];

  const filteredCategories = activeTab === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.id === activeTab);

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-800">Professional Skills</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and professional certifications
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex justify-center mb-12 flex-wrap gap-2">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'all' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Skills
          </button>
          {skillCategories.map(category => (
            <button 
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === category.id 
                  ? `${category.bgClass} ${category.textClass} shadow-md` 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredCategories.map((category, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-md border ${category.borderClass} p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-lg ${category.bgClass} mr-4`}>
                  {category.icon}
                </div>
                <h3 className={`text-2xl font-bold ${category.colorClass}`}>
                  {category.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <span 
                    key={skill} 
                    className={`${category.bgClass} ${category.textClass} px-4 py-2 rounded-lg text-sm font-medium border ${category.borderClass}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Certifications */}
        <div className="mt-16">
          <div className="flex items-center justify-center mb-10">
            <Award className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-2xl font-bold text-slate-800">Certifications</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-sm border border-blue-100 p-5 flex items-center hover:shadow-md transition-all duration-300"
              >
                <div className="mr-4 p-2 bg-blue-50 rounded-lg">
                  {cert.icon}
                </div>
                <span className="text-slate-700 font-medium">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}