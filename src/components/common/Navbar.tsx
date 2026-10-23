import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { BrandLogo } from './BrandLogo'
import { ThemeToggle } from './ThemeToggle'
import { ArrowRight, LayoutDashboard, Sparkles, RotateCcw, Menu, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, resetDemo } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false)

  const isDark = theme === 'dark'
  const isLanding = location.pathname === '/appointment-automation' || location.pathname === '/'

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false)
    if (!isLanding) {
      navigate(`/appointment-automation#${id}`)
      return
    }
    const elem = document.getElementById(id)
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleReset = () => {
    resetDemo()
    setResetConfirmOpen(false)
    alert('Prototype demo reset to initial deterministic state.')
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full backdrop-blur-md transition-colors duration-300 border-b ${
          isDark
            ? 'bg-[#0d121c]/90 border-slate-800/80 text-slate-100'
            : 'bg-white/90 border-slate-200/90 text-slate-900 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/appointment-automation" className="hover:opacity-95 transition-opacity">
            <BrandLogo />
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className={`hidden md:flex items-center gap-7 text-sm font-semibold transition-colors ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <button
              onClick={() => handleScrollTo('product')}
              className="hover:text-lime-500 transition-colors cursor-pointer"
            >
              Product
            </button>
            <button
              onClick={() => handleScrollTo('how-it-works')}
              className="hover:text-lime-500 transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => handleScrollTo('industries')}
              className="hover:text-lime-500 transition-colors cursor-pointer"
            >
              Industries
            </button>
            <button
              onClick={() => handleScrollTo('features')}
              className="hover:text-lime-500 transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => handleScrollTo('faq')}
              className="hover:text-lime-500 transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Action CTAs & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Real-time Neumorphic Theme Slider */}
            <ThemeToggle />

            <button
              onClick={() => setResetConfirmOpen(true)}
              title="Reset Demo to Initial Seed Data"
              className={`p-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isDark
                  ? 'bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white border-slate-700/60'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border-slate-200'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <Link
              to="/appointment-automation/dashboard"
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                isDark
                  ? 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border-slate-700'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-sm'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-lime-500" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/appointment-automation/demo"
              className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-lime-400 hover:bg-lime-300 text-slate-950 shadow-md shadow-lime-500/20 hover:shadow-lime-500/35 transition-all flex items-center gap-2 transform active:scale-95"
            >
              <span>Try Demo</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.8]" />
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl border ${
                isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className={`sm:hidden border-b px-6 py-6 space-y-4 shadow-2xl ${
              isDark ? 'bg-[#111622] border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex flex-col space-y-3 text-base font-semibold">
              <button
                onClick={() => handleScrollTo('product')}
                className="text-left py-1 hover:text-lime-500"
              >
                Product
              </button>
              <button
                onClick={() => handleScrollTo('how-it-works')}
                className="text-left py-1 hover:text-lime-500"
              >
                How It Works
              </button>
              <button
                onClick={() => handleScrollTo('industries')}
                className="text-left py-1 hover:text-lime-500"
              >
                Industries
              </button>
              <button
                onClick={() => handleScrollTo('features')}
                className="text-left py-1 hover:text-lime-500"
              >
                Features
              </button>
              <button
                onClick={() => handleScrollTo('faq')}
                className="text-left py-1 hover:text-lime-500"
              >
                FAQ
              </button>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
              <Link
                to="/appointment-automation/demo"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl font-extrabold bg-lime-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-lime-500/20"
              >
                <span>Try Booking Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/appointment-automation/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full text-center py-3 rounded-xl font-bold border flex items-center justify-center gap-2 ${
                  isDark ? 'bg-slate-800 text-white border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-lime-500" />
                <span>Explore Dashboard</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div
            className={`rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border space-y-4 ${
              isDark ? 'bg-[#151c28] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-lime-400/20 text-lime-500 flex items-center justify-center border border-lime-400/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Reset Demo State?</h3>
                <p className="text-xs text-slate-400">Restore factory baseline mock data</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              This restores clean deterministic presets across all 7 industries without wiping unrelated application data.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                  isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-300'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-lime-400 hover:bg-lime-300 text-slate-950 shadow-md shadow-lime-500/20"
              >
                Yes, Reset Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
