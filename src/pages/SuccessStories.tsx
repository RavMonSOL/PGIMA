import { motion } from 'framer-motion';
import { PlaneTakeoff, MapPin, Calendar, Star } from 'lucide-react';

const stories = [
  {
    id: 1,
    name: "Maria Santos",
    role: "Registered Nurse",
    destination: "Riyadh, Saudi Arabia",
    date: "October 15, 2023",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop", // Airport placeholder
    quote: "Thank you Prime Goal for making my dream of working abroad a reality. The process was smooth and transparent."
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    role: "Civil Engineer",
    destination: "Dubai, UAE",
    date: "September 28, 2023",
    image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=2070&auto=format&fit=crop",
    quote: "From screening to deployment, the team supported me every step of the way. Ready for my new chapter!"
  },
  {
    id: 3,
    name: "Elena Reyes",
    role: "Domestic Helper",
    destination: "Kuwait City, Kuwait",
    date: "November 02, 2023",
    image: "https://images.unsplash.com/photo-1544015759-237f88e55f56?q=80&w=2070&auto=format&fit=crop",
    quote: "I feel safe and secure knowing Prime Goal is monitoring my welfare even while I'm here in Kuwait."
  },
  {
    id: 4,
    name: "Mark Bautista",
    role: "Heavy Equipment Operator",
    destination: "Doha, Qatar",
    date: "August 14, 2023",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=2070&auto=format&fit=crop",
    quote: "Fast deployment and very accommodating staff. Highly recommended agency!"
  }
];

export function SuccessStories() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="py-20 bg-slate-900 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-luminosity" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Success Stories</h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Celebrating the successful deployments of our hardworking Filipino professionals to the Middle East and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stories.map((story, i) => (
              <motion.div 
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={`${story.name} at the airport`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{story.name}</h3>
                      <p className="text-blue-400 font-medium">{story.role}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                      <PlaneTakeoff className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-500" /> {story.destination}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-500" /> {story.date}</span>
                  </div>
                  
                  <div className="relative">
                    <Star className="w-8 h-8 text-slate-800 absolute -top-2 -left-2 z-0" />
                    <p className="text-slate-300 italic relative z-10 pl-4 border-l-2 border-blue-500/30">
                      "{story.quote}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-slate-400 mb-6">Are you ready to write your own success story?</p>
            <a href="/applicants" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              Apply Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
