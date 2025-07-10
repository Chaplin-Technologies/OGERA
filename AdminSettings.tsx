import React, { useState } from 'react';
import { 
  Shield, 
  Bell, 
  Users, 
  Eye, 
  EyeOff, 
  Lock, 
  Save,
  AlertTriangle,
  CheckCircle,
  Settings,
  Database,
  Globe,
  Mail,
  Smartphone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSettings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('system');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    userRegistration: true,
    jobPosting: true,
    paymentProcessing: true,
    emailNotifications: true,
    smsNotifications: true,
    autoModeration: true,
    academicVerification: true
  });
  const [notifications, setNotifications] = useState({
    newUserRegistrations: true,
    flaggedContent: true,
    paymentIssues: true,
    systemAlerts: true,
    securityAlerts: true,
    performanceAlerts: false
  });

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    console.log('Admin password change requested');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleSystemSettingChange = (key: string, value: boolean) => {
    setSystemSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Admin Settings ⚙️</h1>
        <p className="text-teal-100">
          Configure system settings and manage platform operations
        </p>
      </div>

      {/* Settings Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'system', label: 'System Settings', icon: Settings },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'users', label: 'User Management', icon: Users },
            { id: 'security', label: 'Security', icon: Lock }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
                  activeTab === tab.id
                    ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {/* System Settings */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Controls</h3>
                <div className="space-y-4">
                  {[
                    { key: 'maintenanceMode', label: 'Maintenance Mode', description: 'Put the platform in maintenance mode', critical: true },
                    { key: 'userRegistration', label: 'User Registration', description: 'Allow new users to register' },
                    { key: 'jobPosting', label: 'Job Posting', description: 'Allow employers to post new jobs' },
                    { key: 'paymentProcessing', label: 'Payment Processing', description: 'Enable payment and withdrawal processing' },
                    { key: 'emailNotifications', label: 'Email System', description: 'Send email notifications to users' },
                    { key: 'smsNotifications', label: 'SMS System', description: 'Send SMS notifications to users' },
                    { key: 'autoModeration', label: 'Auto Moderation', description: 'Automatically moderate content using AI' },
                    { key: 'academicVerification', label: 'Academic Verification', description: 'Enable academic document verification' }
                  ].map((setting) => (
                    <div key={setting.key} className={`flex items-center justify-between p-4 rounded-lg ${
                      setting.critical ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                    }`}>
                      <div>
                        <h4 className={`font-medium ${setting.critical ? 'text-red-900' : 'text-gray-900'}`}>
                          {setting.label}
                        </h4>
                        <p className={`text-sm ${setting.critical ? 'text-red-700' : 'text-gray-600'}`}>
                          {setting.description}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={systemSettings[setting.key as keyof typeof systemSettings]}
                          onChange={(e) => handleSystemSettingChange(setting.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 ${
                          setting.critical ? 'peer-focus:ring-red-300' : 'peer-focus:ring-teal-300'
                        } rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                          setting.critical ? 'peer-checked:bg-red-600' : 'peer-checked:bg-teal-600'
                        }`}></div>
                      </label>
                    </div>
                  ))}
                </div>
                <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save System Settings</span>
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Platform Name
                    </label>
                    <input
                      type="text"
                      value="Ogera"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Support Email
                    </label>
                    <input
                      type="email"
                      value="support@ogera.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum GPA Threshold
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value="2.5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Platform Fee (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value="5.0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { key: 'newUserRegistrations', label: 'New User Registrations', description: 'Get notified when new users register' },
                    { key: 'flaggedContent', label: 'Flagged Content', description: 'Immediate alerts for flagged content' },
                    { key: 'paymentIssues', label: 'Payment Issues', description: 'Alerts for payment failures or disputes' },
                    { key: 'systemAlerts', label: 'System Alerts', description: 'Critical system notifications' },
                    { key: 'securityAlerts', label: 'Security Alerts', description: 'Security breach or suspicious activity alerts' },
                    { key: 'performanceAlerts', label: 'Performance Alerts', description: 'System performance and uptime alerts' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.label}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[item.key as keyof typeof notifications]}
                          onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                    </div>
                    <input
                      type="email"
                      placeholder="admin@ogera.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <Smartphone className="h-5 w-5 text-gray-400" />
                      <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                    </div>
                    <input
                      type="tel"
                      placeholder="+250788123456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Management Settings */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Registration Settings</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Auto-Approval Settings</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="text-teal-600 focus:ring-teal-500" />
                        <span className="text-gray-700">Auto-approve student registrations</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="text-teal-600 focus:ring-teal-500" />
                        <span className="text-gray-700">Auto-approve individual employer registrations</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="text-teal-600 focus:ring-teal-500" />
                        <span className="text-gray-700">Require manual review for business registrations</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Account Limits</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Max Jobs per Employer
                        </label>
                        <input
                          type="number"
                          value="50"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Max Applications per Student
                        </label>
                        <input
                          type="number"
                          value="20"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Account Inactivity (days)
                        </label>
                        <input
                          type="number"
                          value="90"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Password & Security</h3>
                
                {/* Change Password */}
                <div className="p-4 bg-gray-50 rounded-lg mb-6">
                  <h4 className="font-medium text-gray-900 mb-4">Change Password</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={handlePasswordChange}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Security Features */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Security Features</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                        <div className="text-sm text-gray-600">Require 2FA for admin accounts</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Enabled
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Session Timeout</div>
                        <div className="text-sm text-gray-600">Auto-logout after inactivity</div>
                      </div>
                      <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">IP Whitelist</div>
                        <div className="text-sm text-gray-600">Restrict admin access to specific IPs</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;