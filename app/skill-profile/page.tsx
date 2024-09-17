'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSearchParams } from 'next/navigation'

const userProfiles = {
  '1': {
    name: 'David',
    role: 'Frontend Developer',
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "Jest"],
    projects: [
      { name: "E-commerce Platform", description: "A responsive online shopping application" },
      { name: "Portfolio Website", description: "A personal portfolio with dynamic content" }
    ],
    about: "Frontend developer with a passion for creating intuitive and performant user interfaces. Experienced in modern JavaScript frameworks and responsive design."
  },
  '2': {
    name: 'Eva',
    role: 'Mobile App Developer',
    skills: ["React Native", "Swift", "Kotlin", "Firebase", "GraphQL", "Jest"],
    projects: [
      { name: "Fitness Tracker App", description: "A cross-platform mobile app for tracking workouts and nutrition" },
      { name: "Social Media App", description: "A feature-rich social networking application" }
    ],
    about: "Mobile app developer specializing in cross-platform development. Passionate about creating seamless mobile experiences with a focus on performance and user engagement."
  },
  '3': {
    name: 'Frank',
    role: 'Data Scientist',
    skills: ["Python", "R", "Machine Learning", "TensorFlow", "SQL", "Data Visualization"],
    projects: [
      { name: "Predictive Analytics Tool", description: "A machine learning model for predicting customer behavior" },
      { name: "Data Visualization Dashboard", description: "Interactive charts for business analytics" }
    ],
    about: "Data scientist with expertise in machine learning and statistical analysis. Passionate about turning data into actionable insights and developing AI-driven solutions."
  },
  '4': {
    name: 'Grace',
    role: 'AI Engineer',
    skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision", "AWS"],
    projects: [
      { name: "Chatbot Integration", description: "An AI-powered chatbot for customer service" },
      { name: "Image Recognition System", description: "A deep learning model for image classification" }
    ],
    about: "AI engineer focused on developing cutting-edge machine learning models. Experienced in natural language processing and computer vision applications."
  },
  '5': {
    name: 'Henry',
    role: 'DevOps Engineer',
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Python"],
    projects: [
      { name: "Cloud Migration", description: "Migrated on-premise infrastructure to cloud-based solutions" },
      { name: "Automated Deployment Pipeline", description: "Implemented a robust CI/CD pipeline for faster deployments" }
    ],
    about: "DevOps engineer specializing in cloud infrastructure and automation. Passionate about optimizing development workflows and ensuring scalable, reliable systems."
  }
}

const SkillMatchMeter = ({ percentage }: { percentage: number }) => (
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

export default function SkillProfile() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || '1'
  const profile = userProfiles[id as keyof typeof userProfiles]

  // Generate a random skill match percentage between 70 and 100
  const skillMatchPercentage = useMemo(() => Math.floor(Math.random() * (100 - 70 + 1) + 70), [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-blue-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-md animate-pulse"></div>
            <Avatar className="w-32 h-32 border-4 border-white relative">
              <AvatarFallback className="bg-black text-white text-4xl">
                {profile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-8">
            <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
            <p className="text-xl text-blue-200">{profile.role}</p>
          </div>
          <div className="ml-auto">
            <SkillMatchMeter percentage={skillMatchPercentage} />
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
              <p className="text-blue-100">{profile.about}</p>
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
                {profile.skills.map((skill, index) => (
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
                {profile.projects.map((project, index) => (
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