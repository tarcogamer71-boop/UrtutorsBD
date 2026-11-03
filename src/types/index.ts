export type UserRole = 'guest' | 'tutor' | 'guardian' | 'admin';
export type Language = 'en' | 'bn';

export type TutorStatus = 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Additional Information Required';
export type MembershipTier = 'Free' | 'Premium' | 'Diamond';
export type MediumType = 'Bangla Medium' | 'English Version' | 'English Medium' | 'Madrasah';
export type TuitionRequestStatus = 'Pending Review' | 'Matching' | 'Tutor Assigned' | 'Completed' | 'Cancelled';
export type ApplicationStatus = 'Applied' | 'Shortlisted' | 'Selected' | 'Rejected';
export type PaymentStatus = 'Completed' | 'Pending' | 'Failed' | 'Refunded';
export type PaymentGateway = 'bKash' | 'Nagad' | 'SSLCommerz';

export interface AcademicRecord {
  group: string;
  passingYear: string;
  gpa: string;
  board?: string;
}

export interface TutorProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  gender: 'Male' | 'Female' | 'Other';
  photoUrl: string;
  presentAddress: string;
  preferredLocations: string[];
  
  // Academic
  universityName: string;
  department: string;
  currentYearSemester: string;
  ssc: AcademicRecord;
  hsc: AcademicRecord;

  // Teaching
  preferredClasses: string[];
  subjects: string[];
  mediums: MediumType[];
  experienceYears: number;
  expectedMinSalary: number; // in BDT
  bio: string;

  // System status
  status: TutorStatus;
  membershipTier: MembershipTier;
  membershipExpiryDate?: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  completedTuitions: number;
  createdAt: string;
  rejectionReason?: string;
}

export interface TuitionRequest {
  id: string; // e.g. TR-2026-1042
  guardianName: string;
  guardianPhone: string;
  guardianWhatsApp: string;
  guardianEmail?: string;
  studentClass: string;
  schoolCollege: string;
  medium: MediumType;
  subjects: string[];
  daysPerWeek: number;
  preferredSchedule: string;
  preferredTutorGender: 'Any' | 'Male' | 'Female';
  monthlyBudget: number; // in BDT
  location: string;
  nearbyLandmark: string;
  additionalInstructions: string;
  status: TuitionRequestStatus;
  matchedTutorIds: string[];
  assignedTutorId?: string;
  createdAt: string;
}

export interface TuitionApplication {
  id: string;
  tuitionRequestId: string;
  tutorId: string;
  tutorName: string;
  tutorUniversity: string;
  tutorMembership: MembershipTier;
  tutorExpectedSalary: number;
  appliedAt: string;
  coverNote: string;
  status: ApplicationStatus;
}

export interface PaymentTransaction {
  id: string;
  transactionId: string; // TrxID
  tutorId: string;
  tutorName: string;
  planTier: 'Premium' | 'Diamond';
  amountBDT: number;
  gateway: PaymentGateway;
  senderNumber: string;
  status: PaymentStatus;
  date: string;
  notes?: string;
}

export interface NotificationItem {
  id: string;
  recipientRole: 'all' | 'tutor' | 'guardian' | 'admin';
  recipientId?: string;
  titleEn: string;
  titleBn: string;
  messageEn: string;
  messageBn: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  createdAt: string;
  read: boolean;
  actionUrl?: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  authorRole: string;
  studentClass: string;
  location: string;
  rating: number;
  commentEn: string;
  commentBn: string;
  date: string;
}
