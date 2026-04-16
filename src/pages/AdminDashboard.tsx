import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';
import { Plus, Pencil, Trash2, LogIn, LogOut, Loader2, Briefcase, MapPin, Tag, CheckCircle2, XCircle } from 'lucide-react';

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

export function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
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
    const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
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

  const handleDelete = async (id: string) => {
    if (!isAdmin || !window.confirm('Are you sure you want to delete this job posting?')) return;
    try {
      await deleteDoc(doc(db, 'jobs', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `jobs/${id}`);
    }
  };

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Job Management</h1>
            <p className="text-slate-400">Add, update, or remove current job openings.</p>
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
                      <option value="Healthcare">Healthcare</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Construction">Construction</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Domestic">Domestic</option>
                      <option value="Other">Other</option>
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
                          onClick={() => handleDelete(job.id)}
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
      </div>
    </div>
  );
}
