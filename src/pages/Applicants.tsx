import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, Clock, ChevronRight, ShieldCheck } from 'lucide-react';

const jobOpenings = [
  { id: 1, title: 'Registered Nurse', location: 'Saudi Arabia', type: 'Full-time', category: 'Medical & Healthcare', posted: '2 days ago' },
  { id: 2, title: 'Civil Engineer', location: 'UAE', type: 'Full-time', category: 'Engineering & Construction', posted: '1 week ago' },
  { id: 3, title: 'Heavy Duty Driver', location: 'Qatar', type: 'Contract', category: 'Professional Services', posted: '3 days ago' },
  { id: 4, title: 'Domestic Helper', location: 'Kuwait', type: 'Full-time', category: 'Household Services', posted: 'Just now' },
  { id: 5, title: 'Medical Technologist', location: 'Oman', type: 'Full-time', category: 'Medical & Healthcare', posted: '5 days ago' },
  { id: 6, title: 'HVAC Technician', location: 'Saudi Arabia', type: 'Full-time', category: 'Engineering & Construction', posted: '1 week ago' },
];

export function Applicants() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">For Applicants</h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Take the next step in your career. Explore global opportunities with a trusted agency that prioritizes your welfare and success.
            </p>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-slate-950 border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">Your Journey Starts Here</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Apply", desc: "Submit your resume and credentials for review." },
              { step: "02", title: "Interview", desc: "Initial screening and employer interview." },
              { step: "03", title: "Processing", desc: "Medical exams, visa, and DMW/POEA processing." },
              { step: "04", title: "Deployment", desc: "Pre-departure orientation and flight to your new job." }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-black text-slate-800/50 absolute -top-6 -left-2 z-0">{item.step}</div>
                <div className="relative z-10 pt-4">
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
                {i < 3 && <div className="hidden md:block absolute top-8 -right-4 w-8 h-px bg-slate-800" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Board */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 mb-12 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-white mb-1">DMW Compliance Notice: No Placement Fee Policy</h3>
              <p className="text-sm text-slate-300">
                In compliance with DMW regulations, Prime Goal International Manpower Inc. strictly enforces a <strong>"NO PLACEMENT FEE"</strong> policy for specific job roles (e.g., Household Service Workers, Seafarers) and specific destination countries. Please refer to individual job listings for details.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h2 className="text-3xl font-bold text-white">Current Openings</h2>
            
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search jobs by title, location, or category..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-full pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {jobOpenings.map((job, i) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-slate-950 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 rounded-full">
                      {job.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {job.posted}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{job.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {job.type}</span>
                  </div>
                </div>
                
                <div className="shrink-0">
                  <button className="w-full md:w-auto px-6 py-3 bg-slate-900 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                    Apply Now <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-transparent border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 rounded-lg transition-colors font-medium">
              Load More Jobs
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
