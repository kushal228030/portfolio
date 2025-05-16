import { useState } from 'react';
import {
  Github, Linkedin, Mail, Phone, User, Briefcase, Newspaper
} from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> }];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800">About Me</h2>
          <div className="w-20 h-1 mt-3 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Computer Science Graduate | Full-Stack Developer | Machine Learning Enthusiast
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Tabs + Content */}
          <div className="w-full">
            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-slate-200 bg-slate-50">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                        : 'text-slate-600 hover:bg-white'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-800">Professional Profile</h3>
                    <p className="text-slate-700 text-lg leading-relaxed">
                      I am a Computer Science graduate with hands-on experience in full-stack web and mobile development 
                      using MERN stack and React Native. I'm skilled in building and deploying machine learning models 
                      via Flask APIs on Hugging Face and Render.
                    </p>
                    <p className="text-slate-700 text-lg leading-relaxed">
                      My focus is on delivering real-world projects with practical, user-friendly solutions. I enjoy 
                      combining technical proficiency with creative problem-solving to build applications that make 
                      a difference.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <InfoCard title="Personal Interests" items={[
                        'Full-Stack Web Development',
                        'Mobile App Development',
                        'Machine Learning Integration',
                      ]} />
                    </div>
                  </div>
                )}

                {/* Experience Tab */}
                {activeTab === 'experience' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-800">Work Experience</h3>
                    <Timeline
                      entries={[
                        {
                          title: 'Fresher',
                          subtitle: '0 Years',
                          description: 'Looking forward to my first full-time opportunity.',
                        },
                      ]}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable Info Card
function InfoCard({ title, items }) {
  return (
    <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 shadow-sm">
      <h4 className="font-semibold text-slate-800 mb-3">{title}</h4>
      <ul className="space-y-2 text-slate-700">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Reusable Timeline Component
function Timeline({ entries }) {
  return (
    <div className="space-y-6">
      {entries.map((entry, idx) => (
        <div key={idx} className="relative pl-8 border-l-2 border-blue-200">
          <div className="absolute -left-2 top-1">
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow"></div>
          </div>
          <div className="mb-2">
            <h4 className="text-xl font-semibold text-slate-800">{entry.title}</h4>
            <p className="text-blue-600 font-medium">{entry.subtitle}</p>
          </div>
          <p className="text-slate-700">{entry.description}</p>
        </div>
      ))}
    </div>
  );
}
