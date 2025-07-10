import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  GraduationCap, 
  Eye, 
  EyeOff, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  FileText,
  CreditCard,
  Search,
  Loader
} from 'lucide-react';

interface SignupFormProps {
  onBack: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'student' | 'individual' | 'company' | 'organization'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoadingNationalId, setIsLoadingNationalId] = useState(false);
  const [nationalIdVerified, setNationalIdVerified] = useState(false);
  const [useManualInput, setUseManualInput] = useState(false);

  const [formData, setFormData] = useState({
    // Common fields
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    
    // Personal/Individual fields
    firstName: '',
    lastName: '',
    nationalId: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    
    // Student specific
    university: '',
    studentId: '',
    academicLevel: 'undergraduate',
    fieldOfStudy: '',
    expectedGraduation: '',
    
    // Company/Organization fields
    companyName: '',
    businessType: 'company',
    businessCategory: 'technology',
    registrationNumber: '',
    taxId: '',
    companyAddress: '',
    website: '',
    companySize: '',
    
    // Contact person for companies
    contactPersonName: '',
    contactPersonTitle: '',
    contactPersonEmail: '',
    contactPersonPhone: '',
    
    // Documents
    idDocument: null as File | null,
    businessCertificate: null as File | null,
    
    // Payment method (for employers)
    paymentMethod: 'mobile-money',
    mobileMoneyProvider: 'mtn',
    mobileMoneyNumber: '',
    bankName: '',
    accountNumber: '',
    cardNumber: '',
    
    // Terms and privacy
    agreeToTerms: false,
    agreeToPrivacy: false,
    allowMarketing: false
  });

  const userTypes = [
    {
      id: 'student',
      title: 'Student',
      description: 'I am a student looking for part-time work and internships',
      icon: GraduationCap,
      color: 'from-purple-500 to-blue-500'
    },
    {
      id: 'individual',
      title: 'Individual Employer',
      description: 'I am an individual looking to hire students for projects',
      icon: User,
      color: 'from-blue-500 to-teal-500'
    },
    {
      id: 'company',
      title: 'Company',
      description: 'I represent a company seeking to hire student talent',
      icon: Building2,
      color: 'from-teal-500 to-emerald-500'
    },
    {
      id: 'organization',
      title: 'Organization/NGO',
      description: 'I represent an organization or NGO with opportunities',
      icon: Building2,
      color: 'from-emerald-500 to-green-500'
    }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const simulateNationalIdLookup = async () => {
    if (!formData.nationalId) return;
    
    setIsLoadingNationalId(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate API response (in real implementation, this would call the actual API)
    const mockApiResponse = {
      success: Math.random() > 0.3, // 70% success rate for demo
      data: {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1995-05-15',
        gender: 'male',
        address: 'Kigali, Rwanda'
      }
    };
    
    if (mockApiResponse.success) {
      setFormData(prev => ({
        ...prev,
        firstName: mockApiResponse.data.firstName,
        lastName: mockApiResponse.data.lastName,
        dateOfBirth: mockApiResponse.data.dateOfBirth,
        gender: mockApiResponse.data.gender,
        address: mockApiResponse.data.address
      }));
      setNationalIdVerified(true);
    } else {
      setUseManualInput(true);
    }
    
    setIsLoadingNationalId(false);
  };

  const validateStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return userType !== '';
      case 2:
        return formData.email && formData.password && formData.confirmPassword && 
               formData.password === formData.confirmPassword;
      case 3:
        if (userType === 'student') {
          return formData.firstName && formData.lastName && formData.phone;
        } else {
          return formData.contactPersonName && formData.phone;
        }
      case 4:
        if (userType === 'student') {
          return formData.university && formData.academicLevel;
        } else {
          return formData.companyName && formData.businessCategory;
        }
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    console.log('Signup data:', { userType, ...formData });
    // Handle signup logic here
  };

  const renderUserTypeSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Join Ogera</h2>
        <p className="text-gray-600">Choose your account type to get started</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setUserType(type.id as any)}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                userType === type.id
                  ? 'border-purple-500 bg-gradient-to-r ' + type.color + ' text-white shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:shadow-md'
              }`}
            >
              <Icon className={`h-8 w-8 mb-3 ${
                userType === type.id ? 'text-white' : 'text-gray-400'
              }`} />
              <h3 className="font-semibold text-lg mb-2">{type.title}</h3>
              <p className={`text-sm ${
                userType === type.id ? 'text-white/90' : 'text-gray-600'
              }`}>
                {type.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderAccountDetails = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Details</h2>
        <p className="text-gray-600">Create your login credentials</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your email address"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Create a strong password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderPersonalInformation = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">
          {userType === 'student' ? 'Tell us about yourself' : 'Contact person details'}
        </p>
      </div>

      {/* National ID Verification for individuals and students */}
      {(userType === 'student' || userType === 'individual') && !useManualInput && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-3">National ID Verification</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                National ID Number
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={formData.nationalId}
                  onChange={(e) => handleInputChange('nationalId', e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your National ID number"
                />
                <button
                  type="button"
                  onClick={simulateNationalIdLookup}
                  disabled={!formData.nationalId || isLoadingNationalId}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isLoadingNationalId ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  <span>Verify</span>
                </button>
              </div>
            </div>
            
            {nationalIdVerified && (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">National ID verified successfully!</span>
              </div>
            )}
            
            <button
              type="button"
              onClick={() => setUseManualInput(true)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Can't verify? Enter details manually
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {userType === 'student' ? 'First Name *' : 'Contact Person Name *'}
          </label>
          <input
            type="text"
            value={userType === 'student' ? formData.firstName : formData.contactPersonName}
            onChange={(e) => handleInputChange(
              userType === 'student' ? 'firstName' : 'contactPersonName', 
              e.target.value
            )}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter first name"
            disabled={nationalIdVerified && !useManualInput}
          />
        </div>

        {userType === 'student' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter last name"
              disabled={nationalIdVerified && !useManualInput}
            />
          </div>
        )}

        {userType !== 'student' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              value={formData.contactPersonTitle}
              onChange={(e) => handleInputChange('contactPersonTitle', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g. CEO, HR Manager"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="+250 788 123 456"
            />
          </div>
        </div>

        {userType === 'student' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={nationalIdVerified && !useManualInput}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={nationalIdVerified && !useManualInput}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            value={userType === 'student' ? formData.address : formData.companyAddress}
            onChange={(e) => handleInputChange(
              userType === 'student' ? 'address' : 'companyAddress', 
              e.target.value
            )}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={3}
            placeholder="Enter your address"
            disabled={nationalIdVerified && !useManualInput && userType === 'student'}
          />
        </div>
      </div>

      {/* ID Document Upload for manual input */}
      {useManualInput && (userType === 'student' || userType === 'individual') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            National ID Document *
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileUpload('idDocument', e.target.files?.[0] || null)}
              className="hidden"
              id="id-upload"
            />
            <label htmlFor="id-upload" className="cursor-pointer">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                {formData.idDocument ? formData.idDocument.name : 'Upload your National ID (front and back)'}
              </p>
            </label>
          </div>
        </div>
      )}
    </div>
  );

  const renderSpecificDetails = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {userType === 'student' ? 'Academic Information' : 'Business Information'}
        </h2>
        <p className="text-gray-600">
          {userType === 'student' 
            ? 'Tell us about your studies' 
            : 'Provide your business details'}
        </p>
      </div>

      {userType === 'student' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              University/Institution *
            </label>
            <input
              type="text"
              value={formData.university}
              onChange={(e) => handleInputChange('university', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g. University of Rwanda"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student ID
              </label>
              <input
                type="text"
                value={formData.studentId}
                onChange={(e) => handleInputChange('studentId', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Your student ID number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Level *
              </label>
              <select
                value={formData.academicLevel}
                onChange={(e) => handleInputChange('academicLevel', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="high-school">High School</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="graduate">Graduate</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Field of Study
              </label>
              <input
                type="text"
                value={formData.fieldOfStudy}
                onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g. Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Graduation
              </label>
              <input
                type="month"
                value={formData.expectedGraduation}
                onChange={(e) => handleInputChange('expectedGraduation', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {userType === 'organization' ? 'Organization Name *' : 'Company Name *'}
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder={userType === 'organization' ? 'e.g. Rwanda Youth Foundation' : 'e.g. TechCorp Solutions'}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type
              </label>
              <select
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="company">Company</option>
                <option value="organization">Organization/NGO</option>
                <option value="startup">Startup</option>
                <option value="government">Government Agency</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry/Category *
              </label>
              <select
                value={formData.businessCategory}
                onChange={(e) => handleInputChange('businessCategory', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="agriculture">Agriculture</option>
                <option value="ngo">Non-Profit/NGO</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration Number
              </label>
              <input
                type="text"
                value={formData.registrationNumber}
                onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Business registration number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Size
              </label>
              <select
                value={formData.companySize}
                onChange={(e) => handleInputChange('companySize', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="https://www.yourcompany.com"
            />
          </div>

          {/* Business Certificate Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Registration Certificate
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileUpload('businessCertificate', e.target.files?.[0] || null)}
                className="hidden"
                id="business-cert-upload"
              />
              <label htmlFor="business-cert-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {formData.businessCertificate ? formData.businessCertificate.name : 'Upload business registration certificate'}
                </p>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPaymentMethod = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Method</h2>
        <p className="text-gray-600">Set up your payment method for hiring students</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choose Payment Method
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { id: 'mobile-money', label: 'Mobile Money', icon: Phone },
              { id: 'bank', label: 'Bank Transfer', icon: Building2 },
              { id: 'card', label: 'Credit/Debit Card', icon: CreditCard }
            ].map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => handleInputChange('paymentMethod', method.id)}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.paymentMethod === method.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                  <span className="text-sm font-medium">{method.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {formData.paymentMethod === 'mobile-money' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provider
              </label>
              <select
                value={formData.mobileMoneyProvider}
                onChange={(e) => handleInputChange('mobileMoneyProvider', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="mtn">MTN MoMo</option>
                <option value="airtel">Airtel Money</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.mobileMoneyNumber}
                onChange={(e) => handleInputChange('mobileMoneyNumber', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="+250 788 123 456"
              />
            </div>
          </div>
        )}

        {formData.paymentMethod === 'bank' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name
              </label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g. Bank of Kigali"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number
              </label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Your account number"
              />
            </div>
          </div>
        )}

        {formData.paymentMethod === 'card' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="1234 5678 9012 3456"
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderTermsAndConditions = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Terms & Conditions</h2>
        <p className="text-gray-600">Review and accept our terms to complete registration</p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg max-h-40 overflow-y-auto">
          <h3 className="font-medium text-gray-900 mb-2">Terms of Service</h3>
          <p className="text-sm text-gray-600">
            By using Ogera, you agree to our terms of service. This includes respecting other users, 
            providing accurate information, and following our community guidelines. We reserve the right 
            to suspend accounts that violate these terms.
          </p>
        </div>

        <div className="space-y-3">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
              className="mt-1 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">
              I agree to the <a href="#" className="text-purple-600 hover:text-purple-700">Terms of Service</a> *
            </span>
          </label>

          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.agreeToPrivacy}
              onChange={(e) => handleInputChange('agreeToPrivacy', e.target.checked)}
              className="mt-1 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">
              I agree to the <a href="#" className="text-purple-600 hover:text-purple-700">Privacy Policy</a> *
            </span>
          </label>

          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.allowMarketing}
              onChange={(e) => handleInputChange('allowMarketing', e.target.checked)}
              className="mt-1 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">
              I would like to receive marketing communications and updates
            </span>
          </label>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Account Verification</h4>
              <p className="text-sm text-blue-700 mt-1">
                Your account will be reviewed by our team. {userType === 'student' 
                  ? 'Students typically get approved within 24 hours.' 
                  : 'Business accounts may take 2-3 business days for verification.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const getStepContent = () => {
    switch (step) {
      case 1:
        return renderUserTypeSelection();
      case 2:
        return renderAccountDetails();
      case 3:
        return renderPersonalInformation();
      case 4:
        return renderSpecificDetails();
      case 5:
        return userType !== 'student' ? renderPaymentMethod() : renderTermsAndConditions();
      case 6:
        return renderTermsAndConditions();
      default:
        return renderUserTypeSelection();
    }
  };

  const totalSteps = userType === 'student' ? 5 : 6;
  const canProceed = validateStep(step);
  const isLastStep = step === totalSteps;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl mb-4 text-2xl font-bold">
            O
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Ogera</h1>
          <p className="text-gray-600">Connect students with opportunities</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {step} of {totalSteps}</span>
            <span className="text-sm text-gray-500">{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {getStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={step === 1 ? onBack : () => setStep(step - 1)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {step === 1 ? 'Back to Login' : 'Previous'}
            </button>
            
            {isLastStep ? (
              <button
                onClick={handleSubmit}
                disabled={!formData.agreeToTerms || !formData.agreeToPrivacy}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Create Account</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canProceed}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;