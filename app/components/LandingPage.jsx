'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const backgroundImages = [
  'god3.jpg',
  'god2.jpg',
  'god.jpg',
]

export default function LandingPage() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${backgroundImages[currentBgIndex]})`,
              backgroundSize: 'cover',
                backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

        <div className="relative z-20 h-[100vh]">
          <header className="container mx-auto px-4 py-6">
            <nav className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-blue-300">Medika</Link>
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>
              </div>
              <ul className={`md:flex space-x-6 ${isMenuOpen ? 'block' : 'hidden'}`}>
                <li><Link href="#about" className="hover:text-blue-300 transition-colors">About</Link></li>
                <li><Link href="#features" className="hover:text-blue-300 transition-colors">Features</Link></li>
                <li><Link href="#testimonials" className="hover:text-blue-300 transition-colors">Testimonials</Link></li>
                <li><Link href="#contact" className="hover:text-blue-300 transition-colors">Contact</Link></li>
                <li><Link href="/mythfact" className="hover:text-blue-300 transition-colors">Myth-Fact</Link></li>
              </ul>
            </nav>
          </header>

          <section className="container mx-auto px-4 py-52 text-center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-5xl font-bold mb-4">Medika</h1>
              <h2 className="text-3xl mb-6 text-blue-300">Scheduling and Monitoring Health</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Streamline student medical appointments and health monitoring with our divine application. 
                Experience the power of efficient scheduling and comprehensive health tracking.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex justify-center space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-400 transition-colors"
              >
                <Link href='/signup' passHref>Sign Up</Link>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-transparent border-2 border-blue-500 rounded-full text-lg font-semibold hover:bg-blue-500 hover:text-white transition-colors"
              >
                <Link href='/login' passHref>Login</Link>
              </motion.button>
            </motion.div>
          </section>
        </div>
      </div>

      <main>
        <motion.section 
          id="about"
          className="bg-gray-800 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">About Medika</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg mb-4">
                  Medika is a revolutionary platform designed to transform the way students manage their health on campus. Born from the vision of combining ancient wisdom with modern technology, our application brings the power of Olympus to your fingertips.
                </p>
                <p className="text-lg mb-4">
                  We understand the challenges students face in balancing their academic life with their health needs. That's why we've created a seamless, intuitive system that makes scheduling appointments, tracking health metrics, and managing your overall wellness as easy as a bolt of lightning.
                </p>
                <p className="text-lg">
                  Join us in our mission to elevate student healthcare to divine heights. With Medika, your well-being is in the hands of the gods.
                </p>
              </div>
              <div className="flex justify-center">
                <Image src="/about.jpg?height=300&width=300" alt="About Medika" width={300} height={300} className="rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          id="features"
          className="container mx-auto px-4 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Health Profile", icon: "👤", description: "Comprehensive health history at your fingertips" },
              { title: "Easy Booking", icon: "📅", description: "Book appointments based on doctor availability" },
              { title: "Health Metrics", icon: "📊", description: "Input and track your health metrics effortlessly" },
              { title: "Waitlist Management", icon: "⏳", description: "Efficient cancellation and waitlist system" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-blue-300">{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          id="testimonials"
          className="bg-gray-800 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Testimonials</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Athena", role: "Student", quote: "Medika has made managing my health so much easier!" },
                { name: "Hades", role: "Student", quote: "I love the intuitive interface and how easy it is to book appointments." },
                { name: "Hermes", role: "Student", quote: "Finally, a solution that fits my busy schedule!" }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-700 p-6 rounded-lg text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-lg font-semibold mb-2">{testimonial.name} - {testimonial.role}</h3>
                  <p className="italic">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          id="contact"
          className="container mx-auto px-4 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Contact Us</h2>
          <form className="bg-gray-700 p-8 rounded-lg max-w-lg mx-auto">
            <div className="mb-4">
              <label className="block text-gray-300 mb-2" htmlFor="name">Name</label>
              <input type="text" id="name" className="w-full p-2 rounded" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
              <input type="email" id="email" className="w-full p-2 rounded" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2" htmlFor="message">Message</label>
              <textarea id="message" className="w-full p-2 rounded" rows="4" required></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-400 transition-colors">Send Message</button>
          </form>
        </motion.section>
      </main>

      <footer className="bg-gray-900 py-6 text-center">
        <p className="text-gray-400">© {new Date().getFullYear()} Medika. All Rights Reserved.</p>
      </footer>
    </div>
  )
}
