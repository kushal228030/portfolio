import { GraduationCap, Calendar, Award, Building } from 'lucide-react';

export default function Education() {
  const educationData = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Mulund College of Commerce (Autonomous)",
      year: "2022 – 2025",
      grade: "CGPA: 9.79",
      description: "Specialized in Artificial Intelligence and Machine Learning with a focus on web application development. Completed coursework in advanced algorithms, data structures, and full-stack development.",
      color: "blue"
    },
    {
      degree: "Higher Secondary Education (XII)",
      institution: "Satish Pradhan Dnyanasadhana College",
      year: "2020 – 2022",
      grade: "Percentage: 66%",
      description: "Focused on Computer Science and Mathematics. Participated in various technical competitions and workshops to enhance practical knowledge.",
      color: "indigo"
    }
  ];

  return (
    <section id="education" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16 text-center">
          <p className="text-blue-600 font-medium mb-2">ACADEMIC BACKGROUND</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          <p className="mt-6 text-slate-600 max-w-2xl mx-auto">
            My academic journey has equipped me with a strong foundation in computer science principles and practical application development.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full hidden md:block"></div>
            
            {educationData.map((edu, index) => (
              <div key={index} className={`mb-12 relative ${index % 2 === 0 ? 'md:pr-8 md:ml-auto md:mr-auto md:text-right' : 'md:pl-8 md:ml-auto md:mr-auto'}`}>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-md border-4 border-blue-500 z-10 flex items-center justify-center hidden md:flex">
                  <GraduationCap className="text-blue-600" size={20} />
                </div>
                
                <div className={`relative ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'} bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl`}>
                  {/* Color bar at the top */}
                  <div className={`h-2 w-full bg-gradient-to-r from-${edu.color}-500 to-${edu.color}-600`}></div>
                  
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 rounded-lg bg-${edu.color}-100 flex items-center justify-center mr-4 md:hidden`}>
                        <GraduationCap className={`text-${edu.color}-600`} size={20} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800">{edu.degree}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <Building className="text-slate-400 mr-2" size={16} />
                        <p className="text-slate-700">{edu.institution}</p>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="text-slate-400 mr-2" size={16} />
                        <p className="text-slate-600">{edu.year}</p>
                      </div>
                    </div>
                    
                    <div className={`bg-${edu.color}-50 text-${edu.color}-800 font-medium px-4 py-2 rounded-lg inline-block mb-4`}>
                      <div className="flex items-center">
                        <Award className={`text-${edu.color}-600 mr-2`} size={16} />
                        {edu.grade}
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-4 leading-relaxed">
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