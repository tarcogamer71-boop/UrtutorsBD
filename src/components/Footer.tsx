import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Heart,
  Globe,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language, setActiveView } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Brand & Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-700 text-amber-400 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Ur<span className="text-blue-500">Tutors</span><span className="text-amber-500 font-extrabold">BD</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              <strong className="text-slate-200 block mb-1">{t.brand.tagline}</strong>
              {t.brand.statement}
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Registered Bangladeshi Educational Agency & Placement Network</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
              {language === 'bn' ? 'প্রধান লিঙ্কসমূহ' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => setActiveView('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('directory')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.findTutors}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('tuition-board')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.tuitionRequests}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('memberships')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.membershipPlans}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals & Roles */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
              {language === 'bn' ? 'পোর্টাল ও সেবা' : 'Portals & Services'}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => setActiveView('request-tuition')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'অভিভাবক টিউশন রিকোয়ারমেন্ট' : 'Guardian Tuition Request'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('become-tutor')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'টিউটর রেজিস্ট্রেশন ফর্ম' : 'Apply as Tutor'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.howItWorks}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.aboutUs}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Helpdesk */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
              {language === 'bn' ? 'যোগাযোগ ও সাপোর্ট' : 'UrTutorsBD Helpline'}
            </h4>
            <div className="space-y-2 text-slate-400 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Phone className="w-3.5 h-3.5" />
                <span>01341718208</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>support@urtutorsbd.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Dhanmondi, Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} UrTutorsBD. All rights reserved. Connecting Knowledge. Empowering Futures.
          </div>
          <div className="flex items-center gap-4">
            <span>Bangladesh (৳ / BDT)</span>
            <span>·</span>
            <span>Privacy Policy & Terms</span>
            <span>·</span>
            <span>SSL Secured</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
