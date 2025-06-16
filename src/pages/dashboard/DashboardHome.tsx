import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CreditCard,
  Bell,
  FileText,
  Calendar,
  Wallet,
} from 'lucide-react';

export function DashboardHome() {
  // Mock data - replace with actual data from your backend
  const memberData = {
    name: 'Tpl. Aisha Bello, FNITP',
    membershipStatus: 'Active',
    membershipId: 'NITP/ABJ/2023/0123',
    membershipType: 'Professional Member',
    expirationDate: 'December 31, 2025',
    pendingApplications: 2,
    unreadMessages: 3,
    walletBalance: '₦25,000',
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome Back, {memberData.name}!
        </h1>
      </div>

      {/* Key Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Membership Status Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Membership Status</h3>
              <p className={`text-2xl font-bold ${
                memberData.membershipStatus === 'Active'
                  ? 'text-[#06D6A0]'
                  : memberData.membershipStatus === 'Expiring Soon'
                  ? 'text-[#FFD166]'
                  : 'text-[#EF476F]'
              }`}>
                {memberData.membershipStatus}
              </p>
              <p className="text-gray-600">Expiring on {memberData.expirationDate}</p>
            </div>
            <CreditCard className="w-8 h-8 text-gray-400" />
          </div>
          <Button className="mt-4 w-full">Renew Now</Button>
        </Card>

        {/* Membership ID Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Membership ID</h3>
              <p className="text-xl font-mono">{memberData.membershipId}</p>
              <p className="text-gray-600">{memberData.membershipType}</p>
            </div>
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
        </Card>

        {/* Applications Overview Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">SAR/EIAR Applications</h3>
              <p className="text-2xl font-bold text-gray-900">
                {memberData.pendingApplications} pending
              </p>
            </div>
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <Button variant="outline" className="mt-4 w-full">
            View All Applications
          </Button>
        </Card>

        {/* Notifications Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <p className="text-2xl font-bold text-gray-900">
                {memberData.unreadMessages} unread
              </p>
            </div>
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
          <Button variant="outline" className="mt-4 w-full">
            View Messages
          </Button>
        </Card>

        {/* Wallet Balance Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Wallet Balance</h3>
              <p className="text-2xl font-bold text-gray-900">
                {memberData.walletBalance}
              </p>
            </div>
            <Wallet className="w-8 h-8 text-gray-400" />
          </div>
          <Button variant="outline" className="mt-4 w-full">
            Top Up
          </Button>
        </Card>

        {/* Upcoming Events Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
              <p className="text-gray-600">Next event in 3 days</p>
            </div>
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <Button variant="outline" className="mt-4 w-full">
            View Calendar
          </Button>
        </Card>
      </div>

      {/* Recent Activity Feed */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {/* Mock activity items - replace with actual data */}
          <div className="flex items-start space-x-4">
            <div className="w-2 h-2 mt-2 rounded-full bg-[#118AB2]"></div>
            <div>
              <p className="text-gray-900">Your SAR application #1234 has been approved</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-2 h-2 mt-2 rounded-full bg-[#06D6A0]"></div>
            <div>
              <p className="text-gray-900">New CPD course available: Urban Planning Fundamentals</p>
              <p className="text-sm text-gray-500">1 day ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-2 h-2 mt-2 rounded-full bg-[#FFD166]"></div>
            <div>
              <p className="text-gray-900">Upcoming webinar: Sustainable Urban Development</p>
              <p className="text-sm text-gray-500">2 days ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 