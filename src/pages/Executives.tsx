
import { Navigation } from "@/components/Navigation";
import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

const Executives = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const executives = {
    chairman: {
      name: "Tpl. Queen Imalue Phillips FNITP",
      designation: "Chairman",
      image: "https://placehold.co/150x150/A3BE8C/073B4C?text=Photo"
    },
    viceChairmen: [
      {
        name: "Tpl. Gabriel Ameh FNITP",
        designation: "1st Vice Chairman",
        image: "https://placehold.co/150x150/A3BE8C/073B4C?text=Photo"
      },
      {
        name: "Tpl. Dr. Kanu Kingsley MNITP",
        designation: "2nd Vice Chairman",
        image: "https://placehold.co/150x150/A3BE8C/073B4C?text=Photo"
      }
    ],
    secretariat: [
      {
        name: "Tpl. Grace Bitrus MNITP",
        designation: "General Secretary",
        image: "https://placehold.co/150x150/A3BE8C/073B4C?text=Photo"
      },
      {
        name: "Tpl. Aisha Abubakar Aliyu FNITP",
        designation: "Assistant General Secretary",
        image: "https://placehold.co/150x150/A3BE8C/073B4C?text=Photo"
      }
    ],
    finance: [
      {
        name: "Tpl. Mansurah Akintayo MNITP",
        designation: "Financial Secretary",
        image: "https://placehold.co/150x150/A3BE8C/073B4C?text=Photo"
      },
      {
        name: "Tpl. Alabi Opeyemi MNITP",
        designation: "Treasurer",
        image: "https://placehold.co/150x150/A3BE8C/073B4C?text=Photo"
      },
      {
        name: "Tpl. Nzelu Evelyn Ebubedike MNITP",
        designation: "Auditor",
        image: "https://placehold.co/150x150/A3BE8C/073B4C?text=Photo"
      }
    ],
    communications: [
      {
        name: "Tpl. Emmanuel Gaji Mutah MNITP",
        designation: "Public Relations Secretary",
        image: "https://placehold.co/150x150/A3BE8C/073B4C?text=Photo"
      },
      {
        name: "Tpl. Halimatu Sadiya Muhammad MNITP",
        designation: "Assistant Public Relations Secretary",
        image: "https://placehold.co/150x150/A3BE8C/073B4C?text=Photo"
      }
    ],
    committees: [
      {
        name: "Tpl. Abolaji Shittu Mutiu MNITP",
        designation: "Chairman Practice & Ethics Committee",
        image: "https://placehold.co/150x150/A3BE8C/073B4C?text=Photo"
      }
    ],
    exOfficio: [
      {
        name: "Tpl. Lami P. K. Ayuba FNITP",
        designation: "Ex-officio I",
        image: "https://placehold.co/150x150/A3BE8C/073B4C?text=Photo"
      },
      {
        name: "Tpl. Dairo Ayorinde Rasaki MNITP",
        designation: "Ex-officio II",
        image: "https://placehold.co/150x150/A3BE8C/073B4C?text=Photo"
      }
    ]
  };

  const ExecutiveCard = ({ executive, delay = 0, isChairman = false }: { 
    executive: { name: string; designation: string; image: string }, 
    delay?: number,
    isChairman?: boolean 
  }) => (
    <div 
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border-2 border-[#118AB2] hover:border-[#FFD166] group animate-fade-in ${
        isChairman ? 'transform scale-110' : ''
      }`}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
    >
      <div className="p-6 text-center">
        <div className={`mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#FFD166] group-hover:border-[#06D6A0] transition-colors duration-300 ${
          isChairman ? 'w-24 h-24' : 'w-20 h-20'
        }`}>
          <img
            src={executive.image}
            alt={executive.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h3 className={`font-bold text-[#073B4C] mb-2 group-hover:text-[#118AB2] transition-colors duration-300 ${
          isChairman ? 'text-lg' : 'text-base'
        }`}>
          {executive.name}
        </h3>
        <p className={`text-[#06D6A0] font-semibold uppercase tracking-wide ${
          isChairman ? 'text-sm' : 'text-xs'
        }`}>
          {executive.designation}
        </p>
      </div>
      
      {/* Connection lines for organogram effect */}
      {!isChairman && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-px h-8 bg-[#118AB2] opacity-60"></div>
      )}
    </div>
  );

  if (showLogin) {
    return <LoginForm onBack={() => setShowLogin(false)} onRegister={() => {setShowLogin(false); setShowRegister(true);}} />;
  }

  if (showRegister) {
    return <RegisterForm onBack={() => setShowRegister(false)} onLogin={() => {setShowRegister(false); setShowLogin(true);}} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <Navigation 
        onLogin={() => setShowLogin(true)}
        onRegister={() => setShowRegister(true)}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-32 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-extrabold text-[#073B4C] mb-4 bg-gradient-to-r from-[#073B4C] to-[#118AB2] bg-clip-text text-transparent">
            Executive Council
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FFD166] to-[#06D6A0] mx-auto rounded-full"></div>
        </div>

        {/* Introductory Paragraph */}
        <p className="text-lg text-gray-700 max-w-4xl mx-auto text-center mb-16 leading-relaxed animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          The NITP Abuja Chapter is proudly led by a dynamic team of seasoned town planning professionals, whose collective expertise and unwavering dedication drive our mission forward. Each member of our Executive Council plays a vital role in advancing the institute's objectives.
        </p>

        {/* Organogram Structure */}
        <div className="space-y-16">
          {/* Chairman - Top Level */}
          <div className="flex justify-center relative">
            <ExecutiveCard executive={executives.chairman} delay={400} isChairman={true} />
          </div>

          {/* Connection line from Chairman */}
          <div className="flex justify-center">
            <div className="w-px h-8 bg-[#118AB2] opacity-60"></div>
          </div>

          {/* Vice Chairmen - Second Level */}
          <div className="relative">
            <div className="flex justify-center space-x-16 relative">
              {executives.viceChairmen.map((executive, index) => (
                <div key={index} className="relative">
                  <ExecutiveCard executive={executive} delay={600 + index * 100} />
                </div>
              ))}
            </div>
            {/* Horizontal connection line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-32 h-px bg-[#118AB2] opacity-60"></div>
          </div>

          {/* Connection lines down */}
          <div className="flex justify-center space-x-32">
            <div className="w-px h-8 bg-[#118AB2] opacity-60"></div>
            <div className="w-px h-8 bg-[#118AB2] opacity-60"></div>
          </div>

          {/* Department Heads - Third Level */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-12 relative">
            {/* Secretariat */}
            <div className="space-y-8">
              <h3 className="text-center text-[#118AB2] font-bold text-lg mb-4 animate-fade-in" style={{ animationDelay: '800ms', animationFillMode: 'both' }}>
                Secretariat
              </h3>
              {executives.secretariat.map((executive, index) => (
                <div key={index} className="relative">
                  <ExecutiveCard executive={executive} delay={900 + index * 100} />
                </div>
              ))}
            </div>

            {/* Finance */}
            <div className="space-y-8">
              <h3 className="text-center text-[#118AB2] font-bold text-lg mb-4 animate-fade-in" style={{ animationDelay: '1000ms', animationFillMode: 'both' }}>
                Finance & Audit
              </h3>
              {executives.finance.map((executive, index) => (
                <div key={index} className="relative">
                  <ExecutiveCard executive={executive} delay={1100 + index * 100} />
                </div>
              ))}
            </div>

            {/* Communications */}
            <div className="space-y-8">
              <h3 className="text-center text-[#118AB2] font-bold text-lg mb-4 animate-fade-in" style={{ animationDelay: '1200ms', animationFillMode: 'both' }}>
                Communications
              </h3>
              {executives.communications.map((executive, index) => (
                <div key={index} className="relative">
                  <ExecutiveCard executive={executive} delay={1300 + index * 100} />
                </div>
              ))}
            </div>

            {/* Committees & Ex-Officio */}
            <div className="space-y-8">
              <h3 className="text-center text-[#118AB2] font-bold text-lg mb-4 animate-fade-in" style={{ animationDelay: '1400ms', animationFillMode: 'both' }}>
                Committees & Ex-Officio
              </h3>
              {executives.committees.map((executive, index) => (
                <div key={index} className="relative">
                  <ExecutiveCard executive={executive} delay={1500 + index * 100} />
                </div>
              ))}
              {executives.exOfficio.map((executive, index) => (
                <div key={index} className="relative">
                  <ExecutiveCard executive={executive} delay={1600 + index * 100} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
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

export default Executives;
