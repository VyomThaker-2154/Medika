'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Calendar, ChevronRight, Edit, FileText, X, LogOut, User, Plus, Trash2, Check, XCircle } from 'lucide-react'
import Link from 'next/link'

const doctorInfo = {
  name: "Apollo",
  specialization: "Cardiology",
  contact: "apollo@medcenter.com",
  bio: "Experienced cardiologist with a focus on preventive care and advanced treatments.",
  phoneNumber: "+1234567890",
  location: "New York, NY"
}

const initialAppointments = [
  { id: 1, name: 'Alex', time: '11:00', urgent: true, status: 'Pending', medicalHistory: "Hypertension, Diabetes", profile: "32 years old, Male" },
  { id: 2, name: 'Jane Smith', time: '10:30', urgent: false, status: 'Pending', medicalHistory: "Asthma", profile: "28 years old, Female" },
  { id: 3, name: 'Robert Johnson', time: '11:45', urgent: true, status: 'Pending', medicalHistory: "Heart Disease", profile: "45 years old, Male" },
  { id: 4, name: 'Emily Brown', time: '14:15', urgent: false, status: 'Confirmed', medicalHistory: "Allergies", profile: "22 years old, Female" },
  { id: 5, name: 'Michael Davis', time: '15:30', urgent: false, status: 'Pending', medicalHistory: "Migraine", profile: "35 years old, Male" },
]

const initialNotifications = [
  { id: 1, message: "Urgent: New test results for John Doe", urgent: true },
  { id: 2, message: "Reminder: Staff meeting at 2 PM", urgent: false },
  { id: 3, message: "New message from patient Jane Smith", urgent: false },
]

const initialTasks = [
  { id: 1, icon: FileText, text: "Review patient files", time: "10:00 AM" },
  { id: 2, icon: Calendar, text: "Team meeting", time: "2:00 PM" },
  { id: 3, icon: Bell, text: "Follow up with John Doe", time: "4:30 PM" },
]

const AppointmentCard = ({ appointment, onReview, onAccept, onCancel }) => (
  <motion.div
    className="bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-white text-lg font-semibold">{appointment.name}</h3>
        <p className="text-gray-400 text-sm">{appointment.time}</p>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`px-2 py-1 rounded-full text-xs ${
          appointment.status === 'Confirmed' ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'
        }`}>
          {appointment.status}
        </span>
        {appointment.urgent && (
          <span className="bg-red-900 text-red-200 px-2 py-1 rounded-full text-xs">Urgent</span>
        )}
      </div>
    </div>
    <div className="mt-2 space-x-2">
      <button onClick={() => onReview(appointment)} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Review</button>
      <button onClick={() => onAccept(appointment.id)} className="bg-green-600 text-white px-2 py-1 rounded text-xs">Accept</button>
      <button onClick={() => onCancel(appointment.id)} className="bg-red-600 text-white px-2 py-1 rounded text-xs">Cancel</button>
    </div>
  </motion.div>
)

const ProfileModal = ({ isOpen, onClose, doctorInfo, onSave }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="bg-gray-900 rounded-lg p-8 w-96 relative"
        >
          <h2 className="text-white text-2xl font-semibold mb-4">Edit Profile</h2>
          <form onSubmit={onSave} className="space-y-4">
            <div>
              <label className="text-gray-300">Name</label>
              <input type="text" defaultValue={doctorInfo.name} name="name" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 mt-1 text-white" />
            </div>
            <div>
              <label className="text-gray-300">Specialization</label>
              <input type="text" defaultValue={doctorInfo.specialization} name="specialization" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 mt-1 text-white" />
            </div>
            <div>
              <label className="text-gray-300">Contact</label>
              <input type="email" defaultValue={doctorInfo.contact} name="contact" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 mt-1 text-white" />
            </div>
            <div>
              <label className="text-gray-300">Bio</label>
              <textarea defaultValue={doctorInfo.bio} name="bio" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 mt-1 text-white" rows={3}></textarea>
            </div>
            <div>
              <label className="text-gray-300">Change Password</label>
              <input type="password" name="password" placeholder="New Password" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 mt-1 text-white" />
            </div>
            <div>
              <label className="text-gray-300">Phone Number</label>
              <input type="tel" defaultValue={doctorInfo.phoneNumber} name="phoneNumber" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 mt-1 text-white" />
            </div>
            <div>
              <label className="text-gray-300">Location</label>
              <input type="text" defaultValue={doctorInfo.location} name="location" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 mt-1 text-white" />
            </div>
            <button type="submit" className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-opacity-90 transition-colors">
              Save Changes
            </button>
          </form>
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

const AppointmentReviewModal = ({ isOpen, onClose, appointment }) => (
  <AnimatePresence>
    {isOpen && appointment && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="bg-gray-900 rounded-lg p-8 w-96 relative"
        >
          <h2 className="text-white text-2xl font-semibold mb-4">Patient Review</h2>
          <div className="space-y-4 text-gray-300">
            <p><span className="font-semibold">Name:</span> {appointment.name}</p>
            <p><span className="font-semibold">Time:</span> {appointment.time}</p>
            <p><span className="font-semibold">Status:</span> {appointment.status}</p>
            <p><span className="font-semibold">Medical History:</span> {appointment.medicalHistory}</p>
            <p><span className="font-semibold">Profile:</span> {appointment.profile}</p>
          </div>
          <button onClick={onClose} className="mt-6 w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-opacity-90 transition-colors">
            Close
          </button>
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

export default function DoctorDashboard() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [appointments, setAppointments] = useState(initialAppointments)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [tasks, setTasks] = useState(initialTasks)
  const [reviewAppointment, setReviewAppointment] = useState(null)
  const [newTask, setNewTask] = useState('')

  const handleProfileSave = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const updatedInfo = Object.fromEntries(formData.entries())
    // Here you would typically send this data to your backend
    console.log('Updated doctor info:', updatedInfo)
    setIsProfileModalOpen(false)
  }

  const handleAppointmentReview = (appointment) => {
    setReviewAppointment(appointment)
  }

  const handleAppointmentAccept = (id) => {
    setAppointments(appointments.map(app => 
      app.id === id ? {...app, status: 'Confirmed'} : app
    ))
  }

  const handleAppointmentCancel = (id) => {
    setAppointments(appointments.filter(app => app.id !== id))
  }

  const handleAddTask = (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), icon: FileText, text: newTask, time: new Date().toLocaleTimeString() }])
      setNewTask('')
    }
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-gray-900 p-4 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-white text-xl font-bold">Doctor Dashboard</Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="text-white hover:text-gray-300 flex items-center"
            >
              <User className="h-5 w-5 mr-1" />
              Profile
            </button>
            <Link href="/" className="text-white hover:text-gray-300 flex items-center">
              <LogOut className="h-5 w-5 mr-1" />
              Logout
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <header className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
          <h1 className="text-3xl font-bold text-white">
            Welcome, Dr. {doctorInfo.name}
          </h1>
          <p className="text-gray-400 mt-2">
            {doctorInfo.specialization} | {doctorInfo.contact}
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Appointment Management Section */}
          <div className="md:col-span-2 bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">Today's Appointments</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-4 py-2 rounded-md font-semibold flex items-center text-sm"
              >
                View All <ChevronRight className="ml-2 h-4 w-4" />
              </motion.button>
            </div>
            <div className="space-y-4">
              {appointments.map(appointment => (
                <AppointmentCard 
                  key={appointment.id} 
                  appointment={appointment} 
                  onReview={handleAppointmentReview}
                  onAccept={handleAppointmentAccept}
                  onCancel={handleAppointmentCancel}
                />
              ))}
            </div>
          </div>

          {/* Profile Section */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Your Profile</h2>
            <div className="space-y-4 text-gray-300">
              <p><span className="font-semibold">Name:</span> {doctorInfo.name}</p>
              <p><span className="font-semibold">Specialization:</span> {doctorInfo.specialization}</p>
              <p><span className="font-semibold">Contact:</span> {doctorInfo.contact}</p>
              <p><span className="font-semibold">Bio:</span> {doctorInfo.bio}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProfileModalOpen(true)}
              className="mt-6 bg-white text-black px-4 py-2 rounded-md font-semibold  flex items-center text-sm"
            >
              Edit Profile <Edit className="ml-2 h-4 w-4" />
            </motion.button>
          </div>

          {/* Upcoming Tasks Section */}
          <div className="md:col-span-2 bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-2xl font-semibold text-white mb-6">Upcoming Tasks</h2>
            <form onSubmit={handleAddTask} className="mb-4 flex">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add new task"
                className="flex-grow bg-gray-800 border border-gray-700 rounded-l px-3 py-2 text-white"
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r">
                <Plus className="h-5 w-5" />
              </button>
            </form>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center p-3 bg-gray-800 rounded-md">
                  <task.icon className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="flex-grow">
                    <p className="text-white font-medium">{task.text}</p>
                    <p className="text-gray-400 text-sm">{task.time}</p>
                  </div>
                  <button onClick={() => handleDeleteTask(task.id)} className="text-red-500 hover:text-red-400">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-2xl font-semibold text-white mb-6">Notifications</h2>
            <div className="space-y-4">
              {notifications.map(notification => (
                <motion.div
                  key={notification.id}
                  className={`p-4 rounded-md ${notification.urgent ? 'bg-red-900' : 'bg-gray-800'}`}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className={`${notification.urgent ? 'text-red-200' : 'text-gray-300'}`}>{notification.message}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        doctorInfo={doctorInfo}
        onSave={handleProfileSave}
      />

      <AppointmentReviewModal
        isOpen={!!reviewAppointment}
        onClose={() => setReviewAppointment(null)}
        appointment={reviewAppointment}
      />
    </div>
  )
}