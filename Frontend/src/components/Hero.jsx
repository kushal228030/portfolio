import { useState, useEffect } from "react";
import { ChevronRight, Github, Linkedin, Mail } from "lucide-react";
import pf from "../Assests/ProfilePicture.png";

export default function Hero({ scrollToSection }) {
  const [typedText, setTypedText] = useState("");
  const fullText = "Computer Science Graduate & Full-Stack Developer";

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-32 md:py-40"
      aria-label="Hero section introducing Kushal Gupta"
    >
      {/* Background shapes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000"></div>
        <div className="absolute top-20 left-1/3 w-56 h-56 bg-purple-50 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Text content */}
          <div className="lg:w-3/5">
            <div className="mb-4 inline-flex items-center bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm select-none">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Available for freelance, internships & full-time positions
            </div>

            <h1
              className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 bg-clip-text text-transparent drop-shadow-md"
              tabIndex={0}
            >
              Hi, I'm Kushal Gupta
            </h1>

            <div className="h-8 mb-6" aria-live="polite" aria-atomic="true">
              <h2 className="text-xl md:text-2xl text-slate-700 font-semibold">
                {typedText}
                <span className="inline-block w-1 h-6 bg-blue-600 ml-1 animate-pulse" />
              </h2>
            </div>

            <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed drop-shadow-sm">
              I specialize in building modern web and mobile applications with{" "}
              <span className="text-blue-700 font-semibold">
                machine learning integration
              </span>
              , delivering intuitive interfaces and scalable backend solutions
              for complex problems.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mb-10">
              <button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium py-3.5 px-8 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center"
                aria-label="View my projects"
              >
                View My Projects
                <ChevronRight
                  size={18}
                  className="ml-1 transition-transform group-hover:translate-x-1"
                />
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="border-2 border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 font-medium py-3.5 px-8 rounded-lg shadow-sm hover:shadow-md transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center"
                aria-label="Let's connect"
              >
                Let's Connect
              </button>
            </div>

            <div className="flex space-x-5">
              {[{
                href: "https://github.com/kushal228030",
                label: "GitHub Profile",
                icon: Github,
              }, {
                href: "https://www.linkedin.com/in/kushal-gupta-21ab92325",
                label: "LinkedIn Profile",
                icon: Linkedin,
              }, {
                href: "mailto:kushalgupta8424@gmail.com",
                label: "Email Contact",
                icon: Mail,
              }].map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 rounded-lg bg-white shadow-md text-slate-700 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
                  aria-label={label}
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="md:w-2/5 flex justify-center relative">
            <div className="relative animate-float">
              {/* Glow Layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-3xl opacity-60 scale-110"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-70 animate-shine"></div>

              {/* Image Container */}
              <div className="bg-white p-4 rounded-full shadow-2xl relative z-10">
                <div className="relative inline-block group cursor-pointer">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 opacity-80 blur-lg group-hover:opacity-100 transition duration-500"></div>
                  <img
                    src={pf}
                    alt="Kushal Gupta profile picture"
                    className="relative rounded-full w-52 h-52 md:w-80 md:h-80 object-cover border-4 border-white shadow-xl transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Decorative corner icon */}
              <div className="absolute -bottom-3 -right-3 bg-white p-3 rounded-full shadow-lg z-20">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full p-2.5 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M16 18l6-6-6-6"></path>
                    <path d="M8 6l-6 6 6 6"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-slate-500 animate-bounce select-none"
        aria-hidden="true"
      >
        <div className="text-xs font-semibold mb-2 tracking-wider">Scroll Down</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-current"
        >
          <path d="M12 5v14"></path>
          <path d="M19 12l-7 7-7-7"></path>
        </svg>
      </div>

      {/* Extra animation keyframes for blob & float */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -20px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 30px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shine {
          background-size: 200% 100%;
          animation: shine 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
