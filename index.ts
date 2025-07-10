export interface User {
  id: string;
  email: string;
  role: 'student' | 'employer' | 'admin';
  name: string;
  avatar?: string;
  verified: boolean;
  createdAt: string;
  twoFactorEnabled?: boolean;
  status: 'active' | 'suspended' | 'banned' | 'pending';
  lastLoginAt?: string;
}

export interface Admin extends User {
  role: 'admin';
  permissions: AdminPermission[];
  department: 'user-management' | 'content-moderation' | 'financial-oversight' | 'academic-monitoring' | 'system-admin';
}

export interface AdminPermission {
  id: string;
  name: string;
  description: string;
  category: 'users' | 'content' | 'financial' | 'academic' | 'system';
}

export interface Student extends User {
  role: 'student';
  nationalId?: string;
  phone?: string;
  currentGPA?: number;
  academicLevel: 'high-school' | 'undergraduate' | 'graduate';
  skills: string[];
  interests: string[];
  cv?: string;
  certifications: string[];
  totalEarnings: number;
  completedJobs: number;
  accountLocked: boolean;
  premiumAccess: boolean;
  identityStatus: 'pending' | 'verified' | 'rejected';
  academicStatus: 'pending' | 'verified' | 'suspended';
  academicPerformanceScore: number;
  overallPerformanceScore: number;
  averageEmployerRating: number;
  profilePicture?: string;
  bio?: string;
  currentBalance: number;
  withdrawableBalance: number;
}

export interface Employer extends User {
  role: 'employer';
  companyName?: string;
  businessType: 'company' | 'individual';
  businessCategory: 'technology' | 'finance' | 'healthcare' | 'education' | 'retail' | 'other';
  verified: boolean;
  verificationStatus: 'pending' | 'pending-docs' | 'pending-verification' | 'verified' | 'rejected';
  totalJobsPosted: number;
  activeJobs: number;
  averageRating: number;
  totalHires: number;
  verificationDocs: string[];
  paymentMethods: PaymentMethod[];
  totalSpent: number;
  hiringSuccessRate: number;
  candidateQualityScore: number;
}

export interface PaymentMethod {
  id: string;
  employerId: string;
  type: 'card' | 'bank' | 'mobile-money';
  provider?: 'mpesa' | 'mtn-momo' | 'airtel-money' | 'visa' | 'mastercard';
  lastFour?: string;
  isVerified: boolean;
  isDefault: boolean;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  employerId: string;
  type: 'part-time' | 'internship' | 'apprenticeship' | 'full-time';
  duration: string;
  payRate: number;
  payType: 'hourly' | 'fixed' | 'monthly';
  paymentModel: 'escrow' | 'milestone' | 'upfront';
  requiredSkills: string[];
  minimumGPA?: number;
  academicLevel?: string[];
  location: string;
  remote: boolean;
  status: 'draft' | 'active' | 'paused' | 'filled' | 'cancelled' | 'expired' | 'flagged' | 'removed';
  applicants: number;
  postedAt: string;
  deadline: string;
  isPremium?: boolean;
  employerRating: number;
  budgetRange: {
    min: number;
    max: number;
  };
  assignedTalentId?: string;
  escrowStatus?: 'none' | 'held' | 'released' | 'refunded';
  viewCount: number;
  applicationCount: number;
  moderationStatus?: 'pending' | 'approved' | 'flagged' | 'removed';
  moderationNotes?: string;
  flaggedBy?: string[];
  flaggedReasons?: string[];
}

export interface Application {
  id: string;
  jobId: string;
  studentId: string;
  status: 'pending' | 'viewed' | 'shortlisted' | 'interviewed' | 'hired' | 'rejected';
  appliedAt: string;
  coverLetter?: string;
  applicationMethod: 'one-click' | 'tailored';
  reviewedAt?: string;
  reviewNotes?: string;
}

export interface JobAssignment {
  id: string;
  jobId: string;
  studentId: string;
  employerId: string;
  status: 'active' | 'submitted' | 'under-review' | 'completed' | 'disputed';
  startDate: string;
  deadline: string;
  deliverables: Deliverable[];
  employerFeedback?: EmployerFeedback;
  paymentStatus: 'pending' | 'escrowed' | 'released' | 'disputed';
  milestones?: Milestone[];
}

export interface Milestone {
  id: string;
  assignmentId: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  submittedAt?: string;
  approvedAt?: string;
}

export interface Deliverable {
  id: string;
  assignmentId: string;
  fileName: string;
  filePath: string;
  submittedAt: string;
  description?: string;
}

export interface EmployerFeedback {
  id: string;
  assignmentId: string;
  rating: number;
  comments: string;
  submittedAt: string;
  qualityScore: number;
  communicationScore: number;
  timelinessScore: number;
}

export interface TalentFlag {
  id: string;
  employerId: string;
  studentId: string;
  flagReason: 'future-hire-interest' | 'exceptional-performance' | 'preferred-talent';
  notes?: string;
  createdAt: string;
  jobAssignmentId?: string;
}

export interface AcademicBulletinRequest {
  id: string;
  employerId: string;
  studentId: string;
  status: 'pending-admin-review' | 'authorized' | 'rejected';
  requestReason: string;
  adminNotes?: string;
  documentPath?: string;
  requestedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface FutureContractProposal {
  id: string;
  employerId: string;
  studentId: string;
  proposedRole: string;
  roleDetails: string;
  proposedStartDate: string;
  terms: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  createdAt: string;
  respondedAt?: string;
  contractPath?: string;
}

export interface EscrowTransaction {
  id: string;
  jobId: string;
  employerId: string;
  studentId: string;
  amount: number;
  status: 'held' | 'released' | 'refunded' | 'disputed';
  createdAt: string;
  releasedAt?: string;
  refundedAt?: string;
  disputeId?: string;
}

export interface MessageThread {
  id: string;
  participants: string[];
  jobId?: string;
  lastMessage?: Message;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
  messageType: 'text' | 'file' | 'video-call-link';
  attachments?: string[];
}

export interface EmployerAnalytics {
  totalJobsPosted: number;
  activeJobs: number;
  totalApplications: number;
  totalHires: number;
  hiringSuccessRate: number;
  averageTimeToHire: number;
  totalSpent: number;
  averageCostPerHire: number;
  candidateQualityScore: number;
  employerRating: number;
  topPerformingJobs: Job[];
  applicationTrends: {
    month: string;
    applications: number;
    hires: number;
  }[];
  talentRetentionRate: number;
}

export interface AcademicRecord {
  id: string;
  studentId: string;
  imagePath: string;
  ocrRawText?: string;
  extractedGrades: any;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  academicYear: string;
  term: string;
  gpa?: number;
  adminNotes?: string;
}

export interface Transaction {
  id: string;
  studentId: string;
  type: 'earning' | 'withdrawal' | 'bonus' | 'penalty';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
  jobAssignmentId?: string;
  withdrawalMethod?: string;
}

export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  requiredScore: number;
  category: 'jobs' | 'scholarships' | 'mentorship' | 'rewards';
  isUnlocked: boolean;
}

export interface Dispute {
  id: string;
  jobAssignmentId: string;
  studentId: string;
  employerId: string;
  reason: string;
  description: string;
  status: 'open' | 'under-review' | 'resolved';
  createdAt: string;
  resolvedAt?: string;
  resolution?: string;
  adminNotes?: string;
  resolvedBy?: string;
  evidence?: string[];
}

export interface Notification {
  id: string;
  userId: string;
  type: 'application' | 'job-match' | 'payment' | 'verification' | 'message' | 'premium' | 'academic' | 'talent-booking' | 'contract' | 'admin';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface VerificationLog {
  id: string;
  userId: string;
  verificationType: 'identity' | 'business' | 'academic' | 'payment';
  status: 'pending' | 'approved' | 'rejected';
  details: any;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  adminNotes?: string;
}

export interface ContentFlag {
  id: string;
  contentType: 'job' | 'profile' | 'message' | 'review';
  contentId: string;
  flaggedBy: string;
  reason: 'inappropriate' | 'spam' | 'fraud' | 'harassment' | 'other';
  description: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  resolution?: string;
}

export interface FraudAlert {
  id: string;
  userId: string;
  alertType: 'suspicious-transaction' | 'multiple-accounts' | 'fake-documents' | 'unusual-activity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  evidence: any;
  status: 'open' | 'investigating' | 'resolved' | 'false-positive';
  createdAt: string;
  investigatedBy?: string;
  resolvedAt?: string;
  resolution?: string;
}

export interface SystemHealth {
  id: string;
  service: 'database' | 'payment-gateway' | 'ocr-service' | 'file-storage' | 'notification-service';
  status: 'operational' | 'degraded' | 'maintenance' | 'outage';
  responseTime: number;
  uptime: number;
  lastChecked: string;
  issues?: string[];
}

export interface AdminReport {
  id: string;
  type: 'user' | 'engagement' | 'job' | 'financial' | 'academic' | 'system';
  title: string;
  description: string;
  dateRange: {
    start: string;
    end: string;
  };
  data: any;
  generatedBy: string;
  generatedAt: string;
  format: 'json' | 'csv' | 'pdf';
  downloadUrl?: string;
}

export interface PremiumAccessRequest {
  id: string;
  studentId: string;
  featureId: string;
  requestReason: string;
  currentScore: number;
  requiredScore: number;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  adminNotes?: string;
}

export interface ScholarshipApplication {
  id: string;
  studentId: string;
  scholarshipId: string;
  applicationData: any;
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  adminNotes?: string;
}