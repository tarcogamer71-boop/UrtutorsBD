import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MediumType } from '../types';
import {
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
} from 'lucide-react';

export const GuardianRequirementView: React.FC = () => {
  const { submitTuitionRequest, t, language, setActiveView } = useApp();

  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Form State
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [guardianWhatsApp, setGuardianWhatsApp] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [studentClass, setStudentClass] = useState('Class 10 (SSC 2027)');
  const [schoolCollege, setSchoolCollege] = useState('Viqarunnisa Noon School & College');
  const [medium, setMedium] = useState<MediumType>('Bangla Medium');
  const [subjects, setSubjects] = useState('Physics, Higher Mathematics, Chemistry');
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [preferredSchedule, setPreferredSchedule] = useState('Evening (5:30 PM - 7:00 PM)');
  const [preferredTutorGender, setPreferredTutorGender] = useState<'Any' | 'Male' | 'Female'>('Female');
  const [monthlyBudget, setMonthlyBudget] = useState(8000);
  const [location, setLocation] = useState('Dhanmondi, Dhaka');
  const [nearbyLandmark, setNearbyLandmark] = useState('Near Anam Rangs Plaza / Lake Park');
  const [additionalInstructions, setAdditionalInstructions] = useState(
    'Need a tutor with patience who can clarify difficult mathematical formulas and conduct weekly chapter exams.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!guardianName || !guardianPhone || !location) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    const newId = submitTuitionRequest({
      guardianName,
      guardianPhone,
      guardianWhatsApp: guardianWhatsApp || guardianPhone,
      guardianEmail,
      studentClass,
      schoolCollege,
      medium,
      subjects: subjects.split(',').map((s) => s.trim()).filter(Boolean),
      daysPerWeek: Number(daysPerWeek),
      preferredSchedule,
      preferredTutorGender,
      monthlyBudget: Number(monthlyBudget),
      location,
      nearbyLandmark,
      additionalInstructions,
    });

    setSubmittedId(newId);
  };

  if (submittedId) {
    return (
      <div className="py-16 bg-slate-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-8">
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-lg text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                {language === 'bn' ? 'সফলভাবে নিবন্ধিত' : 'Requirement Received'}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                {t.guardianForm.successTitle}
              </h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                {t.guardianForm.successNotice}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-mono-numbers text-center">
              <div className="text-xs text-slate-400 uppercase tracking-widest font-sans font-semibold">
                {language === 'bn' ? 'টিউশন ট্র্যাকিং আইডি' : 'Tuition Request Tracking ID'}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 mt-1">
                {submittedId}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-sans">
                Status: <span className="font-semibold text-blue-700">Academic Review in Progress</span>
              </div>
            </div>

            {/* Official Promise Note */}
            <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 text-xs text-blue-900 text-left space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-700" />
                <span>
                  {language === 'bn'
                    ? 'আমাদের অঙ্গীকার: ২৪ থেকে ৪৮ ঘণ্টার মধ্যে সমন্বয়'
                    : 'Our Guarantee: 24–48 Hours Tutor Matching'}
                </span>
              </div>
              <p className="text-slate-600">
                “Our team will review your requirement and aim to find a suitable tutor within 24–48 hours, subject to tutor availability.”
              </p>
              <p className="text-[11px] text-slate-500">
                You will receive a call or WhatsApp message from our coordinator on <span className="font-semibold text-slate-800">{guardianPhone}</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => setActiveView('guardian-dashboard')}
                className="flex-1 py-3 px-4 text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-lg transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'অভিভাবক ড্যাশবোর্ডে দেখুন' : 'Go to Guardian Dashboard'}
              </button>
              <button
                onClick={() => setActiveView('home')}
                className="py-3 px-6 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'মূল পাতায় ফিরুন' : 'Back to Home'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">
            {language === 'bn' ? 'অভিভাবকদের জন্য সেবা' : 'Guardian Concierge Service'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.guardianForm.title}
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            {t.guardianForm.subtitle}
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-9 rounded-2xl border border-slate-200 shadow-sm space-y-6"
        >
          {/* Guardian Info */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Phone className="w-4 h-4 text-blue-700" />
              <span>{language === 'bn' ? '১. অভিভাবকের যোগাযোগের তথ্য' : '1. Guardian Contact Information'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.guardianForm.guardianName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  placeholder="e.g. Engr. Mahmudul Hassan"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.guardianForm.guardianPhone} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={guardianPhone}
                  onChange={(e) => setGuardianPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.guardianForm.guardianWhatsApp}
                </label>
                <input
                  type="tel"
                  value={guardianWhatsApp}
                  onChange={(e) => setGuardianWhatsApp(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.guardianForm.guardianEmail}
                </label>
                <input
                  type="email"
                  value={guardianEmail}
                  onChange={(e) => setGuardianEmail(e.target.value)}
                  placeholder="guardian@example.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Student & Academic Requirements */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Calendar className="w-4 h-4 text-blue-700" />
              <span>{language === 'bn' ? '২. শিক্ষার্থী ও পড়াশোনার বিবরণ' : '2. Student & Academic Requirements'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.guardianForm.studentClass} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  placeholder="e.g. Class 10 / HSC 1st Year / A Level"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.guardianForm.schoolCollege}
                </label>
                <input
                  type="text"
                  value={schoolCollege}
                  onChange={(e) => setSchoolCollege(e.target.value)}
                  placeholder="e.g. St. Joseph / Notre Dame / Viqarunnisa"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.guardianForm.medium} <span className="text-red-500">*</span>
                </label>
                <select
                  value={medium}
                  onChange={(e) => setMedium(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                >
                  <option value="Bangla Medium">Bangla Medium (বাংলা মাধ্যম)</option>
                  <option value="English Version">English Version (ইংলিশ ভার্সন)</option>
                  <option value="English Medium">English Medium (Cambridge / Edexcel)</option>
                  <option value="Madrasah">Madrasah (মাদ্রাসা)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.guardianForm.subjects} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={subjects}
                  onChange={(e) => setSubjects(e.target.value)}
                  placeholder="e.g. Physics, Higher Math, Chemistry"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.guardianForm.daysPerWeek}
                </label>
                <select
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                >
                  <option value="2">2 Days / Week</option>
                  <option value="3">3 Days / Week</option>
                  <option value="4">4 Days / Week</option>
                  <option value="5">5 Days / Week</option>
                  <option value="6">6 Days / Week</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.guardianForm.preferredSchedule}
                </label>
                <input
                  type="text"
                  value={preferredSchedule}
                  onChange={(e) => setPreferredSchedule(e.target.value)}
                  placeholder="Evening (6 PM - 7:30 PM)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.guardianForm.preferredGender}
                </label>
                <select
                  value={preferredTutorGender}
                  onChange={(e) => setPreferredTutorGender(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                >
                  <option value="Any">Any / No Preference</option>
                  <option value="Female">Female (নারী টিউটর)</option>
                  <option value="Male">Male (পুরুষ টিউটর)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location & Budget */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <MapPin className="w-4 h-4 text-blue-700" />
              <span>{language === 'bn' ? '৩. এলাকা ও মাসিক বাজেট' : '3. Location & Monthly Budget'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.guardianForm.location} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Dhanmondi Road 8/A, Dhaka"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.guardianForm.nearbyLandmark}
                </label>
                <input
                  type="text"
                  value={nearbyLandmark}
                  onChange={(e) => setNearbyLandmark(e.target.value)}
                  placeholder="e.g. Near Lake Park / Mastermind School"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {t.guardianForm.monthlyBudget} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-500">৳</span>
                <input
                  type="number"
                  step="500"
                  min="3000"
                  required
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-mono-numbers font-bold focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {t.guardianForm.additionalInstructions}
              </label>
              <textarea
                rows={3}
                value={additionalInstructions}
                onChange={(e) => setAdditionalInstructions(e.target.value)}
                placeholder="Mention any weaknesses, upcoming board exams, or special instructions..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Privacy Note */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{t.guardianForm.privacyNote}</span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-6 text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.guardianForm.submitBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
