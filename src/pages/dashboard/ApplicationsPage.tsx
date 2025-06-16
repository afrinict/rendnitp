import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ApplicationsPage() {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const applications = [
    {
      id: 'SAR-2024-001',
      type: 'SAR',
      title: 'Residential Development at Asokoro Extension',
      submissionDate: '2024-03-15',
      status: 'pending',
      lastUpdated: '2024-03-15',
    },
    {
      id: 'EIAR-2024-002',
      type: 'EIAR',
      title: 'Commercial Complex in Wuse District',
      submissionDate: '2024-03-10',
      status: 'approved',
      lastUpdated: '2024-03-12',
    },
    {
      id: 'SAR-2024-003',
      type: 'SAR',
      title: 'Mixed-Use Development in Garki',
      submissionDate: '2024-03-05',
      status: 'rejected',
      lastUpdated: '2024-03-08',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-nitp-mint-green text-nitp-deep-green">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-nitp-sage-green text-nitp-deep-green">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Unknown
          </span>
        );
    }
  };

  const getTypeIcon = (type: string) => {
    return <FileText className="w-5 h-5 text-nitp-forest-green" />;
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    if (filter === 'sar') return app.type === 'SAR';
    if (filter === 'eiar') return app.type === 'EIAR';
    return app.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-nitp-deep-green">SAR/EIAR Applications</h1>
        <Button
          onClick={() => navigate('/dashboard/applications/sar/new')}
          className="bg-nitp-forest-green hover:bg-nitp-deep-green text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Application
        </Button>
      </div>

      <div className="flex justify-end">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter applications" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Applications</SelectItem>
            <SelectItem value="sar">SAR Applications</SelectItem>
            <SelectItem value="eiar">EIAR Applications</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredApplications.map((app) => (
          <Card key={app.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-nitp-mint-green rounded-lg">
                  {getTypeIcon(app.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-nitp-deep-green">{app.title}</h3>
                  <p className="text-sm text-nitp-forest-green">ID: {app.id}</p>
                  <div className="mt-2">
                    {getStatusBadge(app.status)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-nitp-forest-green">Submitted: {app.submissionDate}</p>
                <p className="text-sm text-nitp-forest-green">Last Updated: {app.lastUpdated}</p>
                <div className="mt-4 space-x-2">
                  <Button variant="outline" size="sm" className="border-nitp-forest-green text-nitp-forest-green hover:bg-nitp-mint-green">
                    View Details
                  </Button>
                  {app.status === 'pending' && (
                    <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-50">
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-nitp-sage-green mx-auto mb-4" />
            <h3 className="text-lg font-medium text-nitp-deep-green">No applications found</h3>
            <p className="mt-2 text-sm text-nitp-forest-green">
              {filter === 'all'
                ? "You haven't submitted any applications yet."
                : `No ${filter} applications found.`}
            </p>
            <div className="mt-6">
              <Button
                onClick={() => navigate('/dashboard/applications/sar/new')}
                className="bg-nitp-forest-green hover:bg-nitp-deep-green text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Start New Application
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 