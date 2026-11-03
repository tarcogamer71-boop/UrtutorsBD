import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  Star,
  MapPin,
  BookOpen,
  GraduationCap,
  Award,
  Crown,
  Zap,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

export const TutorDetailModal: React.FC = () => {
  const {
    selectedTutorForDetail,
    setSelectedTutorForDetail,
    language,
    setActiveView,
    submitTuitionRequest,
    currentGuardianName,
  } = useApp();

  if (!selectedTutorForDetail) return null;

  const tutor = selectedTutorForDetail;

  const handleHireTutor = () => {
    setSelectedTutorForDetail(null);
    setActiveView('request-tuition');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold">
              {language === 'bn' ? 'ভেরিফাইড টিউটর প্রোফাইল' : 'Verified Tutor Academic Profile'}
            </h3>
          </div>
          <button
            onClick={() => setSelectedTutorForDetail(null)}
            className="text-slate-400 hover:text-white p-1 rounded-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Top Profile Summary */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-slate-100 text-center sm:text-left">
            <div className="relative shrink-0">
              <img
                src={tutor.photoUrl}
                alt={tutor.fullName}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-200 shadow-md"
                referrerPolicy="no-referrer"
              />
              {tutor.membershipTier === 'Diamond' && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                  💎 Diamond
                </span>
              )}
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h4 className="text-xl font-extrabold text-slate-900">{tutor.fullName}</h4>
                {tutor.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Credentials
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-blue-800">{tutor.universityName}</p>
              <p className="text-xs text-slate-500">
                {tutor.department} · {tutor.currentYearSemester}
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-3 pt-2 text-xs text-slate-600">
                <span className="flex items-center gap-1 font-bold text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {tutor.rating > 0 ? tutor.rating.toFixed(2) : '5.0'} ({tutor.reviewCount} Reviews)
                </span>
                <span>·</span>
                <span>{tutor.experienceYears} Years Exp</span>
                <span>·</span>
                <span>{tutor.completedTuitions} Tuitions Done</span>
              </div>
            </div>
          </div>

          {/* Academic Background Details */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {language === 'bn' ? 'অ্যাকাডেমিক ফলাফল ও রেকর্ড' : 'Academic Credentials'}
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1 text-xs">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>SSC Examination</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-bold">
                    GPA {tutor.ssc.gpa}
                  </span>
                </div>
                <p className="text-slate-600">
                  Group: {tutor.ssc.group} ({tutor.ssc.passingYear})
                </p>
                <p className="text-slate-500 text-[11px]">{tutor.ssc.board}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1 text-xs">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>HSC Examination</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-bold">
                    GPA {tutor.hsc.gpa}
                  </span>
                </div>
                <p className="text-slate-600">
                  Group: {tutor.hsc.group} ({tutor.hsc.passingYear})
                </p>
                <p className="text-slate-500 text-[11px]">{tutor.hsc.board}</p>
              </div>
            </div>
          </div>

          {/* Teaching Information */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {language === 'bn' ? 'শিক্ষাদানের বিবরণ ও এলাকা' : 'Teaching Details & Locations'}
            </h5>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
              <div>
                <span className="text-slate-500 font-medium block mb-1">Expert Subjects:</span>
                <div className="flex flex-wrap gap-1.5">
                  {tutor.subjects.map((s) => (
                    <span
                      key={s}
                      className="bg-white border border-slate-200 text-slate-800 font-semibold px-2.5 py-1 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-slate-500 font-medium block">Eligible Classes:</span>
                  <p className="font-bold text-slate-800 mt-0.5">{tutor.preferredClasses.join(', ')}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Teaching Mediums:</span>
                  <p className="font-bold text-slate-800 mt-0.5">{tutor.mediums.join(', ')}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-500 font-medium block">Preferred Locations:</span>
                <p className="font-bold text-slate-800 mt-0.5">{tutor.preferredLocations.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          {tutor.bio && (
            <div className="space-y-1.5">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {language === 'bn' ? 'পাঠদানের পদ্ধতি ও অভিজ্ঞতা' : 'Teaching Strategy & Bio'}
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/40 p-3 rounded-lg border border-blue-100">
                “{tutor.bio}”
              </p>
            </div>
          )}

          {/* Privacy & Safety Note */}
          <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Privacy Protection Notice:</strong> In accordance with Bangladesh digital safety regulations, tutor phone numbers and government NID documents are protected until guardian requirements and trial classes are mutually approved.
            </span>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">
                Expected Minimum
              </span>
              <span className="text-base font-extrabold text-slate-900 font-mono-numbers">
                ৳{tutor.expectedMinSalary.toLocaleString('en-IN')}/month
              </span>
            </div>

            <button
              onClick={handleHireTutor}
              className="px-6 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'bn' ? 'এই শিক্ষককে পাওয়ার আবেদন করুন' : 'Request This Tutor Now'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
