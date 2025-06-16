
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Calendar, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Download,
  RefreshCw,
  ArrowLeft
} from "lucide-react";
import { SubscriptionCard } from "@/components/dashboard/SubscriptionCard";
import { useToast } from "@/hooks/use-toast";

// Mock data - in real app this would come from API
const mockMemberData = {
  name: "John Doe",
  membershipId: "TP-A32123456",
  membershipType: "professional" as const,
  subscriptionStatus: "active" as const,
  subscriptionExpiry: "2024-12-31",
  creditBalance: 2500,
};

const mockPaymentHistory = [
  {
    id: "1",
    date: "2024-01-15",
    amount: 50000,
    status: "completed",
    description: "Professional Annual Membership",
    invoiceUrl: "#"
  },
  {
    id: "2", 
    date: "2023-01-15",
    amount: 50000,
    status: "completed",
    description: "Professional Annual Membership",
    invoiceUrl: "#"
  },
  {
    id: "3",
    date: "2022-01-15", 
    amount: 45000,
    status: "completed",
    description: "Associate Annual Membership",
    invoiceUrl: "#"
  }
];

const membershipPlans = [
  {
    type: "student",
    name: "Student Member",
    price: 10000,
    features: [
      "Access to basic resources",
      "Student events participation",
      "Newsletter subscription",
      "Basic networking opportunities"
    ]
  },
  {
    type: "associate", 
    name: "Associate Member",
    price: 25000,
    features: [
      "All Student benefits",
      "Professional development workshops",
      "Industry publications access",
      "Mentorship opportunities"
    ]
  },
  {
    type: "professional",
    name: "Professional Member", 
    price: 50000,
    features: [
      "All Associate benefits",
      "Voting rights in elections",
      "Priority event registration",
      "Professional certification programs",
      "Technical committee participation"
    ]
  },
  {
    type: "fellow",
    name: "Fellow",
    price: 90000,
    features: [
      "All Professional benefits",
      "Leadership opportunities",
      "Board nomination eligibility",
      "Exclusive fellow events",
      "Research collaboration access"
    ]
  }
];

const Subscriptions = () => {
  const [activeTab, setActiveTab] = useState("current");
  const { toast } = useToast();

  const handleSubscriptionRenewal = () => {
    toast({
      title: "Renewal Initiated",
      description: "Redirecting to payment gateway...",
    });
  };

  const handleUpgrade = (planType: string) => {
    toast({
      title: "Plan Upgrade",
      description: `Upgrading to ${planType} membership...`,
    });
  };

  const handleDownloadInvoice = (invoiceUrl: string) => {
    toast({
      title: "Downloading Invoice",
      description: "Invoice download started...",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-[#073B4C]">Subscription Management</h1>
            <p className="text-gray-600">Manage your NITP membership and payments</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="current">Current Plan</TabsTrigger>
            <TabsTrigger value="plans">All Plans</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SubscriptionCard
                  membershipType={mockMemberData.membershipType}
                  status={mockMemberData.subscriptionStatus}
                  expirationDate={mockMemberData.subscriptionExpiry}
                  onRenew={handleSubscriptionRenewal}
                />
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full bg-[#118AB2] hover:bg-[#073B4C]"
                      onClick={handleSubscriptionRenewal}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Renew Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Certificate
                    </Button>
                    <Button variant="outline" className="w-full">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Update Payment Method
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-[#118AB2]" />
                      Renewal Reminder
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">
                      Your membership expires on {new Date(mockMemberData.subscriptionExpiry).toLocaleDateString()}
                    </p>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Auto-renewal enabled</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="plans" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {membershipPlans.map((plan) => (
                <Card 
                  key={plan.type}
                  className={`relative ${
                    plan.type === mockMemberData.membershipType 
                      ? "border-[#118AB2] border-2 bg-[#118AB2]/5" 
                      : "border-gray-200"
                  }`}
                >
                  {plan.type === mockMemberData.membershipType && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-[#118AB2] text-white">Current Plan</Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-2xl font-bold text-[#118AB2]">
                        {formatCurrency(plan.price)}
                      </span>
                      <span className="text-sm text-gray-500">/year</span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.type !== mockMemberData.membershipType && (
                      <Button 
                        className="w-full bg-[#118AB2] hover:bg-[#073B4C]"
                        onClick={() => handleUpgrade(plan.name)}
                      >
                        {plan.price > membershipPlans.find(p => p.type === mockMemberData.membershipType)?.price! 
                          ? "Upgrade" : "Downgrade"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>View all your past payments and download invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPaymentHistory.map((payment) => (
                    <div 
                      key={payment.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-[#118AB2]/10 rounded-full">
                          <CreditCard className="w-5 h-5 text-[#118AB2]" />
                        </div>
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(payment.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                        <span className="font-semibold">{formatCurrency(payment.amount)}</span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownloadInvoice(payment.invoiceUrl)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Invoice
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Auto-Renewal Settings</CardTitle>
                  <CardDescription>Manage automatic subscription renewal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-renewal</p>
                      <p className="text-sm text-gray-500">Automatically renew your membership</p>
                    </div>
                    <Button variant="outline">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Enabled
                    </Button>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">Renewal Date</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Your membership will auto-renew on {new Date(mockMemberData.subscriptionExpiry).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Manage your payment information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded">
                      <CreditCard className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">**** **** **** 1234</p>
                      <p className="text-sm text-gray-500">Expires 12/25</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Update Payment Method
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Subscriptions;
