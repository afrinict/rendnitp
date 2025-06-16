
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onBack: () => void;
  onRegister: () => void;
}

export const LoginForm = ({ onBack, onRegister }: LoginFormProps) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      // Check if this is an admin login (you can modify these credentials as needed)
      const isAdmin = identifier.toLowerCase().includes('admin') || 
                     identifier === 'admin@nitp.org' || 
                     identifier === 'administrator';

      if (isAdmin) {
        toast({
          title: "Admin Login Successful",
          description: "Welcome to NITP Admin Dashboard!",
        });
        setIsLoading(false);
        // Redirect to admin dashboard
        window.location.href = "/admin";
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome back to NITP Portal!",
        });
        setIsLoading(false);
        // Redirect to regular member dashboard
        window.location.href = "/dashboard";
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your NITP member account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Email, Membership ID, or Username</Label>
              <Input
                id="identifier"
                type="text"
                placeholder="Enter your email, membership ID, or username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Button variant="link" className="px-0 text-sm">
                Forgot password?
              </Button>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Button variant="link" className="px-0" onClick={onRegister}>
                Register here
              </Button>
            </p>
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>Admin Access:</strong> Use an email containing "admin" or "admin@nitp.org" to access the admin dashboard.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
