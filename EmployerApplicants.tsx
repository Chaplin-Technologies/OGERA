import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Star, 
  GraduationCap, 
  MapPin, 
  Calendar,
  Eye,
  MessageCircle,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  FileText,
  Download,
  Phone,
  Mail
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Employer } from '../../types';
import { mockApplications, mockJobs } from '../../data/mockData';

const EmployerApplicants: React.FC = () => {
  const { user } = useAuth();
  const employer = user as Employer;
  const [selectedJob, setSelectedJob] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);

  // Mock applicants data
  const mockApplicants = [
    {
      id: '1',
      studentId: '1',
      jobId: '1',
      name: 'Alice Johnson',
      email: 'alice@student.edu',
      phone: '+250788123456',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      university: 'University of Technology',
      academicLevel: 'undergraduate',
      gpa: 3.8,
      skills: ['React', 'JavaScript', 'TypeScript', 'CSS'],
      status: 'pending',
      appliedAt: '2024-01-25T10:30:00Z',
      coverLetter: 'I am very excited about this opportunity to work as a Frontend Developer. My experience with React and modern web technologies makes me a perfect fit for this role.',
      completedJobs: 8,
      averageRating: 4.6,
      totalEarnings: 2450,
      applicationMethod: 'tailored'
    },
    {
      id: '2',
      studentId: '2',
      jobId: '1',
      name: 'Michael Chen',
      email: 'michael@college.edu',
      phone: '+250788654321',
      avatar: null,
      university: 'Business College',
      academicLevel: 'graduate',
      gpa: 3.6,
      skills: ['Python', 'Data Analysis', 'Excel', 'SQL'],
      status: 'shortlisted',
      appliedAt: '2024-01-24T14:20:00Z',
      coverLetter: null,
      completedJobs: 5,
      averageRating: 4.4,
      totalEarnings: 1800,
      applicationMethod: 'one-click'
    },
    {
      id: '3',
      studentId: '3',
      jobId: '2',
      name: 'Sarah Williams',
      email: 'sarah@university.edu',
      phone: '+250788987654',
      avatar: null,
      university: 'State University',
      academicLevel: 'undergraduate',
      gpa: 3.9,
      skills: ['Writing', 'Content Creation', 'SEO', 'Social Media'],
      status: 'interviewed',
      appliedAt: '2024-01-23T16:45:00Z',
      coverLetter: 'As a communications major with a passion for digital marketing, I believe I can bring fresh perspectives to your content creation needs.',
      completedJobs: 12,
      averageRating: 4.8,
      totalEarnings: 3200,
      applicationMethod: 'tailored'
    }
  ];

  const myJobs = mockJobs.filter(job => job.employerId === employer.id);
  
  const filteredApplicants = mockApplicants.filter(applicant => {
    const matchesJob = selectedJob === 'all' || applicant.jobId === selectedJob;
    const matchesStatus = filterStatus === 'all' || applicant.status === filterStatus;
    const matchesSearch = !searchTerm || 
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.university.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesJob && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted':
        return 'bg-blue-100 text-blue-800';
      case 'interviewed':
        return 'bg-purple-100 text-purple-800';
      case 'hired':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'shortlisted':
        return <Star className="h-4 w-4 text-blue-500" />;
      case 'interviewed':
        return <MessageCircle className="h-4 w-4 text-purple-500" />;
      case 'hired':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleStatusChange = (applicantId: string, newStatus: string) => {
    console.log(`Changing status of applicant ${applicantId} to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Job Applicants 👥</h1>
            <p className="text-blue-100">
              Review and manage applications for your job postings
            </p>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
              alt="Applicants"
              className="w-24 h-24 rounded-full border-4 border-white/20"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Position</label>
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Jobs</option>
              {myJobs.map(job => (
                <option key={job.id} value={job.id}>{job.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interviewed">Interviewed</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or university..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Applicants List */}
      <div className="space-y-4">
        {filteredApplicants.length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applicants found</h3>
            <p className="text-gray-600">
              No applicants match your current filters. Try adjusting your search criteria.
            </p>
          </div>
        ) : (
          filteredApplicants.map((applicant) => {
            const job = myJobs.find(j => j.id === applicant.jobId);
            return (
              <div key={applicant.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {applicant.avatar ? (
                        <img 
                          src={applicant.avatar} 
                          alt={applicant.name}
                          className="w-16 h-16 rounded-full"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {applicant.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{applicant.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(applicant.status)}`}>
                          {applicant.status}
                        </span>
                        {applicant.applicationMethod === 'tailored' && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            Custom Application
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          <span>{applicant.university}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-500" />
                          <span>GPA: {applicant.gpa}</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1 text-green-500" />
                          <span>{applicant.completedJobs} jobs</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-purple-500" />
                          <span>{applicant.averageRating} rating</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Applied for: {job?.title}</span>
                        <span>•</span>
                        <span>{new Date(applicant.appliedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setSelectedApplicant(selectedApplicant === applicant.id ? null : applicant.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {applicant.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cover Letter Preview */}
                {applicant.coverLetter && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Cover Letter</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{applicant.coverLetter}</p>
                  </div>
                )}

                {/* Expanded Details */}
                {selectedApplicant === applicant.id && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{applicant.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{applicant.phone}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Performance Stats</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Total Earnings:</span>
                            <span className="font-medium">${applicant.totalEarnings}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Average Rating:</span>
                            <span className="font-medium">{applicant.averageRating}/5.0</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Academic Level:</span>
                            <span className="font-medium capitalize">{applicant.academicLevel}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {applicant.coverLetter && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Full Cover Letter</h4>
                        <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border">
                          {applicant.coverLetter}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(applicant.status)}
                    <span className="text-sm text-gray-600">
                      Status: <span className="font-medium">{applicant.status}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {applicant.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleStatusChange(applicant.id, 'shortlisted')}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Shortlist
                        </button>
                        <button 
                          onClick={() => handleStatusChange(applicant.id, 'rejected')}
                          className="px-3 py-1 border border-red-600 text-red-600 text-sm rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    
                    {applicant.status === 'shortlisted' && (
                      <>
                        <button 
                          onClick={() => handleStatusChange(applicant.id, 'interviewed')}
                          className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Interview
                        </button>
                        <button 
                          onClick={() => handleStatusChange(applicant.id, 'hired')}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Hire
                        </button>
                      </>
                    )}
                    
                    {applicant.status === 'interviewed' && (
                      <button 
                        onClick={() => handleStatusChange(applicant.id, 'hired')}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Hire
                      </button>
                    )}
                    
                    <button className="px-3 py-1 border border-blue-600 text-blue-600 text-sm rounded-lg hover:bg-blue-50 transition-colors">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EmployerApplicants;