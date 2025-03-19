"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { ArrowLeft, Mail, Lock, Loader2, Sparkles } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const loginResponse = await axios.post("/api/auth/login", {
        email,
        password,
      })

      const token = loginResponse.data.token
      localStorage.setItem("token", token)

      const profileResponse = await axios.get("/api/user/profile-status", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (profileResponse.data.isComplete) {
        router.push("/diet-plan")
      } else {
        router.push("/profile")
      }
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.response?.data?.error || "Login failed. Please check your credentials and try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-teal-500/10"
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

      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-teal-400 transition-colors duration-200 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Temptation
        </Link>

        <div className="bg-gray-800 border border-teal-500/40 rounded-xl shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-600/5"></div>

          <div className="relative p-8">
            <div className="text-center mb-8 animate-fade-in">
              <div className="inline-flex items-center justify-center p-2 bg-gray-900 rounded-full mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full blur opacity-70"></div>
                <Sparkles className="relative h-6 w-6 text-teal-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2 text-glow-teal font-serif">Unlock Your Feast</h1>
              <p className="text-gray-400 italic">Return to your sensual journey</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-gray-800 border border-red-500/30 text-teal-400 rounded-lg text-sm animate-pulse">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-teal-400" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-4 pr-4 py-3 bg-gray-700 text-white border border-teal-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300 flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-teal-400" />
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-4 pr-4 py-3 bg-gray-700 text-white border border-teal-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium rounded-full transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(20,184,166,0.5)] flex items-center justify-center mt-8 relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5 inline" />
                      Entering...
                    </>
                  ) : (
                    "Dive Deep"
                  )}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </form>
          </div>

          <div className="px-8 py-4 bg-gray-900/50 border-t border-gray-700/50 relative">
            <p className="text-sm text-center">
              New here?{" "}
              <Link
                href="/register"
                className="text-teal-400 hover:text-teal-300 transition-colors duration-200 font-medium"
              >
                Seduce us
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

