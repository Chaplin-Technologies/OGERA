import React, { useState } from 'react';
import { 
  User, 
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
  GraduationCap,
  Briefcase,
  Plus,
  Trash2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Student } from '../../types';

const StudentProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const student = user as Student;
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: student.name,
    bio: student.bio || '',
    phone: student.phone || '',
    skills: [...student.skills],
    interests: [...student.interests]
  });
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const handleSave = () => {
    updateUser(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({
      name: student.name,
      bio: student.bio || '',
      phone: student.phone || '',
      skills: [...student.skills],
      interests: [...student.interests]
    });
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !editedProfile.skills.includes(newSkill.trim())) {
      setEditedProfile({
        ...editedProfile,
        skills: [...editedProfile.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setEditedProfile({
      ...editedProfile,
      skills: editedProfile.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const addInterest = () => {
    if (newInterest.trim() && !editedProfile.interests.includes(newInterest.trim())) {
      setEditedProfile({
        ...editedProfile,
        interests: [...editedProfile.interests, newInterest.trim()]
      });
      setNewInterest('');
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setEditedProfile({
      ...editedProfile,
      interests: editedProfile.interests.filter(interest => interest !== interestToRemove)
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">My Profile 👤</h1>
            <p className="text-purple-100">
              Manage your personal information and showcase your skills
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
        {/* Profile Picture & Basic Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              {student.avatar ? (
                <img 
                  src={student.avatar} 
                  alt={student.name}
                  className="w-24 h-24 rounded-full mx-auto"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <User className="h-12 w-12 text-white" />
                </div>
              )}
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                className="text-xl font-bold text-gray-900 text-center w-full border-b border-gray-300 focus:border-purple-500 outline-none"
              />
            ) : (
              <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>
            )}
            
            <p className="text-purple-600 font-medium mt-1 capitalize">{student.academicLevel} Student</p>
            
            <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                <span>{student.averageEmployerRating.toFixed(1)} Rating</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1 text-green-500" />
                <span>{student.completedJobs} Jobs</span>
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
                <p className="font-medium text-gray-900">{student.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                    className="font-medium text-gray-900 border-b border-gray-300 focus:border-purple-500 outline-none"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="font-medium text-gray-900">{student.phone || 'Not provided'}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="font-medium text-gray-900">
                  {new Date(student.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Academic Level</p>
                <p className="font-medium text-gray-900 capitalize">{student.academicLevel}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Current GPA</p>
                <p className="font-medium text-gray-900">
                  {student.currentGPA?.toFixed(1) || 'Not verified'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Award className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Performance Score</p>
                <p className="font-medium text-gray-900">
                  {student.overallPerformanceScore.toFixed(1)}/5.0
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
        {isEditing ? (
          <textarea
            value={editedProfile.bio}
            onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={4}
            placeholder="Tell us about yourself, your goals, and what makes you unique..."
          />
        ) : (
          <p className="text-gray-700">
            {student.bio || 'No bio provided yet. Click edit to add information about yourself.'}
          </p>
        )}
      </div>

      {/* Skills & Interests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
            {isEditing && (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Add skill"
                />
                <button
                  onClick={addSkill}
                  className="p-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {editedProfile.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
              >
                {skill}
                {isEditing && (
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Interests</h3>
            {isEditing && (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Add interest"
                />
                <button
                  onClick={addInterest}
                  className="p-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {editedProfile.interests.map((interest, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {interest}
                {isEditing && (
                  <button
                    onClick={() => removeInterest(interest)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">CV/Resume</h4>
              <button className="text-purple-600 hover:text-purple-700">
                <Upload className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              {student.cv ? 'CV uploaded' : 'No CV uploaded'}
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Certifications</h4>
              <button className="text-purple-600 hover:text-purple-700">
                <Upload className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              {student.certifications.length} certification(s) uploaded
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;