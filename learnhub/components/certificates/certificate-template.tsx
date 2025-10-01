"use client"

import { forwardRef } from "react"
import type { Certificate, CertificateTemplate } from "@/lib/certificates"
import { Award, Star, LockIcon as Seal } from "lucide-react"

interface CertificateTemplateProps {
  certificate: Certificate
  template: CertificateTemplate
  className?: string
}

const CertificateTemplateComponent = forwardRef<HTMLDivElement, CertificateTemplateProps>(
  ({ certificate, template, className }, ref) => {
    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)
    }

    const ModernTemplate = () => (
      <div
        className="w-full h-full bg-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${template.primaryColor}10 0%, ${template.secondaryColor}10 100%)`,
        }}
      >
        {/* Header */}
        <div className="text-center pt-12 pb-8">
          <div className="flex items-center justify-center mb-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: template.primaryColor }}
            >
              <Award className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">LearnHub</h1>
          <p className="text-lg text-gray-600">Certificate of Completion</p>
        </div>

        {/* Main Content */}
        <div className="px-16 text-center">
          <p className="text-lg text-gray-600 mb-8">This is to certify that</p>
          <h2 className="text-5xl font-bold text-gray-800 mb-8" style={{ color: template.primaryColor }}>
            {certificate.studentName}
          </h2>
          <p className="text-lg text-gray-600 mb-4">has successfully completed the course</p>
          <h3 className="text-3xl font-semibold text-gray-800 mb-8">{certificate.courseName}</h3>

          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Completion Date</p>
              <p className="font-semibold">{formatDate(certificate.completionDate)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Certificate ID</p>
              <p className="font-semibold">{certificate.certificateNumber}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Grade</p>
              <p className="font-semibold">{certificate.grade}</p>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-3">Skills Mastered</p>
            <div className="flex flex-wrap justify-center gap-2">
              {certificate.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: template.secondaryColor }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-16 right-16 flex justify-between items-end">
          <div className="text-center">
            <div className="w-32 h-px bg-gray-400 mb-2"></div>
            <p className="text-sm font-semibold">{certificate.instructorName}</p>
            <p className="text-xs text-gray-500">Course Instructor</p>
          </div>
          <div className="flex items-center">
            <Seal className="h-16 w-16" style={{ color: template.primaryColor }} />
          </div>
          <div className="text-center">
            <div className="w-32 h-px bg-gray-400 mb-2"></div>
            <p className="text-sm font-semibold">LearnHub</p>
            <p className="text-xs text-gray-500">Learning Platform</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 left-4 opacity-10">
          <Star className="h-8 w-8" style={{ color: template.primaryColor }} />
        </div>
        <div className="absolute top-4 right-4 opacity-10">
          <Star className="h-8 w-8" style={{ color: template.primaryColor }} />
        </div>
        <div className="absolute bottom-4 left-4 opacity-10">
          <Star className="h-8 w-8" style={{ color: template.primaryColor }} />
        </div>
        <div className="absolute bottom-4 right-4 opacity-10">
          <Star className="h-8 w-8" style={{ color: template.primaryColor }} />
        </div>
      </div>
    )

    return (
      <div ref={ref} className={`aspect-[4/3] ${className}`}>
        <ModernTemplate />
      </div>
    )
  },
)

CertificateTemplateComponent.displayName = "CertificateTemplate"

export { CertificateTemplateComponent as CertificateTemplate }
