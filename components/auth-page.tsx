'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Mail } from 'lucide-react'

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      <BackgroundAnimation />
      <motion.div
        className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form className="space-y-4">
          <FloatingInput
            id="email"
            type="email"
            label="Email"
          />
          <FloatingInput
            id="password"
            type="password"
            label="Password"
          />
          {!isLogin && (
            <FloatingInput
              id="confirmPassword"
              type="password"
              label="Confirm Password"
            />
          )}
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <div className="mt-4 flex justify-center space-x-4">
          <SocialButton icon={<Mail size={20} />} label="Google" />
          <SocialButton icon={<Github size={20} />} label="GitHub" />
        </div>
        <p className="mt-4 text-center text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            className="ml-2 text-blue-400 hover:text-blue-300 focus:outline-none focus:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  )
}

function FloatingInput({ id, type, label }) {
  return (
    <div className="relative">
      <Input
        type={type}
        id={id}
        placeholder=" "
        className="block w-full px-4 py-2 text-white bg-gray-700 border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
      />
      <Label
        htmlFor={id}
        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {label}
      </Label>
    </div>
  )
}

function SocialButton({ icon, label }) {
  return (
    <Button
      variant="outline"
      className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
    >
      {icon}
      <span className="sr-only">Sign in with {label}</span>
    </Button>
  )
}

function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 z-0">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad1)" />
        <g fill="none" stroke="url(#grad1)" strokeWidth="2">
          <motion.path
            d="M0 100 Q 250 50 400 200 T 800 300"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.path
            d="M0 300 Q 150 350 300 200 T 800 100"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
          />
          <motion.path
            d="M0 200 Q 100 150 200 300 T 800 200"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 2 }}
          />
        </g>
      </svg>
    </div>
  )
}