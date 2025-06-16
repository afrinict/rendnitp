import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SiteSettingsProvider, useSiteSettings } from "@/contexts/SiteSettingsContext";
import { MaintenanceMode } from "@/components/MaintenanceMode";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Events from "./pages/Events";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MemberProfile from "./pages/MemberProfile";
import Subscriptions from "./pages/Subscriptions";
import SARApplication from "./pages/SARApplication";
import EIARApplication from "./pages/EIARApplication";
import Executives from "./pages/Executives";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardHome } from '@/pages/dashboard/DashboardHome';
import ProfilePage from '@/pages/dashboard/ProfilePage';
import { SubscriptionsPage } from '@/pages/dashboard/SubscriptionsPage';
import { ApplicationsPage } from '@/pages/dashboard/ApplicationsPage';
import { MessagesPage } from '@/pages/dashboard/MessagesPage';
import { CalendarPage } from '@/pages/dashboard/CalendarPage';
import { VotingPage } from '@/pages/dashboard/VotingPage';
import SARApplicationForm from '@/pages/dashboard/sar/SARApplicationForm';

console.log("App.tsx loading");

const queryClient = new QueryClient();

const AppContent = () => {
  const { config } = useSiteSettings();
  
  // Show maintenance page if maintenance mode is enabled (except for admin)
  if (config.maintenanceMode && !window.location.pathname.startsWith('/admin')) {
    return <MaintenanceMode />;
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Protected dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="subscriptions" element={<SubscriptionsPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="applications/sar/new" element={<SARApplicationForm />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="voting" element={<VotingPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

const App = () => {
  console.log("App component rendering");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SiteSettingsProvider>
          <AppContent />
        </SiteSettingsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
