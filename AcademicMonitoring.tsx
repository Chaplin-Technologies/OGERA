import React, { useState } from 'react';
import { 
  GraduationCap, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lock,
  Unlock,
  Eye,
  FileText,
  Search,
  Filter,
  Star,
  Award
} from 'lucide-react';
import { mockAcademicRecords } from '../../data/mockData';

const AcademicMonitoring: React.FC = () => {
  const [activeTab, setActiveTab] = useState('flagged');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<'lock' | 'unlock' | 'approve' | 'reject' | null>(null);

  // Mock flagged students data
  const flaggedStudents = [
    {
      id: '3',
      name: 'John Doe',
      email: 'john@university.edu',
      currentGPA: 2.5,
      previousGPA: 3.2,
      academicLevel: 'undergraduate',
      accountLocked: false,
      flagReason: 'GPA below threshold',
      lastReportCard: '2024-01-25',
      totalEarnings: 450,
      completedJobs: 2,
      avatar: null
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah@college.edu',
      currentGPA: 2.8,
      previousGPA: 3.5,
      academicLevel: 'graduate',
      accountLocked: true,
      flagReason: 'Significant GPA drop',
      lastReportCard: '2024-01-20',
      totalEarnings: 1200,
      completedJobs: 5,
      avatar: null
    }
  ];

  const pendingRecords = mockAcademicRecords.filter(record => record.status === 'pending');

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return 'text-green-600';
    if (gpa >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGPATrend = (current: number, previous: number) => {
    if (current > previous) return { icon: TrendingUp, color: 'text-green-600' };
    if (current < previous) return { icon: TrendingDown, color: 'text-red-600' };
    return { icon: TrendingUp, color: 'text-gray-600' };
  };

  const handleStudentAction = (studentId: string, action: 'lock' | 'unlock' | 'approve' | 'reject') => {
    setSelectedStudent(studentId);
    setActionType(action);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    console.log(`${actionType} student ${selectedStudent}`);
    setShowActionModal(false);
    setSelectedStudent(null);
    setActionType(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Monitoring</h1>
          <p className="text-gray-600 mt-1">Monitor student academic performance and manage account access</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <span className="text-sm text-gray-600">
            {flaggedStudents.length} flagged students
          </span>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
            Bulk Actions
          </button>
        </div>
      </div>

      {/* Academic Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-500">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-red-600">Critical</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {flaggedStudents.filter(s => s.currentGPA < 2.5).length}
          </h3>
          <p className="text-gray-600 text-sm">Below 2.5 GPA</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
              <TrendingDown className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-yellow-600">Warning</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {flaggedStudents.filter(s => s.currentGPA < s.previousGPA).length}
          </h3>
          <p className="text-gray-600 text-sm">GPA Declining</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-blue-600">Pending</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{pendingRecords.length}</h3>
          <p className="text-gray-600 text-sm">Records to Review</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-purple-600">Locked</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {flaggedStudents.filter(s => s.accountLocked).length}
          </h3>
          <p className="text-gray-600 text-sm">Locked Accounts</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'flagged', label: 'Flagged Students', count: flaggedStudents.length },
            { id: 'pending', label: 'Pending Records', count: pendingRecords.length },
            { id: 'bulletins', label: 'Bulletin Requests', count: 3 },
            { id: 'performance', label: 'Performance Trends', count: 0 }
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

        {/* Search and Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search students by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option value="">All Levels</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
              <option value="high-school">High School</option>
            </select>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center space-x-2 transition-colors">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">GPA Range</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="divide-y divide-gray-200">
          {activeTab === 'flagged' && flaggedStudents.map((student) => {
            const trend = getGPATrend(student.currentGPA, student.previousGPA);
            const TrendIcon = trend.icon;
            
            return (
              <div key={student.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {student.avatar ? (
                        <img 
                          src={student.avatar} 
                          alt={student.name}
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-gray-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                        {student.accountLocked && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                            Account Locked
                          </span>
                        )}
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          {student.academicLevel}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{student.email}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">Current GPA:</span>
                          <span className={`font-bold ${getGPAColor(student.currentGPA)}`}>
                            {student.currentGPA.toFixed(1)}
                          </span>
                          <TrendIcon className={`h-4 w-4 ${trend.color}`} />
                          <span className="text-gray-500">
                            (was {student.previousGPA.toFixed(1)})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          ${student.totalEarnings.toLocaleString()}
                        </div>
                        <div className="text-gray-600">{student.completedJobs} jobs</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      {student.accountLocked ? (
                        <button 
                          onClick={() => handleStudentAction(student.id, 'unlock')}
                          className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                        >
                          <Unlock className="h-4 w-4" />
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleStudentAction(student.id, 'lock')}
                          className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Lock className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Flag Reason:</span>
                    <span className="text-sm text-yellow-700">{student.flagReason}</span>
                  </div>
                  <p className="text-xs text-yellow-600 mt-1">
                    Last report card: {new Date(student.lastReportCard).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}

          {activeTab === 'pending' && pendingRecords.map((record) => (
            <div key={record.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Academic Record Review
                    </h3>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Pending Review
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-600">Student ID:</span>
                      <div className="font-medium">{record.studentId}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Academic Year:</span>
                      <div className="font-medium">{record.academicYear}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Term:</span>
                      <div className="font-medium">{record.term}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Extracted GPA:</span>
                      <div className={`font-medium ${getGPAColor(record.gpa || 0)}`}>
                        {record.gpa?.toFixed(1) || 'N/A'}
                      </div>
                    </div>
                  </div>

                  {record.ocrRawText && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                      <h4 className="font-medium text-gray-900 text-sm mb-2">OCR Extracted Text:</h4>
                      <pre className="text-xs text-gray-700 whitespace-pre-wrap">{record.ocrRawText}</pre>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleStudentAction(record.id, 'approve')}
                    className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleStudentAction(record.id, 'reject')}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <XCircle className="h-4 w-4" />
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
              {actionType === 'lock' && <Lock className="h-6 w-6 text-red-600" />}
              {actionType === 'unlock' && <Unlock className="h-6 w-6 text-green-600" />}
              {actionType === 'approve' && <CheckCircle className="h-6 w-6 text-green-600" />}
              {actionType === 'reject' && <XCircle className="h-6 w-6 text-red-600" />}
              <h2 className="text-lg font-semibold text-gray-900">
                Confirm {actionType?.charAt(0).toUpperCase() + actionType?.slice(1)} Action
              </h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to {actionType} this {activeTab === 'pending' ? 'academic record' : 'student account'}? 
              This action will be logged and may affect the student's platform access.
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
                  actionType === 'approve' || actionType === 'unlock' ? 'bg-green-600 hover:bg-green-700' :
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

export default AcademicMonitoring;