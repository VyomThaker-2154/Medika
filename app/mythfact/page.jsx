'use client'

import React, { useState } from 'react'
import { Search, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

const mythsAndFacts = [
  {
    myth: "Eating carrots improves your eyesight.",
    fact: "While carrots contain vitamin A, which is essential for eye health, they won't improve eyesight significantly."
  },
  {
    myth: "You should drink at least 8 glasses of water a day.",
    fact: "Water needs vary by individual; thirst is a good indicator of when to drink."
  },
  {
    myth: "You can catch a cold from being cold.",
    fact: "Colds are caused by viruses, not by exposure to cold weather."
  },
  {
    myth: "Natural sugars are better than refined sugars.",
    fact: "All sugars can contribute to health issues if consumed in excess; moderation is key."
  },
  {
    myth: "Vitamins can replace a healthy diet.",
    fact: "Vitamins are supplements, not substitutes for a balanced diet; whole foods provide essential nutrients."
  },
  {
    myth: "Cracking your knuckles causes arthritis.",
    fact: "There's no scientific evidence that cracking knuckles leads to arthritis, though it may weaken grip strength over time."
  },
  {
    myth: "You need to wait 24 hours before reporting a missing person.",
    fact: "This is a common myth in TV shows. In reality, you should report a missing person immediately if you're concerned."
  },
  {
    myth: "You only use 10% of your brain.",
    fact: "This is a popular myth, but in reality, we use most of our brain most of the time, even when sleeping."
  },
  {
    myth: "Sugar makes children hyperactive.",
    fact: "Scientific studies have not found evidence that sugar causes hyperactivity in children."
  },
  {
    myth: "Reading in dim light damages your eyes.",
    fact: "Reading in low light doesn't damage your eyes, but it can cause eye strain and temporary discomfort."
  }
]

const MythFactCard = ({ myth, fact }) => (
  <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
    <h3 className="text-lg font-semibold text-white mb-2">Myth: {myth}</h3>
    <p className="text-gray-300">Fact: {fact}</p>
  </div>
)

export default function HealthMythsAndFacts() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMythsAndFacts = mythsAndFacts.filter(item =>
    item.myth.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.fact.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-white flex items-center">
            <ChevronLeft className="h-6 w-6 mr-2" />
            Back
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Health Myths vs. Facts
        </h1>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for myths or facts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMythsAndFacts.map((item, index) => (
            <MythFactCard key={index} myth={item.myth} fact={item.fact} />
          ))}
        </div>

        {filteredMythsAndFacts.length === 0 && (
          <p className="text-center text-gray-400 mt-6">No myths or facts found matching your search.</p>
        )}
      </main>

      <footer className="bg-gray-800 mt-12">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-gray-400 text-sm">
            Stay informed and consult healthcare professionals for personalized advice.
          </p>
        </div>
      </footer>
    </div>
  )
}