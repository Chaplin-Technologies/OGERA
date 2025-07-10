import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Users, 
  Briefcase,
  DollarSign,
  TrendingUp,
  BarChart3,
  Filter,
  Search,
  Plus,
  Eye,
  RefreshCw
} from 'lucide-react';
import { mockAdminReports } from '../../data/mockData';

const AdminReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('generated');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [reportType, setReportType] = useState('user');
  const [dateRange, setDateRange] = useState('last-30-days');

  const reportTypes = [
    { id: 'user', label: 'User Reports', icon: Users, description: 'User registrations, activity, and engagement' },
    { id: 'engagement', label: 'Engagement Reports', icon: TrendingUp, description: 'Platform usage and interaction metrics' },
    { id: 'job', label: 'Job Reports', icon: Briefcase, description: 'Job postings, applications, and hiring metrics' },
    { id: 'financial', label: 'Financial Reports', icon: DollarSign, description: 'Revenue, transactions, and financial health' },
    { id: 'academic', label: 'Academic Reports', icon: FileText, description: 'Student performance and verification data' },
    { id: 'system', label: 'System Reports', icon: BarChart3, description: 'Platform performance and technical metrics' }
  ];

  const getReportIcon = (type: string) => {
    const reportType = reportTypes.find(t => t.id === type);
    if (reportType) {
      const Icon = reportType.icon;
      return <Icon className="h-5 w-5" />;
    }
    return <FileText className="h-5 w-5" />;
  };

  const getReportColor = (type: string) => {
    switch (type) {
      case 'user':
        return 'from-blue-500 to-teal-500';
      case 'engagement':
        return 'from-green-500 to-emerald-500';
      case 'job':
        return 'from-purple-500 to-blue-500';
      case 'financial':
        return 'from-yellow-500 to-orange-500';
      case 'academic':
        return 'from-pink-500 to-rose-500';
      case 'system':
        return 'from-indigo-500 to-purple-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const generateReport = () => {
    console.log(`Generating ${reportType} report for ${dateRange}`);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate comprehensive reports and analyze platform data</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh Data</span>
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500">
              <Users className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-blue-600">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">1,247</h3>
          <p className="text-gray-600 text-sm">Total Users</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-purple-600">+8%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">156</h3>
          <p className="text-gray-600 text-sm">Active Jobs</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-green-600">+23%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">$45.6K</h3>
          <p className="text-gray-600 text-sm">Monthly Revenue</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-yellow-600">+15%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">94.2%</h3>
          <p className="text-gray-600 text-sm">Platform Uptime</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'generated', label: 'Generated Reports', count: mockAdminReports.length },
            { id: 'scheduled', label: 'Scheduled Reports', count: 3 },
            { id: 'templates', label: 'Report Templates', count: reportTypes.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
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
                placeholder="Search reports..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Types</option>
              {reportTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center space-x-2 transition-colors">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Date Range</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="divide-y divide-gray-200">
          {activeTab === 'generated' && mockAdminReports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${getReportColor(report.type)}`}>
                    {getReportIcon(report.type)}
                    <span className="text-white"></span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{report.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{report.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {new Date(report.dateRange.start).toLocaleDateString()} - {new Date(report.dateRange.end).toLocaleDateString()}
                        </span>
                      </div>
                      <span>Generated by {report.generatedBy}</span>
                      <span>{new Date(report.generatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Report Preview */}
              {report.data && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Report Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(report.data).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-gray-900">
                          {typeof value === 'object' ? JSON.stringify(value) : value.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {activeTab === 'templates' && reportTypes.map((template) => {
            const Icon = template.icon;
            return (
              <div key={template.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${getReportColor(template.id)}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{template.label}</h3>
                      <p className="text-gray-600 text-sm">{template.description}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setReportType(template.id);
                      setShowCreateModal(true);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                  >
                    Generate
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Report Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-6">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${getReportColor(reportType)}`}>
                {getReportIcon(reportType)}
                <span className="text-white"></span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Generate Report</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Type
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {reportTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="last-7-days">Last 7 days</option>
                  <option value="last-30-days">Last 30 days</option>
                  <option value="last-90-days">Last 90 days</option>
                  <option value="last-year">Last year</option>
                  <option value="custom">Custom range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    PDF
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    CSV
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    Excel
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={generateReport}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;