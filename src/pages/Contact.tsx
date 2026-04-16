import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

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

            {/* Direct Contact CTA */}
            <div className="flex flex-col justify-center">
              <div className="bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
                
                <h3 className="text-3xl font-bold text-white mb-6">Ready to start a conversation?</h3>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  For the fastest response, please email us directly. Our team monitors our inbox during business hours and typically responds within 24 hours.
                </p>
                
                <div className="space-y-6">
                  <a 
                    href="mailto:pgima23@gmail.com"
                    className="flex items-center gap-4 p-6 bg-slate-950 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <Mail className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500 font-medium mb-1">Email us at</p>
                      <p className="text-xl font-bold text-white">pgima23@gmail.com</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  </a>

                  <div className="p-6 bg-blue-600/5 rounded-2xl border border-blue-500/10">
                    <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      Response Time
                    </h4>
                    <p className="text-slate-400 text-sm">
                      We aim to respond to all general inquiries within 1-2 business days. For urgent manpower requirements, please call our office directly.
                    </p>
                  </div>
                </div>

                <div className="mt-10 pt-10 border-t border-slate-800">
                  <p className="text-xs text-slate-500 leading-relaxed italic">
                    <strong>Note:</strong> Job applicants are encouraged to apply directly through our <a href="/applicants" className="text-blue-400 hover:underline">Current Openings</a> page for faster processing of their applications.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
