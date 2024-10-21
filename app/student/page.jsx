'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Home, Calendar, LogOut, Plus, X, ChevronRight,BookOpen, Activity, Clock, Settings } from 'lucide-react';
import Link from 'next/link';
const studentInfo = {
  name: "Alex Johnson",
  id: "ST12345",
  course: "Computer Science",
  year: "3rd Year"
};

const initialMedicalHistory = [
  { id: 1, condition: "Asthma", diagnosis: "2015", currentStatus: "Controlled with inhaler" },
  { id: 2, condition: "Peanut Allergy", diagnosis: "2010", currentStatus: "Avoid all peanut products" }
];

const availableDoctors = [
  { id: 1, name: "Dr. Sarah Smith", specialization: "General Practitioner", availableSlots: ["09:00", "11:00", "14:00"] },
  { id: 2, name: "Dr. John Doe", specialization: "Psychiatrist", availableSlots: ["10:00", "13:00", "15:00"] },
  { id: 3, name: "Dr. Emily Brown", specialization: "Dermatologist", availableSlots: ["09:30", "11:30", "14:30"] }
];

const MedicalHistoryCard = ({ item }) => (
  <motion.div
    className="bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700"
    whileHover={{ scale: 1.02 }}
  >
    <h3 className="text-white text-lg font-semibold mb-2">{item.condition}</h3>
    <p className="text-gray-400 text-sm">Diagnosed: {item.diagnosis}</p>
    <p className="text-gray-400 text-sm">Current Status: {item.currentStatus}</p>
  </motion.div>
);

const AppointmentModal = ({ isOpen, onClose, doctors, onBookAppointment }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedDoctor(null);
    setSelectedSlot('');
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedSlot('');
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate && selectedDoctor && selectedSlot) {
      onBookAppointment({
        id: Date.now(),
        doctor: selectedDoctor.name,
        date: selectedDate,
        time: selectedSlot
      });
      onClose();
    }
  };

  return (
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
            className="bg-gray-900 rounded-lg p-8 w-full max-w-md relative"
          >
            <h2 className="text-white text-2xl font-semibold mb-4">Book Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-300 block mb-1">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  required
                />
              </div>
              {selectedDate && (
                <div>
                  <label className="text-gray-300 block mb-1">Select Doctor</label>
                  <div className="space-y-2">
                    {doctors.map(doctor => (
                      <div
                        key={doctor.id}
                        onClick={() => handleDoctorSelect(doctor)}
                        className={`p-2 rounded cursor-pointer ${
                          selectedDoctor === doctor ? 'bg-blue-600' : 'bg-gray-800'
                        } hover:bg-blue-700 transition-colors`}
                      >
                        <p className="text-white font-medium">{doctor.name}</p>
                        <p className="text-gray-400 text-sm">{doctor.specialization}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {selectedDoctor && (
                <div>
                  <label className="text-gray-300 block mb-1">Select Time Slot</label>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedDoctor.availableSlots.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => handleSlotSelect(slot)}
                        className={`p-2 rounded ${
                          selectedSlot === slot ? 'bg-green-600' : 'bg-gray-800'
                        } hover:bg-green-700 transition-colors text-white`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                disabled={!selectedDate || !selectedDoctor || !selectedSlot}
              >
                Book Appointment
              </button>
            </form>
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProfileEditModal = ({ isOpen, onClose }) => {
  return (
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
            className="bg-gray-900 rounded-lg p-8 w-full max-w-md relative"
          >
            <h2 className="text-white text-2xl font-semibold mb-4">Edit Profile</h2>
            <form className="space-y-4">
              <div>
                <label className="text-gray-300 block mb-1">Change Password</label>
                <input type="password" placeholder="New Password" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="text-gray-300 block mb-1">Phone Number</label>
                <input type="tel" placeholder="Phone Number" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="text-gray-300 block mb-1">Location</label>
                <input type="text" placeholder="Location" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors">
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
  );
};
export default function StudentDashboard() {
  const [medicalHistory, setMedicalHistory] = useState(initialMedicalHistory);
  const [isAddingCondition, setIsAddingCondition] = useState(false);
  const [newCondition, setNewCondition] = useState({ condition: '', diagnosis: '', currentStatus: '' });
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [bookedAppointments, setBookedAppointments] = useState([]);

  const handleAddCondition = (e) => {
    e.preventDefault();
    if (newCondition.condition && newCondition.diagnosis && newCondition.currentStatus) {
      setMedicalHistory([...medicalHistory, { id: Date.now(), ...newCondition }]);
      setNewCondition({ condition: '', diagnosis: '', currentStatus: '' });
      setIsAddingCondition(false);
    }
  };

  const handleBookAppointment = (appointment) => {
    setBookedAppointments([...bookedAppointments, appointment]);
  };

  const handleCancelAppointment = (appointmentId) => {
    setBookedAppointments(bookedAppointments.filter(app => app.id !== appointmentId));
  };
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
      <nav className="bg-gray-900 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-xl font-bold">Student Dashboard</Link>
            <div className="flex items-center space-x-4">
              <Link href="/learning" className="text-white hover:text-gray-300">
                <BookOpen className="h-6 w-6" />
              </Link>
              <Link href="/health" className="text-white hover:text-gray-300">
                <Activity className="h-6 w-6" />
              </Link>
              <button onClick={() => setIsProfileEditModalOpen(true)} className="text-white hover:text-gray-300">
                <Settings className="h-6 w-6" />
              </button>
              <Link href="/" className="text-white hover:text-gray-300">
                <LogOut className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </nav>
      <ProfileEditModal
        isOpen={isProfileEditModalOpen}
        onClose={() => setIsProfileEditModalOpen(false)}
      />
        <header className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
          <h1 className="text-3xl font-bold text-white">
            Welcome, {studentInfo.name}
          </h1>
          <p className="text-gray-400 mt-2">
            {studentInfo.course} | {studentInfo.year} | ID: {studentInfo.id}
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Medical History Section */}
          <div className="md:col-span-2 bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">Medical History</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAddingCondition(true)}
                className="bg-white text-black px-4 py-2 rounded-md font-semibold flex items-center text-sm"
              >
                Add Condition <Plus className="ml-2 h-4 w-4" />
              </motion.button>
            </div>
            <div className="space-y-4">
              {medicalHistory.map(item => (
                <MedicalHistoryCard key={item.id} item={item} />
              ))}
            </div>
            {isAddingCondition && (
              <form onSubmit={handleAddCondition} className="mt-4 space-y-4">
                <input
                  type="text"
                  placeholder="Condition"
                  value={newCondition.condition}
                  onChange={(e) => setNewCondition({ ...newCondition, condition: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Year of Diagnosis"
                  value={newCondition.diagnosis}
                  onChange={(e) => setNewCondition({ ...newCondition, diagnosis: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Current Status"
                  value={newCondition.currentStatus}
                  onChange={(e) => setNewCondition({ ...newCondition, currentStatus: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Condition
                </button>
              </form>
            )}
          </div>

          {/* Appointment Booking Section */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Appointments</h2>
            <button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors mb-4"
            >
              Schedule Appointment
            </button>
            <AppointmentModal
              isOpen={isAppointmentModalOpen}
              onClose={() => setIsAppointmentModalOpen(false)}
              doctors={availableDoctors}
              onBookAppointment={handleBookAppointment}
            />
            
            {/* Booked Appointments */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-white mb-3">Booked Appointments</h3>
              {bookedAppointments.length === 0 ? (
                <p className="text-gray-400">No appointments booked yet.</p>
              ) : (
                <ul className="space-y-3">
                  {bookedAppointments.map(appointment => (
                    <li key={appointment.id} className="bg-gray-800 rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium">{appointment.doctor}</p>
                        <p className="text-sm text-gray-400">{appointment.date} at {appointment.time}</p>
                      </div>
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Available Doctors Section */}
            <div className="md:col-span-3 bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-semibold text-white mb-6">Available Doctors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableDoctors.map(doctor => (
                  <motion.div
                    key={doctor.id}
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-white text-lg font-semibold mb-2">{doctor.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{doctor.specialization}</p>
                    <div className="flex flex-wrap gap-2">
                      {doctor.availableSlots.map(slot => (
                        <span key={slot} className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {slot}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}