'use client'

import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { User, UserCircle, UserCog, UserPlus, Users } from 'lucide-react'
import { useUser } from "@clerk/nextjs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const collaborationFeed = [
  { id: '1', name: 'David', project: 'E-commerce Site', online: true, icon: User },
  { id: '2', name: 'Eva', project: 'Mobile App', online: true, icon: UserCircle },
  { id: '3', name: 'Frank', project: 'Data Analysis', online: false, icon: UserCog },
  { id: '4', name: 'Grace', project: 'AI Integration', online: true, icon: UserPlus },
  { id: '5', name: 'Henry', project: 'Cloud Migration', online: false, icon: Users },
]

const initialTasks = [
  { id: '1', content: 'Design UI', progress: 70 },
  { id: '2', content: 'Implement API', progress: 30 },
  { id: '3', content: 'Write Tests', progress: 0 },
  { id: '4', content: 'Optimize Performance', progress: 50 },
  { id: '5', content: 'Deploy to Production', progress: 10 },
]

export default function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks)
  const { user } = useUser()

  const onDragEnd = (result: any) => {
    if (!result.destination) return
    const newTasks = Array.from(tasks)
    const [reorderedItem] = newTasks.splice(result.source.index, 1)
    newTasks.splice(result.destination.index, 0, reorderedItem)
    setTasks(newTasks)
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-blue-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome, {user.firstName}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-blue-800 bg-opacity-50 backdrop-blur-lg">
          <CardHeader>
            <CardTitle>Real-time Collaboration</CardTitle>
            <CardDescription className="text-blue-200">See who's online and what they're working on</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              {collaborationFeed.map((item, index) => (
                <React.Fragment key={item.id}>
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
                  {index < collaborationFeed.length - 1 && <Separator className="my-2" />}
                </React.Fragment>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="bg-indigo-800 bg-opacity-50 backdrop-blur-lg">
          <CardHeader>
            <CardTitle>Multiplayer Taskboard</CardTitle>
            <CardDescription className="text-indigo-200">Drag and drop to reorder tasks</CardDescription>
          </CardHeader>
          <CardContent>
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
                            <p className="font-semibold mb-2">{task.content}</p>
                            <Progress value={task.progress} className="h-2 bg-indigo-900">
                              <div
                                className="h-full bg-gradient-to-r from-teal-400 to-blue-400 rounded-full transition-all duration-500 ease-in-out"
                                style={{ width: `${task.progress}%` }}
                              />
                            </Progress>
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