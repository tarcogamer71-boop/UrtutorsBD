import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Calculator,
  Atom,
  Dna,
  Languages,
  Binary,
  PieChart,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';

export const AcademicCategoriesSection: React.FC = () => {
  const { language, setActiveView, setSelectedSubject, setSelectedClass } = useApp();

  const subjects = [
    { name: 'Physics (পদার্থবিজ্ঞান)', icon: <Atom className="w-5 h-5 text-blue-600" />, filter: 'Physics', count: '120+ Tutors' },
    { name: 'Higher Math (উচ্চতর গণিত)', icon: <Calculator className="w-5 h-5 text-amber-600" />, filter: 'Mathematics', count: '145+ Tutors' },
    { name: 'Chemistry (রসায়ন)', icon: <Atom className="w-5 h-5 text-emerald-600" />, filter: 'Chemistry', count: '98+ Tutors' },
    { name: 'Biology (জীববিজ্ঞান)', icon: <Dna className="w-5 h-5 text-purple-600" />, filter: 'Biology', count: '85+ Tutors' },
    { name: 'English (ইংরেজি)', icon: <Languages className="w-5 h-5 text-indigo-600" />, filter: 'English', count: '110+ Tutors' },
    { name: 'ICT & Programming', icon: <Binary className="w-5 h-5 text-cyan-600" />, filter: 'ICT', count: '75+ Tutors' },
    { name: 'Accounting & Finance', icon: <PieChart className="w-5 h-5 text-rose-600" />, filter: 'Accounting', count: '60+ Tutors' },
    { name: 'Admission Test Prep', icon: <GraduationCap className="w-5 h-5 text-amber-500" />, filter: 'Admission', count: '130+ Tutors' },
  ];

  const levels = [
    { label: 'Secondary / SSC (৯ম - ১০ম শ্রেণি)', value: 'Class 10' },
    { label: 'Higher Secondary / HSC (১১শ -১২শ শ্রেণি)', value: 'HSC' },
    { label: 'English Medium (Cambridge / Edexcel O & A Level)', value: 'O Level' },
    { label: 'Junior School (৬ষ্ঠ - ৮ম শ্রেণি)', value: 'Class 8' },
    { label: 'BUET / Engineering Admission Coaching', value: 'Admission' },
    { label: 'Medical College Admission Guidance', value: 'Admission' },
  ];

  const handleSubjectClick = (subjFilter: string) => {
    setSelectedSubject(subjFilter);
    setActiveView('directory');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleLevelClick = (levelValue: string) => {
    setSelectedClass(levelValue);
    setActiveView('directory');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">
            {language === 'bn' ? 'সকল বিষয় ও শ্রেণি' : 'Subject Specialties'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'bn' ? 'জনপ্রিয় বিষয় ও অ্যাকাডেমিক লেভেল' : 'Popular Subjects & Academic Levels'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {language === 'bn'
              ? 'স্কুল, কলেজ, ও/এ লেভেল এবং বিশ্ববিদ্যালয় ভর্তি পরীক্ষার জন্য বিষয়ভিত্তিক অভিজ্ঞ শিক্ষক।'
              : 'Dedicated tutors for Bangla Medium, English Version, and Cambridge Edexcel curriculums.'}
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjects.map((sub) => (
            <div
              key={sub.name}
              onClick={() => handleSubjectClick(sub.filter)}
              className="bg-white p-5 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center shrink-0 border border-slate-200/60 transition-colors">
                  {sub.icon}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {sub.name}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">{sub.count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Levels Strip */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              {language === 'bn' ? 'শ্রেণিভিত্তিক শিক্ষক নির্বাচন' : 'Browse by Academic Curriculum Level'}
            </h3>
            <span className="text-xs text-slate-400">Class 1 to Admission</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {levels.map((lvl) => (
              <button
                key={lvl.label}
                onClick={() => handleLevelClick(lvl.value)}
                className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-left text-xs font-semibold text-slate-700 hover:text-blue-900 transition-all flex items-center justify-between cursor-pointer"
              >
                <span>{lvl.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
