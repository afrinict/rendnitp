
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, UserPlus, LogIn } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

interface NavigationProps {
  onLogin: () => void;
  onRegister: () => void;
}

export const Navigation = ({ onLogin, onRegister }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { config } = useSiteSettings();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/events", label: "Events" },
    { href: "/executives", label: "Executives" },
    { href: "/dashboard", label: "Member Portal" },
  ];

  return (
    <nav className="bg-[#073B4C] text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Organization Name */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/ed2d1cf7-3752-4ff3-b0c0-d442cef8e8ce.png" 
                alt="NITP Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#06D6A0]">{config.siteName}</h1>
              <p className="text-sm text-gray-300 hidden sm:block">
                {config.siteDescription}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white hover:text-[#06D6A0] transition-colors duration-300 font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={onLogin}
              variant="ghost"
              className="text-white hover:text-[#06D6A0] hover:bg-[#118AB2] transition-colors"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
            {config.allowRegistration && (
              <Button
                onClick={onRegister}
                className="bg-[#118AB2] hover:bg-[#06D6A0] text-white font-medium px-6 py-2 rounded-lg transition-colors"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Register
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="sm"
              className="text-white hover:text-[#06D6A0]"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[#118AB2] rounded-lg mt-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-white hover:text-[#06D6A0] transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-[#073B4C]/30 space-y-2">
                <Button
                  onClick={() => {
                    onLogin();
                    setIsMenuOpen(false);
                  }}
                  variant="ghost"
                  className="w-full text-left text-white hover:text-[#06D6A0] justify-start"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                {config.allowRegistration && (
                  <Button
                    onClick={() => {
                      onRegister();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-[#06D6A0] hover:bg-[#04A77C] text-white font-medium justify-start"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Register
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
