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
          isDark ? 'bg-[#0c0a09] text-[#faf7f2]' : 'bg-[#faf7f2] text-[#1a1614]'
        }`}
      >
        <div
          className={`p-8 rounded-3xl max-w-md border ${
            isDark ? 'neu-raised border-[#c5a880]/20' : 'neu-raised border-[#c5a880]/30'
          }`}
        >
          <p className="opacity-80 font-semibold mb-4">No recent reservation found in the folio.</p>
          <Link
            to="/appointment-automation/demo"
            className="px-6 py-2.5 rounded-full font-bold neu-gold-btn text-xs shadow-md uppercase tracking-wider"
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
      setActionSuccessNotice(`Reservation successfully rescheduled to ${newDate} at ${newTime}!`)
      setTimeout(() => setActionSuccessNotice(null), 5000)
    }
  }

  const handleExecuteCancel = () => {
    const success = cancelAppointment(currentApp.id)
    if (success) {
      setCancelModalOpen(false)
      setActionSuccessNotice(
        `Reservation cancelled. Slot freed up and waitlist check simulated!`
      )
      setTimeout(() => setActionSuccessNotice(null), 5000)
    }
  }

  return (
    <div
      className={`min-h-screen pb-20 transition-colors duration-300 ${
        isDark ? 'bg-[#0c0a09] text-[#faf7f2]' : 'bg-[#faf7f2] text-[#1a1614]'
      }`}
    >
      {/* Top Banner */}
      <div
        className={`px-4 py-2.5 text-xs border-b transition-colors ${
          isDark
            ? 'bg-[#14110f] text-[#dfc299]/90 border-[#c5a880]/20'
            : 'bg-[#f5efe6] text-[#8c6d42] border-[#c5a880]/25 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#dfc299] animate-pulse" />
            Reservation Folio & Automated Event Timeline
          </span>
          <Link
            to="/appointment-automation/dashboard"
            className="text-[#dfc299] font-bold hover:text-[#c5a880] hover:underline"
          >
            Open in Business Dashboard &rarr;
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {actionSuccessNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-[#c5a880]/15 border border-[#c5a880]/40 text-[#dfc299] text-sm font-semibold flex items-center gap-3 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-[#dfc299] shrink-0" />
            <span>{actionSuccessNotice}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Card: Appointment Confirmed Summary (Matching Panel 4 left) */}
          <div
            className={`lg:col-span-7 rounded-3xl p-6 sm:p-10 space-y-8 transition-all border ${
              isDark ? 'neu-raised border-[#c5a880]/20' : 'neu-raised border-[#c5a880]/30'
            }`}
          >
            <div className="text-center sm:text-left flex flex-col sm:flex-row items-center gap-5">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                  isCancelled
                    ? 'bg-rose-100 text-rose-600 shadow-rose-500/20'
                    : 'bg-gradient-to-br from-[#dfc299] to-[#c5a880] text-[#0c0a09] shadow-[#c5a880]/30'
                }`}
              >
                {isCancelled ? (
                  <XCircle className="w-10 h-10 stroke-[2.2]" />
                ) : (
                  <Check className="w-10 h-10 stroke-[3]" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs uppercase tracking-widest text-[#dfc299] font-bold">Folio Confirmed</span>
                  <div className="flex text-[#dfc299] text-xs">★★★★★</div>
                </div>
                <h2 className="text-3xl sm:text-4xl font-classic-serif font-normal">
                  {isCancelled ? 'Reservation Cancelled' : 'Reservation Confirmed!'}
                </h2>
                <p className="text-sm opacity-70 mt-1">
                  {isCancelled
                    ? 'This simulated reservation was cancelled and slot released back to schedule.'
                    : 'Your appointment folio has been recorded in the simulated system.'}
                </p>
              </div>
            </div>

            {/* Parameter Detail Table */}
            <div
              className={`rounded-2xl p-5 border space-y-4 ${
                isDark ? 'bg-[#151210] border-[#c5a880]/20' : 'bg-[#f5efe6] border-[#c5a880]/30'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-200/40 dark:border-stone-800 text-xs">
                <span className="opacity-70 font-semibold flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-[#dfc299]" />
                  Booking Reference
                </span>
                <span
                  className={`font-mono font-bold px-3 py-1 rounded-md border ${
                    isDark ? 'bg-stone-900 border-[#c5a880]/40 text-[#dfc299]' : 'bg-white border-[#c5a880]/40 text-[#8c6d42]'
                  }`}
                >
                  {currentApp.bookingReference}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="opacity-60 block text-[11px] font-medium">Service Experience</span>
                  <span className="text-sm font-bold">{currentApp.serviceName}</span>
                </div>

                <div>
                  <span className="opacity-60 block text-[11px] font-medium">Designated Specialist</span>
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
                  <span className="opacity-60 block text-[11px] font-medium">Guest</span>
                  <span className="text-sm font-bold">{currentApp.customer.name}</span>
                </div>

                <div>
                  <span className="opacity-60 block text-[11px] font-medium">Simulated Folio Fee</span>
                  <span className="text-lg font-classic-serif font-normal text-[#dfc299]">
                    ${currentApp.price}.00{' '}
                    <span className="text-[10px] text-[#dfc299] bg-[#c5a880]/20 font-bold px-2 py-0.5 rounded border border-[#c5a880]/30">
                      {currentApp.paymentStatus === 'deposit_paid' ? 'Deposit Paid' : 'Settled'}
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
                  className={`px-5 py-2.5 rounded-full border font-bold text-xs flex items-center gap-2 transition-all ${
                    isDark
                      ? 'border-stone-700 bg-stone-800 text-stone-200 hover:bg-stone-700'
                      : 'border-stone-300 bg-white text-stone-800 hover:bg-stone-100 shadow-sm'
                  }`}
                >
                  <CalendarDays className="w-4 h-4 text-[#dfc299]" />
                  <span>Reschedule</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCancelModalOpen(true)}
                  className="px-5 py-2.5 rounded-full border border-rose-500/40 text-rose-500 font-bold text-xs hover:bg-rose-500/10 transition-all flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>Cancel Reservation</span>
                </button>

                <Link
                  to="/appointment-automation/dashboard"
                  className="ml-auto px-6 py-2.5 rounded-full neu-gold-btn font-bold text-xs uppercase tracking-wider flex items-center gap-2"
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
                  className="px-5 py-2.5 rounded-full font-bold neu-gold-btn text-xs uppercase tracking-wider"
                >
                  Create Another Booking
                </Link>
              </div>
            )}
          </div>

          {/* Right Card: What Happens Next? Timeline (Matching Panel 4 right) */}
          <div
            className={`lg:col-span-5 rounded-3xl p-6 sm:p-8 space-y-6 transition-all border ${
              isDark ? 'neu-raised border-[#c5a880]/20' : 'neu-raised border-[#c5a880]/30'
            }`}
          >
            <h3 className="text-xl font-classic-serif font-normal pb-3 border-b border-stone-200/40 dark:border-stone-800 flex items-center gap-2">
              <BellRing className="w-5 h-5 text-[#dfc299]" />
              <span>What Happens Next?</span>
            </h3>

            {/* Timeline Events List */}
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-stone-300 dark:before:bg-stone-700">
              {/* Event 1: Confirmation */}
              <div className="relative flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#dfc299] to-[#c5a880] text-[#0c0a09] flex items-center justify-center shrink-0 ring-4 ring-[#0c0a09] dark:ring-[#161311] shadow-sm">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">Confirmation Dispatched</span>
                    <span className="text-[10px] text-[#dfc299] bg-[#c5a880]/20 font-bold px-2 py-0.5 rounded-full border border-[#c5a880]/30">
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
                <div className="w-7 h-7 rounded-full bg-stone-700 text-[#dfc299] flex items-center justify-center shrink-0 ring-4 ring-[#0c0a09] dark:ring-[#161311] shadow-sm">
                  <BellRing className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">Reminder Trigger</span>
                    <span className="text-[10px] text-stone-400 bg-stone-800 font-bold px-2 py-0.5 rounded-full">
                      24 hours before
                    </span>
                  </div>
                  <p className="text-xs opacity-70 mt-1 leading-relaxed">
                    You will receive an automated concierge check-in reminder with direct 1-tap reschedule or cancel options (simulated).
                  </p>
                </div>
              </div>

              {/* Event 3: Reminder 1h before */}
              <div className="relative flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-stone-700 text-[#dfc299] flex items-center justify-center shrink-0 ring-4 ring-[#0c0a09] dark:ring-[#161311] shadow-sm">
                  <BellRing className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">Final Arrival Notice</span>
                    <span className="text-[10px] text-stone-400 bg-stone-800 font-bold px-2 py-0.5 rounded-full">
                      1 hour before
                    </span>
                  </div>
                  <p className="text-xs opacity-70 mt-1 leading-relaxed">
                    You will receive a final reminder notification with valet/entry details (simulated).
                  </p>
                </div>
              </div>
            </div>

            {/* Notice Callout */}
            <div
              className={`rounded-2xl p-4 border text-xs space-y-2 ${
                isDark ? 'bg-[#151210] border-[#c5a880]/20' : 'bg-[#f5efe6] border-[#c5a880]/30'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-[#dfc299]">
                <Info className="w-4 h-4" />
                <span>Simulated Experience Notice</span>
              </div>
              <p className="opacity-70 leading-relaxed">
                This is a simulated booking. No real messages or SMS fees have been dispatched. Built by{' '}
                <a
                  href="https://dawnexus.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#dfc299] hover:underline"
                >
                  Dawnexus
                </a>{' '}
                showcase ecosystem.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/appointment-automation/demo"
                className={`w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border ${
                  isDark
                    ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700'
                    : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300 shadow-sm'
                }`}
              >
                <span>Reserve Another Service</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      {rescheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div
            className={`rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border space-y-5 ${
              isDark ? 'bg-[#161311] border-[#c5a880]/30 text-[#faf7f2]' : 'bg-[#faf7f2] border-[#c5a880]/40 text-[#1a1614]'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/40 dark:border-stone-800">
              <h3 className="text-xl font-classic-serif font-normal">Reschedule Appointment</h3>
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
                    isDark ? 'bg-[#100e0c] border-[#c5a880]/30 text-white' : 'bg-white border-stone-300 text-stone-900'
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
                          ? 'bg-gradient-to-r from-[#dfc299] to-[#c5a880] text-[#0c0a09] shadow-sm'
                          : isDark
                          ? 'bg-[#151210] text-stone-300 hover:bg-stone-800'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200/40 dark:border-stone-800">
              <button
                type="button"
                onClick={() => setRescheduleModalOpen(false)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border ${
                  isDark ? 'border-stone-700 text-stone-400' : 'border-stone-300 text-stone-600'
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteReschedule}
                className="px-5 py-2.5 rounded-full font-bold neu-gold-btn text-xs uppercase tracking-wider shadow-md"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div
            className={`rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border space-y-4 ${
              isDark ? 'bg-[#161311] border-stone-700 text-white' : 'bg-white border-stone-200 text-stone-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-classic-serif font-normal">Cancel Reservation?</h3>
                <p className="text-xs opacity-60">Folio {currentApp.bookingReference}</p>
              </div>
            </div>

            <p className="text-xs opacity-80 leading-relaxed">
              Are you sure you want to cancel this booking? The slot will be freed in the simulated schedule, and the waitlist simulation will check if waiting customers are eligible to receive an automatic slot offer!
            </p>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setCancelModalOpen(false)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border ${
                  isDark ? 'border-stone-700 text-stone-400' : 'border-stone-300 text-stone-600'
                }`}
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={handleExecuteCancel}
                className="px-5 py-2.5 rounded-full font-bold bg-rose-600 hover:bg-rose-700 text-white text-xs shadow-md shadow-rose-600/20"
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
