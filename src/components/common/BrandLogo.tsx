import React from 'react'
import { useApp } from '../../context/AppContext'

interface BrandLogoProps {
  variant?: 'full' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  forceTheme?: 'light' | 'dark'
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  size = 'md',
  forceTheme,
}) => {
  const { theme } = useApp()
  const currentTheme = forceTheme || theme

  const isDark = currentTheme === 'dark'

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  }

  return (
    <div className="flex items-center gap-2.5 select-none group">
      {/* Original Vector Monogram Icon */}
      <div
        className={`${iconSizes[size]} rounded-2xl relative flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
          isDark
            ? 'bg-[#121927] border border-slate-800 shadow-lg shadow-black/40'
            : 'bg-white border border-slate-200/90 shadow-md shadow-slate-300/40'
        }`}
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/4 h-3/4"
        >
          <defs>
            <linearGradient id="brandLogoGrad" x1="2" y1="2" x2="34" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#bef264" />
              <stop offset="50%" stopColor="#a3e635" />
              <stop offset="100%" stopColor="#65a30d" />
            </linearGradient>
          </defs>

          {/* Calendar Spine & Double Loop monogram */}
          <path
            d="M10 8C10 6.89543 10.8954 6 12 6H20C23.866 6 27 9.13401 27 13C27 15.5 25.5 17.5 23.5 18.5C26 19.5 28 22 28 25C28 29.4183 24.4183 33 20 33H12C10.8954 33 10 32.1046 10 31V8Z"
            stroke="url(#brandLogoGrad)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Top calendar header slot */}
          <path d="M10 13H24" stroke="url(#brandLogoGrad)" strokeWidth="2.4" strokeLinecap="round" />
          {/* Mid divider */}
          <path d="M10 19.5H21" stroke="url(#brandLogoGrad)" strokeWidth="2.4" strokeLinecap="round" />
          {/* Dynamic confirmation checkmark inside bottom loop */}
          <path
            d="M15.5 26.5L18.5 29.5L23.5 23.5"
            stroke="#bef264"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Ambient subtle glow dot */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-lime-400 ring-2 ring-[#0b0f17] shadow-sm shadow-lime-400" />
      </div>

      {/* Full Wordmark */}
      {variant === 'full' && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`${textSizes[size]} font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Bookly
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-lime-400/20 text-lime-600 dark:text-lime-400 border border-lime-400/30">
              PROTOTYPE
            </span>
          </div>
          <span
            className={`text-[10px] sm:text-[11px] font-medium tracking-wide flex items-center gap-1 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Built by{' '}
            <a
              href="https://dawnexus.in"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-lime-600 dark:text-lime-400 font-bold hover:underline cursor-pointer"
            >
              Dawnexus
            </a>
          </span>
        </div>
      )}
    </div>
  )
}
