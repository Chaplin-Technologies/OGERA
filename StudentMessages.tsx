import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Search, 
  Paperclip, 
  MoreVertical,
  Phone,
  Video,
  Info,
  Archive,
  Trash2,
  Star,
  Clock,
  CheckCircle,
  User,
  Building2,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Student } from '../../types';
import { mockMessageThreads } from '../../data/mockData';

const StudentMessages: React.FC = () => {
  const { user } = useAuth();
  const student = user as Student;
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock messages for the selected thread
  const mockMessages = [
    {
      id: '1',
      senderId: '2',
      senderName: 'John Smith',
      senderRole: 'employer',
      content: 'Hi Alice! I reviewed your application for the Frontend Developer position. Your portfolio looks impressive!',
      timestamp: '2024-01-25T10:30:00Z',
      read: true
    },
    {
      id: '2',
      senderId: '1',
      senderName: 'Alice Johnson',
      senderRole: 'student',
      content: 'Thank you so much! I\'m really excited about this opportunity. When would be a good time to discuss the project requirements?',
      timestamp: '2024-01-25T10:45:00Z',
      read: true
    },
    {
      id: '3',
      senderId: '2',
      senderName: 'John Smith',
      senderRole: 'employer',
      content: 'How about we schedule a call tomorrow at 2 PM? I can share more details about the project scope and timeline.',
      timestamp: '2024-01-25T11:00:00Z',
      read: true
    },
    {
      id: '4',
      senderId: '1',
      senderName: 'Alice Johnson',
      senderRole: 'student',
      content: 'Perfect! I\'ll be available at 2 PM tomorrow. Should I prepare anything specific for our discussion?',
      timestamp: '2024-01-25T11:15:00Z',
      read: true
    },
    {
      id: '5',
      senderId: '3',
      senderName: 'Admin',
      senderRole: 'admin',
      content: 'Your academic verification has been approved! Your GPA of 3.8 has been confirmed. Keep up the excellent work!',
      timestamp: '2024-01-25T14:20:00Z',
      read: false
    }
  ];

  // Mock conversation threads
  const conversations = [
    {
      id: '1',
      participantName: 'John Smith',
      participantRole: 'employer',
      company: 'TechCorp Solutions',
      lastMessage: 'How about we schedule a call tomorrow at 2 PM?',
      timestamp: '2024-01-25T11:00:00Z',
      unreadCount: 0,
      jobTitle: 'Frontend Developer Intern'
    },
    {
      id: '2',
      participantName: 'Sarah Wilson',
      participantRole: 'employer',
      company: 'DataInsights Inc',
      lastMessage: 'Great work on the data analysis project!',
      timestamp: '2024-01-24T16:30:00Z',
      unreadCount: 2,
      jobTitle: 'Data Analysis Assistant'
    },
    {
      id: '3',
      participantName: 'Admin',
      participantRole: 'admin',
      company: 'Elan Platform',
      lastMessage: 'Your academic verification has been approved!',
      timestamp: '2024-01-25T14:20:00Z',
      unreadCount: 1,
      jobTitle: null
    }
  ];

  const sendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'employer':
        return <Building2 className="h-4 w-4 text-blue-500" />;
      case 'admin':
        return <Shield className="h-4 w-4 text-green-500" />;
      default:
        return <User className="h-4 w-4 text-purple-500" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'employer':
        return 'text-blue-600';
      case 'admin':
        return 'text-green-600';
      default:
        return 'text-purple-600';
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Conversations List */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                selectedThread === conversation.id ? 'bg-purple-50 border-purple-200' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
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
                        <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className={`text-sm ${getRoleColor(conversation.participantRole)} mb-1`}>
                    {conversation.company}
                  </p>
                  {conversation.jobTitle && (
                    <p className="text-xs text-gray-500 mb-1">Re: {conversation.jobTitle}</p>
                  )}
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
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {conversations.find(c => c.id === selectedThread)?.participantName.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {conversations.find(c => c.id === selectedThread)?.participantName}
                    </h2>
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(conversations.find(c => c.id === selectedThread)?.participantRole || '')}
                      <span className={`text-sm ${getRoleColor(conversations.find(c => c.id === selectedThread)?.participantRole || '')}`}>
                        {conversations.find(c => c.id === selectedThread)?.company}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Info className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === student.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === student.id
                      ? 'bg-purple-600 text-white'
                      : message.senderRole === 'admin'
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {message.senderId !== student.id && (
                      <div className="flex items-center space-x-2 mb-1">
                        {getRoleIcon(message.senderRole)}
                        <span className={`text-xs font-medium ${
                          message.senderRole === 'admin' ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {message.senderName}
                        </span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-xs ${
                        message.senderId === student.id ? 'text-purple-200' : 'text-gray-500'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {message.senderId === student.id && (
                        <CheckCircle className="h-3 w-3 text-purple-200" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Paperclip className="h-5 w-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!messageText.trim()}
                  className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* No Conversation Selected */
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentMessages;