'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Home, Info, Users, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface User {
  id: number;
  name: string;
  location: string;
  profileImage: string;
  skills: string[];
  teamStatus: string;
}

export default function Discover() {
  const { isSignedIn, signOut, isLoaded } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State to store search term
  const [users, setUsers] = useState<User[]>([]);


  // Simulated user data for the tiles
  useEffect(() => {
    setUsers([
      {
        id: 1,
        name: 'John Doe',
        location: 'New York, USA',
        profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
        skills: ['React', 'Node.js', 'CSS'],
        teamStatus: 'Looking for teammates',
      },
      {
        id: 2,
        name: 'Jane Smith',
        location: 'London, UK',
        profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
        skills: ['Python', 'Django', 'Data Science'],
        teamStatus: 'Available for collaboration',
      },
      // Add more user objects as needed
    ]);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAuthAction = (action: 'login' | 'signup') => {
    if (isSignedIn) {
      signOut();
    } else {
      router.push(`/sign-${action}`);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: searchTerm }),
        });
        const data = await response.json();
        console.log('Search results:', data);
      } catch (error) {
        console.error('Error searching:', error);
      }
    }
  };

  if (!mounted || !isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <Image
          src="/logo.svg"
          alt="SkillSync Logo"
          width={80}
          height={80}
          className="animate-pulse"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="SkillSync Logo" width={40} height={40} />
              <span className="text-xl font-bold">SkillSync</span>
            </div>
            <div className="hidden md:flex space-x-4">
              <NavItem icon={<Home size={18} />} text="Home" />
              <NavItem icon={<Info size={18} />} text="About" />
              {user && (
                <Link href="/dashboard">
                  <Button className="flex items-center space-x-1">
                    <Users size={18} />
                    <span>Dashboard</span>
                  </Button>
                </Link>
              )}
              <Button onClick={() => handleAuthAction('login')} className="flex items-center space-x-1">
                <LogIn size={18} />
                <span>{isSignedIn ? 'Logout' : 'Login'}</span>
              </Button>
              {!isSignedIn && (
                <Button onClick={() => handleAuthAction('signup')} className="flex items-center space-x-1">
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Search Box */}
      <div className="container mx-auto text-center py-20">
        <h1 className="text-4xl font-bold">Discover Skills</h1>
        <p className="mt-4 text-lg">Search for skills to connect with others.</p>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="mt-8 flex justify-center">
          <input 
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-1/3 px-4 py-2 text-black rounded-lg"
            placeholder="Search for skills..."
          />
          <Button type="submit" className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
            Search
          </Button>
        </form>
      </div>

      {/* Tiles Section */}
      <div className="container mx-auto mt-10">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Teammates Available</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* User Tiles */}
          {users.map((user) => (
            <Card key={user.id} className="bg-gray-800 text-white shadow-lg">
              <CardHeader>
                <div className="flex items-center">
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.location}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-400">Main Skills</h3>
                  <p>{user.skills.join(', ')}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-400">Team Status</h3>
                  <p>{user.teamStatus}</p>
                </div>
              </CardContent>

              <CardFooter className="flex justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Connect
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <Link href="#" className="flex items-center space-x-1 text-gray-300 hover:text-white transition duration-300">
      {icon}
      <span>{text}</span>
    </Link>
  );
}
