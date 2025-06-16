import { useState } from 'react';
import { Card, Button, Input, Label, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { Upload, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type ApplicantType = 'individual' | 'corporate';

interface FormData {
  applicantType: ApplicantType;
  projectTitle: string;
  projectLocation: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  landSize: string;
  landSizeUnit: string;
  projectDescription: string;
  // Individual fields
  fullName?: string;
  membershipId?: string;
  phone?: string;
  email?: string;
  // Corporate fields
  companyName?: string;
  registrationNumber?: string;
  contactPersonName?: string;
  contactPersonPhone?: string;
  contactPersonEmail?: string;
}

export default function SARApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicantType, setApplicantType] = useState<ApplicantType | null>(null);
  const [formData, setFormData] = useState<FormData>({
    applicantType: 'individual',
    projectTitle: '',
    projectLocation: '',
    coordinates: {
      latitude: '',
      longitude: '',
    },
    landSize: '',
    landSizeUnit: 'sqm',
    projectDescription: '',
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCoordinatesChange = (field: 'latitude' | 'longitude', value: string) => {
    setFormData(prev => ({
      ...prev,
      coordinates: {
        ...prev.coordinates,
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    if (currentStep === 1 && !applicantType) {
      toast({
        title: "Selection Required",
        description: "Please select an applicant type to proceed.",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      // TODO: Implement form submission
      toast({
        title: "Success",
        description: "Your SAR application has been submitted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-NITP-MidnightBlue">Choose Your Applicant Type</h2>
        <p className="text-gray-600 mt-2">Please select whether you are applying as an individual member or on behalf of a registered corporation/organization.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          className={`p-6 cursor-pointer transition-all ${
            applicantType === 'individual' 
              ? 'border-NITP-TealGreen ring-2 ring-NITP-TealGreen' 
              : 'hover:border-NITP-TealGreen'
          }`}
          onClick={() => setApplicantType('individual')}
        >
          <div className="flex items-center space-x-4">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              applicantType === 'individual' ? 'border-NITP-TealGreen bg-NITP-TealGreen' : 'border-gray-300'
            }`}>
              {applicantType === 'individual' && <Check className="w-4 h-4 text-white" />}
            </div>
            <div>
              <h3 className="font-semibold text-lg">Individual Applicant</h3>
              <p className="text-gray-600">For applications submitted by a single NITP member.</p>
            </div>
          </div>
        </Card>

        <Card 
          className={`p-6 cursor-pointer transition-all ${
            applicantType === 'corporate' 
              ? 'border-NITP-TealGreen ring-2 ring-NITP-TealGreen' 
              : 'hover:border-NITP-TealGreen'
          }`}
          onClick={() => setApplicantType('corporate')}
        >
          <div className="flex items-center space-x-4">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              applicantType === 'corporate' ? 'border-NITP-TealGreen bg-NITP-TealGreen' : 'border-gray-300'
            }`}>
              {applicantType === 'corporate' && <Check className="w-4 h-4 text-white" />}
            </div>
            <div>
              <h3 className="font-semibold text-lg">Corporation/Organization Applicant</h3>
              <p className="text-gray-600">For applications submitted on behalf of a registered company or organization.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-NITP-MidnightBlue mb-6">Project Information</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="projectTitle">Project Title</Label>
          <Input
            id="projectTitle"
            value={formData.projectTitle}
            onChange={(e) => handleInputChange('projectTitle', e.target.value)}
            placeholder="e.g., Proposed Residential Development at Asokoro Extension"
          />
        </div>

        <div>
          <Label htmlFor="projectLocation">Project Location / Site Address</Label>
          <Textarea
            id="projectLocation"
            value={formData.projectLocation}
            onChange={(e) => handleInputChange('projectLocation', e.target.value)}
            placeholder="Detailed site address, including street, plot number, district, FCT."
            className="h-24"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              value={formData.coordinates.latitude}
              onChange={(e) => handleCoordinatesChange('latitude', e.target.value)}
              placeholder="e.g., 9.0765"
            />
          </div>
          <div>
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              value={formData.coordinates.longitude}
              onChange={(e) => handleCoordinatesChange('longitude', e.target.value)}
              placeholder="e.g., 7.3986"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="landSize">Size of Land/Plot</Label>
            <Input
              id="landSize"
              type="number"
              value={formData.landSize}
              onChange={(e) => handleInputChange('landSize', e.target.value)}
              placeholder="Enter size"
            />
          </div>
          <div>
            <Label htmlFor="landSizeUnit">Unit</Label>
            <Select
              value={formData.landSizeUnit}
              onValueChange={(value) => handleInputChange('landSizeUnit', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sqm">Square Meters (sqm)</SelectItem>
                <SelectItem value="hectares">Hectares</SelectItem>
                <SelectItem value="acres">Acres</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="projectDescription">Brief Project Description</Label>
          <Textarea
            id="projectDescription"
            value={formData.projectDescription}
            onChange={(e) => handleInputChange('projectDescription', e.target.value)}
            placeholder="Provide a concise description of the proposed project, its purpose, and scope."
            className="h-32"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-NITP-MidnightBlue mb-6">
        {applicantType === 'individual' ? 'Applicant Information' : 'Corporate Information'}
      </h2>
      
      <div className="space-y-4">
        {applicantType === 'individual' ? (
          <>
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Your full name"
              />
            </div>
            <div>
              <Label htmlFor="membershipId">Membership ID</Label>
              <Input
                id="membershipId"
                value={formData.membershipId}
                onChange={(e) => handleInputChange('membershipId', e.target.value)}
                placeholder="Your NITP membership ID"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <Label htmlFor="companyName">Company/Organization Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="e.g., ABC Development Ltd."
              />
            </div>
            <div>
              <Label htmlFor="registrationNumber">Company Registration Number (RC No.)</Label>
              <Input
                id="registrationNumber"
                value={formData.registrationNumber}
                onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                placeholder="e.g., RC 123456"
              />
            </div>
            <div>
              <Label htmlFor="contactPersonName">Contact Person's Full Name</Label>
              <Input
                id="contactPersonName"
                value={formData.contactPersonName}
                onChange={(e) => handleInputChange('contactPersonName', e.target.value)}
                placeholder="Name of primary contact for this application"
              />
            </div>
          </>
        )}

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={applicantType === 'individual' ? formData.phone : formData.contactPersonPhone}
            onChange={(e) => handleInputChange(
              applicantType === 'individual' ? 'phone' : 'contactPersonPhone',
              e.target.value
            )}
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={applicantType === 'individual' ? formData.email : formData.contactPersonEmail}
            onChange={(e) => handleInputChange(
              applicantType === 'individual' ? 'email' : 'contactPersonEmail',
              e.target.value
            )}
            placeholder="Enter email address"
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-NITP-MidnightBlue mb-6">Supporting Documents</h2>
      
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-NITP-TealGreen transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Drag & drop files here or click to browse</p>
          <p className="text-sm text-gray-500 mt-2">Max 5MB per file, accepted formats: PDF, JPEG, PNG</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Required Documents</Label>
            <ul className="mt-2 space-y-2">
              <li className="text-sm text-gray-600">• Copy of Title Document / Certificate of Occupancy (C of O)</li>
              <li className="text-sm text-gray-600">• Proof of Ownership (e.g., Allocation Letter, Survey Plan)</li>
              <li className="text-sm text-gray-600">• Site Plan (Proposed or Existing)</li>
            </ul>
          </div>

          <div>
            <Label>Optional Documents</Label>
            <ul className="mt-2 space-y-2">
              <li className="text-sm text-gray-600">• Any Other Supporting Document</li>
              {applicantType === 'corporate' && (
                <li className="text-sm text-gray-600">• Corporate Affairs Commission (CAC) Registration Documents</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-NITP-MidnightBlue mb-6">Declaration & E-Affidavit</h2>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700">
            I, {applicantType === 'individual' ? formData.fullName : formData.contactPersonName},
            {applicantType === 'corporate' ? ` representing ${formData.companyName},` : ''} hereby declare that all information
            and documents submitted in this application are true, accurate, and original to the best of my knowledge and belief.
            {applicantType === 'corporate' ? ' I am duly authorized to make this declaration on behalf of the aforementioned corporation/organization.' : ''}
            I understand that any false declaration or submission of fraudulent documents may lead to the rejection of this application
            and disciplinary action by NITP Abuja Chapter.
          </p>
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="declaration"
            className="mt-1 accent-NITP-TealGreen"
            required
          />
          <Label htmlFor="declaration" className="text-gray-700">
            I solemnly declare that the information provided is correct and understand the implications of providing false information.
          </Label>
        </div>

        <div>
          <Label>Electronic Signature</Label>
          <div className="mt-2 border rounded-md p-4 h-32 flex items-center justify-center">
            <p className="text-gray-500">Draw your signature here or type your full name</p>
          </div>
        </div>

        <div>
          <Label>Date of Declaration</Label>
          <Input
            type="text"
            value={new Date().toLocaleDateString()}
            disabled
            className="bg-gray-100"
          />
        </div>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-NITP-MidnightBlue mb-6">Application Fee Summary</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-700">Actual Certificate Cost:</span>
            <span className="font-semibold">
              ₦{applicantType === 'individual' ? '25,000' : '45,000'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">
              {applicantType === 'individual' ? 'Processing Fee:' : 'Administrative Fee:'}
            </span>
            <span className="font-semibold">
              ₦{applicantType === 'individual' ? '4,700' : '7,200'}
            </span>
          </div>
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between">
              <span className="text-NITP-MidnightBlue font-bold text-lg">Total Payable:</span>
              <span className="text-NITP-MidnightBlue font-bold text-lg">
                ₦{applicantType === 'individual' ? '29,700' : '52,200'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      case 6:
        return renderStep6();
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="w-full h-2 bg-gray-300 rounded-full">
          <div
            className="h-full bg-NITP-TealGreen rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Step {currentStep} of 6</span>
          <span>
            {currentStep === 1 && 'Choose Applicant Type'}
            {currentStep === 2 && 'Project Information'}
            {currentStep === 3 && (applicantType === 'individual' ? 'Applicant Information' : 'Corporate Information')}
            {currentStep === 4 && 'Supporting Documents'}
            {currentStep === 5 && 'Declaration & E-Affidavit'}
            {currentStep === 6 && 'Fee Summary'}
          </span>
        </div>
      </div>

      <Card className="p-8">
        {renderCurrentStep()}

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          )}
          
          {currentStep < 6 ? (
            <Button
              onClick={handleNext}
              className="flex items-center ml-auto"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="flex items-center ml-auto bg-NITP-TealGreen hover:bg-NITP-CeruleanBlue"
            >
              Submit Application
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
} 