'use client'

import { useState, useEffect } from "react"
import { Search, Zap, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

// Mock data for suggestions and results
const suggestions = ["Machine Learning", "Web Development", "Data Science", "UI/UX Design", "Cloud Computing"]
const results = [
  {
    id: 1,
    category: "Machine Learning",
    profiles: [
      { name: "Alice Johnson", title: "ML Engineer", skills: ["TensorFlow", "PyTorch", "NLP"], rating: 4.8 },
      { name: "Bob Smith", title: "AI Researcher", skills: ["Computer Vision", "Deep Learning", "Keras"], rating: 4.9 },
      { name: "Charlie Brown", title: "Data Scientist", skills: ["Scikit-learn", "Neural Networks", "Pandas"], rating: 4.7 },
    ]
  },
  {
    id: 2,
    category: "Web Development",
    profiles: [
      { name: "Diana Prince", title: "Full-Stack Developer", skills: ["React", "Node.js", "MongoDB"], rating: 4.9 },
      { name: "Ethan Hunt", title: "Frontend Specialist", skills: ["Vue.js", "CSS3", "Webpack"], rating: 4.8 },
      { name: "Fiona Gallagher", title: "Backend Developer", skills: ["Django", "PostgreSQL", "Docker"], rating: 4.7 },
    ]
  },
  {
    id: 3,
    category: "Data Science",
    profiles: [
      { name: "George Bluth", title: "Data Analyst", skills: ["R", "Tableau", "SQL"], rating: 4.6 },
      { name: "Hermione Granger", title: "Statistician", skills: ["SAS", "SPSS", "Data Mining"], rating: 4.9 },
      { name: "Ian Malcolm", title: "Big Data Engineer", skills: ["Hadoop", "Spark", "Hive"], rating: 4.8 },
    ]
  },
  {
    id: 4,
    category: "UI/UX Design",
    profiles: [
      { name: "Jessica Jones", title: "UX Researcher", skills: ["User Testing", "Wireframing", "Prototyping"], rating: 4.7 },
      { name: "Kevin Flynn", title: "UI Designer", skills: ["Sketch", "Figma", "Adobe XD"], rating: 4.8 },
      { name: "Lara Croft", title: "Interaction Designer", skills: ["InVision", "Zeplin", "Principle"], rating: 4.9 },
    ]
  },
  {
    id: 5,
    category: "Cloud Computing",
    profiles: [
      { name: "Michael Scott", title: "AWS Architect", skills: ["EC2", "S3", "Lambda"], rating: 4.7 },
      { name: "Natasha Romanoff", title: "Google Cloud Specialist", skills: ["Kubernetes", "BigQuery", "Dataflow"], rating: 4.8 },
      { name: "Oscar Martinez", title: "Azure Developer", skills: ["Azure Functions", "Cosmos DB", "App Service"], rating: 4.6 },
    ]
  },
]

export default function VectorSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredResults, setFilteredResults] = useState(results)
  const router = useRouter()

  useEffect(() => {
    setShowSuggestions(searchQuery.length > 0)
  }, [searchQuery])

  const handleSearch = () => {
    setIsSearching(true)
    // Simulate search delay and filter results
    setTimeout(() => {
      const filtered = results.filter(result =>
        result.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.profiles.some(profile =>
          profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      )
      setFilteredResults(filtered)
      setIsSearching(false)
    }, 1000)
  }

  const handleDiscoverClick = () => {
    router.push("/discover")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Vector Search</h1>
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for skills, projects, or experts..."
            className="w-full bg-gray-800 border-2 border-blue-500 rounded-full py-3 px-6 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 rounded-full p-2"
            onClick={handleSearch}
          >
            <Search className={`h-6 w-6 ${isSearching ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 w-full mt-2 bg-gray-800 border border-blue-500 rounded-lg shadow-lg"
            >
              {suggestions.map((suggestion, index) => (
                <div key={index} className="p-3 hover:bg-gray-700 cursor-pointer" onClick={() => setSearchQuery(suggestion)}>
                  {suggestion}
                  {index < suggestions.length - 1 && (
                    <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent my-1" />
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResults.map((result) => (
          <motion.div
            key={result.id}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300"
          >
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">{result.category}</h3>
            {result.profiles.map((profile, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium">{profile.name}</h4>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{profile.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{profile.title}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="bg-blue-900 text-blue-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white">
                <Zap className="mr-2 h-4 w-4" />
                Explore
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button onClick={handleDiscoverClick} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
          Discover More
        </Button>
      </div>
    </div>
  )
}