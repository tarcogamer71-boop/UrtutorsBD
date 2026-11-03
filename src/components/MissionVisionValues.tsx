import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Award,
  Globe2,
  Scale,
  Sparkles,
  Cpu,
  Target,
  Compass,
} from 'lucide-react';

export const MissionVisionValues: React.FC = () => {
  const { t, language } = useApp();

  const valueIcons = [
    <ShieldCheck key="trust" className="w-5 h-5 text-blue-700" />,
    <Award key="quality" className="w-5 h-5 text-amber-600" />,
    <Globe2 key="access" className="w-5 h-5 text-emerald-600" />,
    <Scale key="integrity" className="w-5 h-5 text-indigo-600" />,
    <Sparkles key="opportunity" className="w-5 h-5 text-amber-500" />,
    <Cpu key="innovation" className="w-5 h-5 text-blue-600" />,
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">
            {language === 'bn' ? 'আমাদের দর্শন ও মূল ভিত্তি' : 'Our Foundation & Philosophy'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'bn' ? 'মিশন, ভিশন ও মূল্যবোধ' : 'Mission, Vision & Core Values'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {language === 'bn'
              ? 'UrTutorsBD শিক্ষার্থীদের মেধার সর্বোচ্চ বিকাশ এবং শিক্ষকদের ক্যারিয়ারের অগ্রগতিতে বিশ্বস্ত সঙ্গী হিসেবে কাজ করে।'
              : 'UrTutorsBD exists to bridge educational gaps with trust, academic discipline, and nationwide accessibility.'}
          </p>
        </div>

        {/* Mission & Vision Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Mission Card */}
          <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-slate-950 text-white rounded-2xl p-8 sm:p-10 shadow-xl border border-blue-800/40 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-800/80 text-amber-400 flex items-center justify-center border border-blue-700/60 shadow-inner">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>{t.missionVision.missionTitle}</span>
              </h3>
              <blockquote className="text-blue-100/90 leading-relaxed text-sm sm:text-base italic border-l-2 border-amber-400 pl-4 py-1">
                “{t.missionVision.missionQuote}”
              </blockquote>
            </div>

            <div className="mt-8 pt-6 border-t border-blue-800/60 grid grid-cols-2 gap-3 text-xs text-blue-200">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{language === 'bn' ? 'মানসম্মত শিক্ষা সহজলভ্য' : 'Accessible Quality Education'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{language === 'bn' ? 'অভিভাবকদের নিশ্চিন্ত সেবা' : 'Verified Guardian Peace'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{language === 'bn' ? 'মেধাবী শিক্ষকদের মর্যাদা' : 'Tutor Career Empowerment'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{language === 'bn' ? 'স্বচ্ছ ও ন্যায়নিষ্ঠ সমন্বয়' : 'Ethical Placement Standard'}</span>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 text-white rounded-2xl p-8 sm:p-10 shadow-xl border border-blue-800/40 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-800/80 text-amber-400 flex items-center justify-center border border-blue-700/60 shadow-inner">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>{t.missionVision.visionTitle}</span>
              </h3>
              <blockquote className="text-blue-100/90 leading-relaxed text-sm sm:text-base italic border-l-2 border-amber-400 pl-4 py-1">
                “{t.missionVision.visionQuote}”
              </blockquote>
            </div>

            <div className="mt-8 pt-6 border-t border-blue-800/60 grid grid-cols-2 gap-3 text-xs text-blue-200">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{language === 'bn' ? 'দেশব্যাপী টিউটরিং নেটওয়ার্ক' : 'Nationwide Tutoring Reach'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{language === 'bn' ? 'শহর ও প্রান্তিকে শিক্ষা' : 'Urban & Rural Inclusion'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{language === 'bn' ? 'প্রযুক্তি নির্ভর স্মার্ট ম্যাচ' : 'Smart Digital Matching'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{language === 'bn' ? 'বাংলাদেশের শীর্ষ শিক্ষা ব্র্যান্ড' : 'Bangladesh Top EdTech'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Six Core Values Cards */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {t.missionVision.coreValuesTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.missionVision.coreValuesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.missionVision.values.map((val, idx) => (
              <div
                key={val.name}
                className="bg-slate-50 hover:bg-white p-6 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-white group-hover:bg-blue-50 border border-slate-200/80 flex items-center justify-center shadow-xs mb-4 transition-colors">
                    {valueIcons[idx] || <ShieldCheck className="w-5 h-5 text-blue-700" />}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                    {val.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/50 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>0{idx + 1}</span>
                  <span className="text-blue-600/70 font-sans font-medium">UrTutorsBD Standard</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
