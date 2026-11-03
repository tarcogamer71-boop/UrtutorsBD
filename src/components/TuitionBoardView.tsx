import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TuitionRequest } from '../types';
import {
  MapPin,
  Calendar,
  BookOpen,
  DollarSign,
  Send,
  CheckCircle,
  Filter,
  ShieldCheck,
  Search,
} from 'lucide-react';

export const TuitionBoardView: React.FC = () => {
  const {
    tuitionRequests,
    t,
    language,
    currentRole,
    currentTutorProfile,
    applyForTuition,
    applications,
    setActiveView,
  } = useApp();

  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedMedium, setSelectedMedium] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Apply Modal state
  const [activeApplyingRequest, setActiveApplyingRequest] = useState<TuitionRequest | null>(null);
  const [customExpectedSalary, setCustomExpectedSalary] = useState<number>(8000);
  const [coverNote, setCoverNote] = useState(
    'Assalamu Alaikum. I am an experienced tutor from this department. I can dedicate disciplined time to ensure top exam performance.'
  );

  const filteredRequests = tuitionRequests.filter((req) => {
    // Only show open or matching posts
    if (req.status === 'Completed' || req.status === 'Cancelled') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSubj = req.subjects.some((s) => s.toLowerCase().includes(q));
      const matchClass = req.studentClass.toLowerCase().includes(q);
      const matchLoc = req.location.toLowerCase().includes(q);
      if (!matchSubj && !matchClass && !matchLoc) return false;
    }

    if (selectedLocation !== 'All' && !req.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
      return false;
    }

    if (selectedMedium !== 'All' && req.medium !== selectedMedium) {
      return false;
    }

    return true;
  });

  const handleOpenApplyModal = (req: TuitionRequest) => {
    if (currentRole !== 'tutor') {
      alert('Please switch to the Tutor Role or register as a tutor to apply directly.');
      setActiveView('become-tutor');
      return;
    }
    setActiveApplyingRequest(req);
    setCustomExpectedSalary(req.monthlyBudget);
  };

  const handleConfirmApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeApplyingRequest || !currentTutorProfile) return;

    applyForTuition(
      activeApplyingRequest.id,
      currentTutorProfile.id,
      customExpectedSalary,
      coverNote
    );
    setActiveApplyingRequest(null);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">
              {language === 'bn' ? 'সরাসরি টিউশন কল' : 'Live Opportunities'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {language === 'bn' ? 'সারাদেশের উন্মুক্ত টিউশন বোর্ড' : 'Live Tuition Requirement Board'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              {language === 'bn'
                ? 'অভিভাবকদের সরাসরি সাবমিট করা টিউশনসমূহ। যাচাইকৃত শিক্ষকরা সরাসরি আবেদন করতে পারেন।'
                : 'Browse verified student requests across Dhaka, Chattogram, and other areas. Apply directly.'}
            </p>
          </div>

          <button
            onClick={() => setActiveView('request-tuition')}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs transition-colors cursor-pointer self-start md:self-auto"
          >
            {language === 'bn' ? '+ নতুন টিউশন চাহিদা পোস্ট করুন' : '+ Post Tuition Requirement'}
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by subject, class, or location..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <div className="w-44">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 cursor-pointer"
            >
              <option value="All">All Locations</option>
              <option value="Dhanmondi">Dhanmondi</option>
              <option value="Uttara">Uttara</option>
              <option value="Gulshan">Gulshan & Banani</option>
              <option value="Mirpur">Mirpur</option>
              <option value="Baily Road">Baily Road</option>
            </select>
          </div>

          <div className="w-44">
            <select
              value={selectedMedium}
              onChange={(e) => setSelectedMedium(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 cursor-pointer"
            >
              <option value="All">All Mediums</option>
              <option value="Bangla Medium">Bangla Medium</option>
              <option value="English Version">English Version</option>
              <option value="English Medium">English Medium</option>
            </select>
          </div>
        </div>

        {/* Tuition Board Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRequests.map((req) => {
            const hasApplied = applications.some(
              (a) => a.tuitionRequestId === req.id && a.tutorId === currentTutorProfile?.id
            );

            return (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Top status & ID */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {req.id}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Posted {new Date(req.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        req.status === 'Tutor Assigned'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : req.status === 'Matching'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  {/* Student Class & School */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{req.studentClass}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {req.schoolCollege} · <span className="font-medium text-blue-800">{req.medium}</span>
                    </p>
                  </div>

                  {/* Subjects */}
                  <div className="flex flex-wrap gap-1.5">
                    {req.subjects.map((s) => (
                      <span
                        key={s}
                        className="bg-slate-100 text-slate-800 text-[11px] font-semibold px-2 py-0.5 rounded"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{req.location}</span>
                    </div>

                    <div className="flex items-center gap-1.5 truncate">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{req.daysPerWeek} Days / Week</span>
                    </div>

                    <div className="col-span-2 text-[11px] text-slate-500 italic truncate">
                      Preferred: {req.preferredSchedule} (Tutor: {req.preferredTutorGender})
                    </div>
                  </div>

                  {/* Note */}
                  {req.additionalInstructions && (
                    <p className="text-[11px] text-slate-500 line-clamp-2 italic">
                      “{req.additionalInstructions}”
                    </p>
                  )}
                </div>

                {/* Footer with Budget & Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      Monthly Budget
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 font-mono-numbers">
                      ৳{req.monthlyBudget.toLocaleString('en-IN')}
                      <span className="text-xs text-slate-500 font-normal">/mo</span>
                    </span>
                  </div>

                  {hasApplied ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOpenApplyModal(req)}
                      className="px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'আবেদন করুন' : 'Apply Now'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tutor Application Modal */}
        {activeApplyingRequest && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Apply for {activeApplyingRequest.studentClass}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ref: {activeApplyingRequest.id} · {activeApplyingRequest.location}
                  </p>
                </div>
                <button
                  onClick={() => setActiveApplyingRequest(null)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleConfirmApplication} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Your Expected Monthly Remuneration (৳ BDT)
                  </label>
                  <input
                    type="number"
                    step="500"
                    required
                    value={customExpectedSalary}
                    onChange={(e) => setCustomExpectedSalary(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono-numbers font-bold text-sm"
                  />
                  <span className="text-[10px] text-slate-400">
                    Guardian budget: ৳{activeApplyingRequest.monthlyBudget.toLocaleString('en-IN')}/mo
                  </span>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Short Cover Note & Strategy for this Student
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>

                <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-200 text-blue-900 text-[11px]">
                  Applying as <span className="font-bold">{currentTutorProfile?.fullName}</span> (
                  {currentTutorProfile?.universityName}). Your profile will be presented to the guardian upon coordinator review.
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveApplyingRequest(null)}
                    className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer shadow-xs"
                  >
                    Confirm Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
