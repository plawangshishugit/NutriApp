"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Sparkles, Flame, ChevronDown, Send } from "lucide-react"

// Food items for the grid
const foodItems = [
  { name: "Tomato Bliss", image: "/placeholder.svg?height=300&width=300", color: "from-red-500/20 to-pink-500/20" },
  {
    name: "Spinach Seduction",
    image: "/placeholder.svg?height=300&width=300",
    color: "from-green-500/20 to-teal-500/20",
  },
  {
    name: "Carrot Desire",
    image: "/placeholder.svg?height=300&width=300",
    color: "from-orange-500/20 to-amber-500/20",
  },
  { name: "Avocado Dream", image: "/placeholder.svg?height=300&width=300", color: "from-green-600/20 to-lime-500/20" },
  { name: "Berry Fantasy", image: "/placeholder.svg?height=300&width=300", color: "from-purple-500/20 to-pink-500/20" },
  {
    name: "Citrus Ecstasy",
    image: "/placeholder.svg?height=300&width=300",
    color: "from-yellow-500/20 to-orange-500/20",
  },
]

export default function HomePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const knowMoreRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    // Check if user is already logged in
    const token = localStorage.getItem("token")
    if (token) {
      router.push("/diet-plan")
    }
  }, [router])

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate email submission
    setTimeout(() => {
      setEmailSent(true)
      setEmail("")
      setTimeout(() => setEmailSent(false), 3000)
    }, 500)
  }

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-950 overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-pink-500/10"
            style={{
              width: `${Math.random() * 15 + 5}px`,
              height: `${Math.random() * 15 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 15}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="w-full max-w-[500px] bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden z-10">
          <div className="p-8 md:p-10">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-700 rounded-full blur opacity-70"></div>
                <div className="relative bg-gray-900 rounded-full p-3">
                  <Flame className="h-10 w-10 text-pink-500" />
                </div>
              </div>
            </div>

            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-4 font-serif animate-fade-in opacity-0"
              style={{
                textShadow: "0 0 15px rgba(236, 72, 153, 0.5)",
                animationDelay: "0.3s",
                animationFillMode: "forwards",
              }}
            >
              Savor Your Destiny
            </h1>

            <p
              className="text-gray-300 text-center italic mb-10 opacity-0 animate-fade-in"
              style={{
                animationDelay: "0.6s",
                animationFillMode: "forwards",
              }}
            >
              In every bite, a whisper of eternity—nourish your soul.
            </p>

            <div className="space-y-4">
              <Link
                href="/register"
                className="flex items-center justify-center w-full py-3.5 px-6 bg-gradient-to-r from-pink-600 to-purple-700 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] group"
              >
                <span>Join the Banquet</span>
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/login"
                className="flex items-center justify-center w-full py-3.5 px-6 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(20,184,166,0.5)] group"
              >
                <span>Step Into Bliss</span>
                <Sparkles className="ml-2 h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          <div className="px-8 py-4 bg-gray-900/80 border-t border-gray-700/50">
            <p className="text-sm text-gray-400 text-center">Join thousands who've transcended ordinary nutrition</p>
          </div>
        </div>

        <button
          onClick={() => scrollToSection(gridRef)}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white opacity-80 hover:opacity-100 transition-opacity animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </section>

      {/* Food Grid Section */}
      <section ref={gridRef} className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center font-serif text-glow">
            Taste the Temptation
          </h2>
          <p className="text-gray-300 text-center italic mb-12 max-w-2xl mx-auto">
            Indulge in nature's most seductive offerings—each one a promise of pleasure and vitality.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-700/90 rounded-lg shadow-md overflow-hidden group transition-all duration-500 hover:scale-[1.03] hover:shadow-xl relative"
                style={{
                  animationDelay: `${index * 0.1 + 0.2}s`,
                  opacity: 0,
                  animation: "fade-in 0.8s ease-out forwards",
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                </div>
                <div className="p-4 relative">
                  <h3 className="text-xl font-bold text-pink-400 group-hover:text-pink-300 transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-gray-300 text-sm mt-1">A sensual blend of nutrients and flavor</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => scrollToSection(knowMoreRef)}
          className="mt-16 mx-auto block text-white opacity-80 hover:opacity-100 transition-opacity animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </section>

      {/* Know More Section */}
      <section ref={knowMoreRef} className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center font-serif text-glow-purple">
            Unveil the Secrets
          </h2>

          <div className="bg-gray-800/80 backdrop-blur-md rounded-xl shadow-xl border border-purple-500/20 p-8 max-w-3xl mx-auto">
            <p className="text-gray-300 text-center mb-8 leading-relaxed">
              Discover a diet crafted by science, kissed by passion—your body deserves this. Our algorithm blends
              nutritional science with your unique desires, creating a symphony of flavors that nourish both body and
              soul.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 rounded-lg bg-gray-700/50 border border-purple-500/20">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-900/50 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="font-bold text-white mb-2">Personalized</h3>
                <p className="text-sm text-gray-400">Tailored to your body's unique whispers</p>
              </div>

              <div className="p-4 rounded-lg bg-gray-700/50 border border-pink-500/20">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-pink-900/50 flex items-center justify-center">
                  <Flame className="h-6 w-6 text-pink-400" />
                </div>
                <h3 className="font-bold text-white mb-2">Passionate</h3>
                <p className="text-sm text-gray-400">Ignite your senses with every meal</p>
              </div>

              <div className="p-4 rounded-lg bg-gray-700/50 border border-teal-500/20">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-teal-900/50 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-teal-400"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                    <path d="M8.5 8.5v.01"></path>
                    <path d="M16 15.5v.01"></path>
                    <path d="M12 12v.01"></path>
                    <path d="M11 17v.01"></path>
                    <path d="M7 14v.01"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2">Scientific</h3>
                <p className="text-sm text-gray-400">Backed by nutritional wisdom</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollToSection(contactRef)}
          className="mt-16 mx-auto block text-white opacity-80 hover:opacity-100 transition-opacity animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center font-serif text-glow-teal">
            Whisper to Us
          </h2>

          <div className="bg-gray-800/80 backdrop-blur-md rounded-xl shadow-xl border border-teal-500/20 p-8">
            <p className="text-gray-300 text-center mb-8">
              Have questions about your nutritional journey? Send us your desires and we'll respond with wisdom.
            </p>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-teal-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Share your thoughts with us..."
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-teal-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center w-full py-3 px-6 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(20,184,166,0.5)] group"
              >
                <span>{emailSent ? "Message Sent!" : "Send Message"}</span>
                <Send className="ml-2 h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

