import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Calendar,
  Clock,
  Users,
  UserCheck,
  Zap,
  Bell,
  CreditCard,
  BarChart3,
  Settings,
  RotateCcw,
  ExternalLink,
} from 'lucide-react'
import { BrandLogo } from '../common/BrandLogo'
import { useApp } from '../../context/AppContext'

interface DashboardSidebarProps {
  onCloseMobile?: () => void
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onCloseMobile }) => {
  const location = useLocation()
  const { notifications, resetDemo, theme } = useApp()
  const isDark = theme === 'dark'

  const unreadCount = notifications.filter((n) => !n.read).length

  const navItems = [
    { label: 'Overview', path: '/appointment-automation/dashboard', icon: LayoutDashboard },
    { label: 'Calendar', path: '/appointment-automation/dashboard/calendar', icon: Calendar },
    { label: 'Appointments', path: '/appointment-automation/dashboard/appointments', icon: Clock },
    { label: 'Customers', path: '/appointment-automation/dashboard/customers', icon: Users },
    { label: 'Staff', path: '/appointment-automation/dashboard/staff', icon: UserCheck },
    { label: 'Automation', path: '/appointment-automation/dashboard/automation', icon: Zap },
    {
      label: 'Notifications',
      path: '/appointment-automation/dashboard/notifications',
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { label: 'Payments', path: '/appointment-automation/dashboard/payments', icon: CreditCard },
    { label: 'Analytics', path: '/appointment-automation/dashboard/analytics', icon: BarChart3 },
    { label: 'Settings', path: '/appointment-automation/dashboard/settings', icon: Settings },
  ]

  const handleReset = () => {
    if (window.confirm('Reset all demo appointments, events, and notifications to default?')) {
      resetDemo()
    }
  }

  return (
    <aside
      className={`w-64 flex flex-col justify-between shrink-0 h-screen sticky top-0 transition-colors duration-300 border-r ${
        isDark
          ? 'bg-[#111622] text-slate-300 border-slate-800'
          : 'bg-white text-slate-700 border-slate-200 shadow-sm'
      }`}
    >
      {/* Brand Header */}
      <div className={`p-6 border-b ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <Link to="/appointment-automation" className="block">
          <BrandLogo size="sm" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? isDark
                    ? 'bg-slate-800 text-lime-400 border border-lime-400/30 shadow-inner'
                    : 'bg-slate-100 text-slate-950 border border-slate-300 shadow-sm'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? isDark
                        ? 'text-lime-400'
                        : 'text-lime-600'
                      : 'opacity-70'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="w-5 h-5 rounded-full bg-lime-400 text-slate-950 text-[10px] font-black flex items-center justify-center shadow-sm">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer Actions */}
      <div
        className={`p-4 border-t space-y-2 ${
          isDark ? 'bg-[#0e121b] border-slate-800/80' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <Link
          to="/appointment-automation/demo"
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-colors ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
          }`}
        >
          <span>Open Booking Demo</span>
          <ExternalLink className="w-3.5 h-3.5 text-lime-500" />
        </Link>

        <button
          onClick={handleReset}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-colors ${
            isDark
              ? 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border-slate-800'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border-slate-200'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo</span>
        </button>
      </div>
    </aside>
  )
}
