
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Key, Settings, BarChart3, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FlutterwaveConfig {
  isActive: boolean;
  publicKey: string;
  secretKey: string;
  encryptionKey: string;
  testMode: boolean;
  webhookUrl: string;
  currency: string;
  paymentMethods: string[];
}

export const FlutterwaveManagement = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<FlutterwaveConfig>({
    isActive: false,
    publicKey: "",
    secretKey: "",
    encryptionKey: "",
    testMode: true,
    webhookUrl: "",
    currency: "NGN",
    paymentMethods: ["card", "bank_transfer", "ussd"]
  });

  const [testPayment, setTestPayment] = useState({
    amount: "1000",
    email: "test@example.com",
    description: "Test payment"
  });

  const handleConfigUpdate = (field: keyof FlutterwaveConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveConfig = () => {
    // In a real implementation, this would save to database
    console.log("Saving Flutterwave config:", config);
    toast({
      title: "Configuration Saved",
      description: "Flutterwave settings have been updated successfully.",
    });
  };

  const handleTestPayment = () => {
    // In a real implementation, this would initiate a test payment
    console.log("Testing payment:", testPayment);
    toast({
      title: "Test Payment Initiated",
      description: "Check the console for test payment details.",
    });
  };

  const handleActivateFlutterwave = () => {
    if (!config.publicKey || !config.secretKey) {
      toast({
        title: "Missing Credentials",
        description: "Please provide both public and secret keys before activating.",
        variant: "destructive"
      });
      return;
    }
    
    handleConfigUpdate("isActive", true);
    toast({
      title: "Flutterwave Activated",
      description: "Payment gateway is now active and ready to process payments.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CreditCard className="h-8 w-8 text-[#073B4C]" />
          <div>
            <h1 className="text-3xl font-bold text-[#073B4C]">Flutterwave Management</h1>
            <p className="text-gray-600">Configure and manage payment processing</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={config.isActive ? "default" : "secondary"}>
            {config.isActive ? "Active" : "Inactive"}
          </Badge>
          {config.isActive ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-orange-500" />
          )}
        </div>
      </div>

      <Tabs defaultValue="setup" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Credentials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Public Key</label>
                  <Input
                    type="text"
                    placeholder="FLWPUBK_TEST-..."
                    value={config.publicKey}
                    onChange={(e) => handleConfigUpdate("publicKey", e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Your Flutterwave public key</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Secret Key</label>
                  <Input
                    type="password"
                    placeholder="FLWSECK_TEST-..."
                    value={config.secretKey}
                    onChange={(e) => handleConfigUpdate("secretKey", e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Your Flutterwave secret key</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Encryption Key</label>
                <Input
                  type="password"
                  placeholder="FLWSECK_TEST..."
                  value={config.encryptionKey}
                  onChange={(e) => handleConfigUpdate("encryptionKey", e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Used for securing payment data</p>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Test Mode</label>
                    <p className="text-xs text-gray-500">Use test credentials for development</p>
                  </div>
                  <Switch
                    checked={config.testMode}
                    onCheckedChange={(checked) => handleConfigUpdate("testMode", checked)}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleActivateFlutterwave}
                  className="bg-orange-500 hover:bg-orange-600"
                  disabled={config.isActive}
                >
                  {config.isActive ? "Already Activated" : "Activate Flutterwave"}
                </Button>
                <Button onClick={handleSaveConfig} variant="outline">
                  Save Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Payment Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Default Currency</label>
                  <Input
                    value={config.currency}
                    onChange={(e) => handleConfigUpdate("currency", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Webhook URL</label>
                  <Input
                    placeholder="https://yoursite.com/webhook/flutterwave"
                    value={config.webhookUrl}
                    onChange={(e) => handleConfigUpdate("webhookUrl", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Enabled Payment Methods</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {["card", "bank_transfer", "ussd", "mobile_money", "qr_code", "bank"].map((method) => (
                    <div key={method} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={method}
                        checked={config.paymentMethods.includes(method)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleConfigUpdate("paymentMethods", [...config.paymentMethods, method]);
                          } else {
                            handleConfigUpdate("paymentMethods", config.paymentMethods.filter(m => m !== method));
                          }
                        }}
                      />
                      <label htmlFor={method} className="text-sm capitalize">
                        {method.replace("_", " ")}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Amount (NGN)</label>
                  <Input
                    value={testPayment.amount}
                    onChange={(e) => setTestPayment(prev => ({ ...prev, amount: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={testPayment.email}
                    onChange={(e) => setTestPayment(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    value={testPayment.description}
                    onChange={(e) => setTestPayment(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleTestPayment}
                disabled={!config.isActive}
                className="bg-[#118AB2] hover:bg-[#073B4C]"
              >
                Initiate Test Payment
              </Button>
              
              {!config.isActive && (
                <p className="text-sm text-orange-600">
                  Please activate Flutterwave first to enable testing.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong>Successful Payment:</strong>
                    <p>5531 8866 5214 2950</p>
                    <p>CVV: 564, Expiry: 09/32</p>
                  </div>
                  <div>
                    <strong>Failed Payment:</strong>
                    <p>5840 1111 1111 1111</p>
                    <p>CVV: 123, Expiry: 12/30</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Payment Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded">
                  <h3 className="text-2xl font-bold text-[#118AB2]">₦0</h3>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                </div>
                <div className="text-center p-4 border rounded">
                  <h3 className="text-2xl font-bold text-[#118AB2]">0</h3>
                  <p className="text-sm text-gray-600">Transactions</p>
                </div>
                <div className="text-center p-4 border rounded">
                  <h3 className="text-2xl font-bold text-[#118AB2]">0%</h3>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">
                  Analytics will be available once you start processing payments through Flutterwave.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
