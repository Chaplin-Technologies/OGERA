import React from 'react';
import { 
  Crown, 
  Star, 
  Lock, 
  Unlock, 
  Briefcase, 
  GraduationCap, 
  Users, 
  Gift,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Student } from '../../types';
import { mockPremiumFeatures } from '../../data/mockData';

const PremiumFeatures: React.FC = () => {
  const { user } = useAuth();
  const student = user as Student;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'jobs':
        return Briefcase;
      case 'scholarships':
        return GraduationCap;
      case 'mentorship':
        return Users;
      case 'rewards':
        return Gift;
      default:
        return Star;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'jobs':
        return 'from-blue-500 to-teal-500';
      case 'scholarships':
        return 'from-purple-500 to-blue-500';
      case 'mentorship':
        return 'from-green-500 to-emerald-500';
      case 'rewards':
        return 'from-yellow-500 to-orange-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const progressToNextLevel = () => {
    const nextThreshold = 4.5; // Highest threshold
    const current = student.overallPerformanceScore;
    return Math.min((current / nextThreshold) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Premium Features 👑</h1>
            <p className="text-purple-100 mb-4">
              Unlock exclusive opportunities based on your performance
            </p>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
              <Crown className="h-4 w-4 mr-2" />
              Performance Score: {student.overallPerformanceScore.toFixed(1)}/5.0
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
              alt="Premium Success"
              className="w-24 h-24 rounded-full border-4 border-white/20"
            />
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-green-600">Excellent</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{student.overallPerformanceScore.toFixed(1)}</h3>
          <p className="text-gray-600 text-sm">Overall Performance</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
              <Award className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-blue-600">4.6/5.0</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{student.averageEmployerRating.toFixed(1)}</h3>
          <p className="text-gray-600 text-sm">Employer Rating</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
              <Unlock className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-purple-600">
              {mockPremiumFeatures.filter(f => f.isUnlocked).length}/{mockPremiumFeatures.length}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {mockPremiumFeatures.filter(f => f.isUnlocked).length}
          </h3>
          <p className="text-gray-600 text-sm">Features Unlocked</p>
        </div>
      </div>

      {/* Progress to Next Level */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Progress to Next Level</h2>
          <span className="text-sm text-gray-600">{progressToNextLevel().toFixed(0)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressToNextLevel()}%` }}
          ></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-gray-900">{student.academicPerformanceScore.toFixed(1)}</div>
            <div className="text-gray-600">Academic Score</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900">{student.averageEmployerRating.toFixed(1)}</div>
            <div className="text-gray-600">Work Quality</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900">{student.completedJobs}</div>
            <div className="text-gray-600">Jobs Completed</div>
          </div>
        </div>
      </div>

      {/* Premium Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockPremiumFeatures.map((feature) => {
          const Icon = getCategoryIcon(feature.category);
          const isUnlocked = feature.isUnlocked;
          
          return (
            <div 
              key={feature.id} 
              className={`bg-white rounded-xl p-6 shadow-sm border transition-all ${
                isUnlocked 
                  ? 'border-purple-200 hover:shadow-md cursor-pointer' 
                  : 'border-gray-100 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${getCategoryColor(feature.category)}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  {isUnlocked ? (
                    <div className="flex items-center space-x-1 text-green-600">
                      <Unlock className="h-4 w-4" />
                      <span className="text-xs font-medium">Unlocked</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Lock className="h-4 w-4" />
                      <span className="text-xs font-medium">Locked</span>
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{feature.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">
                    Requires {feature.requiredScore.toFixed(1)} score
                  </span>
                </div>
                {isUnlocked ? (
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors">
                    Access Now
                  </button>
                ) : (
                  <div className="text-xs text-gray-500">
                    {(feature.requiredScore - student.overallPerformanceScore).toFixed(1)} points needed
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* How to Improve */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">How to Improve Your Score</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Maintain High Grades</h3>
            <p className="text-sm text-gray-600">
              Keep your GPA above 3.5 and upload report cards regularly
            </p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Deliver Quality Work</h3>
            <p className="text-sm text-gray-600">
              Consistently receive high ratings from employers
            </p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Complete More Jobs</h3>
            <p className="text-sm text-gray-600">
              Build experience and demonstrate reliability
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumFeatures;