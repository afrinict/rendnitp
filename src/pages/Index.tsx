
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, GraduationCap, MessageSquare, Vote, Shield } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { HeroSlider } from "@/components/HeroSlider";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  console.log("Index component rendering");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const features = [
    {
      icon: Users,
      title: "Member Management",
      description: "Comprehensive member directory and profile management system"
    },
    {
      icon: FileText,
      title: "SAR & EIAR Applications",
      description: "Streamlined application process for Site Analysis and Environmental Impact Assessment Reports"
    },
    {
      icon: GraduationCap,
      title: "E-Learning Platform",
      description: "Professional development courses and training materials"
    },
    {
      icon: MessageSquare,
      title: "Communication Hub",
      description: "Real-time chat, forums, and professional networking"
    },
    {
      icon: Vote,
      title: "Elections System",
      description: "Secure online voting system for organizational elections"
    },
    {
      icon: Shield,
      title: "Ethics Management",
      description: "Professional ethics complaint and resolution system"
    }
  ];

  console.log("Show login:", showLogin, "Show register:", showRegister);

  if (showLogin) {
    return <LoginForm onBack={() => setShowLogin(false)} onRegister={() => {setShowLogin(false); setShowRegister(true);}} />;
  }

  if (showRegister) {
    return <RegisterForm onBack={() => setShowRegister(false)} onLogin={() => {setShowRegister(false); setShowLogin(true);}} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <Navigation 
        onLogin={() => {
          console.log("Login button clicked");
          setShowLogin(true);
        }}
        onRegister={() => {
          console.log("Register button clicked");
          setShowRegister(true);
        }}
      />

      {/* Hero Slider */}
      <HeroSlider 
        onRegister={() => {
          console.log("Hero register button clicked");
          setShowRegister(true);
        }}
        onLogin={() => {
          console.log("Hero login button clicked");
          setShowLogin(true);
        }}
      />

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h3>
            <p className="text-lg text-gray-600">Comprehensive tools for professional development and administration</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ethics Complaint Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Professional Ethics</h3>
          <p className="text-lg text-gray-600 mb-8">
            Maintain the highest standards of professional conduct. Submit ethics concerns confidentially.
          </p>
          <Button variant="outline" size="lg" className="border-red-200 text-red-700 hover:bg-red-50">
            Submit Ethics Complaint
          </Button>
        </div>
      </section>

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

export default Index;
