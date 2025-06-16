
import { Navigation } from "@/components/Navigation";
import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, Award, Lightbulb } from "lucide-react";

const AboutUs = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const values = [
    {
      icon: Target,
      title: "Professional Excellence",
      description: "Committed to maintaining the highest standards in urban planning practice"
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Dedicated to sustainable development that serves our communities"
    },
    {
      icon: Award,
      title: "Ethical Practice",
      description: "Upholding integrity and transparency in all professional activities"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Embracing new technologies and methodologies in urban planning"
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
          About NITP Abuja Chapter
        </h1>

        {/* Mission Statement */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#118AB2] mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            The Nigerian Institute of Town Planners (NITP) Abuja Chapter is dedicated to advancing the 
            profession of town planning within the Federal Capital Territory and beyond. We strive to 
            promote sustainable urban development, foster professional excellence, and contribute to the 
            creation of livable, resilient communities through innovative planning practices.
          </p>
        </div>

        {/* History Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#118AB2] mb-6">Our History</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Established as a regional chapter of the Nigerian Institute of Town Planners, the Abuja Chapter 
            has been at the forefront of urban planning development in Nigeria's capital city. Since our 
            inception, we have played a crucial role in shaping the planned development of Abuja and 
            surrounding areas.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our chapter brings together seasoned professionals, emerging planners, and students to create 
            a vibrant community focused on knowledge sharing, professional development, and collaborative 
            problem-solving in urban planning challenges.
          </p>
        </div>

        {/* Values Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#118AB2] mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#06D6A0] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-[#06D6A0]" />
                  </div>
                  <CardTitle className="text-lg text-[#073B4C]">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Objectives */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-[#118AB2] mb-6">Our Objectives</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-[#06D6A0] rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Promote and maintain professional standards in town planning practice
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-[#06D6A0] rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Facilitate continuing professional development for members
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-[#06D6A0] rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Advocate for sustainable urban development policies and practices
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-[#06D6A0] rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Foster collaboration between planning professionals, government, and communities
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-[#06D6A0] rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Contribute to policy development and urban planning research
            </li>
          </ul>
        </div>
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

export default AboutUs;
