import React, { useState } from 'react';
import { 
  Building2, 
  Camera, 
  Edit, 
  Save, 
  X, 
  Upload, 
  Star, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Users,
  Briefcase,
  Shield,
  CheckCircle,
  AlertCircle,
  Globe,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Employer } from '../../types';

const EmployerProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const employer = user as Employer;
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: employer.name,
    companyName: employer.companyName || '',
    businessCategory: employer.businessCategory,
    email: employer.email
  });

  const handleSave = () => {
    updateUser(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({
      name: employer.name,
      companyName: employer.companyName || '',
      businessCategory: employer.businessCategory,
      email: employer.email
    });
    setIsEditing(false);
  };

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'pending-docs':
      case 'pending-verification':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Shield className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Company Profile 🏢</h1>
            <p className="text-blue-100">
              Manage your company information and build trust with talent
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Logo & Basic Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              {employer.avatar ? (
                <img 
                  src={employer.avatar} 
                  alt={employer.companyName || employer.name}
                  className="w-24 h-24 rounded-full mx-auto"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto">
                  <Building2 className="h-12 w-12 text-white" />
                </div>
              )}
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editedProfile.companyName}
                  onChange={(e) => setEditedProfile({...editedProfile, companyName: e.target.value})}
                  className="text-xl font-bold text-gray-900 text-center w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                  placeholder="Company Name"
                />
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                  className="text-lg text-gray-600 text-center w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                  placeholder="Contact Person"
                />
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {employer.companyName || employer.name}
                </h2>
                {employer.companyName && (
                  <p className="text-gray-600 mt-1">{employer.name}</p>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-center space-x-2 mt-2">
              {getVerificationIcon(employer.verificationStatus)}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVerificationStatusColor(employer.verificationStatus)}`}>
                {employer.verificationStatus.replace('-', ' ')}
              </span>
            </div>
            
            <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                <span>{employer.averageRating.toFixed(1)} Rating</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-blue-500" />
                <span>{employer.totalHires} Hires</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                    className="font-medium text-gray-900 border-b border-gray-300 focus:border-blue-500 outline-none"
                  />
                ) : (
                  <p className="font-medium text-gray-900">{employer.email}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Building2 className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Business Type</p>
                <p className="font-medium text-gray-900 capitalize">{employer.businessType}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Briefcase className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Industry</p>
                {isEditing ? (
                  <select
                    value={editedProfile.businessCategory}
                    onChange={(e) => setEditedProfile({...editedProfile, businessCategory: e.target.value as any})}
                    className="font-medium text-gray-900 border-b border-gray-300 focus:border-blue-500 outline-none"
                  >
                    <option value="technology">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="retail">Retail</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p className="font-medium text-gray-900 capitalize">{employer.businessCategory}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="font-medium text-gray-900">
                  {new Date(employer.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Statistics */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Statistics</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Briefcase className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Jobs Posted</p>
                <p className="font-medium text-gray-900">{employer.totalJobsPosted}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Total Hires</p>
                <p className="font-medium text-gray-900">{employer.totalHires}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="font-medium text-gray-900">{employer.hiringSuccessRate.toFixed(1)}%</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Award className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Quality Score</p>
                <p className="font-medium text-gray-900">{employer.candidateQualityScore.toFixed(1)}/5.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Identity Verification</h4>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              {getVerificationIcon(employer.verificationStatus)}
              <div>
                <p className="font-medium text-gray-900">Business Registration</p>
                <p className="text-sm text-gray-600">
                  {employer.verificationStatus === 'verified' 
                    ? 'Verified and approved' 
                    : 'Pending verification'}
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Payment Methods</h4>
            <div className="space-y-2">
              {employer.paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {method.type.replace('-', ' ')} {method.provider && `(${method.provider})`}
                    </p>
                    <p className="text-sm text-gray-600">
                      {method.lastFour && `****${method.lastFour}`} • {method.isDefault ? 'Default' : 'Active'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {employer.verificationDocs.map((doc, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Business Certificate</h4>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">Verified</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Document uploaded and verified by admin
              </p>
            </div>
          ))}
          
          <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">Upload additional documents</p>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Choose Files
            </button>
          </div>
        </div>
      </div>

      {/* Company Description */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Description</h3>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          placeholder="Tell students about your company, culture, and what makes you a great employer..."
          defaultValue="TechCorp Solutions is a leading technology company focused on innovative software development. We provide a collaborative environment where students can learn, grow, and contribute to meaningful projects."
        />
        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Update Description
        </button>
      </div>
    </div>
  );
};

export default EmployerProfile;