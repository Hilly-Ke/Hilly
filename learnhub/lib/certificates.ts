export interface Certificate {
  id: string
  userId: string
  courseId: string
  courseName: string
  studentName: string
  instructorName: string
  completionDate: Date
  certificateNumber: string
  skills: string[]
  grade?: string
}

export interface CertificateTemplate {
  id: string
  name: string
  design: "modern" | "classic" | "elegant" | "tech"
  primaryColor: string
  secondaryColor: string
}

export const certificateTemplates: CertificateTemplate[] = [
  {
    id: "modern",
    name: "Modern",
    design: "modern",
    primaryColor: "#059669",
    secondaryColor: "#10b981",
  },
  {
    id: "classic",
    name: "Classic",
    design: "classic",
    primaryColor: "#1e40af",
    secondaryColor: "#3b82f6",
  },
  {
    id: "elegant",
    name: "Elegant",
    design: "elegant",
    primaryColor: "#7c3aed",
    secondaryColor: "#a855f7",
  },
  {
    id: "tech",
    name: "Tech",
    design: "tech",
    primaryColor: "#dc2626",
    secondaryColor: "#ef4444",
  },
]

export class CertificateManager {
  private static instance: CertificateManager
  private certificates: Map<string, Certificate[]> = new Map()

  private constructor() {
    this.loadFromStorage()
  }

  static getInstance(): CertificateManager {
    if (!CertificateManager.instance) {
      CertificateManager.instance = new CertificateManager()
    }
    return CertificateManager.instance
  }

  private loadFromStorage() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("learnhub_certificates")
      if (stored) {
        try {
          const data = JSON.parse(stored)
          this.certificates = new Map(Object.entries(data))
        } catch (error) {
          console.error("Failed to load certificates:", error)
        }
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== "undefined") {
      const data = Object.fromEntries(this.certificates)
      localStorage.setItem("learnhub_certificates", JSON.stringify(data))
    }
  }

  generateCertificate(
    userId: string,
    courseId: string,
    courseName: string,
    studentName: string,
    instructorName: string,
    skills: string[],
  ): Certificate {
    const certificate: Certificate = {
      id: `cert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      courseId,
      courseName,
      studentName,
      instructorName,
      completionDate: new Date(),
      certificateNumber: this.generateCertificateNumber(),
      skills,
      grade: "A", // Could be calculated based on performance
    }

    if (!this.certificates.has(userId)) {
      this.certificates.set(userId, [])
    }

    this.certificates.get(userId)!.push(certificate)
    this.saveToStorage()

    return certificate
  }

  private generateCertificateNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substr(2, 4).toUpperCase()
    return `LH-${timestamp}-${random}`
  }

  getUserCertificates(userId: string): Certificate[] {
    return this.certificates.get(userId) || []
  }

  getCertificate(userId: string, certificateId: string): Certificate | null {
    const userCertificates = this.getUserCertificates(userId)
    return userCertificates.find((cert) => cert.id === certificateId) || null
  }

  verifyCertificate(certificateNumber: string): Certificate | null {
    for (const userCertificates of this.certificates.values()) {
      const certificate = userCertificates.find((cert) => cert.certificateNumber === certificateNumber)
      if (certificate) return certificate
    }
    return null
  }
}

export const certificateManager = CertificateManager.getInstance()
