import React, { useState } from 'react';
import { 
  Plus, 
  Save, 
  X, 
  DollarSign, 
  Clock, 
  Users, 
  MapPin,
  FileText,
  Shield,
  Star,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Employer } from '../../types';

const JobPostingForm: React.FC = () => {
  const { user } = useAuth();
  const employer = user as Employer;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'part-time',
    duration: '',
    payRate: '',
    payType: 'hourly',
    paymentModel: 'escrow',
    location: '',
    remote: false,
    requiredSkills: [] as string[],
    minimumGPA: '',
    academicLevel: [] as string[],
    deadline: '',
    isPremium: false
  });
  const [newSkill, setNewSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.requiredSkills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAcademicLevelChange = (level: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      academicLevel: checked 
        ? [...prev.academicLevel, level]
        : prev.academicLevel.filter(l => l !== level)
    }));
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Job posting submitted:', { ...formData, status: isDraft ? 'draft' : 'active' });
    setIsSubmitting(false);
    
    // Reset form or redirect
    if (!isDraft) {
      setFormData({
        title: '',
        description: '',
        type: 'part-time',
        duration: '',
        payRate: '',
        payType: 'hourly',
        paymentModel: 'escrow',
        location: '',
        remote: false,
        requiredSkills: [],
        minimumGPA: '',
        academicLevel: [],
        deadline: '',
        isPremium: false
      });
    }
  };

  const estimatedBudget = () => {
    const rate = parseFloat(formData.payRate) || 0;
    const hours = formData.payType === 'hourly' ? 40 : 1; // Assume 40 hours for hourly, 1 for fixed
    return rate * hours;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Post a New Job 📝</h1>
            <p className="text-blue-100">
              Create an opportunity and find the perfect student talent
            </p>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
              alt="Job Posting"
              className="w-24 h-24 rounded-full border-4 border-white/20"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Frontend Developer Intern"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                    <option value="apprenticeship">Apprenticeship</option>
                    <option value="full-time">Full-time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. 3 months, Ongoing"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Compensation */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Compensation & Payment</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pay Rate *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.payRate}
                      onChange={(e) => handleInputChange('payRate', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="15"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pay Type *
                  </label>
                  <select
                    value={formData.payType}
                    onChange={(e) => handleInputChange('payType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="hourly">Per Hour</option>
                    <option value="fixed">Fixed Price</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Model *
                  </label>
                  <select
                    value={formData.paymentModel}
                    onChange={(e) => handleInputChange('paymentModel', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="escrow">Escrow (Recommended)</option>
                    <option value="milestone">Milestone</option>
                    <option value="upfront">Upfront</option>
                  </select>
                </div>
              </div>

              {formData.paymentModel === 'escrow' && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Escrow Protection</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Funds are held securely until work is completed and approved. This protects both you and the student.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Location & Requirements */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Location & Requirements</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Kigali, Rwanda"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="remote"
                  checked={formData.remote}
                  onChange={(e) => handleInputChange('remote', e.target.checked)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remote" className="text-sm font-medium text-gray-700">
                  This is a remote position
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Skills
                </label>
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add a skill"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.requiredSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum GPA
                  </label>
                  <select
                    value={formData.minimumGPA}
                    onChange={(e) => handleInputChange('minimumGPA', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">No minimum</option>
                    <option value="2.5">2.5 and above</option>
                    <option value="3.0">3.0 and above</option>
                    <option value="3.5">3.5 and above</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Academic Levels
                </label>
                <div className="space-y-2">
                  {['high-school', 'undergraduate', 'graduate'].map((level) => (
                    <label key={level} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.academicLevel.includes(level)}
                        onChange={(e) => handleAcademicLevelChange(level, e.target.checked)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 capitalize">{level.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Premium Options */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Premium Options</h2>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="premium"
                checked={formData.isPremium}
                onChange={(e) => handleInputChange('isPremium', e.target.checked)}
                className="text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="premium" className="text-sm font-medium text-gray-700">
                Make this a premium job posting
              </label>
            </div>
            {formData.isPremium && (
              <div className="mt-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-900">Premium Job Benefits</h4>
                    <ul className="text-sm text-purple-700 mt-1 space-y-1">
                      <li>• Access to top-performing students only</li>
                      <li>• Priority placement in job listings</li>
                      <li>• Enhanced application analytics</li>
                      <li>• Dedicated support</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Budget Estimate */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Estimate</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Rate:</span>
                <span className="font-medium">${formData.payRate || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Total:</span>
                <span className="font-bold text-lg">${estimatedBudget()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Platform Fee (5%):</span>
                <span className="text-gray-500">${(estimatedBudget() * 0.05).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Job Preview */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Preview</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-900">Title:</span>
                <p className="text-gray-600">{formData.title || 'Job title will appear here'}</p>
              </div>
              <div>
                <span className="font-medium text-gray-900">Type:</span>
                <p className="text-gray-600 capitalize">{formData.type}</p>
              </div>
              <div>
                <span className="font-medium text-gray-900">Pay:</span>
                <p className="text-gray-600">
                  ${formData.payRate || 0}/{formData.payType}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-900">Skills:</span>
                <p className="text-gray-600">
                  {formData.requiredSkills.length > 0 
                    ? formData.requiredSkills.join(', ') 
                    : 'No skills specified'}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="space-y-3">
              <button
                onClick={() => handleSubmit(false)}
                disabled={isSubmitting || !formData.title || !formData.description}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Post Job</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => handleSubmit(true)}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="h-5 w-5" />
                <span>Save as Draft</span>
              </button>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <p className="text-xs text-yellow-700">
                  Jobs will be reviewed by our team before going live. This usually takes 2-4 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingForm;