import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  ShieldCheck,
  BellRing,
  CreditCard,
  BarChart3,
  Users,
  CheckCircle,
  ChevronDown,
  ArrowRight,
  Workflow,
} from 'lucide-react'
import { BrandLogo } from '../common/BrandLogo'
import { useApp } from '../../context/AppContext'

export const HowItWorksSection: React.FC = () => {
  const { theme } = useApp()
  const isDark = theme === 'dark'

  const steps = [
    {
      num: '01',
      title: 'Select Service & Professional',
      desc: 'Clients pick tailored services, browse staff ratings, and select their preferred date and slot with real-time availability check.',
      tag: 'Self-Serve Portal',
    },
    {
      num: '02',
      title: 'Automated Availability Engine',
      desc: 'The engine validates provider schedules, locks slots, factors turnover buffers, and prepares appointment records in milliseconds.',
      tag: 'Conflict-Free',
    },
    {
      num: '03',
      title: 'Smart Reminders & Zero No-Shows',
      desc: 'Simulated 24-hour and 1-hour SMS/Email reminders fire automatically with one-tap reschedule or cancellation links.',
      tag: 'Automated Retention',
    },
  ]

  return (
    <section
      id="how-it-works"
      className={`py-20 border-t transition-colors duration-300 ${
        isDark ? 'bg-[#0d131f] border-slate-800' : 'bg-slate-100/70 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-lime-600 dark:text-lime-400 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20">
            How It Works
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold mt-3 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Streamlined from first click to completed service
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-3">
            Eliminate phone tag, double bookings, and manual admin work with fully orchestrated booking pipelines.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className={`rounded-3xl p-8 relative group transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? 'neu-raised hover:border-lime-500/50'
                  : 'neu-raised hover:border-lime-500/50'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-black font-mono transition-colors text-slate-300 dark:text-slate-700 group-hover:text-lime-500">
                  {step.num}
                </span>
                <span className="text-[11px] font-bold text-lime-700 dark:text-lime-400 bg-lime-400/15 px-2.5 py-1 rounded-full border border-lime-400/25">
                  {step.tag}
                </span>
              </div>
              <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const FeaturesShowcase: React.FC = () => {
  const { theme } = useApp()
  const isDark = theme === 'dark'
  const [activeTab, setActiveTab] = useState<number>(0)

  const features = [
    {
      title: 'Automated 2-Tier Reminders',
      icon: BellRing,
      short: 'Curb no-shows with timed notifications',
      detail:
        'Configurable 24-hour and 1-hour automated alerts dispatched via SMS and email with integrated direct reschedule links.',
      benefit: 'Reduces appointment no-shows by up to 68%',
    },
    {
      title: 'Smart Calendar & Buffer Logic',
      icon: Calendar,
      short: 'Zero overlapping bookings, ever',
      detail:
        'Enforces configurable sanitization breaks, staff shift blocks, and real-time validation across team members.',
      benefit: 'Prevents double-booking disasters',
    },
    {
      title: 'Intelligent Waitlist Auto-Fill',
      icon: Users,
      short: 'Turn cancellations into revenue',
      detail:
        'When a client cancels, eligible waitlisted customers are detected and offered the vacant slot automatically.',
      benefit: 'Recovers 85% of vacant cancellation slots',
    },
    {
      title: 'Simulated Invoicing & Payments',
      icon: CreditCard,
      short: 'Collect deposits or full service fees',
      detail:
        'Flexible 40% deposit or full charge simulations with downloadable invoice receipts and financial logs.',
      benefit: 'Secures commitment before arrival',
    },
    {
      title: 'Real-Time Automation Event Log',
      icon: Workflow,
      short: 'Complete observability of every action',
      detail:
        'Inspect raw triggered events: booking, confirmation dispatch, reminder queueing, waitlist triggers, and staff updates.',
      benefit: 'Full transparent audit trail',
    },
    {
      title: '6-Vector Business Analytics',
      icon: BarChart3,
      short: 'Data-driven operational intelligence',
      detail:
        'Monitor booking volume, revenue run-rate, staff utilization, customer source breakdown, and attendance trends.',
      benefit: 'Actionable business metrics at a glance',
    },
  ]

  return (
    <section
      id="features"
      className={`py-20 border-t transition-colors duration-300 ${
        isDark ? 'bg-[#090d14] border-slate-800' : 'bg-[#eaf0f7] border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-lime-600 dark:text-lime-400 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20">
            Features Showcase
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold mt-3 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Engineered for high-efficiency service operations
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-3">
            Everything your business needs to attract customers, fill calendars, and automate routine client communication.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon
            const isSelected = activeTab === idx
            return (
              <div
                key={feat.title}
                onClick={() => setActiveTab(idx)}
                className={`p-6 rounded-3xl transition-all cursor-pointer border ${
                  isSelected
                    ? isDark
                      ? 'bg-[#151d2b] border-lime-400 shadow-xl shadow-lime-500/10'
                      : 'bg-white border-lime-500 shadow-xl shadow-lime-500/15'
                    : isDark
                    ? 'bg-[#101622] border-slate-800 hover:border-slate-700'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-transform ${
                      isSelected
                        ? 'bg-lime-400 text-slate-950 scale-105'
                        : isDark
                        ? 'bg-slate-800 text-lime-400'
                        : 'bg-slate-100 text-lime-700'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-400">{feat.short}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {feat.detail}
                </p>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-lime-600 dark:text-lime-400">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{feat.benefit}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export const WorkflowPreviewSection: React.FC = () => {
  const { theme } = useApp()
  const isDark = theme === 'dark'

  return (
    <section
      className={`py-20 border-t transition-colors duration-300 ${
        isDark ? 'bg-[#0d121c] border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border ${
            isDark
              ? 'bg-gradient-to-br from-[#131a26] to-[#0f1520] border-slate-700'
              : 'bg-white border-slate-200 shadow-slate-200'
          }`}
        >
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-lime-600 dark:text-lime-400 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20">
              Interactive Automation Engine
            </span>
            <h3
              className={`text-2xl sm:text-3xl font-extrabold mt-3 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Observe how the automated sequence executes
            </h3>
            <p className="text-slate-500 dark:text-slate-300 text-sm mt-2">
              Every booking triggers synchronized deterministic state transitions across calendars, customer profiles, reminder queues, and notification centers.
            </p>
          </div>

          {/* Workflow Step Diagram */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-4">
            {[
              { title: '1. Booking Received', status: 'Triggered' },
              { title: '2. Validate Slot', status: 'Conflict Check' },
              { title: '3. Lock Calendar', status: 'Staff Assigned' },
              { title: '4. Dispatch Receipt', status: 'SMS / Email' },
              { title: '5. Queue 24h & 1h', status: 'Reminders Active' },
              { title: '6. Dashboard Update', status: 'Live Metrics' },
            ].map((st, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
                  isDark
                    ? 'bg-[#0a0f18] border-slate-800 shadow-inner'
                    : 'bg-slate-50 border-slate-200 shadow-sm'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-lime-400/20 text-lime-600 dark:text-lime-400 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <div>
                  <p className={`text-xs font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {st.title}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">{st.status}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-lime-500" />
              <span>Simulated local event bus with zero third-party leakage.</span>
            </div>
            <Link
              to="/appointment-automation/dashboard/automation"
              className="px-5 py-2.5 rounded-xl font-bold bg-lime-400 hover:bg-lime-300 text-slate-950 text-xs shadow-md transition-all flex items-center gap-2"
            >
              <span>Inspect Workflow in Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export const FAQSection: React.FC = () => {
  const { theme } = useApp()
  const isDark = theme === 'dark'
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      q: 'Is this a production booking service or a prototype?',
      a: 'This is an interactive front-end prototype engineered by Dawnexus. All booking confirmations, SMS alerts, reminder sequences, and credit card payments are locally simulated to demonstrate modern SaaS architecture and UX principles.',
    },
    {
      q: 'How does the industry switcher work?',
      a: 'Switching between the seven presets (Clinics, Salons, Consulting, Fitness, Education, Automotive, Events) immediately populates specialized business names, service lists, duration rules, staff rosters, and terminology.',
    },
    {
      q: 'Will my test bookings survive page refreshes?',
      a: 'Yes. State is saved safely in your browser’s localStorage using a versioned schema. You can click "Reset Demo" at any time to return to initial clean mock state.',
    },
    {
      q: 'Can I test rescheduling and cancellations?',
      a: 'Absolutely. You can reschedule or cancel any appointment from either the confirmation page or the Business Dashboard. Cancelling also demonstrates the automated waitlist matching simulation.',
    },
    {
      q: 'Does it support dark and light hybrid modes?',
      a: 'Yes. Both themes are fully supported with tactile Neumorphic elevation, high-contrast readable surfaces, and customizable visual tokens.',
    },
  ]

  return (
    <section
      id="faq"
      className={`py-20 border-t transition-colors duration-300 ${
        isDark ? 'bg-[#090d14] border-slate-800' : 'bg-slate-100/60 border-slate-200'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-lime-600 dark:text-lime-400 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20">
            Frequently Asked Questions
          </span>
          <h2 className={`text-3xl font-extrabold mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Everything you need to know
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={`border rounded-2xl overflow-hidden transition-colors ${
                  isDark ? 'bg-[#121824] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`w-full text-left p-5 flex items-center justify-between font-semibold text-sm sm:text-base ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-lime-500 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-500 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export const LandingFooter: React.FC = () => {
  const { theme } = useApp()
  const isDark = theme === 'dark'

  return (
    <footer
      className={`border-t py-12 text-xs transition-colors duration-300 ${
        isDark ? 'bg-[#070a10] border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          <BrandLogo />
          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold">
            <Link to="/appointment-automation" className="hover:text-lime-500">
              Home
            </Link>
            <Link to="/appointment-automation/demo" className="hover:text-lime-500">
              Booking Demo
            </Link>
            <Link to="/appointment-automation/dashboard" className="hover:text-lime-500">
              Business Dashboard
            </Link>
            <Link to="/appointment-automation/dashboard/automation" className="hover:text-lime-500">
              Automation Engine
            </Link>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>
            © {new Date().getFullYear()} Bookly. Built by{' '}
            <a
              href="https://dawnexus.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-600 dark:text-lime-400 font-bold hover:underline"
            >
              Dawnexus
            </a>{' '}
            showcase ecosystem. All rights reserved.
          </p>
          <p
            className={`px-3 py-1.5 rounded-lg border ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            Interactive front-end prototype. All simulated bookings and communications are local.
          </p>
        </div>
      </div>
    </footer>
  )
}
