
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Clock, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface SecurityConfig {
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireNumbers: boolean;
  passwordRequireSpecialChars: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
  enableTwoFactor: boolean;
  allowPasswordReset: boolean;
  forcePasswordChange: boolean;
  passwordExpiryDays: number;
}

export const SecuritySettings = () => {
  const [config, setConfig] = useState<SecurityConfig>({
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecialChars: false,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    lockoutDuration: 30,
    enableTwoFactor: false,
    allowPasswordReset: true,
    forcePasswordChange: false,
    passwordExpiryDays: 90
  });

  const handleConfigUpdate = (field: keyof SecurityConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveConfig = () => {
    console.log("Saving security configuration:", config);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Password Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Minimum Length</label>
              <Input
                type="number"
                value={config.passwordMinLength}
                onChange={(e) => handleConfigUpdate("passwordMinLength", parseInt(e.target.value))}
                min="6"
                max="20"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password Expiry (Days)</label>
              <Input
                type="number"
                value={config.passwordExpiryDays}
                onChange={(e) => handleConfigUpdate("passwordExpiryDays", parseInt(e.target.value))}
                min="30"
                max="365"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Require Uppercase Letters</label>
                <p className="text-xs text-gray-500">At least one uppercase letter (A-Z)</p>
              </div>
              <Switch
                checked={config.passwordRequireUppercase}
                onCheckedChange={(checked) => handleConfigUpdate("passwordRequireUppercase", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Require Numbers</label>
                <p className="text-xs text-gray-500">At least one number (0-9)</p>
              </div>
              <Switch
                checked={config.passwordRequireNumbers}
                onCheckedChange={(checked) => handleConfigUpdate("passwordRequireNumbers", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Require Special Characters</label>
                <p className="text-xs text-gray-500">At least one special character (!@#$%^&*)</p>
              </div>
              <Switch
                checked={config.passwordRequireSpecialChars}
                onCheckedChange={(checked) => handleConfigUpdate("passwordRequireSpecialChars", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Force Password Change</label>
                <p className="text-xs text-gray-500">Require users to change password on first login</p>
              </div>
              <Switch
                checked={config.forcePasswordChange}
                onCheckedChange={(checked) => handleConfigUpdate("forcePasswordChange", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Session & Access Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Session Timeout (minutes)</label>
              <Input
                type="number"
                value={config.sessionTimeout}
                onChange={(e) => handleConfigUpdate("sessionTimeout", parseInt(e.target.value))}
                min="15"
                max="480"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Max Login Attempts</label>
              <Input
                type="number"
                value={config.maxLoginAttempts}
                onChange={(e) => handleConfigUpdate("maxLoginAttempts", parseInt(e.target.value))}
                min="3"
                max="10"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Lockout Duration (minutes)</label>
              <Input
                type="number"
                value={config.lockoutDuration}
                onChange={(e) => handleConfigUpdate("lockoutDuration", parseInt(e.target.value))}
                min="5"
                max="120"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Enable Two-Factor Authentication</label>
                <p className="text-xs text-gray-500">Require 2FA for all admin accounts</p>
              </div>
              <Switch
                checked={config.enableTwoFactor}
                onCheckedChange={(checked) => handleConfigUpdate("enableTwoFactor", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Allow Password Reset</label>
                <p className="text-xs text-gray-500">Enable self-service password reset</p>
              </div>
              <Switch
                checked={config.allowPasswordReset}
                onCheckedChange={(checked) => handleConfigUpdate("allowPasswordReset", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Security Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Recent Security Events</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Failed login attempts (24h)</span>
                  <span className="text-red-600 font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Locked accounts</span>
                  <span className="text-yellow-600 font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span>Active sessions</span>
                  <span className="text-green-600 font-medium">45</span>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Security Status</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>SSL Certificate Valid</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Firewall Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Backup Pending</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSaveConfig} className="bg-[#118AB2] hover:bg-[#073B4C]">
        Save Security Settings
      </Button>
    </div>
  );
};
