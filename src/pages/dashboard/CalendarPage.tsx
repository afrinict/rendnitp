import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  // Mock data - replace with actual data from your backend
  const events = [
    {
      id: 1,
      title: 'CPD Workshop: Urban Planning Fundamentals',
      date: '2023-10-25',
      time: '10:00 AM - 2:00 PM',
      type: 'workshop',
      location: 'NITP Abuja Chapter Office',
    },
    {
      id: 2,
      title: 'Annual General Meeting',
      date: '2023-11-15',
      time: '2:00 PM - 4:00 PM',
      type: 'meeting',
      location: 'Virtual (Zoom)',
    },
    {
      id: 3,
      title: 'Webinar: Sustainable Urban Development',
      date: '2023-10-30',
      time: '11:00 AM - 1:00 PM',
      type: 'webinar',
      location: 'Virtual (Teams)',
    },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop':
        return 'bg-blue-100 text-blue-800';
      case 'meeting':
        return 'bg-green-100 text-green-800';
      case 'webinar':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <div className="flex items-center space-x-4">
          <Select value={view} onValueChange={(value: 'month' | 'week' | 'day') => setView(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-lg font-semibold">
              {date?.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <Button variant="ghost" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </Card>

        {/* Events List */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{event.time}</p>
                    <p className="text-sm text-gray-600">{event.location}</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(
                      event.type
                    )}`}
                  >
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    Add to Calendar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 