'use client'

import { useState, useEffect } from 'react'
import { Search, Code, Briefcase, Zap, Palette, BarChart, Server, Globe, Shield, Link, Cloud } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const skills = ['React', 'Node.js', 'Python', 'Machine Learning', 'UI/UX Design', 'Data Analysis', 'DevOps', 'Cloud Computing', 'Cybersecurity', 'Blockchain']
const dummyProfiles = [
  { id: 1, name: 'Alex Johnson', skill: 'React Developer', image: '/placeholder.svg?height=100&width=100', icon: <Code className="w-4 h-4" />, color: 'text-blue-400' },
  { id: 2, name: 'Sam Lee', skill: 'Data Scientist', image: '/placeholder.svg?height=100&width=100', icon: <BarChart className="w-4 h-4" />, color: 'text-green-400' },
  { id: 3, name: 'Emily Chen', skill: 'UX Designer', image: '/placeholder.svg?height=100&width=100', icon: <Palette className="w-4 h-4" />, color: 'text-purple-400' },
  { id: 4, name: 'Chris Taylor', skill: 'Full Stack Developer', image: '/placeholder.svg?height=100&width=100', icon: <Globe className="w-4 h-4" />, color: 'text-yellow-400' },
  { id: 5, name: 'Jordan Patel', skill: 'AI Engineer', image: '/placeholder.svg?height=100&width=100', icon: <Zap className="w-4 h-4" />, color: 'text-red-400' },
  { id: 6, name: 'Morgan Smith', skill: 'DevOps Specialist', image: '/placeholder.svg?height=100&width=100', icon: <Server className="w-4 h-4" />, color: 'text-indigo-400' },
  { id: 7, name: 'Ava Williams', skill: 'Cybersecurity Expert', image: '/placeholder.svg?height=100&width=100', icon: <Shield className="w-4 h-4" />, color: 'text-orange-400' },
  { id: 8, name: 'Liam Brown', skill: 'Blockchain Developer', image: '/placeholder.svg?height=100&width=100', icon: <Link className="w-4 h-4" />, color: 'text-teal-400' },
  { id: 9, name: 'Sophia Garcia', skill: 'Cloud Architect', image: '/placeholder.svg?height=100&width=100', icon: <Cloud className="w-4 h-4" />, color: 'text-cyan-400' },
]

export function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    if (searchTerm) {
      const filteredSuggestions = skills.filter(skill =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSuggestions(filteredSuggestions)
    } else {
      setSuggestions([])
    }
  }, [searchTerm])

  const handleSearch = () => {
    setIsSearching(true)
    // Simulating a search delay
    setTimeout(() => {
      const results = dummyProfiles.filter(profile =>
        profile.skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSearchResults(results)
      setIsSearching(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Skill Vector Search</h1>
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 text-white border-2 border-blue-500 rounded-full py-3 px-6 pr-12 focus:outline-none focus:border-blue-400 transition-all duration-300"
          />
          <Button
            onClick={handleSearch}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition-all duration-300 ${
              isSearching ? 'animate-spin' : ''
            }`}
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
        {suggestions.length > 0 && (
          <div className="mt-2 bg-gray-800 rounded-lg border border-blue-500 overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors duration-200"
              >
                {suggestion}
                {index < suggestions.length - 1 && (
                  <div className="border-b border-blue-400 opacity-50 my-1 animate-pulse" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((profile) => (
          <Card key={profile.id} className="bg-gray-800 border-2 border-blue-500 rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={profile.image} alt={profile.name} />
                  <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{profile.name}</h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={`${profile.color} border-current`}>
                      {profile.icon}
                      <span className="ml-1">{profile.skill}</span>
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="text-green-400 border-green-400 hover:bg-green-400 hover:text-white">
                    <Code className="w-4 h-4 mr-1" /> View Projects
                  </Button>
                  <Button size="sm" variant="outline" className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-white">
                    <Briefcase className="w-4 h-4 mr-1" /> Hire
                  </Button>
                </div>
                <Button size="icon" variant="ghost" className="text-blue-400 hover:text-white hover:bg-blue-600">
                  <Zap className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}