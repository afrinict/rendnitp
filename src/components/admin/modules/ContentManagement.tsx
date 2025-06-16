
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Plus, Eye, Trash2, Calendar, Users } from "lucide-react";
import { useState } from "react";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  author: string;
  status: "published" | "draft" | "archived";
  publishDate: string;
  views: number;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  attendees: number;
}

const mockNews: NewsArticle[] = [
  {
    id: "1",
    title: "NITP Abuja Chapter Annual Conference 2024",
    summary: "Join us for our annual conference featuring keynote speakers and networking opportunities.",
    author: "Admin",
    status: "published",
    publishDate: "2024-06-10",
    views: 1250
  },
  {
    id: "2",
    title: "New Professional Development Programs",
    summary: "Exciting new training programs now available for members.",
    author: "Content Team",
    status: "draft",
    publishDate: "2024-06-15",
    views: 0
  }
];

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Monthly Technical Seminar",
    description: "Latest trends in urban planning and development",
    date: "2024-06-20",
    location: "NITP Secretariat, Abuja",
    status: "upcoming",
    attendees: 85
  },
  {
    id: "2",
    title: "Professional Networking Evening",
    description: "Connect with fellow professionals in the industry",
    date: "2024-06-25",
    location: "Transcorp Hilton, Abuja",
    status: "upcoming",
    attendees: 150
  }
];

export const ContentManagement = () => {
  const [newsArticles, setNewsArticles] = useState(mockNews);
  const [events, setEvents] = useState(mockEvents);
  const [newArticle, setNewArticle] = useState({ title: "", summary: "", content: "" });
  const [newEvent, setNewEvent] = useState({ title: "", description: "", date: "", location: "" });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": case "upcoming": return "bg-green-100 text-green-800";
      case "draft": case "ongoing": return "bg-blue-100 text-blue-800";
      case "archived": case "completed": return "bg-gray-100 text-gray-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateArticle = () => {
    if (newArticle.title && newArticle.summary) {
      const article: NewsArticle = {
        id: (newsArticles.length + 1).toString(),
        title: newArticle.title,
        summary: newArticle.summary,
        author: "Admin",
        status: "draft",
        publishDate: new Date().toISOString().split('T')[0],
        views: 0
      };
      setNewsArticles([...newsArticles, article]);
      setNewArticle({ title: "", summary: "", content: "" });
    }
  };

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.description && newEvent.date) {
      const event: Event = {
        id: (events.length + 1).toString(),
        title: newEvent.title,
        description: newEvent.description,
        date: newEvent.date,
        location: newEvent.location,
        status: "upcoming",
        attendees: 0
      };
      setEvents([...events, event]);
      setNewEvent({ title: "", description: "", date: "", location: "" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Edit className="h-8 w-8 text-[#073B4C]" />
        <h1 className="text-3xl font-bold text-[#073B4C]">Content Management</h1>
      </div>

      <Tabs defaultValue="news" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="news">News Articles</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="executives">Executive Profiles</TabsTrigger>
        </TabsList>

        <TabsContent value="news" className="space-y-6">
          {/* News Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-[#073B4C]">24</div>
                <div className="text-sm text-gray-600">Total Articles</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">18</div>
                <div className="text-sm text-gray-600">Published</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">6</div>
                <div className="text-sm text-gray-600">Drafts</div>
              </CardContent>
            </Card>
          </div>

          {/* Create New Article */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Article
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Article title..."
                value={newArticle.title}
                onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
              />
              <Textarea
                placeholder="Article summary..."
                value={newArticle.summary}
                onChange={(e) => setNewArticle({...newArticle, summary: e.target.value})}
              />
              <Textarea
                placeholder="Article content..."
                value={newArticle.content}
                onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                rows={6}
              />
              <Button onClick={handleCreateArticle} className="bg-[#118AB2] hover:bg-[#073B4C]">
                Create Article
              </Button>
            </CardContent>
          </Card>

          {/* News Articles Table */}
          <Card>
            <CardHeader>
              <CardTitle>News Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Publish Date</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newsArticles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{article.title}</div>
                            <div className="text-sm text-gray-500">{article.summary}</div>
                          </div>
                        </TableCell>
                        <TableCell>{article.author}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(article.status)}>
                            {article.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{article.publishDate}</TableCell>
                        <TableCell>{article.views}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          {/* Event Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-[#073B4C]">12</div>
                <div className="text-sm text-gray-600">Total Events</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-sm text-gray-600">Upcoming</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">4</div>
                <div className="text-sm text-gray-600">Completed</div>
              </CardContent>
            </Card>
          </div>

          {/* Create New Event */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Event
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Event title..."
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              />
              <Textarea
                placeholder="Event description..."
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                />
                <Input
                  placeholder="Event location..."
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                />
              </div>
              <Button onClick={handleCreateEvent} className="bg-[#118AB2] hover:bg-[#073B4C]">
                Create Event
              </Button>
            </CardContent>
          </Card>

          {/* Events Table */}
          <Card>
            <CardHeader>
              <CardTitle>Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Attendees</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm text-gray-500">{event.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {event.date}
                          </div>
                        </TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {event.attendees}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements">
          <Card>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Announcement management interface will be implemented here.
                Features include creating urgent notifications, member alerts, and system announcements.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="executives">
          <Card>
            <CardHeader>
              <CardTitle>Executive Profiles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Executive profile management interface will be implemented here.
                Features include updating executive information, photos, and biographical details.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
