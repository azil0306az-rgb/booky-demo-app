import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Menu,
  Bell,
  Calendar,
  ExternalLink,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { IndustryId } from '../../types'
import { ThemeToggle } from '../common/ThemeToggle'

interface DashboardHeaderProps {
  onToggleMobileMenu: () => void
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onToggleMobileMenu }) => {
  const {
    currentIndustryId,
    setIndustry,
    notifications,
    markAllNotificationsRead,
    theme,
  } = useApp()

  const isDark = theme === 'dark'
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIndustry(e.target.value as IndustryId)
  }

  return (
    <header
      className={`sticky top-0 z-30 px-4 sm:px-6 py-3.5 flex items-center justify-between border-b transition-colors duration-300 ${
        isDark
          ? 'bg-[#0f1725]/90 backdrop-blur-md border-slate-800 text-white'
          : 'bg-white/90 backdrop-blur-md border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      {/* Left items: Mobile toggle + Industry Switcher */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className={`lg:hidden p-2 rounded-xl border ${
            isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Industry Selector */}
        <div
          className={`flex items-center gap-2 border rounded-xl px-3 py-1.5 ${
            isDark ? 'bg-[#0a0f18] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
          }`}
        >
          <span className="text-[11px] font-bold opacity-60 uppercase tracking-wider hidden sm:inline">
            Preset:
          </span>
          <select
            value={currentIndustryId}
            onChange={handleIndustryChange}
            className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer"
          >
            <option value="salon">Salon & Spa</option>
            <option value="clinic">Clinic & Healthcare</option>
            <option value="consulting">Consulting & Advisory</option>
            <option value="fitness">Fitness & Training</option>
            <option value="education">Tutoring & Education</option>
            <option value="automotive">Automotive Care</option>
            <option value="events">Event Consultations</option>
          </select>
        </div>

        {/* Date Indicator (matching screenshot: Mar 12, 2025) */}
        <div
          className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 border rounded-xl text-xs font-bold ${
            isDark ? 'bg-[#0a0f18] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-lime-500" />
          <span>Wednesday, Mar 12, 2025</span>
        </div>
      </div>

      {/* Right items: Actions, Theme Toggle, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Real-time Theme Toggle Switch */}
        <ThemeToggle />

        <Link
          to="/appointment-automation/demo"
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold bg-lime-400 hover:bg-lime-300 text-slate-950 shadow-sm transition-all"
        >
          <span>Test Booking Demo</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* Notifications Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
            className={`p-2 rounded-xl border relative transition-colors ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            aria-label="Open notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-lime-400 text-slate-950 text-[10px] font-black flex items-center justify-center ring-2 ring-[#0b0f17]">
                {unreadCount}
              </span>
            )}
          </button>

          {notifDropdownOpen && (
            <div
              className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl shadow-2xl border p-4 z-50 animate-fade-in ${
                isDark ? 'bg-[#151d2a] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold">Notifications</h4>
                  <span className="text-[10px] font-bold bg-lime-400/20 text-lime-600 dark:text-lime-400 px-2 py-0.5 rounded-full">
                    {unreadCount} unread
                  </span>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-lime-600 dark:text-lime-400 hover:underline font-semibold"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
                {notifications.slice(0, 5).map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-xl text-xs transition-colors ${
                      n.read
                        ? isDark ? 'bg-slate-900/60 text-slate-400' : 'bg-slate-50 text-slate-600'
                        : isDark ? 'bg-lime-950/20 border border-lime-500/30 text-white' : 'bg-lime-50 border border-lime-200 text-slate-900 font-medium'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[11px]">{n.title}</span>
                      <span className="text-[10px] opacity-60">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] opacity-80 mt-1 line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200/40 dark:border-slate-800 text-center">
                <Link
                  to="/appointment-automation/dashboard/notifications"
                  onClick={() => setNotifDropdownOpen(false)}
                  className="text-xs font-bold text-lime-600 dark:text-lime-400 hover:underline"
                >
                  View All Notifications &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-slate-800 text-lime-400 flex items-center justify-center font-bold text-xs ring-1 ring-slate-300 dark:ring-slate-700 shadow-sm">
            DX
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold leading-none">Demo Manager</p>
            <p className="text-[10px] opacity-60 font-medium leading-none mt-1">
              Dawnexus Showcase
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
