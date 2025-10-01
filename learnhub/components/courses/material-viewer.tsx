"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Play, Code, Award } from "lucide-react"
import type { CourseMaterial, VideoMaterial, PDFMaterial } from "@/lib/course-materials"
import { VideoPlayer } from "./video-player"
import { YouTubePlayer } from "./youtube-player"

interface MaterialViewerProps {
  materials: CourseMaterial[]
  onMaterialComplete?: (materialId: string) => void
}

export function MaterialViewer({ materials, onMaterialComplete }: MaterialViewerProps) {
  const [activeMaterial, setActiveMaterial] = useState<CourseMaterial | null>(materials[0] || null)

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "code":
        return <Code className="h-4 w-4" />
      case "quiz":
        return <Award className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleDownload = (material: CourseMaterial) => {
    // Simulate download
    alert(`Downloading ${material.title}...`)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Materials List */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Course Materials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {materials.map((material) => (
              <div
                key={material.id}
                className={`p-3 rounded-lg border cursor-pointer hover:bg-muted/50 ${
                  activeMaterial?.id === material.id ? "bg-primary/10 border-primary" : ""
                }`}
                onClick={() => setActiveMaterial(material)}
              >
                <div className="flex items-center gap-3">
                  {getIcon(material.type)}
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{material.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {material.type}
                      </Badge>
                      {material.duration && <span className="text-xs text-muted-foreground">{material.duration}</span>}
                      {material.size && <span className="text-xs text-muted-foreground">{material.size}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Material Viewer */}
      <div className="lg:col-span-2">
        {activeMaterial ? (
          <div className="space-y-4">
            {activeMaterial.type === "video" ? (
              (() => {
                const video = activeMaterial as VideoMaterial
                const isYouTube = /youtube\.com|youtu\.be/.test(video.url)
                if (isYouTube) {
                  return (
                    <YouTubePlayer
                      video={video}
                      onComplete={() => onMaterialComplete?.(activeMaterial.id)}
                    />
                  )
                }
                return (
                  <VideoPlayer
                    video={video}
                    onComplete={() => onMaterialComplete?.(activeMaterial.id)}
                  />
                )
              })()
            ) : activeMaterial.type === "pdf" ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{activeMaterial.title}</span>
                    <Button onClick={() => handleDownload(activeMaterial)} size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">{activeMaterial.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{activeMaterial.description}</p>
                      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                        <span>{(activeMaterial as PDFMaterial).pages} pages</span>
                        <span>{activeMaterial.size}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{activeMaterial.title}</span>
                    <Button onClick={() => handleDownload(activeMaterial)} size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      {getIcon(activeMaterial.type)}
                      <h3 className="font-semibold mt-4 mb-2">{activeMaterial.title}</h3>
                      <p className="text-sm text-muted-foreground">{activeMaterial.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Select a material to view</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
