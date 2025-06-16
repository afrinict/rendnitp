import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Vote,
  User,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';

export function VotingPage() {
  const [activeTab, setActiveTab] = useState('active');

  // Mock data - replace with actual data from your backend
  const elections = {
    active: [
      {
        id: 1,
        title: 'Chapter Executive Committee Election 2023',
        description: 'Elect the new executive committee members for the Abuja Chapter',
        startDate: '2023-10-01',
        endDate: '2023-10-31',
        status: 'Active',
        progress: 65,
        totalVotes: 150,
        requiredVotes: 200,
        positions: [
          {
            id: 1,
            title: 'Chairman',
            candidates: [
              {
                id: 1,
                name: 'Tpl. John Doe, FNITP',
                bio: 'Senior Urban Planner with 20 years of experience',
                votes: 45,
              },
              {
                id: 2,
                name: 'Tpl. Jane Smith, FNITP',
                bio: 'Urban Development Consultant with 15 years of experience',
                votes: 35,
              },
            ],
          },
          {
            id: 2,
            title: 'Vice Chairman',
            candidates: [
              {
                id: 3,
                name: 'Tpl. Michael Johnson, FNITP',
                bio: 'Planning Director with 18 years of experience',
                votes: 40,
              },
              {
                id: 4,
                name: 'Tpl. Sarah Williams, FNITP',
                bio: 'Urban Design Specialist with 12 years of experience',
                votes: 30,
              },
            ],
          },
        ],
      },
    ],
    upcoming: [
      {
        id: 2,
        title: 'National Council Election 2024',
        description: 'Elect representatives to the National Council',
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        status: 'Upcoming',
      },
    ],
    past: [
      {
        id: 3,
        title: 'Chapter Executive Committee Election 2022',
        description: 'Previous executive committee election results',
        startDate: '2022-10-01',
        endDate: '2022-10-31',
        status: 'Completed',
        winner: 'Tpl. John Doe, FNITP',
        totalVotes: 180,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Voting & Elections</h1>
        <Button variant="outline">
          <Vote className="w-4 h-4 mr-2" />
          View Election History
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Active Elections</span>
            {elections.active.length > 0 && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                {elections.active.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4" />
            <span>Upcoming</span>
            {elections.upcoming.length > 0 && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                {elections.upcoming.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="past" className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Past Elections</span>
          </TabsTrigger>
        </TabsList>

        {/* Active Elections Tab */}
        <TabsContent value="active">
          <div className="space-y-6">
            {elections.active.map((election) => (
              <Card key={election.id} className="p-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">{election.title}</h2>
                    <p className="text-gray-600 mt-1">{election.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Start Date: {election.startDate}</span>
                    <span>End Date: {election.endDate}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Voting Progress</span>
                      <span>
                        {election.totalVotes} / {election.requiredVotes} votes
                      </span>
                    </div>
                    <Progress value={election.progress} className="h-2" />
                  </div>

                  <div className="space-y-6">
                    {election.positions.map((position) => (
                      <div key={position.id} className="space-y-4">
                        <h3 className="text-lg font-semibold">{position.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {position.candidates.map((candidate) => (
                            <Card
                              key={candidate.id}
                              className="p-4 border-2 hover:border-primary transition-colors"
                            >
                              <div className="flex items-start space-x-4">
                                <div className="p-2 bg-gray-100 rounded-full">
                                  <User className="w-6 h-6 text-gray-600" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold">{candidate.name}</h4>
                                  <p className="text-sm text-gray-600 mt-1">{candidate.bio}</p>
                                  <div className="mt-4">
                                    <Button className="w-full">Vote</Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Upcoming Elections Tab */}
        <TabsContent value="upcoming">
          <div className="space-y-6">
            {elections.upcoming.map((election) => (
              <Card key={election.id} className="p-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">{election.title}</h2>
                    <p className="text-gray-600 mt-1">{election.description}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Start Date: {election.startDate}</span>
                    <span>End Date: {election.endDate}</span>
                  </div>
                  <div className="flex items-center text-yellow-600">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    <span>Election will begin on {election.startDate}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Past Elections Tab */}
        <TabsContent value="past">
          <div className="space-y-6">
            {elections.past.map((election) => (
              <Card key={election.id} className="p-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">{election.title}</h2>
                    <p className="text-gray-600 mt-1">{election.description}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Start Date: {election.startDate}</span>
                    <span>End Date: {election.endDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-green-600">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      <span>Winner: {election.winner}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      Total Votes: {election.totalVotes}
                    </span>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Detailed Results
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 