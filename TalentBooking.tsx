import React, { useState } from 'react';
import { 
  Flag, 
  Star, 
  FileText, 
  Calendar, 
  User, 
  Award,
  MessageCircle,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Download,
  Send
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Employer } from '../../types';
import { mockTalentFlags, mockAcademicBulletinRequests, mockFutureContractProposals } from '../../data/mockData';

const TalentBooking: React.FC = () => {
  const { user } = useAuth();
  const employer = user as Employer;
  const [activeTab, setActiveTab] = useState('flagged');
  const [showContractModal, setShowContractModal] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState<string | null>(null);

  const flaggedTalents = mockTalentFlags.filter(flag => flag.employerId === employer.id);
  const bulletinRequests = mockAcademicBulletinRequests.filter(req => req.employerId === employer.id);
  const contractProposals = mockFutureContractProposals.filter(prop => prop.employerId === employer.id);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'authorized':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending-admin-review':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'authorized':
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'pending-admin-review':
      case 'sent':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getFlagReasonColor = (reason: string) => {
    switch (reason) {
      case 'exceptional-performance':
        return 'bg-purple-100 text-purple-800';
      case 'future-hire-interest':
        return 'bg-blue-100 text-blue-800';
      case 'preferred-talent':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Talent Booking 🎯</h1>
            <p className="text-purple-100 mb-4">
              Manage flagged talents, request academic bulletins, and secure future contracts
            </p>
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                <Flag className="h-4 w-4 mr-2" />
                {flaggedTalents.length} Flagged Talents
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                <FileText className="h-4 w-4 mr-2" />
                {bulletinRequests.length} Bulletin Requests
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
              alt="Talent Management"
              className="w-24 h-24 rounded-full border-4 border-white/20"
            />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'flagged', label: 'Flagged Talents', count: flaggedTalents.length },
            { id: 'bulletins', label: 'Academic Bulletins', count: bulletinRequests.length },
            { id: 'contracts', label: 'Future Contracts', count: contractProposals.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Flagged Talents Tab */}
          {activeTab === 'flagged' && (
            <div className="space-y-4">
              {flaggedTalents.length === 0 ? (
                <div className="text-center py-12">
                  <Flag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No flagged talents yet</h3>
                  <p className="text-gray-600 mb-6">
                    Flag exceptional performers from completed projects to build your talent pipeline
                  </p>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors">
                    Browse Completed Projects
                  </button>
                </div>
              ) : (
                flaggedTalents.map((flag) => (
                  <div key={flag.id} className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          A
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Alice Johnson</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFlagReasonColor(flag.flagReason)}`}>
                              {flag.flagReason.replace('-', ' ')}
                            </span>
                            <div className="flex items-center text-sm text-gray-600">
                              <Star className="h-4 w-4 mr-1 text-yellow-500" />
                              <span>4.8 Rating</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Flagged</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(flag.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                      <p className="text-gray-700 text-sm bg-white/50 p-3 rounded-lg">
                        {flag.notes}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-white/50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-purple-600">8</div>
                        <div className="text-sm text-gray-600">Projects Completed</div>
                      </div>
                      <div className="bg-white/50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">$2,450</div>
                        <div className="text-sm text-gray-600">Total Earned</div>
                      </div>
                      <div className="bg-white/50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-green-600">3.8</div>
                        <div className="text-sm text-gray-600">Academic GPA</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-600">Computer Science Student</span>
                      </div>
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                          <FileText className="h-4 w-4" />
                          <span>Request Bulletin</span>
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedTalent(flag.studentId);
                            setShowContractModal(true);
                          }}
                          className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                        >
                          <Calendar className="h-4 w-4" />
                          <span>Future Contract</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Academic Bulletins Tab */}
          {activeTab === 'bulletins' && (
            <div className="space-y-4">
              {bulletinRequests.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No bulletin requests</h3>
                  <p className="text-gray-600 mb-6">
                    Request academic bulletins to verify student performance and academic standing
                  </p>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:from-blue-700 hover:to-teal-700 transition-colors">
                    Request First Bulletin
                  </button>
                </div>
              ) : (
                bulletinRequests.map((request) => (
                  <div key={request.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                          A
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Alice Johnson</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            {getStatusIcon(request.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              {request.status.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Requested</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(request.requestedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Request Reason</h4>
                      <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
                        {request.requestReason}
                      </p>
                    </div>

                    {request.adminNotes && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Admin Notes</h4>
                        <p className="text-gray-700 text-sm bg-green-50 p-3 rounded-lg border border-green-200">
                          {request.adminNotes}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        {request.reviewedAt && (
                          <span>Reviewed: {new Date(request.reviewedAt).toLocaleDateString()}</span>
                        )}
                        {request.reviewedBy && (
                          <span>By: Admin</span>
                        )}
                      </div>
                      <div className="flex space-x-3">
                        {request.status === 'authorized' && (
                          <>
                            <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                              <Eye className="h-4 w-4" />
                              <span>View Bulletin</span>
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                              <Download className="h-4 w-4" />
                              <span>Download</span>
                            </button>
                          </>
                        )}
                        {request.status === 'pending-admin-review' && (
                          <span className="px-4 py-2 bg-yellow-100 text-yellow-800 text-sm rounded-lg">
                            Awaiting Admin Review
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Future Contracts Tab */}
          {activeTab === 'contracts' && (
            <div className="space-y-4">
              {contractProposals.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No contract proposals</h3>
                  <p className="text-gray-600 mb-6">
                    Secure future talent by proposing contracts for exceptional performers
                  </p>
                  <button 
                    onClick={() => setShowContractModal(true)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
                  >
                    Create First Proposal
                  </button>
                </div>
              ) : (
                contractProposals.map((proposal) => (
                  <div key={proposal.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          A
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Alice Johnson</h3>
                          <p className="text-purple-600 font-medium">{proposal.proposedRole}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                              {proposal.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Start Date</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(proposal.proposedStartDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Role Details</h4>
                      <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
                        {proposal.roleDetails}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Terms & Benefits</h4>
                      <p className="text-gray-700 text-sm bg-blue-50 p-3 rounded-lg border border-blue-200">
                        {proposal.terms}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Created: {new Date(proposal.createdAt).toLocaleDateString()}</span>
                        {proposal.respondedAt && (
                          <span>Responded: {new Date(proposal.respondedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                      <div className="flex space-x-3">
                        {proposal.status === 'draft' && (
                          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                            <Send className="h-4 w-4" />
                            <span>Send Proposal</span>
                          </button>
                        )}
                        {proposal.status === 'sent' && (
                          <span className="px-4 py-2 bg-yellow-100 text-yellow-800 text-sm rounded-lg">
                            Awaiting Response
                          </span>
                        )}
                        {proposal.status === 'accepted' && (
                          <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                            View Contract
                          </button>
                        )}
                        <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                          <MessageCircle className="h-4 w-4" />
                          <span>Message</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Future Contract Modal */}
      {showContractModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Create Future Contract Proposal</h2>
              <button
                onClick={() => setShowContractModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proposed Role
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g. Junior Frontend Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role Details
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe the role, responsibilities, and growth opportunities..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proposed Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Terms & Benefits
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Salary, benefits, work arrangements, professional development..."
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowContractModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
                >
                  Send Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TalentBooking;