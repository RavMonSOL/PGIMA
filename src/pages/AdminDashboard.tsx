import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';
import { Plus, Pencil, Trash2, LogIn, LogOut, Loader2, Briefcase, MapPin, Tag, CheckCircle2, XCircle, FileText, Mail, Phone, Calendar, ExternalLink, Search } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  location: string;
  category: string;
  description: string;
  requirements: string;
  salary: string;
  status: 'open' | 'closed';
  createdAt: any;
  updatedAt: any;
}

interface Application {
  id: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  status: 'new' | 'reviewed' | 'rejected' | 'hired';
  createdAt: any;
}

interface Category {
  id: string;
  name: string;
}

export function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications' | 'categories'>('jobs');
  const [appSearchTerm, setAppSearchTerm] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentJob, setCurrentJob] = useState<Partial<Job>>({
    title: '',
    location: '',
    category: '',
    description: '',
    requirements: '',
    salary: '',
    status: 'open'
  });

  useEffect(() => {
    if (!isAdmin) return;

    const jobsQuery = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
    const unsubscribeJobs = onSnapshot(jobsQuery, (snapshot) => {
      const jobsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Job[];
      setJobs(jobsData);
      if (activeTab === 'jobs') setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'jobs');
    });

    const appsQuery = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
    const unsubscribeApps = onSnapshot(appsQuery, (snapshot) => {
      const appsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Application[];
      setApplications(appsData);
      if (activeTab === 'applications') setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'applications');
    });

    const categoriesQuery = query(collection(db, 'categories'), orderBy('name', 'asc'));
    const unsubscribeCategories = onSnapshot(categoriesQuery, (snapshot) => {
      const catsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[];
      setCategories(catsData);
      if (activeTab === 'categories') setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'categories');
    });

    return () => {
      unsubscribeJobs();
      unsubscribeApps();
      unsubscribeCategories();
    };
  }, [isAdmin, activeTab]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    try {
      const jobData = {
        ...currentJob,
        updatedAt: Timestamp.now()
      };

      if (currentJob.id) {
        const jobRef = doc(db, 'jobs', currentJob.id);
        await updateDoc(jobRef, jobData);
      } else {
        await addDoc(collection(db, 'jobs'), {
          ...jobData,
          createdAt: Timestamp.now()
        });
      }

      setIsEditing(false);
      setCurrentJob({
        title: '',
        location: '',
        category: '',
        description: '',
        requirements: '',
        salary: '',
        status: 'open'
      });
    } catch (error) {
      handleFirestoreError(error, currentJob.id ? OperationType.UPDATE : OperationType.CREATE, 'jobs');
    }
  };

  const handleEdit = (job: Job) => {
    setCurrentJob(job);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteJob = async (id: string) => {
    if (!isAdmin || !window.confirm('Are you sure you want to delete this job posting?')) return;
    try {
      await deleteDoc(doc(db, 'jobs', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `jobs/${id}`);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (!isAdmin || !window.confirm('Are you sure you want to delete this application?')) return;
    try {
      await deleteDoc(doc(db, 'applications', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `applications/${id}`);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin || !newCategoryName.trim()) return;
    try {
      await addDoc(collection(db, 'categories'), { name: newCategoryName.trim() });
      setNewCategoryName('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'categories');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!isAdmin || !window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await deleteDoc(doc(db, 'categories', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `categories/${id}`);
    }
  };

  const handleUpdateAppStatus = async (id: string, status: Application['status']) => {
    if (!isAdmin) return;
    try {
      await updateDoc(doc(db, 'applications', id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `applications/${id}`);
    }
  };

  const filteredApplications = applications.filter(app => {
    const searchLower = appSearchTerm.toLowerCase();
    const fullName = `${app.firstName} ${app.lastName}`.toLowerCase();
    return fullName.includes(searchLower) || 
           app.email.toLowerCase().includes(searchLower) || 
           app.jobTitle.toLowerCase().includes(searchLower) ||
           app.phone.includes(searchLower);
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-950 px-4">
        <div className="bg-slate-900 p-10 rounded-3xl border border-slate-800 text-center max-w-md w-full shadow-2xl">
          <div className="w-20 h-20 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Admin Access</h1>
          <p className="text-slate-400 mb-8">Please sign in with your authorized Google account to manage job postings.</p>
          <button 
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3"
          >
            <LogIn className="w-5 h-5" /> Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-950 px-4">
        <div className="bg-slate-900 p-10 rounded-3xl border border-slate-800 text-center max-w-md w-full shadow-2xl">
          <div className="w-20 h-20 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-slate-400 mb-8">Your account ({user.email}) is not authorized to access the admin dashboard.</p>
          <button 
            onClick={handleLogout}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Manage your job listings and candidate applications.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-white font-medium">{user.displayName}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white p-3 rounded-xl border border-slate-800 transition-all"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-12 border-b border-slate-800 pb-px">
          <button 
            onClick={() => { setActiveTab('jobs'); setLoading(true); }}
            className={`pb-4 px-2 font-bold transition-all relative ${activeTab === 'jobs' ? 'text-blue-500' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Job Postings
            {activeTab === 'jobs' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
          </button>
          <button 
            onClick={() => { setActiveTab('applications'); setLoading(true); }}
            className={`pb-4 px-2 font-bold transition-all relative ${activeTab === 'applications' ? 'text-blue-500' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Applications
            {applications.filter(a => a.status === 'new').length > 0 && (
              <span className="ml-2 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {applications.filter(a => a.status === 'new').length}
              </span>
            )}
            {activeTab === 'applications' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
          </button>
          <button 
            onClick={() => { setActiveTab('categories'); setLoading(true); }}
            className={`pb-4 px-2 font-bold transition-all relative ${activeTab === 'categories' ? 'text-blue-500' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Categories
            {activeTab === 'categories' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
          </button>
        </div>

        {activeTab === 'jobs' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 sticky top-24 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  {isEditing ? <Pencil className="w-5 h-5 text-blue-500" /> : <Plus className="w-5 h-5 text-blue-500" />}
                  {isEditing ? 'Edit Job Posting' : 'Add New Job'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Job Title</label>
                    <input 
                      required 
                      value={currentJob.title}
                      onChange={e => setCurrentJob({...currentJob, title: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" 
                      placeholder="e.g. Registered Nurse" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Location</label>
                      <input 
                        required 
                        value={currentJob.location}
                        onChange={e => setCurrentJob({...currentJob, location: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" 
                        placeholder="e.g. Saudi Arabia" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Category</label>
                      <select 
                        required 
                        value={currentJob.category}
                        onChange={e => setCurrentJob({...currentJob, category: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all appearance-none"
                      >
                        <option value="">Select...</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Status</label>
                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={() => setCurrentJob({...currentJob, status: 'open'})}
                        className={`flex-1 py-2 rounded-lg border transition-all flex items-center justify-center gap-2 ${currentJob.status === 'open' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500' : 'bg-slate-950 border-slate-800 text-slate-500'}`}
                      >
                        <CheckCircle2 className="w-4 h-4" /> Open
                      </button>
                      <button 
                        type="button"
                        onClick={() => setCurrentJob({...currentJob, status: 'closed'})}
                        className={`flex-1 py-2 rounded-lg border transition-all flex items-center justify-center gap-2 ${currentJob.status === 'closed' ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-slate-950 border-slate-800 text-slate-500'}`}
                      >
                        <XCircle className="w-4 h-4" /> Closed
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Salary Info (Optional)</label>
                    <input 
                      value={currentJob.salary}
                      onChange={e => setCurrentJob({...currentJob, salary: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" 
                      placeholder="e.g. Competitive / Negotiable" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Description</label>
                    <textarea 
                      value={currentJob.description}
                      onChange={e => setCurrentJob({...currentJob, description: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all h-32 resize-none" 
                      placeholder="Job details..." 
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    {isEditing && (
                      <button 
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setCurrentJob({ title: '', location: '', category: '', description: '', requirements: '', salary: '', status: 'open' });
                        }}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all"
                      >
                        Cancel
                      </button>
                    )}
                    <button 
                      type="submit"
                      className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20"
                    >
                      {isEditing ? 'Update Posting' : 'Post Job'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* List Column */}
            <div className="lg:col-span-2">
              {loading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
              ) : jobs.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-20 text-center">
                  <p className="text-slate-500">No job postings found. Start by adding one!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map(job => (
                    <div key={job.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-all group">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{job.title}</h3>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${job.status === 'open' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                              {job.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-blue-500" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Tag className="w-4 h-4 text-blue-500" />
                              {job.category}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleEdit(job)}
                            className="p-2 bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white rounded-lg transition-all"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteJob(job.id)}
                            className="p-2 bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : activeTab === 'applications' ? (
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search applicants by name, email, phone, or job title..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors shadow-lg"
                value={appSearchTerm}
                onChange={(e) => setAppSearchTerm(e.target.value)}
              />
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-20 text-center">
                <p className="text-slate-500">No applications found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredApplications.map(app => (
                  <div key={app.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-all group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white">{app.firstName} {app.lastName}</h3>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            app.status === 'new' ? 'bg-blue-500/20 text-blue-500' : 
                            app.status === 'reviewed' ? 'bg-amber-500/20 text-amber-500' :
                            app.status === 'hired' ? 'bg-emerald-500/20 text-emerald-500' :
                            'bg-red-500/20 text-red-500'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-slate-400">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-blue-500" />
                            <span className="text-white font-medium">{app.jobTitle}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-500" />
                            {app.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-blue-500" />
                            {app.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            {app.createdAt?.toDate ? app.createdAt.toDate().toLocaleDateString() : 'N/A'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {app.resumeUrl && app.resumeUrl.startsWith('http') ? (
                          <a 
                            href={app.resumeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 px-4 py-2 rounded-xl border border-blue-500/20 transition-all text-sm font-bold"
                          >
                            <FileText className="w-4 h-4" /> Resume <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="flex items-center gap-2 bg-slate-800 text-slate-400 px-4 py-2 rounded-xl border border-slate-700 text-sm font-bold">
                            <FileText className="w-4 h-4" /> Via Google Form
                          </span>
                        )}
                        
                        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                          <select 
                            value={app.status}
                            onChange={(e) => handleUpdateAppStatus(app.id, e.target.value as any)}
                            className="bg-transparent text-xs text-slate-400 px-2 py-1 focus:outline-none"
                          >
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="rejected">Rejected</option>
                            <option value="hired">Hired</option>
                          </select>
                          <button 
                            onClick={() => handleDeleteApplication(app.id)}
                            className="p-1.5 text-slate-600 hover:text-red-500 transition-colors"
                            title="Delete Application"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'categories' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 sticky top-24 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-500" />
                  Add Category
                </h2>
                <form onSubmit={handleAddCategory} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Category Name</label>
                    <input 
                      required 
                      value={newCategoryName}
                      onChange={e => setNewCategoryName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" 
                      placeholder="e.g. Healthcare" 
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20"
                  >
                    Add Category
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2">
              {loading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
              ) : categories.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-20 text-center">
                  <p className="text-slate-500">No categories found. Add one to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories.map(cat => (
                    <div key={cat.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between group hover:border-slate-700 transition-all">
                      <span className="text-white font-bold">{cat.name}</span>
                      <button 
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
