import React from 'react';
import { 
  Briefcase, 
  Users, 
  Eye, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  DollarSign,
  Plus,
  Star,
  Flag,
  FileText,
  MessageCircle,
  Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Employer } from '../../types';
import { mockJobs, mockApplications, mockEmployerAnalytics, mockTalentFlags, mockAcademicBulletinRequests } from '../../data/mockData';

const EmployerDashboard: React.FC = () => {
  const { user } = useAuth();
  const employer = user as Employer;

  const myJobs = mockJobs.filter(job => job.employerId === employer.id);
  const totalApplications = myJobs.reduce((sum, job) => sum + job.applicants, 0);
  const activeJobs = myJobs.filter(job => job.status === 'active').length;
  const pendingApplications = mockApplications.filter(app => 
    myJobs.some(job => job.id === app.jobId) && app.status === 'pending'
  ).length;

  const stats = [
    {
      label: 'Active Jobs',
      value: activeJobs.toString(),
      icon: Briefcase,
      color: 'from-blue-500 to-teal-500',
      change: '+2 this month',
      subtext: `${myJobs.filter(job => job.status === 'filled').length} filled positions`
    },
    {
      label: 'Total Applications',
      value: totalApplications.toString(),
      icon: Users,
      color: 'from-purple-500 to-blue-500',
      change: '+15 this week',
      subtext: `${pendingApplications} pending review`
    },
    {
      label: 'Hiring Success Rate',
      value: `${mockEmployerAnalytics.hiringSuccessRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      change: '+2.1%',
      subtext: 'Above industry average'
    },
    {
      label: 'Total Spent',
      value: `$${mockEmployerAnalytics.totalSpent.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-yellow-500 to-orange-500',
      change: '+12%',
      subtext: `$${mockEmployerAnalytics.averageCostPerHire} avg per hire`
    }
  ];

  const recentApplications = mockApplications
    .filter(app => myJobs.some(job => job.id === app.jobId))
    .slice(0, 5);

  const flaggedTalents = mockTalentFlags.filter(flag => flag.employerId === employer.id);
  const bulletinRequests = mockAcademicBulletinRequests.filter(req => req.employerId === employer.id);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {employer.name}! 👋</h1>
            <p className="text-blue-100 mb-4">
              You have {pendingApplications} new applications and {flaggedTalents.length} flagged talents
            </p>
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                <CheckCircle className="h-4 w-4 mr-2" />
                Verified Employer
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                <Star className="h-4 w-4 mr-2" />
                {employer.averageRating.toFixed(1)} Rating
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
              alt="Business Success"
              className="w-24 h-24 rounded-full border-4 border-white/20"
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
              <Plus className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Post New Job</h3>
              <p className="text-sm text-gray-600">Create opportunity</p>
            </div>
          </div>
        </button>
        
        <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Review Applicants</h3>
              <p className="text-sm text-gray-600">{pendingApplications} pending</p>
            </div>
          </div>
        </button>
        
        <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
              <Flag className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Talent Booking</h3>
              <p className="text-sm text-gray-600">{flaggedTalents.length} flagged</p>
            </div>
          </div>
        </button>
        
        <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Analytics</h3>
              <p className="text-sm text-gray-600">View insights</p>
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
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-gray-500 text-xs">{stat.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Jobs */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Active Job Listings</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {myJobs.filter(job => job.status === 'active').slice(0, 3).map((job) => (
              <div key={job.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{job.title}</h3>
                  <span className="text-green-600 font-bold text-sm">
                    ${job.payRate}/{job.payType}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{job.applicants} applicants</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{job.viewCount} views</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    job.escrowStatus === 'held' ? 'bg-blue-100 text-blue-800' :
                    job.escrowStatus === 'released' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {job.escrowStatus || 'No escrow'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentApplications.map((application) => {
              const job = mockJobs.find(j => j.id === application.jobId);
              if (!job) return null;

              return (
                <div key={application.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      A
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">Application for {job.title}</h3>
                    <p className="text-gray-600 text-xs">
                      Applied {new Date(application.appliedAt).toLocaleDateString()}
                      {application.applicationMethod === 'tailored' && (
                        <span className="ml-2 px-1 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                          Custom
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      application.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : application.status === 'shortlisted'
                        ? 'bg-green-100 text-green-800'
                        : application.status === 'hired'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {application.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Talent Booking & Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flagged Talents */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Flagged Talents</h2>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              Manage Booking
            </button>
          </div>
          <div className="space-y-4">
            {flaggedTalents.length === 0 ? (
              <div className="text-center py-8">
                <Flag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-sm">No flagged talents yet</p>
                <p className="text-gray-500 text-xs">Flag exceptional performers for future opportunities</p>
              </div>
            ) : (
              flaggedTalents.map((flag) => (
                <div key={flag.id} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Alice Johnson</h3>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      {flag.flagReason.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{flag.notes}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Flagged {new Date(flag.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">
                        Request Bulletin
                      </button>
                      <button className="px-3 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700">
                        Future Contract
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Academic Bulletin Requests */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Academic Bulletins</h2>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {bulletinRequests.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-sm">No bulletin requests</p>
                <p className="text-gray-500 text-xs">Request academic bulletins for talent verification</p>
              </div>
            ) : (
              bulletinRequests.map((request) => (
                <div key={request.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Alice Johnson</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.status === 'authorized' ? 'bg-green-100 text-green-800' :
                      request.status === 'pending-admin-review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {request.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{request.requestReason}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Requested {new Date(request.requestedAt).toLocaleDateString()}
                    </span>
                    {request.status === 'authorized' && (
                      <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700">
                        View Bulletin
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {mockEmployerAnalytics.averageTimeToHire} days
            </div>
            <p className="text-sm text-gray-600">Average time to hire</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {mockEmployerAnalytics.candidateQualityScore.toFixed(1)}/5
            </div>
            <p className="text-sm text-gray-600">Candidate quality score</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {mockEmployerAnalytics.talentRetentionRate.toFixed(1)}%
            </div>
            <p className="text-sm text-gray-600">Talent retention rate</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">
              ${mockEmployerAnalytics.averageCostPerHire}
            </div>
            <p className="text-sm text-gray-600">Average cost per hire</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;