import { Mail, Phone, Linkedin, Github, Check } from 'lucide-react';
import { useRef, useState } from 'react';

export default function Contact() {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const BURL = process.env.REACT_APP_BURL || "http://localhost:5000";
  console.log(BURL)
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

  return (
    <section id="contact" className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="text-blue-600 mr-3 mt-1" size={20} />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:kushalgupta8424@gmail.com" className="text-slate-600 hover:text-blue-600">
                      kushalgupta8424@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="text-blue-600 mr-3 mt-1" size={20} />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+918424813828" className="text-slate-600 hover:text-blue-600">
                      (+91) 8424813828
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Linkedin className="text-blue-600 mr-3 mt-1" size={20} />
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/kushal-gupta/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600">
                      Kushal Gupta
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Github className="text-blue-600 mr-3 mt-1" size={20} />
                  <div>
                    <p className="font-medium">GitHub</p>
                    <a href="https://github.com/kushal228030" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600">
                      kushal228030
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Send a Message</h3>
              
              {successMessage && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center text-green-700">
                  <Check size={20} className="text-green-500 mr-2" />
                  {successMessage}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input 
                    type="text"
                    id="name"
                    ref={nameRef}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Name"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input 
                    type="email"
                    id="email"
                    ref={emailRef}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Email"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <textarea 
                    id="message"
                    ref={messageRef}
                    rows="4"
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Message"
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <button 
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300 w-full flex justify-center items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}