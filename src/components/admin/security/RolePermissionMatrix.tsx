
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

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

interface RolePermissionMatrixProps {
  roles: Role[];
  permissions: Permission[];
  onPermissionToggle: (roleId: string, permissionId: string) => void;
}

export const RolePermissionMatrix = ({ roles, permissions, onPermissionToggle }: RolePermissionMatrixProps) => {
  const permissionCategories = Array.from(new Set(permissions.map(p => p.category)));

  const hasPermission = (roleId: string, permissionId: string) => {
    const role = roles.find(r => r.id === roleId);
    return role?.permissions.includes(permissionId) || false;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permission Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {permissionCategories.map((category) => (
            <div key={category} className="space-y-3">
              <h3 className="text-lg font-semibold text-[#073B4C] border-b border-gray-200 pb-2">
                {category}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-medium">Permission</th>
                      {roles.map((role) => (
                        <th key={role.id} className="text-center py-2 px-3 font-medium min-w-[120px]">
                          <div className="space-y-1">
                            <div>{role.name}</div>
                            <Badge variant="outline" className="text-xs">
                              {role.permissions.length} perms
                            </Badge>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {permissions
                      .filter(permission => permission.category === category)
                      .map((permission) => (
                        <tr key={permission.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-3">
                            <div>
                              <div className="font-medium">{permission.name}</div>
                              <div className="text-xs text-gray-500">{permission.description}</div>
                            </div>
                          </td>
                          {roles.map((role) => (
                            <td key={role.id} className="py-3 px-3 text-center">
                              <Switch
                                checked={hasPermission(role.id, permission.id)}
                                onCheckedChange={() => onPermissionToggle(role.id, permission.id)}
                                disabled={role.name === "Administrator"}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
