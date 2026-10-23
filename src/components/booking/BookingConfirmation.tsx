import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import {
  Check,
  Hash,
  ArrowRight,
  AlertTriangle,
  BellRing,
  Info,
  CheckCircle2,
  CalendarDays,
  XCircle,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Appointment } from '../../types'

export const BookingConfirmation: React.FC = () => {
  const location = useLocation()
  const {
    lastCreatedAppointment,
    appointments,
    rescheduleAppointment,
    cancelAppointment,
    getAvailableSlots,
    theme,
  } = useApp()

  const isDark = theme === 'dark'

  // Use appointment passed from navigation state or last created or first in list
  const appointment: Appointment | undefined =
    (location.state as { appointment?: Appointment })?.appointment ||
    lastCreatedAppointment ||
    appointments[0]

  // Reschedule Modal State
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false)
  const [newDate, setNewDate] = useState('2025-03-14')
  const [newTime, setNewTime] = useState('02:00 PM')
  const [actionSuccessNotice, setActionSuccessNotice] = useState<string | null>(null)

  // Cancel Confirmation Modal State
  const [cancelModalOpen, setCancelModalOpen] = useState(false)

  if (!appointment) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center p-6 text-center ${
          isDark ? 'bg-[#0b0f17] text-white' : 'bg-[#edf2f7] text-slate-900'
        }`}
      >
        <div
          className={`p-8 rounded-3xl max-w-md ${
            isDark ? 'neu-raised' : 'neu-raised'
          }`}
        >
          <p className="opacity-80 font-semibold mb-4">No recent booking found.</p>
          <Link
            to="/appointment-automation/demo"
            className="px-6 py-2.5 rounded-xl font-bold bg-lime-400 text-slate-950 text-xs shadow-md"
          >
            Create a New Booking Demo
          </Link>
        </div>
      </div>
    )
  }

  const currentApp = appointments.find((a) => a.id === appointment.id) || appointment
  const isCancelled = currentApp.status === 'cancelled'

  const availableSlotsForReschedule = getAvailableSlots(newDate, currentApp.staffId)

  const handleExecuteReschedule = () => {
    const success = rescheduleAppointment(currentApp.id, newDate, newTime)
    if (success) {
      setRescheduleModalOpen(false)
      setActionSuccessNotice(`Appointment successfully rescheduled to ${newDate} at ${newTime}!`)
      setTimeout(() => setActionSuccessNotice(null), 5000)
    }
  }

  const handleExecuteCancel = () => {
    const success = cancelAppointment(currentApp.id)
    if (success) {
      setCancelModalOpen(false)
      setActionSuccessNotice(
        `Appointment cancelled. Slot freed up and waitlist check simulated!`
      )
      setTimeout(() => setActionSuccessNotice(null), 5000)
    }
  }

  return (
    <div
      className={`min-h-screen pb-20 transition-colors duration-300 ${
        isDark ? 'bg-[#0b0f17] text-white' : 'bg-[#edf2f7] text-slate-900'
      }`}
    >
      {/* Top Banner */}
      <div
        className={`px-4 py-2.5 text-xs border-b transition-colors ${
          isDark
            ? 'bg-[#111622] text-slate-300 border-slate-800'
            : 'bg-white text-slate-700 border-slate-200 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime-400" />
            Booking Confirmation & Simulated Event Timeline
          </span>
          <Link
            to="/appointment-automation/dashboard"
            className="text-lime-600 dark:text-lime-400 font-bold hover:underline"
          >
            Open in Business Dashboard &rarr;
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {actionSuccessNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center gap-3 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>{actionSuccessNotice}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Card: Appointment Confirmed Summary (Matching Panel 4 left) */}
          <div
            className={`lg:col-span-7 rounded-3xl p-6 sm:p-10 space-y-8 transition-all ${
              isDark ? 'neu-raised' : 'neu-raised'
            }`}
          >
            <div className="text-center sm:text-left flex flex-col sm:flex-row items-center gap-5">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                  isCancelled
                    ? 'bg-rose-100 text-rose-600 shadow-rose-500/20'
                    : 'bg-lime-400 text-slate-950 shadow-lime-500/30'
                }`}
              >
                {isCancelled ? (
                  <XCircle className="w-10 h-10 stroke-[2.2]" />
                ) : (
                  <Check className="w-10 h-10 stroke-[3]" />
                )}
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold">
                  {isCancelled ? 'Appointment Cancelled' : 'Appointment Confirmed!'}
                </h2>
                <p className="text-sm opacity-70 mt-1">
                  {isCancelled
                    ? 'This simulated booking was cancelled and slot released back to schedule.'
                    : 'Your booking has been successfully created in the simulated calendar.'}
                </p>
              </div>
            </div>

            {/* Parameter Detail Table */}
            <div
              className={`rounded-2xl p-5 border space-y-4 ${
                isDark ? 'bg-[#0f1624] border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-slate-800 text-xs">
                <span className="opacity-70 font-semibold flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-lime-500" />
                  Booking Reference
                </span>
                <span
                  className={`font-mono font-bold px-2.5 py-1 rounded-md border ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  {currentApp.bookingReference}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="opacity-60 block text-[11px] font-medium">Service</span>
                  <span className="text-sm font-bold">{currentApp.serviceName}</span>
                </div>

                <div>
                  <span className="opacity-60 block text-[11px] font-medium">Staff Member</span>
                  <span className="text-sm font-bold">{currentApp.staffName}</span>
                </div>

                <div>
                  <span className="opacity-60 block text-[11px] font-medium">Date & Time</span>
                  <span className="text-sm font-bold">
                    {currentApp.date} at {currentApp.time}
                  </span>
                </div>

                <div>
                  <span className="opacity-60 block text-[11px] font-medium">Duration</span>
                  <span className="text-sm font-bold">{currentApp.durationMinutes} minutes</span>
                </div>

                <div>
                  <span className="opacity-60 block text-[11px] font-medium">Customer</span>
                  <span className="text-sm font-bold">{currentApp.customer.name}</span>
                </div>

                <div>
                  <span className="opacity-60 block text-[11px] font-medium">Simulated Amount</span>
                  <span className="text-sm font-bold">
                    ${currentApp.price}.00{' '}
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 font-bold px-1.5 py-0.5 rounded border border-emerald-400/30">
                      {currentApp.paymentStatus === 'deposit_paid' ? 'Deposit Paid' : 'Paid'}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: Reschedule & Cancel buttons */}
            {!isCancelled ? (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRescheduleModalOpen(true)}
                  className={`px-5 py-2.5 rounded-xl border font-bold text-xs flex items-center gap-2 transition-all ${
                    isDark
                      ? 'border-slate-700 bg-slate-800 text-white hover:bg-slate-700'
                      : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100 shadow-sm'
                  }`}
                >
                  <CalendarDays className="w-4 h-4 text-lime-500" />
                  <span>Reschedule</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCancelModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl border border-rose-500/40 text-rose-500 font-bold text-xs hover:bg-rose-500/10 transition-all flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>Cancel Appointment</span>
                </button>

                <Link
                  to="/appointment-automation/dashboard"
                  className="ml-auto px-5 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 font-extrabold text-xs text-slate-950 shadow-md shadow-lime-500/20 flex items-center gap-2"
                >
                  <span>View in Dashboard</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            ) : (
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-rose-500 font-semibold">
                  This booking has been cancelled in the prototype store.
                </span>
                <Link
                  to="/appointment-automation/demo"
                  className="px-5 py-2.5 rounded-xl font-bold bg-lime-400 text-slate-950 text-xs shadow-md"
                >
                  Create Another Booking
                </Link>
              </div>
            )}
          </div>

          {/* Right Card: What Happens Next? Timeline (Matching Panel 4 right) */}
          <div
            className={`lg:col-span-5 rounded-3xl p-6 sm:p-8 space-y-6 transition-all ${
              isDark ? 'neu-raised' : 'neu-raised'
            }`}
          >
            <h3 className="text-lg font-bold pb-3 border-b border-slate-200/40 dark:border-slate-800 flex items-center gap-2">
              <BellRing className="w-5 h-5 text-lime-500" />
              <span>What Happens Next?</span>
            </h3>

            {/* Timeline Events List */}
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-300 dark:before:bg-slate-700">
              {/* Event 1: Confirmation */}
              <div className="relative flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 ring-4 ring-[#0b0f17] dark:ring-[#121824] shadow-sm">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">Confirmation</span>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 font-bold px-2 py-0.5 rounded-full">
                      Just now
                    </span>
                  </div>
                  <p className="text-xs opacity-70 mt-1 leading-relaxed">
                    A confirmation has been sent (simulated). SMS sent to {currentApp.customer.phone} and email receipt sent to {currentApp.customer.email}.
                  </p>
                </div>
              </div>

              {/* Event 2: Reminder 24h before */}
              <div className="relative flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0 ring-4 ring-[#0b0f17] dark:ring-[#121824] shadow-sm">
                  <BellRing className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">Reminder</span>
                    <span className="text-[10px] text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950/60 font-bold px-2 py-0.5 rounded-full">
                      24 hours before
                    </span>
                  </div>
                  <p className="text-xs opacity-70 mt-1 leading-relaxed">
                    You will receive an automated check-in reminder with direct 1-tap reschedule or cancel options (simulated).
                  </p>
                </div>
              </div>

              {/* Event 3: Reminder 1h before */}
              <div className="relative flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0 ring-4 ring-[#0b0f17] dark:ring-[#121824] shadow-sm">
                  <BellRing className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">Reminder</span>
                    <span className="text-[10px] text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950/60 font-bold px-2 py-0.5 rounded-full">
                      1 hour before
                    </span>
                  </div>
                  <p className="text-xs opacity-70 mt-1 leading-relaxed">
                    You will receive a final reminder notification with driving/parking details (simulated).
                  </p>
                </div>
              </div>
            </div>

            {/* Notice Callout */}
            <div
              className={`rounded-2xl p-4 border text-xs space-y-2 ${
                isDark ? 'bg-[#0f1624] border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-lime-600 dark:text-lime-400">
                <Info className="w-4 h-4" />
                <span>Simulated Experience Notice</span>
              </div>
              <p className="opacity-70 leading-relaxed">
                This is a simulated booking. No real messages or SMS fees have been dispatched. Built by{' '}
                <span className="font-bold">Dawnexus</span> showcase ecosystem.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/appointment-automation/demo"
                className={`w-full py-3 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 border ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-sm'
                }`}
              >
                <span>Book Another Service</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      {rescheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div
            className={`rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border space-y-5 ${
              isDark ? 'bg-[#141b27] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-slate-800">
              <h3 className="text-lg font-bold">Reschedule Appointment</h3>
              <button
                onClick={() => setRescheduleModalOpen(false)}
                className="opacity-50 hover:opacity-100 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs opacity-70">
              Current: <strong>{currentApp.date} at {currentApp.time}</strong>
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold opacity-80 mb-1">Select New Date</label>
                <select
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className={`w-full p-3 rounded-xl border font-semibold ${
                    isDark ? 'bg-[#0e1420] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="2025-03-13">Thursday, March 13, 2025</option>
                  <option value="2025-03-14">Friday, March 14, 2025</option>
                  <option value="2025-03-15">Saturday, March 15, 2025</option>
                  <option value="2025-03-17">Monday, March 17, 2025</option>
                </select>
              </div>

              <div>
                <label className="block font-bold opacity-80 mb-1">Select New Time Slot</label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {availableSlotsForReschedule.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setNewTime(slot)}
                      className={`p-2.5 rounded-lg font-bold transition-all ${
                        newTime === slot
                          ? 'bg-lime-400 text-slate-950 shadow-sm'
                          : isDark
                          ? 'bg-[#0f1624] text-slate-300 hover:bg-slate-800'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/40 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setRescheduleModalOpen(false)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                  isDark ? 'border-slate-700 text-slate-400' : 'border-slate-300 text-slate-600'
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteReschedule}
                className="px-5 py-2 rounded-xl font-bold bg-lime-400 hover:bg-lime-300 text-slate-950 text-xs shadow-md"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div
            className={`rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border space-y-4 ${
              isDark ? 'bg-[#141b27] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Cancel Appointment?</h3>
                <p className="text-xs opacity-60">Booking {currentApp.bookingReference}</p>
              </div>
            </div>

            <p className="text-xs opacity-80 leading-relaxed">
              Are you sure you want to cancel this booking? The slot will be freed in the simulated schedule, and the waitlist simulation will check if waiting customers are eligible to receive an automatic slot offer!
            </p>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setCancelModalOpen(false)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                  isDark ? 'border-slate-700 text-slate-400' : 'border-slate-300 text-slate-600'
                }`}
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={handleExecuteCancel}
                className="px-5 py-2 rounded-xl font-bold bg-rose-600 hover:bg-rose-700 text-white text-xs shadow-md shadow-rose-600/20"
              >
                Yes, Cancel & Trigger Waitlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
