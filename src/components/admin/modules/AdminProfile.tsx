
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Camera, Shield, Clock, Key, Bell } from "lucide-react";
import { useState } from "react";

interface AdminProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  bio: string;
  avatar: string;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  emailNotifications: boolean;
  loginAlerts: boolean;
}

export const AdminProfile = () => {
  const [profile, setProfile] = useState<AdminProfile>({
    firstName: "John",
    lastName: "Administrator",
    email: "admin@nitpabuja.org",
    phone: "+234-800-ADMIN",
    role: "System Administrator",
    department: "IT & Operations",
    bio: "Experienced system administrator managing NITP Abuja Chapter's digital infrastructure and member services.",
    avatar: ""
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorEnabled: true,
    emailNotifications: true,
    loginAlerts: true
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const recentActivity = [
    { action: "User approved", details: "Dr. John Adebayo - Professional membership", timestamp: "2024-06-14 10:30 AM" },
    { action: "Content published", details: "Monthly Newsletter - June 2024", timestamp: "2024-06-14 09:15 AM" },
    { action: "System backup", details: "Automated daily backup completed", timestamp: "2024-06-14 02:00 AM" },
    { action: "Login", details: "Successful login from 192.168.1.1", timestamp: "2024-06-13 08:45 AM" },
    { action: "Settings updated", details: "Email notification preferences", timestamp: "2024-06-13 04:30 PM" }
  ];

  const handleProfileUpdate = (field: keyof AdminProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityUpdate = (field: keyof SecuritySettings, value: boolean) => {
    setSecurity(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    console.log("Saving profile:", profile);
    // Here you would typically save to backend
  };

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      alert("New passwords don't match!");
      return;
    }
    console.log("Changing password");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <User className="h-8 w-8 text-[#073B4C]" />
        <h1 className="text-3xl font-bold text-[#073B4C]">My Admin Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="text-2xl">
                  {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                variant="outline"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold">{profile.firstName} {profile.lastName}</h3>
              <p className="text-gray-600">{profile.role}</p>
              <p className="text-sm text-gray-500">{profile.department}</p>
            </div>

            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-4 w-4 text-gray-400">📞</span>
                <span>{profile.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Profile Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">First Name</label>
                      <Input
                        value={profile.firstName}
                        onChange={(e) => handleProfileUpdate("firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Last Name</label>
                      <Input
                        value={profile.lastName}
                        onChange={(e) => handleProfileUpdate("lastName", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleProfileUpdate("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <Input
                        value={profile.phone}
                        onChange={(e) => handleProfileUpdate("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Role</label>
                      <Input
                        value={profile.role}
                        onChange={(e) => handleProfileUpdate("role", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Department</label>
                      <Input
                        value={profile.department}
                        onChange={(e) => handleProfileUpdate("department", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Bio</label>
                    <Textarea
                      value={profile.bio}
                      onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button onClick={handleSaveProfile} className="bg-[#118AB2] hover:bg-[#073B4C]">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Current Password</label>
                    <Input
                      type="password"
                      value={passwords.current}
                      onChange={(e) => setPasswords(prev => ({...prev, current: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">New Password</label>
                    <Input
                      type="password"
                      value={passwords.new}
                      onChange={(e) => setPasswords(prev => ({...prev, new: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Confirm New Password</label>
                    <Input
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords(prev => ({...prev, confirm: e.target.value}))}
                    />
                  </div>
                  <Button onClick={handleChangePassword} className="bg-[#118AB2] hover:bg-[#073B4C]">
                    Change Password
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Two-Factor Authentication</label>
                      <p className="text-xs text-gray-500">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" size="sm">
                      {security.twoFactorEnabled ? "Disable" : "Enable"}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Login Alerts</label>
                      <p className="text-xs text-gray-500">Get notified of new login attempts</p>
                    </div>
                    <Button variant="outline" size="sm">
                      {security.loginAlerts ? "Disable" : "Enable"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="border-l-4 border-[#118AB2] pl-4 py-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-sm">{activity.action}</h4>
                            <p className="text-sm text-gray-600">{activity.details}</p>
                          </div>
                          <span className="text-xs text-gray-500">{activity.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Email Notifications</label>
                      <p className="text-xs text-gray-500">Receive notifications via email</p>
                    </div>
                    <Button variant="outline" size="sm">
                      {security.emailNotifications ? "Disable" : "Enable"}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">System Alerts</label>
                      <p className="text-xs text-gray-500">Get notified of system events</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Weekly Reports</label>
                      <p className="text-xs text-gray-500">Receive weekly summary reports</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
