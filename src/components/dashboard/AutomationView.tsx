import React, { useState, useEffect } from 'react'
import {
  Workflow,
  CheckCircle2,
  Clock,
  Bell,
  Calendar,
  CreditCard,
  UserCheck,
  Sparkles,
  X,
  Send,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { SkeletonAutomationFeed } from '../common/Skeletons'

export const AutomationView: React.FC = () => {
  const {
    automationEvents,
    waitlist,
    acceptWaitlistOffer,
    declineWaitlistOffer,
    theme,
  } = useApp()

  const isDark = theme === 'dark'
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  const filteredEvents = automationEvents.filter((evt) => {
    if (selectedTypeFilter !== 'all' && evt.type !== selectedTypeFilter) return false
    return true
  })

  const workflowSteps = [
    {
      num: 1,
      title: 'Appointment Booked',
      desc: 'Customer completes self-serve booking interface or phone intake.',
      status: 'Active',
      icon: Calendar,
      color: 'bg-emerald-500 text-white',
    },
    {
      num: 2,
      title: 'Validate Availability',
      desc: 'Slot verified against staff shifts, break times, and 10m sanitization buffer.',
      status: 'Enforced',
      icon: CheckCircle2,
      color: 'bg-lime-500 text-slate-950',
    },
    {
      num: 3,
      title: 'Create Appointment',
      desc: 'Immutable reference generated (e.g. BK-250312-001) & schedule locked.',
      status: 'Synchronized',
      icon: UserCheck,
      color: 'bg-indigo-500 text-white',
    },
    {
      num: 4,
      title: 'Send Confirmation',
      desc: 'SMS and branded email dispatched with calendar file (.ics attachment).',
      status: 'Simulated',
      icon: Send,
      color: 'bg-blue-500 text-white',
    },
    {
      num: 5,
      title: 'Schedule Reminders',
      desc: '24-hour and 1-hour automated alerts armed with 1-click reschedule link.',
      status: 'Armed',
      icon: Bell,
      color: 'bg-purple-500 text-white',
    },
    {
      num: 6,
      title: 'Waitlist Auto-Fill',
      desc: 'If cancelled, instantly detects matching waiting customers and offers slot.',
      status: 'Listening',
      icon: Sparkles,
      color: 'bg-amber-500 text-slate-950',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Automation Engine</h1>
          <p className="text-xs sm:text-sm opacity-60">
            Local event-driven state orchestrator powering notifications, calendar buffers, and waitlist auto-fill.
          </p>
        </div>
      </div>

      {/* Visual Interactive Workflow (Matching Panel 7/8 in screenshot) */}
      <div
        className={`rounded-3xl p-6 sm:p-8 space-y-6 transition-all ${
          isDark ? 'neu-raised' : 'neu-raised'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/40 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Workflow className="w-5 h-5 text-lime-500" />
            <h2 className="text-base font-bold">Active Automation Pipeline</h2>
          </div>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-400/30">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Deterministic Local Engine
          </span>
        </div>

        {/* Workflow steps linear flow */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflowSteps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.num}
                className={`p-5 rounded-2xl border transition-all space-y-3 group ${
                  isDark
                    ? 'bg-[#0f1624] border-slate-800 hover:border-lime-400/50'
                    : 'bg-slate-50 border-slate-200 hover:border-lime-500/50 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-md ${step.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-slate-400'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    {step.status}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <span>{step.title}</span>
                  </h3>
                  <p className="text-xs opacity-60 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Waitlist Interactive Simulation Module */}
      <div
        className={`rounded-3xl p-6 sm:p-8 space-y-5 transition-all ${
          isDark ? 'neu-raised' : 'neu-raised'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold">Waitlist Simulation Engine</h2>
            <p className="text-xs opacity-60">
              When an appointment is cancelled, the next eligible customer receives an automated simulated SMS offer.
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-400/30">
            {waitlist.length} in queue
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {waitlist.map((wl) => (
            <div
              key={wl.id}
              className={`p-5 rounded-2xl border transition-all ${
                wl.status === 'offered'
                  ? 'bg-amber-500/15 border-amber-400/60 ring-2 ring-amber-400/30'
                  : wl.status === 'accepted'
                  ? 'bg-emerald-500/15 border-emerald-400/60'
                  : isDark
                  ? 'bg-[#0f1624] border-slate-800'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm">{wl.customerName}</span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    wl.status === 'offered'
                      ? 'bg-amber-400 text-slate-950 animate-pulse font-extrabold'
                      : wl.status === 'accepted'
                      ? 'bg-emerald-400 text-slate-950 font-extrabold'
                      : isDark
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {wl.status}
                </span>
              </div>

              <div className="text-xs opacity-80 space-y-1 mb-4">
                <p>
                  Requested: <strong>{wl.serviceName}</strong>
                </p>
                <p className="opacity-60 text-[11px]">
                  Preferred Date: {wl.preferredDate} • Contact: {wl.customerEmail}
                </p>
              </div>

              {wl.status === 'offered' && (
                <div className="pt-3 border-t border-amber-500/30 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-300">
                    Slot offered! Simulate customer response:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => declineWaitlistOffer(wl.id)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${
                        isDark ? 'border-slate-700 bg-slate-800 text-slate-300' : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => acceptWaitlistOffer(wl.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-slate-950 text-xs font-bold shadow-sm"
                    >
                      Accept & Book
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chronological Real-time Activity Feed */}
      <div
        className={`rounded-3xl p-6 sm:p-8 space-y-5 transition-all ${
          isDark ? 'neu-raised' : 'neu-raised'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/40 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold">Recent Automation Activity Feed</h2>
            <p className="text-xs opacity-60">Live chronological stream of simulated business events</p>
          </div>

          {/* Event Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {['all', 'booked', 'confirmed', 'reminder', 'cancelled', 'waitlist', 'payment'].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedTypeFilter(f)}
                className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                  selectedTypeFilter === f
                    ? 'bg-lime-400 text-slate-950 shadow-sm'
                    : isDark
                    ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Event List */}
        {isLoading ? (
          <SkeletonAutomationFeed />
        ) : (
          <div className="space-y-3">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className={`p-4 rounded-2xl border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                  isDark
                    ? 'bg-[#0f1624] border-slate-800 hover:bg-slate-850'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                }`}
              >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    evt.type === 'booked'
                      ? 'bg-lime-400/20 text-lime-500'
                      : evt.type === 'confirmed'
                      ? 'bg-blue-400/20 text-blue-500'
                      : evt.type === 'cancelled'
                      ? 'bg-rose-400/20 text-rose-500'
                      : evt.type === 'waitlist'
                      ? 'bg-amber-400/20 text-amber-500'
                      : evt.type === 'payment'
                      ? 'bg-emerald-400/20 text-emerald-500'
                      : 'bg-purple-400/20 text-purple-500'
                  }`}
                >
                  {evt.type === 'booked' ? (
                    <Calendar className="w-4 h-4" />
                  ) : evt.type === 'cancelled' ? (
                    <X className="w-4 h-4" />
                  ) : evt.type === 'payment' ? (
                    <CreditCard className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{evt.title}</span>
                    {evt.appointmentReference && (
                      <span
                        className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                          isDark ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        {evt.appointmentReference}
                      </span>
                    )}
                  </div>
                  <p className="opacity-70 text-xs mt-1 leading-relaxed">{evt.explanation}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:flex-col sm:items-end shrink-0 pl-11 sm:pl-0">
                <span className="text-[11px] font-semibold opacity-50">{evt.timestamp}</span>
                <span
                  className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                    evt.status === 'completed'
                      ? 'bg-emerald-400/15 text-emerald-500 border border-emerald-400/30'
                      : evt.status === 'scheduled'
                      ? 'bg-indigo-400/15 text-indigo-500 border border-indigo-400/30'
                      : 'bg-amber-400/15 text-amber-500 border border-amber-400/30'
                  }`}
                >
                  {evt.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  )
}
