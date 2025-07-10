import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Camera,
  GraduationCap,
  Star
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Student } from '../../types';
import { mockAcademicRecords } from '../../data/mockData';

const AcademicVerification: React.FC = () => {
  const { user } = useAuth();
  const student = user as Student;
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [ocrProcessing, setOcrProcessing] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsUploading(true);
      
      // Simulate file upload and OCR processing
      setTimeout(() => {
        setIsUploading(false);
        setOcrProcessing(true);
        
        setTimeout(() => {
          setOcrProcessing(false);
          // Simulate successful upload
        }, 3000);
      }, 2000);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Academic Verification 🎓</h1>
            <p className="text-blue-100 mb-4">
              Upload your report cards to verify academic performance and unlock premium features
            </p>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
              <GraduationCap className="h-4 w-4 mr-2" />
              Current GPA: {student.currentGPA?.toFixed(1) || 'Not verified'}
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
              alt="Academic Success"
              className="w-24 h-24 rounded-full border-4 border-white/20"
            />
          </div>
        </div>
      </div>

      {/* Academic Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
              <Star className="h-6 w-6 text-white" />
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.academicStatus)}`}>
              {student.academicStatus}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{student.academicPerformanceScore.toFixed(1)}</h3>
          <p className="text-gray-600 text-sm">Academic Performance Score</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-green-600">+1 this term</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{mockAcademicRecords.length}</h3>
          <p className="text-gray-600 text-sm">Verified Records</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-blue-600">Excellent</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{student.academicLevel}</h3>
          <p className="text-gray-600 text-sm">Academic Level</p>
        </div>
      </div>

      {/* Upload New Report Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload New Report Card</h2>
        
        {!uploadedFile ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="report-card-upload"
            />
            <label htmlFor="report-card-upload" className="cursor-pointer">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Report Card</h3>
              <p className="text-gray-600 mb-4">
                Take a clear photo or upload a PDF of your latest report card
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </div>
            </label>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{uploadedFile.name}</h3>
                <p className="text-sm text-gray-600">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            {isUploading && (
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                  <span className="text-sm text-gray-600">Uploading file...</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full w-3/4 transition-all duration-500"></div>
                </div>
              </div>
            )}

            {ocrProcessing && (
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm text-gray-600">Processing with OCR...</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-1/2 transition-all duration-1000"></div>
                </div>
              </div>
            )}

            {!isUploading && !ocrProcessing && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-800">
                    Upload successful! Your report card is now under review.
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Academic Records History */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Academic Records History</h2>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {mockAcademicRecords.map((record) => (
            <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getStatusIcon(record.status)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {record.academicYear} - {record.term}
                  </h3>
                  <p className="text-sm text-gray-600">
                    GPA: {record.gpa?.toFixed(1)} • Uploaded {new Date(record.reviewedAt || '').toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
                {record.status === 'approved' && (
                  <p className="text-xs text-gray-500 mt-1">
                    Reviewed by Admin
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Impact */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Academic Requirements</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Minimum GPA for jobs</span>
                <span className="font-semibold text-green-600">3.0+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Premium access threshold</span>
                <span className="font-semibold text-purple-600">3.5+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Scholarship eligibility</span>
                <span className="font-semibold text-blue-600">3.8+</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Current Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Account Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  student.accountLocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {student.accountLocked ? 'Locked' : 'Active'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Premium Access</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  student.premiumAccess ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {student.premiumAccess ? 'Unlocked' : 'Locked'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Next Review</span>
                <span className="font-semibold text-gray-900">End of Term</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicVerification;