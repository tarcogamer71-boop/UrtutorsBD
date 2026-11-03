import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentGateway, MembershipTier } from '../types';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  X,
  Lock,
  ArrowRight,
  Receipt,
  Download,
} from 'lucide-react';

export const PaymentGatewayModal: React.FC = () => {
  const {
    paymentModalPlan,
    setPaymentModalPlan,
    upgradeTutorMembership,
    currentTutorProfile,
    language,
    t,
  } = useApp();

  const [activeGateway, setActiveGateway] = useState<PaymentGateway>('bKash');
  const [senderNumber, setSenderNumber] = useState('01712345678');
  const [pinOrTrxId, setPinOrTrxId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedTrxId, setGeneratedTrxId] = useState('');

  if (!paymentModalPlan) return null;

  const planTier = paymentModalPlan.tier;
  const amountBDT = paymentModalPlan.amount;

  const handleSimulatePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!senderNumber || senderNumber.length < 11) {
      alert('Please enter a valid 11-digit Bangladeshi mobile number.');
      return;
    }

    setIsProcessing(true);

    // Simulate real gateway handshake & API verification latency (1.2s)
    setTimeout(async () => {
      const generated =
        activeGateway === 'bKash'
          ? `BK${Math.floor(100000 + Math.random() * 900000)}`
          : activeGateway === 'Nagad'
          ? `NG${Math.floor(100000 + Math.random() * 900000)}`
          : `SSLC${Math.floor(100000 + Math.random() * 900000)}`;

      const finalTrx = pinOrTrxId.trim() ? pinOrTrxId.trim() : generated;
      setGeneratedTrxId(finalTrx);

      if (currentTutorProfile) {
        await upgradeTutorMembership(
          currentTutorProfile.id,
          planTier,
          activeGateway,
          finalTrx,
          senderNumber
        );
      }

      setIsProcessing(false);
      setIsSuccess(true);
    }, 1400);
  };

  const handleClose = () => {
    setPaymentModalPlan(null);
    setIsSuccess(false);
    setIsProcessing(false);
    setPinOrTrxId('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-700 text-amber-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">
                {language === 'bn' ? 'বাংলাদেশ পেমেন্ট গেটওয়ে' : 'UrTutorsBD Secure Gateway'}
              </h3>
              <p className="text-[11px] text-slate-400">
                256-Bit SSL Encrypted Verification Desk
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* Payment Success State */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-extrabold text-slate-900">
                {language === 'bn' ? 'পেমেন্ট সফল ও ভেরিফাইড!' : 'Payment Verified & Activated!'}
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                {language === 'bn'
                  ? `আপনার ${planTier === 'Diamond' ? 'ডায়মন্ড' : 'প্রিমিয়াম'} সাবস্ক্রিপশন অবিলম্বে সক্রিয় করা হয়েছে। সার্চ লিস্টে শীর্ষ ভিজিবিলিটি উপভোগ করুন।`
                  : `Your ${planTier} tutor membership is now officially active. Enjoy priority search placement and early tuition calls.`}
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-left space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Plan Tier:</span>
                <span className="font-bold text-slate-900">{planTier} Membership (1 Month)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Amount Paid:</span>
                <span className="font-bold text-slate-900 font-mono-numbers">৳{amountBDT.toLocaleString('en-IN')} BDT</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Gateway Channel:</span>
                <span className="font-bold text-blue-900">{activeGateway} Instant Settlement</span>
              </div>
              <div className="flex justify-between text-slate-600 border-t border-slate-200 pt-2">
                <span>Transaction TrxID:</span>
                <span className="font-mono font-bold text-emerald-700">{generatedTrxId}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tutor Account:</span>
                <span className="font-semibold text-slate-800">{currentTutorProfile?.fullName || 'Tutor'}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={handleClose}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'ড্যাশবোর্ডে ফিরুন' : 'Back to Dashboard'}
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div className="p-6 space-y-6">
            {/* Plan Summary Bar */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                  {language === 'bn' ? 'নির্বাচিত মেম্বারশিপ' : 'Subscription Upgrade'}
                </span>
                <h4 className="text-base font-bold text-slate-900">{planTier} Membership</h4>
                <p className="text-xs text-slate-500">Validity: 30 Days with priority placement</p>
              </div>

              <div className="text-right">
                <span className="text-2xl font-extrabold text-blue-900 font-mono-numbers">
                  ৳{amountBDT.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-400 block">BDT / month</span>
              </div>
            </div>

            {/* Gateway Selector Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                {language === 'bn' ? 'পেমেন্ট গেটওয়ে নির্বাচন করুন:' : 'Select Payment Gateway:'}
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                {/* bKash */}
                <button
                  type="button"
                  onClick={() => setActiveGateway('bKash')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    activeGateway === 'bKash'
                      ? 'border-[#D12053] bg-[#D12053]/5 ring-2 ring-[#D12053]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span className="text-xs font-bold text-[#D12053]">bKash</span>
                  <span className="text-[10px] text-slate-500">বিকাশ পেমেন্ট</span>
                </button>

                {/* Nagad */}
                <button
                  type="button"
                  onClick={() => setActiveGateway('Nagad')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    activeGateway === 'Nagad'
                      ? 'border-[#ED1C24] bg-[#ED1C24]/5 ring-2 ring-[#ED1C24]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span className="text-xs font-bold text-[#ED1C24]">Nagad</span>
                  <span className="text-[10px] text-slate-500">নগদ ওয়ালেট</span>
                </button>

                {/* SSLCommerz */}
                <button
                  type="button"
                  onClick={() => setActiveGateway('SSLCommerz')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    activeGateway === 'SSLCommerz'
                      ? 'border-[#0F52BA] bg-[#0F52BA]/5 ring-2 ring-[#0F52BA]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span className="text-xs font-bold text-[#0F52BA]">SSLCommerz</span>
                  <span className="text-[10px] text-slate-500">Cards / Banking</span>
                </button>
              </div>
            </div>

            {/* Gateway Specific Instructions */}
            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200/80">
              {activeGateway === 'bKash' && (
                <p>
                  <span className="font-bold text-[#D12053]">bKash Merchant Pay:</span> Enter your bKash mobile account number. You will simulate automated USSD / OTP token verification.
                </p>
              )}
              {activeGateway === 'Nagad' && (
                <p>
                  <span className="font-bold text-[#ED1C24]">Nagad Direct Checkout:</span> Enter your registered Nagad wallet number to initiate instant server-side settlement.
                </p>
              )}
              {activeGateway === 'SSLCommerz' && (
                <p>
                  <span className="font-bold text-[#0F52BA]">SSLCommerz Gateway:</span> Accepts Visa, Mastercard, Islami Bank NetBanking, Rocket, and Upay.
                </p>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSimulatePayment} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'bn' ? 'আপনার মোবাইল অ্যাকাউন্ট নম্বর' : 'Your Mobile Wallet / Phone Number'}
                </label>
                <input
                  type="tel"
                  required
                  value={senderNumber}
                  onChange={(e) => setSenderNumber(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono-numbers text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-slate-700">
                    {language === 'bn' ? 'ওটিপি / ট্রানজেকশন আইডি (ঐচ্ছিক)' : 'PIN / Simulated TrxID (Optional)'}
                  </label>
                  <span className="text-[10px] text-slate-400">Leave blank for auto-TrxID</span>
                </div>
                <input
                  type="text"
                  value={pinOrTrxId}
                  onChange={(e) => setPinOrTrxId(e.target.value)}
                  placeholder="e.g. BK9X88219"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs uppercase text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    activeGateway === 'bKash'
                      ? 'bg-[#D12053] hover:bg-[#b51b47]'
                      : activeGateway === 'Nagad'
                      ? 'bg-[#ED1C24] hover:bg-[#cf151c]'
                      : 'bg-blue-700 hover:bg-blue-800'
                  }`}
                >
                  {isProcessing ? (
                    <span>{t.payment.processing}</span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>
                        {language === 'bn'
                          ? `৳${amountBDT.toLocaleString('en-IN')} পরিশোধ ও মেম্বারশিপ সক্রিয় করুন`
                          : `Pay ৳${amountBDT.toLocaleString('en-IN')} & Activate ${planTier}`}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
