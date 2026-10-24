import React from 'react'
import { RotateCcw, ShieldCheck, Sliders } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { IndustryId } from '../../types'
import { INDUSTRY_PRESETS } from '../../data/presets'
import { ThemeToggle } from '../common/ThemeToggle'

export const SettingsView: React.FC = () => {
  const { currentIndustryId, setIndustry, resetDemo, theme } = useApp()
  const isDark = theme === 'dark'

  const handleReset = () => {
    if (window.confirm('Reset all demo state to the default clean mock baseline?')) {
      resetDemo()
      alert('Demo data restored to initial factory state.')
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-2">
        <h1 className="text-2xl font-extrabold tracking-tight">Prototype Demo Settings</h1>
        <p className="text-xs sm:text-sm opacity-60">
          Switch active industry presets, review automation rules, and manage demo local storage.
        </p>
      </div>

      {/* Theme Selection Card */}
      <div
        className={`rounded-3xl p-6 space-y-4 transition-all ${
          isDark ? 'neu-raised' : 'neu-raised'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold">Theme Appearance</h2>
            <p className="text-xs opacity-60">Toggle between tactile Dark and Light Neumorphic modes</p>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Preset Switcher Card */}
      <div
        className={`rounded-3xl p-6 space-y-4 transition-all border ${
          isDark ? 'neu-raised border-[#c5a880]/20' : 'neu-raised border-[#c5a880]/30'
        }`}
      >
        <div className="flex items-center gap-2 pb-3 border-b border-stone-200/40 dark:border-stone-800">
          <Sliders className="w-5 h-5 text-[#dfc299]" />
          <h2 className="text-base font-bold">Active Industry Preset</h2>
        </div>

        <p className="text-xs opacity-70">
          Changing the preset dynamically switches the sample business entity, services, durations, prices, staff, and terminology.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {Object.values(INDUSTRY_PRESETS).map((ind) => {
            const isSelected = currentIndustryId === ind.id
            return (
              <button
                key={ind.id}
                onClick={() => setIndustry(ind.id as IndustryId)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-[#c5a880] bg-[#c5a880]/15 ring-2 ring-[#c5a880]/30 shadow-md'
                    : isDark
                    ? 'border-stone-800 bg-[#151210] hover:border-stone-700'
                    : 'border-stone-200 bg-stone-50 hover:border-stone-300'
                }`}
              >
                <span className="font-bold text-xs block">{ind.name}</span>
                <span className="text-[11px] opacity-60 block mt-0.5">{ind.categoryLabel}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Automation Rules Configuration (Simulated) */}
      <div
        className={`rounded-3xl p-6 space-y-4 transition-all border ${
          isDark ? 'neu-raised border-[#c5a880]/20' : 'neu-raised border-[#c5a880]/30'
        }`}
      >
        <h2 className="text-base font-bold pb-3 border-b border-stone-200/40 dark:border-stone-800">
          Scheduling & Buffer Rules
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <div
            className={`p-4 rounded-2xl border space-y-1 ${
              isDark ? 'bg-[#151210] border-stone-800' : 'bg-stone-50 border-stone-200'
            }`}
          >
            <span className="opacity-60 font-semibold">Turnover Sanitation Buffer:</span>
            <p className="text-sm font-bold">10 minutes between appointments</p>
            <p className="text-[11px] opacity-50">Prevents back-to-back overlap</p>
          </div>

          <div
            className={`p-4 rounded-2xl border space-y-1 ${
              isDark ? 'bg-[#151210] border-stone-800' : 'bg-stone-50 border-stone-200'
            }`}
          >
            <span className="opacity-60 font-semibold">Automated Reminder Sequences:</span>
            <p className="text-sm font-bold">24-hour & 1-hour pre-service triggers</p>
            <p className="text-[11px] opacity-50">Configured with SMS + Email delivery</p>
          </div>
        </div>
      </div>

      {/* Reset Demo State */}
      <div
        className={`rounded-3xl p-6 space-y-4 transition-all border ${
          isDark ? 'neu-raised border-[#c5a880]/20' : 'neu-raised border-[#c5a880]/30'
        }`}
      >
        <div className="flex items-center gap-2 pb-3 border-b border-stone-200/40 dark:border-stone-800 text-rose-500">
          <RotateCcw className="w-5 h-5" />
          <h2 className="text-base font-bold">Reset Prototype Demo</h2>
        </div>

        <p className="text-xs opacity-70 leading-relaxed">
          Restore the initial baseline appointments, events, notifications, and customers. This clears the prototype's versioned local storage key (<code>bookly_demo_state_v1</code>) without affecting any other browser data.
        </p>

        <button
          onClick={handleReset}
          className="px-6 py-2.5 rounded-full font-bold bg-rose-600 hover:bg-rose-700 text-white text-xs shadow-md shadow-rose-600/20 flex items-center gap-2 transition-all uppercase tracking-wider"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Demo Data</span>
        </button>
      </div>

      {/* Prototype Attribution */}
      <div
        className={`p-6 rounded-3xl border text-xs space-y-2 ${
          isDark ? 'bg-[#151210] border-stone-800 text-stone-400' : 'bg-stone-100 border-stone-200 text-stone-600'
        }`}
      >
        <div className="flex items-center gap-2 font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-[#dfc299]" />
          <span>Dawnexus Showcase Prototype Boundaries</span>
        </div>
        <p className="leading-relaxed">
          This system is an interactive front-end prototype. All appointment records, SMS alerts, reminder timelines, and invoices are executed locally within the client session.
        </p>
      </div>
    </div>
  )
}
