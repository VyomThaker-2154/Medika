import React from 'react'
import Head from 'next/head'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

const medicalProcedures = [
  { title: "How to Give CPR", videoSrc: "https://www.youtube.com/embed/2PngCv7NjaI?si=lCzSfaqK0x9c7oZD" },
  { title: "How to Measure Body Temperature", videoSrc: "https://www.youtube.com/embed/nvl1qQfgzuw?si=Pb7LJg6J4sB3Ja0g" },
  { title: "How to Apply a Bandage", videoSrc: "https://www.youtube.com/embed/KRyaemlcJAM?si=1JdJI32Ka_-Iphqz" },
  { title: "How to Use an EpiPen", videoSrc: "https://www.youtube.com/embed/dEQNwZojEw4?si=CZIffdxPp17CH8PC" },
  { title: "How to Perform the Heimlich Maneuver", videoSrc: "https://www.youtube.com/embed/7CgtIgSyAiU?si=NPCFQW5z868rCoeK" },
  { title: "How to Check Vital Signs", videoSrc: "https://www.youtube.com/embed/gUWJ-6nL5-8?si=J0EbcVGD92O6vd96" },
]

export default function MedicalLearning() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Medical Basics Learning</title>
        <meta name="description" content="Learn essential medical procedures to help in emergencies." />
      </Head>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/student" className="text-white flex items-center">
            <ChevronLeft className="h-6 w-6 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Medical Basics Learning</h1>
        <p className="text-center mb-8 text-lg">Learn essential medical procedures to help in emergencies.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {medicalProcedures.map((procedure, index) => (
            <section key={index} className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-center mb-4">{procedure.title}</h2>
              <div className="aspect-video mb-4 rounded-md overflow-hidden">
                <iframe
                  src={procedure.videoSrc}
                  title={procedure.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}