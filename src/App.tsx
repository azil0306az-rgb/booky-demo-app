import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { LandingPage } from './pages/LandingPage'
import { DemoPage } from './pages/DemoPage'
import { ConfirmationPage } from './pages/ConfirmationPage'
import { DashboardLayout } from './components/dashboard/DashboardLayout'

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Root redirect to appointment-automation */}
          <Route path="/" element={<Navigate to="/appointment-automation" replace />} />

          {/* Public Landing Page */}
          <Route path="/appointment-automation" element={<LandingPage />} />

          {/* Customer Interactive Booking Flow */}
          <Route path="/appointment-automation/demo" element={<DemoPage />} />
          <Route path="/appointment-automation/demo/confirmation" element={<ConfirmationPage />} />

          {/* Business Dashboard with Subviews */}
          <Route path="/appointment-automation/dashboard" element={<DashboardLayout />}>
            <Route path="calendar" element={<DashboardLayout />} />
            <Route path="appointments" element={<DashboardLayout />} />
            <Route path="customers" element={<DashboardLayout />} />
            <Route path="staff" element={<DashboardLayout />} />
            <Route path="automation" element={<DashboardLayout />} />
            <Route path="notifications" element={<DashboardLayout />} />
            <Route path="payments" element={<DashboardLayout />} />
            <Route path="analytics" element={<DashboardLayout />} />
            <Route path="settings" element={<DashboardLayout />} />
          </Route>

          {/* Unknown route fallback */}
          <Route
            path="*"
            element={<Navigate to="/appointment-automation" replace />}
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
