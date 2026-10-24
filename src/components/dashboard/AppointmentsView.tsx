import React, { useState } from 'react'
import {
  Search,
  Download,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Appointment } from '../../types'

export const AppointmentsView: React.FC = () => {
  const {
    appointments,
    exportAppointmentsCSV,
    rescheduleAppointment,
    cancelAppointment,
    currentIndustry,
    theme,
  } = useApp()

  const isDark = theme === 'dark'
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedStaffFilter, setSelectedStaffFilter] = useState<string>('all')
  const [selectedApp, setSelectedApp] = useState<Appointment | null>(null)

  // Reschedule state
  const [rescheduleOpen, setRescheduleOpen] = useState(false)
  const [newDate, setNewDate] = useState('2025-03-14')
  const [newTime, setNewTime] = useState('02:00 PM')

  const filteredAppointments = appointments.filter((app) => {
    if (statusFilter !== 'all' && app.status !== statusFilter) return false
    if (selectedStaffFilter !== 'all' && app.staffId !== selectedStaffFilter) return false
    if (searchTerm) {
      const q = searchTerm.toLowerCase()
      const matchName = app.customer.name.toLowerCase().includes(q)
      const matchRef = app.bookingReference.toLowerCase().includes(q)
      const matchService = app.serviceName.toLowerCase().includes(q)
      if (!matchName && !matchRef && !matchService) return false
    }
    return true
  })

  const handleReschedule = () => {
    if (!selectedApp) return
    rescheduleAppointment(selectedApp.id, newDate, newTime)
    setRescheduleOpen(false)
    setSelectedApp(null)
  }

  const handleCancel = (id: string) => {
    if (window.confirm('Cancel this appointment? This will trigger waitlist checking.')) {
      cancelAppointment(id)
      setSelectedApp(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header and CSV Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-3xl font-classic-serif font-normal tracking-tight">Appointments Management</h1>
          <p className="text-xs sm:text-sm opacity-60">
            View, search, reschedule, or cancel simulated bookings across your entire schedule.
          </p>
        </div>

        <button
          onClick={exportAppointmentsCSV}
          className="px-5 py-2.5 rounded-full text-xs font-bold neu-gold-btn uppercase tracking-wider flex items-center gap-2 self-start sm:self-auto shadow-md"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        className={`p-4 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 transition-all border ${
          isDark ? 'neu-raised border-[#c5a880]/20' : 'neu-raised border-[#c5a880]/30'
        }`}
      >
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer, ref, or service..."
            className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs font-bold border focus:outline-none focus:ring-2 focus:ring-[#c5a880] ${
              isDark ? 'bg-[#151210] border-stone-800 text-white' : 'bg-[#fbf9f5] border-stone-300 text-stone-900'
            }`}
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border focus:outline-none ${
              isDark ? 'bg-[#0e1420] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Staff Filter */}
          <select
            value={selectedStaffFilter}
            onChange={(e) => setSelectedStaffFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border focus:outline-none ${
              isDark ? 'bg-[#0e1420] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          >
            <option value="all">All Staff</option>
            {currentIndustry.staff.map((st) => (
              <option key={st.id} value={st.id}>
                {st.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div
        className={`rounded-3xl border overflow-hidden transition-all ${
          isDark ? 'neu-raised' : 'neu-raised'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr
                className={`border-b opacity-60 font-bold uppercase tracking-wider text-[10px] ${
                  isDark ? 'border-slate-800 bg-[#0e1420]' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <th className="py-3 px-4">Ref #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Staff</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/30 dark:divide-slate-800/60">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((app) => (
                  <tr
                    key={app.id}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-[#dfc299]">
                      {app.bookingReference}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold">{app.customer.name}</p>
                      <p className="text-[11px] opacity-60">{app.customer.phone}</p>
                    </td>
                    <td className="py-3.5 px-4 font-semibold">{app.serviceName}</td>
                    <td className="py-3.5 px-4 opacity-80">{app.staffName}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold">{app.date}</span>
                      <span className="text-[11px] opacity-60 block">{app.time}</span>
                    </td>
                    <td className="py-3.5 px-4 font-classic-serif font-normal text-lg text-[#dfc299]">
                      ${app.price}
                    </td>
                    <td className="py-3.5 px-4">
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
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className={`px-3 py-1 rounded-lg font-bold text-[11px] border transition-all ${
                          isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                            : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 shadow-sm'
                        }`}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center opacity-50">
                    No appointments matched your query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div
            className={`rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border space-y-5 ${
              isDark ? 'bg-[#151d2a] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-slate-800">
              <h3 className="text-lg font-bold">
                Booking #{selectedApp.bookingReference}
              </h3>
              <button
                onClick={() => {
                  setSelectedApp(null)
                  setRescheduleOpen(false)
                }}
                className="opacity-50 hover:opacity-100 font-bold"
              >
                ✕
              </button>
            </div>

            {!rescheduleOpen ? (
              <div className="space-y-4 text-xs">
                <div
                  className={`p-4 rounded-2xl border space-y-2 ${
                    isDark ? 'bg-[#0e1420] border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <p>
                    <span className="opacity-60">Customer:</span>{' '}
                    <strong>
                      {selectedApp.customer.name} ({selectedApp.customer.email})
                    </strong>
                  </p>
                  <p>
                    <span className="opacity-60">Service:</span>{' '}
                    <strong>{selectedApp.serviceName}</strong> ({selectedApp.durationMinutes} min)
                  </p>
                  <p>
                    <span className="opacity-60">Staff Assigned:</span>{' '}
                    <strong>{selectedApp.staffName}</strong>
                  </p>
                  <p>
                    <span className="opacity-60">Date & Time:</span>{' '}
                    <strong>
                      {selectedApp.date} at {selectedApp.time}
                    </strong>
                  </p>
                  <p>
                    <span className="opacity-60">Payment Status:</span>{' '}
                    <strong className="capitalize">{selectedApp.paymentStatus}</strong> ($
                    {selectedApp.paymentAmount}.00)
                  </p>
                  {selectedApp.customer.notes && (
                    <p>
                      <span className="opacity-60">Customer Notes:</span>{' '}
                      <em>{selectedApp.customer.notes}</em>
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3">
                  {selectedApp.status !== 'cancelled' && (
                    <button
                      onClick={() => handleCancel(selectedApp.id)}
                      className="px-4 py-2 rounded-xl border border-rose-500/40 text-rose-500 font-bold hover:bg-rose-500/10"
                    >
                      Cancel Booking
                    </button>
                  )}
                  <div className="flex items-center gap-2 ml-auto">
                    {selectedApp.status !== 'cancelled' && (
                      <button
                        onClick={() => setRescheduleOpen(true)}
                        className="px-5 py-2 rounded-full neu-gold-btn font-bold text-xs uppercase tracking-wider shadow-md"
                      >
                        Reschedule
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <p className="font-bold">Select Reschedule Target:</p>
                <div>
                  <label className="block opacity-70 mb-1">New Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border font-semibold ${
                      isDark ? 'bg-[#0f1724] border-stone-700 text-white' : 'bg-stone-50 border-stone-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block opacity-70 mb-1">New Time</label>
                  <select
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border font-semibold ${
                      isDark ? 'bg-[#0f1724] border-stone-700 text-white' : 'bg-stone-50 border-stone-300'
                    }`}
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setRescheduleOpen(false)}
                    className={`px-4 py-2 rounded-full border ${
                      isDark ? 'border-stone-700 text-stone-400' : 'border-stone-300 text-stone-600'
                    }`}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleReschedule}
                    className="px-5 py-2 rounded-full neu-gold-btn font-bold text-xs uppercase tracking-wider shadow-md"
                  >
                    Apply Reschedule
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
