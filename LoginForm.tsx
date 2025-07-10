import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, GraduationCap, Building2, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SignupForm from './SignupForm';

const LoginForm: React.FC = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(formData.email, formData.password, formData.role);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const roleOptions = [
    { value: 'student', label: 'Student', icon: GraduationCap, color: 'from-purple-500 to-blue-500' },
    { value: 'employer', label: 'Employer', icon: Building2, color: 'from-blue-500 to-teal-500' },
    { value: 'admin', label: 'Administrator', icon: Shield, color: 'from-teal-500 to-emerald-500' }
  ];

  // Demo credentials helper
  const fillDemoCredentials = (role: string) => {
    const credentials = {
      student: 'alice@student.edu',
      employer: 'john@techcorp.com',
      admin: 'admin@ogera.com'
    };
    setFormData({
      email: credentials[role as keyof typeof credentials],
      password: 'demo123',
      role
    });
  };

  if (showSignup) {
    return <SignupForm onBack={() => setShowSignup(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl mb-4 text-2xl font-bold">
            O
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Ogera</h1>
          <p className="text-gray-600">Connect students with opportunities</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am a...
              </label>
              <div className="grid grid-cols-1 gap-3">
                {roleOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, role: option.value })}
                      className={`relative flex items-center p-4 rounded-xl border-2 transition-all ${
                        formData.role === option.value
                          ? 'border-purple-500 bg-gradient-to-r ' + option.color + ' text-white shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <Icon className={`h-5 w-5 mr-3 ${
                        formData.role === option.value ? 'text-white' : 'text-gray-400'
                      }`} />
                      <span className="font-medium">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                  required
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

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Demo Credentials */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 font-medium mb-2">Demo Credentials:</p>
              <div className="space-y-1">
                {roleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => fillDemoCredentials(option.value)}
                    className="block text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    {option.label}: Click to fill credentials
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button 
                onClick={() => setShowSignup(true)}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;