import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import HomePage from '../pages/HomePage/HomePage'
import Dashboard from '../pages/Dashboard/Dashboard'
import Athletes from '../pages/Athletes/Athletes'
import Tactics from '../pages/Tactics/Tactics'
import AIAssistant from '../pages/Ai/Ai'
import Profile from '../pages/UserProfile/Profile'
import SignUp from '../pages/Register/SignUp'
import Login from '../pages/Register/LogIn'

const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes (Dashboard and related pages) */}
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/athletes" element={<Layout><Athletes /></Layout>} />
      <Route path="/tactics" element={<Layout><Tactics /></Layout>} />
      <Route path="/ai-assistant" element={<Layout><AIAssistant /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
    </Routes>
  )
}

export default AllRoutes