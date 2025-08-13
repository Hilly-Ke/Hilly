import { type NextRequest, NextResponse } from "next/server"
import { voteOnPost } from "@/lib/db"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId, voteType } = await request.json()
    const postId = Number.parseInt(params.id)

    if (!userId || !voteType || !postId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await voteOnPost(postId, userId, voteType)

    if (!result.success) {
      return NextResponse.json({ error: "Failed to vote on post" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Voting error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
