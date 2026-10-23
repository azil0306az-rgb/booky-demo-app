import React from 'react'
import { Navbar } from '../components/common/Navbar'
import { BookingConfirmation } from '../components/booking/BookingConfirmation'
import { LandingFooter } from '../components/landing/LandingSections'
import { useApp } from '../context/AppContext'

export const ConfirmationPage: React.FC = () => {
  const { theme } = useApp()
  const isDark = theme === 'dark'

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-300 ${
        isDark ? 'bg-[#0b0f17] text-white' : 'bg-[#edf2f7] text-slate-900'
      }`}
    >
      <Navbar />
      <main className="flex-1">
        <BookingConfirmation />
      </main>
      <LandingFooter />
    </div>
  )
}
