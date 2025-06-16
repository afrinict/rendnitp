
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Search, Eye, MessageSquare, CheckCircle, Clock, User } from "lucide-react";
import { useState } from "react";

interface Complaint {
  id: string;
  memberName: string;
  memberEmail: string;
  subject: string;
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "resolved" | "closed";
  submissionDate: string;
  lastUpdate: string;
  assignedTo: string;
  description: string;
}

const mockComplaints: Complaint[] = [
  {
    id: "CMP-001",
    memberName: "Dr. John Adebayo",
    memberEmail: "john.adebayo@email.com",
    subject: "Membership Certificate Delay",
    category: "Membership",
    priority: "medium",
    status: "open",
    submissionDate: "2024-06-10",
    lastUpdate: "2024-06-10",
    assignedTo: "Admin Team",
    description: "My membership certificate has not been issued despite payment confirmation two weeks ago."
  },
  {
    id: "CMP-002",
    memberName: "Eng. Sarah Okafor",
    memberEmail: "sarah.okafor@email.com",
    subject: "Website Login Issues",
    category: "Technical",
    priority: "high",
    status: "in_progress",
    submissionDate: "2024-06-08",
    lastUpdate: "2024-06-12",
    assignedTo: "IT Support",
    description: "Unable to access member portal. Password reset emails are not being received."
  },
  {
    id: "CMP-003",
    memberName: "Prof. Michael Ibrahim",
    memberEmail: "michael.ibrahim@email.com",
    subject: "Event Registration Problem",
    category: "Events",
    priority: "low",
    status: "resolved",
    submissionDate: "2024-06-05",
    lastUpdate: "2024-06-07",
    assignedTo: "Events Team",
    description: "Could not register for the monthly seminar through the website."
  }
];

export const ComplaintManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [complaints, setComplaints] = useState(mockComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [response, setResponse] = useState("");

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.memberName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-red-100 text-red-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved": return <CheckCircle className="h-4 w-4" />;
      case "in_progress": return <Clock className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setComplaints(prev => prev.map(complaint => 
      complaint.id === id ? { 
        ...complaint, 
        status: newStatus as any,
        lastUpdate: new Date().toISOString().split('T')[0]
      } : complaint
    ));
  };

  const getComplaintCounts = () => {
    return {
      total: complaints.length,
      open: complaints.filter(c => c.status === "open").length,
      inProgress: complaints.filter(c => c.status === "in_progress").length,
      resolved: complaints.filter(c => c.status === "resolved").length
    };
  };

  const counts = getComplaintCounts();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="h-8 w-8 text-[#073B4C]" />
        <h1 className="text-3xl font-bold text-[#073B4C]">Complaint Management</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-[#073B4C]">{counts.total}</div>
            <div className="text-sm text-gray-600">Total Complaints</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{counts.open}</div>
            <div className="text-sm text-gray-600">Open</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{counts.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{counts.resolved}</div>
            <div className="text-sm text-gray-600">Resolved</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Complaints List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Member Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search complaints..."
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
                    variant={statusFilter === "open" ? "default" : "outline"}
                    onClick={() => setStatusFilter("open")}
                    size="sm"
                  >
                    Open
                  </Button>
                  <Button
                    variant={statusFilter === "in_progress" ? "default" : "outline"}
                    onClick={() => setStatusFilter("in_progress")}
                    size="sm"
                  >
                    In Progress
                  </Button>
                  <Button
                    variant={statusFilter === "resolved" ? "default" : "outline"}
                    onClick={() => setStatusFilter("resolved")}
                    size="sm"
                  >
                    Resolved
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Complaint</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredComplaints.map((complaint) => (
                      <TableRow 
                        key={complaint.id}
                        className={selectedComplaint?.id === complaint.id ? "bg-blue-50" : ""}
                      >
                        <TableCell>
                          <div>
                            <div className="font-medium">{complaint.subject}</div>
                            <div className="text-sm text-gray-500">{complaint.memberName}</div>
                            <div className="text-xs text-gray-400">{complaint.category}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(complaint.priority)}>
                            {complaint.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(complaint.status)} flex items-center gap-1`}>
                            {getStatusIcon(complaint.status)}
                            {complaint.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>{complaint.submissionDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedComplaint(complaint)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4" />
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

        {/* Complaint Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Complaint Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedComplaint ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedComplaint.subject}</h3>
                    <p className="text-sm text-gray-500">ID: {selectedComplaint.id}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <div>
                      <div className="font-medium">{selectedComplaint.memberName}</div>
                      <div className="text-sm text-gray-500">{selectedComplaint.memberEmail}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Badge className={getPriorityColor(selectedComplaint.priority)}>
                      {selectedComplaint.priority}
                    </Badge>
                    <Badge className={getStatusColor(selectedComplaint.status)}>
                      {selectedComplaint.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Description:</p>
                    <p className="text-sm text-gray-600 mt-1">{selectedComplaint.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Submitted:</p>
                      <p className="text-gray-600">{selectedComplaint.submissionDate}</p>
                    </div>
                    <div>
                      <p className="font-medium">Last Update:</p>
                      <p className="text-gray-600">{selectedComplaint.lastUpdate}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Assigned to:</p>
                    <p className="text-sm text-gray-600">{selectedComplaint.assignedTo}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Response:</p>
                    <Textarea
                      placeholder="Type your response..."
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    {selectedComplaint.status === "open" && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(selectedComplaint.id, "in_progress")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Start Working
                      </Button>
                    )}
                    {selectedComplaint.status === "in_progress" && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(selectedComplaint.id, "resolved")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Mark Resolved
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Send Response
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Select a complaint to view details</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
