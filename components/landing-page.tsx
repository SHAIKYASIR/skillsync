'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Home, Info, LogIn, UserPlus, Zap, Users, Search, Layers } from 'lucide-react'
import Link from 'next/link'

export function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">SkillSync</div>
            <div className="hidden md:flex space-x-4">
              <NavItem icon={<Home size={18} />} text="Home" />
              <NavItem icon={<Info size={18} />} text="About" />
              <NavItem icon={<LogIn size={18} />} text="Login" />
              <NavItem icon={<UserPlus size={18} />} text="Sign Up" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Connect & Sync Your Skills
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Unlock your potential with our innovative skill-matching platform
          </motion.p>
          <motion.div 
            className="flex justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              Get Started
            </Button>
            <Button variant="outline" className="bg-transparent hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full border-2 border-blue-600 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Animation */}
      <div className="relative h-64 mb-20">
        <NetworkAnimation />
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Zap size={40} className="text-yellow-400" />}
              title="Real-time Collaboration"
              description="Work together seamlessly in real-time with other users."
            />
            <FeatureCard 
              icon={<Users size={40} className="text-green-400" />}
              title="Skill Matching"
              description="Find the perfect match for your project based on skills and expertise."
            />
            <FeatureCard 
              icon={<Search size={40} className="text-blue-400" />}
              title="Vector Search"
              description="Utilize advanced vector search to find relevant skills and users."
            />
            <FeatureCard 
              icon={<Layers size={40} className="text-purple-400" />}
              title="Multiplayer Features"
              description="Engage in multiplayer activities to enhance your skills collaboratively."
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function NavItem({ icon, text }) {
  return (
    <Link href="#" className="flex items-center space-x-1 text-gray-300 hover:text-white transition duration-300">
      {icon}
      <span>{text}</span>
    </Link>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div 
      className="bg-gray-700 p-6 rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-400 text-center">{description}</p>
    </motion.div>
  )
}

function NetworkAnimation() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 200">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0,100 Q200,50 400,100 T800,100"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.circle cx="0" cy="100" r="5" fill="#3b82f6"
        animate={{ cx: [0, 800], opacity: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle cx="400" cy="100" r="5" fill="#8b5cf6"
        animate={{ cx: [400, 0, 800], opacity: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  )
}