import React, { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Plus,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Appointment } from '../../types'

export const CalendarView: React.FC = () => {
  const { appointments, currentIndustry, rescheduleAppointment, cancelAppointment, bookAppointment, theme } =
    useApp()

  const isDark = theme === 'dark'

  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week')
  const [selectedStaffFilter, setSelectedStaffFilter] = useState<string>('all')
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  // Reschedule state
  const [isRescheduling, setIsRescheduling] = useState<boolean>(false)
  const [rescheduleDate, setRescheduleDate] = useState<string>('2025-03-14')
  const [rescheduleTime, setRescheduleTime] = useState<string>('02:00 PM')

  // Quick book modal state
  const [quickBookSlot, setQuickBookSlot] = useState<{ date: string; time: string } | null>(null)
  const [quickCustomerName, setQuickCustomerName] = useState<string>('Alex Morgan')
  const [quickCustomerEmail, setQuickCustomerEmail] = useState<string>('alex.m@example.com')
  const [quickCustomerPhone, setQuickCustomerPhone] = useState<string>('+1 (555) 789-0123')
  const [quickServiceId, setQuickServiceId] = useState<string>(currentIndustry.services[0]?.id || '')
  const [quickStaffId, setQuickStaffId] = useState<string>(currentIndustry.staff[0]?.id || '')

  const daysOfWeek = [
    { label: 'Mon', num: 10, date: '2025-03-10' },
    { label: 'Tue', num: 11, date: '2025-03-11' },
    { label: 'Wed', num: 12, date: '2025-03-12', isToday: true },
    { label: 'Thu', num: 13, date: '2025-03-13' },
    { label: 'Fri', num: 14, date: '2025-03-14' },
    { label: 'Sat', num: 15, date: '2025-03-15' },
    { label: 'Sun', num: 16, date: '2025-03-16' },
  ]

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
  ]

  // Filter appointments
  const filteredAppointments = appointments.filter((app) => {
    if (app.status === 'cancelled') return false
    if (selectedStaffFilter !== 'all' && app.staffId !== selectedStaffFilter) return false
    return true
  })

  const handleConfirmReschedule = () => {
    if (!selectedAppointment) return
    rescheduleAppointment(selectedAppointment.id, rescheduleDate, rescheduleTime)
    setIsRescheduling(false)
    setSelectedAppointment(null)
  }

  const handleConfirmCancel = () => {
    if (!selectedAppointment) return
    cancelAppointment(selectedAppointment.id)
    setSelectedAppointment(null)
  }

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault()
    if (!quickBookSlot) return

    bookAppointment({
      serviceId: quickServiceId,
      staffId: quickStaffId,
      date: quickBookSlot.date,
      time: quickBookSlot.time,
      customer: {
        name: quickCustomerName,
        email: quickCustomerEmail,
        phone: quickCustomerPhone,
        notes: 'Booked directly via interactive Calendar view',
      },
    })
    setQuickBookSlot(null)
  }

  return (
    <div className="space-y-6">
      {/* Calendar Toolbar (Matching Panel 6 in image) */}
      <div
        className={`p-4 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
          isDark ? 'neu-raised' : 'neu-raised'
        }`}
      >
        {/* Navigation Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {}}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 shadow-sm'
            }`}
          >
            Today
          </button>
          <div className="flex items-center gap-1">
            <button
              className={`p-1.5 rounded-lg border hover:opacity-100 opacity-70 ${
                isDark ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-300 hover:bg-slate-100'
              }`}
              aria-label="Previous week"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              className={`p-1.5 rounded-lg border hover:opacity-100 opacity-70 ${
                isDark ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-300 hover:bg-slate-100'
              }`}
              aria-label="Next week"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm font-extrabold tracking-tight">
            Mar 10 – 16, 2025
          </span>
        </div>

        {/* View Mode Toggle & Staff Filter */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Staff Filter Dropdown/Pills */}
          <div
            className={`flex items-center gap-1 p-1 rounded-xl text-xs font-bold border ${
              isDark ? 'bg-[#0f1724] border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              onClick={() => setSelectedStaffFilter('all')}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedStaffFilter === 'all'
                  ? isDark
                    ? 'bg-slate-800 text-lime-400 shadow-sm font-bold'
                    : 'bg-white text-slate-950 shadow-sm font-bold'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              All Staff
            </button>
            {currentIndustry.staff.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStaffFilter(st.id)}
                className={`px-3 py-1 rounded-lg transition-all hidden sm:inline ${
                  selectedStaffFilter === st.id
                    ? isDark
                      ? 'bg-slate-800 text-lime-400 shadow-sm font-bold'
                      : 'bg-white text-slate-950 shadow-sm font-bold'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                {st.name}
              </button>
            ))}
          </div>

          {/* Day / Week / Month Toggle */}
          <div
            className={`flex items-center gap-1 p-1 rounded-xl text-xs font-bold border ${
              isDark ? 'bg-[#0f1724] border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            {(['day', 'week', 'month'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-lg capitalize transition-all ${
                  viewMode === mode
                    ? 'bg-lime-400 text-slate-950 font-black shadow-sm'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Staff Availability & Leave Alert Banner */}
      <div className="p-3.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 dark:bg-amber-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
          <span className="font-bold text-amber-900 dark:text-amber-300">
            Availability Notice:
          </span>
          <span className="opacity-90">
            {currentIndustry.id === 'salon'
              ? 'Emma is on scheduled wellness leave on Wed Mar 12. Sarah has reserved slot 09:00–11:00 AM.'
              : currentIndustry.id === 'clinic'
              ? 'Dr. Elena Gomez is attending Medical Symposium on Mar 12.'
              : 'All staff schedules synchronized with automated buffer.'}
          </span>
        </div>
        <span className="text-[10px] font-semibold opacity-75 sm:text-right">
          Conflict prevention active
        </span>
      </div>

      {/* Main Calendar Matrix (Week View) */}
      <div
        className={`rounded-3xl border overflow-hidden transition-all ${
          isDark ? 'neu-raised' : 'neu-raised'
        }`}
      >
        {/* Days Header */}
        <div
          className={`grid grid-cols-8 border-b text-center text-xs font-bold ${
            isDark
              ? 'border-slate-800 bg-[#0e1420] text-slate-400'
              : 'border-slate-200 bg-slate-50 text-slate-600'
          }`}
        >
          <div className="py-3 px-2 border-r border-slate-200/40 dark:border-slate-800 opacity-60">
            EST
          </div>
          {daysOfWeek.map((d) => (
            <div
              key={d.date}
              className={`py-3 px-2 border-r border-slate-200/40 dark:border-slate-800 ${
                d.isToday
                  ? isDark
                    ? 'bg-lime-950/20 text-lime-300'
                    : 'bg-lime-50 text-lime-900'
                  : ''
              }`}
            >
              <span className="block text-[10px] opacity-60 uppercase tracking-wider">
                {d.label}
              </span>
              <span
                className={`inline-block mt-0.5 text-sm ${
                  d.isToday
                    ? 'w-6 h-6 rounded-full bg-lime-400 text-slate-950 font-black leading-6 shadow-sm shadow-lime-500/30'
                    : 'font-extrabold'
                }`}
              >
                {d.num}
              </span>
            </div>
          ))}
        </div>

        {/* Time Grid */}
        <div className="divide-y divide-slate-200/30 dark:divide-slate-800/60">
          {timeSlots.map((timeStr) => (
            <div key={timeStr} className="grid grid-cols-8 min-h-[72px]">
              {/* Left time label */}
              <div className="p-2 border-r border-slate-200/40 dark:border-slate-800 text-right text-[11px] font-bold opacity-50 select-none">
                {timeStr}
              </div>

              {/* 7 Days Columns */}
              {daysOfWeek.map((day) => {
                const matchingApps = filteredAppointments.filter((app) => {
                  if (app.date !== day.date) return false
                  const appHour = app.time.split(':')[0]
                  const appAmPm = app.time.split(' ')[1]
                  const slotHour = timeStr.split(':')[0]
                  const slotAmPm = timeStr.split(' ')[1]
                  return appHour === slotHour && appAmPm === slotAmPm
                })

                return (
                  <div
                    key={day.date}
                    onClick={() => {
                      if (matchingApps.length === 0) {
                        setQuickBookSlot({ date: day.date, time: timeStr })
                      }
                    }}
                    className={`p-1.5 border-r border-slate-200/30 dark:border-slate-800/60 relative group transition-colors cursor-pointer ${
                      day.isToday
                        ? isDark ? 'bg-lime-950/10' : 'bg-lime-50/25'
                        : isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'
                    }`}
                  >
                    {matchingApps.map((app) => (
                      <div
                        key={app.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedAppointment(app)
                        }}
                        className={`p-2 rounded-xl text-left border shadow-sm transition-all hover:scale-[1.02] cursor-pointer mb-1 ${
                          app.serviceName.includes('Colour')
                            ? 'bg-purple-500/20 border-purple-500/40 text-purple-800 dark:text-purple-300'
                            : app.serviceName.includes('Treatment')
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-800 dark:text-amber-300'
                            : app.serviceName.includes('Blow')
                            ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-800 dark:text-cyan-300'
                            : 'bg-lime-400/20 border-lime-400/50 text-lime-900 dark:text-lime-300'
                        }`}
                      >
                        <p className="font-extrabold text-xs leading-tight truncate">
                          {app.serviceName}
                        </p>
                        <p className="text-[10px] opacity-80 mt-0.5 truncate font-medium">
                          {app.staffName} • {app.time}
                        </p>
                      </div>
                    ))}

                    {matchingApps.length === 0 && (
                      <div className="hidden group-hover:flex items-center justify-center h-full opacity-30">
                        <Plus className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Detail & Actions Drawer/Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <div
            className={`rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border space-y-5 ${
              isDark ? 'bg-[#151d2a] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-lime-400" />
                <h3 className="text-lg font-bold">Appointment Details</h3>
              </div>
              <button
                onClick={() => {
                  setSelectedAppointment(null)
                  setIsRescheduling(false)
                }}
                className="opacity-50 hover:opacity-100 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {!isRescheduling ? (
              <div className="space-y-4 text-xs">
                <div
                  className={`p-4 rounded-2xl border space-y-2 ${
                    isDark ? 'bg-[#0e1420] border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="opacity-60">Booking Reference:</span>
                    <strong className="font-mono text-lime-600 dark:text-lime-400">
                      {selectedAppointment.bookingReference}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Service:</span>
                    <strong>{selectedAppointment.serviceName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Staff Assigned:</span>
                    <strong>{selectedAppointment.staffName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Date & Time:</span>
                    <strong>
                      {selectedAppointment.date} at {selectedAppointment.time}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Duration & Price:</span>
                    <strong>
                      {selectedAppointment.durationMinutes} min • ${selectedAppointment.price}.00
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Customer:</span>
                    <strong>
                      {selectedAppointment.customer.name} ({selectedAppointment.customer.phone})
                    </strong>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    onClick={handleConfirmCancel}
                    className="px-4 py-2 rounded-xl border border-rose-500/40 text-rose-500 font-bold hover:bg-rose-500/10"
                  >
                    Cancel Booking
                  </button>
                  <button
                    onClick={() => setIsRescheduling(true)}
                    className="px-5 py-2 rounded-xl bg-lime-400 font-extrabold text-slate-950 shadow-md shadow-lime-500/20"
                  >
                    Reschedule
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <p className="font-bold">Choose New Slot:</p>
                <div>
                  <label className="block opacity-70 mb-1">Date</label>
                  <input
                    type="date"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border font-semibold ${
                      isDark ? 'bg-[#0f1724] border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block opacity-70 mb-1">Time</label>
                  <select
                    value={rescheduleTime}
                    onChange={(e) => setRescheduleTime(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border font-semibold ${
                      isDark ? 'bg-[#0f1724] border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setIsRescheduling(false)}
                    className={`px-4 py-2 rounded-xl border ${
                      isDark ? 'border-slate-700 text-slate-400' : 'border-slate-300 text-slate-600'
                    }`}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirmReschedule}
                    className="px-5 py-2 rounded-xl bg-lime-400 font-bold text-slate-950 shadow-md"
                  >
                    Confirm Reschedule
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Booking Modal on Empty Calendar Slot */}
      {quickBookSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <form
            onSubmit={handleQuickBook}
            className={`rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border space-y-4 ${
              isDark ? 'bg-[#151d2a] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-slate-800">
              <h3 className="text-lg font-bold">Create Booking on Calendar</h3>
              <button
                type="button"
                onClick={() => setQuickBookSlot(null)}
                className="opacity-50 hover:opacity-100 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs opacity-70">
              Slot: <strong>{quickBookSlot.date} at {quickBookSlot.time}</strong>
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold opacity-80 mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  value={quickCustomerName}
                  onChange={(e) => setQuickCustomerName(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-[#0f1724] border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold opacity-80 mb-1">Customer Email</label>
                <input
                  type="email"
                  required
                  value={quickCustomerEmail}
                  onChange={(e) => setQuickCustomerEmail(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-[#0f1724] border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold opacity-80 mb-1">Customer Phone</label>
                <input
                  type="tel"
                  required
                  value={quickCustomerPhone}
                  onChange={(e) => setQuickCustomerPhone(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-[#0f1724] border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold opacity-80 mb-1">Service</label>
                <select
                  value={quickServiceId}
                  onChange={(e) => setQuickServiceId(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-[#0f1724] border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                  }`}
                >
                  {currentIndustry.services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (${s.price})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold opacity-80 mb-1">Staff Member</label>
                <select
                  value={quickStaffId}
                  onChange={(e) => setQuickStaffId(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-[#0f1724] border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                  }`}
                >
                  {currentIndustry.staff.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200/40 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setQuickBookSlot(null)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                  isDark ? 'border-slate-700 text-slate-400' : 'border-slate-300 text-slate-600'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-lime-400 hover:bg-lime-300 text-slate-950 shadow-md"
              >
                Save Appointment
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
