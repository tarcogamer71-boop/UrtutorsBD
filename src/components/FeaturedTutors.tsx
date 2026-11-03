import React from 'react';
import { useApp } from '../context/AppContext';
import { TutorProfile } from '../types';
import {
  ShieldCheck,
  Star,
  MapPin,
  GraduationCap,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export const FeaturedTutors: React.FC = () => {
  const { tutors, t, language, setActiveView, setSelectedTutorForDetail } = useApp();

  // Sort Diamond and Premium tutors first for featured section
  const featured = [...tutors]
    .filter((t) => t.status === 'Approved')
    .sort((a, b) => {
      const tierRank = { Diamond: 3, Premium: 2, Free: 1 };
      return (tierRank[b.membershipTier] || 1) - (tierRank[a.membershipTier] || 1);
    })
    .slice(0, 4);

  const handleSelectTutor = (tutor: TutorProfile) => {
    setSelectedTutorForDetail(tutor);
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">
              {language === 'bn' ? 'শীর্ষ মেধাবী শিক্ষক' : 'Top Verified Educators'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {language === 'bn' ? 'নির্বাচিত ও ভেরিফাইড টিউটরবৃন্দ' : 'Featured Verified Tutors'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              {language === 'bn'
                ? 'বুয়েট, ঢাকা বিশ্ববিদ্যালয়, ঢাকা মেডিকেল ও শীর্ষ প্রতিষ্ঠানের যাচাইকৃত শিক্ষকবৃন্দ।'
                : 'Background-checked university tutors ready for home and online sessions across Bangladesh.'}
            </p>
          </div>

          <button
            onClick={() => setActiveView('directory')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-900 transition-colors cursor-pointer"
          >
            <span>{language === 'bn' ? 'সকল টিউটর দেখুন' : 'Browse All Verified Tutors'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((tutor) => (
            <div
              key={tutor.id}
              className={`bg-white rounded-xl border transition-all flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg ${
                tutor.membershipTier === 'Diamond'
                  ? 'border-amber-300 ring-1 ring-amber-300/50'
                  : tutor.membershipTier === 'Premium'
                  ? 'border-blue-200'
                  : 'border-slate-200'
              }`}
            >
              {/* Card Header with Photo */}
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="relative shrink-0">
                    <img
                      src={tutor.photoUrl}
                      alt={tutor.fullName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                    {tutor.membershipTier === 'Diamond' && (
                      <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-xs">
                        💎
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-900 truncate">{tutor.fullName}</h3>
                      {tutor.isVerified && (
                        <span title="Academic Verified">
                          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-blue-800 font-medium truncate mt-0.5">
                      {tutor.universityName}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">{tutor.department}</p>
                  </div>
                </div>

                {/* Unboxed Metadata (anti-slop clean text separators) */}
                <div className="text-[11px] text-slate-500 flex items-center flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  <span className="font-semibold text-slate-700">{tutor.experienceYears}y Exp</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {tutor.rating > 0 ? tutor.rating.toFixed(2) : '5.0'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{tutor.completedTuitions} Tuitions</span>
                </div>

                {/* Subjects & Locations */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block">
                      {language === 'bn' ? 'বিষয়সমূহ:' : 'Subjects:'}
                    </span>
                    <p className="text-slate-700 font-medium line-clamp-1">
                      {tutor.subjects.join(', ')}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block">
                      {language === 'bn' ? 'পছন্দের এলাকা:' : 'Locations:'}
                    </span>
                    <p className="text-slate-600 line-clamp-1">
                      {tutor.preferredLocations.join(', ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer with Expected Salary & Button */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">
                    {language === 'bn' ? 'প্রত্যাশিত বেতন' : 'Min Expected'}
                  </span>
                  <span className="text-xs font-bold text-slate-900 font-mono-numbers">
                    ৳{tutor.expectedMinSalary.toLocaleString('en-IN')}/mo
                  </span>
                </div>

                <button
                  onClick={() => handleSelectTutor(tutor)}
                  className="px-3 py-1.5 text-xs font-semibold text-blue-700 hover:text-white bg-white hover:bg-blue-700 border border-blue-200 hover:border-blue-700 rounded-lg transition-colors cursor-pointer"
                >
                  {t.directory.viewProfile}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
