import React, { useState } from 'react';
import { 
  Briefcase, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Star,
  MessageCircle,
  Filter,
  Search,
  Calendar,
  MapPin,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Student } from '../../types';
import { mockApplications, mockJobs } from '../../data/mockData';

const ApplicationTracking: React.FC = () => {
  const { user } = useAuth();
  const student = user as Student;
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'hired':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'shortlisted':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'interviewed':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'viewed':
        return <Eye className="h-5 w-5 text-purple-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hired':
        return 'bg-green-100 text-green-800';
      case 'shortlisted':
        return 'bg-yellow-100 text-yellow-800';
      case 'interviewed':
        return 'bg-blue-100 text-blue-800';
      case 'viewed':
        return 'bg-purple-100 text-purple-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'pending':
        return 20;
      case 'viewed':
        return 40;
      case 'shortlisted':
        return 60;
      case 'interviewed':
        return 80;
      case 'hired':
        return 100;
      case 'rejected':
        return 0;
      default:
        return 20;
    }
  };

  const filteredApplications = mockApplications
    .filter(app => app.studentId === student.id)
    .filter(app => {
      const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
      const job = mockJobs.find(j => j.id === app.jobId);
      const matchesSearch = !searchTerm || 
        job?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job?.company.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });

  const statusCounts = {
    all: mockApplications.filter(app => app.studentId === student.id).length,
    pending: mockApplications.filter(app => app.studentId === student.id && app.status === 'pending').length,
    shortlisted: mockApplications.filter(app => app.studentId === student.id && app.status === 'shortlisted').length,
    interviewed: mockApplications.filter(app => app.studentId === student.id && app.status === 'interviewed').length,
    hired: mockApplications.filter(app => app.studentId === student.id && app.status === 'hired').length,
    rejected: mockApplications.filter(app => app.studentId === student.id && app.status === 'rejected').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">My Applications 📋</h1>
            <p className="text-blue-100 mb-4">
              Track the status of your job applications and manage your opportunities
            </p>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
              <Briefcase className="h-4 w-4 mr-2" />
              {statusCounts.all} Total Applications
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
              alt="Job Applications"
              className="w-24 h-24 rounded-full border-4 border-white/20"
            />
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {[
          { key: 'all', label: 'All', color: 'from-gray-500 to-gray-600' },
          { key: 'pending', label: 'Pending', color: 'from-yellow-500 to-orange-500' },
          { key: 'shortlisted', label: 'Shortlisted', color: 'from-green-500 to-emerald-500' },
          { key: 'interviewed', label: 'Interviewed', color: 'from-blue-500 to-teal-500' },
          { key: 'hired', label: 'Hired', color: 'from-purple-500 to-blue-500' },
          { key: 'rejected', label: 'Rejected', color: 'from-red-500 to-pink-500' }
        ].map((status) => (
          <button
            key={status.key}
            onClick={() => setFilterStatus(status.key)}
            className={`bg-white rounded-xl p-4 shadow-sm border transition-all ${
              filterStatus === status.key 
                ? 'border-purple-300 ring-2 ring-purple-100' 
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
              placeholder="Search applications by job title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center space-x-2 transition-colors">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">More Filters</span>
          </button>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600 mb-4">
              {filterStatus === 'all' 
                ? "You haven't applied to any jobs yet." 
                : `No applications with status "${filterStatus}".`}
            </p>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors">
              Browse Jobs
            </button>
          </div>
        ) : (
          filteredApplications.map((application) => {
            const job = mockJobs.find(j => j.id === application.jobId);
            if (!job) return null;

            return (
              <div key={application.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                      {application.applicationMethod === 'tailored' && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          Custom Application
                        </span>
                      )}
                    </div>
                    <p className="text-purple-600 font-medium mb-2">{job.company}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                        <span>${job.payRate}/{job.payType}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{job.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-red-500" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-purple-500" />
                        <span>Applied {new Date(application.appliedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    {getStatusIcon(application.status)}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Application Progress</span>
                    <span>{getStatusProgress(application.status)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        application.status === 'rejected' 
                          ? 'bg-red-500' 
                          : application.status === 'hired'
                          ? 'bg-green-500'
                          : 'bg-gradient-to-r from-purple-500 to-blue-500'
                      }`}
                      style={{ width: `${getStatusProgress(application.status)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Cover Letter Preview */}
                {application.coverLetter && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Cover Letter</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{application.coverLetter}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                    {application.status === 'shortlisted' && (
                      <span className="text-green-600 font-medium">🎉 You're shortlisted!</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="px-3 py-1 text-purple-600 hover:text-purple-700 font-medium text-sm border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                      View Job
                    </button>
                    {application.status === 'shortlisted' && (
                      <button className="px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium text-sm rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors">
                        Message Employer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Application Tips */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Star className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Tailor Your Application</h3>
            <p className="text-sm text-gray-600">
              Custom cover letters get 3x more responses than one-click applications
            </p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Apply Early</h3>
            <p className="text-sm text-gray-600">
              Applications submitted within 24 hours have higher success rates
            </p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Follow Up</h3>
            <p className="text-sm text-gray-600">
              Send a polite follow-up message if you haven't heard back in a week
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationTracking;