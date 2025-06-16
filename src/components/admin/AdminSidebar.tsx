
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  Home, 
  Users, 
  FileText, 
  Leaf, 
  CreditCard, 
  Edit, 
  AlertTriangle, 
  BookOpen, 
  Settings, 
  BarChart3, 
  User, 
  LogOut,
  UserCheck,
  Wallet
} from "lucide-react";

interface AdminSidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const sidebarItems = [
  { id: "dashboard", title: "Dashboard", icon: Home },
  { id: "users", title: "Users", icon: Users },
  { id: "pending-registrations", title: "Pending Registrations", icon: UserCheck },
  { id: "sar-applications", title: "SAR Applications", icon: FileText },
  { id: "eiar-applications", title: "EIAR Applications", icon: Leaf },
  { id: "subscriptions", title: "Subscriptions", icon: CreditCard },
  { id: "flutterwave", title: "Flutterwave Portal", icon: Wallet },
  { id: "content", title: "Content Management", icon: Edit },
  { id: "complaints", title: "Complaints", icon: AlertTriangle },
  { id: "elearning", title: "E-Learning", icon: BookOpen },
  { id: "settings", title: "Site Settings", icon: Settings },
  { id: "analytics", title: "Analytics", icon: BarChart3 },
  { id: "profile", title: "My Admin Profile", icon: User },
];

export const AdminSidebar = ({ activeModule, onModuleChange }: AdminSidebarProps) => {
  const handleLogout = () => {
    console.log("Admin logout clicked");
    // Handle logout logic here
  };

  return (
    <Sidebar className="bg-green-900 text-white border-r-0">
      <SidebarHeader className="p-6 border-b border-green-700/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden">
            <img 
              src="/lovable-uploads/ed2d1cf7-3752-4ff3-b0c0-d442cef8e8ce.png" 
              alt="NITP Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-bold text-lg text-green-100">NITP Admin</h2>
            <p className="text-sm text-green-300">Control Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onModuleChange(item.id)}
                    className={`
                      w-full justify-start px-4 py-3 text-left text-white hover:bg-green-700 hover:text-white transition-colors
                      ${activeModule === item.id ? 'bg-green-700 font-semibold' : ''}
                    `}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-green-700/30">
        <SidebarMenuButton
          onClick={handleLogout}
          className="w-full justify-start px-4 py-3 text-left text-white hover:bg-red-600 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};
