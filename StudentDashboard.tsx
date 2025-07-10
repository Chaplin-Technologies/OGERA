import React from 'react';
import { 
  TrendingUp, 
  Briefcase, 
  DollarSign, 
  Star, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Trophy
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Student } from '../../types';
import { mockJobs, mockApplications } from '../../data/mockData';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const student = user as Student;

  const appliedJobs = mockApplications.filter(app => app.studentId === student.id).length;
  const shortlistedApps = mockApplications.filter(app => app.studentId === student.id && app.status === 'shortlisted').length;

  const stats = [
    {
      label: 'Total Earnings',
      value: `$${student.totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      change: '+12%'
    },
    {
      label: 'Completed Jobs',
      value: student.completedJobs.toString(),
      icon: CheckCircle,
      color: 'from-blue-500 to-teal-500',
      change: '+3'
    },
    {
      label: 'Applications',
      value: appliedJobs.toString(),
      icon: Briefcase,
      color: 'from-purple-500 to-blue-500',
      change: '+2'
    },
    {
      label: 'Current GPA',
      value: student.currentGPA?.toFixed(1) || 'N/A',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      change: student.currentGPA && student.currentGPA >= 3.5 ? 'Excellent' : 'Good'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {student.name}! 👋</h1>
            <p className="text-purple-100 mb-4">
              You have {shortlistedApps} shortlisted applications waiting for you
            </p>
            {student.premiumAccess && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                <Trophy className="h-4 w-4 mr-2" />
                Premium Member
              </div>
            )}
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
              alt="Student Success"
              className="w-24 h-24 rounded-full border-4 border-white/20"
            />
          </div>
        </div>
      </div>

      {/* Account Status */}
      {student.accountLocked && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-800">Account Locked</h3>
            <p className="text-red-700 text-sm mt-1">
              Your account is locked due to low academic performance. Please upload your latest report card to unlock premium features.
            </p>
          </div>
        </div>
      )}

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
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity & Job Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {mockApplications
              .filter(app => app.studentId === student.id)
              .slice(0, 3)
              .map((application) => {
                const job = mockJobs.find(j => j.id === application.jobId);
                if (!job) return null;

                return (
                  <div key={application.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{job.title}</h3>
                      <p className="text-gray-600 text-xs">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        application.status === 'shortlisted' 
                          ? 'bg-green-100 text-green-800'
                          : application.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {application.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(application.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Job Recommendations */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recommended Jobs</h2>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {mockJobs.slice(0, 3).map((job) => (
              <div key={job.id} className="p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-sm">{job.title}</h3>
                  <span className="text-green-600 font-bold text-sm">
                    ${job.payRate}/{job.payType}
                  </span>
                </div>
                <p className="text-gray-600 text-xs mb-2">{job.company}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {job.duration}
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 text-xs font-medium">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills & Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills & Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Your Skills</h3>
            <div className="flex flex-wrap gap-2">
              {student.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Academic Performance</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Current GPA</span>
                <span className="font-semibold">{student.currentGPA?.toFixed(1) || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Academic Level</span>
                <span className="font-semibold capitalize">{student.academicLevel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Account Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  student.accountLocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {student.accountLocked ? 'Locked' : 'Active'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;