'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Edit3 } from 'lucide-react'

const users = [
  { id: 1, name: 'Alice', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 2, name: 'Bob', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 3, name: 'Charlie', avatar: '/placeholder.svg?height=32&width=32' },
]

const initialMessages = [
  { id: 1, userId: 1, text: 'Hey team, how's the progress on the new feature?' },
  { id: 2, userId: 2, text: 'I've just pushed some updates to the repo. Can you check?' },
  { id: 3, userId: 3, text: 'Looks good! I'll review it shortly.' },
]

const initialActivities = [
  { id: 1, text: 'Alice updated the task "Implement user authentication"' },
  { id: 2, text: 'Bob completed the task "Design landing page"' },
  { id: 3, text: 'Charlie started working on "API integration"' },
]

export function CollaborationPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [activities, setActivities] = useState(initialActivities)
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeUsers, setActiveUsers] = useState(users)
  const [editorContent, setEditorContent] = useState('')

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setIsTyping(false)
    }, 1000)

    return () => clearTimeout(typingTimer)
  }, [newMessage])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        userId: 1, // Assuming current user is Alice
        text: newMessage.trim(),
      }
      setMessages([...messages, newMsg])
      setNewMessage('')
      
      // Simulate new activity
      const newActivity = {
        id: activities.length + 1,
        text: `Alice sent a message: "${newMessage.trim().substring(0, 20)}${newMessage.length > 20 ? '...' : ''}"`,
      }
      setActivities([newActivity, ...activities])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Collaboration Hub</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Whiteboard / Editor</h2>
            <textarea
              className="w-full h-96 p-4 bg-gray-700 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
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
              <h2 className="text-2xl font-semibold mb-4">Chat</h2>
              <ScrollArea className="h-96 pr-4">
                {messages.map((message) => (
                  <div key={message.id} className="mb-4">
                    <div className="flex items-start">
                      <Avatar className="mr-2">
                        <AvatarImage src={users.find(u => u.id === message.userId)?.avatar} />
                        <AvatarFallback>{users.find(u => u.id === message.userId)?.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{users.find(u => u.id === message.userId)?.name}</p>
                        <p className="text-gray-300">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
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
                  className="flex-grow bg-gray-700 text-white"
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

          <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Activity Feed</h2>
              <ScrollArea className="h-48 pr-4">
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-2 p-2 bg-gray-700 rounded-lg"
                  >
                    <p className="text-sm text-gray-300">{activity.text}</p>
                  </motion.div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}