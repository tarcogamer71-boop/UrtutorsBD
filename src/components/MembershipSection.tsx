import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Check,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Zap,
  Crown,
  CreditCard,
} from 'lucide-react';

export const MembershipSection: React.FC = () => {
  const { t, language, setPaymentModalPlan, currentRole, currentTutorProfile, setActiveView } = useApp();

  const handleSelectPlan = (tier: 'Free' | 'Premium' | 'Diamond') => {
    if (tier === 'Free') {
      setActiveView('become-tutor');
      return;
    }
    const amount = tier === 'Diamond' ? 1000 : 500;
    setPaymentModalPlan({ tier, amount });
  };

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">
            {language === 'bn' ? 'স্বচ্ছ ও ন্যায়নিষ্ঠ সাবস্ক্রিপশন' : 'Fair & Transparent Pricing'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.membership.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t.membership.subtitle}
          </p>
        </div>

        {/* Mandatory Policy Banner */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 max-w-4xl mx-auto text-xs text-amber-900 leading-relaxed shadow-xs">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-amber-950 mb-0.5">
              {language === 'bn' ? 'জরুরি মেম্বারশিপ নীতিমালা ও স্বচ্ছতা নোটিশ:' : 'UrTutorsBD Membership Transparency Policy:'}
            </span>
            <p className="text-amber-900/90">{t.membership.notice}</p>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {/* FREE PLAN */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {language === 'bn' ? 'মৌলিক প্ল্যান' : 'Starter Tier'}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {t.membership.plans.free.name}
                </h3>
                <p className="text-xs text-slate-500 min-h-[32px]">
                  {t.membership.plans.free.desc}
                </p>
              </div>

              <div className="pt-2 pb-4 border-b border-slate-100 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900 font-mono-numbers">
                  {t.membership.plans.free.price}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  / {t.membership.plans.free.period}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-600">
                {t.membership.plans.free.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={() => handleSelectPlan('Free')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer text-center"
              >
                {t.membership.plans.free.btnText}
              </button>
            </div>
          </div>

          {/* PREMIUM PLAN */}
          <div className="bg-white rounded-2xl border-2 border-blue-600 shadow-md p-7 flex flex-col justify-between relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
              {language === 'bn' ? 'জনপ্রিয় বাছাই' : 'Most Popular'}
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  {language === 'bn' ? 'উন্নত ভিজিবিলিটি' : 'Pro Educator'}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {t.membership.plans.premium.name}
                </h3>
                <p className="text-xs text-slate-500 min-h-[32px]">
                  {t.membership.plans.premium.desc}
                </p>
              </div>

              <div className="pt-2 pb-4 border-b border-slate-100 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-blue-900 font-mono-numbers">
                  {t.membership.plans.premium.price}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  / {t.membership.plans.premium.period}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700">
                {t.membership.plans.premium.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={() => handleSelectPlan('Premium')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{t.membership.plans.premium.btnText}</span>
              </button>
            </div>
          </div>

          {/* DIAMOND PLAN - Visually distinctive with elegant dark blue and gold styling per prompt requirement */}
          <div className="bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white rounded-2xl border-2 border-amber-400 shadow-2xl p-7 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-bl-xl shadow-md">
              👑 {language === 'bn' ? 'টপ প্রায়োরিটি' : 'Top Priority'}
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'এক্সক্লুসিভ স্ট্যাটাস' : 'Elite Master'}</span>
                </span>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>{t.membership.plans.diamond.name}</span>
                </h3>
                <p className="text-xs text-slate-300 min-h-[32px]">
                  {t.membership.plans.diamond.desc}
                </p>
              </div>

              <div className="pt-2 pb-4 border-b border-blue-900/60 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-amber-400 font-mono-numbers">
                  {t.membership.plans.diamond.price}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  / {t.membership.plans.diamond.period}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-200">
                {t.membership.plans.diamond.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-blue-900/60 relative z-10">
              <button
                onClick={() => handleSelectPlan('Diamond')}
                className="w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
              >
                <Crown className="w-3.5 h-3.5 text-slate-950" />
                <span>{t.membership.plans.diamond.btnText}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Accepted Payment Channels Strip */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {language === 'bn' ? 'সহজ বাংলাদেশি পেমেন্ট চ্যানেল' : 'Secured Bangladesh Payment Gateways'}
          </span>
          <div className="flex items-center justify-center gap-6 text-xs font-bold text-slate-700">
            <span className="px-3 py-1 bg-white rounded border border-slate-200 shadow-2xs text-[#D12053]">
              bKash (বিকাশ)
            </span>
            <span className="px-3 py-1 bg-white rounded border border-slate-200 shadow-2xs text-[#ED1C24]">
              Nagad (নগদ)
            </span>
            <span className="px-3 py-1 bg-white rounded border border-slate-200 shadow-2xs text-[#0F52BA]">
              SSLCommerz (কার্ড / ইন্টারনেট ব্যাংকিং)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
