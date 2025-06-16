import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  CreditCard, 
  FileText, 
  MessageSquare, 
  Calendar, 
  Vote,
  LogOut
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'My Profile', href: '/dashboard/profile', icon: User },
  { name: 'Subscriptions', href: '/dashboard/subscriptions', icon: CreditCard },
  { name: 'SAR/EIAR Applications', href: '/dashboard/applications', icon: FileText },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
  { name: 'Voting & Elections', href: '/dashboard/voting', icon: Vote },
];

export function DashboardSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-NITP-MidnightBlue">NITP Dashboard</h1>
      </div>
      
      <nav className="mt-6">
        <div className="px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-NITP-TealGreen text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-NITP-TealGreen'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${
                  isActive ? 'text-white' : 'text-gray-400'
                }`} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="absolute bottom-0 w-64 border-t border-gray-200">
        <button
          className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-red-600 w-full"
          onClick={() => {
            // TODO: Implement logout functionality
            console.log('Logout clicked');
          }}
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400" />
          Logout
        </button>
      </div>
    </div>
  );
} 