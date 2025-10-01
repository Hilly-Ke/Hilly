"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { certificateManager } from "@/lib/certificates"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CertificateViewer } from "./certificate-viewer"
import { Award, Eye, Download, Calendar } from "lucide-react"
import type { Certificate } from "@/lib/certificates"

export function CertificatesGallery() {
  const { user } = useAuth()
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)

  if (!user) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">Please log in to view your certificates</p>
        </CardContent>
      </Card>
    )
  }

  const certificates = certificateManager.getUserCertificates(user.id)

  if (selectedCertificate) {
    return <CertificateViewer certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Certificates</h2>
          <p className="text-muted-foreground">View and download your earned certificates</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <Award className="h-4 w-4 mr-1" />
          {certificates.length} Earned
        </Badge>
      </div>

      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <Card key={certificate.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{certificate.courseName}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{certificate.completionDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Grade {certificate.grade}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Instructor</p>
                  <p className="font-medium">{certificate.instructorName}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {certificate.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {certificate.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{certificate.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button onClick={() => setSelectedCertificate(certificate)} size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    onClick={() => {
                      alert("Certificate download started!")
                    }}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                  ID: {certificate.certificateNumber}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <Award className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Certificates Yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Complete courses to earn certificates and showcase your achievements
            </p>
            <Button onClick={() => (window.location.href = "/courses")}>Browse Courses</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
