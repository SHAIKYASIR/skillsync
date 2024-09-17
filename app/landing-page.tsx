'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Home, Info, LogIn, UserPlus, Users, Search, Layers, MessageSquare } from "lucide-react"
import Link from "next/link"
import Image from 'next/image'
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState('')
  const { isSignedIn, signOut, isLoaded } = useAuth()
  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAuthAction = (action: 'login' | 'signup') => {
    if (isSignedIn) {
      signOut()
    } else {
      router.push(`/sign-${action}`)
    }
  }

  const handleSkillMatchingClick = () => {
    if (isSignedIn) {
      router.push('/dashboard')
    } else {
      router.push('/sign-in')
    }
  }

  const handleCollaborationClick = () => {
    if (isSignedIn) {
      router.push('/collaboration')
    } else {
      router.push('/sign-in')
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the subscription logic
    console.log('Subscribed with email:', email)
    setEmail('')
  }

  const createCheckoutSession = useMutation(api.stripe.createCheckoutSession)

  const handleBuySubscription = async () => {
    try {
      const result = await createCheckoutSession()
      if (result.url) {
        window.location.href = result.url
      } else {
        throw new Error('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Error in handleBuySubscription:', error)
    }
  };

  const handleVectorSearchClick = () => {
    router.push('/discover')
  }

  if (!mounted || !isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-900">
        <Image
          src="/logo.svg"
          alt="SkillSync Logo"
          width={80}
          height={80}
          className="animate-pulse"
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-x-hidden">
      <header className="p-4 w-full">
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-4">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <Image src="/logo.svg" alt="SkillSync Logo" width={40} height={40} />
            <span className="ml-2">SkillSync</span>
          </Link>
          <div className="flex space-x-4 items-center">
            <NavItem href="/" icon={<Home className="w-6 h-6" />} text="Home" />
            <NavItem href="/about" icon={<Info className="w-6 h-6" />} text="About" />
            <Button onClick={handleBuySubscription} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              Buy Subscription
            </Button>
            <Button onClick={() => handleAuthAction('login')} className="flex items-center space-x-1">
              <LogIn className="w-6 h-6" />
              <span>{isSignedIn ? 'Logout' : 'Login'}</span>
            </Button>
            {!isSignedIn && (
              <Button onClick={() => handleAuthAction('signup')} className="flex items-center space-x-1">
                <UserPlus className="w-6 h-6" />
                <span>Sign Up</span>
              </Button>
            )}
          </div>
        </nav>
        <form onSubmit={handleSubscribe} className="mt-4 flex justify-center items-center space-x-2 max-w-7xl mx-auto px-4">
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
      <main className="flex-grow flex flex-col justify-center w-full">
        <div className="container mx-auto px-4">
          <section className="py-20 text-center relative overflow-hidden">
            <motion.h1 
              className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
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
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                Get Started
              </Button>
              <Button variant="outline" className="bg-transparent hover:bg-white hover:text-gray-900 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 border-2 border-white">
                Learn More
              </Button>
            </motion.div>
            <div className="mt-12 relative h-64">
              <NetworkAnimation />
            </div>
          </section>
          <section className="py-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<MessageSquare className="w-12 h-12 text-blue-400" />}
                title="Real-time Collaboration"
                description="Work together seamlessly in real-time with other skilled professionals."
                onClick={handleCollaborationClick}
              />
              <FeatureCard
                icon={<Users className="w-12 h-12 text-green-400" />}
                title="Skill Matching"
                description="Find the perfect match for your project based on skills and experience."
                onClick={handleSkillMatchingClick}
              />
              <FeatureCard
                icon={<Search className="w-12 h-12 text-purple-400" />}
                title="Vector Search"
                description="Utilize advanced vector search to find relevant skills and projects."
                onClick={handleVectorSearchClick}
              />
              <FeatureCard
                icon={<Layers className="w-12 h-12 text-red-400" />}
                title="Multiplayer Features"
                description="Engage in multiplayer coding sessions and collaborative problem-solving."
                onClick={() => {}}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

function NavItem({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
  return (
    <Link href={href} className="flex items-center space-x-1 text-gray-300 hover:text-white transition duration-300">
      {icon}
      <span className="sr-only">{text}</span>
    </Link>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

function FeatureCard({ icon, title, description, onClick }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-center mb-4">{icon}</div>
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