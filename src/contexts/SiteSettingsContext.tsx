
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SiteConfig {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  enableNotifications: boolean;
}

interface SiteSettingsContextType {
  config: SiteConfig;
  updateConfig: (field: keyof SiteConfig, value: any) => void;
  saveConfig: () => void;
}

const defaultConfig: SiteConfig = {
  siteName: "NITP Abuja Chapter",
  siteDescription: "Nigerian Institute of Town Planners - Abuja Chapter Official Website",
  contactEmail: "info@nitpabuja.org",
  contactPhone: "+234-800-NITP-ABJ",
  address: "Plot 123, NITP Secretariat, Central Business District, Abuja",
  maintenanceMode: false,
  allowRegistration: true,
  requireEmailVerification: true,
  enableNotifications: true
};

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('siteConfig');
    return saved ? JSON.parse(saved) : defaultConfig;
  });

  const updateConfig = (field: keyof SiteConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const saveConfig = () => {
    localStorage.setItem('siteConfig', JSON.stringify(config));
    console.log('Site configuration saved:', config);
  };

  return (
    <SiteSettingsContext.Provider value={{ config, updateConfig, saveConfig }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
