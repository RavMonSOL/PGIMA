import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, isAdmin: false, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        setUser(currentUser);
        
        if (currentUser) {
          const isDefaultAdmin = currentUser.email === 'agent47sui@gmail.com';
          
          // Optimistically set admin status for the default admin
          if (isDefaultAdmin) {
            setIsAdmin(true);
          }

          try {
            // Check if user exists in Firestore, if not create a basic profile
            const userDocRef = doc(db, 'users', currentUser.uid);
            const userDoc = await getDoc(userDocRef);
            
            if (!userDoc.exists()) {
              await setDoc(userDocRef, {
                email: currentUser.email,
                role: isDefaultAdmin ? 'admin' : 'user',
                displayName: currentUser.displayName || '',
                createdAt: new Date()
              });
              setIsAdmin(isDefaultAdmin);
            } else {
              const userData = userDoc.data();
              // If it's the default admin but role is wrong in DB, fix it
              if (isDefaultAdmin && userData?.role !== 'admin') {
                await setDoc(userDocRef, { ...userData, role: 'admin' }, { merge: true });
                setIsAdmin(true);
              } else {
                setIsAdmin(userData?.role === 'admin' || isDefaultAdmin);
              }
            }
          } catch (error) {
            console.error("Firestore user sync error:", error);
            // If it's the default admin, we already set isAdmin(true) above, 
            // so they can still access the dashboard even if Firestore is being difficult.
          }
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
