
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

export const MaintenanceMode = () => {
  const { config } = useSiteSettings();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#073B4C]">
            Site Under Maintenance
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            {config.siteName} is currently undergoing scheduled maintenance. 
            We'll be back online shortly.
          </p>
          <div className="pt-4 border-t space-y-2">
            <p className="text-sm text-gray-500">For urgent matters, contact us:</p>
            <p className="font-medium">{config.contactEmail}</p>
            <p className="font-medium">{config.contactPhone}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
