
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Clock, UserCheck } from "lucide-react";

interface RegistrationCompleteProps {
  applicationId: string;
}

export const RegistrationComplete = ({ applicationId }: RegistrationCompleteProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-green-600">Application Submitted Successfully!</CardTitle>
            <p className="text-gray-600">
              Thank you for your interest in joining the Nigerian Institute of Town Planners, Abuja Chapter.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">What happens next?</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Email Verification</p>
                    <p className="text-xs text-green-700">
                      Check your email for a verification link and click it to verify your account.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <UserCheck className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Admin Review</p>
                    <p className="text-xs text-green-700">
                      Our administrators will review your application and supporting documents.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Processing Time</p>
                    <p className="text-xs text-green-700">
                      Applications are typically processed within 5-7 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Important Notes:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• You will receive email notifications at each stage of the review process</li>
                <li>• If additional information is required, you will be contacted via email</li>
                <li>• Upon approval, you will receive payment instructions if applicable</li>
                <li>• Keep this reference for your records: <strong>{applicationId}</strong></li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="font-semibold text-amber-800 mb-2">Need Help?</h3>
              <p className="text-sm text-amber-700">
                If you have any questions about your application, please contact us at{" "}
                <a href="mailto:membership@nitp-abuja.org" className="underline">
                  membership@nitp-abuja.org
                </a>{" "}
                or call +234 (0) 123 456 7890.
              </p>
            </div>

            <div className="flex justify-center space-x-4 pt-4">
              <Button 
                variant="outline" 
                onClick={() => window.location.href = "/"}
              >
                Return to Home
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => window.location.href = "/login"}
              >
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
