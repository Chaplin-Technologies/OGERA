import React from 'react';
import { 
  Users, 
  Briefcase, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { mockJobs } from '../../data/mockData';

const AdminDashboard: React.FC = () => {
  const totalUsers = 1247;
  const activeJobs = mockJobs.filter(job => job.status === 'active').length;
  const pendingVerifications = 23;
  const totalTransactions = 45678;

  const stats = [
    {
      label: 'Total Users',
      value: totalUsers.toLocaleString(),
      icon: Users,
      color: 'from-blue-500 to-teal-500',
      change: '+12%',
      subtext: '847 Students, 389 Employers, 11 Admins'
    },
    {
      label: 'Active Jobs',
      value: activeJobs.toString(),
      icon: Briefcase,
      color: 'from-purple-500 to-blue-500',
      change: '+8%',
      subtext: '156 Applications this week'
    },
    {
      label: 'Pending Verifications',
      value: pendingVerifications.toString(),
      icon: Shield,
      color: 'from-yellow-500 to-orange-500',
      change: '-5%',
      subtext: '18 Academic, 5 Employer'
    },
    {
      label: 'Total Transactions',
      value: `$${totalTransactions.toLocaleString()}`,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      change: '+23%',
      subtext: 'Monthly transaction volume'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'user',
      message: 'New student registration: Sarah Johnson',
      time: '2 minutes ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'job',
      message: 'Job posting flagged for review: "Data Entry Clerk"',
      time: '15 minutes ago',
      status: 'warning'
    },
    {
      id: 3,
      type: 'payment',
      message: 'Payment dispute resolved: Case #1234',
      time: '1 hour ago',
      status: 'success'
    },
    {
      id: 4,
      type: 'verification',
      message: 'Academic verification completed for Alex Chen',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 5,
      type: 'user',
      message: 'Employer account locked: Suspicious activity detected',
      time: '3 hours ago',
      status: 'error'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Admin Dashboard 🛡️</h1>
            <p className="text-teal-100 mb-4">
              Platform overview and management tools
            </p>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
              <Shield className="h-4 w-4 mr-2" />
              System Administrator
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
              alt="Admin Dashboard"
              className="w-24 h-24 rounded-full border-4 border-white/20"
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Manage Users</h3>
              <p className="text-sm text-gray-600">{pendingVerifications} pending</p>
            </div>
          </div>
        </button>
        
        <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Review Jobs</h3>
              <p className="text-sm text-gray-600">3 flagged posts</p>
            </div>
          </div>
        </button>
        
        <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Verifications</h3>
              <p className="text-sm text-gray-600">{pendingVerifications} awaiting</p>
            </div>
          </div>
        </button>
        
        <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Analytics</h3>
              <p className="text-sm text-gray-600">View reports</p>
            </div>
          </div>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <p className="text-gray-500 text-xs">{stat.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">System Health</h2>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              All Systems Operational
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Server Status</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-600">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-600">Connected</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Payment Gateway</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">OCR Service</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-yellow-600">Maintenance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Analytics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">94.2%</div>
            <p className="text-sm text-gray-600">Platform Uptime</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">1,847</div>
            <p className="text-sm text-gray-600">Jobs Posted This Month</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">12,543</div>
            <p className="text-sm text-gray-600">Applications Submitted</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">$892K</div>
            <p className="text-sm text-gray-600">Total Earnings Paid</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;