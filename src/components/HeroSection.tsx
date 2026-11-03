import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  MapPin,
  GraduationCap,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Clock,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const {
    t,
    language,
    setActiveView,
    searchQuery,
    setSearchQuery,
    selectedLocation,
    setSelectedLocation,
    selectedMedium,
    setSelectedMedium,
    selectedClass,
    setSelectedClass,
    tutors,
    tuitionRequests,
  } = useApp();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveView('directory');
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };

  const approvedTutorsCount = tutors.filter((t) => t.status === 'Approved').length;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 bg-gradient-to-b from-slate-50 via-blue-50/20 to-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tagline / Regional Marker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 bg-blue-100/70 border border-blue-200/80 px-3 py-1.5 rounded-md">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
              {t.hero.headline}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {t.hero.subheadline}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveView('request-tuition')}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-blue-800 hover:bg-blue-900 rounded-lg shadow-sm shadow-blue-900/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{t.hero.btnFindTutor}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveView('become-tutor')}
                className="px-6 py-3.5 text-sm font-semibold text-blue-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <span>{t.hero.btnBecomeTutor}</span>
              </button>
            </div>

            {/* Search Filter Strip */}
            <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-lg shadow-slate-200/50 mt-6">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === 'bn' ? 'দ্রুত টিউটর খুঁজুন' : 'Instant Tutor Match Finder'}</span>
              </div>

              <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {/* Location */}
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                  >
                    <option value="All">{language === 'bn' ? 'সকল এলাকা' : 'All Locations'}</option>
                    <option value="Dhanmondi">Dhanmondi (ধানমন্ডি)</option>
                    <option value="Uttara">Uttara (উত্তরা)</option>
                    <option value="Gulshan">Gulshan & Banani (গুলশান)</option>
                    <option value="Mirpur">Mirpur (মিরপুর)</option>
                    <option value="Mohammadpur">Mohammadpur (মোহাম্মদপুর)</option>
                    <option value="Bashundhara">Bashundhara R/A (বসুন্ধরা)</option>
                    <option value="Baily Road">Baily Road / Shantinagar</option>
                    <option value="Chattogram">Chattogram (চট্টগ্রাম)</option>
                    <option value="Sylhet">Sylhet (সিলেট)</option>
                  </select>
                </div>

                {/* Class */}
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                  >
                    <option value="All">{language === 'bn' ? 'সকল শ্রেণি' : 'All Classes'}</option>
                    <option value="Class 8">Class 8 / JSC</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10 / SSC Candidate</option>
                    <option value="HSC 1st Year">HSC 1st Year</option>
                    <option value="HSC 2nd Year">HSC 2nd Year</option>
                    <option value="O Level">O Level (Cambridge/Edexcel)</option>
                    <option value="A Level">A Level</option>
                    <option value="Admission Test">University / Medical Admission</option>
                  </select>
                </div>

                {/* Medium */}
                <div>
                  <select
                    value={selectedMedium}
                    onChange={(e) => setSelectedMedium(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                  >
                    <option value="All">{language === 'bn' ? 'সকল মাধ্যম' : 'All Mediums'}</option>
                    <option value="Bangla Medium">Bangla Medium</option>
                    <option value="English Version">English Version</option>
                    <option value="English Medium">English Medium</option>
                  </select>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-2 px-4 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{t.hero.btnSearch}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100 aspect-[16/10] lg:aspect-[4/3]">
              <img
                src="/src/assets/images/hero_education_bangladesh_1793694103868.jpg"
                alt="UrTutorsBD Mentoring and Learning in Bangladesh"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent pointer-events-none" />

              {/* Verified Trust Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-white/40 shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-900 text-amber-400 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {language === 'bn' ? '১০০% নথিপত্র ভেরিফাইড শিক্ষক' : '100% Background-Checked Tutors'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      BUET · Dhaka University · DMC · IBA · NSU
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    4.9 / 5.0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Strip in Full-Width Row Below Hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200/80">
          <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">
                {(approvedTutorsCount * 125).toLocaleString('en-IN')}+
              </div>
              <div className="text-xs text-slate-500 font-medium">{t.hero.statsTutors}</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">
                {(tuitionRequests.length * 340).toLocaleString('en-IN')}+
              </div>
              <div className="text-xs text-slate-500 font-medium">{t.hero.statsGuardians}</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">98.4%</div>
              <div className="text-xs text-slate-500 font-medium">{t.hero.statsMatches}</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">24–48h</div>
              <div className="text-xs text-slate-500 font-medium">{t.hero.statsHours}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
