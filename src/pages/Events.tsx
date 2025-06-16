
import { Navigation } from "@/components/Navigation";
import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

const Events = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const upcomingEvents = [
    {
      title: "Monthly Technical Meeting",
      date: "January 15, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "NITP Secretariat, Abuja",
      description: "Monthly gathering for technical discussions and professional updates",
      type: "Meeting"
    },
    {
      title: "Urban Planning Workshop",
      date: "February 8, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Transcorp Hilton, Abuja",
      description: "Hands-on workshop on modern urban planning techniques and digital tools",
      type: "Workshop"
    },
    {
      title: "Annual Conference 2025",
      date: "March 20-22, 2025",
      time: "Full Day Event",
      location: "International Conference Centre, Abuja",
      description: "Three-day conference featuring keynote speakers, technical sessions, and networking",
      type: "Conference"
    }
  ];

  const pastEvents = [
    {
      title: "Professional Ethics Seminar",
      date: "December 10, 2024",
      location: "NITP Secretariat, Abuja",
      description: "Seminar on maintaining professional ethics in town planning practice"
    },
    {
      title: "Climate Change & Urban Planning",
      date: "November 18, 2024",
      location: "University of Abuja",
      description: "Workshop on integrating climate resilience in urban planning"
    },
    {
      title: "GIS Training Workshop",
      date: "October 25, 2024",
      location: "NITP Training Center",
      description: "Intensive training on Geographic Information Systems for planners"
    }
  ];

  if (showLogin) {
    return <LoginForm onBack={() => setShowLogin(false)} onRegister={() => {setShowLogin(false); setShowRegister(true);}} />;
  }

  if (showRegister) {
    return <RegisterForm onBack={() => setShowRegister(false)} onLogin={() => {setShowRegister(false); setShowLogin(true);}} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation 
        onLogin={() => setShowLogin(true)}
        onRegister={() => setShowRegister(true)}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-32 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-[#073B4C] mb-8 text-center">
          Events & Activities
        </h1>

        <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-12 leading-relaxed">
          Stay connected with the latest professional development opportunities, networking events, 
          and educational activities organized by the NITP Abuja Chapter.
        </p>

        {/* Upcoming Events */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#118AB2] mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-[#06D6A0]">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-[#118AB2] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.type}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-[#073B4C]">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <CardDescription className="text-gray-700 mt-3">
                    {event.description}
                  </CardDescription>
                  <Button className="w-full mt-4 bg-[#118AB2] hover:bg-[#073B4C]">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Past Events */}
        <section>
          <h2 className="text-3xl font-bold text-[#118AB2] mb-8">Recent Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow opacity-75">
                <CardHeader>
                  <CardTitle className="text-lg text-[#073B4C]">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <CardDescription className="text-gray-700">
                    {event.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Event Calendar CTA */}
        <section className="mt-16 bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-2xl font-bold text-[#073B4C] mb-4">Stay Updated</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Don't miss out on our professional development opportunities. Join our mailing list 
            to receive notifications about upcoming events and activities.
          </p>
          <Button size="lg" className="bg-[#06D6A0] hover:bg-[#118AB2] text-white">
            Subscribe to Updates
          </Button>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg overflow-hidden">
                  <img 
                    src="/lovable-uploads/ed2d1cf7-3752-4ff3-b0c0-d442cef8e8ce.png" 
                    alt="NITP Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-semibold">NITP Abuja Chapter</h4>
              </div>
              <p className="text-gray-400">
                Nigerian Institute of Town Planners, Abuja Chapter - Advancing professional excellence in urban planning.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Membership</a></li>
                <li><a href="#" className="hover:text-white">Resources</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <p className="text-gray-400">
                Email: info@nitp-abuja.org<br />
                Phone: +234 (0) 123 456 7890<br />
                Abuja, FCT, Nigeria
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Nigerian Institute of Town Planners, Abuja Chapter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Events;
