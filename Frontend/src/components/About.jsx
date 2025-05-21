import { useState } from 'react';
import {
  Github, Linkedin, Mail, Phone, User, Briefcase, Newspaper, CheckCircle2
} from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState('profile');
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-5 h-5" /> }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">About Me</h2>
          <div className="w-24 h-1 mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto shadow-lg"></div>
          <p className="mt-5 text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Computer Science Graduate | Full-Stack Developer | Machine Learning Enthusiast
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Tabs + Content */}
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-slate-300 bg-slate-100">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-3 px-8 py-5 font-semibold text-sm transition
                      ${activeTab === tab.id
                        ? 'text-indigo-600 border-b-4 border-indigo-600 bg-white shadow-inner'
                        : 'text-slate-600 hover:text-indigo-600 hover:bg-white'}
                      focus:outline-indigo-500 focus:outline-2 focus:outline-offset-2
                    `}
                    aria-selected={activeTab === tab.id}
                    role="tab"
                    tabIndex={activeTab === tab.id ? 0 : -1}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Content */}
              <div
                key={activeTab}
                className="p-8 md:p-12 text-slate-700 leading-relaxed animate-fadeIn"
                role="tabpanel"
              >
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-8">
                    <h3 className="text-3xl font-bold text-slate-900">Professional Profile</h3>
                    <p>
                      I am a Computer Science graduate with hands-on experience in full-stack web and mobile development 
                      using the MERN stack and React Native. I'm skilled in building and deploying machine learning models 
                      via Flask APIs on Hugging Face and Render.
                    </p>
                    <p>
                      My focus is on delivering real-world projects with practical, user-friendly solutions. I enjoy 
                      combining technical proficiency with creative problem-solving to build applications that make 
                      a difference.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
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
                  <div className="space-y-8">
                    <h3 className="text-3xl font-bold text-slate-900">Work Experience</h3>
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

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease forwards;
        }
      `}</style>
    </section>
  );
}

// Reusable Info Card
function InfoCard({ title, items }) {
  return (
    <div className="bg-slate-50 p-7 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h4 className="font-semibold text-slate-900 text-lg mb-5">{title}</h4>
      <ul className="space-y-3 text-slate-700">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Reusable Timeline Component
function Timeline({ entries }) {
  return (
    <div className="space-y-10">
      {entries.map((entry, idx) => (
        <div key={idx} className="relative pl-12 border-l-4 border-indigo-300">
          <div className="absolute -left-6 top-3 bg-indigo-600 w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div className="mb-3">
            <h4 className="text-2xl font-semibold text-slate-900">{entry.title}</h4>
            <p className="text-indigo-600 font-medium">{entry.subtitle}</p>
          </div>
          <p className="text-slate-700">{entry.description}</p>
        </div>
      ))}
    </div>
  );
}
