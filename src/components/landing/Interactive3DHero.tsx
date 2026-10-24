import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar as CalendarIcon,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Minus,
  Plus,
  ShieldCheck,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

export const Interactive3DHero: React.FC = () => {
  const { theme } = useApp()
  const isDark = theme === 'dark'

  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<number | null>(null)
  const [rotate, setRotate] = useState({ x: 4, y: 0 })
  const [activeSlide, setActiveSlide] = useState<number>(1) // 0: Left (Dream Bookings), 1: Center (Hospitality / Main), 2: Right (Welcome / Arch)
  const [guestCount, setGuestCount] = useState<number>(1)
  const [selectedDateRange, setSelectedDateRange] = useState<string>('Mar 12 - Mar 15')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:30 AM')
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Restrained, elegant 3D tilt
    const rotateY = (x / (rect.width / 2)) * 10
    const rotateX = -(y / (rect.height / 2)) * 8

    setRotate({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setRotate({ x: 3, y: 0 })
  }

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartRef.current === null) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStartRef.current - touchEnd
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    touchStartRef.current = null
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? 2 : prev - 1))
  }

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === 2 ? 0 : prev + 1))
  }

  // Calculate 3D transforms based on active slide, screen width, and mouse tilt
  const getCardTransform = (index: number) => {
    const diff = index - activeSlide
    // When activeSlide is index, card is center-stage
    if (diff === 0) {
      return isMobile
        ? `translate3d(0px, 0px, 30px) rotateY(0deg) scale(1)`
        : `translate3d(0px, 0px, 80px) rotateY(0deg) scale(1)`
    }
    // Left side card
    if (diff === -1 || (activeSlide === 0 && index === 2)) {
      return isMobile
        ? `translate3d(-102%, 10px, -60px) rotateY(14deg) scale(0.85)`
        : `translate3d(-240px, 20px, -60px) rotateY(22deg) scale(0.86)`
    }
    // Right side card
    return isMobile
      ? `translate3d(102%, 10px, -60px) rotateY(-14deg) scale(0.85)`
      : `translate3d(240px, 20px, -60px) rotateY(-22deg) scale(0.86)`
  }

  const getCardOpacity = (index: number) => {
    if (index === activeSlide) return 1
    return isMobile ? 0.35 : 0.65
  }

  const getCardZIndex = (index: number) => {
    return index === activeSlide ? 30 : 10
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto py-4 sm:py-10 select-none">
      {/* Top Floating Badges & Almaris Wordmark Bar (Responsive layout on Mobile) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-12 relative z-20 px-3 sm:px-4">
        {/* Left Luxury Pill Badge */}
        <div
          className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-classic-serif font-medium tracking-[0.16em] sm:tracking-[0.18em] transition-all duration-300 shadow-md ${
            isDark
              ? 'bg-[#181411]/90 border border-[#c5a880]/35 text-[#dfc299] shadow-black/60'
              : 'bg-white/95 border border-[#c5a880]/50 text-[#8c6d42] shadow-[#c5a880]/15'
          }`}
        >
          Luxury Platform Template
        </div>

        {/* Center ALMARIS / BOOKLY Title with 5 Stars */}
        <div className="flex flex-col items-center text-center my-1 sm:my-0">
          <h2
            className={`font-classic-serif text-2xl sm:text-4xl md:text-5xl font-normal tracking-[0.25em] sm:tracking-[0.3em] uppercase transition-colors duration-300 ${
              isDark ? 'text-[#f5f0eb]' : 'text-[#1c1917]'
            }`}
          >
            B O O K L Y
          </h2>
          <div className="flex items-center gap-1.5 mt-1 text-[#d4af37] text-xs sm:text-sm tracking-widest drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
        </div>

        {/* Right Luxury Pill Badge */}
        <div
          className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-classic-serif font-medium tracking-[0.16em] sm:tracking-[0.18em] transition-all duration-300 shadow-md ${
            isDark
              ? 'bg-[#181411]/90 border border-[#c5a880]/35 text-[#dfc299] shadow-black/60'
              : 'bg-white/95 border border-[#c5a880]/50 text-[#8c6d42] shadow-[#c5a880]/15'
          }`}
        >
          Included Booking Form
        </div>
      </div>

      {/* Main 3D Panoramic Arena Viewport with Touch Swiping */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-[490px] sm:h-[580px] md:h-[620px] flex items-center justify-center perspective-1000 overflow-hidden touch-pan-y"
      >
        {/* Soft Warm Ambient Lighting Flare */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[700px] h-[320px] sm:h-[450px] rounded-full blur-[90px] sm:blur-[140px] pointer-events-none transition-opacity duration-700 ${
            isDark
              ? 'bg-gradient-to-tr from-[#c5a880]/15 via-[#dfc299]/10 to-[#9e825a]/15 opacity-80'
              : 'bg-gradient-to-tr from-[#dfc299]/25 via-[#c5a880]/15 to-[#edd6b6]/20 opacity-70'
          }`}
        />

        {/* 3D Scene Root Canvas */}
        <div
          className="relative w-full h-full flex items-center justify-center preserve-3d transition-transform duration-300 ease-out"
          style={{
            transform: isMobile
              ? `rotateX(1deg) rotateY(0deg)`
              : `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          }}
        >
          {/* ==================================================================== */}
          {/* CARD 0: LEFT PERSPECTIVE - "DREAM APPOINTMENTS & RESERVATION BAR"     */}
          {/* ==================================================================== */}
          <div
            onClick={() => setActiveSlide(0)}
            className={`absolute w-[88vw] max-w-[340px] sm:w-[380px] md:w-[440px] h-[450px] sm:h-[520px] rounded-3xl overflow-hidden preserve-3d transition-all duration-700 ease-out cursor-pointer shadow-2xl border ${
              isDark
                ? 'border-[#c5a880]/25 bg-[#120f0d] text-white shadow-black/80'
                : 'border-[#c5a880]/40 bg-[#fdfbf7] text-stone-900 shadow-stone-400/40'
            }`}
            style={{
              transform: getCardTransform(0),
              opacity: getCardOpacity(0),
              zIndex: getCardZIndex(0),
            }}
          >
            {/* Background Image: Luxury Boutique Suite */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                alt="Client Luxury Experience"
                className="w-full h-full object-cover brightness-[0.75] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            </div>

            {/* Top Bar */}
            <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between text-white/80 text-xs">
              <span className="font-classic-serif tracking-widest uppercase">
                B O O K L Y
              </span>
              <span className="text-[11px] opacity-75">Reserve Online</span>
            </div>

            {/* Main Content */}
            <div className="relative z-10 px-5 sm:px-8 mt-10 sm:mt-24 space-y-2 text-white">
              <h3 className="font-classic-serif text-2xl sm:text-4xl md:text-5xl font-normal leading-tight tracking-wide drop-shadow-md">
                Dream Stays & <br />
                Appointments
              </h3>
              <p className="text-xs sm:text-sm text-stone-200/80 font-light max-w-xs leading-relaxed">
                The perfect service is just a click away. Book now and start your seamless journey.
              </p>
            </div>

            {/* Floating Glassmorphic Reservation Bar (Matching bottom left of reference image) */}
            <div className="absolute bottom-4 sm:bottom-5 inset-x-3 sm:inset-x-6 z-20">
              <div className="luxury-glass rounded-2xl p-3 sm:p-4 text-white space-y-2 sm:space-y-2.5 shadow-2xl border border-[#c5a880]/40">
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-xs">
                  {/* Choose Date */}
                  <div className="border-r border-white/10 pr-1 sm:pr-2">
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#dfc299] block font-semibold truncate">
                      Choose Date
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedDateRange(
                          selectedDateRange === 'Mar 12 - Mar 15'
                            ? 'Mar 18 - Mar 21'
                            : 'Mar 12 - Mar 15'
                        )
                      }}
                      className="font-bold text-[10px] sm:text-xs truncate block w-full mt-0.5 hover:text-[#dfc299] active:scale-95"
                    >
                      {selectedDateRange}
                    </button>
                  </div>

                  {/* Specialist / Person Count with Minus/Plus */}
                  <div className="border-r border-white/10 px-1">
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#dfc299] block font-semibold truncate">
                      Guests/Staff
                    </span>
                    <div className="flex items-center justify-center gap-1.5 mt-0.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (guestCount > 1) setGuestCount(guestCount - 1)
                        }}
                        className="w-5 h-5 rounded-full bg-white/20 hover:bg-[#c5a880] text-white flex items-center justify-center transition-colors active:scale-90"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="font-extrabold text-xs">{guestCount}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setGuestCount(guestCount + 1)
                        }}
                        className="w-5 h-5 rounded-full bg-white/20 hover:bg-[#c5a880] text-white flex items-center justify-center transition-colors active:scale-90"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>

                  {/* Slot Time */}
                  <div className="pl-1 sm:pl-2">
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#dfc299] block font-semibold truncate">
                      Time Slot
                    </span>
                    <span className="font-bold text-[10px] sm:text-xs block mt-0.5 text-stone-200">
                      {selectedTimeSlot}
                    </span>
                  </div>
                </div>

                {/* Instant Book Mini Button */}
                <Link
                  to="/appointment-automation/demo"
                  className="w-full py-2.5 rounded-xl text-center text-xs font-bold uppercase tracking-wider neu-gold-btn block shadow-md"
                >
                  Book Instant Demo
                </Link>
              </div>
            </div>
          </div>

          {/* ==================================================================== */}
          {/* CARD 1: CENTER ARCHED SHOWROOM - "EXPERIENCE HOSPITALITY / BOOKING"  */}
          {/* ==================================================================== */}
          <div
            onClick={() => setActiveSlide(1)}
            className={`absolute w-[90vw] max-w-[350px] sm:w-[420px] md:w-[490px] h-[470px] sm:h-[540px] luxury-arch overflow-hidden preserve-3d transition-all duration-700 ease-out cursor-pointer shadow-2xl border ${
              isDark
                ? 'border-[#c5a880]/40 bg-[#161311] text-white shadow-black/90'
                : 'border-[#c5a880]/50 bg-[#faf7f2] text-stone-900 shadow-stone-400/50'
            }`}
            style={{
              transform: getCardTransform(1),
              opacity: getCardOpacity(1),
              zIndex: getCardZIndex(1),
            }}
          >
            {/* Background Luxury Suite Interior with Warm Lampglow */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85"
                alt="Luxury Master Chamber"
                className="w-full h-full object-cover brightness-[0.7] contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            </div>

            {/* Architectural Arched Border Highlight */}
            <div className="absolute inset-0 luxury-arch pointer-events-none border border-[#c5a880]/30 z-10" />

            {/* Top Navigation Row inside Card */}
            <div className="relative z-20 pt-5 sm:pt-6 px-5 sm:px-8 flex items-center justify-between text-white/90 text-xs">
              <span className="font-classic-serif font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
                ALMARIS
              </span>
              <div className="hidden sm:flex items-center gap-4 text-[11px] font-classic-serif tracking-wider uppercase text-stone-300">
                <span>Rooms</span>
                <span>Reservation</span>
                <span>Services</span>
              </div>
              <span className="px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border border-[#c5a880]/40 bg-black/40 text-[#dfc299]">
                5-Star
              </span>
            </div>

            {/* Floating Glassmorphism Hero Showcase (Matching Center of Reference Image) */}
            <div className="relative z-20 mt-10 sm:mt-20 mx-3 sm:mx-8">
              <div className="luxury-glass rounded-3xl p-5 sm:p-8 text-center text-white space-y-2.5 sm:space-y-3.5 shadow-2xl border border-[#c5a880]/35">
                {/* 5 Stars */}
                <div className="flex items-center justify-center gap-1 text-[#d4af37] text-xs">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>

                {/* Editorial Headline */}
                <h3 className="font-classic-serif text-xl sm:text-3xl md:text-4xl font-normal leading-tight tracking-wide text-[#fdfbf7]">
                  Experience Hospitality Like Never Before
                </h3>

                {/* Subtitle */}
                <p className="text-[11px] sm:text-sm text-stone-300/90 font-light max-w-sm mx-auto leading-relaxed">
                  Discover the perfect blend of luxury, comfort, and operational convenience at Bookly. Tailored for esteemed client journeys, built by Dawnexus.
                </p>

                {/* Discover Services Button */}
                <div className="pt-2 flex justify-center">
                  <Link
                    to="/appointment-automation/demo"
                    className="px-5 sm:px-6 py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] neu-gold-btn shadow-lg flex items-center gap-2 transform hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Discover Services</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Carousel Controls (Matching "< 2 / 3 >" in Reference Image) */}
            <div className="absolute bottom-4 sm:bottom-5 inset-x-5 sm:inset-x-6 z-20 flex items-center justify-between text-white/90 text-xs">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  prevSlide()
                }}
                className="w-8 h-8 rounded-full bg-black/50 hover:bg-[#c5a880] text-white border border-[#c5a880]/30 flex items-center justify-center transition-all shadow-md active:scale-90"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="font-classic-serif tracking-widest text-xs font-bold text-[#dfc299]">
                {activeSlide + 1} / 3
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  nextSlide()
                }}
                className="w-8 h-8 rounded-full bg-black/50 hover:bg-[#c5a880] text-white border border-[#c5a880]/30 flex items-center justify-center transition-all shadow-md active:scale-90"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ==================================================================== */}
          {/* CARD 2: RIGHT PERSPECTIVE - "WELCOME ARCH & BUSINESS DASHBOARD"       */}
          {/* ==================================================================== */}
          <div
            onClick={() => setActiveSlide(2)}
            className={`absolute w-[88vw] max-w-[340px] sm:w-[380px] md:w-[440px] h-[450px] sm:h-[520px] rounded-3xl overflow-hidden preserve-3d transition-all duration-700 ease-out cursor-pointer shadow-2xl border ${
              isDark
                ? 'border-[#c5a880]/25 bg-[#120f0d] text-white shadow-black/80'
                : 'border-[#c5a880]/40 bg-[#fdfbf7] text-stone-900 shadow-stone-400/40'
            }`}
            style={{
              transform: getCardTransform(2),
              opacity: getCardOpacity(2),
              zIndex: getCardZIndex(2),
            }}
          >
            {/* Background Image: Grand Architectural Palace Lobby with Arches */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80"
                alt="Grand Hall Reception"
                className="w-full h-full object-cover brightness-[0.7] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />
            </div>

            {/* Top Bar */}
            <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between text-white/80 text-xs">
              <span className="font-classic-serif tracking-widest uppercase">
                B O O K L Y
              </span>
              <span className="text-[11px] opacity-75">Intelligence Portal</span>
            </div>

            {/* Main Content */}
            <div className="relative z-10 px-5 sm:px-8 mt-10 sm:mt-20 space-y-2.5 sm:space-y-3 text-white">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfc299] block">
                WELCOME TO ALMARIS
              </span>
              <h3 className="font-classic-serif text-2xl sm:text-4xl md:text-5xl font-normal leading-tight tracking-wide drop-shadow-md">
                Unrivaled Prestige & Management
              </h3>
              <p className="text-xs sm:text-sm text-stone-200/80 font-light max-w-xs leading-relaxed">
                Step into the epitome of appointment automation. Offering an exquisite operational overview for discerning businesses.
              </p>
            </div>

            {/* Lower Callout Box */}
            <div className="absolute bottom-4 sm:bottom-5 inset-x-3 sm:inset-x-6 z-20">
              <div className="luxury-glass rounded-2xl p-3 sm:p-4 text-white space-y-2.5 shadow-2xl border border-[#c5a880]/40">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-300 font-medium">Enterprise Analytics</span>
                  <span className="font-bold text-[#dfc299]">$18,450 / mo</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-300 font-medium">Staff Attendance</span>
                  <span className="font-bold text-emerald-400">98% Synced</span>
                </div>
                <Link
                  to="/appointment-automation/dashboard"
                  className="w-full py-2.5 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-[#c5a880]/40 block transition-all shadow-md active:scale-95"
                >
                  Explore Dashboard &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Swipe Pagination Indicator Dots */}
      <div className="flex sm:hidden items-center justify-center gap-2 mt-4">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeSlide === idx
                ? 'w-6 bg-gradient-to-r from-[#dfc299] to-[#c5a880]'
                : 'w-2 bg-stone-500/40'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
