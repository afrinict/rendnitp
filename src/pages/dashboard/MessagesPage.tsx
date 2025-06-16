import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bell,
  MessageSquare,
  Search,
  Archive,
  Trash2,
  Mail,
  AlertCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual data from your backend
  const messages = [
    {
      id: 1,
      type: 'message',
      sender: 'NITP Admin',
      subject: 'Membership Renewal Reminder',
      content: 'Your membership is due for renewal in 30 days...',
      date: '2023-10-20',
      isRead: false,
    },
    {
      id: 2,
      type: 'message',
      sender: 'System',
      subject: 'SAR Application Status Update',
      content: 'Your SAR application #SAR-2023-001 has been approved...',
      date: '2023-10-19',
      isRead: true,
    },
  ];

  const notifications = [
    {
      id: 1,
      type: 'notification',
      title: 'New CPD Course Available',
      content: 'A new course on Urban Planning Fundamentals is now available...',
      date: '2023-10-20',
      isRead: false,
    },
    {
      id: 2,
      type: 'notification',
      title: 'Upcoming Webinar',
      content: 'Join us for a webinar on Sustainable Urban Development...',
      date: '2023-10-18',
      isRead: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'notification':
        return <Bell className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Messages & Notifications</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
          <Button variant="outline">
            <Archive className="w-4 h-4 mr-2" />
            Archive All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="messages" className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>Messages</span>
            {messages.filter((m) => !m.isRead).length > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                {messages.filter((m) => !m.isRead).length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
            {notifications.filter((n) => !n.isRead).length > 0 && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                {notifications.filter((n) => !n.isRead).length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <Card
                key={message.id}
                className={`p-4 ${
                  !message.isRead ? 'border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {getIcon(message.type)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{message.subject}</h3>
                        {!message.isRead && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{message.content}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>From: {message.sender}</span>
                        <span>•</span>
                        <span>{message.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Archive className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-4 ${
                  !notification.isRead ? 'border-l-4 border-l-yellow-500' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {getIcon(notification.type)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{notification.title}</h3>
                        {!notification.isRead && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.content}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>{notification.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Archive className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 