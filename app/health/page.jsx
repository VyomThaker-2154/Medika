'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, User, Activity, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for health metrics
const mockHealthData = [
  { date: '2023-01-01', weight: 70, temperature: 36.6, bmi: 22.9 },
  { date: '2023-02-01', weight: 71, temperature: 36.7, bmi: 23.2 },
  { date: '2023-03-01', weight: 70.5, temperature: 36.5, bmi: 23.0 },
  { date: '2023-04-01', weight: 72, temperature: 36.8, bmi: 23.5 },
  { date: '2023-05-01', weight: 71.5, temperature: 36.6, bmi: 23.4 },
  { date: '2023-06-01', weight: 71, temperature: 36.7, bmi: 23.2 },
];

const HealthMetricInput = ({ label, value, onChange, unit, min, max }) => {
  const getColorClass = () => {
    if (value < min) return 'text-red-500';
    if (value > max) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <div className="flex items-center">
        <input
          type="number"
          value={value}
          onChange={onChange}
          className={`bg-gray-800 text-white rounded-md px-3 py-2 w-full ${getColorClass()}`}
        />
        <span className="ml-2 text-gray-400">{unit}</span>
      </div>
    </div>
  );
};

const calculateBMI = (weight, height) => {
  if (weight > 0 && height > 0) {
    const bmi = weight / ((height / 100) ** 2);
    return bmi.toFixed(1);
  }
  return '';
};

const getBMICategory = (bmi) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

export default function HealthDashboard() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [temperature, setTemperature] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [healthData, setHealthData] = useState(mockHealthData);

  const bmi = calculateBMI(weight, height);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      date: new Date().toISOString().split('T')[0],
      weight: parseFloat(weight),
      temperature: parseFloat(temperature),
      bmi: parseFloat(bmi),
    };
    setHealthData([...healthData, newEntry]);
    // Reset form
    setWeight('');
    setHeight('');
    setTemperature('');
    setSymptoms('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/student" className="text-white flex items-center">
            <ChevronLeft className="h-6 w-6 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Health Monitoring Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Health Data Input Form */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Input Health Data</h2>
            <form onSubmit={handleSubmit}>
              <HealthMetricInput
                label="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                unit="kg"
                min={50}
                max={100}
              />
              <HealthMetricInput
                label="Height (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                unit="cm"
                min={140}
                max={220}
              />
              <HealthMetricInput
                label="Temperature (°C)"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                unit="°C"
                min={36.1}
                max={37.2}
              />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Symptoms</label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="bg-gray-800 text-white rounded-md px-3 py-2 w-full h-24 resize-none"
                  placeholder="Describe any symptoms..."
                ></textarea>
              </div>
              {bmi && (
                <div className="mb-4 p-4 bg-gray-700 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">BMI: {bmi}</h3>
                  <p className="text-sm text-gray-300">Category: {getBMICategory(parseFloat(bmi))}</p>
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Health Data
              </button>
            </form>
          </div>

          {/* Health Metric Graphs */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Health Metric Graphs</h2>
            <div className="h-64 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis yAxisId="left" stroke="#9CA3AF" />
                  <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#3B82F6" name="Weight (kg)" />
                  <Line yAxisId="right" type="monotone" dataKey="temperature" stroke="#EF4444" name="Temperature (°C)" />
                  <Line yAxisId="left" type="monotone" dataKey="bmi" stroke="#10B981" name="BMI" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Current Weight</h3>
                <p className="text-2xl font-bold">{healthData[healthData.length - 1].weight} kg</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Current Temperature</h3>
                <p className="text-2xl font-bold">{healthData[healthData.length - 1].temperature} °C</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Current BMI</h3>
                <p className="text-2xl font-bold">{healthData[healthData.length - 1].bmi}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}