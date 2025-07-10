import { Job, Application, Notification, Student, AcademicRecord, Transaction, PremiumFeature, JobAssignment, EmployerFeedback, TalentFlag, AcademicBulletinRequest, FutureContractProposal, EscrowTransaction, MessageThread, Message, EmployerAnalytics, PaymentMethod, Employer, VerificationLog, ContentFlag, FraudAlert, SystemHealth, AdminReport, Dispute, PremiumAccessRequest, ScholarshipApplication } from '../types';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    description: 'Join our development team to work on modern web applications using React and TypeScript. Perfect for students looking to gain real-world experience in a fast-paced startup environment.',
    company: 'TechCorp Solutions',
    employerId: '2',
    type: 'internship',
    duration: '3 months',
    payRate: 15,
    payType: 'hourly',
    paymentModel: 'escrow',
    requiredSkills: ['React', 'JavaScript', 'HTML/CSS', 'Git'],
    minimumGPA: 3.0,
    academicLevel: ['undergraduate', 'graduate'],
    location: 'San Francisco, CA',
    remote: true,
    status: 'active',
    applicants: 12,
    postedAt: '2024-01-20',
    deadline: '2024-02-15',
    employerRating: 4.8,
    budgetRange: { min: 12, max: 18 },
    assignedTalentId: '1',
    escrowStatus: 'held',
    viewCount: 156,
    applicationCount: 12,
    moderationStatus: 'approved'
  },
  {
    id: '2',
    title: 'Data Analysis Assistant',
    description: 'Help analyze customer data and create comprehensive reports. Great opportunity to apply statistical knowledge in a real business context while working with industry-standard tools.',
    company: 'DataInsights Inc',
    employerId: '2',
    type: 'part-time',
    duration: '6 months',
    payRate: 800,
    payType: 'monthly',
    paymentModel: 'milestone',
    requiredSkills: ['Python', 'Data Analysis', 'Excel', 'SQL'],
    minimumGPA: 3.2,
    academicLevel: ['undergraduate'],
    location: 'New York, NY',
    remote: false,
    status: 'active',
    applicants: 8,
    postedAt: '2024-01-18',
    deadline: '2024-02-10',
    employerRating: 4.6,
    budgetRange: { min: 700, max: 900 },
    escrowStatus: 'none',
    viewCount: 89,
    applicationCount: 8,
    moderationStatus: 'approved'
  },
  {
    id: '3',
    title: 'Premium AI Research Assistant',
    description: 'Work on cutting-edge AI research projects with our team. This premium opportunity includes mentorship from senior researchers and access to exclusive training programs.',
    company: 'AI Innovation Lab',
    employerId: '2',
    type: 'internship',
    duration: '4 months',
    payRate: 25,
    payType: 'hourly',
    paymentModel: 'escrow',
    requiredSkills: ['Python', 'Machine Learning', 'Research', 'Academic Writing'],
    minimumGPA: 3.7,
    academicLevel: ['undergraduate', 'graduate'],
    location: 'Boston, MA',
    remote: true,
    status: 'active',
    applicants: 5,
    postedAt: '2024-01-22',
    deadline: '2024-02-20',
    isPremium: true,
    employerRating: 4.9,
    budgetRange: { min: 20, max: 30 },
    escrowStatus: 'none',
    viewCount: 234,
    applicationCount: 5,
    moderationStatus: 'approved'
  },
  {
    id: '4',
    title: 'Content Writer',
    description: 'Create engaging content for our blog and social media channels. Perfect for English, Communications, or Marketing students looking to build their portfolio.',
    company: 'Creative Agency',
    employerId: '2',
    type: 'part-time',
    duration: 'Ongoing',
    payRate: 20,
    payType: 'hourly',
    paymentModel: 'upfront',
    requiredSkills: ['Writing', 'Content Creation', 'Social Media', 'SEO'],
    minimumGPA: 3.0,
    academicLevel: ['undergraduate', 'graduate'],
    location: 'Remote',
    remote: true,
    status: 'filled',
    applicants: 15,
    postedAt: '2024-01-22',
    deadline: '2024-02-20',
    employerRating: 4.4,
    budgetRange: { min: 15, max: 25 },
    assignedTalentId: '1',
    escrowStatus: 'released',
    viewCount: 178,
    applicationCount: 15,
    moderationStatus: 'approved'
  },
  {
    id: '5',
    title: 'Suspicious Job Posting',
    description: 'Easy money! Work from home and earn $5000 per week with no experience required. Contact us immediately!',
    company: 'QuickCash Ltd',
    employerId: '4',
    type: 'part-time',
    duration: '1 week',
    payRate: 5000,
    payType: 'fixed',
    paymentModel: 'upfront',
    requiredSkills: [],
    location: 'Remote',
    remote: true,
    status: 'flagged',
    applicants: 0,
    postedAt: '2024-01-25',
    deadline: '2024-01-30',
    employerRating: 2.1,
    budgetRange: { min: 5000, max: 5000 },
    viewCount: 45,
    applicationCount: 0,
    moderationStatus: 'flagged',
    moderationNotes: 'Suspicious payment amount and unrealistic promises',
    flaggedBy: ['user-123', 'user-456'],
    flaggedReasons: ['fraud', 'spam']
  }
];

export const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    studentId: '1',
    status: 'shortlisted',
    appliedAt: '2024-01-21',
    coverLetter: 'I am very interested in this frontend development position and believe my React experience makes me a strong candidate.',
    applicationMethod: 'tailored',
    reviewedAt: '2024-01-22',
    reviewNotes: 'Strong technical background, good portfolio'
  },
  {
    id: '2',
    jobId: '4',
    studentId: '1',
    status: 'hired',
    appliedAt: '2024-01-23',
    applicationMethod: 'one-click',
    reviewedAt: '2024-01-24',
    reviewNotes: 'Excellent writing samples'
  },
  {
    id: '3',
    jobId: '2',
    studentId: '1',
    status: 'viewed',
    appliedAt: '2024-01-24',
    coverLetter: 'My background in statistics and Python programming aligns perfectly with this data analysis role.',
    applicationMethod: 'tailored',
    reviewedAt: '2024-01-25'
  }
];

export const mockVerificationLogs: VerificationLog[] = [
  {
    id: '1',
    userId: '1',
    verificationType: 'academic',
    status: 'pending',
    details: {
      documentType: 'report-card',
      academicYear: '2023-2024',
      term: 'Term 1',
      ocrText: 'Student: Alice Johnson\nGPA: 3.8\nMathematics: A\nComputer Science: A+'
    },
    createdAt: '2024-01-25T10:30:00Z'
  },
  {
    id: '2',
    userId: '2',
    verificationType: 'business',
    status: 'approved',
    details: {
      documentType: 'business-registration',
      companyName: 'TechCorp Solutions',
      registrationNumber: 'TC-2023-001'
    },
    createdAt: '2024-01-20T14:15:00Z',
    reviewedAt: '2024-01-21T09:30:00Z',
    reviewedBy: 'admin-1',
    adminNotes: 'Valid business registration confirmed'
  },
  {
    id: '3',
    userId: '5',
    verificationType: 'identity',
    status: 'rejected',
    details: {
      documentType: 'national-id',
      reason: 'Document quality too poor for verification'
    },
    createdAt: '2024-01-24T16:45:00Z',
    reviewedAt: '2024-01-25T11:20:00Z',
    reviewedBy: 'admin-2',
    adminNotes: 'Please resubmit with clearer image'
  }
];

export const mockContentFlags: ContentFlag[] = [
  {
    id: '1',
    contentType: 'job',
    contentId: '5',
    flaggedBy: 'user-123',
    reason: 'fraud',
    description: 'This job posting promises unrealistic earnings and appears to be a scam',
    status: 'pending',
    createdAt: '2024-01-25T12:00:00Z'
  },
  {
    id: '2',
    contentType: 'profile',
    contentId: 'employer-4',
    flaggedBy: 'user-456',
    reason: 'spam',
    description: 'Multiple identical job postings from this employer',
    status: 'reviewed',
    createdAt: '2024-01-24T15:30:00Z',
    reviewedAt: '2024-01-25T09:15:00Z',
    reviewedBy: 'admin-1',
    resolution: 'Warning issued to employer'
  }
];

export const mockFraudAlerts: FraudAlert[] = [
  {
    id: '1',
    userId: '4',
    alertType: 'suspicious-transaction',
    severity: 'high',
    description: 'Multiple large payment attempts from unverified payment methods',
    evidence: {
      transactionAttempts: 5,
      amounts: [5000, 4500, 5200],
      timeframe: '2 hours'
    },
    status: 'investigating',
    createdAt: '2024-01-25T14:20:00Z',
    investigatedBy: 'admin-1'
  },
  {
    id: '2',
    userId: '6',
    alertType: 'fake-documents',
    severity: 'critical',
    description: 'Uploaded documents appear to be digitally manipulated',
    evidence: {
      documentType: 'business-registration',
      anomalies: ['inconsistent fonts', 'digital artifacts', 'metadata mismatch']
    },
    status: 'open',
    createdAt: '2024-01-25T16:45:00Z'
  }
];

export const mockSystemHealth: SystemHealth[] = [
  {
    id: '1',
    service: 'database',
    status: 'operational',
    responseTime: 45,
    uptime: 99.9,
    lastChecked: '2024-01-25T17:00:00Z'
  },
  {
    id: '2',
    service: 'payment-gateway',
    status: 'operational',
    responseTime: 120,
    uptime: 99.8,
    lastChecked: '2024-01-25T17:00:00Z'
  },
  {
    id: '3',
    service: 'ocr-service',
    status: 'maintenance',
    responseTime: 0,
    uptime: 95.2,
    lastChecked: '2024-01-25T17:00:00Z',
    issues: ['Scheduled maintenance for OCR engine upgrade']
  },
  {
    id: '4',
    service: 'file-storage',
    status: 'operational',
    responseTime: 85,
    uptime: 99.95,
    lastChecked: '2024-01-25T17:00:00Z'
  }
];

export const mockDisputes: Dispute[] = [
  {
    id: '1',
    jobAssignmentId: 'assignment-2',
    studentId: '1',
    employerId: '2',
    reason: 'payment-dispute',
    description: 'Work was completed as specified but payment was not released after approval',
    status: 'under-review',
    createdAt: '2024-01-24T10:30:00Z',
    evidence: ['/uploads/disputes/evidence-1.pdf', '/uploads/disputes/screenshots.zip']
  },
  {
    id: '2',
    jobAssignmentId: 'assignment-3',
    studentId: '3',
    employerId: '2',
    reason: 'work-quality',
    description: 'Delivered work does not meet the specified requirements',
    status: 'resolved',
    createdAt: '2024-01-20T14:15:00Z',
    resolvedAt: '2024-01-23T11:30:00Z',
    resolution: 'Partial refund issued to employer, student to revise work',
    adminNotes: 'Both parties agreed to resolution',
    resolvedBy: 'admin-1'
  }
];

export const mockPremiumAccessRequests: PremiumAccessRequest[] = [
  {
    id: '1',
    studentId: '1',
    featureId: 'mentorship-program',
    requestReason: 'I have consistently maintained high academic performance and would benefit from industry mentorship',
    currentScore: 4.1,
    requiredScore: 4.2,
    status: 'pending',
    requestedAt: '2024-01-25T09:15:00Z'
  },
  {
    id: '2',
    studentId: '3',
    featureId: 'tech-rewards-store',
    requestReason: 'Requesting early access to purchase laptop for studies',
    currentScore: 4.3,
    requiredScore: 4.5,
    status: 'rejected',
    requestedAt: '2024-01-22T16:30:00Z',
    reviewedAt: '2024-01-24T10:45:00Z',
    reviewedBy: 'admin-2',
    adminNotes: 'Score requirement not met. Please continue improving performance.'
  }
];

export const mockScholarshipApplications: ScholarshipApplication[] = [
  {
    id: '1',
    studentId: '1',
    scholarshipId: 'tech-excellence-2024',
    applicationData: {
      essay: 'Technology has always been my passion...',
      academicTranscripts: '/uploads/scholarships/transcripts-alice.pdf',
      recommendationLetters: ['/uploads/scholarships/rec-letter-1.pdf']
    },
    status: 'under-review',
    submittedAt: '2024-01-20T12:00:00Z'
  }
];

export const mockAdminReports: AdminReport[] = [
  {
    id: '1',
    type: 'user',
    title: 'Monthly User Activity Report',
    description: 'Comprehensive analysis of user registrations, activity, and engagement metrics',
    dateRange: {
      start: '2024-01-01',
      end: '2024-01-31'
    },
    data: {
      totalUsers: 1247,
      newRegistrations: 156,
      activeUsers: 892,
      usersByRole: { students: 847, employers: 389, admins: 11 }
    },
    generatedBy: 'admin-1',
    generatedAt: '2024-01-25T08:00:00Z',
    format: 'pdf',
    downloadUrl: '/reports/user-activity-jan-2024.pdf'
  },
  {
    id: '2',
    type: 'financial',
    title: 'Platform Financial Summary',
    description: 'Revenue, transactions, and financial health metrics',
    dateRange: {
      start: '2024-01-01',
      end: '2024-01-31'
    },
    data: {
      totalRevenue: 45678,
      totalPayouts: 38920,
      escrowBalance: 125000,
      transactionVolume: 1847
    },
    generatedBy: 'admin-1',
    generatedAt: '2024-01-25T08:30:00Z',
    format: 'csv'
  }
];

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    employerId: '2',
    type: 'card',
    provider: 'visa',
    lastFour: '4242',
    isVerified: true,
    isDefault: true,
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    employerId: '2',
    type: 'mobile-money',
    provider: 'mpesa',
    lastFour: '7890',
    isVerified: true,
    isDefault: false,
    createdAt: '2024-01-12'
  }
];

export const mockTalentFlags: TalentFlag[] = [
  {
    id: '1',
    employerId: '2',
    studentId: '1',
    flagReason: 'exceptional-performance',
    notes: 'Outstanding work quality and communication. Would love to work with again.',
    createdAt: '2024-01-25',
    jobAssignmentId: 'assignment-1'
  }
];

export const mockAcademicBulletinRequests: AcademicBulletinRequest[] = [
  {
    id: '1',
    employerId: '2',
    studentId: '1',
    status: 'authorized',
    requestReason: 'Considering for long-term internship program',
    adminNotes: 'Student has excellent academic standing. Approved for bulletin access.',
    documentPath: '/bulletins/alice-johnson-academic-bulletin.pdf',
    requestedAt: '2024-01-26',
    reviewedAt: '2024-01-27',
    reviewedBy: 'admin-1'
  }
];

export const mockFutureContractProposals: FutureContractProposal[] = [
  {
    id: '1',
    employerId: '2',
    studentId: '1',
    proposedRole: 'Junior Frontend Developer',
    roleDetails: 'Full-time position starting after graduation. Focus on React development with mentorship opportunities.',
    proposedStartDate: '2024-06-01',
    terms: 'Competitive salary, health benefits, flexible work arrangements, professional development budget.',
    status: 'sent',
    createdAt: '2024-01-28'
  }
];

export const mockEscrowTransactions: EscrowTransaction[] = [
  {
    id: '1',
    jobId: '1',
    employerId: '2',
    studentId: '1',
    amount: 1800,
    status: 'held',
    createdAt: '2024-01-21'
  },
  {
    id: '2',
    jobId: '4',
    employerId: '2',
    studentId: '1',
    amount: 320,
    status: 'released',
    createdAt: '2024-01-23',
    releasedAt: '2024-01-25'
  }
];

export const mockEmployerAnalytics: EmployerAnalytics = {
  totalJobsPosted: 15,
  activeJobs: 3,
  totalApplications: 156,
  totalHires: 42,
  hiringSuccessRate: 26.9,
  averageTimeToHire: 3.2,
  totalSpent: 45678,
  averageCostPerHire: 1087,
  candidateQualityScore: 4.6,
  employerRating: 4.8,
  topPerformingJobs: mockJobs.slice(0, 3),
  applicationTrends: [
    { month: 'Jan 2024', applications: 45, hires: 12 },
    { month: 'Dec 2023', applications: 38, hires: 10 },
    { month: 'Nov 2023', applications: 42, hires: 11 },
    { month: 'Oct 2023', applications: 31, hires: 9 }
  ],
  talentRetentionRate: 85.7
};

export const mockMessageThreads: MessageThread[] = [
  {
    id: '1',
    participants: ['2', '1'],
    jobId: '1',
    lastMessage: {
      id: '1',
      threadId: '1',
      senderId: '2',
      content: 'Great work on the project! Looking forward to the final deliverables.',
      timestamp: '2024-01-25T14:30:00Z',
      read: true,
      messageType: 'text'
    },
    createdAt: '2024-01-21T10:00:00Z',
    updatedAt: '2024-01-25T14:30:00Z'
  }
];

export const mockAcademicRecords: AcademicRecord[] = [
  {
    id: '1',
    studentId: '1',
    imagePath: '/uploads/academic/report-card-2024-1.jpg',
    ocrRawText: 'Student: Alice Johnson\nAcademic Year: 2023-2024\nTerm: 1\nMathematics: A\nComputer Science: A+\nPhysics: B+\nGPA: 3.8',
    extractedGrades: {
      mathematics: 'A',
      computerScience: 'A+',
      physics: 'B+',
      gpa: 3.8
    },
    status: 'approved',
    reviewedBy: 'admin-1',
    reviewedAt: '2024-01-16',
    academicYear: '2023-2024',
    term: 'Term 1',
    gpa: 3.8
  },
  {
    id: '2',
    studentId: '3',
    imagePath: '/uploads/academic/report-card-2024-2.jpg',
    ocrRawText: 'Student: John Doe\nAcademic Year: 2023-2024\nTerm: 1\nMathematics: C\nComputer Science: B\nPhysics: C+\nGPA: 2.5',
    extractedGrades: {
      mathematics: 'C',
      computerScience: 'B',
      physics: 'C+',
      gpa: 2.5
    },
    status: 'pending',
    academicYear: '2023-2024',
    term: 'Term 1',
    gpa: 2.5
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    studentId: '1',
    type: 'earning',
    amount: 320,
    description: 'Payment for Frontend Development Project',
    status: 'completed',
    timestamp: '2024-01-22T14:30:00Z',
    jobAssignmentId: 'assignment-1'
  },
  {
    id: '2',
    studentId: '1',
    type: 'withdrawal',
    amount: 200,
    description: 'Mobile Money Withdrawal',
    status: 'completed',
    timestamp: '2024-01-20T10:15:00Z',
    withdrawalMethod: 'M-Pesa'
  },
  {
    id: '3',
    studentId: '1',
    type: 'bonus',
    amount: 50,
    description: 'Performance Bonus for Excellent Work',
    status: 'completed',
    timestamp: '2024-01-19T16:45:00Z',
    jobAssignmentId: 'assignment-1'
  }
];

export const mockPremiumFeatures: PremiumFeature[] = [
  {
    id: '1',
    name: 'Exclusive Job Listings',
    description: 'Access to high-paying premium jobs from top companies',
    requiredScore: 4.0,
    category: 'jobs',
    isUnlocked: true
  },
  {
    id: '2',
    name: 'Scholarship Portal',
    description: 'Apply for academic scholarships and grants',
    requiredScore: 3.8,
    category: 'scholarships',
    isUnlocked: true
  },
  {
    id: '3',
    name: 'Mentorship Program',
    description: 'One-on-one mentorship with industry professionals',
    requiredScore: 4.2,
    category: 'mentorship',
    isUnlocked: false
  },
  {
    id: '4',
    name: 'Tech Rewards Store',
    description: 'Redeem points for laptops, gadgets, and tech accessories',
    requiredScore: 4.5,
    category: 'rewards',
    isUnlocked: false
  }
];

export const mockJobAssignments: JobAssignment[] = [
  {
    id: 'assignment-1',
    jobId: '1',
    studentId: '1',
    employerId: '2',
    status: 'completed',
    startDate: '2024-01-15',
    deadline: '2024-01-25',
    deliverables: [
      {
        id: 'del-1',
        assignmentId: 'assignment-1',
        fileName: 'project-frontend.zip',
        filePath: '/uploads/deliverables/project-frontend.zip',
        submittedAt: '2024-01-24T18:30:00Z',
        description: 'Complete frontend implementation with React components'
      }
    ],
    employerFeedback: {
      id: 'feedback-1',
      assignmentId: 'assignment-1',
      rating: 4.8,
      comments: 'Excellent work! The code quality is outstanding and the UI is very polished.',
      submittedAt: '2024-01-25T10:00:00Z',
      qualityScore: 4.9,
      communicationScore: 4.7,
      timelinessScore: 4.8
    },
    paymentStatus: 'released'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'application',
    title: 'Application Shortlisted',
    message: 'You have been shortlisted for Frontend Developer Intern position at TechCorp Solutions!',
    read: false,
    createdAt: '2024-01-24T10:30:00Z',
    actionUrl: '/student/applications'
  },
  {
    id: '2',
    userId: '1',
    type: 'premium',
    title: 'Premium Feature Unlocked',
    message: 'Congratulations! You\'ve unlocked access to the Scholarship Portal.',
    read: false,
    createdAt: '2024-01-23T15:45:00Z',
    actionUrl: '/student/premium-features'
  },
  {
    id: '3',
    userId: '1',
    type: 'payment',
    title: 'Payment Received',
    message: 'You received $320 for your completed frontend development project.',
    read: true,
    createdAt: '2024-01-22T14:35:00Z',
    actionUrl: '/student/earnings'
  },
  {
    id: '4',
    userId: '1',
    type: 'academic',
    title: 'Academic Record Verified',
    message: 'Your Term 1 report card has been successfully verified. GPA: 3.8',
    read: true,
    createdAt: '2024-01-16T09:20:00Z',
    actionUrl: '/student/academic-verification'
  },
  // Employer notifications
  {
    id: '5',
    userId: '2',
    type: 'application',
    title: 'New Application Received',
    message: 'Alice Johnson applied for your Frontend Developer Intern position.',
    read: false,
    createdAt: '2024-01-21T11:15:00Z',
    actionUrl: '/employer/jobs/1/applicants'
  },
  {
    id: '6',
    userId: '2',
    type: 'talent-booking',
    title: 'Academic Bulletin Authorized',
    message: 'Academic bulletin for Alice Johnson has been authorized and is ready for review.',
    read: false,
    createdAt: '2024-01-27T09:30:00Z',
    actionUrl: '/employer/talent-booking'
  },
  {
    id: '7',
    userId: '2',
    type: 'contract',
    title: 'Future Contract Proposal Sent',
    message: 'Your future contract proposal has been sent to Alice Johnson.',
    read: true,
    createdAt: '2024-01-28T16:20:00Z',
    actionUrl: '/employer/contracts'
  },
  // Admin notifications
  {
    id: '8',
    userId: '3',
    type: 'admin',
    title: 'New Verification Request',
    message: 'Academic record verification pending for student Alice Johnson.',
    read: false,
    createdAt: '2024-01-25T10:30:00Z',
    actionUrl: '/admin/verifications'
  },
  {
    id: '9',
    userId: '3',
    type: 'admin',
    title: 'Content Flagged',
    message: 'Job posting flagged for suspicious content - requires review.',
    read: false,
    createdAt: '2024-01-25T12:00:00Z',
    actionUrl: '/admin/moderation'
  },
  {
    id: '10',
    userId: '3',
    type: 'admin',
    title: 'Fraud Alert',
    message: 'High severity fraud alert detected for user account.',
    read: true,
    createdAt: '2024-01-25T14:20:00Z',
    actionUrl: '/admin/fraud-alerts'
  }
];