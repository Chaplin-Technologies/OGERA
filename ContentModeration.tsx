import React, { useState } from 'react';
import { 
  Flag, 
  Eye, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Search,
  Filter,
  Clock,
  User,
  Briefcase,
  MessageCircle,
  Star,
  MoreHorizontal,
  Shield
} from 'lucide-react';
import { mockContentFlags, mockJobs } from '../../data/mockData';

const ContentModeration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('flagged');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'remove' | 'warn' | null>(null);

  const flaggedJobs = mockJobs.filter(job => job.status === 'flagged' || job.moderationStatus === 'flagged');
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'reviewed':
        return <Eye className="h-4 w-4 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'dismissed':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'dismissed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const getSeverityColor = (reason: string) => {
    switch (reason) {
      case 'fraud':
        return 'bg-red-100 text-red-800';
      case 'spam':
        return 'bg-orange-100 text-orange-800';
      case 'inappropriate':
        return 'bg-yellow-100 text-yellow-800';
      case 'harassment':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleContentAction = (contentId: string, action: 'approve' | 'remove' | 'warn') => {
    setSelectedContent(contentId);
    setActionType(action);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    console.log(`${actionType} content ${selectedContent}`);
    setShowActionModal(false);
    setSelectedContent(null);
    setActionType(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Moderation</h1>
          <p className="text-gray-600 mt-1">Review flagged content and manage platform safety</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <span className="text-sm text-gray-600">
            {mockContentFlags.filter(f => f.status === 'pending').length} pending reviews
          </span>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
            Priority Queue
          </button>
        </div>
      </div>

      {/* Moderation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-500">
              <Flag className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-red-600">High Priority</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {mockContentFlags.filter(f => f.reason === 'fraud').length}
          </h3>
          <p className="text-gray-600 text-sm">Fraud Reports</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-yellow-600">Pending</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {mockContentFlags.filter(f => f.status === 'pending').length}
          </h3>
          <p className="text-gray-600 text-sm">Awaiting Review</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-green-600">Resolved</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {mockContentFlags.filter(f => f.status === 'resolved').length}
          </h3>
          <p className="text-gray-600 text-sm">This Week</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-blue-600">Auto-Blocked</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">47</h3>
          <p className="text-gray-600 text-sm">AI Detections</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'flagged', label: 'Flagged Content', count: mockContentFlags.length },
            { id: 'jobs', label: 'Job Listings', count: flaggedJobs.length },
            { id: 'ai-detected', label: 'AI Detected', count: 47 },
            { id: 'resolved', label: 'Resolved', count: mockContentFlags.filter(f => f.status === 'resolved').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
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
                placeholder="Search flagged content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
              <option value="">All Reasons</option>
              <option value="fraud">Fraud</option>
              <option value="spam">Spam</option>
              <option value="inappropriate">Inappropriate</option>
              <option value="harassment">Harassment</option>
            </select>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center space-x-2 transition-colors">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">More Filters</span>
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="divide-y divide-gray-200">
          {activeTab === 'flagged' && mockContentFlags.map((flag) => (
            <div key={flag.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(flag.reason)}`}>
                      {flag.reason}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(flag.status)}`}>
                      {flag.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {flag.contentType} • Flagged {new Date(flag.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="font-medium text-gray-900 mb-2">
                    {flag.contentType === 'job' ? 'Job Posting Flagged' : 'Content Flagged'}
                  </h3>
                  
                  <p className="text-gray-700 text-sm mb-3">{flag.description}</p>
                  
                  {flag.resolution && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                      <h4 className="font-medium text-green-800 text-sm mb-1">Resolution</h4>
                      <p className="text-green-700 text-sm">{flag.resolution}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>Flagged by User #{flag.flaggedBy}</span>
                    </div>
                    {flag.reviewedBy && (
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-1" />
                        <span>Reviewed by {flag.reviewedBy}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  
                  {flag.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleContentAction(flag.id, 'approve')}
                        className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleContentAction(flag.id, 'remove')}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {activeTab === 'jobs' && flaggedJobs.map((job) => (
            <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      Flagged Job
                    </span>
                    <span className="text-xs text-gray-500">
                      Posted {new Date(job.postedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="font-medium text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{job.company}</p>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-2">{job.description}</p>
                  
                  {job.moderationNotes && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                      <h4 className="font-medium text-yellow-800 text-sm mb-1">Moderation Notes</h4>
                      <p className="text-yellow-700 text-sm">{job.moderationNotes}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span>${job.payRate}/{job.payType}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{job.applicants} applicants</span>
                    </div>
                    {job.flaggedReasons && (
                      <div className="flex items-center">
                        <Flag className="h-4 w-4 mr-1" />
                        <span>{job.flaggedReasons.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleContentAction(job.id, 'approve')}
                    className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleContentAction(job.id, 'remove')}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
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
              {actionType === 'approve' && <CheckCircle className="h-6 w-6 text-green-600" />}
              {actionType === 'remove' && <XCircle className="h-6 w-6 text-red-600" />}
              {actionType === 'warn' && <AlertTriangle className="h-6 w-6 text-yellow-600" />}
              <h2 className="text-lg font-semibold text-gray-900">
                Confirm {actionType?.charAt(0).toUpperCase() + actionType?.slice(1)} Content
              </h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to {actionType} this content? This action will be logged and may affect the content's visibility.
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
                  actionType === 'remove' ? 'bg-red-600 hover:bg-red-700' :
                  'bg-yellow-600 hover:bg-yellow-700'
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

export default ContentModeration;