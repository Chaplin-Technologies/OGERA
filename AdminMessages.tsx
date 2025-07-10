import React, { useState } from 'react';
import { MessageCircle, Send, Search, Filter, Users, Building2, GraduationCap, AlertTriangle, CheckCircle, Clock, Star, Podcast as Broadcast, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminMessages: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('conversations');
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastTarget, setBroadcastTarget] = useState('all');

  // Mock conversations
  const conversations = [
    {
      id: '1',
      participantName: 'Alice Johnson',
      participantRole: 'student',
      participantId: '1',
      lastMessage: 'Thank you for approving my academic verification!',
      timestamp: '2024-01-25T14:30:00Z',
      unreadCount: 0,
      priority: 'normal',
      category: 'verification'
    },
    {
      id: '2',
      participantName: 'TechCorp Solutions',
      participantRole: 'employer',
      participantId: '2',
      lastMessage: 'We need help with a payment issue for job #1234',
      timestamp: '2024-01-25T12:15:00Z',
      unreadCount: 2,
      priority: 'high',
      category: 'payment'
    },
    {
      id: '3',
      participantName: 'Michael Chen',
      participantRole: 'student',
      participantId: '3',
      lastMessage: 'My account was locked, can you help me understand why?',
      timestamp: '2024-01-25T10:45:00Z',
      unreadCount: 1,
      priority: 'urgent',
      category: 'account'
    }
  ];

  // Mock messages for selected thread
  const mockMessages = [
    {
      id: '1',
      senderId: '1',
      senderName: 'Alice Johnson',
      senderRole: 'student',
      content: 'Hi, I uploaded my report card yesterday but it\'s still showing as pending. Can you help?',
      timestamp: '2024-01-25T10:30:00Z',
      read: true
    },
    {
      id: '2',
      senderId: 'admin-1',
      senderName: 'Admin Support',
      senderRole: 'admin',
      content: 'Hi Alice! I can see your report card submission. Let me review it now and get back to you shortly.',
      timestamp: '2024-01-25T10:45:00Z',
      read: true
    },
    {
      id: '3',
      senderId: 'admin-1',
      senderName: 'Admin Support',
      senderRole: 'admin',
      content: 'Great news! Your academic verification has been approved. Your GPA of 3.8 has been confirmed. Keep up the excellent work!',
      timestamp: '2024-01-25T11:00:00Z',
      read: true
    }
  ];

  const sendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending admin message:', messageText);
      setMessageText('');
    }
  };

  const sendBroadcast = () => {
    if (broadcastMessage.trim()) {
      console.log(`Sending broadcast to ${broadcastTarget}:`, broadcastMessage);
      setBroadcastMessage('');
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return <GraduationCap className="h-4 w-4 text-purple-500" />;
      case 'employer':
        return <Building2 className="h-4 w-4 text-blue-500" />;
      default:
        return <User className="h-4 w-4 text-green-500" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'text-purple-600';
      case 'employer':
        return 'text-blue-600';
      default:
        return 'text-green-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'verification':
        return 'bg-blue-100 text-blue-800';
      case 'payment':
        return 'bg-green-100 text-green-800';
      case 'account':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Admin Messages 💬</h1>
        <p className="text-teal-100">
          Communicate with users and send platform-wide announcements
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'conversations', label: 'Conversations', icon: MessageCircle },
            { id: 'broadcast', label: 'Broadcast Messages', icon: Broadcast }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
                  activeTab === tab.id
                    ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'conversations' ? (
          <div className="flex h-[600px]">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedThread(conversation.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedThread === conversation.id ? 'bg-teal-50 border-teal-200' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                          {conversation.participantName.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {conversation.participantName}
                            </h3>
                            {getRoleIcon(conversation.participantRole)}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">
                              {new Date(conversation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {conversation.unreadCount > 0 && (
                              <span className="bg-teal-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                {conversation.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-1">
                          {conversation.priority !== 'normal' && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(conversation.priority)}`}>
                              {conversation.priority}
                            </span>
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(conversation.category)}`}>
                            {conversation.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedThread ? (
                <>
                  {/* Chat Header */}
                  <div className="border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                          {conversations.find(c => c.id === selectedThread)?.participantName.charAt(0)}
                        </div>
                        <div>
                          <h2 className="font-semibold text-gray-900">
                            {conversations.find(c => c.id === selectedThread)?.participantName}
                          </h2>
                          <div className="flex items-center space-x-2">
                            {getRoleIcon(conversations.find(c => c.id === selectedThread)?.participantRole || '')}
                            <span className={`text-sm ${getRoleColor(conversations.find(c => c.id === selectedThread)?.participantRole || '')}`}>
                              {conversations.find(c => c.id === selectedThread)?.participantRole}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-teal-100 text-teal-800 rounded-lg text-sm hover:bg-teal-200 transition-colors">
                          View Profile
                        </button>
                        <button className="px-3 py-1 bg-red-100 text-red-800 rounded-lg text-sm hover:bg-red-200 transition-colors">
                          Close Ticket
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {mockMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderRole === 'admin' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderRole === 'admin'
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {message.senderRole !== 'admin' && (
                            <div className="flex items-center space-x-2 mb-1">
                              {getRoleIcon(message.senderRole)}
                              <span className={`text-xs font-medium ${getRoleColor(message.senderRole)}`}>
                                {message.senderName}
                              </span>
                            </div>
                          )}
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className={`text-xs ${
                              message.senderRole === 'admin' ? 'text-teal-200' : 'text-gray-500'
                            }`}>
                              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {message.senderRole === 'admin' && (
                              <CheckCircle className="h-3 w-3 text-teal-200" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          placeholder="Type your response..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        onClick={sendMessage}
                        disabled={!messageText.trim()}
                        className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Broadcast Messages */
          <div className="p-6">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Broadcast Message</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Audience
                  </label>
                  <select
                    value={broadcastTarget}
                    onChange={(e) => setBroadcastTarget(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="all">All Users</option>
                    <option value="students">Students Only</option>
                    <option value="employers">Employers Only</option>
                    <option value="verified">Verified Users Only</option>
                    <option value="premium">Premium Users Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Type your broadcast message here..."
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={sendBroadcast}
                    disabled={!broadcastMessage.trim()}
                    className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Broadcast className="h-5 w-5" />
                    <span>Send Broadcast</span>
                  </button>
                  <button
                    onClick={() => setBroadcastMessage('')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Recent Broadcasts */}
              <div className="mt-8">
                <h4 className="font-medium text-gray-900 mb-4">Recent Broadcasts</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">Platform Maintenance Notice</span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Scheduled maintenance will occur tonight from 2-4 AM EAT...</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">All Users</span>
                      <span className="text-xs text-gray-500">Sent to 1,247 users</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">New Premium Features Available</span>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Exciting new features are now available for premium students...</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Students Only</span>
                      <span className="text-xs text-gray-500">Sent to 847 users</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;