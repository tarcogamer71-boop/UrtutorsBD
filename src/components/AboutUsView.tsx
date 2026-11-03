import React from 'react';
import { useApp } from '../context/AppContext';
import { MissionVisionValues } from './MissionVisionValues';
import {
  ShieldCheck,
  Award,
  Globe2,
  Users,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const AboutUsView: React.FC = () => {
  const { language, t, setActiveView } = useApp();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner for About Us */}
      <div className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white py-20 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
              {language === 'bn' ? 'আমাদের ইতিহাস ও লক্ষ্য' : 'Our Story & Purpose'}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              UrTutorsBD — {t.brand.statement}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {language === 'bn'
                ? 'বাংলাদেশের নির্ভরযোগ্য টিউশন প্ল্যাটফর্ম। যেখানে শিক্ষার্থী, অভিভাবক এবং শীর্ষ বিশ্ববিদ্যালয়ের শিক্ষকদের মেলবন্ধন রচিত হয়।'
                : 'A professionally managed tuition agency built to elevate personalized education, support parents, and empower university educators throughout Bangladesh.'}
            </p>
          </div>
        </div>
      </div>

      {/* Brand Story Split with Generated Image */}
      <div className="py-20 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual asset */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-[16/10]">
                <img
                  src="/src/assets/images/about_mission_education_1793694105148.jpg"
                  alt="UrTutorsBD Learning Community"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Story text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  {language === 'bn' ? 'প্রতিষ্ঠার পটভূমি' : 'Why UrTutorsBD Was Created'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {language === 'bn'
                    ? 'শিক্ষার গুণগত মান ও বিশ্বাসযোগ্যতার এক অনন্য মেলবন্ধন'
                    : 'Transforming Education Through Trust and Verification'}
                </h2>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                For years, finding a dependable tutor in Bangladesh was an exhausting game of word-of-mouth recommendations, unverified paper ads on roadside walls, or predatory commission agencies that left both parents and university tutors feeling vulnerable.
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                <strong>UrTutorsBD</strong> was founded to establish a modern, respectful, and digitally transparent standard. We rigorously review student transcripts from premier universities like BUET, Dhaka University, DMC, and NSU, ensuring every parent receives a dedicated mentor they can trust with their child’s academic future.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-0.5">100% Free Tutor Access</span>
                  <p className="text-slate-500">Every qualified university educator can join and apply without mandatory fees.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-0.5">24–48h Matching</span>
                  <p className="text-slate-500">Fast, human-curated coordinator matching tailored to student needs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission, Vision, and 6 Core Values Component */}
      <MissionVisionValues />

      {/* Contact & Agency Office Information */}
      <div className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              {language === 'bn' ? 'যোগাযোগ ও সহায়তা' : 'Agency Support & Headquarters'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {language === 'bn' ? 'সরাসরি যোগাযোগ করুন' : 'Connect with UrTutorsBD Team'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-xs">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mx-auto">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Official Helpline & WhatsApp</h3>
              <p className="text-slate-600 font-mono text-sm font-bold">01341718208</p>
              <p className="text-slate-400">Available Daily: 9:00 AM – 10:00 PM</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Official Email Desk</h3>
              <p className="text-slate-600 font-medium">support@urtutorsbd.com</p>
              <p className="text-slate-400">Tutor Verification & Guardian Assistance</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Central Operational Desk</h3>
              <p className="text-slate-600">Dhanmondi, Dhaka-1209</p>
              <p className="text-slate-400">Services across all divisions of Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
