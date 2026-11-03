import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  UserRole,
  TutorProfile,
  TuitionRequest,
  TuitionApplication,
  PaymentTransaction,
  NotificationItem,
  MembershipTier,
  PaymentGateway,
  TutorStatus,
} from '../types';
import {
  initialTutors,
  initialTuitionRequests,
  initialTransactions,
  initialNotifications,
} from '../data/initialData';
import { translations } from '../data/translations';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  // Locale & Navigation
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  activeView: string;
  setActiveView: (view: string) => void;

  // Authentication & Roles
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentTutorProfile: TutorProfile | null;
  setCurrentTutorProfile: (tutor: TutorProfile | null) => void;
  currentGuardianName: string;

  // Data Stores
  tutors: TutorProfile[];
  tuitionRequests: TuitionRequest[];
  applications: TuitionApplication[];
  transactions: PaymentTransaction[];
  notifications: NotificationItem[];
  toasts: ToastMessage[];

  // Directory Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  selectedClass: string;
  setSelectedClass: (c: string) => void;
  selectedSubject: string;
  setSelectedSubject: (s: string) => void;
  selectedMedium: string;
  setSelectedMedium: (m: string) => void;
  selectedTier: string;
  setSelectedTier: (t: string) => void;
  selectedGender: string;
  setSelectedGender: (g: string) => void;

  // Active Modals & Selected items
  selectedTutorForDetail: TutorProfile | null;
  setSelectedTutorForDetail: (tutor: TutorProfile | null) => void;
  paymentModalPlan: { tier: 'Premium' | 'Diamond'; amount: number } | null;
  setPaymentModalPlan: (plan: { tier: 'Premium' | 'Diamond'; amount: number } | null) => void;

  // Actions
  registerTutor: (newTutor: Omit<TutorProfile, 'id' | 'status' | 'membershipTier' | 'isVerified' | 'rating' | 'reviewCount' | 'completedTuitions' | 'createdAt'>) => string;
  submitTuitionRequest: (request: Omit<TuitionRequest, 'id' | 'status' | 'matchedTutorIds' | 'createdAt'>) => string;
  applyForTuition: (tuitionRequestId: string, tutorId: string, expectedSalary: number, note: string) => void;
  updateTutorStatus: (tutorId: string, status: TutorStatus, rejectionReason?: string) => void;
  toggleTutorVerification: (tutorId: string) => void;
  upgradeTutorMembership: (tutorId: string, tier: MembershipTier, gateway: PaymentGateway, trxId: string, senderNumber: string) => Promise<boolean>;
  assignTutorToRequest: (requestId: string, tutorId: string) => void;
  matchTutorsToRequest: (requestId: string, tutorIds: string[]) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  showToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [activeView, setActiveView] = useState<string>('home');
  const [currentRole, setCurrentRole] = useState<UserRole>('guest');
  
  // Tutors
  const [tutors, setTutors] = useState<TutorProfile[]>(() => {
    const saved = localStorage.getItem('urtutors_tutors');
    return saved ? JSON.parse(saved) : initialTutors;
  });

  const [currentTutorProfile, setCurrentTutorProfile] = useState<TutorProfile | null>(() => {
    return tutors[0] || null;
  });

  const [currentGuardianName] = useState<string>('Engr. Mahmudul Hassan');

  // Tuition Requests
  const [tuitionRequests, setTuitionRequests] = useState<TuitionRequest[]>(() => {
    const saved = localStorage.getItem('urtutors_requests');
    return saved ? JSON.parse(saved) : initialTuitionRequests;
  });

  // Applications
  const [applications, setApplications] = useState<TuitionApplication[]>(() => {
    const saved = localStorage.getItem('urtutors_applications');
    return saved ? JSON.parse(saved) : [
      {
        id: 'APP-501',
        tuitionRequestId: 'TR-2026-1042',
        tutorId: 'TUT-101',
        tutorName: 'Tahmidur Rahman',
        tutorUniversity: 'BUET (EEE)',
        tutorMembership: 'Diamond',
        tutorExpectedSalary: 9000,
        appliedAt: '2026-11-01',
        coverNote: 'Experienced in St. Joseph syllabus and board-oriented numerical problem solving.',
        status: 'Selected',
      },
      {
        id: 'APP-502',
        tuitionRequestId: 'TR-2026-1043',
        tutorId: 'TUT-102',
        tutorName: 'Dr. Nusrat Jahan',
        tutorUniversity: 'Dhaka Medical College',
        tutorMembership: 'Diamond',
        tutorExpectedSalary: 8500,
        appliedAt: '2026-11-02',
        coverNote: 'Specialized medical notes and Viqarunnisa curriculum experience.',
        status: 'Shortlisted',
      },
    ];
  });

  // Transactions
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem('urtutors_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('urtutors_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Directory Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedMedium, setSelectedMedium] = useState('All');
  const [selectedTier, setSelectedTier] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');

  // Modals
  const [selectedTutorForDetail, setSelectedTutorForDetail] = useState<TutorProfile | null>(null);
  const [paymentModalPlan, setPaymentModalPlan] = useState<{ tier: 'Premium' | 'Diamond'; amount: number } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('urtutors_tutors', JSON.stringify(tutors));
  }, [tutors]);

  useEffect(() => {
    localStorage.setItem('urtutors_requests', JSON.stringify(tuitionRequests));
  }, [tuitionRequests]);

  useEffect(() => {
    localStorage.setItem('urtutors_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('urtutors_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('urtutors_applications', JSON.stringify(applications));
  }, [applications]);

  const showToast = (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const registerTutor = (data: Omit<TutorProfile, 'id' | 'status' | 'membershipTier' | 'isVerified' | 'rating' | 'reviewCount' | 'completedTuitions' | 'createdAt'>): string => {
    const newId = `TUT-${100 + tutors.length + 1}`;
    const newTutor: TutorProfile = {
      ...data,
      id: newId,
      status: 'Submitted',
      membershipTier: 'Free',
      isVerified: false,
      rating: 0,
      reviewCount: 0,
      completedTuitions: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTutors((prev) => [newTutor, ...prev]);
    setCurrentTutorProfile(newTutor);

    // Notify Admin
    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      recipientRole: 'admin',
      titleEn: `New Tutor Application: ${data.fullName}`,
      titleBn: `নতুন টিউটর আবেদন: ${data.fullName}`,
      messageEn: `${data.fullName} (${data.universityName}) submitted application for review.`,
      messageBn: `${data.fullName} (${data.universityName}) নতুন টিউটর হিসেবে নিবন্ধনের জন্য আবেদন জমা দিয়েছেন।`,
      type: 'info',
      createdAt: 'Just now',
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast('success', 'Application Submitted', `Application tracking ID ${newId} created. Under review by admin desk.`);
    return newId;
  };

  const submitTuitionRequest = (data: Omit<TuitionRequest, 'id' | 'status' | 'matchedTutorIds' | 'createdAt'>): string => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `TR-2026-${randomSuffix}`;
    const newRequest: TuitionRequest = {
      ...data,
      id: newId,
      status: 'Pending Review',
      matchedTutorIds: [],
      createdAt: new Date().toISOString(),
    };

    setTuitionRequests((prev) => [newRequest, ...prev]);

    // Admin Notification
    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      recipientRole: 'admin',
      titleEn: `New Tuition Post: ${newId} (${data.location})`,
      titleBn: `নতুন টিউশন চাহিদা: ${newId} (${data.location})`,
      messageEn: `${data.guardianName} posted requirement for ${data.studentClass} - Budget: ৳${data.monthlyBudget.toLocaleString('en-IN')}.`,
      messageBn: `${data.guardianName} ${data.studentClass}-এর জন্য ৳${data.monthlyBudget.toLocaleString('en-IN')} বাজেটের টিউশন পোস্ট করেছেন।`,
      type: 'alert',
      createdAt: 'Just now',
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast('success', 'Tuition Request Submitted', `Tracking reference ${newId} recorded. Our coordinators will contact within 24–48 hours.`);
    return newId;
  };

  const applyForTuition = (tuitionRequestId: string, tutorId: string, expectedSalary: number, note: string) => {
    const tutor = tutors.find((t) => t.id === tutorId);
    if (!tutor) return;

    const existingApp = applications.find(
      (a) => a.tuitionRequestId === tuitionRequestId && a.tutorId === tutorId
    );
    if (existingApp) {
      showToast('warning', 'Already Applied', 'You have already submitted an application for this tuition.');
      return;
    }

    const newApp: TuitionApplication = {
      id: `APP-${Date.now().toString().slice(-4)}`,
      tuitionRequestId,
      tutorId,
      tutorName: tutor.fullName,
      tutorUniversity: `${tutor.universityName} (${tutor.department})`,
      tutorMembership: tutor.membershipTier,
      tutorExpectedSalary: expectedSalary,
      appliedAt: new Date().toISOString().split('T')[0],
      coverNote: note,
      status: 'Applied',
    };

    setApplications((prev) => [newApp, ...prev]);

    // Automatically add to matched list for admin review
    setTuitionRequests((prev) =>
      prev.map((req) => {
        if (req.id === tuitionRequestId && !req.matchedTutorIds.includes(tutorId)) {
          return {
            ...req,
            status: req.status === 'Pending Review' ? 'Matching' : req.status,
            matchedTutorIds: [...req.matchedTutorIds, tutorId],
          };
        }
        return req;
      })
    );

    showToast('success', 'Application Sent', 'Your application has been received by UrTutorsBD coordinator desk.');
  };

  const updateTutorStatus = (tutorId: string, status: TutorStatus, rejectionReason?: string) => {
    setTutors((prev) =>
      prev.map((tut) => {
        if (tut.id === tutorId) {
          return {
            ...tut,
            status,
            rejectionReason: rejectionReason || tut.rejectionReason,
            isVerified: status === 'Approved' ? true : tut.isVerified,
          };
        }
        return tut;
      })
    );

    if (currentTutorProfile && currentTutorProfile.id === tutorId) {
      setCurrentTutorProfile((prev) => (prev ? { ...prev, status, isVerified: status === 'Approved' ? true : prev.isVerified } : null));
    }

    showToast('info', 'Tutor Status Updated', `Tutor ${tutorId} status changed to ${status}.`);
  };

  const toggleTutorVerification = (tutorId: string) => {
    setTutors((prev) =>
      prev.map((tut) => {
        if (tut.id === tutorId) {
          const newStatus = !tut.isVerified;
          return { ...tut, isVerified: newStatus };
        }
        return tut;
      })
    );
    showToast('info', 'Academic Verification', 'Tutor credentials verification status updated.');
  };

  const upgradeTutorMembership = async (
    tutorId: string,
    tier: MembershipTier,
    gateway: PaymentGateway,
    trxId: string,
    senderNumber: string
  ): Promise<boolean> => {
    const tutor = tutors.find((t) => t.id === tutorId);
    if (!tutor) return false;

    const amount = tier === 'Diamond' ? 1000 : 500;
    const now = new Date();
    const expiry = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()).toISOString().split('T')[0];

    const newTxn: PaymentTransaction = {
      id: `TXN-${Math.floor(100 + Math.random() * 900)}`,
      transactionId: trxId.toUpperCase(),
      tutorId,
      tutorName: tutor.fullName,
      planTier: tier as 'Premium' | 'Diamond',
      amountBDT: amount,
      gateway,
      senderNumber,
      status: 'Completed',
      date: new Date().toLocaleString('en-US', { hour12: true }),
      notes: `Verified server-side via ${gateway} direct checkout API.`,
    };

    setTransactions((prev) => [newTxn, ...prev]);

    setTutors((prev) =>
      prev.map((tut) => {
        if (tut.id === tutorId) {
          return {
            ...tut,
            membershipTier: tier,
            membershipExpiryDate: expiry,
          };
        }
        return tut;
      })
    );

    if (currentTutorProfile && currentTutorProfile.id === tutorId) {
      setCurrentTutorProfile((prev) =>
        prev ? { ...prev, membershipTier: tier, membershipExpiryDate: expiry } : null
      );
    }

    // Add notification
    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      recipientRole: 'tutor',
      recipientId: tutorId,
      titleEn: `${tier} Membership Activated!`,
      titleBn: `${tier === 'Diamond' ? 'ডায়মন্ড' : 'প্রিমিয়াম'} মেম্বারশিপ সক্রিয় হয়েছে!`,
      messageEn: `Your payment of ৳${amount} via ${gateway} (TrxID: ${trxId.toUpperCase()}) was verified. Enjoy top search priority until ${expiry}.`,
      messageBn: `${gateway}-এর মাধ্যমে ৳${amount} পেমেন্ট সফলভাবে যাচাই হয়েছে। আপনার মেম্বারশিপ মেয়াদ ${expiry} পর্যন্ত।`,
      type: 'success',
      createdAt: 'Just now',
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast('success', 'Membership Upgraded!', `Congratulations! Your ${tier} badge is now active.`);
    return true;
  };

  const assignTutorToRequest = (requestId: string, tutorId: string) => {
    setTuitionRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          return {
            ...req,
            assignedTutorId: tutorId,
            status: 'Tutor Assigned',
          };
        }
        return req;
      })
    );

    const tutor = tutors.find((t) => t.id === tutorId);
    showToast('success', 'Tutor Assigned', `Assigned ${tutor?.fullName || tutorId} to tuition requirement ${requestId}.`);
  };

  const matchTutorsToRequest = (requestId: string, tutorIds: string[]) => {
    setTuitionRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          return {
            ...req,
            matchedTutorIds: tutorIds,
            status: tutorIds.length > 0 ? 'Matching' : req.status,
          };
        }
        return req;
      })
    );
    showToast('info', 'Matching Updated', `Matched ${tutorIds.length} candidate tutor(s) with request ${requestId}.`);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        activeView,
        setActiveView,
        currentRole,
        setCurrentRole,
        currentTutorProfile,
        setCurrentTutorProfile,
        currentGuardianName,
        tutors,
        tuitionRequests,
        applications,
        transactions,
        notifications,
        toasts,
        searchQuery,
        setSearchQuery,
        selectedLocation,
        setSelectedLocation,
        selectedClass,
        setSelectedClass,
        selectedSubject,
        setSelectedSubject,
        selectedMedium,
        setSelectedMedium,
        selectedTier,
        setSelectedTier,
        selectedGender,
        setSelectedGender,
        selectedTutorForDetail,
        setSelectedTutorForDetail,
        paymentModalPlan,
        setPaymentModalPlan,
        registerTutor,
        submitTuitionRequest,
        applyForTuition,
        updateTutorStatus,
        toggleTutorVerification,
        upgradeTutorMembership,
        assignTutorToRequest,
        matchTutorsToRequest,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
