"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { ArrowLeft, User, Calendar, Weight, Ruler, Target, MapPin, Loader2, ChevronDown, Sparkles } from "lucide-react"

export default function ProfileSetupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    goal: "",
    region: "",
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    try {
      await axios.post(
        "/api/user/profile",
        {
          age: Number.parseInt(formData.age),
          gender: formData.gender,
          weight: Number.parseFloat(formData.weight),
          height: Number.parseFloat(formData.height),
          goal: formData.goal,
          region: formData.region,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      router.push("/diet-plan")
    } catch (err: any) {
      console.error("Profile setup error:", err)
      setError(err.response?.data?.error || "Failed to save profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-600/10"
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

      <div className="container mx-auto max-w-2xl relative z-10">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-purple-400 transition-colors duration-200 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Temptation
        </Link>

        <div className="bg-gray-800 border border-purple-600/40 rounded-xl shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-700/5"></div>

          <div className="relative p-8">
            <div className="text-center mb-8 animate-fade-in">
              <div className="inline-flex items-center justify-center p-2 bg-gray-900 rounded-full mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-full blur opacity-70"></div>
                <Sparkles className="relative h-6 w-6 text-purple-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2 text-glow-purple font-serif">Sculpt Your Essence</h1>
              <p className="text-gray-400 italic">Define your desires and ambitions</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-gray-800 border border-red-500/30 text-purple-400 rounded-lg text-sm animate-pulse">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="age" className="text-sm font-medium text-gray-300 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Your age"
                    required
                    min="1"
                    max="120"
                    className="w-full px-4 py-3 bg-gray-700 text-white border border-purple-600/50 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="gender" className="text-sm font-medium text-gray-300 flex items-center">
                    <User className="h-4 w-4 mr-2 text-purple-400" />
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 text-white border border-purple-600/50 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-transparent transition-all duration-200 appearance-none"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="weight" className="text-sm font-medium text-gray-300 flex items-center">
                    <Weight className="h-4 w-4 mr-2 text-purple-400" />
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Your weight in kg"
                    required
                    step="0.1"
                    min="1"
                    className="w-full px-4 py-3 bg-gray-700 text-white border border-purple-600/50 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="height" className="text-sm font-medium text-gray-300 flex items-center">
                    <Ruler className="h-4 w-4 mr-2 text-purple-400" />
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Your height in cm"
                    required
                    step="0.1"
                    min="1"
                    className="w-full px-4 py-3 bg-gray-700 text-white border border-purple-600/50 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="goal" className="text-sm font-medium text-gray-300 flex items-center">
                    <Target className="h-4 w-4 mr-2 text-purple-400" />
                    Goal
                  </label>
                  <div className="relative">
                    <select
                      id="goal"
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 text-white border border-purple-600/50 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-transparent transition-all duration-200 appearance-none"
                    >
                      <option value="">Select Goal</option>
                      <option value="Weight Loss">Weight Loss</option>
                      <option value="Weight Gain">Weight Gain</option>
                      <option value="Muscle Building">Muscle Building</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="region" className="text-sm font-medium text-gray-300 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                    Region
                  </label>
                  <div className="relative">
                    <select
                      id="region"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 text-white border border-purple-600/50 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-transparent transition-all duration-200 appearance-none"
                    >
                      <option value="">Select Region</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Chennai">Chennai</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium rounded-full transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center justify-center mt-8 relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5 inline" />
                      Crafting Your Plan...
                    </>
                  ) : (
                    "Unleash My Plan"
                  )}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

