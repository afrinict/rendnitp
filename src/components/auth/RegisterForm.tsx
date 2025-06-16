
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface RegisterFormProps {
  onBack: () => void;
  onLogin: () => void;
}

export const RegisterForm = ({ onBack, onLogin }: RegisterFormProps) => {
  const handleNavigateToRegistration = () => {
    window.location.href = "/registration";
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
          <CardTitle className="text-2xl font-bold">Join NITP</CardTitle>
          <CardDescription>
            Start your professional membership application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Ready to join the Nigerian Institute of Town Planners, Abuja Chapter? 
              Complete our comprehensive membership application process.
            </p>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">What to expect:</h3>
              <ul className="text-sm text-green-700 space-y-1 text-left">
                <li>• Multi-step application process</li>
                <li>• Document upload and verification</li>
                <li>• Admin review and approval</li>
                <li>• Email verification and notifications</li>
              </ul>
            </div>

            <Button 
              onClick={handleNavigateToRegistration}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              Start Registration Process
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Button variant="link" className="px-0" onClick={onLogin}>
                Sign in here
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
