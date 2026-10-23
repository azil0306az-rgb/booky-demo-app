import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  ThemeMode,
  IndustryId,
  IndustryPreset,
  StaffMember,
  Appointment,
  AutomationEvent,
  NotificationItem,
  Customer,
  WaitlistItem,
  PaymentRecord,
} from '../types'
import {
  INDUSTRY_PRESETS,
  SEED_APPOINTMENTS,
  SEED_EVENTS,
  INITIAL_CUSTOMERS,
  INITIAL_WAITLIST,
  SEED_PAYMENTS,
} from '../data/presets'

const STORAGE_KEY = 'bookly_demo_state_v1'
const THEME_STORAGE_KEY = 'bookly_theme'

interface BookingPayload {
  serviceId: string
  staffId: string
  date: string
  time: string
  customer: {
    name: string
    email: string
    phone: string
    notes?: string
  }
  isDepositOnly?: boolean
}

interface AppContextType {
  theme: ThemeMode
  setTheme: (t: ThemeMode) => void
  toggleTheme: () => void
  currentIndustryId: IndustryId
  currentIndustry: IndustryPreset
  setIndustry: (id: IndustryId) => void
  appointments: Appointment[]
  automationEvents: AutomationEvent[]
  notifications: NotificationItem[]
  customers: Customer[]
  waitlist: WaitlistItem[]
  payments: PaymentRecord[]
  lastCreatedAppointment: Appointment | null
  isDemoLoggedIn: boolean
  loginDemo: () => void
  logoutDemo: () => void
  bookAppointment: (payload: BookingPayload) => Appointment
  rescheduleAppointment: (appointmentId: string, newDate: string, newTime: string) => boolean
  cancelAppointment: (appointmentId: string) => boolean
  acceptWaitlistOffer: (waitlistId: string) => void
  declineWaitlistOffer: (waitlistId: string) => void
  simulatePaymentAction: (invoiceId: string, status: 'successful' | 'failed') => void
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  resetDemo: () => void
  exportAppointmentsCSV: () => void
  getAvailableSlots: (date: string, staffId?: string, serviceDurationMinutes?: number) => string[]
  getStaffAvailabilityStatus: (
    staffId: string,
    date: string
  ) => {
    status: 'available' | 'on_leave' | 'busy' | 'fully_booked'
    label: string
    reason?: string
    nextAvailableSlot?: string
  }
  getAlternativeStaff: (date: string, excludeStaffId: string) => StaffMember[]
}

const AppContext = createContext<AppContextType | null>(null)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light'
      }
    } catch {
      // fallback
    }
    return 'dark'
  })

  const [currentIndustryId, setCurrentIndustryId] = useState<IndustryId>('salon')
  const [appointments, setAppointments] = useState<Appointment[]>(SEED_APPOINTMENTS)
  const [automationEvents, setAutomationEvents] = useState<AutomationEvent[]>(SEED_EVENTS)
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Booking Confirmed (Simulated SMS)',
      message: 'Hi Jessica, your Hair Cut & Style appointment with Sarah is confirmed for Mar 12 at 10:00 AM. Ref: BK-250312-001',
      channel: 'sms',
      timestamp: '2 min ago',
      read: false,
      appointmentReference: 'BK-250312-001',
      type: 'confirmed',
    },
    {
      id: 'notif-2',
      title: 'Reminder Sequence Initialized (Simulated Email)',
      message: 'Email confirmation sent with calendar sync link (.ics) and 24h/1h automated reminder rules attached.',
      channel: 'email',
      timestamp: '2 min ago',
      read: false,
      appointmentReference: 'BK-250312-001',
      type: 'reminder',
    },
  ])
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS)
  const [waitlist, setWaitlist] = useState<WaitlistItem[]>(INITIAL_WAITLIST)
  const [payments, setPayments] = useState<PaymentRecord[]>(SEED_PAYMENTS)
  const [lastCreatedAppointment, setLastCreatedAppointment] = useState<Appointment | null>(SEED_APPOINTMENTS[0])
  const [isDemoLoggedIn, setIsDemoLoggedIn] = useState<boolean>(true)

  // Apply theme to document element and body
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(theme)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // ignore
    }
  }, [theme])

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme)
  }

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  // Safe load from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === 'object') {
          if (parsed.currentIndustryId && INDUSTRY_PRESETS[parsed.currentIndustryId]) {
            setCurrentIndustryId(parsed.currentIndustryId)
          }
          if (Array.isArray(parsed.appointments)) setAppointments(parsed.appointments)
          if (Array.isArray(parsed.automationEvents)) setAutomationEvents(parsed.automationEvents)
          if (Array.isArray(parsed.notifications)) setNotifications(parsed.notifications)
          if (Array.isArray(parsed.customers)) setCustomers(parsed.customers)
          if (Array.isArray(parsed.waitlist)) setWaitlist(parsed.waitlist)
          if (Array.isArray(parsed.payments)) setPayments(parsed.payments)
          if (parsed.lastCreatedAppointment) setLastCreatedAppointment(parsed.lastCreatedAppointment)
          if (typeof parsed.isDemoLoggedIn === 'boolean') setIsDemoLoggedIn(parsed.isDemoLoggedIn)
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using initial mock state', e)
    }
  }, [])

  // Persist state updates
  useEffect(() => {
    try {
      const stateToPersist = {
        currentIndustryId,
        appointments,
        automationEvents,
        notifications,
        customers,
        waitlist,
        payments,
        lastCreatedAppointment,
        isDemoLoggedIn,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist))
    } catch (e) {
      console.warn('Could not persist to localStorage', e)
    }
  }, [
    currentIndustryId,
    appointments,
    automationEvents,
    notifications,
    customers,
    waitlist,
    payments,
    lastCreatedAppointment,
    isDemoLoggedIn,
  ])

  const currentIndustry = INDUSTRY_PRESETS[currentIndustryId] || INDUSTRY_PRESETS.salon

  const setIndustry = (id: IndustryId) => {
    if (INDUSTRY_PRESETS[id]) {
      setCurrentIndustryId(id)
      // Log an event for switching industry
      const newEvt: AutomationEvent = {
        id: `evt-ind-${Date.now()}`,
        type: 'staff',
        title: `Switched Preset to ${INDUSTRY_PRESETS[id].name}`,
        timestamp: 'Just now',
        status: 'completed',
        explanation: `Loaded specialized services, staff schedules, and terminology for ${INDUSTRY_PRESETS[id].categoryLabel}.`,
      }
      setAutomationEvents((prev) => [newEvt, ...prev])
    }
  }

  // Helper to convert time strings ("09:00 AM", "13:00", "1:30 PM", etc.) to minutes from midnight
  const parseTimeToMinutes = (timeStr: string): number => {
    if (!timeStr) return 0
    const clean = timeStr.trim().toUpperCase()
    const is12Hour = clean.includes('AM') || clean.includes('PM')

    if (is12Hour) {
      const isPM = clean.includes('PM')
      const timeOnly = clean.replace(/AM|PM/g, '').trim()
      const [hoursStr, minsStr = '0'] = timeOnly.split(':')
      let h = parseInt(hoursStr, 10)
      const m = parseInt(minsStr, 10) || 0
      if (isPM && h < 12) h += 12
      if (!isPM && h === 12) h = 0
      return h * 60 + m
    } else {
      const [hoursStr, minsStr = '0'] = clean.split(':')
      const h = parseInt(hoursStr, 10) || 0
      const m = parseInt(minsStr, 10) || 0
      return h * 60 + m
    }
  }

  // Calculate available slots taking into account staff working hours, breaks, busy periods, and leaves
  const getAvailableSlots = (date: string, staffId?: string, serviceDurationMinutes = 45): string[] => {
    const defaultSlots = [
      '09:00 AM',
      '09:30 AM',
      '10:00 AM',
      '10:30 AM',
      '11:00 AM',
      '11:30 AM',
      '01:00 PM',
      '01:30 PM',
      '02:00 PM',
      '02:30 PM',
      '03:00 PM',
      '03:30 PM',
      '04:00 PM',
      '04:30 PM',
    ]

    // If staff is specified, check their specific availability rules
    if (staffId) {
      const staffMember = currentIndustry.staff.find((s) => s.id === staffId)
      if (staffMember) {
        // 1. Check day of week schedule
        const dayOfWeek = new Date(date + 'T12:00:00').getDay()
        if (staffMember.availableDays && !staffMember.availableDays.includes(dayOfWeek)) {
          return []
        }

        // 2. Check full-day leave
        const fullLeave = staffMember.leaves?.find((l) => l.date === date && l.type === 'full')
        if (fullLeave) {
          return []
        }

        const workStart = parseTimeToMinutes(staffMember.workingHours?.start || '09:00')
        const workEnd = parseTimeToMinutes(staffMember.workingHours?.end || '18:00')

        // 3. Filter default slots
        return defaultSlots.filter((slot) => {
          const slotStart = parseTimeToMinutes(slot)
          const slotEnd = slotStart + serviceDurationMinutes

          // Must be within working hours
          if (slotStart < workStart || slotEnd > workEnd) {
            return false
          }

          // Check breaks (e.g. 12:00-13:00 lunch)
          if (staffMember.breaks) {
            for (const brk of staffMember.breaks) {
              const bStart = parseTimeToMinutes(brk.start)
              const bEnd = parseTimeToMinutes(brk.end)
              if (Math.max(slotStart, bStart) < Math.min(slotEnd, bEnd)) {
                return false
              }
            }
          }

          // Check partial leave on this date
          if (staffMember.leaves) {
            const partialLeave = staffMember.leaves.find(
              (l) => l.date === date && l.type === 'partial' && l.startTime && l.endTime
            )
            if (partialLeave && partialLeave.startTime && partialLeave.endTime) {
              const lStart = parseTimeToMinutes(partialLeave.startTime)
              const lEnd = parseTimeToMinutes(partialLeave.endTime)
              if (Math.max(slotStart, lStart) < Math.min(slotEnd, lEnd)) {
                return false
              }
            }
          }

          // Check busy periods on this date (e.g. Sarah busy 09:00-11:00 on 2025-03-12)
          if (staffMember.busyPeriods) {
            for (const busy of staffMember.busyPeriods) {
              if (busy.date === date) {
                const bStart = parseTimeToMinutes(busy.start)
                const bEnd = parseTimeToMinutes(busy.end)
                if (Math.max(slotStart, bStart) < Math.min(slotEnd, bEnd)) {
                  return false
                }
              }
            }
          }

          // Check existing active booked appointments for this staff on this date
          const hasConflict = appointments.some(
            (app) =>
              app.date === date &&
              app.staffId === staffId &&
              app.status !== 'cancelled' &&
              (() => {
                const appStart = parseTimeToMinutes(app.time)
                const appEnd = appStart + (app.durationMinutes || 45)
                return Math.max(slotStart, appStart) < Math.min(slotEnd, appEnd)
              })()
          )

          return !hasConflict
        })
      }
    }

    // If no staff specified or fallback, filter based on existing appointments
    const bookedTimes = appointments
      .filter((app) => app.date === date && app.status !== 'cancelled')
      .map((app) => app.time)

    return defaultSlots.filter((slot) => !bookedTimes.includes(slot))
  }

  const getStaffAvailabilityStatus = (
    staffId: string,
    date: string
  ): {
    status: 'available' | 'on_leave' | 'busy' | 'fully_booked'
    label: string
    reason?: string
    nextAvailableSlot?: string
  } => {
    const staffMember = currentIndustry.staff.find((s) => s.id === staffId)
    if (!staffMember) return { status: 'available', label: 'Available' }

    // Check full-day leave
    const fullLeave = staffMember.leaves?.find((l) => l.date === date && l.type === 'full')
    if (fullLeave) {
      return {
        status: 'on_leave',
        label: 'On leave today',
        reason: fullLeave.reason || 'Approved leave',
      }
    }

    // Check day of week
    const dayOfWeek = new Date(date + 'T12:00:00').getDay()
    if (staffMember.availableDays && !staffMember.availableDays.includes(dayOfWeek)) {
      return {
        status: 'on_leave',
        label: 'Off duty today',
        reason: 'Not scheduled on this day',
      }
    }

    const slots = getAvailableSlots(date, staffId)
    if (slots.length === 0) {
      return {
        status: 'fully_booked',
        label: 'Fully booked today',
        reason: 'All slots taken',
      }
    }

    // Check if staff has busy period today
    const busyPeriod = staffMember.busyPeriods?.find((b) => b.date === date)
    if (busyPeriod) {
      return {
        status: 'busy',
        label: `Next available: ${slots[0]}`,
        reason: busyPeriod.reason,
        nextAvailableSlot: slots[0],
      }
    }

    return {
      status: 'available',
      label: 'Available today',
      nextAvailableSlot: slots[0],
    }
  }

  const getAlternativeStaff = (date: string, excludeStaffId: string): StaffMember[] => {
    return currentIndustry.staff.filter((s) => {
      if (s.id === excludeStaffId) return false
      const status = getStaffAvailabilityStatus(s.id, date)
      return status.status === 'available' || status.status === 'busy'
    })
  }

  const bookAppointment = (payload: BookingPayload): Appointment => {
    const service =
      currentIndustry.services.find((s) => s.id === payload.serviceId) || currentIndustry.services[0]
    const staff =
      currentIndustry.staff.find((s) => s.id === payload.staffId) || currentIndustry.staff[0]

    // Create unique reference
    const now = new Date()
    const yy = String(now.getFullYear()).slice(-2)
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const seq = String(appointments.length + 1).padStart(3, '0')
    const bookingReference = `BK-${yy}${mm}${dd}-${seq}`

    const price = service.price
    const paymentAmount = payload.isDepositOnly ? Math.round(price * 0.4) : price

    const newAppointment: Appointment = {
      id: `app-${Date.now()}`,
      bookingReference,
      industryId: currentIndustryId,
      serviceId: service.id,
      serviceName: service.name,
      staffId: staff.id,
      staffName: staff.name,
      date: payload.date,
      time: payload.time,
      durationMinutes: service.durationMinutes,
      price,
      customer: {
        id: `cust-${Date.now()}`,
        name: payload.customer.name,
        email: payload.customer.email,
        phone: payload.customer.phone,
        notes: payload.customer.notes,
      },
      status: 'confirmed',
      paymentStatus: payload.isDepositOnly ? 'deposit_paid' : 'paid',
      paymentAmount,
      isDepositOnly: payload.isDepositOnly,
      createdAt: new Date().toISOString(),
      remindersScheduled: {
        dayBefore: true,
        hourBefore: true,
        dayBeforeTimestamp: `${payload.date} 24h prior (simulated)`,
        hourBeforeTimestamp: `${payload.date} 1h prior (simulated)`,
      },
    }

    // Create customer if not exists
    setCustomers((prev) => {
      const exists = prev.find((c) => c.email.toLowerCase() === payload.customer.email.toLowerCase())
      if (exists) {
        return prev.map((c) =>
          c.id === exists.id ? { ...c, totalBookings: c.totalBookings + 1, lastVisit: payload.date } : c
        )
      } else {
        const newCustomer: Customer = {
          id: `cust-${Date.now()}`,
          name: payload.customer.name,
          email: payload.customer.email,
          phone: payload.customer.phone,
          totalBookings: 1,
          lastVisit: payload.date,
          status: 'new',
        }
        return [newCustomer, ...prev]
      }
    })

    // Generate automation sequence events
    const evtBooked: AutomationEvent = {
      id: `evt-${Date.now()}-1`,
      type: 'booked',
      title: 'Appointment Booked',
      timestamp: 'Just now',
      appointmentReference: bookingReference,
      status: 'completed',
      explanation: `Customer ${payload.customer.name} reserved ${service.name} with ${staff.name} for ${payload.date} at ${payload.time}.`,
    }

    const evtConfirmed: AutomationEvent = {
      id: `evt-${Date.now()}-2`,
      type: 'confirmed',
      title: 'Confirmation Dispatched',
      timestamp: 'Just now',
      appointmentReference: bookingReference,
      status: 'completed',
      explanation: `Simulated SMS sent to ${payload.customer.phone} and confirmation email sent to ${payload.customer.email}.`,
    }

    const evtReminders: AutomationEvent = {
      id: `evt-${Date.now()}-3`,
      type: 'reminder',
      title: 'Automated Reminders Scheduled',
      timestamp: 'Just now',
      appointmentReference: bookingReference,
      status: 'scheduled',
      explanation: `Two-tier reminder triggers created: 24 hours before (SMS) and 1 hour before (SMS + push notification).`,
    }

    const invoiceNum = `INV-2025-${String(payments.length + 1).padStart(4, '0')}`
    const paymentRecord: PaymentRecord = {
      id: `pay-${Date.now()}`,
      invoiceNumber: invoiceNum,
      appointmentReference: bookingReference,
      customerName: payload.customer.name,
      amount: paymentAmount,
      type: payload.isDepositOnly ? 'deposit' : 'full',
      method: 'Credit Card (Simulated)',
      status: 'successful',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
    }

    const evtPayment: AutomationEvent = {
      id: `evt-${Date.now()}-4`,
      type: 'payment',
      title: `Simulated Payment (${payload.isDepositOnly ? 'Deposit' : 'Full'}) Processed`,
      timestamp: 'Just now',
      appointmentReference: bookingReference,
      status: 'completed',
      explanation: `Recorded ${currentIndustry.currency}${paymentAmount}.00 for ${invoiceNum} in prototype sandbox mode.`,
    }

    const evtStaff: AutomationEvent = {
      id: `evt-${Date.now()}-5`,
      type: 'staff',
      title: 'Staff Calendar Allocated',
      timestamp: 'Just now',
      appointmentReference: bookingReference,
      status: 'completed',
      explanation: `${staff.name}'s calendar locked for ${payload.time} on ${payload.date} with automatic 10m sanitization buffer.`,
    }

    // Notifications
    const newNotifications: NotificationItem[] = [
      {
        id: `notif-${Date.now()}-sms`,
        title: 'Booking Confirmed (Simulated SMS)',
        message: `Hello ${payload.customer.name}, your ${service.name} with ${staff.name} is booked for ${payload.date} at ${payload.time}. Ref: ${bookingReference}`,
        channel: 'sms',
        timestamp: 'Just now',
        read: false,
        appointmentReference: bookingReference,
        type: 'confirmed',
      },
      {
        id: `notif-${Date.now()}-email`,
        title: 'Calendar Sync & Invoice (Simulated Email)',
        message: `Invoice ${invoiceNum} ($${paymentAmount}.00) and calendar invite sent to ${payload.customer.email}.`,
        channel: 'email',
        timestamp: 'Just now',
        read: false,
        appointmentReference: bookingReference,
        type: 'payment',
      },
    ]

    setAppointments((prev) => [newAppointment, ...prev])
    setPayments((prev) => [paymentRecord, ...prev])
    setAutomationEvents((prev) => [evtStaff, evtPayment, evtReminders, evtConfirmed, evtBooked, ...prev])
    setNotifications((prev) => [...newNotifications, ...prev])
    setLastCreatedAppointment(newAppointment)

    return newAppointment
  }

  const rescheduleAppointment = (appointmentId: string, newDate: string, newTime: string): boolean => {
    const target = appointments.find((a) => a.id === appointmentId)
    if (!target) return false

    const oldDate = target.date
    const oldTime = target.time

    const updated = appointments.map((app) => {
      if (app.id === appointmentId) {
        return {
          ...app,
          date: newDate,
          time: newTime,
          status: 'confirmed' as const,
          remindersScheduled: {
            ...app.remindersScheduled,
            dayBeforeTimestamp: `${newDate} 24h prior (rescheduled)`,
            hourBeforeTimestamp: `${newDate} 1h prior (rescheduled)`,
          },
        }
      }
      return app
    })

    const evtRescheduled: AutomationEvent = {
      id: `evt-${Date.now()}-resched`,
      type: 'rescheduled',
      title: 'Appointment Rescheduled',
      timestamp: 'Just now',
      appointmentReference: target.bookingReference,
      status: 'completed',
      explanation: `Moved from ${oldDate} ${oldTime} to ${newDate} ${newTime}. Slot released and reallocated.`,
    }

    const notif: NotificationItem = {
      id: `notif-${Date.now()}-resched`,
      title: 'Reschedule Alert (Simulated SMS)',
      message: `Your booking ${target.bookingReference} has been moved to ${newDate} at ${newTime}.`,
      channel: 'sms',
      timestamp: 'Just now',
      read: false,
      appointmentReference: target.bookingReference,
      type: 'rescheduled',
    }

    setAppointments(updated)
    setAutomationEvents((prev) => [evtRescheduled, ...prev])
    setNotifications((prev) => [notif, ...prev])
    return true
  }

  const cancelAppointment = (appointmentId: string): boolean => {
    const target = appointments.find((a) => a.id === appointmentId)
    if (!target) return false

    const updated = appointments.map((app) => {
      if (app.id === appointmentId) {
        return { ...app, status: 'cancelled' as const }
      }
      return app
    })

    const evtCancelled: AutomationEvent = {
      id: `evt-${Date.now()}-cancel`,
      type: 'cancelled',
      title: 'Appointment Cancelled',
      timestamp: 'Just now',
      appointmentReference: target.bookingReference,
      status: 'cancelled',
      explanation: `Slot on ${target.date} at ${target.time} freed up. Reminders disarmed. Checking waitlist...`,
    }

    // Waitlist check
    const waitingCustomer = waitlist.find(
      (w) => w.status === 'waiting' && w.serviceId === target.serviceId
    )

    let newEvents = [evtCancelled]
    let newNotifs: NotificationItem[] = [
      {
        id: `notif-${Date.now()}-cancel`,
        title: 'Booking Cancelled (Simulated Notification)',
        message: `Appointment ${target.bookingReference} on ${target.date} has been cancelled.`,
        channel: 'system',
        timestamp: 'Just now',
        read: false,
        appointmentReference: target.bookingReference,
        type: 'cancelled',
      },
    ]

    if (waitingCustomer) {
      // Transition waitlist item to offered
      setWaitlist((prev) =>
        prev.map((w) => (w.id === waitingCustomer.id ? { ...w, status: 'offered' } : w))
      )

      const evtWaitlist: AutomationEvent = {
        id: `evt-${Date.now()}-waitlist`,
        type: 'waitlist',
        title: 'Waitlist Opportunity Dispatched',
        timestamp: 'Just now',
        appointmentReference: target.bookingReference,
        status: 'action_required',
        explanation: `Freed slot offered automatically to waitlisted customer ${waitingCustomer.customerName} (${waitingCustomer.customerEmail}).`,
      }
      newEvents.unshift(evtWaitlist)

      newNotifs.unshift({
        id: `notif-${Date.now()}-wl`,
        title: 'Waitlist Alert: Slot Offered (Simulated SMS)',
        message: `Hi ${waitingCustomer.customerName}, an open slot for ${waitingCustomer.serviceName} on ${target.date} at ${target.time} is now available!`,
        channel: 'sms',
        timestamp: 'Just now',
        read: false,
        type: 'waitlist',
      })
    }

    setAppointments(updated)
    setAutomationEvents((prev) => [...newEvents, ...prev])
    setNotifications((prev) => [...newNotifs, ...prev])
    return true
  }

  const acceptWaitlistOffer = (waitlistId: string) => {
    const item = waitlist.find((w) => w.id === waitlistId)
    if (!item) return

    setWaitlist((prev) =>
      prev.map((w) => (w.id === waitlistId ? { ...w, status: 'accepted' } : w))
    )

    // Book the offered appointment
    bookAppointment({
      serviceId: item.serviceId,
      staffId: currentIndustry.staff[0].id,
      date: item.preferredDate || '2025-03-12',
      time: '11:00 AM',
      customer: {
        name: item.customerName,
        email: item.customerEmail,
        phone: item.customerPhone,
        notes: 'Booked via automated waitlist auto-fill',
      },
    })
  }

  const declineWaitlistOffer = (waitlistId: string) => {
    setWaitlist((prev) =>
      prev.map((w) => (w.id === waitlistId ? { ...w, status: 'declined' } : w))
    )
    const evt: AutomationEvent = {
      id: `evt-${Date.now()}-wl-declined`,
      type: 'waitlist',
      title: 'Waitlist Offer Declined',
      timestamp: 'Just now',
      status: 'completed',
      explanation: 'Customer declined slot. Offer will cycle to next waitlisted applicant.',
    }
    setAutomationEvents((prev) => [evt, ...prev])
  }

  const simulatePaymentAction = (invoiceId: string, status: 'successful' | 'failed') => {
    setPayments((prev) =>
      prev.map((p) => (p.id === invoiceId ? { ...p, status } : p))
    )
    const evt: AutomationEvent = {
      id: `evt-${Date.now()}-pay-update`,
      type: 'payment',
      title: `Simulated Invoice ${status === 'successful' ? 'Settled' : 'Payment Failed'}`,
      timestamp: 'Just now',
      status: status === 'successful' ? 'completed' : 'action_required',
      explanation: `Payment status changed to ${status}. ${status === 'failed' ? 'Automated dunning retry email dispatched.' : 'Receipt delivered.'}`,
    }
    setAutomationEvents((prev) => [evt, ...prev])
  }

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const resetDemo = () => {
    localStorage.removeItem(STORAGE_KEY)
    setCurrentIndustryId('salon')
    setAppointments(SEED_APPOINTMENTS)
    setAutomationEvents(SEED_EVENTS)
    setCustomers(INITIAL_CUSTOMERS)
    setWaitlist(INITIAL_WAITLIST)
    setPayments(SEED_PAYMENTS)
    setLastCreatedAppointment(SEED_APPOINTMENTS[0])
    setIsDemoLoggedIn(true)
    setNotifications([
      {
        id: `notif-${Date.now()}`,
        title: 'Demo Environment Reset',
        message: 'All prototype appointments, simulated events, and notifications have been restored to initial sample baseline.',
        channel: 'system',
        timestamp: 'Just now',
        read: false,
        type: 'staff',
      },
    ])
  }

  const loginDemo = () => setIsDemoLoggedIn(true)
  const logoutDemo = () => setIsDemoLoggedIn(false)

  const exportAppointmentsCSV = () => {
    const headers = 'BookingRef,Customer,Email,Phone,Service,Staff,Date,Time,Price,Status,Payment\n'
    const rows = appointments
      .map(
        (a) =>
          `"${a.bookingReference}","${a.customer.name}","${a.customer.email}","${a.customer.phone}","${a.serviceName}","${a.staffName}","${a.date}","${a.time}","${currentIndustry.currency}${a.price}","${a.status}","${a.paymentStatus}"`
      )
      .join('\n')

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `bookly-appointments-export-${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        currentIndustryId,
        currentIndustry,
        setIndustry,
        appointments,
        automationEvents,
        notifications,
        customers,
        waitlist,
        payments,
        lastCreatedAppointment,
        isDemoLoggedIn,
        loginDemo,
        logoutDemo,
        bookAppointment,
        rescheduleAppointment,
        cancelAppointment,
        acceptWaitlistOffer,
        declineWaitlistOffer,
        simulatePaymentAction,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemo,
        exportAppointmentsCSV,
        getAvailableSlots,
        getStaffAvailabilityStatus,
        getAlternativeStaff,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
