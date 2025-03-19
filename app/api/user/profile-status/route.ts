import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET() {
  try {
    const headersList = headers()
    const authorization = headersList.get("Authorization")

    if (!authorization) {
      return NextResponse.json({ error: "Authorization header is required" }, { status: 401 })
    }

    const response = await fetch("http://localhost:5000/api/user/profile-status", {
      headers: {
        Authorization: authorization,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: errorData.message || "Failed to get profile status" },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Profile status error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

