import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useApp } from '../../context/AppContext'

interface ThemeToggleProps {
  className?: string
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useApp()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center h-9 w-18 rounded-full p-1 cursor-pointer transition-all duration-300 select-none ${
        isDark
          ? 'bg-[#151d2c] border border-slate-700/80 shadow-inner'
          : 'bg-[#e2e8f0] border border-slate-300 shadow-inner'
      } ${className}`}
    >
      {/* Sliding Tactile Knob */}
      <span
        className={`absolute top-1 w-7 h-7 rounded-full transition-transform duration-300 ease-spring flex items-center justify-center ${
          isDark
            ? 'translate-x-9 bg-slate-900 border border-slate-700 text-lime-400 shadow-md'
            : 'translate-x-0 bg-white border border-slate-200 text-amber-500 shadow-md'
        }`}
      >
        {isDark ? <Moon className="w-3.5 h-3.5 stroke-[2.5]" /> : <Sun className="w-3.5 h-3.5 stroke-[2.5]" />}
      </span>

      {/* Background Icons */}
      <div className="w-full flex items-center justify-between px-1.5 pointer-events-none">
        <Sun
          className={`w-3.5 h-3.5 transition-opacity duration-200 ${
            !isDark ? 'opacity-0' : 'text-slate-500 opacity-70'
          }`}
        />
        <Moon
          className={`w-3.5 h-3.5 transition-opacity duration-200 ${
            isDark ? 'opacity-0' : 'text-slate-400 opacity-70'
          }`}
        />
      </div>
    </button>
  )
}

