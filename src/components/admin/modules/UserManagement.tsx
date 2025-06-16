
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search, Filter, Edit, Trash2, UserCheck, UserX } from "lucide-react";
import { useState } from "react";

interface Member {
  id: string;
  name: string;
  email: string;
  membershipType: string;
  status: "active" | "pending" | "suspended";
  joinDate: string;
  lastActive: string;
}

const mockMembers: Member[] = [
  {
    id: "1",
    name: "Dr. John Adebayo",
    email: "john.adebayo@email.com",
    membershipType: "Professional",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-06-10"
  },
  {
    id: "2",
    name: "Eng. Sarah Okafor",
    email: "sarah.okafor@email.com",
    membershipType: "Student",
    status: "pending",
    joinDate: "2024-06-01",
    lastActive: "2024-06-12"
  },
  {
    id: "3",
    name: "Prof. Michael Ibrahim",
    email: "michael.ibrahim@email.com",
    membershipType: "Fellow",
    status: "active",
    joinDate: "2023-08-20",
    lastActive: "2024-06-14"
  }
];

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [members, setMembers] = useState(mockMembers);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleApprove = (id: string) => {
    setMembers(prev => prev.map(member => 
      member.id === id ? { ...member, status: "active" as const } : member
    ));
  };

  const handleSuspend = (id: string) => {
    setMembers(prev => prev.map(member => 
      member.id === id ? { ...member, status: "suspended" as const } : member
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Users className="h-8 w-8 text-[#073B4C]" />
        <h1 className="text-3xl font-bold text-[#073B4C]">User Management</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-[#073B4C]">1,247</div>
            <div className="text-sm text-gray-600">Total Members</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">892</div>
            <div className="text-sm text-gray-600">Active Members</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">23</div>
            <div className="text-sm text-gray-600">Pending Approval</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">12</div>
            <div className="text-sm text-gray-600">Suspended</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Member Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search members by name or email..."
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
                variant={statusFilter === "pending" ? "default" : "outline"}
                onClick={() => setStatusFilter("pending")}
                size="sm"
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === "suspended" ? "default" : "outline"}
                onClick={() => setStatusFilter("suspended")}
                size="sm"
              >
                Suspended
              </Button>
            </div>
          </div>

          {/* Members Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Membership Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{member.membershipType}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{member.joinDate}</TableCell>
                    <TableCell>{member.lastActive}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {member.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApprove(member.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <UserCheck className="h-4 w-4" />
                          </Button>
                        )}
                        {member.status === "active" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSuspend(member.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <UserX className="h-4 w-4" />
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
