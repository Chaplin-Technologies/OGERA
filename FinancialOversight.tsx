import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Shield,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Filter,
  Download,
  Eye,
  Flag,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { mockEscrowTransactions, mockTransactions, mockFraudAlerts } from '../../data/mockData';

const FinancialOversight: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);

  // Calculate financial metrics
  const totalEscrow = mockEscrowTransactions
    .filter(t => t.status === 'held')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalReleased = mockEscrowTransactions
    .filter(t => t.status === 'released')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = mockTransactions
    .filter(t => t.type === 'withdrawal' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const platformRevenue = totalReleased * 0.05; // 5% platform fee

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'investigating':
        return 'bg-blue-100 text-blue-800';
      case 'false-positive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleAlertAction = (alertId: string) => {
    setSelectedAlert(alertId);
    setShowActionModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Oversight</h1>
          <p className="text-gray-600 mt-1">Monitor transactions, escrow, and detect suspicious activity</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <span className="text-sm text-gray-600">
            {mockFraudAlerts.filter(a => a.status === 'open').length} active alerts
          </span>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-blue-600">Secured</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            ${totalEscrow.toLocaleString()}
          </h3>
          <p className="text-gray-600 text-sm">Total Escrow Balance</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
              <ArrowUpRight className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-green-600">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            ${totalReleased.toLocaleString()}
          </h3>
          <p className="text-gray-600 text-sm">Total Released</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
              <ArrowDownLeft className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-purple-600">+8%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            ${totalWithdrawals.toLocaleString()}
          </h3>
          <p className="text-gray-600 text-sm">Total Withdrawals</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-yellow-600">+15%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            ${platformRevenue.toLocaleString()}
          </h3>
          <p className="text-gray-600 text-sm">Platform Revenue</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'overview', label: 'Transaction Overview', count: 0 },
            { id: 'escrow', label: 'Escrow Management', count: mockEscrowTransactions.length },
            { id: 'fraud', label: 'Fraud Alerts', count: mockFraudAlerts.filter(a => a.status === 'open').length },
            { id: 'audit', label: 'Audit Trail', count: 0 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions, users, or amounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="">All Time Ranges</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center space-x-2 transition-colors">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Advanced</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="divide-y divide-gray-200">
          {activeTab === 'overview' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Transactions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
                  <div className="space-y-3">
                    {mockTransactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            transaction.type === 'earning' ? 'bg-green-100' :
                            transaction.type === 'withdrawal' ? 'bg-blue-100' :
                            'bg-purple-100'
                          }`}>
                            {transaction.type === 'earning' ? (
                              <ArrowUpRight className="h-4 w-4 text-green-600" />
                            ) : transaction.type === 'withdrawal' ? (
                              <ArrowDownLeft className="h-4 w-4 text-blue-600" />
                            ) : (
                              <TrendingUp className="h-4 w-4 text-purple-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm">{transaction.description}</h4>
                            <p className="text-xs text-gray-600">
                              {new Date(transaction.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold text-sm ${
                            transaction.type === 'withdrawal' ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {transaction.type === 'withdrawal' ? '-' : '+'}${transaction.amount}
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                            transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {transaction.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transaction Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Summary</h3>
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-800">Total Earnings Paid</span>
                        <span className="text-lg font-bold text-green-600">
                          ${mockTransactions.filter(t => t.type === 'earning').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-800">Total Withdrawals</span>
                        <span className="text-lg font-bold text-blue-600">
                          ${totalWithdrawals.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-purple-800">Platform Fees</span>
                        <span className="text-lg font-bold text-purple-600">
                          ${platformRevenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'escrow' && mockEscrowTransactions.map((transaction) => (
            <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    transaction.status === 'held' ? 'bg-blue-100' :
                    transaction.status === 'released' ? 'bg-green-100' :
                    'bg-yellow-100'
                  }`}>
                    <Shield className={`h-6 w-6 ${
                      transaction.status === 'held' ? 'text-blue-600' :
                      transaction.status === 'released' ? 'text-green-600' :
                      'text-yellow-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Job ID: {transaction.jobId}</h3>
                    <p className="text-sm text-gray-600">
                      Employer: {transaction.employerId} → Student: {transaction.studentId}
                    </p>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(transaction.createdAt).toLocaleDateString()}
                      {transaction.releasedAt && (
                        <span> • Released: {new Date(transaction.releasedAt).toLocaleDateString()}</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">
                    ${transaction.amount.toLocaleString()}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.status === 'held' ? 'bg-blue-100 text-blue-800' :
                    transaction.status === 'released' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {activeTab === 'fraud' && mockFraudAlerts.map((alert) => (
            <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                      {alert.severity} severity
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(alert.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {alert.alertType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>
                  
                  <p className="text-gray-700 text-sm mb-3">{alert.description}</p>
                  
                  {alert.evidence && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                      <h4 className="font-medium text-red-800 text-sm mb-1">Evidence</h4>
                      <pre className="text-xs text-red-700">{JSON.stringify(alert.evidence, null, 2)}</pre>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>User ID: {alert.userId}</span>
                    {alert.investigatedBy && (
                      <span>Investigated by: {alert.investigatedBy}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  
                  {alert.status === 'open' && (
                    <>
                      <button 
                        onClick={() => handleAlertAction(alert.id)}
                        className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                        <Flag className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">Resolve Fraud Alert</h2>
            </div>
            
            <p className="text-gray-600 mb-4">
              How would you like to resolve this fraud alert?
            </p>

            <div className="space-y-3 mb-6">
              <button className="w-full p-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Mark as Resolved</div>
                <div className="text-sm text-gray-600">Issue has been investigated and resolved</div>
              </button>
              <button className="w-full p-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">False Positive</div>
                <div className="text-sm text-gray-600">Alert was triggered incorrectly</div>
              </button>
              <button className="w-full p-3 text-left border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
                <div className="font-medium text-red-900">Escalate</div>
                <div className="text-sm text-red-600">Requires further investigation</div>
              </button>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowActionModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialOversight;