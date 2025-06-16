import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  FileText, 
  Calendar, 
  CreditCard, 
  Bell, 
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { SubscriptionCard } from "@/components/dashboard/SubscriptionCard";
import { ApplicationStatusCard } from "@/components/dashboard/ApplicationStatusCard";
import { ActivityFeedCard } from "@/components/dashboard/ActivityFeedCard";
import { MemberToolsCard } from "@/components/dashboard/MemberToolsCard";
import { useNavigate } from "react-router-dom";

// Mock data - in real app this would come from API
const mockMemberData = {
  name: "John Doe",
  membershipId: "TP-A32123456",
  membershipType: "professional" as const,
  subscriptionStatus: "active" as const,
  subscriptionExpiry: "2024-12-31",
  creditBalance: 2500,
};

const mockApplications = [
  {
    id: "SAR-001",
    type: "SAR" as const,
    title: "Residential Development SAR",
    projectTitle: "Residential Development Project",
    status: "approved" as const,
    submissionDate: "2024-01-15",
    amount: 50000
  },
  {
    id: "EIAR-002", 
    type: "EIAR" as const,
    title: "Commercial Complex EIAR",
    projectTitle: "Commercial Complex Development",
    status: "under_review" as const,
    submissionDate: "2024-02-10",
    amount: 75000
  }
];

const mockActivities = [
  {
    id: "1",
    type: "application" as const,
    title: "SAR Application Submitted",
    description: "Your SAR application for Residential Development has been submitted successfully.",
    timestamp: "2024-01-15T10:30:00Z",
    isRead: false
  },
  {
    id: "2",
    type: "payment" as const, 
    title: "Payment Processed",
    description: "Payment of ₦50,000 for Professional Membership renewal has been processed.",
    timestamp: "2024-01-10T14:20:00Z",
    isRead: true
  }
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const sidebarItems = [
    { icon: User, label: "My Profile", path: "/profile" },
    { icon: CreditCard, label: "Subscriptions", path: "/subscriptions" },
    { icon: FileText, label: "Applications", submenu: [
      { label: "SAR Application", path: "/applications/sar" },
      { label: "EIAR Application", path: "/applications/eiar" }
    ]},
    { icon: Calendar, label: "Events", path: "/events" },
    { icon: Bell, label: "Notifications", path: "#" },
    { icon: Settings, label: "Settings", path: "#" },
  ];

  const handleNavigation = (path: string) => {
    if (path !== "#") {
      navigate(path);
    }
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigate("/");
  };

  const handlePurchaseCredits = () => {
    console.log("Purchase credits");
  };

  const handleUseTool = (tool: string) => {
    console.log("Use tool:", tool);
  };

  const handleNewApplication = () => {
    navigate("/applications/sar");
  };

  const handleViewApplication = (applicationId: string) => {
    console.log("View application:", applicationId);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h2 className="text-lg font-semibold text-[#073B4C]">NITP Abuja</h2>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {sidebarItems.map((item, index) => (
              <div key={index}>
                {item.submenu ? (
                  <div>
                    <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </div>
                    <div className="ml-8 space-y-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => handleNavigation(subItem.path)}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className="flex items-center space-x-3 w-full px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleNavigation("/profile")}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-green-600">
                    {mockMemberData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="hidden md:block">{mockMemberData.name}</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {mockMemberData.name.split(' ')[0]}!
            </h2>
            <p className="text-gray-600">
              Membership ID: {mockMemberData.membershipId} | {mockMemberData.membershipType.toUpperCase()} Member
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <SubscriptionCard
                membershipType={mockMemberData.membershipType}
                status={mockMemberData.subscriptionStatus}
                expirationDate={mockMemberData.subscriptionExpiry}
                onRenew={() => handleNavigation("/subscriptions")}
              />
            </div>
            <div>
              <MemberToolsCard 
                creditBalance={mockMemberData.creditBalance}
                onPurchaseCredits={handlePurchaseCredits}
                onUseTool={handleUseTool}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ApplicationStatusCard 
              applications={mockApplications}
              onNewApplication={handleNewApplication}
              onViewApplication={handleViewApplication}
            />
            <ActivityFeedCard activities={mockActivities} />
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
