import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import StudentDashboard from './components/Student/StudentDashboard';
import StudentProfile from './components/Student/StudentProfile';
import StudentSettings from './components/Student/StudentSettings';
import StudentMessages from './components/Student/StudentMessages';
import JobBrowser from './components/Student/JobBrowser';
import ApplicationTracking from './components/Student/ApplicationTracking';
import AcademicVerification from './components/Student/AcademicVerification';
import PremiumFeatures from './components/Student/PremiumFeatures';
import EarningsWallet from './components/Student/EarningsWallet';
import EmployerDashboard from './components/Employer/EmployerDashboard';
import EmployerProfile from './components/Employer/EmployerProfile';
import EmployerSettings from './components/Employer/EmployerSettings';
import EmployerMessages from './components/Employer/EmployerMessages';
import EmployerApplicants from './components/Employer/EmployerApplicants';
import JobManagement from './components/Employer/JobManagement';
import JobPostingForm from './components/Employer/JobPostingForm';
import TalentBooking from './components/Employer/TalentBooking';
import EmployerAnalytics from './components/Employer/EmployerAnalytics';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminSettings from './components/Admin/AdminSettings';
import AdminMessages from './components/Admin/AdminMessages';
import UserManagement from './components/Admin/UserManagement';
import ContentModeration from './components/Admin/ContentModeration';
import AcademicMonitoring from './components/Admin/AcademicMonitoring';
import FinancialOversight from './components/Admin/FinancialOversight';
import AdminReports from './components/Admin/AdminReports';
import SystemHealth from './components/Admin/SystemHealth';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-center">Loading Ogera...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderContent = () => {
    if (user.role === 'student') {
      switch (activeTab) {
        case 'jobs':
          return <JobBrowser />;
        case 'applications':
          return <ApplicationTracking />;
        case 'profile':
          return <StudentProfile />;
        case 'earnings':
          return <EarningsWallet />;
        case 'academic':
          return <AcademicVerification />;
        case 'premium':
          return <PremiumFeatures />;
        case 'settings':
          return <StudentSettings />;
        case 'messages':
          return <StudentMessages />;
        default:
          return <StudentDashboard />;
      }
    } else if (user.role === 'employer') {
      switch (activeTab) {
        case 'jobs':
          return <JobManagement />;
        case 'post-job':
          return <JobPostingForm />;
        case 'applicants':
          return <EmployerApplicants />;
        case 'talent-booking':
          return <TalentBooking />;
        case 'analytics':
          return <EmployerAnalytics />;
        case 'profile':
          return <EmployerProfile />;
        case 'settings':
          return <EmployerSettings />;
        case 'messages':
          return <EmployerMessages />;
        default:
          return <EmployerDashboard />;
      }
    } else if (user.role === 'admin') {
      switch (activeTab) {
        case 'users':
          return <UserManagement />;
        case 'moderation':
          return <ContentModeration />;
        case 'academic':
          return <AcademicMonitoring />;
        case 'financial':
          return <FinancialOversight />;
        case 'reports':
          return <AdminReports />;
        case 'system':
          return <SystemHealth />;
        case 'settings':
          return <AdminSettings />;
        case 'messages':
          return <AdminMessages />;
        default:
          return <AdminDashboard />;
      }
    }
    
    return <div className="p-8 text-center text-gray-500">Page not found</div>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;