import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DashboardSidebar } from './DashboardSidebar'
import { DashboardHeader } from './DashboardHeader'
import { OverviewView } from './OverviewView'
import { CalendarView } from './CalendarView'
import { AppointmentsView } from './AppointmentsView'
import { CustomersView } from './CustomersView'
import { StaffView } from './StaffView'
import { AutomationView } from './AutomationView'
import { NotificationsView } from './NotificationsView'
import { PaymentsView } from './PaymentsView'
import { AnalyticsView } from './AnalyticsView'
import { SettingsView } from './SettingsView'
import { useApp } from '../../context/AppContext'

export const DashboardLayout: React.FC = () => {
  const location = useLocation()
  const { theme } = useApp()
  const isDark = theme === 'dark'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Map route path to specific subview
  const renderCurrentView = () => {
    const path = location.pathname
    if (path.endsWith('/calendar')) return <CalendarView />
    if (path.endsWith('/appointments')) return <AppointmentsView />
    if (path.endsWith('/customers')) return <CustomersView />
    if (path.endsWith('/staff')) return <StaffView />
    if (path.endsWith('/automation')) return <AutomationView />
    if (path.endsWith('/notifications')) return <NotificationsView />
    if (path.endsWith('/payments')) return <PaymentsView />
    if (path.endsWith('/analytics')) return <AnalyticsView />
    if (path.endsWith('/settings')) return <SettingsView />
    return <OverviewView />
  }

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${
        isDark ? 'bg-[#0c0a09] text-[#f7f4ee]' : 'bg-[#faf7f2] text-stone-900'
      }`}
    >
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className={`relative z-10 w-64 h-full shadow-2xl ${
              isDark ? 'bg-[#111622]' : 'bg-white'
            }`}
          >
            <DashboardSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  )
}
