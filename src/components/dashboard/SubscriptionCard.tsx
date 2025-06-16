
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CreditCard, AlertTriangle } from "lucide-react";

interface SubscriptionCardProps {
  membershipType: "student" | "associate" | "professional" | "fellow";
  status: "active" | "expired" | "expiring_soon";
  expirationDate: string;
  onRenew: () => void;
}

const membershipFees = {
  student: 10000,
  associate: 25000,
  professional: 50000,
  fellow: 90000,
};

const membershipLabels = {
  student: "Student Member",
  associate: "Associate Member", 
  professional: "Professional Member",
  fellow: "Fellow",
};

export const SubscriptionCard = ({ membershipType, status, expirationDate, onRenew }: SubscriptionCardProps) => {
  const fee = membershipFees[membershipType];
  const label = membershipLabels[membershipType];

  const getStatusBadge = () => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      case "expiring_soon":
        return <Badge className="bg-yellow-100 text-yellow-800">Expiring Soon</Badge>;
    }
  };

  const getStatusIcon = () => {
    if (status === "expired" || status === "expiring_soon") {
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
    return <Calendar className="w-5 h-5 text-green-500" />;
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">{label}</CardTitle>
          <CardDescription>Annual Subscription</CardDescription>
        </div>
        {getStatusBadge()}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="text-sm text-gray-600">
            Expires: {new Date(expirationDate).toLocaleDateString()}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-[#118AB2]">₦{fee.toLocaleString()}</span>
          <span className="text-sm text-gray-500">per year</span>
        </div>

        {(status === "expired" || status === "expiring_soon") && (
          <Button 
            onClick={onRenew}
            className="w-full bg-[#118AB2] hover:bg-[#073B4C]"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Renew Subscription
          </Button>
        )}

        {status === "expired" && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-700">
              Your subscription has expired. Please renew to continue accessing member benefits.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
