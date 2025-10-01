import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const materialId = params.id

    // Get material info from database
    const material = await sql`
      SELECT * FROM course_materials 
      WHERE id = ${materialId}
    `

    if (!material[0]) {
      return NextResponse.json({ error: "Material not found" }, { status: 404 })
    }

    const materialData = material[0]

    // For files stored in blob storage
    if (materialData.file_url) {
      // Redirect to the actual file URL
      return NextResponse.redirect(materialData.file_url)
    }

    // For direct file serving
    return NextResponse.json(
      {
        error: "File not available for download",
      },
      { status: 404 },
    )
  } catch (error) {
    console.error("Download error:", error)
    return NextResponse.json(
      {
        error: "Failed to download file",
      },
      { status: 500 },
    )
  }
}
