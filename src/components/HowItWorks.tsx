import React from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  UserCheck,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { t, language, setActiveView } = useApp();

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">
            {language === 'bn' ? 'সহজ ৩টি ধাপ' : 'Simple 3-Step Process'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.howItWorks.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* Two Columns: Guardians vs Tutors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Guardian Process */}
          <div className="bg-white p-7 sm:p-9 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                    G
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {t.howItWorks.forGuardiansTitle}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {language === 'bn' ? 'অভিভাবকদের জন্য' : 'Parents'}
                </span>
              </div>

              <div className="space-y-6">
                {t.howItWorks.guardianSteps.map((step) => (
                  <div key={step.step} className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-full bg-slate-100 text-blue-900 border border-slate-200 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={() => setActiveView('request-tuition')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-800 hover:bg-blue-900 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>{language === 'bn' ? 'এখনই শিক্ষক খুঁজুন' : 'Post Tuition Requirement'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tutor Process */}
          <div className="bg-white p-7 sm:p-9 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs">
                    T
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {t.howItWorks.forTutorsTitle}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {language === 'bn' ? 'শিক্ষকদের জন্য' : 'Educators'}
                </span>
              </div>

              <div className="space-y-6">
                {t.howItWorks.tutorSteps.map((step) => (
                  <div key={step.step} className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-full bg-slate-100 text-amber-700 border border-slate-200 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={() => setActiveView('become-tutor')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'bn' ? 'ফ্রি টিউটর হিসেবে যোগ দিন' : 'Register Free as Tutor'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
