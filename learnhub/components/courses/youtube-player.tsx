"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import type { VideoMaterial } from "@/lib/course-materials"

declare global {
	interface Window {
		YT: any;
		onYouTubeIframeAPIReady: (() => void) | undefined;
	}
}

interface YouTubePlayerProps {
	video: VideoMaterial
	onComplete?: () => void
	onProgress?: (progressPercent: number) => void
}

export function YouTubePlayer({ video, onComplete, onProgress }: YouTubePlayerProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const playerRef = useRef<any>(null)
	const pollRef = useRef<number | null>(null)
	const completedRef = useRef(false)

	// Extract YouTube video ID from typical embed/watch URLs
	const extractVideoId = (url: string): string | null => {
		// Handles: https://www.youtube.com/embed/VIDEOID?...
		const embedMatch = url.match(/\/embed\/([a-zA-Z0-9_-]{6,})/)
		if (embedMatch && embedMatch[1]) return embedMatch[1]
		// Handles: https://www.youtube.com/watch?v=VIDEOID
		const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{6,})/)
		if (watchMatch && watchMatch[1]) return watchMatch[1]
		// Handles: https://youtu.be/VIDEOID
		const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/)
		if (shortMatch && shortMatch[1]) return shortMatch[1]
		return null
	}

	useEffect(() => {
		const videoId = extractVideoId(video.url)
		if (!videoId || !containerRef.current) return

		const initializePlayer = () => {
			if (!containerRef.current) return
			playerRef.current = new window.YT.Player(containerRef.current, {
				videoId,
				playerVars: {
					origin: typeof window !== "undefined" ? window.location.origin : undefined,
					modestbranding: 1,
					rel: 0,
					playsinline: 1,
				},
				events: {
					onReady: () => {
						startPolling()
					},
					onStateChange: (event: any) => {
						// 0 = ended
						if (event.data === window.YT.PlayerState.ENDED) {
							if (!completedRef.current) {
								completedRef.current = true
								onComplete?.()
							}
						}
					},
				},
			});
		}

		const startPolling = () => {
			stopPolling()
			pollRef.current = window.setInterval(() => {
				try {
					const duration = playerRef.current?.getDuration?.() || 0
					const current = playerRef.current?.getCurrentTime?.() || 0
					if (duration > 0) {
						const progress = (current / Math.max(1, duration)) * 100
						onProgress?.(progress)
						if (progress >= 95 && !completedRef.current) {
							completedRef.current = true
							onComplete?.()
						}
					}
				} catch {}
			}, 500)
		}

		const stopPolling = () => {
			if (pollRef.current) {
				clearInterval(pollRef.current)
				pollRef.current = null
			}
		}

		const addApiScriptIfNeeded = () => {
			if (typeof window === "undefined") return
			if (window.YT && window.YT.Player) {
				initializePlayer()
				return
			}
			// Avoid injecting multiple scripts
			const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]')
			if (!existing) {
				const tag = document.createElement("script")
				tag.src = "https://www.youtube.com/iframe_api"
				document.body.appendChild(tag)
			}
			const previous = window.onYouTubeIframeAPIReady
			window.onYouTubeIframeAPIReady = () => {
				previous?.()
				initializePlayer()
			}
		}

		addApiScriptIfNeeded()

		return () => {
			stopPolling()
			try {
				playerRef.current?.destroy?.()
			} catch {}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [video.url])

	return (
		<Card className="w-full">
			<CardContent className="p-0">
				<div className="relative w-full aspect-video max-h-[70vh]">
					<div ref={containerRef} className="absolute inset-0 w-full h-full rounded-t-lg" />
				</div>
			</CardContent>
		</Card>
	)
}


