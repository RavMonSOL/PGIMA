import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8 text-slate-400">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & About */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-none tracking-tight text-white mb-1">Prime Goal</span>
              <span className="text-xs uppercase tracking-wider text-blue-500 font-semibold">International Manpower Inc.</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 mt-4">
              Connecting the right people to the right opportunities. A Top Deploying Agency recognized by the DMW, dedicated to ethical recruitment and transforming lives.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://www.facebook.com/modelopremiumcollections" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/employers" className="hover:text-blue-400 transition-colors">For Employers</Link></li>
              <li><Link to="/applicants" className="hover:text-blue-400 transition-colors">For Applicants</Link></li>
              <li><Link to="/success-stories" className="hover:text-blue-400 transition-colors">Success Stories</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-white font-semibold mb-6">Industries We Serve</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Medical & Healthcare</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Engineering & Construction</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Professional Services</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Household Services</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Information</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>Padre Faura Center, 472 P. Faura St. corner M.H. Del Pilar, Ermita, Manila, Philippines</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span>(+63) 02 5313 9446</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span>pgima23@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance Section */}
        <div className="border-t border-slate-800 pt-8 pb-4 flex flex-col items-center justify-center gap-6 text-center">
          <div className="bg-slate-900/80 p-6 rounded-xl border border-red-900/30 max-w-4xl w-full">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
              <ShieldCheck className="w-10 h-10 text-emerald-500" />
              <div className="text-center md:text-left">
                <p className="text-lg font-bold text-white">Licensed by the Department of Migrant Workers</p>
                <p className="text-sm text-blue-400 font-medium">License No: DMW-126-LB-06302023-R | Validity: 05/06/2027 | Status: Cleared/Valid</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 mb-2">
              <strong className="text-red-400">ANTI-ILLEGAL RECRUITMENT WARNING:</strong> Illegal recruitment is a crime punishable by law. Do not deal with unlicensed recruiters or individuals.
            </p>
            <a href="https://dmw.gov.ph/inquiry/licensed-recruitment-agencies" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-300 underline">
              Verify our license at the official DMW 'Verification of Licensed Agencies' Portal
            </a>
          </div>
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Prime Goal International Manpower Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
