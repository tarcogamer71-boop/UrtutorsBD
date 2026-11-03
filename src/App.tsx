/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';
import { MissionVisionValues } from './components/MissionVisionValues';
import { FeaturedTutors } from './components/FeaturedTutors';
import { AcademicCategoriesSection } from './components/AcademicCategoriesSection';
import { MembershipSection } from './components/MembershipSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { TutorDirectory } from './components/TutorDirectory';
import { TutorRegistrationView } from './components/TutorRegistrationView';
import { GuardianRequirementView } from './components/GuardianRequirementView';
import { TuitionBoardView } from './components/TuitionBoardView';
import { TutorDashboardView } from './components/TutorDashboardView';
import { GuardianDashboardView } from './components/GuardianDashboardView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { AboutUsView } from './components/AboutUsView';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PaymentGatewayModal } from './components/PaymentGatewayModal';
import { TutorDetailModal } from './components/TutorDetailModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <HeroSection />
            <HowItWorks />
            <MissionVisionValues />
            <FeaturedTutors />
            <AcademicCategoriesSection />
            <MembershipSection />
            <TestimonialsSection />
            <FaqSection />
          </>
        )}

        {activeView === 'directory' && <TutorDirectory />}
        {activeView === 'tuition-board' && <TuitionBoardView />}
        {activeView === 'become-tutor' && <TutorRegistrationView />}
        {activeView === 'request-tuition' && <GuardianRequirementView />}
        {activeView === 'memberships' && (
          <div className="py-6">
            <MembershipSection />
            <FaqSection />
          </div>
        )}
        {activeView === 'how-it-works' && (
          <div className="py-6">
            <HowItWorks />
            <FaqSection />
          </div>
        )}
        {activeView === 'about' && <AboutUsView />}
        {activeView === 'tutor-dashboard' && <TutorDashboardView />}
        {activeView === 'guardian-dashboard' && <GuardianDashboardView />}
        {activeView === 'admin-dashboard' && <AdminDashboardView />}
      </main>

      <Footer />

      {/* Global Modals & Floaters */}
      <FloatingWhatsApp />
      <PaymentGatewayModal />
      <TutorDetailModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
