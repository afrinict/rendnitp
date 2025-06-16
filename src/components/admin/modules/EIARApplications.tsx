
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Leaf, Search, Eye, Download, CheckCircle, XCircle, Clock } from "lucide-react";
import { useState } from "react";

interface EIARApplication {
  id: string;
  applicantName: string;
  companyName: string;
  projectTitle: string;
  location: string;
  environmentalCategory: string;
  status: "pending" | "under_review" | "approved" | "rejected" | "revision_required";
  submissionDate: string;
  reviewerNotes: string;
}

const mockApplications: EIARApplication[] = [
  {
    id: "EIAR-2024-001",
    applicantName: "Dr. Fatima Abubakar",
    companyName: "EcoConsult Nigeria Ltd",
    projectTitle: "Industrial Park Development",
    location: "Idu Industrial Layout, Abuja",
    environmentalCategory: "Category A",
    status: "pending",
    submissionDate: "2024-06-12",
    reviewerNotes: ""
  },
  {
    id: "EIAR-2024-002",
    applicantName: "Eng. Peter Okafor",
    companyName: "Green Development Corp",
    projectTitle: "Waste Management Facility",
    location: "Mpape, Abuja",
    environmentalCategory: "Category B",
    status: "under_review",
    submissionDate: "2024-06-09",
    reviewerNotes: "Environmental baseline study requires updates"
  },
  {
    id: "EIAR-2024-003",
    applicantName: "Prof. Aisha Mohammed",
    companyName: "Federal Ministry of Environment",
    projectTitle: "Water Treatment Plant",
    location: "Garki, Abuja",
    environmentalCategory: "Category A",
    status: "approved",
    submissionDate: "2024-06-03",
    reviewerNotes: "Comprehensive assessment completed. All mitigation measures approved."
  }
];

export const EIARApplications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [applications, setApplications] = useState(mockApplications);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.projectTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "under_review": return "bg-blue-100 text-blue-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "revision_required": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Category A": return "bg-red-50 text-red-700 border-red-200";
      case "Category B": return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Category C": return "bg-green-50 text-green-700 border-green-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="h-4 w-4" />;
      case "rejected": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: newStatus as any } : app
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Leaf className="h-8 w-8 text-[#073B4C]" />
        <h1 className="text-3xl font-bold text-[#073B4C]">EIAR Applications</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-[#073B4C]">89</div>
            <div className="text-sm text-gray-600">Total Applications</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">15</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-gray-600">Under Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">58</div>
            <div className="text-sm text-gray-600">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">4</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Management */}
      <Card>
        <CardHeader>
          <CardTitle>Ecological Impact Assessment Report Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search EIAR applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={statusFilter === "pending" ? "default" : "outline"}
                onClick={() => setStatusFilter("pending")}
                size="sm"
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === "under_review" ? "default" : "outline"}
                onClick={() => setStatusFilter("under_review")}
                size="sm"
              >
                Under Review
              </Button>
              <Button
                variant={statusFilter === "approved" ? "default" : "outline"}
                onClick={() => setStatusFilter("approved")}
                size="sm"
              >
                Approved
              </Button>
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Project Details</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{application.applicantName}</div>
                        <div className="text-sm text-gray-500">{application.companyName}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{application.projectTitle}</div>
                        <div className="text-sm text-gray-500">{application.location}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getCategoryColor(application.environmentalCategory)} border`}>
                        {application.environmentalCategory}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(application.status)} flex items-center gap-1`}>
                        {getStatusIcon(application.status)}
                        {application.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{application.submissionDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        {application.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(application.id, "approved")}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(application.id, "rejected")}
                              variant="destructive"
                            >
                              Reject
                            </Button>
                          </>
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
