import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TutorProfile } from '../types';
import {
  Search,
  Filter,
  MapPin,
  BookOpen,
  GraduationCap,
  Star,
  ShieldCheck,
  Crown,
  Zap,
  ArrowUpDown,
  X,
} from 'lucide-react';

export const TutorDirectory: React.FC = () => {
  const {
    tutors,
    t,
    language,
    searchQuery,
    setSearchQuery,
    selectedLocation,
    setSelectedLocation,
    selectedClass,
    setSelectedClass,
    selectedSubject,
    setSelectedSubject,
    selectedMedium,
    setSelectedMedium,
    selectedTier,
    setSelectedTier,
    selectedGender,
    setSelectedGender,
    setSelectedTutorForDetail,
    setActiveView,
  } = useApp();

  const [sortBy, setSortBy] = useState<'diamond' | 'rating' | 'experience' | 'salary'>('diamond');
  const [maxBudget, setMaxBudget] = useState<number>(15000);

  // Filter approved tutors only
  const filteredTutors = useMemo(() => {
    return tutors
      .filter((tutor) => {
        // Only show approved tutors to the public
        if (tutor.status !== 'Approved') return false;

        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = tutor.fullName.toLowerCase().includes(q);
          const matchUni = tutor.universityName.toLowerCase().includes(q);
          const matchDept = tutor.department.toLowerCase().includes(q);
          const matchSubj = tutor.subjects.some((s) => s.toLowerCase().includes(q));
          if (!matchName && !matchUni && !matchDept && !matchSubj) return false;
        }

        // Location
        if (selectedLocation !== 'All') {
          const hasLocation = tutor.preferredLocations.some((loc) =>
            loc.toLowerCase().includes(selectedLocation.toLowerCase())
          );
          if (!hasLocation) return false;
        }

        // Class
        if (selectedClass !== 'All') {
          const hasClass = tutor.preferredClasses.some((c) =>
            c.toLowerCase().includes(selectedClass.toLowerCase())
          );
          if (!hasClass) return false;
        }

        // Subject
        if (selectedSubject !== 'All') {
          const hasSubj = tutor.subjects.some((s) =>
            s.toLowerCase().includes(selectedSubject.toLowerCase())
          );
          if (!hasSubj) return false;
        }

        // Medium
        if (selectedMedium !== 'All') {
          if (!tutor.mediums.includes(selectedMedium as any)) return false;
        }

        // Tier
        if (selectedTier !== 'All') {
          if (tutor.membershipTier !== selectedTier) return false;
        }

        // Gender
        if (selectedGender !== 'All') {
          if (tutor.gender !== selectedGender) return false;
        }

        // Budget
        if (tutor.expectedMinSalary > maxBudget) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'diamond') {
          const tierRank = { Diamond: 3, Premium: 2, Free: 1 };
          if (tierRank[b.membershipTier] !== tierRank[a.membershipTier]) {
            return (tierRank[b.membershipTier] || 1) - (tierRank[a.membershipTier] || 1);
          }
          return b.rating - a.rating;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'experience') {
          return b.experienceYears - a.experienceYears;
        }
        if (sortBy === 'salary') {
          return a.expectedMinSalary - b.expectedMinSalary;
        }
        return 0;
      });
  }, [
    tutors,
    searchQuery,
    selectedLocation,
    selectedClass,
    selectedSubject,
    selectedMedium,
    selectedTier,
    selectedGender,
    maxBudget,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLocation('All');
    setSelectedClass('All');
    setSelectedSubject('All');
    setSelectedMedium('All');
    setSelectedTier('All');
    setSelectedGender('All');
    setMaxBudget(15000);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
            {language === 'bn' ? 'বিশ্বস্ত শিক্ষক অনুসন্ধান' : 'Find Your Subject Specialist'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.directory.title}
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            {t.directory.subtitle}
          </p>
        </div>

        {/* Filter Bar & Controls */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          {/* Top Search & Sorter */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.directory.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                {t.directory.sortLabel}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
              >
                <option value="diamond">{t.directory.sortDiamondFirst}</option>
                <option value="rating">{t.directory.sortRating}</option>
                <option value="experience">{t.directory.sortExperience}</option>
                <option value="salary">{t.directory.sortSalaryLow}</option>
              </select>
            </div>
          </div>

          {/* Secondary Filter Dropdowns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2 border-t border-slate-100">
            {/* Location */}
            <div>
              <label className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
                {language === 'bn' ? 'এলাকা' : 'Location'}
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-800 cursor-pointer"
              >
                <option value="All">{t.directory.allDivisions}</option>
                <option value="Dhanmondi">Dhanmondi</option>
                <option value="Uttara">Uttara</option>
                <option value="Gulshan">Gulshan & Banani</option>
                <option value="Mirpur">Mirpur</option>
                <option value="Mohammadpur">Mohammadpur</option>
                <option value="Bashundhara">Bashundhara R/A</option>
                <option value="Baily Road">Baily Road</option>
                <option value="Chattogram">Chattogram</option>
              </select>
            </div>

            {/* Medium */}
            <div>
              <label className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
                {language === 'bn' ? 'মাধ্যম' : 'Medium'}
              </label>
              <select
                value={selectedMedium}
                onChange={(e) => setSelectedMedium(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-800 cursor-pointer"
              >
                <option value="All">{t.directory.allMediums}</option>
                <option value="Bangla Medium">Bangla Medium</option>
                <option value="English Version">English Version</option>
                <option value="English Medium">English Medium</option>
              </select>
            </div>

            {/* Class */}
            <div>
              <label className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
                {language === 'bn' ? 'শ্রেণি' : 'Class'}
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-800 cursor-pointer"
              >
                <option value="All">{t.directory.allClasses}</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10 / SSC</option>
                <option value="HSC">HSC / 11-12th</option>
                <option value="O Level">O Level</option>
                <option value="A Level">A Level</option>
                <option value="Admission">Admission Test</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
                {language === 'bn' ? 'বিষয়' : 'Subject'}
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-800 cursor-pointer"
              >
                <option value="All">{language === 'bn' ? 'সকল বিষয়' : 'All Subjects'}</option>
                <option value="Physics">Physics</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
                <option value="ICT">ICT</option>
                <option value="Accounting">Accounting</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
                {language === 'bn' ? 'লিঙ্গ' : 'Gender'}
              </label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-800 cursor-pointer"
              >
                <option value="All">{t.directory.allGenders}</option>
                <option value="Male">Male (পুরুষ)</option>
                <option value="Female">Female (নারী)</option>
              </select>
            </div>

            {/* Membership Tier */}
            <div>
              <label className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
                {language === 'bn' ? 'মেম্বারশিপ' : 'Membership'}
              </label>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-800 cursor-pointer"
              >
                <option value="All">{t.directory.allTiers}</option>
                <option value="Diamond">💎 Diamond Tier</option>
                <option value="Premium">⚡ Premium Tier</option>
                <option value="Free">Standard Free</option>
              </select>
            </div>
          </div>

          {/* Active Filter Count & Reset */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>
              {language === 'bn'
                ? `মোট ${filteredTutors.length} জন যাচাইকৃত টিউটর পাওয়া গেছে`
                : `Showing ${filteredTutors.length} verified educators`}
            </span>
            <button
              onClick={resetFilters}
              className="text-blue-700 hover:text-blue-900 font-semibold cursor-pointer underline text-[11px]"
            >
              {language === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset All Filters'}
            </button>
          </div>
        </div>

        {/* Directory Results Grid */}
        {filteredTutors.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t.directory.emptyTitle}</h3>
            <p className="text-xs text-slate-500">{t.directory.emptyDesc}</p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
            >
              {language === 'bn' ? 'সকল টিউটর প্রদর্শন করুন' : 'Clear Filters & Show All'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map((tutor) => (
              <div
                key={tutor.id}
                className={`bg-white rounded-2xl border transition-all flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg ${
                  tutor.membershipTier === 'Diamond'
                    ? 'border-amber-300 ring-1 ring-amber-300/40'
                    : tutor.membershipTier === 'Premium'
                    ? 'border-blue-200'
                    : 'border-slate-200'
                }`}
              >
                <div className="p-6 space-y-4">
                  {/* Top Bar on Card: Badge and Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {tutor.membershipTier === 'Diamond' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-900 bg-gradient-to-r from-amber-100 to-amber-200/80 px-2.5 py-0.5 rounded-full border border-amber-300">
                          <Crown className="w-3 h-3 text-amber-700" />
                          Diamond Tutor
                        </span>
                      ) : tutor.membershipTier === 'Premium' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                          <Zap className="w-3 h-3 text-blue-600" />
                          Premium Tutor
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          Standard Tutor
                        </span>
                      )}

                      {tutor.isVerified && (
                        <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          {t.directory.verifiedBadge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="tabular-nums font-mono-numbers">
                        {tutor.rating > 0 ? tutor.rating.toFixed(2) : '5.0'}
                      </span>
                    </div>
                  </div>

                  {/* Profile Header */}
                  <div className="flex items-start gap-4 pt-1">
                    <img
                      src={tutor.photoUrl}
                      alt={tutor.fullName}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0 shadow-2xs"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-slate-900 truncate">
                        {tutor.fullName}
                      </h3>
                      <p className="text-xs font-semibold text-blue-800 truncate mt-0.5">
                        {tutor.universityName}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {tutor.department} · {tutor.currentYearSemester}
                      </p>
                    </div>
                  </div>

                  {/* Academic Credentials (SSC / HSC) */}
                  <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-100 space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-medium text-slate-500">SSC:</span>
                      <span className="font-bold text-slate-900">
                        GPA {tutor.ssc.gpa} ({tutor.ssc.group}, {tutor.ssc.passingYear})
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-medium text-slate-500">HSC:</span>
                      <span className="font-bold text-slate-900">
                        GPA {tutor.hsc.gpa} ({tutor.hsc.group}, {tutor.hsc.passingYear})
                      </span>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      {language === 'bn' ? 'দক্ষ বিষয়সমূহ:' : 'Expert Subjects:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {tutor.subjects.map((s) => (
                        <span
                          key={s}
                          className="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Medium & Locations */}
                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 truncate">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{tutor.mediums.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{tutor.preferredLocations.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">
                      {t.directory.hourlyRate}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 font-mono-numbers">
                      ৳{tutor.expectedMinSalary.toLocaleString('en-IN')}
                      <span className="text-xs text-slate-500 font-normal">/mo</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedTutorForDetail(tutor)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 bg-white border border-slate-300 rounded-lg transition-colors cursor-pointer shadow-2xs"
                    >
                      {t.directory.viewProfile}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTutorForDetail(tutor);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer shadow-2xs"
                    >
                      {language === 'bn' ? 'বাছাই করুন' : 'Hire'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
