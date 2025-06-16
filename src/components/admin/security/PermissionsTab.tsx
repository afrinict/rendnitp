
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RolePermissionMatrix } from "./RolePermissionMatrix";
import { SecuritySettings } from "./SecuritySettings";
import { UserRoleAssignment } from "./UserRoleAssignment";
import { useState } from "react";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

const mockPermissions: Permission[] = [
  // User Management
  { id: "users.view", name: "View Users", description: "View user list and details", category: "User Management" },
  { id: "users.create", name: "Create Users", description: "Add new users to the system", category: "User Management" },
  { id: "users.edit", name: "Edit Users", description: "Modify user information", category: "User Management" },
  { id: "users.delete", name: "Delete Users", description: "Remove users from system", category: "User Management" },
  { id: "users.approve", name: "Approve Users", description: "Approve pending user registrations", category: "User Management" },
  
  // Content Management
  { id: "content.view", name: "View Content", description: "View all content items", category: "Content Management" },
  { id: "content.create", name: "Create Content", description: "Create new articles and events", category: "Content Management" },
  { id: "content.edit", name: "Edit Content", description: "Modify existing content", category: "Content Management" },
  { id: "content.publish", name: "Publish Content", description: "Publish content to public", category: "Content Management" },
  { id: "content.delete", name: "Delete Content", description: "Remove content items", category: "Content Management" },
  
  // Applications
  { id: "applications.view", name: "View Applications", description: "View SAR/EIAR applications", category: "Applications" },
  { id: "applications.review", name: "Review Applications", description: "Review and process applications", category: "Applications" },
  { id: "applications.approve", name: "Approve Applications", description: "Approve/reject applications", category: "Applications" },
  { id: "applications.certificates", name: "Generate Certificates", description: "Generate and issue certificates", category: "Applications" },
  
  // Financial
  { id: "finance.view", name: "View Financial Data", description: "View subscription and payment info", category: "Financial" },
  { id: "finance.manage", name: "Manage Subscriptions", description: "Manage member subscriptions", category: "Financial" },
  { id: "finance.reports", name: "Financial Reports", description: "Generate financial reports", category: "Financial" },
  
  // System
  { id: "system.settings", name: "System Settings", description: "Modify system configuration", category: "System" },
  { id: "system.backup", name: "System Backup", description: "Create and restore backups", category: "System" },
  { id: "system.logs", name: "View System Logs", description: "Access system logs and audit trails", category: "System" },
  { id: "system.analytics", name: "View Analytics", description: "Access analytics and reports", category: "System" }
];

const mockRoles: Role[] = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full system access",
    permissions: mockPermissions.map(p => p.id) // All permissions
  },
  {
    id: "content",
    name: "Content Manager",
    description: "Manage content and events",
    permissions: [
      "content.view", "content.create", "content.edit", "content.publish",
      "users.view", "system.analytics"
    ]
  },
  {
    id: "member",
    name: "Member Manager",
    description: "Manage member accounts",
    permissions: [
      "users.view", "users.edit", "users.approve",
      "finance.view", "finance.manage",
      "applications.view", "system.analytics"
    ]
  },
  {
    id: "reviewer",
    name: "Application Reviewer",
    description: "Review and process applications",
    permissions: [
      "applications.view", "applications.review", "applications.approve", "applications.certificates",
      "users.view", "system.analytics"
    ]
  }
];

export const PermissionsTab = () => {
  const [roles, setRoles] = useState(mockRoles);

  const handlePermissionToggle = (roleId: string, permissionId: string) => {
    setRoles(prev => prev.map(role => {
      if (role.id === roleId && role.name !== "Administrator") {
        const hasPermission = role.permissions.includes(permissionId);
        return {
          ...role,
          permissions: hasPermission
            ? role.permissions.filter(p => p !== permissionId)
            : [...role.permissions, permissionId]
        };
      }
      return role;
    }));
  };

  return (
    <Tabs defaultValue="matrix" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="matrix">Permission Matrix</TabsTrigger>
        <TabsTrigger value="assignments">User Assignments</TabsTrigger>
        <TabsTrigger value="security">Security Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="matrix">
        <RolePermissionMatrix
          roles={roles}
          permissions={mockPermissions}
          onPermissionToggle={handlePermissionToggle}
        />
      </TabsContent>

      <TabsContent value="assignments">
        <UserRoleAssignment />
      </TabsContent>

      <TabsContent value="security">
        <SecuritySettings />
      </TabsContent>
    </Tabs>
  );
};
