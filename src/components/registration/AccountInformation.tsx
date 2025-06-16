
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { RegistrationData } from "@/pages/Registration";

interface AccountInformationProps {
  data: RegistrationData;
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<RegistrationData>) => void;
}

const titles = ["Mr.", "Mrs.", "Miss", "Dr.", "Prof.", "Eng.", "Arch.", "Planner"];
const genders = ["Male", "Female"];
const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara"
];

export const AccountInformation = ({ data, onNext, onPrevious, onUpdate }: AccountInformationProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.email) newErrors.email = "Email is required";
    if (!data.email.includes("@")) newErrors.email = "Please enter a valid email";
    
    if (!data.password) newErrors.password = "Password is required";
    if (data.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    if (data.password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    if (!data.firstName) newErrors.firstName = "First name is required";
    if (!data.lastName) newErrors.lastName = "Last name is required";
    if (!data.title) newErrors.title = "Title is required";
    if (!data.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!data.gender) newErrors.gender = "Gender is required";
    if (!data.nationality) newErrors.nationality = "Nationality is required";
    if (!data.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!data.residentialAddress) newErrors.residentialAddress = "Residential address is required";
    
    if (data.nationality === "Nigerian") {
      if (!data.stateOfOrigin) newErrors.stateOfOrigin = "State of origin is required";
      if (!data.lgaOfOrigin) newErrors.lgaOfOrigin = "LGA of origin is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    onUpdate({ [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Create Your Account & Personal Details</CardTitle>
        <p className="text-gray-600">
          Please provide your account information and personal details for your membership profile.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Account Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Create a strong password"
                  className={errors.password ? "border-red-500" : ""}
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
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Personal Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Select value={data.title} onValueChange={(value) => handleInputChange("title", value)}>
                <SelectTrigger className={errors.title ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select title" />
                </SelectTrigger>
                <SelectContent>
                  {titles.map((title) => (
                    <SelectItem key={title} value={title}>{title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={data.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="John"
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input
                id="middleName"
                value={data.middleName}
                onChange={(e) => handleInputChange("middleName", e.target.value)}
                placeholder="Middle name (optional)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={data.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Doe"
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={data.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                className={errors.dateOfBirth ? "border-red-500" : ""}
              />
              {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select value={data.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality *</Label>
              <Select value={data.nationality} onValueChange={(value) => handleInputChange("nationality", value)}>
                <SelectTrigger className={errors.nationality ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nigerian">Nigerian</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.nationality && <p className="text-sm text-red-500">{errors.nationality}</p>}
            </div>
          </div>

          {data.nationality === "Nigerian" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stateOfOrigin">State of Origin *</Label>
                <Select value={data.stateOfOrigin} onValueChange={(value) => handleInputChange("stateOfOrigin", value)}>
                  <SelectTrigger className={errors.stateOfOrigin ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {nigerianStates.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.stateOfOrigin && <p className="text-sm text-red-500">{errors.stateOfOrigin}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lgaOfOrigin">Local Government Area *</Label>
                <Input
                  id="lgaOfOrigin"
                  value={data.lgaOfOrigin}
                  onChange={(e) => handleInputChange("lgaOfOrigin", e.target.value)}
                  placeholder="Enter your LGA"
                  className={errors.lgaOfOrigin ? "border-red-500" : ""}
                />
                {errors.lgaOfOrigin && <p className="text-sm text-red-500">{errors.lgaOfOrigin}</p>}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="residentialAddress">Residential Address *</Label>
            <Input
              id="residentialAddress"
              value={data.residentialAddress}
              onChange={(e) => handleInputChange("residentialAddress", e.target.value)}
              placeholder="Enter your full residential address"
              className={errors.residentialAddress ? "border-red-500" : ""}
            />
            {errors.residentialAddress && <p className="text-sm text-red-500">{errors.residentialAddress}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={data.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                placeholder="+234 800 000 0000"
                className={errors.phoneNumber ? "border-red-500" : ""}
              />
              {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
              <Input
                id="whatsappNumber"
                type="tel"
                value={data.whatsappNumber}
                onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                placeholder="+234 800 000 0000 (optional)"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onPrevious}>
            Previous
          </Button>
          <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
            Next: Qualifications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
