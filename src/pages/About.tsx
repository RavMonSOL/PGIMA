import { motion } from 'framer-motion';
import { Target, Eye, Award, ShieldCheck, History } from 'lucide-react';

export function About() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Prime Goal</h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Established on May 5, 2015, Primegoal International Manpower Inc. is a premier Philippine-based recruitment agency specializing in connecting skilled Filipino talent with trusted global employers.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 p-10 rounded-3xl border border-slate-800 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Target className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  To provide regulated recruitment and deployment services by connecting qualified Filipino workers to global opportunities while upholding integrity, care, and transparency.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900 p-10 rounded-3xl border border-slate-800 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Eye className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  To be a globally respected agency known for transforming lives and contributing to the national economy through professional excellence.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History & Recognition */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 hidden md:block" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-slate-400 text-lg">A legacy of trust, transparency, and ethical recruitment.</p>
          </div>

          <div className="space-y-12">
            {/* 2015 */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="md:w-1/2 flex justify-end text-right">
                <div className="max-w-md">
                  <h3 className="text-2xl font-bold text-white mb-2">Inception</h3>
                  <p className="text-slate-400">Officially established, beginning our journey to connect Filipino talent with the world.</p>
                </div>
              </div>
              <div className="w-16 h-16 rounded-full bg-slate-950 border-4 border-slate-800 flex items-center justify-center shrink-0 z-10 relative">
                <History className="w-6 h-6 text-slate-400" />
                <div className="absolute -top-8 text-sm font-bold text-blue-500">2015</div>
              </div>
              <div className="md:w-1/2 flex justify-start">
                {/* Empty for layout */}
              </div>
            </div>

            {/* 2022 */}
            <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-8 md:gap-16">
              <div className="md:w-1/2 flex justify-start text-left">
                <div className="max-w-md">
                  <h3 className="text-2xl font-bold text-white mb-2">Top Deploying Agency</h3>
                  <p className="text-slate-400">Recognized by the Department of Migrant Workers (DMW) for our solid reputation in transparency and ethical recruitment.</p>
                </div>
              </div>
              <div className="w-16 h-16 rounded-full bg-blue-600 border-4 border-slate-900 flex items-center justify-center shrink-0 z-10 relative shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                <Award className="w-6 h-6 text-white" />
                <div className="absolute -top-8 text-sm font-bold text-blue-500">2022</div>
              </div>
              <div className="md:w-1/2 flex justify-end">
                {/* Empty for layout */}
              </div>
            </div>
            
            {/* Present */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="md:w-1/2 flex justify-end text-right">
                <div className="max-w-md">
                  <h3 className="text-2xl font-bold text-white mb-2">Global Reach</h3>
                  <p className="text-slate-400">Continuing to expand our network, protecting OFWs, and delivering excellence across multiple industries worldwide.</p>
                </div>
              </div>
              <div className="w-16 h-16 rounded-full bg-slate-950 border-4 border-slate-800 flex items-center justify-center shrink-0 z-10 relative">
                <ShieldCheck className="w-6 h-6 text-slate-400" />
                <div className="absolute -top-8 text-sm font-bold text-blue-500">Present</div>
              </div>
              <div className="md:w-1/2 flex justify-start">
                {/* Empty for layout */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
