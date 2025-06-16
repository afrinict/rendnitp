
import { AdminDashboardOverview } from "./dashboard/AdminDashboardOverview";
import { UserManagement } from "./modules/UserManagement";
import { PendingRegistrations } from "./modules/PendingRegistrations";
import { SARApplications } from "./modules/SARApplications";
import { EIARApplications } from "./modules/EIARApplications";
import { SubscriptionManagement } from "./modules/SubscriptionManagement";
import { FlutterwaveManagement } from "./modules/FlutterwaveManagement";
import { ContentManagement } from "./modules/ContentManagement";
import { ComplaintManagement } from "./modules/ComplaintManagement";
import { ELearningManagement } from "./modules/ELearningManagement";
import { SiteSettings } from "./modules/SiteSettings";
import { Analytics } from "./modules/Analytics";
import { AdminProfile } from "./modules/AdminProfile";

interface AdminMainContentProps {
  activeModule: string;
}

export const AdminMainContent = ({ activeModule }: AdminMainContentProps) => {
  const renderContent = () => {
    switch (activeModule) {
      case "dashboard":
        return <AdminDashboardOverview />;
      case "users":
        return <UserManagement />;
      case "pending-registrations":
        return <PendingRegistrations />;
      case "sar-applications":
        return <SARApplications />;
      case "eiar-applications":
        return <EIARApplications />;
      case "subscriptions":
        return <SubscriptionManagement />;
      case "flutterwave":
        return <FlutterwaveManagement />;
      case "content":
        return <ContentManagement />;
      case "complaints":
        return <ComplaintManagement />;
      case "elearning":
        return <ELearningManagement />;
      case "settings":
        return <SiteSettings />;
      case "analytics":
        return <Analytics />;
      case "profile":
        return <AdminProfile />;
      default:
        return <AdminDashboardOverview />;
    }
  };

  return (
    <main className="flex-1 bg-gray-50 overflow-auto">
      <div className="py-8 px-6 md:px-10">
        {renderContent()}
      </div>
    </main>
  );
};
