import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  CreditCard,
  Download,
  Calendar,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

export function SubscriptionsPage() {
  // Mock data - replace with actual data from your backend
  const subscriptionData = {
    currentPlan: {
      type: 'Professional Member',
      status: 'Active',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      amount: '₦50,000',
      autoRenew: true,
    },
    paymentHistory: [
      {
        id: 1,
        date: '2023-01-01',
        amount: '₦50,000',
        status: 'Paid',
        receipt: 'REC-2023-001',
      },
      {
        id: 2,
        date: '2022-01-01',
        amount: '₦45,000',
        status: 'Paid',
        receipt: 'REC-2022-001',
      },
      {
        id: 3,
        date: '2021-01-01',
        amount: '₦40,000',
        status: 'Paid',
        receipt: 'REC-2021-001',
      },
    ],
    renewalOptions: [
      {
        id: 1,
        name: 'Annual Plan',
        price: '₦50,000',
        duration: '12 months',
        features: ['Full member benefits', 'CPD access', 'Event discounts'],
      },
      {
        id: 2,
        name: 'Bi-Annual Plan',
        price: '₦28,000',
        duration: '6 months',
        features: ['Full member benefits', 'CPD access'],
      },
    ],
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'expired':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'expiring soon':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Subscriptions</h1>

      {/* Current Membership Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Current Membership</h2>
            <div className="mt-2 flex items-center space-x-2">
              {getStatusIcon(subscriptionData.currentPlan.status)}
              <span className="text-gray-600">
                {subscriptionData.currentPlan.type} • {subscriptionData.currentPlan.status}
              </span>
            </div>
          </div>
          <Button>Renew Now</Button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Start Date</p>
            <p className="font-medium">{subscriptionData.currentPlan.startDate}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">End Date</p>
            <p className="font-medium">{subscriptionData.currentPlan.endDate}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Amount</p>
            <p className="font-medium">{subscriptionData.currentPlan.amount}</p>
          </div>
        </div>
      </Card>

      {/* Payment History */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Receipt</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptionData.paymentHistory.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {payment.status}
                  </span>
                </TableCell>
                <TableCell>{payment.receipt}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Renewal Options */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Renewal Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subscriptionData.renewalOptions.map((option) => (
            <Card key={option.id} className="p-6 border-2">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{option.name}</h3>
                  <p className="text-2xl font-bold text-primary mt-2">{option.price}</p>
                  <p className="text-sm text-gray-500">{option.duration}</p>
                </div>
                <ul className="space-y-2">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full">Select Plan</Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
} 