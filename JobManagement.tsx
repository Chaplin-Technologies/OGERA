import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Pause, 
  Play, 
  Trash2, 
  Eye, 
  Users, 
  DollarSign,
  Clock,
  MapPin,
  Filter,
  Search,
  MoreHorizontal,
  Shield,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Employer } from '../../types';
import { mockJobs } from '../../data/mockData';

const JobManagement: React.FC = () => {
  const { user } = useAuth();
  const employer = user as Employer;
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const myJobs = mockJobs.filter(job => job.employerId === employer.id);

  const filteredJobs = myJobs.filter(job => {
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    const matchesSearch = !searchTerm || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'filled':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEscrowStatusIcon = (escrowStatus?: string) => {
    switch (escrowStatus) {
      case 'held':
        return <Shield className="h-4 w-4 text-blue-500" />;
      case 'released':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'refunded':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const statusCounts = {
    all: myJobs.length,
    active: myJobs.filter(job => job.status === 'active').length,
    paused: myJobs.filter(job => job.status === 'paused').length,
    filled: myJobs.filter(job => job.status === 'filled').length,
    cancelled: myJobs.filter(job => job.status === 'cancelled').length,
    expired: myJobs.filter(job => job.status === 'expired').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
          <p className="text-gray-600 mt-1">Create, manage, and track your job listings</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="mt-4 sm:mt-0 px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:from-blue-700 hover:to-teal-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Post New Job</span>
        </button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {[
          { key: 'all', label: 'All Jobs', color: 'from-gray-500 to-gray-600' },
          { key: 'active', label: 'Active', color: 'from-green-500 to-emerald-500' },
          { key: 'paused', label: 'Paused', color: 'from-yellow-500 to-orange-500' },
          { key: 'filled', label: 'Filled', color: 'from-blue-500 to-teal-500' },
          { key: 'cancelled', label: 'Cancelled', color: 'from-red-500 to-pink-500' },
          { key: 'expired', label: 'Expired', color: 'from-purple-500 to-blue-500' }
        ].map((status) => (
          <button
            key={status.key}
            onClick={() => setFilterStatus(status.key)}
            className={`bg-white rounded-xl p-4 shadow-sm border transition-all ${
              filterStatus === status.key 
                ? 'border-blue-300 ring-2 ring-blue-100' 
                : 'border-gray-100 hover:shadow-md'
            }`}
          >
            <div className={`p-2 rounded-lg bg-gradient-to-r ${status.color} w-8 h-8 mx-auto mb-2 flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">
                {statusCounts[status.key as keyof typeof statusCounts]}
              </span>
            </div>
            <p className="text-xs font-medium text-gray-900">{status.label}</p>
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center space-x-2 transition-colors">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">More Filters</span>
          </button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-4">
              {filterStatus === 'all' 
                ? "You haven't posted any jobs yet." 
                : `No jobs with status "${filterStatus}".`}
            </p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:from-blue-700 hover:to-teal-700 transition-colors"
            >
              Post Your First Job
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                    {job.isPremium && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        Premium
                      </span>
                    )}
                    {getEscrowStatusIcon(job.escrowStatus)}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                  <span>${job.payRate}/{job.payType}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  <span>{job.duration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-red-500" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2 text-purple-500" />
                  <span>{job.applicants} applicants</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Eye className="h-4 w-4 mr-2 text-orange-500" />
                  <span>{job.viewCount} views</span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">{job.viewCount}</div>
                    <div className="text-xs text-gray-600">Total Views</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{job.applicationCount}</div>
                    <div className="text-xs text-gray-600">Applications</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">
                      {job.applicationCount > 0 ? ((job.applicationCount / job.viewCount) * 100).toFixed(1) : 0}%
                    </div>
                    <div className="text-xs text-gray-600">Conversion Rate</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Posted: {new Date(job.postedAt).toLocaleDateString()}</span>
                  <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                  {job.escrowStatus && (
                    <span className="capitalize">Escrow: {job.escrowStatus}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  {job.status === 'active' && (
                    <button className="px-3 py-1 text-yellow-600 hover:text-yellow-700 font-medium text-sm border border-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors flex items-center space-x-1">
                      <Pause className="h-3 w-3" />
                      <span>Pause</span>
                    </button>
                  )}
                  {job.status === 'paused' && (
                    <button className="px-3 py-1 text-green-600 hover:text-green-700 font-medium text-sm border border-green-600 rounded-lg hover:bg-green-50 transition-colors flex items-center space-x-1">
                      <Play className="h-3 w-3" />
                      <span>Resume</span>
                    </button>
                  )}
                  <button className="px-3 py-1 text-blue-600 hover:text-blue-700 font-medium text-sm border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    View Applicants
                  </button>
                  {job.status === 'active' && (
                    <button className="px-3 py-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-medium text-sm rounded-lg hover:from-blue-700 hover:to-teal-700 transition-colors">
                      Edit Job
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Create New Job</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Frontend Developer Intern"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the role, responsibilities, and requirements..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="internship">Internship</option>
                    <option value="part-time">Part-time</option>
                    <option value="apprenticeship">Apprenticeship</option>
                    <option value="full-time">Full-time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. 3 months"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pay Rate
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pay Type
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="hourly">Hourly</option>
                    <option value="fixed">Fixed</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Model
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="escrow">Escrow</option>
                    <option value="milestone">Milestone</option>
                    <option value="upfront">Upfront</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Skills
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="React, JavaScript, HTML/CSS (comma separated)"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:from-blue-700 hover:to-teal-700 transition-colors"
                >
                  Create Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobManagement;