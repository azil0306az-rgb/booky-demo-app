import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Bell,
  Zap,
  Plus,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { SkeletonKPIGrid, SkeletonAppointmentsTable } from '../common/Skeletons'

export const OverviewView: React.FC = () => {
  const { appointments, currentIndustry, theme } = useApp()
  const isDark = theme === 'dark'
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450)
    return () => clearTimeout(timer)
  }, [])

  // Calculate dynamic metrics from appointments
  const totalBookings = appointments.length
  const completedCount = appointments.filter((a) => a.status === 'completed').length

  const totalRevenue = appointments
    .filter((a) => a.status !== 'cancelled')
    .reduce((acc, curr) => acc + curr.paymentAmount, 0)

  // Filter today's appointments (matching demo date 2025-03-12)
  const todaysAppointments = appointments.filter((a) => a.date === '2025-03-12')

  return (
    <div className="space-y-6">
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Overview</h1>
          <p className="text-xs sm:text-sm opacity-60">
            Real-time operations for <strong className="opacity-100">{currentIndustry.businessName}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/appointment-automation/demo"
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-lime-400 hover:bg-lime-300 text-slate-950 shadow-md shadow-lime-500/20 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Simulate New Booking</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat KPI Cards (Matching Panel 5 in image: Total Bookings, Revenue, No-shows, Completed) */}
      {isLoading ? (
        <SkeletonKPIGrid />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Bookings */}
          <div
            className={`p-5 rounded-2xl transition-all space-y-3 ${
              isDark ? 'neu-raised' : 'neu-raised'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold opacity-60">Total Bookings</span>
              <span
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                  isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Calendar className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold">
                {24 + totalBookings - 4}
              </span>
              <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-md">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12%
              </span>
            </div>
            <p className="text-[11px] opacity-50">vs. previous 7-day period</p>
          </div>

          {/* Card 2: Revenue */}
          <div
            className={`p-5 rounded-2xl transition-all space-y-3 ${
              isDark ? 'neu-raised' : 'neu-raised'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold opacity-60">Revenue (Simulated)</span>
              <span className="w-8 h-8 rounded-xl bg-lime-400/20 text-lime-600 dark:text-lime-400 flex items-center justify-center font-bold">
                <DollarSign className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold">
                ${(1680 + totalRevenue - 260).toLocaleString()}
              </span>
              <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-md">
                <TrendingUp className="w-3 h-3 mr-1" />
                +10%
              </span>
            </div>
            <p className="text-[11px] opacity-50">Card & deposit collections</p>
          </div>

          {/* Card 3: No-shows */}
          <div
            className={`p-5 rounded-2xl transition-all space-y-3 ${
              isDark ? 'neu-raised' : 'neu-raised'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold opacity-60">No-shows</span>
              <span className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center font-bold">
                <AlertCircle className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold">3</span>
              <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-md">
                <TrendingDown className="w-3 h-3 mr-1" />
                -5%
              </span>
            </div>
            <p className="text-[11px] opacity-50">Curtailed by 2-tier reminders</p>
          </div>

          {/* Card 4: Completed */}
          <div
            className={`p-5 rounded-2xl transition-all space-y-3 ${
              isDark ? 'neu-raised' : 'neu-raised'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold opacity-60">Completed</span>
              <span className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold">
                {12 + completedCount}
              </span>
              <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-md">
                <TrendingUp className="w-3 h-3 mr-1" />
                +20%
              </span>
            </div>
            <p className="text-[11px] opacity-50">On schedule attendance</p>
          </div>
        </div>
      )}

      {/* Main Grid: Today's Appointments Table & Automation Summary */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Today's Appointments (Matching Panel 5 table) */}
        <div
          className={`lg:col-span-8 rounded-3xl p-6 space-y-4 ${
            isDark ? 'neu-raised' : 'neu-raised'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold">Today's Appointments</h2>
              <p className="text-xs opacity-60">Wednesday, March 12, 2025</p>
            </div>
            <Link
              to="/appointment-automation/dashboard/appointments"
              className="text-xs font-bold text-lime-600 dark:text-lime-400 hover:underline flex items-center gap-1"
            >
              <span>View All ({appointments.length})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200/40 dark:border-slate-800 opacity-50 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5">Time</th>
                  <th className="py-2.5">Service</th>
                  <th className="py-2.5">Staff</th>
                  <th className="py-2.5">Customer</th>
                  <th className="py-2.5">Price</th>
                  <th className="py-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/30 dark:divide-slate-800/60">
                {todaysAppointments.map((app) => (
                  <tr
                    key={app.id}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3.5 font-bold">{app.time}</td>
                    <td className="py-3.5 font-semibold">{app.serviceName}</td>
                    <td className="py-3.5 opacity-80">{app.staffName}</td>
                    <td className="py-3.5 opacity-80">{app.customer.name}</td>
                    <td className="py-3.5 font-extrabold text-lime-600 dark:text-lime-400">
                      ${app.price}
                    </td>
                    <td className="py-3.5 text-right">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          app.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-400/30'
                            : app.status === 'pending'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-400/30'
                            : app.status === 'completed'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-400/30'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-400/30'
                        }`}
                      >
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Upcoming Reminders & Automation Status */}
        <div className="lg:col-span-4 space-y-4">
          {/* Upcoming Reminders Card */}
          <div
            className={`p-5 rounded-3xl space-y-3 ${
              isDark ? 'neu-raised' : 'neu-raised'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/40 dark:border-slate-800">
              <span className="text-xs font-bold flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-lime-500" />
                Upcoming Reminders
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 opacity-70">
                2 reminders scheduled
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div
                className={`p-3 rounded-2xl border flex items-start gap-2.5 ${
                  isDark ? 'bg-[#0e1420] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-bold">24-Hour SMS Check-in</p>
                  <p className="opacity-60 text-[11px]">
                    To Jessica Reynolds for Hair Cut & Style at 10:00 AM
                  </p>
                </div>
              </div>

              <div
                className={`p-3 rounded-2xl border flex items-start gap-2.5 ${
                  isDark ? 'bg-[#0e1420] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-bold">1-Hour Final Alert</p>
                  <p className="opacity-60 text-[11px]">
                    To Michael Chen for Hair Colour at 11:30 AM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Automation Status Card */}
          <div
            className={`p-5 rounded-3xl space-y-3 ${
              isDark ? 'neu-raised' : 'neu-raised'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/40 dark:border-slate-800">
              <span className="text-xs font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-lime-500" />
                Automation Status
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                All systems active
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between opacity-80 text-[11px]">
                <span>Validation Engine</span>
                <span className="font-bold text-emerald-500">Online</span>
              </div>
              <div className="flex justify-between opacity-80 text-[11px]">
                <span>SMS & Email Dispatcher</span>
                <span className="font-bold text-emerald-500">Online (Simulated)</span>
              </div>
              <div className="flex justify-between opacity-80 text-[11px]">
                <span>Waitlist Auto-Fill Scanner</span>
                <span className="font-bold text-emerald-500">Listening</span>
              </div>
              <div className="flex justify-between opacity-80 text-[11px]">
                <span>Turnover Buffer Guard</span>
                <span className="font-bold text-emerald-500">Active (10m)</span>
              </div>
            </div>

            <Link
              to="/appointment-automation/dashboard/automation"
              className="block text-center text-xs font-bold text-lime-600 dark:text-lime-400 hover:underline pt-2 border-t border-slate-200/40 dark:border-slate-800"
            >
              Open Automation Workflow Engine &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
