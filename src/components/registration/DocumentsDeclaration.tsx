
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { FileText, Upload, Check } from "lucide-react";
import { RegistrationData } from "@/pages/Registration";

interface DocumentsDeclarationProps {
  data: RegistrationData;
  onPrevious: () => void;
  onSubmit: () => void;
  onUpdate: (data: Partial<RegistrationData>) => void;
}

interface RequiredDocument {
  key: keyof RegistrationData['documents'];
  label: string;
  required: boolean;
  acceptedFormats: string;
  description?: string;
}

export const DocumentsDeclaration = ({ data, onPrevious, onSubmit, onUpdate }: DocumentsDeclarationProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getRequiredDocuments = (): RequiredDocument[] => {
    const baseDocuments: RequiredDocument[] = [
      {
        key: "passportPhoto",
        label: "Passport Photograph",
        required: true,
        acceptedFormats: "JPEG, PNG",
        description: "Recent passport-sized photograph"
      },
      {
        key: "academicCertificates",
        label: "Academic Certificates",
        required: true,
        acceptedFormats: "PDF, JPEG, PNG",
        description: "All relevant academic certificates and transcripts"
      },
      {
        key: "proofOfIdentity",
        label: "Proof of Identity",
        required: true,
        acceptedFormats: "PDF, JPEG, PNG",
        description: "National ID, Driver's License, or International Passport"
      }
    ];

    // Add conditional documents based on membership type
    if (["professional", "fellow"].includes(data.membershipType)) {
      baseDocuments.push({
        key: "toprecCertificate",
        label: "TOPREC Certificate",
        required: true,
        acceptedFormats: "PDF, JPEG, PNG",
        description: "Valid TOPREC registration certificate"
      });
      baseDocuments.push({
        key: "cv",
        label: "Curriculum Vitae (CV)",
        required: true,
        acceptedFormats: "PDF, DOCX",
        description: "Detailed professional CV or resume"
      });
    } else if (data.membershipType === "associate") {
      baseDocuments.push({
        key: "toprecCertificate",
        label: "TOPREC Certificate",
        required: false,
        acceptedFormats: "PDF, JPEG, PNG",
        description: "TOPREC registration certificate (if available)"
      });
      baseDocuments.push({
        key: "cv",
        label: "Curriculum Vitae (CV)",
        required: false,
        acceptedFormats: "PDF, DOCX",
        description: "Professional CV or resume (optional)"
      });
    }

    baseDocuments.push({
      key: "recommendationLetter",
      label: "Letter of Recommendation",
      required: false,
      acceptedFormats: "PDF, DOCX",
      description: "Professional recommendation letter (optional)"
    });

    return baseDocuments;
  };

  const handleFileUpload = (key: keyof RegistrationData['documents'], file: File | null) => {
    onUpdate({
      documents: {
        ...data.documents,
        [key]: file
      }
    });
    
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: "" }));
    }
  };

  const handleDeclarationChange = (key: keyof RegistrationData['declarations'], checked: boolean) => {
    onUpdate({
      declarations: {
        ...data.declarations,
        [key]: checked
      }
    });
    
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredDocuments = getRequiredDocuments();

    // Validate required documents
    requiredDocuments.forEach(doc => {
      if (doc.required && !data.documents[doc.key]) {
        newErrors[doc.key] = `${doc.label} is required`;
      }
    });

    // Validate declarations
    const declarations = data.declarations;
    if (!declarations.codeOfEthics) {
      newErrors.codeOfEthics = "You must agree to the Code of Ethics";
    }
    if (!declarations.accuracyConfirmation) {
      newErrors.accuracyConfirmation = "You must confirm the accuracy of information";
    }
    if (!declarations.privacyPolicy) {
      newErrors.privacyPolicy = "You must agree to the Privacy Policy";
    }
    if (!declarations.termsOfService) {
      newErrors.termsOfService = "You must agree to the Terms of Service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

  const requiredDocuments = getRequiredDocuments();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Upload Documents & Final Declaration</CardTitle>
        <p className="text-gray-600">
          Please upload all required documents and complete the final declarations to submit your application.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Document Upload Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Required Documents</h3>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Upload Instructions:</strong> Accepted formats: PDF, JPEG, PNG, DOCX. Maximum file size: 5MB per file.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {requiredDocuments.map((document) => (
              <Card key={document.key} className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Label className="text-sm font-medium">
                        {document.label}
                        {document.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      {data.documents[document.key] && (
                        <Check className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{document.description}</p>
                    <p className="text-xs text-gray-400">Accepted: {document.acceptedFormats}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (file && file.size > 5 * 1024 * 1024) {
                        setErrors(prev => ({ ...prev, [document.key]: "File size must be less than 5MB" }));
                        return;
                      }
                      handleFileUpload(document.key, file);
                    }}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                  
                  {data.documents[document.key] && (
                    <div className="flex items-center space-x-2 text-sm text-green-600">
                      <FileText className="w-4 h-4" />
                      <span>{data.documents[document.key]?.name}</span>
                    </div>
                  )}
                  
                  {errors[document.key] && (
                    <p className="text-sm text-red-500">{errors[document.key]}</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Declaration Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Declaration & Consent</h3>
          
          <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="codeOfEthics"
                checked={data.declarations.codeOfEthics}
                onCheckedChange={(checked) => handleDeclarationChange("codeOfEthics", checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor="codeOfEthics" className="text-sm">
                  I agree to abide by the NITP Code of Ethics and Professional Conduct *
                </Label>
                {errors.codeOfEthics && (
                  <p className="text-xs text-red-500 mt-1">{errors.codeOfEthics}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="accuracyConfirmation"
                checked={data.declarations.accuracyConfirmation}
                onCheckedChange={(checked) => handleDeclarationChange("accuracyConfirmation", checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor="accuracyConfirmation" className="text-sm">
                  I confirm that all information provided in this application is true and accurate to the best of my knowledge *
                </Label>
                {errors.accuracyConfirmation && (
                  <p className="text-xs text-red-500 mt-1">{errors.accuracyConfirmation}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="privacyPolicy"
                checked={data.declarations.privacyPolicy}
                onCheckedChange={(checked) => handleDeclarationChange("privacyPolicy", checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor="privacyPolicy" className="text-sm">
                  I agree to the <a href="#" className="text-green-600 underline">Privacy Policy</a> *
                </Label>
                {errors.privacyPolicy && (
                  <p className="text-xs text-red-500 mt-1">{errors.privacyPolicy}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="termsOfService"
                checked={data.declarations.termsOfService}
                onCheckedChange={(checked) => handleDeclarationChange("termsOfService", checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor="termsOfService" className="text-sm">
                  I agree to the <a href="#" className="text-green-600 underline">Terms of Service</a> *
                </Label>
                {errors.termsOfService && (
                  <p className="text-xs text-red-500 mt-1">{errors.termsOfService}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onPrevious}>
            Previous
          </Button>
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            Submit Application
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
