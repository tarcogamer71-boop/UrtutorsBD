import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TuitionRequest, TutorProfile } from '../types';
import {
  FileText,
  Clock,
  CheckCircle,
  UserCheck,
  Star,
  MapPin,
  Calendar,
  MessageSquare,
  ShieldCheck,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

export const GuardianDashboardView: React.FC = () => {
  const {
    tuitionRequests,
    tutors,
    currentGuardianName,
    language,
    setActiveView,
    setSelectedTutorForDetail,
    showToast,
  } = useApp();

  // Filter requests submitted by this guardian or sample
  const myRequests = tuitionRequests.filter(
    (req) => req.guardianName.includes('Mahmudul') || req.guardianName.includes(currentGuardianName)
  );

  const [selectedReqForReview, setSelectedReqForReview] = useState<TuitionRequest | null>(
    myRequests[0] || null
  );

  const matchedTutors = (selectedReqForReview?.matchedTutorIds || [])
    .map((id) => tutors.find((t) => t.id === id))
    .filter(Boolean) as TutorProfile[];

  const assignedTutor = tutors.find((t) => t.id === selectedReqForReview?.assignedTutorId);

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block">
              {language === 'bn' ? 'অভিভাবক পোর্টাল' : 'Guardian Concierge Desk'}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Welcome, {currentGuardianName}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Track your student’s tuition requests, matched university tutors, and trial schedules.
            </p>
          </div>

          <button
            onClick={() => setActiveView('request-tuition')}
            className="px-4 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            + Post Another Tuition Requirement
          </button>
        </div>

        {/* Requests & Matching Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: List of Submitted Requests */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Your Tuition Requirements ({myRequests.length})
            </h2>

            <div className="space-y-3">
              {myRequests.map((req) => (
                <div
                  key={req.id}
                  onClick={() => setSelectedReqForReview(req)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    selectedReqForReview?.id === req.id
                      ? 'bg-blue-50/70 border-blue-400 shadow-sm ring-1 ring-blue-300'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-mono font-bold text-xs text-blue-900">{req.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        req.status === 'Tutor Assigned'
                          ? 'bg-purple-100 text-purple-800'
                          : req.status === 'Matching'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mt-2">{req.studentClass}</h3>
                  <p className="text-xs text-slate-500">{req.schoolCollege} · {req.medium}</p>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                    <span>{req.location}</span>
                    <span className="font-bold font-mono-numbers text-slate-900">
                      ৳{req.monthlyBudget.toLocaleString('en-IN')}/mo
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Active Request Review & Matched Tutors */}
          <div className="lg:col-span-7 space-y-6">
            {selectedReqForReview ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
                {/* Active Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                      {selectedReqForReview.id}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1.5">
                      {selectedReqForReview.studentClass}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Monthly Budget</span>
                    <span className="text-base font-extrabold text-blue-900 font-mono-numbers">
                      ৳{selectedReqForReview.monthlyBudget.toLocaleString('en-IN')}/mo
                    </span>
                  </div>
                </div>

                {/* Requirement Specification Details */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 block">Subjects:</span>
                    <span className="font-semibold text-slate-800">
                      {selectedReqForReview.subjects.join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Location:</span>
                    <span className="font-semibold text-slate-800">
                      {selectedReqForReview.location} ({selectedReqForReview.nearbyLandmark})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Days & Schedule:</span>
                    <span className="font-semibold text-slate-800">
                      {selectedReqForReview.daysPerWeek} days/week · {selectedReqForReview.preferredSchedule}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Preferred Tutor Gender:</span>
                    <span className="font-semibold text-slate-800">
                      {selectedReqForReview.preferredTutorGender}
                    </span>
                  </div>
                </div>

                {/* Assigned or Matched Tutor Card */}
                {assignedTutor ? (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        Assigned Tutor for Trial Class
                      </span>
                      <span className="text-xs font-bold text-emerald-700">Official Match</span>
                    </div>

                    <div className="flex items-start gap-4">
                      <img
                        src={assignedTutor.photoUrl}
                        alt={assignedTutor.fullName}
                        className="w-16 h-16 rounded-xl object-cover border border-emerald-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-slate-900 text-base">{assignedTutor.fullName}</h4>
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        </div>
                        <p className="text-xs text-blue-900 font-semibold">{assignedTutor.universityName}</p>
                        <p className="text-xs text-slate-600">{assignedTutor.department}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          SSC GPA: {assignedTutor.ssc.gpa} · HSC GPA: {assignedTutor.hsc.gpa}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedTutorForDetail(assignedTutor)}
                        className="text-xs font-bold text-blue-800 hover:underline cursor-pointer"
                      >
                        Inspect Full Academic Transcript
                      </button>

                      <a
                        href="https://wa.me/8801341718208?text=Hello%20UrTutorsBD%20Coordinator.%20I%20am%20calling%20regarding%20assigned%20tutor%20for%20my%20tuition%20requirement."
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Confirm Trial Class via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ) : matchedTutors.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Recommended Tutor Matches ({matchedTutors.length})
                    </h4>

                    {matchedTutors.map((tut) => (
                      <div
                        key={tut.id}
                        className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={tut.photoUrl}
                            alt={tut.fullName}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <h5 className="font-bold text-slate-900 text-xs truncate">{tut.fullName}</h5>
                            <p className="text-[11px] text-blue-800 truncate">{tut.universityName}</p>
                            <p className="text-[10px] text-slate-500">Rating: {tut.rating} ★</p>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedTutorForDetail(tut)}
                          className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-white border border-blue-200 hover:bg-blue-50 rounded-lg shrink-0 cursor-pointer"
                        >
                          View Profile
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
                    <Clock className="w-8 h-8 text-blue-700 mx-auto" />
                    <h4 className="text-sm font-bold text-slate-900">Coordinator Matching In Progress</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Our academic team is screening university student candidates in your area ({selectedReqForReview.location}). You will receive shortlisted recommendations within 24–48 hours.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400">
                Select a tuition requirement from the left list to view matching progress.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
