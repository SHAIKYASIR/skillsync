'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Home, Info, LogIn, UserPlus, Zap, Users, Search, Layers } from "lucide-react"
import Link from "next/link"

export function LandingPage() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the subscription logic
    console.log('Subscribed with email:', email)
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="p-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">SkillSync</Link>
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              <Home className="w-6 h-6" />
              <span className="sr-only">Home</span>
            </Link>
            <Link href="/about" className="hover:text-blue-400 transition-colors">
              <Info className="w-6 h-6" />
              <span className="sr-only">About</span>
            </Link>
            <Link href="/login" className="hover:text-blue-400 transition-colors">
              <LogIn className="w-6 h-6" />
              <span className="sr-only">Login</span>
            </Link>
            <Link href="/signup" className="hover:text-blue-400 transition-colors">
              <UserPlus className="w-6 h-6" />
              <span className="sr-only">Sign Up</span>
            </Link>
          </div>
        </nav>
        <form onSubmit={handleSubscribe} className="mt-4 flex justify-center items-center space-x-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="max-w-xs bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:border-blue-500"
            required
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg animate-pulse">
            Subscribe
          </Button>
        </form>
      </header>
      <main className="container mx-auto px-4">
        <section className="py-20 text-center relative overflow-hidden">
          <h1 className="text-5xl font-bold mb-6">Connect & Sync Your Skills</h1>
          <p className="text-xl mb-8">Unlock your potential with our innovative skill-matching platform</p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              Get Started
            </Button>
            <Button variant="outline" className="bg-transparent hover:bg-white hover:text-gray-900 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 border-2 border-white">
              Learn More
            </Button>
          </div>
          <div className="mt-12 relative">
            <div className="simple-animation">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="particle" />
              ))}
            </div>
          </div>
        </section>
        <section className="py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Zap className="w-12 h-12 text-yellow-400" />}
              title="Real-time Collaboration"
              description="Work together seamlessly in real-time with other skilled professionals."
            />
            <FeatureCard
              icon={<Users className="w-12 h-12 text-green-400" />}
              title="Skill Matching"
              description="Find the perfect match for your project based on skills and experience."
            />
            <FeatureCard
              icon={<Search className="w-12 h-12 text-purple-400" />}
              title="Vector Search"
              description="Utilize advanced vector search to find relevant skills and projects."
            />
            <FeatureCard
              icon={<Layers className="w-12 h-12 text-red-400" />}
              title="Multiplayer Features"
              description="Engage in multiplayer coding sessions and collaborative problem-solving."
            />
          </div>
        </section>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-700">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-400 text-center">{description}</p>
    </div>
  )
}