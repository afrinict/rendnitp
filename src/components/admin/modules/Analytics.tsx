
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Users, FileText, DollarSign, Calendar, Download } from "lucide-react";

export const Analytics = () => {
  const membershipGrowth = [
    { month: "Jan", members: 1120 },
    { month: "Feb", members: 1150 },
    { month: "Mar", members: 1180 },
    { month: "Apr", members: 1200 },
    { month: "May", members: 1230 },
    { month: "Jun", members: 1247 }
  ];

  const applicationStats = [
    { type: "SAR", approved: 142, pending: 23, rejected: 8 },
    { type: "EIAR", approved: 89, pending: 15, rejected: 4 }
  ];

  const revenueData = [
    { month: "Jan", revenue: 2100000 },
    { month: "Feb", revenue: 2350000 },
    { month: "Mar", revenue: 2200000 },
    { month: "Apr", revenue: 2450000 },
    { month: "May", revenue: 2300000 },
    { month: "Jun", revenue: 2400000 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BarChart3 className="h-8 w-8 text-[#073B4C]" />
          <h1 className="text-3xl font-bold text-[#073B4C]">Analytics & Reports</h1>
        </div>
        <Button className="bg-[#118AB2] hover:bg-[#073B4C]">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">12.5%</div>
                <div className="text-sm text-gray-600">Growth Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">127</div>
                <div className="text-sm text-gray-600">New Members (30d)</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-600">38</div>
                <div className="text-sm text-gray-600">Applications (30d)</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-[#118AB2]" />
              <div>
                <div className="text-2xl font-bold text-[#118AB2]">{formatCurrency(2400000)}</div>
                <div className="text-sm text-gray-600">Revenue (MTD)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="membership" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="membership" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Membership Growth Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2 pt-4">
                  {membershipGrowth.map((data, index) => (
                    <div key={data.month} className="flex flex-col items-center space-y-2">
                      <div
                        className="bg-[#118AB2] rounded-t"
                        style={{
                          height: `${(data.members / 1300) * 200}px`,
                          width: '40px'
                        }}
                      ></div>
                      <span className="text-xs text-gray-600">{data.month}</span>
                      <span className="text-xs font-medium">{data.members}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Membership Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Professional</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded">
                        <div className="w-16 h-2 bg-[#118AB2] rounded"></div>
                      </div>
                      <span className="text-sm font-medium">67%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Student</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded">
                        <div className="w-6 h-2 bg-[#06D6A0] rounded"></div>
                      </div>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fellow</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded">
                        <div className="w-2 h-2 bg-[#FFD166] rounded"></div>
                      </div>
                      <span className="text-sm font-medium">8%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicationStats.map((stat) => (
                    <div key={stat.type} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-3">{stat.type} Applications</h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-xl font-bold text-green-600">{stat.approved}</div>
                          <div className="text-xs text-gray-600">Approved</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-yellow-600">{stat.pending}</div>
                          <div className="text-xs text-gray-600">Pending</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-red-600">{stat.rejected}</div>
                          <div className="text-xs text-gray-600">Rejected</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Processing Time Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Processing Time</span>
                    <span className="text-lg font-bold text-[#073B4C]">14 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fastest Processing</span>
                    <span className="text-lg font-bold text-green-600">7 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Longest Processing</span>
                    <span className="text-lg font-bold text-red-600">45 days</span>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-gray-600 mb-2">Processing Efficiency</div>
                    <div className="w-full h-2 bg-gray-200 rounded">
                      <div className="w-4/5 h-2 bg-[#06D6A0] rounded"></div>
                    </div>
                    <div className="text-sm font-medium mt-1">80% within target</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2 pt-4">
                  {revenueData.map((data, index) => (
                    <div key={data.month} className="flex flex-col items-center space-y-2">
                      <div
                        className="bg-[#06D6A0] rounded-t"
                        style={{
                          height: `${(data.revenue / 2500000) * 200}px`,
                          width: '40px'
                        }}
                      ></div>
                      <span className="text-xs text-gray-600">{data.month}</span>
                      <span className="text-xs font-medium">{formatCurrency(data.revenue / 1000000)}M</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Membership Fees</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded">
                        <div className="w-20 h-2 bg-[#118AB2] rounded"></div>
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Application Fees</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded">
                        <div className="w-3 h-2 bg-[#06D6A0] rounded"></div>
                      </div>
                      <span className="text-sm font-medium">12%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Events & Training</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded">
                        <div className="w-1 h-2 bg-[#FFD166] rounded"></div>
                      </div>
                      <span className="text-sm font-medium">3%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monthly Visitors</span>
                    <span className="text-lg font-bold text-[#073B4C]">12,450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Page Views</span>
                    <span className="text-lg font-bold text-[#118AB2]">45,230</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. Session Duration</span>
                    <span className="text-lg font-bold text-[#06D6A0]">5:42</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bounce Rate</span>
                    <span className="text-lg font-bold text-orange-600">32%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Event Participation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Events This Month</span>
                    <span className="text-lg font-bold text-[#073B4C]">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Attendees</span>
                    <span className="text-lg font-bold text-[#118AB2]">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. Attendance Rate</span>
                    <span className="text-lg font-bold text-green-600">78%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Member Satisfaction</span>
                    <span className="text-lg font-bold text-[#06D6A0]">4.6/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
