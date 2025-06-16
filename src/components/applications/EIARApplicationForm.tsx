
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { FileText, Upload, ArrowLeft, ArrowRight, CreditCard, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EIARFormData {
  projectTitle: string;
  projectLocation: string;
  coordinates: string;
  projectArea: string;
  projectType: string;
  projectScope: string;
  projectJustification: string;
  fullName: string;
  membershipId: string;
  phoneNumber: string;
  email: string;
  companyName: string;
  registrationNumber: string;
  contactPersonName: string;
  contactPersonPhone: string;
  contactPersonEmail: string;
  climate: string;
  geology: string;
  hydrology: string;
  airQuality: string;
  flora: string;
  fauna: string;
  ecosystems: string;
  demographics: string;
  landUse: string;
  culturalHeritage: string;
  constructionImpacts: string;
  operationImpacts: string;
  decommissioningImpacts: string;
  cumulativeImpacts: string;
  physicalMitigation: string;
  biologicalMitigation: string;
  socioEconomicMitigation: string;
  empSummary: string;
  monitoringPlan: string;
  declarationAccepted: boolean;
  electronicSignature: string;
  declarationDate: string;
  uploadedFiles: { [key: string]: File | null };
}

interface EIARApplicationFormProps {
  applicantType: "individual" | "corporate";
  onSubmit: (data: EIARFormData) => void;
  onBack: () => void;
}

export const EIARApplicationForm = ({ applicantType, onSubmit, onBack }: EIARApplicationFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EIARFormData>({
    projectTitle: "",
    projectLocation: "",
    coordinates: "",
    projectArea: "",
    projectType: "",
    projectScope: "",
    projectJustification: "",
    fullName: "John Doe",
    membershipId: "TP-A32123456",
    phoneNumber: "",
    email: "",
    companyName: "",
    registrationNumber: "",
    contactPersonName: "",
    contactPersonPhone: "",
    contactPersonEmail: "",
    climate: "",
    geology: "",
    hydrology: "",
    airQuality: "",
    flora: "",
    fauna: "",
    ecosystems: "",
    demographics: "",
    landUse: "",
    culturalHeritage: "",
    constructionImpacts: "",
    operationImpacts: "",
    decommissioningImpacts: "",
    cumulativeImpacts: "",
    physicalMitigation: "",
    biologicalMitigation: "",
    socioEconomicMitigation: "",
    empSummary: "",
    monitoringPlan: "",
    declarationAccepted: false,
    electronicSignature: "",
    declarationDate: "",
    uploadedFiles: {
      projectProposal: null,
      baselineStudy: null,
      empDocument: null,
      sitePlan: null,
      surveyReport: null,
      proofOfOwnership: null,
      otherDocuments: null,
    },
  });

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  const fees = {
    individual: { cost: 50000, processing: 9000, total: 59000 },
    corporate: { cost: 90000, processing: 12000, total: 102000 },
  };

  const currentFee = fees[applicantType];
  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: keyof EIARFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: { ...prev.uploadedFiles, [field]: file }
    }));
  };

  const validateStep = (step: number): boolean => {
    const errors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.projectTitle.trim()) errors.projectTitle = "Project title is required";
      if (!formData.projectLocation.trim()) errors.projectLocation = "Project location is required";
      if (!formData.projectArea.trim()) errors.projectArea = "Project area is required";
      if (!formData.projectType.trim()) errors.projectType = "Project type is required";
      if (!formData.projectScope.trim()) errors.projectScope = "Project scope is required";
      if (!formData.projectJustification.trim()) errors.projectJustification = "Project justification is required";
      
      if (applicantType === "individual") {
        if (!formData.phoneNumber.trim()) errors.phoneNumber = "Phone number is required";
        if (!formData.email.trim()) errors.email = "Email is required";
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email format";
      } else {
        if (!formData.companyName.trim()) errors.companyName = "Company name is required";
        if (!formData.registrationNumber.trim()) errors.registrationNumber = "Registration number is required";
        if (!formData.contactPersonName.trim()) errors.contactPersonName = "Contact person name is required";
        if (!formData.contactPersonPhone.trim()) errors.contactPersonPhone = "Contact person phone is required";
        if (!formData.contactPersonEmail.trim()) errors.contactPersonEmail = "Contact person email is required";
        if (formData.contactPersonEmail && !/\S+@\S+\.\S+/.test(formData.contactPersonEmail)) errors.contactPersonEmail = "Invalid email format";
      }
    }

    if (step === 5) {
      if (!formData.uploadedFiles.projectProposal) errors.projectProposal = "Project proposal is required";
      if (!formData.uploadedFiles.baselineStudy) errors.baselineStudy = "Baseline study report is required";
      if (!formData.uploadedFiles.empDocument) errors.empDocument = "Environmental Management Plan is required";
    }

    if (step === 6) {
      if (!formData.declarationAccepted) errors.declarationAccepted = "You must accept the declaration";
      if (!formData.electronicSignature.trim()) errors.electronicSignature = "Electronic signature is required";
      if (!formData.declarationDate) errors.declarationDate = "Declaration date is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSubmit(formData);
      toast({
        title: "EIAR Application Submitted",
        description: "Your EIAR application has been submitted successfully. Redirecting to payment...",
      });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#073B4C] mb-4">Project Information & Contact Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="projectTitle">Project Title *</Label>
                <Input
                  id="projectTitle"
                  value={formData.projectTitle}
                  onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                  placeholder="Enter project title"
                  className={validationErrors.projectTitle ? "border-red-500" : ""}
                />
                {validationErrors.projectTitle && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.projectTitle}</p>
                )}
              </div>
              <div>
                <Label htmlFor="projectArea">Size of Land/Project Area *</Label>
                <Input
                  id="projectArea"
                  value={formData.projectArea}
                  onChange={(e) => handleInputChange("projectArea", e.target.value)}
                  placeholder="e.g., 10 hectares"
                  className={validationErrors.projectArea ? "border-red-500" : ""}
                />
                {validationErrors.projectArea && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.projectArea}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="projectLocation">Project Location/Site Address *</Label>
              <Textarea
                id="projectLocation"
                value={formData.projectLocation}
                onChange={(e) => handleInputChange("projectLocation", e.target.value)}
                placeholder="Enter complete site address"
                className={validationErrors.projectLocation ? "border-red-500" : ""}
              />
              {validationErrors.projectLocation && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.projectLocation}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="coordinates">Coordinates</Label>
                <Input
                  id="coordinates"
                  value={formData.coordinates}
                  onChange={(e) => handleInputChange("coordinates", e.target.value)}
                  placeholder="Latitude, Longitude"
                />
              </div>
              <div>
                <Label htmlFor="projectType">Project Type *</Label>
                <Select onValueChange={(value) => handleInputChange("projectType", value)}>
                  <SelectTrigger className={validationErrors.projectType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential Development</SelectItem>
                    <SelectItem value="commercial">Commercial Development</SelectItem>
                    <SelectItem value="industrial">Industrial Development</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure Project</SelectItem>
                    <SelectItem value="mining">Mining Project</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.projectType && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.projectType}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="projectScope">Detailed Project Scope *</Label>
              <Textarea
                id="projectScope"
                value={formData.projectScope}
                onChange={(e) => handleInputChange("projectScope", e.target.value)}
                placeholder="Provide detailed description of project scope, activities, and components"
                rows={4}
                className={validationErrors.projectScope ? "border-red-500" : ""}
              />
              {validationErrors.projectScope && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.projectScope}</p>
              )}
            </div>

            <div className="mb-6">
              <Label htmlFor="projectJustification">Project Justification *</Label>
              <Textarea
                id="projectJustification"
                value={formData.projectJustification}
                onChange={(e) => handleInputChange("projectJustification", e.target.value)}
                placeholder="Explain the need for this project and its benefits"
                rows={3}
                className={validationErrors.projectJustification ? "border-red-500" : ""}
              />
              {validationErrors.projectJustification && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.projectJustification}</p>
              )}
            </div>

            {/* Contact Information based on applicant type - same as SAR form */}
            {applicantType === "individual" && (
              <div className="border-t pt-6">
                <h4 className="font-semibold text-[#073B4C] mb-4">Applicant Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input value={formData.fullName} disabled className="bg-gray-100" />
                  </div>
                  <div>
                    <Label>Membership ID</Label>
                    <Input value={formData.membershipId} disabled className="bg-gray-100" />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      placeholder="Enter phone number"
                      className={validationErrors.phoneNumber ? "border-red-500" : ""}
                    />
                    {validationErrors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.phoneNumber}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter email address"
                      className={validationErrors.email ? "border-red-500" : ""}
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {applicantType === "corporate" && (
              <div className="border-t pt-6">
                <h4 className="font-semibold text-[#073B4C] mb-4">Corporate Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Company/Organization Name *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      placeholder="Enter company name"
                      className={validationErrors.companyName ? "border-red-500" : ""}
                    />
                    {validationErrors.companyName && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.companyName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="registrationNumber">Company Registration Number (RC No.) *</Label>
                    <Input
                      id="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                      placeholder="Enter RC number"
                      className={validationErrors.registrationNumber ? "border-red-500" : ""}
                    />
                    {validationErrors.registrationNumber && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.registrationNumber}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="contactPersonName">Contact Person's Full Name *</Label>
                    <Input
                      id="contactPersonName"
                      value={formData.contactPersonName}
                      onChange={(e) => handleInputChange("contactPersonName", e.target.value)}
                      placeholder="Enter contact person name"
                      className={validationErrors.contactPersonName ? "border-red-500" : ""}
                    />
                    {validationErrors.contactPersonName && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.contactPersonName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="contactPersonPhone">Contact Person's Phone *</Label>
                    <Input
                      id="contactPersonPhone"
                      value={formData.contactPersonPhone}
                      onChange={(e) => handleInputChange("contactPersonPhone", e.target.value)}
                      placeholder="Enter phone number"
                      className={validationErrors.contactPersonPhone ? "border-red-500" : ""}
                    />
                    {validationErrors.contactPersonPhone && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.contactPersonPhone}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="contactPersonEmail">Contact Person's Email *</Label>
                    <Input
                      id="contactPersonEmail"
                      type="email"
                      value={formData.contactPersonEmail}
                      onChange={(e) => handleInputChange("contactPersonEmail", e.target.value)}
                      placeholder="Enter email address"
                      className={validationErrors.contactPersonEmail ? "border-red-500" : ""}
                    />
                    {validationErrors.contactPersonEmail && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.contactPersonEmail}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#073B4C] mb-4">Environmental Setting & Baseline Data</h3>
            <p className="text-gray-600 mb-6">
              Provide detailed information about the existing environmental conditions at the project site.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-[#118AB2] mb-3">Physical Environment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="climate">Climate & Weather Patterns</Label>
                    <Textarea
                      id="climate"
                      value={formData.climate}
                      onChange={(e) => handleInputChange("climate", e.target.value)}
                      placeholder="Describe local climate conditions, rainfall patterns, temperature ranges"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="geology">Geology & Soil Conditions</Label>
                    <Textarea
                      id="geology"
                      value={formData.geology}
                      onChange={(e) => handleInputChange("geology", e.target.value)}
                      placeholder="Describe soil types, geological formations, stability"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hydrology">Hydrology & Water Resources</Label>
                    <Textarea
                      id="hydrology"
                      value={formData.hydrology}
                      onChange={(e) => handleInputChange("hydrology", e.target.value)}
                      placeholder="Describe water bodies, drainage patterns, groundwater"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="airQuality">Air Quality</Label>
                    <Textarea
                      id="airQuality"
                      value={formData.airQuality}
                      onChange={(e) => handleInputChange("airQuality", e.target.value)}
                      placeholder="Describe current air quality conditions and pollution sources"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#06D6A0] mb-3">Biological Environment</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="flora">Flora & Vegetation</Label>
                    <Textarea
                      id="flora"
                      value={formData.flora}
                      onChange={(e) => handleInputChange("flora", e.target.value)}
                      placeholder="Describe plant species, vegetation types, rare species"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fauna">Fauna & Wildlife</Label>
                    <Textarea
                      id="fauna"
                      value={formData.fauna}
                      onChange={(e) => handleInputChange("fauna", e.target.value)}
                      placeholder="Describe animal species, habitats, migration patterns"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ecosystems">Ecosystems & Habitats</Label>
                    <Textarea
                      id="ecosystems"
                      value={formData.ecosystems}
                      onChange={(e) => handleInputChange("ecosystems", e.target.value)}
                      placeholder="Describe ecosystem types, ecological functions"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#FFD166] mb-3">Socio-Economic & Cultural Environment</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="demographics">Demographics</Label>
                    <Textarea
                      id="demographics"
                      value={formData.demographics}
                      onChange={(e) => handleInputChange("demographics", e.target.value)}
                      placeholder="Describe population, employment, economic activities"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="landUse">Land Use Patterns</Label>
                    <Textarea
                      id="landUse"
                      value={formData.landUse}
                      onChange={(e) => handleInputChange("landUse", e.target.value)}
                      placeholder="Describe current land uses, zoning, development patterns"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="culturalHeritage">Cultural Heritage</Label>
                    <Textarea
                      id="culturalHeritage"
                      value={formData.culturalHeritage}
                      onChange={(e) => handleInputChange("culturalHeritage", e.target.value)}
                      placeholder="Describe historical sites, cultural significance"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#073B4C] mb-4">Potential Ecological Impacts</h3>
            <p className="text-gray-600 mb-6">
              Identify and assess potential environmental impacts during different project phases.
            </p>

            <div className="space-y-6">
              <div>
                <Label htmlFor="constructionImpacts">Construction Phase Impacts</Label>
                <Textarea
                  id="constructionImpacts"
                  value={formData.constructionImpacts}
                  onChange={(e) => handleInputChange("constructionImpacts", e.target.value)}
                  placeholder="Describe potential impacts during construction (noise, dust, habitat disruption, etc.)"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="operationImpacts">Operation Phase Impacts</Label>
                <Textarea
                  id="operationImpacts"
                  value={formData.operationImpacts}
                  onChange={(e) => handleInputChange("operationImpacts", e.target.value)}
                  placeholder="Describe potential impacts during operation (emissions, waste, traffic, etc.)"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="decommissioningImpacts">Decommissioning Phase Impacts</Label>
                <Textarea
                  id="decommissioningImpacts"
                  value={formData.decommissioningImpacts}
                  onChange={(e) => handleInputChange("decommissioningImpacts", e.target.value)}
                  placeholder="Describe potential impacts during decommissioning or project end-of-life"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="cumulativeImpacts">Cumulative, Indirect & Induced Impacts</Label>
                <Textarea
                  id="cumulativeImpacts"
                  value={formData.cumulativeImpacts}
                  onChange={(e) => handleInputChange("cumulativeImpacts", e.target.value)}
                  placeholder="Describe cumulative effects with other projects, indirect impacts, and induced changes"
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#073B4C] mb-4">Mitigation Measures & Impact Management</h3>
            <p className="text-gray-600 mb-6">
              Describe measures to prevent, reduce, or offset identified environmental impacts.
            </p>

            <div className="space-y-6">
              <div>
                <Label htmlFor="physicalMitigation">Measures for Physical Impacts</Label>
                <Textarea
                  id="physicalMitigation"
                  value={formData.physicalMitigation}
                  onChange={(e) => handleInputChange("physicalMitigation", e.target.value)}
                  placeholder="Describe mitigation measures for air, water, soil, and noise impacts"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="biologicalMitigation">Measures for Biological Impacts</Label>
                <Textarea
                  id="biologicalMitigation"
                  value={formData.biologicalMitigation}
                  onChange={(e) => handleInputChange("biologicalMitigation", e.target.value)}
                  placeholder="Describe measures to protect flora, fauna, and ecosystems"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="socioEconomicMitigation">Measures for Socio-Economic Impacts</Label>
                <Textarea
                  id="socioEconomicMitigation"
                  value={formData.socioEconomicMitigation}
                  onChange={(e) => handleInputChange("socioEconomicMitigation", e.target.value)}
                  placeholder="Describe measures to address social and economic impacts"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="empSummary">Environmental Management Plan (EMP) Summary</Label>
                <Textarea
                  id="empSummary"
                  value={formData.empSummary}
                  onChange={(e) => handleInputChange("empSummary", e.target.value)}
                  placeholder="Provide summary of the Environmental Management Plan"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="monitoringPlan">Monitoring Plan Summary</Label>
                <Textarea
                  id="monitoringPlan"
                  value={formData.monitoringPlan}
                  onChange={(e) => handleInputChange("monitoringPlan", e.target.value)}
                  placeholder="Describe monitoring activities, frequency, and responsible parties"
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#073B4C] mb-4">Supporting Attachments</h3>
            <p className="text-gray-600 mb-6">
              Please upload all required documents. Files should be in PDF format and not exceed 25MB each.
            </p>

            <div className="space-y-4">
              {[
                { id: "projectProposal", label: "Project Proposal *", required: true },
                { id: "baselineStudy", label: "Baseline Study Report *", required: true },
                { id: "empDocument", label: "Environmental Management Plan *", required: true },
                { id: "sitePlan", label: "Site Plan/Layout", required: false },
                { id: "surveyReport", label: "Survey Report", required: false },
                { id: "proofOfOwnership", label: "Proof of Ownership", required: false },
                { id: "otherDocuments", label: "Other Supporting Documents", required: false },
              ].map((doc) => (
                <div key={doc.id} className="border border-gray-300 rounded-lg p-4">
                  <Label className="font-medium text-[#073B4C]">
                    {doc.label}
                  </Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#118AB2] transition-colors">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      {formData.uploadedFiles[doc.id] ? formData.uploadedFiles[doc.id]!.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF files only, max 25MB
                    </p>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      id={doc.id}
                      onChange={(e) => handleFileUpload(doc.id, e.target.files?.[0] || null)}
                    />
                    <label
                      htmlFor={doc.id}
                      className="mt-2 inline-block bg-[#118AB2] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#073B4C] transition-colors"
                    >
                      Choose File
                    </label>
                  </div>
                  {validationErrors[doc.id] && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors[doc.id]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#073B4C] mb-4">Declaration & E-Affidavit</h3>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h4 className="font-semibold mb-3">Declaration</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                I hereby declare that all information provided in this EIAR application is true and accurate to the best of my knowledge. 
                I understand that providing false information may result in the rejection of this application and potential disciplinary action. 
                I agree to implement all proposed mitigation measures and comply with environmental monitoring requirements.
                I agree to abide by all terms and conditions set forth by the Nigerian Institute of Town Planners, Abuja Chapter.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="declaration"
                  checked={formData.declarationAccepted}
                  onCheckedChange={(checked) => handleInputChange("declarationAccepted", checked as boolean)}
                />
                <Label htmlFor="declaration" className="text-sm">
                  I accept the above declaration and agree to the terms and conditions
                </Label>
              </div>
              {validationErrors.declarationAccepted && (
                <p className="text-red-500 text-sm">{validationErrors.declarationAccepted}</p>
              )}

              <div>
                <Label htmlFor="electronicSignature">Electronic Signature *</Label>
                <Input
                  id="electronicSignature"
                  value={formData.electronicSignature}
                  onChange={(e) => handleInputChange("electronicSignature", e.target.value)}
                  placeholder="Type your full name as electronic signature"
                  className={validationErrors.electronicSignature ? "border-red-500" : ""}
                />
                {validationErrors.electronicSignature && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.electronicSignature}</p>
                )}
              </div>

              <div>
                <Label htmlFor="declarationDate">Date of Declaration *</Label>
                <Input
                  id="declarationDate"
                  type="date"
                  value={formData.declarationDate}
                  onChange={(e) => handleInputChange("declarationDate", e.target.value)}
                  className={validationErrors.declarationDate ? "border-red-500" : ""}
                />
                {validationErrors.declarationDate && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.declarationDate}</p>
                )}
              </div>
            </div>

            <div className="bg-[#06D6A0]/10 border border-[#06D6A0]/30 rounded-lg p-6 mt-6">
              <h4 className="font-semibold text-[#073B4C] mb-4">Payment Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Certificate Cost:</span>
                  <span>₦{currentFee.cost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee:</span>
                  <span>₦{currentFee.processing.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total Payable:</span>
                  <span className="text-[#06D6A0]">₦{currentFee.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Leaf className="w-6 h-6 text-[#06D6A0]" />
          <span className="text-xl font-bold">EIAR Application - {applicantType === "individual" ? "Individual" : "Corporate"}</span>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back to Selection
        </Button>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {renderStepContent()}

      <div className="flex justify-between mt-8 pt-6 border-t">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="space-x-2">
          <Button variant="outline">
            Save Draft
          </Button>
          
          {currentStep < totalSteps ? (
            <Button onClick={handleNext} className="bg-[#06D6A0] hover:bg-[#06D6A0]/80">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={!formData.declarationAccepted}
              className="bg-[#06D6A0] hover:bg-[#06D6A0]/80"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Proceed to Payment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
