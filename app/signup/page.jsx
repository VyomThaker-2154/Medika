'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Lock, Mail, Stethoscope, UserCheck, UserPlus } from 'lucide-react'
import Link from 'next/link'

const SignupForm = ({ userType }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(`${userType} signup:`, { name, email, password, confirmPassword })
    // Here you would typically handle the signup logic
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
        <div className="relative">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
        <div className="relative">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        </div>
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
        <div className="relative">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        </div>
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
        <div className="relative">
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
      >
        {userType == 'patient' ? <Link href='/student' passHref>SignUp</Link> : <Link href='/doctor' passHref>SignUp</Link>}
      </motion.button>
    </form>
  )
}

export default function SignupPage() {
  const [activeTab, setActiveTab] = useState('patient')

  return (
    <div className="min-h-screen bg-gray-900 text-white bg-[url('/celestial-background.png')] bg-cover bg-fixed flex items-center justify-center">
      <div className="bg-black bg-opacity-70 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Join the Celestial Health Network</h1>
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 ${activeTab === 'patient' ? 'bg-blue-600' : 'bg-gray-800'} rounded-l-md transition duration-300`}
            onClick={() => setActiveTab('patient')}
          >
            <UserCheck className="inline-block mr-2" /> Student
          </button>
          <button
            className={`flex-1 py-2 ${activeTab === 'doctor' ? 'bg-blue-600' : 'bg-gray-800'} rounded-r-md transition duration-300`}
            onClick={() => setActiveTab('doctor')}
          >
            <Stethoscope className="inline-block mr-2" /> Doctor
          </button>
        </div>
        <SignupForm userType={activeTab} />
        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account? <a href="/login" className="text-blue-400 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  )
}