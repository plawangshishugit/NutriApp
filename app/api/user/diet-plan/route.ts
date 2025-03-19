import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET() {
  try {
    const headersList = headers()
    const authorization = headersList.get("Authorization")

    if (!authorization) {
      return NextResponse.json({ error: "Authorization header is required" }, { status: 401 })
    }

    const response = await fetch("http://localhost:5000/api/user/diet-plan", {
      headers: {
        Authorization: authorization,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json({ error: errorData.message || "Failed to get diet plan" }, { status: response.status })
    }

    const data = await response.json()

    // Ensure the data has the expected structure
    const sanitizedData = {
      meals: Array.isArray(data.meals) ? data.meals : [],
      totalCalories: data.totalCalories || 0,
      totalCost: data.totalCost || 0,
    }

    return NextResponse.json(sanitizedData)
  } catch (error) {
    console.error("Diet plan error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        // Return a valid empty diet plan structure to prevent frontend errors
        meals: [],
        totalCalories: 0,
        totalCost: 0,
      },
      { status: 500 },
    )
  }
}

