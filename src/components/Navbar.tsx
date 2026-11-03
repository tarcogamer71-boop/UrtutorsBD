import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Globe,
  Bell,
  Menu,
  X,
  UserCheck,
  Shield,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    activeView,
    setActiveView,
    currentRole,
    setCurrentRole,
    notifications,
    markAllNotificationsAsRead,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const unreadNotifications = notifications.filter((n) => !n.read);

  const handleNavClick = (view: string) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Utility Announcement Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'bn' ? 'অফিশিয়াল সাপোর্ট:' : 'Official Helpdesk:'}
            </span>
            <span className="text-slate-300">01341718208</span>
            <span className="hidden sm:inline text-slate-500">·</span>
            <span className="hidden sm:inline text-slate-400">
              {language === 'bn' ? '২৪-৪৮ ঘণ্টার মধ্যে বিশ্বস্ত শিক্ষক প্রাপ্তি' : 'Verified Tutor Placement within 24–48 Hours'}
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer py-0.5 px-1.5 rounded hover:bg-slate-800"
              title="Switch language বাংলা / English"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-medium">{language === 'en' ? 'বাংলা' : 'English'}</span>
            </button>

            {/* Role Simulator Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="inline-flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-0.5 rounded transition-colors cursor-pointer"
              >
                <span className="text-slate-400">{language === 'bn' ? 'রোল:' : 'Role:'}</span>
                <span className="font-semibold text-amber-300 capitalize">{currentRole}</span>
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-44 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {language === 'bn' ? 'পোর্টাল নির্বাচন' : 'Switch Active Role'}
                  </div>
                  <button
                    onClick={() => {
                      setCurrentRole('guest');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 ${currentRole === 'guest' ? 'font-semibold text-blue-700 bg-blue-50/60' : ''}`}
                  >
                    <span>Visitor / Public</span>
                    {currentRole === 'guest' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentRole('tutor');
                      setActiveView('tutor-dashboard');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 ${currentRole === 'tutor' ? 'font-semibold text-blue-700 bg-blue-50/60' : ''}`}
                  >
                    <span>Tutor Portal</span>
                    {currentRole === 'tutor' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentRole('guardian');
                      setActiveView('guardian-dashboard');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 ${currentRole === 'guardian' ? 'font-semibold text-blue-700 bg-blue-50/60' : ''}`}
                  >
                    <span>Guardian Portal</span>
                    {currentRole === 'guardian' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentRole('admin');
                      setActiveView('admin-dashboard');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 ${currentRole === 'admin' ? 'font-semibold text-blue-700 bg-blue-50/60' : ''}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-blue-600" />
                      Admin Console
                    </span>
                    {currentRole === 'admin' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single Brand Element */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 flex items-center justify-center text-amber-400 shadow-md shadow-blue-900/10">
            <GraduationCap className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors whitespace-nowrap">
              Ur<span className="text-blue-700">Tutors</span><span className="text-amber-600 font-extrabold">BD</span>
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors whitespace-nowrap hover:text-blue-700 cursor-pointer ${activeView === 'home' ? 'text-blue-700 font-semibold' : ''}`}
          >
            {t.nav.home}
          </button>
          <button
            onClick={() => handleNavClick('directory')}
            className={`transition-colors whitespace-nowrap hover:text-blue-700 cursor-pointer ${activeView === 'directory' ? 'text-blue-700 font-semibold' : ''}`}
          >
            {t.nav.findTutors}
          </button>
          <button
            onClick={() => handleNavClick('tuition-board')}
            className={`transition-colors whitespace-nowrap hover:text-blue-700 cursor-pointer ${activeView === 'tuition-board' ? 'text-blue-700 font-semibold' : ''}`}
          >
            {t.nav.tuitionRequests}
          </button>
          <button
            onClick={() => handleNavClick('memberships')}
            className={`transition-colors whitespace-nowrap hover:text-blue-700 cursor-pointer ${activeView === 'memberships' ? 'text-blue-700 font-semibold' : ''}`}
          >
            {t.nav.membershipPlans}
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className={`transition-colors whitespace-nowrap hover:text-blue-700 cursor-pointer ${activeView === 'how-it-works' ? 'text-blue-700 font-semibold' : ''}`}
          >
            {t.nav.howItWorks}
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors whitespace-nowrap hover:text-blue-700 cursor-pointer ${activeView === 'about' ? 'text-blue-700 font-semibold' : ''}`}
          >
            {t.nav.aboutUs}
          </button>
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Notifications Tray */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
              )}
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="text-sm font-semibold text-slate-900">
                    {language === 'bn' ? 'বিজ্ঞপ্তি ও এলার্ট' : 'Notifications'}
                  </div>
                  {unreadNotifications.length > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                    >
                      {language === 'bn' ? 'সব পড়া হয়েছে' : 'Mark all read'}
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 mt-1">
                  {notifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      className={`py-2.5 px-2 rounded-lg text-xs transition-colors ${n.read ? 'text-slate-500' : 'bg-blue-50/50 text-slate-800 font-medium'}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-900">
                          {language === 'bn' ? n.titleBn : n.titleEn}
                        </span>
                        <span className="text-[10px] text-slate-400 tabular-nums">{n.createdAt}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-2">
                        {language === 'bn' ? n.messageBn : n.messageEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Role specific quick portal button */}
          {currentRole === 'tutor' ? (
            <button
              onClick={() => handleNavClick('tutor-dashboard')}
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg border transition-all cursor-pointer ${
                activeView === 'tutor-dashboard'
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
              }`}
            >
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span>{t.nav.portalTutor}</span>
            </button>
          ) : currentRole === 'guardian' ? (
            <button
              onClick={() => handleNavClick('guardian-dashboard')}
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg border transition-all cursor-pointer ${
                activeView === 'guardian-dashboard'
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>{t.nav.portalGuardian}</span>
            </button>
          ) : currentRole === 'admin' ? (
            <button
              onClick={() => handleNavClick('admin-dashboard')}
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg border transition-all cursor-pointer ${
                activeView === 'admin-dashboard'
                  ? 'bg-blue-950 text-white border-blue-950'
                  : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
              }`}
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>{t.nav.portalAdmin}</span>
            </button>
          ) : null}

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick('request-tuition')}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm shadow-blue-700/20 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>{language === 'bn' ? 'শিক্ষক খুঁজুন' : 'Hire a Tutor'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left text-sm py-2 px-3 rounded-md transition-colors ${activeView === 'home' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600'}`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('directory')}
              className={`text-left text-sm py-2 px-3 rounded-md transition-colors ${activeView === 'directory' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600'}`}
            >
              {t.nav.findTutors}
            </button>
            <button
              onClick={() => handleNavClick('become-tutor')}
              className={`text-left text-sm py-2 px-3 rounded-md transition-colors ${activeView === 'become-tutor' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600'}`}
            >
              {t.nav.becomeTutor}
            </button>
            <button
              onClick={() => handleNavClick('tuition-board')}
              className={`text-left text-sm py-2 px-3 rounded-md transition-colors ${activeView === 'tuition-board' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600'}`}
            >
              {t.nav.tuitionRequests}
            </button>
            <button
              onClick={() => handleNavClick('memberships')}
              className={`text-left text-sm py-2 px-3 rounded-md transition-colors ${activeView === 'memberships' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600'}`}
            >
              {t.nav.membershipPlans}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left text-sm py-2 px-3 rounded-md transition-colors ${activeView === 'about' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600'}`}
            >
              {t.nav.aboutUs}
            </button>
          </div>

          <div className="pt-1 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('request-tuition')}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
            >
              {language === 'bn' ? 'অভিভাবক ফর্ম: শিক্ষক প্রয়োজন' : 'Guardian Tuition Request'}
            </button>
            <button
              onClick={() => handleNavClick('become-tutor')}
              className="w-full py-2.5 text-center text-sm font-semibold text-blue-900 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg"
            >
              {language === 'bn' ? 'টিউটর আবেদন ফর্ম' : 'Apply as Tutor'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
