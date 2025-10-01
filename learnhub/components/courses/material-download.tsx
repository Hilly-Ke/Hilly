"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, FileText, Video, Code, ImageIcon } from "lucide-react"

interface MaterialDownloadProps {
  materialId: string
  materialType: "video" | "pdf" | "code" | "image"
  fileName: string
  fileSize?: string
}

export function MaterialDownload({ materialId, materialType, fileName, fileSize }: MaterialDownloadProps) {
  const [downloading, setDownloading] = useState(false)

  const getIcon = () => {
    switch (materialType) {
      case "video":
        return <Video className="h-4 w-4" />
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "code":
        return <Code className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const response = await fetch(`/api/materials/download/${materialId}`)

      if (response.ok) {
        // Handle redirect or direct download
        if (response.redirected) {
          window.open(response.url, "_blank")
        } else {
          const blob = await response.blob()
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          a.download = fileName
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
        }
      } else {
        throw new Error("Download failed")
      }
    } catch (error) {
      console.error("Download error:", error)
      alert("Failed to download file. Please try again.")
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
      <div className="flex items-center gap-3">
        {getIcon()}
        <div>
          <p className="font-medium text-sm">{fileName}</p>
          {fileSize && <p className="text-xs text-gray-500">{fileSize}</p>}
        </div>
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={handleDownload}
        disabled={downloading}
        className="flex items-center gap-2 bg-transparent"
      >
        <Download className="h-3 w-3" />
        {downloading ? "Downloading..." : "Download"}
      </Button>
    </div>
  )
}
