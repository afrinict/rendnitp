
import { Navigation } from "@/components/Navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMainContent } from "@/components/admin/AdminMainContent";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";

const AdminDashboard = () => {
  const [activeModule, setActiveModule] = useState("dashboard");

  const handleLogin = () => {
    console.log("Login clicked from admin dashboard");
  };

  const handleRegister = () => {
    console.log("Register clicked from admin dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onLogin={handleLogin} onRegister={handleRegister} />
      
      <div className="pt-24">
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AdminSidebar 
              activeModule={activeModule} 
              onModuleChange={setActiveModule} 
            />
            <AdminMainContent activeModule={activeModule} />
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default AdminDashboard;
