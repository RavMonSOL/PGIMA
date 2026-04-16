import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Users, FileCheck, Shield, Globe2, Loader2, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export function Employers() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONSULTATION;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // Fallback for demo if keys aren't set yet
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        console.log("EmailJS keys not found. Form data:", new FormData(e.currentTarget));
      }, 1500);
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, e.currentTarget, publicKey);
      setIsSuccess(true);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setError('Failed to send message. Please try again later or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">For Employers</h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Partner with a DMW-recognized Top Deploying Agency to source, screen, and deploy world-class Filipino talent for your organization through our regulated recruitment services.
            </p>
          </div>
        </div>
      </section>

      {/* Vetting Process */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Rigorous Vetting Process</h2>
            <p className="text-slate-400 text-lg">We ensure every candidate meets both professional skills and ethical employer standards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "1. Sourcing",
                desc: "Extensive network and targeted recruitment to find the best candidates."
              },
              {
                icon: <FileCheck className="w-6 h-6" />,
                title: "2. Screening",
                desc: "In-depth interviews, skills assessment, and background checks."
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "3. Verification",
                desc: "Strict authentication of credentials, medical fitness, and clearances."
              },
              {
                icon: <Globe2 className="w-6 h-6" />,
                title: "4. Deployment",
                desc: "Seamless processing of visas, POEA/DMW compliance, and travel."
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900 p-8 rounded-2xl border border-slate-800 relative"
              >
                <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Talent Pool */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Access a Diverse Talent Pool</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Filipino workers are globally recognized for their dedication, adaptability, English proficiency, and strong work ethic. We provide specialized talent across key industries.
              </p>
              
              <div className="space-y-4">
                {[
                  "Medical & Healthcare Professionals",
                  "Engineering & Construction Experts",
                  "Professional Drivers & Skilled Trades",
                  "Dedicated Household Service Workers"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    <span className="text-slate-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="bg-slate-950 p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">Request a Consultation</h3>
                
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">Request Sent!</h4>
                    <p className="text-slate-400">Thank you for reaching out. Our team will contact you at agent47sui@gmail.com shortly.</p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="mt-8 text-blue-400 hover:text-blue-300 font-medium"
                    >
                      Send another request
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Company Name</label>
                        <input name="company_name" required type="text" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Your Company" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Contact Person</label>
                        <input name="from_name" required type="text" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Email Address</label>
                      <input name="reply_to" required type="email" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@company.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Industry / Requirements</label>
                      <textarea name="message" required className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors h-32 resize-none" placeholder="Tell us about the roles you need to fill..."></textarea>
                    </div>

                    {error && (
                      <p className="text-red-400 text-sm">{error}</p>
                    )}

                    <button 
                      disabled={isSubmitting}
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-colors mt-4 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Submit Request'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
