import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Zap,
  TrendingUp,
  HeartHandshake,
  Stethoscope,
  Scissors,
  Briefcase,
  Dumbbell,
  GraduationCap,
  Wrench,
  PartyPopper,
  Star,
  Sparkles,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { IndustryId } from '../../types'
import { Interactive3DHero } from './Interactive3DHero'

export const HeroSection: React.FC = () => {
  const { currentIndustryId, setIndustry, theme } = useApp()
  const isDark = theme === 'dark'

  const industries: {
    id: IndustryId
    name: string
    sub: string
    icon: React.ElementType
  }[] = [
    { id: 'clinic', name: 'Clinic', sub: 'Healthcare', icon: Stethoscope },
    { id: 'salon', name: 'Salon', sub: 'Beauty & Spa', icon: Scissors },
    { id: 'consulting', name: 'Consulting', sub: 'Business', icon: Briefcase },
    { id: 'fitness', name: 'Fitness', sub: 'Training', icon: Dumbbell },
    { id: 'education', name: 'Education', sub: 'Tutoring', icon: GraduationCap },
    { id: 'automotive', name: 'Automotive', sub: 'Car Service', icon: Wrench },
    { id: 'events', name: 'Events', sub: 'Planning', icon: PartyPopper },
  ]

  return (
    <section id="product" className="relative pt-6 sm:pt-10 pb-24 overflow-hidden transition-colors duration-300">
      {/* Background warm champagne ambient glow */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] rounded-full blur-[160px] pointer-events-none transition-colors duration-500 ${
          isDark ? 'bg-[#c5a880]/10' : 'bg-[#dfc299]/20'
        }`}
      />
      <div
        className={`absolute top-1/3 right-10 w-[500px] h-[380px] rounded-full blur-[140px] pointer-events-none transition-colors duration-500 ${
          isDark ? 'bg-[#9e825a]/10' : 'bg-[#c5a880]/15'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ==================================================================== */}
        {/* SECTION 1: PANORAMIC 3D SHOWROOM CENTERPIECE (MATCHING REFERENCE)   */}
        {/* ==================================================================== */}
        <Interactive3DHero />

        {/* Headline & Overview Hero Bar */}
        <div className="max-w-3xl mx-auto text-center mt-6 sm:mt-10 space-y-4">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-classic-serif font-medium tracking-[0.2em] uppercase transition-all ${
              isDark
                ? 'bg-[#181411] border border-[#c5a880]/35 text-[#dfc299]'
                : 'bg-white border border-[#c5a880]/40 text-[#8c6d42] shadow-sm'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#dfc299] animate-pulse" />
            <span>Classic Appointment Booking Automation</span>
          </div>

          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-classic-serif font-normal tracking-wide leading-[1.1] transition-colors ${
              isDark ? 'text-[#fbf9f5]' : 'text-[#1c1917]'
            }`}
          >
            Smarter Bookings, <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f3e3ca] via-[#dfc299] to-[#c5a880]">
              Unrivaled Elegance
            </span>
          </h1>

          <p
            className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light transition-colors ${
              isDark ? 'text-stone-300' : 'text-stone-600'
            }`}
          >
            Classic appointment scheduling with automated reminders, multi-currency deposits, provider availability, and operational clarity. Designed for distinguished businesses, built by Dawnexus.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <Link
              to="/appointment-automation/demo"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold uppercase tracking-[0.18em] neu-gold-btn text-xs shadow-xl flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Try Booking Demo</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <Link
              to="/appointment-automation/dashboard"
              className={`w-full sm:w-auto px-7 py-3.5 rounded-full font-bold uppercase tracking-[0.16em] text-xs transition-all flex items-center justify-center gap-2.5 ${
                isDark
                  ? 'bg-[#161311] hover:bg-[#201b17] text-stone-200 border border-[#c5a880]/30 shadow-lg'
                  : 'bg-white hover:bg-stone-50 text-stone-800 border border-[#c5a880]/40 shadow-sm'
              }`}
            >
              <span>Explore Dashboard</span>
            </Link>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* SECTION 2: DUAL ROMAN ARCHES ARCHITECTURAL SECTION (MATCHING REF)    */}
        {/* ==================================================================== */}
        <div className="mt-24 sm:mt-32 pt-16 border-t border-[#c5a880]/20 text-center">
          {/* Subtitle */}
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#c5a880] block mb-2">
            WELCOME TO BOOKLY
          </span>

          {/* Editorial Headline */}
          <h2
            className={`font-classic-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide max-w-3xl mx-auto leading-tight transition-colors ${
              isDark ? 'text-[#f5f0eb]' : 'text-[#1c1917]'
            }`}
          >
            Exceptional Hospitality and Unmatched Relaxation at Bookly
          </h2>

          {/* Rating Block */}
          <div className="mt-4 flex flex-col items-center justify-center space-y-1">
            <div className="flex items-center gap-2 text-base font-bold text-[#dfc299]">
              <span>4.9 out of 5</span>
              <div className="flex text-[#d4af37] text-sm">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
            <p className="text-[11px] tracking-wider text-stone-400">
              Based on 5,000+ simulated appointments automated
            </p>
          </div>

          {/* Dual Arched Frames Side by Side (Exact Match to Reference Image) */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-12 mt-10 sm:mt-12 max-w-4xl mx-auto">
            {/* Left Roman Arch Frame: Grand Lobby & Salon */}
            <div className="group relative">
              <div
                className={`luxury-arch overflow-hidden border border-[#c5a880]/35 shadow-2xl relative h-[320px] sm:h-[440px] transition-transform duration-500 group-hover:scale-[1.01] ${
                  isDark ? 'bg-[#181411]' : 'bg-[#f5efe6]'
                }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=85"
                  alt="Architectural Grand Hall"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.82]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 luxury-arch border border-[#c5a880]/30 pointer-events-none" />

                {/* Bottom Label */}
                <div className="absolute bottom-5 sm:bottom-6 inset-x-4 sm:inset-x-6 text-center text-white">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfc299] block mb-1">
                    Private Chambers
                  </span>
                  <h4 className="font-classic-serif text-xl sm:text-2xl font-normal">
                    Grand Suites & Consultations
                  </h4>
                </div>
              </div>
            </div>

            {/* Right Roman Arch Frame: Fine Dining & VIP Table */}
            <div className="group relative">
              <div
                className={`luxury-arch overflow-hidden border border-[#c5a880]/35 shadow-2xl relative h-[320px] sm:h-[440px] transition-transform duration-500 group-hover:scale-[1.01] ${
                  isDark ? 'bg-[#181411]' : 'bg-[#f5efe6]'
                }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85"
                  alt="Fine Dining & VIP Wine Setting"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.82]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 luxury-arch border border-[#c5a880]/30 pointer-events-none" />

                {/* Bottom Label */}
                <div className="absolute bottom-5 sm:bottom-6 inset-x-4 sm:inset-x-6 text-center text-white">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfc299] block mb-1">
                    Exclusive Hospitality
                  </span>
                  <h4 className="font-classic-serif text-xl sm:text-2xl font-normal">
                    Dine, Relax & Rejuvenate
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* SECTION 3: 3 BENEFIT PILLARS                                         */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-12 sm:mt-16 max-w-4xl mx-auto">
          <div
            className={`flex items-center gap-4 p-4 sm:p-5 rounded-3xl transition-all ${
              isDark
                ? 'neu-raised border border-[#c5a880]/20'
                : 'bg-white border border-[#c5a880]/30 shadow-sm'
            }`}
          >
            <div className="w-11 h-11 rounded-2xl bg-[#c5a880]/15 text-[#dfc299] flex items-center justify-center shrink-0 border border-[#c5a880]/30">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                Automate Scheduling
              </p>
              <p className="text-xs text-stone-400">Save hours every week</p>
            </div>
          </div>

          <div
            className={`flex items-center gap-4 p-4 sm:p-5 rounded-3xl transition-all ${
              isDark
                ? 'neu-raised border border-[#c5a880]/20'
                : 'bg-white border border-[#c5a880]/30 shadow-sm'
            }`}
          >
            <div className="w-11 h-11 rounded-2xl bg-[#c5a880]/15 text-[#dfc299] flex items-center justify-center shrink-0 border border-[#c5a880]/30">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                Curtail No-Shows
              </p>
              <p className="text-xs text-stone-400">Increase realized revenue</p>
            </div>
          </div>

          <div
            className={`flex items-center gap-4 p-4 sm:p-5 rounded-3xl transition-all ${
              isDark
                ? 'neu-raised border border-[#c5a880]/20'
                : 'bg-white border border-[#c5a880]/30 shadow-sm'
            }`}
          >
            <div className="w-11 h-11 rounded-2xl bg-[#c5a880]/15 text-[#dfc299] flex items-center justify-center shrink-0 border border-[#c5a880]/30">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                Delight Prestige Clients
              </p>
              <p className="text-xs text-stone-400">Exquisite digital experience</p>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* SECTION 4: INDUSTRY PRESET SELECTOR (FOR PRESTIGIOUS ENTERPRISES)   */}
        {/* ==================================================================== */}
        <div id="industries" className="mt-16 sm:mt-24 pt-10 sm:pt-12 border-t border-[#c5a880]/20">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a880] block mb-2">
              SECTOR SHOWCASE
            </span>
            <h3
              className={`text-2xl sm:text-4xl font-classic-serif font-normal ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}
            >
              Tailored for Prestigious Industries
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-2 max-w-lg mx-auto">
              Switch sectors in real-time to preview customized services, specialized durations, tailored rates, and staff rosters.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
            {industries.map((ind) => {
              const Icon = ind.icon
              const isActive = currentIndustryId === ind.id
              return (
                <button
                  key={ind.id}
                  onClick={() => setIndustry(ind.id)}
                  className={`p-3.5 sm:p-4 rounded-3xl transition-all text-center flex flex-col items-center justify-center gap-2 group cursor-pointer last:col-span-2 sm:last:col-span-1 active:scale-95 ${
                    isActive
                      ? isDark
                        ? 'bg-[#1e1915] border-2 border-[#c5a880] shadow-xl shadow-[#c5a880]/15 text-white'
                        : 'bg-white border-2 border-[#c5a880] shadow-xl shadow-[#c5a880]/20 text-stone-900'
                      : isDark
                      ? 'bg-[#151210] hover:bg-[#1a1613] border border-[#c5a880]/20 text-stone-300'
                      : 'bg-white hover:bg-stone-50 border border-[#c5a880]/25 text-stone-700 shadow-sm'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#dfc299] to-[#c5a880] text-[#14100c] font-bold shadow-md'
                        : isDark
                        ? 'bg-[#221c17] text-stone-400 group-hover:text-[#dfc299]'
                        : 'bg-stone-100 text-stone-600 group-hover:text-[#8c6d42]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p
                      className={`text-xs font-bold ${
                        isActive
                          ? isDark
                            ? 'text-[#dfc299]'
                            : 'text-[#8c6d42] font-extrabold'
                          : ''
                      }`}
                    >
                      {ind.name}
                    </p>
                    <p className="text-[10px] text-stone-400">{ind.sub}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
