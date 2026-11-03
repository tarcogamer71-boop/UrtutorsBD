import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { initialFaqs } from '../data/initialData';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { language } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">
            {language === 'bn' ? 'সাধারণ প্রশ্নাবলী' : 'Common Questions'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'bn' ? 'সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {language === 'bn'
              ? 'UrTutorsBD সেবা, শিক্ষক ভেরিফিকেশন ও ট্রায়াল ক্লাস সংক্রান্ত যাবতীয় তথ্য।'
              : 'Everything you need to know about our tuition matching, verification, and policies.'}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {initialFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  <span>{language === 'bn' ? faq.qBn : faq.qEn}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {language === 'bn' ? faq.aBn : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
