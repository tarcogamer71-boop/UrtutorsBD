import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TutorProfile, TuitionRequest, PaymentTransaction, TutorStatus } from '../types';
import {
  Users,
  ShieldCheck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  Crown,
  Zap,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    tutors,
    tuitionRequests,
    transactions,
    updateTutorStatus,
    toggleTutorVerification,
    assignTutorToRequest,
    matchTutorsToRequest,
    language,
    showToast,
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'tutors' | 'tuitions' | 'payments'
  >('overview');

  const [tutorSearch, setTutorSearch] = useState('');
  const [tutorStatusFilter, setTutorStatusFilter] = useState('All');

  // Stats Calculations
  const totalTutors = tutors.length;
  const approvedTutors = tutors.filter((t) => t.status === 'Approved').length;
  const pendingTutors = tutors.filter(
    (t) => t.status === 'Submitted' || t.status === 'Under Review'
  ).length;
  const rejectedTutors = tutors.filter((t) => t.status === 'Rejected').length;

  const totalTuitions = tuitionRequests.length;
  const activeTuitions = tuitionRequests.filter(
    (r) => r.status === 'Pending Review' || r.status === 'Matching'
  ).length;
  const completedMatches = tuitionRequests.filter(
    (r) => r.status === 'Tutor Assigned' || r.status === 'Completed'
  ).length;

  const diamondTutors = tutors.filter((t) => t.membershipTier === 'Diamond').length;
  const premiumTutors = tutors.filter((t) => t.membershipTier === 'Premium').length;
  const freeTutors = tutors.filter((t) => t.membershipTier === 'Free').length;

  const totalRevenueBDT = transactions
    .filter((tx) => tx.status === 'Completed')
    .reduce((acc, curr) => acc + curr.amountBDT, 0);

  const filteredTutors = tutors.filter((t) => {
    if (tutorSearch.trim()) {
      const q = tutorSearch.toLowerCase();
      const matchName = t.fullName.toLowerCase().includes(q);
      const matchUni = t.universityName.toLowerCase().includes(q);
      if (!matchName && !matchUni) return false;
    }
    if (tutorStatusFilter !== 'All' && t.status !== tutorStatusFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="py-8 bg-slate-900 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Admin Header */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                UrTutorsBD Central Administrative Panel
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Executive Agency Management & Matching Desk
            </h1>
            <p className="text-xs text-slate-400">
              Role-based management for Bangladeshi educators, guardian placements, and MFS payments.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-mono">
              Live DB Synced
            </span>
          </div>
        </div>

        {/* Admin Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-semibold">
          <button
            onClick={() => setActiveAdminTab('overview')}
            className={`py-2 px-4 rounded-lg transition-colors cursor-pointer ${
              activeAdminTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Analytics & KPIs
          </button>
          <button
            onClick={() => setActiveAdminTab('tutors')}
            className={`py-2 px-4 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeAdminTab === 'tutors'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>Tutor Applications</span>
            {pendingTutors > 0 && (
              <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {pendingTutors}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveAdminTab('tuitions')}
            className={`py-2 px-4 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeAdminTab === 'tuitions'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>Tuition Placements</span>
            <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              {activeTuitions}
            </span>
          </button>
          <button
            onClick={() => setActiveAdminTab('payments')}
            className={`py-2 px-4 rounded-lg transition-colors cursor-pointer ${
              activeAdminTab === 'payments'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Payment Transactions & Revenue
          </button>
        </div>

        {/* TAB 1: OVERVIEW & KPIS */}
        {activeAdminTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400">Total Registered Tutors</span>
                <div className="text-2xl font-bold text-white mt-1 font-mono-numbers">
                  {totalTutors}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1">
                  {approvedTutors} Approved · {pendingTutors} In Review
                </div>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400">Tuition Requests</span>
                <div className="text-2xl font-bold text-white mt-1 font-mono-numbers">
                  {totalTuitions}
                </div>
                <div className="text-[11px] text-blue-400 mt-1">
                  {activeTuitions} Active · {completedMatches} Matched
                </div>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400">Paid Memberships</span>
                <div className="text-2xl font-bold text-amber-400 mt-1 font-mono-numbers">
                  {diamondTutors + premiumTutors}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {diamondTutors} Diamond · {premiumTutors} Premium · {freeTutors} Free
                </div>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400">Monthly Subscription Revenue</span>
                <div className="text-2xl font-bold text-emerald-400 mt-1 font-mono-numbers">
                  ৳{totalRevenueBDT.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  bKash, Nagad & SSLCommerz
                </div>
              </div>
            </div>

            {/* Quick Overview Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Tuition Requests */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center justify-between">
                  <span>Recent Guardian Requests</span>
                  <button
                    onClick={() => setActiveAdminTab('tuitions')}
                    className="text-xs text-blue-400 hover:underline cursor-pointer"
                  >
                    View All
                  </button>
                </h3>

                <div className="space-y-2.5 text-xs">
                  {tuitionRequests.slice(0, 4).map((r) => (
                    <div
                      key={r.id}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-blue-400">{r.id}</span>
                          <span className="font-semibold text-slate-200">{r.studentClass}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {r.location} · Budget: ৳{r.monthlyBudget.toLocaleString('en-IN')}
                        </p>
                      </div>

                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Payments */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center justify-between">
                  <span>Recent Payment Gateway Logs</span>
                  <button
                    onClick={() => setActiveAdminTab('payments')}
                    className="text-xs text-blue-400 hover:underline cursor-pointer"
                  >
                    View All
                  </button>
                </h3>

                <div className="space-y-2.5 text-xs">
                  {transactions.slice(0, 4).map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-emerald-400">{tx.transactionId}</span>
                          <span className="text-slate-300">{tx.tutorName}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {tx.gateway} · {tx.planTier} Tier · {tx.date}
                        </p>
                      </div>

                      <span className="font-mono font-bold text-white">
                        ৳{tx.amountBDT}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TUTOR APPLICATIONS & MANAGEMENT */}
        {activeAdminTab === 'tutors' && (
          <div className="space-y-6">
            {/* Filter controls */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={tutorSearch}
                  onChange={(e) => setTutorSearch(e.target.value)}
                  placeholder="Filter tutors by name or university..."
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-100"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400">Status:</span>
                <select
                  value={tutorStatusFilter}
                  onChange={(e) => setTutorStatusFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200"
                >
                  <option value="All">All Statuses</option>
                  <option value="Approved">Approved</option>
                  <option value="Submitted">Submitted (New)</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Tutors Table */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Tutor Profile</th>
                      <th className="py-3 px-4 font-semibold">University & Department</th>
                      <th className="py-3 px-4 font-semibold">SSC & HSC GPA</th>
                      <th className="py-3 px-4 font-semibold">Membership</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredTutors.map((tutor) => (
                      <tr key={tutor.id} className="hover:bg-slate-900/60">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={tutor.photoUrl}
                              alt={tutor.fullName}
                              className="w-9 h-9 rounded-full object-cover border border-slate-700"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <span className="font-bold text-white block">{tutor.fullName}</span>
                              <span className="text-[11px] text-slate-400 font-mono">{tutor.id}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="text-slate-200 font-semibold block">{tutor.universityName}</span>
                          <span className="text-[11px] text-slate-400">{tutor.department}</span>
                        </td>

                        <td className="py-3.5 px-4 font-mono-numbers">
                          <span className="text-slate-300">SSC: {tutor.ssc?.gpa || 'N/A'}</span>
                          <span className="text-slate-400 block text-[11px]">HSC: {tutor.hsc?.gpa || 'N/A'}</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              tutor.membershipTier === 'Diamond'
                                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                                : tutor.membershipTier === 'Premium'
                                ? 'bg-blue-400/20 text-blue-300 border border-blue-400/40'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {tutor.membershipTier}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              tutor.status === 'Approved'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : tutor.status === 'Rejected'
                                ? 'bg-red-500/20 text-red-300'
                                : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {tutor.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {tutor.status !== 'Approved' && (
                              <button
                                onClick={() => updateTutorStatus(tutor.id, 'Approved')}
                                className="px-2.5 py-1 text-[11px] font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded cursor-pointer"
                              >
                                Approve
                              </button>
                            )}

                            {tutor.status !== 'Rejected' && (
                              <button
                                onClick={() => updateTutorStatus(tutor.id, 'Rejected', 'Academic credentials incomplete')}
                                className="px-2.5 py-1 text-[11px] font-semibold text-red-400 hover:bg-red-950/40 rounded border border-red-800 cursor-pointer"
                              >
                                Reject
                              </button>
                            )}

                            <button
                              onClick={() => toggleTutorVerification(tutor.id)}
                              className={`px-2 py-1 text-[11px] rounded border cursor-pointer ${
                                tutor.isVerified
                                  ? 'text-blue-300 border-blue-600 hover:bg-blue-900/30'
                                  : 'text-slate-400 border-slate-700 hover:bg-slate-800'
                              }`}
                              title="Toggle verified badge"
                            >
                              {tutor.isVerified ? 'Verified ✓' : 'Verify'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TUITION PLACEMENTS & SMART MATCHING */}
        {activeAdminTab === 'tuitions' && (
          <div className="space-y-6">
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
              <div>
                <h3 className="text-base font-bold text-white">Tuition Requirements & Smart Matching</h3>
                <p className="text-xs text-slate-400">
                  Assign shortlisted university student tutors to guardian requirements.
                </p>
              </div>

              <div className="space-y-4">
                {tuitionRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                      <div>
                        <span className="font-mono font-bold text-blue-400 text-sm mr-2">{req.id}</span>
                        <span className="font-bold text-white text-sm">{req.studentClass}</span>
                        <span className="text-slate-400 text-[11px] ml-2">({req.schoolCollege})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-emerald-400 font-bold">
                          ৳{req.monthlyBudget.toLocaleString('en-IN')}/mo
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {req.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300">
                      <div>
                        <span className="text-slate-500 block">Guardian:</span>
                        <span>{req.guardianName} ({req.guardianPhone})</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Location:</span>
                        <span>{req.location} ({req.nearbyLandmark})</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Subjects:</span>
                        <span>{req.subjects.join(', ')}</span>
                      </div>
                    </div>

                    {/* Assigned Tutor or Candidate Matcher */}
                    <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Assigned Tutor:</span>
                        {req.assignedTutorId ? (
                          <span className="font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800 px-2 py-0.5 rounded">
                            {tutors.find((t) => t.id === req.assignedTutorId)?.fullName} ({req.assignedTutorId})
                          </span>
                        ) : (
                          <span className="text-amber-400 italic">No Tutor Assigned Yet</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              assignTutorToRequest(req.id, e.target.value);
                            }
                          }}
                          className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs"
                        >
                          <option value="">Quick Assign Tutor...</option>
                          {tutors
                            .filter((t) => t.status === 'Approved')
                            .map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.fullName} ({t.universityName}) - ৳{t.expectedMinSalary}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PAYMENTS & FINANCIAL AUDIT */}
        {activeAdminTab === 'payments' && (
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl space-y-4 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Payment Gateway Ledger</h3>
                <p className="text-xs text-slate-400">
                  Direct mobile financial transactions via bKash, Nagad, and SSLCommerz.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Total Processed</span>
                <span className="text-lg font-bold text-emerald-400 font-mono-numbers">
                  ৳{totalRevenueBDT.toLocaleString('en-IN')} BDT
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 font-semibold">TrxID</th>
                    <th className="py-3 px-4 font-semibold">Tutor Name</th>
                    <th className="py-3 px-4 font-semibold">Plan</th>
                    <th className="py-3 px-4 font-semibold">Channel</th>
                    <th className="py-3 px-4 font-semibold">Sender Phone</th>
                    <th className="py-3 px-4 font-semibold">Amount</th>
                    <th className="py-3 px-4 font-semibold">Date & Time</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono-numbers">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-900/60 font-sans">
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-400">{tx.transactionId}</td>
                      <td className="py-3.5 px-4 font-medium text-white">{tx.tutorName}</td>
                      <td className="py-3.5 px-4 font-semibold text-amber-300">{tx.planTier}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`font-semibold ${
                            tx.gateway === 'bKash'
                              ? 'text-[#F56E94]'
                              : tx.gateway === 'Nagad'
                              ? 'text-[#FF6B6B]'
                              : 'text-blue-400'
                          }`}
                        >
                          {tx.gateway}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">{tx.senderNumber}</td>
                      <td className="py-3.5 px-4 font-mono-numbers font-bold text-emerald-400">
                        ৳{tx.amountBDT}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">{tx.date}</td>
                      <td className="py-3.5 px-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
