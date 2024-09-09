'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const skills = [
  "React", "TypeScript", "Node.js", "GraphQL", "Next.js", "Tailwind CSS",
  "Python", "Docker", "AWS", "MongoDB", "Redux", "Jest"
]

const projects = [
  { name: "E-commerce Platform", description: "A full-stack online shopping application" },
  { name: "Task Management App", description: "A collaborative project management tool" },
  { name: "Data Visualization Dashboard", description: "Interactive charts for business analytics" }
]

const SkillMatchMeter = ({ percentage }) => (
  <div className="relative w-32 h-32">
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <circle
        className="text-gray-700 stroke-current"
        strokeWidth="10"
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
      ></circle>
      <circle
        className="text-blue-500 progress-ring__circle stroke-current"
        strokeWidth="10"
        strokeLinecap="round"
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        strokeDasharray="251.2"
        strokeDashoffset={251.2 * (1 - percentage / 100)}
        transform="rotate(-90 50 50)"
      ></circle>
      <text x="50" y="50" fontFamily="Verdana" fontSize="20" textAnchor="middle" alignmentBaseline="middle" fill="white">
        {percentage}%
      </text>
    </svg>
  </div>
)

export function SkillProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-blue-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-md animate-pulse"></div>
            <Avatar className="w-32 h-32 border-4 border-white relative">
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile Picture" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-8">
            <h1 className="text-4xl font-bold mb-2">John Doe</h1>
            <p className="text-xl text-blue-200">Full Stack Developer</p>
          </div>
          <div className="ml-auto">
            <SkillMatchMeter percentage={85} />
            <p className="text-center mt-2 text-blue-200">Skill Match</p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-blue-800 bg-opacity-50 backdrop-blur-lg mb-8">
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-100">
                Passionate full-stack developer with 5+ years of experience in building scalable web applications. 
                Enthusiastic about clean code, performance optimization, and staying up-to-date with the latest technologies.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-teal-800 bg-opacity-50 backdrop-blur-lg mb-8">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Badge 
                      className="text-sm py-1 px-2 bg-teal-700 hover:bg-teal-600 transition-colors duration-200"
                      style={{
                        boxShadow: "0 0 10px rgba(56, 178, 172, 0.5)",
                        transition: "box-shadow 0.3s ease-in-out",
                      }}
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-indigo-800 bg-opacity-50 backdrop-blur-lg">
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-indigo-200">{project.name}</h3>
                    <p className="text-indigo-100">{project.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}