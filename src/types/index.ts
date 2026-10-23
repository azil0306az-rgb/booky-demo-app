export type ThemeMode = 'dark' | 'light'

export type IndustryId =
  | 'salon'
  | 'clinic'
  | 'consulting'
  | 'fitness'
  | 'education'
  | 'automotive'
  | 'events'

export interface ServiceItem {
  id: string
  name: string
  category: string
  durationMinutes: number
  price: number
  description: string
  popular?: boolean
  imagePlaceholder?: string
}

export interface StaffLeave {
  date: string // YYYY-MM-DD
  type: 'full' | 'partial'
  startTime?: string
  endTime?: string
  reason: string
}

export interface StaffBreak {
  start: string
  end: string
  label?: string
}

export interface StaffBusyPeriod {
  date: string
  start: string
  end: string
  reason: string
}

export interface StaffMember {
  id: string
  name: string
  role: string
  rating: number
  reviewCount: number
  avatar: string
  availableDays: number[] // 0 = Sunday, 1 = Monday, etc.
  workingHours: {
    start: string // "09:00"
    end: string   // "18:00"
  }
  breaks?: StaffBreak[]
  leaves?: StaffLeave[]
  busyPeriods?: StaffBusyPeriod[]
  specialties: string[]
}

export interface IndustryPreset {
  id: IndustryId
  name: string
  categoryLabel: string
  tagline: string
  description: string
  businessName: string
  servicesTerm: string
  staffTerm: string
  clientTerm: string
  currency: string
  services: ServiceItem[]
  staff: StaffMember[]
  defaultWorkingHours: {
    start: string
    end: string
  }
  breakTime?: {
    start: string
    end: string
  }
}

export type AppointmentStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'no-show'

export interface Appointment {
  id: string
  bookingReference: string
  industryId: IndustryId
  serviceId: string
  serviceName: string
  staffId: string
  staffName: string
  date: string // YYYY-MM-DD
  time: string // "10:00 AM"
  durationMinutes: number
  price: number
  customer: {
    id: string
    name: string
    email: string
    phone: string
    notes?: string
  }
  status: AppointmentStatus
  paymentStatus: 'paid' | 'deposit_paid' | 'pending' | 'refunded'
  paymentAmount: number
  isDepositOnly?: boolean
  createdAt: string
  remindersScheduled: {
    dayBefore: boolean
    hourBefore: boolean
    dayBeforeTimestamp: string
    hourBeforeTimestamp: string
  }
}

export type AutomationEventType =
  | 'booked'
  | 'confirmed'
  | 'reminder'
  | 'cancelled'
  | 'rescheduled'
  | 'waitlist'
  | 'payment'
  | 'staff'

export interface AutomationEvent {
  id: string
  type: AutomationEventType
  title: string
  timestamp: string
  appointmentReference?: string
  status: 'completed' | 'scheduled' | 'action_required' | 'cancelled'
  explanation: string
  metadata?: Record<string, unknown>
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  channel: 'sms' | 'email' | 'system'
  timestamp: string
  read: boolean
  appointmentReference?: string
  type: AutomationEventType
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalBookings: number
  lastVisit: string
  status: 'active' | 'vip' | 'new'
}

export interface WaitlistItem {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceId: string
  serviceName: string
  preferredDate: string
  status: 'waiting' | 'offered' | 'accepted' | 'declined'
  createdAt: string
}

export interface PaymentRecord {
  id: string
  invoiceNumber: string
  appointmentReference: string
  customerName: string
  amount: number
  type: 'full' | 'deposit'
  method: 'Credit Card (Simulated)' | 'Apple Pay (Simulated)' | 'Bank Transfer (Simulated)'
  status: 'successful' | 'failed' | 'refunded'
  timestamp: string
}

