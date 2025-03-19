"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { LogOut, Loader2, Utensils, DollarSign, Flame, ShoppingCart, ArrowLeft, Sparkles, Info } from "lucide-react"

interface MealItem {
  name: string
  quantity: number
  unit: string
  calories: number
  cost: number
}

interface DietPlan {
  meals: MealItem[]
  totalCalories: number
  totalCost: number
}

// Function to get food image URL based on name
const getFoodImageUrl = (name: string) => {
  const lowerName = name.toLowerCase()

  if (lowerName.includes("potato")) return "/placeholder.svg?height=100&width=100&text=Potato"
  if (lowerName.includes("tomato")) return "/placeholder.svg?height=100&width=100&text=Tomato"
  if (lowerName.includes("spinach") || lowerName.includes("leafy"))
    return "/placeholder.svg?height=100&width=100&text=Spinach"
  if (lowerName.includes("rice")) return "/placeholder.svg?height=100&width=100&text=Rice"
  if (lowerName.includes("chicken")) return "/placeholder.svg?height=100&width=100&text=Chicken"
  if (lowerName.includes("egg")) return "/placeholder.svg?height=100&width=100&text=Eggs"
  if (lowerName.includes("milk")) return "/placeholder.svg?height=100&width=100&text=Milk"
  if (lowerName.includes("fruit")) return "/placeholder.svg?height=100&width=100&text=Fruits"

  // Default image
  return "/placeholder.svg?height=100&width=100&text=Food"
}

// Nutrition tips
const nutritionTips = [
  "Sip slowly, live deeply. Hydration is the foundation of vitality.",
  "Let your food be a symphony of colors—each hue a different nutrient caressing your body.",
  "Eat with intention, not distraction. Your body deserves your full attention.",
  "The most seductive spice? Patience. Allow your meals to be an experience, not a race.",
  "Embrace the darkness of leafy greens—they hold secrets to longevity and passion.",
]

export default function DietPlanPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null)
  const [mounted, setMounted] = useState(false)
  const [randomTip, setRandomTip] = useState("")

  useEffect(() => {
    setMounted(true)
    setRandomTip(nutritionTips[Math.floor(Math.random() * nutritionTips.length)])

    const fetchDietPlan = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }

      try {
        const response = await axios.get("/api/user/diet-plan", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const meals = Array.isArray(response.data.meals) ? response.data.meals : []
        setDietPlan({
          meals,
          totalCalories: response.data.totalCalories || 0,
          totalCost: response.data.totalCost || 0,
        })
      } catch (err: any) {
        console.error("Error fetching diet plan:", err)
        setError(err.response?.data?.error || "Failed to load your diet plan. Please try again later.")
        setDietPlan({
          meals: [],
          totalCalories: 0,
          totalCost: 0,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDietPlan()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/")
  }

  if (!mounted) return null

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center">
          <div className="relative mb-4">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-600 to-purple-700 rounded-full blur opacity-30 animate-pulse-glow"></div>
            <Loader2 className="h-12 w-12 text-pink-500 animate-spin relative" />
          </div>
          <p className="text-lg font-medium text-teal-400 italic animate-pulse-glow">Summoning your desires...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4 overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-pink-600/10"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-pink-400 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Temptation
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center text-sm font-medium text-red-400 hover:text-red-300 transition-colors duration-200"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Flee the Feast
          </button>
        </div>

        <div className="bg-gray-800/90 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-gray-700/50 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/5 to-purple-700/5"></div>

          <div className="relative p-8">
            <div className="text-center mb-8 animate-fade-in">
              <div className="inline-flex items-center justify-center p-2 bg-gray-900 rounded-full mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700 rounded-full blur opacity-70"></div>
                <Sparkles className="relative h-6 w-6 text-pink-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 text-glow font-serif">Your Divine Feast</h1>
              <p className="text-gray-400 italic">Crafted for your desires and ambitions</p>
            </div>

            {error ? (
              <div className="p-6 bg-gray-800 border border-red-500/30 text-pink-400 rounded-lg text-sm animate-pulse">
                {error}
              </div>
            ) : dietPlan ? (
              <div className="space-y-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800 rounded-xl p-4 border border-pink-600/20 relative overflow-hidden group transition-all duration-300 hover:border-pink-600/40 hover:shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-purple-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex items-center relative">
                      <div className="bg-gray-900 rounded-full p-3 mr-4 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/30 to-purple-700/30 rounded-full blur opacity-70"></div>
                        <Flame className="relative h-6 w-6 text-pink-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Total Calories</p>
                        <p className="text-xl font-bold text-white">
                          {dietPlan.totalCalories} <span className="text-pink-400">cal</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-4 border border-teal-500/20 relative overflow-hidden group transition-all duration-300 hover:border-teal-500/40 hover:shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex items-center relative">
                      <div className="bg-gray-900 rounded-full p-3 mr-4 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-blue-600/30 rounded-full blur opacity-70"></div>
                        <DollarSign className="relative h-6 w-6 text-teal-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Total Cost</p>
                        <p className="text-xl font-bold text-white">
                          ₹<span className="text-teal-400">{dietPlan.totalCost}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-4 border border-purple-600/20 relative overflow-hidden group transition-all duration-300 hover:border-purple-600/40 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-indigo-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex items-center relative">
                      <div className="bg-gray-900 rounded-full p-3 mr-4 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-700/30 rounded-full blur opacity-70"></div>
                        <ShoppingCart className="relative h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Meal Items</p>
                        <p className="text-xl font-bold text-white">
                          {dietPlan.meals.length} <span className="text-purple-400">items</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nutrition Tip */}
                <div className="bg-gray-800/80 rounded-xl p-6 border border-teal-500/20">
                  <div className="flex items-start">
                    <div className="bg-gray-900 rounded-full p-2 mr-4 relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-blue-600/30 rounded-full blur opacity-70"></div>
                      <Info className="relative h-5 w-5 text-teal-400" />
                    </div>
                    <p className="text-teal-400 italic text-sm">{randomTip}</p>
                  </div>
                </div>

                {/* Meal Items */}
                <div className="bg-gray-800/80 rounded-xl p-6 border border-gray-700/50">
                  <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
                    <Utensils className="h-5 w-5 mr-2 text-pink-400" />
                    Your Meal Plan
                  </h2>

                  {dietPlan.meals && dietPlan.meals.length > 0 ? (
                    <div className="space-y-4">
                      {dietPlan.meals.map((item, index) => (
                        <div
                          key={index}
                          className="bg-gray-700/80 rounded-lg p-4 border border-gray-600 relative overflow-hidden group transition-all duration-300 hover:border-pink-600/30 hover:shadow-[0_0_10px_rgba(236,72,153,0.15)]"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-purple-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="flex items-center relative">
                            <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0 border border-gray-600 group-hover:border-pink-600/30 transition-colors duration-300">
                              <img
                                src={getFoodImageUrl(item.name) || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <h3 className="font-medium text-pink-400 group-hover:text-pink-300 transition-colors duration-300">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {item.quantity} {item.unit} •{" "}
                                <span className="text-white">{item.calories} calories</span>
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-white">
                                ₹<span className="text-teal-400">{item.cost}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <Utensils className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                      <p>No meal items available</p>
                      <p className="text-sm mt-2 text-gray-500">Please update your profile to generate a meal plan</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center p-8 text-gray-400">
                <p>No diet plan available.</p>
              </div>
            )}

            <div className="mt-8 text-center">
              <button
                onClick={() => router.push("/profile")}
                className="inline-flex items-center justify-center py-3 px-6 bg-gradient-to-r from-pink-600 to-purple-700 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] group"
              >
                <span>Update Your Profile</span>
                <Sparkles className="ml-2 h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

