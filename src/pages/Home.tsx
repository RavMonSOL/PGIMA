import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe2, Users, ShieldCheck, HeartHandshake, Building2, Stethoscope, HardHat, Briefcase } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-slate-950 z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop')] bg-cover bg-center opacity-10 z-0 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-0" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] z-0" />
        
        <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>DMW Recognized Top Deploying Agency 2022</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mb-6"
          >
            Connecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Right People</span> to the Right Opportunities.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10"
          >
            We provide regulated recruitment and deployment services by connecting qualified Filipino workers to global opportunities while upholding integrity, care, and transparency.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link to="/applicants" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]">
              Search Jobs <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/employers" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-all">
              Hire Talent
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 bg-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Pillars</h2>
            <p className="text-slate-400 text-lg">The foundation of our world-class recruitment services.</p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Users className="w-8 h-8 text-blue-400" />,
                title: "Candidate Sourcing & Screening",
                desc: "Rigorous identification, interviewing, and verification process ensuring candidates meet professional and ethical standards."
              },
              {
                icon: <Globe2 className="w-8 h-8 text-blue-400" />,
                title: "Overseas Job Placement",
                desc: "End-to-end deployment services for various industries with full compliance to government (DMW/POEA) regulations."
              },
              {
                icon: <HeartHandshake className="w-8 h-8 text-blue-400" />,
                title: "Worker Welfare & Support",
                desc: "Continuous monitoring and guidance after deployment, protecting the rights and well-being of OFWs abroad."
              }
            ].map((pillar, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-slate-950 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition-colors group">
                <div className="w-16 h-16 bg-blue-950/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                <p className="text-slate-400 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Industries We Serve</h2>
              <p className="text-slate-400 text-lg">Deploying top-tier Filipino talent across a wide spectrum of global industries.</p>
            </div>
            <Link to="/employers" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-2 transition-colors">
              View All Industries <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Stethoscope className="w-10 h-10" />, name: "Medical & Healthcare", roles: "Nurses, Doctors, Staff" },
              { icon: <HardHat className="w-10 h-10" />, name: "Engineering & Construction", roles: "Engineers, Laborers" },
              { icon: <Briefcase className="w-10 h-10" />, name: "Professional Services", roles: "Drivers, Skilled Pros" },
              { icon: <Building2 className="w-10 h-10" />, name: "Household Services", roles: "Domestic Placements" }
            ].map((industry, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-8 hover:bg-slate-800 transition-colors">
                <div className="text-slate-500 group-hover:text-blue-400 transition-colors mb-6">
                  {industry.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{industry.name}</h3>
                <p className="text-sm text-slate-400">{industry.roles}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-multiply z-0" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto">Ready to take the next step in your career or business?</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">Whether you're looking for global opportunities or seeking top-tier Filipino talent, Prime Goal is your trusted partner.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/applicants" className="px-8 py-4 text-base font-bold text-blue-600 bg-white rounded-lg hover:bg-slate-100 transition-colors">
              Apply Now
            </Link>
            <Link to="/contact" className="px-8 py-4 text-base font-bold text-white bg-transparent border-2 border-white rounded-lg hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
