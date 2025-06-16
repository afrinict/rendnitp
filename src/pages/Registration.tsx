
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CategorySelection } from "@/components/registration/CategorySelection";
import { AccountInformation } from "@/components/registration/AccountInformation";
import { QualificationsStep } from "@/components/registration/QualificationsStep";
import { DocumentsDeclaration } from "@/components/registration/DocumentsDeclaration";
import { RegistrationComplete } from "@/components/registration/RegistrationComplete";
import { toast } from "sonner";

export interface RegistrationData {
  // Step 1
  membershipType: string;
  
  // Step 2
  email: string;
  password: string;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  stateOfOrigin: string;
  lgaOfOrigin: string;
  residentialAddress: string;
  phoneNumber: string;
  whatsappNumber: string;
  
  // Step 3
  educationalQualifications: Array<{
    degree: string;
    institution: string;
    year: string;
    specialization: string;
  }>;
  toprecRegistration: {
    hasRegistration: boolean;
    registrationNumber: string;
    year: string;
  };
  otherMemberships: Array<{
    organization: string;
    membershipType: string;
    year: string;
  }>;
  employmentRecord: Array<{
    employer: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    responsibilities: string;
  }>;
  
  // Step 4
  documents: {
    passportPhoto: File | null;
    academicCertificates: File | null;
    toprecCertificate: File | null;
    cv: File | null;
    proofOfIdentity: File | null;
    recommendationLetter: File | null;
  };
  declarations: {
    codeOfEthics: boolean;
    accuracyConfirmation: boolean;
    privacyPolicy: boolean;
    termsOfService: boolean;
  };
}

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    membershipType: "",
    email: "",
    password: "",
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    stateOfOrigin: "",
    lgaOfOrigin: "",
    residentialAddress: "",
    phoneNumber: "",
    whatsappNumber: "",
    educationalQualifications: [{ degree: "", institution: "", year: "", specialization: "" }],
    toprecRegistration: { hasRegistration: false, registrationNumber: "", year: "" },
    otherMemberships: [],
    employmentRecord: [],
    documents: {
      passportPhoto: null,
      academicCertificates: null,
      toprecCertificate: null,
      cv: null,
      proofOfIdentity: null,
      recommendationLetter: null,
    },
    declarations: {
      codeOfEthics: false,
      accuracyConfirmation: false,
      privacyPolicy: false,
      termsOfService: false,
    },
  });

  const updateRegistrationData = (stepData: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateApplicationId = () => {
    return `REG-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
  };

  const handleSubmitApplication = () => {
    console.log("Submitting application:", registrationData);
    
    // Generate application ID
    const appId = generateApplicationId();
    setApplicationId(appId);
    
    // Simulate saving to localStorage (in real app, this would be sent to backend)
    const savedApplications = JSON.parse(localStorage.getItem('pendingApplications') || '[]');
    
    const newApplication = {
      id: appId,
      applicantName: `${registrationData.title} ${registrationData.firstName} ${registrationData.middleName} ${registrationData.lastName}`.trim(),
      email: registrationData.email,
      membershipType: registrationData.membershipType,
      status: "pending_email",
      submissionDate: new Date().toISOString().split('T')[0],
      documentsUploaded: Object.values(registrationData.documents).filter(doc => doc !== null).length,
      totalDocuments: Object.keys(registrationData.documents).length,
      formData: registrationData,
      membershipId: null // Will be generated when approved
    };
    
    savedApplications.push(newApplication);
    localStorage.setItem('pendingApplications', JSON.stringify(savedApplications));
    
    toast.success("Application submitted successfully!");
    setIsSubmitted(true);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CategorySelection
            data={registrationData}
            onNext={nextStep}
            onUpdate={updateRegistrationData}
          />
        );
      case 2:
        return (
          <AccountInformation
            data={registrationData}
            onNext={nextStep}
            onPrevious={previousStep}
            onUpdate={updateRegistrationData}
          />
        );
      case 3:
        return (
          <QualificationsStep
            data={registrationData}
            onNext={nextStep}
            onPrevious={previousStep}
            onUpdate={updateRegistrationData}
          />
        );
      case 4:
        return (
          <DocumentsDeclaration
            data={registrationData}
            onPrevious={previousStep}
            onSubmit={handleSubmitApplication}
            onUpdate={updateRegistrationData}
          />
        );
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return <RegistrationComplete applicationId={applicationId} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">NITP Membership Registration</h1>
              <p className="text-gray-600">Step {currentStep} of 4</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  );
};

export default Registration;
