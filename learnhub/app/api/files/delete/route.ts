import { del } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const DeleteSchema = z.object({
  url: z.string().url().max(2048),
})

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = DeleteSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request", issues: parsed.error.format() }, { status: 400 })
    }
    const { url } = parsed.data

    await del(url)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}
