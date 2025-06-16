
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UserCheck, UserX, Eye, Download, Clock, CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface PendingApplication {
  id: string;
  applicantName: string;
  email: string;
  membershipType: string;
  status: "pending_email" | "pending_review" | "revision_requested" | "approved" | "rejected";
  submissionDate: string;
  documentsUploaded: number;
  totalDocuments: number;
  reviewNotes?: string;
  membershipId?: string;
  formData?: any;
}

export const PendingRegistrations = () => {
  const [applications, setApplications] = useState<PendingApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<PendingApplication | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Load applications from localStorage on mount
  useEffect(() => {
    const savedApplications = JSON.parse(localStorage.getItem('pendingApplications') || '[]');
    setApplications(savedApplications);
  }, []);

  // Save applications to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('pendingApplications', JSON.stringify(applications));
  }, [applications]);

  const generateMembershipId = () => {
    // Generate TPA362XXXXXXX format where X is random numbers
    const randomNumbers = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
    return `TPA362${randomNumbers}`;
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_email": return "bg-yellow-100 text-yellow-800";
      case "pending_review": return "bg-blue-100 text-blue-800";
      case "revision_requested": return "bg-orange-100 text-orange-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending_email": return <Clock className="w-4 h-4" />;
      case "pending_review": return <Eye className="w-4 h-4" />;
      case "revision_requested": return <Clock className="w-4 h-4" />;
      case "approved": return <CheckCircle className="w-4 h-4" />;
      case "rejected": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getMembershipTypeColor = (type: string) => {
    switch (type) {
      case "student": return "bg-blue-50 text-blue-700 border-blue-200";
      case "associate": return "bg-green-50 text-green-700 border-green-200";
      case "professional": return "bg-purple-50 text-purple-700 border-purple-200";
      case "fellow": return "bg-amber-50 text-amber-700 border-amber-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const handleApprove = (id: string) => {
    const membershipId = generateMembershipId();
    
    setApplications(prev => prev.map(app => 
      app.id === id ? { 
        ...app, 
        status: "approved" as const,
        reviewNotes: reviewNotes || "Application approved by administrator.",
        membershipId: membershipId
      } : app
    ));
    
    toast.success(`Application approved! Membership ID: ${membershipId}`);
    setReviewNotes("");
    setSelectedApplication(null);
  };

  const handleReject = (id: string) => {
    if (!reviewNotes.trim()) {
      toast.error("Please provide a reason for rejection.");
      return;
    }
    
    setApplications(prev => prev.map(app => 
      app.id === id ? { 
        ...app, 
        status: "rejected" as const,
        reviewNotes: reviewNotes
      } : app
    ));
    
    toast.success("Application rejected.");
    setReviewNotes("");
    setSelectedApplication(null);
  };

  const handleRequestRevision = (id: string) => {
    if (!reviewNotes.trim()) {
      toast.error("Please provide specific revision requirements.");
      return;
    }
    
    setApplications(prev => prev.map(app => 
      app.id === id ? { 
        ...app, 
        status: "revision_requested" as const,
        reviewNotes: reviewNotes
      } : app
    ));
    
    toast.success("Revision requested.");
    setReviewNotes("");
    setSelectedApplication(null);
  };

  // Simulate changing status from pending_email to pending_review
  const handleMarkForReview = (id: string) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { 
        ...app, 
        status: "pending_review" as const
      } : app
    ));
    toast.success("Application moved to review queue.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <UserCheck className="h-8 w-8 text-[#073B4C]" />
        <h1 className="text-3xl font-bold text-[#073B4C]">Pending Registrations</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-[#073B4C]">
              {applications.length}
            </div>
            <div className="text-sm text-gray-600">Total Applications</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {applications.filter(app => app.status === "pending_email").length}
            </div>
            <div className="text-sm text-gray-600">Pending Email</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {applications.filter(app => app.status === "pending_review").length}
            </div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {applications.filter(app => app.status === "approved").length}
            </div>
            <div className="text-sm text-gray-600">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {applications.filter(app => app.status === "rejected").length}
            </div>
            <div className="text-sm text-gray-600">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Management */}
      <Card>
        <CardHeader>
          <CardTitle>Registration Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                variant={statusFilter === "pending_review" ? "default" : "outline"}
                onClick={() => setStatusFilter("pending_review")}
                size="sm"
              >
                Pending Review
              </Button>
              <Button
                variant={statusFilter === "approved" ? "default" : "outline"}
                onClick={() => setStatusFilter("approved")}
                size="sm"
              >
                Approved
              </Button>
              <Button
                variant={statusFilter === "rejected" ? "default" : "outline"}
                onClick={() => setStatusFilter("rejected")}
                size="sm"
              >
                Rejected
              </Button>
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Membership Type</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Membership ID</TableHead>
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
                        <div className="text-sm text-gray-500">{application.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getMembershipTypeColor(application.membershipType)} border`}>
                        {application.membershipType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {application.documentsUploaded}/{application.totalDocuments} uploaded
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(application.status)} flex items-center gap-1`}>
                        {getStatusIcon(application.status)}
                        {application.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {application.membershipId ? (
                        <span className="font-mono text-sm bg-green-50 px-2 py-1 rounded">
                          {application.membershipId}
                        </span>
                      ) : (
                        <span className="text-gray-400">Not assigned</span>
                      )}
                    </TableCell>
                    <TableCell>{application.submissionDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {application.status === "pending_email" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleMarkForReview(application.id)}
                          >
                            Mark for Review
                          </Button>
                        )}
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedApplication(application)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Review Application: {application.id}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Applicant Name</Label>
                                  <p className="font-medium">{application.applicantName}</p>
                                </div>
                                <div>
                                  <Label>Email</Label>
                                  <p className="font-medium">{application.email}</p>
                                </div>
                                <div>
                                  <Label>Membership Type</Label>
                                  <p className="font-medium">{application.membershipType}</p>
                                </div>
                                <div>
                                  <Label>Status</Label>
                                  <Badge className={getStatusColor(application.status)}>
                                    {application.status.replace('_', ' ')}
                                  </Badge>
                                </div>
                                {application.membershipId && (
                                  <div>
                                    <Label>Membership ID</Label>
                                    <p className="font-mono font-medium">{application.membershipId}</p>
                                  </div>
                                )}
                              </div>
                              
                              {application.reviewNotes && (
                                <div>
                                  <Label>Previous Review Notes</Label>
                                  <p className="p-2 bg-gray-50 rounded text-sm">{application.reviewNotes}</p>
                                </div>
                              )}
                              
                              {application.status === "pending_review" && (
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="reviewNotes">Review Notes</Label>
                                    <Textarea
                                      id="reviewNotes"
                                      value={reviewNotes}
                                      onChange={(e) => setReviewNotes(e.target.value)}
                                      placeholder="Enter your review notes or comments..."
                                      className="min-h-[100px]"
                                    />
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    <Button
                                      onClick={() => handleApprove(application.id)}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Approve & Generate ID
                                    </Button>
                                    <Button
                                      onClick={() => handleRequestRevision(application.id)}
                                      variant="outline"
                                      className="border-orange-200 text-orange-700 hover:bg-orange-50"
                                    >
                                      Request Revision
                                    </Button>
                                    <Button
                                      onClick={() => handleReject(application.id)}
                                      variant="destructive"
                                    >
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Reject
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
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
