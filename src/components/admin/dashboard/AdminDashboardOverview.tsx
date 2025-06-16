import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  Leaf, 
  CreditCard, 
  DollarSign, 
  AlertTriangle,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Calendar,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart3,
  Activity,
  Plus,
  Download,
  PieChart
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LineChart, Line, Area, AreaChart } from "recharts";

export const AdminDashboardOverview = () => {
  const kpiData = [
    {
      title: "Total Members",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "blue",
      action: "View All Members"
    },
    {
      title: "Active Subscriptions", 
      value: "892",
      change: "+8%",
      trend: "up",
      icon: CreditCard,
      color: "green",
      action: "Manage Subscriptions"
    },
    {
      title: "Pending Applications",
      value: "38",
      change: "-5%",
      trend: "down",
      icon: FileText,
      color: "yellow",
      action: "Review Applications"
    },
    {
      title: "Monthly Revenue",
      value: "₦2.4M",
      change: "+15%",
      trend: "up",
      icon: DollarSign,
      color: "purple",
      action: "View Reports"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-50",
        icon: "text-blue-600",
        text: "text-blue-900",
        border: "border-blue-200"
      },
      green: {
        bg: "bg-green-50",
        icon: "text-green-600", 
        text: "text-green-900",
        border: "border-green-200"
      },
      yellow: {
        bg: "bg-yellow-50",
        icon: "text-yellow-600",
        text: "text-yellow-900", 
        border: "border-yellow-200"
      },
      purple: {
        bg: "bg-purple-50",
        icon: "text-purple-600",
        text: "text-purple-900",
        border: "border-purple-200"
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const recentActivities = [
    {
      icon: Users,
      title: "New Member Registration",
      description: "John Doe joined as a professional member",
      time: "2 hours ago",
      type: "success"
    },
    {
      icon: FileText,
      title: "SAR Application Submitted",
      description: "Application #SAR-2024-004 requires review",
      time: "3 hours ago",
      type: "warning"
    },
    {
      icon: CreditCard,
      title: "Subscription Renewed",
      description: "Annual subscription processed successfully",
      time: "5 hours ago",
      type: "success"
    },
    {
      icon: AlertTriangle,
      title: "New Complaint Filed",
      description: "Complaint #CMP-2024-012 needs attention",
      time: "1 day ago",
      type: "error"
    }
  ];

  const quickActions = [
    { icon: Plus, label: "Add News Article", color: "bg-[#118AB2]" },
    { icon: Calendar, label: "Create Event", color: "bg-[#06D6A0]" },
    { icon: CreditCard, label: "Process Subscription", color: "bg-[#FFD166]" },
    { icon: BarChart3, label: "Generate Report", color: "bg-[#073B4C]" },
    { icon: Users, label: "Add User", color: "bg-gray-600" },
    { icon: Download, label: "Export Data", color: "bg-red-600" }
  ];

  const chartData = [
    { name: "SAR", value: 400, color: "#06D6A0" },
    { name: "EIAR", value: 300, color: "#118AB2" },
    { name: "Subscriptions", value: 200, color: "#FFD166" },
    { name: "Complaints", value: 100, color: "#EF476F" },
  ];

  const monthlyData = [
    { month: "Jan", applications: 65, revenue: 2.4 },
    { month: "Feb", applications: 75, revenue: 2.8 },
    { month: "Mar", applications: 85, revenue: 3.2 },
    { month: "Apr", applications: 95, revenue: 3.6 },
    { month: "May", applications: 88, revenue: 3.8 },
    { month: "Jun", applications: 92, revenue: 4.2 },
  ];

  const weeklyData = [
    { day: "Mon", users: 120 },
    { day: "Tue", users: 132 },
    { day: "Wed", users: 101 },
    { day: "Thu", users: 134 },
    { day: "Fri", users: 90 },
    { day: "Sat", users: 230 },
    { day: "Sun", users: 210 },
  ];

  const chartConfig = {
    applications: {
      label: "Applications",
      color: "#06D6A0",
    },
    revenue: {
      label: "Revenue (M)",
      color: "#118AB2",
    },
    users: {
      label: "Users",
      color: "#FFD166",
    },
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              <BarChart3 className="h-10 w-10 mr-3" />
              Welcome back, Administrator! 👋
            </h1>
            <p className="text-green-100 text-lg">
              Here's what's happening with your NITP Abuja Chapter today.
            </p>
          </div>
          <div className="text-right">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-green-100">Today</p>
              <p className="text-2xl font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const colors = getColorClasses(kpi.color);
          const IconComponent = kpi.icon;
          
          return (
            <Card key={index} className={`${colors.bg} ${colors.border} border-2 hover:shadow-lg transition-all duration-300 hover:scale-105`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${colors.bg}`}>
                    <IconComponent className={`h-6 w-6 ${colors.icon}`} />
                  </div>
                  <Badge variant={kpi.trend === "up" ? "default" : "destructive"} className="text-xs">
                    {kpi.change}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-600">{kpi.title}</h3>
                  <p className={`text-3xl font-bold ${colors.text}`}>{kpi.value}</p>
                  <Button variant="ghost" size="sm" className={`${colors.text} hover:${colors.bg} p-0 h-auto`}>
                    {kpi.action}
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts and Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Application Distribution Pie Chart */}
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-green-800 flex items-center">
              <PieChart className="h-6 w-6 mr-2" />
              Application Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <RechartsPieChart data={chartData}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card className="lg:col-span-2 shadow-sm border-0 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-green-800 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2" />
              Monthly Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#06D6A0" 
                    fill="#06D6A0" 
                    fillOpacity={0.3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#118AB2" 
                    fill="#118AB2" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity and Application Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly User Activity */}
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-green-800 flex items-center">
              <Activity className="h-6 w-6 mr-2" />
              Weekly User Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="users" fill="#FFD166" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Application Status Overview */}
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-green-800 flex items-center">
                <Activity className="h-6 w-6 mr-2" />
                Application Overview
              </CardTitle>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-700">156</div>
                <div className="text-sm text-green-600">Approved</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-700">38</div>
                <div className="text-sm text-blue-600">Under Review</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <AlertCircle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-700">12</div>
                <div className="text-sm text-yellow-600">Needs Revision</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
                <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-700">8</div>
                <div className="text-sm text-red-600">Rejected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-green-800 flex items-center">
              <Clock className="h-6 w-6 mr-2" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const IconComponent = activity.icon;
                const typeColors = {
                  success: "bg-green-100 text-green-600",
                  warning: "bg-yellow-100 text-yellow-600", 
                  error: "bg-red-100 text-red-600"
                };
                
                return (
                  <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-full ${typeColors[activity.type as keyof typeof typeColors]}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500 truncate">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-green-800 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                
                return (
                  <Button
                    key={index}
                    className={`${action.color} hover:opacity-90 text-white h-auto p-4 flex flex-col items-center space-y-2 transition-all duration-200 hover:scale-105`}
                  >
                    <IconComponent className="h-6 w-6" />
                    <span className="text-xs text-center leading-tight">{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
