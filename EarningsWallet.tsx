import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Download, 
  CreditCard, 
  Smartphone, 
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Filter
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Student } from '../../types';
import { mockTransactions } from '../../data/mockData';

const EarningsWallet: React.FC = () => {
  const { user } = useAuth();
  const student = user as Student;
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('mpesa');
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const withdrawalMethods = [
    { id: 'mpesa', name: 'M-Pesa', icon: Smartphone, fee: 0 },
    { id: 'mtn', name: 'MTN MoMo', icon: Smartphone, fee: 0 },
    { id: 'airtel', name: 'Airtel Money', icon: Smartphone, fee: 0 },
    { id: 'bank', name: 'Bank Transfer', icon: CreditCard, fee: 2.5 }
  ];

  const filteredTransactions = mockTransactions.filter(transaction => {
    if (filterType === 'all') return true;
    return transaction.type === filterType;
  });

  const handleWithdrawal = () => {
    const amount = parseFloat(withdrawalAmount);
    if (amount > 0 && amount <= student.withdrawableBalance) {
      // Simulate withdrawal process
      setShowWithdrawal(false);
      setWithdrawalAmount('');
      // In real app, this would trigger the withdrawal API
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earning':
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case 'withdrawal':
        return <ArrowDownLeft className="h-4 w-4 text-blue-500" />;
      case 'bonus':
        return <TrendingUp className="h-4 w-4 text-purple-500" />;
      case 'penalty':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'earning':
      case 'bonus':
        return 'text-green-600';
      case 'withdrawal':
        return 'text-blue-600';
      case 'penalty':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Earnings & Wallet 💰</h1>
            <p className="text-green-100 mb-4">
              Manage your earnings and withdraw funds anytime with no minimum balance
            </p>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
              <DollarSign className="h-4 w-4 mr-2" />
              Total Earned: ${student.totalEarnings.toLocaleString()}
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
              alt="Financial Success"
              className="w-24 h-24 rounded-full border-4 border-white/20"
            />
          </div>
        </div>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-green-600">Available</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            ${student.withdrawableBalance.toLocaleString()}
          </h3>
          <p className="text-gray-600 text-sm">Withdrawable Balance</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-blue-600">Pending</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            ${(student.currentBalance - student.withdrawableBalance).toLocaleString()}
          </h3>
          <p className="text-gray-600 text-sm">In Escrow</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-purple-600">This Month</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">$420</h3>
          <p className="text-gray-600 text-sm">Monthly Earnings</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={() => setShowWithdrawal(true)}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
              <Download className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Withdraw Funds</h3>
              <p className="text-sm text-gray-600">No minimum balance required</p>
            </div>
          </div>
        </button>
        
        <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Earnings Report</h3>
              <p className="text-sm text-gray-600">Download detailed report</p>
            </div>
          </div>
        </button>
      </div>

      {/* Withdrawal Modal */}
      {showWithdrawal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Withdraw Funds</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount to Withdraw
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0.00"
                  max={student.withdrawableBalance}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Available: ${student.withdrawableBalance.toLocaleString()}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Withdrawal Method
              </label>
              <div className="space-y-2">
                {withdrawalMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full flex items-center justify-between p-3 border rounded-lg transition-colors ${
                        selectedMethod === method.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-gray-600" />
                        <span className="font-medium text-gray-900">{method.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {method.fee === 0 ? 'Free' : `${method.fee}% fee`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowWithdrawal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdrawal}
                disabled={!withdrawalAmount || parseFloat(withdrawalAmount) <= 0}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction History */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
          <div className="flex items-center space-x-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Transactions</option>
              <option value="earning">Earnings</option>
              <option value="withdrawal">Withdrawals</option>
              <option value="bonus">Bonuses</option>
            </select>
            <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">{transaction.description}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(transaction.timestamp).toLocaleDateString()} at{' '}
                    {new Date(transaction.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="text-right flex items-center space-x-3">
                <div>
                  <div className={`font-semibold text-sm ${getTransactionColor(transaction.type)}`}>
                    {transaction.type === 'withdrawal' ? '-' : '+'}${transaction.amount.toLocaleString()}
                  </div>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(transaction.status)}
                    <span className="text-xs text-gray-500 capitalize">{transaction.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
            Load More Transactions
          </button>
        </div>
      </div>

      {/* Earnings Insights */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Earnings Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">$306</div>
            <p className="text-sm text-gray-600">Average per job</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">2.3 days</div>
            <p className="text-sm text-gray-600">Average completion time</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">94%</div>
            <p className="text-sm text-gray-600">On-time delivery rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsWallet;