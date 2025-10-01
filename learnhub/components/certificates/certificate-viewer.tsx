"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, Printer } from "lucide-react"
import type { Certificate } from "@/lib/certificates"
import { CertificateTemplate } from "./certificate-template"
import { certificateTemplates } from "@/lib/certificates"

interface CertificateViewerProps {
  certificate: Certificate
  onClose?: () => void
}

export function CertificateViewer({ certificate, onClose }: CertificateViewerProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(certificateTemplates[0])
  const certificateRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (!certificateRef.current) return

    try {
      // In a real app, you'd use html2canvas or similar library
      alert("Certificate download started! (In a real app, this would generate a PDF)")
    } catch (error) {
      console.error("Failed to download certificate:", error)
      alert("Failed to download certificate. Please try again.")
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Certificate - ${certificate.courseName}`,
        text: `I just completed ${certificate.courseName} on LearnHub!`,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `I just completed ${certificate.courseName} on LearnHub! Certificate ID: ${certificate.certificateNumber}`,
      )
      alert("Certificate details copied to clipboard!")
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Certificate Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Certificate of Completion</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Verified
              </Badge>
              <Badge variant="outline">ID: {certificate.certificateNumber}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex items-center gap-2 bg-transparent">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2 bg-transparent">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            {onClose && (
              <Button onClick={onClose} variant="ghost">
                Close
              </Button>
            )}
          </div>

          {/* Template Selection */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Certificate Template:</p>
            <div className="flex gap-2">
              {certificateTemplates.map((template) => (
                <Button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  variant={selectedTemplate.id === template.id ? "default" : "outline"}
                  size="sm"
                >
                  {template.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificate Preview */}
      <Card>
        <CardContent className="p-6">
          <div className="max-w-4xl mx-auto">
            <CertificateTemplate
              ref={certificateRef}
              certificate={certificate}
              template={selectedTemplate}
              className="border shadow-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Certificate Details */}
      <Card>
        <CardHeader>
          <CardTitle>Certificate Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Student Name</p>
              <p className="font-semibold">{certificate.studentName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Course</p>
              <p className="font-semibold">{certificate.courseName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Instructor</p>
              <p className="font-semibold">{certificate.instructorName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completion Date</p>
              <p className="font-semibold">{certificate.completionDate.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Grade</p>
              <p className="font-semibold">{certificate.grade}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Certificate Number</p>
              <p className="font-semibold font-mono">{certificate.certificateNumber}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Skills Mastered</p>
            <div className="flex flex-wrap gap-2">
              {certificate.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
