import { neon } from "@neondatabase/serverless"
import { assertEnv } from "@/lib/utils"

assertEnv(["DATABASE_URL"]) // Ensure DATABASE_URL exists at runtime
const sql = neon(process.env.DATABASE_URL as string)

export { sql }

// User management functions
export async function createUser(userData: {
  id: string
  email: string
  name: string
  role: string
}) {
  try {
    await sql`
      INSERT INTO neon_auth.users_sync (id, email, name, raw_json)
      VALUES (${userData.id}, ${userData.email}, ${userData.name}, ${JSON.stringify({ role: userData.role })})
      ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        name = EXCLUDED.name,
        raw_json = EXCLUDED.raw_json,
        updated_at = NOW()
    `
    return { success: true }
  } catch (error) {
    console.error("Error creating user:", error)
    return { success: false, error }
  }
}

export async function getUserById(id: string) {
  try {
    const result = await sql`
      SELECT id, email, name, raw_json, created_at
      FROM neon_auth.users_sync
      WHERE id = ${id} AND deleted_at IS NULL
    `
    return result[0] || null
  } catch (error) {
    console.error("Error getting user:", error)
    return null
  }
}

export async function getAllUsers() {
  try {
    const result = await sql`
      SELECT id, email, name, raw_json, created_at
      FROM neon_auth.users_sync
      WHERE deleted_at IS NULL
      ORDER BY created_at DESC
    `
    return result
  } catch (error) {
    console.error("Error getting users:", error)
    return []
  }
}

// Course management functions
export async function getAllCourses() {
  try {
    const result = await sql`
      SELECT DISTINCT ON (id) *
      FROM courses
      ORDER BY id, created_at DESC
    `
    return result
  } catch (error) {
    console.error("Error getting courses:", error)
    return []
  }
}

export async function getCourseById(id: number) {
  try {
    const result = await sql`
      SELECT * FROM courses WHERE id = ${id}
    `
    return result[0] || null
  } catch (error) {
    console.error("Error getting course:", error)
    return null
  }
}

export async function enrollInCourse(userId: string, courseId: number) {
  try {
    await sql`
      INSERT INTO enrollments (user_id, course_id)
      VALUES (${userId}, ${courseId})
      ON CONFLICT (user_id, course_id) DO NOTHING
    `

    // Update course student count
    await sql`
      UPDATE courses 
      SET students_count = students_count + 1
      WHERE id = ${courseId}
    `

    return { success: true }
  } catch (error) {
    console.error("Error enrolling in course:", error)
    return { success: false, error }
  }
}

export async function getUserEnrollments(userId: string) {
  try {
    const result = await sql`
      SELECT c.*, e.enrolled_at, e.progress, e.completed
      FROM courses c
      JOIN enrollments e ON c.id = e.course_id
      WHERE e.user_id = ${userId}
      ORDER BY e.enrolled_at DESC
    `
    return result
  } catch (error) {
    console.error("Error getting user enrollments:", error)
    return []
  }
}

// Community functions
export async function getAllPosts() {
  try {
    const result = await sql`
      SELECT * FROM community_posts
      ORDER BY created_at DESC
    `
    return result
  } catch (error) {
    console.error("Error getting posts:", error)
    return []
  }
}

export async function createPost(postData: {
  userId: string
  userName: string
  userRole: string
  title: string
  content: string
  category: string
  fileUrl?: string
  fileName?: string
}) {
  try {
    const result = await sql`
      INSERT INTO community_posts (user_id, user_name, user_role, title, content, category, file_url, file_name)
      VALUES (${postData.userId}, ${postData.userName}, ${postData.userRole}, ${postData.title}, ${postData.content}, ${postData.category}, ${postData.fileUrl || null}, ${postData.fileName || null})
      RETURNING *
    `
    return { success: true, post: result[0] }
  } catch (error) {
    console.error("Error creating post:", error)
    return { success: false, error }
  }
}

export async function voteOnPost(postId: number, userId: string, voteType: "up" | "down") {
  try {
    // Check if user already voted
    const existingVote = await sql`
      SELECT * FROM post_votes WHERE post_id = ${postId} AND user_id = ${userId}
    `

    if (existingVote.length > 0) {
      // Update existing vote
      await sql`
        UPDATE post_votes 
        SET vote_type = ${voteType}
        WHERE post_id = ${postId} AND user_id = ${userId}
      `
    } else {
      // Create new vote
      await sql`
        INSERT INTO post_votes (post_id, user_id, vote_type)
        VALUES (${postId}, ${userId}, ${voteType})
      `
    }

    // Update post vote counts
    const upvotes = await sql`
      SELECT COUNT(*) as count FROM post_votes 
      WHERE post_id = ${postId} AND vote_type = 'up'
    `
    const downvotes = await sql`
      SELECT COUNT(*) as count FROM post_votes 
      WHERE post_id = ${postId} AND vote_type = 'down'
    `

    await sql`
      UPDATE community_posts 
      SET upvotes = ${upvotes[0].count}, downvotes = ${downvotes[0].count}
      WHERE id = ${postId}
    `

    return { success: true }
  } catch (error) {
    console.error("Error voting on post:", error)
    return { success: false, error }
  }
}
