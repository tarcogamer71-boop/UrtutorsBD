import React from 'react';
import { useApp } from '../context/AppContext';
import { initialReviews } from '../data/initialData';
import { Star, Quote, MapPin, CheckCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { language } = useApp();

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">
            {language === 'bn' ? 'অভিভাবক ও শিক্ষকদের অভিজ্ঞতা' : 'Genuine Experiences'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'bn' ? 'অভিভাবক ও শিক্ষকদের মতামত' : 'Stories of Trust & Academic Growth'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {language === 'bn'
              ? 'UrTutorsBD প্ল্যাটফর্মের মাধ্যমে গড়ে ওঠা সফল শিক্ষা সম্পর্কের প্রত্যক্ষ অভিজ্ঞতা।'
              : 'Verifiable testimonials from parents, candidates, and university educators across Dhaka.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initialReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 p-7 rounded-2xl border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <blockquote className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  “{language === 'bn' ? rev.commentBn : rev.commentEn}”
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{rev.authorName}</h4>
                  <p className="text-[11px] text-blue-800 font-medium">{rev.studentClass}</p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{rev.location}</span>
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
