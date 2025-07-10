import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Eye,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  MoreHorizontal,
  Calendar,
  Mail,
  Phone,
  Shield
} from 'lucide-react';
import { mockVerificationLogs } from '../../data/mockData';

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'suspend' | 'ban' | null>(null);

  // Mock user data
  const mockUsers = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@student.edu',
      role: 'student',
      status: 'active',
      verificationStatus: 'verified',
      joinDate: '2024-01-15',
      lastActive: '2024-01-25',
      totalEarnings: 2450,
      completedJobs: 8,
      gpa: 3.8,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '2',
      name: 'John Smith',
      email: 'john@techcorp.com',
      role: 'employer',
      status: 'active',
      verificationStatus: 'verified',
      joinDate: '2024-01-10',
      lastActive: '2024-01-25',
      totalJobsPosted: 15,
      totalHires: 42,
      companyName: 'TechCorp Solutions',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '4',
      name: 'Suspicious User',
      email: 'fake@example.com',
      role: 'employer',
      status: 'suspended',
      verificationStatus: 'rejected',
      joinDate: '2024-01-24',
      lastActive: '2024-01-24',
      totalJobsPosted: 1,
      flaggedContent: 3,
      companyName: 'QuickCash Ltd',
      avatar: null
    },
    {
      id: '5',
      name: 'Jane Doe',
      email: 'jane@university.edu',
      role: 'student',
      status: 'pending',
      verificationStatus: 'pending',
      joinDate: '2024-01-25',
      lastActive: '2024-01-25',
      gpa: null,
      avatar: null
    }
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesTab = activeTab === 'all' || user.status === activeTab || 
                      (activeTab === 'verification-pending' && user.verificationStatus === 'pending');
    const matchesSearch = !searchTerm || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'suspended':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'banned':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      case 'banned':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUserAction = (userId: string, action: 'approve' | 'suspend' | 'ban') => {
    setSelectedUser(userId);
    setActionType(action);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    // In real app, this would call the API
    console.log(`${actionType} user ${selectedUser}`);
    setShowActionModal(false);
    setSelectedUser(null);
    setActionType(null);
  };

  const statusCounts = {
    all: mockUsers.length,
    active: mockUsers.filter(u => u.status === 'active').length,
    pending: mockUsers.filter(u => u.status === 'pending').length,
    suspended: mockUsers.filter(u => u.status === 'suspended').length,
    banned: mockUsers.filter(u => u.status === 'banned').length,
    'verification-pending': mockUsers.filter(u => u.verificationStatus === 'pending').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage user accounts, verifications, and access controls</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <span className="text-sm text-gray-600">{filteredUsers.length} users</span>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            Export Users
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'all', label: 'All Users', count: statusCounts.all },
            { id: 'active', label: 'Active', count: statusCounts.active },
            { id: 'pending', label: 'Pending', count: statusCounts.pending },
            { id: 'verification-pending', label: 'Verification Pending', count: statusCounts['verification-pending'] },
            { id: 'suspended', label: 'Suspended', count: statusCounts.suspended },
            { id: 'banned', label: 'Banned', count: statusCounts.banned }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center space-x-2 transition-colors">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Advanced Filters</span>
            </button>
          </div>
        </div>

        {/* Users List */}
        <div className="divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-gray-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVerificationStatusColor(user.verificationStatus)}`}>
                        {user.verificationStatus}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'student' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'employer' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>Last active {new Date(user.lastActive).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {/* User Stats */}
                  <div className="text-right text-sm">
                    {user.role === 'student' && (
                      <>
                        <div className="font-medium text-gray-900">
                          ${user.totalEarnings?.toLocaleString() || 0} earned
                        </div>
                        <div className="text-gray-600">
                          {user.completedJobs || 0} jobs • GPA: {user.gpa || 'N/A'}
                        </div>
                      </>
                    )}
                    {user.role === 'employer' && (
                      <>
                        <div className="font-medium text-gray-900">
                          {user.totalJobsPosted || 0} jobs posted
                        </div>
                        <div className="text-gray-600">
                          {user.totalHires || 0} hires • {user.companyName}
                        </div>
                      </>
                    )}
                    {user.flaggedContent && (
                      <div className="text-red-600 font-medium">
                        {user.flaggedContent} flagged items
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    
                    {user.status === 'pending' && (
                      <button 
                        onClick={() => handleUserAction(user.id, 'approve')}
                        className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                      >
                        <UserCheck className="h-4 w-4" />
                      </button>
                    )}
                    
                    {user.status === 'active' && (
                      <button 
                        onClick={() => handleUserAction(user.id, 'suspend')}
                        className="p-2 text-gray-400 hover:text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors"
                      >
                        <Lock className="h-4 w-4" />
                      </button>
                    )}
                    
                    {user.status === 'suspended' && (
                      <button 
                        onClick={() => handleUserAction(user.id, 'approve')}
                        className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                      >
                        <Unlock className="h-4 w-4" />
                      </button>
                    )}
                    
                    {user.status !== 'banned' && (
                      <button 
                        onClick={() => handleUserAction(user.id, 'ban')}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <UserX className="h-4 w-4" />
                      </button>
                    )}
                    
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Confirmation Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              {actionType === 'approve' && <UserCheck className="h-6 w-6 text-green-600" />}
              {actionType === 'suspend' && <Lock className="h-6 w-6 text-yellow-600" />}
              {actionType === 'ban' && <UserX className="h-6 w-6 text-red-600" />}
              <h2 className="text-lg font-semibold text-gray-900">
                Confirm {actionType?.charAt(0).toUpperCase() + actionType?.slice(1)} User
              </h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to {actionType} this user? This action will be logged and may affect their access to the platform.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowActionModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                  actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' :
                  actionType === 'suspend' ? 'bg-yellow-600 hover:bg-yellow-700' :
                  'bg-red-600 hover:bg-red-700'
                }`}
              >
                Confirm {actionType?.charAt(0).toUpperCase() + actionType?.slice(1)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;