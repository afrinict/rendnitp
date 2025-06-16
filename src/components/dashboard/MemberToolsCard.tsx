
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Wrench, CreditCard, Coins } from "lucide-react";
import { useState } from "react";

interface Tool {
  id: string;
  name: string;
  description: string;
  creditsPerUse: number;
  icon: React.ReactNode;
}

const availableTools: Tool[] = [
  {
    id: "coordinate-map",
    name: "Coordinate Map Tool",
    description: "Land verification and location mapping",
    creditsPerUse: 500,
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    id: "web-arcgis",
    name: "Web ArcGIS",
    description: "Professional GIS mapping and analysis",
    creditsPerUse: 1200,
    icon: <Wrench className="w-5 h-5" />,
  },
  {
    id: "web-cad",
    name: "Web CAD",
    description: "Computer-aided design application",
    creditsPerUse: 800,
    icon: <Wrench className="w-5 h-5" />,
  },
];

interface MemberToolsCardProps {
  creditBalance: number;
  onPurchaseCredits: () => void;
  onUseTool: (toolId: string, credits: number) => void;
}

export const MemberToolsCard = ({ creditBalance, onPurchaseCredits, onUseTool }: MemberToolsCardProps) => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleUseTool = (tool: Tool) => {
    if (creditBalance >= tool.creditsPerUse) {
      onUseTool(tool.id, tool.creditsPerUse);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wrench className="w-5 h-5" />
          <span>Member Tools</span>
        </CardTitle>
        <CardDescription>
          Access professional planning tools using credits
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-[#06D6A0]/10 rounded-lg">
          <div className="flex items-center space-x-2">
            <Coins className="w-5 h-5 text-[#06D6A0]" />
            <span className="font-semibold">Credit Balance:</span>
          </div>
          <Badge variant="outline" className="text-lg font-bold">
            {creditBalance.toLocaleString()} credits
          </Badge>
        </div>

        <Button 
          onClick={onPurchaseCredits}
          variant="outline"
          className="w-full border-[#118AB2] text-[#118AB2] hover:bg-[#118AB2] hover:text-white"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Purchase Credits (₁ = 6 credits)
        </Button>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-gray-700">Available Tools:</h4>
          {availableTools.map((tool) => {
            const canAfford = creditBalance >= tool.creditsPerUse;
            return (
              <div 
                key={tool.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  {tool.icon}
                  <div>
                    <p className="font-medium text-sm">{tool.name}</p>
                    <p className="text-xs text-gray-500">{tool.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{tool.creditsPerUse} credits</p>
                  <Button 
                    size="sm"
                    onClick={() => handleUseTool(tool)}
                    disabled={!canAfford}
                    className={`text-xs ${canAfford ? 'bg-[#06D6A0] hover:bg-[#06D6A0]/80' : 'bg-gray-300'}`}
                  >
                    {canAfford ? 'Use Tool' : 'Insufficient Credits'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
