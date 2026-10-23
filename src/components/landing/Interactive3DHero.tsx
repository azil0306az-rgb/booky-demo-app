import React, { useState, useRef, useEffect } from 'react'
import {
  Calendar as CalendarIcon,
  Check,
  Clock,
  Star,
  Bell,
  Sparkles,
  ArrowRight,
  User,
  ShieldCheck,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

export const Interactive3DHero: React.FC = () => {
  const { theme, currentIndustry } = useApp()
  const isDark = theme === 'dark'

  const containerRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 8, y: -12 })
  const [activeSlot, setActiveSlot] = useState<string>('10:30 AM')
  const [isHovered, setIsHovered] = useState(false)
  const [badgeHover, setBadgeHover] = useState(false)

  const featuredService = currentIndustry.services[0]
  const featuredStaff = currentIndustry.staff[0]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Smooth tilt angles
    const rotateY = (x / (rect.width / 2)) * 14
    const rotateX = -(y / (rect.height / 2)) * 14

    setRotate({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotate({ x: 6, y: -10 }) // Return smoothly to rest orientation
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => {
        setIsHovered(true)
        handleMouseMove(e)
      }}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto h-[480px] sm:h-[520px] flex items-center justify-center perspective-1000 select-none cursor-pointer"
    >
      {/* Dynamic Ambient Glow Behind Composition */}
      <div
        className={`absolute inset-0 rounded-full blur-[100px] transition-opacity duration-700 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-tr from-lime-500/20 via-indigo-500/15 to-emerald-500/20 opacity-80'
            : 'bg-gradient-to-tr from-lime-400/20 via-indigo-300/15 to-emerald-400/15 opacity-60'
        }`}
      />

      {/* Orbiting Particle Ring */}
      <div
        className="absolute w-[440px] h-[440px] rounded-full border border-dashed pointer-events-none transition-all duration-500 animate-pulse-ring"
        style={{
          borderColor: isDark ? 'rgba(163, 230, 53, 0.2)' : 'rgba(163, 230, 53, 0.35)',
          transform: `rotateX(65deg) rotateZ(${rotate.y * 2}deg)`,
        }}
      />

      {/* 3D Scene Root Canvas with Spring Interpolation */}
      <div
        className="relative w-full h-full flex items-center justify-center preserve-3d transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(0px)`,
        }}
      >
        {/* ==================================================== */}
        {/* Layer 1: Floating Ceramic / Glass Calendar Card      */}
        {/* ==================================================== */}
        <div
          className={`absolute w-[290px] sm:w-[320px] rounded-3xl p-5 transition-all duration-300 preserve-3d shadow-2xl ${
            isDark
              ? 'bg-[#151d2a]/95 border border-slate-700/80 text-white shadow-black/70'
              : 'bg-white/95 border border-slate-200/90 text-slate-900 shadow-slate-300/60'
          }`}
          style={{
            transform: 'translate3d(-40px, -20px, 20px) rotateZ(-2deg)',
          }}
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-slate-800">
            <span className="text-xs font-extrabold flex items-center gap-1.5 text-lime-600 dark:text-lime-400">
              <CalendarIcon className="w-3.5 h-3.5" />
              March 2025
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lime-400/20 text-lime-700 dark:text-lime-300">
              Live Sync
            </span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 my-2">
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
            <span>S</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold">
            <span className="p-1 opacity-30">27</span>
            <span className="p-1 opacity-30">28</span>
            <span className="p-1">1</span>
            <span className="p-1">2</span>
            <span className="p-1">3</span>
            <span className="p-1">4</span>
            <span className="p-1">5</span>
            <span className="p-1">6</span>
            <span className="p-1">7</span>
            <span className="p-1">8</span>
            <span className="p-1">9</span>
            <span className="p-1">10</span>
            <span className="p-1">11</span>

            {/* Selected Active Day (12) */}
            <span className="p-1 rounded-xl bg-lime-400 text-slate-950 font-black shadow-md shadow-lime-500/30 ring-2 ring-lime-400/50">
              12
            </span>
            <span className="p-1">13</span>
            <span className="p-1">14</span>
            <span className="p-1">15</span>
            <span className="p-1">16</span>
            <span className="p-1">17</span>
            <span className="p-1">18</span>
            <span className="p-1">19</span>
            <span className="p-1">20</span>
          </div>

          {/* Available Times with Neumorphic Pills */}
          <div className="mt-4 pt-3 border-t border-slate-200/40 dark:border-slate-800">
            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2">
              Available Times
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM'].map((time) => {
                const isSelected = activeSlot === time
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveSlot(time)
                    }}
                    className={`py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-lime-400 text-slate-950 shadow-md shadow-lime-500/30'
                        : isDark
                        ? 'bg-[#0f1521] text-slate-300 hover:bg-slate-800'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* Layer 2: Floating Smartphone / Service Card (Higher Z) */}
        {/* ==================================================== */}
        <div
          className={`absolute w-[240px] sm:w-[260px] rounded-3xl p-4 transition-all duration-300 preserve-3d shadow-2xl ${
            isDark
              ? 'bg-[#1b2434]/95 border border-slate-700 text-white shadow-black/80'
              : 'bg-white/95 border border-slate-200 text-slate-900 shadow-slate-300/70'
          }`}
          style={{
            transform: 'translate3d(90px, 40px, 60px) rotateZ(3deg)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-lime-600 dark:text-lime-400">
              Selected Service
            </span>
            <span className="text-sm font-extrabold text-lime-500 dark:text-lime-400">
              ${featuredService.price}
            </span>
          </div>

          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
              <img
                src={featuredStaff.avatar}
                alt={featuredStaff.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="truncate">
              <h4 className="text-xs font-bold truncate">{featuredService.name}</h4>
              <p className="text-[10px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-lime-500" />
                <span>{featuredService.durationMinutes} min • {featuredStaff.name}</span>
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/40 dark:border-slate-800">
            <div className="w-full py-2 rounded-xl text-center text-xs font-black bg-lime-400 text-slate-950 shadow-md shadow-lime-500/25 flex items-center justify-center gap-1.5">
              <span>Book Now</span>
              <ArrowRight className="w-3 h-3 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* Layer 3: Glowing 3D Confirmed Booking Badge (Top Z)  */}
        {/* ==================================================== */}
        <div
          onMouseEnter={() => setBadgeHover(true)}
          onMouseLeave={() => setBadgeHover(false)}
          className={`absolute w-20 h-24 rounded-2xl p-2.5 flex flex-col items-center justify-center transition-all duration-300 shadow-2xl preserve-3d ${
            isDark
              ? 'bg-[#182333] border-2 border-lime-400 text-white shadow-lime-500/25'
              : 'bg-white border-2 border-lime-500 text-slate-900 shadow-lime-500/20'
          }`}
          style={{
            transform: `translate3d(${badgeHover ? '135px' : '125px'}, ${
              badgeHover ? '-115px' : '-105px'
            }, 95px) rotateZ(${rotate.y * 0.8}deg)`,
          }}
        >
          {/* Glowing Top Handle */}
          <div className="w-6 h-3 rounded-t-full border-2 border-b-0 border-lime-400 -mt-4 mb-1" />
          <div className="w-10 h-10 rounded-full bg-lime-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-lime-500/40">
            <Check className="w-6 h-6 stroke-[3.5]" />
          </div>
          <span className="text-[8px] font-extrabold tracking-wider uppercase text-lime-600 dark:text-lime-400 mt-1">
            Confirmed
          </span>
        </div>

        {/* ==================================================== */}
        {/* Layer 4: Floating 3D Notification Bell Tile (Left Z) */}
        {/* ==================================================== */}
        <div
          className={`absolute w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl preserve-3d animate-float-slow ${
            isDark
              ? 'bg-[#101724] border border-slate-700/80 text-lime-400'
              : 'bg-white border border-slate-200 text-lime-600 shadow-slate-200'
          }`}
          style={{
            transform: `translate3d(-150px, 80px, 45px) rotateZ(${rotate.x * 0.6}deg)`,
          }}
        >
          <Bell className="w-6 h-6 stroke-[2.2]" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-lime-400 ring-2 ring-slate-950 animate-ping" />
        </div>

        {/* ==================================================== */}
        {/* Layer 5: Floating 3D Staff Profile Badge (Top Left Z)*/}
        {/* ==================================================== */}
        <div
          className={`absolute w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg preserve-3d animate-float-reverse ${
            isDark
              ? 'bg-[#121a28] border border-indigo-500/40 text-indigo-400'
              : 'bg-white border border-indigo-200 text-indigo-600 shadow-slate-200'
          }`}
          style={{
            transform: `translate3d(-140px, -110px, 55px) rotateZ(${-rotate.y * 0.5}deg)`,
          }}
        >
          <User className="w-6 h-6 stroke-[2]" />
        </div>
      </div>
    </div>
  )
}

