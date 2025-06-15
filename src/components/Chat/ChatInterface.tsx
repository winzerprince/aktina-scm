
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, Search, Phone, Video, MoreVertical } from 'lucide-react';

interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
}

interface ChatContact {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  isOnline: boolean;
  isAI?: boolean;
}

interface ChatInterfaceProps {
  userRole: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ userRole }) => {
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [contacts, setContacts] = useState<ChatContact[]>([
    {
      id: 'ai-assistant',
      name: 'Aktina AI Assistant',
      role: 'AI Support',
      avatar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
      lastMessage: 'How can I help you today?',
      lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
      unreadCount: 0,
      isOnline: true,
      isAI: true
    },
    {
      id: 'admin-1',
      name: 'Sarah Johnson',
      role: 'System Administrator',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=400',
      lastMessage: 'The quarterly reports are ready for review',
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
      unreadCount: 2,
      isOnline: true
    },
    {
      id: 'supplier-1',
      name: 'TechSupply Corp',
      role: 'Supplier',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      lastMessage: 'New shipment arriving tomorrow',
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 1,
      isOnline: false
    },
    {
      id: 'retailer-1',
      name: 'TechMart Electronics',
      role: 'Retailer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      lastMessage: 'Order #12345 status update needed',
      lastMessageTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
      unreadCount: 0,
      isOnline: true
    },
    {
      id: 'hr-1',
      name: 'Mike Chen',
      role: 'HR Manager',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      lastMessage: 'Team meeting scheduled for Monday',
      lastMessageTime: new Date(Date.now() - 6 * 60 * 60 * 1000),
      unreadCount: 3,
      isOnline: false
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (contact.role && contact.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mark messages as read when selecting a contact
  const handleContactSelect = (contact: ChatContact) => {
    setSelectedContact(contact);
    
    // Mark all messages as read and reset unread count
    setContacts(prev => prev.map(c => 
      c.id === contact.id ? { ...c, unreadCount: 0 } : c
    ));
  };

  useEffect(() => {
    if (selectedContact?.id === 'ai-assistant') {
      setMessages([
        {
          id: '1',
          senderId: 'ai-assistant',
          text: 'Hello! I\'m your AI assistant. How can I help you today?',
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          isRead: true
        },
        {
          id: '2',
          senderId: 'ai-assistant',
          text: 'I can help you with order management, analytics insights, system information, and much more!',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          isRead: true
        }
      ]);
    } else if (selectedContact) {
      setMessages([
        {
          id: '1',
          senderId: selectedContact.id,
          text: selectedContact.lastMessage || 'Hello!',
          timestamp: selectedContact.lastMessageTime || new Date(),
          isRead: true
        }
      ]);
    }
  }, [selectedContact]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedContact) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'current-user',
      text: message,
      timestamp: new Date(),
      isRead: false
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Update last message and timestamp for the contact
    setContacts(prev => prev.map(contact => 
      contact.id === selectedContact.id 
        ? { 
            ...contact, 
            lastMessage: message,
            lastMessageTime: new Date()
          }
        : contact
    ));
    
    setMessage('');

    // Simulate response based on contact type
    if (selectedContact.isAI) {
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          senderId: 'ai-assistant',
          text: getAIResponse(message),
          timestamp: new Date(),
          isRead: false
        };
        setMessages(prev => [...prev, aiResponse]);
        
        // Update contact's last message with AI response
        setContacts(prev => prev.map(contact => 
          contact.id === selectedContact.id 
            ? { 
                ...contact, 
                lastMessage: aiResponse.text,
                lastMessageTime: aiResponse.timestamp
              }
            : contact
        ));
      }, 1000);
    } else {
      // Simulate response from other contacts after a delay
      setTimeout(() => {
        const responses = [
          "Thanks for your message! I'll get back to you soon.",
          "Got it, let me check on that for you.",
          "I'll review this and respond shortly.",
          "Thanks for the update!",
          "Let me look into this and get back to you."
        ];
        
        const response: ChatMessage = {
          id: (Date.now() + 1).toString(),
          senderId: selectedContact.id,
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
          isRead: false
        };
        
        setMessages(prev => [...prev, response]);
        
        // Update contact's last message
        setContacts(prev => prev.map(contact => 
          contact.id === selectedContact.id 
            ? { 
                ...contact, 
                lastMessage: response.text,
                lastMessageTime: response.timestamp
              }
            : contact
        ));
      }, 2000 + Math.random() * 3000); // Random delay between 2-5 seconds
    }
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // More intelligent AI responses based on message content
    if (lowerMessage.includes('help') || lowerMessage.includes('assist')) {
      return "I'm here to help! I can assist with analytics, order management, system navigation, and answer questions about your " + userRole + " dashboard.";
    }
    if (lowerMessage.includes('order') || lowerMessage.includes('purchase')) {
      return "I can help you with order management. Would you like to check order status, create new orders, or review order analytics?";
    }
    if (lowerMessage.includes('report') || lowerMessage.includes('analytics')) {
      return "I can generate reports and provide analytics insights. What specific data would you like to analyze?";
    }
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! How can I assist you with your " + userRole + " tasks today?";
    }
    
    const responses = [
      "Based on your role as " + userRole + ", I can provide specific insights for your needs.",
      "That's a great question! I'm processing your request and can help you with that.",
      "I understand. Let me provide you with the relevant information for your operations.",
      "Thank you for reaching out. I'm here to assist with any questions about the platform.",
      "I can help you optimize your workflow. What specific area would you like to focus on?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  // Simulate random online status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setContacts(prev => prev.map(contact => {
        // Don't change AI status
        if (contact.isAI) return contact;
        
        // 10% chance to toggle online status
        if (Math.random() < 0.1) {
          return { ...contact, isOnline: !contact.isOnline };
        }
        return contact;
      }));
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Calculate total unread messages
  const totalUnreadMessages = contacts.reduce((sum, contact) => sum + contact.unreadCount, 0);

  return (
    <div className="flex h-[600px] border rounded-lg overflow-hidden">
      {/* Contacts List */}
      <div className="w-1/3 border-r bg-gray-50 dark:bg-gray-900">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Messages</h3>
            {totalUnreadMessages > 0 && (
              <Badge className="bg-aktina-primary text-white">
                {totalUnreadMessages} unread
              </Badge>
            )}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => handleContactSelect(contact)}
              className={`flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer border-b ${
                selectedContact?.id === contact.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback>
                    {contact.isAI ? <Bot className="h-6 w-6" /> : contact.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {contact.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="font-medium truncate">{contact.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {contact.lastMessageTime && formatTime(contact.lastMessageTime)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground truncate">
                    {contact.lastMessage}
                  </div>
                  {contact.unreadCount > 0 && (
                    <Badge className="bg-aktina-primary text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                      {contact.unreadCount}
                    </Badge>
                  )}
                </div>
                {contact.role && (
                  <div className="text-xs text-muted-foreground">{contact.role}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white dark:bg-gray-950 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                  <AvatarFallback>
                    {selectedContact.isAI ? <Bot className="h-5 w-5" /> : selectedContact.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedContact.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${selectedContact.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    {selectedContact.isOnline ? 'Online' : 'Offline'} • {selectedContact.role}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.senderId === 'current-user'
                        ? 'bg-aktina-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-foreground'
                    }`}
                  >
                    <div className="text-sm">{msg.text}</div>
                    <div
                      className={`text-xs mt-1 ${
                        msg.senderId === 'current-user'
                          ? 'text-blue-100'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white dark:bg-gray-950">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-aktina-primary hover:bg-aktina-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Bot className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Select a contact to start chatting</h3>
              <p className="text-muted-foreground">Choose from your contacts or start with the AI assistant</p>
              {totalUnreadMessages > 0 && (
                <p className="text-aktina-primary font-medium mt-2">
                  You have {totalUnreadMessages} unread message{totalUnreadMessages > 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
