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
  Sparkles,
  Star,
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
      desc: 'Clients choose tailored services, browse verified specialist credentials, and select their preferred date and slot with real-time schedule checks.',
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
      className={`py-24 border-t transition-colors duration-300 ${
        isDark ? 'bg-[#0f0d0b] border-[#c5a880]/20' : 'bg-[#f7f2ea] border-[#c5a880]/25'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c5a880] px-4 py-1.5 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 inline-block">
            OPERATIONAL METHODOLOGY
          </span>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-classic-serif font-normal mt-4 leading-tight ${
              isDark ? 'text-[#f5f0eb]' : 'text-[#1c1917]'
            }`}
          >
            Streamlined from First Click to Completed Service
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-3 max-w-xl mx-auto font-light leading-relaxed">
            Eliminate phone tag, double bookings, and manual admin friction with fully orchestrated luxury booking pipelines.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className={`rounded-3xl p-8 relative group transition-all duration-300 hover:-translate-y-1 border ${
                isDark
                  ? 'neu-raised border-[#c5a880]/20 hover:border-[#c5a880]/50'
                  : 'bg-white border-[#c5a880]/30 hover:border-[#c5a880]/60 shadow-md shadow-stone-200/50'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-classic-serif font-light transition-colors text-stone-400 dark:text-stone-600 group-hover:text-[#dfc299]">
                  {step.num}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#dfc299] bg-[#c5a880]/15 px-3 py-1 rounded-full border border-[#c5a880]/30">
                  {step.tag}
                </span>
              </div>
              <h3
                className={`text-xl font-classic-serif font-medium mb-3 ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}
              >
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
                {step.desc}
              </p>
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
        'Enforces configurable turnover breaks, staff shift blocks, and real-time validation across all team members.',
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
      title: 'Simulated Invoicing & Deposits',
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
      className={`py-24 border-t transition-colors duration-300 ${
        isDark ? 'bg-[#0a0908] border-[#c5a880]/20' : 'bg-[#faf7f2] border-[#c5a880]/25'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c5a880] px-4 py-1.5 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 inline-block">
            ENTERPRISE CAPABILITIES
          </span>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-classic-serif font-normal mt-4 leading-tight ${
              isDark ? 'text-[#f5f0eb]' : 'text-[#1c1917]'
            }`}
          >
            Engineered for High-Efficiency Service Operations
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-3 max-w-xl mx-auto font-light leading-relaxed">
            Everything your prestige enterprise requires to welcome clients, coordinate schedules, and automate routine communications.
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
                className={`p-6 sm:p-7 rounded-3xl transition-all cursor-pointer border ${
                  isSelected
                    ? isDark
                      ? 'bg-[#181411] border-[#c5a880] shadow-xl shadow-[#c5a880]/10'
                      : 'bg-white border-[#c5a880] shadow-xl shadow-[#c5a880]/15'
                    : isDark
                    ? 'bg-[#120f0d] border-[#c5a880]/20 hover:border-[#c5a880]/40'
                    : 'bg-white/80 border-[#c5a880]/25 hover:border-[#c5a880]/40 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-transform ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#dfc299] to-[#c5a880] text-[#14100c] scale-105 shadow-md'
                        : isDark
                        ? 'bg-[#221c17] text-[#dfc299]'
                        : 'bg-stone-100 text-[#8c6d42]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3
                      className={`text-base font-classic-serif font-semibold ${
                        isDark ? 'text-white' : 'text-stone-900'
                      }`}
                    >
                      {feat.title}
                    </h3>
                    <p className="text-[11px] text-stone-400">{feat.short}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed mb-4 font-light">
                  {feat.detail}
                </p>

                <div className="pt-3 border-t border-stone-200/20 dark:border-stone-800/80 flex items-center gap-2 text-xs font-semibold text-[#dfc299]">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0 text-[#c5a880]" />
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
      className={`py-24 border-t transition-colors duration-300 ${
        isDark ? 'bg-[#0f0d0b] border-[#c5a880]/20' : 'bg-[#f7f2ea] border-[#c5a880]/25'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border ${
            isDark
              ? 'bg-[#151210] border-[#c5a880]/30 shadow-black/80'
              : 'bg-white border-[#c5a880]/35 shadow-stone-200/60'
          }`}
        >
          <div className="max-w-3xl mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c5a880] px-4 py-1.5 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 inline-block">
              SYNCHRONIZED AUTOMATION ENGINE
            </span>
            <h3
              className={`text-2xl sm:text-3xl md:text-4xl font-classic-serif font-normal mt-3 leading-tight ${
                isDark ? 'text-[#f5f0eb]' : 'text-[#1c1917]'
              }`}
            >
              Observe How the Automated Sequence Executes
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm mt-2 font-light max-w-xl">
              Every booking triggers synchronized deterministic state transitions across calendars, customer profiles, reminder queues, and notification centers.
            </p>
          </div>

          {/* Workflow Step Diagram with Classic Bronze Styling */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3.5 pt-2">
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
                    ? 'bg-[#0e0c0a] border-[#c5a880]/15 shadow-inner'
                    : 'bg-[#faf7f2] border-[#c5a880]/20 shadow-sm'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-[#c5a880]/20 text-[#dfc299] text-xs font-bold flex items-center justify-center border border-[#c5a880]/30">
                  {i + 1}
                </div>
                <div>
                  <p
                    className={`text-xs font-bold leading-tight ${
                      isDark ? 'text-white' : 'text-stone-900'
                    }`}
                  >
                    {st.title}
                  </p>
                  <p className="text-[10px] text-stone-400 mt-1 font-mono">{st.status}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200/20 dark:border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <ShieldCheck className="w-4 h-4 text-[#dfc299]" />
              <span>Simulated local event bus with zero third-party leakage.</span>
            </div>
            <Link
              to="/appointment-automation/dashboard/automation"
              className="px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs neu-gold-btn shadow-md transition-all flex items-center gap-2"
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
      a: 'Yes. Both themes are fully supported with tactile classic luxury elevation, high-contrast readable surfaces, and customizable visual tokens.',
    },
  ]

  return (
    <section
      id="faq"
      className={`py-24 border-t transition-colors duration-300 ${
        isDark ? 'bg-[#0a0908] border-[#c5a880]/20' : 'bg-[#faf7f2] border-[#c5a880]/25'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c5a880] px-4 py-1.5 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 inline-block">
            FREQUENT INQUIRIES
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-classic-serif font-normal mt-3 ${
              isDark ? 'text-[#f5f0eb]' : 'text-[#1c1917]'
            }`}
          >
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={`border rounded-2xl overflow-hidden transition-colors ${
                  isDark
                    ? 'bg-[#151210] border-[#c5a880]/20'
                    : 'bg-white border-[#c5a880]/30 shadow-sm'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`w-full text-left p-5 flex items-center justify-between font-medium text-sm sm:text-base ${
                    isDark ? 'text-white' : 'text-stone-900'
                  }`}
                >
                  <span className="font-classic-serif text-lg">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#dfc299] transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-stone-400 leading-relaxed border-t border-stone-200/20 dark:border-stone-800/80 pt-3 font-light">
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
      className={`border-t py-14 text-xs transition-colors duration-300 ${
        isDark ? 'bg-[#080706] border-[#c5a880]/20 text-stone-400' : 'bg-white border-[#c5a880]/25 text-stone-500'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#c5a880]/15">
          <BrandLogo />
          <div className="flex flex-wrap items-center gap-7 text-xs font-semibold tracking-wider uppercase">
            <Link to="/appointment-automation" className="hover:text-[#dfc299] transition-colors">
              Home
            </Link>
            <Link to="/appointment-automation/demo" className="hover:text-[#dfc299] transition-colors">
              Booking Demo
            </Link>
            <Link to="/appointment-automation/dashboard" className="hover:text-[#dfc299] transition-colors">
              Business Dashboard
            </Link>
            <Link to="/appointment-automation/dashboard/automation" className="hover:text-[#dfc299] transition-colors">
              Automation Engine
            </Link>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>
            © {new Date().getFullYear()} Bookly. Built under{' '}
            <a
              href="https://dawnexus.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#dfc299] font-bold hover:underline"
            >
              Dawnexus
            </a>{' '}
            product showcase ecosystem. All rights reserved.
          </p>
          <p
            className={`px-3 py-1.5 rounded-full border ${
              isDark
                ? 'bg-[#14110f] border-[#c5a880]/25 text-stone-400'
                : 'bg-stone-50 border-[#c5a880]/30 text-stone-600'
            }`}
          >
            Interactive front-end prototype. All simulated bookings and communications are local.
          </p>
        </div>
      </div>
    </footer>
  )
}
