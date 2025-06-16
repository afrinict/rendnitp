import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { User, Mail, Phone, MapPin, Briefcase, Award } from 'lucide-react';

interface ProfileData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    profileImage: string;
  };
  professionalInfo: {
    membershipNumber: string;
    membershipType: string;
    specialization: string;
    yearsOfExperience: number;
    currentPosition: string;
    organization: string;
    qualifications: string[];
    certifications: string[];
  };
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    privacy: {
      profileVisibility: string;
      showContactInfo: boolean;
      showQualifications: boolean;
    };
  };
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<ProfileData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      profileImage: '',
    },
    professionalInfo: {
      membershipNumber: 'TPA3628472915',
      membershipType: 'Full Member',
      specialization: '',
      yearsOfExperience: 0,
      currentPosition: '',
      organization: '',
      qualifications: [],
      certifications: [],
    },
    preferences: {
      notifications: {
        email: true,
        sms: true,
        push: true,
      },
      privacy: {
        profileVisibility: 'public',
        showContactInfo: true,
        showQualifications: true,
      },
    },
  });

  const toast = useToast();

  useEffect(() => {
    // Fetch user profile data when component mounts
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch('/api/profile');
      if (!response.ok) throw new Error('Failed to fetch profile data');
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile data',
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (section: keyof ProfileData, field: string, value: any) => {
    setUserData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleArrayItemChange = (section: keyof ProfileData, field: string, index: number, value: string) => {
    setUserData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].map((item: string, i: number) => 
          i === index ? value : item
        ),
      },
    }));
  };

  const handleAddArrayItem = (section: keyof ProfileData, field: string) => {
    setUserData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], ''],
      },
    }));
  };

  const handleRemoveArrayItem = (section: keyof ProfileData, field: string, index: number) => {
    setUserData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].filter((_: string, i: number) => i !== index),
      },
    }));
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'current-user-id', // Replace with actual user ID from auth context
          profileData: userData,
        }),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Button
          onClick={() => isEditing ? handleSaveChanges() : setIsEditing(true)}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                value={userData.personalInfo.fullName}
                onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                disabled={!isEditing}
                icon={<User className="w-4 h-4" />}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={userData.personalInfo.email}
                onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                disabled={!isEditing}
                icon={<Mail className="w-4 h-4" />}
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={userData.personalInfo.phone}
                onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                disabled={!isEditing}
                icon={<Phone className="w-4 h-4" />}
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                value={userData.personalInfo.address}
                onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                disabled={!isEditing}
                icon={<MapPin className="w-4 h-4" />}
              />
            </div>
          </div>
        </Card>

        {/* Professional Details */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Professional Details</h2>
          <div className="space-y-4">
            <div>
              <Label>Membership Number</Label>
              <Input
                value={userData.professionalInfo.membershipNumber}
                disabled
                icon={<Briefcase className="w-4 h-4" />}
              />
            </div>
            <div>
              <Label>Membership Type</Label>
              <Input
                value={userData.professionalInfo.membershipType}
                disabled
                icon={<Award className="w-4 h-4" />}
              />
            </div>
            <div>
              <Label>Specialization</Label>
              <Input
                value={userData.professionalInfo.specialization}
                onChange={(e) => handleInputChange('professionalInfo', 'specialization', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>Years of Experience</Label>
              <Input
                type="number"
                value={userData.professionalInfo.yearsOfExperience}
                onChange={(e) => handleInputChange('professionalInfo', 'yearsOfExperience', parseInt(e.target.value))}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>Current Position</Label>
              <Input
                value={userData.professionalInfo.currentPosition}
                onChange={(e) => handleInputChange('professionalInfo', 'currentPosition', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>Organization</Label>
              <Input
                value={userData.professionalInfo.organization}
                onChange={(e) => handleInputChange('professionalInfo', 'organization', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </Card>

        {/* Settings */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <Tabs defaultValue="notifications">
            <Tabs.List>
              <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
              <Tabs.Trigger value="privacy">Privacy</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="notifications">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Email Notifications</Label>
                  <input
                    type="checkbox"
                    checked={userData.preferences.notifications.email}
                    onChange={(e) => handleInputChange('preferences', 'notifications', {
                      ...userData.preferences.notifications,
                      email: e.target.checked,
                    })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>SMS Notifications</Label>
                  <input
                    type="checkbox"
                    checked={userData.preferences.notifications.sms}
                    onChange={(e) => handleInputChange('preferences', 'notifications', {
                      ...userData.preferences.notifications,
                      sms: e.target.checked,
                    })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Push Notifications</Label>
                  <input
                    type="checkbox"
                    checked={userData.preferences.notifications.push}
                    onChange={(e) => handleInputChange('preferences', 'notifications', {
                      ...userData.preferences.notifications,
                      push: e.target.checked,
                    })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </Tabs.Content>
            <Tabs.Content value="privacy">
              <div className="space-y-4">
                <div>
                  <Label>Profile Visibility</Label>
                  <select
                    value={userData.preferences.privacy.profileVisibility}
                    onChange={(e) => handleInputChange('preferences', 'privacy', {
                      ...userData.preferences.privacy,
                      profileVisibility: e.target.value,
                    })}
                    disabled={!isEditing}
                    className="w-full p-2 border rounded"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="members">Members Only</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Show Contact Info</Label>
                  <input
                    type="checkbox"
                    checked={userData.preferences.privacy.showContactInfo}
                    onChange={(e) => handleInputChange('preferences', 'privacy', {
                      ...userData.preferences.privacy,
                      showContactInfo: e.target.checked,
                    })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Show Qualifications</Label>
                  <input
                    type="checkbox"
                    checked={userData.preferences.privacy.showQualifications}
                    onChange={(e) => handleInputChange('preferences', 'privacy', {
                      ...userData.preferences.privacy,
                      showQualifications: e.target.checked,
                    })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </Tabs.Content>
          </Tabs>
        </Card>
      </div>
    </div>
  );
} 