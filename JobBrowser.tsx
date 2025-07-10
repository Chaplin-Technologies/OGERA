import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Star,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { mockJobs } from '../../data/mockData';
import { Job } from '../../types';

const JobBrowser: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const jobTypes = [
    { value: 'all', label: 'All Jobs' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'internship', label: 'Internship' },
    { value: 'apprenticeship', label: 'Apprenticeship' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'pay-high', label: 'Highest Pay' },
    { value: 'pay-low', label: 'Lowest Pay' },
    { value: 'applicants', label: 'Least Competitive' }
  ];

  const filteredJobs = mockJobs
    .filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || job.type === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'pay-high':
          return b.payRate - a.payRate;
        case 'pay-low':
          return a.payRate - b.payRate;
        case 'applicants':
          return a.applicants - b.applicants;
        default:
          return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      }
    });

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'internship':
        return 'bg-blue-100 text-blue-800';
      case 'part-time':
        return 'bg-green-100 text-green-800';
      case 'apprenticeship':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Browse Jobs</h1>
          <p className="text-gray-600 mt-1">Find the perfect opportunity to grow your career</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="text-sm text-gray-500">{filteredJobs.length} jobs available</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search */}
          <div className="md:col-span-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, companies, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Job Type Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {jobTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Filter Button */}
          <div className="md:col-span-1">
            <button className="w-full h-12 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
              <Filter className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.type)}`}>
                    {job.type}
                  </span>
                  {job.remote && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                      Remote
                    </span>
                  )}
                </div>
                <p className="text-purple-600 font-medium mb-2">{job.company}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>
              </div>
              <button
                onClick={() => toggleSaveJob(job.id)}
                className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
              >
                {savedJobs.includes(job.id) ? (
                  <BookmarkCheck className="h-5 w-5 text-purple-600" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Job Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                <span>${job.payRate}/{job.payType}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-blue-500" />
                <span>{job.duration}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-red-500" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2 text-purple-500" />
                <span>{job.applicants} applicants</span>
              </div>
            </div>

            {/* Skills Required */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.slice(0, 4).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                    {skill}
                  </span>
                ))}
                {job.requiredSkills.length > 4 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                    +{job.requiredSkills.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Requirements & Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {job.minimumGPA && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    <span>Min GPA: {job.minimumGPA}</span>
                  </div>
                )}
                <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 text-purple-600 hover:text-purple-700 font-medium text-sm border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-sm rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {filteredJobs.length > 6 && (
        <div className="text-center">
          <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
            Load More Jobs
          </button>
        </div>
      )}
    </div>
  );
};

export default JobBrowser;