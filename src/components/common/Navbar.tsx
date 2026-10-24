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
            ? 'bg-[#0c0a09]/90 border-[#c5a880]/20 text-[#f5f0eb]'
            : 'bg-[#faf7f2]/95 border-[#c5a880]/30 text-stone-900 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/appointment-automation" className="hover:opacity-95 transition-opacity">
            <BrandLogo />
          </Link>

          {/* Desktop Navigation Links with Classic Editorial Spacing */}
          <nav
            className={`hidden md:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase transition-colors ${
              isDark ? 'text-stone-300' : 'text-stone-600'
            }`}
          >
            <button
              onClick={() => handleScrollTo('product')}
              className="hover:text-[#dfc299] transition-colors cursor-pointer"
            >
              Product
            </button>
            <button
              onClick={() => handleScrollTo('how-it-works')}
              className="hover:text-[#dfc299] transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => handleScrollTo('industries')}
              className="hover:text-[#dfc299] transition-colors cursor-pointer"
            >
              Industries
            </button>
            <button
              onClick={() => handleScrollTo('features')}
              className="hover:text-[#dfc299] transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => handleScrollTo('faq')}
              className="hover:text-[#dfc299] transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Action CTAs & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Real-time Theme Slider */}
            <ThemeToggle />

            <button
              onClick={() => setResetConfirmOpen(true)}
              title="Reset Demo to Initial Seed Data"
              className={`p-2.5 rounded-full border text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isDark
                  ? 'bg-[#181512] hover:bg-[#221d18] text-stone-400 hover:text-white border-[#c5a880]/20'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 border-[#c5a880]/30'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <Link
              to="/appointment-automation/dashboard"
              className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all flex items-center gap-2 ${
                isDark
                  ? 'bg-[#181512] hover:bg-[#221d18] text-stone-200 border-[#c5a880]/30'
                  : 'bg-white hover:bg-stone-50 text-stone-800 border-[#c5a880]/40 shadow-sm'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#dfc299]" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/appointment-automation/demo"
              className="px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase neu-gold-btn shadow-md hover:shadow-lg transition-all flex items-center gap-2 transform active:scale-95"
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
              isDark ? 'bg-[#14110f] border-[#c5a880]/20 text-[#faf7f2]' : 'bg-[#fbf9f5] border-[#c5a880]/30 text-[#1a1614]'
            }`}
          >
            <div className="flex flex-col space-y-3 text-base font-semibold">
              <button
                onClick={() => handleScrollTo('product')}
                className="text-left py-1 hover:text-[#dfc299] transition-colors"
              >
                Product
              </button>
              <button
                onClick={() => handleScrollTo('how-it-works')}
                className="text-left py-1 hover:text-[#dfc299] transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => handleScrollTo('industries')}
                className="text-left py-1 hover:text-[#dfc299] transition-colors"
              >
                Industries
              </button>
              <button
                onClick={() => handleScrollTo('features')}
                className="text-left py-1 hover:text-[#dfc299] transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => handleScrollTo('faq')}
                className="text-left py-1 hover:text-[#dfc299] transition-colors"
              >
                FAQ
              </button>
            </div>

            <div className="pt-4 border-t border-[#c5a880]/20 flex flex-col gap-3">
              <Link
                to="/appointment-automation/demo"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-full font-bold neu-gold-btn uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Try Booking Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/appointment-automation/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full text-center py-3 rounded-full font-bold border flex items-center justify-center gap-2 text-xs uppercase tracking-wider ${
                  isDark ? 'bg-stone-900 text-[#dfc299] border-[#c5a880]/30' : 'bg-white text-stone-800 border-stone-300'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-[#dfc299]" />
                <span>Explore Dashboard</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div
            className={`rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border space-y-4 ${
              isDark ? 'bg-[#161311] border-[#c5a880]/30 text-[#faf7f2]' : 'bg-[#faf7f2] border-[#c5a880]/40 text-[#1a1614]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#c5a880]/20 text-[#dfc299] flex items-center justify-center border border-[#c5a880]/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-classic-serif font-normal">Reset Demo State?</h3>
                <p className="text-xs text-stone-400">Restore factory baseline mock data</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              This restores clean deterministic presets across all 7 industries without wiping unrelated application data.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border ${
                  isDark ? 'bg-stone-800 text-stone-300 border-stone-700' : 'bg-stone-100 text-stone-700 border-stone-300'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-full text-xs font-bold neu-gold-btn uppercase tracking-wider shadow-md"
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
