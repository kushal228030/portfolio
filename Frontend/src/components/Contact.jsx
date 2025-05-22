import { Mail, Phone, Linkedin, Github, Check, Send, User, MessageSquare } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export default function Contact() {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const sectionRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [animateElements, setAnimateElements] = useState({
    header: false,
    card: false,
    contactInfo: false,
    form: false
  });
  const [animationKey, setAnimationKey] = useState(0);
  
  const BURL = process.env.REACT_APP_BURL || "http://localhost:5000";
  
  // Trigger animations
  const triggerAnimations = () => {
    setAnimateElements({
      header: false,
      card: false,
      contactInfo: false,
      form: false
    });
    setAnimationKey(prev => prev + 1);
    
    setTimeout(() => setAnimateElements(prev => ({ ...prev, header: true })), 100);
    setTimeout(() => setAnimateElements(prev => ({ ...prev, card: true })), 300);
    setTimeout(() => setAnimateElements(prev => ({ ...prev, contactInfo: true })), 600);
    setTimeout(() => setAnimateElements(prev => ({ ...prev, form: true })), 900);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            triggerAnimations();
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const message = messageRef.current.value.trim();
    
    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }
    
    setIsSubmitting(true);
    setSuccessMessage('');
    
    try {
      const res = await fetch(`${BURL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMessage("Thank you! Your message has been sent successfully.");
        nameRef.current.value = "";
        emailRef.current.value = "";
        messageRef.current.value = "";
      } else {
        alert(data.error || "Failed to send message.");
      }
    } catch (err) {
      console.error("Email send error:", err);
      alert("Something went wrong. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMouseEnter = () => {
    if (isVisible) {
      triggerAnimations();
    }
  };

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: 'kushalgupta8424@gmail.com',
      href: 'mailto:kushalgupta8424@gmail.com',
      color: 'text-blue-600'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '(+91) 8424813828',
      href: 'tel:+918424813828',
      color: 'text-green-600'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Kushal Gupta',
      href: 'https://www.linkedin.com/in/kushal-gupta-21ab92325',
      color: 'text-blue-700'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'kushal228030',
      href: 'https://github.com/kushal228030',
      color: 'text-slate-800'
    }
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
    >
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className={`absolute top-20 right-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 transition-all duration-2000 ${
            isVisible ? 'scale-100 animate-pulse' : 'scale-0'
          }`}
        ></div>
        <div 
          className={`absolute bottom-20 left-20 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 transition-all duration-2000 delay-500 ${
            isVisible ? 'scale-100 animate-pulse' : 'scale-0'
          }`}
        ></div>
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        {/* Animated Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            animateElements.header ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-4">
            Get In Touch
          </h2>
          <div 
            className={`h-1 mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto shadow-lg transition-all duration-1000 delay-300 ${
              animateElements.header ? 'w-24' : 'w-0'
            }`}
          ></div>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Let's collaborate and bring your ideas to life. I'm always excited to work on new projects!
          </p>
        </div>

        {/* Main Card */}
        <div 
          className={`max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-1000 ${
            animateElements.card ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Information Side */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-12 text-white relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10">
                <h3 
                  className={`text-2xl md:text-3xl font-bold mb-2 transition-all duration-800 ${
                    animateElements.contactInfo ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                  }`}
                >
                  Let's Connect
                </h3>
                <p 
                  className={`text-blue-100 mb-8 text-lg transition-all duration-800 delay-200 ${
                    animateElements.contactInfo ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                  }`}
                >
                  Ready to discuss your next project or just want to say hello?
                </p>

                <div className="space-y-6">
                  {contactItems.map((item, index) => (
                    <ContactItem
                      key={`${item.label}-${animationKey}`}
                      item={item}
                      index={index}
                      isVisible={animateElements.contactInfo}
                    />
                  ))}
                </div>

                {/* Decorative Quote */}
                <div 
                  className={`mt-10 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 transition-all duration-800 delay-1000 ${
                    animateElements.contactInfo ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}
                >
                  <p className="text-blue-100 italic text-center">
                    "Great things are done by a series of small things brought together."
                  </p>
                  <p className="text-blue-200 text-sm text-center mt-2">- Vincent Van Gogh</p>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="p-8 md:p-12">
              <h3 
                className={`text-2xl md:text-3xl font-bold mb-6 text-slate-800 transition-all duration-800 ${
                  animateElements.form ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`}
              >
                Send a Message
              </h3>
              
              {successMessage && (
                <div 
                  className={`mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center text-green-700 transition-all duration-500 ${
                    successMessage ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                  }`}
                >
                  <Check size={20} className="text-green-500 mr-3 animate-pulse" />
                  <span className="font-medium">{successMessage}</span>
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <FormField
                  id="name"
                  label="Your Name"
                  type="text"
                  placeholder="Enter your full name"
                  ref={nameRef}
                  icon={User}
                  isSubmitting={isSubmitting}
                  isVisible={animateElements.form}
                  delay={0}
                />

                <FormField
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  ref={emailRef}
                  icon={Mail}
                  isSubmitting={isSubmitting}
                  isVisible={animateElements.form}
                  delay={200}
                />

                <div 
                  className={`transition-all duration-800 delay-400 ${
                    animateElements.form ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}
                >
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute top-3 left-3 text-slate-400" size={20} />
                    <textarea 
                      id="message"
                      ref={messageRef}
                      rows="5"
                      className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell me about your project or just say hello..."
                      disabled={isSubmitting}
                    ></textarea>
                  </div>
                </div>

                <button 
                  type="submit"
                  className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                    animateElements.form ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}
                  style={{ transitionDelay: '600ms' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

// Contact Item Component
function ContactItem({ item, index, isVisible }) {
  const Icon = item.icon;
  
  return (
    <div 
      className={`flex items-center gap-4 group cursor-pointer transition-all duration-600 hover:translate-x-2 ${
        isVisible ? 'animate-slideInLeft' : 'opacity-0'
      }`}
      style={{ animationDelay: `${400 + index * 150}ms` }}
    >
      <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
        <Icon size={20} className="text-white" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-blue-100 text-sm uppercase tracking-wide">{item.label}</p>
        <a 
          href={item.href}
          target={item.href.startsWith('http') ? '_blank' : undefined}
          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="text-white hover:text-blue-200 transition-colors duration-300 font-medium"
        >
          {item.value}
        </a>
      </div>
    </div>
  );
}

// Form Field Component
const FormField = ({ id, label, type, placeholder, icon: Icon, isSubmitting, isVisible, delay, ...props }) => {
  return (
    <div 
      className={`transition-all duration-800 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type={type}
          id={id}
          className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          placeholder={placeholder}
          disabled={isSubmitting}
          {...props}
        />
      </div>
    </div>
  );
};
