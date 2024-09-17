'use client'

import React, { useState, useRef, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { User, UserCircle, UserCog, UserPlus, Users, Plus } from 'lucide-react'
import { useUser } from "@clerk/nextjs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const collaborationFeed = [
  { id: '1', name: 'David', project: 'E-commerce Site', online: true, icon: User },
  { id: '2', name: 'Eva', project: 'Mobile App', online: true, icon: UserCircle },
  { id: '3', name: 'Frank', project: 'Data Analysis', online: false, icon: UserCog },
  { id: '4', name: 'Grace', project: 'AI Integration', online: true, icon: UserPlus },
  { id: '5', name: 'Henry', project: 'Cloud Migration', online: false, icon: Users },
]

interface Task {
  id: string;
  content: string;
  progress: number;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', content: 'Design UI', progress: 70 },
    { id: '2', content: 'Implement API', progress: 30 },
    { id: '3', content: 'Write Tests', progress: 0 },
    { id: '4', content: 'Optimize Performance', progress: 50 },
    { id: '5', content: 'Deploy to Production', progress: 10 },
  ])
  const [newTask, setNewTask] = useState('')
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const editInputRef = useRef<HTMLInputElement>(null)
  const { user } = useUser()

  useEffect(() => {
    if (editingTask && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editingTask])

  const onDragEnd = (result: any) => {
    if (!result.destination) return
    const newTasks = Array.from(tasks)
    const [reorderedItem] = newTasks.splice(result.source.index, 1)
    newTasks.splice(result.destination.index, 0, reorderedItem)
    setTasks(newTasks)
  }

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), content: newTask, progress: 0 }])
      setNewTask('')
    }
  }

  const updateTaskProgress = (id: string, progress: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, progress: Math.min(100, Math.max(0, progress)) } : task
    ))
  }

  const updateTaskContent = (id: string, content: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, content } : task
    ))
    setEditingTask(null)
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-blue-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome, {user.firstName}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Collaboration Feed Card */}
        <Card className="bg-blue-800 bg-opacity-50 backdrop-blur-lg">
          <CardHeader>
            <CardTitle>Real-time Collaboration</CardTitle>
            <CardDescription className="text-blue-200">See who's online and what they're working on</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              {collaborationFeed.map((item, index) => (
                <React.Fragment key={item.id}>
                  <Link href={`/skill-profile?id=${item.id}`} className="block">
                    <div className="flex items-center space-x-4 bg-blue-700 bg-opacity-50 p-4 rounded-lg transition-all hover:bg-blue-600">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback>
                            {React.createElement(item.icon, { className: "w-6 h-6" })}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${item.online ? 'bg-green-400' : 'bg-gray-400'} border-2 border-blue-700`}></div>
                      </div>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-blue-200">{item.project}</p>
                      </div>
                    </div>
                  </Link>
                  {index < collaborationFeed.length - 1 && <Separator className="my-2" />}
                </React.Fragment>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Multiplayer Taskboard Card */}
        <Card className="bg-indigo-800 bg-opacity-50 backdrop-blur-lg">
          <CardHeader>
            <CardTitle>Multiplayer Taskboard</CardTitle>
            <CardDescription className="text-indigo-200">Drag and drop to reorder tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex mb-4">
              <Input
                type="text"
                placeholder="New task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="mr-2 text-black placeholder-gray-500"
              />
              <Button onClick={addTask}><Plus size={20} /></Button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="tasks">
                {(provided: any) => (
                  <ScrollArea className="h-[300px] w-full rounded-md border p-4" {...provided.droppableProps} ref={provided.innerRef}>
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided: any) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-indigo-700 bg-opacity-50 p-4 rounded-lg transition-all hover:bg-indigo-600 mb-2"
                          >
                            {editingTask === task.id ? (
                              <Input
                                ref={editInputRef}
                                type="text"
                                value={task.content}
                                onChange={(e) => updateTaskContent(task.id, e.target.value)}
                                onBlur={() => setEditingTask(null)}
                                onKeyPress={(e) => e.key === 'Enter' && setEditingTask(null)}
                                className="mb-2 text-black"
                              />
                            ) : (
                              <p 
                                className="font-semibold mb-2 cursor-pointer"
                                onClick={() => setEditingTask(task.id)}
                              >
                                {task.content}
                              </p>
                            )}
                            <div className="flex items-center">
                              <Progress value={task.progress} className="flex-grow h-2 bg-indigo-900 mr-2">
                                <div
                                  className="h-full bg-gradient-to-r from-teal-400 to-blue-400 rounded-full transition-all duration-500 ease-in-out"
                                  style={{ width: `${task.progress}%` }}
                                />
                              </Progress>
                              <Input
                                type="number"
                                value={task.progress}
                                onChange={(e) => updateTaskProgress(task.id, parseInt(e.target.value))}
                                className="w-16 text-black text-center"
                                min="0"
                                max="100"
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ScrollArea>
                )}
              </Droppable>
            </DragDropContext>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}