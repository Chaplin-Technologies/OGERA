import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  Star, 
  Briefcase,
  Eye,
  Target,
  Award,
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Employer } from '../../types';
import { mockEmployerAnalytics, mockJobs } from '../../data/mockData';

const EmployerAnalytics: React.FC = () => {
  const { user } = useAuth();
  const employer = user as Employer;
  const [timeRange, setTimeRange] = useState('last-30-days');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const analytics = mockEmployerAnalytics;

  const kpiCards = [
    {
      title: 'Total Jobs Posted',
      value: analytics.totalJobsPosted.toString(),
      icon: Briefcase,
      color: 'from-blue-500 to-teal-500',
      change: '+3 this month',
      trend: 'up'
    },
    {
      title: 'Hiring Success Rate',
      value: `${analytics.hiringSuccessRate.toFixed(1)}%`,
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      change: '+2.1% vs last month',
      trend: 'up'
    },
    {
      title: 'Average Time to Hire',
      value: `${analytics.averageTimeToHire} days`,
      icon: Clock,
      color: 'from-purple-500 to-blue-500',
      change: '-0.5 days faster',
      trend: 'up'
    },
    {
      title: 'Total Spent',
      value: `$${analytics.totalSpent.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-yellow-500 to-orange-500',
      change: '+12% this quarter',
      trend: 'up'
    },
    {
      title: 'Candidate Quality Score',
      value: `${analytics.candidateQualityScore.toFixed(1)}/5`,
      icon: Star,
      color: 'from-pink-500 to-rose-500',
      change: '+0.3 improvement',
      trend: 'up'
    },
    {
      title: 'Talent Retention Rate',
      value: `${analytics.talentRetentionRate.toFixed(1)}%`,
      icon: Award,
      color: 'from-indigo-500 to-purple-500',
      change: '+5.2% retention',
      trend: 'up'
    }
  ];

  const topPerformingJobs = analytics.topPerformingJobs.map(job => ({
    ...job,
    conversionRate: job.applicationCount > 0 ? ((job.applicationCount / job.viewCount) * 100).toFixed(1) : '0',
    costPerHire: job.assignedTalentId ? (job.payRate * 40).toFixed(0) : 'N/A' // Estimate
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Analytics Dashboard 📊</h1>
            <p className="text-blue-100 mb-4">
              Track your hiring performance and optimize your recruitment strategy
            </p>
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                <TrendingUp className="h-4 w-4 mr-2" />
                {analytics.hiringSuccessRate.toFixed(1)}% Success Rate
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                <Star className="h-4 w-4 mr-2" />
                {analytics.employerRating.toFixed(1)} Employer Rating
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
              alt="Analytics"
              className="w-24 h-24 rounded-full border-4 border-white/20"
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="last-7-days">Last 7 days</option>
                <option value="last-30-days">Last 30 days</option>
                <option value="last-90-days">Last 90 days</option>
                <option value="last-year">Last year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Metric Focus</label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="overview">Overview</option>
                <option value="hiring">Hiring Performance</option>
                <option value="cost">Cost Analysis</option>
                <option value="quality">Quality Metrics</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center space-x-2 transition-colors">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filters</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-colors">
              <Download className="h-4 w-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${kpi.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`h-4 w-4 ${kpi.trend === 'down' ? 'rotate-180' : ''}`} />
                  <span>{kpi.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
              <p className="text-gray-600 text-sm">{kpi.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Trends */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Application Trends</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View Details
            </button>
          </div>
          <div className="space-y-4">
            {analytics.applicationTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{trend.month}</h3>
                  <p className="text-sm text-gray-600">{trend.applications} applications</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{trend.hires}</div>
                  <div className="text-xs text-gray-500">hires</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-blue-600">
                    {((trend.hires / trend.applications) * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500">conversion</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Jobs */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Top Performing Jobs</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topPerformingJobs.slice(0, 3).map((job) => (
              <div key={job.id} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{job.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    job.status === 'filled' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="flex items-center text-gray-600">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{job.viewCount} views</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-3 w-3 mr-1" />
                      <span>{job.applicationCount} apps</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-purple-600 font-medium">
                      {job.conversionRate}% rate
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Detailed Performance Metrics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              ${analytics.averageCostPerHire}
            </div>
            <p className="text-sm text-gray-600 mb-1">Average Cost per Hire</p>
            <p className="text-xs text-green-600">15% below industry avg</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {analytics.totalApplications}
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Applications</p>
            <p className="text-xs text-blue-600">+23% vs last period</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {analytics.employerRating.toFixed(1)}/5
            </div>
            <p className="text-sm text-gray-600 mb-1">Employer Rating</p>
            <p className="text-xs text-green-600">Excellent rating</p>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-2">
              {analytics.activeJobs}
            </div>
            <p className="text-sm text-gray-600 mb-1">Active Job Listings</p>
            <p className="text-xs text-blue-600">2 new this week</p>
          </div>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Insights & Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h3 className="font-medium text-green-800">Strong Performance</h3>
            </div>
            <p className="text-sm text-green-700">
              Your hiring success rate is 15% above industry average. Your clear job descriptions and competitive pay rates are attracting quality candidates.
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium text-blue-800">Optimization Opportunity</h3>
            </div>
            <p className="text-sm text-blue-700">
              Consider posting jobs on weekdays for 23% higher application rates. Tuesday-Thursday posts receive the most engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerAnalytics;