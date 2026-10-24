import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Calendar,
  Plus,
  Bell,
  Menu,
} from 'lucide-react'
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
  const { theme, notifications } = useApp()
  const isDark = theme === 'dark'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

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

  const currentPath = location.pathname

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
            className="fixed inset-0 bg-black/75 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className={`relative z-10 w-72 h-full shadow-2xl transition-transform animate-slide-in ${
              isDark ? 'bg-[#14110f] border-r border-[#c5a880]/30' : 'bg-[#faf7f2] border-r border-[#c5a880]/40'
            }`}
          >
            <DashboardSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 lg:pb-8">
          {renderCurrentView()}
        </main>
      </div>

      {/* ==================================================================== */}
      {/* MOBILE STICKY BOTTOM NAVIGATION BAR (MATCHING PANEL 9 SPECIFICATION)  */}
      {/* ==================================================================== */}
      <nav
        className={`lg:hidden fixed bottom-0 inset-x-0 z-40 border-t backdrop-blur-xl px-2 py-2 transition-colors duration-300 ${
          isDark
            ? 'bg-[#120f0d]/95 border-[#c5a880]/25 text-stone-400'
            : 'bg-white/95 border-[#c5a880]/35 text-stone-600 shadow-lg'
        }`}
      >
        <div className="max-w-md mx-auto grid grid-cols-5 items-center text-center">
          {/* 1. Home / Overview */}
          <Link
            to="/appointment-automation/dashboard"
            className={`flex flex-col items-center justify-center py-1 gap-1 transition-colors ${
              currentPath === '/appointment-automation/dashboard'
                ? 'text-[#dfc299] font-bold'
                : 'hover:text-[#dfc299]'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Home</span>
          </Link>

          {/* 2. Calendar */}
          <Link
            to="/appointment-automation/dashboard/calendar"
            className={`flex flex-col items-center justify-center py-1 gap-1 transition-colors ${
              currentPath.includes('/calendar')
                ? 'text-[#dfc299] font-bold'
                : 'hover:text-[#dfc299]'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Calendar</span>
          </Link>

          {/* 3. Center Elevated Book (+) Button */}
          <Link
            to="/appointment-automation/demo"
            className="flex flex-col items-center justify-center -mt-5"
          >
            <div className="w-12 h-12 rounded-full neu-gold-btn flex items-center justify-center shadow-xl transform active:scale-95 transition-transform border-2 border-[#120f0d]">
              <Plus className="w-6 h-6 stroke-[3]" />
            </div>
            <span className="text-[10px] font-bold text-[#dfc299] mt-0.5">Book</span>
          </Link>

          {/* 4. Alerts / Activity */}
          <Link
            to="/appointment-automation/dashboard/notifications"
            className={`flex flex-col items-center justify-center py-1 gap-1 relative transition-colors ${
              currentPath.includes('/notifications')
                ? 'text-[#dfc299] font-bold'
                : 'hover:text-[#dfc299]'
            }`}
          >
            <div className="relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#dfc299] animate-pulse" />
              )}
            </div>
            <span className="text-[10px] tracking-tight">Alerts</span>
          </Link>

          {/* 5. More / Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center py-1 gap-1 hover:text-[#dfc299] transition-colors"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Menu</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
