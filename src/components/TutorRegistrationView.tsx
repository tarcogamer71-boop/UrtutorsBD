import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MediumType } from '../types';
import {
  GraduationCap,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export const TutorRegistrationView: React.FC = () => {
  const { registerTutor, t, language, setActiveView } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [presentAddress, setPresentAddress] = useState('');
  const [preferredLocations, setPreferredLocations] = useState('Dhanmondi, Mohammadpur, Lalmatia');

  // Academic State
  const [universityName, setUniversityName] = useState('University of Dhaka');
  const [department, setDepartment] = useState('Department of Physics');
  const [currentYearSemester, setCurrentYearSemester] = useState('3rd Year, 1st Semester');
  const [sscGroup, setSscGroup] = useState('Science');
  const [sscYear, setSscYear] = useState('2021');
  const [sscGpa, setSscGpa] = useState('5.00');
  const [sscBoard, setSscBoard] = useState('Dhaka Board');

  const [hscGroup, setHscGroup] = useState('Science');
  const [hscYear, setHscYear] = useState('2023');
  const [hscGpa, setHscGpa] = useState('5.00');
  const [hscBoard, setHscBoard] = useState('Dhaka Board (Notre Dame College)');

  // Teaching State
  const [preferredClasses, setPreferredClasses] = useState('Class 9, Class 10, HSC 1st Year');
  const [subjects, setSubjects] = useState('Physics, Higher Mathematics, General Science');
  const [selectedMediums, setSelectedMediums] = useState<MediumType[]>([
    'Bangla Medium',
    'English Version',
  ]);
  const [experienceYears, setExperienceYears] = useState(3);
  const [expectedMinSalary, setExpectedMinSalary] = useState(7000);
  const [bio, setBio] = useState(
    'Passionate university science tutor focused on conceptual clarity, board question analysis, and routine weekly assessments.'
  );

  const toggleMedium = (m: MediumType) => {
    setSelectedMediums((prev) =>
      prev.includes(m) ? prev.filter((item) => item !== m) : [...prev, m]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !universityName) {
      alert('Please fill out all required fields.');
      return;
    }

    const newId = registerTutor({
      fullName,
      email: email || `${fullName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      phone,
      whatsapp: whatsapp || phone,
      gender,
      photoUrl:
        gender === 'Female'
          ? '/src/assets/images/tutor_portrait_female_1793694103963.jpg'
          : '/src/assets/images/tutor_portrait_male_1793694105499.jpg',
      presentAddress,
      preferredLocations: preferredLocations.split(',').map((s) => s.trim()).filter(Boolean),
      universityName,
      department,
      currentYearSemester,
      ssc: {
        group: sscGroup,
        passingYear: sscYear,
        gpa: sscGpa,
        board: sscBoard,
      },
      hsc: {
        group: hscGroup,
        passingYear: hscYear,
        gpa: hscGpa,
        board: hscBoard,
      },
      preferredClasses: preferredClasses.split(',').map((s) => s.trim()).filter(Boolean),
      subjects: subjects.split(',').map((s) => s.trim()).filter(Boolean),
      mediums: selectedMediums,
      experienceYears: Number(experienceYears),
      expectedMinSalary: Number(expectedMinSalary),
      bio,
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
                {language === 'bn' ? 'আবেদন গৃহীত' : 'Application Received'}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                {t.tutorForm.successTitle}
              </h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                {t.tutorForm.successNotice}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono-numbers text-center">
              <div className="text-xs text-slate-400 uppercase tracking-widest font-sans font-semibold">
                {language === 'bn' ? 'আবেদন রেফারেন্স নম্বর' : 'Tutor Application Reference ID'}
              </div>
              <div className="text-2xl font-extrabold text-blue-900 mt-1">{submittedId}</div>
              <div className="text-xs text-slate-500 mt-1 font-sans">
                Status: <span className="font-semibold text-amber-600">Under Review</span>
              </div>
            </div>

            <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200 text-xs text-blue-900 text-left space-y-1.5">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>{language === 'bn' ? 'নিরাপদ ভেরিফিকেশন নীতিমালা' : 'Safe Verification Process'}</span>
              </div>
              <p className="text-slate-600">
                Per UrTutorsBD privacy standards, your sensitive NID or academic certificate photos are never collected on public forms. Our verification team will reach out via official phone/WhatsApp (01341718208) to verify your university affiliation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => setActiveView('tutor-dashboard')}
                className="flex-1 py-3 px-4 text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-lg transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'আমার ড্যাশবোর্ডে প্রবেশ করুন' : 'Go to Tutor Dashboard'}
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
        {/* Title & Introduction */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">
            {language === 'bn' ? 'শিক্ষকদের প্ল্যাটফর্ম' : 'University Educators Network'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.tutorForm.title}
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            {t.tutorForm.subtitle}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-500">
          <div
            className={`flex items-center gap-2 cursor-pointer ${
              step === 1 ? 'text-blue-700' : step > 1 ? 'text-emerald-700' : ''
            }`}
            onClick={() => setStep(1)}
          >
            <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-mono text-[11px]">
              1
            </span>
            <span>{t.tutorForm.step1}</span>
          </div>

          <div className="w-12 h-px bg-slate-200 hidden sm:block" />

          <div
            className={`flex items-center gap-2 cursor-pointer ${
              step === 2 ? 'text-blue-700' : step > 2 ? 'text-emerald-700' : ''
            }`}
            onClick={() => setStep(2)}
          >
            <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-mono text-[11px]">
              2
            </span>
            <span>{t.tutorForm.step2}</span>
          </div>

          <div className="w-12 h-px bg-slate-200 hidden sm:block" />

          <div
            className={`flex items-center gap-2 cursor-pointer ${
              step === 3 ? 'text-blue-700' : ''
            }`}
            onClick={() => setStep(3)}
          >
            <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-mono text-[11px]">
              3
            </span>
            <span>{t.tutorForm.step3}</span>
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                1. {t.tutorForm.step1}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    {t.tutorForm.fullName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Asif Mahmud"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    {t.tutorForm.gender} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                  >
                    <option value="Male">Male (পুরুষ)</option>
                    <option value="Female">Female (নারী)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    {t.tutorForm.phone} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    {t.tutorForm.whatsapp}
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.tutorForm.email}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="asif.sust@gmail.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.tutorForm.presentAddress}
                </label>
                <input
                  type="text"
                  value={presentAddress}
                  onChange={(e) => setPresentAddress(e.target.value)}
                  placeholder="e.g. Mirpur-10, Dhaka"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.tutorForm.preferredLocations} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={preferredLocations}
                  onChange={(e) => setPreferredLocations(e.target.value)}
                  placeholder="e.g. Dhanmondi, Mohammadpur, Lalmatia"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{language === 'bn' ? 'পরবর্তী ধাপ (অ্যাকাডেমিক তথ্য)' : 'Next: Academic Details'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Academic Qualifications */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                2. {t.tutorForm.step2}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    {t.tutorForm.universityName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={universityName}
                    onChange={(e) => setUniversityName(e.target.value)}
                    placeholder="e.g. BUET / University of Dhaka / DMC"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    {t.tutorForm.department} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Computer Science / EEE / MBBS"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.tutorForm.currentYearSemester}
                </label>
                <input
                  type="text"
                  value={currentYearSemester}
                  onChange={(e) => setCurrentYearSemester(e.target.value)}
                  placeholder="e.g. 3rd Year, 2nd Semester / Graduated"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              {/* SSC Details */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                  {t.tutorForm.sscDetails}
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-1">Group</label>
                    <input
                      type="text"
                      value={sscGroup}
                      onChange={(e) => setSscGroup(e.target.value)}
                      placeholder="Science"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-1">Year</label>
                    <input
                      type="text"
                      value={sscYear}
                      onChange={(e) => setSscYear(e.target.value)}
                      placeholder="2021"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-1">GPA (5.00)</label>
                    <input
                      type="text"
                      value={sscGpa}
                      onChange={(e) => setSscGpa(e.target.value)}
                      placeholder="5.00"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* HSC Details */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                  {t.tutorForm.hscDetails}
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-1">Group</label>
                    <input
                      type="text"
                      value={hscGroup}
                      onChange={(e) => setHscGroup(e.target.value)}
                      placeholder="Science"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-1">Year</label>
                    <input
                      type="text"
                      value={hscYear}
                      onChange={(e) => setHscYear(e.target.value)}
                      placeholder="2023"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-1">GPA (5.00)</label>
                    <input
                      type="text"
                      value={hscGpa}
                      onChange={(e) => setHscGpa(e.target.value)}
                      placeholder="5.00"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'আগের ধাপ' : 'Back'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{language === 'bn' ? 'পরবর্তী ধাপ (শিক্ষাদান তথ্য)' : 'Next: Teaching Details'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Teaching Preferences */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                3. {t.tutorForm.step3}
              </h2>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.tutorForm.subjects} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={subjects}
                  onChange={(e) => setSubjects(e.target.value)}
                  placeholder="e.g. Physics, Higher Math, General Math, ICT"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.tutorForm.preferredClasses} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={preferredClasses}
                  onChange={(e) => setPreferredClasses(e.target.value)}
                  placeholder="e.g. Class 9, Class 10, HSC 1st Year, O Level"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              {/* Medium Checkboxes */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  {t.tutorForm.mediums} <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {(['Bangla Medium', 'English Version', 'English Medium'] as MediumType[]).map(
                    (m) => (
                      <button
                        type="button"
                        key={m}
                        onClick={() => toggleMedium(m)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                          selectedMediums.includes(m)
                            ? 'bg-blue-700 text-white border-blue-700 shadow-2xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {m}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    {t.tutorForm.experienceYears}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="25"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-mono-numbers"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    {t.tutorForm.expectedSalary} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="500"
                    min="3000"
                    required
                    value={expectedMinSalary}
                    onChange={(e) => setExpectedMinSalary(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-mono-numbers font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.tutorForm.bio}
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              {/* Important Transparency Notice */}
              <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200 text-[11px] text-amber-900">
                <span className="font-bold block mb-0.5">Basic Registration is 100% Free:</span>
                Your profile will be placed in the review queue. Tutors can view eligible tuitions immediately once approved.
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'আগের ধাপ' : 'Back'}</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-lg shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{t.tutorForm.submitBtn}</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
