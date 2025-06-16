import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";
import { RegistrationData } from "@/pages/Registration";

interface QualificationsStepProps {
  data: RegistrationData;
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<RegistrationData>) => void;
}

export const QualificationsStep = ({ data, onNext, onPrevious, onUpdate }: QualificationsStepProps) => {
  const requiresTOPREC = ["associate", "professional", "fellow"].includes(data.membershipType);

  const addEducation = () => {
    const newEducation = [...data.educationalQualifications, { degree: "", institution: "", year: "", specialization: "" }];
    onUpdate({ educationalQualifications: newEducation });
  };

  const removeEducation = (index: number) => {
    const newEducation = data.educationalQualifications.filter((_, i) => i !== index);
    onUpdate({ educationalQualifications: newEducation });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...data.educationalQualifications];
    newEducation[index] = { ...newEducation[index], [field]: value };
    onUpdate({ educationalQualifications: newEducation });
  };

  const addMembership = () => {
    const newMemberships = [...data.otherMemberships, { organization: "", membershipType: "", year: "" }];
    onUpdate({ otherMemberships: newMemberships });
  };

  const removeMembership = (index: number) => {
    const newMemberships = data.otherMemberships.filter((_, i) => i !== index);
    onUpdate({ otherMemberships: newMemberships });
  };

  const updateMembership = (index: number, field: string, value: string) => {
    const newMemberships = [...data.otherMemberships];
    newMemberships[index] = { ...newMemberships[index], [field]: value };
    onUpdate({ otherMemberships: newMemberships });
  };

  const addEmployment = () => {
    const newEmployment = [...data.employmentRecord, { employer: "", jobTitle: "", startDate: "", endDate: "", responsibilities: "" }];
    onUpdate({ employmentRecord: newEmployment });
  };

  const removeEmployment = (index: number) => {
    const newEmployment = data.employmentRecord.filter((_, i) => i !== index);
    onUpdate({ employmentRecord: newEmployment });
  };

  const updateEmployment = (index: number, field: string, value: string) => {
    const newEmployment = [...data.employmentRecord];
    newEmployment[index] = { ...newEmployment[index], [field]: value };
    onUpdate({ employmentRecord: newEmployment });
  };

  const updateTOPREC = (field: string, value: string | boolean) => {
    onUpdate({
      toprecRegistration: {
        ...data.toprecRegistration,
        [field]: value
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Educational & Professional Qualifications</CardTitle>
        <p className="text-gray-600">
          Please provide details about your educational background, professional registrations, and work experience.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Educational Qualifications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Educational Qualifications *</h3>
            <Button onClick={addEducation} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>

          {data.educationalQualifications.map((education, index) => (
            <Card key={index} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree/Qualification *</Label>
                  <Input
                    value={education.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    placeholder="e.g., B.Sc. Urban and Regional Planning"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Institution *</Label>
                  <Input
                    value={education.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    placeholder="e.g., University of Lagos"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Year of Graduation *</Label>
                  <Input
                    value={education.year}
                    onChange={(e) => updateEducation(index, "year", e.target.value)}
                    placeholder="e.g., 2020"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Specialization</Label>
                  <Input
                    value={education.specialization}
                    onChange={(e) => updateEducation(index, "specialization", e.target.value)}
                    placeholder="e.g., Environmental Planning"
                  />
                </div>
              </div>
              {data.educationalQualifications.length > 1 && (
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={() => removeEducation(index)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* TOPREC Registration */}
        {requiresTOPREC && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">TOPREC Registration</h3>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="toprec-toggle"
                checked={data.toprecRegistration.hasRegistration}
                onCheckedChange={(checked) => updateTOPREC("hasRegistration", checked)}
              />
              <Label htmlFor="toprec-toggle">I am registered with TOPREC</Label>
            </div>

            {data.toprecRegistration.hasRegistration && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>TOPREC Registration Number *</Label>
                  <Input
                    value={data.toprecRegistration.registrationNumber}
                    onChange={(e) => updateTOPREC("registrationNumber", e.target.value)}
                    placeholder="Enter TOPREC number"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Year of Registration *</Label>
                  <Input
                    value={data.toprecRegistration.year}
                    onChange={(e) => updateTOPREC("year", e.target.value)}
                    placeholder="e.g., 2021"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Other Professional Memberships */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Other Professional Memberships</h3>
            <Button onClick={addMembership} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Membership
            </Button>
          </div>

          {data.otherMemberships.length === 0 && (
            <p className="text-gray-500 italic">No other memberships added yet.</p>
          )}

          {data.otherMemberships.map((membership, index) => (
            <Card key={index} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Organization</Label>
                  <Input
                    value={membership.organization}
                    onChange={(e) => updateMembership(index, "organization", e.target.value)}
                    placeholder="e.g., Nigerian Society of Engineers"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Membership Type</Label>
                  <Input
                    value={membership.membershipType}
                    onChange={(e) => updateMembership(index, "membershipType", e.target.value)}
                    placeholder="e.g., Associate Member"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Year Joined</Label>
                  <Input
                    value={membership.year}
                    onChange={(e) => updateMembership(index, "year", e.target.value)}
                    placeholder="e.g., 2019"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => removeMembership(index)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Employment Record */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Employment Record</h3>
            <Button onClick={addEmployment} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Employment
            </Button>
          </div>

          {data.employmentRecord.length === 0 && (
            <p className="text-gray-500 italic">No employment records added yet.</p>
          )}

          {data.employmentRecord.map((employment, index) => (
            <Card key={index} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Employer</Label>
                  <Input
                    value={employment.employer}
                    onChange={(e) => updateEmployment(index, "employer", e.target.value)}
                    placeholder="Company/Organization name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input
                    value={employment.jobTitle}
                    onChange={(e) => updateEmployment(index, "jobTitle", e.target.value)}
                    placeholder="Your position"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={employment.startDate}
                    onChange={(e) => updateEmployment(index, "startDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={employment.endDate}
                    onChange={(e) => updateEmployment(index, "endDate", e.target.value)}
                    placeholder="Leave blank if current job"
                  />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label>Key Responsibilities</Label>
                <Textarea
                  value={employment.responsibilities}
                  onChange={(e) => updateEmployment(index, "responsibilities", e.target.value)}
                  placeholder="Describe your key responsibilities and achievements"
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => removeEmployment(index)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onPrevious}>
            Previous
          </Button>
          <Button onClick={onNext} className="bg-green-600 hover:bg-green-700">
            Next: Documents & Declaration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
