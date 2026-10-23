import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  Star,
  CreditCard,
  Sparkles,
  Info,
  AlertCircle,
  CalendarCheck,
  UserCheck,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { INDUSTRY_PRESETS } from '../../data/presets'
import { IndustryId } from '../../types'
import confetti from 'canvas-confetti'
import {
  SkeletonServicesList,
  SkeletonStaffList,
  SkeletonCalendarSlots,
} from '../common/Skeletons'

export const BookingDemo: React.FC = () => {
  const navigate = useNavigate()
  const {
    currentIndustryId,
    setIndustry,
    currentIndustry,
    bookAppointment,
    getAvailableSlots,
    getStaffAvailabilityStatus,
    getAlternativeStaff,
    theme,
  } = useApp()

  const isDark = theme === 'dark'

  const [currentStep, setCurrentStep] = useState<number>(1) // 1: Service, 2: Staff, 3: Date & Time, 4: Details, 5: Confirm
  const [isStepLoading, setIsStepLoading] = useState<boolean>(false)

  // Selection states
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    currentIndustry.services[0]?.id || ''
  )
  const [selectedStaffId, setSelectedStaffId] = useState<string>(
    currentIndustry.staff[0]?.id || ''
  )
  const [selectedDate, setSelectedDate] = useState<string>('2025-03-12')
  const [selectedTime, setSelectedTime] = useState<string>('11:30 AM')

  // Customer Form
  const [customerName, setCustomerName] = useState<string>('Jessica Reynolds')
  const [customerEmail, setCustomerEmail] = useState<string>('jessica.r@example.com')
  const [customerPhone, setCustomerPhone] = useState<string>('+1 (555) 234-5678')
  const [customerNotes, setCustomerNotes] = useState<string>('First visit, excited for a fresh cut!')
  const [isDepositOnly, setIsDepositOnly] = useState<boolean>(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Current selections resolved
  const selectedService =
    currentIndustry.services.find((s) => s.id === selectedServiceId) || currentIndustry.services[0]
  const selectedStaff =
    currentIndustry.staff.find((s) => s.id === selectedStaffId) || currentIndustry.staff[0]

  const availableSlots = getAvailableSlots(
    selectedDate,
    selectedStaff?.id,
    selectedService?.durationMinutes
  )

  // Auto-adjust selectedTime if current time is not available in new slots
  useEffect(() => {
    if (availableSlots.length > 0 && !availableSlots.includes(selectedTime)) {
      setSelectedTime(availableSlots[0])
    }
  }, [availableSlots, selectedTime])

  const handleStepChange = (targetStep: number) => {
    setIsStepLoading(true)
    setCurrentStep(targetStep)
    setTimeout(() => {
      setIsStepLoading(false)
    }, 380)
  }

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value as IndustryId
    setIsStepLoading(true)
    setIndustry(newId)
    const newPreset = INDUSTRY_PRESETS[newId]
    if (newPreset) {
      setSelectedServiceId(newPreset.services[0]?.id || '')
      setSelectedStaffId(newPreset.staff[0]?.id || '')
    }
    setTimeout(() => {
      setIsStepLoading(false)
    }, 400)
  }

  const validateStep4 = (): boolean => {
    const errors: Record<string, string> = {}
    if (!customerName.trim()) errors.name = 'Please provide your full name.'
    if (!customerEmail.trim() || !customerEmail.includes('@'))
      errors.email = 'Please provide a valid email address.'
    if (!customerPhone.trim() || customerPhone.length < 7)
      errors.phone = 'Please provide a valid contact number.'
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNext = () => {
    if (currentStep === 4) {
      if (!validateStep4()) return
    }
    if (currentStep < 5) {
      handleStepChange(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      handleStepChange(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleConfirmBooking = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      const app = bookAppointment({
        serviceId: selectedService.id,
        staffId: selectedStaff.id,
        date: selectedDate,
        time: selectedTime,
        customer: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          notes: customerNotes,
        },
        isDepositOnly,
      })

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#a3e635', '#4ade80', '#ffffff'],
        })
      } catch (e) {
        console.log(e)
      }

      setIsSubmitting(false)
      navigate('/appointment-automation/demo/confirmation', { state: { appointment: app } })
    }, 400)
  }

  const steps = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'Staff' },
    { num: 3, label: 'Date & Time' },
    { num: 4, label: 'Details' },
    { num: 5, label: 'Confirm' },
  ]

  return (
    <div
      className={`min-h-screen pb-20 transition-colors duration-300 ${
        isDark ? 'bg-[#0b0f17] text-white' : 'bg-[#edf2f7] text-slate-900'
      }`}
    >
      {/* Top Banner indicating prototype */}
      <div
        className={`px-4 py-2 text-xs flex items-center justify-between border-b transition-colors ${
          isDark
            ? 'bg-[#111622] text-slate-300 border-slate-800'
            : 'bg-white text-slate-700 border-slate-200 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <span className="font-bold">Interactive Customer Booking Experience</span>
            <span className="opacity-70 hidden sm:inline">— Step {currentStep} of 5</span>
          </div>
          <button
            onClick={() => navigate('/appointment-automation/dashboard')}
            className="text-xs font-bold text-lime-600 dark:text-lime-400 hover:underline"
          >
            Switch to Business Dashboard &rarr;
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Stepper Navigation (Matching Panels 2 & 3 in screenshot) */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 z-0 ${
                isDark ? 'bg-slate-800' : 'bg-slate-300'
              }`}
            />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-lime-500 transition-all duration-300 z-0"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((st) => {
              const isPassed = currentStep > st.num
              const isCurrent = currentStep === st.num
              return (
                <div key={st.num} className="relative z-10 flex flex-col items-center">
                  <button
                    onClick={() => {
                      if (st.num < currentStep) handleStepChange(st.num)
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all interactive-scale ${
                      isCurrent
                        ? 'bg-slate-950 text-lime-400 ring-4 ring-lime-400/40 shadow-lg'
                        : isPassed
                        ? 'bg-lime-500 text-slate-950 shadow-sm'
                        : isDark
                        ? 'bg-slate-900 border-2 border-slate-700 text-slate-400'
                        : 'bg-white border-2 border-slate-300 text-slate-500 shadow-sm'
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="w-5 h-5 stroke-[2.5]" /> : st.num}
                  </button>
                  <span
                    className={`text-[11px] font-bold mt-2 ${
                      isCurrent
                        ? isDark
                          ? 'text-lime-400 font-extrabold'
                          : 'text-slate-900 font-extrabold'
                        : 'opacity-60'
                    }`}
                  >
                    {st.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Main 2-Column Content */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Active Step Selector */}
          <div
            className={`lg:col-span-8 rounded-3xl p-6 sm:p-8 transition-all ${
              isDark
                ? 'neu-raised'
                : 'neu-raised'
            }`}
          >
            {/* STEP 1: Choose a Service (Matching Panel 2 in screenshot) */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/40 dark:border-slate-800">
                  <div>
                    <h2 className="text-2xl font-extrabold">Choose a Service</h2>
                    <p className="text-sm opacity-70">Select a service for your appointment</p>
                  </div>
                  {/* Industry Preset Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold opacity-60">Industry:</span>
                    <select
                      value={currentIndustryId}
                      onChange={handleIndustryChange}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border focus:outline-none focus:ring-2 focus:ring-lime-400 cursor-pointer ${
                        isDark
                          ? 'bg-[#0f1724] border-slate-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900 shadow-sm'
                      }`}
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
                </div>

                {isStepLoading ? (
                  <SkeletonServicesList />
                ) : (
                  /* Service Cards List */
                  <div className="space-y-3">
                    {currentIndustry.services.map((service) => {
                      const isSelected = selectedServiceId === service.id
                      return (
                        <div
                          key={service.id}
                          onClick={() => setSelectedServiceId(service.id)}
                          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 interactive-lift ${
                            isSelected
                              ? isDark
                                ? 'border-lime-400 bg-lime-950/20 ring-2 ring-lime-400/30 shadow-md'
                                : 'border-lime-500 bg-lime-50/50 ring-2 ring-lime-400/30 shadow-md'
                              : isDark
                              ? 'bg-[#121927] border-slate-800 hover:border-slate-700'
                              : 'bg-white/80 border-slate-200 hover:border-slate-300 shadow-sm'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                                isSelected
                                  ? 'bg-lime-400 text-slate-950 shadow-md shadow-lime-500/20'
                                  : isDark
                                  ? 'bg-slate-800 text-slate-300'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold">{service.name}</h3>
                                {service.popular && (
                                  <span className="text-[10px] font-bold text-lime-700 dark:text-lime-300 bg-lime-100 dark:bg-lime-950/50 px-2 py-0.5 rounded-full border border-lime-400/30">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-xs opacity-70 mt-0.5 flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{service.durationMinutes} minutes</span>
                              </p>
                              <p className="text-xs opacity-80 mt-1 line-clamp-1">{service.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 shrink-0">
                            <span className="text-lg font-extrabold">${service.price}</span>
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                isSelected
                                  ? 'border-lime-400 bg-lime-400 text-slate-950'
                                  : isDark
                                  ? 'border-slate-600 bg-slate-900'
                                  : 'border-slate-300 bg-white'
                              }`}
                            >
                              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-slate-950" />}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: Select Staff Member */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold">Select Staff Member</h2>
                  <p className="text-sm opacity-70">
                    Choose your preferred professional from {currentIndustry.businessName}
                  </p>
                </div>

                {isStepLoading ? (
                  <SkeletonStaffList />
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {currentIndustry.staff.map((staff) => {
                      const isSelected = selectedStaffId === staff.id
                      const status = getStaffAvailabilityStatus(staff.id, selectedDate)

                      return (
                        <div
                          key={staff.id}
                          onClick={() => setSelectedStaffId(staff.id)}
                          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4 interactive-lift ${
                            isSelected
                              ? isDark
                                ? 'border-lime-400 bg-lime-950/20 ring-2 ring-lime-400/30 shadow-md'
                                : 'border-lime-500 bg-lime-50/50 ring-2 ring-lime-400/30 shadow-md'
                              : isDark
                              ? 'bg-[#121927] border-slate-800 hover:border-slate-700'
                              : 'bg-white/80 border-slate-200 hover:border-slate-300 shadow-sm'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-3">
                              <img
                                src={staff.avatar}
                                alt={staff.name}
                                className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-300 dark:border-slate-700 shadow-sm"
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="text-base font-bold truncate">{staff.name}</h3>
                                <p className="text-xs opacity-70 truncate">{staff.role}</p>
                                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-1">
                                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                                  <span>{staff.rating}</span>
                                  <span className="opacity-60 font-normal">({staff.reviewCount})</span>
                                </div>
                              </div>
                            </div>

                            {/* Dynamic Availability Status Badge */}
                            <div className="mt-3">
                              {status.status === 'on_leave' ? (
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                                  <AlertCircle className="w-3.5 h-3.5" />
                                  <span>{status.label} {status.reason ? `(${status.reason})` : ''}</span>
                                </span>
                              ) : status.status === 'busy' ? (
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>{status.label}</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-lime-500/15 text-lime-700 dark:text-lime-400 border border-lime-500/30">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>{status.label}</span>
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-200/40 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {staff.specialties.slice(0, 2).map((sp) => (
                                <span
                                  key={sp}
                                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                                  }`}
                                >
                                  {sp}
                                </span>
                              ))}
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                isSelected
                                  ? 'border-lime-400 bg-lime-400 text-slate-950'
                                  : isDark
                                  ? 'border-slate-600 bg-slate-900'
                                  : 'border-slate-300 bg-white'
                              }`}
                            >
                              {isSelected && <div className="w-2 rounded-full bg-slate-950 h-2" />}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Select Date & Time (Matching Panel 3 in screenshot) */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold">Select Date & Time</h2>
                  <p className="text-sm opacity-70">
                    Choose your preferred appointment slot with {selectedStaff.name}
                  </p>
                </div>

                {isStepLoading ? (
                  <SkeletonCalendarSlots />
                ) : (
                  <>
                    {/* If selected staff has leave on selectedDate */}
                    {(() => {
                      const staffStatus = getStaffAvailabilityStatus(selectedStaff.id, selectedDate)
                      if (staffStatus.status === 'on_leave') {
                        const alternatives = getAlternativeStaff(selectedDate, selectedStaff.id)
                        return (
                          <div className="p-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 dark:bg-rose-500/15 text-slate-800 dark:text-rose-200 space-y-3">
                            <div className="flex items-start gap-3">
                              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                              <div>
                                <h4 className="text-sm font-bold">
                                  {selectedStaff.name} is on leave on March {selectedDate.split('-')[2]}, 2025
                                </h4>
                                <p className="text-xs opacity-90 mt-0.5">
                                  Reason: {staffStatus.reason || 'Scheduled leave'}. Choose another date on the calendar, or switch to an available specialist below:
                                </p>
                              </div>
                            </div>

                            {alternatives.length > 0 && (
                              <div className="pt-2 border-t border-rose-500/25 flex flex-wrap items-center gap-2">
                                <span className="text-xs font-bold text-rose-900 dark:text-rose-300">
                                  Available specialists today:
                                </span>
                                {alternatives.map((alt) => (
                                  <button
                                    key={alt.id}
                                    type="button"
                                    onClick={() => {
                                      setSelectedStaffId(alt.id)
                                      const newSlots = getAvailableSlots(
                                        selectedDate,
                                        alt.id,
                                        selectedService.durationMinutes
                                      )
                                      if (newSlots.length > 0) setSelectedTime(newSlots[0])
                                    }}
                                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 hover:border-lime-400 shadow-sm transition-all flex items-center gap-1.5 interactive-scale"
                                  >
                                    <UserCheck className="w-3.5 h-3.5 text-lime-500" />
                                    <span>Switch to {alt.name}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      }
                      return null
                    })()}

                    <div className="grid md:grid-cols-12 gap-6 items-start">
                      {/* Calendar Widget */}
                      <div
                        className={`md:col-span-6 p-5 rounded-2xl border ${
                          isDark ? 'bg-[#0f1624] border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-bold flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-lime-500" />
                            March 2025
                          </span>
                          <span className="text-xs opacity-60 font-semibold">Standard Hours</span>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold opacity-40 mb-2">
                          <span>Mon</span>
                          <span>Tue</span>
                          <span>Wed</span>
                          <span>Thu</span>
                          <span>Fri</span>
                          <span>Sat</span>
                          <span>Sun</span>
                        </div>

                        {/* Days matrix */}
                        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold">
                          <span className="p-2 opacity-25">24</span>
                          <span className="p-2 opacity-25">25</span>
                          <span className="p-2 opacity-25">26</span>
                          <span className="p-2 opacity-25">27</span>
                          <span className="p-2 opacity-25">28</span>
                          <span className="p-2">1</span>
                          <span className="p-2">2</span>
                          <span className="p-2">3</span>
                          <span className="p-2">4</span>
                          <span className="p-2">5</span>
                          <span className="p-2">6</span>
                          <span className="p-2">7</span>
                          <span className="p-2">8</span>
                          <span className="p-2">9</span>
                          <span className="p-2">10</span>
                          <span className="p-2">11</span>

                          {/* Selectable Days */}
                          {[12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28].map(
                            (day) => {
                              const dateStr = `2025-03-${String(day).padStart(2, '0')}`
                              const isSelected = selectedDate === dateStr
                              return (
                                <button
                                  key={day}
                                  type="button"
                                  onClick={() => setSelectedDate(dateStr)}
                                  className={`p-2 rounded-xl transition-all cursor-pointer font-bold interactive-scale ${
                                    isSelected
                                      ? 'bg-lime-400 text-slate-950 shadow-md shadow-lime-500/30 ring-2 ring-lime-400/40'
                                      : isDark
                                      ? 'hover:bg-slate-800 text-slate-200'
                                      : 'hover:bg-slate-200 text-slate-800'
                                  }`}
                                >
                                  {day}
                                </button>
                              )
                            }
                          )}
                        </div>
                      </div>

                      {/* Available Times Slot Grid (Tactile Neumorphic recessed buttons) */}
                      <div className="md:col-span-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold">Available Times</h4>
                          <span className="text-xs font-bold text-lime-700 dark:text-lime-400 bg-lime-400/15 px-2 py-0.5 rounded-full">
                            {availableSlots.length} open slots
                          </span>
                        </div>

                        {availableSlots.length > 0 ? (
                          <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                            {availableSlots.map((slot) => {
                              const isSelected = selectedTime === slot
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setSelectedTime(slot)}
                                  className={`py-3 px-3 rounded-xl text-xs font-bold transition-all text-center interactive-scale ${
                                    isSelected
                                      ? 'bg-lime-400 text-slate-950 shadow-md shadow-lime-500/35 ring-2 ring-lime-400/50'
                                      : isDark
                                      ? 'bg-[#0e1420] text-slate-300 hover:bg-slate-800 border border-slate-800'
                                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                                  }`}
                                >
                                  {slot}
                                </button>
                              )
                            })}
                          </div>
                        ) : (
                          <div className="text-center py-10 px-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 space-y-2">
                            <Clock className="w-8 h-8 mx-auto text-amber-500/70" />
                            <p className="text-xs font-bold">No slots open on this date</p>
                            <p className="text-[11px] opacity-60">
                              Please choose another date above or select another specialist.
                            </p>
                          </div>
                        )}

                        <p className="text-[11px] opacity-60 pt-2 flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 text-lime-500" />
                          <span>Slots calculated with 10m buffer to avoid overlapping schedules.</span>
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* STEP 4: Customer Details */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold">Your Contact Details</h2>
                  <p className="text-sm opacity-70">
                    We will dispatch simulated confirmation and reminders to these contact coordinates.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold opacity-80 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Jessica Reynolds"
                      className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-lime-400 transition-all ${
                        isDark
                          ? 'bg-[#0d131f] border-slate-700 text-white placeholder-slate-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                    {validationErrors.name && (
                      <p className="text-xs text-rose-500 mt-1 font-semibold">{validationErrors.name}</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold opacity-80 mb-1">
                        Email Address (for calendar sync) *
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="jessica@example.com"
                        className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-lime-400 transition-all ${
                          isDark
                            ? 'bg-[#0d131f] border-slate-700 text-white placeholder-slate-500'
                            : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                      {validationErrors.email && (
                        <p className="text-xs text-rose-500 mt-1 font-semibold">
                          {validationErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold opacity-80 mb-1">
                        Mobile Phone (for SMS alerts) *
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+1 (555) 234-5678"
                        className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-lime-400 transition-all ${
                          isDark
                            ? 'bg-[#0d131f] border-slate-700 text-white placeholder-slate-500'
                            : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                      {validationErrors.phone && (
                        <p className="text-xs text-rose-500 mt-1 font-semibold">
                          {validationErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold opacity-80 mb-1">
                      Special Requests / Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      placeholder="Any preferences, allergies, or questions..."
                      className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-lime-400 transition-all ${
                        isDark
                          ? 'bg-[#0d131f] border-slate-700 text-white placeholder-slate-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Review & Payment Simulation */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold">Review & Confirmation</h2>
                  <p className="text-sm opacity-70">
                    Verify appointment parameters and select simulated billing preferences.
                  </p>
                </div>

                {/* Summary Card */}
                <div
                  className={`p-5 rounded-2xl border space-y-3 ${
                    isDark ? 'bg-[#0f1624] border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200/40 dark:border-slate-800">
                    <div>
                      <span className="text-xs font-semibold opacity-60">Selected Service</span>
                      <h4 className="text-base font-bold">{selectedService.name}</h4>
                    </div>
                    <span className="text-xl font-extrabold">${selectedService.price}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs opacity-90">
                    <div>
                      <span className="opacity-60 block">Professional</span>
                      <span className="font-bold">{selectedStaff.name}</span>
                    </div>
                    <div>
                      <span className="opacity-60 block">Date & Time</span>
                      <span className="font-bold">
                        {selectedDate} at {selectedTime}
                      </span>
                    </div>
                    <div>
                      <span className="opacity-60 block">Duration</span>
                      <span className="font-bold">{selectedService.durationMinutes} min</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Payment Selector */}
                <div
                  className={`p-5 rounded-2xl border-2 border-dashed space-y-4 ${
                    isDark ? 'border-slate-700 bg-[#0f1624]/60' : 'border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-lime-500" />
                      <h4 className="text-sm font-bold">Simulated Payment</h4>
                    </div>
                    <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded border border-amber-300">
                      Sandbox Mode (No Real Money)
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setIsDepositOnly(false)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        !isDepositOnly
                          ? 'border-lime-400 bg-lime-400/15 ring-2 ring-lime-400/30'
                          : isDark
                          ? 'border-slate-800 bg-[#121927]'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <span className="text-xs font-bold block">Full Payment</span>
                      <span className="text-base font-extrabold">${selectedService.price}.00</span>
                      <span className="text-[10px] opacity-60 block mt-0.5">
                        Pay full service amount now
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsDepositOnly(true)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isDepositOnly
                          ? 'border-lime-400 bg-lime-400/15 ring-2 ring-lime-400/30'
                          : isDark
                          ? 'border-slate-800 bg-[#121927]'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <span className="text-xs font-bold block">40% Deposit</span>
                      <span className="text-base font-extrabold">
                        ${Math.round(selectedService.price * 0.4)}.00
                      </span>
                      <span className="text-[10px] opacity-60 block mt-0.5">
                        Remaining balance due in person
                      </span>
                    </button>
                  </div>

                  <p className="text-[11px] opacity-60">
                    Simulated payment will register in the Business Dashboard and trigger an invoice receipt notification.
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Form Actions */}
            <div className="pt-6 mt-8 border-t border-slate-200/40 dark:border-slate-800 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className={`px-5 py-2.5 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition-all ${
                    isDark
                      ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 shadow-sm'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate('/appointment-automation')}
                  className={`px-5 py-2.5 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition-all ${
                    isDark
                      ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 shadow-sm'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Return to Landing</span>
                </button>
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  disabled={currentStep === 3 && availableSlots.length === 0}
                  onClick={handleNext}
                  className={`px-6 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all interactive-scale ${
                    currentStep === 3 && availableSlots.length === 0
                      ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
                      : 'bg-lime-400 hover:bg-lime-300 text-slate-950 shadow-md shadow-lime-500/25'
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleConfirmBooking}
                  className="px-7 py-3 rounded-xl font-extrabold bg-lime-400 hover:bg-lime-300 text-slate-950 text-sm shadow-xl shadow-lime-500/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <span>Processing Simulation...</span>
                  ) : (
                    <>
                      <span>Confirm Simulated Booking</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Right Column: "Your Booking" Summary Card (Matching Panel 2 right in screenshot) */}
          <div
            className={`lg:col-span-4 rounded-3xl p-6 sticky top-28 space-y-5 transition-all ${
              isDark ? 'neu-raised' : 'neu-raised'
            }`}
          >
            <h3 className="text-base font-bold pb-3 border-b border-slate-200/40 dark:border-slate-800">
              Your Booking
            </h3>

            {/* Thumbnail banner */}
            <div className="rounded-2xl overflow-hidden h-36 relative shadow-md">
              <img
                src={
                  currentIndustryId === 'salon'
                    ? 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80'
                    : currentIndustryId === 'clinic'
                    ? 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80'
                    : 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80'
                }
                alt="Business Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <div>
                  <p className="text-white font-extrabold text-sm">{currentIndustry.businessName}</p>
                  <p className="text-lime-300 text-[10px] font-bold">
                    {currentIndustry.categoryLabel}
                  </p>
                </div>
              </div>
            </div>

            {/* Parameter checklist */}
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lime-500 shrink-0 mt-0.5" />
                <div>
                  <span className="opacity-60 block text-[11px]">Service</span>
                  <span className="font-bold">{selectedService.name}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lime-500 shrink-0 mt-0.5" />
                <div>
                  <span className="opacity-60 block text-[11px]">Duration</span>
                  <span className="font-bold">{selectedService.durationMinutes} minutes</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lime-500 shrink-0 mt-0.5" />
                <div>
                  <span className="opacity-60 block text-[11px]">Price</span>
                  <span className="font-bold">
                    ${selectedService.price}.00{' '}
                    {isDepositOnly && (
                      <span className="text-[10px] text-lime-700 dark:text-lime-300 bg-lime-100 dark:bg-lime-950 px-1.5 py-0.5 rounded">
                        40% Deposit (${Math.round(selectedService.price * 0.4)})
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {currentStep >= 2 && (
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-lime-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="opacity-60 block text-[11px]">Professional</span>
                    <span className="font-bold">{selectedStaff.name}</span>
                  </div>
                </div>
              )}

              {currentStep >= 3 && (
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-lime-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="opacity-60 block text-[11px]">Schedule</span>
                    <span className="font-bold">
                      {selectedDate} at {selectedTime}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div
              className={`pt-3 border-t p-3 rounded-xl flex items-center justify-between text-xs ${
                isDark ? 'bg-[#0f1624] border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}
            >
              <span className="opacity-70 font-semibold">Estimated Total</span>
              <span className="font-black text-base text-lime-600 dark:text-lime-400">
                ${isDepositOnly ? Math.round(selectedService.price * 0.4) : selectedService.price}.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
