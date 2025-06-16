
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Leaf } from "lucide-react";
import { EIARApplicationForm } from "@/components/applications/EIARApplicationForm";

const EIARApplication = () => {
  const [applicantType, setApplicantType] = useState<"individual" | "corporate" | "">("");
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const fees = {
    individual: { cost: 50000, processing: 9000, total: 59000 },
    corporate: { cost: 90000, processing: 12000, total: 102000 },
  };

  const handleApplicationSubmit = (formData: any) => {
    console.log("EIAR Application submitted:", formData);
    setApplicationSubmitted(true);
    // Here you would typically send the data to your backend/database
    // For now, we'll just log it and show a success state
  };

  const handleBackToSelection = () => {
    setApplicantType("");
  };

  if (applicationSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-600">Application Submitted Successfully!</CardTitle>
              <CardDescription>
                Your EIAR application has been received and is being processed.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p>Application ID: EIAR-{Date.now()}</p>
              <p>You will receive a confirmation email shortly.</p>
              <Button onClick={() => window.location.href = "/dashboard"}>
                Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!applicantType) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="w-6 h-6 text-[#06D6A0]" />
                <span>Ecological Impact Assessment Report (EIAR) Application</span>
              </CardTitle>
              <CardDescription>
                Select your applicant type to begin the EIAR application process
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="applicantType" className="text-base font-medium">
                  Select Applicant Type *
                </Label>
                <Select onValueChange={(value) => setApplicantType(value as "individual" | "corporate")}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose applicant type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual Applicant</SelectItem>
                    <SelectItem value="corporate">Corporation/Organization Applicant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Fee Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-[#06D6A0]/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Individual Application</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Certificate Cost:</span>
                        <span>₦50,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Processing Fee:</span>
                        <span>₦9,000</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total:</span>
                        <span className="text-[#06D6A0]">₦59,000</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[#FF6B6B]/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Corporate Application</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Certificate Cost:</span>
                        <span>₦90,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Admin Fee:</span>
                        <span>₦12,000</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total:</span>
                        <span className="text-[#FF6B6B]">₦102,000</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button 
                onClick={() => applicantType && setApplicantType(applicantType)}
                disabled={!applicantType}
                className="w-full bg-[#06D6A0] hover:bg-[#06D6A0]/80"
              >
                Continue with Application
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Card>
          <CardContent className="p-8">
            <EIARApplicationForm
              applicantType={applicantType}
              onSubmit={handleApplicationSubmit}
              onBack={handleBackToSelection}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EIARApplication;
