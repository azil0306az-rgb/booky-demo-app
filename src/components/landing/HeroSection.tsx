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
    <section id="product" className="relative pt-10 sm:pt-14 pb-24 overflow-hidden transition-colors duration-300">
      {/* Background radial glow */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px] pointer-events-none transition-colors duration-500 ${
          isDark ? 'bg-lime-500/10' : 'bg-lime-400/15'
        }`}
      />
      <div
        className={`absolute top-1/3 right-10 w-[450px] h-[350px] rounded-full blur-[120px] pointer-events-none transition-colors duration-500 ${
          isDark ? 'bg-indigo-600/10' : 'bg-indigo-300/15'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                isDark
                  ? 'bg-slate-900/90 border border-lime-400/40 text-lime-400 shadow-inner'
                  : 'bg-white border border-lime-400 text-lime-800 shadow-sm'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span>APPOINTMENT BOOKING AUTOMATION</span>
            </div>

            {/* Headline matching Concept Board */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Smarter <br />
              Bookings <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-lime-500 to-emerald-400">
                Happier Businesses
              </span>
            </h1>

            {/* Subhead */}
            <p
              className={`text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal transition-colors ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Modern appointment scheduling with automation, reminders, payments, and powerful insights. Designed for every business, built by Dawnexus.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/appointment-automation/demo"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold bg-lime-400 hover:bg-lime-300 text-slate-950 text-base shadow-xl shadow-lime-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
              >
                <span>Try Booking Demo</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Link>

              <Link
                to="/appointment-automation/dashboard"
                className={`w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-3 ${
                  isDark
                    ? 'bg-[#151c28] hover:bg-[#1c2536] text-white border border-slate-700/80 shadow-lg'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-md'
                }`}
              >
                <span>Explore Dashboard</span>
              </Link>
            </div>

            {/* 3 Tactile Benefit Pillars */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}
            >
              <div
                className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all ${
                  isDark
                    ? 'neu-raised-sm'
                    : 'bg-white border border-slate-200 shadow-sm'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-lime-400/20 text-lime-500 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Automate</p>
                  <p className="text-[11px] text-slate-400">Save hours</p>
                </div>
              </div>

              <div
                className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all ${
                  isDark
                    ? 'neu-raised-sm'
                    : 'bg-white border border-slate-200 shadow-sm'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-400/20 text-emerald-500 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Reduce no-shows</p>
                  <p className="text-[11px] text-slate-400">Increase revenue</p>
                </div>
              </div>

              <div
                className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all ${
                  isDark
                    ? 'neu-raised-sm'
                    : 'bg-white border border-slate-200 shadow-sm'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-400/20 text-indigo-500 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Delight customers</p>
                  <p className="text-[11px] text-slate-400">Better experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Hero Composition */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <Interactive3DHero />
          </div>
        </div>

        {/* Industry Selector Section (Designed for Every Industry) */}
        <div id="industries" className="mt-20 pt-10 border-t border-slate-200/80 dark:border-slate-800">
          <div className="text-center mb-8">
            <h3
              className={`text-2xl sm:text-3xl font-extrabold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Designed for Every Industry
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Switch presets in real-time to load tailored services, pricing, durations, and staff rosters.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {industries.map((ind) => {
              const Icon = ind.icon
              const isActive = currentIndustryId === ind.id
              return (
                <button
                  key={ind.id}
                  onClick={() => setIndustry(ind.id)}
                  className={`p-4 rounded-2xl transition-all text-center flex flex-col items-center justify-center gap-2 group cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-[#182232] border-2 border-lime-400 shadow-lg shadow-lime-500/20 text-white'
                        : 'bg-white border-2 border-lime-500 shadow-lg shadow-lime-500/20 text-slate-900'
                      : isDark
                      ? 'bg-[#111724] hover:bg-[#161f30] border border-slate-800 text-slate-300'
                      : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-sm'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                      isActive
                        ? 'bg-lime-400 text-slate-950 font-bold shadow-md shadow-lime-500/30'
                        : isDark
                        ? 'bg-slate-800 text-slate-400 group-hover:text-lime-400'
                        : 'bg-slate-100 text-slate-600 group-hover:text-lime-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p
                      className={`text-xs font-bold ${
                        isActive
                          ? isDark
                            ? 'text-lime-300'
                            : 'text-lime-700 font-extrabold'
                          : ''
                      }`}
                    >
                      {ind.name}
                    </p>
                    <p className="text-[10px] text-slate-400">{ind.sub}</p>
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
