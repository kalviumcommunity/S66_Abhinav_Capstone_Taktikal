import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import ProtectedRoute from '../components/ProtectedRoute'
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
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout><Dashboard /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/athletes" element={
        <ProtectedRoute>
          <Layout><Athletes /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/tactics" element={
        <ProtectedRoute>
          <Layout><Tactics /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/ai-assistant" element={
        <ProtectedRoute>
          <Layout><AIAssistant /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Layout><Profile /></Layout>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default AllRoutes