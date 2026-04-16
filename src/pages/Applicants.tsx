import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Briefcase, Filter, ArrowRight, Loader2, X, Send, Paperclip, CheckCircle } from 'lucide-react';
import { collection, query, where, onSnapshot, orderBy, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, handleFirestoreError, OperationType } from '../lib/firebase';
import emailjs from '@emailjs/browser';

interface Job {
  id: string;
  title: string;
  location: string;
  category: string;
  description: string;
  requirements: string;
  salary: string;
  status: 'open' | 'closed';
}

export function Applicants() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'jobs'), 
      where('status', '==', 'open'),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Job[];
      setJobs(jobsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'jobs');
    });

    return () => unsubscribe();
  }, []);

  const categories = ["All", "Nanny", "Cook", "Lady Driver", "Domestic Helper"];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedJob) return;
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    setIsSubmitting(true);
    setFormError(null);

    // 1MB limit for Firebase Storage (more generous than EmailJS)
    if (selectedFile && selectedFile.size > 1024 * 1024) {
      setFormError('File is too large. Please keep it under 1MB.');
      setIsSubmitting(false);
      return;
    }

    try {
      let resumeUrl = '';
      
      // 1. Upload to Firebase Storage if file exists
      if (selectedFile) {
        const firstName = formData.get('first_name') as string;
        const lastName = formData.get('last_name') as string;
        const timestamp = Date.now();
        const safeFileName = selectedFile.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
        const storagePath = `applications/${firstName}_${lastName}_${timestamp}_${safeFileName}`;
        const storageRef = ref(storage, storagePath);
        
        const uploadResult = await uploadBytes(storageRef, selectedFile);
        resumeUrl = await getDownloadURL(uploadResult.ref);
      }

      // 2. Save to Firestore
      const applicationData = {
        jobTitle: selectedJob.title,
        firstName: formData.get('first_name'),
        lastName: formData.get('last_name'),
        email: formData.get('reply_to'),
        phone: formData.get('contact_number'),
        resumeUrl: resumeUrl,
        status: 'new',
        createdAt: Timestamp.now()
      };

      await addDoc(collection(db, 'applications'), applicationData);

      // 3. Send EmailJS notification (WITHOUT attachment to avoid 413)
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_APPLICATION;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        // We create a new object for EmailJS that includes the resume link
        // but DOES NOT include the file input itself
        const emailParams = {
          job_title: selectedJob.title,
          first_name: formData.get('first_name'),
          last_name: formData.get('last_name'),
          reply_to: formData.get('reply_to'),
          contact_number: formData.get('contact_number'),
          resume_link: resumeUrl, // Pass the link instead of the file
        };

        await emailjs.send(serviceId, templateId, emailParams, publicKey);
      }

      setIsSuccess(true);
    } catch (err) {
      console.error('Application Error:', err);
      setFormError('Failed to submit application. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-950">
      {/* Header */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Current Openings</h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Explore our latest job opportunities in Saudi Arabia and beyond. All positions are DMW-regulated and verified.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 border-b border-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by job title or location..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              <Filter className="text-slate-500 w-5 h-5 shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                    selectedCategory === cat 
                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20" 
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Job List */}
      <section className="py-16 flex-1">
        <div className="container mx-auto px-4 md:px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
              <p className="text-slate-400">Loading latest job openings...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-900">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No jobs found</h3>
              <p className="text-slate-400">Try adjusting your search or category filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredJobs.map((job, i) => (
                <motion.div 
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all group flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-600/10 text-blue-400 rounded-xl">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full">
                      {job.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{job.title}</h3>
                  
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500">{job.salary || 'Competitive Salary'}</span>
                    <button 
                      onClick={() => {
                        setSelectedJob(job);
                        setIsApplying(true);
                      }}
                      className="flex items-center gap-2 text-blue-400 font-bold text-sm hover:text-blue-300 transition-colors"
                    >
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {isApplying && selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsApplying(false);
                setIsSuccess(false);
              }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => {
                  setIsApplying(false);
                  setIsSuccess(false);
                }}
                className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8 md:p-10">
                {isSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Application Sent!</h3>
                    <p className="text-slate-400 mb-8">Your application for <strong>{selectedJob.title}</strong> has been received. Our recruitment team will review your profile shortly.</p>
                    <button 
                      onClick={() => {
                        setIsApplying(false);
                        setIsSuccess(false);
                      }}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-white mb-1">Apply for Position</h3>
                      <p className="text-blue-500 font-medium">{selectedJob.title}</p>
                    </div>

                    <form onSubmit={handleApply} className="space-y-4">
                      <input type="hidden" name="job_title" value={selectedJob.title} />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">First Name</label>
                          <input name="first_name" required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="Juan" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Name</label>
                          <input name="last_name" required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="Dela Cruz" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                        <input name="reply_to" required type="email" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="juan@example.com" />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Number</label>
                        <input name="contact_number" required type="tel" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="+63 9XX XXX XXXX" />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Resume / CV (PDF or Image)</label>
                        <div className="relative group">
                          <input 
                            name="resume" 
                            required 
                            type="file" 
                            accept=".pdf,image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setSelectedFile(e.target.files[0]);
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                          />
                          <div className={`w-full bg-slate-950 border border-dashed rounded-xl px-4 py-6 text-center transition-all ${selectedFile ? 'border-blue-500 bg-blue-500/5' : 'border-slate-800 group-hover:border-slate-700'}`}>
                            {selectedFile ? (
                              <div className="flex flex-col items-center">
                                <CheckCircle className="w-6 h-6 text-blue-500 mb-2" />
                                <p className="text-sm text-white font-medium truncate max-w-full px-4">{selectedFile.name}</p>
                                <p className="text-xs text-slate-500 mt-1">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                                <button 
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedFile(null);
                                    const input = document.querySelector('input[name="resume"]') as HTMLInputElement;
                                    if (input) input.value = '';
                                  }}
                                  className="mt-3 text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-tighter relative z-20"
                                >
                                  Remove File
                                </button>
                              </div>
                            ) : (
                              <>
                                <Paperclip className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                                <p className="text-sm text-slate-500">Click to upload or drag and drop</p>
                                <p className="text-[10px] text-slate-600 mt-1 uppercase tracking-widest">PDF or Image</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {formError && (
                        <p className="text-red-400 text-sm">{formError}</p>
                      )}

                      <button 
                        disabled={isSubmitting}
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-blue-600/20"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending Application...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" /> Submit Application
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
