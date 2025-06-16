
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Edit, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";

interface UserRoleAssignment {
  id: string;
  name: string;
  email: string;
  currentRole: string;
  assignedDate: string;
  lastActive: string;
  status: "active" | "inactive";
}

interface Role {
  id: string;
  name: string;
  description: string;
}

const mockUserAssignments: UserRoleAssignment[] = [
  {
    id: "1",
    name: "Dr. John Adebayo",
    email: "john.adebayo@nitpabuja.org",
    currentRole: "Administrator",
    assignedDate: "2024-01-15",
    lastActive: "2024-06-14",
    status: "active"
  },
  {
    id: "2",
    name: "Eng. Sarah Okafor",
    email: "sarah.okafor@nitpabuja.org",
    currentRole: "Content Manager",
    assignedDate: "2024-03-10",
    lastActive: "2024-06-13",
    status: "active"
  },
  {
    id: "3",
    name: "Prof. Michael Ibrahim",
    email: "michael.ibrahim@nitpabuja.org",
    currentRole: "Member Manager",
    assignedDate: "2024-02-20",
    lastActive: "2024-06-12",
    status: "inactive"
  }
];

const availableRoles: Role[] = [
  { id: "admin", name: "Administrator", description: "Full system access" },
  { id: "content", name: "Content Manager", description: "Manage content and events" },
  { id: "member", name: "Member Manager", description: "Manage member accounts" },
  { id: "viewer", name: "Viewer", description: "Read-only access" }
];

export const UserRoleAssignment = () => {
  const [assignments, setAssignments] = useState(mockUserAssignments);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || assignment.currentRole === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = (assignmentId: string, newRole: string) => {
    setAssignments(prev => prev.map(assignment =>
      assignment.id === assignmentId
        ? { ...assignment, currentRole: newRole, assignedDate: new Date().toISOString().split('T')[0] }
        : assignment
    ));
    console.log(`Changed role for user ${assignmentId} to ${newRole}`);
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Administrator": return "bg-red-100 text-red-800";
      case "Content Manager": return "bg-blue-100 text-blue-800";
      case "Member Manager": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>User Role Assignment</span>
          <Button className="bg-[#118AB2] hover:bg-[#073B4C]">
            <UserPlus className="h-4 w-4 mr-2" />
            Assign Role
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {availableRoles.map((role) => (
                <SelectItem key={role.id} value={role.name}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Current Role</TableHead>
                <TableHead>Assigned Date</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{assignment.name}</div>
                      <div className="text-sm text-gray-500">{assignment.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(assignment.currentRole)}>
                      {assignment.currentRole}
                    </Badge>
                  </TableCell>
                  <TableCell>{assignment.assignedDate}</TableCell>
                  <TableCell>{assignment.lastActive}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Select
                        value={assignment.currentRole}
                        onValueChange={(value) => handleRoleChange(assignment.id, value)}
                      >
                        <SelectTrigger className="w-[140px] h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {availableRoles.map((role) => (
                            <SelectItem key={role.id} value={role.name}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {assignment.currentRole !== "Administrator" && (
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
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
  );
};
