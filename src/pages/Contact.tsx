import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export function Contact() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Have questions about our services or job openings? We're here to help. Reach out to our team today.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-500/20">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Our Office</h3>
                    <p className="text-slate-400 leading-relaxed">
                      Padre Faura Center,<br />
                      472 P. Faura St. corner M.H. Del Pilar,<br />
                      Ermita, Manila, Philippines
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-500/20">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Phone</h3>
                    <p className="text-slate-400">
                      (+63) 02 5313 9446
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-500/20">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Email</h3>
                    <p className="text-slate-400">
                      pgima23@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-500/20">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Business Hours</h3>
                    <p className="text-slate-400">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-12 w-full h-80 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden relative">
                <iframe 
                  src="https://maps.google.com/maps?q=Padre%20Faura%20Center,%20472%20P.%20Faura%20St,%20Ermita,%20Manila&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Prime Goal Office Location"
                  className="absolute inset-0 grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                ></iframe>
                <a 
                  href="https://maps.app.goo.gl/ZPV4bhWro6e1Rauq6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute bottom-4 left-4 bg-slate-950/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-800 flex items-center gap-2 hover:bg-blue-600 transition-colors group z-10"
                >
                  <MapPin className="w-4 h-4 text-blue-500 group-hover:text-white" />
                  <span className="text-sm text-white font-medium">Get Directions</span>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">First Name</label>
                    <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Juan" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Last Name</label>
                    <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Dela Cruz" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Email Address</label>
                  <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="juan@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Subject</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none">
                    <option>General Inquiry</option>
                    <option>Job Application Status</option>
                    <option>Employer Partnership</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Message</label>
                  <textarea className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors h-32 resize-none" placeholder="How can we help you?"></textarea>
                </div>
                
                <div className="pt-4">
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg mb-4">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      <strong>Privacy Consent:</strong> By submitting this form or initiating a chat, you consent to the processing of your personal data by Prime Goal International Manpower Inc. in accordance with the Data Privacy Act of 2012 (RA 10173) for recruitment and employment purposes.
                    </p>
                  </div>
                  <button type="button" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" /> Send Message
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
