import React from 'react';
import { 
  Home, 
  Briefcase, 
  User, 
  DollarSign, 
  Users, 
  FileText, 
  Settings,
  PlusCircle,
  BarChart3,
  Shield,
  BookOpen,
  Crown,
  GraduationCap,
  Flag,
  Calendar,
  AlertTriangle,
  Activity,
  FileBarChart,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();

  const getNavigationItems = () => {
    switch (user?.role) {
      case 'student':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'jobs', label: 'Browse Jobs', icon: Briefcase },
          { id: 'applications', label: 'My Applications', icon: FileText },
          { id: 'earnings', label: 'Earnings & Wallet', icon: DollarSign },
          { id: 'academic', label: 'Academic Records', icon: GraduationCap },
          { id: 'premium', label: 'Premium Features', icon: Crown },
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'messages', label: 'Messages', icon: MessageCircle },
          { id: 'settings', label: 'Settings', icon: Settings }
        ];
      case 'employer':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'jobs', label: 'Job Management', icon: Briefcase },
          { id: 'post-job', label: 'Post Job', icon: PlusCircle },
          { id: 'applicants', label: 'Applicants', icon: Users },
          { id: 'talent-booking', label: 'Talent Booking', icon: Flag },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'messages', label: 'Messages', icon: MessageCircle },
          { id: 'settings', label: 'Settings', icon: Settings }
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'moderation', label: 'Content Moderation', icon: AlertTriangle },
          { id: 'academic', label: 'Academic Monitoring', icon: GraduationCap },
          { id: 'financial', label: 'Financial Oversight', icon: DollarSign },
          { id: 'reports', label: 'Reports & Analytics', icon: FileBarChart },
          { id: 'system', label: 'System Health', icon: Activity },
          { id: 'messages', label: 'Messages', icon: MessageCircle },
          { id: 'settings', label: 'Settings', icon: Settings }
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <aside className="bg-white border-r border-gray-200 w-64 min-h-screen">
      <nav className="mt-6">
        <div className="px-4 mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {user?.role === 'student' && 'Student Portal'}
            {user?.role === 'employer' && 'Employer Portal'}
            {user?.role === 'admin' && 'Admin Panel'}
          </h2>
        </div>
        <div className="space-y-1 px-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.id
                    ? user?.role === 'admin' 
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${activeTab === item.id ? 'text-white' : 'text-gray-400'}`} />
                {item.label}
                {item.id === 'premium' && user?.role === 'student' && (
                  <Crown className="ml-auto h-4 w-4 text-yellow-500" />
                )}
                {item.id === 'talent-booking' && user?.role === 'employer' && (
                  <Flag className="ml-auto h-4 w-4 text-purple-500" />
                )}
                {item.id === 'moderation' && user?.role === 'admin' && (
                  <AlertTriangle className="ml-auto h-4 w-4 text-red-500" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;