
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Globe, Users, Bell, Database } from "lucide-react";
import { PermissionsTab } from "../security/PermissionsTab";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useToast } from "@/hooks/use-toast";

interface SiteConfig {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  enableNotifications: boolean;
}

export const SiteSettings = () => {
  const { config, updateConfig, saveConfig } = useSiteSettings();
  const { toast } = useToast();

  const [notificationTemplates] = useState([
    { id: "1", name: "Welcome Email", subject: "Welcome to NITP Abuja Chapter", type: "registration" },
    { id: "2", name: "Application Approved", subject: "Your application has been approved", type: "application" },
    { id: "3", name: "Payment Reminder", subject: "Subscription renewal reminder", type: "payment" },
    { id: "4", name: "Event Notification", subject: "Upcoming event notification", type: "event" }
  ]);

  const handleSaveConfig = () => {
    saveConfig();
    toast({
      title: "Settings Saved",
      description: "Site configuration has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Settings className="h-8 w-8 text-[#073B4C]" />
        <h1 className="text-3xl font-bold text-[#073B4C]">Site Settings</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">User Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="permissions">Security & Permissions</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Site Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Site Name</label>
                  <Input
                    value={config.siteName}
                    onChange={(e) => updateConfig("siteName", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Contact Email</label>
                  <Input
                    type="email"
                    value={config.contactEmail}
                    onChange={(e) => updateConfig("contactEmail", e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Site Description</label>
                <Textarea
                  value={config.siteDescription}
                  onChange={(e) => updateConfig("siteDescription", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Contact Phone</label>
                  <Input
                    value={config.contactPhone}
                    onChange={(e) => updateConfig("contactPhone", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <Input
                    value={config.address}
                    onChange={(e) => updateConfig("address", e.target.value)}
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">System Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Maintenance Mode</label>
                      <p className="text-xs text-gray-500">Temporarily disable site for maintenance</p>
                    </div>
                    <Switch
                      checked={config.maintenanceMode}
                      onCheckedChange={(checked) => updateConfig("maintenanceMode", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Allow Registration</label>
                      <p className="text-xs text-gray-500">Enable new member registration</p>
                    </div>
                    <Switch
                      checked={config.allowRegistration}
                      onCheckedChange={(checked) => updateConfig("allowRegistration", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Email Verification Required</label>
                      <p className="text-xs text-gray-500">Require email verification for new accounts</p>
                    </div>
                    <Switch
                      checked={config.requireEmailVerification}
                      onCheckedChange={(checked) => updateConfig("requireEmailVerification", checked)}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveConfig} className="bg-[#118AB2] hover:bg-[#073B4C]">
                Save Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Roles & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Basic user role management. For advanced permissions, use the Security & Permissions tab.
              </p>
              <Button className="bg-[#118AB2] hover:bg-[#073B4C]">
                Go to Security & Permissions
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Enable Notifications</label>
                  <p className="text-xs text-gray-500">Send email notifications to users</p>
                </div>
                <Switch
                  checked={config.enableNotifications}
                  onCheckedChange={(checked) => updateConfig("enableNotifications", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificationTemplates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-gray-600">{template.subject}</p>
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded mt-1 inline-block">
                          {template.type}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Preview</Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="bg-[#118AB2] hover:bg-[#073B4C]">
                  Add New Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <PermissionsTab />
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Backup & Recovery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Database Backup</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Create a backup of all database content
                    </p>
                    <Button className="w-full bg-[#118AB2] hover:bg-[#073B4C]">
                      Create Backup
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">System Restore</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Restore system from backup file
                    </p>
                    <Button variant="outline" className="w-full">
                      Upload Backup
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Recent Backups</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>backup_2024-06-14.sql</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Download</Button>
                      <Button size="sm" variant="outline">Restore</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>backup_2024-06-13.sql</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Download</Button>
                      <Button size="sm" variant="outline">Restore</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
