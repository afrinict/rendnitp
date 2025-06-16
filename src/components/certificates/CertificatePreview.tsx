
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SARCertificate } from "./SARCertificate";
import { FileText, Download, Eye, Printer } from "lucide-react";

interface CertificatePreviewProps {
  application: {
    id: string;
    applicantName: string;
    companyName?: string;
    projectTitle: string;
    location: string;
    submissionDate: string;
  };
}

export const CertificatePreview = ({ application }: CertificatePreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Generate certificate data
  const certificateData = {
    certificateNumber: `SAR-CERT-${application.id}`,
    applicantName: application.applicantName,
    companyName: application.companyName,
    projectTitle: application.projectTitle,
    projectLocation: application.location,
    issueDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real implementation, this would generate a PDF
    console.log("Downloading certificate as PDF...");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="bg-green-50 hover:bg-green-100">
          <FileText className="h-4 w-4 mr-1" />
          Certificate
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>SAR Certificate Preview</span>
            <div className="flex gap-2">
              <Button size="sm" onClick={handlePrint} variant="outline">
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
              <Button size="sm" onClick={handleDownload} variant="outline">
                <Download className="h-4 w-4 mr-1" />
                Download PDF
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <SARCertificate {...certificateData} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
