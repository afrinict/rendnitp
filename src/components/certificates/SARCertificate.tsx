
import { Card, CardContent } from "@/components/ui/card";
import { QrCode } from "lucide-react";

interface SARCertificateProps {
  certificateNumber: string;
  applicantName: string;
  companyName?: string;
  projectTitle: string;
  projectLocation: string;
  issueDate: string;
  expiryDate: string;
  qrCodeData?: string;
}

export const SARCertificate = ({
  certificateNumber,
  applicantName,
  companyName,
  projectTitle,
  projectLocation,
  issueDate,
  expiryDate,
  qrCodeData
}: SARCertificateProps) => {
  // Generate QR code URL with verification data
  const verificationUrl = `https://nitp-abuja.org/verify/${certificateNumber}`;
  
  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Certificate Border */}
      <div className="border-8 border-[#073B4C] p-8">
        <div className="border-4 border-[#118AB2] p-6">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/lovable-uploads/c1b05627-53bf-4506-b2d8-3774b7332fa2.png" 
                alt="NITP Abuja Logo" 
                className="h-20 w-20 mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold text-[#073B4C] mb-1">
                  NIGERIAN INSTITUTE OF TOWN PLANNERS
                </h1>
                <h2 className="text-lg text-[#118AB2] font-semibold">
                  ABUJA CHAPTER
                </h2>
              </div>
            </div>
            
            <div className="w-full h-1 bg-gradient-to-r from-[#073B4C] via-[#118AB2] to-[#06D6A0] mb-6"></div>
            
            <h3 className="text-3xl font-bold text-[#073B4C] mb-2">
              SITE ANALYSIS REPORT CERTIFICATE
            </h3>
            <p className="text-lg text-gray-600">
              This is to certify that the Site Analysis Report has been reviewed and approved
            </p>
          </div>

          {/* Certificate Body */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                <div className="text-center mb-6">
                  <p className="text-lg text-gray-700 mb-4">This certificate is hereby issued to:</p>
                  <h4 className="text-2xl font-bold text-[#073B4C] mb-2">{applicantName}</h4>
                  {companyName && (
                    <p className="text-lg text-[#118AB2] font-semibold">{companyName}</p>
                  )}
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h5 className="text-lg font-semibold text-[#073B4C] mb-4">Project Details:</h5>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Project Title: </span>
                      <span className="text-gray-900">{projectTitle}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Location: </span>
                      <span className="text-gray-900">{projectLocation}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Certificate No: </span>
                      <span className="text-[#118AB2] font-semibold">{certificateNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Issue Date</p>
                    <p className="text-lg font-semibold text-[#073B4C]">{issueDate}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Expiry Date</p>
                    <p className="text-lg font-semibold text-[#073B4C]">{expiryDate}</p>
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="md:col-span-1 flex flex-col items-center justify-center">
                <div className="border-2 border-[#118AB2] p-4 rounded-lg bg-white">
                  <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
                    <QrCode className="h-12 w-12 text-[#118AB2] mb-2" />
                    <p className="text-xs text-gray-600 text-center">QR Code for Verification</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-600 mb-1">Scan to verify</p>
                  <p className="text-xs text-[#118AB2] font-medium break-all">
                    {verificationUrl}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Signatures Section */}
          <div className="border-t-2 border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="border-b border-gray-400 mb-2 h-12"></div>
                <p className="text-sm font-semibold text-[#073B4C]">Technical Secretary</p>
                <p className="text-xs text-gray-600">NITP Abuja Chapter</p>
              </div>
              <div className="text-center">
                <div className="border-b border-gray-400 mb-2 h-12"></div>
                <p className="text-sm font-semibold text-[#073B4C]">Registrar</p>
                <p className="text-xs text-gray-600">NITP Abuja Chapter</p>
              </div>
              <div className="text-center">
                <div className="border-b border-gray-400 mb-2 h-12"></div>
                <p className="text-sm font-semibold text-[#073B4C]">Chairman</p>
                <p className="text-xs text-gray-600">NITP Abuja Chapter</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="w-full h-1 bg-gradient-to-r from-[#073B4C] via-[#118AB2] to-[#06D6A0] mb-4"></div>
            <p className="text-xs text-gray-600">
              This certificate is valid and can be verified at www.nitp-abuja.org/verify
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Nigerian Institute of Town Planners, Abuja Chapter | Plot 123, Central Area, Abuja
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
