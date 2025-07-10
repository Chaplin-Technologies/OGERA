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
  GraduationCap,
  Shield,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Employer } from '../../types';

const EmployerMessages: React.FC = () => {
  const { user } = useAuth();
  const employer = user as Employer;
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock conversations
  const conversations = [
    {
      id: '1',
      participantName: 'Alice Johnson',
      participantRole: 'student',
      university: 'University of Technology',
      lastMessage: 'Thank you for the opportunity! I\'m excited to start working on this project.',
      timestamp: '2024-01-25T14:30:00Z',
      unreadCount: 0,
      jobTitle: 'Frontend Developer Intern',
      gpa: 3.8
    },
    {
      id: '2',
      participantName: 'Michael Chen',
      participantRole: 'student',
      university: 'Business College',
      lastMessage: 'I have a question about the data analysis requirements.',
      timestamp: '2024-01-25T12:15:00Z',
      unreadCount: 2,
      jobTitle: 'Data Analysis Assistant',
      gpa: 3.6
    },
    {
      id: '3',
      participantName: 'Admin Support',
      participantRole: 'admin',
      university: 'Ogera Platform',
      lastMessage: 'Your job posting has been approved and is now live.',
      timestamp: '2024-01-25T10:45:00Z',
      unreadCount: 0,
      jobTitle: null,
      gpa: null
    }
  ];

  // Mock messages for selected thread
  const mockMessages = [
    {
      id: '1',
      senderId: '1',
      senderName: 'Alice Johnson',
      senderRole: 'student',
      content: 'Hi! I\'m very interested in the Frontend Developer position. I have experience with React and TypeScript.',
      timestamp: '2024-01-25T10:30:00Z',
      read: true
    },
    {
      id: '2',
      senderId: '2',
      senderName: 'John Smith',
      senderRole: 'employer',
      content: 'Great! I reviewed your portfolio and I\'m impressed. Can you tell me more about your experience with responsive design?',
      timestamp: '2024-01-25T10:45:00Z',
      read: true
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'Alice Johnson',
      senderRole: 'student',
      content: 'I\'ve worked on several responsive projects using CSS Grid and Flexbox. I also have experience with Tailwind CSS.',
      timestamp: '2024-01-25T11:00:00Z',
      read: true
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
      case 'student':
        return <GraduationCap className="h-4 w-4 text-purple-500" />;
      case 'admin':
        return <Shield className="h-4 w-4 text-green-500" />;
      default:
        return <Briefcase className="h-4 w-4 text-blue-500" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'text-purple-600';
      case 'admin':
        return 'text-green-600';
      default:
        return 'text-blue-600';
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                selectedThread === conversation.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
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
                        <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className={`text-sm ${getRoleColor(conversation.participantRole)} mb-1`}>
                    {conversation.university}
                  </p>
                  {conversation.jobTitle && (
                    <p className="text-xs text-gray-500 mb-1">Re: {conversation.jobTitle}</p>
                  )}
                  {conversation.gpa && (
                    <p className="text-xs text-green-600 mb-1">GPA: {conversation.gpa}</p>
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
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                    {conversations.find(c => c.id === selectedThread)?.participantName.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {conversations.find(c => c.id === selectedThread)?.participantName}
                    </h2>
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(conversations.find(c => c.id === selectedThread)?.participantRole || '')}
                      <span className={`text-sm ${getRoleColor(conversations.find(c => c.id === selectedThread)?.participantRole || '')}`}>
                        {conversations.find(c => c.id === selectedThread)?.university}
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
                  className={`flex ${message.senderId === employer.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === employer.id
                      ? 'bg-blue-600 text-white'
                      : message.senderRole === 'admin'
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {message.senderId !== employer.id && (
                      <div className="flex items-center space-x-2 mb-1">
                        {getRoleIcon(message.senderRole)}
                        <span className={`text-xs font-medium ${
                          message.senderRole === 'admin' ? 'text-green-600' : 'text-purple-600'
                        }`}>
                          {message.senderName}
                        </span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-xs ${
                        message.senderId === employer.id ? 'text-blue-200' : 'text-gray-500'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {message.senderId === employer.id && (
                        <CheckCircle className="h-3 w-3 text-blue-200" />
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!messageText.trim()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
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

export default EmployerMessages;