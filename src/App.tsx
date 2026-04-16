/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Employers } from './pages/Employers';
import { Applicants } from './pages/Applicants';
import { SuccessStories } from './pages/SuccessStories';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthProvider } from './lib/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="employers" element={<Employers />} />
            <Route path="applicants" element={<Applicants />} />
            <Route path="success-stories" element={<SuccessStories />} />
            <Route path="contact" element={<Contact />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
