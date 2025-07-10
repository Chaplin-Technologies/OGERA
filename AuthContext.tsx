import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Student, Employer } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Enhanced mock users with comprehensive employer data
const mockUsers: (Student | Employer | User)[] = [
  {
    id: '1',
    email: 'alice@student.edu',
    role: 'student',
    name: 'Alice Johnson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    verified: true,
    createdAt: '2024-01-15',
    twoFactorEnabled: true,
    nationalId: 'ID123456789',
    phone: '+1234567890',
    currentGPA: 3.8,
    academicLevel: 'undergraduate',
    skills: ['JavaScript', 'React', 'Python', 'Data Analysis', 'Git', 'HTML/CSS'],
    interests: ['Web Development', 'Data Science', 'AI/ML', 'Entrepreneurship'],
    cv: '/uploads/cv/alice-johnson-cv.pdf',
    certifications: ['/uploads/certs/react-certification.pdf', '/uploads/certs/python-basics.pdf'],
    totalEarnings: 2450,
    completedJobs: 8,
    accountLocked: false,
    premiumAccess: true,
    identityStatus: 'verified',
    academicStatus: 'verified',
    academicPerformanceScore: 3.8,
    overallPerformanceScore: 4.2,
    averageEmployerRating: 4.6,
    profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Passionate computer science student with a focus on web development and data analysis. Always eager to learn new technologies and contribute to meaningful projects.',
    currentBalance: 1250,
    withdrawableBalance: 850
  },
  {
    id: '2',
    email: 'john@techcorp.com',
    role: 'employer',
    name: 'John Smith',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    verified: true,
    createdAt: '2024-01-10',
    twoFactorEnabled: true,
    companyName: 'TechCorp Solutions',
    businessType: 'company',
    businessCategory: 'technology',
    verificationStatus: 'verified',
    totalJobsPosted: 15,
    activeJobs: 3,
    averageRating: 4.8,
    totalHires: 42,
    verificationDocs: ['/uploads/business/techcorp-registration.pdf'],
    paymentMethods: [
      {
        id: '1',
        employerId: '2',
        type: 'card',
        provider: 'visa',
        lastFour: '4242',
        isVerified: true,
        isDefault: true,
        createdAt: '2024-01-10'
      }
    ],
    totalSpent: 45678,
    hiringSuccessRate: 26.9,
    candidateQualityScore: 4.6
  },
  {
    id: '3',
    email: 'admin@elan.com',
    role: 'admin',
    name: 'Sarah Wilson',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    verified: true,
    createdAt: '2024-01-01',
    twoFactorEnabled: true
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('elan_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.role === role);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('elan_user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('elan_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('elan_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};