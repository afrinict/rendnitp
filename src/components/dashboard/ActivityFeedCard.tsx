
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, FileText, CreditCard, Users, Calendar } from "lucide-react";

interface Activity {
  id: string;
  type: "application" | "payment" | "announcement" | "event" | "system";
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}

interface ActivityFeedCardProps {
  activities: Activity[];
}

const getActivityIcon = (type: Activity['type']) => {
  const iconMap = {
    application: <FileText className="w-4 h-4" />,
    payment: <CreditCard className="w-4 h-4" />,
    announcement: <Bell className="w-4 h-4" />,
    event: <Calendar className="w-4 h-4" />,
    system: <Users className="w-4 h-4" />,
  };
  return iconMap[type];
};

const getActivityColor = (type: Activity['type']) => {
  const colorMap = {
    application: "text-blue-500",
    payment: "text-green-500", 
    announcement: "text-yellow-500",
    event: "text-purple-500",
    system: "text-gray-500",
  };
  return colorMap[type];
};

export const ActivityFeedCard = ({ activities }: ActivityFeedCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="w-5 h-5" />
          <span>Recent Activity</span>
        </CardTitle>
        <CardDescription>
          Latest updates and notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No recent activity</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {activities.map((activity) => (
              <div 
                key={activity.id} 
                className={`flex items-start space-x-3 p-3 rounded-lg border ${
                  !activity.isRead ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                }`}
              >
                <div className={`${getActivityColor(activity.type)} mt-0.5`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm truncate">{activity.title}</p>
                    {!activity.isRead && (
                      <Badge className="bg-[#FF6B6B] text-white text-xs">New</Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
