
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Search, RefreshCw, DollarSign, Calendar, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface Subscription {
  id: string;
  memberName: string;
  memberEmail: string;
  plan: string;
  amount: number;
  status: "active" | "expired" | "pending" | "cancelled";
  startDate: string;
  endDate: string;
  paymentMethod: string;
  lastPayment: string;
}

const mockSubscriptions: Subscription[] = [
  {
    id: "SUB-001",
    memberName: "Dr. John Adebayo",
    memberEmail: "john.adebayo@email.com",
    plan: "Professional Annual",
    amount: 50000,
    status: "active",
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    paymentMethod: "Bank Transfer",
    lastPayment: "2024-01-15"
  },
  {
    id: "SUB-002",
    memberName: "Eng. Sarah Okafor",
    memberEmail: "sarah.okafor@email.com",
    plan: "Student Annual",
    amount: 15000,
    status: "expired",
    startDate: "2023-06-01",
    endDate: "2024-06-01",
    paymentMethod: "Online Payment",
    lastPayment: "2023-06-01"
  },
  {
    id: "SUB-003",
    memberName: "Prof. Michael Ibrahim",
    memberEmail: "michael.ibrahim@email.com",
    plan: "Fellow Lifetime",
    amount: 200000,
    status: "active",
    startDate: "2023-08-20",
    endDate: "Lifetime",
    paymentMethod: "Bank Transfer",
    lastPayment: "2023-08-20"
  }
];

export const SubscriptionManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.memberEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "expired": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const calculateTotalRevenue = () => {
    return subscriptions
      .filter(sub => sub.status === "active")
      .reduce((total, sub) => total + sub.amount, 0);
  };

  const getExpiringCount = () => {
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    
    return subscriptions.filter(sub => {
      if (sub.endDate === "Lifetime") return false;
      const endDate = new Date(sub.endDate);
      return endDate <= oneMonthFromNow && sub.status === "active";
    }).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <CreditCard className="h-8 w-8 text-[#073B4C]" />
        <h1 className="text-3xl font-bold text-[#073B4C]">Subscription Management</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-[#118AB2]" />
              <div>
                <div className="text-2xl font-bold text-[#073B4C]">{formatCurrency(calculateTotalRevenue())}</div>
                <div className="text-sm text-gray-600">Active Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">892</div>
                <div className="text-sm text-gray-600">Active Subscriptions</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-600">{getExpiringCount()}</div>
                <div className="text-sm text-gray-600">Expiring Soon</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">45</div>
                <div className="text-sm text-gray-600">Expired</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Management */}
      <Card>
        <CardHeader>
          <CardTitle>Membership Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by member name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={statusFilter === "active" ? "default" : "outline"}
                onClick={() => setStatusFilter("active")}
                size="sm"
              >
                Active
              </Button>
              <Button
                variant={statusFilter === "expired" ? "default" : "outline"}
                onClick={() => setStatusFilter("expired")}
                size="sm"
              >
                Expired
              </Button>
              <Button
                variant={statusFilter === "pending" ? "default" : "outline"}
                onClick={() => setStatusFilter("pending")}
                size="sm"
              >
                Pending
              </Button>
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{subscription.memberName}</div>
                        <div className="text-sm text-gray-500">{subscription.memberEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{subscription.plan}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(subscription.amount)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(subscription.status)}>
                        {subscription.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{subscription.startDate}</TableCell>
                    <TableCell>{subscription.endDate}</TableCell>
                    <TableCell>{subscription.paymentMethod}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {subscription.status === "expired" && (
                          <Button size="sm" className="bg-[#118AB2] hover:bg-[#073B4C]">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Renew
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
