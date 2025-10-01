import { type NextRequest, NextResponse } from "next/server"
import { getMaterialUrl, validateMaterialAccess } from "@/lib/course-materials"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const materialId = params.id
    const userId = request.headers.get("x-user-id") // Would come from auth

    // Validate user access
    if (userId && !(await validateMaterialAccess(materialId, userId))) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Get material URL
    const materialUrl = await getMaterialUrl(materialId)

    if (!materialUrl) {
      return NextResponse.json({ error: "Material not found" }, { status: 404 })
    }

    // For videos, return streaming response
    if (materialUrl.includes("/videos/")) {
      return NextResponse.redirect(materialUrl)
    }

    // For other files, return download response
    return NextResponse.json({ url: materialUrl, downloadable: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to access material" }, { status: 500 })
  }
}
