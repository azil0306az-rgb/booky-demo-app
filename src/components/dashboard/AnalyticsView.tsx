import React, { useState, useEffect } from 'react'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Download,
  CheckCircle2,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { SkeletonAnalyticsCharts } from '../common/Skeletons'

export const AnalyticsView: React.FC = () => {
  const { exportAppointmentsCSV, currentIndustry, theme } = useApp()
  const isDark = theme === 'dark'
  const [timeRange, setTimeRange] = useState<string>('30')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 450)
    return () => clearTimeout(timer)
  }, [timeRange])

  // Trend data points matching Panel 7/8 in reference image
  const trendData = [
    { date: 'Mar 1', completed: 32, cancelled: 4, noShow: 2 },
    { date: 'Mar 8', completed: 45, cancelled: 5, noShow: 3 },
    { date: 'Mar 15', completed: 58, cancelled: 6, noShow: 4 },
    { date: 'Mar 22', completed: 51, cancelled: 3, noShow: 2 },
    { date: 'Mar 30', completed: 62, cancelled: 4, noShow: 3 },
  ]

  const maxVal = 70

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-3xl font-classic-serif font-normal tracking-tight">Analytics & Intelligence</h1>
          <p className="text-xs sm:text-sm opacity-60">
            Real-time conversion funnels, provider utilization, and automated retention metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border focus:outline-none focus:ring-2 focus:ring-[#c5a880] cursor-pointer ${
              isDark ? 'bg-[#151210] border-stone-800 text-white' : 'bg-white border-stone-300 text-stone-800 shadow-sm'
            }`}
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>

          <button
            onClick={exportAppointmentsCSV}
            className="px-5 py-2.5 rounded-full text-xs font-bold neu-gold-btn uppercase tracking-wider flex items-center gap-2 transition-all interactive-scale shadow-md"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <SkeletonAnalyticsCharts />
      ) : (
        <>
          {/* 4 Analytics Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Bookings */}
        <div
          className={`p-5 rounded-3xl space-y-2 transition-all border ${
            isDark ? 'neu-raised border-[#c5a880]/20' : 'neu-raised border-[#c5a880]/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold opacity-60">Total Bookings</span>
            <span
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                isDark ? 'bg-stone-800 text-stone-300' : 'bg-stone-100 text-stone-700'
              }`}
            >
              <Calendar className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-classic-serif font-normal">248</span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-md">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12%
            </span>
          </div>
          <p className="text-[11px] opacity-50">94% booked via self-service</p>
        </div>

        {/* Metric 2: Revenue */}
        <div
          className={`p-5 rounded-3xl space-y-2 transition-all border ${
            isDark ? 'neu-raised border-[#c5a880]/20' : 'neu-raised border-[#c5a880]/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold opacity-60">Revenue (Simulated)</span>
            <span className="w-8 h-8 rounded-xl bg-[#c5a880]/20 text-[#dfc299] flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-classic-serif font-normal text-[#dfc299]">
              $18,450
            </span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-md">
              <TrendingUp className="w-3 h-3 mr-1" />
              +18%
            </span>
          </div>
          <p className="text-[11px] opacity-50">
            Average ticket ${currentIndustry.services[0]?.price || 75}
          </p>
        </div>

        {/* Metric 3: No-show Rate */}
        <div
          className={`p-5 rounded-3xl space-y-2 transition-all ${
            isDark ? 'neu-raised' : 'neu-raised'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold opacity-60">No-show Rate</span>
            <span className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold">
              <TrendingDown className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold">8%</span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-md">
              <TrendingDown className="w-3 h-3 mr-1" />
              -3%
            </span>
          </div>
          <p className="text-[11px] opacity-50">Industry benchmark: 22%</p>
        </div>

        {/* Metric 4: Completion Rate */}
        <div
          className={`p-5 rounded-3xl space-y-2 transition-all ${
            isDark ? 'neu-raised' : 'neu-raised'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold opacity-60">Completion Rate</span>
            <span className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold">92%</span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-md">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5%
            </span>
          </div>
          <p className="text-[11px] opacity-50">High operational fulfillment</p>
        </div>
      </div>

      {/* Main Charts: Bookings Trend & Source Breakdown */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Bookings Trend Bar Chart (Matching Panel 7/8 in reference image) */}
        <div
          className={`lg:col-span-8 rounded-3xl p-6 sm:p-8 space-y-6 transition-all ${
            isDark ? 'neu-raised' : 'neu-raised'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200/40 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold">Bookings Trend</h2>
              <p className="text-xs opacity-60">Attendance volume across chronological dates</p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-bold opacity-80">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span>Cancelled</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-400" />
                <span>No-show</span>
              </div>
            </div>
          </div>

          {/* Interactive Bar Chart */}
          <div className="pt-6">
            <div className="flex items-end justify-between gap-4 h-64 border-b border-slate-200/50 dark:border-slate-800 pb-2">
              {trendData.map((item) => {
                const completedH = (item.completed / maxVal) * 100
                const cancelledH = (item.cancelled / maxVal) * 100
                const noShowH = (item.noShow / maxVal) * 100

                return (
                  <div key={item.date} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full max-w-[48px] flex items-end justify-center gap-1 h-full">
                      {/* Completed Bar */}
                      <div
                        className="w-4 bg-blue-500 rounded-t-lg hover:bg-blue-400 transition-all cursor-pointer shadow-sm"
                        style={{ height: `${completedH}%` }}
                        title={`${item.date} Completed: ${item.completed}`}
                      />
                      {/* Cancelled Bar */}
                      <div
                        className="w-4 bg-rose-400 rounded-t-lg hover:bg-rose-300 transition-all cursor-pointer shadow-sm"
                        style={{ height: `${cancelledH}%` }}
                        title={`${item.date} Cancelled: ${item.cancelled}`}
                      />
                      {/* No-show Bar */}
                      <div
                        className="w-4 bg-slate-400 rounded-t-lg hover:bg-slate-300 transition-all cursor-pointer shadow-sm"
                        style={{ height: `${noShowH}%` }}
                        title={`${item.date} No-show: ${item.noShow}`}
                      />
                    </div>
                    <span className="text-xs font-bold opacity-70 mt-2">{item.date}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Acquisition Sources & Staff Utilization */}
        <div className="lg:col-span-4 space-y-6">
          {/* Booking Sources Card */}
          <div
            className={`rounded-3xl p-6 space-y-4 transition-all ${
              isDark ? 'neu-raised' : 'neu-raised'
            }`}
          >
            <h3 className="text-sm font-bold pb-2 border-b border-slate-200/40 dark:border-slate-800">
              Customer Booking Sources
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Instagram / Social Link</span>
                  <span className="text-[#dfc299]">42%</span>
                </div>
                <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#dfc299] to-[#c5a880] h-full rounded-full" style={{ width: '42%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Google Search & Maps</span>
                  <span className="text-[#c5a880]">28%</span>
                </div>
                <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#c5a880] h-full rounded-full" style={{ width: '28%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Direct / Website QR</span>
                  <span className="text-stone-400">18%</span>
                </div>
                <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-stone-600 h-full rounded-full" style={{ width: '18%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Customer Referrals</span>
                  <span className="text-amber-500">12%</span>
                </div>
                <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full rounded-full" style={{ width: '12%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Staff Utilization Card */}
          <div
            className={`rounded-3xl p-6 space-y-4 transition-all border ${
              isDark ? 'neu-raised border-[#c5a880]/20' : 'neu-raised border-[#c5a880]/30'
            }`}
          >
            <h3 className="text-sm font-bold pb-2 border-b border-stone-200/40 dark:border-stone-800">
              Specialist Utilization
            </h3>

            <div className="space-y-3 text-xs">
              {currentIndustry.staff.map((st, i) => {
                const util = [88, 76, 82, 69][i % 4]
                return (
                  <div key={st.id}>
                    <div className="flex justify-between font-semibold mb-1">
                      <span>{st.name} ({st.role})</span>
                      <span className="font-extrabold text-[#dfc299]">{util}%</span>
                    </div>
                    <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#dfc299] to-[#c5a880] h-full rounded-full transition-all duration-500"
                        style={{ width: `${util}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )}
</div>
  )
}
