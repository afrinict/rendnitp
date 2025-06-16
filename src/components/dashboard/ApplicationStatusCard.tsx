
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Eye } from "lucide-react";

interface Application {
  id: string;
  type: "SAR" | "EIAR";
  projectTitle: string;
  status: "pending" | "under_review" | "approved" | "rejected";
  submissionDate: string;
  amount: number;
}

interface ApplicationStatusCardProps {
  applications: Application[];
  onNewApplication: () => void;
  onViewApplication: (id: string) => void;
}

const getStatusBadge = (status: Application['status']) => {
  const statusConfig = {
    pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
    under_review: { label: "Under Review", className: "bg-blue-100 text-blue-800" },
    approved: { label: "Approved", className: "bg-green-100 text-green-800" },
    rejected: { label: "Rejected", className: "bg-red-100 text-red-800" },
  };
  
  const config = statusConfig[status];
  return <Badge className={config.className}>{config.label}</Badge>;
};

export const ApplicationStatusCard = ({ applications, onNewApplication, onViewApplication }: ApplicationStatusCardProps) => {
  const pendingCount = applications.filter(app => app.status === 'pending' || app.status === 'under_review').length;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>SAR/EIAR Applications</span>
          </CardTitle>
          <CardDescription>
            {pendingCount > 0 ? `${pendingCount} pending applications` : 'No pending applications'}
          </CardDescription>
        </div>
        <Button 
          onClick={onNewApplication}
          size="sm"
          className="bg-[#118AB2] hover:bg-[#073B4C]"
        >
          <Plus className="w-4 h-4 mr-1" />
          New Application
        </Button>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No applications submitted yet</p>
            <p className="text-sm">Click "New Application" to get started</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {applications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge variant="outline" className="text-xs">{app.type}</Badge>
                    {getStatusBadge(app.status)}
                  </div>
                  <p className="font-medium text-sm truncate">{app.projectTitle}</p>
                  <p className="text-xs text-gray-500">
                    Submitted: {new Date(app.submissionDate).toLocaleDateString()} • ₦{app.amount.toLocaleString()}
                  </p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onViewApplication(app.id)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
