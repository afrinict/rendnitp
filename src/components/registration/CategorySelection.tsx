
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, UserCheck, Award, Crown } from "lucide-react";
import { RegistrationData } from "@/pages/Registration";

interface CategorySelectionProps {
  data: RegistrationData;
  onNext: () => void;
  onUpdate: (data: Partial<RegistrationData>) => void;
}

const membershipCategories = [
  {
    value: "student",
    title: "Student Member",
    fee: "₦10,000",
    icon: GraduationCap,
    description: "For undergraduates pursuing a planning-related degree.",
    requirements: [
      "Currently enrolled in an accredited planning program",
      "Valid student ID required",
      "Proof of enrollment"
    ],
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    value: "associate",
    title: "Associate Member",
    fee: "₦25,000",
    icon: UserCheck,
    description: "For graduates with a planning-related degree, awaiting professional licensing or with limited experience.",
    requirements: [
      "Bachelor's degree in planning or related field",
      "Less than 3 years professional experience",
      "Academic transcripts required"
    ],
    color: "bg-green-50 border-green-200 hover:bg-green-100",
    iconColor: "text-green-600"
  },
  {
    value: "professional",
    title: "Professional Member",
    fee: "₦50,000",
    description: "For fully qualified and licensed urban planners with significant professional experience.",
    icon: Award,
    requirements: [
      "TOPREC registration required",
      "Minimum 3 years professional experience",
      "Professional portfolio/CV required"
    ],
    color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    value: "fellow",
    title: "Fellow",
    fee: "₦90,000",
    description: "An honorary title for distinguished members with exceptional contributions to the planning profession.",
    icon: Crown,
    requirements: [
      "Minimum 10 years professional experience",
      "Significant contributions to planning profession",
      "Professional recommendations required"
    ],
    color: "bg-amber-50 border-amber-200 hover:bg-amber-100",
    iconColor: "text-amber-600"
  }
];

export const CategorySelection = ({ data, onNext, onUpdate }: CategorySelectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState(data.membershipType);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    onUpdate({ membershipType: category });
  };

  const handleNext = () => {
    if (selectedCategory) {
      onNext();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Select Your Membership Category</CardTitle>
        <p className="text-gray-600">
          Please choose the membership category that best aligns with your current academic standing or professional qualifications.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {membershipCategories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.value;
            
            return (
              <Card
                key={category.value}
                className={`cursor-pointer transition-all duration-200 ${category.color} ${
                  isSelected ? 'ring-2 ring-green-500 shadow-lg' : ''
                }`}
                onClick={() => handleCategorySelect(category.value)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-8 w-8 ${category.iconColor}`} />
                      <div>
                        <h3 className="font-semibold text-lg">{category.title}</h3>
                        <Badge variant="secondary" className="mt-1">
                          {category.fee}
                        </Badge>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-700 mb-4">{category.description}</p>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {category.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-end pt-6">
          <Button 
            onClick={handleNext}
            disabled={!selectedCategory}
            className="bg-green-600 hover:bg-green-700"
          >
            Next: Account Information
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
