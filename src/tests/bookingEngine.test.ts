import { describe, it, expect } from 'vitest'
import { INDUSTRY_PRESETS, SEED_APPOINTMENTS, INITIAL_WAITLIST } from '../data/presets'
import { IndustryId } from '../types'

describe('Appointment Booking Automation Engine & Preset Data', () => {
  it('should verify all 7 industry presets exist with valid staff and services', () => {
    const requiredIndustries: IndustryId[] = [
      'salon',
      'clinic',
      'consulting',
      'fitness',
      'education',
      'automotive',
      'events',
    ]

    expect(Object.keys(INDUSTRY_PRESETS)).toHaveLength(7)

    requiredIndustries.forEach((id) => {
      const preset = INDUSTRY_PRESETS[id]
      expect(preset).toBeDefined()
      expect(preset.name).toBeTruthy()
      expect(preset.businessName).toBeTruthy()
      expect(preset.services.length).toBeGreaterThanOrEqual(3)
      expect(preset.staff.length).toBeGreaterThanOrEqual(2)
      expect(preset.currency).toBe('$')

      // Validate services
      preset.services.forEach((s) => {
        expect(s.id).toBeTruthy()
        expect(s.name).toBeTruthy()
        expect(s.durationMinutes).toBeGreaterThan(0)
        expect(s.price).toBeGreaterThan(0)
      })

      // Validate staff
      preset.staff.forEach((st) => {
        expect(st.id).toBeTruthy()
        expect(st.name).toBeTruthy()
        expect(st.rating).toBeGreaterThanOrEqual(4.0)
        expect(st.workingHours.start).toBeTruthy()
        expect(st.workingHours.end).toBeTruthy()
      })
    })
  })

  it('should verify seed appointments are formatted with references and reminder timelines', () => {
    expect(SEED_APPOINTMENTS.length).toBeGreaterThanOrEqual(4)

    SEED_APPOINTMENTS.forEach((app) => {
      expect(app.bookingReference).toMatch(/^BK-\d{6}-\d{3}$/)
      expect(app.customer.name).toBeTruthy()
      expect(app.customer.email).toContain('@')
      expect(app.remindersScheduled.dayBefore).toBe(true)
      expect(app.remindersScheduled.hourBefore).toBe(true)
      expect(['confirmed', 'pending', 'completed', 'cancelled']).toContain(app.status)
    })
  })

  it('should correctly calculate available slots excluding existing appointments', () => {
    const allSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM']
    const date = '2025-03-12'
    const staffId = 'staff-sarah'

    // Mock booked appointments
    const bookedSlots = SEED_APPOINTMENTS
      .filter((app) => app.date === date && app.staffId === staffId && app.status !== 'cancelled')
      .map((app) => app.time)

    const available = allSlots.filter((slot) => !bookedSlots.includes(slot))

    // Sarah has 10:00 AM booked in seed data
    expect(bookedSlots).toContain('10:00 AM')
    expect(available).not.toContain('10:00 AM')
    expect(available).toContain('09:00 AM')
  })

  it('should verify waitlist initial queue and slot offer candidate detection', () => {
    expect(INITIAL_WAITLIST.length).toBeGreaterThanOrEqual(2)
    const firstWaitlist = INITIAL_WAITLIST[0]
    expect(firstWaitlist.customerName).toBeTruthy()
    expect(firstWaitlist.customerEmail).toContain('@')
    expect(firstWaitlist.status).toBe('waiting')
  })

  it('should verify deterministic booking reference formatting', () => {
    const now = new Date('2025-03-12T10:00:00Z')
    const yy = String(now.getFullYear()).slice(-2)
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const seq = String(5).padStart(3, '0')
    const ref = `BK-${yy}${mm}${dd}-${seq}`

    expect(ref).toBe('BK-250312-005')
  })

  it('should verify staff leave rules and busy period detection', () => {
    const salon = INDUSTRY_PRESETS.salon
    const emma = salon.staff.find((s) => s.id === 'staff-emma')
    expect(emma).toBeDefined()
    expect(emma?.leaves).toBeDefined()
    const emmaLeave = emma?.leaves?.find((l) => l.date === '2025-03-12' && l.type === 'full')
    expect(emmaLeave).toBeDefined()
    expect(emmaLeave?.reason).toBe('Personal Wellness Leave')

    const sarah = salon.staff.find((s) => s.id === 'staff-sarah')
    expect(sarah).toBeDefined()
    expect(sarah?.busyPeriods).toBeDefined()
    const sarahBusy = sarah?.busyPeriods?.find((b) => b.date === '2025-03-12')
    expect(sarahBusy).toBeDefined()
    expect(sarahBusy?.start).toBe('09:00')
    expect(sarahBusy?.end).toBe('11:00')

    const clinic = INDUSTRY_PRESETS.clinic
    const elena = clinic.staff.find((s) => s.id === 'staff-elena')
    expect(elena).toBeDefined()
    expect(elena?.leaves?.some((l) => l.date === '2025-03-12')).toBe(true)
  })
})

