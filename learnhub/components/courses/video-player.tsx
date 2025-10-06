"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX, Maximize, Download, SkipBack, SkipForward } from "lucide-react"
import type { VideoMaterial } from "@/lib/course-materials"

interface VideoPlayerProps {
  video: VideoMaterial
  onComplete?: () => void
  onProgress?: (progress: number) => void
}

export function VideoPlayer({ video, onComplete, onProgress }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleTimeUpdate = () => {
      const currentProgress = (video.currentTime / Math.max(1, video.duration)) * 100
      setProgress(currentProgress)
      setCurrentTime(video.currentTime)
      onProgress?.(currentProgress)

      // Mark complete when reaching 95% watched
      if (currentProgress >= 95) {
        onComplete?.()
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onComplete?.()
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("ended", handleEnded)
    }
  }, [onComplete, onProgress])

  const handlePlayPause = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    video.currentTime = newTime
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (!isFullscreen) {
      video.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  const skip = (seconds: number) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds))
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div
          className="relative bg-black rounded-t-lg overflow-hidden"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <video
            ref={videoRef}
            className="w-full aspect-video max-h-[70vh]"
            poster={video.thumbnail || "/video-thumbnail.png"}
            preload="metadata"
            onClick={handlePlayPause}
          >
            <source src={video.url} type="video/mp4" />
            <source src={video.url.replace(".mp4", ".webm")} type="video/webm" />
            Your browser does not support the video tag.
          </video>

          {/* Video Controls Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
          >
            {/* Play/Pause Button */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  onClick={handlePlayPause}
                  size="lg"
                  className="rounded-full w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                >
                  <Play className="h-8 w-8 text-white ml-1" />
                </Button>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-2 mb-4 cursor-pointer" onClick={handleProgressClick}>
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center gap-4">
                <Button onClick={handlePlayPause} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>

                <Button onClick={() => skip(-10)} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <SkipBack className="h-4 w-4" />
                </Button>

                <Button onClick={() => skip(10)} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <SkipForward className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-2">
                  <Button onClick={toggleMute} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-white/20 rounded-lg appearance-none slider"
                  />
                </div>

                <div className="flex-1" />

                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                <Button onClick={toggleFullscreen} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="p-4">
          <h3 className="font-semibold mb-2">{video.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{video.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Duration: {video.duration}</span>
            <Button variant="outline" size="sm" asChild>
              <a href={video.url} download>
                <Download className="h-4 w-4 mr-2" />
                Download
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
