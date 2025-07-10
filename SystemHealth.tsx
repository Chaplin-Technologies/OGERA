import React, { useState } from 'react';
import { 
  Activity, 
  Server, 
  Database, 
  CreditCard, 
  FileText,
  Bell,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  RefreshCw,
  Settings,
  TrendingUp,
  Zap
} from 'lucide-react';
import { mockSystemHealth } from '../../data/mockData';

const SystemHealth: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'database':
        return Database;
      case 'payment-gateway':
        return CreditCard;
      case 'ocr-service':
        return FileText;
      case 'file-storage':
        return Server;
      case 'notification-service':
        return Bell;
      default:
        return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600';
      case 'degraded':
        return 'text-yellow-600';
      case 'maintenance':
        return 'text-blue-600';
      case 'outage':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'maintenance':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'outage':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'maintenance':
        return 'bg-blue-100 text-blue-800';
      case 'outage':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99.9) return 'text-green-600';
    if (uptime >= 99.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getResponseTimeColor = (responseTime: number) => {
    if (responseTime <= 100) return 'text-green-600';
    if (responseTime <= 500) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const overallStatus = mockSystemHealth.every(service => service.status === 'operational') 
    ? 'operational' 
    : mockSystemHealth.some(service => service.status === 'outage')
    ? 'outage'
    : 'degraded';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Health</h1>
          <p className="text-gray-600 mt-1">Monitor platform infrastructure and service status</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {getStatusIcon(overallStatus)}
            <span className={`font-medium ${getStatusColor(overallStatus)}`}>
              {overallStatus === 'operational' ? 'All Systems Operational' : 
               overallStatus === 'outage' ? 'System Outage' : 'Degraded Performance'}
            </span>
          </div>
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Overall Status */}
      <div className={`rounded-xl p-6 border-2 ${
        overallStatus === 'operational' ? 'bg-green-50 border-green-200' :
        overallStatus === 'outage' ? 'bg-red-50 border-red-200' :
        'bg-yellow-50 border-yellow-200'
      }`}>
        <div className="flex items-center space-x-3 mb-4">
          {getStatusIcon(overallStatus)}
          <h2 className={`text-xl font-bold ${getStatusColor(overallStatus)}`}>
            Platform Status: {overallStatus.charAt(0).toUpperCase() + overallStatus.slice(1)}
          </h2>
        </div>
        <p className={`${getStatusColor(overallStatus)} mb-4`}>
          {overallStatus === 'operational' 
            ? 'All systems are running normally. No issues detected.'
            : overallStatus === 'outage'
            ? 'We are experiencing service disruptions. Our team is working to resolve the issue.'
            : 'Some services are experiencing degraded performance. Monitoring the situation.'}
        </p>
        <div className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Service Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSystemHealth.map((service) => {
          const Icon = getServiceIcon(service.service);
          return (
            <div key={service.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    service.status === 'operational' ? 'bg-green-100' :
                    service.status === 'degraded' ? 'bg-yellow-100' :
                    service.status === 'maintenance' ? 'bg-blue-100' :
                    'bg-red-100'
                  }`}>
                    <Icon className={`h-5 w-5 ${getStatusColor(service.status)}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 capitalize">
                    {service.service.replace('-', ' ')}
                  </h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(service.status)}`}>
                  {service.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Uptime</span>
                  <span className={`font-semibold ${getUptimeColor(service.uptime)}`}>
                    {service.uptime}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className={`font-semibold ${getResponseTimeColor(service.responseTime)}`}>
                    {service.responseTime > 0 ? `${service.responseTime}ms` : 'N/A'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Check</span>
                  <span className="text-sm text-gray-900">
                    {new Date(service.lastChecked).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              {service.issues && service.issues.length > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 text-sm mb-1">Current Issues</h4>
                  <ul className="text-xs text-yellow-700 space-y-1">
                    {service.issues.map((issue, index) => (
                      <li key={index}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="p-4 bg-blue-50 rounded-lg mb-3">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">99.8%</div>
            <div className="text-sm text-gray-600">Average Uptime</div>
          </div>
          
          <div className="text-center">
            <div className="p-4 bg-green-50 rounded-lg mb-3">
              <Zap className="h-8 w-8 text-green-600 mx-auto" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">127ms</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </div>
          
          <div className="text-center">
            <div className="p-4 bg-purple-50 rounded-lg mb-3">
              <Activity className="h-8 w-8 text-purple-600 mx-auto" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">1,247</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          
          <div className="text-center">
            <div className="p-4 bg-orange-50 rounded-lg mb-3">
              <Server className="h-8 w-8 text-orange-600 mx-auto" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">12.3GB</div>
            <div className="text-sm text-gray-600">Data Processed</div>
          </div>
        </div>
      </div>

      {/* Incident History */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Incidents</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All Incidents
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-green-800">OCR Service Maintenance Completed</h3>
              <p className="text-sm text-green-700 mt-1">
                Scheduled maintenance for OCR engine upgrade has been completed successfully.
              </p>
              <p className="text-xs text-green-600 mt-2">
                Resolved 2 hours ago • Duration: 30 minutes
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-yellow-800">Payment Gateway Latency</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Experiencing higher than normal response times for payment processing.
              </p>
              <p className="text-xs text-yellow-600 mt-2">
                Investigating • Started 1 hour ago
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <CheckCircle className="h-5 w-5 text-gray-500 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">Database Connection Pool Optimization</h3>
              <p className="text-sm text-gray-700 mt-1">
                Optimized database connection pooling to improve performance.
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Resolved yesterday • Duration: 15 minutes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* System Configuration */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">System Configuration</h2>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Configure</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Monitoring Settings</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Health Check Interval</span>
                <span className="font-medium">30 seconds</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Alert Threshold</span>
                <span className="font-medium">99% uptime</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Response Time Alert</span>
                <span className="font-medium">500ms</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Notification Settings</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Email Alerts</span>
                <span className="font-medium text-green-600">Enabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">SMS Alerts</span>
                <span className="font-medium text-green-600">Enabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Slack Integration</span>
                <span className="font-medium text-green-600">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;