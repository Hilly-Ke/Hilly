import { list } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const { blobs } = await list()

    const files = blobs.map((blob) => ({
      id: blob.url.split("/").pop() || "unknown",
      name: blob.pathname.split("/").pop() || "unknown",
      url: blob.url,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    }))

    return NextResponse.json({ files })
  } catch (error) {
    console.error("Error listing files:", error)
    return NextResponse.json({ error: "Failed to list files" }, { status: 500 })
  }
}
