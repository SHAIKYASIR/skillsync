'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Plus, Search } from 'lucide-react'
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

const users = [
  { id: '1', name: 'Alice', avatar: '/placeholder.svg?height=32&width=32' },
  { id: '2', name: 'Bob', avatar: '/placeholder.svg?height=32&width=32' },
  { id: '3', name: 'Charlie', avatar: '/placeholder.svg?height=32&width=32' },
]

interface Message {
  _id: Id<"messages">;
  content: string;
  senderId: string;
  createdAt: number;
}

export default function CollaborationPage() {
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeUsers] = useState(users)
  const [editorContent, setEditorContent] = useState('')
  const [selectedProject, setSelectedProject] = useState<Id<"projects"> | null>(null)
  const [newProjectName, setNewProjectName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)

  const projects = useQuery(api.projects.list) || []
  const projectMessages = useQuery(api.messages.list, 
    selectedProject ? { projectId: selectedProject } : "skip"
  ) as Message[] | undefined

  const sendMessage = useMutation(api.messages.send)
  const updateProject = useMutation(api.projects.update)
  const createProject = useMutation(api.projects.create)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [projectMessages])

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setIsTyping(false)
    }, 1000)

    return () => clearTimeout(typingTimer)
  }, [newMessage])

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim() && selectedProject) {
      sendMessage({ 
        projectId: selectedProject, 
        content: newMessage.trim(), 
        senderId: '1' // Replace with actual user ID
      }).then(() => {
        setNewMessage('')
        setIsTyping(false)
      }).catch((error) => {
        console.error("Error sending message:", error)
      })
    }
  }, [newMessage, selectedProject, sendMessage])

  const handleProjectChange = useCallback((projectId: string) => {
    setSelectedProject(projectId as Id<"projects">)
    const project = projects.find(p => p._id === projectId)
    if (project) {
      setEditorContent(project.content || '')
    }
  }, [projects])

  const handleEditorChange = useCallback((content: string) => {
    setEditorContent(content)
    if (selectedProject) {
      updateProject({ id: selectedProject, content })
    }
  }, [selectedProject, updateProject])

  const handleCreateProject = useCallback(() => {
    if (newProjectName.trim()) {
      createProject({ 
        name: newProjectName.trim(), 
        content: '', 
        ownerId: '1' // Replace with actual user ID
      }).then((projectId) => {
        setNewProjectName('')
        setSelectedProject(projectId)
      }).catch((error) => {
        console.error("Error creating project:", error)
      })
    }
  }, [newProjectName, createProject])

  const handleSearch = useCallback(() => {
    // Implement vector search functionality here
    console.log("Searching for:", searchQuery)
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Collaboration Hub</h1>
      <div className="mb-4 flex space-x-2">
        <select
          className="flex-grow p-2 bg-gray-700 text-white rounded"
          onChange={(e) => handleProjectChange(e.target.value)}
          value={selectedProject || ""}
        >
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>{project.name}</option>
          ))}
        </select>
        <Input
          type="text"
          placeholder="New project name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          className="bg-white text-black placeholder-gray-500"
        />
        <Button onClick={handleCreateProject}>
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Whiteboard / Editor</h2>
            <textarea
              className="w-full h-96 p-4 bg-gray-700 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editorContent}
              onChange={(e) => handleEditorChange(e.target.value)}
              placeholder="Start collaborating here..."
            />
            <div className="mt-4 flex items-center space-x-2">
              {activeUsers.map((user) => (
                <motion.div key={user.id} whileHover={{ scale: 1.1 }}>
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                </motion.div>
              ))}
              <span className="text-sm text-gray-400">
                {activeUsers.length} active user{activeUsers.length !== 1 && 's'}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Skill Set</h2>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Search for skills or users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow bg-white text-black placeholder-gray-500"
                />
                <Button onClick={handleSearch}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Chat</h2>
              <ScrollArea className="h-96 pr-4">
                {projectMessages?.map((message) => (
                  <div key={message._id} className="mb-4">
                    <div className="flex items-start">
                      <Avatar className="mr-2">
                        <AvatarImage src={users.find(u => u.id === message.senderId)?.avatar} />
                        <AvatarFallback>{users.find(u => u.id === message.senderId)?.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-white">{users.find(u => u.id === message.senderId)?.name}</p>
                        <p className="text-black bg-white bg-opacity-90 rounded-lg p-2">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </ScrollArea>
              <Separator className="my-4" />
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value)
                    setIsTyping(true)
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-grow bg-white text-black placeholder-gray-500"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-gray-400 mt-2"
                >
                  Someone is typing...
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}